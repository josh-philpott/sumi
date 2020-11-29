export class Vector2{
    x: number;
    y: number;
    radius: number;
    color: string;    

    constructor(x: number, y:number){
        this.x = x;
        this.y = y;
    }

    add(v: Vector2): Vector2{
        return new Vector2(this.x + v.x, this.y + v.y)
    }

    sub(v: Vector2): Vector2{
        return new Vector2(this.x-v.x, this.y - v.y)
    }

    scale(val: number): Vector2{
        return new Vector2(this.x * val, this.y * val)
    }

    pow(val: number): Vector2{
        return new Vector2(Math.pow(this.x, val), Math.pow(this.y, val))
    }

    abs(): Vector2{
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }

    length(): number{
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}