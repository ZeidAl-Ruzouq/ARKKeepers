import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DIALOGUE,dialogueFor} from '../docs/game/dialogue.js';
import {BearingBattle,CREW} from '../docs/game/encounters.js';
import {createArkModel} from '../docs/ark/ark-model.js';
for(const [key,d]of Object.entries(DIALOGUE)){assert.match(d.he,/[א-ת]/,key);assert.ok(d.text&&d.ref&&d.url);assert.match(d.url,/^https:\/\/mechon-mamre\.org\/p\/pt\//);assert.ok(['adapted','biblical'].includes(d.kind))}
assert.equal(dialogueFor('And Solomon asks whether even the heavens can contain God.').name,'Solomon');
assert.equal(dialogueFor('Take up the Ark. Go before the people into the Jordan.','Joshua').kind,'biblical');
for(let i=0;i<3;i++){
 const queue=[{b:new BearingBattle(i),moves:[]}],seen=new Set();let win=null;
 while(queue.length){const {b,moves}=queue.shift();if(b.result==='clear'){win=moves;break}if(b.result||moves.length>=14)continue;let key=[b.round%4,b.resolve,b.focus,b.progress,b.rival].join(':');if(seen.has(key))continue;seen.add(key);for(const role of CREW)for(const move of role.moves){const copy=Object.assign(Object.create(BearingBattle.prototype),b,{selected:role.id});if(copy.act(move))queue.push({b:copy,moves:[...moves,role.id+':'+move]});}}
 assert.ok(win,`Trial ${i+1} has a reachable winning strategy`);console.log(`Trial ${i+1}: ${win.join(' → ')}`);
}
const s=new BearingBattle(0,true);for(let i=0;i<3;i++)s.act('brace');assert.equal(s.result,'captured');assert.match(s.log.he,/נלקח/);
const invalid=new BearingBattle();invalid.focus=0;const before=invalid.round;assert.equal(invalid.act('escort'),false);assert.equal(invalid.round,before);assert.equal(invalid.act('read'),false,'Wrong role cannot use another keeper’s move');invalid.selected='scout';assert.equal(invalid.act('read'),true);assert.ok(invalid.focus>0);
const m=createArkModel();assert.ok(m.meshes.length>=4);for(const mesh of m.meshes){assert.equal(mesh.positions.length%9,0);assert.equal(mesh.positions.length,mesh.normals.length);assert.ok([...mesh.positions,...mesh.normals].every(Number.isFinite));}
const glb=fs.readFileSync(new URL('../docs/assets/ark.glb', import.meta.url));assert.equal(glb.readUInt32LE(0),0x46546c67);assert.equal(glb.readUInt32LE(4),2);assert.equal(glb.readUInt32LE(8),glb.length);const jsonLength=glb.readUInt32LE(12);const document=JSON.parse(glb.subarray(20,20+jsonLength).toString().trim());assert.equal(document.asset.version,'2.0');assert.ok(document.meshes.length);
console.log(`PASS: ${Object.keys(DIALOGUE).length} bilingual dialogue records, three winnable tactical trials, fixed story capture, invalid move guards, finite mesh geometry, and valid portable GLB.`);
