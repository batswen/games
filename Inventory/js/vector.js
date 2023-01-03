export class Vector {
    constructor(arg) {
        this.x = arg.x;
        this.y = arg.y;
    }
    static zero() {
        return new Vector({ x: 0, y: 0 });
    }
    add(arg) {
        if (arg instanceof Vector) {
            this.x += arg.x;
            this.y += arg.y;
        }
        else if (typeof arg === "number") {
            this.x += arg;
            this.y += arg;
        }
        return this;
    }
    sub(arg) {
        if (arg instanceof Vector) {
            this.x += arg.x;
            this.y += arg.y;
        }
        else if (typeof arg === "number") {
            this.x += arg;
            this.y += arg;
        }
        return this;
    }
    mult(arg) {
        if (arg instanceof Vector) {
            this.x += arg.x;
            this.y += arg.y;
        }
        else if (typeof arg === "number") {
            this.x += arg;
            this.y += arg;
        }
        return this;
    }
    normalize() {
        this.mult(1 / this.getMagnitude());
        return this;
    }
    getMagnitude() {
        // return Math.sqrt(this.x * this.x + this.y * this.y)
        return Math.hypot(this.x, this.y);
    }
    getDistance(arg) {
        return arg.copy().sub(this).getMagnitude();
    }
    getAngle() {
        return Math.atan2(this.y, this.x) * 180 / Math.PI + 90;
    }
    copy() {
        return new Vector({ x: this.x, y: this.y });
    }
    equal(other) {
        return this.x === other.x && this.y === other.y;
    }
    static fromAngle(angle, len) {
        if (!len) {
            len = 1;
        }
        angle -= Math.PI / 2;
        return new Vector({ x: Math.cos(angle), y: Math.sin(angle) });
    }
    toString() {
        // return "" + this.x + ", " + this.y
        return `Vector({${this.x}, ${this.y}})`;
    }
}
//# sourceMappingURL=vector.js.map