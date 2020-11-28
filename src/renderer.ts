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

    draw(){
        //background
        this.ctx.fillStyle = "white"
        this.ctx.fillRect(0,0,this.domElement.width, this.domElement.height)

        for(const drop of this.drops){
            this.ctx.beginPath();
            this.ctx.arc(drop.x, drop.y, drop.radius, 0, 2*Math.PI);
            this.ctx.fillStyle = drop.color;
            this.ctx.fill()
        }
    }
}