/* Pure geometry: no rendering, listeners or idle animation. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.OrbitGeometry=api;})(typeof window==='undefined'?globalThis:window,()=>{
const mod=(value,count)=>count?((value%count)+count)%count:0;
function delta(from,to,count){if(!count)return 0;let d=mod(to-from,count);if(d>count/2)d-=count;return d;}
function geometry(width,height,config,mobile,count){const visible=Math.min(count,mobile?config.mobileVisible:config.desktopVisible),cardWidth=Math.max(config.minCardWidth,Math.min(config.cardWidth,width*.31));return{visible,cardWidth,cardHeight:cardWidth*config.cardHeight/config.cardWidth,rx:Math.max(15,(width-cardWidth-28)/2)*.94,ry:Math.min(config.verticalRadius,height*.32),cx:width/2,cy:height*.46,depth:config.depth};}
function point(distance,g,cfg){const step=distance*Math.PI*2/Math.max(3,g.visible),angle=step+(cfg.activeAngle??0),front=(Math.cos(step)+1)/2;return{x:g.cx+Math.sin(angle)*g.rx-g.cardWidth/2,y:g.cy+Math.cos(angle)*g.ry-g.cardHeight/2,z:front*g.depth,scale:(cfg.backScale+(1-cfg.backScale)*front)*(1+((cfg.frontScale??1)-1)*Math.exp(-distance*distance*3)),opacity:cfg.backOpacity+(1-cfg.backOpacity)*front,order:Math.round(front*100),tilt:Math.sin(step)*8,yaw:-Math.sin(step)*16};}
return{mod,delta,geometry,point};});
