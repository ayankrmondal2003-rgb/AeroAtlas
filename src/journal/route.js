import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { points } from './model.js';

export class JournalRoute {
  constructor(app) { this.app=app;this.group=new THREE.Group();app.site.scene.add(this.group);this.labels=[];this.lines=[];this.signature=''; }
  clear() {
    for(const child of [...this.group.children]) {child.geometry?.dispose();child.material?.dispose();this.group.remove(child);}
    this.app.labels.clear('journal');this.labels=[];this.lines=[];
  }
  show(mission,index=null) {
    this.clear();if(!mission)return;
    const view=this.app.site;
    const makeLine=(samples,color,dashed=false)=>{if(samples.length<2)return;const mat=new LineMaterial({color,linewidth:3,depthTest:false,dashed,dashSize:.01,gapSize:.006});const geo=new LineGeometry();const line=new Line2(geo,mat);line.renderOrder=12;this.group.add(line);this.lines.push({line,samples});};
    let remaining=index===null?Infinity:index+1;
    for(const segment of mission.segments) {const list=segment.points.slice(0,remaining);remaining-=list.length;makeLine(list,0xff454d);}
    // Historical plan is independent of the current planner and never feeds recording.
    makeLine(mission.planned||[],0x9ddce5,true);
    const all=points(mission);const visible=index===null?all:all.slice(0,index+1);
    for(const [p,label] of [[all[0],'START'],[visible.at(-1),index===null?'END':'REPLAY']]) {
      if(!p)continue;
      const item=this.app.labels.add('journal',{className:'journal-marker',html:`<div class="dot"></div><div class="lb">${label}</div>`,world:new THREE.Vector3(),priority:10});
      this.labels.push({item,p});
    }
    this.update();
  }
  update() {
    const a=this.app,v=a.site;
    this.group.visible=a.mode==='site';
    for(const {line,samples} of this.lines) {
      line.material.resolution.set(a.w,a.h);
      const sig=`${v.exag}:${v.fpvOn}`;
      if(line.userData.heightSig!==sig) {line.geometry.setPositions(samples.flatMap(p=>[p.x,v.yAt(p.x,p.z)+v.routeLift()*1.5,p.z]));line.computeLineDistances();line.userData.heightSig=sig;}
    }
    for(const {item,p} of this.labels)item.world.set(p.x,v.yAt(p.x,p.z)+v.markerLift(2),p.z);
    a.labels.setVisible('journal',a.mode==='site');
    if(a.mode==='site')a.labels.update('journal',v.camera,a.w,a.h);
  }
}
