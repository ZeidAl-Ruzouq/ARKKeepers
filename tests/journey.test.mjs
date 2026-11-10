import assert from 'node:assert/strict';
import {Journey,dist} from '../docs/game/engine.js';
const g=new Journey();let finished=false;g.onFinish=()=>finished=true;
function talk(){for(let guard=0;g.dialogue.length&&guard<30;guard++)g.advance()}
function object(id){let o=g.objects.find(o=>o.id===id);assert.ok(o,`Object exists: ${id}`);return o}
function walk(x,y,target=null){assert.ok(g.pathTo(x,y,target),`Reachable destination ${x},${y} in ${g.chapter}.${g.sub}`);let guard=0;while(g.path.length&&guard++<12000){g.step(1/60);if(g.dialogue.length)break;}assert.ok(guard<12000,`Movement completed without getting stuck near ${g.player.x},${g.player.y}`);talk()}
function use(id){const o=object(id);walk(o.x,o.y+12);assert.ok(dist(o,g.player)<53,`Reach ${id} for interaction`);g.interact(o);talk()}
// Real pathfinding, movement and proximity-based interaction, rather than teleporting the player.
for(const id of ['wood1','gold2','gold1','wood2'])use(id);
assert.equal(g.wood,2);assert.equal(g.gold,2);use('bench');assert.ok(g.crafting);
for(let i=0;i<3;i++){while(!((Math.sin(g.time*2.7)+1)/2>.42&&(Math.sin(g.time*2.7)+1)/2<.8))g.step(1/60);g.interact();talk();}
assert.equal(g.stage,2);use('exit');assert.equal(g.chapter,1);
for(const id of ['curtain','hide','blue']){use(id);use('ark')}
assert.equal(g.stage,3);use('ark');assert.ok(g.carry);use('exit');assert.equal(g.chapter,2);
assert.equal(g.walkable(490,330),false);use('ark');walk(410,330);talk();assert.equal(g.dry,true);assert.equal(g.walkable(490,330),true);assert.equal(g.walkable(490,180),false);
use('stand');assert.equal(g.stage,3);for(let i=0;i<490;i++)g.step(1/60);talk();assert.equal(g.stage,4);use('ark');assert.equal(g.stage,5);use('exit');assert.equal(g.sub,1);
const circuitEvents=[];g.events=[];
for(let i=0;i<32;i++){let t={...g.points[g.point]};walk(t.x,t.y);talk();circuitEvents.push(...g.events.splice(0).filter(e=>e.type==='circuitComplete'));if(i===3){assert.equal(g.day,7,'First circuit compresses days 1–6');assert.equal(g.playedCircuits,1);}if(g.chapter!==2)break;}
assert.equal(circuitEvents.length,8);assert.deepEqual(circuitEvents.map(e=>e.played),[1,2,3,4,5,6,7,8]);assert.equal(circuitEvents[0].montage,true);assert.equal(circuitEvents[7].final,true);
assert.equal(g.chapter,3,'Eight physical circuits advance the story');
use('idol');assert.equal(g.stage,1);use('idol');assert.equal(g.stage,2);use('idol');assert.equal(g.stage,2,'Repeated examination cannot hide the return cart');use('cart');assert.equal(g.sub,1);
for(let i=0;i<4;i++){const r={...g.routes[g.routeIndex]};walk(r.x,r.y);talk();}
assert.equal(g.chapter,4);walk(490,350);talk();assert.equal(g.stage,1);use('house');assert.equal(g.sub,1);use('ark');assert.ok(g.carry);use('exit');assert.equal(g.chapter,5);
use('ark');assert.ok(g.carry);assert.equal(g.walkable(330,390),false);assert.equal(g.walkable(480,390),true);use('rest');talk();assert.equal(finished,true);assert.equal(g.stage,2);
console.log('PASS: complete adventure through every chapter with collision-aware movement, proximity interactions, goldworking, carrying, dry-river restrictions, 8 circuits, repeated Dagon interaction, and Temple ending.');
