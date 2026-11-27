"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[141],{870:(e,t,r)=>{r.d(t,{El:()=>o,K1:()=>x,Xd:()=>a,cy:()=>n,ly:()=>i,o$:()=>c});let o=`#version 300 es
precision highp float;
precision highp int;
`,a=`
#ifndef FBM_OCTAVES
#define FBM_OCTAVES 5
#endif

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < FBM_OCTAVES; i++) {
    sum += amp * snoise(p);
    p = p * 2.03 + vec3(17.1, 3.7, 9.3);
    amp *= 0.5;
  }
  return sum;
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, s, -s, c);
}
`,c=`
const vec3 C_BASE = vec3(0.031, 0.039, 0.0);
const vec3 C_DEEP = vec3(0.012, 0.16, 0.055);
const vec3 C_ACID = vec3(0.071, 0.949, 0.110);
const vec3 C_PALE = vec3(0.925, 1.0, 0.784);

vec3 ink(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 c = mix(C_BASE, C_DEEP, smoothstep(0.0, 0.38, t));
  c = mix(c, C_ACID, smoothstep(0.32, 0.78, t));
  return mix(c, C_PALE, smoothstep(0.74, 1.0, t));
}

vec3 iri(float t, float phase) {
  vec3 c = ink(t);
  vec3 tint = mix(vec3(0.08, 0.95, 0.74), vec3(0.72, 1.0, 0.2), 0.5 + 0.5 * sin(phase));
  float k = smoothstep(0.3, 0.75, t) * (1.0 - smoothstep(0.85, 1.0, t)) * 0.4;
  return mix(c, tint * max(c.g, max(c.r, c.b)), k);
}

// Относительная яркость по WCAG (через гамму 2.2)
float lum(vec3 c) {
  return dot(pow(max(c, 0.0), vec3(2.2)), vec3(0.2126, 0.7152, 0.0722));
}

/* Гасим и заодно уводим в зелёный: салатовый, просто притушенный, выходит
   серым. Красный и синий убираются сильнее зелёного, поэтому яркость
   после этого только ниже потолка */
vec3 capLum(vec3 c, float cap) {
  float L = lum(c);
  if (L <= cap) return c;
  float k = pow(cap / L, 1.0 / 2.2);
  return c * k * mix(vec3(1.0), vec3(0.3, 1.0, 0.36), 1.0 - k);
}

// Мягкий потолок для сложенного света: до 0.75 как есть, выше — поджимается
vec3 soft(vec3 c) {
  vec3 e = max(c - 0.75, 0.0);
  return min(c, 0.75) + e / (1.0 + e * 2.0);
}
`,n=`
uniform vec4 uCalm[8];
uniform float uCalmK[8];
uniform int uCalmN;
uniform float uCalmFeather;

float calmAt(vec2 p) {
  float k = 0.0;
  for (int i = 0; i < 8; i++) {
    if (i >= uCalmN) break;
    vec4 r = uCalm[i];
    vec2 c = 0.5 * (r.xy + r.zw);
    vec2 h = 0.5 * (r.zw - r.xy);
    vec2 d = abs(p - c) - h;
    float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
    // У крупного блока край мягче: под словом в полэкрана яркая волна
    // иначе гаснет заметным прямоугольником
    float f = clamp(min(h.x, h.y) * 0.6, uCalmFeather, uCalmFeather * 3.5);
    k = max(k, (1.0 - smoothstep(-f * 0.2, f, dist)) * uCalmK[i]);
  }
  return k;
}

// Самый низкий потолок, при k = 1
const float CALM_FLOOR = 0.016;

float calmCap(float k) {
  return exp(k * log(CALM_FLOOR));
}

/* Есть ли что гасить: пиксель темнее самого низкого потолка capLum не
   тронет при любой зоне, и сцены тогда зоны и ров не считают вовсе — а это
   почти весь тёмный фон. Сначала грубо по самому яркому каналу: яркость не
   больше его в степени 2.2, так что тёмному пикселю степени не нужны */
