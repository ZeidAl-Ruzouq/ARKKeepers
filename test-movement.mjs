import assert from 'node:assert/strict';
import {Journey,dist} from './docs/engine.js';
function settle(g,dt=.04){let frames=0;while(g.path.length&&frames++<6000){g.step(dt);if(g.dialogue.length)break;}assert.ok(frames<6000,'Click path settles without oscillation');}
const g=new Journey();g.dialogue=[];
// The old threshold could oscillate around short goals at large frame intervals.
for(const offset of [.1,1,3.9,4.1,7,31]){const goal={x:g.player.x+offset,y:g.player.y+offset/3};assert.ok(g.pathTo(goal.x,goal.y));settle(g);assert.ok(dist(g.player,goal)<.01,'Exact destination reached');}
// A click across Temple dividers must route through the doorway, not cross a thin wall.
g.load(5,false);assert.ok(g.pathTo(370,270));let frames=0;while(g.path.length&&frames++<6000){const before={...g.player};g.step(.04);assert.ok(g.clearLine(before,g.player),'Every step respects walls');}assert.ok(frames<6000);assert.ok(dist(g.player,{x:370,y:270})<.01);
// A held direction cancels click travel immediately; a wall stops animation.
g.pathTo(480,560);g.step(.04,{x:1,y:0});assert.equal(g.path.length,0);assert.equal(g.autoCircuit,false);
g.load(2,false,1);assert.ok(g.followCircuit());g.step(.04,{x:-1,y:0});assert.equal(g.autoCircuit,false);assert.equal(g.path.length,0);
// One action walks exactly one full circuit, stops, and leaves a checkpoint.
g.load(2,false,1);for(let lap=1;lap<=8;lap++){assert.ok(g.followCircuit());settle(g);assert.equal(g.playedCircuits,lap);assert.equal(g.autoCircuit,false);assert.equal(g.path.length,0);const event=g.events.find(e=>e.type==='circuitComplete'&&e.played===lap);assert.ok(event,'Gallery checkpoint emitted');while(g.dialogue.length)g.advance();if(lap<8)assert.equal(g.chapter,2);}
assert.equal(g.chapter,3);
console.log('PASS: exact click arrival, thin-wall routing, movement cancellation, and eight one-action circuits.');
