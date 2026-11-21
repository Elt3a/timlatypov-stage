"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[141],{870:(e,t,o)=>{o.d(t,{El:()=>r,K1:()=>n,Xd:()=>c,cy:()=>x,ly:()=>i,o$:()=>a});let r=`#version 300 es
precision highp float;
precision highp int;
`,c=`
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
`,a=`
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
`,x=`
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
`,n=`
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
`},9724:(e,t,o)=>{o.d(t,{$6:()=>x,Gm:()=>i,aS:()=>a,mB:()=>n});var r=o(7825);function c(e,t,o,r,c,a,x){a[0]=0,x[0]=-1e20,x[1]=1e20,c[0]=e[t];for(let n=1,i=0;n<r;n++){c[n]=e[t+n*o];let r=n*n,l=0;do{let e=a[i];l=(c[n]-c[e]+r-e*e)/(n-e)/2}while(l<=x[i]&&--i>-1);a[++i]=n,x[i]=l,x[i+1]=1e20}for(let n=0,i=0;n<r;n++){for(;x[i+1]<n;)i++;let r=a[i],l=n-r;e[t+n*o]=c[r]+l*l}}function a(e,t,o,r,a,x){for(let n=0;n<t;n++)c(e,n,t,o,r,a,x);for(let n=0;n<o;n++)c(e,n*t,1,t,r,a,x)}function x(e,t,o){let r=e.createTexture();if(!r)throw Error("createTexture failed");let c=document.createElement("canvas"),x=c.getContext("2d",{willReadFrequently:!0});if(!x)throw Error("2d context failed");let n=new Float64Array(0),i=new Float64Array(0),l=new Float64Array(0),f=new Float64Array(0),v=new Uint16Array(0),m="",y="loaded"===document.fonts.status;y||document.fonts.ready.then(()=>{y=!0});let u={ready:!1,version:0,tex:r,w:0,h:0,cx:1,cy:1,dist:new Float32Array(0),glyphs:[],box:{x0:0,y0:0,x1:0,y1:0},groups:[],update:function(p=!1){let s=o.offsetWidth,h=o.offsetHeight;if(!s||!h||!y)return!1;let d=function(e){let r=o.getBoundingClientRect(),c=r.width/e||1,a=document.createRange(),x=[],n=0;for(let e of t.querySelectorAll("[data-bg-text]")){let t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(let e=t.nextNode();e;e=t.nextNode()){let t=e.parentElement;if(!t||t.closest('[aria-hidden="true"]'))continue;let o=getComputedStyle(t),i=parseFloat(o.fontSize)||16,l=`${o.fontStyle} ${o.fontWeight} ${i}px ${o.fontFamily}`,f="uppercase"===o.textTransform,v=e.textContent??"";for(let t=0;t<v.length;t++){let o=v[t];if(!o.trim())continue;a.setStart(e,t),a.setEnd(e,t+1);let m=a.getBoundingClientRect();if(m.width<.5||m.height<.5)continue;let y=(m.top-r.top)/c;x.push({ch:f?o.toUpperCase():o,x:(m.left-r.left)/c,y,w:m.width/c,h:m.height/c,size:i,font:l,group:n,top:y,bottom:y})}}n++}return x}(s),w=`${s}x${h}:`;for(let e of d)w+=`${e.ch}${Math.round(2*e.x)},${Math.round(2*e.y)},${Math.round(2*e.h)};`;if(!p&&w===m)return!1;m=w;let E=Math.max(2,Math.ceil(Math.sqrt(s*h/14e4))),C=Math.max(2,Math.ceil(s/E)),g=Math.max(2,Math.ceil(h/E)),_=C*g,T=C!==u.w||g!==u.h;if(T){c.width=C,c.height=g,n=new Float64Array(_),i=new Float64Array(_);let e=Math.max(C,g);l=new Float64Array(e),f=new Float64Array(e+1),v=new Uint16Array(e),u.dist=new Float32Array(_)}u.w=C,u.h=g,u.cx=s/C,u.cy=h/g,u.glyphs=d,x.setTransform(1,0,0,1,0,0),x.clearRect(0,0,C,g),x.setTransform(C/s,0,0,g/h,0,0),x.fillStyle="#fff",x.textBaseline="alphabetic",x.textAlign="left";let z={x0:1/0,y0:1/0,x1:-1/0,y1:-1/0},A=[];for(let e of d){x.font=e.font;let t=x.measureText(e.ch),o=t.fontBoundingBoxAscent||.8*e.size,r=t.fontBoundingBoxDescent||.2*e.size,c=e.y+e.h*o/(o+r);x.fillText(e.ch,e.x,c),e.top=c-(t.actualBoundingBoxAscent||.7*e.size),e.bottom=c+(t.actualBoundingBoxDescent||0);let a=A[e.group]??={x0:1/0,y0:1/0,x1:-1/0,y1:-1/0};a.x0=Math.min(a.x0,e.x),a.x1=Math.max(a.x1,e.x+e.w),a.y0=Math.min(a.y0,e.top),a.y1=Math.max(a.y1,e.bottom),z.x0=Math.min(z.x0,a.x0),z.x1=Math.max(z.x1,a.x1),z.y0=Math.min(z.y0,a.y0),z.y1=Math.max(z.y1,a.y1)}u.box=d.length?z:{x0:0,y0:0,x1:0,y1:0},u.groups=Array.from(A,e=>e??{x0:0,y0:0,x1:0,y1:0});let M=x.getImageData(0,0,C,g).data;for(let e=0;e<_;e++){let t=M[4*e+3]/255;if(t>=1)n[e]=0,i[e]=1e20;else if(t<=0)n[e]=1e20,i[e]=0;else{let o=.5-t;n[e]=o>0?o*o:0,i[e]=o<0?o*o:0}}d.length&&(a(n,C,g,l,v,f),a(i,C,g,l,v,f));let F=(u.cx+u.cy)/2,R=u.dist;for(let e=0;e<_;e++)R[e]=d.length?(Math.sqrt(n[e])-Math.sqrt(i[e]))*F:1e4;return e.bindTexture(e.TEXTURE_2D,r),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texImage2D(e.TEXTURE_2D,0,e.R16F,C,g,0,e.RED,e.FLOAT,R),(T||!u.ready)&&(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),u.ready=d.length>0,u.version++,!0},sample:p,grad:function(e,t,o){let r=u.cx,c=u.cy,a=p(e+r,t)-p(e-r,t),x=p(e,t+c)-p(e,t-c),n=Math.hypot(a,x);if(n<1e-6){o[0]=0,o[1]=-1;return}o[0]=a/n,o[1]=x/n},dispose(){e.deleteTexture(r)}};function p(e,t){return function(e,t,o,r,c,a,x){if(!t||e.length<t*o)return 1e4;let n=a/r-.5,i=x/c-.5;n<0?n=0:n>t-1.001&&(n=t-1.001),i<0?i=0:i>o-1.001&&(i=o-1.001);let l=0|n,f=0|i,v=n-l,m=i-f,y=f*t+l,u=e[y]+(e[y+1]-e[y])*v;return u+(e[y+t]+(e[y+t+1]-e[y+t])*v-u)*m}(u.dist,u.w,u.h,u.cx,u.cy,e,t)}return u}function n(e,t,o,r,c){return e?.ready?Object.assign(c,e.box):t.anchorK>0?(c.x0=t.anchor.x0/t.px,c.x1=t.anchor.x1/t.px,c.y0=r-t.anchor.y1/t.px,c.y1=r-t.anchor.y0/t.px):(c.x0=c.x1=o/2,c.y0=c.y1=r/2),c}function i(e,t,o,c,a,x,n){(0,r.Rm)(e,c,o.tex),e.uniform1i(t.u("uTitle"),c),e.uniform1f(t.u("uTitleOn"),+!!o.ready),e.uniform4f(t.u("uWord"),a.x0*x,(n-a.y1)*x,a.x1*x,(n-a.y0)*x)}}}]);