bool aboveFloor(vec3 c) {
  return max(c.r, max(c.g, c.b)) > pow(CALM_FLOOR, 1.0 / 2.2) && lum(c) > CALM_FLOOR;
}

// Зерно плёнки: меняется каждый кадр, заодно убирает полосы в тёмных градиентах
float grain(vec2 p, float t) {
  return hash12(p + fract(t * 7.31) * vec2(311.7, 183.3)) - 0.5;
}
`,x=`
uniform vec4 uBursts[4];
`,i=`
uniform sampler2D uTitle;
uniform float uTitleOn;
uniform vec4 uWord;

float titleD(vec2 p) {
  if (uTitleOn < 0.5) return 1e4;
  // Без мипов, поэтому textureLod: читается и внутри ветвления по пикселю
  return textureLod(uTitle, vec2(p.x / uRes.x, 1.0 - p.y / uRes.y), 0.0).r;
}

float moat(float td, float width) {
  return 1.0 - smoothstep(4.0, width, td);
}
`},7825:(e,t,r)=>{r.d(t,{Do:()=>l,Iu:()=>o,PE:()=>f,Rm:()=>u,Yn:()=>x,ZC:()=>m,eJ:()=>n,jQ:()=>i,rC:()=>c});let o=`#version 300 es
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;function a(e,t,r){let o=e.createShader(t);if(!o)throw Error("createShader failed");if(e.shaderSource(o,r),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(o)??"";e.deleteShader(o);let a=r.split("\n").map((e,t)=>`${String(t+1).padStart(4)}  ${e}`).join("\n");throw Error(`Shader compile error:
${t}
${a}`)}return o}function c(e,t,r){let o=e.createProgram();if(!o)throw Error("createProgram failed");let c=a(e,e.VERTEX_SHADER,t),n=a(e,e.FRAGMENT_SHADER,r);if(e.attachShader(o,c),e.attachShader(o,n),e.linkProgram(o),e.deleteShader(c),e.deleteShader(n),!e.getProgramParameter(o,e.LINK_STATUS))throw Error(`Program link error: ${e.getProgramInfoLog(o)}`);let x=new Map;return{handle:o,use:()=>e.useProgram(o),u:t=>(x.has(t)||x.set(t,e.getUniformLocation(o,t)),x.get(t)??null),dispose:()=>e.deleteProgram(o)}}function n(e){e.drawArrays(e.TRIANGLES,0,3)}function x(e,t,r,o={}){let{float:a=!1,linear:c=!0,channels:n=4}=o,i=e.createTexture(),l=e.createFramebuffer();if(!i||!l)throw Error("createTarget failed");e.bindTexture(e.TEXTURE_2D,i);let f=c?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,f),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,f);let u=o.wrap??e.CLAMP_TO_EDGE;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,u),a){let o=1===n?e.R16F:2===n?e.RG16F:e.RGBA16F,a=1===n?e.RED:2===n?e.RG:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,o,t,r,0,a,e.HALF_FLOAT,null)}else e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,r,0,e.RGBA,e.UNSIGNED_BYTE,null);return e.bindFramebuffer(e.FRAMEBUFFER,l),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.viewport(0,0,t,r),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:i,fbo:l,w:t,h:r}}function i(e,t){t&&(e.deleteTexture(t.tex),e.deleteFramebuffer(t.fbo))}function l(e,t,r,o={}){let a={read:x(e,t,r,o),write:x(e,t,r,o),swap(){let e=a.read;a.read=a.write,a.write=e},dispose(){i(e,a.read),i(e,a.write)}};return a}function f(e,t,r,o){e.bindFramebuffer(e.FRAMEBUFFER,t?t.fbo:null),e.viewport(0,0,t?t.w:r??e.drawingBufferWidth,t?t.h:o??e.drawingBufferHeight)}function u(e,t,r){e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,r)}function m(e,t,r={}){let{linear:o=!0,mipmap:a=!1,flipY:c=!1}=r,n=e.createTexture();if(!n)throw Error("createTexture failed");return e.bindTexture(e.TEXTURE_2D,n),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,c),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,t),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,o?e.LINEAR:e.NEAREST),a?(e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR)):e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,o?e.LINEAR:e.NEAREST),n}},9724:(e,t,r)=>{r.d(t,{$6:()=>n,Gm:()=>i,aS:()=>c,mB:()=>x});var o=r(7825);function a(e,t,r,o,a,c,n){c[0]=0,n[0]=-1e20,n[1]=1e20,a[0]=e[t];for(let x=1,i=0;x<o;x++){a[x]=e[t+x*r];let o=x*x,l=0;do{let e=c[i];l=(a[x]-a[e]+o-e*e)/(x-e)/2}while(l<=n[i]&&--i>-1);c[++i]=x,n[i]=l,n[i+1]=1e20}for(let x=0,i=0;x<o;x++){for(;n[i+1]<x;)i++;let o=c[i],l=x-o;e[t+x*r]=a[o]+l*l}}function c(e,t,r,o,c,n){for(let x=0;x<t;x++)a(e,x,t,r,o,c,n);for(let x=0;x<r;x++)a(e,x*t,1,t,o,c,n)}function n(e,t,r){let o=e.createTexture();if(!o)throw Error("createTexture failed");let a=document.createElement("canvas"),n=a.getContext("2d",{willReadFrequently:!0});if(!n)throw Error("2d context failed");let x=new Float64Array(0),i=new Float64Array(0),l=new Float64Array(0),f=new Float64Array(0),u=new Uint16Array(0),m="",E="loaded"===document.fonts.status;E||document.fonts.ready.then(()=>{E=!0});let v={ready:!1,version:0,tex:o,w:0,h:0,cx:1,cy:1,dist:new Float32Array(0),glyphs:[],box:{x0:0,y0:0,x1:0,y1:0},groups:[],update:function(p=!1){let d=r.offsetWidth,s=r.offsetHeight;if(!d||!s||!E)return!1;let y=function(e){let o=r.getBoundingClientRect(),a=o.width/e||1,c=document.createRange(),n=[],x=0;for(let e of t.querySelectorAll("[data-bg-text]")){let t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(let e=t.nextNode();e;e=t.nextNode()){let t=e.parentElement;if(!t||t.closest('[aria-hidden="true"]'))continue;let r=getComputedStyle(t),i=parseFloat(r.fontSize)||16,l=`${r.fontStyle} ${r.fontWeight} ${i}px ${r.fontFamily}`,f="uppercase"===r.textTransform,u=e.textContent??"";for(let t=0;t<u.length;t++){let r=u[t];if(!r.trim())continue;c.setStart(e,t),c.setEnd(e,t+1);let m=c.getBoundingClientRect();if(m.width<.5||m.height<.5)continue;let E=(m.top-o.top)/a;n.push({ch:f?r.toUpperCase():r,x:(m.left-o.left)/a,y:E,w:m.width/a,h:m.height/a,size:i,font:l,group:x,top:E,bottom:E})}}x++}return n}(d),h=`${d}x${s}:`;for(let e of y)h+=`${e.ch}${Math.round(2*e.x)},${Math.round(2*e.y)},${Math.round(2*e.h)};`;if(!p&&h===m)return!1;m=h;let T=Math.max(2,Math.ceil(Math.sqrt(d*s/14e4))),_=Math.max(2,Math.ceil(d/T)),R=Math.max(2,Math.ceil(s/T)),A=_*R,g=_!==v.w||R!==v.h;if(g){a.width=_,a.height=R,x=new Float64Array(A),i=new Float64Array(A);let e=Math.max(_,R);l=new Float64Array(e),f=new Float64Array(e+1),u=new Uint16Array(e),v.dist=new Float32Array(A)}v.w=_,v.h=R,v.cx=d/_,v.cy=s/R,v.glyphs=y,n.setTransform(1,0,0,1,0,0),n.clearRect(0,0,_,R),n.setTransform(_/d,0,0,R/s,0,0),n.fillStyle="#fff",n.textBaseline="alphabetic",n.textAlign="left";let w={x0:1/0,y0:1/0,x1:-1/0,y1:-1/0},C=[];for(let e of y){n.font=e.font;let t=n.measureText(e.ch),r=t.fontBoundingBoxAscent||.8*e.size,o=t.fontBoundingBoxDescent||.2*e.size,a=e.y+e.h*r/(r+o);n.fillText(e.ch,e.x,a),e.top=a-(t.actualBoundingBoxAscent||.7*e.size),e.bottom=a+(t.actualBoundingBoxDescent||0);let c=C[e.group]??={x0:1/0,y0:1/0,x1:-1/0,y1:-1/0};c.x0=Math.min(c.x0,e.x),c.x1=Math.max(c.x1,e.x+e.w),c.y0=Math.min(c.y0,e.top),c.y1=Math.max(c.y1,e.bottom),w.x0=Math.min(w.x0,c.x0),w.x1=Math.max(w.x1,c.x1),w.y0=Math.min(w.y0,c.y0),w.y1=Math.max(w.y1,c.y1)}v.box=y.length?w:{x0:0,y0:0,x1:0,y1:0},v.groups=Array.from(C,e=>e??{x0:0,y0:0,x1:0,y1:0});let F=n.getImageData(0,0,_,R).data;for(let e=0;e<A;e++){let t=F[4*e+3]/255;if(t>=1)x[e]=0,i[e]=1e20;else if(t<=0)x[e]=1e20,i[e]=0;else{let r=.5-t;x[e]=r>0?r*r:0,i[e]=r<0?r*r:0}}y.length&&(c(x,_,R,l,u,f),c(i,_,R,l,u,f));let U=(v.cx+v.cy)/2,D=v.dist;for(let e=0;e<A;e++)D[e]=y.length?(Math.sqrt(x[e])-Math.sqrt(i[e]))*U:1e4;return e.bindTexture(e.TEXTURE_2D,o),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texImage2D(e.TEXTURE_2D,0,e.R16F,_,R,0,e.RED,e.FLOAT,D),(g||!v.ready)&&(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),v.ready=y.length>0,v.version++,!0},sample:p,grad:function(e,t,r){let o=v.cx,a=v.cy,c=p(e+o,t)-p(e-o,t),n=p(e,t+a)-p(e,t-a),x=Math.hypot(c,n);if(x<1e-6){r[0]=0,r[1]=-1;return}r[0]=c/x,r[1]=n/x},dispose(){e.deleteTexture(o)}};function p(e,t){return function(e,t,r,o,a,c,n){if(!t||e.length<t*r)return 1e4;let x=c/o-.5,i=n/a-.5;x<0?x=0:x>t-1.001&&(x=t-1.001),i<0?i=0:i>r-1.001&&(i=r-1.001);let l=0|x,f=0|i,u=x-l,m=i-f,E=f*t+l,v=e[E]+(e[E+1]-e[E])*u;return v+(e[E+t]+(e[E+t+1]-e[E+t])*u-v)*m}(v.dist,v.w,v.h,v.cx,v.cy,e,t)}return v}function x(e,t,r,o,a){return e?.ready?Object.assign(a,e.box):t.anchorK>0?(a.x0=t.anchor.x0/t.px,a.x1=t.anchor.x1/t.px,a.y0=o-t.anchor.y1/t.px,a.y1=o-t.anchor.y0/t.px):(a.x0=a.x1=r/2,a.y0=a.y1=o/2),a}function i(e,t,r,a,c,n,x){(0,o.Rm)(e,a,r.tex),e.uniform1i(t.u("uTitle"),a),e.uniform1f(t.u("uTitleOn"),+!!r.ready),e.uniform4f(t.u("uWord"),c.x0*n,(x-c.y1)*n,c.x1*n,(x-c.y0)*n)}}}]);