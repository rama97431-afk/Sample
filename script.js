/* ===== DATA: replace placeholders with real content. Stats and the 2024 founding entry come from the club site. ===== */
var STATS=[{l:"Active members",v:150,s:"+"},{l:"Events organised",v:4,s:""},{l:"Core team",v:18,s:""}];
var TEAM=[{n:"Placeholder member name",r:"Core team, role",a:"Short description of what they achieved or won."},
 {n:"Placeholder member name",r:"Core team, role",a:"Short description of what they achieved or won."},
 {n:"Placeholder member name",r:"Core team, role",a:"Short description of what they achieved or won."}];
var GAL=[{t:"Hackathon moment",c:"Hackathons",k:"w"},{t:"Winning team",c:"Hackathons",k:"t"},{t:"Workshop session",c:"Events"},
 {t:"Core team meet",c:"Core Team",k:"w"},{t:"Prize ceremony",c:"Events",k:"t"},{t:"Demo day",c:"Hackathons"},{t:"Team photo",c:"Core Team"},{t:"Club event",c:"Events",k:"w"}];
var TL=[{y:"2024",t:"Machine Magnets established",d:"The club was founded in September 2024 at NIET."},
 {y:"2024",t:"Placeholder: first event",d:"Replace with the real milestone."},
 {y:"2025",t:"Placeholder: first hackathon",d:"Replace with the real milestone."},
 {y:"2025",t:"Placeholder: first winners",d:"Replace with the real milestone."},
 {y:"2025",t:"Placeholder: core team award",d:"Replace with the real milestone."},
 {y:"2026",t:"Placeholder: new achievement",d:"Replace with the real milestone."},
 {y:"2026",t:"Placeholder: latest result",d:"Replace with the real milestone."}];
/* ===== */
var RM=matchMedia("(prefers-reduced-motion: reduce)").matches;if(RM)document.documentElement.classList.add("rm");
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

$("stats").innerHTML=STATS.map(function(s){return '<div><dd data-v="'+s.v+'" data-s="'+s.s+'" aria-label="'+s.v+s.s+' '+s.l+'">0'+s.s+'</dd><dt>'+s.l+'</dt></div>'}).join("");
$("teamg").innerHTML=TEAM.map(function(m,i){return '<article class="glass mem rv" style="--d:'+i*130+'ms"><div class="av" aria-hidden="true"></div><p class="meta">'+m.r+'</p><h3>'+esc(m.n)+'</h3><p>'+esc(m.a)+'</p><span class="tag">Placeholder</span></article>'}).join("");

/* headings */
document.querySelectorAll(".rt").forEach(function(h){var t=h.dataset.t;if(!t)return;h.setAttribute("aria-label",t);
 h.innerHTML=t.split(" ").map(function(w,i){return '<span class="word" aria-hidden="true"><span style="--i:'+i+'">'+w+'</span></span> '}).join("")});

/* gallery */
var G=["linear-gradient(135deg,#6e0f1f,#15110f)","linear-gradient(160deg,#d8b36a,#a3182b)","linear-gradient(120deg,#2a0d12,#a3182b)","linear-gradient(150deg,#15110f,#d8b36a)","linear-gradient(135deg,#a3182b,#6e0f1f 60%,#15110f)"];
$("gal").innerHTML=GAL.map(function(g,i){return '<figure class="tile '+(g.k||"")+' rv" data-c="'+g.c+'" style="margin:0;--d:'+i*70+'ms" tabindex="0"><div class="ph" style="background:'+G[i%G.length]+'"></div><figcaption>'+g.t+' · '+g.c+'</figcaption></figure>'}).join("");
$("chips").innerHTML=["All","Hackathons","Events","Core Team"].map(function(c){return '<button type="button" data-c="'+c+'" aria-pressed="'+(c==="All")+'">'+c+'</button>'}).join("");
$("chips").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var c=b.dataset.c;
 document.querySelectorAll("#chips button").forEach(function(x){x.setAttribute("aria-pressed",x===b)});
 var tiles=document.querySelectorAll(".tile");tiles.forEach(function(t){t.classList.add("out")});
 setTimeout(function(){tiles.forEach(function(t){var show=c==="All"||t.dataset.c===c;t.style.display=show?"":"none";t.style.transitionDelay="0ms";t.classList.add("seen");
  if(show)requestAnimationFrame(function(){requestAnimationFrame(function(){t.classList.remove("out")})})})},RM?0:260)});

