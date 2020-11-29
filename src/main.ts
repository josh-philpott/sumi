import { Drop } from './drop'
import { Renderer } from './renderer'

// can be set in the console to view particles
let ENABLE_PARTICLES = false;

const app = document.getElementById('app')
const renderer = new Renderer()
app?.appendChild(renderer.domElement)

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.draw(ENABLE_PARTICLES)

window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.draw(ENABLE_PARTICLES)
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
let currentDrop: Drop;

// add friction to motions and handle when they need to be deleted
setInterval(()=>{
    if(currentDrop){
        const startTime = Date.now();

        // if the mouse is being held down, make sure the center of the motion
        // is the current mouse position
        if(isMouseDown){
            currentDrop.x = mousex;
            currentDrop.y = mousey;
        }

        // when friction is enabled, add friction will reduce the speed of the 
        // motion until the motion stops. 
        const stopped = currentDrop.addFriction()

        // if there's motion, add the ink force to all drops
        if(stopped) currentDrop = null;
        else{
            for(let drop of renderer.drops){
                drop.addInkForce(currentDrop)
            }
        }
        renderer.draw(ENABLE_PARTICLES);

        const endTime = Date.now();
        console.debug(`Frame computed in ${endTime - startTime} millis.`)
    }
}, 15);


window.onmousedown = (e: MouseEvent) => {

    //Add a new drop
    currentColor = (currentColor + 1) % colors.length
    console.log(currentColor)
    
    //create 20 px of mouse jitter
    let xNoise = 10 - Math.floor(Math.random()*20);
    let yNoise = 10 - Math.floor(Math.random()*20);

    // 5px of size jitter
    let sizeJitter = 5 - Math.floor(Math.random()*10);

    
    currentDrop = new Drop(e.offsetX + xNoise, e.offsetY + yNoise, 20+sizeJitter, colors[currentColor])
    renderer.drops.push(currentDrop);

    isMouseDown = true;
}

window.onmouseup = ()=>{
    isMouseDown = false;
    if(currentDrop) currentDrop.enableFriction();
}
