"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[274],{8274:(e,o,t)=>{t.r(o),t.d(o,{budget:()=>f,hero:()=>i});var a=t(7825),l=t(870),r=t(9724);let f=24e5,u=2*Math.sqrt(60)*.3,s=2*Math.sqrt(60)*.75,c=l.El+l.Xd+l.o$+l.cy+l.K1+`
uniform vec2 uRes;
uniform float uTime;
uniform float uPx;
uniform float uReveal;
uniform float uPre;
uniform float uArrive;
uniform vec4 uPointer;
uniform vec4 uFocus;
uniform float uFocusK;
${l.ly}
// Капсула слова: рамка композиции хиро в пикселях раскладки, y вверх
uniform vec4 uBody;
// xy — сдвиг ткани (дрейф и параллакс), z — масса слова, w — сила сигналов
uniform vec4 uSpace;
// Воронка курсора: xy — центр (пиксели буфера), z — глубина A, w — радиус a
uniform vec4 uWell;
// x — клетка, y — каждая какая линия главная, z — заряд кнопки, w — сколько
// воронки набралось после волны
uniform vec4 uGrid;
in vec2 vUv;
out vec4 o;

// Сдвиг у букв и как быстро он гаснет — пиксели раскладки
const float WORD_A = 70.0;
const float WORD_L = 170.0;
// Скорость волн, пикселей раскладки в секунду
const float WAVE_V = 560.0;
/* Капсула по рамке: ось вдоль длинной стороны, радиус — половина высоты.
   Возвращает расстояние до края (внутри минус), в n — направление от оси,
   в R — радиус */
float capsule(vec2 q, vec4 b, out vec2 n, out float R) {
  vec2 c = 0.5 * (b.xy + b.zw);
  vec2 h = 0.5 * (b.zw - b.xy);
  R = max(h.y, 1.0);
  float hx = max(h.x - R, 0.0);
  vec2 v = q - c;
  vec2 d = v - vec2(clamp(v.x, -hx, hx), 0.0);
  float l = length(d);
  n = d / max(l, 1e-3);
  return l - R;
}

float stroke(float d, float w) {
  return clamp(w * 0.5 + 0.5 - d, 0.0, 1.0);
}

// Тело-точка: сдвиг от центра, наибольший — A на расстоянии a
vec2 pointMass(vec2 q, vec2 c, float A, float a) {
  vec2 d = q - c;
  return d * (2.0 * A * a / (dot(d, d) + a * a));
}

// Сигнал по линии: x — путь вдоль неё, голова в head, хвост позади
float signal(float x, float head, float dir, float period) {
  float s = mod((head - x) * dir, period);
  float f = period - s;
  return 0.5 * exp(-s / 80.0) + exp(-s * s / 32.0) + exp(-f * f / 32.0);
}

