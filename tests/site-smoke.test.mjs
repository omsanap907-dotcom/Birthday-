import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');
function inlineScripts(html) {
  return [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map((match) => match[1]).filter((script) => script.trim());
}
test('birthday homepage keeps its core interactions and game link', async () => {
  const html = await read('../index.html');
  for (const marker of ['id="surpriseBtn"', 'id="cake"', 'id="giftBtn"', 'id="wishText"', 'id="balloon-game"', 'id="monkey-game-promo"', 'href="./monkey-game.html"', 'Vasundhara']) {
    assert.ok(html.includes(marker), `Missing homepage feature: ${marker}`);
  }
  assert.match(html, /<meta name="viewport"/i);
  assert.ok(inlineScripts(html).length > 0, 'Homepage should contain its interactive script');
  for (const script of inlineScripts(html)) assert.doesNotThrow(() => new vm.Script(script), 'Homepage inline JavaScript should parse');
});
test('monkey game includes Vasundhara branding, time-based difficulty and core mechanics', async () => {
  const html = await read('../monkey-game.html');
  for (const marker of ['Vasundhara', 'id="game"', 'id="score"', 'id="lives"', 'id="best"', 'id="start"', 'id="jump"', 'id="pause"', 'localStorage.setItem', 'function togglePause', 'function endGame', 'score/35', 'speed=Math.min(650,250+worldTime*3.5+score*18)', 'Back to the birthday surprise']) {
    assert.ok(html.includes(marker), `Missing monkey game feature: ${marker}`);
  }
  assert.match(html, /<meta name="viewport"/i);
  const scripts = inlineScripts(html);
  assert.equal(scripts.length, 1, 'Game should have one inline application script');
  for (const script of scripts) assert.doesNotThrow(() => new vm.Script(script), 'Game inline JavaScript should parse');
});
test('top-down spaceship game has controls, scoring, difficulty and valid JavaScript', async () => {
  const html = await read('../space-shooter.html');
  for (const marker of ['Vasundhara', 'id="space"', 'id="score"', 'id="lives"', 'id="best"', 'data-key="ArrowLeft"', 'data-key="Space"', 'function spawnRock', 'function finish', 'localStorage.setItem', 'Asteroids get faster']) {
    assert.ok(html.includes(marker), `Missing spaceship game feature: ${marker}`);
  }
  const scripts = inlineScripts(html);
  assert.equal(scripts.length, 1, 'Spaceship game should have one inline application script');
  for (const script of scripts) assert.doesNotThrow(() => new vm.Script(script), 'Spaceship game inline JavaScript should parse');
});
test('Arena Ops shooter has mobile controls, bots, combat, grenades and valid JavaScript', async () => {
  const html = await read('../arena-shooter.html');
  for (const marker of ['Vasundhara Ops', 'id="arena"', 'id="startBtn"', 'id="pauseBtn"', 'data-hold="left"', 'data-hold="fire"', 'data-action="grenade"', 'function spawnBot', 'function throwGrenade', 'function finish', 'requestAnimationFrame(frame)', 'Back to the birthday surprise']) {
    assert.ok(html.includes(marker), `Missing arena shooter feature: ${marker}`);
  }
  assert.match(html, /<meta name="viewport"/i);
  const scripts = inlineScripts(html);
  assert.equal(scripts.length, 1, 'Arena shooter should have one inline application script');
  for (const script of scripts) assert.doesNotThrow(() => new vm.Script(script), 'Arena shooter inline JavaScript should parse');
});
test('Neon Maze has touch, fullscreen, collecting and time-based speed features', async () => {
  const html = await read('../maze-game.html');
  for (const marker of ['Vasundhara', 'id="maze"', 'id="fullscreen"', 'data-dir="up"', 'pointerdown', 'pointerup', 'function makeGrid', 'function move(dir)', 'elapsed*.0028', 'localStorage.setItem', 'Collect every star']) {
    assert.ok(html.includes(marker), `Missing maze feature: ${marker}`);
  }
  const scripts = inlineScripts(html);
  assert.equal(scripts.length, 1, 'Maze should have one inline application script');
  for (const script of scripts) assert.doesNotThrow(() => new vm.Script(script), 'Maze inline JavaScript should parse');
});
test('static deployment files and package scripts are configured', async () => {
  const [workflow, netlify, pkg] = await Promise.all([read('../.github/workflows/pages.yml'), read('../netlify.toml'), read('../package.json').then(JSON.parse)]);
  assert.match(workflow, /run: npm test/);
  assert.match(workflow, /needs: test/);
  assert.match(netlify, /command = "npm test"/);
  assert.equal(pkg.scripts.test, 'node --test tests/site-smoke.test.mjs');
});
