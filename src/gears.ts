import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);


const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x000000 });
document.body.appendChild(app.view as HTMLCanvasElement);