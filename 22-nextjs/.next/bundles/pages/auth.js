module.exports=__NEXT_REGISTER_PAGE("/auth",function(){return{page:webpackJsonp([0],{115:function(e,t,n){"use strict";t.__esModule=!0;var r=o(n(230)),s=o(n(231)),i="function"==typeof s.default&&"symbol"==typeof r.default?function(e){return typeof e}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":typeof e};function o(e){return e&&e.__esModule?e:{default:e}}t.default="function"==typeof s.default&&"symbol"===i(r.default)?function(e){return void 0===e?"undefined":i(e)}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":void 0===e?"undefined":i(e)}},201:function(e,t,n){e.exports=n(202)},202:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(6),s=n.n(r),i=n(109),o=n.n(i),u=n(214),l=n.n(u),a=function(e){return s.a.createElement("div",{className:"jsx-282632384 teste"},s.a.createElement("h1",{className:"jsx-282632384"},e.name),s.a.createElement("p",{className:"jsx-282632384"},"Age: ",e.age),s.a.createElement(l.a,{styleId:"282632384",css:[".teste.jsx-282632384{border:1px solid #eee;box-shadow:0px 2px 3px #ccc;padding:20px;text-align:center;}"]}))},c=function(e){return s.a.createElement("div",null,s.a.createElement("h1",null,"Auth page of ",e.appName),s.a.createElement("p",null,"Ir para ",s.a.createElement(o.a,{href:"/"},s.a.createElement("a",null,"Home"))),s.a.createElement(a,{name:"Rene",age:33}))};c.getInitialProps=function(){return new Promise(function(e,t){setTimeout(function(){e({appName:"Supper App (auth)"})},1e3)})};t.default=c},214:function(e,t,n){e.exports=n(215)},215:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=d(n(216)),s=d(n(222)),i=d(n(227)),o=d(n(69)),u=d(n(70)),l=d(n(229)),a=d(n(232));t.flush=function(){var e=f.cssRules();return f.flush(),new r.default(e)};var c=n(6);function d(e){return e&&e.__esModule?e:{default:e}}var f=new(d(n(235)).default),h=function(e){function t(){return(0,o.default)(this,t),(0,l.default)(this,(t.__proto__||(0,i.default)(t)).apply(this,arguments))}return(0,a.default)(t,e),(0,u.default)(t,[{key:"componentWillMount",value:function(){f.add(this.props)}},{key:"shouldComponentUpdate",value:function(e){return this.props.css!==e.css}},{key:"componentWillUpdate",value:function(e){f.update(this.props,e)}},{key:"componentWillUnmount",value:function(){f.remove(this.props)}},{key:"render",value:function(){return null}}],[{key:"dynamic",value:function(e){return e.map(function(e){var t=(0,s.default)(e,2),n=t[0],r=t[1];return f.computeId(n,r)}).join(" ")}}]),t}(c.Component);t.default=h},216:function(e,t,n){e.exports={default:n(217),__esModule:!0}},217:function(e,t,n){n(40),n(20),n(18),n(218),n(219),n(220),n(221),e.exports=n(0).Map},218:function(e,t,n){"use strict";var r=n(96),s=n(64);e.exports=n(97)("Map",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{get:function(e){var t=r.getEntry(s(this,"Map"),e);return t&&t.v},set:function(e,t){return r.def(s(this,"Map"),0===e?0:e,t)}},r,!0)},219:function(e,t,n){var r=n(2);r(r.P+r.R,"Map",{toJSON:n(98)("Map")})},220:function(e,t,n){n(99)("Map")},221:function(e,t,n){n(100)("Map")},222:function(e,t,n){"use strict";t.__esModule=!0;var r=i(n(223)),s=i(n(226));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(){return function(e,t){if(Array.isArray(e))return e;if((0,r.default)(Object(e)))return function(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var u,l=(0,s.default)(e);!(r=(u=l.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{!r&&l.return&&l.return()}finally{if(i)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},223:function(e,t,n){e.exports={default:n(224),__esModule:!0}},224:function(e,t,n){n(18),n(20),e.exports=n(225)},225:function(e,t,n){var r=n(38),s=n(3)("iterator"),i=n(19);e.exports=n(0).isIterable=function(e){var t=Object(e);return void 0!==t[s]||"@@iterator"in t||i.hasOwnProperty(r(t))}},226:function(e,t,n){e.exports={default:n(82),__esModule:!0}},227:function(e,t,n){e.exports={default:n(105),__esModule:!0}},228:function(e,t,n){e.exports={default:n(73),__esModule:!0}},229:function(e,t,n){"use strict";t.__esModule=!0;var r,s=n(115),i=(r=s)&&r.__esModule?r:{default:r};t.default=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":(0,i.default)(t))&&"function"!=typeof t?e:t}},230:function(e,t,n){e.exports={default:n(92),__esModule:!0}},231:function(e,t,n){e.exports={default:n(93),__esModule:!0}},232:function(e,t,n){"use strict";t.__esModule=!0;var r=o(n(233)),s=o(n(234)),i=o(n(115));function o(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":(0,i.default)(t)));e.prototype=(0,s.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}},233:function(e,t,n){e.exports={default:n(106),__esModule:!0}},234:function(e,t,n){e.exports={default:n(107),__esModule:!0}},235:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n(236)),s=l(n(69)),i=l(n(70)),o=l(n(237)),u=l(n(238));function l(e){return e&&e.__esModule?e:{default:e}}var a=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.styleSheet,r=void 0===n?null:n,i=t.optimizeForSpeed,o=void 0!==i&&i,l=t.isBrowser,a=void 0===l?"undefined"!=typeof window:l;(0,s.default)(this,e),this._sheet=r||new u.default({name:"styled-jsx",optimizeForSpeed:o}),this._sheet.inject(),r&&"boolean"==typeof o&&(this._sheet.setOptimizeForSpeed(o),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._isBrowser=a,this._fromServer=void 0,this._indices={},this._instancesCounts={},this.computeId=this.createComputeId(),this.computeSelector=this.createComputeSelector()}return(0,i.default)(e,[{key:"add",value:function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.css),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._isBrowser&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=(0,r.default)(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var n=this.getIdAndRules(e),s=n.styleId,i=n.rules;if(s in this._instancesCounts)this._instancesCounts[s]+=1;else{var o=i.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return-1!==e});o.length>0&&(this._indices[s]=o,this._instancesCounts[s]=1)}}},{key:"remove",value:function(e){var t=this,n=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw new Error("StyleSheetRegistry: "+t+".")}(n in this._instancesCounts,"styleId: `"+n+"` not found"),this._instancesCounts[n]-=1,this._instancesCounts[n]<1){var r=this._fromServer&&this._fromServer[n];r?(r.parentNode.removeChild(r),delete this._fromServer[n]):(this._indices[n].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[n]),delete this._instancesCounts[n]}}},{key:"update",value:function(e,t){this.add(t),this.remove(e)}},{key:"flush",value:function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={},this.computeId=this.createComputeId(),this.computeSelector=this.createComputeSelector()}},{key:"cssRules",value:function(){var e=this,t=this._fromServer?(0,r.default)(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],n=this._sheet.cssRules();return t.concat((0,r.default)(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return n[e].cssText}).join("\n")]}))}},{key:"createComputeId",value:function(){var e={};return function(t,n){if(!n)return"jsx-"+t;var r=String(n),s=t+r;return e[s]||(e[s]="jsx-"+(0,o.default)(t+"-"+r)),e[s]}}},{key:"createComputeSelector",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:/__jsx-style-dynamic-selector/g,t={};return function(n,r){this._isBrowser||(r=r.replace(/\/style/gi,"\\/style"));var s=n+r;return t[s]||(t[s]=r.replace(e,n)),t[s]}}},{key:"getIdAndRules",value:function(e){var t=this;if(e.dynamic){var n=this.computeId(e.styleId,e.dynamic);return{styleId:n,rules:Array.isArray(e.css)?e.css.map(function(e){return t.computeSelector(n,e)}):[this.computeSelector(n,e.css)]}}return{styleId:this.computeId(e.styleId),rules:Array.isArray(e.css)?e.css:[e.css]}}},{key:"selectFromServer",value:function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})}}]),e}();t.default=a},236:function(e,t,n){e.exports={default:n(80),__esModule:!0}},237:function(e,t,n){"use strict";e.exports=function(e){for(var t=5381,n=e.length;n;)t=33*t^e.charCodeAt(--n);return t>>>0}},238:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(69)),s=i(n(70));function i(e){return e&&e.__esModule?e:{default:e}}var o=e.env&&!0,u=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.name,s=void 0===n?"stylesheet":n,i=t.optimizeForSpeed,l=void 0===i?o:i,c=t.isBrowser,d=void 0===c?"undefined"!=typeof window:c;(0,r.default)(this,e),a(u(s),"`name` must be a string"),this._name=s,this._deletedRulePlaceholder="#"+s+"-deleted-rule____{}",a("boolean"==typeof l,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=l,this._isBrowser=d,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0}return(0,s.default)(e,[{key:"setOptimizeForSpeed",value:function(e){a("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),a(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()}},{key:"isOptimizeForSpeed",value:function(){return this._optimizeForSpeed}},{key:"inject",value:function(){var e=this;if(a(!this._injected,"sheet already injected"),this._injected=!0,this._isBrowser&&this._optimizeForSpeed)return this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),void(this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0));this._serverSheet={cssRules:[],insertRule:function(t,n){return"number"==typeof n?e._serverSheet.cssRules[n]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),n},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}}},{key:"getSheetForTag",value:function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}},{key:"getSheet",value:function(){return this.getSheetForTag(this._tags[this._tags.length-1])}},{key:"insertRule",value:function(e,t){if(a(u(e),"`insertRule` accepts only strings"),!this._isBrowser)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var n=this.getSheet();"number"!=typeof t&&(t=n.cssRules.length);try{n.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var r=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,r))}return this._rulesCount++}},{key:"replaceRule",value:function(e,t){if(this._optimizeForSpeed||!this._isBrowser){var n=this._isBrowser?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!n.cssRules[e])return e;n.deleteRule(e);try{n.insertRule(t,e)}catch(r){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),n.insertRule(this._deletedRulePlaceholder,e)}}else{var r=this._tags[e];a(r,"old rule at index `"+e+"` not found"),r.textContent=t}return e}},{key:"deleteRule",value:function(e){if(this._isBrowser)if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];a(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}else this._serverSheet.deleteRule(e)}},{key:"flush",value:function(){this._injected=!1,this._rulesCount=0,this._isBrowser?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]}},{key:"cssRules",value:function(){var e=this;return this._isBrowser?this._tags.reduce(function(t,n){return n?t=t.concat(e.getSheetForTag(n).cssRules.map(function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[]):this._serverSheet.cssRules}},{key:"makeStyleTag",value:function(e,t,n){t&&a(u(t),"makeStyleTag acceps only strings as second parameter");var r=document.createElement("style");r.type="text/css",r.setAttribute("data-"+e,""),t&&r.appendChild(document.createTextNode(t));var s=document.head||document.getElementsByTagName("head")[0];return n?s.insertBefore(r,n):s.appendChild(r),r}},{key:"length",get:function(){return this._rulesCount}}]),e}();function a(e,t){if(!e)throw new Error("StyleSheet: "+t+".")}t.default=l}).call(t,n(104))},69:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},70:function(e,t,n){"use strict";t.__esModule=!0;var r,s=n(228),i=(r=s)&&r.__esModule?r:{default:r};t.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,i.default)(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()}},[201]).default}});