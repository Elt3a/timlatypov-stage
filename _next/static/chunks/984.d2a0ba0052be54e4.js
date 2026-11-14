"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[984],{1984:(e,t,a)=>{a.r(t),a.d(t,{budget:()=>n,create:()=>d});let r=-1/0;var o=a(7825),l=a(870),i=a(9724);let n=26e5,f=`#version 300 es
layout(location = 0) in vec2 aCorner;
layout(location = 1) in vec4 aA;
layout(location = 2) in vec4 aB;
layout(location = 3) in vec2 aC;
uniform vec2 uRes;
out vec2 vLocal;
out vec4 vB;
out vec2 vC;
void main() {
  float pad = aC.y + 1.5;
  vec2 ext = vec2(aB.x * 0.5 + pad, aB.y * 0.5 + pad);
  vec2 local = aCorner * ext;
  vec2 dir = aA.zw;
  vec2 nrm = vec2(-dir.y, dir.x);
  vec2 p = aA.xy + dir * local.x + nrm * local.y;
  vLocal = local;
  vB = aB;
  vC = aC;
  gl_Position = vec4(p / uRes * 2.0 - 1.0, 0.0, 1.0);
}`,c=l.El+l.o$+`
in vec2 vLocal;
in vec4 vB;
in vec2 vC;
out vec4 o;
void main() {
  float r = vB.y * 0.5;
  float hl = max(vB.x * 0.5 - r, 0.0);
  vec2 q = vec2(max(abs(vLocal.x) - hl, 0.0), vLocal.y);
  float d = length(q) - r;
  float aa = 0.7 + vC.y;
  float a = 1.0 - smoothstep(-aa, aa, d);
  o = vec4(iri(vB.w, vC.x) * (a * vB.z), 1.0);
}`,u=`
uniform sampler2D uParticles;
uniform vec2 uRes;
uniform float uTime;
uniform float uPx;
uniform float uReveal;
uniform float uArrive;
uniform vec4 uPointer;
in vec2 vUv;
out vec4 o;

#ifdef HERO
${l.ly}
#endif

#ifdef GLITCH
// Два сбоя разом: плановый и от клика. Рамка — в пикселях буфера;
// параметры — вид (1 разрыв, 2 мозаика, 3 потёк), возраст, сдвиг, зерно
uniform vec4 uGRect[2];
uniform vec4 uGParam[2];
#endif

vec3 particles(vec2 p) {
#ifdef GLITCH
  for (int i = 0; i < 2; i++) {
    vec4 g = uGParam[i];
    vec4 r = uGRect[i];
    if (g.x < 0.5 || p.x < r.x || p.x > r.z || p.y < r.y || p.y > r.w) continue;
    float st = floor(g.y / 0.070);
    float hs = hash12(vec2(st, g.w * 97.0));
    float rowH = (7.0 + 12.0 * hs) * uPx;
    float hr = hash12(vec2(floor((p.y - r.y) / rowH), st + g.w * 13.0));
    if (g.x < 1.5) {
      // Разрыв: полосы уезжают вбок, по краям — бирюзовая и салатовая тени
      vec2 q = p + vec2((hr - 0.5) * 2.0 * g.z, 0.0);
      float sp = 4.0 * uPx;
      vec3 a = texture(uParticles, q / uRes).rgb;
      float b = texture(uParticles, (q + vec2(sp, 0.0)) / uRes).g;
      float c = texture(uParticles, (q - vec2(sp, 0.0)) / uRes).g;
      return a * 0.8 + vec3(0.06, 0.8, 0.7) * b * 0.5 + vec3(0.7, 1.0, 0.25) * c * 0.35;
    }
    if (g.x < 2.5) {
      /* Мозаика, как битый кадр видео: блоки по 10–16 px, в блоке — самый
         яркий его свет, часть блоков залита ровным тёмно-зелёным. Среднее
         вместо самого яркого гасило редкие капсулы, и сбоя не было видно */
      float bs = (10.0 + 6.0 * hs) * uPx;
      vec2 cb = floor(p / bs);
      vec2 c0 = (cb + 0.5) * bs;
      vec3 m = vec3(0.0);
      for (int k = 0; k < 9; k++) {
        vec2 o3 = (vec2(float(k % 3), float(k / 3)) - 1.0) * bs * 0.33;
        m = max(m, texture(uParticles, (c0 + o3) / uRes).rgb);
      }
      float hb = hash12(cb + st * 7.0 + g.w * 31.0);
      return m * (0.7 + 0.6 * hb) + C_DEEP * step(0.68, hb) * 0.5;
    }
    // Потёк: капсулы тянутся вниз — ярчайшее из точек выше
    vec3 m = vec3(0.0);
    for (int k = 0; k < 7; k++) {
      float fk = float(k);
      m = max(m, texture(uParticles, (p + vec2(0.0, fk * (5.0 + 6.0 * hr) * uPx)) / uRes).rgb * (1.0 - fk * 0.11));
    }
    return m;
  }
#endif
  return texture(uParticles, p / uRes).rgb;
}

