import { Drop } from './drop'
import { Renderer } from './renderer'


const app = document.getElementById('app')
const renderer = new Renderer()
app?.appendChild(renderer.domElement)

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.draw()

window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.draw()
}

let inkDroppingInterval = 0;

const colors = ["white","black"]
let currentColor = 0

window.onmousedown = (event: MouseEvent) => {
    currentColor = (currentColor + 1) % colors.length
    renderer.drops.push(new Drop(event.offsetX, event.offsetY, 5, colors[currentColor]));
    inkDroppingInterval = setInterval(() => {
        renderer.drops[renderer.drops.length-1].radius += 1
        renderer.draw();
    }, 25)
}

window.onmouseup = ()=>{
    clearInterval(inkDroppingInterval);
}
