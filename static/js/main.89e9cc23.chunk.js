(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){e.exports=n(49)},25:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(16),o=n.n(i),c=(n(25),n(4)),s=n(5),u=n(9),l=n(6),d=n(7),m=n(1),f=n(17),p=n(19),v=n(3),h=n(10),g=n.n(h),b=n(18);function w(e){return e>9?e:"0"+e}function k(e){var t=e||new Date;return[t.getHours(),t.getMinutes()].map(w).join(":")}function j(e){var t=e||new Date;return[t.getUTCFullYear(),t.getUTCMonth()+1,t.getUTCDate()].map(w).join("-")}function y(e){var t=new Date,n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=new Date;return new Date(a.getFullYear(),a.getMonth(),a.getDate(),e,t,n)}(e[0],e[1]);return t>n}var O=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.stations,n=e.isCurrent,a=["Pra\xe7a de Londres","Sete-Rios"],i=t[0].hour.replace(/\./g,":"),o=y(i.split(":").map(function(e){return Number(e)})),c=t.filter(function(e){return-1===a.indexOf(e.station)}).map(function(e){return e.station}).join(" > ").replace(/Taguspark/g,"Tagus");return r.a.createElement("div",{className:"card".concat(o&&n?" done":"")},r.a.createElement("span",{className:"entry"},r.a.createElement("strong",null,i)," ",c))}}]),t}(r.a.PureComponent);n(48);function E(e){var t=new Date,n=!0,a=!1,r=void 0;try{for(var i,o=e[Symbol.iterator]();!(n=(i=o.next()).done);n=!0){var c=i.value,s=[c.start,c.end].map(function(e){return e.split("/").reverse().map(function(e){return Number(e)})}),u=Object(v.a)(s,2),l=u[0],d=u[1];l[1]--,d[1]--;var m=[l,d].map(function(e){return Object(f.a)(Date,Object(p.a)(e))}),h=Object(v.a)(m,2),g=h[0],b=h[1];if(t>=g&&t<=b)return c.type}}catch(w){a=!0,r=w}finally{try{n||null==o.return||o.return()}finally{if(a)throw r}}return"weekend"}var T=function(e){function t(e){var n;Object(c.a)(this,t),n=Object(u.a)(this,Object(l.a)(t).call(this,e));var a=g.a.get("data");return n.state={date:j(),time:k(),campus:"Taguspark",period:"weekday",currentPeriod:void 0,data:a||void 0},n.nextCampus=n.nextCampus.bind(Object(m.a)(Object(m.a)(n))),n.nextPeriod=n.nextPeriod.bind(Object(m.a)(Object(m.a)(n))),n.updateTime=n.updateTime.bind(Object(m.a)(Object(m.a)(n))),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.state.data;if(void 0===t)fetch("https://web.tecnico.ulisboa.pt/~ist178013/api/shuttle/").then(function(e){return e.json()}).then(function(t){var n=E(t.date);g.a.set("data",t),e.setState({data:t,period:n,currentPeriod:n})});else{var n=E(t.date);this.setState({period:n,currentPeriod:n})}}},{key:"nextCampus",value:function(){var e=this.state.campus,t=["Taguspark","Alameda"],n=((t.indexOf(e)||0)+1)%t.length;this.setState({campus:t[n]})}},{key:"nextPeriod",value:function(){var e=this.state.period,t=["weekday","holidays","exams"],n=((t.indexOf(e)||0)+1)%t.length;this.setState({period:t[n]})}},{key:"updateTime",value:function(){this.setState({time:k()})}},{key:"render",value:function(){var e=this.state,t=e.data,n=e.time,a=e.campus,i=e.period,o=e.currentPeriod;if(!t)return null;var c=t.trips;if(!c)return null;var s,u=i===o,l="Taguspark"===a?"Tagus\nAlameda":"Alameda\nTagus",d=c.filter(function(e){return e.type===i&&e.stations[0].station===a});return u&&d.sort(function(e,t){var n=[e,t].map(function(e){return e.stations[0].hour.split(/:|\./g).map(function(e){return Number(e)})}),a=Object(v.a)(n,2),r=a[0],i=a[1],o=[r,i].map(function(e){return y(e)}),c=Object(v.a)(o,2),s=c[0],u=c[1];return s&&u||!s&&!u?r[0]-i[0]:s-u}),r.a.createElement("main",null,r.a.createElement("header",null,r.a.createElement("h3",null,r.a.createElement("div",{className:"right big"},r.a.createElement("span",{onClick:this.updateTime,style:{lineHeight:"3rem"}},n)),r.a.createElement("div",{className:"table"},r.a.createElement("span",{className:"block big",onClick:this.nextPeriod},(s=i).charAt(0).toUpperCase()+s.slice(1)),r.a.createElement("span",{className:"big"},"\u21c4"),r.a.createElement("span",{className:"block normal",onClick:this.nextCampus},l)))),r.a.createElement("section",{id:"infos",className:"table"},"weekend"===i?r.a.createElement("div",{className:"card"},r.a.createElement("div",null,"Today is weekend!"),r.a.createElement("div",null,r.a.createElement(b.Twemoji,{svg:!0,text:"There is no Shuttle \u274c \ud83d\ude8c \ud83d\ude22"}))):d.map(function(e,t){return r.a.createElement(O,{key:t,isCurrent:u,stations:e.stations})})))}}]),t}(r.a.Component),C=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function x(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}o.a.render(r.a.createElement(T,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL(".",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat(".","/service-worker.js");C?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):x(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):x(e)})}}()}},[[20,1,2]]]);
//# sourceMappingURL=main.89e9cc23.chunk.js.map