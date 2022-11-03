import{ Application, Sprite } from 'pixi.js';
import test from './sprites/test.png';

const app = new Application({ width: 640, height: 360 });

const sprite = Sprite.from(test);
app.stage.addChild(sprite);

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;
  sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});

document.body.appendChild(app.view as HTMLCanvasElement);