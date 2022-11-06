import { autoDetectRenderer, Loader, Container, Ticker } from 'pixi.js';
import type { AbstractRenderer } from 'pixi.js';
import { CompositeTilemap } from '@pixi/tilemap';
import wall from './sprites/wall.png';

function makeTilemap(tilemap: CompositeTilemap, resources: Loader['resources']) {
  tilemap.clear();
  const size = 32;

  const pxW = renderer.screen.width;
  const pxH = renderer.screen.height;
  const tileW = pxW / size;
  const tileH = pxH / size;

  const wallTexture = resources.wall.texture;

  if (!wallTexture) {
    throw new Error('Failed to load wall texture');
  }

  for (let i = 0; i < tileW; i++) {
    for (let j = 0; j < tileH; j++) {
      if (Math.random() > 0.8) {
        tilemap.tile(wallTexture, i * size, j * size);
      }
    }
  }
}

function main(renderer: AbstractRenderer) {

  const loader = new Loader();
  loader.add('wall', wall);

  loader.load((_, resources) => {
    const stage = new Container();
    const tilemap = new CompositeTilemap();
    stage.addChild(tilemap);
  
    Ticker.shared.add(() => renderer.render(stage));
  
    makeTilemap(tilemap, resources);
  });
}

const renderer = autoDetectRenderer({
  antialias: true,
  autoDensity: true,
  resolution: window.devicePixelRatio || 1,
  width: 800,
  height: 600,
});

document.body.appendChild(renderer.view as HTMLCanvasElement);

main(renderer);
