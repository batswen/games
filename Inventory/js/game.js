import { Vector } from "./vector.js";
import { Inventory } from "./inventory.js";
import { Item, Itemtype } from "./item.js";
export const MOUSE = {
    DOWN: "DOWN",
    UP: "UP"
};
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
if (ctx === null) {
    throw new Error("Kein Zeichenkontext");
}
const tileset = new Image();
tileset.src = location.pathname + "img/tileset.png";
// tileset.src = "../img/tileset.png"
const size = new Vector({ x: 32, y: 32 });
const inventory = new Inventory(ctx, tileset, size);
inventory.addSlot(new Vector({ x: 43, y: 17 }), Itemtype.HELMET); // Head
inventory.addSlot(new Vector({ x: 10, y: 50 }), Itemtype.WEAPON); // RArm
inventory.addSlot(new Vector({ x: 43, y: 50 }), Itemtype.PLATE); // Body
inventory.addSlot(new Vector({ x: 76, y: 50 }), Itemtype.WEAPON); // LArm
inventory.addSlot(new Vector({ x: 43, y: 50 + 32 + 1 }), Itemtype.LEGGINS); // Legs
inventory.addSlot(new Vector({ x: 43, y: 50 + 64 + 2 }), Itemtype.BOOTS); // Boots
// First line
inventory.addSlot(new Vector({ x: 10, y: 160 }), Itemtype.ANY, 9, 1);
inventory.addSlot(new Vector({ x: 10, y: 160 + 32 + 1 }), Itemtype.ANY, 9, 1);
inventory.addSlot(new Vector({ x: 10, y: 160 + 64 + 2 }), Itemtype.ANY, 9, 1);
inventory.set(6, new Item({ index: 0, amount: 1 }));
inventory.add(new Item({ index: 1, amount: 1 }));
inventory.add(new Item({ index: 1, amount: 1 }));
inventory.add(new Item({ index: 2, amount: 1 }));
const mouse = Vector.zero();
let mousebutton = MOUSE.UP, mouse_index = -1, mouse_delta = new Vector({ x: 0, y: 0 }), mouse_inventory = -1;
// let current_tile = null
function start() {
    canvas.addEventListener("mousemove", event => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });
    canvas.addEventListener("mousedown", event => {
        if (event.button === 0) {
            mousebutton = MOUSE.DOWN;
        }
    });
    canvas.addEventListener("mouseup", event => {
        if (event.button === 0) {
            mousebutton = MOUSE.UP;
        }
    });
    requestAnimationFrame(render);
}
function render() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 400);
    inventory.update(mousebutton, mouse);
    inventory.draw();
    requestAnimationFrame(render);
}
document.addEventListener("DOMContentLoaded", start);
//# sourceMappingURL=game.js.map