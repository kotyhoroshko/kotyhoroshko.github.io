(function(){"use strict";var a={6363:function(a,t,e){var r=e(9242),n=e(3396);function l(a,t,e,r,l,d){const i=(0,n.up)("TheCalendar");return(0,n.wg)(),(0,n.j4)(i)}var d=e(7139);const i={class:"wrapper"},s={class:"calendar"},o=(0,n._)("h1",{class:"calendar__title"},"Set Schedule",-1),c=(0,n.uE)('<div class="calendar__table-header"><div class=""></div><div class="">ALL DAY</div><div>00:00</div><div>03:00</div><div>06:00</div><div>09:00</div><div>12:00</div><div>15:00</div><div>18:00</div><div>21:00</div></div>',1),h=["data-all-day"],u=["data-day","data-hour","data-booked"],f={class:"calendar__actions"};function g(a,t,e,r,l,g){return(0,n.wg)(),(0,n.iD)("div",i,[(0,n._)("div",s,[o,(0,n._)("div",{class:"calendar__table",onMouseleave:t[5]||(t[5]=(...a)=>g.stopDrag&&g.stopDrag(...a))},[c,((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(l.days,((a,e)=>((0,n.wg)(),(0,n.iD)("div",{class:"calendar__day",key:a,onClick:t[1]||(t[1]=(...a)=>g.checkAndBook&&g.checkAndBook(...a)),onMousedown:t[2]||(t[2]=(...a)=>g.startDrag&&g.startDrag(...a)),onMousemove:t[3]||(t[3]=(...a)=>g.drag&&g.drag(...a)),onMouseup:t[4]||(t[4]=(...a)=>g.stopDrag&&g.stopDrag(...a))},[(0,n._)("div",{class:(0,d.C_)(["calendar__day-title",{selected:g.isAnyHourBooked(e)}])},(0,d.zw)(a),3),(0,n._)("div",{class:(0,d.C_)(["calendar__book-day",{selected:g.isAllDayBooked(e)}]),onClick:t[0]||(t[0]=(...a)=>g.bookAllDay&&g.bookAllDay(...a)),"data-all-day":e},null,10,h),((0,n.wg)(),(0,n.iD)(n.HY,null,(0,n.Ko)(24,(t=>(0,n._)("div",{class:"calendar__table-item",key:a+t,"data-day":e,"data-hour":t-1,"data-booked":l.calendar[e][t-1]},null,8,u))),64))],32)))),128))],32),(0,n._)("div",f,[(0,n._)("button",{class:"clear",onClick:t[6]||(t[6]=(...a)=>g.clear&&g.clear(...a))},"Clear"),(0,n._)("button",{class:"save",onClick:t[7]||(t[7]=(...a)=>g.uploadCalendar&&g.uploadCalendar(...a))},"Save Changes")])])])}e(7658);var v={name:"TheCalendar",data(){return{days:["mo","tu","we","th","fr","sa","su"],calendar:[],draging:!1,currentDragItem:null,fetchedCalendar:{}}},methods:{checkAndBook(a){let t=a.target;t.classList.contains("calendar__table-item")&&this.book(t)},book(a){let t=this.calendar[a.dataset.day][a.dataset.hour];this.calendar[a.dataset.day][a.dataset.hour]=!t},startDrag(a){let t=a.target;if(t.classList.contains("calendar__table-item")){let a=this.calendar[t.dataset.day][t.dataset.hour];a||(this.currentDragItem=t,this.draging=!0)}},stopDrag(){this.draging=!1},drag(a){let t=a.target;t.classList.contains("calendar__table-item")||(this.draging=!1),this.draging&&t!=this.currentDragItem&&(this.calendar[this.currentDragItem.dataset.day][this.currentDragItem.dataset.hour]=!0,this.currentDragItem=t,this.calendar[this.currentDragItem.dataset.day][this.currentDragItem.dataset.hour]=!0)},bookAllDay(a){let t=a.target.dataset.allDay;if(this.isAllDayBooked(t))for(let e=0;e<this.calendar[t].length;e++)this.calendar[t][e]=!1;else for(let e=0;e<this.calendar[t].length;e++)this.calendar[t][e]=!0},clear(){this.createEmptyTable()},createEmptyTable(){for(let a=0;a<this.days.length;a++){this.calendar[a]=[];for(let t=0;t<24;t++)this.calendar[a][t]=!1}},fetchCalendar(){localStorage.calendar?(this.fetchedCalendar=JSON.parse(localStorage.calendar),this.implementFetchedCalendar()):fetch("https://kotyhoroshko.github.io/calendar.json").then((a=>a.json())).then((a=>{this.fetchedCalendar=a,this.implementFetchedCalendar()}))},implementFetchedCalendar(){for(let a=0;a<this.days.length;a++){let t=this.fetchedCalendar[this.days[a]];if(t.length>0)for(let e=0;e<t.length;e++)for(let r=t[e].bt/60;r<(t[e].et+1)/60;r++)this.calendar[a][r]=!0}},uploadCalendar(){let a={},t=!1;for(let e=0;e<this.calendar.length;e++){a[this.days[e]]=[];for(let r=0;r<this.calendar[e].length;r++)this.calendar[e][r]&&!1===t?t=60*r:this.calendar[e][r]||!1===t?void 0==this.calendar[e][r+1]&&!1!==t&&(a[this.days[e]].push({bt:t,et:60*(r+1)-1}),t=!1):(a[this.days[e]].push({bt:t,et:60*r-1}),t=!1);localStorage.setItem("calendar",JSON.stringify(a))}},isAllDayBooked(a){return 0!=this.calendar[a].find((a=>0==a))},isAnyHourBooked(a){return 1==this.calendar[a].find((a=>1==a))}},beforeMount(){this.createEmptyTable(),this.fetchCalendar()}},p=e(89);const y=(0,p.Z)(v,[["render",g]]);var b=y,_={name:"App",components:{TheCalendar:b},data(){return{}}};const m=(0,p.Z)(_,[["render",l]]);var k=m;(0,r.ri)(k).mount("#app")}},t={};function e(r){var n=t[r];if(void 0!==n)return n.exports;var l=t[r]={exports:{}};return a[r].call(l.exports,l,l.exports,e),l.exports}e.m=a,function(){var a=[];e.O=function(t,r,n,l){if(!r){var d=1/0;for(c=0;c<a.length;c++){r=a[c][0],n=a[c][1],l=a[c][2];for(var i=!0,s=0;s<r.length;s++)(!1&l||d>=l)&&Object.keys(e.O).every((function(a){return e.O[a](r[s])}))?r.splice(s--,1):(i=!1,l<d&&(d=l));if(i){a.splice(c--,1);var o=n();void 0!==o&&(t=o)}}return t}l=l||0;for(var c=a.length;c>0&&a[c-1][2]>l;c--)a[c]=a[c-1];a[c]=[r,n,l]}}(),function(){e.n=function(a){var t=a&&a.__esModule?function(){return a["default"]}:function(){return a};return e.d(t,{a:t}),t}}(),function(){e.d=function(a,t){for(var r in t)e.o(t,r)&&!e.o(a,r)&&Object.defineProperty(a,r,{enumerable:!0,get:t[r]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(a){if("object"===typeof window)return window}}()}(),function(){e.o=function(a,t){return Object.prototype.hasOwnProperty.call(a,t)}}(),function(){var a={143:0};e.O.j=function(t){return 0===a[t]};var t=function(t,r){var n,l,d=r[0],i=r[1],s=r[2],o=0;if(d.some((function(t){return 0!==a[t]}))){for(n in i)e.o(i,n)&&(e.m[n]=i[n]);if(s)var c=s(e)}for(t&&t(r);o<d.length;o++)l=d[o],e.o(a,l)&&a[l]&&a[l][0](),a[l]=0;return e.O(c)},r=self["webpackChunkcalendar"]=self["webpackChunkcalendar"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=e.O(void 0,[998],(function(){return e(6363)}));r=e.O(r)})();
//# sourceMappingURL=app.5b5b3844.js.map