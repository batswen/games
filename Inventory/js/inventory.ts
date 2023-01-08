import { Mouse } from "./game.js"
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
    #size: Vector
    #inventory: InventoryRect[]
    #held_item_index: number    // contains inventory index of #held_item
    #mouse_position: Vector     // x,y
    #mouse_delta: Vector        // x,y
    #held_item: Item | null     // dragged item
    constructor(ctx: CanvasRenderingContext2D, size: Vector) {
        this.#ctx = ctx
        this.#size = size
        this.#inventory = []
        this.#held_item_index = -1
        this.#held_item = null
        this.#mouse_position = new Vector({ x: 0, y: 0 })
        this.#mouse_delta = new Vector({ x: 0, y: 0 })
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
    update(mousebutton: Mouse, mouse: Vector) {
        this.#mouse_position = mouse
        if (mousebutton === Mouse.DOWN && this.#held_item === null) {
            const hover_index = this.pointInRect(this.#mouse_position)
            if (hover_index > -1) {
                if (!this.empty(hover_index)) {
                    this.#held_item_index = hover_index
                    this.#mouse_delta = this.pointInRectDelta(this.#mouse_position)
                    this.#held_item = this.#inventory[this.#held_item_index].getItem()
                    this.set(this.#held_item_index, null)
                }
            }
        }
    
        if (mousebutton === Mouse.UP && this.#held_item !== null) {
            const new_index = this.pointInRect(this.#mouse_position)
            if (new_index > -1) {
                if (this.canDrop(new_index, this.#held_item.itemtype())) { // Can #held_item fit here
                    if (this.empty(new_index)) {
                        this.set(new_index, this.#held_item) // If slot empty
                    } else {
                        const item_to_swap = this.get(new_index)
                        if (item_to_swap !== null &&
                            this.canDrop(this.#held_item_index, item_to_swap.itemtype())) { // Can item under the mouse pointer fit in #held_item's slot
                            this.set(new_index, this.#held_item)
                            this.set(this.#held_item_index, item_to_swap)
                        } else {
                            this.set(this.#held_item_index, this.#held_item)
                        }
                    }
                } else {
                    this.set(this.#held_item_index, this.#held_item)
                }
            }
            this.#held_item_index = -1
            this.#held_item = null
        }
    }
    draw() {
        // Draw all inventory slots and items
        for (let index = 0; index < this.#inventory.length; index++) {
            const rect = this.#inventory[index]
            this.#ctx.fillStyle = `hsl(0, 0%, ${rect.pointInRect(this.#mouse_position) ? 50 : 60}%)`
            this.#ctx.fillRect(rect.position().x, rect.position().y, this.#size.x, this.#size.y)
            const item = rect.getItem()
            if (item !== null && index !== this.#held_item_index) {
                item.draw(rect.position())
            }
        }
        // Draw dragged item
        if (this.#held_item !== null) {
            this.#held_item.draw(this.#mouse_position.copy().sub(this.#mouse_delta))
        }
        // Draw infobox
        const inv_index = this.pointInRect(this.#mouse_position)
        if (inv_index > -1 && !this.empty(inv_index)) {
            const item = this.get(inv_index)!
            const x = this.#mouse_position.x, y = this.#mouse_position.y
            const text: Array<{ font: string, color: string, text: string }> = [
                { font: "24px Pirata One", color: "#fff", text: item.item().name },
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

            let xPos = x + padding, yPos = info_y + 18 + padding
            for (const text_line of text) {
                this.#ctx.font = text_line.font
                this.#ctx.fillStyle = text_line.color
                this.#ctx.fillText(text_line.text, xPos, yPos)
                yPos += parseInt(text_line.font)
            }
        }
    }
}