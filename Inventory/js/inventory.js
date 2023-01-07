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
var _Item_name, _Item_tile_index, _Item_itemtype, _Item_amount, _InventoryRect_position, _InventoryRect_size, _InventoryRect_content, _InventoryRect_itemtype, _Inventory_ctx, _Inventory_tileset, _Inventory_size, _Inventory_inventory, _Inventory_mouse_index, _Inventory_mouse_position, _Inventory_mouse_delta, _Inventory_tile_index;
import { MOUSE } from "./game.js";
import { Vector } from "./vector.js";
export const ITEMTYPE = {
    UNKNOWN: "UNKNOWN",
    ANY: "ANY",
    MISC: "MISC",
    HELMET: "HELMET",
    PLATE: "PLATE",
    LEGGINS: "LEGGINS",
    BOOTS: "BOOTS",
    WEAPON: "WEAPON"
};
export class Item {
    constructor({ name, tile_index, itemtype, amount }) {
        _Item_name.set(this, void 0);
        _Item_tile_index.set(this, void 0);
        _Item_itemtype.set(this, void 0);
        _Item_amount.set(this, void 0);
        __classPrivateFieldSet(this, _Item_name, name, "f");
        __classPrivateFieldSet(this, _Item_tile_index, tile_index, "f");
        __classPrivateFieldSet(this, _Item_itemtype, itemtype, "f");
        __classPrivateFieldSet(this, _Item_amount, amount, "f");
    }
    name() { return __classPrivateFieldGet(this, _Item_name, "f"); }
    tileIndex() { return __classPrivateFieldGet(this, _Item_tile_index, "f"); }
    itemtype() { return __classPrivateFieldGet(this, _Item_itemtype, "f"); }
    amount() { return __classPrivateFieldGet(this, _Item_amount, "f"); }
}
_Item_name = new WeakMap(), _Item_tile_index = new WeakMap(), _Item_itemtype = new WeakMap(), _Item_amount = new WeakMap();
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
    set(item) {
        __classPrivateFieldSet(this, _InventoryRect_content, item, "f");
    }
    content() {
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
        _Inventory_mouse_index.set(this, void 0);
        _Inventory_mouse_position.set(this, void 0);
        _Inventory_mouse_delta.set(this, void 0);
        _Inventory_tile_index.set(this, void 0);
        __classPrivateFieldSet(this, _Inventory_ctx, ctx, "f");
        __classPrivateFieldSet(this, _Inventory_tileset, tileset, "f");
        __classPrivateFieldSet(this, _Inventory_size, size, "f");
        __classPrivateFieldSet(this, _Inventory_inventory, [], "f");
        __classPrivateFieldSet(this, _Inventory_mouse_index, -1, "f");
        __classPrivateFieldSet(this, _Inventory_tile_index, -1, "f");
        __classPrivateFieldSet(this, _Inventory_mouse_position, new Vector({ x: 0, y: 0 }), "f");
        __classPrivateFieldSet(this, _Inventory_mouse_delta, new Vector({ x: 0, y: 0 }), "f");
    }
    test(index) {
        if (index >= __classPrivateFieldGet(this, _Inventory_inventory, "f").length) {
            throw new Error("test(index)");
        }
        return __classPrivateFieldGet(this, _Inventory_inventory, "f")[index].content() !== null;
    }
    empty(index) {
        return __classPrivateFieldGet(this, _Inventory_inventory, "f")[index].content() === null;
    }
    canDrop(index, itemtype) {
        if (__classPrivateFieldGet(this, _Inventory_inventory, "f")[index].itemtype() === ITEMTYPE.ANY) {
            return true;
        }
        return __classPrivateFieldGet(this, _Inventory_inventory, "f")[index].itemtype() === itemtype;
    }
    add(position, itemtype, numEntries = 1, gap = 1) {
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
    set(position, item) {
        __classPrivateFieldGet(this, _Inventory_inventory, "f")[position].set(item);
    }
    get(position) {
        return __classPrivateFieldGet(this, _Inventory_inventory, "f")[position].content();
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
        if (mousebutton === MOUSE.DOWN && __classPrivateFieldGet(this, _Inventory_mouse_index, "f") === -1) {
            const hover_index = this.pointInRect(mouse);
            if (hover_index > -1) {
                if (this.test(hover_index)) {
                    __classPrivateFieldSet(this, _Inventory_mouse_index, hover_index, "f");
                    __classPrivateFieldSet(this, _Inventory_mouse_delta, this.pointInRectDelta(mouse), "f");
                }
            }
        }
        if (mousebutton === MOUSE.DOWN && __classPrivateFieldGet(this, _Inventory_mouse_index, "f") !== -1) {
            __classPrivateFieldSet(this, _Inventory_tile_index, (_a = this.get(__classPrivateFieldGet(this, _Inventory_mouse_index, "f"))) === null || _a === void 0 ? void 0 : _a.tileIndex(), "f");
        }
        if (mousebutton === MOUSE.UP && __classPrivateFieldGet(this, _Inventory_mouse_index, "f") !== -1) {
            const new_index = this.pointInRect(mouse);
            if (new_index > -1 && new_index !== __classPrivateFieldGet(this, _Inventory_mouse_index, "f")) {
                const old_item = this.get(__classPrivateFieldGet(this, _Inventory_mouse_index, "f"));
                if (old_item && this.canDrop(new_index, old_item.itemtype())) {
                    if (this.empty(new_index)) {
                        // Move item
                        this.set(new_index, old_item);
                        this.set(__classPrivateFieldGet(this, _Inventory_mouse_index, "f"), null);
                    }
                    else {
                        const item_to_swap = this.get(new_index);
                        if (item_to_swap && this.canDrop(__classPrivateFieldGet(this, _Inventory_mouse_index, "f"), item_to_swap.itemtype())) {
                            // Swap if possible
                            this.set(new_index, old_item);
                            this.set(__classPrivateFieldGet(this, _Inventory_mouse_index, "f"), item_to_swap);
                        }
                    }
                }
            }
            __classPrivateFieldSet(this, _Inventory_mouse_index, -1, "f");
            __classPrivateFieldSet(this, _Inventory_tile_index, -1, "f");
        }
    }
    draw() {
        // Draw all inventory slots and items
        for (const rect of __classPrivateFieldGet(this, _Inventory_inventory, "f")) {
            __classPrivateFieldGet(this, _Inventory_ctx, "f").fillStyle = `hsl(0, 0%, ${rect.pointInRect(__classPrivateFieldGet(this, _Inventory_mouse_position, "f")) ? 50 : 60}%)`;
            __classPrivateFieldGet(this, _Inventory_ctx, "f").fillRect(rect.position().x, rect.position().y, __classPrivateFieldGet(this, _Inventory_size, "f").x, __classPrivateFieldGet(this, _Inventory_size, "f").y);
            const item = rect.content();
            if (item !== null) {
                __classPrivateFieldGet(this, _Inventory_ctx, "f").drawImage(__classPrivateFieldGet(this, _Inventory_tileset, "f"), Math.floor(item.tileIndex() % 64) * rect.size().x, Math.floor(item.tileIndex() / 64) * rect.size().y, rect.size().x, rect.size().y, rect.position().x, rect.position().y, rect.size().x, rect.size().y);
                if (item.amount() > 1) {
                    __classPrivateFieldGet(this, _Inventory_ctx, "f").fillStyle = "#000";
                    __classPrivateFieldGet(this, _Inventory_ctx, "f").fillRect(rect.position().x + rect.size().x - 8, rect.position().y + rect.size().y - 9, 8, 9);
                    __classPrivateFieldGet(this, _Inventory_ctx, "f").fillStyle = "#fff";
                    __classPrivateFieldGet(this, _Inventory_ctx, "f").fillText("" + item.amount(), rect.position().x + rect.size().x - 7, rect.position().y + rect.size().y - 1);
                }
            }
        }
        // Draw dragged item
        if (__classPrivateFieldGet(this, _Inventory_tile_index, "f") !== undefined && __classPrivateFieldGet(this, _Inventory_tile_index, "f") > -1) {
            __classPrivateFieldGet(this, _Inventory_ctx, "f").drawImage(__classPrivateFieldGet(this, _Inventory_tileset, "f"), Math.floor(__classPrivateFieldGet(this, _Inventory_tile_index, "f") % 64) * __classPrivateFieldGet(this, _Inventory_size, "f").x, Math.floor(__classPrivateFieldGet(this, _Inventory_tile_index, "f") / 64) * __classPrivateFieldGet(this, _Inventory_size, "f").y, __classPrivateFieldGet(this, _Inventory_size, "f").x, __classPrivateFieldGet(this, _Inventory_size, "f").y, __classPrivateFieldGet(this, _Inventory_mouse_position, "f").x - __classPrivateFieldGet(this, _Inventory_mouse_delta, "f").x, __classPrivateFieldGet(this, _Inventory_mouse_position, "f").y - __classPrivateFieldGet(this, _Inventory_mouse_delta, "f").y, __classPrivateFieldGet(this, _Inventory_size, "f").x, __classPrivateFieldGet(this, _Inventory_size, "f").y);
        }
    }
}
_Inventory_ctx = new WeakMap(), _Inventory_tileset = new WeakMap(), _Inventory_size = new WeakMap(), _Inventory_inventory = new WeakMap(), _Inventory_mouse_index = new WeakMap(), _Inventory_mouse_position = new WeakMap(), _Inventory_mouse_delta = new WeakMap(), _Inventory_tile_index = new WeakMap();
//# sourceMappingURL=inventory.js.map