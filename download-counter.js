(function(){
var map={
"aml.mkweli.tech":{p:"aml",s:1254,sel:'#apk-download,a[href*=".apk"]'},
"lakazagri.mkweli.tech":{p:"lakazagri",s:875,sel:'#download a[href*=".apk"]'},
"grid.mkweli.tech":{p:"grid",s:28,sel:'#download a[href*=".apk"],a[href*=".apk"]'},
"ceb.mkweli.tech":{p:"grid",s:28,sel:'#download a[href*=".apk"],a[href*=".apk"]'},
"assimilate-pro.mkweli.tech":{p:"assimilate",s:2438,sel:'#apk-link,a[href*=".apk"]'}
};
function isApkHref(h){
  return /\.apk($|[?#])/i.test(h||"");
}
var host=location.hostname.replace(/^www\./,"");
var cfg=map[host];
if(!cfg){
if(/aml|mkweli-website/i.test(location.pathname+location.href)) cfg=map["aml.mkweli.tech"];
else if(/lakaz/i.test(location.pathname+location.href)) cfg=map["lakazagri.mkweli.tech"];
else if(/grid|ceb/i.test(location.pathname+location.href)) cfg=map["grid.mkweli.tech"];
else if(/assimilate/i.test(location.pathname+location.href)) cfg=map["assimilate-pro.mkweli.tech"];
}
if(!cfg) return;
var api="https://api.counterapi.dev/v1/mkweli-tech/apk-"+cfg.p;
if(!document.getElementById("dl-counter-style")){
var st=document.createElement("style");
st.id="dl-counter-style";
st.textContent=".dl-counter{margin:.4rem 0 .75rem;font-size:.72rem;letter-spacing:.03em;font-weight:500;opacity:.72}";
document.head.appendChild(st);
}
function ready(fn){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",fn);else fn();}
ready(function(){
var hostEl=document.querySelector("[data-dl-counter]");
if(!hostEl){
var a=document.querySelector(cfg.sel);
if(!a)return;
hostEl=document.createElement("p");
hostEl.className="dl-counter";
hostEl.setAttribute("data-dl-counter","");
hostEl.setAttribute("aria-live","polite");
var box=a.closest(".download-actions,.hero-actions,.download-main,.download-band,.download-copy")||a.parentElement;
box.appendChild(hostEl);
}
// Only mark / track true APK file URLs (not release pages or source links)
document.querySelectorAll("a[href]").forEach(function(a){
var h=a.getAttribute("href")||"";
if(isApkHref(h)) a.setAttribute("data-dl-link","");
else a.removeAttribute("data-dl-link");
});
var last=cfg.s;
function render(n){last=n;hostEl.textContent=n.toLocaleString("en-US")+" downloads";}
render(cfg.s);
fetch(api+"/").then(function(r){return r.ok?r.json():null;}).then(function(d){
if(d&&typeof d.count==="number")render(cfg.s+d.count);
}).catch(function(){});
var lock=false;
function track(ev){
var t=ev&&ev.currentTarget;
var h=t&&t.getAttribute?t.getAttribute("href"):"";
if(!isApkHref(h)) return;
if(lock)return;lock=true;setTimeout(function(){lock=false;},2000);
fetch(api+"/up").then(function(r){return r.ok?r.json():null;}).then(function(d){
if(d&&typeof d.count==="number")render(cfg.s+d.count);else render(last+1);
}).catch(function(){render(last+1);});
}
document.querySelectorAll("a[href]").forEach(function(a){
if(isApkHref(a.getAttribute("href")||"")) a.addEventListener("click",track);
});
});
})();
