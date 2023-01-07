export enum Itemtype {
    UNKNOWN, ANY, MISC,
    HELMET, PLATE, LEGGINS, BOOTS, WEAPON
}

const ITEMS: Array<{ tile_index: number, itemtype: Itemtype, name: string, damage?: string, protection?: string, weight: number }> = [
    { tile_index: 10 + 25 * 64, itemtype: Itemtype.WEAPON, name: "Sword", damage: "1-6", weight: 15 },
    { tile_index: 9 + 25 * 64, itemtype: Itemtype.WEAPON, name: "Sword of bladiness", damage: "2-7", weight: 13 },
    { tile_index: 3 + 22 * 64, itemtype: Itemtype.MISC, name: "Blue book", weight: 2 },
    { tile_index: 8 + 21 * 64, itemtype: Itemtype.HELMET, name: "Helmet", protection: "5", weight: 10 }
]
interface IItem {
    index: number
    amount: number
}
export class Item {
    #index: number
    #tile_index: number
    #itemtype: Itemtype
    #amount: number
    constructor({ index, amount }: IItem) {
        this.#index = index
        this.#tile_index = ITEMS[this.#index].tile_index
        this.#itemtype = ITEMS[this.#index].itemtype
        this.#amount = amount
    }
    item() { return ITEMS[this.#index] }
    tileIndex() { return this.#tile_index }
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