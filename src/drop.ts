import { Vector2 } from './vector'

const NUM_POINTS = 200;
const FRICTION_FACTOR = 1
export class Drop{
    x: number;
    y: number;
    radius: number;

    points: Vector2[];
    color: string;   

    private originalRadius: number;
    private friction: number;
    private frictionEnabled: Boolean;
    
    // Cache the path if it hasn't changed
    private dirty: Boolean;
    private cached_path: Path2D;

    constructor(x: number, y:number, radius:number, color: string){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.points = [];

        this.originalRadius = radius;
        this.friction = 20;
        this.frictionEnabled = false;

        this.initializePoints()
    }

    initializePoints(){
        for(let i=0; i<NUM_POINTS; i++){
            const theta = ((2 * Math.PI) / NUM_POINTS) * i // points spaced evenly between 0 and 2PI
            const xPos = this.x + this.radius * Math.cos(theta)
            const yPos = this.y + this.radius* Math.sin(theta)
            const point = new Vector2(xPos, yPos)
            this.points.push(point)
        }
    }

    /**
     * The Ink Force is the force applied to other points based on
     * ink being added to the water. 
     * 
     * See Lu, et al. 3.1.1, Ink Drop Function
     * 
     * @param center Vector2 representing the center point of the new ink drop being applied
     * @param radius radius of the drop
     */
    addInkForce(drop:Drop){
        const center = new Vector2(drop.x, drop.y);
        const radius = drop.radius;

        const radius2 = Math.pow(radius, 2)
        for(let x = 0; x<this.points.length; x++){
            let oldPoint = this.points[x]
            const pointDir = oldPoint.sub(center)
            const factor = Math.sqrt(1 + (radius2 /Math.pow(pointDir.length(),2)));
            const newPoint = center.add(pointDir.scale(factor));
            this.points[x] = newPoint

            if(oldPoint.x !== newPoint.x || oldPoint.y !== newPoint.y){
                this.dirty = true;
            }
        }
    }

    getPath(): Path2D{
        if(!this.dirty){
            return this.cached_path;
        }

        const path = new Path2D()

        for(const point of this.points){
            path.lineTo(point.x, point.y)
        }
        path.closePath()

        this.cached_path = path;
        this.dirty = false;

        return path
    }

    getPoints(): Path2D[]{
        const paths: Path2D[] = [];
        for(const point of this.points){
            const path = new Path2D();
            path.rect(point.x, point.y, 2, 2);
            paths.push(path);
        }
        return paths;
    }

    
    // -------------   Friction forces   ----------------------
    addFriction(): Boolean{
        if(this.frictionEnabled){
            this.friction += FRICTION_FACTOR;
            const percentOfOriginal = (100-this.friction)

            if(percentOfOriginal<=0){
                return true;
            }else{
                this.radius = this.originalRadius * (percentOfOriginal * .01)
            }
        }
        return false
    }

    enableFriction(){
        this.frictionEnabled = true;
    }
}