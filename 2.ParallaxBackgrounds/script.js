const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 5;
let gameFrame = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = './assets/backgroundLayers/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './assets/backgroundLayers/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './assets/backgroundLayers/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './assets/backgroundLayers/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = './assets/backgroundLayers/layer-5.png';

// Técnica 1
// let x = 0;
// let x2 = 2400;

const slider = document.getElementById('slider');
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change', (e) => {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
})

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;

        // Técnica 2 clases con dos variables
        // this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;

        // Técnica 2 clases con 2 variables
        // if(this.x <= -this.width){
        //     this.x = this.width + this.x2 - this.speed;
        // }

        // if(this.x2 <= -this.width){
        //     this.x2 = this.width + this.x - this.speed;
        // }
        // this.x2 = Math.floor(this.x2 - this.speed);

        // Técnica 3 una sola variable
        // if (this.x <= -this.width) {
        //     this.x = 0;
        // }
        // this.x = Math.floor(this.x - this.speed);

        // Ténica 4 residuo
        this.x = gameFrame * this.speed % this.width;
        // console.log(this.x);
        
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        // Técnica 3 una sola variable
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);

        // Técnica 2
        // ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects = [
    layer1,
    layer2,
    layer3,
    layer4,
    layer5
];

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Técnica 1
    // ctx.drawImage(backgroundLayer4, x ,0);
    // ctx.drawImage(backgroundLayer4, x2, 0);
    // if(x < -2400) x = 2400 + x2 - gameSpeed;
    // else x -= gameSpeed;
    // if(x2 < -2400) x2 = 2400 + x - gameSpeed;
    // else x2 -= gameSpeed;

    // Técnica 2 - clases
    gameObjects.forEach(layer => {
        layer.update();
        layer.draw();
    })

    // Técnica 4 residuo
    gameFrame--;

    requestAnimationFrame(animate);
}

animate();