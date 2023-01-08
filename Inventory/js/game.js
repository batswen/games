import { Vector } from "./vector.js";
import { Inventory } from "./inventory.js";
import { Item, Itemtype } from "./item.js";
export var Mousebutton;
(function (Mousebutton) {
    Mousebutton[Mousebutton["DOWN"] = 0] = "DOWN";
    Mousebutton[Mousebutton["UP"] = 1] = "UP";
})(Mousebutton || (Mousebutton = {}));
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
if (ctx === null) {
    throw new Error("Kein Zeichenkontext");
}
const size = new Vector(32, 32);
const start_y = 80, delta_y = 33, gap_y = 3;
const start_x = 20, delta_x = 33;
const inventory = new Inventory(ctx, 4, size);
inventory.addSlot(new Vector({ x: start_x + delta_x, y: start_y }), Itemtype.HELMET); // Head
inventory.addSlot(new Vector({ x: start_x, y: start_y + delta_y }), Itemtype.WEAPON); // RArm
inventory.addSlot(new Vector({ x: start_x + delta_x, y: start_y + delta_y }), Itemtype.PLATE); // Body
inventory.addSlot(new Vector({ x: start_x + delta_x * 2, y: start_y + delta_y }), Itemtype.WEAPON); // LArm
inventory.addSlot(new Vector({ x: start_x + delta_x, y: start_y + delta_y * 2 }), Itemtype.LEGGINS); // Legs
inventory.addSlot(new Vector({ x: start_x + delta_x, y: start_y + delta_y * 3 }), Itemtype.BOOTS); // Boots
// First line
inventory.addSlot(new Vector({ x: start_x, y: start_y + delta_y * 4 + gap_y }), Itemtype.ANY, 8, 1);
inventory.addSlot(new Vector({ x: start_x, y: start_y + delta_y * 5 + gap_y }), Itemtype.ANY, 8, 1);
inventory.set(6, new Item(ctx, { index: 0, amount: 1 }));
inventory.add(new Item(ctx, { index: 1, amount: 1 }));
inventory.add(new Item(ctx, { index: 1, amount: 1 }));
inventory.set(0, new Item(ctx, { index: 3, amount: 1 }));
inventory.add(new Item(ctx, { index: 2, amount: 7 }));
inventory.add(new Item(ctx, { index: 4, amount: 1 }));
const mouse = Vector.zero();
let mousebutton = Mousebutton.UP;
function start() {
    canvas.addEventListener("mousemove", event => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });
    canvas.addEventListener("mousedown", event => {
        if (event.button === 0) {
            mousebutton = Mousebutton.DOWN;
        }
    });
    canvas.addEventListener("mouseup", event => {
        if (event.button === 0) {
            mousebutton = Mousebutton.UP;
        }
    });
    requestAnimationFrame(render);
}
function render() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 400);
    // Draw players
    ctx.fillStyle = "grey";
    for (let i = 0; i < 4; i++) {
        ctx.fillRect(i * 64 + i * 8 + 8, 8, 66, 66);
    }
    inventory.update(mousebutton, mouse);
    inventory.draw();
    requestAnimationFrame(render);
}
document.addEventListener("DOMContentLoaded", start);
//# sourceMappingURL=game.js.map