import { Vector } from "./vector.js"
import { Inventory, Item, ITEMTYPE } from "./inventory.js"

const MOUSE = {
    DOWN: "DOWN",
    UP: "UP"
}

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D
if (ctx === null) {
    throw new Error("Kein Zeichenkontext")
}
const tileset = new Image()
tileset.src = "../img/tileset.png"

const size = new Vector({ x: 32, y: 32 })

const inventory = new Inventory(ctx, tileset, size)
inventory.add(new Vector({ x: 43, y: 17 }), ITEMTYPE.HELMET) // Head
inventory.add(new Vector({ x: 10, y: 50 }), ITEMTYPE.WEAPON) // RArm
inventory.add(new Vector({ x: 43, y: 50 }), ITEMTYPE.PLATE) // Body
inventory.add(new Vector({ x: 76, y: 50 }), ITEMTYPE.WEAPON) // LArm
inventory.add(new Vector({ x: 43, y: 50 + 32 + 1 }), ITEMTYPE.LEGGINS) // Legs
inventory.add(new Vector({ x: 43, y: 50 + 64 + 2 }), ITEMTYPE.BOOTS) // Boots
// First line
inventory.add(new Vector({ x: 10, y: 160 }), ITEMTYPE.ANY, 9, 1)
inventory.add(new Vector({ x: 10, y: 160 + 32 + 1 }), ITEMTYPE.ANY, 9, 1)
inventory.add(new Vector({ x: 10, y: 160 + 64 + 2 }), ITEMTYPE.ANY, 9, 1)

inventory.set(0, new Item({ tileIndex: 8 + 21 * 64, name: "Helmet +1", itemtype: ITEMTYPE.HELMET, amount: 1 }))
inventory.set(2, new Item({ tileIndex: 33 + 21 * 64, name: "PLate +3", itemtype: ITEMTYPE.PLATE, amount: 1 }))
inventory.set(6, new Item({ tileIndex: 10 + 25 * 64, name: "Sword +1", itemtype: ITEMTYPE.WEAPON, amount: 1 }))
inventory.set(7, new Item({ tileIndex: 3 + 24 * 64, name: "Scoll blue", itemtype: ITEMTYPE.MISC, amount: 7 }))
inventory.set(16, new Item({ tileIndex: 9 + 25 * 64, name: "Sword +3", itemtype: ITEMTYPE.WEAPON, amount: 1 }))

// const mouseImage = new Image(), ; mouseImage.src = "./img/arrow.png"
const mouse = Vector.zero()

let mousebutton = MOUSE.UP, mouse_index: number = -1, mouse_delta: Vector = new Vector({ x: 0, y: 0 }), mouse_inventory: number = -1
// let current_tile = null

function start() {
    canvas.addEventListener("mousemove", event => {
        const rect = canvas.getBoundingClientRect(); mouse.x = event.clientX - rect.left; mouse.y = event.clientY - rect.top
    })
    canvas.addEventListener("mousedown", event => {
        if (event.button === 0) {
            mousebutton = MOUSE.DOWN
        }
    })
    canvas.addEventListener("mouseup", event => {
        if (event.button === 0) {
            mousebutton = MOUSE.UP
        }
    })
    requestAnimationFrame(render)
}

function render() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, 400, 400)
    
    inventory.draw(mouse)

    if (mousebutton === MOUSE.DOWN && mouse_index === -1) {
        const hover_index = inventory.pointInRect(mouse)
        if (hover_index > -1) {
            if (inventory.test(hover_index)) {
                mouse_index = hover_index
                mouse_delta = inventory.pointInRectDelta(mouse)
            }
        }
    }

    if (mousebutton === MOUSE.DOWN && mouse_index !== -1) {
        const tileIndex = inventory.get(mouse_index)?.tileIndex()
        if (tileIndex) {
            drawTile({
                position: new Vector({
                    x: mouse.x - mouse_delta.x,
                    y: mouse.y - mouse_delta.y
                }),
                size,
                tileIndex
            })
        }
    }

    if (mousebutton === MOUSE.UP && mouse_index !== -1) {
        const new_index = inventory.pointInRect(mouse)
        if (new_index > -1 && new_index !== mouse_index) {
            const old_item = inventory.get(mouse_index)

            if (old_item && inventory.canDrop(new_index, old_item.itemtype())) {
                if (inventory.empty(new_index)) {
                    // Move item
                    inventory.set(new_index, old_item)
                    inventory.set(mouse_index, null)
                } else {
                    const item_to_swap = inventory.get(new_index)
                    if (item_to_swap && inventory.canDrop(mouse_index, item_to_swap.itemtype())) {
                        // Swap if possible
                        inventory.set(new_index, old_item)
                        inventory.set(mouse_index, item_to_swap)
                    }
                }
            }
        }
        mouse_index = -1
    }

    requestAnimationFrame(render)
}

interface IdrawTile {
    position: Vector
    size: Vector
    tileIndex: number
}

function drawTile({position, size, tileIndex}: IdrawTile) {
    ctx.drawImage(
        tileset,
        Math.floor(tileIndex % 64) * size.x,
        Math.floor(tileIndex / 64) * size.y,
        size.x, size.y,
        position.x, position.y,
        size.x, size.y
    )
}

document.addEventListener("DOMContentLoaded", start)
