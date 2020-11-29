
import { Vector2 } from './vector';

const FRICTION_FACTOR = 1

export class Motion{
    frictionEnabled: Boolean;
    radius: number; //radius constant of the motion
    center: Vector2;

    private originalRadius: number;
    private friction: number
   
    constructor(center: Vector2, radius:number){
        this.center = center;
        this.radius = radius;
        this.originalRadius = radius;
        this.frictionEnabled = false;

        this.friction = 20; 
    }

    //returns true if the motion has stopped
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


// P = existing point
// C = center of paint drop
// r = radius