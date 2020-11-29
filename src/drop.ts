import { Vector2 } from './vector'
const NUM_POINTS = 200;
export class Drop{
    x: number;
    y: number;
    radius: number;
    points: Vector2[];
    color: string;    

    constructor(x: number, y:number, radius:number, color: string){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.points = [];

        this.setInitialPoints()
    }

    setInitialPoints(){
        for(let i=0; i<NUM_POINTS; i++){
            const theta = ((2 * Math.PI) / NUM_POINTS) * i // points spaced evenly between 0 and 2PI
            const xPos = this.x + this.radius * Math.cos(theta)
            const yPos = this.y + this.radius* Math.sin(theta)
            const point = new Vector2(xPos, yPos)
            this.points.push(point)
        }
    }

    inkForce(center: Vector2, radius: number){
        var radius2 = Math.pow(radius, 2)
        
        for(let x = 0; x<this.points.length; x++){
            let oldPoint = this.points[x]
            const pointDir = oldPoint.sub(center)
            const factor = Math.sqrt(1 + (radius2 /Math.pow(pointDir.length(),2)));
            const newPoint = center.add(pointDir.scale(factor));
            this.points[x] = newPoint
        }
    }
}