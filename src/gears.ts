import * as PIXI from 'pixi.js';
import { gsap, Linear } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);


const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x999999 });
document.body.appendChild(app.view as HTMLCanvasElement);

const imgSources: string[] = [
    './assets/gear12.png',
    './assets/gear16.png',
    './assets/gear20.png',
    './assets/gear24.png',
    './assets/gear28.png',
    './assets/gear40.png',
    './assets/gearbox.png',
    './assets/speed-fast.png',
    './assets/speed-faster.png',
    './assets/speed-normal.png',
    './assets/speed-paused.png',
]
const sprites = new Map();
const texturePromises = [];
const animations = [];

imgSources.forEach((img) => {
    texturePromises.push(PIXI.Assets.load(img));
})

Promise.all(texturePromises).then((values) => {
    values.forEach((texture) => {
        sprites.set(`${texture.textureCacheIds[0].split('/')[2].split('.')[0]}`, PIXI.Sprite.from(texture));
    })

    onLoad();
})

function onLoad() {
    const gearbox: PIXI.Sprite = sprites.get('gearbox');
    const pauseBtn: PIXI.Sprite = sprites.get('speed-paused');
    const normalBtn: PIXI.Sprite = sprites.get('speed-normal');
    const fastBtn: PIXI.Sprite = sprites.get('speed-fast');
    const fasterBtn: PIXI.Sprite = sprites.get('speed-faster');

    const gear12: PIXI.Sprite = (sprites.get('gear12'));
    const gear16: PIXI.Sprite = (sprites.get('gear16'));
    const gear20: PIXI.Sprite = (sprites.get('gear20'));
    const gear24: PIXI.Sprite = (sprites.get('gear24'));
    const gear28: PIXI.Sprite = (sprites.get('gear28'));
    const gear40: PIXI.Sprite = (sprites.get('gear40'));

    gear12.position.set(300, 117)
    gear16.position.set(542, 471)
    gear20.position.set(212, 441)
    gear24.position.set(676, 388)
    gear28.position.set(142, 130)
    gear40.position.set(400, 300);

    gearbox.position.set(400, 300);

    pauseBtn.position.set(343.5, 301);
    pauseBtn.interactive = true;
    pauseBtn.on('pointertap', pause)

    normalBtn.position.set(380, 301);
    normalBtn.interactive = true;
    normalBtn.on('pointertap', normal)

    fastBtn.position.set(418, 301);
    fastBtn.interactive = true;
    fastBtn.on('pointertap', fast)

    fasterBtn.position.set(456.5, 301);
    fasterBtn.interactive = true;
    fasterBtn.on('pointertap', faster)

    sprites.forEach((sprite) => {
        sprite.anchor.set(0.5);
        app.stage.addChild(sprite);
    })

    animations.push(gsap.to(gear12, { pixi: { rotation: -360 }, duration: 6, repeat: -1, ease: 'none' }))
    animations.push(gsap.to(gear16, { pixi: { rotation: -360 }, duration: 8, repeat: -1, ease: 'none' }))
    animations.push(gsap.to(gear20, { pixi: { rotation: -360 }, duration: 10, repeat: -1, ease: 'none' }))
    animations.push(gsap.to(gear24, { pixi: { rotation: 360 }, duration: 12, repeat: -1, ease: 'none' }))
    animations.push(gsap.to(gear28, { pixi: { rotation: 360 }, duration: 14, repeat: -1, ease: 'none' }))
    animations.push(gsap.to(gear40, { pixi: { rotation: 360 }, duration: 20, repeat: -1, ease: 'none' }))

}

function pause() {
    animations.forEach(anim => {
        anim.pause();
    })
}

function normal() {
    animations.forEach(anim => {
        anim.play();
        anim.timeScale(1);
    })
}

function fast() {
    animations.forEach(anim => {
        anim.play();
        anim.timeScale(2);
    })
}

function faster() {
    animations.forEach(anim => {
        anim.play();
        anim.timeScale(4);
    })
}

declare global {
    interface Window {
        pause: any;
        normal: any;
        fast: any;
        faster: any;
    }
}

window.pause = () => pause();
window.normal = () => normal();
window.fast = () => fast();
window.faster = () => faster();