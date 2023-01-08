export enum Itemtype {
    UNKNOWN, ANY, MISC,
    HELMET, PLATE, LEGGINS, BOOTS, WEAPON
}

const ITEMS: Array<{ tile: string, itemtype: Itemtype, name: string, damage?: string, protection?: string, weight: number }> = [
    { tile: "sword_red.png", itemtype: Itemtype.WEAPON, name: "Sword", damage: "1-6", weight: 15 },
    { tile: "sword_blue.png", itemtype: Itemtype.WEAPON, name: "Sword of bladiness", damage: "2-7", weight: 13 },
    { tile: "book_blue.png", itemtype: Itemtype.MISC, name: "Blue book", weight: 2 },
    { tile: "helmet_monty.png", itemtype: Itemtype.HELMET, name: "Helmet", protection: "5", weight: 10 }
]
interface IItem {
    index: number
    amount: number
}
export class Item {
    #index: number
    #tile: HTMLImageElement
    #itemtype: Itemtype
    #amount: number
    constructor({ index, amount }: IItem) {
        this.#index = index
        this.#tile = new Image()
        this.#tile.src = `${location.pathname}img/${ITEMS[this.#index].tile}`
        this.#itemtype = ITEMS[this.#index].itemtype
        this.#amount = amount
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
}