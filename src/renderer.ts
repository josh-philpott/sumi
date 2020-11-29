import { Drop } from './drop'

export class Renderer{
    domElement: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    drops: Drop[];

    constructor(){
        this.domElement = document.createElement("canvas")
        this.ctx = this.domElement.getContext("2d")
        this.drops = []
    }

    setSize(width: number, height:number){
        this.domElement.width = width;
        this.domElement.height = height;
    }

    draw(particles_enabled:boolean){
        //fillbackground
        this.ctx.fillStyle = "white"
        this.ctx.fillRect(0,0,this.domElement.width, this.domElement.height)

        //draw points
        for(const drop of this.drops){
            let path = drop.getPath();
            this.ctx.fillStyle = drop.color;
            this.ctx.fill(path)

            if(particles_enabled){
                const points = drop.getPoints();
                for(let point of points){
                    this.ctx.fillStyle = "red";
                    this.ctx.fill(point)
                }
            }
        }
    }
}