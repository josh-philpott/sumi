import { Drop } from './drop'
import { Renderer } from './renderer'
import { Vector2 } from './vector'
import { Motion } from './motion'

const app = document.getElementById('app')
const renderer = new Renderer()
app?.appendChild(renderer.domElement)

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.draw()

window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.draw()
}


const colors = ["black","white"]//["#D5E6F4","white", "#D4E5BB", "white", "#FFF4B5", "white", "#2B2E2B", "white"]
let currentColor = -1


let mousex = 0;
let mousey = 0;
let isMouseDown = false;

window.onmousemove = (event: MouseEvent) => {
    mousex = event.offsetX
    mousey = event.offsetY
}


// motions that are still running but are not the motion from the active mouse event
let motions: Motion[] = [];

// add friction to motions and handle when they need to be deleted
setInterval(()=>{
    for(let i = 0; i<motions.length; i++){
        // if we're still actively dropping ink, adjust the position to match the mouse
        if(i===0 && isMouseDown){ 
            motions[0].center.x = mousex
            motions[0].center.y = mousey
        }

        // ensure that all motions that aren't the top one have friction enabled
        if(i>0 && !motions[i].frictionEnabled) {
            motions[i].enableFriction()
        }
        
        // stop other motions for now.....
        if(i > 0) {
            motions.splice(i, 1);
            i--
        }
         
        const stopped = motions[i].addFriction()

        if(stopped){
            motions.splice(i, 1)
            i-=1;
        }else{
            for(let drop of renderer.drops){
                drop.inkForce(motions[i].center, motions[i].radius)
            }
        }
    }
    renderer.draw();
}, 50);


window.onmousedown = (e: MouseEvent) => {
    //Add a new drop
    currentColor = (currentColor + 1) % colors.length
    console.log(currentColor)
    
    //create 20 px of mouse jitter
    let xNoise = 10 - Math.floor(Math.random()*20);
    let yNoise = 10 - Math.floor(Math.random()*20);

    // 5px of size jitter
    let sizeJitter = 5 - Math.floor(Math.random()*10);

    

    renderer.drops.push(new Drop(e.offsetX + xNoise, e.offsetY + yNoise, 20+sizeJitter, colors[currentColor]));

    //Create a new motion
    motions.unshift(new Motion(new Vector2(mousex + xNoise, mousey+yNoise), 20+sizeJitter))
    isMouseDown = true;
}

window.onmouseup = ()=>{
    isMouseDown = false;
    if(motions[0]){
        motions[0].enableFriction();
    }
}