/* spotlight on glass */
document.addEventListener("pointermove",function(e){var g=e.target.closest&&e.target.closest(".glass");if(!g)return;var r=g.getBoundingClientRect();
 g.style.setProperty("--mx",(e.clientX-r.left)+"px");g.style.setProperty("--my",(e.clientY-r.top)+"px")},{passive:true});

/* reveal + count */
function count(el){var v=+el.dataset.v,s=el.dataset.s;if(RM){el.textContent=v+s;return}var t0=performance.now();
 (function tick(t){var p=Math.min((t-t0)/1200,1);el.textContent=Math.round(v*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(tick)})(t0)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("seen");e.target.querySelectorAll("[data-v]").forEach(count);io.unobserve(e.target)}})},{threshold:.18,rootMargin:"0px 0px -6% 0px"});
document.querySelectorAll(".rv,.rt").forEach(function(el){io.observe(el)});

/* nav active */
var links={};document.querySelectorAll(".nav nav a").forEach(function(a){links[a.getAttribute("href").slice(1)]=a});
var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){Object.keys(links).forEach(function(k){links[k].removeAttribute("aria-current")});
 var a=links[e.target.id];if(a){a.setAttribute("aria-current","true");a.scrollIntoView({inline:"center",block:"nearest"})}}})},{threshold:.35});
document.querySelectorAll("[data-sec]").forEach(function(s){if(links[s.id])so.observe(s)});

/* wheel timeline */
var N=TL.length,STEP=24,wheel=$("wheel"),sec=$("timeline"),cap=$("cap"),cur=-1;
wheel.innerHTML=TL.map(function(t,i){return '<div class="it" style="transform:rotate('+i*STEP+'deg)"><div class="c glass dark"><b>'+t.y+'</b><span>'+esc(t.t)+'</span></div></div>'}).join("");
$("tlf").innerHTML=TL.map(function(t){return '<li><b>'+t.y+'</b> '+esc(t.t)+'<br>'+esc(t.d)+'</li>'}).join("");
var its=wheel.querySelectorAll(".it");
function setCap(i){cur=i;cap.classList.add("sw");setTimeout(function(){$("cy").textContent=TL[i].y;$("ct").textContent=TL[i].t;$("cd").textContent=TL[i].d;cap.classList.remove("sw")},RM?0:180)}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}

/* scroll loop: progress bar, parallax blobs, wheel rotation */
var par=document.querySelectorAll("[data-speed]"),bar=$("bar"),raf=0;
function frame(){raf=0;var h=document.documentElement.scrollHeight-innerHeight;bar.style.transform="scaleX("+(h>0?scrollY/h:0)+")";
 if(!RM)par.forEach(function(b){var r=b.parentElement.getBoundingClientRect();if(r.bottom<-200||r.top>innerHeight+200)return;b.style.transform="translate3d(0,"+(r.top*parseFloat(b.dataset.speed)).toFixed(1)+"px,0)"});
 if(!RM){var r2=sec.getBoundingClientRect(),p=clamp(-r2.top/(sec.offsetHeight-innerHeight),0,1),rot=-p*(N-1)*STEP;
  wheel.style.transform="rotate("+rot.toFixed(2)+"deg)";var act=Math.round(p*(N-1));
  its.forEach(function(it,i){var d=Math.abs(i*STEP+rot),c=it.firstChild;c.style.setProperty("--o",clamp(1.15-d/(STEP*3.2),0,1).toFixed(2));c.style.setProperty("--s",(1-clamp(d/(STEP*5),0,.28)).toFixed(3));it.classList.toggle("on",i===act)});
  if(act!==cur)setCap(act)}}
function req(){if(!raf)raf=requestAnimationFrame(frame)}
addEventListener("scroll",req,{passive:true});addEventListener("resize",req);
if(!RM)setCap(0);frame();