void main() {
  vec2 p = gl_FragCoord.xy;
  vec2 uv = p / uRes;
  vec2 q = p / uPx;
  float t = uTime;
  float rv = clamp(uReveal, 0.0, 1.0);

  /* Расстояние до капсулы слова и направление от её оси. Внутри сдвиг к
     оси гаснет: на самой оси направление переворачивается, и без этого
     ткань там рвалась бы */
  vec2 G;
  float R;
  float D = capsule(q, uBody, G, R);
  G *= smoothstep(-R, 0.0, D);

  // Слово тяжёлое: ткань стянута к нему
  vec2 shift = G * (WORD_A * uSpace.z * exp(-max(D, 0.0) / WORD_L));

  // Воронка курсора
  vec2 wc = uWell.xy / uPx;
  shift += pointMass(q, wc, uWell.z, uWell.w);

  // Кнопка под курсором — тоже тело, рамкой: сетка её обнимает
  if (uFocusK > 0.01) {
    vec2 c = 0.5 * (uFocus.xy + uFocus.zw) / uPx;
    vec2 h = 0.5 * (uFocus.zw - uFocus.xy) / uPx;
    vec2 v = q - c;
    vec2 out2 = max(abs(v) - h, 0.0);
    float df = length(out2);
    shift += sign(v) * out2 / max(df, 1e-3) * (24.0 * uFocusK * exp(-df / 70.0) * smoothstep(0.0, 8.0, df));
  }

  /* Клик: масса уходит волной. Один гребень сжатия бежит кольцом, по его
     фронту — тонкая светлая окружность: иначе волна читается дрожью линий.
     Амплитуда \xd7 волновое число держится ниже единицы — иначе ткань на
     гребне перехлёстывается и линии завиваются петлями */
  float wave = 0.0;
  float rim = 0.0;
  for (int i = 0; i < 4; i++) {
    vec4 b = uBursts[i];
    if (b.z > 4.5) continue;
    vec2 d = q - b.xy / uPx;
    float r = length(d);
    float x = r - b.z * WAVE_V;
    float k = (0.35 + 0.65 * b.w) * smoothstep(0.0, 60.0, r);
    float env = exp(-x * x / 4050.0) * exp(-b.z / 1.2) * k;
    shift += d / max(r, 1.0) * (9.0 * env * sin(x * 0.065));
    wave += env;
    rim += stroke(abs(x + 10.0) * uPx, 1.3 * uPx) * exp(-b.z / 0.9) * k;
  }

  // Финал: две волны расходятся от слова его же контуром — капсулами
  float accent = 0.0;
  if (uArrive < 5.0) {
    for (int k = 0; k < 2; k++) {
      float a = uArrive - float(k) * 0.32;
      if (a < 0.0) continue;
      float x = D - a * 640.0;
      float kk = k == 0 ? 1.0 : 0.6;
      float env = exp(-x * x / 9800.0) * exp(-a / 1.3) * kk;
      shift += G * (10.0 * env * sin(x * 0.06));
      accent += env;
      rim += stroke(abs(x + 10.0) * uPx, 1.3 * uPx) * exp(-a / 1.0) * kk * smoothstep(0.0, 30.0, D);
    }
  }

  vec2 u = q + shift + uSpace.xy;

  /* Сколько ткани на пиксель буфера: расстояние до линии в пикселях
     экрана — разность в ткани, делённая на градиент. comp — во сколько
     раз ткань стянута по площади */
  vec2 ux = dFdx(u);
  vec2 uy = dFdy(u);
  float gx = max(length(vec2(ux.x, uy.x)), 1e-4);
  float gy = max(length(vec2(ux.y, uy.y)), 1e-4);
  float comp = abs(ux.x * uy.y - ux.y * uy.x) * uPx * uPx;

  float cell = uGrid.x;
  float major = cell * uGrid.y;
  vec2 fm = abs(fract(u / cell + 0.5) - 0.5) * cell;
  vec2 fM = abs(fract(u / major + 0.5) - 0.5) * major;
  float w = 0.75 * uPx;
  // Где ткань стянута так, что мелкие линии ближе пяти пикселей, они гаснут
  float lodX = smoothstep(4.0, 9.0, cell / (gx * uPx));
  float lodY = smoothstep(4.0, 9.0, cell / (gy * uPx));
  float minor = max(stroke(fm.x / gx, w) * lodX, stroke(fm.y / gy, w) * lodY);
  float lineX = stroke(fM.x / gx, w);
  float lineY = stroke(fM.y / gy, w);
  float majorL = max(lineX, lineY);
  // Кресты на пересечениях главных линий
  float arm = 6.0;
  float plus = max(stroke(fM.y / gy, w * 1.7) * (1.0 - smoothstep(arm - 1.5, arm, fM.x)),
                   stroke(fM.x / gx, w * 1.7) * (1.0 - smoothstep(arm - 1.5, arm, fM.y)));

  /* Сигналы: по некоторым главным линиям бежит светлая метка с хвостом.
     Считаются в ткани — и гнутся вместе с ней. Только на самих главных
     линиях: вне их сигнал умножается на ноль, а шесть хэшей и шесть
     экспонент на каждый пиксель экрана — заметная доля шейдера */
  float sig = 0.0;
  if (majorL > 0.0) {
    vec2 kM = floor(u / major + 0.5);
    float hv = hash12(vec2(kM.x, 7.3));
    float hh = hash12(vec2(kM.y, 11.9));
    float pv = 1400.0 + 900.0 * hash12(vec2(kM.x, 1.7));
    float ph = 1600.0 + 900.0 * hash12(vec2(kM.y, 2.9));
    float dv = hv > 0.8 ? 1.0 : -1.0;
    float dh = hh > 0.8 ? 1.0 : -1.0;
    float sv = (110.0 + 70.0 * hash12(vec2(kM.x, 3.1))) * dv;
    float sh = (110.0 + 70.0 * hash12(vec2(kM.y, 5.3))) * dh;
    sig = step(0.6, hv) * lineX * signal(u.y, t * sv + hv * pv, dv, pv)
        + step(0.6, hh) * lineY * signal(u.x, t * sh + hh * ph, dh, ph);
  }

  /* Появление: ткань проявляется от слова наружу, фронт — светлый контур.
     Фронт идёт не на равное расстояние, а на равную долю пути от капсулы
     до края экрана: s = D / (D + E), E — до ближнего края. Так он выходит
     капсулой, расправляется в рамку экрана и ложится на неё — ко всем
     краям разом. На равном расстоянии он проскакивал верх и низ за
     полсекунды и дальше тянулся только к углам. Ближний край — мягким
     минимумом, иначе на диагоналях фронт ломался бы углом.
     Когда появление доиграло, ткань видна вся, а фронта нет — всё это
     не считается (ветка по uniform-у, одна на весь кадр) */
  float on = 1.0;
  float front = 0.0;
  if (rv < 1.0) {
    vec2 lr = uRes / uPx;
    vec4 e4 = max(vec4(q, lr - q), 0.0);
    float E = max(-40.0 * log(dot(exp(-e4 / 40.0), vec4(1.0))), 1.0);
    float s = D / max(D + E, 1.0);
    float ease = 1.0 - (1.0 - rv) * (1.0 - rv);
    float fr = mix(-0.04, 1.02, ease);
    /* За фронтом ткань проявляется не сразу; у краёв дозаполняется к концу.
       Внутри капсулы s < 0, и там ткань видна ещё до фронта — за словом.
       Её проявляет преддверие (uPre, engine.ts): пока слово собирается,
       ткань за ним плавно выходит из прозрачности, а с началом появления
       от него идёт фронт. Без преддверия она возникала за буквами рывком,
       в момент монтирования холста */
    on = max(1.0 - smoothstep(fr - 0.3, fr, s), smoothstep(0.75, 1.0, rv)) * max(uPre, smoothstep(0.0, 0.1, rv));
    // До фронта в пикселях буфера
    float fd = abs(s - fr) / max(fwidth(s), 1e-5);
    front = (stroke(fd, 1.2 * uPx) * 0.8 + 0.2 * exp(-fd / (20.0 * uPx)))
          * (1.0 - smoothstep(0.8, 1.0, rv)) * step(0.0, fr);
  }

  // Ярче у слова, у курсора и там, где ткань стянута
  float near = exp(-max(D, 0.0) / 320.0);
  float rr = length(q - wc);
  float lamp = exp(-rr * rr / 51200.0);
  float dens = clamp(sqrt(comp), 0.7, 2.6);
  float lit = (0.45 + 0.55 * near + 0.7 * lamp) * dens;

  vec3 lineC = mix(C_DEEP * 1.7, C_ACID, 0.3 + 0.35 * near + 0.3 * lamp);
  vec3 col = C_BASE;
  col += lineC * (0.075 * minor + 0.13 * majorL + 0.36 * plus) * lit * on;
  col += mix(C_ACID, C_PALE, 0.4) * sig * 0.55 * uSpace.w * on * (0.5 + 0.5 * near);
  // Волны подсвечивают ткань, по которой проходят
  float wv = wave + accent;
  col += C_ACID * wv * (0.12 * minor + 0.35 * majorL + 0.4 * plus) * on;
  col += C_DEEP * wv * 0.1 * on;
  col += mix(C_ACID, C_PALE, 0.6) * front * 0.7;
  col += mix(C_ACID, C_PALE, 0.45) * rim * 0.45 * on;

  // Воронка: при заряде ядро темнеет, по краю — тонкое кольцо
  float charge = uGrid.z;
  float ra = uWell.w;
  float core = 0.3 * ra;
  if (charge > 0.0) col *= 1.0 - 0.6 * charge * exp(-rr * rr / (2.0 * core * core));
  float ringD = abs(rr - ra * 0.62) * uPx;
  col += mix(C_ACID, C_PALE, 0.3 * charge) * stroke(ringD, uPx) * (0.05 + 0.45 * charge) * uGrid.w * on;

  // Края темнее — взгляд держится в середине
  vec2 vg = (uv - 0.5) * vec2(1.0, 1.25);
  col *= 1.0 - 0.35 * smoothstep(0.35, 0.95, length(vg));

  col = soft(col);
  col += grain(p, t) * 0.018;
  // Зоны тишины и ров у букв — только там, где есть что гасить
  if (aboveFloor(col)) col = capLum(col, calmCap(max(calmAt(p), moat(titleD(p), 34.0))));
  o = vec4(max(col, 0.0), 1.0);
}`,x=(e,o,t)=>{let a=Math.min(1,Math.max(0,(t-e)/(o-e)));return a*a*(3-2*a)},i={budget:f,create:e=>{let{gl:o,common:t}=e,l=(0,a.rC)(o,a.Iu,c),f=(0,r.$6)(o,e.host,e.layer),i={x0:0,y0:0,x1:0,y1:0},m=!1,n={x0:0,y0:0,x1:0,y1:0},v={x:0,y:0},h=1,p=1,d=1,y=1,g=1,k=-1,w=0,b=0,P=0,M=0,C=1;return{resize(e,o,t){h=e,p=o,y=e/(d=t),g=o/d,f.update()},frame(c){let D=c.dt,A=c.time;if(!f.ready||c.frame%20==0){let o,t;f.update(),(m=4===(t=(o=e.host.dataset.bodyBox)?o.split(",").map(Number):[]).length&&t.every(Number.isFinite))&&(i.x0=t[0],i.y0=t[1],i.x1=t[2],i.y1=t[3])}(0,r.mB)(f,c,y,g,n);let _=m?i:f.ready&&f.groups[0]?f.groups[0]:n;k<0&&(k=c.scroll);let E=D>0?(c.scroll-k)/D:0;k=c.scroll;let R=-2.4+.4*Math.sin(.04*A),q=7*(1+Math.min(20,30*Math.abs(w+=(E-w)*(1-Math.exp(-(6*D))))));v.x+=Math.cos(R)*q*D,v.y+=Math.sin(R)*q*D;let z=c.scroll*g*.35,F=e.host.hasAttribute("data-tg-hover"),G=F?x(.25,.6,c.reveal):0,W=F?u:s,L=Math.max(1,Math.ceil(240*D)),j=D/L;for(let e=0;e<L;e++)P+=(60*(G-b)-W*P)*j,b+=P*j;for(let e of(b<0&&(b=0,P=0),c.bursts))e.id<=M||(C=Math.min(C,.15));c.bursts.length&&(M=Math.max(M,c.bursts[0].id)),C=Math.min(1,C+D/1.3);let B=c.pointer.charge,I=C*C*(3-2*C),S=x(.35,.85,c.reveal)*I;(0,a.PE)(o,null,h,p),l.use(),t(l,c),(0,r.Gm)(o,l,f,0,n,d,g),o.uniform1f(l.u("uPre"),c.pre),o.uniform4f(l.u("uBody"),_.x0-10,g-_.y1-10,_.x1+10,g-_.y0+10),o.uniform4f(l.u("uSpace"),v.x,v.y+z,b,x(.8,1,c.reveal)),o.uniform4f(l.u("uWell"),c.pointer.x,c.pointer.y,(28+50*B)*S,84-30*B),o.uniform4f(l.u("uGrid"),c.narrow?32:44,4,B,S),(0,a.eJ)(o)},dispose(){f.dispose(),l.dispose()}}}}}}]);