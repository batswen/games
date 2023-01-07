import { MOUSE } from "./game.js"
import { Vector } from "./vector.js"

export const ITEMTYPE = {
    UNKNOWN: "UNKNOWN",
    ANY: "ANY",
    MISC: "MISC",
    HELMET: "HELMET",
    PLATE: "PLATE",
    LEGGINS: "LEGGINS",
    BOOTS: "BOOTS",
    WEAPON: "WEAPON"
}
interface IItem {
    name: string
    tile_index: number
    itemtype: string
    amount: number
}
export class Item {
    #name: string
    #tile_index: number
    #itemtype: string
    #amount: number
    constructor({ name, tile_index, itemtype, amount }: IItem) {
        this.#name = name
        this.#tile_index = tile_index
        this.#itemtype = itemtype
        this.#amount = amount
    }
    name() { return this.#name }
    tileIndex() { return this.#tile_index }
    itemtype() { return this.#itemtype }
    amount() { return this.#amount }
}

interface IInventoryRect {
    position: Vector
    size: Vector
    itemtype: string | null
}

class InventoryRect {
    #position: Vector
    #size: Vector
    #content: Item | null
    #itemtype: string | null
    constructor({ position, size, itemtype }: IInventoryRect) {
        this.#position = position
        this.#size = size
        this.#itemtype = itemtype
        this.#content = null
    }
    set(item: Item | null) {
        this.#content = item
    }
    content() {
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
    #ctx
    #tileset
    #size
    #inventory: InventoryRect[]
    #mouse_index: number
    #mouse_position: Vector
    #mouse_delta: Vector
    #tile_index: number | undefined
    constructor(ctx: CanvasRenderingContext2D, tileset: HTMLImageElement, size: Vector) {
        this.#ctx = ctx
        this.#tileset = tileset
        this.#size = size
        this.#inventory = []
        this.#mouse_index = -1
        this.#tile_index = -1
        this.#mouse_position = new Vector({ x: 0, y: 0 })
        this.#mouse_delta = new Vector({ x: 0, y: 0 })
    }
    test(index: number): boolean {
        if (index >= this.#inventory.length) {
            throw new Error("test(index)")
        }
        return this.#inventory[index].content() !== null
    }
    empty(index: number): boolean {
        return this.#inventory[index].content() === null
    }
    canDrop(index: number, itemtype: string): boolean {
        if (this.#inventory[index].itemtype() === ITEMTYPE.ANY) {
            return true
        }
         return this.#inventory[index].itemtype() === itemtype
    }
    add(position: Vector, itemtype: string, numEntries: number = 1, gap: number = 1): void {
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
    set(position: number, item: Item | null): void {
         this.#inventory[position].set(item)
    }
    get(position: number): Item | null {
        return this.#inventory[position].content()
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
        if (mousebutton === MOUSE.DOWN && this.#mouse_index === -1) {
            const hover_index = this.pointInRect(mouse)
            if (hover_index > -1) {
                if (this.test(hover_index)) {
                    this.#mouse_index = hover_index
                    this.#mouse_delta = this.pointInRectDelta(mouse)
                }
            }
        }
    
        if (mousebutton === MOUSE.DOWN && this.#mouse_index !== -1) {
            this.#tile_index = this.get(this.#mouse_index)?.tileIndex()
        }
    
        if (mousebutton === MOUSE.UP && this.#mouse_index !== -1) {
            const new_index = this.pointInRect(mouse)
            if (new_index > -1 && new_index !== this.#mouse_index) {
                const old_item = this.get(this.#mouse_index)
    
                if (old_item && this.canDrop(new_index, old_item.itemtype())) {
                    if (this.empty(new_index)) {
                        // Move item
                        this.set(new_index, old_item)
                        this.set(this.#mouse_index, null)
                    } else {
                        const item_to_swap = this.get(new_index)
                        if (item_to_swap && this.canDrop(this.#mouse_index, item_to_swap.itemtype())) {
                            // Swap if possible
                            this.set(new_index, old_item)
                            this.set(this.#mouse_index, item_to_swap)
                        }
                    }
                }
            }
            this.#mouse_index = -1
            this.#tile_index = -1
        }
    }
    draw() {
        // Draw all inventory slots and items
        for (const rect of this.#inventory) {
            this.#ctx.fillStyle = `hsl(0, 0%, ${rect.pointInRect(this.#mouse_position) ? 50 : 60}%)`
            this.#ctx.fillRect(rect.position().x, rect.position().y, this.#size.x, this.#size.y)
            const item = rect.content()
            if (item !== null) {
                this.#ctx.drawImage(
                    this.#tileset,
                    Math.floor(item.tileIndex() % 64) * rect.size().x,
                    Math.floor(item.tileIndex() / 64) * rect.size().y,
                    rect.size().x, rect.size().y,
                    rect.position().x, rect.position().y,
                    rect.size().x, rect.size().y
                )
                if (item.amount() > 1) {
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
                this.#mouse_position.y - this.#mouse_delta.y,
                this.#size.x, this.#size.y
            )
        }
    }
}