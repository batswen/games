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
var _Item_ctx, _Item_index, _Item_tile, _Item_itemtype, _Item_amount, _Item_anim_time, _Item_anim_frame, _Item_number_images;
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
    { src: "sword_red.png", number_images: 1, itemtype: Itemtype.WEAPON, name: "Sword", damage: "1-6", weight: 5 },
    { src: "sword_blue.png", number_images: 1, itemtype: Itemtype.WEAPON, name: "Sword of bladiness", damage: "2-7", weight: 3.5 },
    { src: "book_blue.png", number_images: 1, itemtype: Itemtype.MISC, name: "Blue book", weight: 0.5 },
    { src: "helmet_monty.png", number_images: 1, itemtype: Itemtype.HELMET, name: "Helmet", protection: 5, weight: 4 },
    { src: "spark_anim_6.png", number_images: 6, itemtype: Itemtype.MISC, name: "Sparkling spark", weight: 0 }
];
export class Item {
    constructor(ctx, { index, amount }) {
        _Item_ctx.set(this, void 0);
        _Item_index.set(this, void 0);
        _Item_tile.set(this, void 0);
        _Item_itemtype.set(this, void 0);
        _Item_amount.set(this, void 0);
        _Item_anim_time.set(this, void 0);
        _Item_anim_frame.set(this, void 0);
        _Item_number_images.set(this, void 0);
        __classPrivateFieldSet(this, _Item_ctx, ctx, "f");
        __classPrivateFieldSet(this, _Item_index, index, "f");
        __classPrivateFieldSet(this, _Item_tile, new Image(), "f");
        __classPrivateFieldGet(this, _Item_tile, "f").src = `${location.pathname}img/${ITEMS[__classPrivateFieldGet(this, _Item_index, "f")].src}`;
        __classPrivateFieldSet(this, _Item_itemtype, ITEMS[__classPrivateFieldGet(this, _Item_index, "f")].itemtype, "f");
        __classPrivateFieldSet(this, _Item_amount, amount, "f");
        __classPrivateFieldSet(this, _Item_anim_time, Date.now(), "f");
        __classPrivateFieldSet(this, _Item_anim_frame, 0, "f");
        __classPrivateFieldSet(this, _Item_number_images, this.item().number_images, "f");
    }
    item() { return ITEMS[__classPrivateFieldGet(this, _Item_index, "f")]; }
    tile() { return __classPrivateFieldGet(this, _Item_tile, "f"); }
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
    draw(position) {
        if (__classPrivateFieldGet(this, _Item_number_images, "f") > 1) {
            if (__classPrivateFieldGet(this, _Item_anim_time, "f") + 250 < Date.now()) {
                __classPrivateFieldSet(this, _Item_anim_time, __classPrivateFieldGet(this, _Item_anim_time, "f") + 250, "f");
                __classPrivateFieldSet(this, _Item_anim_frame, (__classPrivateFieldGet(this, _Item_anim_frame, "f") + 1) % __classPrivateFieldGet(this, _Item_number_images, "f"), "f");
            }
            __classPrivateFieldGet(this, _Item_ctx, "f").drawImage(this.tile(), __classPrivateFieldGet(this, _Item_anim_frame, "f") * 32, 0, 32, 32, position.x, position.y, 32, 32);
        }
        else {
            __classPrivateFieldGet(this, _Item_ctx, "f").drawImage(this.tile(), position.x, position.y);
        }
        if (this.amount() > 1) {
            __classPrivateFieldGet(this, _Item_ctx, "f").font = "9px Arial";
            __classPrivateFieldGet(this, _Item_ctx, "f").fillStyle = "#000";
            __classPrivateFieldGet(this, _Item_ctx, "f").fillRect(position.x + 32 - 8, position.y + 32 - 9, 8, 9);
            __classPrivateFieldGet(this, _Item_ctx, "f").fillStyle = "#fff";
            __classPrivateFieldGet(this, _Item_ctx, "f").fillText(`${this.amount()}`, position.x + 32 - 7, position.y + 32 - 1);
        }
    }
}
_Item_ctx = new WeakMap(), _Item_index = new WeakMap(), _Item_tile = new WeakMap(), _Item_itemtype = new WeakMap(), _Item_amount = new WeakMap(), _Item_anim_time = new WeakMap(), _Item_anim_frame = new WeakMap(), _Item_number_images = new WeakMap();
//# sourceMappingURL=item.js.map