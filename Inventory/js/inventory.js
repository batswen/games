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
var _InventoryRect_position, _InventoryRect_size, _InventoryRect_content, _InventoryRect_itemtype, _Inventory_ctx, _Inventory_tileset, _Inventory_size, _Inventory_inventory, _Inventory_mouse_down_index, _Inventory_mouse_position, _Inventory_mouse_delta, _Inventory_tile_index;
import { MOUSE } from "./game.js";
import { Vector } from "./vector.js";
import { Itemtype } from "./item.js";
class InventoryRect {
    constructor({ position, size, itemtype }) {
        _InventoryRect_position.set(this, void 0);
        _InventoryRect_size.set(this, void 0);
        _InventoryRect_content.set(this, void 0);
        _InventoryRect_itemtype.set(this, void 0);
        __classPrivateFieldSet(this, _InventoryRect_position, position, "f");
        __classPrivateFieldSet(this, _InventoryRect_size, size, "f");
        __classPrivateFieldSet(this, _InventoryRect_itemtype, itemtype, "f");
        __classPrivateFieldSet(this, _InventoryRect_content, null, "f");
    }
    setItem(item) {
        __classPrivateFieldSet(this, _InventoryRect_content, item, "f");
    }
    getItem() {
        return __classPrivateFieldGet(this, _InventoryRect_content, "f");
    }
    itemtype() {
        return __classPrivateFieldGet(this, _InventoryRect_itemtype, "f");
    }
    position() {
        return __classPrivateFieldGet(this, _InventoryRect_position, "f");
    }
    size() {
        return __classPrivateFieldGet(this, _InventoryRect_size, "f");
    }
    pointInRect(point) {
        return point.x >= __classPrivateFieldGet(this, _InventoryRect_position, "f").x && point.x < __classPrivateFieldGet(this, _InventoryRect_position, "f").x + __classPrivateFieldGet(this, _InventoryRect_size, "f").x &&
            point.y >= __classPrivateFieldGet(this, _InventoryRect_position, "f").y && point.y < __classPrivateFieldGet(this, _InventoryRect_position, "f").y + __classPrivateFieldGet(this, _InventoryRect_size, "f").y;
    }
    pointInRectDelta(point) {
        return new Vector({ x: point.x - __classPrivateFieldGet(this, _InventoryRect_position, "f").x, y: point.y - __classPrivateFieldGet(this, _InventoryRect_position, "f").y });
    }
}
_InventoryRect_position = new WeakMap(), _InventoryRect_size = new WeakMap(), _InventoryRect_content = new WeakMap(), _InventoryRect_itemtype = new WeakMap();
export class Inventory {
    constructor(ctx, tileset, size) {
        _Inventory_ctx.set(this, void 0);
        _Inventory_tileset.set(this, void 0);
        _Inventory_size.set(this, void 0);
        _Inventory_inventory.set(this, void 0);
        _Inventory_mouse_down_index.set(this, void 0);
        _Inventory_mouse_position.set(this, void 0);
        _Inventory_mouse_delta.set(this, void 0);
        _Inventory_tile_index.set(this, void 0);
        __classPrivateFieldSet(this, _Inventory_ctx, ctx, "f");
        __classPrivateFieldSet(this, _Inventory_tileset, tileset, "f");
        __classPrivateFieldSet(this, _Inventory_size, size, "f");
        __classPrivateFieldSet(this, _Inventory_inventory, [], "f");
        __classPrivateFieldSet(this, _Inventory_mouse_down_index, -1, "f");
        __classPrivateFieldSet(this, _Inventory_tile_index, -1, "f");
        __classPrivateFieldSet(this, _Inventory_mouse_position, new Vector({ x: 0, y: 0 }), "f");
        __classPrivateFieldSet(this, _Inventory_mouse_delta, new Vector({ x: 0, y: 0 }), "f");
    }
    test(index) {
        if (index >= __classPrivateFieldGet(this, _Inventory_inventory, "f").length) {
            throw new Error("test(index)");
        }
        return __classPrivateFieldGet(this, _Inventory_inventory, "f")[index].getItem() !== null;
    }
    empty(index) {
        return __classPrivateFieldGet(this, _Inventory_inventory, "f")[index].getItem() === null;
    }
    canDrop(index, itemtype) {
        if (__classPrivateFieldGet(this, _Inventory_inventory, "f")[index].itemtype() === Itemtype.ANY) {
            return true;
        }
        return __classPrivateFieldGet(this, _Inventory_inventory, "f")[index].itemtype() === itemtype;
    }
    addSlot(position, itemtype, numEntries = 1, gap = 1) {
        for (let i = 0; i < numEntries; i++) {
            __classPrivateFieldGet(this, _Inventory_inventory, "f").push(new InventoryRect({
                position: new Vector({ x: position.x + i * __classPrivateFieldGet(this, _Inventory_size, "f").x + gap * i, y: position.y }),
                size: __classPrivateFieldGet(this, _Inventory_size, "f"),
                itemtype
            }));
        }
    }
    len() {
        return __classPrivateFieldGet(this, _Inventory_inventory, "f").length;
    }
    add(item) {
        for (let index = 0; index < __classPrivateFieldGet(this, _Inventory_inventory, "f").length; index++) {
            if (this.empty(index) && __classPrivateFieldGet(this, _Inventory_inventory, "f")[index].itemtype() === Itemtype.ANY) {
                __classPrivateFieldGet(this, _Inventory_inventory, "f")[index].setItem(item);
                return true;
            }
        }
        return false;
    }
    set(position, item) {
        __classPrivateFieldGet(this, _Inventory_inventory, "f")[position].setItem(item);
    }
    get(position) {
        return __classPrivateFieldGet(this, _Inventory_inventory, "f")[position].getItem();
    }
    pointInRect(point) {
        for (let index = 0; index < __classPrivateFieldGet(this, _Inventory_inventory, "f").length; index++) {
            if (__classPrivateFieldGet(this, _Inventory_inventory, "f")[index].pointInRect(point)) {
                return index;
            }
        }
        return -1;
    }
    pointInRectDelta(point) {
        let result = Vector.zero();
        for (const rect of __classPrivateFieldGet(this, _Inventory_inventory, "f")) {
            if (rect.pointInRect(point)) {
                result = rect.pointInRectDelta(point);
                break;
            }
        }
        return result;
    }
    update(mousebutton, mouse) {
        var _a;
        __classPrivateFieldSet(this, _Inventory_mouse_position, mouse, "f");
        if (mousebutton === MOUSE.DOWN && __classPrivateFieldGet(this, _Inventory_mouse_down_index, "f") === -1) {
            const hover_index = this.pointInRect(__classPrivateFieldGet(this, _Inventory_mouse_position, "f"));
            if (hover_index > -1) {
                if (this.test(hover_index)) {
                    __classPrivateFieldSet(this, _Inventory_mouse_down_index, hover_index, "f");
                    __classPrivateFieldSet(this, _Inventory_mouse_delta, this.pointInRectDelta(__classPrivateFieldGet(this, _Inventory_mouse_position, "f")), "f");
                }
            }
        }
        if (mousebutton === MOUSE.DOWN && __classPrivateFieldGet(this, _Inventory_mouse_down_index, "f") !== -1) {
            __classPrivateFieldSet(this, _Inventory_tile_index, (_a = this.get(__classPrivateFieldGet(this, _Inventory_mouse_down_index, "f"))) === null || _a === void 0 ? void 0 : _a.tileIndex(), "f");
        }
        if (mousebutton === MOUSE.UP && __classPrivateFieldGet(this, _Inventory_mouse_down_index, "f") !== -1) {
            const new_index = this.pointInRect(__classPrivateFieldGet(this, _Inventory_mouse_position, "f"));
            if (new_index > -1 && new_index !== __classPrivateFieldGet(this, _Inventory_mouse_down_index, "f")) {
                const old_item = this.get(__classPrivateFieldGet(this, _Inventory_mouse_down_index, "f"));
                if (old_item && this.canDrop(new_index, old_item.itemtype())) {
                    if (this.empty(new_index)) {
                        // Move item
                        this.set(new_index, old_item);
                        this.set(__classPrivateFieldGet(this, _Inventory_mouse_down_index, "f"), null);
                    }
                    else {
                        const item_to_swap = this.get(new_index);
                        if (item_to_swap && this.canDrop(__classPrivateFieldGet(this, _Inventory_mouse_down_index, "f"), item_to_swap.itemtype())) {
                            // Swap if possible
                            this.set(new_index, old_item);
                            this.set(__classPrivateFieldGet(this, _Inventory_mouse_down_index, "f"), item_to_swap);
                        }
                    }
                }
            }
            __classPrivateFieldSet(this, _Inventory_mouse_down_index, -1, "f");
            __classPrivateFieldSet(this, _Inventory_tile_index, -1, "f");
        }
    }
    draw() {
        // Draw all inventory slots and items
        for (let index = 0; index < __classPrivateFieldGet(this, _Inventory_inventory, "f").length; index++) {
            const rect = __classPrivateFieldGet(this, _Inventory_inventory, "f")[index];
            __classPrivateFieldGet(this, _Inventory_ctx, "f").fillStyle = `hsl(0, 0%, ${rect.pointInRect(__classPrivateFieldGet(this, _Inventory_mouse_position, "f")) ? 50 : 60}%)`;
            __classPrivateFieldGet(this, _Inventory_ctx, "f").fillRect(rect.position().x, rect.position().y, __classPrivateFieldGet(this, _Inventory_size, "f").x, __classPrivateFieldGet(this, _Inventory_size, "f").y);
            const item = rect.getItem();
            if (item !== null && index !== __classPrivateFieldGet(this, _Inventory_mouse_down_index, "f")) {
                __classPrivateFieldGet(this, _Inventory_ctx, "f").drawImage(__classPrivateFieldGet(this, _Inventory_tileset, "f"), Math.floor(item.tileIndex() % 64) * rect.size().x, Math.floor(item.tileIndex() / 64) * rect.size().y, rect.size().x, rect.size().y, rect.position().x, rect.position().y, rect.size().x, rect.size().y);
                if (item.amount() > 1) {
                    __classPrivateFieldGet(this, _Inventory_ctx, "f").font = "9px Arial";
                    __classPrivateFieldGet(this, _Inventory_ctx, "f").fillStyle = "#000";
                    __classPrivateFieldGet(this, _Inventory_ctx, "f").fillRect(rect.position().x + rect.size().x - 8, rect.position().y + rect.size().y - 9, 8, 9);
                    __classPrivateFieldGet(this, _Inventory_ctx, "f").fillStyle = "#fff";
                    __classPrivateFieldGet(this, _Inventory_ctx, "f").fillText("" + item.amount(), rect.position().x + rect.size().x - 7, rect.position().y + rect.size().y - 1);
                }
            }
        }
        // Draw dragged item
        if (__classPrivateFieldGet(this, _Inventory_tile_index, "f") !== undefined && __classPrivateFieldGet(this, _Inventory_tile_index, "f") > -1) {
            __classPrivateFieldGet(this, _Inventory_ctx, "f").drawImage(__classPrivateFieldGet(this, _Inventory_tileset, "f"), Math.floor(__classPrivateFieldGet(this, _Inventory_tile_index, "f") % 64) * __classPrivateFieldGet(this, _Inventory_size, "f").x, Math.floor(__classPrivateFieldGet(this, _Inventory_tile_index, "f") / 64) * __classPrivateFieldGet(this, _Inventory_size, "f").y, __classPrivateFieldGet(this, _Inventory_size, "f").x, __classPrivateFieldGet(this, _Inventory_size, "f").y, __classPrivateFieldGet(this, _Inventory_mouse_position, "f").x - __classPrivateFieldGet(this, _Inventory_mouse_delta, "f").x, 
            // this.#mouse_position.x - this.#mouse_delta.x,
            __classPrivateFieldGet(this, _Inventory_mouse_position, "f").y - __classPrivateFieldGet(this, _Inventory_mouse_delta, "f").y, __classPrivateFieldGet(this, _Inventory_size, "f").x, __classPrivateFieldGet(this, _Inventory_size, "f").y);
        }
        // Draw infobox
        const inv_index = this.pointInRect(__classPrivateFieldGet(this, _Inventory_mouse_position, "f"));
        if (inv_index > -1 && !this.empty(inv_index)) {
            const item = this.get(inv_index);
            const x = __classPrivateFieldGet(this, _Inventory_mouse_position, "f").x, y = __classPrivateFieldGet(this, _Inventory_mouse_position, "f").y;
            const text = [
                { font: "24px Pirata One", color: "#fff", text: "Qqg" + item.item().name },
                { font: "16px Pirata One", color: "#4a4", text: item.itemtypeString() },
                { font: "4", color: "", text: "" },
                { font: "16px Pirata One", color: "#abf", text: `Damage: ${item.item().damage}` },
                { font: "16px Pirata One", color: "#abf", text: `Protection: ${item.item().protection}` },
                { font: "4", color: "", text: "" },
                { font: "16px Pirata One", color: "#fab", text: `Weight: ${item.item().weight * item.amount()}` }
            ];
            let width = 0, height = 6;
            for (const text_line of text) {
                __classPrivateFieldGet(this, _Inventory_ctx, "f").font = text_line.font;
                __classPrivateFieldGet(this, _Inventory_ctx, "f").fillStyle = text_line.color;
                if (width < __classPrivateFieldGet(this, _Inventory_ctx, "f").measureText(text_line.text).width) {
                    width = __classPrivateFieldGet(this, _Inventory_ctx, "f").measureText(text_line.text).width;
                }
                height += parseInt(text_line.font);
            }
            const info_y = y + 20;
            const padding = 3;
            __classPrivateFieldGet(this, _Inventory_ctx, "f").fillStyle = "#000";
            __classPrivateFieldGet(this, _Inventory_ctx, "f").strokeStyle = "#fff";
            __classPrivateFieldGet(this, _Inventory_ctx, "f").fillRect(x, info_y, width + padding * 2, height + padding * 2);
            __classPrivateFieldGet(this, _Inventory_ctx, "f").strokeRect(x, info_y, width + padding * 2, height + padding * 2);
            let xPos = x + padding, yPos = info_y + 20 + padding;
            for (const text_line of text) {
                __classPrivateFieldGet(this, _Inventory_ctx, "f").font = text_line.font;
                __classPrivateFieldGet(this, _Inventory_ctx, "f").fillStyle = text_line.color;
                __classPrivateFieldGet(this, _Inventory_ctx, "f").fillText(text_line.text, xPos, yPos);
                yPos += parseInt(text_line.font);
            }
            // this.#ctx.font = "16px Pirata One"
            // if (item.itemtype() === ITEMTYPE.WEAPON) {
            //     this.#ctx.fillStyle = "#abf"
            //     this.#ctx.fillText(`Damage: ${item.item().damage}`, x + 2 + 4, y + 22 + 4 + 40)
            // }
        }
    }
}
_Inventory_ctx = new WeakMap(), _Inventory_tileset = new WeakMap(), _Inventory_size = new WeakMap(), _Inventory_inventory = new WeakMap(), _Inventory_mouse_down_index = new WeakMap(), _Inventory_mouse_position = new WeakMap(), _Inventory_mouse_delta = new WeakMap(), _Inventory_tile_index = new WeakMap();
//# sourceMappingURL=inventory.js.map