import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x000000 });
document.body.appendChild(app.view as HTMLCanvasElement);

// const box = firework(400, 300, ((Math.random() * 256 | 0) << 16) + ((Math.random() * 256 | 0) << 8) + (Math.random() * 256 | 0));

// app.stage.addChild(box);

function particle(color: number, parent: PIXI.Container) {
    const square = new PIXI.Graphics();
    square.beginFill(0xFFFFFF);
    square.drawRect(0, 0, 4, 4);
    square.pivot.set(parent.x / 2, parent.y / 2);
    gsap.from(square, { pixi: { scale: 0 } });
    gsap.to(square, { pixi: { x: random(-100, 100), y: random(-100, 100), rotation: 1440, scale: 2, blur: 1 }, duration: 2 });
    gsap.to(square, { pixi: { tint: color }, duration: 1 });
    gsap.to(square, { pixi: { tint: 0 }, duration: 1, delay: 1 })

    parent.addChild(square);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function firework(x: number, y: number, color: number) {
    console.log(x, y)
    const box = new PIXI.Container();
    box.position.set(x, y);

    for (let i = 0; i < 100; i++) {
        particle(color, box)
    }

    gsap.to(box, {
        pixi: { y: 100 },
        duration: 2,
        ease: 'power2',
        onComplete: () => { box.destroy() }
    })
    return box;
}

const fireworkSpawner = new PIXI.Graphics();
fireworkSpawner.beginFill(0x000000);
fireworkSpawner.drawRect(0, 0, 800, 600);
fireworkSpawner.endFill();

fireworkSpawner.interactive = true;
fireworkSpawner.on('pointertap', ({ globalX, globalY }) => {
    const color = ((Math.random() * 256 | 0) << 16) + ((Math.random() * 256 | 0) << 8) + (Math.random() * 256 | 0);
    const box = firework(Math.floor(globalX), Math.floor(globalY), color);
    app.stage.addChild(box)
    console.log(app.stage.children)
})

app.stage.addChild(fireworkSpawner);