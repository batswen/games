import { MOUSE } from "./game.js"
import { Vector } from "./vector.js"
import { Itemtype, Item } from "./item.js"

interface IInventoryRect {
    position: Vector
    size: Vector
    itemtype: Itemtype
}

class InventoryRect {
    #position: Vector
    #size: Vector
    #content: Item | null
    #itemtype: Itemtype
    constructor({ position, size, itemtype }: IInventoryRect) {
        this.#position = position
        this.#size = size
        this.#itemtype = itemtype
        this.#content = null
    }
    setItem(item: Item | null) {
        this.#content = item
    }
    getItem() {
        return this.#content
    }
    itemtype() {
        return this.#itemtype
    }
    position() {
        return this.#position
    }
    size() {
        return this.#size
    }
    pointInRect(point: Vector): boolean {
        return point.x >= this.#position.x && point.x < this.#position.x + this.#size.x &&
        point.y >= this.#position.y && point.y < this.#position.y + this.#size.y 
    }
    pointInRectDelta(point: Vector): Vector {
        return new Vector({ x: point.x - this.#position.x, y: point.y - this.#position.y })
    }
}

export class Inventory {
    #ctx: CanvasRenderingContext2D
    #tileset: HTMLImageElement
    #size: Vector
    #inventory: InventoryRect[]
    #mouse_down_index: number   // contains inventory index
    #mouse_position: Vector     // x,y
    #mouse_delta: Vector        // x,y
    #tile_index: number | undefined
    constructor(ctx: CanvasRenderingContext2D, tileset: HTMLImageElement, size: Vector) {
        this.#ctx = ctx
        this.#tileset = tileset
        this.#size = size
        this.#inventory = []
        this.#mouse_down_index = -1
        this.#tile_index = -1
        this.#mouse_position = new Vector({ x: 0, y: 0 })
        this.#mouse_delta = new Vector({ x: 0, y: 0 })
    }
    test(index: number): boolean {
        if (index >= this.#inventory.length) {
            throw new Error("test(index)")
        }
        return this.#inventory[index].getItem() !== null
    }
    empty(index: number): boolean {
        return this.#inventory[index].getItem() === null
    }
    canDrop(index: number, itemtype: Itemtype): boolean {
        if (this.#inventory[index].itemtype() === Itemtype.ANY) {
            return true
        }
         return this.#inventory[index].itemtype() === itemtype
    }
    addSlot(position: Vector, itemtype: Itemtype, numEntries: number = 1, gap: number = 1): void {
        for (let i = 0; i < numEntries; i++) {
            this.#inventory.push(new InventoryRect({
                    position: new Vector({ x: position.x + i * this.#size.x + gap * i, y: position.y }),
                    size: this.#size,
                    itemtype
            }))
        }
    }
    len(): number {
        return this.#inventory.length
    }
    add(item: Item): boolean {
        for (let index = 0; index < this.#inventory.length; index++) {
            if (this.empty(index) && this.#inventory[index].itemtype() === Itemtype.ANY) {
                this.#inventory[index].setItem(item)
                return true
            }
        }
        return false
    }
    set(position: number, item: Item | null): void {
        this.#inventory[position].setItem(item)
    }
    get(position: number): Item | null {
        return this.#inventory[position].getItem()
    }
    pointInRect(point: Vector): number {
        for (let index = 0; index < this.#inventory.length; index++) {
            if (this.#inventory[index].pointInRect(point)) {
                return index
            }
        }
        return -1
    }
    pointInRectDelta(point: Vector): Vector {
        let result: Vector = Vector.zero()
        for (const rect of this.#inventory) {
            if (rect.pointInRect(point)) {
                result = rect.pointInRectDelta(point)
                break
            }
        }
        return result
    }
    update(mousebutton: string, mouse: Vector) {
        this.#mouse_position = mouse
        if (mousebutton === MOUSE.DOWN && this.#mouse_down_index === -1) {
            const hover_index = this.pointInRect(this.#mouse_position)
            if (hover_index > -1) {
                if (this.test(hover_index)) {
                    this.#mouse_down_index = hover_index
                    this.#mouse_delta = this.pointInRectDelta(this.#mouse_position)
                    this.#tile_index = this.get(this.#mouse_down_index)?.tileIndex()
                }
            }
        }
    
        if (mousebutton === MOUSE.DOWN && this.#mouse_down_index !== -1) {
        }
    
        if (mousebutton === MOUSE.UP && this.#mouse_down_index !== -1) {
            const new_index = this.pointInRect(this.#mouse_position)
            if (new_index > -1 && new_index !== this.#mouse_down_index) {
                const old_item = this.get(this.#mouse_down_index)
    
                if (old_item && this.canDrop(new_index, old_item.itemtype())) {
                    if (this.empty(new_index)) {
                        // Move item
                        this.set(new_index, old_item)
                        this.set(this.#mouse_down_index, null)
                    } else {
                        const item_to_swap = this.get(new_index)
                        if (item_to_swap && this.canDrop(this.#mouse_down_index, item_to_swap.itemtype())) {
                            // Swap if possible
                            this.set(new_index, old_item)
                            this.set(this.#mouse_down_index, item_to_swap)
                        }
                    }
                }
            }
            this.#mouse_down_index = -1
            this.#tile_index = -1
        }
    }
    draw() {
        // Draw all inventory slots and items
        for (let index = 0; index < this.#inventory.length; index++) {
            const rect = this.#inventory[index]
            this.#ctx.fillStyle = `hsl(0, 0%, ${rect.pointInRect(this.#mouse_position) ? 50 : 60}%)`
            this.#ctx.fillRect(rect.position().x, rect.position().y, this.#size.x, this.#size.y)
            const item = rect.getItem()
            if (item !== null && index !== this.#mouse_down_index) {
                this.#ctx.drawImage(
                    this.#tileset,
                    Math.floor(item.tileIndex() % 64) * rect.size().x,
                    Math.floor(item.tileIndex() / 64) * rect.size().y,
                    rect.size().x, rect.size().y,
                    rect.position().x, rect.position().y,
                    rect.size().x, rect.size().y
                )
                if (item.amount() > 1) {
                    this.#ctx.font = "9px Arial"
                    this.#ctx.fillStyle = "#000"
                    this.#ctx.fillRect(rect.position().x + rect.size().x - 8, rect.position().y + rect.size().y - 9, 8, 9)
                    this.#ctx.fillStyle = "#fff"
                    this.#ctx.fillText("" + item.amount(), rect.position().x + rect.size().x - 7, rect.position().y + rect.size().y - 1)
                }
            }
        }
        // Draw dragged item
        if (this.#tile_index !== undefined && this.#tile_index > -1) {
            this.#ctx.drawImage(
                this.#tileset,
                Math.floor(this.#tile_index % 64) * this.#size.x,
                Math.floor(this.#tile_index / 64) * this.#size.y,
                this.#size.x, this.#size.y,
                this.#mouse_position.x - this.#mouse_delta.x,
                // this.#mouse_position.x - this.#mouse_delta.x,
                this.#mouse_position.y - this.#mouse_delta.y,
                this.#size.x, this.#size.y
            )
        }
        // Draw infobox
        const inv_index = this.pointInRect(this.#mouse_position)
        if (inv_index > -1 && !this.empty(inv_index)) {
            const item = this.get(inv_index)!
            const x = this.#mouse_position.x, y = this.#mouse_position.y
            const text: Array<{ font: string, color: string, text: string }> = [
                { font: "24px Pirata One", color: "#fff", text: "Qqg"+item.item().name },
                { font: "16px Pirata One", color: "#4a4", text: item.itemtypeString() },
                { font: "4", color: "", text: "" },
                { font: "16px Pirata One", color: "#abf", text: `Damage: ${item.item().damage}` },
                { font: "16px Pirata One", color: "#abf", text: `Protection: ${item.item().protection}` },
                { font: "4", color: "", text: "" },
                { font: "16px Pirata One", color: "#fab", text: `Weight: ${item.item().weight * item.amount()}` }
            ]
            let width = 0, height = 6
            for (const text_line of text) {
                this.#ctx.font = text_line.font
                this.#ctx.fillStyle = text_line.color
                if (width < this.#ctx.measureText(text_line.text).width) {
                    width = this.#ctx.measureText(text_line.text).width
                }
                height += parseInt(text_line.font)
            }

            const info_y = y + 20
            const padding = 3

            this.#ctx.fillStyle = "#000"
            this.#ctx.strokeStyle = "#fff"
            this.#ctx.fillRect(x, info_y, width + padding * 2, height + padding * 2)
            this.#ctx.strokeRect(x, info_y, width + padding * 2, height + padding * 2)

            let xPos = x + padding, yPos = info_y + 20 + padding
            for (const text_line of text) {
                this.#ctx.font = text_line.font
                this.#ctx.fillStyle = text_line.color
                this.#ctx.fillText(text_line.text, xPos, yPos)
                yPos += parseInt(text_line.font)
            }
        }
    }
}