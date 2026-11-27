"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[176],{2967:(e,t,r)=>{r.d(t,{S:()=>u});let o=-1,a=!1,i=0;function u(e){return e===o||(o=e,(a=!i||e-i>=12||e<i)&&(i=e)),a}},7825:(e,t,r)=>{r.d(t,{Do:()=>f,Iu:()=>o,PE:()=>m,Rm:()=>c,Yn:()=>n,ZC:()=>s,eJ:()=>u,jQ:()=>l,rC:()=>i});let o=`#version 300 es
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;function a(e,t,r){let o=e.createShader(t);if(!o)throw Error("createShader failed");if(e.shaderSource(o,r),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(o)??"";e.deleteShader(o);let a=r.split("\n").map((e,t)=>`${String(t+1).padStart(4)}  ${e}`).join("\n");throw Error(`Shader compile error:
${t}
${a}`)}return o}function i(e,t,r){let o=e.createProgram();if(!o)throw Error("createProgram failed");let i=a(e,e.VERTEX_SHADER,t),u=a(e,e.FRAGMENT_SHADER,r);if(e.attachShader(o,i),e.attachShader(o,u),e.linkProgram(o),e.deleteShader(i),e.deleteShader(u),!e.getProgramParameter(o,e.LINK_STATUS))throw Error(`Program link error: ${e.getProgramInfoLog(o)}`);let n=new Map;return{handle:o,use:()=>e.useProgram(o),u:t=>(n.has(t)||n.set(t,e.getUniformLocation(o,t)),n.get(t)??null),dispose:()=>e.deleteProgram(o)}}function u(e){e.drawArrays(e.TRIANGLES,0,3)}function n(e,t,r,o={}){let{float:a=!1,linear:i=!0,channels:u=4}=o,l=e.createTexture(),f=e.createFramebuffer();if(!l||!f)throw Error("createTarget failed");e.bindTexture(e.TEXTURE_2D,l);let m=i?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,m),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,m);let c=o.wrap??e.CLAMP_TO_EDGE;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,c),a){let o=1===u?e.R16F:2===u?e.RG16F:e.RGBA16F,a=1===u?e.RED:2===u?e.RG:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,o,t,r,0,a,e.HALF_FLOAT,null)}else e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,r,0,e.RGBA,e.UNSIGNED_BYTE,null);return e.bindFramebuffer(e.FRAMEBUFFER,f),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,l,0),e.viewport(0,0,t,r),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:l,fbo:f,w:t,h:r}}function l(e,t){t&&(e.deleteTexture(t.tex),e.deleteFramebuffer(t.fbo))}function f(e,t,r,o={}){let a={read:n(e,t,r,o),write:n(e,t,r,o),swap(){let e=a.read;a.read=a.write,a.write=e},dispose(){l(e,a.read),l(e,a.write)}};return a}function m(e,t,r,o){e.bindFramebuffer(e.FRAMEBUFFER,t?t.fbo:null),e.viewport(0,0,t?t.w:r??e.drawingBufferWidth,t?t.h:o??e.drawingBufferHeight)}function c(e,t,r){e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,r)}function s(e,t,r={}){let{linear:o=!0,mipmap:a=!1,flipY:i=!1}=r,u=e.createTexture();if(!u)throw Error("createTexture failed");return e.bindTexture(e.TEXTURE_2D,u),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,i),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,t),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,o?e.LINEAR:e.NEAREST),a?(e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR)):e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,o?e.LINEAR:e.NEAREST),u}},9176:(e,t,r)=>{r.r(t),r.d(t,{mountPortraitScreen:()=>x});var o=r(2967),a=r(594),i=r(7179),u=r(9571),n=r(7825);let l=[[1,.4,92/255],u.r0,[.4,143/255,1]],f=1e3/24,m=`#version 300 es
precision highp float;
uniform sampler2D uPrev;
uniform vec2 uSize;
// Сколько силы остаётся за кадр и сколько вычитается сверху: 8 бит
// умножением до нуля не доходят — 1/255 * 0.96 округляется обратно в 1/255
uniform float uKeep;
uniform float uFloor;
// Растекание за кадр: след мягчеет и расплывается, пока гаснет
uniform float uSpread;
// Мазок: капсула от uA до uB (тексели, y вверх), направление — экранное
uniform vec2 uA;
uniform vec2 uB;
uniform float uRadius;
uniform vec2 uDir;
uniform float uForce;
out vec4 outColor;

void main() {
  vec2 px = 1.0 / uSize;
  vec2 uv = gl_FragCoord.xy * px;
  vec4 c = texture(uPrev, uv);
  vec4 n = texture(uPrev, uv + vec2(px.x, 0.0)) + texture(uPrev, uv - vec2(px.x, 0.0))
         + texture(uPrev, uv + vec2(0.0, px.y)) + texture(uPrev, uv - vec2(0.0, px.y));
  c = mix(c, n * 0.25, uSpread);

  vec2 dir = c.rg * 2.0 - 1.0;
  float s = max(c.b * uKeep - uFloor, 0.0);

  vec2 p = gl_FragCoord.xy;
  vec2 ab = uB - uA;
  float t = clamp(dot(p - uA, ab) / max(dot(ab, ab), 1e-4), 0.0, 1.0);
  float d = length(p - uA - ab * t);
  float brush = (1.0 - smoothstep(uRadius * 0.2, uRadius, d)) * uForce;

  // Сила копится, но не выше 1; направление — среднее, взвешенное силой.
  // Где силы нет, направление обнуляется: без следа сдвига нет
  float s2 = s + brush * (1.0 - s);
  vec2 dir2 = (dir * s + uDir * brush) / max(s + brush, 1e-4);
  outColor = vec4(dir2 * 0.5 + 0.5, s2, 1.0);
}`,c=`#version 300 es
precision highp float;
uniform sampler2D uImage;
uniform sampler2D uTrail;
uniform vec2 uRes;
// Снимок как object-fit: cover — uv = p * xy + zw (p — px буфера от
// левого верхнего угла)
uniform vec4 uCover;
// Уровень mip: ячейка берёт средний цвет своего клочка снимка, а не одну
// точку — иначе мелкие детали мерцали бы
uniform float uLod;
uniform float uCell;
uniform float uSplit;
// Полосы сбоя: y0, y1 (доли высоты сверху), сдвиг px буфера, снег 0…1
uniform vec4 uBands[4];
// Чётные и нечётные строки расходятся (px буфера) — \xabгребёнка\xbb развёртки
uniform float uComb;
// Прыжок кадра по вертикали, px буфера
uniform float uRoll;
uniform float uFlash;
uniform float uSeed;
uniform float uDrag;
uniform float uTrailOn;
uniform vec3 uInk;
uniform float uDotEvery;
// RGB-след: 1 — у следа нет цвета, светятся сами каналы. uFringe — на
// какую долю сдвига красный тянется дальше зелёного, синий — ближе
uniform float uRgb;
uniform float uFringe;
uniform vec3 uTri[3];
// Плёнка (вариант film): всё ниже меняется раз в кадр плёнки, 24 в секунду.
// Номер кадра — зерно; яркость кадра — мерцание; дрожь кадра, px буфера
uniform float uFilm;
uniform float uFrame;
uniform float uGrain;
uniform float uFlicker;
uniform vec2 uWeave;
// Пылинки: x, y (px буфера, y сверху), радиус px, тон: больше нуля —
// светлая, меньше — тёмная, модуль — плотность; 0 — пылинки нет
uniform vec4 uDust[8];
// Волосок — дуга: центр, радиус, начало (рад) | длина дуги (рад), толщина px, тон
uniform vec4 uHair;
uniform vec4 uHairB;
// Царапины — вертикальные: x, ширина px, тон, зерно разрывов
uniform vec4 uScratch[2];
out vec4 outColor;

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

vec3 photo(vec2 p) {
  return textureLod(uImage, p * uCover.xy + uCover.zw, uLod).rgb;
}

float hash(vec2 v) {
  v = fract(v * vec2(0.1031, 0.1030));
  v += dot(v, v.yx + 33.33);
  return fract((v.x + v.y) * v.x);
}

/* Старая плёнка: зерно, пыль, волосок, царапины, мерцание. Всё без цвета.
   Считается в месте сигнала q, а не ячейки: сбои и след тянут пыль вместе
   с картинкой, она — часть кадра, а не стекла */
vec3 film(vec3 c, vec2 q, float col, float row) {
  // Зерно — своё у ячейки в каждом кадре, заметнее в полутонах, чем в тени
  if (uGrain > 0.0) {
    float g = hash(vec2(col, row) + uFrame * vec2(13.7, 7.1)) - 0.5;
    c += g * uGrain * (0.35 + 0.65 * smoothstep(0.02, 0.4, luma(c)));
  }
  float soft = uCell * 0.5;
  /* Пыль: у каждой пылинки своя форма — по зерну из её места. Чаще почти
     круглая точка, бывает вытянутая в случайную сторону (до 2.2 раза) и
     с неровным краем — радиус гуляет по углу. С одной формой на всех
     пылинки выходили одинаковыми \xabсердечками\xbb */
  for (int i = 0; i < 8; i++) {
    vec4 d = uDust[i];
    if (d.w == 0.0) continue;
    vec2 v = q - d.xy;
    float lim = d.z * 3.2 + soft;
    if (dot(v, v) > lim * lim) continue;
    float h1 = hash(d.xy);
    float h2 = hash(d.yx + 7.0);
    vec2 ax = vec2(cos(h1 * 6.2831853), sin(h1 * 6.2831853));
    vec2 w = vec2(dot(v, ax) / (1.0 + 1.2 * h2 * h2), dot(v, vec2(-ax.y, ax.x)));
    float a = atan(w.y, w.x);
    float r = d.z * (1.0 + h2 * (0.3 * sin(3.0 * a + h1 * 40.0) + 0.18 * sin(5.0 * a - h2 * 30.0)));
    float k = 1.0 - smoothstep(r - soft, r + soft, length(w));
    c = mix(c, vec3(d.w > 0.0 ? 0.92 : 0.0), k * abs(d.w));
  }
  // Волосок: дуга, к концам тоньше
  if (uHairB.z != 0.0) {
    vec2 v = q - uHair.xy;
    float d = abs(length(v) - uHair.z);
    if (d < uHairB.y + uCell) {
      float t = mod(atan(v.y, v.x) - uHair.w, 6.2831853) / uHairB.x;
      if (t < 1.0) {
        float k = (1.0 - smoothstep(uHairB.y * 0.5, uHairB.y * 0.5 + soft, d)) * sin(t * 3.1415927);
        c = mix(c, vec3(uHairB.z > 0.0 ? 0.85 : 0.0), k * abs(uHairB.z));
      }
    }
  }
  // Царапины: через весь кадр, чуть виляют. По длине плавно то ярче, то
  // бледнее и изредка рвутся — шум по 16 ячеек; рваные куски по ячейке
  // выходили пунктиром
  for (int i = 0; i < 2; i++) {
    vec4 s = uScratch[i];
    if (s.z == 0.0) continue;
    float dx = abs(q.x - s.x - sin(q.y * 0.012 + s.w) * s.y);
    float lim = s.y * 0.5 + soft;
    if (dx > lim) continue;
    float t = q.y / (uCell * 16.0);
    float i0 = floor(t);
    float n = mix(hash(vec2(i0, s.w)), hash(vec2(i0 + 1.0, s.w)), smoothstep(0.0, 1.0, t - i0));
    float k = (1.0 - smoothstep(s.y * 0.5, lim, dx)) * smoothstep(0.08, 0.4, n);
    c = mix(c, vec3(s.z > 0.0 ? 0.8 : 0.0), k * abs(s.z));
  }
  return c * uFlicker;
}

void main() {
  float col = floor(gl_FragCoord.x);
  float row = floor(gl_FragCoord.y);
  // Нечётные столбцы сдвинуты на полъячейки вниз
  float lift = mod(col, 2.0) * 0.5;
  vec2 cc = vec2(col + 0.5, row + 0.5 - lift) * uCell;

  // След под ячейкой — один на всю ячейку, чтобы она не рвалась
  vec2 dir = vec2(0.0);
  float s = 0.0;
  if (uTrailOn > 0.5) {
    vec3 tr = texture(uTrail, vec2(cc.x, uRes.y - cc.y) / uRes).rgb;
    dir = tr.rg * 2.0 - 1.0;
    s = tr.b;
  }

  // Картинка под ячейкой тянется за мышью: берём цвет из-за спины движения
  vec2 q = cc - dir * s * uDrag;
  // RGB-след: красный утащен дальше, синий ближе — кайма по ходу мыши
  vec2 fringe = dir * s * uDrag * uFringe;
  float y = cc.y / uRes.y;
  float snow = 0.0;
  for (int i = 0; i < 4; i++) {
    vec4 b = uBands[i];
    float inBand = step(b.x, y) * step(y, b.y);
    q.x += b.z * inBand;
    snow = max(snow, b.w * inBand);
  }
  q.x += uComb * (mod(row, 2.0) * 2.0 - 1.0);
  q.y += uRoll;
  q += uWeave;

  vec3 c = vec3(photo(q - fringe + vec2(uSplit, 0.0)).r, photo(q).g, photo(q + fringe - vec2(uSplit, 0.0)).b);
  if (uFilm > 0.5) c = film(c, q, col, row);

  float dotAmount = 0.0;
  if (s > 0.004) {
    vec3 plain = photo(cc);
    // Темнота — по тому, что видно, и по тому, что было на месте
    float dark = 1.0 - smoothstep(0.05, 0.36, max(luma(c), luma(plain)));
    // Кромка сдвига: где утащенное отличается от того, что было на месте
    float edge = abs(luma(c) - luma(plain));
    // У RGB-следа кромка светится своими каналами: где канал утащен, там
    // его и свет. Красная кайма с одной стороны, синяя с другой
    if (uRgb > 0.5) c += abs(c - plain) * s + s * s * dark * 0.05;
    else c += uInk * (edge * s + s * s * dark * 0.05);
    // Точки: ячейка решётки горит цветом следа. Порог у каждой свой —
    // гаснут вразнобой
    float on = step(mod(col, uDotEvery), 0.5) * step(mod(row, uDotEvery), 0.5);
    float h = hash(vec2(col, row)) * 0.55;
    dotAmount = smoothstep(h, h + 0.16, s) * dark * on;
  }

  // Снег в полосах сбоя — с оттенком цвета следа. У RGB-следа оттенок у
  // каждой ячейки свой из трёх каналов — цветной снег
  if (snow > 0.0) {
    float n = hash(vec2(col, row) + uSeed);
    vec3 ink = uInk;
    if (uRgb > 0.5) {
      float k = floor(hash(vec2(row, col) + uSeed * 1.7) * 3.0);
      ink = k < 0.5 ? uTri[0] : k < 1.5 ? uTri[1] : uTri[2];
    }
    c = mix(c, mix(vec3(n), ink * n, 0.4), snow);
  }
  c *= 1.0 + uFlash;

  outColor = vec4(c, dotAmount);
}`,s=`#version 300 es
precision highp float;
uniform sampler2D uCells;
uniform vec2 uRes;
uniform float uCell;
uniform float uMask;
// 1 — серая маска, 0 — RGB
uniform float uGray;
uniform vec3 uInk;
// RGB-след: точки по столбцам — красные, зелёные, синие (uTri)
uniform float uRgb;
uniform vec3 uTri[3];
uniform float uDotEvery;
out vec4 outColor;

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  float col = floor(p.x / uCell);
  float lift = mod(col, 2.0) * 0.5;
  float row = floor(p.y / uCell + lift);
  // Пиксель внутри ячейки
  vec2 lp = p - vec2(col, row - lift) * uCell;
  vec4 cell = texelFetch(uCells, ivec2(col, row), 0);

  // Маска: три полоски и тёмный зазор; нижняя строка — зазор
  float stripe = floor(lp.x / uCell * 4.0);
  vec3 m;
  if (uGray > 0.5) {
    m = vec3(stripe > 2.5 ? 0.12 : abs(stripe - 1.0) < 0.5 ? 1.0 : 0.82);
  } else {
    m = stripe < 0.5 ? vec3(1.0, 0.28, 0.28)
      : stripe < 1.5 ? vec3(0.28, 1.0, 0.28)
      : stripe < 2.5 ? vec3(0.28, 0.28, 1.0)
      : vec3(0.12);
  }
  float gapRow = step(uCell - 1.0, lp.y);
  m *= mix(1.0, 0.2, gapRow);
  vec3 c = cell.rgb * mix(vec3(1.0), m / mix(0.336, 0.552, uGray), uMask);

  // Точка следа горит цветом следа поверх маски — в полосках, не в зазоре.
  // У RGB-следа столбцы точек по очереди красные, зелёные, синие — та же
  // щелевая маска, только крупно
  float lit = step(stripe, 2.5) * (1.0 - gapRow);
  vec3 ink = uInk;
  if (uRgb > 0.5) {
    float k = mod(floor(col / uDotEvery), 3.0);
    ink = k < 0.5 ? uTri[0] : k < 1.5 ? uTri[1] : uTri[2];
  }
  outColor = vec4(mix(c, ink, cell.a * lit), 1.0);
}`,d={split:0,bands:[],comb:0,roll:0,flash:0,seed:0},h=(e,t)=>e+(t-e)*Math.random(),v=()=>.5>Math.random()?-1:1;function p(e,t,r){let o=1+Math.floor(Math.random()*t),a=[];for(let t=0;t<o;t++){let t=.94*Math.random();a.push([t,t+h(.012,.11),v()*h(10,70)*e,Math.random()<r?h(.2,.5)*e:0])}return{split:2+h(6,14)*e,bands:a,comb:0,roll:0,flash:h(.04,.12)*e,seed:100*Math.random()}}function x({host:e,canvas:t,img:r,ink:E,rgbTrail:g=!1,mask:w,film:T,speck:R,ramp:b="off",rampMask:M=!1,cues:F,veil:y}){let _="off"===T?"off":b,A=new Float32Array(l.flat()),C=t.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,powerPreference:"low-power",failIfMajorPerformanceCaveat:!0});if((0,u.lL)(!!C),!C)return null;let D=!1,S=null,B=null,P=null,I=null,L=null,U=null,k=!1,G=!1,X=0,N=0,H=1,W=[1,1,0,0],q=0,z=!0,O=!1,j=()=>{if(L){for(let e of(C.clearColor(.5,.5,0,1),[L.read,L.write]))C.bindFramebuffer(C.FRAMEBUFFER,e.fbo),C.clear(C.COLOR_BUFFER_BIT);C.bindFramebuffer(C.FRAMEBUFFER,null)}},Y=0,$=()=>{},K=()=>{let e;if(!r.complete||!r.naturalWidth)return;let t=++Y;$(),(e=()=>r.decode().catch(()=>{}).then(()=>r),!("userAgentData"in navigator)||"function"!=typeof createImageBitmap?e():fetch(r.currentSrc||r.src,{cache:"force-cache"}).then(e=>e.ok?e.blob():Promise.reject(Error(String(e.status)))).then(e=>createImageBitmap(e,{premultiplyAlpha:"none",colorSpaceConversion:"default"})).catch(e)).then(e=>{let o=()=>{e!==r&&e.close()};if(t!==Y)return o();let a=(0,u.dV)(()=>{if($=()=>{},D||G||t!==Y||!r.naturalWidth)return o();I&&C.deleteTexture(I),I=(0,n.ZC)(C,e,{mipmap:!0}),o(),z=!0,eP()},1e3);$=()=>{a(),o()}})},J=()=>{S=(0,n.rC)(C,n.Iu,m),B=(0,n.rC)(C,n.Iu,c),P=(0,n.rC)(C,n.Iu,s),k=!!C.getExtension("EXT_color_buffer_float"),I=null,L?.dispose(),L=null,(0,n.jQ)(C,U),U=null,C.disable(C.BLEND),K()};try{J()}catch(e){return console.warn("[portrait] WebGL setup failed",e),null}let V=!1,Q=0,Z=-1e9,ee=-1e9,et=null,er=null,eo=0/0,ea=0/0,ei=e=>{if("mouse"!==e.pointerType)return;let r=t.getBoundingClientRect(),o=e.clientX-r.left,a=e.clientY-r.top,i=o>=r.width*Q&&a>=0&&o<r.width&&a<r.height,u=e.clientX!==eo||e.clientY!==ea;if(eo=e.clientX,ea=e.clientY,!i){V&&(V=!1,et=null,er=null,eP());return}V=!0,u&&(Z=performance.now(),et={x:o/r.width,y:a/r.height},eP())},eu=()=>{V=!1,et=null,er=null,eP()},en=!1,el=e=>{e!==en&&(en=e,e?(window.addEventListener("pointermove",ei,{passive:!0}),document.documentElement.addEventListener("mouseleave",eu)):(window.removeEventListener("pointermove",ei),document.documentElement.removeEventListener("mouseleave",eu),eu()))},ef=!1,em=!1,ec=!1,es=0,ed=-1e9,eh=()=>{let e=ef&&!em;if(e!==ec){ec=e;let t=performance.now();e?t-ed>2e3?es=t:es+=t-ed:ed=t}el(e),e&&"off"!==T&&eP()},ev=new IntersectionObserver(([e])=>{ef=e.isIntersecting,eh()});ev.observe(e);let ep=0,ex=()=>{let e=!!y?.hasAttribute("data-in");clearTimeout(ep),ep=0,e&&!em?ep=window.setTimeout(()=>{em=!0,eh()},1200):!e&&em&&(em=!1,eh())},eE=y?new MutationObserver(ex):null;y&&(eE?.observe(y,{attributes:!0,attributeFilter:["data-in"]}),ex());let eg=new Map,ew=new IntersectionObserver(e=>{for(let t of e){let e=t.boundingClientRect;if(!e.width&&!e.height){eg.delete(t.target);continue}let r=eg.get(t.target);eg.set(t.target,t.isIntersecting),void 0!==r&&r!==t.isIntersecting&&Math.abs(e.top)<window.innerHeight&&(eI([{...p(1,4,.5),split:h(16,24),comb:h(4,7),roll:v()*h(.015,.04),flash:.3},{...p(.85,3,.4),comb:h(2,4),flash:.12},{...d,split:3,flash:-.5},p(.6,3,.3),p(.45,2,.2),d,p(.3,2,0),d,p(.18,1,0),d],40,performance.now()),eP())}},{rootMargin:"100000% 0px -100% 0px"});for(let e of F)ew.observe(e);let eT=0,eR=0,eb=0,eM=null,eF=0,ey="",e_=!1,eA=0,eC=-1e9,eD=!1,eS=!1,eB=!1,eP=()=>{eR&&(clearTimeout(eR),eR=0),eT||D||G||(eT=requestAnimationFrame(e1))},eI=(e,t,r)=>{eM={t0:r,stepMs:t,bursts:e,n:++eF}},eL="full"===T,eU=new Float32Array(32),ek=new Float32Array(4),eG=new Float32Array(4),eX=0,eN=new Float32Array(8),eH=[0,0],eW=[0,0],eq=[0,0],ez=0,eO=-1e9,ej=1,eY=0,e$=0,eK=F[0]?.parentElement??null,eJ=+("off"===_),eV=new Float32Array(16),eQ=new Float32Array(32),eZ=new Float32Array(8),e0=(r,o,a)=>{if(B&&P&&I&&L&&U){B.use(),(0,n.PE)(C,U),(0,n.Rm)(C,0,I),(0,n.Rm)(C,1,L.read.tex),C.uniform1i(B.u("uImage"),0),C.uniform1i(B.u("uTrail"),1),C.uniform2f(B.u("uRes"),t.width,t.height),C.uniform4f(B.u("uCover"),W[0],W[1],W[2],W[3]),C.uniform1f(B.u("uLod"),q),C.uniform1f(B.u("uCell"),4),C.uniform1f(B.u("uSplit"),(.3*("gray"!==w)+r.split)*H);for(let e=0;e<4;e++){let t=r.bands[e];eV.set(t?[t[0],t[1],t[2]*H,t[3]]:[-1,-1,0,0],4*e)}C.uniform4fv(B.u("uBands"),eV),C.uniform1f(B.u("uComb"),r.comb*H),C.uniform1f(B.u("uRoll"),r.roll*t.height),C.uniform1f(B.u("uFlash"),r.flash),C.uniform1f(B.u("uSeed"),r.seed),C.uniform1f(B.u("uDrag"),24*H),C.uniform1f(B.u("uTrailOn"),+!!a),C.uniform3f(B.u("uInk"),E[0],E[1],E[2]),C.uniform1f(B.u("uDotEvery"),6),C.uniform1f(B.u("uRgb"),+!!g),C.uniform1f(B.u("uFringe"),.4*!!g),C.uniform3fv(B.u("uTri"),A),(e=>{let r=t.width,o=t.height;if(C.uniform1f(e.u("uFilm"),+("off"!==T)),C.uniform2f(e.u("uWeave"),eY*H*eJ,e$*H*eJ),"off"!==T){C.uniform1f(e.u("uFrame"),ez),C.uniform1f(e.u("uGrain"),eL?.07*eJ:0),C.uniform1f(e.u("uFlicker"),1+(ej-1)*eJ);for(let e=0;e<32;e+=4){eQ[e]=eU[e]*r,eQ[e+1]=eU[e+1]*o;let t=eU[e+2]*o;eQ[e+2]=Math.max(t,3.2),eQ[e+3]=eU[e+3]*Math.min(1,(t/3.2)**2)}C.uniform4fv(e.u("uDust"),eQ),C.uniform4f(e.u("uHair"),ek[0]*r,ek[1]*o,ek[2]*o,ek[3]),C.uniform4f(e.u("uHairB"),eG[0],Math.max(eG[1]*H,3),eG[2],0);for(let e=0;e<8;e+=4)eZ[e]=eN[e]*r,eZ[e+1]=Math.max(eN[e+1]*H,3.6),eZ[e+2]=eN[e+2],eZ[e+3]=eN[e+3];C.uniform4fv(e.u("uScratch"),eZ)}})(B),(0,n.eJ)(C),P.use(),(0,n.PE)(C,null),(0,n.Rm)(C,0,U.tex),C.uniform1i(P.u("uCells"),0),C.uniform2f(P.u("uRes"),t.width,t.height),C.uniform1f(P.u("uCell"),4),C.uniform1f(P.u("uMask"),.6*(M?.5+.5*eJ:1)),C.uniform1f(P.u("uGray"),+("gray"===w)),C.uniform3f(P.u("uInk"),E[0],E[1],E[2]),C.uniform1f(P.u("uRgb"),+!!g),C.uniform3fv(P.u("uTri"),A),C.uniform1f(P.u("uDotEvery"),6),(0,n.eJ)(C),u.PJ.draws++,ey=o,eB=r===d&&!a,eS||(eS=!0,e.setAttribute("data-screen",""))}};function e1(l){if(eT=0,D||G||(0,a.mD)())return;if(!(0,o.S)(l))return void eP();let m=eb?Math.min((l-eb)/1e3,.1):1/60;eb=l;let c=z&&(()=>{var o;let a,u,l;if(z=!1,X=t.clientWidth,N=t.clientHeight,!X||!N||!I||!r.naturalWidth)return!1;Q=parseFloat(getComputedStyle(e).getPropertyValue("--screen-from"))||0,O=!!F[0]&&"none"!==getComputedStyle(F[0]).display;let f=Math.min((0,i.pT)()*(window.devicePixelRatio||1),Math.sqrt(6e6/(X*N))),m=Math.max(1,Math.round(X*f)),c=Math.max(1,Math.round(N*f));(t.width!==m||t.height!==c)&&(t.width=m,t.height=c),H=m/X;let s=Math.ceil(m/4),d=Math.floor(c/4+.5)+1;U&&U.w===s&&U.h===d||((0,n.jQ)(C,U),U=(0,n.Yn)(C,s,d,{float:k,linear:!1}));let h=Math.max(2,Math.round(X/6)),v=Math.max(2,Math.round(N/6));L&&L.read.w===h&&L.read.h===v||(L?.dispose(),L=(0,n.Do)(C,h,v,{linear:!0}),j());let p=r.naturalWidth,x=r.naturalHeight,E=Math.max(X/p,N/x),g=p*E,w=x*E,[T,R]=(o=getComputedStyle(r).objectPosition,a={left:0,top:0,center:.5,right:1,bottom:1},u=o.trim().split(/\s+/),[(l=e=>{if(!e)return .5;if(e in a)return a[e];if(e.endsWith("%")){let t=parseFloat(e);return Number.isFinite(t)?t/100:.5}return .5})(u[0]),l(u[1])]),b=(X-g)*T,M=(N-w)*R;return W=[1/(H*g),1/(H*w),-b/g,-M/w],q=Math.log2(Math.max(1,p/(H*g)*4)),!0})(),s=performance.now(),v="off"!==T&&ef&&!em,x=!1;if(v&&s>=eO+f-8){eO=s-eO>2*f?s:eO+f;let e=(e=>{if("off"===_)return 1;if("warm"===_)return Math.min(1,Math.max(0,(e-es)/3e3));if(!O||!eK)return 1;if("steps"===_){let e=0;for(let t of eg.values())t&&e++;return(e+1)/(F.length+1)}let t=eK.getBoundingClientRect(),r=t.height-window.innerHeight;return r<=0?1:Math.min(1,Math.max(0,(-t.top/r-.05)/(.85-.05)))})(s);x=e>0||eJ>0,eJ=e,x&&(()=>{ez=(ez+1)%251,ej=1+(Math.random()-.5)*(eL?.07:.04),eU.fill(0);let e=Math.min(8,function(e){let t=Math.exp(-e),r=0,o=Math.random();for(;o>t;)r++,o*=Math.random();return r}((eL?3:2.2)*eJ));for(let t=0;t<e;t++){let e=Math.random(),r=(.08>Math.random()?h(.014,.026):.0035+.009*e*e)/R,o=.7>Math.random()?h(.6,1):-h(.6,.95);eU.set([Math.random(),Math.random(),r,o],4*t)}if(eX>0?(eX--,ek[0]+=h(-.002,.002),ek[1]+=h(-.002,.002),ek[3]+=h(-.03,.03)):Math.random()<(eL?.025:1/60)*eJ?(eX=Math.floor(h(0,4)),ek.set([Math.random(),Math.random(),h(.05,.2),Math.random()*Math.PI*2]),eG.set([h(.6,1.8),h(1.2,2.2),.6>Math.random()?-h(.65,.9):h(.6,.85),0])):eG[2]=0,eL){for(let e=0;e<2;e++){let t=4*e;eH[e]>0?(eH[e]--,eN[t]+=eW[e]+h(-3e-4,3e-4),eN[t+2]=eq[e]*h(.55,1),.5>Math.random()&&(eN[t+3]=100*Math.random())):Math.random()<eJ/60?(eH[e]=Math.round(h(14,72)),eW[e]=h(-2e-4,2e-4),eq[e]=.65>Math.random()?h(.3,.5):-h(.3,.5),eN.set([Math.random(),h(.8,1.5),eq[e],100*Math.random()],t)):eN[t+2]=0}eY=.6*eY+h(-.5,.5),e$=.6*e$+h(-.35,.35)}})(),(0,u.te)()}let E=V&&l-Z<3e3;E&&!e_&&(eA=Math.max(eA,l+h(150,450))),e_=E;let g=!!et&&!!er&&(et.x!==er.x||et.y!==er.y),w=g||l-ee<2e3,b=w?((e,t,r)=>{if(!L||!S)return 0;let o=0,a=0,u=[0,0],l=[0,0],f=[0,0];if(r&&et&&er){let r=(et.x-er.x)*X,i=(et.y-er.y)*N,n=Math.hypot(r,i)||1;o=Math.min(1,Math.max(.18,(a=n/Math.max(e,1/240))/1400)),u=[er.x*L.read.w,(1-er.y)*L.read.h],l=[et.x*L.read.w,(1-et.y)*L.read.h],f=[r/n,i/n],ee=t,eD=!0}return S.use(),(0,n.PE)(C,L.write),(0,n.Rm)(C,0,L.read.tex),C.uniform1i(S.u("uPrev"),0),C.uniform2f(S.u("uSize"),L.read.w,L.read.h),C.uniform1f(S.u("uKeep"),Math.pow(.5,e/.45)),C.uniform1f(S.u("uFloor"),Math.max(.75*e*60,.6)/255),C.uniform1f(S.u("uSpread"),.35*Math.min(1,60*e)),C.uniform2f(S.u("uA"),u[0],u[1]),C.uniform2f(S.u("uB"),l[0],l[1]),C.uniform1f(S.u("uRadius"),7*(0,i.vN)()/6),C.uniform2f(S.u("uDir"),f[0],f[1]),C.uniform1f(S.u("uForce"),o),(0,n.eJ)(C),L.swap(),a})(m,l,g):0;if(er=et?{x:et.x,y:et.y}:null,E&&!eM&&(l>=eA||b>2200&&l-eC>450)){let e=function(){let e=2+Math.floor(3*Math.random()),t=[];for(let r=0;r<e;r++)t.push(r>0&&.3>Math.random()?d:p(h(.45,.8),2,.2));return t}();eI(e,55,l),eC=l,eA=l+55*e.length+h(700,1600)}let[M,y]=(e=>{if(eM){let t=Math.max(0,Math.floor((e-eM.t0)/eM.stepMs));if(t<eM.bursts.length)return[eM.bursts[t],`${eM.n}:${t}`];eM=null}return[d,"calm"]})(l);if(!w&&!eM){var A;eb=0,A=c||x,eD&&(j(),eD=!1),(A||!eB)&&e0(d,"calm",!1);let e=E?eA-l:1/0;v&&(e=Math.min(e,eO+f-8-s)),e<1/0&&(eR=window.setTimeout(eP,Math.max(0,e)));return}(w||y!==ey||c||x)&&e0(M,y,eD),eP()}let e2=new ResizeObserver(()=>{z=!0,eP()});e2.observe(t);let e3=()=>{z=!0,eP()};window.addEventListener("resize",e3);let e5=()=>{G||K()};r.addEventListener("load",e5);let e4=(0,a.mZ)(()=>{(0,a.mD)()||eP()}),e6=t=>{t.preventDefault(),G=!0,cancelAnimationFrame(eT),eT=0,clearTimeout(eR),eR=0,eS=!1,eB=!1,ey="",e.removeAttribute("data-screen")},e8=()=>{G=!1,z=!0;try{J()}catch(e){console.warn("[portrait] WebGL restore failed",e)}};return t.addEventListener("webglcontextlost",e6),t.addEventListener("webglcontextrestored",e8),()=>{D=!0,cancelAnimationFrame(eT),clearTimeout(eR),$(),ev.disconnect(),ew.disconnect(),eE?.disconnect(),clearTimeout(ep),e2.disconnect(),el(!1),window.removeEventListener("resize",e3),r.removeEventListener("load",e5),t.removeEventListener("webglcontextlost",e6),t.removeEventListener("webglcontextrestored",e8),e4(),e.removeAttribute("data-screen"),G||(S?.dispose(),B?.dispose(),P?.dispose(),I&&C.deleteTexture(I),L?.dispose(),(0,n.jQ)(C,U)),t.isConnected||C.getExtension("WEBGL_lose_context")?.loseContext()}}}}]);