void main() {
  vec2 p = gl_FragCoord.xy;
  vec2 uv = p / uRes;
  float aspect = uRes.x / uRes.y;
  vec3 col = C_BASE;

  // Горизонт: изумрудное зарево снизу, разгорается с появлением
  float hx = (uv.x - 0.5) * aspect;
  float horizon = exp(-uv.y * 3.6) * (0.55 + 0.45 * exp(-hx * hx * 1.4));
#ifdef HERO
  // Хиро до своей очереди пуст: интро заголовка идёт по чистому фону
  float td = titleD(p);
  float rv = smoothstep(0.0, 0.7, uReveal);
  col += (C_DEEP * horizon * 0.8 + C_ACID * horizon * horizon * 0.04) * uReveal;
#else
  float rv = 0.35 + 0.65 * uReveal;
  col += C_DEEP * horizon * (0.3 + 0.9 * uReveal);
  col += C_ACID * horizon * horizon * 0.04;
#endif

  // Пыль по сетке, как точки \xabХолста\xbb, только живая: мерцает, у курсора ярче
  float cell = 21.0 * uPx;
  vec2 g = p / cell;
  vec2 id = floor(g);
  float h = hash12(id);
  float dd = length((fract(g) - 0.5) * cell);
  float tw = 0.5 + 0.5 * sin(uTime * (0.5 + h * 1.6) + h * 50.0);
  float md = length(p - uPointer.xy) / uPx;
  float near = exp(-md * md / (2.0 * 170.0 * 170.0));
  float dotA = 1.0 - smoothstep(0.55 * uPx, 1.35 * uPx, dd);
  float dust = dotA * (0.05 + 0.12 * tw * h + 0.4 * near);
#ifdef HERO
  // У слова пыль гуще и ложится контуром в стороне от букв, как опилки
  // у магнита; к краям экрана стихает
  float aura = 0.5 + 0.7 * exp(-max(td - 60.0, 0.0) / 160.0);
  float rr = (td - 70.0) / 26.0;
  dust *= aura * (1.0 + 1.8 * exp(-rr * rr));
#endif
  col += mix(C_DEEP, C_ACID, 0.3 + 0.45 * near) * dust * rv;

  col += particles(p);

  // Волна импульса: тонкое кольцо бежит от точки клика
  for (int i = 0; i < 4; i++) {
    vec4 b = uBursts[i];
    if (b.z > 3.0) continue;
    float r = b.z * (520.0 + 380.0 * b.w) * uPx;
    float d = (length(p - b.xy) - r) / uPx;
    float ring = exp(-d * d / 18.0) + 0.25 * exp(-d * d / 400.0);
    col += mix(C_ACID, C_PALE, 0.35) * ring * exp(-b.z * 1.8) * b.w * 0.3;
  }

#ifdef HERO
  // Финал: от слова расходится волна — сначала по его рамке, дальше кругом
  if (uArrive < 3.0) {
    vec2 c0 = 0.5 * (uWord.xy + uWord.zw);
    vec2 q = abs(p - c0) - 0.5 * (uWord.zw - uWord.xy);
    float box = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
    float d = (box - uArrive * 900.0 * uPx) / uPx;
    float ring = exp(-d * d / 24.0) + 0.35 * exp(-d * d / 1600.0);
    float wake = d < 0.0 ? exp(d / 200.0) : 0.0;
    float fade = exp(-uArrive * 1.2);
    col += (mix(C_ACID, C_PALE, 0.45) * ring * 0.42 + C_DEEP * wake * 0.4) * fade;
  }
#else
  // Финал: дуга волны поднимается из-под нижнего края
  if (uArrive < 3.0) {
    vec2 c0 = vec2(uRes.x * 0.5, -uRes.y * 0.35);
    float r = uRes.y * 0.35 + uArrive * 1100.0 * uPx;
    float d = (length(p - c0) - r) / uPx;
    float ring = exp(-d * d / 24.0) + 0.35 * exp(-d * d / 1600.0);
    // За фронтом — тёмный изумрудный шлейф, а не сплошное зарево
    float wake = d < 0.0 ? exp(d / 220.0) : 0.0;
    float fade = exp(-uArrive * 1.1);
    col += (mix(C_ACID, C_PALE, 0.45) * ring * 0.5 + C_DEEP * wake * 0.5) * fade;
  }
#endif

#ifdef GLITCH
  // У разрыва по краям полосы — тонкие строки помех
  for (int i = 0; i < 2; i++) {
    vec4 gp = uGParam[i];
    vec4 r = uGRect[i];
    if (gp.x < 0.5 || gp.x > 1.5 || p.x < r.x || p.x > r.z) continue;
    float e = min(abs(p.y - r.y), abs(p.y - r.w)) / uPx;
    col += C_ACID * exp(-e * e * 2.0) * 0.12;
  }
#endif

  // Края темнее — взгляд держится в середине
  vec2 v = (uv - 0.5) * vec2(1.0, 1.25);
  col *= 1.0 - 0.35 * smoothstep(0.35, 0.95, length(v));

  col = soft(col);
  col += grain(p, uTime) * 0.025;
  // Зоны тишины — только там, где есть что гасить (aboveFloor, glsl.ts)
  if (aboveFloor(col)) {
#ifdef HERO
    // Ров вокруг каждой буквы: у контура фон не светлее потолка мелкого текста
    col = capLum(col, calmCap(max(calmAt(p), moat(td, 44.0))));
#else
    col = capLum(col, calmCap(calmAt(p)));
#endif
  }
  o = vec4(max(col, 0.0), 1.0);
}`,h=e=>{let t=e<0?0:e>1?1:e;return t*t*(3-2*t)},s=2*Math.PI,x=()=>({kind:0,x0:0,y0:0,x1:0,y1:0,age:0,dur:0,shift:0,seed:0,step:-1});function d(e){return function(e,t){let{gl:a,caps:n,coarse:d,common:v}=e,m="footer"!==t,p="glitch"===t,M=(0,o.rC)(a,f,c),y=(0,o.rC)(a,o.Iu,l.El+("footer"!==t?"#define HERO 1\n":"")+("glitch"===t?"#define GLITCH 1\n":"")+l.Xd+l.o$+l.cy+l.K1+u),A=m?(0,i.$6)(a,e.host,e.layer):null,b=a.createVertexArray(),g=a.createBuffer(),R=a.createBuffer();a.bindVertexArray(b),a.bindBuffer(a.ARRAY_BUFFER,g),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),a.STATIC_DRAW),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,2,a.FLOAT,!1,0,0),a.bindBuffer(a.ARRAY_BUFFER,R);a.enableVertexAttribArray(1),a.vertexAttribPointer(1,4,a.FLOAT,!1,40,0),a.vertexAttribDivisor(1,1),a.enableVertexAttribArray(2),a.vertexAttribPointer(2,4,a.FLOAT,!1,40,16),a.vertexAttribDivisor(2,1),a.enableVertexAttribArray(3),a.vertexAttribPointer(3,2,a.FLOAT,!1,40,32),a.vertexAttribDivisor(3,1),a.bindVertexArray(null);let P=null,C=1,E=1,w=1,_=0,k=0,B=0,F=0,D=1,I=-1,L=0,z=[0,0],O=x(),T=x(),G=4+3*Math.random(),q=new Float32Array(8),H=new Float32Array(8),V=new Float32Array(0),N=V,U=V,Y=V,W=V,j=V,$=V,S=V,K=V,Q=V,J=V,X=V,Z=V,ee=V,et=0,ea=1,er=0,eo=0,el=0,ei=0,en=e=>{et=Math.max(1,Math.round(B*(ea=Math.min(1,Math.max(.35,e))))),eo=0,el=0,ei=0},ef=(e,t,a,r)=>{for(let o=0;o<et;o++){let l=j[o]-e,i=$[o]-t,n=Math.hypot(l,i)+1,f=1500*a*Math.exp(-n/r)/n;S[o]+=l*f-i*f*.25,K[o]+=i*f+l*f*.25}},ec={x0:0,y0:0,x1:0,y1:0};return{resize(e,t,r){C=e,E=t,w=r,(0,o.jQ)(a,P),P=(0,o.Yn)(a,e,t,{float:n.float});let l=e/w,i=t/w;(Math.abs(l-_)>1||Math.abs(i-k)>1)&&(_=l,k=i,(()=>{let e=d?28:21,t=d?1400:4e3,a=_+96,r=k+96;a*r/(e*e)>t&&(e=Math.sqrt(a*r/t));let o=Math.ceil(a/e);B=o*Math.ceil(r/e);let l=()=>new Float32Array(B);V=l(),N=l(),U=l(),Y=l(),W=l(),j=l(),$=l(),S=l(),K=l(),Q=l(),J=l(),X=l(),Z=l().fill(1e4),ee=new Float32Array(10*B);let i=new Uint32Array(B);for(let e=0;e<B;e++)i[e]=e;for(let e=B-1;e>0;e--){let t=Math.floor(Math.random()*(e+1)),a=i[e];i[e]=i[t],i[t]=a}for(let t=0;t<B;t++){let a=i[t]%o,r=Math.floor(i[t]/o);V[t]=-48+(a+.5+(Math.random()-.5)*.9)*e,N[t]=-48+(r+.5+(Math.random()-.5)*.9)*e,U[t]=Math.pow(Math.random(),1.6),Y[t]=Math.random(),W[t]=3+10*U[t],j[t]=V[t],$[t]=N[t]+160,Q[t]=1}en(ea)})()),A?.update()},frame(e){if(!P)return;let t=e.time,l=e.dt,n=e.pointer.x/w,f=k-e.pointer.y/w,c=e.pointer.charge,u=e.reveal;A&&(!A.ready||e.frame%20==0)&&A.update();let x=A?.ready?A:null;m&&(0,i.mB)(A,e,_,k,ec);let d=1;if(m){I<0&&(I=e.scroll);let t=l>0?(e.scroll-I)/l:0;I=e.scroll,L+=(t-L)*(1-Math.exp(-(8*l))),d=Math.max(-12,Math.min(40,1+26*L+5*e.scroll))}for(let t of e.bursts)if(!(t.id<=F)&&(ef(t.x/w,k-t.y/w,t.power,260),D=0,p&&e.pointer.auto<.5)){let e=t.x/w,a=k-t.y/w,r=70+40*Math.random(),o=18+12*Math.random();Object.assign(T,{kind:1,x0:e-r,y0:a-o,x1:e+r,y1:a+o,age:0,step:-1}),T.dur=.22,T.shift=14+10*Math.random(),T.seed=Math.random()}e.bursts.length&&(F=Math.max(F,e.bursts[0].id));let g=h(D=Math.min(1,D+.9*l));if(p){for(let e of[O,T])e.kind&&(e.age+=l,e.age>=e.dur&&(e.kind=0));!O.kind&&u>.97&&t>G&&(((e,t)=>{let a=Math.random(),r=a<.38?1:a<.62?4:a<.82?2:3,[o,l,i,n]=1===r?[220,560,26,80]:2===r?[90,220,40,110]:3===r?[120,300,50,120]:[160,380,60,140],f=(ec.x0+ec.x1)/2,c=(ec.y0+ec.y1)/2,u=(ec.x1-ec.x0)/2,h=(ec.y1-ec.y0)/2;for(let a=0;a<10;a++){let a=o+(l-o)*Math.random(),x=i+(n-i)*Math.random(),d=Math.random()*s,v=60+200*Math.random(),m=Math.max(16,Math.min(_-16-a,f+Math.cos(d)*(u+v)-a/2)),p=Math.max(16,Math.min(k-16-x,c+Math.sin(d)*(h+v)-x/2)),M=m+a,y=p+x,b=!0;if(A?.ready)for(let e=0;e<9&&b;e++){let t=m+e%3*a/2,r=p+x*Math.floor(e/3)/2;36>A.sample(t,r)&&(b=!1)}let g=t.calm.rects;for(let e=0;e<t.calm.n&&b;e++){let t=g[4*e]/w-16,a=g[4*e+2]/w+16,r=k-g[4*e+3]/w-16,o=k-g[4*e+1]/w+16;m<a&&M>t&&p<o&&y>r&&(b=!1)}if(b)return Object.assign(e,{kind:r,x0:m,y0:p,x1:M,y1:y,age:0,step:-1,seed:Math.random()}),e.dur=.12+.18*Math.random(),e.shift=10+24*Math.random(),!0}return!1})(O,e)&&function(e=2500){let t=performance.now();return!(t-r<e)&&(r=t,!0)}(2200)?G=t+4.5+3.5*Math.random():(O.kind=0,G=t+.6))}let B=4===O.kind?O:null,eu=0,eh=0;if(B){let e=Math.floor(B.age/.07);e!==B.step&&(B.step=e,eu=(.5>Math.random()?-1:1)*(8+10*Math.random()),eh=(Math.random()-.5)*6)}let es=e.arriveAge<10?Math.exp(-(1.3*e.arriveAge)):0,ex=e.arriveAge<3?Math.exp(-e.arriveAge*(m?1.2:1.1)):0,ed=m?(ec.x0+ec.x1)/2:_/2,ev=m?(ec.y0+ec.y1)/2:1.35*k,em=(ec.x1-ec.x0)/2,ep=(ec.y1-ec.y0)/2,eM=m?900*e.arriveAge:.35*k+1100*e.arriveAge,ey=e.focusK,eA=(e.focus.x0+e.focus.x1)/2/w,eb=k-(e.focus.y0+e.focus.y1)/2/w,eg=(e.focus.x1-e.focus.x0)/2/w+10,eR=(e.focus.y1-e.focus.y0)/2/w+10,eP=230*(1+.1*c),eC=92*(1-.42*c),eE=.55+2.6*c,ew=1.2*c,e_=k+96,ek=performance.now();for(let e=0;e<et;e++){let a=U[e],r=Y[e],o=d;m&&Z[e]<90&&(o+=2.5*(1-h(Z[e]/90))),N[e]-=W[e]*l*o,N[e]<-48?(N[e]+=e_,$[e]+=e_):N[e]>k+48&&(N[e]-=e_,$[e]-=e_);let i=1.3*Math.sin(.0045*V[e]+.16*t+.7*r)+1.1*Math.cos(.0052*N[e]-.12*t),v=Math.cos(i),p=Math.sin(i),M=6+10*a,y=V[e]+v*M,A=N[e]+p*M,b=h((u-(.62*Math.min(1,Math.max(0,1-N[e]/k))+.2*r))/.16);if(A+=(1-b)*160,x){let t=x.sample(y,A);if(Z[e]=t,t<64){x.grad(y,A,z);let e=(64-t)*.85,a=r<.5?-.45:.45;y+=(z[0]-z[1]*a)*e,A+=(z[1]+z[0]*a)*e}}let R=y-n,P=A-f,C=eP*(.9+.2*a),E=(1-h((Math.hypot(R,P)-.3*C)/(.7*C)))*b*(1-ey)*g,_=X[e]+l*eE*E*E-1.6*l*(1-E)*X[e];_>Math.PI?_-=s:_<-Math.PI&&(_+=s),X[e]=_;let F=Math.atan2(P,R)+_+ew,D=Math.cos(F),I=Math.sin(F),L=eC*(.82+.36*a)*(1+.16*(r-.5))+6*Math.sin(5*F+1.7*t+4*a),O=y+(n+D*L-y)*E,T=A+(f+I*L-A)*E;if(c>.01){let e=c*E*1.6;O+=Math.sin(37*t+91*r)*e,T+=Math.cos(41*t+57*r)*e}let G=-I,q=D,H=0;if(ey>.001){let e=y-eA,o=A-eb,l=Math.hypot(e,o)+1e-4,i=e/l,n=o/l,f=Math.pow(Math.pow(Math.abs(i)/eg,4)+Math.pow(Math.abs(n)/eR,4),-.25);if((H=(1-h((l-f)/150))*ey*b)>.001){let e=f+4+12*a+3*Math.sin(2*t+20*r);O+=(eA+i*e-O)*H,T+=(eb+n*e-T)*H,G+=(-n-G)*H,q+=(i-q)*H}}let et=Math.max(E,H),ea=null!==B&&j[e]>=B.x0&&j[e]<=B.x1&&$[e]>=B.y0&&$[e]<=B.y1,er=0,eo=0,el=0;if(ea)j[e]+=eu,$[e]+=eh;else{let t=22+70*et,a=2*Math.sqrt(t)*.6;if(er=S[e]+(t*(O-j[e])-a*S[e])*l,eo=K[e]+(t*(T-$[e])-a*K[e])*l,ex){let t=j[e]-ed,a=$[e]-ev,r=0,o=0,i=0;if(m){let e=Math.abs(t)-em,l=Math.abs(a)-ep;e>0&&l>0?(i=Math.hypot(e,l),r=Math.sign(t)*e/i,o=Math.sign(a)*l/i):e>l?(i=Math.max(e,0),r=Math.sign(t)||1):(i=Math.max(l,0),o=Math.sign(a)||1)}else i=Math.hypot(t,a)||1,r=t/i,o=a/i;let n=(i-eM)/60,f=15e3*l*(el=ex*Math.exp(-n*n));er+=r*f,eo+=o*f}let r=Math.hypot(er,eo);r>2600&&(er*=2600/r,eo*=2600/r),j[e]+=er*l,$[e]+=eo*l}S[e]=er,K[e]=eo;let ei=v*(1-et)+G*et*2+er/140,en=p*(1-et)+q*et*2+eo/140,ef=Math.hypot(ei,en)||1;ei/=ef,en/=ef;let ec=Math.min(1,7*l),ek=Q[e]+(ei-Q[e])*ec,eB=J[e]+(en-J[e])*ec,eF=Math.hypot(ek,eB)||1;ek/=eF,eB/=eF,Q[e]=ek,J[e]=eB;let eD=1,eI=0;if(x){let t=x.sample(j[e],$[e]);eI=Math.exp(-Math.max(t-60,0)/140),eD=h((t-8)/42)*(.55+.95*eI)}let eL=Math.min(Math.hypot(er,eo),2600),ez=((.16+.34*a)*(1+1.9*et)*(.72+.28*Math.sin(t*(1.1+2.3*r)+40*r))*b*(1+.8*es+2.2*el)+c*E*.5)*eD*(ea?1.4:1),eO=(4+5*a)*(1+.8*et+(m?Math.min(eL/220,2.4):Math.min(eL/500,1.6))),eT=10*e;ee[eT]=j[e]*w,ee[eT+1]=(k-$[e])*w,ee[eT+2]=ek,ee[eT+3]=-eB,ee[eT+4]=eO*w,ee[eT+5]=(1.3+1.2*a)*w,ee[eT+6]=ez,ee[eT+7]=ea?.75:.36+.2*a+.34*et+.12*c*E+.15*es+.3*el+.14*eI,ee[eT+8]=ea?-Math.PI/2:.004*V[e]+.003*N[e]+.35*t+et*F,ee[eT+9]=(1-a)*1.4*w}((e,t)=>{if(eo<20){eo++,er=e;return}(er+=(e-er)*.08)>2.5&&ea>.35?(el+=t)>.5&&en(ea*Math.max(.6,2.25/er)):el=0,er<1.25&&ea<1?(ei+=t)>4&&en(ea/.85):ei=0})(performance.now()-ek,l),(0,o.PE)(a,P),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE),M.use(),a.uniform2f(M.u("uRes"),C,E),a.bindVertexArray(b),a.bindBuffer(a.ARRAY_BUFFER,R),a.bufferData(a.ARRAY_BUFFER,ee,a.DYNAMIC_DRAW,0,10*et),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,et),a.bindVertexArray(null),a.disable(a.BLEND),(0,o.PE)(a,null,C,E),y.use(),v(y,e),(0,o.Rm)(a,0,P.tex),a.uniform1i(y.u("uParticles"),0),A&&(0,i.Gm)(a,y,A,1,ec,w,k),p&&([O,T].forEach((e,t)=>{let a=e.kind>0&&e.kind<4;q[4*t]=e.x0*w,q[4*t+1]=(k-e.y1)*w,q[4*t+2]=e.x1*w,q[4*t+3]=(k-e.y0)*w,H[4*t]=a?e.kind:0,H[4*t+1]=e.age,H[4*t+2]=e.shift*w,H[4*t+3]=e.seed}),a.uniform4fv(y.u("uGRect"),q),a.uniform4fv(y.u("uGParam"),H)),(0,o.eJ)(a)},dispose(){(0,o.jQ)(a,P),A?.dispose(),a.deleteBuffer(g),a.deleteBuffer(R),a.deleteVertexArray(b),M.dispose(),y.dispose()}}}(e,"footer")}}}]);