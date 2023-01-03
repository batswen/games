export class Rectangle {
    ctx
    position
    size
    constructor(ctx, { position, size }) {
        this.ctx = ctx
        this.position = position
        this.size = size
    }
    update() {}
    pointInRect(point) {
        return point.x >= this.position.x && point.x < this.position.x + this.size.x &&
        point.y >= this.position.y && point.y < this.position.y + this.size.y
    }
    rectsOverlap(other) {
        return this.position.x + this.size.x > other.position.x && other.position.x + other.size.x > this.position.x &&
        this.position.y + this.size.y > other.position.y && other.position.y + other.size.y > this.position.y
    }
    draw() {
        this.ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y)
    }
}