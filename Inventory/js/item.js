var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Item_index, _Item_tile_index, _Item_itemtype, _Item_amount;
export var Itemtype;
(function (Itemtype) {
    Itemtype[Itemtype["UNKNOWN"] = 0] = "UNKNOWN";
    Itemtype[Itemtype["ANY"] = 1] = "ANY";
    Itemtype[Itemtype["MISC"] = 2] = "MISC";
    Itemtype[Itemtype["HELMET"] = 3] = "HELMET";
    Itemtype[Itemtype["PLATE"] = 4] = "PLATE";
    Itemtype[Itemtype["LEGGINS"] = 5] = "LEGGINS";
    Itemtype[Itemtype["BOOTS"] = 6] = "BOOTS";
    Itemtype[Itemtype["WEAPON"] = 7] = "WEAPON";
})(Itemtype || (Itemtype = {}));
const ITEMS = [
    { tile_index: 10 + 25 * 64, itemtype: Itemtype.WEAPON, name: "Sword", damage: "1-6", weight: 15 },
    { tile_index: 9 + 25 * 64, itemtype: Itemtype.WEAPON, name: "Sword of bladiness", damage: "2-7", weight: 13 },
    { tile_index: 3 + 22 * 64, itemtype: Itemtype.MISC, name: "Blue book", weight: 2 },
    { tile_index: 8 + 21 * 64, itemtype: Itemtype.HELMET, name: "Helmet", protection: "5", weight: 10 }
];
export class Item {
    constructor({ index, amount }) {
        _Item_index.set(this, void 0);
        _Item_tile_index.set(this, void 0);
        _Item_itemtype.set(this, void 0);
        _Item_amount.set(this, void 0);
        __classPrivateFieldSet(this, _Item_index, index, "f");
        __classPrivateFieldSet(this, _Item_tile_index, ITEMS[__classPrivateFieldGet(this, _Item_index, "f")].tile_index, "f");
        __classPrivateFieldSet(this, _Item_itemtype, ITEMS[__classPrivateFieldGet(this, _Item_index, "f")].itemtype, "f");
        __classPrivateFieldSet(this, _Item_amount, amount, "f");
    }
    item() { return ITEMS[__classPrivateFieldGet(this, _Item_index, "f")]; }
    tileIndex() { return __classPrivateFieldGet(this, _Item_tile_index, "f"); }
    itemtype() { return __classPrivateFieldGet(this, _Item_itemtype, "f"); }
    itemtypeString() {
        switch (__classPrivateFieldGet(this, _Item_itemtype, "f")) {
            case Itemtype.ANY:
                return "ANY";
            case Itemtype.MISC:
                return "Misc";
            case Itemtype.WEAPON:
                return "Weapon";
            case Itemtype.HELMET:
            case Itemtype.PLATE:
            case Itemtype.LEGGINS:
            case Itemtype.BOOTS:
                return "Armor";
            default:
                return "???";
        }
    }
    amount() { return __classPrivateFieldGet(this, _Item_amount, "f"); }
}
_Item_index = new WeakMap(), _Item_tile_index = new WeakMap(), _Item_itemtype = new WeakMap(), _Item_amount = new WeakMap();
//# sourceMappingURL=item.js.map