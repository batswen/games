import { Vector } from "./vector"

export enum Itemtype {
    UNKNOWN, ANY, MISC,
    HELMET, PLATE, LEGGINS, BOOTS, WEAPON
}

interface IItemstype {
    src: string
    number_images: number
    itemtype: Itemtype
    name: string
    damage?: string
    protection?: number
    weight: number
    // stackable: boolean
    // max_stack_size: number
}

const ITEMS: Array<IItemstype> = [
    { src: "sword_red.png", number_images: 1, itemtype: Itemtype.WEAPON, name: "Sword", damage: "1-6", weight: 5 },
    { src: "sword_blue.png", number_images: 1, itemtype: Itemtype.WEAPON, name: "Sword of bladiness", damage: "2-7", weight: 3.5 },
    { src: "book_blue.png", number_images: 1, itemtype: Itemtype.MISC, name: "Blue book", weight: 0.5 },
    { src: "helmet_monty.png", number_images: 1, itemtype: Itemtype.HELMET, name: "Helmet", protection: 5, weight: 4 },
    { src: "spark_anim_6.png", number_images: 6, itemtype: Itemtype.MISC, name: "Sparkling spark", weight: 0 }
]
interface IItem {
    index: number
    amount: number
}
export class Item {
    #ctx: CanvasRenderingContext2D
    #index: number
    #tile: HTMLImageElement
    #itemtype: Itemtype
    #amount: number
    #anim_time: number
    #anim_frame: number
    #number_images: number
    constructor(ctx: CanvasRenderingContext2D, { index, amount }: IItem) {
        this.#ctx = ctx
        this.#index = index
        this.#tile = new Image()
        this.#tile.src = `${location.pathname}img/${ITEMS[this.#index].src}`
        this.#itemtype = ITEMS[this.#index].itemtype
        this.#amount = amount
        this.#anim_time = Date.now()
        this.#anim_frame = 0
        this.#number_images = this.item().number_images
    }
    item() { return ITEMS[this.#index] }
    tile() { return this.#tile }
    itemtype() { return this.#itemtype }
    itemtypeString() {
        switch (this.#itemtype) {
            case Itemtype.ANY:
                return "ANY"
            case Itemtype.MISC:
                return "Misc"
            case Itemtype.WEAPON:
                return "Weapon"
            case Itemtype.HELMET: case Itemtype.PLATE: case Itemtype.LEGGINS: case Itemtype.BOOTS:
                return "Armor"
            default:
                return "???"
        }
    }
    amount() { return this.#amount }
    draw(position: Vector) {
        if (this.#number_images > 1) {
            if (this.#anim_time + 250 < Date.now()) {
                this.#anim_time = Date.now()
                this.#anim_frame = (this.#anim_frame + 1) % this.#number_images
            }
            this.#ctx.drawImage(
                this.tile(),
                this.#anim_frame * 32,
                0,
                32, 32,
                position.x,
                position.y,
                32, 32
            )
        } else {
            this.#ctx.drawImage(
                this.tile(),
                position.x,
                position.y
            )
        }        
        if (this.amount() > 1) {
            this.#ctx.font = "9px Arial"
            this.#ctx.fillStyle = "#000"
            this.#ctx.fillRect(position.x + 32 - 8, position.y + 32 - 9, 8, 9)
            this.#ctx.fillStyle = "#fff"
            this.#ctx.fillText(`${this.amount()}`, position.x + 32 - 7, position.y + 32 - 1)
        }
    }
}