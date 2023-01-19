import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x999999 });
document.body.appendChild(app.view as HTMLCanvasElement);

const boxesReversed = [false, false, false, false]
const animations = {
    0: { rotation: 360 },
    1: { blur: 10 },
    2: { skewX: 50 },
    3: { tint: 0xff0000 }
}

const sqr0 = createSquare(100, 300, 100, 0);
const sqr1 = createSquare(300, 300, 100, 1);
const sqr2 = createSquare(500, 300, 100, 2);
const sqr3 = createSquare(700, 300, 100, 3);

app.stage.addChild(sqr0, sqr1, sqr2, sqr3);

function createSquare(x, y, size, index): PIXI.Graphics {
    const square = new PIXI.Graphics();

    square.beginFill(0xffffff);
    square.drawRect(x, y, size, size);
    square.endFill();
    square.pivot.set(x + size / 2, y + size / 2);
    square.position.set(x, y);

    square.interactive = true;

    const anim = gsap.to(square, { pixi: animations[index], duration: 1, paused: true });
    square.on('pointertap', () => {
        if (!boxesReversed[index]) {
            anim.play();
            boxesReversed[index] = true;
        } else {
            anim.reverse();
            boxesReversed[index] = false;
        }
    })

    return square;
}