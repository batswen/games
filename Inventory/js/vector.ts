export interface IVector {
    x: number
    y: number
}

export class Vector {
    x: number
    y: number

    constructor(arg: IVector);
    constructor(x: number, y: number);

    constructor(...args: any[]) {
        if (args.length === 1) {
            this.x = args[0].x
            this.y = args[0].y
        } else {
            this.x = args[0]
            this.y = args[1]
        }
    }
    static zero(): Vector {
        return new Vector({ x: 0, y: 0 })
    }
    add(arg: number | IVector) {
        if (arg instanceof Vector) {
            this.x += arg.x
            this.y += arg.y
        } else if (typeof arg === "number") {
            this.x += arg
            this.y += arg
        }
        return this
    }
    sub(arg: number | IVector) {
        if (arg instanceof Vector) {
            this.x -= arg.x
            this.y -= arg.y
        } else if (typeof arg === "number") {
            this.x -= arg
            this.y -= arg
        }
        return this
    }
    mult(arg: number | IVector) {
        if (arg instanceof Vector) {
            this.x *= arg.x
            this.y *= arg.y
        } else if (typeof arg === "number") {
            this.x *= arg
            this.y *= arg
        }
        return this
    }
    normalize() {
        this.mult(1 / this.magnitude())
        return this
    }
    magnitude() {
        // return Math.sqrt(this.x * this.x + this.y * this.y)
        return Math.hypot(this.x, this.y)
    }
    distance(arg: Vector) {
        return arg.copy().sub(this).magnitude()
    }
    angle() {
        return Math.atan2(this.y, this.x) * 180 / Math.PI + 90
    }
    copy() {
        return new Vector({ x: this.x, y: this.y })
    }
    equal(other: IVector) {
        return this.x === other.x && this.y === other.y
    }
    static fromAngle(angle: number, len: number) {
        if (!len) {
            len = 1
        }
        angle -= Math.PI / 2
        return new Vector({ x: Math.cos(angle), y: Math.sin(angle) })
    }
    toString() {
        // return "" + this.x + ", " + this.y
        return `Vector({ x: ${this.x}, y: ${this.y}})`
    }
}
