// Fictional tactical rules. Story encounters preserve 1 Samuel 4's capture outcome.
export const CREW=[{id:'bearer',name:'Bearer',he:'נושא',moves:['brace','escort']},{id:'scout',name:'Scout',he:'צופה',moves:['read','flank']},{id:'caller',name:'Horn caller',he:'תוקע',moves:['rally','signal']}];
export const MOVES={brace:{name:'Brace',detail:'Block 6 · gain 1 focus',cost:0},escort:{name:'Advance',detail:'Move the Ark 2 spaces',cost:2},read:{name:'Read the field',detail:'Gain 3 focus · block 2',cost:0},flank:{name:'Push back',detail:'Reduce rival resolve by 5',cost:2},rally:{name:'Rally',detail:'Restore 5 resolve',cost:2},signal:{name:'Sound the horn',detail:'Block 2 · rival resolve −2',cost:1}};
export const TRIALS=[{name:'The narrow pass',enemy:'Road raiders',he:'מעבר צר',intent:['guard','charge','press','cutoff']},{name:'The broken road',enemy:'Shield company',he:'דרך משובשת',intent:['press','guard','cutoff','charge']},{name:'The dusk crossing',enemy:'Pursuing company',he:'מעבר בין הערבים',intent:['cutoff','charge','guard','press']}];
export const INTENTS={press:{name:'Press the line',damage:4},charge:{name:'Charge',damage:7},cutoff:{name:'Cut off the road',damage:2},guard:{name:'Close ranks',damage:1}};
const messages={brace:['החזיקו בשורה!','Hold the line!'],escort:['קדימה, יחד!','Forward, together!'],read:['ראו את דרכם. הכינו את השורה.','Watch their approach. Prepare the line.'],flank:['הדפו אותם מן הדרך!','Push them back from the road!'],rally:['התחזקו, רעי!','Take courage, my companions!'],signal:['שמעו את האות!','Listen for the signal!']};
export class BearingBattle{
 constructor(index=0,story=false){this.index=index;this.story=story;this.round=1;this.resolve=18;this.focus=3;this.progress=0;this.rival=16+index*2;this.maxRival=this.rival;this.guard=0;this.selected='bearer';this.result=null;this.lastMove=null;this.log=story?{he:'המלחמה ניטשת, והשורה נשברת.',en:'The battle rages, and the line is breaking.'}:{he:'שמרו על השורה ועל הדרך.',en:'Keep the line together. Protect the road.'};this.trial=TRIALS[index];}
 get intent(){return this.trial.intent[(this.round-1)%this.trial.intent.length]}
 act(move){if(this.result)return false;const m=MOVES[move];if(!m||!CREW.find(c=>c.id===this.selected)?.moves.includes(move)||this.focus<m.cost)return false;this.focus-=m.cost;let guard=0;this.lastMove=move;
 if(move==='brace'){guard=6;this.focus=Math.min(6,this.focus+1)}
 if(move==='escort')this.progress+=2;
 if(move==='read'){this.focus=Math.min(6,this.focus+3);guard=2}
 if(move==='flank')this.rival-=this.intent==='guard'?3:5;
 if(move==='rally')this.resolve=Math.min(18,this.resolve+5);
 if(move==='signal'){guard=2;this.rival-=2}
 this.log={he:messages[move][0],en:messages[move][1]};
 if(!this.story&&(this.progress>=6||this.rival<=0)){this.result='clear';this.log={he:'הדרך פתוחה. השיירה יכולה לעבור.',en:'The road is clear. The company can pass.'};return true}
 const intent=this.intent;let damage=Math.max(0,INTENTS[intent].damage-guard);this.guard=guard;this.resolve=Math.max(0,this.resolve-damage);if(intent==='cutoff')this.progress=Math.max(0,this.progress-1);
 if(this.story&&(this.round>=3||this.resolve===0||this.rival<=0)){this.result='captured';this.log={he:'וארון אלהים נלקח',en:'The Ark of God was captured.'};return true}
 if(this.resolve===0){this.result='withdraw';this.log={he:'השורה נשברה. נסוגו והיערכו מחדש.',en:'The line has broken. Withdraw and regroup.'};return true}
 this.round++;return true;
 }
}
export class EncounterView{
 constructor(root,onClose){this.root=root;this.onClose=onClose;this.time=0;this.model=null;this.busyUntil=0;this.canvas=root.querySelector('canvas');this.c=this.canvas.getContext('2d');this.canvas.width=800;this.canvas.height=260;}
 open(index=0,story=false){this.model=new BearingBattle(index,story);this.root.hidden=false;this.root.querySelector('.encounter-exit').textContent=story?'Continue story':'Return';this.renderUI();this.root.querySelector('.crew-button').focus();}
 close(){this.root.hidden=true;let model=this.model;this.model=null;this.onClose(model)}
 renderUI(){const b=this.model;if(!b)return;this.root.querySelector('.encounter-mode').textContent=b.story?'EBENEZER · 1 SAMUEL 4':'TRIALS';this.root.querySelector('h2').textContent=b.story?'The line at Ebenezer':b.trial.name;this.root.querySelector('.enemy-name').textContent=b.story?'Philistine army':b.trial.enemy;
 this.root.querySelector('.team-resolve').textContent=`${b.resolve} / 18`;this.root.querySelector('.rival-resolve').textContent=`${Math.max(0,b.rival)} / ${b.maxRival}`;this.root.querySelector('.team-bar').style.width=b.resolve/18*100+'%';this.root.querySelector('.rival-bar').style.width=Math.max(0,b.rival)/b.maxRival*100+'%';this.root.querySelector('.battle-count').textContent=b.story?`${Math.min(3,b.round)} / 3`:`Road ${Math.min(6,b.progress)} / 6 · Focus ${b.focus} / 6`;
 this.root.querySelector('.intent').textContent=b.result?(b.result==='clear'?'The road is clear':b.result==='captured'?'The Ark is captured':'Regroup and try again'):`Next: ${INTENTS[b.intent].name}`;
 this.root.querySelector('.crew').innerHTML=CREW.map(c=>`<button class="crew-button ${b.selected===c.id?'selected':''}" data-crew="${c.id}" ${b.result?'disabled':''}>${c.name}<span lang="he" dir="rtl">${c.he}</span></button>`).join('');
 const crew=CREW.find(c=>c.id===b.selected);this.root.querySelector('.moves').innerHTML=b.result?`<button class="move-button" data-result>${b.result==='captured'?'Continue →':b.result==='withdraw'?'Try again':b.index<2?'Next trial →':'Done'}</button>`:crew.moves.map(id=>`<button class="move-button" data-move="${id}" ${b.focus<MOVES[id].cost?'disabled':''}><b>${MOVES[id].name}</b><small>${MOVES[id].detail}</small></button>`).join('');this.root.querySelector('.battle-he').textContent=b.log.he;this.root.querySelector('.battle-en').textContent=b.log.en;
 this.root.querySelectorAll('[data-crew]').forEach(e=>e.onclick=()=>{b.selected=e.dataset.crew;this.renderUI()});this.root.querySelectorAll('[data-move]').forEach(e=>e.onclick=()=>{if(performance.now()<this.busyUntil)return;if(b.act(e.dataset.move)){this.busyUntil=performance.now()+280;this.renderUI()}});let result=this.root.querySelector('[data-result]');if(result)result.onclick=()=>{if(b.story||b.result==='clear'&&b.index===2)this.close();else this.open(b.result==='clear'?b.index+1:b.index,false)};this.root.querySelector('.encounter-exit').onclick=()=>this.close();}
 draw(t){if(!this.model)return;const b=this.model,c=this.c,w=800,h=260;c.imageSmoothingEnabled=false;c.fillStyle='#8d956f';c.fillRect(0,0,w,h);c.fillStyle='#76846b';c.fillRect(0,0,w,55);c.fillStyle='#a9a276';c.fillRect(0,145,w,115);c.fillStyle='#b8ac7c';c.fillRect(0,166,w,49);for(let i=0;i<60;i++){c.fillStyle=i%2?'#a7a175':'#9ba071';c.fillRect((i*137)%w,70+(i*47)%190,3,2)}
 const rect=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),w,h)};
 const person=(x,y,col,shield=false)=>{rect(x-11,y,25,5,'#4a594550');rect(x-7,y-13,6,15,'#4d5943');rect(x+4,y-13,6,15,'#4d5943');rect(x-10,y-37,23,26,col);rect(x-6,y-53,15,17,'#bb946a');rect(x-7,y-55,17,6,'#5d6149');rect(x+4,y-46,2,2,'#394e3d');if(shield){rect(x+7,y-30,16,23,'#838a60');rect(x+8,y-29,14,3,'#c8b778');rect(x+13,y-24,4,12,'#b9a569')}else{rect(x+15,y-48,3,47,'#615d42');rect(x+12,y-55,9,10,'#aaa98a')}};
 for(let i=0;i<3;i++)person(165+i*43,169+(i%2)*35,['#d8c690','#a5b291','#b6a473'][i],i===0);
 for(let i=0;i<3;i++)person(603+i*38,173+(i%2)*31,['#7a8170','#918e70','#7b8d79'][i],true);
 rect(371,151,57,32,'#a88b42');rect(367,146,65,7,'#e0c57a');rect(361,171,77,4,'#dbc17d');rect(377,141,6,6,'#d9bc68');rect(415,141,6,6,'#d9bc68');rect(381,136,10,4,'#e2c679');rect(407,136,10,4,'#e2c679');if(b.lastMove&&t*1000<this.busyUntil+300){c.strokeStyle=b.lastMove==='brace'?'#e3d7a6':'#d2bd7d';c.lineWidth=2;c.strokeRect(150,113,145,105)}
 }
}
