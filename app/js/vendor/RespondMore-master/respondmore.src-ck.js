/* Altered to utilize media-match instead of match-media for deeper support back to IE6 *//* MediaMatch v.2.0.2 poyfill by (c) 2013: WebLinc, David Knight. */window.matchMedia||(window.matchMedia=function(e){"use strict";var t=e.document,n=t.documentElement,r=[],i=0,s="",o={},u=/\s*(only|not)?\s*(screen|print|[a-z\-]+)\s*(and)?\s*/i,a=/^\s*\(\s*(-[a-z]+-)?(min-|max-)?([a-z\-]+)\s*(:?\s*([0-9]+(\.[0-9]+)?|portrait|landscape)(px|em|dppx|dpcm|rem|%|in|cm|mm|ex|pt|pc|\/([0-9]+(\.[0-9]+)?))?)?\s*\)\s*$/,f=0,l=function(e){var t=e.indexOf(",")!==-1&&e.split(",")||[e],n=t.length-1,r=n,i=null,f=null,l="",c=0,h=!1,p="",d="",v=null,m=0,g=0,y=null,b="",w="",E="",S="",x="",T=!1;if(e==="")return!0;do{i=t[r-n];h=!1;f=i.match(u);if(f){l=f[0];c=f.index}if(!f||i.substring(0,c).indexOf("(")===-1&&(c||!f[3]&&l!==f.input)){T=!1;continue}d=i;h=f[1]==="not";if(!c){p=f[2];d=i.substring(l.length)}T=p===s||p==="all"||p==="";v=d.indexOf(" and ")!==-1&&d.split(" and ")||[d];m=v.length-1;g=m;if(T&&m>=0&&d!=="")do{y=v[m].match(a);if(!y||!o[y[3]]){T=!1;break}b=y[2];w=y[5];S=w;E=y[7];x=o[y[3]];E&&(E==="px"?S=Number(w):E==="em"||E==="rem"?S=16*w:y[8]?S=(w/y[8]).toFixed(2):E==="dppx"?S=w*96:E==="dpcm"?S=w*.3937:S=Number(w));b==="min-"&&S?T=x>=S:b==="max-"&&S?T=x<=S:S?T=x===S:T=!!x;if(!T)break}while(m--);if(T)break}while(n--);return h?!T:T},c=function(){var t=e.innerWidth||n.clientWidth,r=e.innerHeight||n.clientHeight,i=e.screen.width,s=e.screen.height,u=e.screen.colorDepth,a=e.devicePixelRatio;o.width=t;o.height=r;o["aspect-ratio"]=(t/r).toFixed(2);o["device-width"]=i;o["device-height"]=s;o["device-aspect-ratio"]=(i/s).toFixed(2);o.color=u;o["color-index"]=Math.pow(2,u);o.orientation=r>=t?"portrait":"landscape";o.resolution=a&&a*96||e.screen.deviceXDPI||96;o["device-pixel-ratio"]=a||1},h=function(){clearTimeout(f);f=setTimeout(function(){var t=null,n=i-1,s=n,o=!1;if(n>=0){c();do{t=r[s-n];if(t){o=l(t.mql.media);if(o&&!t.mql.matches||!o&&t.mql.matches){t.mql.matches=o;if(t.listeners)for(var u=0,a=t.listeners.length;u<a;u++)t.listeners[u]&&t.listeners[u].call(e,t.mql)}}}while(n--)}},10)},p=function(){var n=t.getElementsByTagName("head")[0],r=t.createElement("style"),i=null,o=["screen","print","speech","projection","handheld","tv","braille","embossed","tty"],u=0,a=o.length,f="#mediamatchjs { position: relative; z-index: 0; }",l="",p=e.addEventListener||(l="on")&&e.attachEvent;r.type="text/css";r.id="mediamatchjs";n.appendChild(r);i=e.getComputedStyle&&e.getComputedStyle(r)||r.currentStyle;for(;u<a;u++)f+="@media "+o[u]+" { #mediamatchjs { position: relative; z-index: "+u+" } }";r.styleSheet?r.styleSheet.cssText=f:r.textContent=f;s=o[i.zIndex*1||0];n.removeChild(r);c();p(l+"resize",h);p(l+"orientationchange",h)};p();return function(e){var t=i,n={matches:!1,media:e,addListener:function(n){r[t].listeners||(r[t].listeners=[]);n&&r[t].listeners.push(n)},removeListener:function(n){var i=r[t],s=0,o=0;if(!i)return;o=i.listeners.length;for(;s<o;s++)i.listeners[s]===n&&i.listeners.splice(s,1)}};if(e===""){n.matches=!0;return n}n.matches=l(e);i=r.push({mql:n,listeners:null});return n}}(window));(function(e){function S(){b(!0)}e.respond={};respond.update=function(){};respond.mediaQueriesSupported=e.matchMedia&&e.matchMedia("only all").matches&&e.matchMedia("(min-monochrome: 0)").matches;if(respond.mediaQueriesSupported)return;var t=e.document,n=t.documentElement,r=[],i=[],s=[],o={},u=30,a=t.getElementsByTagName("head")[0]||n,f=t.getElementsByTagName("base")[0],l=a.getElementsByTagName("link"),c=[],h=function(){var t=l,n=t.length,r=0,i,s,u,a;for(;r<n;r++){i=t[r],s=i.href,u=i.media,a=i.rel&&i.rel.toLowerCase()==="stylesheet";if(!!s&&a&&!o[s])if(i.styleSheet&&i.styleSheet.rawCssText){d(i.styleSheet.rawCssText,s,u);o[s]=!0}else(!/^([a-zA-Z:]*\/\/)/.test(s)&&!f||s.replace(RegExp.$1,"").split("/")[0]===e.location.host)&&c.push({href:s,media:u})}p()},p=function(){if(c.length){var e=c.shift();w(e.href,function(t){d(t,e.href,e.media);o[e.href]=!0;p()})}},d=function(e,t,n){var s=e.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),o=s&&s.length||0,t=t.substring(0,t.lastIndexOf("/")),u=function(e){return e.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+t+"$2$3")},a=!o&&n,f=0,l,c,h,p,d;t.length&&(t+="/");a&&(o=1);for(;f<o;f++){l=0;if(a){c=n;i.push(u(e))}else{c=s[f].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1;i.push(RegExp.$2&&u(RegExp.$2))}p=c.split(",");d=p.length;for(;l<d;l++){h=p[l];r.push({media:h.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:i.length-1,hasquery:h.indexOf("(")>-1,minw:h.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:h.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}}b()},v,m,g=function(){var e,r=t.createElement("div"),i=t.body,s=!1;r.style.cssText="position:absolute;font-size:1em;width:1em";if(!i){i=s=t.createElement("body");i.style.background="none"}i.appendChild(r);n.insertBefore(i,n.firstChild);e=r.offsetWidth;s?n.removeChild(i):i.removeChild(r);e=y=parseFloat(e);return e},y,b=function(e){var o="clientWidth",f=n[o],c=t.compatMode==="CSS1Compat"&&f||t.body[o]||f,h={},p=l[l.length-1],d=(new Date).getTime();if(e&&v&&d-v<u){clearTimeout(m);m=setTimeout(b,u);return}v=d;for(var w in r){var E=r[w],S=E.minw,x=E.maxw,T=S===null,N=x===null,C="em";!S||(S=parseFloat(S)*(S.indexOf(C)>-1?y||g():1));!x||(x=parseFloat(x)*(x.indexOf(C)>-1?y||g():1));if(!E.hasquery||(!T||!N)&&(T||c>=S)&&(N||c<=x)){h[E.media]||(h[E.media]=[]);h[E.media].push(i[E.rules])}}for(var w in s)s[w]&&s[w].parentNode===a&&a.removeChild(s[w]);for(var w in h){var k=t.createElement("style"),L=h[w].join("\n");k.type="text/css";k.media=w;a.insertBefore(k,p.nextSibling);k.styleSheet?k.styleSheet.cssText=L:k.appendChild(t.createTextNode(L));s.push(k)}},w=function(e,t){var n=E();if(!n)return;n.open("GET",e,!0);n.onreadystatechange=function(){if(n.readyState!=4||n.status!=200&&n.status!=304)return;t(n.responseText)};if(n.readyState==4)return;n.send(null)},E=function(){var e=!1;try{e=new XMLHttpRequest}catch(t){e=new ActiveXObject("Microsoft.XMLHTTP")}return function(){return e}}();h();respond.update=h;e.addEventListener?e.addEventListener("resize",S,!1):e.attachEvent&&e.attachEvent("onresize",S)})(this);