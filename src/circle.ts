import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x999999 });
document.body.appendChild(app.view as HTMLCanvasElement);

const circle1 = createCircle(100, 100, 50, 0x000000);
const circle2 = createCircle(100, 300, 50, 0x000000);
const circle3 = createCircle(100, 500, 50, 0x000000);
app.stage.addChild(circle1, circle2, circle3);

gsap.to(circle1, { pixi: { x: 600 }, duration: 2, delay: 1 });
gsap.to(circle1, { pixi: { scale: 1.5 }, duration: 1, delay: 1 });
gsap.to(circle1, { pixi: { scale: 1 }, duration: 1, delay: 2 });

gsap.to(circle2, { pixi: { x: 600 }, duration: 2, delay: 1, ease: 'linear' });
gsap.to(circle2, { pixi: { scale: 1.5 }, duration: 1, delay: 1, ease: 'elastic' });
gsap.to(circle2, { pixi: { scale: 1 }, duration: 1, delay: 2, ease: 'elastic' });

gsap.to(circle3, { pixi: { x: 600 }, duration: 2, delay: 1, ease: 'sine' });
gsap.to(circle3, { pixi: { scale: 1.5 }, duration: 1, delay: 1, ease: 'bounce' });
gsap.to(circle3, { pixi: { scale: 1 }, duration: 1, delay: 2, ease: 'bounce' });


function createCircle(x, y, r, color): PIXI.Graphics {
    const circle = new PIXI.Graphics();
    circle.beginFill(color);
    circle.drawCircle(x, y, r);
    circle.endFill();

    return circle;
}