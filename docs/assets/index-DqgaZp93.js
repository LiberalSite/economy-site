(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function n(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(a){if(a.ep)return;a.ep=!0;const l=n(a);fetch(a.href,l)}})();function Km(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var xu={exports:{}},Po={},yu={exports:{}},gt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dp;function Mv(){if(Dp)return gt;Dp=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),y=Symbol.iterator;function v(M){return M===null||typeof M!="object"?null:(M=y&&M[y]||M["@@iterator"],typeof M=="function"?M:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,A={};function x(M,z,fe){this.props=M,this.context=z,this.refs=A,this.updater=fe||S}x.prototype.isReactComponent={},x.prototype.setState=function(M,z){if(typeof M!="object"&&typeof M!="function"&&M!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,M,z,"setState")},x.prototype.forceUpdate=function(M){this.updater.enqueueForceUpdate(this,M,"forceUpdate")};function g(){}g.prototype=x.prototype;function P(M,z,fe){this.props=M,this.context=z,this.refs=A,this.updater=fe||S}var N=P.prototype=new g;N.constructor=P,E(N,x.prototype),N.isPureReactComponent=!0;var C=Array.isArray,K=Object.prototype.hasOwnProperty,k={current:null},O={key:!0,ref:!0,__self:!0,__source:!0};function j(M,z,fe){var W,Q={},le=null,ne=null;if(z!=null)for(W in z.ref!==void 0&&(ne=z.ref),z.key!==void 0&&(le=""+z.key),z)K.call(z,W)&&!O.hasOwnProperty(W)&&(Q[W]=z[W]);var me=arguments.length-2;if(me===1)Q.children=fe;else if(1<me){for(var Se=Array(me),Ne=0;Ne<me;Ne++)Se[Ne]=arguments[Ne+2];Q.children=Se}if(M&&M.defaultProps)for(W in me=M.defaultProps,me)Q[W]===void 0&&(Q[W]=me[W]);return{$$typeof:s,type:M,key:le,ref:ne,props:Q,_owner:k.current}}function L(M,z){return{$$typeof:s,type:M.type,key:z,ref:M.ref,props:M.props,_owner:M._owner}}function b(M){return typeof M=="object"&&M!==null&&M.$$typeof===s}function G(M){var z={"=":"=0",":":"=2"};return"$"+M.replace(/[=:]/g,function(fe){return z[fe]})}var ae=/\/+/g;function ie(M,z){return typeof M=="object"&&M!==null&&M.key!=null?G(""+M.key):z.toString(36)}function pe(M,z,fe,W,Q){var le=typeof M;(le==="undefined"||le==="boolean")&&(M=null);var ne=!1;if(M===null)ne=!0;else switch(le){case"string":case"number":ne=!0;break;case"object":switch(M.$$typeof){case s:case e:ne=!0}}if(ne)return ne=M,Q=Q(ne),M=W===""?"."+ie(ne,0):W,C(Q)?(fe="",M!=null&&(fe=M.replace(ae,"$&/")+"/"),pe(Q,z,fe,"",function(Ne){return Ne})):Q!=null&&(b(Q)&&(Q=L(Q,fe+(!Q.key||ne&&ne.key===Q.key?"":(""+Q.key).replace(ae,"$&/")+"/")+M)),z.push(Q)),1;if(ne=0,W=W===""?".":W+":",C(M))for(var me=0;me<M.length;me++){le=M[me];var Se=W+ie(le,me);ne+=pe(le,z,fe,Se,Q)}else if(Se=v(M),typeof Se=="function")for(M=Se.call(M),me=0;!(le=M.next()).done;)le=le.value,Se=W+ie(le,me++),ne+=pe(le,z,fe,Se,Q);else if(le==="object")throw z=String(M),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(M).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.");return ne}function ve(M,z,fe){if(M==null)return M;var W=[],Q=0;return pe(M,W,"","",function(le){return z.call(fe,le,Q++)}),W}function ce(M){if(M._status===-1){var z=M._result;z=z(),z.then(function(fe){(M._status===0||M._status===-1)&&(M._status=1,M._result=fe)},function(fe){(M._status===0||M._status===-1)&&(M._status=2,M._result=fe)}),M._status===-1&&(M._status=0,M._result=z)}if(M._status===1)return M._result.default;throw M._result}var he={current:null},V={transition:null},ue={ReactCurrentDispatcher:he,ReactCurrentBatchConfig:V,ReactCurrentOwner:k};function D(){throw Error("act(...) is not supported in production builds of React.")}return gt.Children={map:ve,forEach:function(M,z,fe){ve(M,function(){z.apply(this,arguments)},fe)},count:function(M){var z=0;return ve(M,function(){z++}),z},toArray:function(M){return ve(M,function(z){return z})||[]},only:function(M){if(!b(M))throw Error("React.Children.only expected to receive a single React element child.");return M}},gt.Component=x,gt.Fragment=n,gt.Profiler=a,gt.PureComponent=P,gt.StrictMode=r,gt.Suspense=h,gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ue,gt.act=D,gt.cloneElement=function(M,z,fe){if(M==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+M+".");var W=E({},M.props),Q=M.key,le=M.ref,ne=M._owner;if(z!=null){if(z.ref!==void 0&&(le=z.ref,ne=k.current),z.key!==void 0&&(Q=""+z.key),M.type&&M.type.defaultProps)var me=M.type.defaultProps;for(Se in z)K.call(z,Se)&&!O.hasOwnProperty(Se)&&(W[Se]=z[Se]===void 0&&me!==void 0?me[Se]:z[Se])}var Se=arguments.length-2;if(Se===1)W.children=fe;else if(1<Se){me=Array(Se);for(var Ne=0;Ne<Se;Ne++)me[Ne]=arguments[Ne+2];W.children=me}return{$$typeof:s,type:M.type,key:Q,ref:le,props:W,_owner:ne}},gt.createContext=function(M){return M={$$typeof:u,_currentValue:M,_currentValue2:M,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},M.Provider={$$typeof:l,_context:M},M.Consumer=M},gt.createElement=j,gt.createFactory=function(M){var z=j.bind(null,M);return z.type=M,z},gt.createRef=function(){return{current:null}},gt.forwardRef=function(M){return{$$typeof:f,render:M}},gt.isValidElement=b,gt.lazy=function(M){return{$$typeof:_,_payload:{_status:-1,_result:M},_init:ce}},gt.memo=function(M,z){return{$$typeof:m,type:M,compare:z===void 0?null:z}},gt.startTransition=function(M){var z=V.transition;V.transition={};try{M()}finally{V.transition=z}},gt.unstable_act=D,gt.useCallback=function(M,z){return he.current.useCallback(M,z)},gt.useContext=function(M){return he.current.useContext(M)},gt.useDebugValue=function(){},gt.useDeferredValue=function(M){return he.current.useDeferredValue(M)},gt.useEffect=function(M,z){return he.current.useEffect(M,z)},gt.useId=function(){return he.current.useId()},gt.useImperativeHandle=function(M,z,fe){return he.current.useImperativeHandle(M,z,fe)},gt.useInsertionEffect=function(M,z){return he.current.useInsertionEffect(M,z)},gt.useLayoutEffect=function(M,z){return he.current.useLayoutEffect(M,z)},gt.useMemo=function(M,z){return he.current.useMemo(M,z)},gt.useReducer=function(M,z,fe){return he.current.useReducer(M,z,fe)},gt.useRef=function(M){return he.current.useRef(M)},gt.useState=function(M){return he.current.useState(M)},gt.useSyncExternalStore=function(M,z,fe){return he.current.useSyncExternalStore(M,z,fe)},gt.useTransition=function(){return he.current.useTransition()},gt.version="18.3.1",gt}var Ip;function Zf(){return Ip||(Ip=1,yu.exports=Mv()),yu.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Up;function Ev(){if(Up)return Po;Up=1;var s=Zf(),e=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(f,h,m){var _,y={},v=null,S=null;m!==void 0&&(v=""+m),h.key!==void 0&&(v=""+h.key),h.ref!==void 0&&(S=h.ref);for(_ in h)r.call(h,_)&&!l.hasOwnProperty(_)&&(y[_]=h[_]);if(f&&f.defaultProps)for(_ in h=f.defaultProps,h)y[_]===void 0&&(y[_]=h[_]);return{$$typeof:e,type:f,key:v,ref:S,props:y,_owner:a.current}}return Po.Fragment=n,Po.jsx=u,Po.jsxs=u,Po}var Fp;function wv(){return Fp||(Fp=1,xu.exports=Ev()),xu.exports}var F=wv(),vt=Zf();const Tv=Km(vt);var Qa={},Su={exports:{}},Cn={},Mu={exports:{}},Eu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Op;function Av(){return Op||(Op=1,(function(s){function e(V,ue){var D=V.length;V.push(ue);e:for(;0<D;){var M=D-1>>>1,z=V[M];if(0<a(z,ue))V[M]=ue,V[D]=z,D=M;else break e}}function n(V){return V.length===0?null:V[0]}function r(V){if(V.length===0)return null;var ue=V[0],D=V.pop();if(D!==ue){V[0]=D;e:for(var M=0,z=V.length,fe=z>>>1;M<fe;){var W=2*(M+1)-1,Q=V[W],le=W+1,ne=V[le];if(0>a(Q,D))le<z&&0>a(ne,Q)?(V[M]=ne,V[le]=D,M=le):(V[M]=Q,V[W]=D,M=W);else if(le<z&&0>a(ne,D))V[M]=ne,V[le]=D,M=le;else break e}}return ue}function a(V,ue){var D=V.sortIndex-ue.sortIndex;return D!==0?D:V.id-ue.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var u=Date,f=u.now();s.unstable_now=function(){return u.now()-f}}var h=[],m=[],_=1,y=null,v=3,S=!1,E=!1,A=!1,x=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,P=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function N(V){for(var ue=n(m);ue!==null;){if(ue.callback===null)r(m);else if(ue.startTime<=V)r(m),ue.sortIndex=ue.expirationTime,e(h,ue);else break;ue=n(m)}}function C(V){if(A=!1,N(V),!E)if(n(h)!==null)E=!0,ce(K);else{var ue=n(m);ue!==null&&he(C,ue.startTime-V)}}function K(V,ue){E=!1,A&&(A=!1,g(j),j=-1),S=!0;var D=v;try{for(N(ue),y=n(h);y!==null&&(!(y.expirationTime>ue)||V&&!G());){var M=y.callback;if(typeof M=="function"){y.callback=null,v=y.priorityLevel;var z=M(y.expirationTime<=ue);ue=s.unstable_now(),typeof z=="function"?y.callback=z:y===n(h)&&r(h),N(ue)}else r(h);y=n(h)}if(y!==null)var fe=!0;else{var W=n(m);W!==null&&he(C,W.startTime-ue),fe=!1}return fe}finally{y=null,v=D,S=!1}}var k=!1,O=null,j=-1,L=5,b=-1;function G(){return!(s.unstable_now()-b<L)}function ae(){if(O!==null){var V=s.unstable_now();b=V;var ue=!0;try{ue=O(!0,V)}finally{ue?ie():(k=!1,O=null)}}else k=!1}var ie;if(typeof P=="function")ie=function(){P(ae)};else if(typeof MessageChannel<"u"){var pe=new MessageChannel,ve=pe.port2;pe.port1.onmessage=ae,ie=function(){ve.postMessage(null)}}else ie=function(){x(ae,0)};function ce(V){O=V,k||(k=!0,ie())}function he(V,ue){j=x(function(){V(s.unstable_now())},ue)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(V){V.callback=null},s.unstable_continueExecution=function(){E||S||(E=!0,ce(K))},s.unstable_forceFrameRate=function(V){0>V||125<V?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<V?Math.floor(1e3/V):5},s.unstable_getCurrentPriorityLevel=function(){return v},s.unstable_getFirstCallbackNode=function(){return n(h)},s.unstable_next=function(V){switch(v){case 1:case 2:case 3:var ue=3;break;default:ue=v}var D=v;v=ue;try{return V()}finally{v=D}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(V,ue){switch(V){case 1:case 2:case 3:case 4:case 5:break;default:V=3}var D=v;v=V;try{return ue()}finally{v=D}},s.unstable_scheduleCallback=function(V,ue,D){var M=s.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?M+D:M):D=M,V){case 1:var z=-1;break;case 2:z=250;break;case 5:z=1073741823;break;case 4:z=1e4;break;default:z=5e3}return z=D+z,V={id:_++,callback:ue,priorityLevel:V,startTime:D,expirationTime:z,sortIndex:-1},D>M?(V.sortIndex=D,e(m,V),n(h)===null&&V===n(m)&&(A?(g(j),j=-1):A=!0,he(C,D-M))):(V.sortIndex=z,e(h,V),E||S||(E=!0,ce(K))),V},s.unstable_shouldYield=G,s.unstable_wrapCallback=function(V){var ue=v;return function(){var D=v;v=ue;try{return V.apply(this,arguments)}finally{v=D}}}})(Eu)),Eu}var kp;function Cv(){return kp||(kp=1,Mu.exports=Av()),Mu.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zp;function bv(){if(zp)return Cn;zp=1;var s=Zf(),e=Cv();function n(t){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function l(t,i){u(t,i),u(t+"Capture",i)}function u(t,i){for(a[t]=i,t=0;t<i.length;t++)r.add(i[t])}var f=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,_={},y={};function v(t){return h.call(y,t)?!0:h.call(_,t)?!1:m.test(t)?y[t]=!0:(_[t]=!0,!1)}function S(t,i,o,c){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function E(t,i,o,c){if(i===null||typeof i>"u"||S(t,i,o,c))return!0;if(c)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function A(t,i,o,c,d,p,w){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=o,this.propertyName=t,this.type=i,this.sanitizeURL=p,this.removeEmptyString=w}var x={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){x[t]=new A(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var i=t[0];x[i]=new A(i,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){x[t]=new A(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){x[t]=new A(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){x[t]=new A(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){x[t]=new A(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){x[t]=new A(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){x[t]=new A(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){x[t]=new A(t,5,!1,t.toLowerCase(),null,!1,!1)});var g=/[\-:]([a-z])/g;function P(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var i=t.replace(g,P);x[i]=new A(i,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var i=t.replace(g,P);x[i]=new A(i,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var i=t.replace(g,P);x[i]=new A(i,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){x[t]=new A(t,1,!1,t.toLowerCase(),null,!1,!1)}),x.xlinkHref=new A("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){x[t]=new A(t,1,!1,t.toLowerCase(),null,!0,!0)});function N(t,i,o,c){var d=x.hasOwnProperty(i)?x[i]:null;(d!==null?d.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(E(i,o,d,c)&&(o=null),c||d===null?v(i)&&(o===null?t.removeAttribute(i):t.setAttribute(i,""+o)):d.mustUseProperty?t[d.propertyName]=o===null?d.type===3?!1:"":o:(i=d.attributeName,c=d.attributeNamespace,o===null?t.removeAttribute(i):(d=d.type,o=d===3||d===4&&o===!0?"":""+o,c?t.setAttributeNS(c,i,o):t.setAttribute(i,o))))}var C=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,K=Symbol.for("react.element"),k=Symbol.for("react.portal"),O=Symbol.for("react.fragment"),j=Symbol.for("react.strict_mode"),L=Symbol.for("react.profiler"),b=Symbol.for("react.provider"),G=Symbol.for("react.context"),ae=Symbol.for("react.forward_ref"),ie=Symbol.for("react.suspense"),pe=Symbol.for("react.suspense_list"),ve=Symbol.for("react.memo"),ce=Symbol.for("react.lazy"),he=Symbol.for("react.offscreen"),V=Symbol.iterator;function ue(t){return t===null||typeof t!="object"?null:(t=V&&t[V]||t["@@iterator"],typeof t=="function"?t:null)}var D=Object.assign,M;function z(t){if(M===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);M=i&&i[1]||""}return`
`+M+t}var fe=!1;function W(t,i){if(!t||fe)return"";fe=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(re){var c=re}Reflect.construct(t,[],i)}else{try{i.call()}catch(re){c=re}t.call(i.prototype)}else{try{throw Error()}catch(re){c=re}t()}}catch(re){if(re&&c&&typeof re.stack=="string"){for(var d=re.stack.split(`
`),p=c.stack.split(`
`),w=d.length-1,U=p.length-1;1<=w&&0<=U&&d[w]!==p[U];)U--;for(;1<=w&&0<=U;w--,U--)if(d[w]!==p[U]){if(w!==1||U!==1)do if(w--,U--,0>U||d[w]!==p[U]){var H=`
`+d[w].replace(" at new "," at ");return t.displayName&&H.includes("<anonymous>")&&(H=H.replace("<anonymous>",t.displayName)),H}while(1<=w&&0<=U);break}}}finally{fe=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?z(t):""}function Q(t){switch(t.tag){case 5:return z(t.type);case 16:return z("Lazy");case 13:return z("Suspense");case 19:return z("SuspenseList");case 0:case 2:case 15:return t=W(t.type,!1),t;case 11:return t=W(t.type.render,!1),t;case 1:return t=W(t.type,!0),t;default:return""}}function le(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case O:return"Fragment";case k:return"Portal";case L:return"Profiler";case j:return"StrictMode";case ie:return"Suspense";case pe:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case G:return(t.displayName||"Context")+".Consumer";case b:return(t._context.displayName||"Context")+".Provider";case ae:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case ve:return i=t.displayName||null,i!==null?i:le(t.type)||"Memo";case ce:i=t._payload,t=t._init;try{return le(t(i))}catch{}}return null}function ne(t){var i=t.type;switch(t.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=i.render,t=t.displayName||t.name||"",i.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return le(i);case 8:return i===j?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function me(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Se(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ne(t){var i=Se(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,i),c=""+t[i];if(!t.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var d=o.get,p=o.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return d.call(this)},set:function(w){c=""+w,p.call(this,w)}}),Object.defineProperty(t,i,{enumerable:o.enumerable}),{getValue:function(){return c},setValue:function(w){c=""+w},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function $e(t){t._valueTracker||(t._valueTracker=Ne(t))}function We(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var o=i.getValue(),c="";return t&&(c=Se(t)?t.checked?"true":"false":t.value),t=c,t!==o?(i.setValue(t),!0):!1}function it(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function B(t,i){var o=i.checked;return D({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function Et(t,i){var o=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;o=me(i.value!=null?i.value:o),t._wrapperState={initialChecked:c,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Be(t,i){i=i.checked,i!=null&&N(t,"checked",i,!1)}function we(t,i){Be(t,i);var o=me(i.value),c=i.type;if(o!=null)c==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(c==="submit"||c==="reset"){t.removeAttribute("value");return}i.hasOwnProperty("value")?at(t,i.type,o):i.hasOwnProperty("defaultValue")&&at(t,i.type,me(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(t.defaultChecked=!!i.defaultChecked)}function be(t,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+t._wrapperState.initialValue,o||i===t.value||(t.value=i),t.defaultValue=i}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function at(t,i,o){(i!=="number"||it(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var Oe=Array.isArray;function I(t,i,o,c){if(t=t.options,i){i={};for(var d=0;d<o.length;d++)i["$"+o[d]]=!0;for(o=0;o<t.length;o++)d=i.hasOwnProperty("$"+t[o].value),t[o].selected!==d&&(t[o].selected=d),d&&c&&(t[o].defaultSelected=!0)}else{for(o=""+me(o),i=null,d=0;d<t.length;d++){if(t[d].value===o){t[d].selected=!0,c&&(t[d].defaultSelected=!0);return}i!==null||t[d].disabled||(i=t[d])}i!==null&&(i.selected=!0)}}function T(t,i){if(i.dangerouslySetInnerHTML!=null)throw Error(n(91));return D({},i,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function ee(t,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(n(92));if(Oe(o)){if(1<o.length)throw Error(n(93));o=o[0]}i=o}i==null&&(i=""),o=i}t._wrapperState={initialValue:me(o)}}function _e(t,i){var o=me(i.value),c=me(i.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),i.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),c!=null&&(t.defaultValue=""+c)}function ye(t){var i=t.textContent;i===t._wrapperState.initialValue&&i!==""&&i!==null&&(t.value=i)}function ge(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ve(t,i){return t==null||t==="http://www.w3.org/1999/xhtml"?ge(i):t==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Le,De=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,c,d){MSApp.execUnsafeLocalFunction(function(){return t(i,o,c,d)})}:t})(function(t,i){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=i;else{for(Le=Le||document.createElement("div"),Le.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Le.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;i.firstChild;)t.appendChild(i.firstChild)}});function ft(t,i){if(i){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=i;return}}t.textContent=i}var Te={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},He=["Webkit","ms","Moz","O"];Object.keys(Te).forEach(function(t){He.forEach(function(i){i=i+t.charAt(0).toUpperCase()+t.substring(1),Te[i]=Te[t]})});function et(t,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||Te.hasOwnProperty(t)&&Te[t]?(""+i).trim():i+"px"}function rt(t,i){t=t.style;for(var o in i)if(i.hasOwnProperty(o)){var c=o.indexOf("--")===0,d=et(o,i[o],c);o==="float"&&(o="cssFloat"),c?t.setProperty(o,d):t[o]=d}}var je=D({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function mt(t,i){if(i){if(je[t]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(n(137,t));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(n(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(n(61))}if(i.style!=null&&typeof i.style!="object")throw Error(n(62))}}function ct(t,i){if(t.indexOf("-")===-1)return typeof i.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var bt=null;function $(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ie=null,de=null,xe=null;function ke(t){if(t=mo(t)){if(typeof Ie!="function")throw Error(n(280));var i=t.stateNode;i&&(i=ha(i),Ie(t.stateNode,t.type,i))}}function Fe(t){de?xe?xe.push(t):xe=[t]:de=t}function ut(){if(de){var t=de,i=xe;if(xe=de=null,ke(t),i)for(t=0;t<i.length;t++)ke(i[t])}}function It(t,i){return t(i)}function Xt(){}var yt=!1;function yn(t,i,o){if(yt)return t(i,o);yt=!0;try{return It(t,i,o)}finally{yt=!1,(de!==null||xe!==null)&&(Xt(),ut())}}function pn(t,i){var o=t.stateNode;if(o===null)return null;var c=ha(o);if(c===null)return null;o=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(t=t.type,c=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!c;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(n(231,i,typeof o));return o}var es=!1;if(f)try{var Xi={};Object.defineProperty(Xi,"passive",{get:function(){es=!0}}),window.addEventListener("test",Xi,Xi),window.removeEventListener("test",Xi,Xi)}catch{es=!1}function Mi(t,i,o,c,d,p,w,U,H){var re=Array.prototype.slice.call(arguments,3);try{i.apply(o,re)}catch(Ee){this.onError(Ee)}}var Ei=!1,wr=null,Tr=!1,$i=null,$o={onError:function(t){Ei=!0,wr=t}};function ts(t,i,o,c,d,p,w,U,H){Ei=!1,wr=null,Mi.apply($o,arguments)}function qo(t,i,o,c,d,p,w,U,H){if(ts.apply(this,arguments),Ei){if(Ei){var re=wr;Ei=!1,wr=null}else throw Error(n(198));Tr||(Tr=!0,$i=re)}}function hi(t){var i=t,o=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(o=i.return),t=i.return;while(t)}return i.tag===3?o:null}function Yo(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function Ko(t){if(hi(t)!==t)throw Error(n(188))}function Vl(t){var i=t.alternate;if(!i){if(i=hi(t),i===null)throw Error(n(188));return i!==t?null:t}for(var o=t,c=i;;){var d=o.return;if(d===null)break;var p=d.alternate;if(p===null){if(c=d.return,c!==null){o=c;continue}break}if(d.child===p.child){for(p=d.child;p;){if(p===o)return Ko(d),t;if(p===c)return Ko(d),i;p=p.sibling}throw Error(n(188))}if(o.return!==c.return)o=d,c=p;else{for(var w=!1,U=d.child;U;){if(U===o){w=!0,o=d,c=p;break}if(U===c){w=!0,c=d,o=p;break}U=U.sibling}if(!w){for(U=p.child;U;){if(U===o){w=!0,o=p,c=d;break}if(U===c){w=!0,c=p,o=d;break}U=U.sibling}if(!w)throw Error(n(189))}}if(o.alternate!==c)throw Error(n(190))}if(o.tag!==3)throw Error(n(188));return o.stateNode.current===o?t:i}function R(t){return t=Vl(t),t!==null?q(t):null}function q(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var i=q(t);if(i!==null)return i;t=t.sibling}return null}var se=e.unstable_scheduleCallback,oe=e.unstable_cancelCallback,Y=e.unstable_shouldYield,Pe=e.unstable_requestPaint,Ce=e.unstable_now,Ke=e.unstable_getCurrentPriorityLevel,qe=e.unstable_ImmediatePriority,st=e.unstable_UserBlockingPriority,lt=e.unstable_NormalPriority,Ze=e.unstable_LowPriority,xt=e.unstable_IdlePriority,Ct=null,_t=null;function sn(t){if(_t&&typeof _t.onCommitFiberRoot=="function")try{_t.onCommitFiberRoot(Ct,t,void 0,(t.current.flags&128)===128)}catch{}}var dt=Math.clz32?Math.clz32:wt,Je=Math.log,Qn=Math.LN2;function wt(t){return t>>>=0,t===0?32:31-(Je(t)/Qn|0)|0}var on=64,Jn=4194304;function $t(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function pi(t,i){var o=t.pendingLanes;if(o===0)return 0;var c=0,d=t.suspendedLanes,p=t.pingedLanes,w=o&268435455;if(w!==0){var U=w&~d;U!==0?c=$t(U):(p&=w,p!==0&&(c=$t(p)))}else w=o&~d,w!==0?c=$t(w):p!==0&&(c=$t(p));if(c===0)return 0;if(i!==0&&i!==c&&(i&d)===0&&(d=c&-c,p=i&-i,d>=p||d===16&&(p&4194240)!==0))return i;if((c&4)!==0&&(c|=o&16),i=t.entangledLanes,i!==0)for(t=t.entanglements,i&=c;0<i;)o=31-dt(i),d=1<<o,c|=t[o],i&=~d;return c}function Nt(t,i){switch(t){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Bn(t,i){for(var o=t.suspendedLanes,c=t.pingedLanes,d=t.expirationTimes,p=t.pendingLanes;0<p;){var w=31-dt(p),U=1<<w,H=d[w];H===-1?((U&o)===0||(U&c)!==0)&&(d[w]=Nt(U,i)):H<=i&&(t.expiredLanes|=U),p&=~U}}function wi(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function mn(){var t=on;return on<<=1,(on&4194240)===0&&(on=64),t}function Vn(t){for(var i=[],o=0;31>o;o++)i.push(t);return i}function Sn(t,i,o){t.pendingLanes|=i,i!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,i=31-dt(i),t[i]=o}function Zo(t,i){var o=t.pendingLanes&~i;t.pendingLanes=i,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=i,t.mutableReadLanes&=i,t.entangledLanes&=i,i=t.entanglements;var c=t.eventTimes;for(t=t.expirationTimes;0<o;){var d=31-dt(o),p=1<<d;i[d]=0,c[d]=-1,t[d]=-1,o&=~p}}function Hl(t,i){var o=t.entangledLanes|=i;for(t=t.entanglements;o;){var c=31-dt(o),d=1<<c;d&i|t[c]&i&&(t[c]|=i),o&=~d}}var Pt=0;function fd(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var dd,Gl,hd,pd,md,Wl=!1,Qo=[],qi=null,Yi=null,Ki=null,Qs=new Map,Js=new Map,Zi=[],Wg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function gd(t,i){switch(t){case"focusin":case"focusout":qi=null;break;case"dragenter":case"dragleave":Yi=null;break;case"mouseover":case"mouseout":Ki=null;break;case"pointerover":case"pointerout":Qs.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Js.delete(i.pointerId)}}function eo(t,i,o,c,d,p){return t===null||t.nativeEvent!==p?(t={blockedOn:i,domEventName:o,eventSystemFlags:c,nativeEvent:p,targetContainers:[d]},i!==null&&(i=mo(i),i!==null&&Gl(i)),t):(t.eventSystemFlags|=c,i=t.targetContainers,d!==null&&i.indexOf(d)===-1&&i.push(d),t)}function jg(t,i,o,c,d){switch(i){case"focusin":return qi=eo(qi,t,i,o,c,d),!0;case"dragenter":return Yi=eo(Yi,t,i,o,c,d),!0;case"mouseover":return Ki=eo(Ki,t,i,o,c,d),!0;case"pointerover":var p=d.pointerId;return Qs.set(p,eo(Qs.get(p)||null,t,i,o,c,d)),!0;case"gotpointercapture":return p=d.pointerId,Js.set(p,eo(Js.get(p)||null,t,i,o,c,d)),!0}return!1}function vd(t){var i=Ar(t.target);if(i!==null){var o=hi(i);if(o!==null){if(i=o.tag,i===13){if(i=Yo(o),i!==null){t.blockedOn=i,md(t.priority,function(){hd(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Jo(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var o=Xl(t.domEventName,t.eventSystemFlags,i[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var c=new o.constructor(o.type,o);bt=c,o.target.dispatchEvent(c),bt=null}else return i=mo(o),i!==null&&Gl(i),t.blockedOn=o,!1;i.shift()}return!0}function _d(t,i,o){Jo(t)&&o.delete(i)}function Xg(){Wl=!1,qi!==null&&Jo(qi)&&(qi=null),Yi!==null&&Jo(Yi)&&(Yi=null),Ki!==null&&Jo(Ki)&&(Ki=null),Qs.forEach(_d),Js.forEach(_d)}function to(t,i){t.blockedOn===i&&(t.blockedOn=null,Wl||(Wl=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,Xg)))}function no(t){function i(d){return to(d,t)}if(0<Qo.length){to(Qo[0],t);for(var o=1;o<Qo.length;o++){var c=Qo[o];c.blockedOn===t&&(c.blockedOn=null)}}for(qi!==null&&to(qi,t),Yi!==null&&to(Yi,t),Ki!==null&&to(Ki,t),Qs.forEach(i),Js.forEach(i),o=0;o<Zi.length;o++)c=Zi[o],c.blockedOn===t&&(c.blockedOn=null);for(;0<Zi.length&&(o=Zi[0],o.blockedOn===null);)vd(o),o.blockedOn===null&&Zi.shift()}var ns=C.ReactCurrentBatchConfig,ea=!0;function $g(t,i,o,c){var d=Pt,p=ns.transition;ns.transition=null;try{Pt=1,jl(t,i,o,c)}finally{Pt=d,ns.transition=p}}function qg(t,i,o,c){var d=Pt,p=ns.transition;ns.transition=null;try{Pt=4,jl(t,i,o,c)}finally{Pt=d,ns.transition=p}}function jl(t,i,o,c){if(ea){var d=Xl(t,i,o,c);if(d===null)cc(t,i,c,ta,o),gd(t,c);else if(jg(d,t,i,o,c))c.stopPropagation();else if(gd(t,c),i&4&&-1<Wg.indexOf(t)){for(;d!==null;){var p=mo(d);if(p!==null&&dd(p),p=Xl(t,i,o,c),p===null&&cc(t,i,c,ta,o),p===d)break;d=p}d!==null&&c.stopPropagation()}else cc(t,i,c,null,o)}}var ta=null;function Xl(t,i,o,c){if(ta=null,t=$(c),t=Ar(t),t!==null)if(i=hi(t),i===null)t=null;else if(o=i.tag,o===13){if(t=Yo(i),t!==null)return t;t=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null);return ta=t,null}function xd(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ke()){case qe:return 1;case st:return 4;case lt:case Ze:return 16;case xt:return 536870912;default:return 16}default:return 16}}var Qi=null,$l=null,na=null;function yd(){if(na)return na;var t,i=$l,o=i.length,c,d="value"in Qi?Qi.value:Qi.textContent,p=d.length;for(t=0;t<o&&i[t]===d[t];t++);var w=o-t;for(c=1;c<=w&&i[o-c]===d[p-c];c++);return na=d.slice(t,1<c?1-c:void 0)}function ia(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function ra(){return!0}function Sd(){return!1}function Nn(t){function i(o,c,d,p,w){this._reactName=o,this._targetInst=d,this.type=c,this.nativeEvent=p,this.target=w,this.currentTarget=null;for(var U in t)t.hasOwnProperty(U)&&(o=t[U],this[U]=o?o(p):p[U]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?ra:Sd,this.isPropagationStopped=Sd,this}return D(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=ra)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=ra)},persist:function(){},isPersistent:ra}),i}var is={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ql=Nn(is),io=D({},is,{view:0,detail:0}),Yg=Nn(io),Yl,Kl,ro,sa=D({},io,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ql,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ro&&(ro&&t.type==="mousemove"?(Yl=t.screenX-ro.screenX,Kl=t.screenY-ro.screenY):Kl=Yl=0,ro=t),Yl)},movementY:function(t){return"movementY"in t?t.movementY:Kl}}),Md=Nn(sa),Kg=D({},sa,{dataTransfer:0}),Zg=Nn(Kg),Qg=D({},io,{relatedTarget:0}),Zl=Nn(Qg),Jg=D({},is,{animationName:0,elapsedTime:0,pseudoElement:0}),e0=Nn(Jg),t0=D({},is,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),n0=Nn(t0),i0=D({},is,{data:0}),Ed=Nn(i0),r0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},s0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},o0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function a0(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=o0[t])?!!i[t]:!1}function Ql(){return a0}var l0=D({},io,{key:function(t){if(t.key){var i=r0[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=ia(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?s0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ql,charCode:function(t){return t.type==="keypress"?ia(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ia(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),c0=Nn(l0),u0=D({},sa,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),wd=Nn(u0),f0=D({},io,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ql}),d0=Nn(f0),h0=D({},is,{propertyName:0,elapsedTime:0,pseudoElement:0}),p0=Nn(h0),m0=D({},sa,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),g0=Nn(m0),v0=[9,13,27,32],Jl=f&&"CompositionEvent"in window,so=null;f&&"documentMode"in document&&(so=document.documentMode);var _0=f&&"TextEvent"in window&&!so,Td=f&&(!Jl||so&&8<so&&11>=so),Ad=" ",Cd=!1;function bd(t,i){switch(t){case"keyup":return v0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Rd(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var rs=!1;function x0(t,i){switch(t){case"compositionend":return Rd(i);case"keypress":return i.which!==32?null:(Cd=!0,Ad);case"textInput":return t=i.data,t===Ad&&Cd?null:t;default:return null}}function y0(t,i){if(rs)return t==="compositionend"||!Jl&&bd(t,i)?(t=yd(),na=$l=Qi=null,rs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Td&&i.locale!=="ko"?null:i.data;default:return null}}var S0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Pd(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!S0[t.type]:i==="textarea"}function Ld(t,i,o,c){Fe(c),i=ua(i,"onChange"),0<i.length&&(o=new ql("onChange","change",null,o,c),t.push({event:o,listeners:i}))}var oo=null,ao=null;function M0(t){Yd(t,0)}function oa(t){var i=cs(t);if(We(i))return t}function E0(t,i){if(t==="change")return i}var Nd=!1;if(f){var ec;if(f){var tc="oninput"in document;if(!tc){var Dd=document.createElement("div");Dd.setAttribute("oninput","return;"),tc=typeof Dd.oninput=="function"}ec=tc}else ec=!1;Nd=ec&&(!document.documentMode||9<document.documentMode)}function Id(){oo&&(oo.detachEvent("onpropertychange",Ud),ao=oo=null)}function Ud(t){if(t.propertyName==="value"&&oa(ao)){var i=[];Ld(i,ao,t,$(t)),yn(M0,i)}}function w0(t,i,o){t==="focusin"?(Id(),oo=i,ao=o,oo.attachEvent("onpropertychange",Ud)):t==="focusout"&&Id()}function T0(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return oa(ao)}function A0(t,i){if(t==="click")return oa(i)}function C0(t,i){if(t==="input"||t==="change")return oa(i)}function b0(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var ei=typeof Object.is=="function"?Object.is:b0;function lo(t,i){if(ei(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var o=Object.keys(t),c=Object.keys(i);if(o.length!==c.length)return!1;for(c=0;c<o.length;c++){var d=o[c];if(!h.call(i,d)||!ei(t[d],i[d]))return!1}return!0}function Fd(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Od(t,i){var o=Fd(t);t=0;for(var c;o;){if(o.nodeType===3){if(c=t+o.textContent.length,t<=i&&c>=i)return{node:o,offset:i-t};t=c}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=Fd(o)}}function kd(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?kd(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function zd(){for(var t=window,i=it();i instanceof t.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)t=i.contentWindow;else break;i=it(t.document)}return i}function nc(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}function R0(t){var i=zd(),o=t.focusedElem,c=t.selectionRange;if(i!==o&&o&&o.ownerDocument&&kd(o.ownerDocument.documentElement,o)){if(c!==null&&nc(o)){if(i=c.start,t=c.end,t===void 0&&(t=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(t,o.value.length);else if(t=(i=o.ownerDocument||document)&&i.defaultView||window,t.getSelection){t=t.getSelection();var d=o.textContent.length,p=Math.min(c.start,d);c=c.end===void 0?p:Math.min(c.end,d),!t.extend&&p>c&&(d=c,c=p,p=d),d=Od(o,p);var w=Od(o,c);d&&w&&(t.rangeCount!==1||t.anchorNode!==d.node||t.anchorOffset!==d.offset||t.focusNode!==w.node||t.focusOffset!==w.offset)&&(i=i.createRange(),i.setStart(d.node,d.offset),t.removeAllRanges(),p>c?(t.addRange(i),t.extend(w.node,w.offset)):(i.setEnd(w.node,w.offset),t.addRange(i)))}}for(i=[],t=o;t=t.parentNode;)t.nodeType===1&&i.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)t=i[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var P0=f&&"documentMode"in document&&11>=document.documentMode,ss=null,ic=null,co=null,rc=!1;function Bd(t,i,o){var c=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;rc||ss==null||ss!==it(c)||(c=ss,"selectionStart"in c&&nc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),co&&lo(co,c)||(co=c,c=ua(ic,"onSelect"),0<c.length&&(i=new ql("onSelect","select",null,i,o),t.push({event:i,listeners:c}),i.target=ss)))}function aa(t,i){var o={};return o[t.toLowerCase()]=i.toLowerCase(),o["Webkit"+t]="webkit"+i,o["Moz"+t]="moz"+i,o}var os={animationend:aa("Animation","AnimationEnd"),animationiteration:aa("Animation","AnimationIteration"),animationstart:aa("Animation","AnimationStart"),transitionend:aa("Transition","TransitionEnd")},sc={},Vd={};f&&(Vd=document.createElement("div").style,"AnimationEvent"in window||(delete os.animationend.animation,delete os.animationiteration.animation,delete os.animationstart.animation),"TransitionEvent"in window||delete os.transitionend.transition);function la(t){if(sc[t])return sc[t];if(!os[t])return t;var i=os[t],o;for(o in i)if(i.hasOwnProperty(o)&&o in Vd)return sc[t]=i[o];return t}var Hd=la("animationend"),Gd=la("animationiteration"),Wd=la("animationstart"),jd=la("transitionend"),Xd=new Map,$d="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ji(t,i){Xd.set(t,i),l(i,[t])}for(var oc=0;oc<$d.length;oc++){var ac=$d[oc],L0=ac.toLowerCase(),N0=ac[0].toUpperCase()+ac.slice(1);Ji(L0,"on"+N0)}Ji(Hd,"onAnimationEnd"),Ji(Gd,"onAnimationIteration"),Ji(Wd,"onAnimationStart"),Ji("dblclick","onDoubleClick"),Ji("focusin","onFocus"),Ji("focusout","onBlur"),Ji(jd,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var uo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),D0=new Set("cancel close invalid load scroll toggle".split(" ").concat(uo));function qd(t,i,o){var c=t.type||"unknown-event";t.currentTarget=o,qo(c,i,void 0,t),t.currentTarget=null}function Yd(t,i){i=(i&4)!==0;for(var o=0;o<t.length;o++){var c=t[o],d=c.event;c=c.listeners;e:{var p=void 0;if(i)for(var w=c.length-1;0<=w;w--){var U=c[w],H=U.instance,re=U.currentTarget;if(U=U.listener,H!==p&&d.isPropagationStopped())break e;qd(d,U,re),p=H}else for(w=0;w<c.length;w++){if(U=c[w],H=U.instance,re=U.currentTarget,U=U.listener,H!==p&&d.isPropagationStopped())break e;qd(d,U,re),p=H}}}if(Tr)throw t=$i,Tr=!1,$i=null,t}function Ut(t,i){var o=i[mc];o===void 0&&(o=i[mc]=new Set);var c=t+"__bubble";o.has(c)||(Kd(i,t,2,!1),o.add(c))}function lc(t,i,o){var c=0;i&&(c|=4),Kd(o,t,c,i)}var ca="_reactListening"+Math.random().toString(36).slice(2);function fo(t){if(!t[ca]){t[ca]=!0,r.forEach(function(o){o!=="selectionchange"&&(D0.has(o)||lc(o,!1,t),lc(o,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[ca]||(i[ca]=!0,lc("selectionchange",!1,i))}}function Kd(t,i,o,c){switch(xd(i)){case 1:var d=$g;break;case 4:d=qg;break;default:d=jl}o=d.bind(null,i,o,t),d=void 0,!es||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(d=!0),c?d!==void 0?t.addEventListener(i,o,{capture:!0,passive:d}):t.addEventListener(i,o,!0):d!==void 0?t.addEventListener(i,o,{passive:d}):t.addEventListener(i,o,!1)}function cc(t,i,o,c,d){var p=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var w=c.tag;if(w===3||w===4){var U=c.stateNode.containerInfo;if(U===d||U.nodeType===8&&U.parentNode===d)break;if(w===4)for(w=c.return;w!==null;){var H=w.tag;if((H===3||H===4)&&(H=w.stateNode.containerInfo,H===d||H.nodeType===8&&H.parentNode===d))return;w=w.return}for(;U!==null;){if(w=Ar(U),w===null)return;if(H=w.tag,H===5||H===6){c=p=w;continue e}U=U.parentNode}}c=c.return}yn(function(){var re=p,Ee=$(o),Ae=[];e:{var Me=Xd.get(t);if(Me!==void 0){var ze=ql,Xe=t;switch(t){case"keypress":if(ia(o)===0)break e;case"keydown":case"keyup":ze=c0;break;case"focusin":Xe="focus",ze=Zl;break;case"focusout":Xe="blur",ze=Zl;break;case"beforeblur":case"afterblur":ze=Zl;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ze=Md;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ze=Zg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ze=d0;break;case Hd:case Gd:case Wd:ze=e0;break;case jd:ze=p0;break;case"scroll":ze=Yg;break;case"wheel":ze=g0;break;case"copy":case"cut":case"paste":ze=n0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ze=wd}var Ye=(i&4)!==0,Ht=!Ye&&t==="scroll",Z=Ye?Me!==null?Me+"Capture":null:Me;Ye=[];for(var X=re,te;X!==null;){te=X;var Re=te.stateNode;if(te.tag===5&&Re!==null&&(te=Re,Z!==null&&(Re=pn(X,Z),Re!=null&&Ye.push(ho(X,Re,te)))),Ht)break;X=X.return}0<Ye.length&&(Me=new ze(Me,Xe,null,o,Ee),Ae.push({event:Me,listeners:Ye}))}}if((i&7)===0){e:{if(Me=t==="mouseover"||t==="pointerover",ze=t==="mouseout"||t==="pointerout",Me&&o!==bt&&(Xe=o.relatedTarget||o.fromElement)&&(Ar(Xe)||Xe[Ti]))break e;if((ze||Me)&&(Me=Ee.window===Ee?Ee:(Me=Ee.ownerDocument)?Me.defaultView||Me.parentWindow:window,ze?(Xe=o.relatedTarget||o.toElement,ze=re,Xe=Xe?Ar(Xe):null,Xe!==null&&(Ht=hi(Xe),Xe!==Ht||Xe.tag!==5&&Xe.tag!==6)&&(Xe=null)):(ze=null,Xe=re),ze!==Xe)){if(Ye=Md,Re="onMouseLeave",Z="onMouseEnter",X="mouse",(t==="pointerout"||t==="pointerover")&&(Ye=wd,Re="onPointerLeave",Z="onPointerEnter",X="pointer"),Ht=ze==null?Me:cs(ze),te=Xe==null?Me:cs(Xe),Me=new Ye(Re,X+"leave",ze,o,Ee),Me.target=Ht,Me.relatedTarget=te,Re=null,Ar(Ee)===re&&(Ye=new Ye(Z,X+"enter",Xe,o,Ee),Ye.target=te,Ye.relatedTarget=Ht,Re=Ye),Ht=Re,ze&&Xe)t:{for(Ye=ze,Z=Xe,X=0,te=Ye;te;te=as(te))X++;for(te=0,Re=Z;Re;Re=as(Re))te++;for(;0<X-te;)Ye=as(Ye),X--;for(;0<te-X;)Z=as(Z),te--;for(;X--;){if(Ye===Z||Z!==null&&Ye===Z.alternate)break t;Ye=as(Ye),Z=as(Z)}Ye=null}else Ye=null;ze!==null&&Zd(Ae,Me,ze,Ye,!1),Xe!==null&&Ht!==null&&Zd(Ae,Ht,Xe,Ye,!0)}}e:{if(Me=re?cs(re):window,ze=Me.nodeName&&Me.nodeName.toLowerCase(),ze==="select"||ze==="input"&&Me.type==="file")var Qe=E0;else if(Pd(Me))if(Nd)Qe=C0;else{Qe=T0;var tt=w0}else(ze=Me.nodeName)&&ze.toLowerCase()==="input"&&(Me.type==="checkbox"||Me.type==="radio")&&(Qe=A0);if(Qe&&(Qe=Qe(t,re))){Ld(Ae,Qe,o,Ee);break e}tt&&tt(t,Me,re),t==="focusout"&&(tt=Me._wrapperState)&&tt.controlled&&Me.type==="number"&&at(Me,"number",Me.value)}switch(tt=re?cs(re):window,t){case"focusin":(Pd(tt)||tt.contentEditable==="true")&&(ss=tt,ic=re,co=null);break;case"focusout":co=ic=ss=null;break;case"mousedown":rc=!0;break;case"contextmenu":case"mouseup":case"dragend":rc=!1,Bd(Ae,o,Ee);break;case"selectionchange":if(P0)break;case"keydown":case"keyup":Bd(Ae,o,Ee)}var nt;if(Jl)e:{switch(t){case"compositionstart":var ot="onCompositionStart";break e;case"compositionend":ot="onCompositionEnd";break e;case"compositionupdate":ot="onCompositionUpdate";break e}ot=void 0}else rs?bd(t,o)&&(ot="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(ot="onCompositionStart");ot&&(Td&&o.locale!=="ko"&&(rs||ot!=="onCompositionStart"?ot==="onCompositionEnd"&&rs&&(nt=yd()):(Qi=Ee,$l="value"in Qi?Qi.value:Qi.textContent,rs=!0)),tt=ua(re,ot),0<tt.length&&(ot=new Ed(ot,t,null,o,Ee),Ae.push({event:ot,listeners:tt}),nt?ot.data=nt:(nt=Rd(o),nt!==null&&(ot.data=nt)))),(nt=_0?x0(t,o):y0(t,o))&&(re=ua(re,"onBeforeInput"),0<re.length&&(Ee=new Ed("onBeforeInput","beforeinput",null,o,Ee),Ae.push({event:Ee,listeners:re}),Ee.data=nt))}Yd(Ae,i)})}function ho(t,i,o){return{instance:t,listener:i,currentTarget:o}}function ua(t,i){for(var o=i+"Capture",c=[];t!==null;){var d=t,p=d.stateNode;d.tag===5&&p!==null&&(d=p,p=pn(t,o),p!=null&&c.unshift(ho(t,p,d)),p=pn(t,i),p!=null&&c.push(ho(t,p,d))),t=t.return}return c}function as(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Zd(t,i,o,c,d){for(var p=i._reactName,w=[];o!==null&&o!==c;){var U=o,H=U.alternate,re=U.stateNode;if(H!==null&&H===c)break;U.tag===5&&re!==null&&(U=re,d?(H=pn(o,p),H!=null&&w.unshift(ho(o,H,U))):d||(H=pn(o,p),H!=null&&w.push(ho(o,H,U)))),o=o.return}w.length!==0&&t.push({event:i,listeners:w})}var I0=/\r\n?/g,U0=/\u0000|\uFFFD/g;function Qd(t){return(typeof t=="string"?t:""+t).replace(I0,`
`).replace(U0,"")}function fa(t,i,o){if(i=Qd(i),Qd(t)!==i&&o)throw Error(n(425))}function da(){}var uc=null,fc=null;function dc(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var hc=typeof setTimeout=="function"?setTimeout:void 0,F0=typeof clearTimeout=="function"?clearTimeout:void 0,Jd=typeof Promise=="function"?Promise:void 0,O0=typeof queueMicrotask=="function"?queueMicrotask:typeof Jd<"u"?function(t){return Jd.resolve(null).then(t).catch(k0)}:hc;function k0(t){setTimeout(function(){throw t})}function pc(t,i){var o=i,c=0;do{var d=o.nextSibling;if(t.removeChild(o),d&&d.nodeType===8)if(o=d.data,o==="/$"){if(c===0){t.removeChild(d),no(i);return}c--}else o!=="$"&&o!=="$?"&&o!=="$!"||c++;o=d}while(o);no(i)}function er(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return t}function eh(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return t;i--}else o==="/$"&&i++}t=t.previousSibling}return null}var ls=Math.random().toString(36).slice(2),mi="__reactFiber$"+ls,po="__reactProps$"+ls,Ti="__reactContainer$"+ls,mc="__reactEvents$"+ls,z0="__reactListeners$"+ls,B0="__reactHandles$"+ls;function Ar(t){var i=t[mi];if(i)return i;for(var o=t.parentNode;o;){if(i=o[Ti]||o[mi]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(t=eh(t);t!==null;){if(o=t[mi])return o;t=eh(t)}return i}t=o,o=t.parentNode}return null}function mo(t){return t=t[mi]||t[Ti],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function cs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(n(33))}function ha(t){return t[po]||null}var gc=[],us=-1;function tr(t){return{current:t}}function Ft(t){0>us||(t.current=gc[us],gc[us]=null,us--)}function Dt(t,i){us++,gc[us]=t.current,t.current=i}var nr={},an=tr(nr),Mn=tr(!1),Cr=nr;function fs(t,i){var o=t.type.contextTypes;if(!o)return nr;var c=t.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var d={},p;for(p in o)d[p]=i[p];return c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=d),d}function En(t){return t=t.childContextTypes,t!=null}function pa(){Ft(Mn),Ft(an)}function th(t,i,o){if(an.current!==nr)throw Error(n(168));Dt(an,i),Dt(Mn,o)}function nh(t,i,o){var c=t.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return o;c=c.getChildContext();for(var d in c)if(!(d in i))throw Error(n(108,ne(t)||"Unknown",d));return D({},o,c)}function ma(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||nr,Cr=an.current,Dt(an,t),Dt(Mn,Mn.current),!0}function ih(t,i,o){var c=t.stateNode;if(!c)throw Error(n(169));o?(t=nh(t,i,Cr),c.__reactInternalMemoizedMergedChildContext=t,Ft(Mn),Ft(an),Dt(an,t)):Ft(Mn),Dt(Mn,o)}var Ai=null,ga=!1,vc=!1;function rh(t){Ai===null?Ai=[t]:Ai.push(t)}function V0(t){ga=!0,rh(t)}function ir(){if(!vc&&Ai!==null){vc=!0;var t=0,i=Pt;try{var o=Ai;for(Pt=1;t<o.length;t++){var c=o[t];do c=c(!0);while(c!==null)}Ai=null,ga=!1}catch(d){throw Ai!==null&&(Ai=Ai.slice(t+1)),se(qe,ir),d}finally{Pt=i,vc=!1}}return null}var ds=[],hs=0,va=null,_a=0,Hn=[],Gn=0,br=null,Ci=1,bi="";function Rr(t,i){ds[hs++]=_a,ds[hs++]=va,va=t,_a=i}function sh(t,i,o){Hn[Gn++]=Ci,Hn[Gn++]=bi,Hn[Gn++]=br,br=t;var c=Ci;t=bi;var d=32-dt(c)-1;c&=~(1<<d),o+=1;var p=32-dt(i)+d;if(30<p){var w=d-d%5;p=(c&(1<<w)-1).toString(32),c>>=w,d-=w,Ci=1<<32-dt(i)+d|o<<d|c,bi=p+t}else Ci=1<<p|o<<d|c,bi=t}function _c(t){t.return!==null&&(Rr(t,1),sh(t,1,0))}function xc(t){for(;t===va;)va=ds[--hs],ds[hs]=null,_a=ds[--hs],ds[hs]=null;for(;t===br;)br=Hn[--Gn],Hn[Gn]=null,bi=Hn[--Gn],Hn[Gn]=null,Ci=Hn[--Gn],Hn[Gn]=null}var Dn=null,In=null,Ot=!1,ti=null;function oh(t,i){var o=$n(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=t,i=t.deletions,i===null?(t.deletions=[o],t.flags|=16):i.push(o)}function ah(t,i){switch(t.tag){case 5:var o=t.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(t.stateNode=i,Dn=t,In=er(i.firstChild),!0):!1;case 6:return i=t.pendingProps===""||i.nodeType!==3?null:i,i!==null?(t.stateNode=i,Dn=t,In=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=br!==null?{id:Ci,overflow:bi}:null,t.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=$n(18,null,null,0),o.stateNode=i,o.return=t,t.child=o,Dn=t,In=null,!0):!1;default:return!1}}function yc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Sc(t){if(Ot){var i=In;if(i){var o=i;if(!ah(t,i)){if(yc(t))throw Error(n(418));i=er(o.nextSibling);var c=Dn;i&&ah(t,i)?oh(c,o):(t.flags=t.flags&-4097|2,Ot=!1,Dn=t)}}else{if(yc(t))throw Error(n(418));t.flags=t.flags&-4097|2,Ot=!1,Dn=t}}}function lh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Dn=t}function xa(t){if(t!==Dn)return!1;if(!Ot)return lh(t),Ot=!0,!1;var i;if((i=t.tag!==3)&&!(i=t.tag!==5)&&(i=t.type,i=i!=="head"&&i!=="body"&&!dc(t.type,t.memoizedProps)),i&&(i=In)){if(yc(t))throw ch(),Error(n(418));for(;i;)oh(t,i),i=er(i.nextSibling)}if(lh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(n(317));e:{for(t=t.nextSibling,i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(i===0){In=er(t.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}t=t.nextSibling}In=null}}else In=Dn?er(t.stateNode.nextSibling):null;return!0}function ch(){for(var t=In;t;)t=er(t.nextSibling)}function ps(){In=Dn=null,Ot=!1}function Mc(t){ti===null?ti=[t]:ti.push(t)}var H0=C.ReactCurrentBatchConfig;function go(t,i,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(n(309));var c=o.stateNode}if(!c)throw Error(n(147,t));var d=c,p=""+t;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===p?i.ref:(i=function(w){var U=d.refs;w===null?delete U[p]:U[p]=w},i._stringRef=p,i)}if(typeof t!="string")throw Error(n(284));if(!o._owner)throw Error(n(290,t))}return t}function ya(t,i){throw t=Object.prototype.toString.call(i),Error(n(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t))}function uh(t){var i=t._init;return i(t._payload)}function fh(t){function i(Z,X){if(t){var te=Z.deletions;te===null?(Z.deletions=[X],Z.flags|=16):te.push(X)}}function o(Z,X){if(!t)return null;for(;X!==null;)i(Z,X),X=X.sibling;return null}function c(Z,X){for(Z=new Map;X!==null;)X.key!==null?Z.set(X.key,X):Z.set(X.index,X),X=X.sibling;return Z}function d(Z,X){return Z=fr(Z,X),Z.index=0,Z.sibling=null,Z}function p(Z,X,te){return Z.index=te,t?(te=Z.alternate,te!==null?(te=te.index,te<X?(Z.flags|=2,X):te):(Z.flags|=2,X)):(Z.flags|=1048576,X)}function w(Z){return t&&Z.alternate===null&&(Z.flags|=2),Z}function U(Z,X,te,Re){return X===null||X.tag!==6?(X=hu(te,Z.mode,Re),X.return=Z,X):(X=d(X,te),X.return=Z,X)}function H(Z,X,te,Re){var Qe=te.type;return Qe===O?Ee(Z,X,te.props.children,Re,te.key):X!==null&&(X.elementType===Qe||typeof Qe=="object"&&Qe!==null&&Qe.$$typeof===ce&&uh(Qe)===X.type)?(Re=d(X,te.props),Re.ref=go(Z,X,te),Re.return=Z,Re):(Re=Wa(te.type,te.key,te.props,null,Z.mode,Re),Re.ref=go(Z,X,te),Re.return=Z,Re)}function re(Z,X,te,Re){return X===null||X.tag!==4||X.stateNode.containerInfo!==te.containerInfo||X.stateNode.implementation!==te.implementation?(X=pu(te,Z.mode,Re),X.return=Z,X):(X=d(X,te.children||[]),X.return=Z,X)}function Ee(Z,X,te,Re,Qe){return X===null||X.tag!==7?(X=Or(te,Z.mode,Re,Qe),X.return=Z,X):(X=d(X,te),X.return=Z,X)}function Ae(Z,X,te){if(typeof X=="string"&&X!==""||typeof X=="number")return X=hu(""+X,Z.mode,te),X.return=Z,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case K:return te=Wa(X.type,X.key,X.props,null,Z.mode,te),te.ref=go(Z,null,X),te.return=Z,te;case k:return X=pu(X,Z.mode,te),X.return=Z,X;case ce:var Re=X._init;return Ae(Z,Re(X._payload),te)}if(Oe(X)||ue(X))return X=Or(X,Z.mode,te,null),X.return=Z,X;ya(Z,X)}return null}function Me(Z,X,te,Re){var Qe=X!==null?X.key:null;if(typeof te=="string"&&te!==""||typeof te=="number")return Qe!==null?null:U(Z,X,""+te,Re);if(typeof te=="object"&&te!==null){switch(te.$$typeof){case K:return te.key===Qe?H(Z,X,te,Re):null;case k:return te.key===Qe?re(Z,X,te,Re):null;case ce:return Qe=te._init,Me(Z,X,Qe(te._payload),Re)}if(Oe(te)||ue(te))return Qe!==null?null:Ee(Z,X,te,Re,null);ya(Z,te)}return null}function ze(Z,X,te,Re,Qe){if(typeof Re=="string"&&Re!==""||typeof Re=="number")return Z=Z.get(te)||null,U(X,Z,""+Re,Qe);if(typeof Re=="object"&&Re!==null){switch(Re.$$typeof){case K:return Z=Z.get(Re.key===null?te:Re.key)||null,H(X,Z,Re,Qe);case k:return Z=Z.get(Re.key===null?te:Re.key)||null,re(X,Z,Re,Qe);case ce:var tt=Re._init;return ze(Z,X,te,tt(Re._payload),Qe)}if(Oe(Re)||ue(Re))return Z=Z.get(te)||null,Ee(X,Z,Re,Qe,null);ya(X,Re)}return null}function Xe(Z,X,te,Re){for(var Qe=null,tt=null,nt=X,ot=X=0,en=null;nt!==null&&ot<te.length;ot++){nt.index>ot?(en=nt,nt=null):en=nt.sibling;var Tt=Me(Z,nt,te[ot],Re);if(Tt===null){nt===null&&(nt=en);break}t&&nt&&Tt.alternate===null&&i(Z,nt),X=p(Tt,X,ot),tt===null?Qe=Tt:tt.sibling=Tt,tt=Tt,nt=en}if(ot===te.length)return o(Z,nt),Ot&&Rr(Z,ot),Qe;if(nt===null){for(;ot<te.length;ot++)nt=Ae(Z,te[ot],Re),nt!==null&&(X=p(nt,X,ot),tt===null?Qe=nt:tt.sibling=nt,tt=nt);return Ot&&Rr(Z,ot),Qe}for(nt=c(Z,nt);ot<te.length;ot++)en=ze(nt,Z,ot,te[ot],Re),en!==null&&(t&&en.alternate!==null&&nt.delete(en.key===null?ot:en.key),X=p(en,X,ot),tt===null?Qe=en:tt.sibling=en,tt=en);return t&&nt.forEach(function(dr){return i(Z,dr)}),Ot&&Rr(Z,ot),Qe}function Ye(Z,X,te,Re){var Qe=ue(te);if(typeof Qe!="function")throw Error(n(150));if(te=Qe.call(te),te==null)throw Error(n(151));for(var tt=Qe=null,nt=X,ot=X=0,en=null,Tt=te.next();nt!==null&&!Tt.done;ot++,Tt=te.next()){nt.index>ot?(en=nt,nt=null):en=nt.sibling;var dr=Me(Z,nt,Tt.value,Re);if(dr===null){nt===null&&(nt=en);break}t&&nt&&dr.alternate===null&&i(Z,nt),X=p(dr,X,ot),tt===null?Qe=dr:tt.sibling=dr,tt=dr,nt=en}if(Tt.done)return o(Z,nt),Ot&&Rr(Z,ot),Qe;if(nt===null){for(;!Tt.done;ot++,Tt=te.next())Tt=Ae(Z,Tt.value,Re),Tt!==null&&(X=p(Tt,X,ot),tt===null?Qe=Tt:tt.sibling=Tt,tt=Tt);return Ot&&Rr(Z,ot),Qe}for(nt=c(Z,nt);!Tt.done;ot++,Tt=te.next())Tt=ze(nt,Z,ot,Tt.value,Re),Tt!==null&&(t&&Tt.alternate!==null&&nt.delete(Tt.key===null?ot:Tt.key),X=p(Tt,X,ot),tt===null?Qe=Tt:tt.sibling=Tt,tt=Tt);return t&&nt.forEach(function(Sv){return i(Z,Sv)}),Ot&&Rr(Z,ot),Qe}function Ht(Z,X,te,Re){if(typeof te=="object"&&te!==null&&te.type===O&&te.key===null&&(te=te.props.children),typeof te=="object"&&te!==null){switch(te.$$typeof){case K:e:{for(var Qe=te.key,tt=X;tt!==null;){if(tt.key===Qe){if(Qe=te.type,Qe===O){if(tt.tag===7){o(Z,tt.sibling),X=d(tt,te.props.children),X.return=Z,Z=X;break e}}else if(tt.elementType===Qe||typeof Qe=="object"&&Qe!==null&&Qe.$$typeof===ce&&uh(Qe)===tt.type){o(Z,tt.sibling),X=d(tt,te.props),X.ref=go(Z,tt,te),X.return=Z,Z=X;break e}o(Z,tt);break}else i(Z,tt);tt=tt.sibling}te.type===O?(X=Or(te.props.children,Z.mode,Re,te.key),X.return=Z,Z=X):(Re=Wa(te.type,te.key,te.props,null,Z.mode,Re),Re.ref=go(Z,X,te),Re.return=Z,Z=Re)}return w(Z);case k:e:{for(tt=te.key;X!==null;){if(X.key===tt)if(X.tag===4&&X.stateNode.containerInfo===te.containerInfo&&X.stateNode.implementation===te.implementation){o(Z,X.sibling),X=d(X,te.children||[]),X.return=Z,Z=X;break e}else{o(Z,X);break}else i(Z,X);X=X.sibling}X=pu(te,Z.mode,Re),X.return=Z,Z=X}return w(Z);case ce:return tt=te._init,Ht(Z,X,tt(te._payload),Re)}if(Oe(te))return Xe(Z,X,te,Re);if(ue(te))return Ye(Z,X,te,Re);ya(Z,te)}return typeof te=="string"&&te!==""||typeof te=="number"?(te=""+te,X!==null&&X.tag===6?(o(Z,X.sibling),X=d(X,te),X.return=Z,Z=X):(o(Z,X),X=hu(te,Z.mode,Re),X.return=Z,Z=X),w(Z)):o(Z,X)}return Ht}var ms=fh(!0),dh=fh(!1),Sa=tr(null),Ma=null,gs=null,Ec=null;function wc(){Ec=gs=Ma=null}function Tc(t){var i=Sa.current;Ft(Sa),t._currentValue=i}function Ac(t,i,o){for(;t!==null;){var c=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),t===o)break;t=t.return}}function vs(t,i){Ma=t,Ec=gs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&i)!==0&&(wn=!0),t.firstContext=null)}function Wn(t){var i=t._currentValue;if(Ec!==t)if(t={context:t,memoizedValue:i,next:null},gs===null){if(Ma===null)throw Error(n(308));gs=t,Ma.dependencies={lanes:0,firstContext:t}}else gs=gs.next=t;return i}var Pr=null;function Cc(t){Pr===null?Pr=[t]:Pr.push(t)}function hh(t,i,o,c){var d=i.interleaved;return d===null?(o.next=o,Cc(i)):(o.next=d.next,d.next=o),i.interleaved=o,Ri(t,c)}function Ri(t,i){t.lanes|=i;var o=t.alternate;for(o!==null&&(o.lanes|=i),o=t,t=t.return;t!==null;)t.childLanes|=i,o=t.alternate,o!==null&&(o.childLanes|=i),o=t,t=t.return;return o.tag===3?o.stateNode:null}var rr=!1;function bc(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ph(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Pi(t,i){return{eventTime:t,lane:i,tag:0,payload:null,callback:null,next:null}}function sr(t,i,o){var c=t.updateQueue;if(c===null)return null;if(c=c.shared,(St&2)!==0){var d=c.pending;return d===null?i.next=i:(i.next=d.next,d.next=i),c.pending=i,Ri(t,o)}return d=c.interleaved,d===null?(i.next=i,Cc(c)):(i.next=d.next,d.next=i),c.interleaved=i,Ri(t,o)}function Ea(t,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var c=i.lanes;c&=t.pendingLanes,o|=c,i.lanes=o,Hl(t,o)}}function mh(t,i){var o=t.updateQueue,c=t.alternate;if(c!==null&&(c=c.updateQueue,o===c)){var d=null,p=null;if(o=o.firstBaseUpdate,o!==null){do{var w={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};p===null?d=p=w:p=p.next=w,o=o.next}while(o!==null);p===null?d=p=i:p=p.next=i}else d=p=i;o={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:p,shared:c.shared,effects:c.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=i:t.next=i,o.lastBaseUpdate=i}function wa(t,i,o,c){var d=t.updateQueue;rr=!1;var p=d.firstBaseUpdate,w=d.lastBaseUpdate,U=d.shared.pending;if(U!==null){d.shared.pending=null;var H=U,re=H.next;H.next=null,w===null?p=re:w.next=re,w=H;var Ee=t.alternate;Ee!==null&&(Ee=Ee.updateQueue,U=Ee.lastBaseUpdate,U!==w&&(U===null?Ee.firstBaseUpdate=re:U.next=re,Ee.lastBaseUpdate=H))}if(p!==null){var Ae=d.baseState;w=0,Ee=re=H=null,U=p;do{var Me=U.lane,ze=U.eventTime;if((c&Me)===Me){Ee!==null&&(Ee=Ee.next={eventTime:ze,lane:0,tag:U.tag,payload:U.payload,callback:U.callback,next:null});e:{var Xe=t,Ye=U;switch(Me=i,ze=o,Ye.tag){case 1:if(Xe=Ye.payload,typeof Xe=="function"){Ae=Xe.call(ze,Ae,Me);break e}Ae=Xe;break e;case 3:Xe.flags=Xe.flags&-65537|128;case 0:if(Xe=Ye.payload,Me=typeof Xe=="function"?Xe.call(ze,Ae,Me):Xe,Me==null)break e;Ae=D({},Ae,Me);break e;case 2:rr=!0}}U.callback!==null&&U.lane!==0&&(t.flags|=64,Me=d.effects,Me===null?d.effects=[U]:Me.push(U))}else ze={eventTime:ze,lane:Me,tag:U.tag,payload:U.payload,callback:U.callback,next:null},Ee===null?(re=Ee=ze,H=Ae):Ee=Ee.next=ze,w|=Me;if(U=U.next,U===null){if(U=d.shared.pending,U===null)break;Me=U,U=Me.next,Me.next=null,d.lastBaseUpdate=Me,d.shared.pending=null}}while(!0);if(Ee===null&&(H=Ae),d.baseState=H,d.firstBaseUpdate=re,d.lastBaseUpdate=Ee,i=d.shared.interleaved,i!==null){d=i;do w|=d.lane,d=d.next;while(d!==i)}else p===null&&(d.shared.lanes=0);Dr|=w,t.lanes=w,t.memoizedState=Ae}}function gh(t,i,o){if(t=i.effects,i.effects=null,t!==null)for(i=0;i<t.length;i++){var c=t[i],d=c.callback;if(d!==null){if(c.callback=null,c=o,typeof d!="function")throw Error(n(191,d));d.call(c)}}}var vo={},gi=tr(vo),_o=tr(vo),xo=tr(vo);function Lr(t){if(t===vo)throw Error(n(174));return t}function Rc(t,i){switch(Dt(xo,i),Dt(_o,t),Dt(gi,vo),t=i.nodeType,t){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:Ve(null,"");break;default:t=t===8?i.parentNode:i,i=t.namespaceURI||null,t=t.tagName,i=Ve(i,t)}Ft(gi),Dt(gi,i)}function _s(){Ft(gi),Ft(_o),Ft(xo)}function vh(t){Lr(xo.current);var i=Lr(gi.current),o=Ve(i,t.type);i!==o&&(Dt(_o,t),Dt(gi,o))}function Pc(t){_o.current===t&&(Ft(gi),Ft(_o))}var kt=tr(0);function Ta(t){for(var i=t;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Lc=[];function Nc(){for(var t=0;t<Lc.length;t++)Lc[t]._workInProgressVersionPrimary=null;Lc.length=0}var Aa=C.ReactCurrentDispatcher,Dc=C.ReactCurrentBatchConfig,Nr=0,zt=null,qt=null,Qt=null,Ca=!1,yo=!1,So=0,G0=0;function ln(){throw Error(n(321))}function Ic(t,i){if(i===null)return!1;for(var o=0;o<i.length&&o<t.length;o++)if(!ei(t[o],i[o]))return!1;return!0}function Uc(t,i,o,c,d,p){if(Nr=p,zt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Aa.current=t===null||t.memoizedState===null?$0:q0,t=o(c,d),yo){p=0;do{if(yo=!1,So=0,25<=p)throw Error(n(301));p+=1,Qt=qt=null,i.updateQueue=null,Aa.current=Y0,t=o(c,d)}while(yo)}if(Aa.current=Pa,i=qt!==null&&qt.next!==null,Nr=0,Qt=qt=zt=null,Ca=!1,i)throw Error(n(300));return t}function Fc(){var t=So!==0;return So=0,t}function vi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Qt===null?zt.memoizedState=Qt=t:Qt=Qt.next=t,Qt}function jn(){if(qt===null){var t=zt.alternate;t=t!==null?t.memoizedState:null}else t=qt.next;var i=Qt===null?zt.memoizedState:Qt.next;if(i!==null)Qt=i,qt=t;else{if(t===null)throw Error(n(310));qt=t,t={memoizedState:qt.memoizedState,baseState:qt.baseState,baseQueue:qt.baseQueue,queue:qt.queue,next:null},Qt===null?zt.memoizedState=Qt=t:Qt=Qt.next=t}return Qt}function Mo(t,i){return typeof i=="function"?i(t):i}function Oc(t){var i=jn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var c=qt,d=c.baseQueue,p=o.pending;if(p!==null){if(d!==null){var w=d.next;d.next=p.next,p.next=w}c.baseQueue=d=p,o.pending=null}if(d!==null){p=d.next,c=c.baseState;var U=w=null,H=null,re=p;do{var Ee=re.lane;if((Nr&Ee)===Ee)H!==null&&(H=H.next={lane:0,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null}),c=re.hasEagerState?re.eagerState:t(c,re.action);else{var Ae={lane:Ee,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null};H===null?(U=H=Ae,w=c):H=H.next=Ae,zt.lanes|=Ee,Dr|=Ee}re=re.next}while(re!==null&&re!==p);H===null?w=c:H.next=U,ei(c,i.memoizedState)||(wn=!0),i.memoizedState=c,i.baseState=w,i.baseQueue=H,o.lastRenderedState=c}if(t=o.interleaved,t!==null){d=t;do p=d.lane,zt.lanes|=p,Dr|=p,d=d.next;while(d!==t)}else d===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function kc(t){var i=jn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var c=o.dispatch,d=o.pending,p=i.memoizedState;if(d!==null){o.pending=null;var w=d=d.next;do p=t(p,w.action),w=w.next;while(w!==d);ei(p,i.memoizedState)||(wn=!0),i.memoizedState=p,i.baseQueue===null&&(i.baseState=p),o.lastRenderedState=p}return[p,c]}function _h(){}function xh(t,i){var o=zt,c=jn(),d=i(),p=!ei(c.memoizedState,d);if(p&&(c.memoizedState=d,wn=!0),c=c.queue,zc(Mh.bind(null,o,c,t),[t]),c.getSnapshot!==i||p||Qt!==null&&Qt.memoizedState.tag&1){if(o.flags|=2048,Eo(9,Sh.bind(null,o,c,d,i),void 0,null),Jt===null)throw Error(n(349));(Nr&30)!==0||yh(o,i,d)}return d}function yh(t,i,o){t.flags|=16384,t={getSnapshot:i,value:o},i=zt.updateQueue,i===null?(i={lastEffect:null,stores:null},zt.updateQueue=i,i.stores=[t]):(o=i.stores,o===null?i.stores=[t]:o.push(t))}function Sh(t,i,o,c){i.value=o,i.getSnapshot=c,Eh(i)&&wh(t)}function Mh(t,i,o){return o(function(){Eh(i)&&wh(t)})}function Eh(t){var i=t.getSnapshot;t=t.value;try{var o=i();return!ei(t,o)}catch{return!0}}function wh(t){var i=Ri(t,1);i!==null&&si(i,t,1,-1)}function Th(t){var i=vi();return typeof t=="function"&&(t=t()),i.memoizedState=i.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Mo,lastRenderedState:t},i.queue=t,t=t.dispatch=X0.bind(null,zt,t),[i.memoizedState,t]}function Eo(t,i,o,c){return t={tag:t,create:i,destroy:o,deps:c,next:null},i=zt.updateQueue,i===null?(i={lastEffect:null,stores:null},zt.updateQueue=i,i.lastEffect=t.next=t):(o=i.lastEffect,o===null?i.lastEffect=t.next=t:(c=o.next,o.next=t,t.next=c,i.lastEffect=t)),t}function Ah(){return jn().memoizedState}function ba(t,i,o,c){var d=vi();zt.flags|=t,d.memoizedState=Eo(1|i,o,void 0,c===void 0?null:c)}function Ra(t,i,o,c){var d=jn();c=c===void 0?null:c;var p=void 0;if(qt!==null){var w=qt.memoizedState;if(p=w.destroy,c!==null&&Ic(c,w.deps)){d.memoizedState=Eo(i,o,p,c);return}}zt.flags|=t,d.memoizedState=Eo(1|i,o,p,c)}function Ch(t,i){return ba(8390656,8,t,i)}function zc(t,i){return Ra(2048,8,t,i)}function bh(t,i){return Ra(4,2,t,i)}function Rh(t,i){return Ra(4,4,t,i)}function Ph(t,i){if(typeof i=="function")return t=t(),i(t),function(){i(null)};if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function Lh(t,i,o){return o=o!=null?o.concat([t]):null,Ra(4,4,Ph.bind(null,i,t),o)}function Bc(){}function Nh(t,i){var o=jn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&Ic(i,c[1])?c[0]:(o.memoizedState=[t,i],t)}function Dh(t,i){var o=jn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&Ic(i,c[1])?c[0]:(t=t(),o.memoizedState=[t,i],t)}function Ih(t,i,o){return(Nr&21)===0?(t.baseState&&(t.baseState=!1,wn=!0),t.memoizedState=o):(ei(o,i)||(o=mn(),zt.lanes|=o,Dr|=o,t.baseState=!0),i)}function W0(t,i){var o=Pt;Pt=o!==0&&4>o?o:4,t(!0);var c=Dc.transition;Dc.transition={};try{t(!1),i()}finally{Pt=o,Dc.transition=c}}function Uh(){return jn().memoizedState}function j0(t,i,o){var c=cr(t);if(o={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null},Fh(t))Oh(i,o);else if(o=hh(t,i,o,c),o!==null){var d=vn();si(o,t,c,d),kh(o,i,c)}}function X0(t,i,o){var c=cr(t),d={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null};if(Fh(t))Oh(i,d);else{var p=t.alternate;if(t.lanes===0&&(p===null||p.lanes===0)&&(p=i.lastRenderedReducer,p!==null))try{var w=i.lastRenderedState,U=p(w,o);if(d.hasEagerState=!0,d.eagerState=U,ei(U,w)){var H=i.interleaved;H===null?(d.next=d,Cc(i)):(d.next=H.next,H.next=d),i.interleaved=d;return}}catch{}finally{}o=hh(t,i,d,c),o!==null&&(d=vn(),si(o,t,c,d),kh(o,i,c))}}function Fh(t){var i=t.alternate;return t===zt||i!==null&&i===zt}function Oh(t,i){yo=Ca=!0;var o=t.pending;o===null?i.next=i:(i.next=o.next,o.next=i),t.pending=i}function kh(t,i,o){if((o&4194240)!==0){var c=i.lanes;c&=t.pendingLanes,o|=c,i.lanes=o,Hl(t,o)}}var Pa={readContext:Wn,useCallback:ln,useContext:ln,useEffect:ln,useImperativeHandle:ln,useInsertionEffect:ln,useLayoutEffect:ln,useMemo:ln,useReducer:ln,useRef:ln,useState:ln,useDebugValue:ln,useDeferredValue:ln,useTransition:ln,useMutableSource:ln,useSyncExternalStore:ln,useId:ln,unstable_isNewReconciler:!1},$0={readContext:Wn,useCallback:function(t,i){return vi().memoizedState=[t,i===void 0?null:i],t},useContext:Wn,useEffect:Ch,useImperativeHandle:function(t,i,o){return o=o!=null?o.concat([t]):null,ba(4194308,4,Ph.bind(null,i,t),o)},useLayoutEffect:function(t,i){return ba(4194308,4,t,i)},useInsertionEffect:function(t,i){return ba(4,2,t,i)},useMemo:function(t,i){var o=vi();return i=i===void 0?null:i,t=t(),o.memoizedState=[t,i],t},useReducer:function(t,i,o){var c=vi();return i=o!==void 0?o(i):i,c.memoizedState=c.baseState=i,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:i},c.queue=t,t=t.dispatch=j0.bind(null,zt,t),[c.memoizedState,t]},useRef:function(t){var i=vi();return t={current:t},i.memoizedState=t},useState:Th,useDebugValue:Bc,useDeferredValue:function(t){return vi().memoizedState=t},useTransition:function(){var t=Th(!1),i=t[0];return t=W0.bind(null,t[1]),vi().memoizedState=t,[i,t]},useMutableSource:function(){},useSyncExternalStore:function(t,i,o){var c=zt,d=vi();if(Ot){if(o===void 0)throw Error(n(407));o=o()}else{if(o=i(),Jt===null)throw Error(n(349));(Nr&30)!==0||yh(c,i,o)}d.memoizedState=o;var p={value:o,getSnapshot:i};return d.queue=p,Ch(Mh.bind(null,c,p,t),[t]),c.flags|=2048,Eo(9,Sh.bind(null,c,p,o,i),void 0,null),o},useId:function(){var t=vi(),i=Jt.identifierPrefix;if(Ot){var o=bi,c=Ci;o=(c&~(1<<32-dt(c)-1)).toString(32)+o,i=":"+i+"R"+o,o=So++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=G0++,i=":"+i+"r"+o.toString(32)+":";return t.memoizedState=i},unstable_isNewReconciler:!1},q0={readContext:Wn,useCallback:Nh,useContext:Wn,useEffect:zc,useImperativeHandle:Lh,useInsertionEffect:bh,useLayoutEffect:Rh,useMemo:Dh,useReducer:Oc,useRef:Ah,useState:function(){return Oc(Mo)},useDebugValue:Bc,useDeferredValue:function(t){var i=jn();return Ih(i,qt.memoizedState,t)},useTransition:function(){var t=Oc(Mo)[0],i=jn().memoizedState;return[t,i]},useMutableSource:_h,useSyncExternalStore:xh,useId:Uh,unstable_isNewReconciler:!1},Y0={readContext:Wn,useCallback:Nh,useContext:Wn,useEffect:zc,useImperativeHandle:Lh,useInsertionEffect:bh,useLayoutEffect:Rh,useMemo:Dh,useReducer:kc,useRef:Ah,useState:function(){return kc(Mo)},useDebugValue:Bc,useDeferredValue:function(t){var i=jn();return qt===null?i.memoizedState=t:Ih(i,qt.memoizedState,t)},useTransition:function(){var t=kc(Mo)[0],i=jn().memoizedState;return[t,i]},useMutableSource:_h,useSyncExternalStore:xh,useId:Uh,unstable_isNewReconciler:!1};function ni(t,i){if(t&&t.defaultProps){i=D({},i),t=t.defaultProps;for(var o in t)i[o]===void 0&&(i[o]=t[o]);return i}return i}function Vc(t,i,o,c){i=t.memoizedState,o=o(c,i),o=o==null?i:D({},i,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var La={isMounted:function(t){return(t=t._reactInternals)?hi(t)===t:!1},enqueueSetState:function(t,i,o){t=t._reactInternals;var c=vn(),d=cr(t),p=Pi(c,d);p.payload=i,o!=null&&(p.callback=o),i=sr(t,p,d),i!==null&&(si(i,t,d,c),Ea(i,t,d))},enqueueReplaceState:function(t,i,o){t=t._reactInternals;var c=vn(),d=cr(t),p=Pi(c,d);p.tag=1,p.payload=i,o!=null&&(p.callback=o),i=sr(t,p,d),i!==null&&(si(i,t,d,c),Ea(i,t,d))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var o=vn(),c=cr(t),d=Pi(o,c);d.tag=2,i!=null&&(d.callback=i),i=sr(t,d,c),i!==null&&(si(i,t,c,o),Ea(i,t,c))}};function zh(t,i,o,c,d,p,w){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(c,p,w):i.prototype&&i.prototype.isPureReactComponent?!lo(o,c)||!lo(d,p):!0}function Bh(t,i,o){var c=!1,d=nr,p=i.contextType;return typeof p=="object"&&p!==null?p=Wn(p):(d=En(i)?Cr:an.current,c=i.contextTypes,p=(c=c!=null)?fs(t,d):nr),i=new i(o,p),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=La,t.stateNode=i,i._reactInternals=t,c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=d,t.__reactInternalMemoizedMaskedChildContext=p),i}function Vh(t,i,o,c){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,c),i.state!==t&&La.enqueueReplaceState(i,i.state,null)}function Hc(t,i,o,c){var d=t.stateNode;d.props=o,d.state=t.memoizedState,d.refs={},bc(t);var p=i.contextType;typeof p=="object"&&p!==null?d.context=Wn(p):(p=En(i)?Cr:an.current,d.context=fs(t,p)),d.state=t.memoizedState,p=i.getDerivedStateFromProps,typeof p=="function"&&(Vc(t,i,p,o),d.state=t.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(i=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),i!==d.state&&La.enqueueReplaceState(d,d.state,null),wa(t,o,d,c),d.state=t.memoizedState),typeof d.componentDidMount=="function"&&(t.flags|=4194308)}function xs(t,i){try{var o="",c=i;do o+=Q(c),c=c.return;while(c);var d=o}catch(p){d=`
Error generating stack: `+p.message+`
`+p.stack}return{value:t,source:i,stack:d,digest:null}}function Gc(t,i,o){return{value:t,source:null,stack:o??null,digest:i??null}}function Wc(t,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var K0=typeof WeakMap=="function"?WeakMap:Map;function Hh(t,i,o){o=Pi(-1,o),o.tag=3,o.payload={element:null};var c=i.value;return o.callback=function(){ka||(ka=!0,su=c),Wc(t,i)},o}function Gh(t,i,o){o=Pi(-1,o),o.tag=3;var c=t.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;o.payload=function(){return c(d)},o.callback=function(){Wc(t,i)}}var p=t.stateNode;return p!==null&&typeof p.componentDidCatch=="function"&&(o.callback=function(){Wc(t,i),typeof c!="function"&&(ar===null?ar=new Set([this]):ar.add(this));var w=i.stack;this.componentDidCatch(i.value,{componentStack:w!==null?w:""})}),o}function Wh(t,i,o){var c=t.pingCache;if(c===null){c=t.pingCache=new K0;var d=new Set;c.set(i,d)}else d=c.get(i),d===void 0&&(d=new Set,c.set(i,d));d.has(o)||(d.add(o),t=uv.bind(null,t,i,o),i.then(t,t))}function jh(t){do{var i;if((i=t.tag===13)&&(i=t.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return t;t=t.return}while(t!==null);return null}function Xh(t,i,o,c,d){return(t.mode&1)===0?(t===i?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Pi(-1,1),i.tag=2,sr(o,i,1))),o.lanes|=1),t):(t.flags|=65536,t.lanes=d,t)}var Z0=C.ReactCurrentOwner,wn=!1;function gn(t,i,o,c){i.child=t===null?dh(i,null,o,c):ms(i,t.child,o,c)}function $h(t,i,o,c,d){o=o.render;var p=i.ref;return vs(i,d),c=Uc(t,i,o,c,p,d),o=Fc(),t!==null&&!wn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~d,Li(t,i,d)):(Ot&&o&&_c(i),i.flags|=1,gn(t,i,c,d),i.child)}function qh(t,i,o,c,d){if(t===null){var p=o.type;return typeof p=="function"&&!du(p)&&p.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=p,Yh(t,i,p,c,d)):(t=Wa(o.type,null,c,i,i.mode,d),t.ref=i.ref,t.return=i,i.child=t)}if(p=t.child,(t.lanes&d)===0){var w=p.memoizedProps;if(o=o.compare,o=o!==null?o:lo,o(w,c)&&t.ref===i.ref)return Li(t,i,d)}return i.flags|=1,t=fr(p,c),t.ref=i.ref,t.return=i,i.child=t}function Yh(t,i,o,c,d){if(t!==null){var p=t.memoizedProps;if(lo(p,c)&&t.ref===i.ref)if(wn=!1,i.pendingProps=c=p,(t.lanes&d)!==0)(t.flags&131072)!==0&&(wn=!0);else return i.lanes=t.lanes,Li(t,i,d)}return jc(t,i,o,c,d)}function Kh(t,i,o){var c=i.pendingProps,d=c.children,p=t!==null?t.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Dt(Ss,Un),Un|=o;else{if((o&1073741824)===0)return t=p!==null?p.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:t,cachePool:null,transitions:null},i.updateQueue=null,Dt(Ss,Un),Un|=t,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=p!==null?p.baseLanes:o,Dt(Ss,Un),Un|=c}else p!==null?(c=p.baseLanes|o,i.memoizedState=null):c=o,Dt(Ss,Un),Un|=c;return gn(t,i,d,o),i.child}function Zh(t,i){var o=i.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function jc(t,i,o,c,d){var p=En(o)?Cr:an.current;return p=fs(i,p),vs(i,d),o=Uc(t,i,o,c,p,d),c=Fc(),t!==null&&!wn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~d,Li(t,i,d)):(Ot&&c&&_c(i),i.flags|=1,gn(t,i,o,d),i.child)}function Qh(t,i,o,c,d){if(En(o)){var p=!0;ma(i)}else p=!1;if(vs(i,d),i.stateNode===null)Da(t,i),Bh(i,o,c),Hc(i,o,c,d),c=!0;else if(t===null){var w=i.stateNode,U=i.memoizedProps;w.props=U;var H=w.context,re=o.contextType;typeof re=="object"&&re!==null?re=Wn(re):(re=En(o)?Cr:an.current,re=fs(i,re));var Ee=o.getDerivedStateFromProps,Ae=typeof Ee=="function"||typeof w.getSnapshotBeforeUpdate=="function";Ae||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(U!==c||H!==re)&&Vh(i,w,c,re),rr=!1;var Me=i.memoizedState;w.state=Me,wa(i,c,w,d),H=i.memoizedState,U!==c||Me!==H||Mn.current||rr?(typeof Ee=="function"&&(Vc(i,o,Ee,c),H=i.memoizedState),(U=rr||zh(i,o,U,c,Me,H,re))?(Ae||typeof w.UNSAFE_componentWillMount!="function"&&typeof w.componentWillMount!="function"||(typeof w.componentWillMount=="function"&&w.componentWillMount(),typeof w.UNSAFE_componentWillMount=="function"&&w.UNSAFE_componentWillMount()),typeof w.componentDidMount=="function"&&(i.flags|=4194308)):(typeof w.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=H),w.props=c,w.state=H,w.context=re,c=U):(typeof w.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{w=i.stateNode,ph(t,i),U=i.memoizedProps,re=i.type===i.elementType?U:ni(i.type,U),w.props=re,Ae=i.pendingProps,Me=w.context,H=o.contextType,typeof H=="object"&&H!==null?H=Wn(H):(H=En(o)?Cr:an.current,H=fs(i,H));var ze=o.getDerivedStateFromProps;(Ee=typeof ze=="function"||typeof w.getSnapshotBeforeUpdate=="function")||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(U!==Ae||Me!==H)&&Vh(i,w,c,H),rr=!1,Me=i.memoizedState,w.state=Me,wa(i,c,w,d);var Xe=i.memoizedState;U!==Ae||Me!==Xe||Mn.current||rr?(typeof ze=="function"&&(Vc(i,o,ze,c),Xe=i.memoizedState),(re=rr||zh(i,o,re,c,Me,Xe,H)||!1)?(Ee||typeof w.UNSAFE_componentWillUpdate!="function"&&typeof w.componentWillUpdate!="function"||(typeof w.componentWillUpdate=="function"&&w.componentWillUpdate(c,Xe,H),typeof w.UNSAFE_componentWillUpdate=="function"&&w.UNSAFE_componentWillUpdate(c,Xe,H)),typeof w.componentDidUpdate=="function"&&(i.flags|=4),typeof w.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof w.componentDidUpdate!="function"||U===t.memoizedProps&&Me===t.memoizedState||(i.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||U===t.memoizedProps&&Me===t.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=Xe),w.props=c,w.state=Xe,w.context=H,c=re):(typeof w.componentDidUpdate!="function"||U===t.memoizedProps&&Me===t.memoizedState||(i.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||U===t.memoizedProps&&Me===t.memoizedState||(i.flags|=1024),c=!1)}return Xc(t,i,o,c,p,d)}function Xc(t,i,o,c,d,p){Zh(t,i);var w=(i.flags&128)!==0;if(!c&&!w)return d&&ih(i,o,!1),Li(t,i,p);c=i.stateNode,Z0.current=i;var U=w&&typeof o.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,t!==null&&w?(i.child=ms(i,t.child,null,p),i.child=ms(i,null,U,p)):gn(t,i,U,p),i.memoizedState=c.state,d&&ih(i,o,!0),i.child}function Jh(t){var i=t.stateNode;i.pendingContext?th(t,i.pendingContext,i.pendingContext!==i.context):i.context&&th(t,i.context,!1),Rc(t,i.containerInfo)}function ep(t,i,o,c,d){return ps(),Mc(d),i.flags|=256,gn(t,i,o,c),i.child}var $c={dehydrated:null,treeContext:null,retryLane:0};function qc(t){return{baseLanes:t,cachePool:null,transitions:null}}function tp(t,i,o){var c=i.pendingProps,d=kt.current,p=!1,w=(i.flags&128)!==0,U;if((U=w)||(U=t!==null&&t.memoizedState===null?!1:(d&2)!==0),U?(p=!0,i.flags&=-129):(t===null||t.memoizedState!==null)&&(d|=1),Dt(kt,d&1),t===null)return Sc(i),t=i.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((i.mode&1)===0?i.lanes=1:t.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(w=c.children,t=c.fallback,p?(c=i.mode,p=i.child,w={mode:"hidden",children:w},(c&1)===0&&p!==null?(p.childLanes=0,p.pendingProps=w):p=ja(w,c,0,null),t=Or(t,c,o,null),p.return=i,t.return=i,p.sibling=t,i.child=p,i.child.memoizedState=qc(o),i.memoizedState=$c,t):Yc(i,w));if(d=t.memoizedState,d!==null&&(U=d.dehydrated,U!==null))return Q0(t,i,w,c,U,d,o);if(p){p=c.fallback,w=i.mode,d=t.child,U=d.sibling;var H={mode:"hidden",children:c.children};return(w&1)===0&&i.child!==d?(c=i.child,c.childLanes=0,c.pendingProps=H,i.deletions=null):(c=fr(d,H),c.subtreeFlags=d.subtreeFlags&14680064),U!==null?p=fr(U,p):(p=Or(p,w,o,null),p.flags|=2),p.return=i,c.return=i,c.sibling=p,i.child=c,c=p,p=i.child,w=t.child.memoizedState,w=w===null?qc(o):{baseLanes:w.baseLanes|o,cachePool:null,transitions:w.transitions},p.memoizedState=w,p.childLanes=t.childLanes&~o,i.memoizedState=$c,c}return p=t.child,t=p.sibling,c=fr(p,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=o),c.return=i,c.sibling=null,t!==null&&(o=i.deletions,o===null?(i.deletions=[t],i.flags|=16):o.push(t)),i.child=c,i.memoizedState=null,c}function Yc(t,i){return i=ja({mode:"visible",children:i},t.mode,0,null),i.return=t,t.child=i}function Na(t,i,o,c){return c!==null&&Mc(c),ms(i,t.child,null,o),t=Yc(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function Q0(t,i,o,c,d,p,w){if(o)return i.flags&256?(i.flags&=-257,c=Gc(Error(n(422))),Na(t,i,w,c)):i.memoizedState!==null?(i.child=t.child,i.flags|=128,null):(p=c.fallback,d=i.mode,c=ja({mode:"visible",children:c.children},d,0,null),p=Or(p,d,w,null),p.flags|=2,c.return=i,p.return=i,c.sibling=p,i.child=c,(i.mode&1)!==0&&ms(i,t.child,null,w),i.child.memoizedState=qc(w),i.memoizedState=$c,p);if((i.mode&1)===0)return Na(t,i,w,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var U=c.dgst;return c=U,p=Error(n(419)),c=Gc(p,c,void 0),Na(t,i,w,c)}if(U=(w&t.childLanes)!==0,wn||U){if(c=Jt,c!==null){switch(w&-w){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|w))!==0?0:d,d!==0&&d!==p.retryLane&&(p.retryLane=d,Ri(t,d),si(c,t,d,-1))}return fu(),c=Gc(Error(n(421))),Na(t,i,w,c)}return d.data==="$?"?(i.flags|=128,i.child=t.child,i=fv.bind(null,t),d._reactRetry=i,null):(t=p.treeContext,In=er(d.nextSibling),Dn=i,Ot=!0,ti=null,t!==null&&(Hn[Gn++]=Ci,Hn[Gn++]=bi,Hn[Gn++]=br,Ci=t.id,bi=t.overflow,br=i),i=Yc(i,c.children),i.flags|=4096,i)}function np(t,i,o){t.lanes|=i;var c=t.alternate;c!==null&&(c.lanes|=i),Ac(t.return,i,o)}function Kc(t,i,o,c,d){var p=t.memoizedState;p===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:o,tailMode:d}:(p.isBackwards=i,p.rendering=null,p.renderingStartTime=0,p.last=c,p.tail=o,p.tailMode=d)}function ip(t,i,o){var c=i.pendingProps,d=c.revealOrder,p=c.tail;if(gn(t,i,c.children,o),c=kt.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&np(t,o,i);else if(t.tag===19)np(t,o,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}c&=1}if(Dt(kt,c),(i.mode&1)===0)i.memoizedState=null;else switch(d){case"forwards":for(o=i.child,d=null;o!==null;)t=o.alternate,t!==null&&Ta(t)===null&&(d=o),o=o.sibling;o=d,o===null?(d=i.child,i.child=null):(d=o.sibling,o.sibling=null),Kc(i,!1,d,o,p);break;case"backwards":for(o=null,d=i.child,i.child=null;d!==null;){if(t=d.alternate,t!==null&&Ta(t)===null){i.child=d;break}t=d.sibling,d.sibling=o,o=d,d=t}Kc(i,!0,o,null,p);break;case"together":Kc(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Da(t,i){(i.mode&1)===0&&t!==null&&(t.alternate=null,i.alternate=null,i.flags|=2)}function Li(t,i,o){if(t!==null&&(i.dependencies=t.dependencies),Dr|=i.lanes,(o&i.childLanes)===0)return null;if(t!==null&&i.child!==t.child)throw Error(n(153));if(i.child!==null){for(t=i.child,o=fr(t,t.pendingProps),i.child=o,o.return=i;t.sibling!==null;)t=t.sibling,o=o.sibling=fr(t,t.pendingProps),o.return=i;o.sibling=null}return i.child}function J0(t,i,o){switch(i.tag){case 3:Jh(i),ps();break;case 5:vh(i);break;case 1:En(i.type)&&ma(i);break;case 4:Rc(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,d=i.memoizedProps.value;Dt(Sa,c._currentValue),c._currentValue=d;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(Dt(kt,kt.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?tp(t,i,o):(Dt(kt,kt.current&1),t=Li(t,i,o),t!==null?t.sibling:null);Dt(kt,kt.current&1);break;case 19:if(c=(o&i.childLanes)!==0,(t.flags&128)!==0){if(c)return ip(t,i,o);i.flags|=128}if(d=i.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),Dt(kt,kt.current),c)break;return null;case 22:case 23:return i.lanes=0,Kh(t,i,o)}return Li(t,i,o)}var rp,Zc,sp,op;rp=function(t,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},Zc=function(){},sp=function(t,i,o,c){var d=t.memoizedProps;if(d!==c){t=i.stateNode,Lr(gi.current);var p=null;switch(o){case"input":d=B(t,d),c=B(t,c),p=[];break;case"select":d=D({},d,{value:void 0}),c=D({},c,{value:void 0}),p=[];break;case"textarea":d=T(t,d),c=T(t,c),p=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(t.onclick=da)}mt(o,c);var w;o=null;for(re in d)if(!c.hasOwnProperty(re)&&d.hasOwnProperty(re)&&d[re]!=null)if(re==="style"){var U=d[re];for(w in U)U.hasOwnProperty(w)&&(o||(o={}),o[w]="")}else re!=="dangerouslySetInnerHTML"&&re!=="children"&&re!=="suppressContentEditableWarning"&&re!=="suppressHydrationWarning"&&re!=="autoFocus"&&(a.hasOwnProperty(re)?p||(p=[]):(p=p||[]).push(re,null));for(re in c){var H=c[re];if(U=d!=null?d[re]:void 0,c.hasOwnProperty(re)&&H!==U&&(H!=null||U!=null))if(re==="style")if(U){for(w in U)!U.hasOwnProperty(w)||H&&H.hasOwnProperty(w)||(o||(o={}),o[w]="");for(w in H)H.hasOwnProperty(w)&&U[w]!==H[w]&&(o||(o={}),o[w]=H[w])}else o||(p||(p=[]),p.push(re,o)),o=H;else re==="dangerouslySetInnerHTML"?(H=H?H.__html:void 0,U=U?U.__html:void 0,H!=null&&U!==H&&(p=p||[]).push(re,H)):re==="children"?typeof H!="string"&&typeof H!="number"||(p=p||[]).push(re,""+H):re!=="suppressContentEditableWarning"&&re!=="suppressHydrationWarning"&&(a.hasOwnProperty(re)?(H!=null&&re==="onScroll"&&Ut("scroll",t),p||U===H||(p=[])):(p=p||[]).push(re,H))}o&&(p=p||[]).push("style",o);var re=p;(i.updateQueue=re)&&(i.flags|=4)}},op=function(t,i,o,c){o!==c&&(i.flags|=4)};function wo(t,i){if(!Ot)switch(t.tailMode){case"hidden":i=t.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var c=null;o!==null;)o.alternate!==null&&(c=o),o=o.sibling;c===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:c.sibling=null}}function cn(t){var i=t.alternate!==null&&t.alternate.child===t.child,o=0,c=0;if(i)for(var d=t.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=t,d=d.sibling;else for(d=t.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=t,d=d.sibling;return t.subtreeFlags|=c,t.childLanes=o,i}function ev(t,i,o){var c=i.pendingProps;switch(xc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return cn(i),null;case 1:return En(i.type)&&pa(),cn(i),null;case 3:return c=i.stateNode,_s(),Ft(Mn),Ft(an),Nc(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(t===null||t.child===null)&&(xa(i)?i.flags|=4:t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ti!==null&&(lu(ti),ti=null))),Zc(t,i),cn(i),null;case 5:Pc(i);var d=Lr(xo.current);if(o=i.type,t!==null&&i.stateNode!=null)sp(t,i,o,c,d),t.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(n(166));return cn(i),null}if(t=Lr(gi.current),xa(i)){c=i.stateNode,o=i.type;var p=i.memoizedProps;switch(c[mi]=i,c[po]=p,t=(i.mode&1)!==0,o){case"dialog":Ut("cancel",c),Ut("close",c);break;case"iframe":case"object":case"embed":Ut("load",c);break;case"video":case"audio":for(d=0;d<uo.length;d++)Ut(uo[d],c);break;case"source":Ut("error",c);break;case"img":case"image":case"link":Ut("error",c),Ut("load",c);break;case"details":Ut("toggle",c);break;case"input":Et(c,p),Ut("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!p.multiple},Ut("invalid",c);break;case"textarea":ee(c,p),Ut("invalid",c)}mt(o,p),d=null;for(var w in p)if(p.hasOwnProperty(w)){var U=p[w];w==="children"?typeof U=="string"?c.textContent!==U&&(p.suppressHydrationWarning!==!0&&fa(c.textContent,U,t),d=["children",U]):typeof U=="number"&&c.textContent!==""+U&&(p.suppressHydrationWarning!==!0&&fa(c.textContent,U,t),d=["children",""+U]):a.hasOwnProperty(w)&&U!=null&&w==="onScroll"&&Ut("scroll",c)}switch(o){case"input":$e(c),be(c,p,!0);break;case"textarea":$e(c),ye(c);break;case"select":case"option":break;default:typeof p.onClick=="function"&&(c.onclick=da)}c=d,i.updateQueue=c,c!==null&&(i.flags|=4)}else{w=d.nodeType===9?d:d.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=ge(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=w.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof c.is=="string"?t=w.createElement(o,{is:c.is}):(t=w.createElement(o),o==="select"&&(w=t,c.multiple?w.multiple=!0:c.size&&(w.size=c.size))):t=w.createElementNS(t,o),t[mi]=i,t[po]=c,rp(t,i,!1,!1),i.stateNode=t;e:{switch(w=ct(o,c),o){case"dialog":Ut("cancel",t),Ut("close",t),d=c;break;case"iframe":case"object":case"embed":Ut("load",t),d=c;break;case"video":case"audio":for(d=0;d<uo.length;d++)Ut(uo[d],t);d=c;break;case"source":Ut("error",t),d=c;break;case"img":case"image":case"link":Ut("error",t),Ut("load",t),d=c;break;case"details":Ut("toggle",t),d=c;break;case"input":Et(t,c),d=B(t,c),Ut("invalid",t);break;case"option":d=c;break;case"select":t._wrapperState={wasMultiple:!!c.multiple},d=D({},c,{value:void 0}),Ut("invalid",t);break;case"textarea":ee(t,c),d=T(t,c),Ut("invalid",t);break;default:d=c}mt(o,d),U=d;for(p in U)if(U.hasOwnProperty(p)){var H=U[p];p==="style"?rt(t,H):p==="dangerouslySetInnerHTML"?(H=H?H.__html:void 0,H!=null&&De(t,H)):p==="children"?typeof H=="string"?(o!=="textarea"||H!=="")&&ft(t,H):typeof H=="number"&&ft(t,""+H):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(a.hasOwnProperty(p)?H!=null&&p==="onScroll"&&Ut("scroll",t):H!=null&&N(t,p,H,w))}switch(o){case"input":$e(t),be(t,c,!1);break;case"textarea":$e(t),ye(t);break;case"option":c.value!=null&&t.setAttribute("value",""+me(c.value));break;case"select":t.multiple=!!c.multiple,p=c.value,p!=null?I(t,!!c.multiple,p,!1):c.defaultValue!=null&&I(t,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(t.onclick=da)}switch(o){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return cn(i),null;case 6:if(t&&i.stateNode!=null)op(t,i,t.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(n(166));if(o=Lr(xo.current),Lr(gi.current),xa(i)){if(c=i.stateNode,o=i.memoizedProps,c[mi]=i,(p=c.nodeValue!==o)&&(t=Dn,t!==null))switch(t.tag){case 3:fa(c.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&fa(c.nodeValue,o,(t.mode&1)!==0)}p&&(i.flags|=4)}else c=(o.nodeType===9?o:o.ownerDocument).createTextNode(c),c[mi]=i,i.stateNode=c}return cn(i),null;case 13:if(Ft(kt),c=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ot&&In!==null&&(i.mode&1)!==0&&(i.flags&128)===0)ch(),ps(),i.flags|=98560,p=!1;else if(p=xa(i),c!==null&&c.dehydrated!==null){if(t===null){if(!p)throw Error(n(318));if(p=i.memoizedState,p=p!==null?p.dehydrated:null,!p)throw Error(n(317));p[mi]=i}else ps(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;cn(i),p=!1}else ti!==null&&(lu(ti),ti=null),p=!0;if(!p)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(c=c!==null,c!==(t!==null&&t.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(t===null||(kt.current&1)!==0?Yt===0&&(Yt=3):fu())),i.updateQueue!==null&&(i.flags|=4),cn(i),null);case 4:return _s(),Zc(t,i),t===null&&fo(i.stateNode.containerInfo),cn(i),null;case 10:return Tc(i.type._context),cn(i),null;case 17:return En(i.type)&&pa(),cn(i),null;case 19:if(Ft(kt),p=i.memoizedState,p===null)return cn(i),null;if(c=(i.flags&128)!==0,w=p.rendering,w===null)if(c)wo(p,!1);else{if(Yt!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(w=Ta(t),w!==null){for(i.flags|=128,wo(p,!1),c=w.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=o,o=i.child;o!==null;)p=o,t=c,p.flags&=14680066,w=p.alternate,w===null?(p.childLanes=0,p.lanes=t,p.child=null,p.subtreeFlags=0,p.memoizedProps=null,p.memoizedState=null,p.updateQueue=null,p.dependencies=null,p.stateNode=null):(p.childLanes=w.childLanes,p.lanes=w.lanes,p.child=w.child,p.subtreeFlags=0,p.deletions=null,p.memoizedProps=w.memoizedProps,p.memoizedState=w.memoizedState,p.updateQueue=w.updateQueue,p.type=w.type,t=w.dependencies,p.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return Dt(kt,kt.current&1|2),i.child}t=t.sibling}p.tail!==null&&Ce()>Ms&&(i.flags|=128,c=!0,wo(p,!1),i.lanes=4194304)}else{if(!c)if(t=Ta(w),t!==null){if(i.flags|=128,c=!0,o=t.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),wo(p,!0),p.tail===null&&p.tailMode==="hidden"&&!w.alternate&&!Ot)return cn(i),null}else 2*Ce()-p.renderingStartTime>Ms&&o!==1073741824&&(i.flags|=128,c=!0,wo(p,!1),i.lanes=4194304);p.isBackwards?(w.sibling=i.child,i.child=w):(o=p.last,o!==null?o.sibling=w:i.child=w,p.last=w)}return p.tail!==null?(i=p.tail,p.rendering=i,p.tail=i.sibling,p.renderingStartTime=Ce(),i.sibling=null,o=kt.current,Dt(kt,c?o&1|2:o&1),i):(cn(i),null);case 22:case 23:return uu(),c=i.memoizedState!==null,t!==null&&t.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(Un&1073741824)!==0&&(cn(i),i.subtreeFlags&6&&(i.flags|=8192)):cn(i),null;case 24:return null;case 25:return null}throw Error(n(156,i.tag))}function tv(t,i){switch(xc(i),i.tag){case 1:return En(i.type)&&pa(),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return _s(),Ft(Mn),Ft(an),Nc(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 5:return Pc(i),null;case 13:if(Ft(kt),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(n(340));ps()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return Ft(kt),null;case 4:return _s(),null;case 10:return Tc(i.type._context),null;case 22:case 23:return uu(),null;case 24:return null;default:return null}}var Ia=!1,un=!1,nv=typeof WeakSet=="function"?WeakSet:Set,Ge=null;function ys(t,i){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(c){Vt(t,i,c)}else o.current=null}function Qc(t,i,o){try{o()}catch(c){Vt(t,i,c)}}var ap=!1;function iv(t,i){if(uc=ea,t=zd(),nc(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var c=o.getSelection&&o.getSelection();if(c&&c.rangeCount!==0){o=c.anchorNode;var d=c.anchorOffset,p=c.focusNode;c=c.focusOffset;try{o.nodeType,p.nodeType}catch{o=null;break e}var w=0,U=-1,H=-1,re=0,Ee=0,Ae=t,Me=null;t:for(;;){for(var ze;Ae!==o||d!==0&&Ae.nodeType!==3||(U=w+d),Ae!==p||c!==0&&Ae.nodeType!==3||(H=w+c),Ae.nodeType===3&&(w+=Ae.nodeValue.length),(ze=Ae.firstChild)!==null;)Me=Ae,Ae=ze;for(;;){if(Ae===t)break t;if(Me===o&&++re===d&&(U=w),Me===p&&++Ee===c&&(H=w),(ze=Ae.nextSibling)!==null)break;Ae=Me,Me=Ae.parentNode}Ae=ze}o=U===-1||H===-1?null:{start:U,end:H}}else o=null}o=o||{start:0,end:0}}else o=null;for(fc={focusedElem:t,selectionRange:o},ea=!1,Ge=i;Ge!==null;)if(i=Ge,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,Ge=t;else for(;Ge!==null;){i=Ge;try{var Xe=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Xe!==null){var Ye=Xe.memoizedProps,Ht=Xe.memoizedState,Z=i.stateNode,X=Z.getSnapshotBeforeUpdate(i.elementType===i.type?Ye:ni(i.type,Ye),Ht);Z.__reactInternalSnapshotBeforeUpdate=X}break;case 3:var te=i.stateNode.containerInfo;te.nodeType===1?te.textContent="":te.nodeType===9&&te.documentElement&&te.removeChild(te.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(Re){Vt(i,i.return,Re)}if(t=i.sibling,t!==null){t.return=i.return,Ge=t;break}Ge=i.return}return Xe=ap,ap=!1,Xe}function To(t,i,o){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&t)===t){var p=d.destroy;d.destroy=void 0,p!==void 0&&Qc(i,o,p)}d=d.next}while(d!==c)}}function Ua(t,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&t)===t){var c=o.create;o.destroy=c()}o=o.next}while(o!==i)}}function Jc(t){var i=t.ref;if(i!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof i=="function"?i(t):i.current=t}}function lp(t){var i=t.alternate;i!==null&&(t.alternate=null,lp(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&(delete i[mi],delete i[po],delete i[mc],delete i[z0],delete i[B0])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function cp(t){return t.tag===5||t.tag===3||t.tag===4}function up(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||cp(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function eu(t,i,o){var c=t.tag;if(c===5||c===6)t=t.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(t,i):o.insertBefore(t,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(t,o)):(i=o,i.appendChild(t)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=da));else if(c!==4&&(t=t.child,t!==null))for(eu(t,i,o),t=t.sibling;t!==null;)eu(t,i,o),t=t.sibling}function tu(t,i,o){var c=t.tag;if(c===5||c===6)t=t.stateNode,i?o.insertBefore(t,i):o.appendChild(t);else if(c!==4&&(t=t.child,t!==null))for(tu(t,i,o),t=t.sibling;t!==null;)tu(t,i,o),t=t.sibling}var nn=null,ii=!1;function or(t,i,o){for(o=o.child;o!==null;)fp(t,i,o),o=o.sibling}function fp(t,i,o){if(_t&&typeof _t.onCommitFiberUnmount=="function")try{_t.onCommitFiberUnmount(Ct,o)}catch{}switch(o.tag){case 5:un||ys(o,i);case 6:var c=nn,d=ii;nn=null,or(t,i,o),nn=c,ii=d,nn!==null&&(ii?(t=nn,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):nn.removeChild(o.stateNode));break;case 18:nn!==null&&(ii?(t=nn,o=o.stateNode,t.nodeType===8?pc(t.parentNode,o):t.nodeType===1&&pc(t,o),no(t)):pc(nn,o.stateNode));break;case 4:c=nn,d=ii,nn=o.stateNode.containerInfo,ii=!0,or(t,i,o),nn=c,ii=d;break;case 0:case 11:case 14:case 15:if(!un&&(c=o.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var p=d,w=p.destroy;p=p.tag,w!==void 0&&((p&2)!==0||(p&4)!==0)&&Qc(o,i,w),d=d.next}while(d!==c)}or(t,i,o);break;case 1:if(!un&&(ys(o,i),c=o.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=o.memoizedProps,c.state=o.memoizedState,c.componentWillUnmount()}catch(U){Vt(o,i,U)}or(t,i,o);break;case 21:or(t,i,o);break;case 22:o.mode&1?(un=(c=un)||o.memoizedState!==null,or(t,i,o),un=c):or(t,i,o);break;default:or(t,i,o)}}function dp(t){var i=t.updateQueue;if(i!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new nv),i.forEach(function(c){var d=dv.bind(null,t,c);o.has(c)||(o.add(c),c.then(d,d))})}}function ri(t,i){var o=i.deletions;if(o!==null)for(var c=0;c<o.length;c++){var d=o[c];try{var p=t,w=i,U=w;e:for(;U!==null;){switch(U.tag){case 5:nn=U.stateNode,ii=!1;break e;case 3:nn=U.stateNode.containerInfo,ii=!0;break e;case 4:nn=U.stateNode.containerInfo,ii=!0;break e}U=U.return}if(nn===null)throw Error(n(160));fp(p,w,d),nn=null,ii=!1;var H=d.alternate;H!==null&&(H.return=null),d.return=null}catch(re){Vt(d,i,re)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)hp(i,t),i=i.sibling}function hp(t,i){var o=t.alternate,c=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(ri(i,t),_i(t),c&4){try{To(3,t,t.return),Ua(3,t)}catch(Ye){Vt(t,t.return,Ye)}try{To(5,t,t.return)}catch(Ye){Vt(t,t.return,Ye)}}break;case 1:ri(i,t),_i(t),c&512&&o!==null&&ys(o,o.return);break;case 5:if(ri(i,t),_i(t),c&512&&o!==null&&ys(o,o.return),t.flags&32){var d=t.stateNode;try{ft(d,"")}catch(Ye){Vt(t,t.return,Ye)}}if(c&4&&(d=t.stateNode,d!=null)){var p=t.memoizedProps,w=o!==null?o.memoizedProps:p,U=t.type,H=t.updateQueue;if(t.updateQueue=null,H!==null)try{U==="input"&&p.type==="radio"&&p.name!=null&&Be(d,p),ct(U,w);var re=ct(U,p);for(w=0;w<H.length;w+=2){var Ee=H[w],Ae=H[w+1];Ee==="style"?rt(d,Ae):Ee==="dangerouslySetInnerHTML"?De(d,Ae):Ee==="children"?ft(d,Ae):N(d,Ee,Ae,re)}switch(U){case"input":we(d,p);break;case"textarea":_e(d,p);break;case"select":var Me=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!p.multiple;var ze=p.value;ze!=null?I(d,!!p.multiple,ze,!1):Me!==!!p.multiple&&(p.defaultValue!=null?I(d,!!p.multiple,p.defaultValue,!0):I(d,!!p.multiple,p.multiple?[]:"",!1))}d[po]=p}catch(Ye){Vt(t,t.return,Ye)}}break;case 6:if(ri(i,t),_i(t),c&4){if(t.stateNode===null)throw Error(n(162));d=t.stateNode,p=t.memoizedProps;try{d.nodeValue=p}catch(Ye){Vt(t,t.return,Ye)}}break;case 3:if(ri(i,t),_i(t),c&4&&o!==null&&o.memoizedState.isDehydrated)try{no(i.containerInfo)}catch(Ye){Vt(t,t.return,Ye)}break;case 4:ri(i,t),_i(t);break;case 13:ri(i,t),_i(t),d=t.child,d.flags&8192&&(p=d.memoizedState!==null,d.stateNode.isHidden=p,!p||d.alternate!==null&&d.alternate.memoizedState!==null||(ru=Ce())),c&4&&dp(t);break;case 22:if(Ee=o!==null&&o.memoizedState!==null,t.mode&1?(un=(re=un)||Ee,ri(i,t),un=re):ri(i,t),_i(t),c&8192){if(re=t.memoizedState!==null,(t.stateNode.isHidden=re)&&!Ee&&(t.mode&1)!==0)for(Ge=t,Ee=t.child;Ee!==null;){for(Ae=Ge=Ee;Ge!==null;){switch(Me=Ge,ze=Me.child,Me.tag){case 0:case 11:case 14:case 15:To(4,Me,Me.return);break;case 1:ys(Me,Me.return);var Xe=Me.stateNode;if(typeof Xe.componentWillUnmount=="function"){c=Me,o=Me.return;try{i=c,Xe.props=i.memoizedProps,Xe.state=i.memoizedState,Xe.componentWillUnmount()}catch(Ye){Vt(c,o,Ye)}}break;case 5:ys(Me,Me.return);break;case 22:if(Me.memoizedState!==null){gp(Ae);continue}}ze!==null?(ze.return=Me,Ge=ze):gp(Ae)}Ee=Ee.sibling}e:for(Ee=null,Ae=t;;){if(Ae.tag===5){if(Ee===null){Ee=Ae;try{d=Ae.stateNode,re?(p=d.style,typeof p.setProperty=="function"?p.setProperty("display","none","important"):p.display="none"):(U=Ae.stateNode,H=Ae.memoizedProps.style,w=H!=null&&H.hasOwnProperty("display")?H.display:null,U.style.display=et("display",w))}catch(Ye){Vt(t,t.return,Ye)}}}else if(Ae.tag===6){if(Ee===null)try{Ae.stateNode.nodeValue=re?"":Ae.memoizedProps}catch(Ye){Vt(t,t.return,Ye)}}else if((Ae.tag!==22&&Ae.tag!==23||Ae.memoizedState===null||Ae===t)&&Ae.child!==null){Ae.child.return=Ae,Ae=Ae.child;continue}if(Ae===t)break e;for(;Ae.sibling===null;){if(Ae.return===null||Ae.return===t)break e;Ee===Ae&&(Ee=null),Ae=Ae.return}Ee===Ae&&(Ee=null),Ae.sibling.return=Ae.return,Ae=Ae.sibling}}break;case 19:ri(i,t),_i(t),c&4&&dp(t);break;case 21:break;default:ri(i,t),_i(t)}}function _i(t){var i=t.flags;if(i&2){try{e:{for(var o=t.return;o!==null;){if(cp(o)){var c=o;break e}o=o.return}throw Error(n(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(ft(d,""),c.flags&=-33);var p=up(t);tu(t,p,d);break;case 3:case 4:var w=c.stateNode.containerInfo,U=up(t);eu(t,U,w);break;default:throw Error(n(161))}}catch(H){Vt(t,t.return,H)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function rv(t,i,o){Ge=t,pp(t)}function pp(t,i,o){for(var c=(t.mode&1)!==0;Ge!==null;){var d=Ge,p=d.child;if(d.tag===22&&c){var w=d.memoizedState!==null||Ia;if(!w){var U=d.alternate,H=U!==null&&U.memoizedState!==null||un;U=Ia;var re=un;if(Ia=w,(un=H)&&!re)for(Ge=d;Ge!==null;)w=Ge,H=w.child,w.tag===22&&w.memoizedState!==null?vp(d):H!==null?(H.return=w,Ge=H):vp(d);for(;p!==null;)Ge=p,pp(p),p=p.sibling;Ge=d,Ia=U,un=re}mp(t)}else(d.subtreeFlags&8772)!==0&&p!==null?(p.return=d,Ge=p):mp(t)}}function mp(t){for(;Ge!==null;){var i=Ge;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:un||Ua(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!un)if(o===null)c.componentDidMount();else{var d=i.elementType===i.type?o.memoizedProps:ni(i.type,o.memoizedProps);c.componentDidUpdate(d,o.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var p=i.updateQueue;p!==null&&gh(i,p,c);break;case 3:var w=i.updateQueue;if(w!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}gh(i,w,o)}break;case 5:var U=i.stateNode;if(o===null&&i.flags&4){o=U;var H=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":H.autoFocus&&o.focus();break;case"img":H.src&&(o.src=H.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var re=i.alternate;if(re!==null){var Ee=re.memoizedState;if(Ee!==null){var Ae=Ee.dehydrated;Ae!==null&&no(Ae)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}un||i.flags&512&&Jc(i)}catch(Me){Vt(i,i.return,Me)}}if(i===t){Ge=null;break}if(o=i.sibling,o!==null){o.return=i.return,Ge=o;break}Ge=i.return}}function gp(t){for(;Ge!==null;){var i=Ge;if(i===t){Ge=null;break}var o=i.sibling;if(o!==null){o.return=i.return,Ge=o;break}Ge=i.return}}function vp(t){for(;Ge!==null;){var i=Ge;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{Ua(4,i)}catch(H){Vt(i,o,H)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var d=i.return;try{c.componentDidMount()}catch(H){Vt(i,d,H)}}var p=i.return;try{Jc(i)}catch(H){Vt(i,p,H)}break;case 5:var w=i.return;try{Jc(i)}catch(H){Vt(i,w,H)}}}catch(H){Vt(i,i.return,H)}if(i===t){Ge=null;break}var U=i.sibling;if(U!==null){U.return=i.return,Ge=U;break}Ge=i.return}}var sv=Math.ceil,Fa=C.ReactCurrentDispatcher,nu=C.ReactCurrentOwner,Xn=C.ReactCurrentBatchConfig,St=0,Jt=null,Wt=null,rn=0,Un=0,Ss=tr(0),Yt=0,Ao=null,Dr=0,Oa=0,iu=0,Co=null,Tn=null,ru=0,Ms=1/0,Ni=null,ka=!1,su=null,ar=null,za=!1,lr=null,Ba=0,bo=0,ou=null,Va=-1,Ha=0;function vn(){return(St&6)!==0?Ce():Va!==-1?Va:Va=Ce()}function cr(t){return(t.mode&1)===0?1:(St&2)!==0&&rn!==0?rn&-rn:H0.transition!==null?(Ha===0&&(Ha=mn()),Ha):(t=Pt,t!==0||(t=window.event,t=t===void 0?16:xd(t.type)),t)}function si(t,i,o,c){if(50<bo)throw bo=0,ou=null,Error(n(185));Sn(t,o,c),((St&2)===0||t!==Jt)&&(t===Jt&&((St&2)===0&&(Oa|=o),Yt===4&&ur(t,rn)),An(t,c),o===1&&St===0&&(i.mode&1)===0&&(Ms=Ce()+500,ga&&ir()))}function An(t,i){var o=t.callbackNode;Bn(t,i);var c=pi(t,t===Jt?rn:0);if(c===0)o!==null&&oe(o),t.callbackNode=null,t.callbackPriority=0;else if(i=c&-c,t.callbackPriority!==i){if(o!=null&&oe(o),i===1)t.tag===0?V0(xp.bind(null,t)):rh(xp.bind(null,t)),O0(function(){(St&6)===0&&ir()}),o=null;else{switch(fd(c)){case 1:o=qe;break;case 4:o=st;break;case 16:o=lt;break;case 536870912:o=xt;break;default:o=lt}o=Cp(o,_p.bind(null,t))}t.callbackPriority=i,t.callbackNode=o}}function _p(t,i){if(Va=-1,Ha=0,(St&6)!==0)throw Error(n(327));var o=t.callbackNode;if(Es()&&t.callbackNode!==o)return null;var c=pi(t,t===Jt?rn:0);if(c===0)return null;if((c&30)!==0||(c&t.expiredLanes)!==0||i)i=Ga(t,c);else{i=c;var d=St;St|=2;var p=Sp();(Jt!==t||rn!==i)&&(Ni=null,Ms=Ce()+500,Ur(t,i));do try{lv();break}catch(U){yp(t,U)}while(!0);wc(),Fa.current=p,St=d,Wt!==null?i=0:(Jt=null,rn=0,i=Yt)}if(i!==0){if(i===2&&(d=wi(t),d!==0&&(c=d,i=au(t,d))),i===1)throw o=Ao,Ur(t,0),ur(t,c),An(t,Ce()),o;if(i===6)ur(t,c);else{if(d=t.current.alternate,(c&30)===0&&!ov(d)&&(i=Ga(t,c),i===2&&(p=wi(t),p!==0&&(c=p,i=au(t,p))),i===1))throw o=Ao,Ur(t,0),ur(t,c),An(t,Ce()),o;switch(t.finishedWork=d,t.finishedLanes=c,i){case 0:case 1:throw Error(n(345));case 2:Fr(t,Tn,Ni);break;case 3:if(ur(t,c),(c&130023424)===c&&(i=ru+500-Ce(),10<i)){if(pi(t,0)!==0)break;if(d=t.suspendedLanes,(d&c)!==c){vn(),t.pingedLanes|=t.suspendedLanes&d;break}t.timeoutHandle=hc(Fr.bind(null,t,Tn,Ni),i);break}Fr(t,Tn,Ni);break;case 4:if(ur(t,c),(c&4194240)===c)break;for(i=t.eventTimes,d=-1;0<c;){var w=31-dt(c);p=1<<w,w=i[w],w>d&&(d=w),c&=~p}if(c=d,c=Ce()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*sv(c/1960))-c,10<c){t.timeoutHandle=hc(Fr.bind(null,t,Tn,Ni),c);break}Fr(t,Tn,Ni);break;case 5:Fr(t,Tn,Ni);break;default:throw Error(n(329))}}}return An(t,Ce()),t.callbackNode===o?_p.bind(null,t):null}function au(t,i){var o=Co;return t.current.memoizedState.isDehydrated&&(Ur(t,i).flags|=256),t=Ga(t,i),t!==2&&(i=Tn,Tn=o,i!==null&&lu(i)),t}function lu(t){Tn===null?Tn=t:Tn.push.apply(Tn,t)}function ov(t){for(var i=t;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var c=0;c<o.length;c++){var d=o[c],p=d.getSnapshot;d=d.value;try{if(!ei(p(),d))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function ur(t,i){for(i&=~iu,i&=~Oa,t.suspendedLanes|=i,t.pingedLanes&=~i,t=t.expirationTimes;0<i;){var o=31-dt(i),c=1<<o;t[o]=-1,i&=~c}}function xp(t){if((St&6)!==0)throw Error(n(327));Es();var i=pi(t,0);if((i&1)===0)return An(t,Ce()),null;var o=Ga(t,i);if(t.tag!==0&&o===2){var c=wi(t);c!==0&&(i=c,o=au(t,c))}if(o===1)throw o=Ao,Ur(t,0),ur(t,i),An(t,Ce()),o;if(o===6)throw Error(n(345));return t.finishedWork=t.current.alternate,t.finishedLanes=i,Fr(t,Tn,Ni),An(t,Ce()),null}function cu(t,i){var o=St;St|=1;try{return t(i)}finally{St=o,St===0&&(Ms=Ce()+500,ga&&ir())}}function Ir(t){lr!==null&&lr.tag===0&&(St&6)===0&&Es();var i=St;St|=1;var o=Xn.transition,c=Pt;try{if(Xn.transition=null,Pt=1,t)return t()}finally{Pt=c,Xn.transition=o,St=i,(St&6)===0&&ir()}}function uu(){Un=Ss.current,Ft(Ss)}function Ur(t,i){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,F0(o)),Wt!==null)for(o=Wt.return;o!==null;){var c=o;switch(xc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&pa();break;case 3:_s(),Ft(Mn),Ft(an),Nc();break;case 5:Pc(c);break;case 4:_s();break;case 13:Ft(kt);break;case 19:Ft(kt);break;case 10:Tc(c.type._context);break;case 22:case 23:uu()}o=o.return}if(Jt=t,Wt=t=fr(t.current,null),rn=Un=i,Yt=0,Ao=null,iu=Oa=Dr=0,Tn=Co=null,Pr!==null){for(i=0;i<Pr.length;i++)if(o=Pr[i],c=o.interleaved,c!==null){o.interleaved=null;var d=c.next,p=o.pending;if(p!==null){var w=p.next;p.next=d,c.next=w}o.pending=c}Pr=null}return t}function yp(t,i){do{var o=Wt;try{if(wc(),Aa.current=Pa,Ca){for(var c=zt.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}Ca=!1}if(Nr=0,Qt=qt=zt=null,yo=!1,So=0,nu.current=null,o===null||o.return===null){Yt=1,Ao=i,Wt=null;break}e:{var p=t,w=o.return,U=o,H=i;if(i=rn,U.flags|=32768,H!==null&&typeof H=="object"&&typeof H.then=="function"){var re=H,Ee=U,Ae=Ee.tag;if((Ee.mode&1)===0&&(Ae===0||Ae===11||Ae===15)){var Me=Ee.alternate;Me?(Ee.updateQueue=Me.updateQueue,Ee.memoizedState=Me.memoizedState,Ee.lanes=Me.lanes):(Ee.updateQueue=null,Ee.memoizedState=null)}var ze=jh(w);if(ze!==null){ze.flags&=-257,Xh(ze,w,U,p,i),ze.mode&1&&Wh(p,re,i),i=ze,H=re;var Xe=i.updateQueue;if(Xe===null){var Ye=new Set;Ye.add(H),i.updateQueue=Ye}else Xe.add(H);break e}else{if((i&1)===0){Wh(p,re,i),fu();break e}H=Error(n(426))}}else if(Ot&&U.mode&1){var Ht=jh(w);if(Ht!==null){(Ht.flags&65536)===0&&(Ht.flags|=256),Xh(Ht,w,U,p,i),Mc(xs(H,U));break e}}p=H=xs(H,U),Yt!==4&&(Yt=2),Co===null?Co=[p]:Co.push(p),p=w;do{switch(p.tag){case 3:p.flags|=65536,i&=-i,p.lanes|=i;var Z=Hh(p,H,i);mh(p,Z);break e;case 1:U=H;var X=p.type,te=p.stateNode;if((p.flags&128)===0&&(typeof X.getDerivedStateFromError=="function"||te!==null&&typeof te.componentDidCatch=="function"&&(ar===null||!ar.has(te)))){p.flags|=65536,i&=-i,p.lanes|=i;var Re=Gh(p,U,i);mh(p,Re);break e}}p=p.return}while(p!==null)}Ep(o)}catch(Qe){i=Qe,Wt===o&&o!==null&&(Wt=o=o.return);continue}break}while(!0)}function Sp(){var t=Fa.current;return Fa.current=Pa,t===null?Pa:t}function fu(){(Yt===0||Yt===3||Yt===2)&&(Yt=4),Jt===null||(Dr&268435455)===0&&(Oa&268435455)===0||ur(Jt,rn)}function Ga(t,i){var o=St;St|=2;var c=Sp();(Jt!==t||rn!==i)&&(Ni=null,Ur(t,i));do try{av();break}catch(d){yp(t,d)}while(!0);if(wc(),St=o,Fa.current=c,Wt!==null)throw Error(n(261));return Jt=null,rn=0,Yt}function av(){for(;Wt!==null;)Mp(Wt)}function lv(){for(;Wt!==null&&!Y();)Mp(Wt)}function Mp(t){var i=Ap(t.alternate,t,Un);t.memoizedProps=t.pendingProps,i===null?Ep(t):Wt=i,nu.current=null}function Ep(t){var i=t;do{var o=i.alternate;if(t=i.return,(i.flags&32768)===0){if(o=ev(o,i,Un),o!==null){Wt=o;return}}else{if(o=tv(o,i),o!==null){o.flags&=32767,Wt=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Yt=6,Wt=null;return}}if(i=i.sibling,i!==null){Wt=i;return}Wt=i=t}while(i!==null);Yt===0&&(Yt=5)}function Fr(t,i,o){var c=Pt,d=Xn.transition;try{Xn.transition=null,Pt=1,cv(t,i,o,c)}finally{Xn.transition=d,Pt=c}return null}function cv(t,i,o,c){do Es();while(lr!==null);if((St&6)!==0)throw Error(n(327));o=t.finishedWork;var d=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(n(177));t.callbackNode=null,t.callbackPriority=0;var p=o.lanes|o.childLanes;if(Zo(t,p),t===Jt&&(Wt=Jt=null,rn=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||za||(za=!0,Cp(lt,function(){return Es(),null})),p=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||p){p=Xn.transition,Xn.transition=null;var w=Pt;Pt=1;var U=St;St|=4,nu.current=null,iv(t,o),hp(o,t),R0(fc),ea=!!uc,fc=uc=null,t.current=o,rv(o),Pe(),St=U,Pt=w,Xn.transition=p}else t.current=o;if(za&&(za=!1,lr=t,Ba=d),p=t.pendingLanes,p===0&&(ar=null),sn(o.stateNode),An(t,Ce()),i!==null)for(c=t.onRecoverableError,o=0;o<i.length;o++)d=i[o],c(d.value,{componentStack:d.stack,digest:d.digest});if(ka)throw ka=!1,t=su,su=null,t;return(Ba&1)!==0&&t.tag!==0&&Es(),p=t.pendingLanes,(p&1)!==0?t===ou?bo++:(bo=0,ou=t):bo=0,ir(),null}function Es(){if(lr!==null){var t=fd(Ba),i=Xn.transition,o=Pt;try{if(Xn.transition=null,Pt=16>t?16:t,lr===null)var c=!1;else{if(t=lr,lr=null,Ba=0,(St&6)!==0)throw Error(n(331));var d=St;for(St|=4,Ge=t.current;Ge!==null;){var p=Ge,w=p.child;if((Ge.flags&16)!==0){var U=p.deletions;if(U!==null){for(var H=0;H<U.length;H++){var re=U[H];for(Ge=re;Ge!==null;){var Ee=Ge;switch(Ee.tag){case 0:case 11:case 15:To(8,Ee,p)}var Ae=Ee.child;if(Ae!==null)Ae.return=Ee,Ge=Ae;else for(;Ge!==null;){Ee=Ge;var Me=Ee.sibling,ze=Ee.return;if(lp(Ee),Ee===re){Ge=null;break}if(Me!==null){Me.return=ze,Ge=Me;break}Ge=ze}}}var Xe=p.alternate;if(Xe!==null){var Ye=Xe.child;if(Ye!==null){Xe.child=null;do{var Ht=Ye.sibling;Ye.sibling=null,Ye=Ht}while(Ye!==null)}}Ge=p}}if((p.subtreeFlags&2064)!==0&&w!==null)w.return=p,Ge=w;else e:for(;Ge!==null;){if(p=Ge,(p.flags&2048)!==0)switch(p.tag){case 0:case 11:case 15:To(9,p,p.return)}var Z=p.sibling;if(Z!==null){Z.return=p.return,Ge=Z;break e}Ge=p.return}}var X=t.current;for(Ge=X;Ge!==null;){w=Ge;var te=w.child;if((w.subtreeFlags&2064)!==0&&te!==null)te.return=w,Ge=te;else e:for(w=X;Ge!==null;){if(U=Ge,(U.flags&2048)!==0)try{switch(U.tag){case 0:case 11:case 15:Ua(9,U)}}catch(Qe){Vt(U,U.return,Qe)}if(U===w){Ge=null;break e}var Re=U.sibling;if(Re!==null){Re.return=U.return,Ge=Re;break e}Ge=U.return}}if(St=d,ir(),_t&&typeof _t.onPostCommitFiberRoot=="function")try{_t.onPostCommitFiberRoot(Ct,t)}catch{}c=!0}return c}finally{Pt=o,Xn.transition=i}}return!1}function wp(t,i,o){i=xs(o,i),i=Hh(t,i,1),t=sr(t,i,1),i=vn(),t!==null&&(Sn(t,1,i),An(t,i))}function Vt(t,i,o){if(t.tag===3)wp(t,t,o);else for(;i!==null;){if(i.tag===3){wp(i,t,o);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(ar===null||!ar.has(c))){t=xs(o,t),t=Gh(i,t,1),i=sr(i,t,1),t=vn(),i!==null&&(Sn(i,1,t),An(i,t));break}}i=i.return}}function uv(t,i,o){var c=t.pingCache;c!==null&&c.delete(i),i=vn(),t.pingedLanes|=t.suspendedLanes&o,Jt===t&&(rn&o)===o&&(Yt===4||Yt===3&&(rn&130023424)===rn&&500>Ce()-ru?Ur(t,0):iu|=o),An(t,i)}function Tp(t,i){i===0&&((t.mode&1)===0?i=1:(i=Jn,Jn<<=1,(Jn&130023424)===0&&(Jn=4194304)));var o=vn();t=Ri(t,i),t!==null&&(Sn(t,i,o),An(t,o))}function fv(t){var i=t.memoizedState,o=0;i!==null&&(o=i.retryLane),Tp(t,o)}function dv(t,i){var o=0;switch(t.tag){case 13:var c=t.stateNode,d=t.memoizedState;d!==null&&(o=d.retryLane);break;case 19:c=t.stateNode;break;default:throw Error(n(314))}c!==null&&c.delete(i),Tp(t,o)}var Ap;Ap=function(t,i,o){if(t!==null)if(t.memoizedProps!==i.pendingProps||Mn.current)wn=!0;else{if((t.lanes&o)===0&&(i.flags&128)===0)return wn=!1,J0(t,i,o);wn=(t.flags&131072)!==0}else wn=!1,Ot&&(i.flags&1048576)!==0&&sh(i,_a,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;Da(t,i),t=i.pendingProps;var d=fs(i,an.current);vs(i,o),d=Uc(null,i,c,t,d,o);var p=Fc();return i.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,En(c)?(p=!0,ma(i)):p=!1,i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,bc(i),d.updater=La,i.stateNode=d,d._reactInternals=i,Hc(i,c,t,o),i=Xc(null,i,c,!0,p,o)):(i.tag=0,Ot&&p&&_c(i),gn(null,i,d,o),i=i.child),i;case 16:c=i.elementType;e:{switch(Da(t,i),t=i.pendingProps,d=c._init,c=d(c._payload),i.type=c,d=i.tag=pv(c),t=ni(c,t),d){case 0:i=jc(null,i,c,t,o);break e;case 1:i=Qh(null,i,c,t,o);break e;case 11:i=$h(null,i,c,t,o);break e;case 14:i=qh(null,i,c,ni(c.type,t),o);break e}throw Error(n(306,c,""))}return i;case 0:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ni(c,d),jc(t,i,c,d,o);case 1:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ni(c,d),Qh(t,i,c,d,o);case 3:e:{if(Jh(i),t===null)throw Error(n(387));c=i.pendingProps,p=i.memoizedState,d=p.element,ph(t,i),wa(i,c,null,o);var w=i.memoizedState;if(c=w.element,p.isDehydrated)if(p={element:c,isDehydrated:!1,cache:w.cache,pendingSuspenseBoundaries:w.pendingSuspenseBoundaries,transitions:w.transitions},i.updateQueue.baseState=p,i.memoizedState=p,i.flags&256){d=xs(Error(n(423)),i),i=ep(t,i,c,o,d);break e}else if(c!==d){d=xs(Error(n(424)),i),i=ep(t,i,c,o,d);break e}else for(In=er(i.stateNode.containerInfo.firstChild),Dn=i,Ot=!0,ti=null,o=dh(i,null,c,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(ps(),c===d){i=Li(t,i,o);break e}gn(t,i,c,o)}i=i.child}return i;case 5:return vh(i),t===null&&Sc(i),c=i.type,d=i.pendingProps,p=t!==null?t.memoizedProps:null,w=d.children,dc(c,d)?w=null:p!==null&&dc(c,p)&&(i.flags|=32),Zh(t,i),gn(t,i,w,o),i.child;case 6:return t===null&&Sc(i),null;case 13:return tp(t,i,o);case 4:return Rc(i,i.stateNode.containerInfo),c=i.pendingProps,t===null?i.child=ms(i,null,c,o):gn(t,i,c,o),i.child;case 11:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ni(c,d),$h(t,i,c,d,o);case 7:return gn(t,i,i.pendingProps,o),i.child;case 8:return gn(t,i,i.pendingProps.children,o),i.child;case 12:return gn(t,i,i.pendingProps.children,o),i.child;case 10:e:{if(c=i.type._context,d=i.pendingProps,p=i.memoizedProps,w=d.value,Dt(Sa,c._currentValue),c._currentValue=w,p!==null)if(ei(p.value,w)){if(p.children===d.children&&!Mn.current){i=Li(t,i,o);break e}}else for(p=i.child,p!==null&&(p.return=i);p!==null;){var U=p.dependencies;if(U!==null){w=p.child;for(var H=U.firstContext;H!==null;){if(H.context===c){if(p.tag===1){H=Pi(-1,o&-o),H.tag=2;var re=p.updateQueue;if(re!==null){re=re.shared;var Ee=re.pending;Ee===null?H.next=H:(H.next=Ee.next,Ee.next=H),re.pending=H}}p.lanes|=o,H=p.alternate,H!==null&&(H.lanes|=o),Ac(p.return,o,i),U.lanes|=o;break}H=H.next}}else if(p.tag===10)w=p.type===i.type?null:p.child;else if(p.tag===18){if(w=p.return,w===null)throw Error(n(341));w.lanes|=o,U=w.alternate,U!==null&&(U.lanes|=o),Ac(w,o,i),w=p.sibling}else w=p.child;if(w!==null)w.return=p;else for(w=p;w!==null;){if(w===i){w=null;break}if(p=w.sibling,p!==null){p.return=w.return,w=p;break}w=w.return}p=w}gn(t,i,d.children,o),i=i.child}return i;case 9:return d=i.type,c=i.pendingProps.children,vs(i,o),d=Wn(d),c=c(d),i.flags|=1,gn(t,i,c,o),i.child;case 14:return c=i.type,d=ni(c,i.pendingProps),d=ni(c.type,d),qh(t,i,c,d,o);case 15:return Yh(t,i,i.type,i.pendingProps,o);case 17:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ni(c,d),Da(t,i),i.tag=1,En(c)?(t=!0,ma(i)):t=!1,vs(i,o),Bh(i,c,d),Hc(i,c,d,o),Xc(null,i,c,!0,t,o);case 19:return ip(t,i,o);case 22:return Kh(t,i,o)}throw Error(n(156,i.tag))};function Cp(t,i){return se(t,i)}function hv(t,i,o,c){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $n(t,i,o,c){return new hv(t,i,o,c)}function du(t){return t=t.prototype,!(!t||!t.isReactComponent)}function pv(t){if(typeof t=="function")return du(t)?1:0;if(t!=null){if(t=t.$$typeof,t===ae)return 11;if(t===ve)return 14}return 2}function fr(t,i){var o=t.alternate;return o===null?(o=$n(t.tag,i,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=i,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,i=t.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function Wa(t,i,o,c,d,p){var w=2;if(c=t,typeof t=="function")du(t)&&(w=1);else if(typeof t=="string")w=5;else e:switch(t){case O:return Or(o.children,d,p,i);case j:w=8,d|=8;break;case L:return t=$n(12,o,i,d|2),t.elementType=L,t.lanes=p,t;case ie:return t=$n(13,o,i,d),t.elementType=ie,t.lanes=p,t;case pe:return t=$n(19,o,i,d),t.elementType=pe,t.lanes=p,t;case he:return ja(o,d,p,i);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case b:w=10;break e;case G:w=9;break e;case ae:w=11;break e;case ve:w=14;break e;case ce:w=16,c=null;break e}throw Error(n(130,t==null?t:typeof t,""))}return i=$n(w,o,i,d),i.elementType=t,i.type=c,i.lanes=p,i}function Or(t,i,o,c){return t=$n(7,t,c,i),t.lanes=o,t}function ja(t,i,o,c){return t=$n(22,t,c,i),t.elementType=he,t.lanes=o,t.stateNode={isHidden:!1},t}function hu(t,i,o){return t=$n(6,t,null,i),t.lanes=o,t}function pu(t,i,o){return i=$n(4,t.children!==null?t.children:[],t.key,i),i.lanes=o,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}function mv(t,i,o,c,d){this.tag=i,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Vn(0),this.expirationTimes=Vn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Vn(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function mu(t,i,o,c,d,p,w,U,H){return t=new mv(t,i,o,U,H),i===1?(i=1,p===!0&&(i|=8)):i=0,p=$n(3,null,null,i),t.current=p,p.stateNode=t,p.memoizedState={element:c,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},bc(p),t}function gv(t,i,o){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:k,key:c==null?null:""+c,children:t,containerInfo:i,implementation:o}}function bp(t){if(!t)return nr;t=t._reactInternals;e:{if(hi(t)!==t||t.tag!==1)throw Error(n(170));var i=t;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(En(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(n(171))}if(t.tag===1){var o=t.type;if(En(o))return nh(t,o,i)}return i}function Rp(t,i,o,c,d,p,w,U,H){return t=mu(o,c,!0,t,d,p,w,U,H),t.context=bp(null),o=t.current,c=vn(),d=cr(o),p=Pi(c,d),p.callback=i??null,sr(o,p,d),t.current.lanes=d,Sn(t,d,c),An(t,c),t}function Xa(t,i,o,c){var d=i.current,p=vn(),w=cr(d);return o=bp(o),i.context===null?i.context=o:i.pendingContext=o,i=Pi(p,w),i.payload={element:t},c=c===void 0?null:c,c!==null&&(i.callback=c),t=sr(d,i,w),t!==null&&(si(t,d,w,p),Ea(t,d,w)),w}function $a(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Pp(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<i?o:i}}function gu(t,i){Pp(t,i),(t=t.alternate)&&Pp(t,i)}function vv(){return null}var Lp=typeof reportError=="function"?reportError:function(t){console.error(t)};function vu(t){this._internalRoot=t}qa.prototype.render=vu.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(n(409));Xa(t,i,null,null)},qa.prototype.unmount=vu.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;Ir(function(){Xa(null,t,null,null)}),i[Ti]=null}};function qa(t){this._internalRoot=t}qa.prototype.unstable_scheduleHydration=function(t){if(t){var i=pd();t={blockedOn:null,target:t,priority:i};for(var o=0;o<Zi.length&&i!==0&&i<Zi[o].priority;o++);Zi.splice(o,0,t),o===0&&vd(t)}};function _u(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ya(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Np(){}function _v(t,i,o,c,d){if(d){if(typeof c=="function"){var p=c;c=function(){var re=$a(w);p.call(re)}}var w=Rp(i,c,t,0,null,!1,!1,"",Np);return t._reactRootContainer=w,t[Ti]=w.current,fo(t.nodeType===8?t.parentNode:t),Ir(),w}for(;d=t.lastChild;)t.removeChild(d);if(typeof c=="function"){var U=c;c=function(){var re=$a(H);U.call(re)}}var H=mu(t,0,!1,null,null,!1,!1,"",Np);return t._reactRootContainer=H,t[Ti]=H.current,fo(t.nodeType===8?t.parentNode:t),Ir(function(){Xa(i,H,o,c)}),H}function Ka(t,i,o,c,d){var p=o._reactRootContainer;if(p){var w=p;if(typeof d=="function"){var U=d;d=function(){var H=$a(w);U.call(H)}}Xa(i,w,t,d)}else w=_v(o,i,t,d,c);return $a(w)}dd=function(t){switch(t.tag){case 3:var i=t.stateNode;if(i.current.memoizedState.isDehydrated){var o=$t(i.pendingLanes);o!==0&&(Hl(i,o|1),An(i,Ce()),(St&6)===0&&(Ms=Ce()+500,ir()))}break;case 13:Ir(function(){var c=Ri(t,1);if(c!==null){var d=vn();si(c,t,1,d)}}),gu(t,1)}},Gl=function(t){if(t.tag===13){var i=Ri(t,134217728);if(i!==null){var o=vn();si(i,t,134217728,o)}gu(t,134217728)}},hd=function(t){if(t.tag===13){var i=cr(t),o=Ri(t,i);if(o!==null){var c=vn();si(o,t,i,c)}gu(t,i)}},pd=function(){return Pt},md=function(t,i){var o=Pt;try{return Pt=t,i()}finally{Pt=o}},Ie=function(t,i,o){switch(i){case"input":if(we(t,o),i=o.name,o.type==="radio"&&i!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var c=o[i];if(c!==t&&c.form===t.form){var d=ha(c);if(!d)throw Error(n(90));We(c),we(c,d)}}}break;case"textarea":_e(t,o);break;case"select":i=o.value,i!=null&&I(t,!!o.multiple,i,!1)}},It=cu,Xt=Ir;var xv={usingClientEntryPoint:!1,Events:[mo,cs,ha,Fe,ut,cu]},Ro={findFiberByHostInstance:Ar,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},yv={bundleType:Ro.bundleType,version:Ro.version,rendererPackageName:Ro.rendererPackageName,rendererConfig:Ro.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:C.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=R(t),t===null?null:t.stateNode},findFiberByHostInstance:Ro.findFiberByHostInstance||vv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Za=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Za.isDisabled&&Za.supportsFiber)try{Ct=Za.inject(yv),_t=Za}catch{}}return Cn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=xv,Cn.createPortal=function(t,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!_u(i))throw Error(n(200));return gv(t,i,null,o)},Cn.createRoot=function(t,i){if(!_u(t))throw Error(n(299));var o=!1,c="",d=Lp;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(d=i.onRecoverableError)),i=mu(t,1,!1,null,null,o,!1,c,d),t[Ti]=i.current,fo(t.nodeType===8?t.parentNode:t),new vu(i)},Cn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(n(188)):(t=Object.keys(t).join(","),Error(n(268,t)));return t=R(i),t=t===null?null:t.stateNode,t},Cn.flushSync=function(t){return Ir(t)},Cn.hydrate=function(t,i,o){if(!Ya(i))throw Error(n(200));return Ka(null,t,i,!0,o)},Cn.hydrateRoot=function(t,i,o){if(!_u(t))throw Error(n(405));var c=o!=null&&o.hydratedSources||null,d=!1,p="",w=Lp;if(o!=null&&(o.unstable_strictMode===!0&&(d=!0),o.identifierPrefix!==void 0&&(p=o.identifierPrefix),o.onRecoverableError!==void 0&&(w=o.onRecoverableError)),i=Rp(i,null,t,1,o??null,d,!1,p,w),t[Ti]=i.current,fo(t),c)for(t=0;t<c.length;t++)o=c[t],d=o._getVersion,d=d(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,d]:i.mutableSourceEagerHydrationData.push(o,d);return new qa(i)},Cn.render=function(t,i,o){if(!Ya(i))throw Error(n(200));return Ka(null,t,i,!1,o)},Cn.unmountComponentAtNode=function(t){if(!Ya(t))throw Error(n(40));return t._reactRootContainer?(Ir(function(){Ka(null,null,t,!1,function(){t._reactRootContainer=null,t[Ti]=null})}),!0):!1},Cn.unstable_batchedUpdates=cu,Cn.unstable_renderSubtreeIntoContainer=function(t,i,o,c){if(!Ya(o))throw Error(n(200));if(t==null||t._reactInternals===void 0)throw Error(n(38));return Ka(t,i,o,!1,c)},Cn.version="18.3.1-next-f1338f8080-20240426",Cn}var Bp;function Rv(){if(Bp)return Su.exports;Bp=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Su.exports=bv(),Su.exports}var Vp;function Pv(){if(Vp)return Qa;Vp=1;var s=Rv();return Qa.createRoot=s.createRoot,Qa.hydrateRoot=s.hydrateRoot,Qa}var Lv=Pv();const Nv=Km(Lv);/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dv=s=>s==null?void 0:s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Iv(s,e,n=[]){if(e==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:Dv(s),size:24,node:e,...n.length>0?{aliases:n}:{}}}/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uv=s=>{let e="",n=!1;for(const r of s){if(r==="-"||r==="_"||r<=" "){n=e.length>0;continue}e.length===0?e+=r.toLowerCase():e+=n?r.toUpperCase():r,n=!1}return e};/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fv=s=>{const e=Uv(s);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sf=(...s)=>s.filter((e,n,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kr={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function wu(s){return s!=null}function Ov(s,e={}){var v,S;const n=e.attributeNames??{},r=E=>n[E]??E,a=s.size??s.width??kr.width,l=s.size??s.height??kr.height,u=((v=s.aliases)==null?void 0:v.filter(E=>typeof E=="string"&&E.trim()!=="").map(E=>`lucide-${E}`))??[],f=[...s.name?[`lucide-${s.name}`]:[],...u],h=((S=e.className)==null?void 0:S.split(" ").filter(Boolean))??[],m=e.includeDefaultClasses===!1?sf(...h):sf("lucide",...f,...h),_=e.absoluteStrokeWidth?Number(e.strokeWidth??kr["stroke-width"])*Number(s.size??s.width??kr.width)/Number(e.size??e.width??kr.width):e.strokeWidth??kr["stroke-width"];return["svg",{...Object.entries(kr).reduce((E,[A,x])=>(E[r(A)]=x,E),{}),..."color"in e&&e.color&&{[r("stroke")]:e.color},..."size"in e&&wu(e.size)&&{[r("width")]:e.size,[r("height")]:e.size},..."width"in e&&wu(e.width)&&{[r("width")]:e.width},..."height"in e&&wu(e.height)&&{[r("height")]:e.height},[r("stroke-width")]:_,...m&&{[r("class")]:m},[r("viewBox")]:`0 0 ${a} ${l}`,...e.hasA11yProp===!1?{[r("aria-hidden")]:"true"}:{},..."attributes"in e&&e.attributes},s.node.map(E=>{const[A,x,g]=E,P=e.nonScalingStroke?{[r("vector-effect")]:"non-scaling-stroke",...x}:x;return g?[A,P,g]:[A,P]})]}/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function kv(s,e={}){return Ov(s,{...e,attributeNames:{...e.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zv=s=>{for(const e in s)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1},Bv=vt.createContext({}),Vv=()=>vt.useContext(Bv),Hv=vt.forwardRef(({color:s,size:e,width:n,height:r,strokeWidth:a,absoluteStrokeWidth:l,nonScalingStroke:u,className:f="",children:h,iconNode:m=[],icon:_={node:m,aliases:[],size:24},...y},v)=>{const{size:S=24,strokeWidth:E=2,absoluteStrokeWidth:A=!1,nonScalingStroke:x=!1,color:g="currentColor",className:P=""}=Vv()??{},N=!!h||zv(y),[C,K,k=[]]=kv(_,{color:s??g,width:n??e??S,height:r??e??S,strokeWidth:a??E,absoluteStrokeWidth:l??A,nonScalingStroke:u??x,className:sf(P,f),hasA11yProp:N,attributes:y});return vt.createElement(C,{ref:v,...K},[...k.map(([O,j])=>vt.createElement(O,j)),...Array.isArray(h)?h:[h]])});/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function zn(s,e=[],n=[]){const r=typeof s=="string"?Iv(s,e,n):s,a=vt.forwardRef(({className:l,...u},f)=>vt.createElement(Hv,{ref:f,icon:r,className:l,...u}));return r.name&&(a.displayName=Fv(r.name)),a}/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zm={name:"chevrons-down",size:24,node:[["path",{d:"m7 6 5 5 5-5",key:"1lc07p"}],["path",{d:"m7 13 5 5 5-5",key:"1d48rs"}]]};Zm.node;const Tu=zn(Zm);/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qm={name:"chevrons-up",size:24,node:[["path",{d:"m17 11-5-5-5 5",key:"e8nh98"}],["path",{d:"m17 18-5-5-5 5",key:"2avn1x"}]]};Qm.node;const wl=zn(Qm);/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jm={name:"globe",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]};Jm.node;const Gv=zn(Jm);/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eg={name:"log-out",size:24,node:[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]};eg.node;const Wv=zn(eg);/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tg={name:"moon",size:24,node:[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]]};tg.node;const jv=zn(tg);/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ng={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};ng.node;const Xv=zn(ng);/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ig={name:"refresh-cw",size:24,node:[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]};ig.node;const Hp=zn(ig);/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rg={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};rg.node;const $v=zn(rg);/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sg={name:"sun",size:24,node:[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]};sg.node;const qv=zn(sg);/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const og={name:"trophy",size:24,node:[["path",{d:"M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2",key:"pwuv1l"}],["path",{d:"M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2",key:"1y54w1"}],["path",{d:"M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3",key:"e30mpu"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3",key:"i0yafy"}]]};og.node;const Gp=zn(og);/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ag={name:"wallet",size:24,node:[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]]};ag.node;const Yv=zn(ag);/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lg={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};lg.node;const Kv=zn(lg);/**
 * @license lucide-react v1.57.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cg={name:"zap",size:24,node:[["path",{d:"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",key:"1v7up4"}]]};cg.node;const Zv=zn(cg);function ug({value:s,className:e="",prefix:n="",suffix:r=""}){const[a,l]=vt.useState(s),[u,f]=vt.useState(!1),[h,m]=vt.useState("up"),_=vt.useRef(s);vt.useEffect(()=>{const v=_.current;if(v===s)return;m(s>v?"up":"down"),f(!0);const S=a,E=s,A=750;let x=null;const g=N=>{x||(x=N);const C=N-x,K=Math.min(C/A,1),k=K===1?1:1-Math.pow(2,-10*K),O=Math.round(S+(E-S)*k);l(O),K<1?requestAnimationFrame(g):(l(E),_.current=E,setTimeout(()=>f(!1),300))},P=requestAnimationFrame(g);return()=>cancelAnimationFrame(P)},[s]);const y=h==="up"?"text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.9)] scale-105":"text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.9)] scale-95";return F.jsxs("span",{className:`inline-block font-mono tracking-tight transition-all duration-300 transform ${u?y:""} ${e}`,children:[n,a.toLocaleString(),r]})}var Qf={};(function s(e,n,r,a){var l=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),u=typeof Path2D=="function"&&typeof DOMMatrix=="function",f=(function(){if(!e.OffscreenCanvas)return!1;try{var D=new OffscreenCanvas(1,1),M=D.getContext("2d");M.fillRect(0,0,1,1);var z=D.transferToImageBitmap();M.createPattern(z,"no-repeat")}catch{return!1}return!0})();function h(){}function m(D){var M=n.exports.Promise,z=M!==void 0?M:e.Promise;return typeof z=="function"?new z(D):(D(h,h),null)}var _=(function(D,M){return{transform:function(z){if(D)return z;if(M.has(z))return M.get(z);var fe=new OffscreenCanvas(z.width,z.height),W=fe.getContext("2d");return W.drawImage(z,0,0),M.set(z,fe),fe},clear:function(){M.clear()}}})(f,new Map),y=(function(){var D=Math.floor(16.666666666666668),M,z,fe={},W=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(M=function(Q){var le=Math.random();return fe[le]=requestAnimationFrame(function ne(me){W===me||W+D-1<me?(W=me,delete fe[le],Q()):fe[le]=requestAnimationFrame(ne)}),le},z=function(Q){fe[Q]&&cancelAnimationFrame(fe[Q])}):(M=function(Q){return setTimeout(Q,D)},z=function(Q){return clearTimeout(Q)}),{frame:M,cancel:z}})(),v=(function(){var D,M,z={};function fe(W){function Q(le,ne){W.postMessage({options:le||{},callback:ne})}W.init=function(ne){var me=ne.transferControlToOffscreen();W.postMessage({canvas:me},[me])},W.fire=function(ne,me,Se){if(M)return Q(ne,null),M;var Ne=Math.random().toString(36).slice(2);return M=m(function($e){function We(it){it.data.callback===Ne&&(delete z[Ne],W.removeEventListener("message",We),M=null,_.clear(),Se(),$e())}W.addEventListener("message",We),Q(ne,Ne),z[Ne]=We.bind(null,{data:{callback:Ne}})}),M},W.reset=function(){W.postMessage({reset:!0});for(var ne in z)z[ne](),delete z[ne]}}return function(){if(D)return D;if(!r&&l){var W=["var CONFETTI, SIZE = {}, module = {};","("+s.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{D=new Worker(URL.createObjectURL(new Blob([W])))}catch(Q){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",Q),null}fe(D)}return D}})(),S={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function E(D,M){return M?M(D):D}function A(D){return D!=null}function x(D,M,z){return E(D&&A(D[M])?D[M]:S[M],z)}function g(D){return D<0?0:Math.floor(D)}function P(D,M){return Math.floor(Math.random()*(M-D))+D}function N(D){return parseInt(D,16)}function C(D){return D.map(K)}function K(D){var M=String(D).replace(/[^0-9a-f]/gi,"");return M.length<6&&(M=M[0]+M[0]+M[1]+M[1]+M[2]+M[2]),{r:N(M.substring(0,2)),g:N(M.substring(2,4)),b:N(M.substring(4,6))}}function k(D){var M=x(D,"origin",Object);return M.x=x(M,"x",Number),M.y=x(M,"y",Number),M}function O(D){D.width=document.documentElement.clientWidth,D.height=document.documentElement.clientHeight}function j(D){var M=D.getBoundingClientRect();D.width=M.width,D.height=M.height}function L(D){var M=document.createElement("canvas");return M.style.position="fixed",M.style.top="0px",M.style.left="0px",M.style.pointerEvents="none",M.style.zIndex=D,M}function b(D,M,z,fe,W,Q,le,ne,me){D.save(),D.translate(M,z),D.rotate(Q),D.scale(fe,W),D.arc(0,0,1,le,ne,me),D.restore()}function G(D){var M=D.angle*(Math.PI/180),z=D.spread*(Math.PI/180);return{x:D.x,y:D.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:D.startVelocity*.5+Math.random()*D.startVelocity,angle2D:-M+(.5*z-Math.random()*z),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:D.color,shape:D.shape,tick:0,totalTicks:D.ticks,decay:D.decay,drift:D.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:D.gravity*3,ovalScalar:.6,scalar:D.scalar,flat:D.flat}}function ae(D,M){M.x+=Math.cos(M.angle2D)*M.velocity+M.drift,M.y+=Math.sin(M.angle2D)*M.velocity+M.gravity,M.velocity*=M.decay,M.flat?(M.wobble=0,M.wobbleX=M.x+10*M.scalar,M.wobbleY=M.y+10*M.scalar,M.tiltSin=0,M.tiltCos=0,M.random=1):(M.wobble+=M.wobbleSpeed,M.wobbleX=M.x+10*M.scalar*Math.cos(M.wobble),M.wobbleY=M.y+10*M.scalar*Math.sin(M.wobble),M.tiltAngle+=.1,M.tiltSin=Math.sin(M.tiltAngle),M.tiltCos=Math.cos(M.tiltAngle),M.random=Math.random()+2);var z=M.tick++/M.totalTicks,fe=M.x+M.random*M.tiltCos,W=M.y+M.random*M.tiltSin,Q=M.wobbleX+M.random*M.tiltCos,le=M.wobbleY+M.random*M.tiltSin;if(D.fillStyle="rgba("+M.color.r+", "+M.color.g+", "+M.color.b+", "+(1-z)+")",D.beginPath(),u&&M.shape.type==="path"&&typeof M.shape.path=="string"&&Array.isArray(M.shape.matrix))D.fill(he(M.shape.path,M.shape.matrix,M.x,M.y,Math.abs(Q-fe)*.1,Math.abs(le-W)*.1,Math.PI/10*M.wobble));else if(M.shape.type==="bitmap"){var ne=Math.PI/10*M.wobble,me=Math.abs(Q-fe)*.1,Se=Math.abs(le-W)*.1,Ne=M.shape.bitmap.width*M.scalar,$e=M.shape.bitmap.height*M.scalar,We=new DOMMatrix([Math.cos(ne)*me,Math.sin(ne)*me,-Math.sin(ne)*Se,Math.cos(ne)*Se,M.x,M.y]);We.multiplySelf(new DOMMatrix(M.shape.matrix));var it=D.createPattern(_.transform(M.shape.bitmap),"no-repeat");it.setTransform(We),D.globalAlpha=1-z,D.fillStyle=it,D.fillRect(M.x-Ne/2,M.y-$e/2,Ne,$e),D.globalAlpha=1}else if(M.shape==="circle")D.ellipse?D.ellipse(M.x,M.y,Math.abs(Q-fe)*M.ovalScalar,Math.abs(le-W)*M.ovalScalar,Math.PI/10*M.wobble,0,2*Math.PI):b(D,M.x,M.y,Math.abs(Q-fe)*M.ovalScalar,Math.abs(le-W)*M.ovalScalar,Math.PI/10*M.wobble,0,2*Math.PI);else if(M.shape==="star")for(var B=Math.PI/2*3,Et=4*M.scalar,Be=8*M.scalar,we=M.x,be=M.y,at=5,Oe=Math.PI/at;at--;)we=M.x+Math.cos(B)*Be,be=M.y+Math.sin(B)*Be,D.lineTo(we,be),B+=Oe,we=M.x+Math.cos(B)*Et,be=M.y+Math.sin(B)*Et,D.lineTo(we,be),B+=Oe;else D.moveTo(Math.floor(M.x),Math.floor(M.y)),D.lineTo(Math.floor(M.wobbleX),Math.floor(W)),D.lineTo(Math.floor(Q),Math.floor(le)),D.lineTo(Math.floor(fe),Math.floor(M.wobbleY));return D.closePath(),D.fill(),M.tick<M.totalTicks}function ie(D,M,z,fe,W){var Q=M.slice(),le=D.getContext("2d"),ne,me,Se=m(function(Ne){function $e(){ne=me=null,le.clearRect(0,0,fe.width,fe.height),_.clear(),W(),Ne()}function We(){r&&!(fe.width===a.width&&fe.height===a.height)&&(fe.width=D.width=a.width,fe.height=D.height=a.height),!fe.width&&!fe.height&&(z(D),fe.width=D.width,fe.height=D.height),le.clearRect(0,0,fe.width,fe.height),Q=Q.filter(function(it){return ae(le,it)}),Q.length?ne=y.frame(We):$e()}ne=y.frame(We),me=$e});return{addFettis:function(Ne){return Q=Q.concat(Ne),Se},canvas:D,promise:Se,reset:function(){ne&&y.cancel(ne),me&&me()}}}function pe(D,M){var z=!D,fe=!!x(M||{},"resize"),W=!1,Q=x(M,"disableForReducedMotion",Boolean),le=l&&!!x(M||{},"useWorker"),ne=le?v():null,me=z?O:j,Se=D&&ne?!!D.__confetti_initialized:!1,Ne=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,$e;function We(B,Et,Be){for(var we=x(B,"particleCount",g),be=x(B,"angle",Number),at=x(B,"spread",Number),Oe=x(B,"startVelocity",Number),I=x(B,"decay",Number),T=x(B,"gravity",Number),ee=x(B,"drift",Number),_e=x(B,"colors",C),ye=x(B,"ticks",Number),ge=x(B,"shapes"),Ve=x(B,"scalar"),Le=!!x(B,"flat"),De=k(B),ft=we,Te=[],He=D.width*De.x,et=D.height*De.y;ft--;)Te.push(G({x:He,y:et,angle:be,spread:at,startVelocity:Oe,color:_e[ft%_e.length],shape:ge[P(0,ge.length)],ticks:ye,decay:I,gravity:T,drift:ee,scalar:Ve,flat:Le}));return $e?$e.addFettis(Te):($e=ie(D,Te,me,Et,Be),$e.promise)}function it(B){var Et=Q||x(B,"disableForReducedMotion",Boolean),Be=x(B,"zIndex",Number);if(Et&&Ne)return m(function(Oe){Oe()});z&&$e?D=$e.canvas:z&&!D&&(D=L(Be),document.body.appendChild(D)),fe&&!Se&&me(D);var we={width:D.width,height:D.height};ne&&!Se&&ne.init(D),Se=!0,ne&&(D.__confetti_initialized=!0);function be(){if(ne){var Oe={getBoundingClientRect:function(){if(!z)return D.getBoundingClientRect()}};me(Oe),ne.postMessage({resize:{width:Oe.width,height:Oe.height}});return}we.width=we.height=null}function at(){$e=null,fe&&(W=!1,e.removeEventListener("resize",be)),z&&D&&(document.body.contains(D)&&document.body.removeChild(D),D=null,Se=!1)}return fe&&!W&&(W=!0,e.addEventListener("resize",be,!1)),ne?ne.fire(B,we,at):We(B,we,at)}return it.reset=function(){ne&&ne.reset(),$e&&$e.reset()},it}var ve;function ce(){return ve||(ve=pe(null,{useWorker:!0,resize:!0})),ve}function he(D,M,z,fe,W,Q,le){var ne=new Path2D(D),me=new Path2D;me.addPath(ne,new DOMMatrix(M));var Se=new Path2D;return Se.addPath(me,new DOMMatrix([Math.cos(le)*W,Math.sin(le)*W,-Math.sin(le)*Q,Math.cos(le)*Q,z,fe])),Se}function V(D){if(!u)throw new Error("path confetti are not supported in this browser");var M,z;typeof D=="string"?M=D:(M=D.path,z=D.matrix);var fe=new Path2D(M),W=document.createElement("canvas"),Q=W.getContext("2d");if(!z){for(var le=1e3,ne=le,me=le,Se=0,Ne=0,$e,We,it=0;it<le;it+=2)for(var B=0;B<le;B+=2)Q.isPointInPath(fe,it,B,"nonzero")&&(ne=Math.min(ne,it),me=Math.min(me,B),Se=Math.max(Se,it),Ne=Math.max(Ne,B));$e=Se-ne,We=Ne-me;var Et=10,Be=Math.min(Et/$e,Et/We);z=[Be,0,0,Be,-Math.round($e/2+ne)*Be,-Math.round(We/2+me)*Be]}return{type:"path",path:M,matrix:z}}function ue(D){var M,z=1,fe="#000000",W='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof D=="string"?M=D:(M=D.text,z="scalar"in D?D.scalar:z,W="fontFamily"in D?D.fontFamily:W,fe="color"in D?D.color:fe);var Q=10*z,le=""+Q+"px "+W,ne=new OffscreenCanvas(Q,Q),me=ne.getContext("2d");me.font=le;var Se=me.measureText(M),Ne=Math.ceil(Se.actualBoundingBoxRight+Se.actualBoundingBoxLeft),$e=Math.ceil(Se.actualBoundingBoxAscent+Se.actualBoundingBoxDescent),We=2,it=Se.actualBoundingBoxLeft+We,B=Se.actualBoundingBoxAscent+We;Ne+=We+We,$e+=We+We,ne=new OffscreenCanvas(Ne,$e),me=ne.getContext("2d"),me.font=le,me.fillStyle=fe,me.fillText(M,it,B);var Et=1/z;return{type:"bitmap",bitmap:ne.transferToImageBitmap(),matrix:[Et,0,0,Et,-Ne*Et/2,-$e*Et/2]}}n.exports=function(){return ce().apply(this,arguments)},n.exports.reset=function(){ce().reset()},n.exports.create=pe,n.exports.shapeFromPath=V,n.exports.shapeFromText=ue})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),Qf,!1);const Au=Qf.exports;Qf.exports.create;let ws=null;function Ul(){if(typeof window>"u")return null;if(!ws){const s=window.AudioContext||window.webkitAudioContext;s&&(ws=new s)}return ws&&ws.state==="suspended"&&ws.resume(),ws}function fg(s=1e3){try{const e=Ul();if(!e)return;const n=e.currentTime,r=e.createOscillator(),a=e.createGain();r.type="triangle",r.frequency.setValueAtTime(s,n),r.frequency.exponentialRampToValueAtTime(120,n+.025),a.gain.setValueAtTime(.15,n),a.gain.exponentialRampToValueAtTime(.001,n+.025),r.connect(a),a.connect(e.destination),r.start(n),r.stop(n+.025)}catch{}}function Qv(s=5200){try{let l=function(){const u=Date.now()-r;if(u>=s)return;const f=u/s,h=850+Math.sin(f*Math.PI)*450;if(fg(h),f<.28)a=Math.max(32,a*.88);else if(f<.62)a=32+(Math.random()-.5)*6;else{const m=(f-.62)/.38;a=32+Math.pow(m,2.8)*320}setTimeout(l,a)};var e=l;if(!Ul())return;const r=Date.now();let a=140;l()}catch{}}function Jv(){try{const s=Ul();if(!s)return;const e=s.currentTime;[523.25,659.25,783.99,1046.5,1318.51].forEach((n,r)=>{const a=s.createOscillator(),l=s.createGain();a.type="sine",a.frequency.setValueAtTime(n,e+r*.07),l.gain.setValueAtTime(.12,e+r*.07),l.gain.exponentialRampToValueAtTime(.001,e+.7),a.connect(l),l.connect(s.destination),a.start(e+r*.07),a.stop(e+.7)})}catch{}}function e_(){try{const s=Ul();if(!s)return;const e=s.currentTime,n=s.createOscillator(),r=s.createGain();n.type="sawtooth",n.frequency.setValueAtTime(240,e),n.frequency.linearRampToValueAtTime(80,e+.35),r.gain.setValueAtTime(.12,e),r.gain.exponentialRampToValueAtTime(.001,e+.35),n.connect(r),r.connect(s.destination),n.start(e),n.stop(e+.35)}catch{}}const Di=(s,e=5200)=>{s==="click"&&fg(1200),s==="spin"&&Qv(e),s==="win"&&Jv(),s==="loss"&&e_()};function ci({className:s="w-4 h-4",glow:e=!0}){return F.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:`inline-block shrink-0 align-middle ${s} ${e?"drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]":""}`,children:[F.jsx("circle",{cx:"12",cy:"12",r:"10",fill:"url(#coinGrad)",stroke:"#f59e0b",strokeWidth:"1.5"}),F.jsx("circle",{cx:"12",cy:"12",r:"7.5",stroke:"#fef08a",strokeWidth:"0.8",strokeDasharray:"3 2",opacity:"0.8"}),F.jsx("path",{d:"M12 7v10M9.5 9.5h5a1.5 1.5 0 0 1 0 3h-5a1.5 1.5 0 0 0 0 3h5",stroke:"#ffffff",strokeWidth:"1.5",strokeLinecap:"round"}),F.jsx("defs",{children:F.jsxs("linearGradient",{id:"coinGrad",x1:"4",y1:"4",x2:"20",y2:"20",gradientUnits:"userSpaceOnUse",children:[F.jsx("stop",{stopColor:"#fbbf24"}),F.jsx("stop",{offset:"0.5",stopColor:"#f59e0b"}),F.jsx("stop",{offset:"1",stopColor:"#d97706"})]})})]})}function t_({userBalance:s,onUpdateBalance:e,discordUser:n,theme:r,isSpinning:a=!1,setIsSpinning:l=()=>{}}){const[u,f]=vt.useState(100),[h,m]=vt.useState(2),[_,y]=vt.useState(48),[v,S]=vt.useState(0),[E,A]=vt.useState(0),[x,g]=vt.useState(180),[P,N]=vt.useState(null),[C,K]=vt.useState([]),[k,O]=vt.useState([]),j=[{label:"x1.5",value:1.5,chance:64},{label:"x2",value:2,chance:48},{label:"x3",value:3,chance:32},{label:"x5",value:5,chance:19.2},{label:"25%",value:3.84,chance:25},{label:"50%",value:1.92,chance:50},{label:"75%",value:1.28,chance:75},{label:"90%",value:1.07,chance:90}],L=we=>{a||(m(we.value),y(we.chance),Di("click"))},b=we=>{if(a)return;if(we===""){y("");return}let be=parseFloat(we);if(isNaN(be))return;be>90&&(be=90),be<1&&(be=1),y(be);const at=Number((96/Math.max(1,be)).toFixed(2));m(at)},G=we=>{a||(f(be=>Math.min(s,be+we)),Di("click"))},ae=()=>{a||(f(we=>Math.max(10,Math.floor(we/2))),Di("click"))},ie=()=>{a||(f(we=>Math.min(s,we*2)),Di("click"))},pe=()=>{a||(f(10),Di("click"))},ve=()=>{a||(f(s),Di("click"))},ce=Math.floor(u*h),he=Math.max(0,ce-u),V=ce>=1e4,ue=u>=1e4,D=v>=1e4,M=E>=1e4,z=175,fe=175,W=84,Q=108,le=135,ne=2*Math.PI*le,me=Math.min(90,Math.max(1,parseFloat(_)||1)),Se=me/100*360,Ne=me/100*ne;let $e="#0284c7",We="#0284c7",it="#0369a1";a?($e="#38bdf8",We="#38bdf8",it="#0284c7"):P==="win"?($e=D?"#fbbf24":"#10b981",We=D?"#fbbf24":"#10b981",it=D?"#d97706":"#059669"):P==="loss"&&($e="#ef4444",We="#ef4444",it="#b91c1c");const B=5200,Et=()=>{if(a||u<=0)return;if(u>s){alert("Недостаточно монет на балансе!");return}const we=u,be=h,at=Math.floor(we*be);l(!0),N(null),Di("spin",B);const Oe=Math.random()*360,I=(8+Math.floor(Math.random()*2))*360,T=x+I+Oe;g(T);const ee=T%360,_e=180-Se/2,ye=180+Se/2,ge=ee>=_e&&ee<=ye;setTimeout(()=>{l(!1);const Ve=n?n.username:"Вы";if(ge){N("win"),S(at);const Le=at-we;e(De=>De+Le),Di("win"),fetch("/api/upgrader/record",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({isWin:!0,user:Ve,discordId:n?n.id:null,avatar:n?n.avatar:null,bet:we,mult:be,amount:at})}).catch(De=>console.warn("Failed to record win",De)),at>=1e4?(Au({particleCount:160,spread:100,origin:{y:.5},colors:["#fbbf24","#f59e0b","#d97706","#fef08a","#ffffff"]}),setTimeout(()=>{Au({particleCount:80,spread:60,origin:{y:.55},colors:["#38bdf8","#0284c7","#fbbf24"]})},250)):Au({particleCount:100,spread:80,origin:{y:.5},colors:["#10b981","#34d399","#0ea5e9","#ffffff"]}),K(De=>[{id:Date.now(),user:Ve,bet:we,mult:be,amount:at,time:"Только что"},...De.slice(0,14)])}else N("loss"),A(we),Di("loss"),fetch("/api/upgrader/record",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({isWin:!1,user:Ve,discordId:n?n.id:null,avatar:n?n.avatar:null,bet:we,mult:be,amount:0})}).catch(Le=>console.warn("Failed to record loss",Le)),e(Le=>Le-we),O(Le=>[{id:Date.now(),user:Ve,bet:we,mult:be,time:"Только что"},...Le.slice(0,14)])},B)},Be=r==="dark";return F.jsxs("div",{className:`relative w-full h-[calc(100vh-80px)] flex items-center justify-between overflow-hidden ${Be?"bg-[#060b17] text-white":"bg-[#f0f6fc] text-slate-900"} select-none`,children:[F.jsx("aside",{className:`w-64 shrink-0 h-full p-4 flex flex-col justify-between ${Be?"bg-[#0a1122]":"bg-white"} shadow-sm z-20`,children:F.jsxs("div",{children:[F.jsxs("div",{className:"pb-3 mb-2 flex items-center justify-between border-b border-sky-500/10",children:[F.jsxs("div",{className:"flex items-center gap-1.5",children:[F.jsx($v,{className:"w-4 h-4 text-sky-400 animate-pulse"}),F.jsx("span",{className:"text-xs font-orbitron font-black text-sky-400 uppercase tracking-wider",children:"WIN"})]}),F.jsx("span",{className:"text-[10px] font-mono font-bold text-sky-500/70",children:C.length})]}),F.jsx("div",{className:"overflow-y-auto max-h-[calc(100vh-160px)] space-y-2 pr-1",children:C.length===0?F.jsxs("div",{className:"text-[11px] font-rajdhani text-slate-400 italic py-6 text-center flex flex-col items-center gap-1",children:[F.jsx(Gp,{className:"w-5 h-5 text-slate-500 opacity-40 mb-1"}),F.jsx("span",{children:"Пока нет выигрышей"})]}):C.map(we=>{const be=we.amount>=1e4;return F.jsxs("div",{className:`p-2.5 shadow-sm flex items-center justify-between transition-all duration-200 hover:translate-x-1 animate-item-entry ${be?Be?"bg-gradient-to-r from-amber-950/70 via-[#182338] to-amber-900/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]":"bg-gradient-to-r from-amber-50 to-yellow-100 shadow-[0_0_10px_rgba(245,158,11,0.2)]":Be?"bg-[#121c35] hover:bg-[#162343]":"bg-sky-50/80 hover:bg-sky-100/80"}`,children:[F.jsxs("div",{children:[F.jsx("div",{className:"text-xs font-orbitron font-black truncate max-w-[100px]",children:we.user}),F.jsxs("div",{className:"text-[10px] font-rajdhani text-slate-400 flex items-center gap-1.5 mt-0.5",children:[F.jsx("span",{children:we.time}),F.jsx("span",{children:"•"}),F.jsxs("span",{className:"text-sky-400 font-mono font-bold",children:["x",we.mult.toFixed(2)]})]})]}),F.jsxs("div",{className:"flex items-center gap-1",children:[F.jsxs("span",{className:`text-xs font-orbitron font-black ${be?"bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]":"text-emerald-400"}`,children:["+",we.amount.toLocaleString()]}),F.jsx(ci,{className:"w-3.5 h-3.5"})]})]},we.id)})})]})}),F.jsx("div",{className:"flex-1 h-full flex flex-col items-center justify-center p-4",children:F.jsxs("div",{className:"w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center",children:[F.jsxs("div",{className:`lg:col-span-4 shadow-sm flex flex-col justify-between h-[390px] transition-all duration-300 ${Be?"bg-[#0d1527]":"bg-white"} ${ue?"shadow-[0_0_20px_rgba(245,158,11,0.15)]":""}`,children:[F.jsx("div",{className:`h-1 w-full transition-all duration-300 ${ue?"bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500":"bg-gradient-to-r from-sky-500 to-blue-600"}`}),F.jsxs("div",{className:"p-5 flex-1 flex flex-col justify-between",children:[F.jsxs("div",{children:[F.jsxs("div",{className:"flex items-center justify-between pb-2 border-b border-slate-500/10",children:[F.jsxs("div",{className:"flex items-center gap-1.5",children:[F.jsx(Yv,{className:`w-4 h-4 ${ue?"text-amber-400":"text-sky-400"}`}),F.jsx("span",{className:"text-xs font-orbitron font-black uppercase tracking-wider",children:"СТАВКА"})]}),F.jsxs("div",{className:"text-[11px] font-rajdhani font-bold text-slate-400 flex items-center gap-1.5",children:[F.jsx("span",{children:"Баланс:"}),F.jsx(ug,{value:s,className:"text-sky-400 font-black font-orbitron"}),F.jsx(ci,{className:"w-3.5 h-3.5"})]})]}),F.jsxs("div",{className:"my-5 text-center",children:[F.jsx("span",{className:"text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1",children:"СУММА ДЛЯ АПГРЕЙДА"}),F.jsxs("div",{className:"flex items-center justify-center gap-2",children:[F.jsx("span",{className:`font-orbitron font-black text-3xl tracking-tight transition-all ${ue?"bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]":Be?"text-white":"text-slate-900"}`,children:u.toLocaleString()}),F.jsx(ci,{className:"w-6 h-6"})]})]})]}),F.jsxs("div",{className:"space-y-3",children:[F.jsxs("div",{className:"relative flex items-center",children:[F.jsx("input",{type:"number",min:"1",max:s,value:u,onChange:we=>f(Math.max(1,parseInt(we.target.value)||0)),disabled:a,className:`w-full pl-4 pr-10 py-2 font-orbitron font-black text-sm outline-none transition-all ${Be?"bg-[#15203b] text-white focus:bg-[#1a294d]":"bg-sky-50 text-slate-900 focus:bg-sky-100"} ${ue?"ring-1 ring-amber-400/50":"focus:ring-1 focus:ring-sky-500"}`}),F.jsx("div",{className:"absolute right-3 pointer-events-none",children:F.jsx(ci,{className:"w-4 h-4"})})]}),F.jsxs("div",{className:"space-y-1.5",children:[F.jsx("div",{className:"grid grid-cols-4 gap-1",children:[10,50,100,500].map(we=>F.jsxs("button",{disabled:a,onClick:()=>G(we),className:`py-1.5 text-xs font-orbitron font-black shadow-sm transition-all active:scale-95 ${Be?"bg-[#15203b] hover:bg-[#1f3058] text-sky-400":"bg-sky-50 hover:bg-sky-100 text-sky-700"}`,children:["+",we]},we))}),F.jsxs("div",{className:"grid grid-cols-4 gap-1",children:[F.jsx("button",{disabled:a,onClick:ae,className:`py-1.5 text-xs font-orbitron font-black shadow-sm transition-all active:scale-95 ${Be?"bg-[#15203b] hover:bg-[#1f3058] text-slate-300":"bg-slate-100 hover:bg-slate-200 text-slate-700"}`,children:"1/2"}),F.jsx("button",{disabled:a,onClick:ie,className:`py-1.5 text-xs font-orbitron font-black shadow-sm transition-all active:scale-95 ${Be?"bg-[#15203b] hover:bg-[#1f3058] text-slate-300":"bg-slate-100 hover:bg-slate-200 text-slate-700"}`,children:"2X"}),F.jsx("button",{disabled:a,onClick:pe,className:`py-1.5 text-xs font-orbitron font-black shadow-sm transition-all active:scale-95 ${Be?"bg-[#15203b] hover:bg-[#1f3058] text-slate-300":"bg-slate-100 hover:bg-slate-200 text-slate-700"}`,children:"MIN"}),F.jsx("button",{disabled:a,onClick:ve,className:`py-1.5 text-xs font-orbitron font-black shadow-sm transition-all active:scale-95 ${ue?"bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white":"bg-sky-600 hover:bg-sky-700 text-white"}`,children:"MAX"})]})]})]})]})]}),F.jsxs("div",{className:"lg:col-span-4 flex flex-col items-center justify-center",children:[F.jsxs("div",{className:"relative w-[310px] h-[310px] flex items-center justify-center select-none",children:[F.jsxs("svg",{className:"w-full h-full overflow-visible",viewBox:"0 0 350 350",children:[Array.from({length:48}).map((we,be)=>{const Oe=be*360/48*Math.PI/180,I=z+Q*Math.sin(Oe),T=fe-Q*Math.cos(Oe);return F.jsx("circle",{cx:I,cy:T,r:1.75,className:Be?"fill-slate-600":"fill-slate-300"},be)}),F.jsx("circle",{cx:z,cy:fe,r:le,className:Be?"stroke-slate-800":"stroke-slate-200",strokeWidth:"20",fill:"transparent"}),F.jsx("circle",{cx:z,cy:fe,r:le,stroke:$e,strokeWidth:"20",strokeDasharray:`${Ne} ${ne}`,strokeDashoffset:"0",transform:`rotate(${90-Se/2} ${z} ${fe})`,strokeLinecap:"butt",fill:"none",style:{filter:`drop-shadow(0 0 12px ${$e})`,transition:"stroke-dasharray 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.6s ease, filter 0.6s ease"}})]}),F.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none z-20",style:{transform:`rotate(${x}deg)`,transformOrigin:"50% 50%",transitionProperty:"transform",transitionDuration:a?`${B}ms`:"0ms",transitionTimingFunction:"cubic-bezier(0.5, 0.0, 0.15, 1)"},children:F.jsx("div",{className:"absolute",style:{transform:`translateY(-${W}px)`},children:F.jsx("svg",{width:"22",height:"20",viewBox:"0 0 20 18",style:{filter:`drop-shadow(0 0 10px ${We})`,transition:"filter 0.6s ease"},children:F.jsx("polygon",{points:"10,0 20,16 10,11 0,16",fill:We,stroke:it,strokeWidth:"1.2",style:{transition:"fill 0.6s ease, stroke 0.6s ease"}})})})}),F.jsx("div",{className:"absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10",children:P==="win"?F.jsxs("div",{className:"flex flex-col items-center justify-center animate-item-entry",children:[F.jsx(wl,{className:`w-14 h-14 ${D?"text-amber-400 drop-shadow-[0_0_20px_#fbbf24]":"text-emerald-400 drop-shadow-[0_0_16px_#10b981]"} animate-bounce`}),F.jsxs("div",{className:"flex items-center gap-1.5 mt-0.5",children:[F.jsxs("span",{className:`font-orbitron font-black text-2xl ${D?"bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]":"text-emerald-400"}`,children:["+",v.toLocaleString()]}),F.jsx(ci,{className:"w-5 h-5"})]})]}):P==="loss"?F.jsxs("div",{className:"flex flex-col items-center justify-center animate-item-entry",children:[F.jsx(Tu,{className:"w-14 h-14 text-rose-500 drop-shadow-[0_0_16px_#ef4444] animate-bounce"}),F.jsxs("div",{className:"flex items-center gap-1.5 mt-0.5",children:[F.jsxs("span",{className:`font-orbitron font-black text-2xl ${M?"bg-gradient-to-r from-rose-400 via-red-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(244,63,94,0.9)]":"text-rose-500"}`,children:["-",E.toLocaleString()]}),F.jsx(ci,{className:"w-5 h-5"})]})]}):a?F.jsxs("div",{className:"flex flex-col items-center justify-center",children:[F.jsx(Hp,{className:"w-10 h-10 text-sky-400 animate-spin mb-1 drop-shadow-[0_0_12px_#38bdf8]"}),F.jsx("span",{className:"font-orbitron font-black text-xs text-sky-400 uppercase tracking-widest",children:"SPINNING..."})]}):F.jsxs(F.Fragment,{children:[F.jsx(wl,{className:"w-9 h-9 text-sky-500 animate-pulse mb-0.5"}),F.jsxs("span",{className:"font-orbitron font-black text-3xl text-sky-500",children:[_,"%"]}),F.jsx("span",{className:"text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider",children:"ШАНС"})]})})]}),F.jsx("button",{onClick:Et,disabled:a||u<=0||u>s,className:`w-full max-w-[280px] mt-4 py-3.5 font-orbitron font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 btn-shimmer-sweep ${a?"bg-slate-700 text-slate-400 cursor-not-allowed opacity-80":V?"bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]":"bg-gradient-to-r from-sky-500 via-sky-600 to-blue-700 hover:from-sky-400 hover:to-blue-600 text-white shadow-[0_0_16px_rgba(2,132,199,0.35)]"}`,children:a?F.jsxs(F.Fragment,{children:[F.jsx(Hp,{className:"w-4 h-4 animate-spin"}),F.jsx("span",{children:"SPINNING..."})]}):V?F.jsxs(F.Fragment,{children:[F.jsx(Zv,{className:"w-4 h-4 text-slate-950"}),F.jsx("span",{children:"MEGA IMPROVE"})]}):F.jsxs(F.Fragment,{children:[F.jsx(wl,{className:"w-4 h-4"}),F.jsx("span",{children:"IMPROVE"})]})})]}),F.jsxs("div",{className:`lg:col-span-4 shadow-sm flex flex-col justify-between h-[390px] transition-all duration-300 ${Be?"bg-[#0d1527]":"bg-white"} ${V?"shadow-[0_0_25px_rgba(245,158,11,0.2)]":""}`,children:[F.jsx("div",{className:`h-1 w-full transition-all duration-300 ${V?"bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500":"bg-gradient-to-r from-emerald-500 to-teal-500"}`}),F.jsxs("div",{className:"p-5 flex-1 flex flex-col justify-between",children:[F.jsxs("div",{children:[F.jsxs("div",{className:"flex items-center justify-between pb-2 border-b border-slate-500/10",children:[F.jsxs("div",{className:"flex items-center gap-1.5",children:[F.jsx(Gp,{className:`w-4 h-4 ${V?"text-amber-400":"text-emerald-400"}`}),F.jsx("span",{className:"text-xs font-orbitron font-black uppercase tracking-wider",children:"ВЫИГРЫШ"})]}),F.jsxs("div",{className:`text-[11px] font-mono font-black px-2 py-0.5 ${V?"bg-amber-500/20 text-amber-300":"bg-emerald-500/15 text-emerald-400"}`,children:["x",h.toFixed(2)]})]}),F.jsxs("div",{className:"my-4 text-center",children:[F.jsx("span",{className:"text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1",children:"ВОЗМОЖНЫЙ ВЫИГРЫШ"}),F.jsxs("div",{className:"flex items-center justify-center gap-2",children:[F.jsxs("span",{className:`font-orbitron font-black text-3xl tracking-tight transition-all ${V?"bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(251,191,36,0.85)]":"text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]"}`,children:["+",ce.toLocaleString()]}),F.jsx(ci,{className:"w-6 h-6"})]}),F.jsxs("div",{className:"mt-1 flex items-center justify-center gap-1.5",children:[F.jsx("span",{className:"text-[10px] font-mono font-bold text-slate-400",children:"ПРИБЫЛЬ:"}),F.jsxs("span",{className:`text-[11px] font-orbitron font-black ${V?"text-amber-400":"text-emerald-400"}`,children:["+",he.toLocaleString()]}),F.jsx(ci,{className:"w-3.5 h-3.5"})]})]})]}),F.jsxs("div",{className:"space-y-2.5",children:[F.jsxs("div",{className:"space-y-1",children:[F.jsxs("div",{className:"flex justify-between items-center text-[10px] font-orbitron font-black text-slate-400 uppercase",children:[F.jsx("span",{children:"Шанс победы:"}),F.jsx("span",{className:"text-sky-400",children:"МАКС: 90%"})]}),F.jsxs("div",{className:"relative",children:[F.jsx("input",{type:"number",min:"1",max:"90",step:"0.1",value:_,onChange:we=>b(we.target.value),disabled:a,className:`w-full px-4 py-2 font-orbitron font-black text-sm outline-none transition-all ${Be?"bg-[#15203b] text-white focus:bg-[#1a294d]":"bg-sky-50 text-slate-900 focus:bg-sky-100"} ${V?"ring-1 ring-amber-400/50":"focus:ring-1 focus:ring-sky-500"}`}),F.jsx("span",{className:"absolute right-3.5 top-2 text-xs font-mono font-black text-sky-400",children:"%"})]})]}),F.jsx("div",{className:"grid grid-cols-4 gap-1",children:j.map(we=>{const be=Math.abs(parseFloat(_)-we.chance)<.5;return F.jsx("button",{disabled:a,onClick:()=>L(we),className:`py-1.5 text-xs font-orbitron font-black shadow-sm transition-all active:scale-95 ${be?V?"bg-amber-500 text-slate-950 shadow-md font-black":"bg-sky-600 text-white shadow-md":Be?"bg-[#15203b] hover:bg-[#1f3058] text-slate-200":"bg-sky-50 text-slate-800 hover:bg-sky-100"}`,children:we.label},we.label)})})]})]})]})]})}),F.jsx("aside",{className:`w-64 shrink-0 h-full p-4 flex flex-col justify-between ${Be?"bg-[#0a1122]":"bg-white"} shadow-sm z-20`,children:F.jsxs("div",{children:[F.jsxs("div",{className:"pb-3 mb-2 flex items-center justify-between border-b border-rose-500/10",children:[F.jsxs("div",{className:"flex items-center gap-1.5",children:[F.jsx(Tu,{className:"w-4 h-4 text-rose-500"}),F.jsx("span",{className:"text-xs font-orbitron font-black text-rose-500 uppercase tracking-wider",children:"LOSE"})]}),F.jsx("span",{className:"text-[10px] font-mono font-bold text-rose-500/70",children:k.length})]}),F.jsx("div",{className:"overflow-y-auto max-h-[calc(100vh-160px)] space-y-2 pr-1",children:k.length===0?F.jsxs("div",{className:"text-[11px] font-rajdhani text-slate-400 italic py-6 text-center flex flex-col items-center gap-1",children:[F.jsx(Tu,{className:"w-5 h-5 text-slate-500 opacity-40 mb-1"}),F.jsx("span",{children:"Пока нет проигрышей"})]}):k.map(we=>{const be=we.bet>=1e4;return F.jsxs("div",{className:`p-2.5 shadow-sm flex items-center justify-between transition-all duration-200 hover:translate-x-1 animate-item-entry ${be?Be?"bg-gradient-to-r from-rose-950/80 via-[#1e111a] to-red-900/50 shadow-[0_0_12px_rgba(244,63,94,0.3)]":"bg-gradient-to-r from-rose-100 to-red-100 shadow-[0_0_10px_rgba(244,63,94,0.2)]":Be?"bg-[#121c35] hover:bg-[#162343]":"bg-rose-50/80 hover:bg-rose-100/80"}`,children:[F.jsxs("div",{children:[F.jsx("div",{className:"text-xs font-orbitron font-black truncate max-w-[100px]",children:we.user}),F.jsxs("div",{className:"text-[10px] font-rajdhani text-slate-400 flex items-center gap-1.5 mt-0.5",children:[F.jsx("span",{children:we.time}),F.jsx("span",{children:"•"}),F.jsxs("span",{className:"text-slate-400 font-mono font-bold",children:["x",we.mult.toFixed(2)]})]})]}),F.jsxs("div",{className:"flex items-center gap-1",children:[F.jsxs("span",{className:`text-xs font-orbitron font-black ${be?"bg-gradient-to-r from-rose-400 via-red-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]":"text-rose-500"}`,children:["-",we.bet.toLocaleString()]}),F.jsx(ci,{className:"w-3.5 h-3.5"})]})]},we.id)})})]})})]})}function n_({activeTab:s,setActiveTab:e,user:n,onOpenAuthModal:r,userBalance:a,onAddCoins:l,theme:u,onToggleTheme:f,isSpinning:h=!1}){const m=u==="dark";return F.jsx("header",{className:`sticky top-0 z-40 w-full backdrop-blur-xl shadow-sm transition-colors ${m?"bg-[#060b17]/95 text-white":"bg-white/95 text-slate-900"}`,children:F.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between",children:[F.jsxs("div",{onClick:()=>!h&&e("main"),className:`flex items-center gap-3 select-none ${h?"cursor-not-allowed opacity-70":"cursor-pointer"}`,children:[F.jsx("div",{className:"w-10 h-10 bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center font-orbitron font-black text-white text-sm shadow-sm",children:"LG"}),F.jsx("span",{className:"font-orbitron font-black text-xl sm:text-2xl tracking-wider",children:"ECONOMY"})]}),F.jsxs("nav",{className:`flex items-center gap-2 p-1.5 shadow-inner ${m?"bg-[#0f172a]":"bg-sky-50"}`,children:[F.jsxs("button",{onClick:()=>!h&&e("main"),disabled:h,title:h?"Дождитесь окончания прокрута":"Главная",className:`px-6 py-2.5 text-xs font-orbitron font-black transition-all flex items-center gap-2 ${s==="main"?"bg-sky-600 text-white shadow-sm":h?"opacity-40 cursor-not-allowed text-slate-500":m?"text-slate-300 hover:text-white hover:bg-[#1e293b]":"text-slate-700 hover:text-sky-600 hover:bg-white"}`,children:[F.jsx(Gv,{className:"w-4 h-4"}),F.jsx("span",{children:"ГЛАВНАЯ"})]}),F.jsxs("button",{onClick:()=>e("upgrader"),className:`px-6 py-2.5 text-xs font-orbitron font-black transition-all flex items-center gap-2 ${s==="upgrader"?"bg-sky-600 text-white shadow-sm":m?"text-slate-300 hover:text-white hover:bg-[#1e293b]":"text-slate-700 hover:text-sky-600 hover:bg-white"}`,children:[F.jsx(wl,{className:"w-4 h-4"}),F.jsx("span",{children:"UPGRADER"})]}),F.jsx("button",{onClick:()=>e("leaderboard"),className:`px-6 py-2.5 text-xs font-orbitron font-black transition-all flex items-center gap-2 ${s==="leaderboard"?"bg-sky-600 text-white shadow-sm":m?"text-slate-300 hover:text-white hover:bg-[#1e293b]":"text-slate-700 hover:text-sky-600 hover:bg-white"}`,children:F.jsx("span",{children:"LEADERBOARD"})}),F.jsx("button",{onClick:()=>e("pay"),className:`px-6 py-2.5 text-xs font-orbitron font-black transition-all flex items-center gap-2 ${s==="pay"?"bg-sky-600 text-white shadow-sm":m?"text-slate-300 hover:text-white hover:bg-[#1e293b]":"text-slate-700 hover:text-sky-600 hover:bg-white"}`,children:F.jsx("span",{children:"PAY"})})]}),F.jsxs("div",{className:"flex items-center gap-3",children:[F.jsxs("div",{className:`flex items-center gap-1.5 px-4 py-2 font-orbitron text-xs font-black shadow-sm ${m?"bg-[#0f172a] text-slate-100":"bg-sky-50 text-slate-800"}`,children:[F.jsx("span",{children:"БАЛАНС:"}),F.jsx(ug,{value:a,className:"text-sky-500 text-sm font-black"}),F.jsx(ci,{className:"w-4 h-4 ml-0.5"}),!n&&F.jsxs("button",{onClick:l,className:"ml-2 px-2 py-0.5 bg-sky-600 hover:bg-sky-700 text-white font-mono text-[10px] font-black shadow-sm transition-transform active:scale-90 flex items-center gap-1",title:"Добавить +25,000 для тестов",children:[F.jsx(Xv,{className:"w-3 h-3"}),F.jsx("span",{children:"25K"})]})]}),F.jsx("button",{onClick:f,className:`p-2.5 shadow-sm transition-colors ${m?"bg-[#0f172a] text-amber-400 hover:bg-[#1e293b]":"bg-sky-50 text-slate-700 hover:bg-sky-100 hover:text-slate-900"}`,title:m?"Включить светлую тему":"Включить темную тему",children:m?F.jsx(qv,{className:"w-4 h-4"}):F.jsx(jv,{className:"w-4 h-4"})}),n?F.jsxs("button",{onClick:r,className:`flex items-center gap-2.5 px-4 py-2 shadow-sm hover:shadow-md transition-all ${m?"bg-[#0f172a]":"bg-white"}`,children:[F.jsx("img",{src:n.avatar,alt:n.username,className:"w-8 h-8 shadow-sm"}),F.jsx("span",{className:"font-orbitron font-black text-xs truncate max-w-[120px]",children:n.username})]}):F.jsxs("button",{onClick:r,className:"discord-chamfer-btn flex items-center gap-2.5 px-5 py-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-orbitron font-black text-xs transition-all shadow-md active:scale-95",children:[F.jsx("svg",{className:"w-4 h-4 fill-current shrink-0",viewBox:"0 0 127.14 96.36",children:F.jsx("path",{d:"M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"})}),F.jsx("span",{children:"Войти"})]})]})]})})}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jf="170",i_=0,Wp=1,r_=2,dg=1,s_=2,zi=3,Mr=0,Rn=1,Bi=2,yr=0,Zr=1,of=2,jp=3,Xp=4,o_=5,$r=100,a_=101,l_=102,c_=103,u_=104,f_=200,d_=201,h_=202,p_=203,af=204,lf=205,m_=206,g_=207,v_=208,__=209,x_=210,y_=211,S_=212,M_=213,E_=214,cf=0,uf=1,ff=2,Hs=3,df=4,hf=5,pf=6,mf=7,hg=0,w_=1,T_=2,Sr=0,A_=1,C_=2,b_=3,R_=4,P_=5,L_=6,N_=7,pg=300,Gs=301,Ws=302,gf=303,vf=304,Fl=306,_f=1e3,Yr=1001,xf=1002,di=1003,D_=1004,Ja=1005,yi=1006,Cu=1007,Kr=1008,Wi=1009,mg=1010,gg=1011,Bo=1012,ed=1013,Qr=1014,Vi=1015,Vo=1016,td=1017,nd=1018,js=1020,vg=35902,_g=1021,xg=1022,fi=1023,yg=1024,Sg=1025,Bs=1026,Xs=1027,Mg=1028,id=1029,Eg=1030,rd=1031,sd=1033,Tl=33776,Al=33777,Cl=33778,bl=33779,yf=35840,Sf=35841,Mf=35842,Ef=35843,wf=36196,Tf=37492,Af=37496,Cf=37808,bf=37809,Rf=37810,Pf=37811,Lf=37812,Nf=37813,Df=37814,If=37815,Uf=37816,Ff=37817,Of=37818,kf=37819,zf=37820,Bf=37821,Rl=36492,Vf=36494,Hf=36495,wg=36283,Gf=36284,Wf=36285,jf=36286,I_=3200,U_=3201,F_=0,O_=1,xr="",Yn="srgb",qs="srgb-linear",Ol="linear",Lt="srgb",Ts=7680,$p=519,k_=512,z_=513,B_=514,Tg=515,V_=516,H_=517,G_=518,W_=519,qp=35044,Yp="300 es",Hi=2e3,Ll=2001;class Ys{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(n)===-1&&r[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const l=a.indexOf(n);l!==-1&&a.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let l=0,u=a.length;l<u;l++)a[l].call(this,e);e.target=null}}}const fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],bu=Math.PI/180,Xf=180/Math.PI;function Ho(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(fn[s&255]+fn[s>>8&255]+fn[s>>16&255]+fn[s>>24&255]+"-"+fn[e&255]+fn[e>>8&255]+"-"+fn[e>>16&15|64]+fn[e>>24&255]+"-"+fn[n&63|128]+fn[n>>8&255]+"-"+fn[n>>16&255]+fn[n>>24&255]+fn[r&255]+fn[r>>8&255]+fn[r>>16&255]+fn[r>>24&255]).toLowerCase()}function hn(s,e,n){return Math.max(e,Math.min(n,s))}function j_(s,e){return(s%e+e)%e}function Ru(s,e,n){return(1-n)*s+n*e}function Lo(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function bn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class At{constructor(e=0,n=0){At.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,r=this.y,a=e.elements;return this.x=a[0]*n+a[3]*r+a[6],this.y=a[1]*n+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(n,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(hn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y;return n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const r=Math.cos(n),a=Math.sin(n),l=this.x-e.x,u=this.y-e.y;return this.x=l*r-u*a+e.x,this.y=l*a+u*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ht{constructor(e,n,r,a,l,u,f,h,m){ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,r,a,l,u,f,h,m)}set(e,n,r,a,l,u,f,h,m){const _=this.elements;return _[0]=e,_[1]=a,_[2]=f,_[3]=n,_[4]=l,_[5]=h,_[6]=r,_[7]=u,_[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],this}extractBasis(e,n,r){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,l=this.elements,u=r[0],f=r[3],h=r[6],m=r[1],_=r[4],y=r[7],v=r[2],S=r[5],E=r[8],A=a[0],x=a[3],g=a[6],P=a[1],N=a[4],C=a[7],K=a[2],k=a[5],O=a[8];return l[0]=u*A+f*P+h*K,l[3]=u*x+f*N+h*k,l[6]=u*g+f*C+h*O,l[1]=m*A+_*P+y*K,l[4]=m*x+_*N+y*k,l[7]=m*g+_*C+y*O,l[2]=v*A+S*P+E*K,l[5]=v*x+S*N+E*k,l[8]=v*g+S*C+E*O,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[1],a=e[2],l=e[3],u=e[4],f=e[5],h=e[6],m=e[7],_=e[8];return n*u*_-n*f*m-r*l*_+r*f*h+a*l*m-a*u*h}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],l=e[3],u=e[4],f=e[5],h=e[6],m=e[7],_=e[8],y=_*u-f*m,v=f*h-_*l,S=m*l-u*h,E=n*y+r*v+a*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/E;return e[0]=y*A,e[1]=(a*m-_*r)*A,e[2]=(f*r-a*u)*A,e[3]=v*A,e[4]=(_*n-a*h)*A,e[5]=(a*l-f*n)*A,e[6]=S*A,e[7]=(r*h-m*n)*A,e[8]=(u*n-r*l)*A,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,r,a,l,u,f){const h=Math.cos(l),m=Math.sin(l);return this.set(r*h,r*m,-r*(h*u+m*f)+u+e,-a*m,a*h,-a*(-m*u+h*f)+f+n,0,0,1),this}scale(e,n){return this.premultiply(Pu.makeScale(e,n)),this}rotate(e){return this.premultiply(Pu.makeRotation(-e)),this}translate(e,n){return this.premultiply(Pu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,r,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<9;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<9;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pu=new ht;function Ag(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Nl(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function X_(){const s=Nl("canvas");return s.style.display="block",s}const Kp={};function Oo(s){s in Kp||(Kp[s]=!0,console.warn(s))}function $_(s,e,n){return new Promise(function(r,a){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(l,n);break;default:r()}}setTimeout(l,n)})}function q_(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Y_(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Mt={enabled:!0,workingColorSpace:qs,spaces:{},convert:function(s,e,n){return this.enabled===!1||e===n||!e||!n||(this.spaces[e].transfer===Lt&&(s.r=Gi(s.r),s.g=Gi(s.g),s.b=Gi(s.b)),this.spaces[e].primaries!==this.spaces[n].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===Lt&&(s.r=Vs(s.r),s.g=Vs(s.g),s.b=Vs(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===xr?Ol:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,n){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Gi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Vs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Zp=[.64,.33,.3,.6,.15,.06],Qp=[.2126,.7152,.0722],Jp=[.3127,.329],em=new ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tm=new ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Mt.define({[qs]:{primaries:Zp,whitePoint:Jp,transfer:Ol,toXYZ:em,fromXYZ:tm,luminanceCoefficients:Qp,workingColorSpaceConfig:{unpackColorSpace:Yn},outputColorSpaceConfig:{drawingBufferColorSpace:Yn}},[Yn]:{primaries:Zp,whitePoint:Jp,transfer:Lt,toXYZ:em,fromXYZ:tm,luminanceCoefficients:Qp,outputColorSpaceConfig:{drawingBufferColorSpace:Yn}}});let As;class K_{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{As===void 0&&(As=Nl("canvas")),As.width=e.width,As.height=e.height;const r=As.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=As}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Nl("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),l=a.data;for(let u=0;u<l.length;u++)l[u]=Gi(l[u]/255)*255;return r.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let r=0;r<n.length;r++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[r]=Math.floor(Gi(n[r]/255)*255):n[r]=Gi(n[r]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Z_=0;class Cg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Z_++}),this.uuid=Ho(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let l;if(Array.isArray(a)){l=[];for(let u=0,f=a.length;u<f;u++)a[u].isDataTexture?l.push(Lu(a[u].image)):l.push(Lu(a[u]))}else l=Lu(a);r.url=l}return n||(e.images[this.uuid]=r),r}}function Lu(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?K_.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Q_=0;class Pn extends Ys{constructor(e=Pn.DEFAULT_IMAGE,n=Pn.DEFAULT_MAPPING,r=Yr,a=Yr,l=yi,u=Kr,f=fi,h=Wi,m=Pn.DEFAULT_ANISOTROPY,_=xr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Q_++}),this.uuid=Ho(),this.name="",this.source=new Cg(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=l,this.minFilter=u,this.anisotropy=m,this.format=f,this.internalFormat=null,this.type=h,this.offset=new At(0,0),this.repeat=new At(1,1),this.center=new At(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),n||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _f:e.x=e.x-Math.floor(e.x);break;case Yr:e.x=e.x<0?0:1;break;case xf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _f:e.y=e.y-Math.floor(e.y);break;case Yr:e.y=e.y<0?0:1;break;case xf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pn.DEFAULT_IMAGE=null;Pn.DEFAULT_MAPPING=pg;Pn.DEFAULT_ANISOTROPY=1;class Gt{constructor(e=0,n=0,r=0,a=1){Gt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,r,a){return this.x=e,this.y=n,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,l=this.w,u=e.elements;return this.x=u[0]*n+u[4]*r+u[8]*a+u[12]*l,this.y=u[1]*n+u[5]*r+u[9]*a+u[13]*l,this.z=u[2]*n+u[6]*r+u[10]*a+u[14]*l,this.w=u[3]*n+u[7]*r+u[11]*a+u[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,r,a,l;const h=e.elements,m=h[0],_=h[4],y=h[8],v=h[1],S=h[5],E=h[9],A=h[2],x=h[6],g=h[10];if(Math.abs(_-v)<.01&&Math.abs(y-A)<.01&&Math.abs(E-x)<.01){if(Math.abs(_+v)<.1&&Math.abs(y+A)<.1&&Math.abs(E+x)<.1&&Math.abs(m+S+g-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const N=(m+1)/2,C=(S+1)/2,K=(g+1)/2,k=(_+v)/4,O=(y+A)/4,j=(E+x)/4;return N>C&&N>K?N<.01?(r=0,a=.707106781,l=.707106781):(r=Math.sqrt(N),a=k/r,l=O/r):C>K?C<.01?(r=.707106781,a=0,l=.707106781):(a=Math.sqrt(C),r=k/a,l=j/a):K<.01?(r=.707106781,a=.707106781,l=0):(l=Math.sqrt(K),r=O/l,a=j/l),this.set(r,a,l,n),this}let P=Math.sqrt((x-E)*(x-E)+(y-A)*(y-A)+(v-_)*(v-_));return Math.abs(P)<.001&&(P=1),this.x=(x-E)/P,this.y=(y-A)/P,this.z=(v-_)/P,this.w=Math.acos((m+S+g-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(n,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this.w=e.w+(n.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class J_ extends Ys{constructor(e=1,n=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Gt(0,0,e,n),this.scissorTest=!1,this.viewport=new Gt(0,0,e,n);const a={width:e,height:n,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const l=new Pn(a,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);l.flipY=!1,l.generateMipmaps=r.generateMipmaps,l.internalFormat=r.internalFormat,this.textures=[];const u=r.count;for(let f=0;f<u;f++)this.textures[f]=l.clone(),this.textures[f].isRenderTargetTexture=!0;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,r=1){if(this.width!==e||this.height!==n||this.depth!==r){this.width=e,this.height=n,this.depth=r;for(let a=0,l=this.textures.length;a<l;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=r;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,a=e.textures.length;r<a;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Cg(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jr extends J_{constructor(e=1,n=1,r={}){super(e,n,r),this.isWebGLRenderTarget=!0}}class bg extends Pn{constructor(e=null,n=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=di,this.minFilter=di,this.wrapR=Yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ex extends Pn{constructor(e=null,n=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=di,this.minFilter=di,this.wrapR=Yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Go{constructor(e=0,n=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=r,this._w=a}static slerpFlat(e,n,r,a,l,u,f){let h=r[a+0],m=r[a+1],_=r[a+2],y=r[a+3];const v=l[u+0],S=l[u+1],E=l[u+2],A=l[u+3];if(f===0){e[n+0]=h,e[n+1]=m,e[n+2]=_,e[n+3]=y;return}if(f===1){e[n+0]=v,e[n+1]=S,e[n+2]=E,e[n+3]=A;return}if(y!==A||h!==v||m!==S||_!==E){let x=1-f;const g=h*v+m*S+_*E+y*A,P=g>=0?1:-1,N=1-g*g;if(N>Number.EPSILON){const K=Math.sqrt(N),k=Math.atan2(K,g*P);x=Math.sin(x*k)/K,f=Math.sin(f*k)/K}const C=f*P;if(h=h*x+v*C,m=m*x+S*C,_=_*x+E*C,y=y*x+A*C,x===1-f){const K=1/Math.sqrt(h*h+m*m+_*_+y*y);h*=K,m*=K,_*=K,y*=K}}e[n]=h,e[n+1]=m,e[n+2]=_,e[n+3]=y}static multiplyQuaternionsFlat(e,n,r,a,l,u){const f=r[a],h=r[a+1],m=r[a+2],_=r[a+3],y=l[u],v=l[u+1],S=l[u+2],E=l[u+3];return e[n]=f*E+_*y+h*S-m*v,e[n+1]=h*E+_*v+m*y-f*S,e[n+2]=m*E+_*S+f*v-h*y,e[n+3]=_*E-f*y-h*v-m*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,r,a){return this._x=e,this._y=n,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const r=e._x,a=e._y,l=e._z,u=e._order,f=Math.cos,h=Math.sin,m=f(r/2),_=f(a/2),y=f(l/2),v=h(r/2),S=h(a/2),E=h(l/2);switch(u){case"XYZ":this._x=v*_*y+m*S*E,this._y=m*S*y-v*_*E,this._z=m*_*E+v*S*y,this._w=m*_*y-v*S*E;break;case"YXZ":this._x=v*_*y+m*S*E,this._y=m*S*y-v*_*E,this._z=m*_*E-v*S*y,this._w=m*_*y+v*S*E;break;case"ZXY":this._x=v*_*y-m*S*E,this._y=m*S*y+v*_*E,this._z=m*_*E+v*S*y,this._w=m*_*y-v*S*E;break;case"ZYX":this._x=v*_*y-m*S*E,this._y=m*S*y+v*_*E,this._z=m*_*E-v*S*y,this._w=m*_*y+v*S*E;break;case"YZX":this._x=v*_*y+m*S*E,this._y=m*S*y+v*_*E,this._z=m*_*E-v*S*y,this._w=m*_*y-v*S*E;break;case"XZY":this._x=v*_*y-m*S*E,this._y=m*S*y-v*_*E,this._z=m*_*E+v*S*y,this._w=m*_*y+v*S*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const r=n/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,r=n[0],a=n[4],l=n[8],u=n[1],f=n[5],h=n[9],m=n[2],_=n[6],y=n[10],v=r+f+y;if(v>0){const S=.5/Math.sqrt(v+1);this._w=.25/S,this._x=(_-h)*S,this._y=(l-m)*S,this._z=(u-a)*S}else if(r>f&&r>y){const S=2*Math.sqrt(1+r-f-y);this._w=(_-h)/S,this._x=.25*S,this._y=(a+u)/S,this._z=(l+m)/S}else if(f>y){const S=2*Math.sqrt(1+f-r-y);this._w=(l-m)/S,this._x=(a+u)/S,this._y=.25*S,this._z=(h+_)/S}else{const S=2*Math.sqrt(1+y-r-f);this._w=(u-a)/S,this._x=(l+m)/S,this._y=(h+_)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let r=e.dot(n)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(hn(this.dot(e),-1,1)))}rotateTowards(e,n){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,n/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const r=e._x,a=e._y,l=e._z,u=e._w,f=n._x,h=n._y,m=n._z,_=n._w;return this._x=r*_+u*f+a*m-l*h,this._y=a*_+u*h+l*f-r*m,this._z=l*_+u*m+r*h-a*f,this._w=u*_-r*f-a*h-l*m,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const r=this._x,a=this._y,l=this._z,u=this._w;let f=u*e._w+r*e._x+a*e._y+l*e._z;if(f<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,f=-f):this.copy(e),f>=1)return this._w=u,this._x=r,this._y=a,this._z=l,this;const h=1-f*f;if(h<=Number.EPSILON){const S=1-n;return this._w=S*u+n*this._w,this._x=S*r+n*this._x,this._y=S*a+n*this._y,this._z=S*l+n*this._z,this.normalize(),this}const m=Math.sqrt(h),_=Math.atan2(m,f),y=Math.sin((1-n)*_)/m,v=Math.sin(n*_)/m;return this._w=u*y+this._w*v,this._x=r*y+this._x*v,this._y=a*y+this._y*v,this._z=l*y+this._z*v,this._onChangeCallback(),this}slerpQuaternions(e,n,r){return this.copy(e).slerp(n,r)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),l*Math.sin(n),l*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(e=0,n=0,r=0){J.prototype.isVector3=!0,this.x=e,this.y=n,this.z=r}set(e,n,r){return r===void 0&&(r=this.z),this.x=e,this.y=n,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(nm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(nm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*n+l[3]*r+l[6]*a,this.y=l[1]*n+l[4]*r+l[7]*a,this.z=l[2]*n+l[5]*r+l[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,l=e.elements,u=1/(l[3]*n+l[7]*r+l[11]*a+l[15]);return this.x=(l[0]*n+l[4]*r+l[8]*a+l[12])*u,this.y=(l[1]*n+l[5]*r+l[9]*a+l[13])*u,this.z=(l[2]*n+l[6]*r+l[10]*a+l[14])*u,this}applyQuaternion(e){const n=this.x,r=this.y,a=this.z,l=e.x,u=e.y,f=e.z,h=e.w,m=2*(u*a-f*r),_=2*(f*n-l*a),y=2*(l*r-u*n);return this.x=n+h*m+u*y-f*_,this.y=r+h*_+f*m-l*y,this.z=a+h*y+l*_-u*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*n+l[4]*r+l[8]*a,this.y=l[1]*n+l[5]*r+l[9]*a,this.z=l[2]*n+l[6]*r+l[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(n,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const r=e.x,a=e.y,l=e.z,u=n.x,f=n.y,h=n.z;return this.x=a*h-l*f,this.y=l*u-r*h,this.z=r*f-a*u,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const r=e.dot(this)/n;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Nu.copy(this).projectOnVector(e),this.sub(Nu)}reflect(e){return this.sub(Nu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(hn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return n*n+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,r){const a=Math.sin(n)*e;return this.x=a*Math.sin(r),this.y=Math.cos(n)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,r){return this.x=e*Math.sin(n),this.y=r,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=r,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,r=Math.sqrt(1-n*n);return this.x=r*Math.cos(e),this.y=n,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Nu=new J,nm=new Go;class Wo{constructor(e=new J(1/0,1/0,1/0),n=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n+=3)this.expandByPoint(oi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,r=e.count;n<r;n++)this.expandByPoint(oi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const r=oi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(n===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let u=0,f=l.count;u<f;u++)e.isMesh===!0?e.getVertexPosition(u,oi):oi.fromBufferAttribute(l,u),oi.applyMatrix4(e.matrixWorld),this.expandByPoint(oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),el.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),el.copy(r.boundingBox)),el.applyMatrix4(e.matrixWorld),this.union(el)}const a=e.children;for(let l=0,u=a.length;l<u;l++)this.expandByObject(a[l],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,oi),oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,r;return e.normal.x>0?(n=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),n<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(No),tl.subVectors(this.max,No),Cs.subVectors(e.a,No),bs.subVectors(e.b,No),Rs.subVectors(e.c,No),hr.subVectors(bs,Cs),pr.subVectors(Rs,bs),zr.subVectors(Cs,Rs);let n=[0,-hr.z,hr.y,0,-pr.z,pr.y,0,-zr.z,zr.y,hr.z,0,-hr.x,pr.z,0,-pr.x,zr.z,0,-zr.x,-hr.y,hr.x,0,-pr.y,pr.x,0,-zr.y,zr.x,0];return!Du(n,Cs,bs,Rs,tl)||(n=[1,0,0,0,1,0,0,0,1],!Du(n,Cs,bs,Rs,tl))?!1:(nl.crossVectors(hr,pr),n=[nl.x,nl.y,nl.z],Du(n,Cs,bs,Rs,tl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ii=[new J,new J,new J,new J,new J,new J,new J,new J],oi=new J,el=new Wo,Cs=new J,bs=new J,Rs=new J,hr=new J,pr=new J,zr=new J,No=new J,tl=new J,nl=new J,Br=new J;function Du(s,e,n,r,a){for(let l=0,u=s.length-3;l<=u;l+=3){Br.fromArray(s,l);const f=a.x*Math.abs(Br.x)+a.y*Math.abs(Br.y)+a.z*Math.abs(Br.z),h=e.dot(Br),m=n.dot(Br),_=r.dot(Br);if(Math.max(-Math.max(h,m,_),Math.min(h,m,_))>f)return!1}return!0}const tx=new Wo,Do=new J,Iu=new J;class jo{constructor(e=new J,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const r=this.center;n!==void 0?r.copy(n):tx.setFromPoints(e).getCenter(r);let a=0;for(let l=0,u=e.length;l<u;l++)a=Math.max(a,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const r=this.center.distanceToSquared(e);return n.copy(e),r>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Do.subVectors(e,this.center);const n=Do.lengthSq();if(n>this.radius*this.radius){const r=Math.sqrt(n),a=(r-this.radius)*.5;this.center.addScaledVector(Do,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Iu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Do.copy(e.center).add(Iu)),this.expandByPoint(Do.copy(e.center).sub(Iu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ui=new J,Uu=new J,il=new J,mr=new J,Fu=new J,rl=new J,Ou=new J;class od{constructor(e=new J,n=new J(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ui)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const r=n.dot(this.direction);return r<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ui.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ui.copy(this.origin).addScaledVector(this.direction,n),Ui.distanceToSquared(e))}distanceSqToSegment(e,n,r,a){Uu.copy(e).add(n).multiplyScalar(.5),il.copy(n).sub(e).normalize(),mr.copy(this.origin).sub(Uu);const l=e.distanceTo(n)*.5,u=-this.direction.dot(il),f=mr.dot(this.direction),h=-mr.dot(il),m=mr.lengthSq(),_=Math.abs(1-u*u);let y,v,S,E;if(_>0)if(y=u*h-f,v=u*f-h,E=l*_,y>=0)if(v>=-E)if(v<=E){const A=1/_;y*=A,v*=A,S=y*(y+u*v+2*f)+v*(u*y+v+2*h)+m}else v=l,y=Math.max(0,-(u*v+f)),S=-y*y+v*(v+2*h)+m;else v=-l,y=Math.max(0,-(u*v+f)),S=-y*y+v*(v+2*h)+m;else v<=-E?(y=Math.max(0,-(-u*l+f)),v=y>0?-l:Math.min(Math.max(-l,-h),l),S=-y*y+v*(v+2*h)+m):v<=E?(y=0,v=Math.min(Math.max(-l,-h),l),S=v*(v+2*h)+m):(y=Math.max(0,-(u*l+f)),v=y>0?l:Math.min(Math.max(-l,-h),l),S=-y*y+v*(v+2*h)+m);else v=u>0?-l:l,y=Math.max(0,-(u*v+f)),S=-y*y+v*(v+2*h)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,y),a&&a.copy(Uu).addScaledVector(il,v),S}intersectSphere(e,n){Ui.subVectors(e.center,this.origin);const r=Ui.dot(this.direction),a=Ui.dot(Ui)-r*r,l=e.radius*e.radius;if(a>l)return null;const u=Math.sqrt(l-a),f=r-u,h=r+u;return h<0?null:f<0?this.at(h,n):this.at(f,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/n;return r>=0?r:null}intersectPlane(e,n){const r=this.distanceToPlane(e);return r===null?null:this.at(r,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let r,a,l,u,f,h;const m=1/this.direction.x,_=1/this.direction.y,y=1/this.direction.z,v=this.origin;return m>=0?(r=(e.min.x-v.x)*m,a=(e.max.x-v.x)*m):(r=(e.max.x-v.x)*m,a=(e.min.x-v.x)*m),_>=0?(l=(e.min.y-v.y)*_,u=(e.max.y-v.y)*_):(l=(e.max.y-v.y)*_,u=(e.min.y-v.y)*_),r>u||l>a||((l>r||isNaN(r))&&(r=l),(u<a||isNaN(a))&&(a=u),y>=0?(f=(e.min.z-v.z)*y,h=(e.max.z-v.z)*y):(f=(e.max.z-v.z)*y,h=(e.min.z-v.z)*y),r>h||f>a)||((f>r||r!==r)&&(r=f),(h<a||a!==a)&&(a=h),a<0)?null:this.at(r>=0?r:a,n)}intersectsBox(e){return this.intersectBox(e,Ui)!==null}intersectTriangle(e,n,r,a,l){Fu.subVectors(n,e),rl.subVectors(r,e),Ou.crossVectors(Fu,rl);let u=this.direction.dot(Ou),f;if(u>0){if(a)return null;f=1}else if(u<0)f=-1,u=-u;else return null;mr.subVectors(this.origin,e);const h=f*this.direction.dot(rl.crossVectors(mr,rl));if(h<0)return null;const m=f*this.direction.dot(Fu.cross(mr));if(m<0||h+m>u)return null;const _=-f*mr.dot(Ou);return _<0?null:this.at(_/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Bt{constructor(e,n,r,a,l,u,f,h,m,_,y,v,S,E,A,x){Bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,r,a,l,u,f,h,m,_,y,v,S,E,A,x)}set(e,n,r,a,l,u,f,h,m,_,y,v,S,E,A,x){const g=this.elements;return g[0]=e,g[4]=n,g[8]=r,g[12]=a,g[1]=l,g[5]=u,g[9]=f,g[13]=h,g[2]=m,g[6]=_,g[10]=y,g[14]=v,g[3]=S,g[7]=E,g[11]=A,g[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bt().fromArray(this.elements)}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],n[9]=r[9],n[10]=r[10],n[11]=r[11],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15],this}copyPosition(e){const n=this.elements,r=e.elements;return n[12]=r[12],n[13]=r[13],n[14]=r[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,r){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,n,r){return this.set(e.x,n.x,r.x,0,e.y,n.y,r.y,0,e.z,n.z,r.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,r=e.elements,a=1/Ps.setFromMatrixColumn(e,0).length(),l=1/Ps.setFromMatrixColumn(e,1).length(),u=1/Ps.setFromMatrixColumn(e,2).length();return n[0]=r[0]*a,n[1]=r[1]*a,n[2]=r[2]*a,n[3]=0,n[4]=r[4]*l,n[5]=r[5]*l,n[6]=r[6]*l,n[7]=0,n[8]=r[8]*u,n[9]=r[9]*u,n[10]=r[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,r=e.x,a=e.y,l=e.z,u=Math.cos(r),f=Math.sin(r),h=Math.cos(a),m=Math.sin(a),_=Math.cos(l),y=Math.sin(l);if(e.order==="XYZ"){const v=u*_,S=u*y,E=f*_,A=f*y;n[0]=h*_,n[4]=-h*y,n[8]=m,n[1]=S+E*m,n[5]=v-A*m,n[9]=-f*h,n[2]=A-v*m,n[6]=E+S*m,n[10]=u*h}else if(e.order==="YXZ"){const v=h*_,S=h*y,E=m*_,A=m*y;n[0]=v+A*f,n[4]=E*f-S,n[8]=u*m,n[1]=u*y,n[5]=u*_,n[9]=-f,n[2]=S*f-E,n[6]=A+v*f,n[10]=u*h}else if(e.order==="ZXY"){const v=h*_,S=h*y,E=m*_,A=m*y;n[0]=v-A*f,n[4]=-u*y,n[8]=E+S*f,n[1]=S+E*f,n[5]=u*_,n[9]=A-v*f,n[2]=-u*m,n[6]=f,n[10]=u*h}else if(e.order==="ZYX"){const v=u*_,S=u*y,E=f*_,A=f*y;n[0]=h*_,n[4]=E*m-S,n[8]=v*m+A,n[1]=h*y,n[5]=A*m+v,n[9]=S*m-E,n[2]=-m,n[6]=f*h,n[10]=u*h}else if(e.order==="YZX"){const v=u*h,S=u*m,E=f*h,A=f*m;n[0]=h*_,n[4]=A-v*y,n[8]=E*y+S,n[1]=y,n[5]=u*_,n[9]=-f*_,n[2]=-m*_,n[6]=S*y+E,n[10]=v-A*y}else if(e.order==="XZY"){const v=u*h,S=u*m,E=f*h,A=f*m;n[0]=h*_,n[4]=-y,n[8]=m*_,n[1]=v*y+A,n[5]=u*_,n[9]=S*y-E,n[2]=E*y-S,n[6]=f*_,n[10]=A*y+v}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(nx,e,ix)}lookAt(e,n,r){const a=this.elements;return Fn.subVectors(e,n),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),gr.crossVectors(r,Fn),gr.lengthSq()===0&&(Math.abs(r.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),gr.crossVectors(r,Fn)),gr.normalize(),sl.crossVectors(Fn,gr),a[0]=gr.x,a[4]=sl.x,a[8]=Fn.x,a[1]=gr.y,a[5]=sl.y,a[9]=Fn.y,a[2]=gr.z,a[6]=sl.z,a[10]=Fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,l=this.elements,u=r[0],f=r[4],h=r[8],m=r[12],_=r[1],y=r[5],v=r[9],S=r[13],E=r[2],A=r[6],x=r[10],g=r[14],P=r[3],N=r[7],C=r[11],K=r[15],k=a[0],O=a[4],j=a[8],L=a[12],b=a[1],G=a[5],ae=a[9],ie=a[13],pe=a[2],ve=a[6],ce=a[10],he=a[14],V=a[3],ue=a[7],D=a[11],M=a[15];return l[0]=u*k+f*b+h*pe+m*V,l[4]=u*O+f*G+h*ve+m*ue,l[8]=u*j+f*ae+h*ce+m*D,l[12]=u*L+f*ie+h*he+m*M,l[1]=_*k+y*b+v*pe+S*V,l[5]=_*O+y*G+v*ve+S*ue,l[9]=_*j+y*ae+v*ce+S*D,l[13]=_*L+y*ie+v*he+S*M,l[2]=E*k+A*b+x*pe+g*V,l[6]=E*O+A*G+x*ve+g*ue,l[10]=E*j+A*ae+x*ce+g*D,l[14]=E*L+A*ie+x*he+g*M,l[3]=P*k+N*b+C*pe+K*V,l[7]=P*O+N*G+C*ve+K*ue,l[11]=P*j+N*ae+C*ce+K*D,l[15]=P*L+N*ie+C*he+K*M,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[4],a=e[8],l=e[12],u=e[1],f=e[5],h=e[9],m=e[13],_=e[2],y=e[6],v=e[10],S=e[14],E=e[3],A=e[7],x=e[11],g=e[15];return E*(+l*h*y-a*m*y-l*f*v+r*m*v+a*f*S-r*h*S)+A*(+n*h*S-n*m*v+l*u*v-a*u*S+a*m*_-l*h*_)+x*(+n*m*y-n*f*S-l*u*y+r*u*S+l*f*_-r*m*_)+g*(-a*f*_-n*h*y+n*f*v+a*u*y-r*u*v+r*h*_)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=r),this}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],l=e[3],u=e[4],f=e[5],h=e[6],m=e[7],_=e[8],y=e[9],v=e[10],S=e[11],E=e[12],A=e[13],x=e[14],g=e[15],P=y*x*m-A*v*m+A*h*S-f*x*S-y*h*g+f*v*g,N=E*v*m-_*x*m-E*h*S+u*x*S+_*h*g-u*v*g,C=_*A*m-E*y*m+E*f*S-u*A*S-_*f*g+u*y*g,K=E*y*h-_*A*h-E*f*v+u*A*v+_*f*x-u*y*x,k=n*P+r*N+a*C+l*K;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/k;return e[0]=P*O,e[1]=(A*v*l-y*x*l-A*a*S+r*x*S+y*a*g-r*v*g)*O,e[2]=(f*x*l-A*h*l+A*a*m-r*x*m-f*a*g+r*h*g)*O,e[3]=(y*h*l-f*v*l-y*a*m+r*v*m+f*a*S-r*h*S)*O,e[4]=N*O,e[5]=(_*x*l-E*v*l+E*a*S-n*x*S-_*a*g+n*v*g)*O,e[6]=(E*h*l-u*x*l-E*a*m+n*x*m+u*a*g-n*h*g)*O,e[7]=(u*v*l-_*h*l+_*a*m-n*v*m-u*a*S+n*h*S)*O,e[8]=C*O,e[9]=(E*y*l-_*A*l-E*r*S+n*A*S+_*r*g-n*y*g)*O,e[10]=(u*A*l-E*f*l+E*r*m-n*A*m-u*r*g+n*f*g)*O,e[11]=(_*f*l-u*y*l-_*r*m+n*y*m+u*r*S-n*f*S)*O,e[12]=K*O,e[13]=(_*A*a-E*y*a+E*r*v-n*A*v-_*r*x+n*y*x)*O,e[14]=(E*f*a-u*A*a-E*r*h+n*A*h+u*r*x-n*f*x)*O,e[15]=(u*y*a-_*f*a+_*r*h-n*y*h-u*r*v+n*f*v)*O,this}scale(e){const n=this.elements,r=e.x,a=e.y,l=e.z;return n[0]*=r,n[4]*=a,n[8]*=l,n[1]*=r,n[5]*=a,n[9]*=l,n[2]*=r,n[6]*=a,n[10]*=l,n[3]*=r,n[7]*=a,n[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,r,a))}makeTranslation(e,n,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,r,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,n,-r,0,0,r,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,0,r,0,0,1,0,0,-r,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,0,r,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const r=Math.cos(n),a=Math.sin(n),l=1-r,u=e.x,f=e.y,h=e.z,m=l*u,_=l*f;return this.set(m*u+r,m*f-a*h,m*h+a*f,0,m*f+a*h,_*f+r,_*h-a*u,0,m*h-a*f,_*h+a*u,l*h*h+r,0,0,0,0,1),this}makeScale(e,n,r){return this.set(e,0,0,0,0,n,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,n,r,a,l,u){return this.set(1,r,l,0,e,1,u,0,n,a,1,0,0,0,0,1),this}compose(e,n,r){const a=this.elements,l=n._x,u=n._y,f=n._z,h=n._w,m=l+l,_=u+u,y=f+f,v=l*m,S=l*_,E=l*y,A=u*_,x=u*y,g=f*y,P=h*m,N=h*_,C=h*y,K=r.x,k=r.y,O=r.z;return a[0]=(1-(A+g))*K,a[1]=(S+C)*K,a[2]=(E-N)*K,a[3]=0,a[4]=(S-C)*k,a[5]=(1-(v+g))*k,a[6]=(x+P)*k,a[7]=0,a[8]=(E+N)*O,a[9]=(x-P)*O,a[10]=(1-(v+A))*O,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,r){const a=this.elements;let l=Ps.set(a[0],a[1],a[2]).length();const u=Ps.set(a[4],a[5],a[6]).length(),f=Ps.set(a[8],a[9],a[10]).length();this.determinant()<0&&(l=-l),e.x=a[12],e.y=a[13],e.z=a[14],ai.copy(this);const m=1/l,_=1/u,y=1/f;return ai.elements[0]*=m,ai.elements[1]*=m,ai.elements[2]*=m,ai.elements[4]*=_,ai.elements[5]*=_,ai.elements[6]*=_,ai.elements[8]*=y,ai.elements[9]*=y,ai.elements[10]*=y,n.setFromRotationMatrix(ai),r.x=l,r.y=u,r.z=f,this}makePerspective(e,n,r,a,l,u,f=Hi){const h=this.elements,m=2*l/(n-e),_=2*l/(r-a),y=(n+e)/(n-e),v=(r+a)/(r-a);let S,E;if(f===Hi)S=-(u+l)/(u-l),E=-2*u*l/(u-l);else if(f===Ll)S=-u/(u-l),E=-u*l/(u-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+f);return h[0]=m,h[4]=0,h[8]=y,h[12]=0,h[1]=0,h[5]=_,h[9]=v,h[13]=0,h[2]=0,h[6]=0,h[10]=S,h[14]=E,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,n,r,a,l,u,f=Hi){const h=this.elements,m=1/(n-e),_=1/(r-a),y=1/(u-l),v=(n+e)*m,S=(r+a)*_;let E,A;if(f===Hi)E=(u+l)*y,A=-2*y;else if(f===Ll)E=l*y,A=-1*y;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+f);return h[0]=2*m,h[4]=0,h[8]=0,h[12]=-v,h[1]=0,h[5]=2*_,h[9]=0,h[13]=-S,h[2]=0,h[6]=0,h[10]=A,h[14]=-E,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<16;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<16;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e[n+9]=r[9],e[n+10]=r[10],e[n+11]=r[11],e[n+12]=r[12],e[n+13]=r[13],e[n+14]=r[14],e[n+15]=r[15],e}}const Ps=new J,ai=new Bt,nx=new J(0,0,0),ix=new J(1,1,1),gr=new J,sl=new J,Fn=new J,im=new Bt,rm=new Go;class ji{constructor(e=0,n=0,r=0,a=ji.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,r,a=this._order){return this._x=e,this._y=n,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,r=!0){const a=e.elements,l=a[0],u=a[4],f=a[8],h=a[1],m=a[5],_=a[9],y=a[2],v=a[6],S=a[10];switch(n){case"XYZ":this._y=Math.asin(hn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-_,S),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(v,m),this._z=0);break;case"YXZ":this._x=Math.asin(-hn(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(f,S),this._z=Math.atan2(h,m)):(this._y=Math.atan2(-y,l),this._z=0);break;case"ZXY":this._x=Math.asin(hn(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-y,S),this._z=Math.atan2(-u,m)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-hn(y,-1,1)),Math.abs(y)<.9999999?(this._x=Math.atan2(v,S),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-u,m));break;case"YZX":this._z=Math.asin(hn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-_,m),this._y=Math.atan2(-y,l)):(this._x=0,this._y=Math.atan2(f,S));break;case"XZY":this._z=Math.asin(-hn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(v,m),this._y=Math.atan2(f,l)):(this._x=Math.atan2(-_,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,r){return im.makeRotationFromQuaternion(e),this.setFromRotationMatrix(im,n,r)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return rm.setFromEuler(this),this.setFromQuaternion(rm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ji.DEFAULT_ORDER="XYZ";class Rg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let rx=0;const sm=new J,Ls=new Go,Fi=new Bt,ol=new J,Io=new J,sx=new J,ox=new Go,om=new J(1,0,0),am=new J(0,1,0),lm=new J(0,0,1),cm={type:"added"},ax={type:"removed"},Ns={type:"childadded",child:null},ku={type:"childremoved",child:null};class xn extends Ys{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rx++}),this.uuid=Ho(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xn.DEFAULT_UP.clone();const e=new J,n=new ji,r=new Go,a=new J(1,1,1);function l(){r.setFromEuler(n,!1)}function u(){n.setFromQuaternion(r,void 0,!1)}n._onChange(l),r._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Bt},normalMatrix:{value:new ht}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=xn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.premultiply(Ls),this}rotateX(e){return this.rotateOnAxis(om,e)}rotateY(e){return this.rotateOnAxis(am,e)}rotateZ(e){return this.rotateOnAxis(lm,e)}translateOnAxis(e,n){return sm.copy(e).applyQuaternion(this.quaternion),this.position.add(sm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(om,e)}translateY(e){return this.translateOnAxis(am,e)}translateZ(e){return this.translateOnAxis(lm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fi.copy(this.matrixWorld).invert())}lookAt(e,n,r){e.isVector3?ol.copy(e):ol.set(e,n,r);const a=this.parent;this.updateWorldMatrix(!0,!1),Io.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fi.lookAt(Io,ol,this.up):Fi.lookAt(ol,Io,this.up),this.quaternion.setFromRotationMatrix(Fi),a&&(Fi.extractRotation(a.matrixWorld),Ls.setFromRotationMatrix(Fi),this.quaternion.premultiply(Ls.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cm),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(ax),ku.child=e,this.dispatchEvent(ku),ku.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cm),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let r=0,a=this.children.length;r<a;r++){const u=this.children[r].getObjectByProperty(e,n);if(u!==void 0)return u}}getObjectsByProperty(e,n,r=[]){this[e]===n&&r.push(this);const a=this.children;for(let l=0,u=a.length;l<u;l++)a[l].getObjectsByProperty(e,n,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Io,e,sx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Io,ox,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].updateMatrixWorld(e)}updateWorldMatrix(e,n){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const a=this.children;for(let l=0,u=a.length;l<u;l++)a[l].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",r={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(f=>({boxInitialized:f.boxInitialized,boxMin:f.box.min.toArray(),boxMax:f.box.max.toArray(),sphereInitialized:f.sphereInitialized,sphereRadius:f.sphere.radius,sphereCenter:f.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function l(f,h){return f[h.uuid]===void 0&&(f[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=l(e.geometries,this.geometry);const f=this.geometry.parameters;if(f!==void 0&&f.shapes!==void 0){const h=f.shapes;if(Array.isArray(h))for(let m=0,_=h.length;m<_;m++){const y=h[m];l(e.shapes,y)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const f=[];for(let h=0,m=this.material.length;h<m;h++)f.push(l(e.materials,this.material[h]));a.material=f}else a.material=l(e.materials,this.material);if(this.children.length>0){a.children=[];for(let f=0;f<this.children.length;f++)a.children.push(this.children[f].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let f=0;f<this.animations.length;f++){const h=this.animations[f];a.animations.push(l(e.animations,h))}}if(n){const f=u(e.geometries),h=u(e.materials),m=u(e.textures),_=u(e.images),y=u(e.shapes),v=u(e.skeletons),S=u(e.animations),E=u(e.nodes);f.length>0&&(r.geometries=f),h.length>0&&(r.materials=h),m.length>0&&(r.textures=m),_.length>0&&(r.images=_),y.length>0&&(r.shapes=y),v.length>0&&(r.skeletons=v),S.length>0&&(r.animations=S),E.length>0&&(r.nodes=E)}return r.object=a,r;function u(f){const h=[];for(const m in f){const _=f[m];delete _.metadata,h.push(_)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}xn.DEFAULT_UP=new J(0,1,0);xn.DEFAULT_MATRIX_AUTO_UPDATE=!0;xn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const li=new J,Oi=new J,zu=new J,ki=new J,Ds=new J,Is=new J,um=new J,Bu=new J,Vu=new J,Hu=new J,Gu=new Gt,Wu=new Gt,ju=new Gt;class ui{constructor(e=new J,n=new J,r=new J){this.a=e,this.b=n,this.c=r}static getNormal(e,n,r,a){a.subVectors(r,n),li.subVectors(e,n),a.cross(li);const l=a.lengthSq();return l>0?a.multiplyScalar(1/Math.sqrt(l)):a.set(0,0,0)}static getBarycoord(e,n,r,a,l){li.subVectors(a,n),Oi.subVectors(r,n),zu.subVectors(e,n);const u=li.dot(li),f=li.dot(Oi),h=li.dot(zu),m=Oi.dot(Oi),_=Oi.dot(zu),y=u*m-f*f;if(y===0)return l.set(0,0,0),null;const v=1/y,S=(m*h-f*_)*v,E=(u*_-f*h)*v;return l.set(1-S-E,E,S)}static containsPoint(e,n,r,a){return this.getBarycoord(e,n,r,a,ki)===null?!1:ki.x>=0&&ki.y>=0&&ki.x+ki.y<=1}static getInterpolation(e,n,r,a,l,u,f,h){return this.getBarycoord(e,n,r,a,ki)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,ki.x),h.addScaledVector(u,ki.y),h.addScaledVector(f,ki.z),h)}static getInterpolatedAttribute(e,n,r,a,l,u){return Gu.setScalar(0),Wu.setScalar(0),ju.setScalar(0),Gu.fromBufferAttribute(e,n),Wu.fromBufferAttribute(e,r),ju.fromBufferAttribute(e,a),u.setScalar(0),u.addScaledVector(Gu,l.x),u.addScaledVector(Wu,l.y),u.addScaledVector(ju,l.z),u}static isFrontFacing(e,n,r,a){return li.subVectors(r,n),Oi.subVectors(e,n),li.cross(Oi).dot(a)<0}set(e,n,r){return this.a.copy(e),this.b.copy(n),this.c.copy(r),this}setFromPointsAndIndices(e,n,r,a){return this.a.copy(e[n]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,r,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return li.subVectors(this.c,this.b),Oi.subVectors(this.a,this.b),li.cross(Oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ui.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ui.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,r,a,l){return ui.getInterpolation(e,this.a,this.b,this.c,n,r,a,l)}containsPoint(e){return ui.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ui.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const r=this.a,a=this.b,l=this.c;let u,f;Ds.subVectors(a,r),Is.subVectors(l,r),Bu.subVectors(e,r);const h=Ds.dot(Bu),m=Is.dot(Bu);if(h<=0&&m<=0)return n.copy(r);Vu.subVectors(e,a);const _=Ds.dot(Vu),y=Is.dot(Vu);if(_>=0&&y<=_)return n.copy(a);const v=h*y-_*m;if(v<=0&&h>=0&&_<=0)return u=h/(h-_),n.copy(r).addScaledVector(Ds,u);Hu.subVectors(e,l);const S=Ds.dot(Hu),E=Is.dot(Hu);if(E>=0&&S<=E)return n.copy(l);const A=S*m-h*E;if(A<=0&&m>=0&&E<=0)return f=m/(m-E),n.copy(r).addScaledVector(Is,f);const x=_*E-S*y;if(x<=0&&y-_>=0&&S-E>=0)return um.subVectors(l,a),f=(y-_)/(y-_+(S-E)),n.copy(a).addScaledVector(um,f);const g=1/(x+A+v);return u=A*g,f=v*g,n.copy(r).addScaledVector(Ds,u).addScaledVector(Is,f)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Pg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vr={h:0,s:0,l:0},al={h:0,s:0,l:0};function Xu(s,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?s+(e-s)*6*n:n<1/2?e:n<2/3?s+(e-s)*6*(2/3-n):s}class Rt{constructor(e,n,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,r)}set(e,n,r){if(n===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Yn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mt.toWorkingColorSpace(this,n),this}setRGB(e,n,r,a=Mt.workingColorSpace){return this.r=e,this.g=n,this.b=r,Mt.toWorkingColorSpace(this,a),this}setHSL(e,n,r,a=Mt.workingColorSpace){if(e=j_(e,1),n=hn(n,0,1),r=hn(r,0,1),n===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+n):r+n-r*n,u=2*r-l;this.r=Xu(u,l,e+1/3),this.g=Xu(u,l,e),this.b=Xu(u,l,e-1/3)}return Mt.toWorkingColorSpace(this,a),this}setStyle(e,n=Yn){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const u=a[1],f=a[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,n);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,n);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=a[1],u=l.length;if(u===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(l,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Yn){const r=Pg[e.toLowerCase()];return r!==void 0?this.setHex(r,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gi(e.r),this.g=Gi(e.g),this.b=Gi(e.b),this}copyLinearToSRGB(e){return this.r=Vs(e.r),this.g=Vs(e.g),this.b=Vs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yn){return Mt.fromWorkingColorSpace(dn.copy(this),e),Math.round(hn(dn.r*255,0,255))*65536+Math.round(hn(dn.g*255,0,255))*256+Math.round(hn(dn.b*255,0,255))}getHexString(e=Yn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Mt.workingColorSpace){Mt.fromWorkingColorSpace(dn.copy(this),n);const r=dn.r,a=dn.g,l=dn.b,u=Math.max(r,a,l),f=Math.min(r,a,l);let h,m;const _=(f+u)/2;if(f===u)h=0,m=0;else{const y=u-f;switch(m=_<=.5?y/(u+f):y/(2-u-f),u){case r:h=(a-l)/y+(a<l?6:0);break;case a:h=(l-r)/y+2;break;case l:h=(r-a)/y+4;break}h/=6}return e.h=h,e.s=m,e.l=_,e}getRGB(e,n=Mt.workingColorSpace){return Mt.fromWorkingColorSpace(dn.copy(this),n),e.r=dn.r,e.g=dn.g,e.b=dn.b,e}getStyle(e=Yn){Mt.fromWorkingColorSpace(dn.copy(this),e);const n=dn.r,r=dn.g,a=dn.b;return e!==Yn?`color(${e} ${n.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,n,r){return this.getHSL(vr),this.setHSL(vr.h+e,vr.s+n,vr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,r){return this.r=e.r+(n.r-e.r)*r,this.g=e.g+(n.g-e.g)*r,this.b=e.b+(n.b-e.b)*r,this}lerpHSL(e,n){this.getHSL(vr),e.getHSL(al);const r=Ru(vr.h,al.h,n),a=Ru(vr.s,al.s,n),l=Ru(vr.l,al.l,n);return this.setHSL(r,a,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,r=this.g,a=this.b,l=e.elements;return this.r=l[0]*n+l[3]*r+l[6]*a,this.g=l[1]*n+l[4]*r+l[7]*a,this.b=l[2]*n+l[5]*r+l[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const dn=new Rt;Rt.NAMES=Pg;let lx=0;class Ks extends Ys{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lx++}),this.uuid=Ho(),this.name="",this.blending=Zr,this.side=Mr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=af,this.blendDst=lf,this.blendEquation=$r,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Rt(0,0,0),this.blendAlpha=0,this.depthFunc=Hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$p,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ts,this.stencilZFail=Ts,this.stencilZPass=Ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const r=e[n];if(r===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Zr&&(r.blending=this.blending),this.side!==Mr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==af&&(r.blendSrc=this.blendSrc),this.blendDst!==lf&&(r.blendDst=this.blendDst),this.blendEquation!==$r&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Hs&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$p&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ts&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Ts&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Ts&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(l){const u=[];for(const f in l){const h=l[f];delete h.metadata,u.push(h)}return u}if(n){const l=a(e.textures),u=a(e.images);l.length>0&&(r.textures=l),u.length>0&&(r.images=u)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let r=null;if(n!==null){const a=n.length;r=new Array(a);for(let l=0;l!==a;++l)r[l]=n[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ad extends Ks{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ji,this.combine=hg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const jt=new J,ll=new At;class Zn{constructor(e,n,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=r,this.usage=qp,this.updateRanges=[],this.gpuType=Vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,r){e*=this.itemSize,r*=n.itemSize;for(let a=0,l=this.itemSize;a<l;a++)this.array[e+a]=n.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,r=this.count;n<r;n++)ll.fromBufferAttribute(this,n),ll.applyMatrix3(e),this.setXY(n,ll.x,ll.y);else if(this.itemSize===3)for(let n=0,r=this.count;n<r;n++)jt.fromBufferAttribute(this,n),jt.applyMatrix3(e),this.setXYZ(n,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let n=0,r=this.count;n<r;n++)jt.fromBufferAttribute(this,n),jt.applyMatrix4(e),this.setXYZ(n,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let n=0,r=this.count;n<r;n++)jt.fromBufferAttribute(this,n),jt.applyNormalMatrix(e),this.setXYZ(n,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let n=0,r=this.count;n<r;n++)jt.fromBufferAttribute(this,n),jt.transformDirection(e),this.setXYZ(n,jt.x,jt.y,jt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let r=this.array[e*this.itemSize+n];return this.normalized&&(r=Lo(r,this.array)),r}setComponent(e,n,r){return this.normalized&&(r=bn(r,this.array)),this.array[e*this.itemSize+n]=r,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Lo(n,this.array)),n}setX(e,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Lo(n,this.array)),n}setY(e,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Lo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Lo(n,this.array)),n}setW(e,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,r){return e*=this.itemSize,this.normalized&&(n=bn(n,this.array),r=bn(r,this.array)),this.array[e+0]=n,this.array[e+1]=r,this}setXYZ(e,n,r,a){return e*=this.itemSize,this.normalized&&(n=bn(n,this.array),r=bn(r,this.array),a=bn(a,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,n,r,a,l){return e*=this.itemSize,this.normalized&&(n=bn(n,this.array),r=bn(r,this.array),a=bn(a,this.array),l=bn(l,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qp&&(e.usage=this.usage),e}}class Lg extends Zn{constructor(e,n,r){super(new Uint16Array(e),n,r)}}class Ng extends Zn{constructor(e,n,r){super(new Uint32Array(e),n,r)}}class kn extends Zn{constructor(e,n,r){super(new Float32Array(e),n,r)}}let cx=0;const qn=new Bt,$u=new xn,Us=new J,On=new Wo,Uo=new Wo,tn=new J;class Ln extends Ys{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cx++}),this.uuid=Ho(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ag(e)?Ng:Lg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,r=0){this.groups.push({start:e,count:n,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new ht().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qn.makeRotationFromQuaternion(e),this.applyMatrix4(qn),this}rotateX(e){return qn.makeRotationX(e),this.applyMatrix4(qn),this}rotateY(e){return qn.makeRotationY(e),this.applyMatrix4(qn),this}rotateZ(e){return qn.makeRotationZ(e),this.applyMatrix4(qn),this}translate(e,n,r){return qn.makeTranslation(e,n,r),this.applyMatrix4(qn),this}scale(e,n,r){return qn.makeScale(e,n,r),this.applyMatrix4(qn),this}lookAt(e){return $u.lookAt(e),$u.updateMatrix(),this.applyMatrix4($u.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const r=[];for(let a=0,l=e.length;a<l;a++){const u=e[a];r.push(u.x,u.y,u.z||0)}this.setAttribute("position",new kn(r,3))}else{for(let r=0,a=n.count;r<a;r++){const l=e[r];n.setXYZ(r,l.x,l.y,l.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let r=0,a=n.length;r<a;r++){const l=n[r];On.setFromBufferAttribute(l),this.morphTargetsRelative?(tn.addVectors(this.boundingBox.min,On.min),this.boundingBox.expandByPoint(tn),tn.addVectors(this.boundingBox.max,On.max),this.boundingBox.expandByPoint(tn)):(this.boundingBox.expandByPoint(On.min),this.boundingBox.expandByPoint(On.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){const r=this.boundingSphere.center;if(On.setFromBufferAttribute(e),n)for(let l=0,u=n.length;l<u;l++){const f=n[l];Uo.setFromBufferAttribute(f),this.morphTargetsRelative?(tn.addVectors(On.min,Uo.min),On.expandByPoint(tn),tn.addVectors(On.max,Uo.max),On.expandByPoint(tn)):(On.expandByPoint(Uo.min),On.expandByPoint(Uo.max))}On.getCenter(r);let a=0;for(let l=0,u=e.count;l<u;l++)tn.fromBufferAttribute(e,l),a=Math.max(a,r.distanceToSquared(tn));if(n)for(let l=0,u=n.length;l<u;l++){const f=n[l],h=this.morphTargetsRelative;for(let m=0,_=f.count;m<_;m++)tn.fromBufferAttribute(f,m),h&&(Us.fromBufferAttribute(e,m),tn.add(Us)),a=Math.max(a,r.distanceToSquared(tn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=n.position,a=n.normal,l=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zn(new Float32Array(4*r.count),4));const u=this.getAttribute("tangent"),f=[],h=[];for(let j=0;j<r.count;j++)f[j]=new J,h[j]=new J;const m=new J,_=new J,y=new J,v=new At,S=new At,E=new At,A=new J,x=new J;function g(j,L,b){m.fromBufferAttribute(r,j),_.fromBufferAttribute(r,L),y.fromBufferAttribute(r,b),v.fromBufferAttribute(l,j),S.fromBufferAttribute(l,L),E.fromBufferAttribute(l,b),_.sub(m),y.sub(m),S.sub(v),E.sub(v);const G=1/(S.x*E.y-E.x*S.y);isFinite(G)&&(A.copy(_).multiplyScalar(E.y).addScaledVector(y,-S.y).multiplyScalar(G),x.copy(y).multiplyScalar(S.x).addScaledVector(_,-E.x).multiplyScalar(G),f[j].add(A),f[L].add(A),f[b].add(A),h[j].add(x),h[L].add(x),h[b].add(x))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let j=0,L=P.length;j<L;++j){const b=P[j],G=b.start,ae=b.count;for(let ie=G,pe=G+ae;ie<pe;ie+=3)g(e.getX(ie+0),e.getX(ie+1),e.getX(ie+2))}const N=new J,C=new J,K=new J,k=new J;function O(j){K.fromBufferAttribute(a,j),k.copy(K);const L=f[j];N.copy(L),N.sub(K.multiplyScalar(K.dot(L))).normalize(),C.crossVectors(k,L);const G=C.dot(h[j])<0?-1:1;u.setXYZW(j,N.x,N.y,N.z,G)}for(let j=0,L=P.length;j<L;++j){const b=P[j],G=b.start,ae=b.count;for(let ie=G,pe=G+ae;ie<pe;ie+=3)O(e.getX(ie+0)),O(e.getX(ie+1)),O(e.getX(ie+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Zn(new Float32Array(n.count*3),3),this.setAttribute("normal",r);else for(let v=0,S=r.count;v<S;v++)r.setXYZ(v,0,0,0);const a=new J,l=new J,u=new J,f=new J,h=new J,m=new J,_=new J,y=new J;if(e)for(let v=0,S=e.count;v<S;v+=3){const E=e.getX(v+0),A=e.getX(v+1),x=e.getX(v+2);a.fromBufferAttribute(n,E),l.fromBufferAttribute(n,A),u.fromBufferAttribute(n,x),_.subVectors(u,l),y.subVectors(a,l),_.cross(y),f.fromBufferAttribute(r,E),h.fromBufferAttribute(r,A),m.fromBufferAttribute(r,x),f.add(_),h.add(_),m.add(_),r.setXYZ(E,f.x,f.y,f.z),r.setXYZ(A,h.x,h.y,h.z),r.setXYZ(x,m.x,m.y,m.z)}else for(let v=0,S=n.count;v<S;v+=3)a.fromBufferAttribute(n,v+0),l.fromBufferAttribute(n,v+1),u.fromBufferAttribute(n,v+2),_.subVectors(u,l),y.subVectors(a,l),_.cross(y),r.setXYZ(v+0,_.x,_.y,_.z),r.setXYZ(v+1,_.x,_.y,_.z),r.setXYZ(v+2,_.x,_.y,_.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,r=e.count;n<r;n++)tn.fromBufferAttribute(e,n),tn.normalize(),e.setXYZ(n,tn.x,tn.y,tn.z)}toNonIndexed(){function e(f,h){const m=f.array,_=f.itemSize,y=f.normalized,v=new m.constructor(h.length*_);let S=0,E=0;for(let A=0,x=h.length;A<x;A++){f.isInterleavedBufferAttribute?S=h[A]*f.data.stride+f.offset:S=h[A]*_;for(let g=0;g<_;g++)v[E++]=m[S++]}return new Zn(v,_,y)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Ln,r=this.index.array,a=this.attributes;for(const f in a){const h=a[f],m=e(h,r);n.setAttribute(f,m)}const l=this.morphAttributes;for(const f in l){const h=[],m=l[f];for(let _=0,y=m.length;_<y;_++){const v=m[_],S=e(v,r);h.push(S)}n.morphAttributes[f]=h}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let f=0,h=u.length;f<h;f++){const m=u[f];n.addGroup(m.start,m.count,m.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const m in h)h[m]!==void 0&&(e[m]=h[m]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const r=this.attributes;for(const h in r){const m=r[h];e.data.attributes[h]=m.toJSON(e.data)}const a={};let l=!1;for(const h in this.morphAttributes){const m=this.morphAttributes[h],_=[];for(let y=0,v=m.length;y<v;y++){const S=m[y];_.push(S.toJSON(e.data))}_.length>0&&(a[h]=_,l=!0)}l&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const f=this.boundingSphere;return f!==null&&(e.data.boundingSphere={center:f.center.toArray(),radius:f.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(n));const a=e.attributes;for(const m in a){const _=a[m];this.setAttribute(m,_.clone(n))}const l=e.morphAttributes;for(const m in l){const _=[],y=l[m];for(let v=0,S=y.length;v<S;v++)_.push(y[v].clone(n));this.morphAttributes[m]=_}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let m=0,_=u.length;m<_;m++){const y=u[m];this.addGroup(y.start,y.count,y.materialIndex)}const f=e.boundingBox;f!==null&&(this.boundingBox=f.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fm=new Bt,Vr=new od,cl=new jo,dm=new J,ul=new J,fl=new J,dl=new J,qu=new J,hl=new J,hm=new J,pl=new J;class Si extends xn{constructor(e=new Ln,n=new ad){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=a.length;l<u;l++){const f=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}getVertexPosition(e,n){const r=this.geometry,a=r.attributes.position,l=r.morphAttributes.position,u=r.morphTargetsRelative;n.fromBufferAttribute(a,e);const f=this.morphTargetInfluences;if(l&&f){hl.set(0,0,0);for(let h=0,m=l.length;h<m;h++){const _=f[h],y=l[h];_!==0&&(qu.fromBufferAttribute(y,e),u?hl.addScaledVector(qu,_):hl.addScaledVector(qu.sub(n),_))}n.add(hl)}return n}raycast(e,n){const r=this.geometry,a=this.material,l=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),cl.copy(r.boundingSphere),cl.applyMatrix4(l),Vr.copy(e.ray).recast(e.near),!(cl.containsPoint(Vr.origin)===!1&&(Vr.intersectSphere(cl,dm)===null||Vr.origin.distanceToSquared(dm)>(e.far-e.near)**2))&&(fm.copy(l).invert(),Vr.copy(e.ray).applyMatrix4(fm),!(r.boundingBox!==null&&Vr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,n,Vr)))}_computeIntersections(e,n,r){let a;const l=this.geometry,u=this.material,f=l.index,h=l.attributes.position,m=l.attributes.uv,_=l.attributes.uv1,y=l.attributes.normal,v=l.groups,S=l.drawRange;if(f!==null)if(Array.isArray(u))for(let E=0,A=v.length;E<A;E++){const x=v[E],g=u[x.materialIndex],P=Math.max(x.start,S.start),N=Math.min(f.count,Math.min(x.start+x.count,S.start+S.count));for(let C=P,K=N;C<K;C+=3){const k=f.getX(C),O=f.getX(C+1),j=f.getX(C+2);a=ml(this,g,e,r,m,_,y,k,O,j),a&&(a.faceIndex=Math.floor(C/3),a.face.materialIndex=x.materialIndex,n.push(a))}}else{const E=Math.max(0,S.start),A=Math.min(f.count,S.start+S.count);for(let x=E,g=A;x<g;x+=3){const P=f.getX(x),N=f.getX(x+1),C=f.getX(x+2);a=ml(this,u,e,r,m,_,y,P,N,C),a&&(a.faceIndex=Math.floor(x/3),n.push(a))}}else if(h!==void 0)if(Array.isArray(u))for(let E=0,A=v.length;E<A;E++){const x=v[E],g=u[x.materialIndex],P=Math.max(x.start,S.start),N=Math.min(h.count,Math.min(x.start+x.count,S.start+S.count));for(let C=P,K=N;C<K;C+=3){const k=C,O=C+1,j=C+2;a=ml(this,g,e,r,m,_,y,k,O,j),a&&(a.faceIndex=Math.floor(C/3),a.face.materialIndex=x.materialIndex,n.push(a))}}else{const E=Math.max(0,S.start),A=Math.min(h.count,S.start+S.count);for(let x=E,g=A;x<g;x+=3){const P=x,N=x+1,C=x+2;a=ml(this,u,e,r,m,_,y,P,N,C),a&&(a.faceIndex=Math.floor(x/3),n.push(a))}}}}function ux(s,e,n,r,a,l,u,f){let h;if(e.side===Rn?h=r.intersectTriangle(u,l,a,!0,f):h=r.intersectTriangle(a,l,u,e.side===Mr,f),h===null)return null;pl.copy(f),pl.applyMatrix4(s.matrixWorld);const m=n.ray.origin.distanceTo(pl);return m<n.near||m>n.far?null:{distance:m,point:pl.clone(),object:s}}function ml(s,e,n,r,a,l,u,f,h,m){s.getVertexPosition(f,ul),s.getVertexPosition(h,fl),s.getVertexPosition(m,dl);const _=ux(s,e,n,r,ul,fl,dl,hm);if(_){const y=new J;ui.getBarycoord(hm,ul,fl,dl,y),a&&(_.uv=ui.getInterpolatedAttribute(a,f,h,m,y,new At)),l&&(_.uv1=ui.getInterpolatedAttribute(l,f,h,m,y,new At)),u&&(_.normal=ui.getInterpolatedAttribute(u,f,h,m,y,new J),_.normal.dot(r.direction)>0&&_.normal.multiplyScalar(-1));const v={a:f,b:h,c:m,normal:new J,materialIndex:0};ui.getNormal(ul,fl,dl,v.normal),_.face=v,_.barycoord=y}return _}class Xo extends Ln{constructor(e=1,n=1,r=1,a=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:r,widthSegments:a,heightSegments:l,depthSegments:u};const f=this;a=Math.floor(a),l=Math.floor(l),u=Math.floor(u);const h=[],m=[],_=[],y=[];let v=0,S=0;E("z","y","x",-1,-1,r,n,e,u,l,0),E("z","y","x",1,-1,r,n,-e,u,l,1),E("x","z","y",1,1,e,r,n,a,u,2),E("x","z","y",1,-1,e,r,-n,a,u,3),E("x","y","z",1,-1,e,n,r,a,l,4),E("x","y","z",-1,-1,e,n,-r,a,l,5),this.setIndex(h),this.setAttribute("position",new kn(m,3)),this.setAttribute("normal",new kn(_,3)),this.setAttribute("uv",new kn(y,2));function E(A,x,g,P,N,C,K,k,O,j,L){const b=C/O,G=K/j,ae=C/2,ie=K/2,pe=k/2,ve=O+1,ce=j+1;let he=0,V=0;const ue=new J;for(let D=0;D<ce;D++){const M=D*G-ie;for(let z=0;z<ve;z++){const fe=z*b-ae;ue[A]=fe*P,ue[x]=M*N,ue[g]=pe,m.push(ue.x,ue.y,ue.z),ue[A]=0,ue[x]=0,ue[g]=k>0?1:-1,_.push(ue.x,ue.y,ue.z),y.push(z/O),y.push(1-D/j),he+=1}}for(let D=0;D<j;D++)for(let M=0;M<O;M++){const z=v+M+ve*D,fe=v+M+ve*(D+1),W=v+(M+1)+ve*(D+1),Q=v+(M+1)+ve*D;h.push(z,fe,Q),h.push(fe,W,Q),V+=6}f.addGroup(S,V,L),S+=V,v+=he}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function $s(s){const e={};for(const n in s){e[n]={};for(const r in s[n]){const a=s[n][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][r]=null):e[n][r]=a.clone():Array.isArray(a)?e[n][r]=a.slice():e[n][r]=a}}return e}function _n(s){const e={};for(let n=0;n<s.length;n++){const r=$s(s[n]);for(const a in r)e[a]=r[a]}return e}function fx(s){const e=[];for(let n=0;n<s.length;n++)e.push(s[n].clone());return e}function Dg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Mt.workingColorSpace}const dx={clone:$s,merge:_n};var hx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,px=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Er extends Ks{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hx,this.fragmentShader=px,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$s(e.uniforms),this.uniformsGroups=fx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const u=this.uniforms[a].value;u&&u.isTexture?n.uniforms[a]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?n.uniforms[a]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[a]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[a]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[a]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[a]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[a]={type:"m4",value:u.toArray()}:n.uniforms[a]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(n.extensions=r),n}}class Ig extends xn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt,this.coordinateSystem=Hi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const _r=new J,pm=new At,mm=new At;class Kn extends Ig{constructor(e=50,n=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Xf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(bu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xf*2*Math.atan(Math.tan(bu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,r){_r.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(_r.x,_r.y).multiplyScalar(-e/_r.z),_r.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(_r.x,_r.y).multiplyScalar(-e/_r.z)}getViewSize(e,n){return this.getViewBounds(e,pm,mm),n.subVectors(mm,pm)}setViewOffset(e,n,r,a,l,u){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(bu*.5*this.fov)/this.zoom,r=2*n,a=this.aspect*r,l=-.5*a;const u=this.view;if(this.view!==null&&this.view.enabled){const h=u.fullWidth,m=u.fullHeight;l+=u.offsetX*a/h,n-=u.offsetY*r/m,a*=u.width/h,r*=u.height/m}const f=this.filmOffset;f!==0&&(l+=e*f/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+a,n,n-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Fs=-90,Os=1;class mx extends xn{constructor(e,n,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Kn(Fs,Os,e,n);a.layers=this.layers,this.add(a);const l=new Kn(Fs,Os,e,n);l.layers=this.layers,this.add(l);const u=new Kn(Fs,Os,e,n);u.layers=this.layers,this.add(u);const f=new Kn(Fs,Os,e,n);f.layers=this.layers,this.add(f);const h=new Kn(Fs,Os,e,n);h.layers=this.layers,this.add(h);const m=new Kn(Fs,Os,e,n);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[r,a,l,u,f,h]=n;for(const m of n)this.remove(m);if(e===Hi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),f.up.set(0,1,0),f.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Ll)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),f.up.set(0,-1,0),f.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of n)this.add(m),m.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,u,f,h,m,_]=this.children,y=e.getRenderTarget(),v=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const A=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,a),e.render(n,l),e.setRenderTarget(r,1,a),e.render(n,u),e.setRenderTarget(r,2,a),e.render(n,f),e.setRenderTarget(r,3,a),e.render(n,h),e.setRenderTarget(r,4,a),e.render(n,m),r.texture.generateMipmaps=A,e.setRenderTarget(r,5,a),e.render(n,_),e.setRenderTarget(y,v,S),e.xr.enabled=E,r.texture.needsPMREMUpdate=!0}}class Ug extends Pn{constructor(e,n,r,a,l,u,f,h,m,_){e=e!==void 0?e:[],n=n!==void 0?n:Gs,super(e,n,r,a,l,u,f,h,m,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class gx extends Jr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new Ug(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:yi}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Xo(5,5,5),l=new Er({name:"CubemapFromEquirect",uniforms:$s(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Rn,blending:yr});l.uniforms.tEquirect.value=n;const u=new Si(a,l),f=n.minFilter;return n.minFilter===Kr&&(n.minFilter=yi),new mx(1,10,this).update(e,u),n.minFilter=f,u.geometry.dispose(),u.material.dispose(),this}clear(e,n,r,a){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(n,r,a);e.setRenderTarget(l)}}const Yu=new J,vx=new J,_x=new ht;class jr{constructor(e=new J(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,r,a){return this.normal.set(e,n,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,r){const a=Yu.subVectors(r,n).cross(vx.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const r=e.delta(Yu),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/a;return l<0||l>1?null:n.copy(e.start).addScaledVector(r,l)}intersectsLine(e){const n=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return n<0&&r>0||r<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const r=n||_x.getNormalMatrix(e),a=this.coplanarPoint(Yu).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hr=new jo,gl=new J;class Fg{constructor(e=new jr,n=new jr,r=new jr,a=new jr,l=new jr,u=new jr){this.planes=[e,n,r,a,l,u]}set(e,n,r,a,l,u){const f=this.planes;return f[0].copy(e),f[1].copy(n),f[2].copy(r),f[3].copy(a),f[4].copy(l),f[5].copy(u),this}copy(e){const n=this.planes;for(let r=0;r<6;r++)n[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,n=Hi){const r=this.planes,a=e.elements,l=a[0],u=a[1],f=a[2],h=a[3],m=a[4],_=a[5],y=a[6],v=a[7],S=a[8],E=a[9],A=a[10],x=a[11],g=a[12],P=a[13],N=a[14],C=a[15];if(r[0].setComponents(h-l,v-m,x-S,C-g).normalize(),r[1].setComponents(h+l,v+m,x+S,C+g).normalize(),r[2].setComponents(h+u,v+_,x+E,C+P).normalize(),r[3].setComponents(h-u,v-_,x-E,C-P).normalize(),r[4].setComponents(h-f,v-y,x-A,C-N).normalize(),n===Hi)r[5].setComponents(h+f,v+y,x+A,C+N).normalize();else if(n===Ll)r[5].setComponents(f,y,A,N).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hr)}intersectsSprite(e){return Hr.center.set(0,0,0),Hr.radius=.7071067811865476,Hr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hr)}intersectsSphere(e){const n=this.planes,r=e.center,a=-e.radius;for(let l=0;l<6;l++)if(n[l].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let r=0;r<6;r++){const a=n[r];if(gl.x=a.normal.x>0?e.max.x:e.min.x,gl.y=a.normal.y>0?e.max.y:e.min.y,gl.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(gl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let r=0;r<6;r++)if(n[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Og(){let s=null,e=!1,n=null,r=null;function a(l,u){n(l,u),r=s.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){n=l},setContext:function(l){s=l}}}function xx(s){const e=new WeakMap;function n(f,h){const m=f.array,_=f.usage,y=m.byteLength,v=s.createBuffer();s.bindBuffer(h,v),s.bufferData(h,m,_),f.onUploadCallback();let S;if(m instanceof Float32Array)S=s.FLOAT;else if(m instanceof Uint16Array)f.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(m instanceof Int16Array)S=s.SHORT;else if(m instanceof Uint32Array)S=s.UNSIGNED_INT;else if(m instanceof Int32Array)S=s.INT;else if(m instanceof Int8Array)S=s.BYTE;else if(m instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:v,type:S,bytesPerElement:m.BYTES_PER_ELEMENT,version:f.version,size:y}}function r(f,h,m){const _=h.array,y=h.updateRanges;if(s.bindBuffer(m,f),y.length===0)s.bufferSubData(m,0,_);else{y.sort((S,E)=>S.start-E.start);let v=0;for(let S=1;S<y.length;S++){const E=y[v],A=y[S];A.start<=E.start+E.count+1?E.count=Math.max(E.count,A.start+A.count-E.start):(++v,y[v]=A)}y.length=v+1;for(let S=0,E=y.length;S<E;S++){const A=y[S];s.bufferSubData(m,A.start*_.BYTES_PER_ELEMENT,_,A.start,A.count)}h.clearUpdateRanges()}h.onUploadCallback()}function a(f){return f.isInterleavedBufferAttribute&&(f=f.data),e.get(f)}function l(f){f.isInterleavedBufferAttribute&&(f=f.data);const h=e.get(f);h&&(s.deleteBuffer(h.buffer),e.delete(f))}function u(f,h){if(f.isInterleavedBufferAttribute&&(f=f.data),f.isGLBufferAttribute){const _=e.get(f);(!_||_.version<f.version)&&e.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}const m=e.get(f);if(m===void 0)e.set(f,n(f,h));else if(m.version<f.version){if(m.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(m.buffer,f,h),m.version=f.version}}return{get:a,remove:l,update:u}}class kl extends Ln{constructor(e=1,n=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:r,heightSegments:a};const l=e/2,u=n/2,f=Math.floor(r),h=Math.floor(a),m=f+1,_=h+1,y=e/f,v=n/h,S=[],E=[],A=[],x=[];for(let g=0;g<_;g++){const P=g*v-u;for(let N=0;N<m;N++){const C=N*y-l;E.push(C,-P,0),A.push(0,0,1),x.push(N/f),x.push(1-g/h)}}for(let g=0;g<h;g++)for(let P=0;P<f;P++){const N=P+m*g,C=P+m*(g+1),K=P+1+m*(g+1),k=P+1+m*g;S.push(N,C,k),S.push(C,K,k)}this.setIndex(S),this.setAttribute("position",new kn(E,3)),this.setAttribute("normal",new kn(A,3)),this.setAttribute("uv",new kn(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kl(e.width,e.height,e.widthSegments,e.heightSegments)}}var yx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Mx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ex=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ax=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Cx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Rx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Px=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Dx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ix=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ux=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Fx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ox=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Hx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Gx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Wx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Xx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$x=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Kx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Jx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ey=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ty=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ny=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,iy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ry=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,sy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,oy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ay=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ly=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,uy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,dy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,hy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,py=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,my=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,_y=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,yy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Sy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,My=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ey=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ty=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ay=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,by=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ry=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Py=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ly=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ny=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Iy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Fy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Oy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ky=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,zy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,By=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Hy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Gy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$y=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Yy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ky=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,eS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,nS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,iS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,sS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,oS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,aS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,cS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,hS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,pS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,mS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_S=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const xS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,MS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ES=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,TS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,AS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,CS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,RS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,PS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,LS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,NS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,DS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,IS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,US=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,FS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,OS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,kS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,BS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,VS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,HS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,WS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,XS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$S=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,qS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,YS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,KS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ZS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,QS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pt={alphahash_fragment:yx,alphahash_pars_fragment:Sx,alphamap_fragment:Mx,alphamap_pars_fragment:Ex,alphatest_fragment:wx,alphatest_pars_fragment:Tx,aomap_fragment:Ax,aomap_pars_fragment:Cx,batching_pars_vertex:bx,batching_vertex:Rx,begin_vertex:Px,beginnormal_vertex:Lx,bsdfs:Nx,iridescence_fragment:Dx,bumpmap_pars_fragment:Ix,clipping_planes_fragment:Ux,clipping_planes_pars_fragment:Fx,clipping_planes_pars_vertex:Ox,clipping_planes_vertex:kx,color_fragment:zx,color_pars_fragment:Bx,color_pars_vertex:Vx,color_vertex:Hx,common:Gx,cube_uv_reflection_fragment:Wx,defaultnormal_vertex:jx,displacementmap_pars_vertex:Xx,displacementmap_vertex:$x,emissivemap_fragment:qx,emissivemap_pars_fragment:Yx,colorspace_fragment:Kx,colorspace_pars_fragment:Zx,envmap_fragment:Qx,envmap_common_pars_fragment:Jx,envmap_pars_fragment:ey,envmap_pars_vertex:ty,envmap_physical_pars_fragment:dy,envmap_vertex:ny,fog_vertex:iy,fog_pars_vertex:ry,fog_fragment:sy,fog_pars_fragment:oy,gradientmap_pars_fragment:ay,lightmap_pars_fragment:ly,lights_lambert_fragment:cy,lights_lambert_pars_fragment:uy,lights_pars_begin:fy,lights_toon_fragment:hy,lights_toon_pars_fragment:py,lights_phong_fragment:my,lights_phong_pars_fragment:gy,lights_physical_fragment:vy,lights_physical_pars_fragment:_y,lights_fragment_begin:xy,lights_fragment_maps:yy,lights_fragment_end:Sy,logdepthbuf_fragment:My,logdepthbuf_pars_fragment:Ey,logdepthbuf_pars_vertex:wy,logdepthbuf_vertex:Ty,map_fragment:Ay,map_pars_fragment:Cy,map_particle_fragment:by,map_particle_pars_fragment:Ry,metalnessmap_fragment:Py,metalnessmap_pars_fragment:Ly,morphinstance_vertex:Ny,morphcolor_vertex:Dy,morphnormal_vertex:Iy,morphtarget_pars_vertex:Uy,morphtarget_vertex:Fy,normal_fragment_begin:Oy,normal_fragment_maps:ky,normal_pars_fragment:zy,normal_pars_vertex:By,normal_vertex:Vy,normalmap_pars_fragment:Hy,clearcoat_normal_fragment_begin:Gy,clearcoat_normal_fragment_maps:Wy,clearcoat_pars_fragment:jy,iridescence_pars_fragment:Xy,opaque_fragment:$y,packing:qy,premultiplied_alpha_fragment:Yy,project_vertex:Ky,dithering_fragment:Zy,dithering_pars_fragment:Qy,roughnessmap_fragment:Jy,roughnessmap_pars_fragment:eS,shadowmap_pars_fragment:tS,shadowmap_pars_vertex:nS,shadowmap_vertex:iS,shadowmask_pars_fragment:rS,skinbase_vertex:sS,skinning_pars_vertex:oS,skinning_vertex:aS,skinnormal_vertex:lS,specularmap_fragment:cS,specularmap_pars_fragment:uS,tonemapping_fragment:fS,tonemapping_pars_fragment:dS,transmission_fragment:hS,transmission_pars_fragment:pS,uv_pars_fragment:mS,uv_pars_vertex:gS,uv_vertex:vS,worldpos_vertex:_S,background_vert:xS,background_frag:yS,backgroundCube_vert:SS,backgroundCube_frag:MS,cube_vert:ES,cube_frag:wS,depth_vert:TS,depth_frag:AS,distanceRGBA_vert:CS,distanceRGBA_frag:bS,equirect_vert:RS,equirect_frag:PS,linedashed_vert:LS,linedashed_frag:NS,meshbasic_vert:DS,meshbasic_frag:IS,meshlambert_vert:US,meshlambert_frag:FS,meshmatcap_vert:OS,meshmatcap_frag:kS,meshnormal_vert:zS,meshnormal_frag:BS,meshphong_vert:VS,meshphong_frag:HS,meshphysical_vert:GS,meshphysical_frag:WS,meshtoon_vert:jS,meshtoon_frag:XS,points_vert:$S,points_frag:qS,shadow_vert:YS,shadow_frag:KS,sprite_vert:ZS,sprite_frag:QS},Ue={common:{diffuse:{value:new Rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ht}},envmap:{envMap:{value:null},envMapRotation:{value:new ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ht},normalScale:{value:new At(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0},uvTransform:{value:new ht}},sprite:{diffuse:{value:new Rt(16777215)},opacity:{value:1},center:{value:new At(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}}},xi={basic:{uniforms:_n([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:_n([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new Rt(0)}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:_n([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new Rt(0)},specular:{value:new Rt(1118481)},shininess:{value:30}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:_n([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new Rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:_n([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new Rt(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:_n([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:_n([Ue.points,Ue.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:_n([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:_n([Ue.common,Ue.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:_n([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:_n([Ue.sprite,Ue.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ht}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distanceRGBA:{uniforms:_n([Ue.common,Ue.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distanceRGBA_vert,fragmentShader:pt.distanceRGBA_frag},shadow:{uniforms:_n([Ue.lights,Ue.fog,{color:{value:new Rt(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};xi.physical={uniforms:_n([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ht},clearcoatNormalScale:{value:new At(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ht},sheen:{value:0},sheenColor:{value:new Rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ht},transmissionSamplerSize:{value:new At},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ht},attenuationDistance:{value:0},attenuationColor:{value:new Rt(0)},specularColor:{value:new Rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ht},anisotropyVector:{value:new At},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ht}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};const vl={r:0,b:0,g:0},Gr=new ji,JS=new Bt;function eM(s,e,n,r,a,l,u){const f=new Rt(0);let h=l===!0?0:1,m,_,y=null,v=0,S=null;function E(P){let N=P.isScene===!0?P.background:null;return N&&N.isTexture&&(N=(P.backgroundBlurriness>0?n:e).get(N)),N}function A(P){let N=!1;const C=E(P);C===null?g(f,h):C&&C.isColor&&(g(C,1),N=!0);const K=s.xr.getEnvironmentBlendMode();K==="additive"?r.buffers.color.setClear(0,0,0,1,u):K==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,u),(s.autoClear||N)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(P,N){const C=E(N);C&&(C.isCubeTexture||C.mapping===Fl)?(_===void 0&&(_=new Si(new Xo(1,1,1),new Er({name:"BackgroundCubeMaterial",uniforms:$s(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("uv"),_.onBeforeRender=function(K,k,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(_.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(_)),Gr.copy(N.backgroundRotation),Gr.x*=-1,Gr.y*=-1,Gr.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Gr.y*=-1,Gr.z*=-1),_.material.uniforms.envMap.value=C,_.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,_.material.uniforms.backgroundBlurriness.value=N.backgroundBlurriness,_.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,_.material.uniforms.backgroundRotation.value.setFromMatrix4(JS.makeRotationFromEuler(Gr)),_.material.toneMapped=Mt.getTransfer(C.colorSpace)!==Lt,(y!==C||v!==C.version||S!==s.toneMapping)&&(_.material.needsUpdate=!0,y=C,v=C.version,S=s.toneMapping),_.layers.enableAll(),P.unshift(_,_.geometry,_.material,0,0,null)):C&&C.isTexture&&(m===void 0&&(m=new Si(new kl(2,2),new Er({name:"BackgroundMaterial",uniforms:$s(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:Mr,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=C,m.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,m.material.toneMapped=Mt.getTransfer(C.colorSpace)!==Lt,C.matrixAutoUpdate===!0&&C.updateMatrix(),m.material.uniforms.uvTransform.value.copy(C.matrix),(y!==C||v!==C.version||S!==s.toneMapping)&&(m.material.needsUpdate=!0,y=C,v=C.version,S=s.toneMapping),m.layers.enableAll(),P.unshift(m,m.geometry,m.material,0,0,null))}function g(P,N){P.getRGB(vl,Dg(s)),r.buffers.color.setClear(vl.r,vl.g,vl.b,N,u)}return{getClearColor:function(){return f},setClearColor:function(P,N=1){f.set(P),h=N,g(f,h)},getClearAlpha:function(){return h},setClearAlpha:function(P){h=P,g(f,h)},render:A,addToRenderList:x}}function tM(s,e){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=v(null);let l=a,u=!1;function f(b,G,ae,ie,pe){let ve=!1;const ce=y(ie,ae,G);l!==ce&&(l=ce,m(l.object)),ve=S(b,ie,ae,pe),ve&&E(b,ie,ae,pe),pe!==null&&e.update(pe,s.ELEMENT_ARRAY_BUFFER),(ve||u)&&(u=!1,C(b,G,ae,ie),pe!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(pe).buffer))}function h(){return s.createVertexArray()}function m(b){return s.bindVertexArray(b)}function _(b){return s.deleteVertexArray(b)}function y(b,G,ae){const ie=ae.wireframe===!0;let pe=r[b.id];pe===void 0&&(pe={},r[b.id]=pe);let ve=pe[G.id];ve===void 0&&(ve={},pe[G.id]=ve);let ce=ve[ie];return ce===void 0&&(ce=v(h()),ve[ie]=ce),ce}function v(b){const G=[],ae=[],ie=[];for(let pe=0;pe<n;pe++)G[pe]=0,ae[pe]=0,ie[pe]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:ae,attributeDivisors:ie,object:b,attributes:{},index:null}}function S(b,G,ae,ie){const pe=l.attributes,ve=G.attributes;let ce=0;const he=ae.getAttributes();for(const V in he)if(he[V].location>=0){const D=pe[V];let M=ve[V];if(M===void 0&&(V==="instanceMatrix"&&b.instanceMatrix&&(M=b.instanceMatrix),V==="instanceColor"&&b.instanceColor&&(M=b.instanceColor)),D===void 0||D.attribute!==M||M&&D.data!==M.data)return!0;ce++}return l.attributesNum!==ce||l.index!==ie}function E(b,G,ae,ie){const pe={},ve=G.attributes;let ce=0;const he=ae.getAttributes();for(const V in he)if(he[V].location>=0){let D=ve[V];D===void 0&&(V==="instanceMatrix"&&b.instanceMatrix&&(D=b.instanceMatrix),V==="instanceColor"&&b.instanceColor&&(D=b.instanceColor));const M={};M.attribute=D,D&&D.data&&(M.data=D.data),pe[V]=M,ce++}l.attributes=pe,l.attributesNum=ce,l.index=ie}function A(){const b=l.newAttributes;for(let G=0,ae=b.length;G<ae;G++)b[G]=0}function x(b){g(b,0)}function g(b,G){const ae=l.newAttributes,ie=l.enabledAttributes,pe=l.attributeDivisors;ae[b]=1,ie[b]===0&&(s.enableVertexAttribArray(b),ie[b]=1),pe[b]!==G&&(s.vertexAttribDivisor(b,G),pe[b]=G)}function P(){const b=l.newAttributes,G=l.enabledAttributes;for(let ae=0,ie=G.length;ae<ie;ae++)G[ae]!==b[ae]&&(s.disableVertexAttribArray(ae),G[ae]=0)}function N(b,G,ae,ie,pe,ve,ce){ce===!0?s.vertexAttribIPointer(b,G,ae,pe,ve):s.vertexAttribPointer(b,G,ae,ie,pe,ve)}function C(b,G,ae,ie){A();const pe=ie.attributes,ve=ae.getAttributes(),ce=G.defaultAttributeValues;for(const he in ve){const V=ve[he];if(V.location>=0){let ue=pe[he];if(ue===void 0&&(he==="instanceMatrix"&&b.instanceMatrix&&(ue=b.instanceMatrix),he==="instanceColor"&&b.instanceColor&&(ue=b.instanceColor)),ue!==void 0){const D=ue.normalized,M=ue.itemSize,z=e.get(ue);if(z===void 0)continue;const fe=z.buffer,W=z.type,Q=z.bytesPerElement,le=W===s.INT||W===s.UNSIGNED_INT||ue.gpuType===ed;if(ue.isInterleavedBufferAttribute){const ne=ue.data,me=ne.stride,Se=ue.offset;if(ne.isInstancedInterleavedBuffer){for(let Ne=0;Ne<V.locationSize;Ne++)g(V.location+Ne,ne.meshPerAttribute);b.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Ne=0;Ne<V.locationSize;Ne++)x(V.location+Ne);s.bindBuffer(s.ARRAY_BUFFER,fe);for(let Ne=0;Ne<V.locationSize;Ne++)N(V.location+Ne,M/V.locationSize,W,D,me*Q,(Se+M/V.locationSize*Ne)*Q,le)}else{if(ue.isInstancedBufferAttribute){for(let ne=0;ne<V.locationSize;ne++)g(V.location+ne,ue.meshPerAttribute);b.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let ne=0;ne<V.locationSize;ne++)x(V.location+ne);s.bindBuffer(s.ARRAY_BUFFER,fe);for(let ne=0;ne<V.locationSize;ne++)N(V.location+ne,M/V.locationSize,W,D,M*Q,M/V.locationSize*ne*Q,le)}}else if(ce!==void 0){const D=ce[he];if(D!==void 0)switch(D.length){case 2:s.vertexAttrib2fv(V.location,D);break;case 3:s.vertexAttrib3fv(V.location,D);break;case 4:s.vertexAttrib4fv(V.location,D);break;default:s.vertexAttrib1fv(V.location,D)}}}}P()}function K(){j();for(const b in r){const G=r[b];for(const ae in G){const ie=G[ae];for(const pe in ie)_(ie[pe].object),delete ie[pe];delete G[ae]}delete r[b]}}function k(b){if(r[b.id]===void 0)return;const G=r[b.id];for(const ae in G){const ie=G[ae];for(const pe in ie)_(ie[pe].object),delete ie[pe];delete G[ae]}delete r[b.id]}function O(b){for(const G in r){const ae=r[G];if(ae[b.id]===void 0)continue;const ie=ae[b.id];for(const pe in ie)_(ie[pe].object),delete ie[pe];delete ae[b.id]}}function j(){L(),u=!0,l!==a&&(l=a,m(l.object))}function L(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:f,reset:j,resetDefaultState:L,dispose:K,releaseStatesOfGeometry:k,releaseStatesOfProgram:O,initAttributes:A,enableAttribute:x,disableUnusedAttributes:P}}function nM(s,e,n){let r;function a(m){r=m}function l(m,_){s.drawArrays(r,m,_),n.update(_,r,1)}function u(m,_,y){y!==0&&(s.drawArraysInstanced(r,m,_,y),n.update(_,r,y))}function f(m,_,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,_,0,y);let S=0;for(let E=0;E<y;E++)S+=_[E];n.update(S,r,1)}function h(m,_,y,v){if(y===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let E=0;E<m.length;E++)u(m[E],_[E],v[E]);else{S.multiDrawArraysInstancedWEBGL(r,m,0,_,0,v,0,y);let E=0;for(let A=0;A<y;A++)E+=_[A]*v[A];n.update(E,r,1)}}this.setMode=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=f,this.renderMultiDrawInstances=h}function iM(s,e,n,r){let a;function l(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function u(O){return!(O!==fi&&r.convert(O)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function f(O){const j=O===Vo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(O!==Wi&&r.convert(O)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==Vi&&!j)}function h(O){if(O==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=n.precision!==void 0?n.precision:"highp";const _=h(m);_!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",_,"instead."),m=_);const y=n.logarithmicDepthBuffer===!0,v=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),E=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_TEXTURE_SIZE),x=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),P=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),N=s.getParameter(s.MAX_VARYING_VECTORS),C=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),K=E>0,k=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:h,textureFormatReadable:u,textureTypeReadable:f,precision:m,logarithmicDepthBuffer:y,reverseDepthBuffer:v,maxTextures:S,maxVertexTextures:E,maxTextureSize:A,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:P,maxVaryings:N,maxFragmentUniforms:C,vertexTextures:K,maxSamples:k}}function rM(s){const e=this;let n=null,r=0,a=!1,l=!1;const u=new jr,f=new ht,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(y,v){const S=y.length!==0||v||r!==0||a;return a=v,r=y.length,S},this.beginShadows=function(){l=!0,_(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(y,v){n=_(y,v,0)},this.setState=function(y,v,S){const E=y.clippingPlanes,A=y.clipIntersection,x=y.clipShadows,g=s.get(y);if(!a||E===null||E.length===0||l&&!x)l?_(null):m();else{const P=l?0:r,N=P*4;let C=g.clippingState||null;h.value=C,C=_(E,v,N,S);for(let K=0;K!==N;++K)C[K]=n[K];g.clippingState=C,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=P}};function m(){h.value!==n&&(h.value=n,h.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function _(y,v,S,E){const A=y!==null?y.length:0;let x=null;if(A!==0){if(x=h.value,E!==!0||x===null){const g=S+A*4,P=v.matrixWorldInverse;f.getNormalMatrix(P),(x===null||x.length<g)&&(x=new Float32Array(g));for(let N=0,C=S;N!==A;++N,C+=4)u.copy(y[N]).applyMatrix4(P,f),u.normal.toArray(x,C),x[C+3]=u.constant}h.value=x,h.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,x}}function sM(s){let e=new WeakMap;function n(u,f){return f===gf?u.mapping=Gs:f===vf&&(u.mapping=Ws),u}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===gf||f===vf)if(e.has(u)){const h=e.get(u).texture;return n(h,u.mapping)}else{const h=u.image;if(h&&h.height>0){const m=new gx(h.height);return m.fromEquirectangularTexture(s,u),e.set(u,m),u.addEventListener("dispose",a),n(m.texture,u.mapping)}else return null}}return u}function a(u){const f=u.target;f.removeEventListener("dispose",a);const h=e.get(f);h!==void 0&&(e.delete(f),h.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}class oM extends Ig{constructor(e=-1,n=1,r=1,a=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=r,this.bottom=a,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,r,a,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let l=r-e,u=r+e,f=a+n,h=a-n;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=m*this.view.offsetX,u=l+m*this.view.width,f-=_*this.view.offsetY,h=f-_*this.view.height}this.projectionMatrix.makeOrthographic(l,u,f,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const zs=4,gm=[.125,.215,.35,.446,.526,.582],qr=20,Ku=new oM,vm=new Rt;let Zu=null,Qu=0,Ju=0,ef=!1;const Xr=(1+Math.sqrt(5))/2,ks=1/Xr,_m=[new J(-Xr,ks,0),new J(Xr,ks,0),new J(-ks,0,Xr),new J(ks,0,Xr),new J(0,Xr,-ks),new J(0,Xr,ks),new J(-1,1,-1),new J(1,1,-1),new J(-1,1,1),new J(1,1,1)];class xm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,r=.1,a=100){Zu=this._renderer.getRenderTarget(),Qu=this._renderer.getActiveCubeFace(),Ju=this._renderer.getActiveMipmapLevel(),ef=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,r,a,l),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Zu,Qu,Ju),this._renderer.xr.enabled=ef,e.scissorTest=!1,_l(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Gs||e.mapping===Ws?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Zu=this._renderer.getRenderTarget(),Qu=this._renderer.getActiveCubeFace(),Ju=this._renderer.getActiveMipmapLevel(),ef=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=n||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,r={magFilter:yi,minFilter:yi,generateMipmaps:!1,type:Vo,format:fi,colorSpace:qs,depthBuffer:!1},a=ym(e,n,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ym(e,n,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=aM(l)),this._blurMaterial=lM(l,e,n)}return a}_compileMaterial(e){const n=new Si(this._lodPlanes[0],e);this._renderer.compile(n,Ku)}_sceneToCubeUV(e,n,r,a){const f=new Kn(90,1,n,r),h=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],_=this._renderer,y=_.autoClear,v=_.toneMapping;_.getClearColor(vm),_.toneMapping=Sr,_.autoClear=!1;const S=new ad({name:"PMREM.Background",side:Rn,depthWrite:!1,depthTest:!1}),E=new Si(new Xo,S);let A=!1;const x=e.background;x?x.isColor&&(S.color.copy(x),e.background=null,A=!0):(S.color.copy(vm),A=!0);for(let g=0;g<6;g++){const P=g%3;P===0?(f.up.set(0,h[g],0),f.lookAt(m[g],0,0)):P===1?(f.up.set(0,0,h[g]),f.lookAt(0,m[g],0)):(f.up.set(0,h[g],0),f.lookAt(0,0,m[g]));const N=this._cubeSize;_l(a,P*N,g>2?N:0,N,N),_.setRenderTarget(a),A&&_.render(E,f),_.render(e,f)}E.geometry.dispose(),E.material.dispose(),_.toneMapping=v,_.autoClear=y,e.background=x}_textureToCubeUV(e,n){const r=this._renderer,a=e.mapping===Gs||e.mapping===Ws;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sm());const l=a?this._cubemapMaterial:this._equirectMaterial,u=new Si(this._lodPlanes[0],l),f=l.uniforms;f.envMap.value=e;const h=this._cubeSize;_l(n,0,0,3*h,2*h),r.setRenderTarget(n),r.render(u,Ku)}_applyPMREM(e){const n=this._renderer,r=n.autoClear;n.autoClear=!1;const a=this._lodPlanes.length;for(let l=1;l<a;l++){const u=Math.sqrt(this._sigmas[l]*this._sigmas[l]-this._sigmas[l-1]*this._sigmas[l-1]),f=_m[(a-l-1)%_m.length];this._blur(e,l-1,l,u,f)}n.autoClear=r}_blur(e,n,r,a,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,n,r,a,"latitudinal",l),this._halfBlur(u,e,r,r,a,"longitudinal",l)}_halfBlur(e,n,r,a,l,u,f){const h=this._renderer,m=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const _=3,y=new Si(this._lodPlanes[a],m),v=m.uniforms,S=this._sizeLods[r]-1,E=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*qr-1),A=l/E,x=isFinite(l)?1+Math.floor(_*A):qr;x>qr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${qr}`);const g=[];let P=0;for(let O=0;O<qr;++O){const j=O/A,L=Math.exp(-j*j/2);g.push(L),O===0?P+=L:O<x&&(P+=2*L)}for(let O=0;O<g.length;O++)g[O]=g[O]/P;v.envMap.value=e.texture,v.samples.value=x,v.weights.value=g,v.latitudinal.value=u==="latitudinal",f&&(v.poleAxis.value=f);const{_lodMax:N}=this;v.dTheta.value=E,v.mipInt.value=N-r;const C=this._sizeLods[a],K=3*C*(a>N-zs?a-N+zs:0),k=4*(this._cubeSize-C);_l(n,K,k,3*C,2*C),h.setRenderTarget(n),h.render(y,Ku)}}function aM(s){const e=[],n=[],r=[];let a=s;const l=s-zs+1+gm.length;for(let u=0;u<l;u++){const f=Math.pow(2,a);n.push(f);let h=1/f;u>s-zs?h=gm[u-s+zs-1]:u===0&&(h=0),r.push(h);const m=1/(f-2),_=-m,y=1+m,v=[_,_,y,_,y,y,_,_,y,y,_,y],S=6,E=6,A=3,x=2,g=1,P=new Float32Array(A*E*S),N=new Float32Array(x*E*S),C=new Float32Array(g*E*S);for(let k=0;k<S;k++){const O=k%3*2/3-1,j=k>2?0:-1,L=[O,j,0,O+2/3,j,0,O+2/3,j+1,0,O,j,0,O+2/3,j+1,0,O,j+1,0];P.set(L,A*E*k),N.set(v,x*E*k);const b=[k,k,k,k,k,k];C.set(b,g*E*k)}const K=new Ln;K.setAttribute("position",new Zn(P,A)),K.setAttribute("uv",new Zn(N,x)),K.setAttribute("faceIndex",new Zn(C,g)),e.push(K),a>zs&&a--}return{lodPlanes:e,sizeLods:n,sigmas:r}}function ym(s,e,n){const r=new Jr(s,e,n);return r.texture.mapping=Fl,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function _l(s,e,n,r,a){s.viewport.set(e,n,r,a),s.scissor.set(e,n,r,a)}function lM(s,e,n){const r=new Float32Array(qr),a=new J(0,1,0);return new Er({name:"SphericalGaussianBlur",defines:{n:qr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:ld(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:yr,depthTest:!1,depthWrite:!1})}function Sm(){return new Er({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ld(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:yr,depthTest:!1,depthWrite:!1})}function Mm(){return new Er({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ld(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yr,depthTest:!1,depthWrite:!1})}function ld(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function cM(s){let e=new WeakMap,n=null;function r(f){if(f&&f.isTexture){const h=f.mapping,m=h===gf||h===vf,_=h===Gs||h===Ws;if(m||_){let y=e.get(f);const v=y!==void 0?y.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==v)return n===null&&(n=new xm(s)),y=m?n.fromEquirectangular(f,y):n.fromCubemap(f,y),y.texture.pmremVersion=f.pmremVersion,e.set(f,y),y.texture;if(y!==void 0)return y.texture;{const S=f.image;return m&&S&&S.height>0||_&&S&&a(S)?(n===null&&(n=new xm(s)),y=m?n.fromEquirectangular(f):n.fromCubemap(f),y.texture.pmremVersion=f.pmremVersion,e.set(f,y),f.addEventListener("dispose",l),y.texture):null}}}return f}function a(f){let h=0;const m=6;for(let _=0;_<m;_++)f[_]!==void 0&&h++;return h===m}function l(f){const h=f.target;h.removeEventListener("dispose",l);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function u(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:u}}function uM(s){const e={};function n(r){if(e[r]!==void 0)return e[r];let a;switch(r){case"WEBGL_depth_texture":a=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=s.getExtension(r)}return e[r]=a,a}return{has:function(r){return n(r)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(r){const a=n(r);return a===null&&Oo("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function fM(s,e,n,r){const a={},l=new WeakMap;function u(y){const v=y.target;v.index!==null&&e.remove(v.index);for(const E in v.attributes)e.remove(v.attributes[E]);for(const E in v.morphAttributes){const A=v.morphAttributes[E];for(let x=0,g=A.length;x<g;x++)e.remove(A[x])}v.removeEventListener("dispose",u),delete a[v.id];const S=l.get(v);S&&(e.remove(S),l.delete(v)),r.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,n.memory.geometries--}function f(y,v){return a[v.id]===!0||(v.addEventListener("dispose",u),a[v.id]=!0,n.memory.geometries++),v}function h(y){const v=y.attributes;for(const E in v)e.update(v[E],s.ARRAY_BUFFER);const S=y.morphAttributes;for(const E in S){const A=S[E];for(let x=0,g=A.length;x<g;x++)e.update(A[x],s.ARRAY_BUFFER)}}function m(y){const v=[],S=y.index,E=y.attributes.position;let A=0;if(S!==null){const P=S.array;A=S.version;for(let N=0,C=P.length;N<C;N+=3){const K=P[N+0],k=P[N+1],O=P[N+2];v.push(K,k,k,O,O,K)}}else if(E!==void 0){const P=E.array;A=E.version;for(let N=0,C=P.length/3-1;N<C;N+=3){const K=N+0,k=N+1,O=N+2;v.push(K,k,k,O,O,K)}}else return;const x=new(Ag(v)?Ng:Lg)(v,1);x.version=A;const g=l.get(y);g&&e.remove(g),l.set(y,x)}function _(y){const v=l.get(y);if(v){const S=y.index;S!==null&&v.version<S.version&&m(y)}else m(y);return l.get(y)}return{get:f,update:h,getWireframeAttribute:_}}function dM(s,e,n){let r;function a(v){r=v}let l,u;function f(v){l=v.type,u=v.bytesPerElement}function h(v,S){s.drawElements(r,S,l,v*u),n.update(S,r,1)}function m(v,S,E){E!==0&&(s.drawElementsInstanced(r,S,l,v*u,E),n.update(S,r,E))}function _(v,S,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,S,0,l,v,0,E);let x=0;for(let g=0;g<E;g++)x+=S[g];n.update(x,r,1)}function y(v,S,E,A){if(E===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let g=0;g<v.length;g++)m(v[g]/u,S[g],A[g]);else{x.multiDrawElementsInstancedWEBGL(r,S,0,l,v,0,A,0,E);let g=0;for(let P=0;P<E;P++)g+=S[P]*A[P];n.update(g,r,1)}}this.setMode=a,this.setIndex=f,this.render=h,this.renderInstances=m,this.renderMultiDraw=_,this.renderMultiDrawInstances=y}function hM(s){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,u,f){switch(n.calls++,u){case s.TRIANGLES:n.triangles+=f*(l/3);break;case s.LINES:n.lines+=f*(l/2);break;case s.LINE_STRIP:n.lines+=f*(l-1);break;case s.LINE_LOOP:n.lines+=f*l;break;case s.POINTS:n.points+=f*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:r}}function pM(s,e,n){const r=new WeakMap,a=new Gt;function l(u,f,h){const m=u.morphTargetInfluences,_=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,y=_!==void 0?_.length:0;let v=r.get(f);if(v===void 0||v.count!==y){let b=function(){j.dispose(),r.delete(f),f.removeEventListener("dispose",b)};var S=b;v!==void 0&&v.texture.dispose();const E=f.morphAttributes.position!==void 0,A=f.morphAttributes.normal!==void 0,x=f.morphAttributes.color!==void 0,g=f.morphAttributes.position||[],P=f.morphAttributes.normal||[],N=f.morphAttributes.color||[];let C=0;E===!0&&(C=1),A===!0&&(C=2),x===!0&&(C=3);let K=f.attributes.position.count*C,k=1;K>e.maxTextureSize&&(k=Math.ceil(K/e.maxTextureSize),K=e.maxTextureSize);const O=new Float32Array(K*k*4*y),j=new bg(O,K,k,y);j.type=Vi,j.needsUpdate=!0;const L=C*4;for(let G=0;G<y;G++){const ae=g[G],ie=P[G],pe=N[G],ve=K*k*4*G;for(let ce=0;ce<ae.count;ce++){const he=ce*L;E===!0&&(a.fromBufferAttribute(ae,ce),O[ve+he+0]=a.x,O[ve+he+1]=a.y,O[ve+he+2]=a.z,O[ve+he+3]=0),A===!0&&(a.fromBufferAttribute(ie,ce),O[ve+he+4]=a.x,O[ve+he+5]=a.y,O[ve+he+6]=a.z,O[ve+he+7]=0),x===!0&&(a.fromBufferAttribute(pe,ce),O[ve+he+8]=a.x,O[ve+he+9]=a.y,O[ve+he+10]=a.z,O[ve+he+11]=pe.itemSize===4?a.w:1)}}v={count:y,texture:j,size:new At(K,k)},r.set(f,v),f.addEventListener("dispose",b)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",u.morphTexture,n);else{let E=0;for(let x=0;x<m.length;x++)E+=m[x];const A=f.morphTargetsRelative?1:1-E;h.getUniforms().setValue(s,"morphTargetBaseInfluence",A),h.getUniforms().setValue(s,"morphTargetInfluences",m)}h.getUniforms().setValue(s,"morphTargetsTexture",v.texture,n),h.getUniforms().setValue(s,"morphTargetsTextureSize",v.size)}return{update:l}}function mM(s,e,n,r){let a=new WeakMap;function l(h){const m=r.render.frame,_=h.geometry,y=e.get(h,_);if(a.get(y)!==m&&(e.update(y),a.set(y,m)),h.isInstancedMesh&&(h.hasEventListener("dispose",f)===!1&&h.addEventListener("dispose",f),a.get(h)!==m&&(n.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&n.update(h.instanceColor,s.ARRAY_BUFFER),a.set(h,m))),h.isSkinnedMesh){const v=h.skeleton;a.get(v)!==m&&(v.update(),a.set(v,m))}return y}function u(){a=new WeakMap}function f(h){const m=h.target;m.removeEventListener("dispose",f),n.remove(m.instanceMatrix),m.instanceColor!==null&&n.remove(m.instanceColor)}return{update:l,dispose:u}}class kg extends Pn{constructor(e,n,r,a,l,u,f,h,m,_=Bs){if(_!==Bs&&_!==Xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&_===Bs&&(r=Qr),r===void 0&&_===Xs&&(r=js),super(null,a,l,u,f,h,_,r,m),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=f!==void 0?f:di,this.minFilter=h!==void 0?h:di,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const zg=new Pn,Em=new kg(1,1),Bg=new bg,Vg=new ex,Hg=new Ug,wm=[],Tm=[],Am=new Float32Array(16),Cm=new Float32Array(9),bm=new Float32Array(4);function Zs(s,e,n){const r=s[0];if(r<=0||r>0)return s;const a=e*n;let l=wm[a];if(l===void 0&&(l=new Float32Array(a),wm[a]=l),e!==0){r.toArray(l,0);for(let u=1,f=0;u!==e;++u)f+=n,s[u].toArray(l,f)}return l}function Kt(s,e){if(s.length!==e.length)return!1;for(let n=0,r=s.length;n<r;n++)if(s[n]!==e[n])return!1;return!0}function Zt(s,e){for(let n=0,r=e.length;n<r;n++)s[n]=e[n]}function zl(s,e){let n=Tm[e];n===void 0&&(n=new Int32Array(e),Tm[e]=n);for(let r=0;r!==e;++r)n[r]=s.allocateTextureUnit();return n}function gM(s,e){const n=this.cache;n[0]!==e&&(s.uniform1f(this.addr,e),n[0]=e)}function vM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Kt(n,e))return;s.uniform2fv(this.addr,e),Zt(n,e)}}function _M(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Kt(n,e))return;s.uniform3fv(this.addr,e),Zt(n,e)}}function xM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Kt(n,e))return;s.uniform4fv(this.addr,e),Zt(n,e)}}function yM(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(Kt(n,e))return;s.uniformMatrix2fv(this.addr,!1,e),Zt(n,e)}else{if(Kt(n,r))return;bm.set(r),s.uniformMatrix2fv(this.addr,!1,bm),Zt(n,r)}}function SM(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(Kt(n,e))return;s.uniformMatrix3fv(this.addr,!1,e),Zt(n,e)}else{if(Kt(n,r))return;Cm.set(r),s.uniformMatrix3fv(this.addr,!1,Cm),Zt(n,r)}}function MM(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(Kt(n,e))return;s.uniformMatrix4fv(this.addr,!1,e),Zt(n,e)}else{if(Kt(n,r))return;Am.set(r),s.uniformMatrix4fv(this.addr,!1,Am),Zt(n,r)}}function EM(s,e){const n=this.cache;n[0]!==e&&(s.uniform1i(this.addr,e),n[0]=e)}function wM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Kt(n,e))return;s.uniform2iv(this.addr,e),Zt(n,e)}}function TM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Kt(n,e))return;s.uniform3iv(this.addr,e),Zt(n,e)}}function AM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Kt(n,e))return;s.uniform4iv(this.addr,e),Zt(n,e)}}function CM(s,e){const n=this.cache;n[0]!==e&&(s.uniform1ui(this.addr,e),n[0]=e)}function bM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Kt(n,e))return;s.uniform2uiv(this.addr,e),Zt(n,e)}}function RM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Kt(n,e))return;s.uniform3uiv(this.addr,e),Zt(n,e)}}function PM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Kt(n,e))return;s.uniform4uiv(this.addr,e),Zt(n,e)}}function LM(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let l;this.type===s.SAMPLER_2D_SHADOW?(Em.compareFunction=Tg,l=Em):l=zg,n.setTexture2D(e||l,a)}function NM(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture3D(e||Vg,a)}function DM(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTextureCube(e||Hg,a)}function IM(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture2DArray(e||Bg,a)}function UM(s){switch(s){case 5126:return gM;case 35664:return vM;case 35665:return _M;case 35666:return xM;case 35674:return yM;case 35675:return SM;case 35676:return MM;case 5124:case 35670:return EM;case 35667:case 35671:return wM;case 35668:case 35672:return TM;case 35669:case 35673:return AM;case 5125:return CM;case 36294:return bM;case 36295:return RM;case 36296:return PM;case 35678:case 36198:case 36298:case 36306:case 35682:return LM;case 35679:case 36299:case 36307:return NM;case 35680:case 36300:case 36308:case 36293:return DM;case 36289:case 36303:case 36311:case 36292:return IM}}function FM(s,e){s.uniform1fv(this.addr,e)}function OM(s,e){const n=Zs(e,this.size,2);s.uniform2fv(this.addr,n)}function kM(s,e){const n=Zs(e,this.size,3);s.uniform3fv(this.addr,n)}function zM(s,e){const n=Zs(e,this.size,4);s.uniform4fv(this.addr,n)}function BM(s,e){const n=Zs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,n)}function VM(s,e){const n=Zs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,n)}function HM(s,e){const n=Zs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,n)}function GM(s,e){s.uniform1iv(this.addr,e)}function WM(s,e){s.uniform2iv(this.addr,e)}function jM(s,e){s.uniform3iv(this.addr,e)}function XM(s,e){s.uniform4iv(this.addr,e)}function $M(s,e){s.uniform1uiv(this.addr,e)}function qM(s,e){s.uniform2uiv(this.addr,e)}function YM(s,e){s.uniform3uiv(this.addr,e)}function KM(s,e){s.uniform4uiv(this.addr,e)}function ZM(s,e,n){const r=this.cache,a=e.length,l=zl(n,a);Kt(r,l)||(s.uniform1iv(this.addr,l),Zt(r,l));for(let u=0;u!==a;++u)n.setTexture2D(e[u]||zg,l[u])}function QM(s,e,n){const r=this.cache,a=e.length,l=zl(n,a);Kt(r,l)||(s.uniform1iv(this.addr,l),Zt(r,l));for(let u=0;u!==a;++u)n.setTexture3D(e[u]||Vg,l[u])}function JM(s,e,n){const r=this.cache,a=e.length,l=zl(n,a);Kt(r,l)||(s.uniform1iv(this.addr,l),Zt(r,l));for(let u=0;u!==a;++u)n.setTextureCube(e[u]||Hg,l[u])}function e1(s,e,n){const r=this.cache,a=e.length,l=zl(n,a);Kt(r,l)||(s.uniform1iv(this.addr,l),Zt(r,l));for(let u=0;u!==a;++u)n.setTexture2DArray(e[u]||Bg,l[u])}function t1(s){switch(s){case 5126:return FM;case 35664:return OM;case 35665:return kM;case 35666:return zM;case 35674:return BM;case 35675:return VM;case 35676:return HM;case 5124:case 35670:return GM;case 35667:case 35671:return WM;case 35668:case 35672:return jM;case 35669:case 35673:return XM;case 5125:return $M;case 36294:return qM;case 36295:return YM;case 36296:return KM;case 35678:case 36198:case 36298:case 36306:case 35682:return ZM;case 35679:case 36299:case 36307:return QM;case 35680:case 36300:case 36308:case 36293:return JM;case 36289:case 36303:case 36311:case 36292:return e1}}class n1{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.setValue=UM(n.type)}}class i1{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=t1(n.type)}}class r1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,r){const a=this.seq;for(let l=0,u=a.length;l!==u;++l){const f=a[l];f.setValue(e,n[f.id],r)}}}const tf=/(\w+)(\])?(\[|\.)?/g;function Rm(s,e){s.seq.push(e),s.map[e.id]=e}function s1(s,e,n){const r=s.name,a=r.length;for(tf.lastIndex=0;;){const l=tf.exec(r),u=tf.lastIndex;let f=l[1];const h=l[2]==="]",m=l[3];if(h&&(f=f|0),m===void 0||m==="["&&u+2===a){Rm(n,m===void 0?new n1(f,s,e):new i1(f,s,e));break}else{let y=n.map[f];y===void 0&&(y=new r1(f),Rm(n,y)),n=y}}}class Pl{constructor(e,n){this.seq=[],this.map={};const r=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<r;++a){const l=e.getActiveUniform(n,a),u=e.getUniformLocation(n,l.name);s1(l,u,this)}}setValue(e,n,r,a){const l=this.map[n];l!==void 0&&l.setValue(e,r,a)}setOptional(e,n,r){const a=n[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,n,r,a){for(let l=0,u=n.length;l!==u;++l){const f=n[l],h=r[f.id];h.needsUpdate!==!1&&f.setValue(e,h.value,a)}}static seqWithValue(e,n){const r=[];for(let a=0,l=e.length;a!==l;++a){const u=e[a];u.id in n&&r.push(u)}return r}}function Pm(s,e,n){const r=s.createShader(e);return s.shaderSource(r,n),s.compileShader(r),r}const o1=37297;let a1=0;function l1(s,e){const n=s.split(`
`),r=[],a=Math.max(e-6,0),l=Math.min(e+6,n.length);for(let u=a;u<l;u++){const f=u+1;r.push(`${f===e?">":" "} ${f}: ${n[u]}`)}return r.join(`
`)}const Lm=new ht;function c1(s){Mt._getMatrix(Lm,Mt.workingColorSpace,s);const e=`mat3( ${Lm.elements.map(n=>n.toFixed(4))} )`;switch(Mt.getTransfer(s)){case Ol:return[e,"LinearTransferOETF"];case Lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Nm(s,e,n){const r=s.getShaderParameter(e,s.COMPILE_STATUS),a=s.getShaderInfoLog(e).trim();if(r&&a==="")return"";const l=/ERROR: 0:(\d+)/.exec(a);if(l){const u=parseInt(l[1]);return n.toUpperCase()+`

`+a+`

`+l1(s.getShaderSource(e),u)}else return a}function u1(s,e){const n=c1(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function f1(s,e){let n;switch(e){case A_:n="Linear";break;case C_:n="Reinhard";break;case b_:n="Cineon";break;case R_:n="ACESFilmic";break;case L_:n="AgX";break;case N_:n="Neutral";break;case P_:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+s+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const xl=new J;function d1(){Mt.getLuminanceCoefficients(xl);const s=xl.x.toFixed(4),e=xl.y.toFixed(4),n=xl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function h1(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ko).join(`
`)}function p1(s){const e=[];for(const n in s){const r=s[n];r!==!1&&e.push("#define "+n+" "+r)}return e.join(`
`)}function m1(s,e){const n={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const l=s.getActiveAttrib(e,a),u=l.name;let f=1;l.type===s.FLOAT_MAT2&&(f=2),l.type===s.FLOAT_MAT3&&(f=3),l.type===s.FLOAT_MAT4&&(f=4),n[u]={type:l.type,location:s.getAttribLocation(e,u),locationSize:f}}return n}function ko(s){return s!==""}function Dm(s,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Im(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const g1=/^[ \t]*#include +<([\w\d./]+)>/gm;function $f(s){return s.replace(g1,_1)}const v1=new Map;function _1(s,e){let n=pt[e];if(n===void 0){const r=v1.get(e);if(r!==void 0)n=pt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return $f(n)}const x1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Um(s){return s.replace(x1,y1)}function y1(s,e,n,r){let a="";for(let l=parseInt(e);l<parseInt(n);l++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return a}function Fm(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function S1(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===dg?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===s_?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===zi&&(e="SHADOWMAP_TYPE_VSM"),e}function M1(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Gs:case Ws:e="ENVMAP_TYPE_CUBE";break;case Fl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function E1(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ws:e="ENVMAP_MODE_REFRACTION";break}return e}function w1(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case hg:e="ENVMAP_BLENDING_MULTIPLY";break;case w_:e="ENVMAP_BLENDING_MIX";break;case T_:e="ENVMAP_BLENDING_ADD";break}return e}function T1(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:r,maxMip:n}}function A1(s,e,n,r){const a=s.getContext(),l=n.defines;let u=n.vertexShader,f=n.fragmentShader;const h=S1(n),m=M1(n),_=E1(n),y=w1(n),v=T1(n),S=h1(n),E=p1(l),A=a.createProgram();let x,g,P=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(x=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(ko).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(ko).join(`
`),g.length>0&&(g+=`
`)):(x=[Fm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+_:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ko).join(`
`),g=[Fm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+m:"",n.envMap?"#define "+_:"",n.envMap?"#define "+y:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Sr?"#define TONE_MAPPING":"",n.toneMapping!==Sr?pt.tonemapping_pars_fragment:"",n.toneMapping!==Sr?f1("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,u1("linearToOutputTexel",n.outputColorSpace),d1(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ko).join(`
`)),u=$f(u),u=Dm(u,n),u=Im(u,n),f=$f(f),f=Dm(f,n),f=Im(f,n),u=Um(u),f=Um(f),n.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,x=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",n.glslVersion===Yp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Yp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const N=P+x+u,C=P+g+f,K=Pm(a,a.VERTEX_SHADER,N),k=Pm(a,a.FRAGMENT_SHADER,C);a.attachShader(A,K),a.attachShader(A,k),n.index0AttributeName!==void 0?a.bindAttribLocation(A,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(A,0,"position"),a.linkProgram(A);function O(G){if(s.debug.checkShaderErrors){const ae=a.getProgramInfoLog(A).trim(),ie=a.getShaderInfoLog(K).trim(),pe=a.getShaderInfoLog(k).trim();let ve=!0,ce=!0;if(a.getProgramParameter(A,a.LINK_STATUS)===!1)if(ve=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,A,K,k);else{const he=Nm(a,K,"vertex"),V=Nm(a,k,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(A,a.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+ae+`
`+he+`
`+V)}else ae!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ae):(ie===""||pe==="")&&(ce=!1);ce&&(G.diagnostics={runnable:ve,programLog:ae,vertexShader:{log:ie,prefix:x},fragmentShader:{log:pe,prefix:g}})}a.deleteShader(K),a.deleteShader(k),j=new Pl(a,A),L=m1(a,A)}let j;this.getUniforms=function(){return j===void 0&&O(this),j};let L;this.getAttributes=function(){return L===void 0&&O(this),L};let b=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=a.getProgramParameter(A,o1)),b},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(A),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=a1++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=K,this.fragmentShader=k,this}let C1=0;class b1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(n),l=this._getShaderStage(r),u=this._getShaderCacheForMaterial(e);return u.has(a)===!1&&(u.add(a),a.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const r of n)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let r=n.get(e);return r===void 0&&(r=new Set,n.set(e,r)),r}_getShaderStage(e){const n=this.shaderCache;let r=n.get(e);return r===void 0&&(r=new R1(e),n.set(e,r)),r}}class R1{constructor(e){this.id=C1++,this.code=e,this.usedTimes=0}}function P1(s,e,n,r,a,l,u){const f=new Rg,h=new b1,m=new Set,_=[],y=a.logarithmicDepthBuffer,v=a.vertexTextures;let S=a.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(L){return m.add(L),L===0?"uv":`uv${L}`}function x(L,b,G,ae,ie){const pe=ae.fog,ve=ie.geometry,ce=L.isMeshStandardMaterial?ae.environment:null,he=(L.isMeshStandardMaterial?n:e).get(L.envMap||ce),V=he&&he.mapping===Fl?he.image.height:null,ue=E[L.type];L.precision!==null&&(S=a.getMaxPrecision(L.precision),S!==L.precision&&console.warn("THREE.WebGLProgram.getParameters:",L.precision,"not supported, using",S,"instead."));const D=ve.morphAttributes.position||ve.morphAttributes.normal||ve.morphAttributes.color,M=D!==void 0?D.length:0;let z=0;ve.morphAttributes.position!==void 0&&(z=1),ve.morphAttributes.normal!==void 0&&(z=2),ve.morphAttributes.color!==void 0&&(z=3);let fe,W,Q,le;if(ue){const yt=xi[ue];fe=yt.vertexShader,W=yt.fragmentShader}else fe=L.vertexShader,W=L.fragmentShader,h.update(L),Q=h.getVertexShaderID(L),le=h.getFragmentShaderID(L);const ne=s.getRenderTarget(),me=s.state.buffers.depth.getReversed(),Se=ie.isInstancedMesh===!0,Ne=ie.isBatchedMesh===!0,$e=!!L.map,We=!!L.matcap,it=!!he,B=!!L.aoMap,Et=!!L.lightMap,Be=!!L.bumpMap,we=!!L.normalMap,be=!!L.displacementMap,at=!!L.emissiveMap,Oe=!!L.metalnessMap,I=!!L.roughnessMap,T=L.anisotropy>0,ee=L.clearcoat>0,_e=L.dispersion>0,ye=L.iridescence>0,ge=L.sheen>0,Ve=L.transmission>0,Le=T&&!!L.anisotropyMap,De=ee&&!!L.clearcoatMap,ft=ee&&!!L.clearcoatNormalMap,Te=ee&&!!L.clearcoatRoughnessMap,He=ye&&!!L.iridescenceMap,et=ye&&!!L.iridescenceThicknessMap,rt=ge&&!!L.sheenColorMap,je=ge&&!!L.sheenRoughnessMap,mt=!!L.specularMap,ct=!!L.specularColorMap,bt=!!L.specularIntensityMap,$=Ve&&!!L.transmissionMap,Ie=Ve&&!!L.thicknessMap,de=!!L.gradientMap,xe=!!L.alphaMap,ke=L.alphaTest>0,Fe=!!L.alphaHash,ut=!!L.extensions;let It=Sr;L.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(It=s.toneMapping);const Xt={shaderID:ue,shaderType:L.type,shaderName:L.name,vertexShader:fe,fragmentShader:W,defines:L.defines,customVertexShaderID:Q,customFragmentShaderID:le,isRawShaderMaterial:L.isRawShaderMaterial===!0,glslVersion:L.glslVersion,precision:S,batching:Ne,batchingColor:Ne&&ie._colorsTexture!==null,instancing:Se,instancingColor:Se&&ie.instanceColor!==null,instancingMorph:Se&&ie.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:ne===null?s.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:qs,alphaToCoverage:!!L.alphaToCoverage,map:$e,matcap:We,envMap:it,envMapMode:it&&he.mapping,envMapCubeUVHeight:V,aoMap:B,lightMap:Et,bumpMap:Be,normalMap:we,displacementMap:v&&be,emissiveMap:at,normalMapObjectSpace:we&&L.normalMapType===O_,normalMapTangentSpace:we&&L.normalMapType===F_,metalnessMap:Oe,roughnessMap:I,anisotropy:T,anisotropyMap:Le,clearcoat:ee,clearcoatMap:De,clearcoatNormalMap:ft,clearcoatRoughnessMap:Te,dispersion:_e,iridescence:ye,iridescenceMap:He,iridescenceThicknessMap:et,sheen:ge,sheenColorMap:rt,sheenRoughnessMap:je,specularMap:mt,specularColorMap:ct,specularIntensityMap:bt,transmission:Ve,transmissionMap:$,thicknessMap:Ie,gradientMap:de,opaque:L.transparent===!1&&L.blending===Zr&&L.alphaToCoverage===!1,alphaMap:xe,alphaTest:ke,alphaHash:Fe,combine:L.combine,mapUv:$e&&A(L.map.channel),aoMapUv:B&&A(L.aoMap.channel),lightMapUv:Et&&A(L.lightMap.channel),bumpMapUv:Be&&A(L.bumpMap.channel),normalMapUv:we&&A(L.normalMap.channel),displacementMapUv:be&&A(L.displacementMap.channel),emissiveMapUv:at&&A(L.emissiveMap.channel),metalnessMapUv:Oe&&A(L.metalnessMap.channel),roughnessMapUv:I&&A(L.roughnessMap.channel),anisotropyMapUv:Le&&A(L.anisotropyMap.channel),clearcoatMapUv:De&&A(L.clearcoatMap.channel),clearcoatNormalMapUv:ft&&A(L.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&A(L.clearcoatRoughnessMap.channel),iridescenceMapUv:He&&A(L.iridescenceMap.channel),iridescenceThicknessMapUv:et&&A(L.iridescenceThicknessMap.channel),sheenColorMapUv:rt&&A(L.sheenColorMap.channel),sheenRoughnessMapUv:je&&A(L.sheenRoughnessMap.channel),specularMapUv:mt&&A(L.specularMap.channel),specularColorMapUv:ct&&A(L.specularColorMap.channel),specularIntensityMapUv:bt&&A(L.specularIntensityMap.channel),transmissionMapUv:$&&A(L.transmissionMap.channel),thicknessMapUv:Ie&&A(L.thicknessMap.channel),alphaMapUv:xe&&A(L.alphaMap.channel),vertexTangents:!!ve.attributes.tangent&&(we||T),vertexColors:L.vertexColors,vertexAlphas:L.vertexColors===!0&&!!ve.attributes.color&&ve.attributes.color.itemSize===4,pointsUvs:ie.isPoints===!0&&!!ve.attributes.uv&&($e||xe),fog:!!pe,useFog:L.fog===!0,fogExp2:!!pe&&pe.isFogExp2,flatShading:L.flatShading===!0,sizeAttenuation:L.sizeAttenuation===!0,logarithmicDepthBuffer:y,reverseDepthBuffer:me,skinning:ie.isSkinnedMesh===!0,morphTargets:ve.morphAttributes.position!==void 0,morphNormals:ve.morphAttributes.normal!==void 0,morphColors:ve.morphAttributes.color!==void 0,morphTargetsCount:M,morphTextureStride:z,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:L.dithering,shadowMapEnabled:s.shadowMap.enabled&&G.length>0,shadowMapType:s.shadowMap.type,toneMapping:It,decodeVideoTexture:$e&&L.map.isVideoTexture===!0&&Mt.getTransfer(L.map.colorSpace)===Lt,decodeVideoTextureEmissive:at&&L.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(L.emissiveMap.colorSpace)===Lt,premultipliedAlpha:L.premultipliedAlpha,doubleSided:L.side===Bi,flipSided:L.side===Rn,useDepthPacking:L.depthPacking>=0,depthPacking:L.depthPacking||0,index0AttributeName:L.index0AttributeName,extensionClipCullDistance:ut&&L.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ut&&L.extensions.multiDraw===!0||Ne)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:L.customProgramCacheKey()};return Xt.vertexUv1s=m.has(1),Xt.vertexUv2s=m.has(2),Xt.vertexUv3s=m.has(3),m.clear(),Xt}function g(L){const b=[];if(L.shaderID?b.push(L.shaderID):(b.push(L.customVertexShaderID),b.push(L.customFragmentShaderID)),L.defines!==void 0)for(const G in L.defines)b.push(G),b.push(L.defines[G]);return L.isRawShaderMaterial===!1&&(P(b,L),N(b,L),b.push(s.outputColorSpace)),b.push(L.customProgramCacheKey),b.join()}function P(L,b){L.push(b.precision),L.push(b.outputColorSpace),L.push(b.envMapMode),L.push(b.envMapCubeUVHeight),L.push(b.mapUv),L.push(b.alphaMapUv),L.push(b.lightMapUv),L.push(b.aoMapUv),L.push(b.bumpMapUv),L.push(b.normalMapUv),L.push(b.displacementMapUv),L.push(b.emissiveMapUv),L.push(b.metalnessMapUv),L.push(b.roughnessMapUv),L.push(b.anisotropyMapUv),L.push(b.clearcoatMapUv),L.push(b.clearcoatNormalMapUv),L.push(b.clearcoatRoughnessMapUv),L.push(b.iridescenceMapUv),L.push(b.iridescenceThicknessMapUv),L.push(b.sheenColorMapUv),L.push(b.sheenRoughnessMapUv),L.push(b.specularMapUv),L.push(b.specularColorMapUv),L.push(b.specularIntensityMapUv),L.push(b.transmissionMapUv),L.push(b.thicknessMapUv),L.push(b.combine),L.push(b.fogExp2),L.push(b.sizeAttenuation),L.push(b.morphTargetsCount),L.push(b.morphAttributeCount),L.push(b.numDirLights),L.push(b.numPointLights),L.push(b.numSpotLights),L.push(b.numSpotLightMaps),L.push(b.numHemiLights),L.push(b.numRectAreaLights),L.push(b.numDirLightShadows),L.push(b.numPointLightShadows),L.push(b.numSpotLightShadows),L.push(b.numSpotLightShadowsWithMaps),L.push(b.numLightProbes),L.push(b.shadowMapType),L.push(b.toneMapping),L.push(b.numClippingPlanes),L.push(b.numClipIntersection),L.push(b.depthPacking)}function N(L,b){f.disableAll(),b.supportsVertexTextures&&f.enable(0),b.instancing&&f.enable(1),b.instancingColor&&f.enable(2),b.instancingMorph&&f.enable(3),b.matcap&&f.enable(4),b.envMap&&f.enable(5),b.normalMapObjectSpace&&f.enable(6),b.normalMapTangentSpace&&f.enable(7),b.clearcoat&&f.enable(8),b.iridescence&&f.enable(9),b.alphaTest&&f.enable(10),b.vertexColors&&f.enable(11),b.vertexAlphas&&f.enable(12),b.vertexUv1s&&f.enable(13),b.vertexUv2s&&f.enable(14),b.vertexUv3s&&f.enable(15),b.vertexTangents&&f.enable(16),b.anisotropy&&f.enable(17),b.alphaHash&&f.enable(18),b.batching&&f.enable(19),b.dispersion&&f.enable(20),b.batchingColor&&f.enable(21),L.push(f.mask),f.disableAll(),b.fog&&f.enable(0),b.useFog&&f.enable(1),b.flatShading&&f.enable(2),b.logarithmicDepthBuffer&&f.enable(3),b.reverseDepthBuffer&&f.enable(4),b.skinning&&f.enable(5),b.morphTargets&&f.enable(6),b.morphNormals&&f.enable(7),b.morphColors&&f.enable(8),b.premultipliedAlpha&&f.enable(9),b.shadowMapEnabled&&f.enable(10),b.doubleSided&&f.enable(11),b.flipSided&&f.enable(12),b.useDepthPacking&&f.enable(13),b.dithering&&f.enable(14),b.transmission&&f.enable(15),b.sheen&&f.enable(16),b.opaque&&f.enable(17),b.pointsUvs&&f.enable(18),b.decodeVideoTexture&&f.enable(19),b.decodeVideoTextureEmissive&&f.enable(20),b.alphaToCoverage&&f.enable(21),L.push(f.mask)}function C(L){const b=E[L.type];let G;if(b){const ae=xi[b];G=dx.clone(ae.uniforms)}else G=L.uniforms;return G}function K(L,b){let G;for(let ae=0,ie=_.length;ae<ie;ae++){const pe=_[ae];if(pe.cacheKey===b){G=pe,++G.usedTimes;break}}return G===void 0&&(G=new A1(s,b,L,l),_.push(G)),G}function k(L){if(--L.usedTimes===0){const b=_.indexOf(L);_[b]=_[_.length-1],_.pop(),L.destroy()}}function O(L){h.remove(L)}function j(){h.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:C,acquireProgram:K,releaseProgram:k,releaseShaderCache:O,programs:_,dispose:j}}function L1(){let s=new WeakMap;function e(u){return s.has(u)}function n(u){let f=s.get(u);return f===void 0&&(f={},s.set(u,f)),f}function r(u){s.delete(u)}function a(u,f,h){s.get(u)[f]=h}function l(){s=new WeakMap}return{has:e,get:n,remove:r,update:a,dispose:l}}function N1(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Om(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function km(){const s=[];let e=0;const n=[],r=[],a=[];function l(){e=0,n.length=0,r.length=0,a.length=0}function u(y,v,S,E,A,x){let g=s[e];return g===void 0?(g={id:y.id,object:y,geometry:v,material:S,groupOrder:E,renderOrder:y.renderOrder,z:A,group:x},s[e]=g):(g.id=y.id,g.object=y,g.geometry=v,g.material=S,g.groupOrder=E,g.renderOrder=y.renderOrder,g.z=A,g.group=x),e++,g}function f(y,v,S,E,A,x){const g=u(y,v,S,E,A,x);S.transmission>0?r.push(g):S.transparent===!0?a.push(g):n.push(g)}function h(y,v,S,E,A,x){const g=u(y,v,S,E,A,x);S.transmission>0?r.unshift(g):S.transparent===!0?a.unshift(g):n.unshift(g)}function m(y,v){n.length>1&&n.sort(y||N1),r.length>1&&r.sort(v||Om),a.length>1&&a.sort(v||Om)}function _(){for(let y=e,v=s.length;y<v;y++){const S=s[y];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:n,transmissive:r,transparent:a,init:l,push:f,unshift:h,finish:_,sort:m}}function D1(){let s=new WeakMap;function e(r,a){const l=s.get(r);let u;return l===void 0?(u=new km,s.set(r,[u])):a>=l.length?(u=new km,l.push(u)):u=l[a],u}function n(){s=new WeakMap}return{get:e,dispose:n}}function I1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new J,color:new Rt};break;case"SpotLight":n={position:new J,direction:new J,color:new Rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new J,color:new Rt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new J,skyColor:new Rt,groundColor:new Rt};break;case"RectAreaLight":n={color:new Rt,position:new J,halfWidth:new J,halfHeight:new J};break}return s[e.id]=n,n}}}function U1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=n,n}}}let F1=0;function O1(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function k1(s){const e=new I1,n=U1(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)r.probe.push(new J);const a=new J,l=new Bt,u=new Bt;function f(m){let _=0,y=0,v=0;for(let L=0;L<9;L++)r.probe[L].set(0,0,0);let S=0,E=0,A=0,x=0,g=0,P=0,N=0,C=0,K=0,k=0,O=0;m.sort(O1);for(let L=0,b=m.length;L<b;L++){const G=m[L],ae=G.color,ie=G.intensity,pe=G.distance,ve=G.shadow&&G.shadow.map?G.shadow.map.texture:null;if(G.isAmbientLight)_+=ae.r*ie,y+=ae.g*ie,v+=ae.b*ie;else if(G.isLightProbe){for(let ce=0;ce<9;ce++)r.probe[ce].addScaledVector(G.sh.coefficients[ce],ie);O++}else if(G.isDirectionalLight){const ce=e.get(G);if(ce.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const he=G.shadow,V=n.get(G);V.shadowIntensity=he.intensity,V.shadowBias=he.bias,V.shadowNormalBias=he.normalBias,V.shadowRadius=he.radius,V.shadowMapSize=he.mapSize,r.directionalShadow[S]=V,r.directionalShadowMap[S]=ve,r.directionalShadowMatrix[S]=G.shadow.matrix,P++}r.directional[S]=ce,S++}else if(G.isSpotLight){const ce=e.get(G);ce.position.setFromMatrixPosition(G.matrixWorld),ce.color.copy(ae).multiplyScalar(ie),ce.distance=pe,ce.coneCos=Math.cos(G.angle),ce.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),ce.decay=G.decay,r.spot[A]=ce;const he=G.shadow;if(G.map&&(r.spotLightMap[K]=G.map,K++,he.updateMatrices(G),G.castShadow&&k++),r.spotLightMatrix[A]=he.matrix,G.castShadow){const V=n.get(G);V.shadowIntensity=he.intensity,V.shadowBias=he.bias,V.shadowNormalBias=he.normalBias,V.shadowRadius=he.radius,V.shadowMapSize=he.mapSize,r.spotShadow[A]=V,r.spotShadowMap[A]=ve,C++}A++}else if(G.isRectAreaLight){const ce=e.get(G);ce.color.copy(ae).multiplyScalar(ie),ce.halfWidth.set(G.width*.5,0,0),ce.halfHeight.set(0,G.height*.5,0),r.rectArea[x]=ce,x++}else if(G.isPointLight){const ce=e.get(G);if(ce.color.copy(G.color).multiplyScalar(G.intensity),ce.distance=G.distance,ce.decay=G.decay,G.castShadow){const he=G.shadow,V=n.get(G);V.shadowIntensity=he.intensity,V.shadowBias=he.bias,V.shadowNormalBias=he.normalBias,V.shadowRadius=he.radius,V.shadowMapSize=he.mapSize,V.shadowCameraNear=he.camera.near,V.shadowCameraFar=he.camera.far,r.pointShadow[E]=V,r.pointShadowMap[E]=ve,r.pointShadowMatrix[E]=G.shadow.matrix,N++}r.point[E]=ce,E++}else if(G.isHemisphereLight){const ce=e.get(G);ce.skyColor.copy(G.color).multiplyScalar(ie),ce.groundColor.copy(G.groundColor).multiplyScalar(ie),r.hemi[g]=ce,g++}}x>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ue.LTC_FLOAT_1,r.rectAreaLTC2=Ue.LTC_FLOAT_2):(r.rectAreaLTC1=Ue.LTC_HALF_1,r.rectAreaLTC2=Ue.LTC_HALF_2)),r.ambient[0]=_,r.ambient[1]=y,r.ambient[2]=v;const j=r.hash;(j.directionalLength!==S||j.pointLength!==E||j.spotLength!==A||j.rectAreaLength!==x||j.hemiLength!==g||j.numDirectionalShadows!==P||j.numPointShadows!==N||j.numSpotShadows!==C||j.numSpotMaps!==K||j.numLightProbes!==O)&&(r.directional.length=S,r.spot.length=A,r.rectArea.length=x,r.point.length=E,r.hemi.length=g,r.directionalShadow.length=P,r.directionalShadowMap.length=P,r.pointShadow.length=N,r.pointShadowMap.length=N,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=P,r.pointShadowMatrix.length=N,r.spotLightMatrix.length=C+K-k,r.spotLightMap.length=K,r.numSpotLightShadowsWithMaps=k,r.numLightProbes=O,j.directionalLength=S,j.pointLength=E,j.spotLength=A,j.rectAreaLength=x,j.hemiLength=g,j.numDirectionalShadows=P,j.numPointShadows=N,j.numSpotShadows=C,j.numSpotMaps=K,j.numLightProbes=O,r.version=F1++)}function h(m,_){let y=0,v=0,S=0,E=0,A=0;const x=_.matrixWorldInverse;for(let g=0,P=m.length;g<P;g++){const N=m[g];if(N.isDirectionalLight){const C=r.directional[y];C.direction.setFromMatrixPosition(N.matrixWorld),a.setFromMatrixPosition(N.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(x),y++}else if(N.isSpotLight){const C=r.spot[S];C.position.setFromMatrixPosition(N.matrixWorld),C.position.applyMatrix4(x),C.direction.setFromMatrixPosition(N.matrixWorld),a.setFromMatrixPosition(N.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(x),S++}else if(N.isRectAreaLight){const C=r.rectArea[E];C.position.setFromMatrixPosition(N.matrixWorld),C.position.applyMatrix4(x),u.identity(),l.copy(N.matrixWorld),l.premultiply(x),u.extractRotation(l),C.halfWidth.set(N.width*.5,0,0),C.halfHeight.set(0,N.height*.5,0),C.halfWidth.applyMatrix4(u),C.halfHeight.applyMatrix4(u),E++}else if(N.isPointLight){const C=r.point[v];C.position.setFromMatrixPosition(N.matrixWorld),C.position.applyMatrix4(x),v++}else if(N.isHemisphereLight){const C=r.hemi[A];C.direction.setFromMatrixPosition(N.matrixWorld),C.direction.transformDirection(x),A++}}}return{setup:f,setupView:h,state:r}}function zm(s){const e=new k1(s),n=[],r=[];function a(_){m.camera=_,n.length=0,r.length=0}function l(_){n.push(_)}function u(_){r.push(_)}function f(){e.setup(n)}function h(_){e.setupView(n,_)}const m={lightsArray:n,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:m,setupLights:f,setupLightsView:h,pushLight:l,pushShadow:u}}function z1(s){let e=new WeakMap;function n(a,l=0){const u=e.get(a);let f;return u===void 0?(f=new zm(s),e.set(a,[f])):l>=u.length?(f=new zm(s),u.push(f)):f=u[l],f}function r(){e=new WeakMap}return{get:n,dispose:r}}class B1 extends Ks{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=I_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class V1 extends Ks{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const H1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,G1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function W1(s,e,n){let r=new Fg;const a=new At,l=new At,u=new Gt,f=new B1({depthPacking:U_}),h=new V1,m={},_=n.maxTextureSize,y={[Mr]:Rn,[Rn]:Mr,[Bi]:Bi},v=new Er({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new At},radius:{value:4}},vertexShader:H1,fragmentShader:G1}),S=v.clone();S.defines.HORIZONTAL_PASS=1;const E=new Ln;E.setAttribute("position",new Zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Si(E,v),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dg;let g=this.type;this.render=function(k,O,j){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||k.length===0)return;const L=s.getRenderTarget(),b=s.getActiveCubeFace(),G=s.getActiveMipmapLevel(),ae=s.state;ae.setBlending(yr),ae.buffers.color.setClear(1,1,1,1),ae.buffers.depth.setTest(!0),ae.setScissorTest(!1);const ie=g!==zi&&this.type===zi,pe=g===zi&&this.type!==zi;for(let ve=0,ce=k.length;ve<ce;ve++){const he=k[ve],V=he.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",he,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;a.copy(V.mapSize);const ue=V.getFrameExtents();if(a.multiply(ue),l.copy(V.mapSize),(a.x>_||a.y>_)&&(a.x>_&&(l.x=Math.floor(_/ue.x),a.x=l.x*ue.x,V.mapSize.x=l.x),a.y>_&&(l.y=Math.floor(_/ue.y),a.y=l.y*ue.y,V.mapSize.y=l.y)),V.map===null||ie===!0||pe===!0){const M=this.type!==zi?{minFilter:di,magFilter:di}:{};V.map!==null&&V.map.dispose(),V.map=new Jr(a.x,a.y,M),V.map.texture.name=he.name+".shadowMap",V.camera.updateProjectionMatrix()}s.setRenderTarget(V.map),s.clear();const D=V.getViewportCount();for(let M=0;M<D;M++){const z=V.getViewport(M);u.set(l.x*z.x,l.y*z.y,l.x*z.z,l.y*z.w),ae.viewport(u),V.updateMatrices(he,M),r=V.getFrustum(),C(O,j,V.camera,he,this.type)}V.isPointLightShadow!==!0&&this.type===zi&&P(V,j),V.needsUpdate=!1}g=this.type,x.needsUpdate=!1,s.setRenderTarget(L,b,G)};function P(k,O){const j=e.update(A);v.defines.VSM_SAMPLES!==k.blurSamples&&(v.defines.VSM_SAMPLES=k.blurSamples,S.defines.VSM_SAMPLES=k.blurSamples,v.needsUpdate=!0,S.needsUpdate=!0),k.mapPass===null&&(k.mapPass=new Jr(a.x,a.y)),v.uniforms.shadow_pass.value=k.map.texture,v.uniforms.resolution.value=k.mapSize,v.uniforms.radius.value=k.radius,s.setRenderTarget(k.mapPass),s.clear(),s.renderBufferDirect(O,null,j,v,A,null),S.uniforms.shadow_pass.value=k.mapPass.texture,S.uniforms.resolution.value=k.mapSize,S.uniforms.radius.value=k.radius,s.setRenderTarget(k.map),s.clear(),s.renderBufferDirect(O,null,j,S,A,null)}function N(k,O,j,L){let b=null;const G=j.isPointLight===!0?k.customDistanceMaterial:k.customDepthMaterial;if(G!==void 0)b=G;else if(b=j.isPointLight===!0?h:f,s.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const ae=b.uuid,ie=O.uuid;let pe=m[ae];pe===void 0&&(pe={},m[ae]=pe);let ve=pe[ie];ve===void 0&&(ve=b.clone(),pe[ie]=ve,O.addEventListener("dispose",K)),b=ve}if(b.visible=O.visible,b.wireframe=O.wireframe,L===zi?b.side=O.shadowSide!==null?O.shadowSide:O.side:b.side=O.shadowSide!==null?O.shadowSide:y[O.side],b.alphaMap=O.alphaMap,b.alphaTest=O.alphaTest,b.map=O.map,b.clipShadows=O.clipShadows,b.clippingPlanes=O.clippingPlanes,b.clipIntersection=O.clipIntersection,b.displacementMap=O.displacementMap,b.displacementScale=O.displacementScale,b.displacementBias=O.displacementBias,b.wireframeLinewidth=O.wireframeLinewidth,b.linewidth=O.linewidth,j.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const ae=s.properties.get(b);ae.light=j}return b}function C(k,O,j,L,b){if(k.visible===!1)return;if(k.layers.test(O.layers)&&(k.isMesh||k.isLine||k.isPoints)&&(k.castShadow||k.receiveShadow&&b===zi)&&(!k.frustumCulled||r.intersectsObject(k))){k.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,k.matrixWorld);const ie=e.update(k),pe=k.material;if(Array.isArray(pe)){const ve=ie.groups;for(let ce=0,he=ve.length;ce<he;ce++){const V=ve[ce],ue=pe[V.materialIndex];if(ue&&ue.visible){const D=N(k,ue,L,b);k.onBeforeShadow(s,k,O,j,ie,D,V),s.renderBufferDirect(j,null,ie,D,k,V),k.onAfterShadow(s,k,O,j,ie,D,V)}}}else if(pe.visible){const ve=N(k,pe,L,b);k.onBeforeShadow(s,k,O,j,ie,ve,null),s.renderBufferDirect(j,null,ie,ve,k,null),k.onAfterShadow(s,k,O,j,ie,ve,null)}}const ae=k.children;for(let ie=0,pe=ae.length;ie<pe;ie++)C(ae[ie],O,j,L,b)}function K(k){k.target.removeEventListener("dispose",K);for(const j in m){const L=m[j],b=k.target.uuid;b in L&&(L[b].dispose(),delete L[b])}}}const j1={[cf]:uf,[ff]:pf,[df]:mf,[Hs]:hf,[uf]:cf,[pf]:ff,[mf]:df,[hf]:Hs};function X1(s,e){function n(){let $=!1;const Ie=new Gt;let de=null;const xe=new Gt(0,0,0,0);return{setMask:function(ke){de!==ke&&!$&&(s.colorMask(ke,ke,ke,ke),de=ke)},setLocked:function(ke){$=ke},setClear:function(ke,Fe,ut,It,Xt){Xt===!0&&(ke*=It,Fe*=It,ut*=It),Ie.set(ke,Fe,ut,It),xe.equals(Ie)===!1&&(s.clearColor(ke,Fe,ut,It),xe.copy(Ie))},reset:function(){$=!1,de=null,xe.set(-1,0,0,0)}}}function r(){let $=!1,Ie=!1,de=null,xe=null,ke=null;return{setReversed:function(Fe){if(Ie!==Fe){const ut=e.get("EXT_clip_control");Ie?ut.clipControlEXT(ut.LOWER_LEFT_EXT,ut.ZERO_TO_ONE_EXT):ut.clipControlEXT(ut.LOWER_LEFT_EXT,ut.NEGATIVE_ONE_TO_ONE_EXT);const It=ke;ke=null,this.setClear(It)}Ie=Fe},getReversed:function(){return Ie},setTest:function(Fe){Fe?ne(s.DEPTH_TEST):me(s.DEPTH_TEST)},setMask:function(Fe){de!==Fe&&!$&&(s.depthMask(Fe),de=Fe)},setFunc:function(Fe){if(Ie&&(Fe=j1[Fe]),xe!==Fe){switch(Fe){case cf:s.depthFunc(s.NEVER);break;case uf:s.depthFunc(s.ALWAYS);break;case ff:s.depthFunc(s.LESS);break;case Hs:s.depthFunc(s.LEQUAL);break;case df:s.depthFunc(s.EQUAL);break;case hf:s.depthFunc(s.GEQUAL);break;case pf:s.depthFunc(s.GREATER);break;case mf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}xe=Fe}},setLocked:function(Fe){$=Fe},setClear:function(Fe){ke!==Fe&&(Ie&&(Fe=1-Fe),s.clearDepth(Fe),ke=Fe)},reset:function(){$=!1,de=null,xe=null,ke=null,Ie=!1}}}function a(){let $=!1,Ie=null,de=null,xe=null,ke=null,Fe=null,ut=null,It=null,Xt=null;return{setTest:function(yt){$||(yt?ne(s.STENCIL_TEST):me(s.STENCIL_TEST))},setMask:function(yt){Ie!==yt&&!$&&(s.stencilMask(yt),Ie=yt)},setFunc:function(yt,yn,pn){(de!==yt||xe!==yn||ke!==pn)&&(s.stencilFunc(yt,yn,pn),de=yt,xe=yn,ke=pn)},setOp:function(yt,yn,pn){(Fe!==yt||ut!==yn||It!==pn)&&(s.stencilOp(yt,yn,pn),Fe=yt,ut=yn,It=pn)},setLocked:function(yt){$=yt},setClear:function(yt){Xt!==yt&&(s.clearStencil(yt),Xt=yt)},reset:function(){$=!1,Ie=null,de=null,xe=null,ke=null,Fe=null,ut=null,It=null,Xt=null}}}const l=new n,u=new r,f=new a,h=new WeakMap,m=new WeakMap;let _={},y={},v=new WeakMap,S=[],E=null,A=!1,x=null,g=null,P=null,N=null,C=null,K=null,k=null,O=new Rt(0,0,0),j=0,L=!1,b=null,G=null,ae=null,ie=null,pe=null;const ve=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ce=!1,he=0;const V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(he=parseFloat(/^WebGL (\d)/.exec(V)[1]),ce=he>=1):V.indexOf("OpenGL ES")!==-1&&(he=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),ce=he>=2);let ue=null,D={};const M=s.getParameter(s.SCISSOR_BOX),z=s.getParameter(s.VIEWPORT),fe=new Gt().fromArray(M),W=new Gt().fromArray(z);function Q($,Ie,de,xe){const ke=new Uint8Array(4),Fe=s.createTexture();s.bindTexture($,Fe),s.texParameteri($,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri($,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ut=0;ut<de;ut++)$===s.TEXTURE_3D||$===s.TEXTURE_2D_ARRAY?s.texImage3D(Ie,0,s.RGBA,1,1,xe,0,s.RGBA,s.UNSIGNED_BYTE,ke):s.texImage2D(Ie+ut,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ke);return Fe}const le={};le[s.TEXTURE_2D]=Q(s.TEXTURE_2D,s.TEXTURE_2D,1),le[s.TEXTURE_CUBE_MAP]=Q(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[s.TEXTURE_2D_ARRAY]=Q(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),le[s.TEXTURE_3D]=Q(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),u.setClear(1),f.setClear(0),ne(s.DEPTH_TEST),u.setFunc(Hs),Be(!1),we(Wp),ne(s.CULL_FACE),B(yr);function ne($){_[$]!==!0&&(s.enable($),_[$]=!0)}function me($){_[$]!==!1&&(s.disable($),_[$]=!1)}function Se($,Ie){return y[$]!==Ie?(s.bindFramebuffer($,Ie),y[$]=Ie,$===s.DRAW_FRAMEBUFFER&&(y[s.FRAMEBUFFER]=Ie),$===s.FRAMEBUFFER&&(y[s.DRAW_FRAMEBUFFER]=Ie),!0):!1}function Ne($,Ie){let de=S,xe=!1;if($){de=v.get(Ie),de===void 0&&(de=[],v.set(Ie,de));const ke=$.textures;if(de.length!==ke.length||de[0]!==s.COLOR_ATTACHMENT0){for(let Fe=0,ut=ke.length;Fe<ut;Fe++)de[Fe]=s.COLOR_ATTACHMENT0+Fe;de.length=ke.length,xe=!0}}else de[0]!==s.BACK&&(de[0]=s.BACK,xe=!0);xe&&s.drawBuffers(de)}function $e($){return E!==$?(s.useProgram($),E=$,!0):!1}const We={[$r]:s.FUNC_ADD,[a_]:s.FUNC_SUBTRACT,[l_]:s.FUNC_REVERSE_SUBTRACT};We[c_]=s.MIN,We[u_]=s.MAX;const it={[f_]:s.ZERO,[d_]:s.ONE,[h_]:s.SRC_COLOR,[af]:s.SRC_ALPHA,[x_]:s.SRC_ALPHA_SATURATE,[v_]:s.DST_COLOR,[m_]:s.DST_ALPHA,[p_]:s.ONE_MINUS_SRC_COLOR,[lf]:s.ONE_MINUS_SRC_ALPHA,[__]:s.ONE_MINUS_DST_COLOR,[g_]:s.ONE_MINUS_DST_ALPHA,[y_]:s.CONSTANT_COLOR,[S_]:s.ONE_MINUS_CONSTANT_COLOR,[M_]:s.CONSTANT_ALPHA,[E_]:s.ONE_MINUS_CONSTANT_ALPHA};function B($,Ie,de,xe,ke,Fe,ut,It,Xt,yt){if($===yr){A===!0&&(me(s.BLEND),A=!1);return}if(A===!1&&(ne(s.BLEND),A=!0),$!==o_){if($!==x||yt!==L){if((g!==$r||C!==$r)&&(s.blendEquation(s.FUNC_ADD),g=$r,C=$r),yt)switch($){case Zr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case of:s.blendFunc(s.ONE,s.ONE);break;case jp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Xp:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}else switch($){case Zr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case of:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case jp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Xp:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}P=null,N=null,K=null,k=null,O.set(0,0,0),j=0,x=$,L=yt}return}ke=ke||Ie,Fe=Fe||de,ut=ut||xe,(Ie!==g||ke!==C)&&(s.blendEquationSeparate(We[Ie],We[ke]),g=Ie,C=ke),(de!==P||xe!==N||Fe!==K||ut!==k)&&(s.blendFuncSeparate(it[de],it[xe],it[Fe],it[ut]),P=de,N=xe,K=Fe,k=ut),(It.equals(O)===!1||Xt!==j)&&(s.blendColor(It.r,It.g,It.b,Xt),O.copy(It),j=Xt),x=$,L=!1}function Et($,Ie){$.side===Bi?me(s.CULL_FACE):ne(s.CULL_FACE);let de=$.side===Rn;Ie&&(de=!de),Be(de),$.blending===Zr&&$.transparent===!1?B(yr):B($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),u.setFunc($.depthFunc),u.setTest($.depthTest),u.setMask($.depthWrite),l.setMask($.colorWrite);const xe=$.stencilWrite;f.setTest(xe),xe&&(f.setMask($.stencilWriteMask),f.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),f.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),at($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?ne(s.SAMPLE_ALPHA_TO_COVERAGE):me(s.SAMPLE_ALPHA_TO_COVERAGE)}function Be($){b!==$&&($?s.frontFace(s.CW):s.frontFace(s.CCW),b=$)}function we($){$!==i_?(ne(s.CULL_FACE),$!==G&&($===Wp?s.cullFace(s.BACK):$===r_?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):me(s.CULL_FACE),G=$}function be($){$!==ae&&(ce&&s.lineWidth($),ae=$)}function at($,Ie,de){$?(ne(s.POLYGON_OFFSET_FILL),(ie!==Ie||pe!==de)&&(s.polygonOffset(Ie,de),ie=Ie,pe=de)):me(s.POLYGON_OFFSET_FILL)}function Oe($){$?ne(s.SCISSOR_TEST):me(s.SCISSOR_TEST)}function I($){$===void 0&&($=s.TEXTURE0+ve-1),ue!==$&&(s.activeTexture($),ue=$)}function T($,Ie,de){de===void 0&&(ue===null?de=s.TEXTURE0+ve-1:de=ue);let xe=D[de];xe===void 0&&(xe={type:void 0,texture:void 0},D[de]=xe),(xe.type!==$||xe.texture!==Ie)&&(ue!==de&&(s.activeTexture(de),ue=de),s.bindTexture($,Ie||le[$]),xe.type=$,xe.texture=Ie)}function ee(){const $=D[ue];$!==void 0&&$.type!==void 0&&(s.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function _e(){try{s.compressedTexImage2D.apply(s,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ye(){try{s.compressedTexImage3D.apply(s,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ge(){try{s.texSubImage2D.apply(s,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Ve(){try{s.texSubImage3D.apply(s,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Le(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function De(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ft(){try{s.texStorage2D.apply(s,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Te(){try{s.texStorage3D.apply(s,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function He(){try{s.texImage2D.apply(s,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function et(){try{s.texImage3D.apply(s,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function rt($){fe.equals($)===!1&&(s.scissor($.x,$.y,$.z,$.w),fe.copy($))}function je($){W.equals($)===!1&&(s.viewport($.x,$.y,$.z,$.w),W.copy($))}function mt($,Ie){let de=m.get(Ie);de===void 0&&(de=new WeakMap,m.set(Ie,de));let xe=de.get($);xe===void 0&&(xe=s.getUniformBlockIndex(Ie,$.name),de.set($,xe))}function ct($,Ie){const xe=m.get(Ie).get($);h.get(Ie)!==xe&&(s.uniformBlockBinding(Ie,xe,$.__bindingPointIndex),h.set(Ie,xe))}function bt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),u.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),_={},ue=null,D={},y={},v=new WeakMap,S=[],E=null,A=!1,x=null,g=null,P=null,N=null,C=null,K=null,k=null,O=new Rt(0,0,0),j=0,L=!1,b=null,G=null,ae=null,ie=null,pe=null,fe.set(0,0,s.canvas.width,s.canvas.height),W.set(0,0,s.canvas.width,s.canvas.height),l.reset(),u.reset(),f.reset()}return{buffers:{color:l,depth:u,stencil:f},enable:ne,disable:me,bindFramebuffer:Se,drawBuffers:Ne,useProgram:$e,setBlending:B,setMaterial:Et,setFlipSided:Be,setCullFace:we,setLineWidth:be,setPolygonOffset:at,setScissorTest:Oe,activeTexture:I,bindTexture:T,unbindTexture:ee,compressedTexImage2D:_e,compressedTexImage3D:ye,texImage2D:He,texImage3D:et,updateUBOMapping:mt,uniformBlockBinding:ct,texStorage2D:ft,texStorage3D:Te,texSubImage2D:ge,texSubImage3D:Ve,compressedTexSubImage2D:Le,compressedTexSubImage3D:De,scissor:rt,viewport:je,reset:bt}}function Bm(s,e,n,r){const a=$1(r);switch(n){case _g:return s*e;case yg:return s*e;case Sg:return s*e*2;case Mg:return s*e/a.components*a.byteLength;case id:return s*e/a.components*a.byteLength;case Eg:return s*e*2/a.components*a.byteLength;case rd:return s*e*2/a.components*a.byteLength;case xg:return s*e*3/a.components*a.byteLength;case fi:return s*e*4/a.components*a.byteLength;case sd:return s*e*4/a.components*a.byteLength;case Tl:case Al:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Cl:case bl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Sf:case Ef:return Math.max(s,16)*Math.max(e,8)/4;case yf:case Mf:return Math.max(s,8)*Math.max(e,8)/2;case wf:case Tf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Af:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Cf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case bf:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Rf:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Pf:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Lf:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Nf:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Df:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case If:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Uf:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ff:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Of:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case kf:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case zf:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Bf:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Rl:case Vf:case Hf:return Math.ceil(s/4)*Math.ceil(e/4)*16;case wg:case Gf:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Wf:case jf:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function $1(s){switch(s){case Wi:case mg:return{byteLength:1,components:1};case Bo:case gg:case Vo:return{byteLength:2,components:1};case td:case nd:return{byteLength:2,components:4};case Qr:case ed:case Vi:return{byteLength:4,components:1};case vg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function q1(s,e,n,r,a,l,u){const f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new At,_=new WeakMap;let y;const v=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(I,T){return S?new OffscreenCanvas(I,T):Nl("canvas")}function A(I,T,ee){let _e=1;const ye=Oe(I);if((ye.width>ee||ye.height>ee)&&(_e=ee/Math.max(ye.width,ye.height)),_e<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const ge=Math.floor(_e*ye.width),Ve=Math.floor(_e*ye.height);y===void 0&&(y=E(ge,Ve));const Le=T?E(ge,Ve):y;return Le.width=ge,Le.height=Ve,Le.getContext("2d").drawImage(I,0,0,ge,Ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ye.width+"x"+ye.height+") to ("+ge+"x"+Ve+")."),Le}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ye.width+"x"+ye.height+")."),I;return I}function x(I){return I.generateMipmaps}function g(I){s.generateMipmap(I)}function P(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function N(I,T,ee,_e,ye=!1){if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let ge=T;if(T===s.RED&&(ee===s.FLOAT&&(ge=s.R32F),ee===s.HALF_FLOAT&&(ge=s.R16F),ee===s.UNSIGNED_BYTE&&(ge=s.R8)),T===s.RED_INTEGER&&(ee===s.UNSIGNED_BYTE&&(ge=s.R8UI),ee===s.UNSIGNED_SHORT&&(ge=s.R16UI),ee===s.UNSIGNED_INT&&(ge=s.R32UI),ee===s.BYTE&&(ge=s.R8I),ee===s.SHORT&&(ge=s.R16I),ee===s.INT&&(ge=s.R32I)),T===s.RG&&(ee===s.FLOAT&&(ge=s.RG32F),ee===s.HALF_FLOAT&&(ge=s.RG16F),ee===s.UNSIGNED_BYTE&&(ge=s.RG8)),T===s.RG_INTEGER&&(ee===s.UNSIGNED_BYTE&&(ge=s.RG8UI),ee===s.UNSIGNED_SHORT&&(ge=s.RG16UI),ee===s.UNSIGNED_INT&&(ge=s.RG32UI),ee===s.BYTE&&(ge=s.RG8I),ee===s.SHORT&&(ge=s.RG16I),ee===s.INT&&(ge=s.RG32I)),T===s.RGB_INTEGER&&(ee===s.UNSIGNED_BYTE&&(ge=s.RGB8UI),ee===s.UNSIGNED_SHORT&&(ge=s.RGB16UI),ee===s.UNSIGNED_INT&&(ge=s.RGB32UI),ee===s.BYTE&&(ge=s.RGB8I),ee===s.SHORT&&(ge=s.RGB16I),ee===s.INT&&(ge=s.RGB32I)),T===s.RGBA_INTEGER&&(ee===s.UNSIGNED_BYTE&&(ge=s.RGBA8UI),ee===s.UNSIGNED_SHORT&&(ge=s.RGBA16UI),ee===s.UNSIGNED_INT&&(ge=s.RGBA32UI),ee===s.BYTE&&(ge=s.RGBA8I),ee===s.SHORT&&(ge=s.RGBA16I),ee===s.INT&&(ge=s.RGBA32I)),T===s.RGB&&ee===s.UNSIGNED_INT_5_9_9_9_REV&&(ge=s.RGB9_E5),T===s.RGBA){const Ve=ye?Ol:Mt.getTransfer(_e);ee===s.FLOAT&&(ge=s.RGBA32F),ee===s.HALF_FLOAT&&(ge=s.RGBA16F),ee===s.UNSIGNED_BYTE&&(ge=Ve===Lt?s.SRGB8_ALPHA8:s.RGBA8),ee===s.UNSIGNED_SHORT_4_4_4_4&&(ge=s.RGBA4),ee===s.UNSIGNED_SHORT_5_5_5_1&&(ge=s.RGB5_A1)}return(ge===s.R16F||ge===s.R32F||ge===s.RG16F||ge===s.RG32F||ge===s.RGBA16F||ge===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ge}function C(I,T){let ee;return I?T===null||T===Qr||T===js?ee=s.DEPTH24_STENCIL8:T===Vi?ee=s.DEPTH32F_STENCIL8:T===Bo&&(ee=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Qr||T===js?ee=s.DEPTH_COMPONENT24:T===Vi?ee=s.DEPTH_COMPONENT32F:T===Bo&&(ee=s.DEPTH_COMPONENT16),ee}function K(I,T){return x(I)===!0||I.isFramebufferTexture&&I.minFilter!==di&&I.minFilter!==yi?Math.log2(Math.max(T.width,T.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?T.mipmaps.length:1}function k(I){const T=I.target;T.removeEventListener("dispose",k),j(T),T.isVideoTexture&&_.delete(T)}function O(I){const T=I.target;T.removeEventListener("dispose",O),b(T)}function j(I){const T=r.get(I);if(T.__webglInit===void 0)return;const ee=I.source,_e=v.get(ee);if(_e){const ye=_e[T.__cacheKey];ye.usedTimes--,ye.usedTimes===0&&L(I),Object.keys(_e).length===0&&v.delete(ee)}r.remove(I)}function L(I){const T=r.get(I);s.deleteTexture(T.__webglTexture);const ee=I.source,_e=v.get(ee);delete _e[T.__cacheKey],u.memory.textures--}function b(I){const T=r.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),r.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let _e=0;_e<6;_e++){if(Array.isArray(T.__webglFramebuffer[_e]))for(let ye=0;ye<T.__webglFramebuffer[_e].length;ye++)s.deleteFramebuffer(T.__webglFramebuffer[_e][ye]);else s.deleteFramebuffer(T.__webglFramebuffer[_e]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[_e])}else{if(Array.isArray(T.__webglFramebuffer))for(let _e=0;_e<T.__webglFramebuffer.length;_e++)s.deleteFramebuffer(T.__webglFramebuffer[_e]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let _e=0;_e<T.__webglColorRenderbuffer.length;_e++)T.__webglColorRenderbuffer[_e]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[_e]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const ee=I.textures;for(let _e=0,ye=ee.length;_e<ye;_e++){const ge=r.get(ee[_e]);ge.__webglTexture&&(s.deleteTexture(ge.__webglTexture),u.memory.textures--),r.remove(ee[_e])}r.remove(I)}let G=0;function ae(){G=0}function ie(){const I=G;return I>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+a.maxTextures),G+=1,I}function pe(I){const T=[];return T.push(I.wrapS),T.push(I.wrapT),T.push(I.wrapR||0),T.push(I.magFilter),T.push(I.minFilter),T.push(I.anisotropy),T.push(I.internalFormat),T.push(I.format),T.push(I.type),T.push(I.generateMipmaps),T.push(I.premultiplyAlpha),T.push(I.flipY),T.push(I.unpackAlignment),T.push(I.colorSpace),T.join()}function ve(I,T){const ee=r.get(I);if(I.isVideoTexture&&be(I),I.isRenderTargetTexture===!1&&I.version>0&&ee.__version!==I.version){const _e=I.image;if(_e===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(_e.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(ee,I,T);return}}n.bindTexture(s.TEXTURE_2D,ee.__webglTexture,s.TEXTURE0+T)}function ce(I,T){const ee=r.get(I);if(I.version>0&&ee.__version!==I.version){W(ee,I,T);return}n.bindTexture(s.TEXTURE_2D_ARRAY,ee.__webglTexture,s.TEXTURE0+T)}function he(I,T){const ee=r.get(I);if(I.version>0&&ee.__version!==I.version){W(ee,I,T);return}n.bindTexture(s.TEXTURE_3D,ee.__webglTexture,s.TEXTURE0+T)}function V(I,T){const ee=r.get(I);if(I.version>0&&ee.__version!==I.version){Q(ee,I,T);return}n.bindTexture(s.TEXTURE_CUBE_MAP,ee.__webglTexture,s.TEXTURE0+T)}const ue={[_f]:s.REPEAT,[Yr]:s.CLAMP_TO_EDGE,[xf]:s.MIRRORED_REPEAT},D={[di]:s.NEAREST,[D_]:s.NEAREST_MIPMAP_NEAREST,[Ja]:s.NEAREST_MIPMAP_LINEAR,[yi]:s.LINEAR,[Cu]:s.LINEAR_MIPMAP_NEAREST,[Kr]:s.LINEAR_MIPMAP_LINEAR},M={[k_]:s.NEVER,[W_]:s.ALWAYS,[z_]:s.LESS,[Tg]:s.LEQUAL,[B_]:s.EQUAL,[G_]:s.GEQUAL,[V_]:s.GREATER,[H_]:s.NOTEQUAL};function z(I,T){if(T.type===Vi&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===yi||T.magFilter===Cu||T.magFilter===Ja||T.magFilter===Kr||T.minFilter===yi||T.minFilter===Cu||T.minFilter===Ja||T.minFilter===Kr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,ue[T.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,ue[T.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,ue[T.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,D[T.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,D[T.minFilter]),T.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,M[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===di||T.minFilter!==Ja&&T.minFilter!==Kr||T.type===Vi&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||r.get(T).__currentAnisotropy){const ee=e.get("EXT_texture_filter_anisotropic");s.texParameterf(I,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,a.getMaxAnisotropy())),r.get(T).__currentAnisotropy=T.anisotropy}}}function fe(I,T){let ee=!1;I.__webglInit===void 0&&(I.__webglInit=!0,T.addEventListener("dispose",k));const _e=T.source;let ye=v.get(_e);ye===void 0&&(ye={},v.set(_e,ye));const ge=pe(T);if(ge!==I.__cacheKey){ye[ge]===void 0&&(ye[ge]={texture:s.createTexture(),usedTimes:0},u.memory.textures++,ee=!0),ye[ge].usedTimes++;const Ve=ye[I.__cacheKey];Ve!==void 0&&(ye[I.__cacheKey].usedTimes--,Ve.usedTimes===0&&L(T)),I.__cacheKey=ge,I.__webglTexture=ye[ge].texture}return ee}function W(I,T,ee){let _e=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(_e=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(_e=s.TEXTURE_3D);const ye=fe(I,T),ge=T.source;n.bindTexture(_e,I.__webglTexture,s.TEXTURE0+ee);const Ve=r.get(ge);if(ge.version!==Ve.__version||ye===!0){n.activeTexture(s.TEXTURE0+ee);const Le=Mt.getPrimaries(Mt.workingColorSpace),De=T.colorSpace===xr?null:Mt.getPrimaries(T.colorSpace),ft=T.colorSpace===xr||Le===De?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);let Te=A(T.image,!1,a.maxTextureSize);Te=at(T,Te);const He=l.convert(T.format,T.colorSpace),et=l.convert(T.type);let rt=N(T.internalFormat,He,et,T.colorSpace,T.isVideoTexture);z(_e,T);let je;const mt=T.mipmaps,ct=T.isVideoTexture!==!0,bt=Ve.__version===void 0||ye===!0,$=ge.dataReady,Ie=K(T,Te);if(T.isDepthTexture)rt=C(T.format===Xs,T.type),bt&&(ct?n.texStorage2D(s.TEXTURE_2D,1,rt,Te.width,Te.height):n.texImage2D(s.TEXTURE_2D,0,rt,Te.width,Te.height,0,He,et,null));else if(T.isDataTexture)if(mt.length>0){ct&&bt&&n.texStorage2D(s.TEXTURE_2D,Ie,rt,mt[0].width,mt[0].height);for(let de=0,xe=mt.length;de<xe;de++)je=mt[de],ct?$&&n.texSubImage2D(s.TEXTURE_2D,de,0,0,je.width,je.height,He,et,je.data):n.texImage2D(s.TEXTURE_2D,de,rt,je.width,je.height,0,He,et,je.data);T.generateMipmaps=!1}else ct?(bt&&n.texStorage2D(s.TEXTURE_2D,Ie,rt,Te.width,Te.height),$&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,Te.width,Te.height,He,et,Te.data)):n.texImage2D(s.TEXTURE_2D,0,rt,Te.width,Te.height,0,He,et,Te.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){ct&&bt&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Ie,rt,mt[0].width,mt[0].height,Te.depth);for(let de=0,xe=mt.length;de<xe;de++)if(je=mt[de],T.format!==fi)if(He!==null)if(ct){if($)if(T.layerUpdates.size>0){const ke=Bm(je.width,je.height,T.format,T.type);for(const Fe of T.layerUpdates){const ut=je.data.subarray(Fe*ke/je.data.BYTES_PER_ELEMENT,(Fe+1)*ke/je.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,de,0,0,Fe,je.width,je.height,1,He,ut)}T.clearLayerUpdates()}else n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,de,0,0,0,je.width,je.height,Te.depth,He,je.data)}else n.compressedTexImage3D(s.TEXTURE_2D_ARRAY,de,rt,je.width,je.height,Te.depth,0,je.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ct?$&&n.texSubImage3D(s.TEXTURE_2D_ARRAY,de,0,0,0,je.width,je.height,Te.depth,He,et,je.data):n.texImage3D(s.TEXTURE_2D_ARRAY,de,rt,je.width,je.height,Te.depth,0,He,et,je.data)}else{ct&&bt&&n.texStorage2D(s.TEXTURE_2D,Ie,rt,mt[0].width,mt[0].height);for(let de=0,xe=mt.length;de<xe;de++)je=mt[de],T.format!==fi?He!==null?ct?$&&n.compressedTexSubImage2D(s.TEXTURE_2D,de,0,0,je.width,je.height,He,je.data):n.compressedTexImage2D(s.TEXTURE_2D,de,rt,je.width,je.height,0,je.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ct?$&&n.texSubImage2D(s.TEXTURE_2D,de,0,0,je.width,je.height,He,et,je.data):n.texImage2D(s.TEXTURE_2D,de,rt,je.width,je.height,0,He,et,je.data)}else if(T.isDataArrayTexture)if(ct){if(bt&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Ie,rt,Te.width,Te.height,Te.depth),$)if(T.layerUpdates.size>0){const de=Bm(Te.width,Te.height,T.format,T.type);for(const xe of T.layerUpdates){const ke=Te.data.subarray(xe*de/Te.data.BYTES_PER_ELEMENT,(xe+1)*de/Te.data.BYTES_PER_ELEMENT);n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,xe,Te.width,Te.height,1,He,et,ke)}T.clearLayerUpdates()}else n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Te.width,Te.height,Te.depth,He,et,Te.data)}else n.texImage3D(s.TEXTURE_2D_ARRAY,0,rt,Te.width,Te.height,Te.depth,0,He,et,Te.data);else if(T.isData3DTexture)ct?(bt&&n.texStorage3D(s.TEXTURE_3D,Ie,rt,Te.width,Te.height,Te.depth),$&&n.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Te.width,Te.height,Te.depth,He,et,Te.data)):n.texImage3D(s.TEXTURE_3D,0,rt,Te.width,Te.height,Te.depth,0,He,et,Te.data);else if(T.isFramebufferTexture){if(bt)if(ct)n.texStorage2D(s.TEXTURE_2D,Ie,rt,Te.width,Te.height);else{let de=Te.width,xe=Te.height;for(let ke=0;ke<Ie;ke++)n.texImage2D(s.TEXTURE_2D,ke,rt,de,xe,0,He,et,null),de>>=1,xe>>=1}}else if(mt.length>0){if(ct&&bt){const de=Oe(mt[0]);n.texStorage2D(s.TEXTURE_2D,Ie,rt,de.width,de.height)}for(let de=0,xe=mt.length;de<xe;de++)je=mt[de],ct?$&&n.texSubImage2D(s.TEXTURE_2D,de,0,0,He,et,je):n.texImage2D(s.TEXTURE_2D,de,rt,He,et,je);T.generateMipmaps=!1}else if(ct){if(bt){const de=Oe(Te);n.texStorage2D(s.TEXTURE_2D,Ie,rt,de.width,de.height)}$&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,He,et,Te)}else n.texImage2D(s.TEXTURE_2D,0,rt,He,et,Te);x(T)&&g(_e),Ve.__version=ge.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function Q(I,T,ee){if(T.image.length!==6)return;const _e=fe(I,T),ye=T.source;n.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+ee);const ge=r.get(ye);if(ye.version!==ge.__version||_e===!0){n.activeTexture(s.TEXTURE0+ee);const Ve=Mt.getPrimaries(Mt.workingColorSpace),Le=T.colorSpace===xr?null:Mt.getPrimaries(T.colorSpace),De=T.colorSpace===xr||Ve===Le?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);const ft=T.isCompressedTexture||T.image[0].isCompressedTexture,Te=T.image[0]&&T.image[0].isDataTexture,He=[];for(let xe=0;xe<6;xe++)!ft&&!Te?He[xe]=A(T.image[xe],!0,a.maxCubemapSize):He[xe]=Te?T.image[xe].image:T.image[xe],He[xe]=at(T,He[xe]);const et=He[0],rt=l.convert(T.format,T.colorSpace),je=l.convert(T.type),mt=N(T.internalFormat,rt,je,T.colorSpace),ct=T.isVideoTexture!==!0,bt=ge.__version===void 0||_e===!0,$=ye.dataReady;let Ie=K(T,et);z(s.TEXTURE_CUBE_MAP,T);let de;if(ft){ct&&bt&&n.texStorage2D(s.TEXTURE_CUBE_MAP,Ie,mt,et.width,et.height);for(let xe=0;xe<6;xe++){de=He[xe].mipmaps;for(let ke=0;ke<de.length;ke++){const Fe=de[ke];T.format!==fi?rt!==null?ct?$&&n.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ke,0,0,Fe.width,Fe.height,rt,Fe.data):n.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ke,mt,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ct?$&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ke,0,0,Fe.width,Fe.height,rt,je,Fe.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ke,mt,Fe.width,Fe.height,0,rt,je,Fe.data)}}}else{if(de=T.mipmaps,ct&&bt){de.length>0&&Ie++;const xe=Oe(He[0]);n.texStorage2D(s.TEXTURE_CUBE_MAP,Ie,mt,xe.width,xe.height)}for(let xe=0;xe<6;xe++)if(Te){ct?$&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,He[xe].width,He[xe].height,rt,je,He[xe].data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,mt,He[xe].width,He[xe].height,0,rt,je,He[xe].data);for(let ke=0;ke<de.length;ke++){const ut=de[ke].image[xe].image;ct?$&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ke+1,0,0,ut.width,ut.height,rt,je,ut.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ke+1,mt,ut.width,ut.height,0,rt,je,ut.data)}}else{ct?$&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,rt,je,He[xe]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,mt,rt,je,He[xe]);for(let ke=0;ke<de.length;ke++){const Fe=de[ke];ct?$&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ke+1,0,0,rt,je,Fe.image[xe]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ke+1,mt,rt,je,Fe.image[xe])}}}x(T)&&g(s.TEXTURE_CUBE_MAP),ge.__version=ye.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function le(I,T,ee,_e,ye,ge){const Ve=l.convert(ee.format,ee.colorSpace),Le=l.convert(ee.type),De=N(ee.internalFormat,Ve,Le,ee.colorSpace),ft=r.get(T),Te=r.get(ee);if(Te.__renderTarget=T,!ft.__hasExternalTextures){const He=Math.max(1,T.width>>ge),et=Math.max(1,T.height>>ge);ye===s.TEXTURE_3D||ye===s.TEXTURE_2D_ARRAY?n.texImage3D(ye,ge,De,He,et,T.depth,0,Ve,Le,null):n.texImage2D(ye,ge,De,He,et,0,Ve,Le,null)}n.bindFramebuffer(s.FRAMEBUFFER,I),we(T)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,_e,ye,Te.__webglTexture,0,Be(T)):(ye===s.TEXTURE_2D||ye>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ye<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,_e,ye,Te.__webglTexture,ge),n.bindFramebuffer(s.FRAMEBUFFER,null)}function ne(I,T,ee){if(s.bindRenderbuffer(s.RENDERBUFFER,I),T.depthBuffer){const _e=T.depthTexture,ye=_e&&_e.isDepthTexture?_e.type:null,ge=C(T.stencilBuffer,ye),Ve=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Le=Be(T);we(T)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Le,ge,T.width,T.height):ee?s.renderbufferStorageMultisample(s.RENDERBUFFER,Le,ge,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,ge,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ve,s.RENDERBUFFER,I)}else{const _e=T.textures;for(let ye=0;ye<_e.length;ye++){const ge=_e[ye],Ve=l.convert(ge.format,ge.colorSpace),Le=l.convert(ge.type),De=N(ge.internalFormat,Ve,Le,ge.colorSpace),ft=Be(T);ee&&we(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ft,De,T.width,T.height):we(T)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ft,De,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,De,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function me(I,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(s.FRAMEBUFFER,I),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const _e=r.get(T.depthTexture);_e.__renderTarget=T,(!_e.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),ve(T.depthTexture,0);const ye=_e.__webglTexture,ge=Be(T);if(T.depthTexture.format===Bs)we(T)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ye,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ye,0);else if(T.depthTexture.format===Xs)we(T)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ye,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ye,0);else throw new Error("Unknown depthTexture format")}function Se(I){const T=r.get(I),ee=I.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==I.depthTexture){const _e=I.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),_e){const ye=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,_e.removeEventListener("dispose",ye)};_e.addEventListener("dispose",ye),T.__depthDisposeCallback=ye}T.__boundDepthTexture=_e}if(I.depthTexture&&!T.__autoAllocateDepthBuffer){if(ee)throw new Error("target.depthTexture not supported in Cube render targets");me(T.__webglFramebuffer,I)}else if(ee){T.__webglDepthbuffer=[];for(let _e=0;_e<6;_e++)if(n.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[_e]),T.__webglDepthbuffer[_e]===void 0)T.__webglDepthbuffer[_e]=s.createRenderbuffer(),ne(T.__webglDepthbuffer[_e],I,!1);else{const ye=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ge=T.__webglDepthbuffer[_e];s.bindRenderbuffer(s.RENDERBUFFER,ge),s.framebufferRenderbuffer(s.FRAMEBUFFER,ye,s.RENDERBUFFER,ge)}}else if(n.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=s.createRenderbuffer(),ne(T.__webglDepthbuffer,I,!1);else{const _e=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ye=T.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ye),s.framebufferRenderbuffer(s.FRAMEBUFFER,_e,s.RENDERBUFFER,ye)}n.bindFramebuffer(s.FRAMEBUFFER,null)}function Ne(I,T,ee){const _e=r.get(I);T!==void 0&&le(_e.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),ee!==void 0&&Se(I)}function $e(I){const T=I.texture,ee=r.get(I),_e=r.get(T);I.addEventListener("dispose",O);const ye=I.textures,ge=I.isWebGLCubeRenderTarget===!0,Ve=ye.length>1;if(Ve||(_e.__webglTexture===void 0&&(_e.__webglTexture=s.createTexture()),_e.__version=T.version,u.memory.textures++),ge){ee.__webglFramebuffer=[];for(let Le=0;Le<6;Le++)if(T.mipmaps&&T.mipmaps.length>0){ee.__webglFramebuffer[Le]=[];for(let De=0;De<T.mipmaps.length;De++)ee.__webglFramebuffer[Le][De]=s.createFramebuffer()}else ee.__webglFramebuffer[Le]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){ee.__webglFramebuffer=[];for(let Le=0;Le<T.mipmaps.length;Le++)ee.__webglFramebuffer[Le]=s.createFramebuffer()}else ee.__webglFramebuffer=s.createFramebuffer();if(Ve)for(let Le=0,De=ye.length;Le<De;Le++){const ft=r.get(ye[Le]);ft.__webglTexture===void 0&&(ft.__webglTexture=s.createTexture(),u.memory.textures++)}if(I.samples>0&&we(I)===!1){ee.__webglMultisampledFramebuffer=s.createFramebuffer(),ee.__webglColorRenderbuffer=[],n.bindFramebuffer(s.FRAMEBUFFER,ee.__webglMultisampledFramebuffer);for(let Le=0;Le<ye.length;Le++){const De=ye[Le];ee.__webglColorRenderbuffer[Le]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,ee.__webglColorRenderbuffer[Le]);const ft=l.convert(De.format,De.colorSpace),Te=l.convert(De.type),He=N(De.internalFormat,ft,Te,De.colorSpace,I.isXRRenderTarget===!0),et=Be(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,et,He,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Le,s.RENDERBUFFER,ee.__webglColorRenderbuffer[Le])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(ee.__webglDepthRenderbuffer=s.createRenderbuffer(),ne(ee.__webglDepthRenderbuffer,I,!0)),n.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ge){n.bindTexture(s.TEXTURE_CUBE_MAP,_e.__webglTexture),z(s.TEXTURE_CUBE_MAP,T);for(let Le=0;Le<6;Le++)if(T.mipmaps&&T.mipmaps.length>0)for(let De=0;De<T.mipmaps.length;De++)le(ee.__webglFramebuffer[Le][De],I,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,De);else le(ee.__webglFramebuffer[Le],I,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0);x(T)&&g(s.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ve){for(let Le=0,De=ye.length;Le<De;Le++){const ft=ye[Le],Te=r.get(ft);n.bindTexture(s.TEXTURE_2D,Te.__webglTexture),z(s.TEXTURE_2D,ft),le(ee.__webglFramebuffer,I,ft,s.COLOR_ATTACHMENT0+Le,s.TEXTURE_2D,0),x(ft)&&g(s.TEXTURE_2D)}n.unbindTexture()}else{let Le=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Le=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),n.bindTexture(Le,_e.__webglTexture),z(Le,T),T.mipmaps&&T.mipmaps.length>0)for(let De=0;De<T.mipmaps.length;De++)le(ee.__webglFramebuffer[De],I,T,s.COLOR_ATTACHMENT0,Le,De);else le(ee.__webglFramebuffer,I,T,s.COLOR_ATTACHMENT0,Le,0);x(T)&&g(Le),n.unbindTexture()}I.depthBuffer&&Se(I)}function We(I){const T=I.textures;for(let ee=0,_e=T.length;ee<_e;ee++){const ye=T[ee];if(x(ye)){const ge=P(I),Ve=r.get(ye).__webglTexture;n.bindTexture(ge,Ve),g(ge),n.unbindTexture()}}}const it=[],B=[];function Et(I){if(I.samples>0){if(we(I)===!1){const T=I.textures,ee=I.width,_e=I.height;let ye=s.COLOR_BUFFER_BIT;const ge=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ve=r.get(I),Le=T.length>1;if(Le)for(let De=0;De<T.length;De++)n.bindFramebuffer(s.FRAMEBUFFER,Ve.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+De,s.RENDERBUFFER,null),n.bindFramebuffer(s.FRAMEBUFFER,Ve.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+De,s.TEXTURE_2D,null,0);n.bindFramebuffer(s.READ_FRAMEBUFFER,Ve.__webglMultisampledFramebuffer),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ve.__webglFramebuffer);for(let De=0;De<T.length;De++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ye|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ye|=s.STENCIL_BUFFER_BIT)),Le){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ve.__webglColorRenderbuffer[De]);const ft=r.get(T[De]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ft,0)}s.blitFramebuffer(0,0,ee,_e,0,0,ee,_e,ye,s.NEAREST),h===!0&&(it.length=0,B.length=0,it.push(s.COLOR_ATTACHMENT0+De),I.depthBuffer&&I.resolveDepthBuffer===!1&&(it.push(ge),B.push(ge),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,B)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,it))}if(n.bindFramebuffer(s.READ_FRAMEBUFFER,null),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Le)for(let De=0;De<T.length;De++){n.bindFramebuffer(s.FRAMEBUFFER,Ve.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+De,s.RENDERBUFFER,Ve.__webglColorRenderbuffer[De]);const ft=r.get(T[De]).__webglTexture;n.bindFramebuffer(s.FRAMEBUFFER,Ve.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+De,s.TEXTURE_2D,ft,0)}n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ve.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&h){const T=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[T])}}}function Be(I){return Math.min(a.maxSamples,I.samples)}function we(I){const T=r.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function be(I){const T=u.render.frame;_.get(I)!==T&&(_.set(I,T),I.update())}function at(I,T){const ee=I.colorSpace,_e=I.format,ye=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||ee!==qs&&ee!==xr&&(Mt.getTransfer(ee)===Lt?(_e!==fi||ye!==Wi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ee)),T}function Oe(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(m.width=I.naturalWidth||I.width,m.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(m.width=I.displayWidth,m.height=I.displayHeight):(m.width=I.width,m.height=I.height),m}this.allocateTextureUnit=ie,this.resetTextureUnits=ae,this.setTexture2D=ve,this.setTexture2DArray=ce,this.setTexture3D=he,this.setTextureCube=V,this.rebindTextures=Ne,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=Et,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=le,this.useMultisampledRTT=we}function Y1(s,e){function n(r,a=xr){let l;const u=Mt.getTransfer(a);if(r===Wi)return s.UNSIGNED_BYTE;if(r===td)return s.UNSIGNED_SHORT_4_4_4_4;if(r===nd)return s.UNSIGNED_SHORT_5_5_5_1;if(r===vg)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===mg)return s.BYTE;if(r===gg)return s.SHORT;if(r===Bo)return s.UNSIGNED_SHORT;if(r===ed)return s.INT;if(r===Qr)return s.UNSIGNED_INT;if(r===Vi)return s.FLOAT;if(r===Vo)return s.HALF_FLOAT;if(r===_g)return s.ALPHA;if(r===xg)return s.RGB;if(r===fi)return s.RGBA;if(r===yg)return s.LUMINANCE;if(r===Sg)return s.LUMINANCE_ALPHA;if(r===Bs)return s.DEPTH_COMPONENT;if(r===Xs)return s.DEPTH_STENCIL;if(r===Mg)return s.RED;if(r===id)return s.RED_INTEGER;if(r===Eg)return s.RG;if(r===rd)return s.RG_INTEGER;if(r===sd)return s.RGBA_INTEGER;if(r===Tl||r===Al||r===Cl||r===bl)if(u===Lt)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===Tl)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Al)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Cl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===bl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===Tl)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Al)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Cl)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===bl)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===yf||r===Sf||r===Mf||r===Ef)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===yf)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Sf)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Mf)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ef)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===wf||r===Tf||r===Af)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===wf||r===Tf)return u===Lt?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===Af)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Cf||r===bf||r===Rf||r===Pf||r===Lf||r===Nf||r===Df||r===If||r===Uf||r===Ff||r===Of||r===kf||r===zf||r===Bf)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===Cf)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===bf)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Rf)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Pf)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Lf)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Nf)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Df)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===If)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Uf)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ff)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Of)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===kf)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===zf)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Bf)return u===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Rl||r===Vf||r===Hf)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===Rl)return u===Lt?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Vf)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Hf)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===wg||r===Gf||r===Wf||r===jf)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===Rl)return l.COMPRESSED_RED_RGTC1_EXT;if(r===Gf)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Wf)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===jf)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===js?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:n}}class K1 extends Kn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class zo extends xn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Z1={type:"move"};class nf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const r of e.hand.values())this._getHandJoint(n,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,r){let a=null,l=null,u=null;const f=this._targetRay,h=this._grip,m=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(m&&e.hand){u=!0;for(const A of e.hand.values()){const x=n.getJointPose(A,r),g=this._getHandJoint(m,A);x!==null&&(g.matrix.fromArray(x.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=x.radius),g.visible=x!==null}const _=m.joints["index-finger-tip"],y=m.joints["thumb-tip"],v=_.position.distanceTo(y.position),S=.02,E=.005;m.inputState.pinching&&v>S+E?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&v<=S-E&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=n.getPose(e.gripSpace,r),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1));f!==null&&(a=n.getPose(e.targetRaySpace,r),a===null&&l!==null&&(a=l),a!==null&&(f.matrix.fromArray(a.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,a.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(a.linearVelocity)):f.hasLinearVelocity=!1,a.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(a.angularVelocity)):f.hasAngularVelocity=!1,this.dispatchEvent(Z1)))}return f!==null&&(f.visible=a!==null),h!==null&&(h.visible=l!==null),m!==null&&(m.visible=u!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const r=new zo;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[n.jointName]=r,e.add(r)}return e.joints[n.jointName]}}const Q1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,J1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class eE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,r){if(this.texture===null){const a=new Pn,l=e.properties.get(a);l.__webglTexture=n.texture,(n.depthNear!=r.depthNear||n.depthFar!=r.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,r=new Er({vertexShader:Q1,fragmentShader:J1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Si(new kl(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tE extends Ys{constructor(e,n){super();const r=this;let a=null,l=1,u=null,f="local-floor",h=1,m=null,_=null,y=null,v=null,S=null,E=null;const A=new eE,x=n.getContextAttributes();let g=null,P=null;const N=[],C=[],K=new At;let k=null;const O=new Kn;O.viewport=new Gt;const j=new Kn;j.viewport=new Gt;const L=[O,j],b=new K1;let G=null,ae=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let Q=N[W];return Q===void 0&&(Q=new nf,N[W]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(W){let Q=N[W];return Q===void 0&&(Q=new nf,N[W]=Q),Q.getGripSpace()},this.getHand=function(W){let Q=N[W];return Q===void 0&&(Q=new nf,N[W]=Q),Q.getHandSpace()};function ie(W){const Q=C.indexOf(W.inputSource);if(Q===-1)return;const le=N[Q];le!==void 0&&(le.update(W.inputSource,W.frame,m||u),le.dispatchEvent({type:W.type,data:W.inputSource}))}function pe(){a.removeEventListener("select",ie),a.removeEventListener("selectstart",ie),a.removeEventListener("selectend",ie),a.removeEventListener("squeeze",ie),a.removeEventListener("squeezestart",ie),a.removeEventListener("squeezeend",ie),a.removeEventListener("end",pe),a.removeEventListener("inputsourceschange",ve);for(let W=0;W<N.length;W++){const Q=C[W];Q!==null&&(C[W]=null,N[W].disconnect(Q))}G=null,ae=null,A.reset(),e.setRenderTarget(g),S=null,v=null,y=null,a=null,P=null,fe.stop(),r.isPresenting=!1,e.setPixelRatio(k),e.setSize(K.width,K.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){l=W,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){f=W,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||u},this.setReferenceSpace=function(W){m=W},this.getBaseLayer=function(){return v!==null?v:S},this.getBinding=function(){return y},this.getFrame=function(){return E},this.getSession=function(){return a},this.setSession=async function(W){if(a=W,a!==null){if(g=e.getRenderTarget(),a.addEventListener("select",ie),a.addEventListener("selectstart",ie),a.addEventListener("selectend",ie),a.addEventListener("squeeze",ie),a.addEventListener("squeezestart",ie),a.addEventListener("squeezeend",ie),a.addEventListener("end",pe),a.addEventListener("inputsourceschange",ve),x.xrCompatible!==!0&&await n.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(K),a.renderState.layers===void 0){const Q={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(a,n,Q),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),P=new Jr(S.framebufferWidth,S.framebufferHeight,{format:fi,type:Wi,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let Q=null,le=null,ne=null;x.depth&&(ne=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Q=x.stencil?Xs:Bs,le=x.stencil?js:Qr);const me={colorFormat:n.RGBA8,depthFormat:ne,scaleFactor:l};y=new XRWebGLBinding(a,n),v=y.createProjectionLayer(me),a.updateRenderState({layers:[v]}),e.setPixelRatio(1),e.setSize(v.textureWidth,v.textureHeight,!1),P=new Jr(v.textureWidth,v.textureHeight,{format:fi,type:Wi,depthTexture:new kg(v.textureWidth,v.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1})}P.isXRRenderTarget=!0,this.setFoveation(h),m=null,u=await a.requestReferenceSpace(f),fe.setContext(a),fe.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return A.getDepthTexture()};function ve(W){for(let Q=0;Q<W.removed.length;Q++){const le=W.removed[Q],ne=C.indexOf(le);ne>=0&&(C[ne]=null,N[ne].disconnect(le))}for(let Q=0;Q<W.added.length;Q++){const le=W.added[Q];let ne=C.indexOf(le);if(ne===-1){for(let Se=0;Se<N.length;Se++)if(Se>=C.length){C.push(le),ne=Se;break}else if(C[Se]===null){C[Se]=le,ne=Se;break}if(ne===-1)break}const me=N[ne];me&&me.connect(le)}}const ce=new J,he=new J;function V(W,Q,le){ce.setFromMatrixPosition(Q.matrixWorld),he.setFromMatrixPosition(le.matrixWorld);const ne=ce.distanceTo(he),me=Q.projectionMatrix.elements,Se=le.projectionMatrix.elements,Ne=me[14]/(me[10]-1),$e=me[14]/(me[10]+1),We=(me[9]+1)/me[5],it=(me[9]-1)/me[5],B=(me[8]-1)/me[0],Et=(Se[8]+1)/Se[0],Be=Ne*B,we=Ne*Et,be=ne/(-B+Et),at=be*-B;if(Q.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(at),W.translateZ(be),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),me[10]===-1)W.projectionMatrix.copy(Q.projectionMatrix),W.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const Oe=Ne+be,I=$e+be,T=Be-at,ee=we+(ne-at),_e=We*$e/I*Oe,ye=it*$e/I*Oe;W.projectionMatrix.makePerspective(T,ee,_e,ye,Oe,I),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function ue(W,Q){Q===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(Q.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(a===null)return;let Q=W.near,le=W.far;A.texture!==null&&(A.depthNear>0&&(Q=A.depthNear),A.depthFar>0&&(le=A.depthFar)),b.near=j.near=O.near=Q,b.far=j.far=O.far=le,(G!==b.near||ae!==b.far)&&(a.updateRenderState({depthNear:b.near,depthFar:b.far}),G=b.near,ae=b.far),O.layers.mask=W.layers.mask|2,j.layers.mask=W.layers.mask|4,b.layers.mask=O.layers.mask|j.layers.mask;const ne=W.parent,me=b.cameras;ue(b,ne);for(let Se=0;Se<me.length;Se++)ue(me[Se],ne);me.length===2?V(b,O,j):b.projectionMatrix.copy(O.projectionMatrix),D(W,b,ne)};function D(W,Q,le){le===null?W.matrix.copy(Q.matrixWorld):(W.matrix.copy(le.matrixWorld),W.matrix.invert(),W.matrix.multiply(Q.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(Q.projectionMatrix),W.projectionMatrixInverse.copy(Q.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Xf*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(v===null&&S===null))return h},this.setFoveation=function(W){h=W,v!==null&&(v.fixedFoveation=W),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=W)},this.hasDepthSensing=function(){return A.texture!==null},this.getDepthSensingMesh=function(){return A.getMesh(b)};let M=null;function z(W,Q){if(_=Q.getViewerPose(m||u),E=Q,_!==null){const le=_.views;S!==null&&(e.setRenderTargetFramebuffer(P,S.framebuffer),e.setRenderTarget(P));let ne=!1;le.length!==b.cameras.length&&(b.cameras.length=0,ne=!0);for(let Se=0;Se<le.length;Se++){const Ne=le[Se];let $e=null;if(S!==null)$e=S.getViewport(Ne);else{const it=y.getViewSubImage(v,Ne);$e=it.viewport,Se===0&&(e.setRenderTargetTextures(P,it.colorTexture,v.ignoreDepthValues?void 0:it.depthStencilTexture),e.setRenderTarget(P))}let We=L[Se];We===void 0&&(We=new Kn,We.layers.enable(Se),We.viewport=new Gt,L[Se]=We),We.matrix.fromArray(Ne.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(Ne.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set($e.x,$e.y,$e.width,$e.height),Se===0&&(b.matrix.copy(We.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),ne===!0&&b.cameras.push(We)}const me=a.enabledFeatures;if(me&&me.includes("depth-sensing")){const Se=y.getDepthInformation(le[0]);Se&&Se.isValid&&Se.texture&&A.init(e,Se,a.renderState)}}for(let le=0;le<N.length;le++){const ne=C[le],me=N[le];ne!==null&&me!==void 0&&me.update(ne,Q,m||u)}M&&M(W,Q),Q.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:Q}),E=null}const fe=new Og;fe.setAnimationLoop(z),this.setAnimationLoop=function(W){M=W},this.dispose=function(){}}}const Wr=new ji,nE=new Bt;function iE(s,e){function n(x,g){x.matrixAutoUpdate===!0&&x.updateMatrix(),g.value.copy(x.matrix)}function r(x,g){g.color.getRGB(x.fogColor.value,Dg(s)),g.isFog?(x.fogNear.value=g.near,x.fogFar.value=g.far):g.isFogExp2&&(x.fogDensity.value=g.density)}function a(x,g,P,N,C){g.isMeshBasicMaterial||g.isMeshLambertMaterial?l(x,g):g.isMeshToonMaterial?(l(x,g),y(x,g)):g.isMeshPhongMaterial?(l(x,g),_(x,g)):g.isMeshStandardMaterial?(l(x,g),v(x,g),g.isMeshPhysicalMaterial&&S(x,g,C)):g.isMeshMatcapMaterial?(l(x,g),E(x,g)):g.isMeshDepthMaterial?l(x,g):g.isMeshDistanceMaterial?(l(x,g),A(x,g)):g.isMeshNormalMaterial?l(x,g):g.isLineBasicMaterial?(u(x,g),g.isLineDashedMaterial&&f(x,g)):g.isPointsMaterial?h(x,g,P,N):g.isSpriteMaterial?m(x,g):g.isShadowMaterial?(x.color.value.copy(g.color),x.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function l(x,g){x.opacity.value=g.opacity,g.color&&x.diffuse.value.copy(g.color),g.emissive&&x.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(x.map.value=g.map,n(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,n(g.alphaMap,x.alphaMapTransform)),g.bumpMap&&(x.bumpMap.value=g.bumpMap,n(g.bumpMap,x.bumpMapTransform),x.bumpScale.value=g.bumpScale,g.side===Rn&&(x.bumpScale.value*=-1)),g.normalMap&&(x.normalMap.value=g.normalMap,n(g.normalMap,x.normalMapTransform),x.normalScale.value.copy(g.normalScale),g.side===Rn&&x.normalScale.value.negate()),g.displacementMap&&(x.displacementMap.value=g.displacementMap,n(g.displacementMap,x.displacementMapTransform),x.displacementScale.value=g.displacementScale,x.displacementBias.value=g.displacementBias),g.emissiveMap&&(x.emissiveMap.value=g.emissiveMap,n(g.emissiveMap,x.emissiveMapTransform)),g.specularMap&&(x.specularMap.value=g.specularMap,n(g.specularMap,x.specularMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest);const P=e.get(g),N=P.envMap,C=P.envMapRotation;N&&(x.envMap.value=N,Wr.copy(C),Wr.x*=-1,Wr.y*=-1,Wr.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(Wr.y*=-1,Wr.z*=-1),x.envMapRotation.value.setFromMatrix4(nE.makeRotationFromEuler(Wr)),x.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=g.reflectivity,x.ior.value=g.ior,x.refractionRatio.value=g.refractionRatio),g.lightMap&&(x.lightMap.value=g.lightMap,x.lightMapIntensity.value=g.lightMapIntensity,n(g.lightMap,x.lightMapTransform)),g.aoMap&&(x.aoMap.value=g.aoMap,x.aoMapIntensity.value=g.aoMapIntensity,n(g.aoMap,x.aoMapTransform))}function u(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,g.map&&(x.map.value=g.map,n(g.map,x.mapTransform))}function f(x,g){x.dashSize.value=g.dashSize,x.totalSize.value=g.dashSize+g.gapSize,x.scale.value=g.scale}function h(x,g,P,N){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.size.value=g.size*P,x.scale.value=N*.5,g.map&&(x.map.value=g.map,n(g.map,x.uvTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,n(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function m(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.rotation.value=g.rotation,g.map&&(x.map.value=g.map,n(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,n(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function _(x,g){x.specular.value.copy(g.specular),x.shininess.value=Math.max(g.shininess,1e-4)}function y(x,g){g.gradientMap&&(x.gradientMap.value=g.gradientMap)}function v(x,g){x.metalness.value=g.metalness,g.metalnessMap&&(x.metalnessMap.value=g.metalnessMap,n(g.metalnessMap,x.metalnessMapTransform)),x.roughness.value=g.roughness,g.roughnessMap&&(x.roughnessMap.value=g.roughnessMap,n(g.roughnessMap,x.roughnessMapTransform)),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)}function S(x,g,P){x.ior.value=g.ior,g.sheen>0&&(x.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),x.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(x.sheenColorMap.value=g.sheenColorMap,n(g.sheenColorMap,x.sheenColorMapTransform)),g.sheenRoughnessMap&&(x.sheenRoughnessMap.value=g.sheenRoughnessMap,n(g.sheenRoughnessMap,x.sheenRoughnessMapTransform))),g.clearcoat>0&&(x.clearcoat.value=g.clearcoat,x.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(x.clearcoatMap.value=g.clearcoatMap,n(g.clearcoatMap,x.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,n(g.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(x.clearcoatNormalMap.value=g.clearcoatNormalMap,n(g.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Rn&&x.clearcoatNormalScale.value.negate())),g.dispersion>0&&(x.dispersion.value=g.dispersion),g.iridescence>0&&(x.iridescence.value=g.iridescence,x.iridescenceIOR.value=g.iridescenceIOR,x.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(x.iridescenceMap.value=g.iridescenceMap,n(g.iridescenceMap,x.iridescenceMapTransform)),g.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=g.iridescenceThicknessMap,n(g.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),g.transmission>0&&(x.transmission.value=g.transmission,x.transmissionSamplerMap.value=P.texture,x.transmissionSamplerSize.value.set(P.width,P.height),g.transmissionMap&&(x.transmissionMap.value=g.transmissionMap,n(g.transmissionMap,x.transmissionMapTransform)),x.thickness.value=g.thickness,g.thicknessMap&&(x.thicknessMap.value=g.thicknessMap,n(g.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=g.attenuationDistance,x.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(x.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(x.anisotropyMap.value=g.anisotropyMap,n(g.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=g.specularIntensity,x.specularColor.value.copy(g.specularColor),g.specularColorMap&&(x.specularColorMap.value=g.specularColorMap,n(g.specularColorMap,x.specularColorMapTransform)),g.specularIntensityMap&&(x.specularIntensityMap.value=g.specularIntensityMap,n(g.specularIntensityMap,x.specularIntensityMapTransform))}function E(x,g){g.matcap&&(x.matcap.value=g.matcap)}function A(x,g){const P=e.get(g).light;x.referencePosition.value.setFromMatrixPosition(P.matrixWorld),x.nearDistance.value=P.shadow.camera.near,x.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function rE(s,e,n,r){let a={},l={},u=[];const f=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(P,N){const C=N.program;r.uniformBlockBinding(P,C)}function m(P,N){let C=a[P.id];C===void 0&&(E(P),C=_(P),a[P.id]=C,P.addEventListener("dispose",x));const K=N.program;r.updateUBOMapping(P,K);const k=e.render.frame;l[P.id]!==k&&(v(P),l[P.id]=k)}function _(P){const N=y();P.__bindingPointIndex=N;const C=s.createBuffer(),K=P.__size,k=P.usage;return s.bindBuffer(s.UNIFORM_BUFFER,C),s.bufferData(s.UNIFORM_BUFFER,K,k),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,N,C),C}function y(){for(let P=0;P<f;P++)if(u.indexOf(P)===-1)return u.push(P),P;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(P){const N=a[P.id],C=P.uniforms,K=P.__cache;s.bindBuffer(s.UNIFORM_BUFFER,N);for(let k=0,O=C.length;k<O;k++){const j=Array.isArray(C[k])?C[k]:[C[k]];for(let L=0,b=j.length;L<b;L++){const G=j[L];if(S(G,k,L,K)===!0){const ae=G.__offset,ie=Array.isArray(G.value)?G.value:[G.value];let pe=0;for(let ve=0;ve<ie.length;ve++){const ce=ie[ve],he=A(ce);typeof ce=="number"||typeof ce=="boolean"?(G.__data[0]=ce,s.bufferSubData(s.UNIFORM_BUFFER,ae+pe,G.__data)):ce.isMatrix3?(G.__data[0]=ce.elements[0],G.__data[1]=ce.elements[1],G.__data[2]=ce.elements[2],G.__data[3]=0,G.__data[4]=ce.elements[3],G.__data[5]=ce.elements[4],G.__data[6]=ce.elements[5],G.__data[7]=0,G.__data[8]=ce.elements[6],G.__data[9]=ce.elements[7],G.__data[10]=ce.elements[8],G.__data[11]=0):(ce.toArray(G.__data,pe),pe+=he.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,ae,G.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(P,N,C,K){const k=P.value,O=N+"_"+C;if(K[O]===void 0)return typeof k=="number"||typeof k=="boolean"?K[O]=k:K[O]=k.clone(),!0;{const j=K[O];if(typeof k=="number"||typeof k=="boolean"){if(j!==k)return K[O]=k,!0}else if(j.equals(k)===!1)return j.copy(k),!0}return!1}function E(P){const N=P.uniforms;let C=0;const K=16;for(let O=0,j=N.length;O<j;O++){const L=Array.isArray(N[O])?N[O]:[N[O]];for(let b=0,G=L.length;b<G;b++){const ae=L[b],ie=Array.isArray(ae.value)?ae.value:[ae.value];for(let pe=0,ve=ie.length;pe<ve;pe++){const ce=ie[pe],he=A(ce),V=C%K,ue=V%he.boundary,D=V+ue;C+=ue,D!==0&&K-D<he.storage&&(C+=K-D),ae.__data=new Float32Array(he.storage/Float32Array.BYTES_PER_ELEMENT),ae.__offset=C,C+=he.storage}}}const k=C%K;return k>0&&(C+=K-k),P.__size=C,P.__cache={},this}function A(P){const N={boundary:0,storage:0};return typeof P=="number"||typeof P=="boolean"?(N.boundary=4,N.storage=4):P.isVector2?(N.boundary=8,N.storage=8):P.isVector3||P.isColor?(N.boundary=16,N.storage=12):P.isVector4?(N.boundary=16,N.storage=16):P.isMatrix3?(N.boundary=48,N.storage=48):P.isMatrix4?(N.boundary=64,N.storage=64):P.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",P),N}function x(P){const N=P.target;N.removeEventListener("dispose",x);const C=u.indexOf(N.__bindingPointIndex);u.splice(C,1),s.deleteBuffer(a[N.id]),delete a[N.id],delete l[N.id]}function g(){for(const P in a)s.deleteBuffer(a[P]);u=[],a={},l={}}return{bind:h,update:m,dispose:g}}class sE{constructor(e={}){const{canvas:n=X_(),context:r=null,depth:a=!0,stencil:l=!1,alpha:u=!1,antialias:f=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:m=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:y=!1,reverseDepthBuffer:v=!1}=e;this.isWebGLRenderer=!0;let S;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=r.getContextAttributes().alpha}else S=u;const E=new Uint32Array(4),A=new Int32Array(4);let x=null,g=null;const P=[],N=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Yn,this.toneMapping=Sr,this.toneMappingExposure=1;const C=this;let K=!1,k=0,O=0,j=null,L=-1,b=null;const G=new Gt,ae=new Gt;let ie=null;const pe=new Rt(0);let ve=0,ce=n.width,he=n.height,V=1,ue=null,D=null;const M=new Gt(0,0,ce,he),z=new Gt(0,0,ce,he);let fe=!1;const W=new Fg;let Q=!1,le=!1;const ne=new Bt,me=new Bt,Se=new J,Ne=new Gt,$e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function it(){return j===null?V:1}let B=r;function Et(R,q){return n.getContext(R,q)}try{const R={alpha:!0,depth:a,stencil:l,antialias:f,premultipliedAlpha:h,preserveDrawingBuffer:m,powerPreference:_,failIfMajorPerformanceCaveat:y};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Jf}`),n.addEventListener("webglcontextlost",xe,!1),n.addEventListener("webglcontextrestored",ke,!1),n.addEventListener("webglcontextcreationerror",Fe,!1),B===null){const q="webgl2";if(B=Et(q,R),B===null)throw Et(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Be,we,be,at,Oe,I,T,ee,_e,ye,ge,Ve,Le,De,ft,Te,He,et,rt,je,mt,ct,bt,$;function Ie(){Be=new uM(B),Be.init(),ct=new Y1(B,Be),we=new iM(B,Be,e,ct),be=new X1(B,Be),we.reverseDepthBuffer&&v&&be.buffers.depth.setReversed(!0),at=new hM(B),Oe=new L1,I=new q1(B,Be,be,Oe,we,ct,at),T=new sM(C),ee=new cM(C),_e=new xx(B),bt=new tM(B,_e),ye=new fM(B,_e,at,bt),ge=new mM(B,ye,_e,at),rt=new pM(B,we,I),Te=new rM(Oe),Ve=new P1(C,T,ee,Be,we,bt,Te),Le=new iE(C,Oe),De=new D1,ft=new z1(Be),et=new eM(C,T,ee,be,ge,S,h),He=new W1(C,ge,we),$=new rE(B,at,we,be),je=new nM(B,Be,at),mt=new dM(B,Be,at),at.programs=Ve.programs,C.capabilities=we,C.extensions=Be,C.properties=Oe,C.renderLists=De,C.shadowMap=He,C.state=be,C.info=at}Ie();const de=new tE(C,B);this.xr=de,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const R=Be.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Be.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(R){R!==void 0&&(V=R,this.setSize(ce,he,!1))},this.getSize=function(R){return R.set(ce,he)},this.setSize=function(R,q,se=!0){if(de.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ce=R,he=q,n.width=Math.floor(R*V),n.height=Math.floor(q*V),se===!0&&(n.style.width=R+"px",n.style.height=q+"px"),this.setViewport(0,0,R,q)},this.getDrawingBufferSize=function(R){return R.set(ce*V,he*V).floor()},this.setDrawingBufferSize=function(R,q,se){ce=R,he=q,V=se,n.width=Math.floor(R*se),n.height=Math.floor(q*se),this.setViewport(0,0,R,q)},this.getCurrentViewport=function(R){return R.copy(G)},this.getViewport=function(R){return R.copy(M)},this.setViewport=function(R,q,se,oe){R.isVector4?M.set(R.x,R.y,R.z,R.w):M.set(R,q,se,oe),be.viewport(G.copy(M).multiplyScalar(V).round())},this.getScissor=function(R){return R.copy(z)},this.setScissor=function(R,q,se,oe){R.isVector4?z.set(R.x,R.y,R.z,R.w):z.set(R,q,se,oe),be.scissor(ae.copy(z).multiplyScalar(V).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(R){be.setScissorTest(fe=R)},this.setOpaqueSort=function(R){ue=R},this.setTransparentSort=function(R){D=R},this.getClearColor=function(R){return R.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor.apply(et,arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha.apply(et,arguments)},this.clear=function(R=!0,q=!0,se=!0){let oe=0;if(R){let Y=!1;if(j!==null){const Pe=j.texture.format;Y=Pe===sd||Pe===rd||Pe===id}if(Y){const Pe=j.texture.type,Ce=Pe===Wi||Pe===Qr||Pe===Bo||Pe===js||Pe===td||Pe===nd,Ke=et.getClearColor(),qe=et.getClearAlpha(),st=Ke.r,lt=Ke.g,Ze=Ke.b;Ce?(E[0]=st,E[1]=lt,E[2]=Ze,E[3]=qe,B.clearBufferuiv(B.COLOR,0,E)):(A[0]=st,A[1]=lt,A[2]=Ze,A[3]=qe,B.clearBufferiv(B.COLOR,0,A))}else oe|=B.COLOR_BUFFER_BIT}q&&(oe|=B.DEPTH_BUFFER_BIT),se&&(oe|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(oe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",xe,!1),n.removeEventListener("webglcontextrestored",ke,!1),n.removeEventListener("webglcontextcreationerror",Fe,!1),De.dispose(),ft.dispose(),Oe.dispose(),T.dispose(),ee.dispose(),ge.dispose(),bt.dispose(),$.dispose(),Ve.dispose(),de.dispose(),de.removeEventListener("sessionstart",es),de.removeEventListener("sessionend",Xi),Mi.stop()};function xe(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),K=!0}function ke(){console.log("THREE.WebGLRenderer: Context Restored."),K=!1;const R=at.autoReset,q=He.enabled,se=He.autoUpdate,oe=He.needsUpdate,Y=He.type;Ie(),at.autoReset=R,He.enabled=q,He.autoUpdate=se,He.needsUpdate=oe,He.type=Y}function Fe(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ut(R){const q=R.target;q.removeEventListener("dispose",ut),It(q)}function It(R){Xt(R),Oe.remove(R)}function Xt(R){const q=Oe.get(R).programs;q!==void 0&&(q.forEach(function(se){Ve.releaseProgram(se)}),R.isShaderMaterial&&Ve.releaseShaderCache(R))}this.renderBufferDirect=function(R,q,se,oe,Y,Pe){q===null&&(q=$e);const Ce=Y.isMesh&&Y.matrixWorld.determinant()<0,Ke=Yo(R,q,se,oe,Y);be.setMaterial(oe,Ce);let qe=se.index,st=1;if(oe.wireframe===!0){if(qe=ye.getWireframeAttribute(se),qe===void 0)return;st=2}const lt=se.drawRange,Ze=se.attributes.position;let xt=lt.start*st,Ct=(lt.start+lt.count)*st;Pe!==null&&(xt=Math.max(xt,Pe.start*st),Ct=Math.min(Ct,(Pe.start+Pe.count)*st)),qe!==null?(xt=Math.max(xt,0),Ct=Math.min(Ct,qe.count)):Ze!=null&&(xt=Math.max(xt,0),Ct=Math.min(Ct,Ze.count));const _t=Ct-xt;if(_t<0||_t===1/0)return;bt.setup(Y,oe,Ke,se,qe);let sn,dt=je;if(qe!==null&&(sn=_e.get(qe),dt=mt,dt.setIndex(sn)),Y.isMesh)oe.wireframe===!0?(be.setLineWidth(oe.wireframeLinewidth*it()),dt.setMode(B.LINES)):dt.setMode(B.TRIANGLES);else if(Y.isLine){let Je=oe.linewidth;Je===void 0&&(Je=1),be.setLineWidth(Je*it()),Y.isLineSegments?dt.setMode(B.LINES):Y.isLineLoop?dt.setMode(B.LINE_LOOP):dt.setMode(B.LINE_STRIP)}else Y.isPoints?dt.setMode(B.POINTS):Y.isSprite&&dt.setMode(B.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)dt.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))dt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const Je=Y._multiDrawStarts,Qn=Y._multiDrawCounts,wt=Y._multiDrawCount,on=qe?_e.get(qe).bytesPerElement:1,Jn=Oe.get(oe).currentProgram.getUniforms();for(let $t=0;$t<wt;$t++)Jn.setValue(B,"_gl_DrawID",$t),dt.render(Je[$t]/on,Qn[$t])}else if(Y.isInstancedMesh)dt.renderInstances(xt,_t,Y.count);else if(se.isInstancedBufferGeometry){const Je=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Qn=Math.min(se.instanceCount,Je);dt.renderInstances(xt,_t,Qn)}else dt.render(xt,_t)};function yt(R,q,se){R.transparent===!0&&R.side===Bi&&R.forceSinglePass===!1?(R.side=Rn,R.needsUpdate=!0,ts(R,q,se),R.side=Mr,R.needsUpdate=!0,ts(R,q,se),R.side=Bi):ts(R,q,se)}this.compile=function(R,q,se=null){se===null&&(se=R),g=ft.get(se),g.init(q),N.push(g),se.traverseVisible(function(Y){Y.isLight&&Y.layers.test(q.layers)&&(g.pushLight(Y),Y.castShadow&&g.pushShadow(Y))}),R!==se&&R.traverseVisible(function(Y){Y.isLight&&Y.layers.test(q.layers)&&(g.pushLight(Y),Y.castShadow&&g.pushShadow(Y))}),g.setupLights();const oe=new Set;return R.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const Pe=Y.material;if(Pe)if(Array.isArray(Pe))for(let Ce=0;Ce<Pe.length;Ce++){const Ke=Pe[Ce];yt(Ke,se,Y),oe.add(Ke)}else yt(Pe,se,Y),oe.add(Pe)}),N.pop(),g=null,oe},this.compileAsync=function(R,q,se=null){const oe=this.compile(R,q,se);return new Promise(Y=>{function Pe(){if(oe.forEach(function(Ce){Oe.get(Ce).currentProgram.isReady()&&oe.delete(Ce)}),oe.size===0){Y(R);return}setTimeout(Pe,10)}Be.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let yn=null;function pn(R){yn&&yn(R)}function es(){Mi.stop()}function Xi(){Mi.start()}const Mi=new Og;Mi.setAnimationLoop(pn),typeof self<"u"&&Mi.setContext(self),this.setAnimationLoop=function(R){yn=R,de.setAnimationLoop(R),R===null?Mi.stop():Mi.start()},de.addEventListener("sessionstart",es),de.addEventListener("sessionend",Xi),this.render=function(R,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(K===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),de.enabled===!0&&de.isPresenting===!0&&(de.cameraAutoUpdate===!0&&de.updateCamera(q),q=de.getCamera()),R.isScene===!0&&R.onBeforeRender(C,R,q,j),g=ft.get(R,N.length),g.init(q),N.push(g),me.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),W.setFromProjectionMatrix(me),le=this.localClippingEnabled,Q=Te.init(this.clippingPlanes,le),x=De.get(R,P.length),x.init(),P.push(x),de.enabled===!0&&de.isPresenting===!0){const Pe=C.xr.getDepthSensingMesh();Pe!==null&&Ei(Pe,q,-1/0,C.sortObjects)}Ei(R,q,0,C.sortObjects),x.finish(),C.sortObjects===!0&&x.sort(ue,D),We=de.enabled===!1||de.isPresenting===!1||de.hasDepthSensing()===!1,We&&et.addToRenderList(x,R),this.info.render.frame++,Q===!0&&Te.beginShadows();const se=g.state.shadowsArray;He.render(se,R,q),Q===!0&&Te.endShadows(),this.info.autoReset===!0&&this.info.reset();const oe=x.opaque,Y=x.transmissive;if(g.setupLights(),q.isArrayCamera){const Pe=q.cameras;if(Y.length>0)for(let Ce=0,Ke=Pe.length;Ce<Ke;Ce++){const qe=Pe[Ce];Tr(oe,Y,R,qe)}We&&et.render(R);for(let Ce=0,Ke=Pe.length;Ce<Ke;Ce++){const qe=Pe[Ce];wr(x,R,qe,qe.viewport)}}else Y.length>0&&Tr(oe,Y,R,q),We&&et.render(R),wr(x,R,q);j!==null&&(I.updateMultisampleRenderTarget(j),I.updateRenderTargetMipmap(j)),R.isScene===!0&&R.onAfterRender(C,R,q),bt.resetDefaultState(),L=-1,b=null,N.pop(),N.length>0?(g=N[N.length-1],Q===!0&&Te.setGlobalState(C.clippingPlanes,g.state.camera)):g=null,P.pop(),P.length>0?x=P[P.length-1]:x=null};function Ei(R,q,se,oe){if(R.visible===!1)return;if(R.layers.test(q.layers)){if(R.isGroup)se=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(q);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||W.intersectsSprite(R)){oe&&Ne.setFromMatrixPosition(R.matrixWorld).applyMatrix4(me);const Ce=ge.update(R),Ke=R.material;Ke.visible&&x.push(R,Ce,Ke,se,Ne.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||W.intersectsObject(R))){const Ce=ge.update(R),Ke=R.material;if(oe&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ne.copy(R.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),Ne.copy(Ce.boundingSphere.center)),Ne.applyMatrix4(R.matrixWorld).applyMatrix4(me)),Array.isArray(Ke)){const qe=Ce.groups;for(let st=0,lt=qe.length;st<lt;st++){const Ze=qe[st],xt=Ke[Ze.materialIndex];xt&&xt.visible&&x.push(R,Ce,xt,se,Ne.z,Ze)}}else Ke.visible&&x.push(R,Ce,Ke,se,Ne.z,null)}}const Pe=R.children;for(let Ce=0,Ke=Pe.length;Ce<Ke;Ce++)Ei(Pe[Ce],q,se,oe)}function wr(R,q,se,oe){const Y=R.opaque,Pe=R.transmissive,Ce=R.transparent;g.setupLightsView(se),Q===!0&&Te.setGlobalState(C.clippingPlanes,se),oe&&be.viewport(G.copy(oe)),Y.length>0&&$i(Y,q,se),Pe.length>0&&$i(Pe,q,se),Ce.length>0&&$i(Ce,q,se),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function Tr(R,q,se,oe){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[oe.id]===void 0&&(g.state.transmissionRenderTarget[oe.id]=new Jr(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?Vo:Wi,minFilter:Kr,samples:4,stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Mt.workingColorSpace}));const Pe=g.state.transmissionRenderTarget[oe.id],Ce=oe.viewport||G;Pe.setSize(Ce.z,Ce.w);const Ke=C.getRenderTarget();C.setRenderTarget(Pe),C.getClearColor(pe),ve=C.getClearAlpha(),ve<1&&C.setClearColor(16777215,.5),C.clear(),We&&et.render(se);const qe=C.toneMapping;C.toneMapping=Sr;const st=oe.viewport;if(oe.viewport!==void 0&&(oe.viewport=void 0),g.setupLightsView(oe),Q===!0&&Te.setGlobalState(C.clippingPlanes,oe),$i(R,se,oe),I.updateMultisampleRenderTarget(Pe),I.updateRenderTargetMipmap(Pe),Be.has("WEBGL_multisampled_render_to_texture")===!1){let lt=!1;for(let Ze=0,xt=q.length;Ze<xt;Ze++){const Ct=q[Ze],_t=Ct.object,sn=Ct.geometry,dt=Ct.material,Je=Ct.group;if(dt.side===Bi&&_t.layers.test(oe.layers)){const Qn=dt.side;dt.side=Rn,dt.needsUpdate=!0,$o(_t,se,oe,sn,dt,Je),dt.side=Qn,dt.needsUpdate=!0,lt=!0}}lt===!0&&(I.updateMultisampleRenderTarget(Pe),I.updateRenderTargetMipmap(Pe))}C.setRenderTarget(Ke),C.setClearColor(pe,ve),st!==void 0&&(oe.viewport=st),C.toneMapping=qe}function $i(R,q,se){const oe=q.isScene===!0?q.overrideMaterial:null;for(let Y=0,Pe=R.length;Y<Pe;Y++){const Ce=R[Y],Ke=Ce.object,qe=Ce.geometry,st=oe===null?Ce.material:oe,lt=Ce.group;Ke.layers.test(se.layers)&&$o(Ke,q,se,qe,st,lt)}}function $o(R,q,se,oe,Y,Pe){R.onBeforeRender(C,q,se,oe,Y,Pe),R.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Y.onBeforeRender(C,q,se,oe,R,Pe),Y.transparent===!0&&Y.side===Bi&&Y.forceSinglePass===!1?(Y.side=Rn,Y.needsUpdate=!0,C.renderBufferDirect(se,q,oe,Y,R,Pe),Y.side=Mr,Y.needsUpdate=!0,C.renderBufferDirect(se,q,oe,Y,R,Pe),Y.side=Bi):C.renderBufferDirect(se,q,oe,Y,R,Pe),R.onAfterRender(C,q,se,oe,Y,Pe)}function ts(R,q,se){q.isScene!==!0&&(q=$e);const oe=Oe.get(R),Y=g.state.lights,Pe=g.state.shadowsArray,Ce=Y.state.version,Ke=Ve.getParameters(R,Y.state,Pe,q,se),qe=Ve.getProgramCacheKey(Ke);let st=oe.programs;oe.environment=R.isMeshStandardMaterial?q.environment:null,oe.fog=q.fog,oe.envMap=(R.isMeshStandardMaterial?ee:T).get(R.envMap||oe.environment),oe.envMapRotation=oe.environment!==null&&R.envMap===null?q.environmentRotation:R.envMapRotation,st===void 0&&(R.addEventListener("dispose",ut),st=new Map,oe.programs=st);let lt=st.get(qe);if(lt!==void 0){if(oe.currentProgram===lt&&oe.lightsStateVersion===Ce)return hi(R,Ke),lt}else Ke.uniforms=Ve.getUniforms(R),R.onBeforeCompile(Ke,C),lt=Ve.acquireProgram(Ke,qe),st.set(qe,lt),oe.uniforms=Ke.uniforms;const Ze=oe.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ze.clippingPlanes=Te.uniform),hi(R,Ke),oe.needsLights=Vl(R),oe.lightsStateVersion=Ce,oe.needsLights&&(Ze.ambientLightColor.value=Y.state.ambient,Ze.lightProbe.value=Y.state.probe,Ze.directionalLights.value=Y.state.directional,Ze.directionalLightShadows.value=Y.state.directionalShadow,Ze.spotLights.value=Y.state.spot,Ze.spotLightShadows.value=Y.state.spotShadow,Ze.rectAreaLights.value=Y.state.rectArea,Ze.ltc_1.value=Y.state.rectAreaLTC1,Ze.ltc_2.value=Y.state.rectAreaLTC2,Ze.pointLights.value=Y.state.point,Ze.pointLightShadows.value=Y.state.pointShadow,Ze.hemisphereLights.value=Y.state.hemi,Ze.directionalShadowMap.value=Y.state.directionalShadowMap,Ze.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ze.spotShadowMap.value=Y.state.spotShadowMap,Ze.spotLightMatrix.value=Y.state.spotLightMatrix,Ze.spotLightMap.value=Y.state.spotLightMap,Ze.pointShadowMap.value=Y.state.pointShadowMap,Ze.pointShadowMatrix.value=Y.state.pointShadowMatrix),oe.currentProgram=lt,oe.uniformsList=null,lt}function qo(R){if(R.uniformsList===null){const q=R.currentProgram.getUniforms();R.uniformsList=Pl.seqWithValue(q.seq,R.uniforms)}return R.uniformsList}function hi(R,q){const se=Oe.get(R);se.outputColorSpace=q.outputColorSpace,se.batching=q.batching,se.batchingColor=q.batchingColor,se.instancing=q.instancing,se.instancingColor=q.instancingColor,se.instancingMorph=q.instancingMorph,se.skinning=q.skinning,se.morphTargets=q.morphTargets,se.morphNormals=q.morphNormals,se.morphColors=q.morphColors,se.morphTargetsCount=q.morphTargetsCount,se.numClippingPlanes=q.numClippingPlanes,se.numIntersection=q.numClipIntersection,se.vertexAlphas=q.vertexAlphas,se.vertexTangents=q.vertexTangents,se.toneMapping=q.toneMapping}function Yo(R,q,se,oe,Y){q.isScene!==!0&&(q=$e),I.resetTextureUnits();const Pe=q.fog,Ce=oe.isMeshStandardMaterial?q.environment:null,Ke=j===null?C.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:qs,qe=(oe.isMeshStandardMaterial?ee:T).get(oe.envMap||Ce),st=oe.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,lt=!!se.attributes.tangent&&(!!oe.normalMap||oe.anisotropy>0),Ze=!!se.morphAttributes.position,xt=!!se.morphAttributes.normal,Ct=!!se.morphAttributes.color;let _t=Sr;oe.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(_t=C.toneMapping);const sn=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,dt=sn!==void 0?sn.length:0,Je=Oe.get(oe),Qn=g.state.lights;if(Q===!0&&(le===!0||R!==b)){const mn=R===b&&oe.id===L;Te.setState(oe,R,mn)}let wt=!1;oe.version===Je.__version?(Je.needsLights&&Je.lightsStateVersion!==Qn.state.version||Je.outputColorSpace!==Ke||Y.isBatchedMesh&&Je.batching===!1||!Y.isBatchedMesh&&Je.batching===!0||Y.isBatchedMesh&&Je.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Je.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Je.instancing===!1||!Y.isInstancedMesh&&Je.instancing===!0||Y.isSkinnedMesh&&Je.skinning===!1||!Y.isSkinnedMesh&&Je.skinning===!0||Y.isInstancedMesh&&Je.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Je.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Je.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Je.instancingMorph===!1&&Y.morphTexture!==null||Je.envMap!==qe||oe.fog===!0&&Je.fog!==Pe||Je.numClippingPlanes!==void 0&&(Je.numClippingPlanes!==Te.numPlanes||Je.numIntersection!==Te.numIntersection)||Je.vertexAlphas!==st||Je.vertexTangents!==lt||Je.morphTargets!==Ze||Je.morphNormals!==xt||Je.morphColors!==Ct||Je.toneMapping!==_t||Je.morphTargetsCount!==dt)&&(wt=!0):(wt=!0,Je.__version=oe.version);let on=Je.currentProgram;wt===!0&&(on=ts(oe,q,Y));let Jn=!1,$t=!1,pi=!1;const Nt=on.getUniforms(),Bn=Je.uniforms;if(be.useProgram(on.program)&&(Jn=!0,$t=!0,pi=!0),oe.id!==L&&(L=oe.id,$t=!0),Jn||b!==R){be.buffers.depth.getReversed()?(ne.copy(R.projectionMatrix),q_(ne),Y_(ne),Nt.setValue(B,"projectionMatrix",ne)):Nt.setValue(B,"projectionMatrix",R.projectionMatrix),Nt.setValue(B,"viewMatrix",R.matrixWorldInverse);const Vn=Nt.map.cameraPosition;Vn!==void 0&&Vn.setValue(B,Se.setFromMatrixPosition(R.matrixWorld)),we.logarithmicDepthBuffer&&Nt.setValue(B,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(oe.isMeshPhongMaterial||oe.isMeshToonMaterial||oe.isMeshLambertMaterial||oe.isMeshBasicMaterial||oe.isMeshStandardMaterial||oe.isShaderMaterial)&&Nt.setValue(B,"isOrthographic",R.isOrthographicCamera===!0),b!==R&&(b=R,$t=!0,pi=!0)}if(Y.isSkinnedMesh){Nt.setOptional(B,Y,"bindMatrix"),Nt.setOptional(B,Y,"bindMatrixInverse");const mn=Y.skeleton;mn&&(mn.boneTexture===null&&mn.computeBoneTexture(),Nt.setValue(B,"boneTexture",mn.boneTexture,I))}Y.isBatchedMesh&&(Nt.setOptional(B,Y,"batchingTexture"),Nt.setValue(B,"batchingTexture",Y._matricesTexture,I),Nt.setOptional(B,Y,"batchingIdTexture"),Nt.setValue(B,"batchingIdTexture",Y._indirectTexture,I),Nt.setOptional(B,Y,"batchingColorTexture"),Y._colorsTexture!==null&&Nt.setValue(B,"batchingColorTexture",Y._colorsTexture,I));const wi=se.morphAttributes;if((wi.position!==void 0||wi.normal!==void 0||wi.color!==void 0)&&rt.update(Y,se,on),($t||Je.receiveShadow!==Y.receiveShadow)&&(Je.receiveShadow=Y.receiveShadow,Nt.setValue(B,"receiveShadow",Y.receiveShadow)),oe.isMeshGouraudMaterial&&oe.envMap!==null&&(Bn.envMap.value=qe,Bn.flipEnvMap.value=qe.isCubeTexture&&qe.isRenderTargetTexture===!1?-1:1),oe.isMeshStandardMaterial&&oe.envMap===null&&q.environment!==null&&(Bn.envMapIntensity.value=q.environmentIntensity),$t&&(Nt.setValue(B,"toneMappingExposure",C.toneMappingExposure),Je.needsLights&&Ko(Bn,pi),Pe&&oe.fog===!0&&Le.refreshFogUniforms(Bn,Pe),Le.refreshMaterialUniforms(Bn,oe,V,he,g.state.transmissionRenderTarget[R.id]),Pl.upload(B,qo(Je),Bn,I)),oe.isShaderMaterial&&oe.uniformsNeedUpdate===!0&&(Pl.upload(B,qo(Je),Bn,I),oe.uniformsNeedUpdate=!1),oe.isSpriteMaterial&&Nt.setValue(B,"center",Y.center),Nt.setValue(B,"modelViewMatrix",Y.modelViewMatrix),Nt.setValue(B,"normalMatrix",Y.normalMatrix),Nt.setValue(B,"modelMatrix",Y.matrixWorld),oe.isShaderMaterial||oe.isRawShaderMaterial){const mn=oe.uniformsGroups;for(let Vn=0,Sn=mn.length;Vn<Sn;Vn++){const Zo=mn[Vn];$.update(Zo,on),$.bind(Zo,on)}}return on}function Ko(R,q){R.ambientLightColor.needsUpdate=q,R.lightProbe.needsUpdate=q,R.directionalLights.needsUpdate=q,R.directionalLightShadows.needsUpdate=q,R.pointLights.needsUpdate=q,R.pointLightShadows.needsUpdate=q,R.spotLights.needsUpdate=q,R.spotLightShadows.needsUpdate=q,R.rectAreaLights.needsUpdate=q,R.hemisphereLights.needsUpdate=q}function Vl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(R,q,se){Oe.get(R.texture).__webglTexture=q,Oe.get(R.depthTexture).__webglTexture=se;const oe=Oe.get(R);oe.__hasExternalTextures=!0,oe.__autoAllocateDepthBuffer=se===void 0,oe.__autoAllocateDepthBuffer||Be.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),oe.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,q){const se=Oe.get(R);se.__webglFramebuffer=q,se.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(R,q=0,se=0){j=R,k=q,O=se;let oe=!0,Y=null,Pe=!1,Ce=!1;if(R){const qe=Oe.get(R);if(qe.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(B.FRAMEBUFFER,null),oe=!1;else if(qe.__webglFramebuffer===void 0)I.setupRenderTarget(R);else if(qe.__hasExternalTextures)I.rebindTextures(R,Oe.get(R.texture).__webglTexture,Oe.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ze=R.depthTexture;if(qe.__boundDepthTexture!==Ze){if(Ze!==null&&Oe.has(Ze)&&(R.width!==Ze.image.width||R.height!==Ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(R)}}const st=R.texture;(st.isData3DTexture||st.isDataArrayTexture||st.isCompressedArrayTexture)&&(Ce=!0);const lt=Oe.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(lt[q])?Y=lt[q][se]:Y=lt[q],Pe=!0):R.samples>0&&I.useMultisampledRTT(R)===!1?Y=Oe.get(R).__webglMultisampledFramebuffer:Array.isArray(lt)?Y=lt[se]:Y=lt,G.copy(R.viewport),ae.copy(R.scissor),ie=R.scissorTest}else G.copy(M).multiplyScalar(V).floor(),ae.copy(z).multiplyScalar(V).floor(),ie=fe;if(be.bindFramebuffer(B.FRAMEBUFFER,Y)&&oe&&be.drawBuffers(R,Y),be.viewport(G),be.scissor(ae),be.setScissorTest(ie),Pe){const qe=Oe.get(R.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+q,qe.__webglTexture,se)}else if(Ce){const qe=Oe.get(R.texture),st=q||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,qe.__webglTexture,se||0,st)}L=-1},this.readRenderTargetPixels=function(R,q,se,oe,Y,Pe,Ce){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ke=Oe.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ce!==void 0&&(Ke=Ke[Ce]),Ke){be.bindFramebuffer(B.FRAMEBUFFER,Ke);try{const qe=R.texture,st=qe.format,lt=qe.type;if(!we.textureFormatReadable(st)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!we.textureTypeReadable(lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=R.width-oe&&se>=0&&se<=R.height-Y&&B.readPixels(q,se,oe,Y,ct.convert(st),ct.convert(lt),Pe)}finally{const qe=j!==null?Oe.get(j).__webglFramebuffer:null;be.bindFramebuffer(B.FRAMEBUFFER,qe)}}},this.readRenderTargetPixelsAsync=async function(R,q,se,oe,Y,Pe,Ce){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ke=Oe.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ce!==void 0&&(Ke=Ke[Ce]),Ke){const qe=R.texture,st=qe.format,lt=qe.type;if(!we.textureFormatReadable(st))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!we.textureTypeReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(q>=0&&q<=R.width-oe&&se>=0&&se<=R.height-Y){be.bindFramebuffer(B.FRAMEBUFFER,Ke);const Ze=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Ze),B.bufferData(B.PIXEL_PACK_BUFFER,Pe.byteLength,B.STREAM_READ),B.readPixels(q,se,oe,Y,ct.convert(st),ct.convert(lt),0);const xt=j!==null?Oe.get(j).__webglFramebuffer:null;be.bindFramebuffer(B.FRAMEBUFFER,xt);const Ct=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await $_(B,Ct,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Ze),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Pe),B.deleteBuffer(Ze),B.deleteSync(Ct),Pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,q=null,se=0){R.isTexture!==!0&&(Oo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),q=arguments[0]||null,R=arguments[1]);const oe=Math.pow(2,-se),Y=Math.floor(R.image.width*oe),Pe=Math.floor(R.image.height*oe),Ce=q!==null?q.x:0,Ke=q!==null?q.y:0;I.setTexture2D(R,0),B.copyTexSubImage2D(B.TEXTURE_2D,se,0,0,Ce,Ke,Y,Pe),be.unbindTexture()},this.copyTextureToTexture=function(R,q,se=null,oe=null,Y=0){R.isTexture!==!0&&(Oo("WebGLRenderer: copyTextureToTexture function signature has changed."),oe=arguments[0]||null,R=arguments[1],q=arguments[2],Y=arguments[3]||0,se=null);let Pe,Ce,Ke,qe,st,lt,Ze,xt,Ct;const _t=R.isCompressedTexture?R.mipmaps[Y]:R.image;se!==null?(Pe=se.max.x-se.min.x,Ce=se.max.y-se.min.y,Ke=se.isBox3?se.max.z-se.min.z:1,qe=se.min.x,st=se.min.y,lt=se.isBox3?se.min.z:0):(Pe=_t.width,Ce=_t.height,Ke=_t.depth||1,qe=0,st=0,lt=0),oe!==null?(Ze=oe.x,xt=oe.y,Ct=oe.z):(Ze=0,xt=0,Ct=0);const sn=ct.convert(q.format),dt=ct.convert(q.type);let Je;q.isData3DTexture?(I.setTexture3D(q,0),Je=B.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(I.setTexture2DArray(q,0),Je=B.TEXTURE_2D_ARRAY):(I.setTexture2D(q,0),Je=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,q.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,q.unpackAlignment);const Qn=B.getParameter(B.UNPACK_ROW_LENGTH),wt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),on=B.getParameter(B.UNPACK_SKIP_PIXELS),Jn=B.getParameter(B.UNPACK_SKIP_ROWS),$t=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,_t.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,_t.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,qe),B.pixelStorei(B.UNPACK_SKIP_ROWS,st),B.pixelStorei(B.UNPACK_SKIP_IMAGES,lt);const pi=R.isDataArrayTexture||R.isData3DTexture,Nt=q.isDataArrayTexture||q.isData3DTexture;if(R.isRenderTargetTexture||R.isDepthTexture){const Bn=Oe.get(R),wi=Oe.get(q),mn=Oe.get(Bn.__renderTarget),Vn=Oe.get(wi.__renderTarget);be.bindFramebuffer(B.READ_FRAMEBUFFER,mn.__webglFramebuffer),be.bindFramebuffer(B.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let Sn=0;Sn<Ke;Sn++)pi&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Oe.get(R).__webglTexture,Y,lt+Sn),R.isDepthTexture?(Nt&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Oe.get(q).__webglTexture,Y,Ct+Sn),B.blitFramebuffer(qe,st,Pe,Ce,Ze,xt,Pe,Ce,B.DEPTH_BUFFER_BIT,B.NEAREST)):Nt?B.copyTexSubImage3D(Je,Y,Ze,xt,Ct+Sn,qe,st,Pe,Ce):B.copyTexSubImage2D(Je,Y,Ze,xt,Ct+Sn,qe,st,Pe,Ce);be.bindFramebuffer(B.READ_FRAMEBUFFER,null),be.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Nt?R.isDataTexture||R.isData3DTexture?B.texSubImage3D(Je,Y,Ze,xt,Ct,Pe,Ce,Ke,sn,dt,_t.data):q.isCompressedArrayTexture?B.compressedTexSubImage3D(Je,Y,Ze,xt,Ct,Pe,Ce,Ke,sn,_t.data):B.texSubImage3D(Je,Y,Ze,xt,Ct,Pe,Ce,Ke,sn,dt,_t):R.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Y,Ze,xt,Pe,Ce,sn,dt,_t.data):R.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Y,Ze,xt,_t.width,_t.height,sn,_t.data):B.texSubImage2D(B.TEXTURE_2D,Y,Ze,xt,Pe,Ce,sn,dt,_t);B.pixelStorei(B.UNPACK_ROW_LENGTH,Qn),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,wt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,on),B.pixelStorei(B.UNPACK_SKIP_ROWS,Jn),B.pixelStorei(B.UNPACK_SKIP_IMAGES,$t),Y===0&&q.generateMipmaps&&B.generateMipmap(Je),be.unbindTexture()},this.copyTextureToTexture3D=function(R,q,se=null,oe=null,Y=0){return R.isTexture!==!0&&(Oo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),se=arguments[0]||null,oe=arguments[1]||null,R=arguments[2],q=arguments[3],Y=arguments[4]||0),Oo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,q,se,oe,Y)},this.initRenderTarget=function(R){Oe.get(R).__webglFramebuffer===void 0&&I.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?I.setTextureCube(R,0):R.isData3DTexture?I.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?I.setTexture2DArray(R,0):I.setTexture2D(R,0),be.unbindTexture()},this.resetState=function(){k=0,O=0,j=null,be.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=Mt._getDrawingBufferColorSpace(e),n.unpackColorSpace=Mt._getUnpackColorSpace()}}class oE extends xn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ji,this.environmentIntensity=1,this.environmentRotation=new ji,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class qf extends Ks{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Dl=new J,Il=new J,Vm=new Bt,Fo=new od,yl=new jo,rf=new J,Hm=new J;class Gg extends xn{constructor(e=new Ln,n=new qf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,r=[0];for(let a=1,l=n.count;a<l;a++)Dl.fromBufferAttribute(n,a-1),Il.fromBufferAttribute(n,a),r[a]=r[a-1],r[a]+=Dl.distanceTo(Il);e.setAttribute("lineDistance",new kn(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const r=this.geometry,a=this.matrixWorld,l=e.params.Line.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),yl.copy(r.boundingSphere),yl.applyMatrix4(a),yl.radius+=l,e.ray.intersectsSphere(yl)===!1)return;Vm.copy(a).invert(),Fo.copy(e.ray).applyMatrix4(Vm);const f=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=f*f,m=this.isLineSegments?2:1,_=r.index,v=r.attributes.position;if(_!==null){const S=Math.max(0,u.start),E=Math.min(_.count,u.start+u.count);for(let A=S,x=E-1;A<x;A+=m){const g=_.getX(A),P=_.getX(A+1),N=Sl(this,e,Fo,h,g,P);N&&n.push(N)}if(this.isLineLoop){const A=_.getX(E-1),x=_.getX(S),g=Sl(this,e,Fo,h,A,x);g&&n.push(g)}}else{const S=Math.max(0,u.start),E=Math.min(v.count,u.start+u.count);for(let A=S,x=E-1;A<x;A+=m){const g=Sl(this,e,Fo,h,A,A+1);g&&n.push(g)}if(this.isLineLoop){const A=Sl(this,e,Fo,h,E-1,S);A&&n.push(A)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=a.length;l<u;l++){const f=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}}function Sl(s,e,n,r,a,l){const u=s.geometry.attributes.position;if(Dl.fromBufferAttribute(u,a),Il.fromBufferAttribute(u,l),n.distanceSqToSegment(Dl,Il,rf,Hm)>r)return;rf.applyMatrix4(s.matrixWorld);const h=e.ray.origin.distanceTo(rf);if(!(h<e.near||h>e.far))return{distance:h,point:Hm.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const Gm=new J,Wm=new J;class aE extends Gg{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,r=[];for(let a=0,l=n.count;a<l;a+=2)Gm.fromBufferAttribute(n,a),Wm.fromBufferAttribute(n,a+1),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+Gm.distanceTo(Wm);e.setAttribute("lineDistance",new kn(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Yf extends Ks{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const jm=new Bt,Kf=new od,Ml=new jo,El=new J;class Xm extends xn{constructor(e=new Ln,n=new Yf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const r=this.geometry,a=this.matrixWorld,l=e.params.Points.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Ml.copy(r.boundingSphere),Ml.applyMatrix4(a),Ml.radius+=l,e.ray.intersectsSphere(Ml)===!1)return;jm.copy(a).invert(),Kf.copy(e.ray).applyMatrix4(jm);const f=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=f*f,m=r.index,y=r.attributes.position;if(m!==null){const v=Math.max(0,u.start),S=Math.min(m.count,u.start+u.count);for(let E=v,A=S;E<A;E++){const x=m.getX(E);El.fromBufferAttribute(y,x),$m(El,x,h,a,e,n,this)}}else{const v=Math.max(0,u.start),S=Math.min(y.count,u.start+u.count);for(let E=v,A=S;E<A;E++)El.fromBufferAttribute(y,E),$m(El,E,h,a,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=a.length;l<u;l++){const f=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}}function $m(s,e,n,r,a,l,u){const f=Kf.distanceSqToPoint(s);if(f<n){const h=new J;Kf.closestPointToPoint(s,h),h.applyMatrix4(r);const m=a.ray.origin.distanceTo(h);if(m<a.near||m>a.far)return;l.push({distance:m,distanceToRay:Math.sqrt(f),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:u})}}class lE{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){const r=this.getUtoTmapping(e);return this.getPoint(r,n)}getPoints(e=5){const n=[];for(let r=0;r<=e;r++)n.push(this.getPoint(r/e));return n}getSpacedPoints(e=5){const n=[];for(let r=0;r<=e;r++)n.push(this.getPointAt(r/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let r,a=this.getPoint(0),l=0;n.push(0);for(let u=1;u<=e;u++)r=this.getPoint(u/e),l+=r.distanceTo(a),n.push(l),a=r;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){const r=this.getLengths();let a=0;const l=r.length;let u;n?u=n:u=e*r[l-1];let f=0,h=l-1,m;for(;f<=h;)if(a=Math.floor(f+(h-f)/2),m=r[a]-u,m<0)f=a+1;else if(m>0)h=a-1;else{h=a;break}if(a=h,r[a]===u)return a/(l-1);const _=r[a],v=r[a+1]-_,S=(u-_)/v;return(a+S)/(l-1)}getTangent(e,n){let a=e-1e-4,l=e+1e-4;a<0&&(a=0),l>1&&(l=1);const u=this.getPoint(a),f=this.getPoint(l),h=n||(u.isVector2?new At:new J);return h.copy(f).sub(u).normalize(),h}getTangentAt(e,n){const r=this.getUtoTmapping(e);return this.getTangent(r,n)}computeFrenetFrames(e,n){const r=new J,a=[],l=[],u=[],f=new J,h=new Bt;for(let S=0;S<=e;S++){const E=S/e;a[S]=this.getTangentAt(E,new J)}l[0]=new J,u[0]=new J;let m=Number.MAX_VALUE;const _=Math.abs(a[0].x),y=Math.abs(a[0].y),v=Math.abs(a[0].z);_<=m&&(m=_,r.set(1,0,0)),y<=m&&(m=y,r.set(0,1,0)),v<=m&&r.set(0,0,1),f.crossVectors(a[0],r).normalize(),l[0].crossVectors(a[0],f),u[0].crossVectors(a[0],l[0]);for(let S=1;S<=e;S++){if(l[S]=l[S-1].clone(),u[S]=u[S-1].clone(),f.crossVectors(a[S-1],a[S]),f.length()>Number.EPSILON){f.normalize();const E=Math.acos(hn(a[S-1].dot(a[S]),-1,1));l[S].applyMatrix4(h.makeRotationAxis(f,E))}u[S].crossVectors(a[S],l[S])}if(n===!0){let S=Math.acos(hn(l[0].dot(l[e]),-1,1));S/=e,a[0].dot(f.crossVectors(l[0],l[e]))>0&&(S=-S);for(let E=1;E<=e;E++)l[E].applyMatrix4(h.makeRotationAxis(a[E],S*E)),u[E].crossVectors(a[E],l[E])}return{tangents:a,normals:l,binormals:u}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class cE extends lE{constructor(e=0,n=0,r=1,a=1,l=0,u=Math.PI*2,f=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=r,this.yRadius=a,this.aStartAngle=l,this.aEndAngle=u,this.aClockwise=f,this.aRotation=h}getPoint(e,n=new At){const r=n,a=Math.PI*2;let l=this.aEndAngle-this.aStartAngle;const u=Math.abs(l)<Number.EPSILON;for(;l<0;)l+=a;for(;l>a;)l-=a;l<Number.EPSILON&&(u?l=0:l=a),this.aClockwise===!0&&!u&&(l===a?l=-a:l=l-a);const f=this.aStartAngle+e*l;let h=this.aX+this.xRadius*Math.cos(f),m=this.aY+this.yRadius*Math.sin(f);if(this.aRotation!==0){const _=Math.cos(this.aRotation),y=Math.sin(this.aRotation),v=h-this.aX,S=m-this.aY;h=v*_-S*y+this.aX,m=v*y+S*_+this.aY}return r.set(h,m)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Bl extends Ln{constructor(e=[],n=[],r=1,a=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:n,radius:r,detail:a};const l=[],u=[];f(a),m(r),_(),this.setAttribute("position",new kn(l,3)),this.setAttribute("normal",new kn(l.slice(),3)),this.setAttribute("uv",new kn(u,2)),a===0?this.computeVertexNormals():this.normalizeNormals();function f(P){const N=new J,C=new J,K=new J;for(let k=0;k<n.length;k+=3)S(n[k+0],N),S(n[k+1],C),S(n[k+2],K),h(N,C,K,P)}function h(P,N,C,K){const k=K+1,O=[];for(let j=0;j<=k;j++){O[j]=[];const L=P.clone().lerp(C,j/k),b=N.clone().lerp(C,j/k),G=k-j;for(let ae=0;ae<=G;ae++)ae===0&&j===k?O[j][ae]=L:O[j][ae]=L.clone().lerp(b,ae/G)}for(let j=0;j<k;j++)for(let L=0;L<2*(k-j)-1;L++){const b=Math.floor(L/2);L%2===0?(v(O[j][b+1]),v(O[j+1][b]),v(O[j][b])):(v(O[j][b+1]),v(O[j+1][b+1]),v(O[j+1][b]))}}function m(P){const N=new J;for(let C=0;C<l.length;C+=3)N.x=l[C+0],N.y=l[C+1],N.z=l[C+2],N.normalize().multiplyScalar(P),l[C+0]=N.x,l[C+1]=N.y,l[C+2]=N.z}function _(){const P=new J;for(let N=0;N<l.length;N+=3){P.x=l[N+0],P.y=l[N+1],P.z=l[N+2];const C=x(P)/2/Math.PI+.5,K=g(P)/Math.PI+.5;u.push(C,1-K)}E(),y()}function y(){for(let P=0;P<u.length;P+=6){const N=u[P+0],C=u[P+2],K=u[P+4],k=Math.max(N,C,K),O=Math.min(N,C,K);k>.9&&O<.1&&(N<.2&&(u[P+0]+=1),C<.2&&(u[P+2]+=1),K<.2&&(u[P+4]+=1))}}function v(P){l.push(P.x,P.y,P.z)}function S(P,N){const C=P*3;N.x=e[C+0],N.y=e[C+1],N.z=e[C+2]}function E(){const P=new J,N=new J,C=new J,K=new J,k=new At,O=new At,j=new At;for(let L=0,b=0;L<l.length;L+=9,b+=6){P.set(l[L+0],l[L+1],l[L+2]),N.set(l[L+3],l[L+4],l[L+5]),C.set(l[L+6],l[L+7],l[L+8]),k.set(u[b+0],u[b+1]),O.set(u[b+2],u[b+3]),j.set(u[b+4],u[b+5]),K.copy(P).add(N).add(C).divideScalar(3);const G=x(K);A(k,b+0,P,G),A(O,b+2,N,G),A(j,b+4,C,G)}}function A(P,N,C,K){K<0&&P.x===1&&(u[N]=P.x-1),C.x===0&&C.z===0&&(u[N]=K/2/Math.PI+.5)}function x(P){return Math.atan2(P.z,-P.x)}function g(P){return Math.atan2(-P.y,Math.sqrt(P.x*P.x+P.z*P.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bl(e.vertices,e.indices,e.radius,e.details)}}class cd extends Bl{constructor(e=1,n=0){const r=(1+Math.sqrt(5))/2,a=[-1,r,0,1,r,0,-1,-r,0,1,-r,0,0,-1,r,0,1,r,0,-1,-r,0,1,-r,r,0,-1,r,0,1,-r,0,-1,-r,0,1],l=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(a,l,e,n),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new cd(e.radius,e.detail)}}class ud extends Bl{constructor(e=1,n=0){const r=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],a=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(r,a,e,n),this.type="OctahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new ud(e.radius,e.detail)}}class uE extends Ln{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const n=[],r=new Set,a=new J,l=new J;if(e.index!==null){const u=e.attributes.position,f=e.index;let h=e.groups;h.length===0&&(h=[{start:0,count:f.count,materialIndex:0}]);for(let m=0,_=h.length;m<_;++m){const y=h[m],v=y.start,S=y.count;for(let E=v,A=v+S;E<A;E+=3)for(let x=0;x<3;x++){const g=f.getX(E+x),P=f.getX(E+(x+1)%3);a.fromBufferAttribute(u,g),l.fromBufferAttribute(u,P),qm(a,l,r)===!0&&(n.push(a.x,a.y,a.z),n.push(l.x,l.y,l.z))}}}else{const u=e.attributes.position;for(let f=0,h=u.count/3;f<h;f++)for(let m=0;m<3;m++){const _=3*f+m,y=3*f+(m+1)%3;a.fromBufferAttribute(u,_),l.fromBufferAttribute(u,y),qm(a,l,r)===!0&&(n.push(a.x,a.y,a.z),n.push(l.x,l.y,l.z))}}this.setAttribute("position",new kn(n,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function qm(s,e,n){const r=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,a=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return n.has(r)===!0||n.has(a)===!0?!1:(n.add(r),n.add(a),!0)}class fE{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ym(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=Ym();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function Ym(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jf);function dE({theme:s="dark"}){const e=vt.useRef(null);return vt.useEffect(()=>{const n=e.current;if(!n)return;const r=new oE,a=new Kn(45,n.clientWidth/n.clientHeight,.1,1e3);a.position.set(0,0,7.5);const l=new sE({alpha:!0,antialias:!0});l.setSize(n.clientWidth,n.clientHeight),l.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.appendChild(l.domElement);const u=s!=="light",f=u?of:Zr,h=u?165063:223649,m=u?3718648:165063,_=u?959977:165063,y=new zo;r.add(y);const v=[],S=[2.2,2.7,3.2],E=[{x:.4,y:.2,z:.1,speed:.006},{x:-.5,y:.8,z:-.3,speed:-.004},{x:.8,y:-.3,z:.5,speed:.003}];S.forEach((M,z)=>{const W=new cE(0,0,M,M,0,2*Math.PI,!1,0).getPoints(120),Q=new Ln().setFromPoints(W),le=new qf({color:z===1?m:h,transparent:!0,opacity:u?.45:.8,blending:f}),ne=new Gg(Q,le);ne.rotation.set(E[z].x,E[z].y,E[z].z),y.add(ne);const me=new Ln,Se=new Float32Array(3);Se[0]=M,Se[1]=0,Se[2]=0,me.setAttribute("position",new Zn(Se,3));const Ne=new Yf({color:u?16777215:988970,size:u?.09:.1,transparent:!0,opacity:.95,blending:f}),$e=new Xm(me,Ne);ne.add($e),v.push({line:ne,speed:E[z].speed,satellite:$e,radius:M})});const A=new cd(1.2,1),x=new uE(A),g=new qf({color:_,transparent:!0,opacity:u?.55:.85,blending:f}),P=new aE(x,g);y.add(P);const N=new ud(.7,0),C=new ad({color:m,wireframe:!0,transparent:!0,opacity:u?.35:.6,blending:f}),K=new Si(N,C);y.add(K);const k=350,O=new Float32Array(k*3),j=new Float32Array(k);for(let M=0;M<k;M++){const z=1.8+Math.random()*5.5,fe=Math.random()*Math.PI*2,W=Math.acos(2*Math.random()-1);O[M*3]=z*Math.sin(W)*Math.cos(fe),O[M*3+1]=z*Math.sin(W)*Math.sin(fe),O[M*3+2]=z*Math.cos(W),j[M]=Math.random()*.03+.015}const L=new Ln;L.setAttribute("position",new Zn(O,3));const b=new Yf({color:u?9684477:165063,size:u?.045:.075,transparent:!0,opacity:u?.65:.85,blending:f}),G=new Xm(L,b);y.add(G);let ae=0,ie=0,pe=0,ve=0;const ce=M=>{const z=n.getBoundingClientRect(),fe=(M.clientX-z.left)/z.width*2-1,W=-((M.clientY-z.top)/z.height*2-1);ae=fe,ie=W,ve=ae*.45,pe=-ie*.45};window.addEventListener("mousemove",ce);let he,V=new fE;const ue=()=>{he=requestAnimationFrame(ue);const M=V.getElapsedTime();y.rotation.y+=(ve-y.rotation.y)*.04,y.rotation.x+=(pe-y.rotation.x)*.04,v.forEach((fe,W)=>{fe.line.rotation.z+=fe.speed,fe.line.rotation.x+=fe.speed*.5;const Q=M*(1.2+W*.6),le=fe.satellite.geometry.attributes.position.array;le[0]=Math.cos(Q)*fe.radius,le[1]=Math.sin(Q)*fe.radius,fe.satellite.geometry.attributes.position.needsUpdate=!0}),P.rotation.y+=.005,P.rotation.x-=.003;const z=1+Math.sin(M*1.5)*.04;P.scale.set(z,z,z),K.rotation.y-=.008,K.rotation.z+=.006,G.rotation.y=M*.015,l.render(r,a)};ue();const D=()=>{n&&(a.aspect=n.clientWidth/n.clientHeight,a.updateProjectionMatrix(),l.setSize(n.clientWidth,n.clientHeight))};return window.addEventListener("resize",D),()=>{window.removeEventListener("mousemove",ce),window.removeEventListener("resize",D),cancelAnimationFrame(he),n&&l.domElement&&n.removeChild(l.domElement),r.clear(),l.dispose()}},[s]),F.jsxs("div",{className:"relative w-full h-full flex items-center justify-center overflow-hidden",children:[F.jsx("div",{className:"absolute inset-0 pointer-events-none",style:{background:s==="dark"?"radial-gradient(circle at 50% 50%, rgba(2, 132, 199, 0.1) 0%, rgba(6, 11, 23, 0) 70%)":"radial-gradient(circle at 50% 50%, rgba(2, 132, 199, 0.08) 0%, rgba(240, 246, 252, 0) 70%)"}}),F.jsx("div",{ref:e,className:"w-full h-full cursor-grab active:cursor-grabbing"})]})}function hE({theme:s="dark"}){return F.jsx("section",{className:"relative w-full h-[calc(100vh-80px)] overflow-hidden",children:F.jsx(dE,{theme:s})})}function pE({isOpen:s,onClose:e,user:n,onLogin:r,onLogout:a,onSetBalance:l,theme:u="light"}){var m;if(!s)return null;const f=u==="dark",h=()=>{window.location.href="/api/auth/discord"};return F.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md",children:F.jsxs("div",{className:`relative w-full max-w-sm p-6 shadow-2xl transition-all duration-200 ${f?"bg-[#0d1527] text-white":"bg-white text-slate-900"}`,children:[F.jsx("button",{onClick:e,className:`absolute top-4 right-4 p-1.5 transition-colors ${f?"bg-[#15203b] text-slate-400 hover:text-white":"bg-slate-100 text-slate-600 hover:text-slate-950"}`,children:F.jsx(Kv,{className:"w-4 h-4"})}),F.jsx("div",{className:"text-center mb-6",children:F.jsx("h3",{className:"font-orbitron font-black text-base uppercase tracking-wider",children:"Войти через Discord"})}),n?F.jsxs("div",{className:"space-y-4",children:[F.jsxs("div",{className:`p-3.5 flex items-center gap-3 shadow-inner ${f?"bg-[#15203b]":"bg-sky-50"}`,children:[F.jsx("img",{src:n.avatar,alt:n.username,className:"w-10 h-10 shadow-sm"}),F.jsxs("div",{className:"truncate flex-1",children:[F.jsx("div",{className:"font-orbitron font-black text-xs truncate",children:n.username}),F.jsxs("div",{className:"text-[10px] font-mono text-sky-500 font-bold flex items-center gap-1",children:[F.jsx("span",{children:(m=n.balance)==null?void 0:m.toLocaleString()}),F.jsx(ci,{className:"w-3.5 h-3.5"})]})]})]}),F.jsxs("button",{onClick:()=>{a(),e()},className:"w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-orbitron text-xs font-black uppercase transition-all shadow-sm flex items-center justify-center gap-2",children:[F.jsx(Wv,{className:"w-3.5 h-3.5"}),F.jsx("span",{children:"Выйти"})]})]}):F.jsx("div",{className:"space-y-4",children:F.jsxs("button",{onClick:h,className:"discord-chamfer-btn w-full py-3 px-6 bg-[#5865F2] hover:bg-[#4752C4] text-white font-orbitron font-black text-sm flex items-center justify-center gap-3 shadow-md transition-all active:scale-95",children:[F.jsx("svg",{className:"w-5 h-5 fill-current",viewBox:"0 0 127.14 96.36",children:F.jsx("path",{d:"M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"})}),F.jsx("span",{children:"Войти"})]})})]})})}function mE({theme:s}){const[e,n]=vt.useState([]),r=s==="dark";return vt.useEffect(()=>{fetch("/api/economy/leaderboard").then(a=>a.json()).then(a=>{a.success&&Array.isArray(a.leaderboard)&&n(a.leaderboard)}).catch(a=>console.warn("Failed to load leaderboard",a))},[]),F.jsxs("div",{className:`p-4 ${r?"bg-[#0a1122] text-white":"bg-white"} rounded-md shadow-lg max-w-3xl mx-auto`,children:[F.jsx("h2",{className:"text-xl font-orbitron font-black mb-4",children:"Лидерборд"}),F.jsxs("ul",{className:"space-y-2",children:[e.map(a=>{var l;return F.jsxs("li",{className:"flex items-center gap-3 p-2 bg-slate-100/30 rounded",children:[F.jsx("img",{src:a.avatar,alt:a.username,className:"w-8 h-8 rounded-full"}),F.jsx("span",{className:"flex-1 font-orbitron truncate",children:a.username}),F.jsxs("span",{className:"font-orbitron font-black",children:[(l=a.balance)==null?void 0:l.toLocaleString()," ",F.jsx("span",{className:"text-sm",children:"💰"})]})]},a.id)}),e.length===0&&F.jsx("li",{className:"text-gray-500",children:"Нет данных"})]})]})}function gE({theme:s,onClose:e}){const[n,r]=vt.useState([]),[a,l]=vt.useState(""),[u,f]=vt.useState(""),[h,m]=vt.useState(null),_=s==="dark";vt.useEffect(()=>{fetch("/api/economy/leaderboard").then(v=>v.json()).then(v=>{v.success&&Array.isArray(v.leaderboard)&&r(v.leaderboard)}).catch(v=>console.warn("Failed to load users",v))},[]);const y=async v=>{v.preventDefault();const S={senderId:null,targetId:a,amount:Number(u)};try{const A=await(await fetch("/api/economy/pay",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(S)})).json();A.success?m({type:"success",text:"Перевод выполнен"}):m({type:"error",text:A.error||"Ошибка перевода"})}catch{m({type:"error",text:"Сетевая ошибка"})}};return F.jsxs("div",{className:`p-6 ${_?"bg-[#0a1122] text-white":"bg-white"} rounded-md shadow-lg max-w-md mx-auto`,children:[F.jsx("h2",{className:"text-xl font-orbitron font-black mb-4",children:"Перевести деньги"}),F.jsxs("form",{onSubmit:y,className:"space-y-4",children:[F.jsxs("select",{className:"w-full p-2 border rounded bg-slate-50",value:a,onChange:v=>l(v.target.value),required:!0,children:[F.jsx("option",{value:"",disabled:!0,children:"Выберите получателя"}),n.map(v=>{var S;return F.jsxs("option",{value:v.id,children:[v.username," (",(S=v.balance)==null?void 0:S.toLocaleString(),")"]},v.id)})]}),F.jsx("input",{type:"number",min:"1",placeholder:"Сумма",className:"w-full p-2 border rounded bg-slate-50",value:u,onChange:v=>f(v.target.value),required:!0}),F.jsx("button",{type:"submit",className:"w-full py-2 bg-sky-600 hover:bg-sky-700 text-white font-orbitron font-black",children:"Перевести"}),h&&F.jsx("div",{className:`mt-2 text-center ${h.type==="success"?"text-emerald-400":"text-rose-400"}`,children:h.text}),F.jsx("button",{type:"button",onClick:e,className:"w-full py-2 bg-gray-500 hover:bg-gray-600 text-white font-orbitron font-black mt-2",children:"Закрыть"})]})]})}function vE(){const[s,e]=vt.useState("main"),[n,r]=vt.useState(!1),[a,l]=vt.useState(null),[u,f]=vt.useState(1e3),[h,m]=vt.useState("light");vt.useEffect(()=>{try{let g=null;const P=new URLSearchParams(window.location.search);if(P.get("auth_success")==="true"&&P.get("user"))try{g=JSON.parse(decodeURIComponent(P.get("user"))),l(g),localStorage.setItem("fazenn_discord_user",JSON.stringify(g)),window.history.replaceState({},document.title,window.location.pathname)}catch(C){console.warn("Failed to parse Discord OAuth user",C)}else{const C=localStorage.getItem("fazenn_discord_user");C&&(g=JSON.parse(C),l(g))}if(g!=null&&g.id)fetch(`/api/economy/balance?userId=${g.id}`).then(C=>C.json()).then(C=>{C.success&&typeof C.balance=="number"&&f(C.balance)}).catch(C=>console.warn("Failed to fetch initial balance:",C));else{const C=localStorage.getItem("fazenn_guest_balance");f(C?parseInt(C,10):5e3)}const N=localStorage.getItem("fazenn_theme");N?(m(N),document.body.className=N==="dark"?"dark-theme":"light-theme"):document.body.className="light-theme"}catch(g){console.warn("Storage access failed",g)}},[]);const _=()=>{const g=h==="dark"?"light":"dark";m(g),document.body.className=g==="dark"?"dark-theme":"light-theme";try{localStorage.setItem("fazenn_theme",g)}catch{}},y=g=>{f(P=>{const N=typeof g=="function"?g(P):g,C=Math.max(0,Math.round(N));if(a!=null&&a.id)fetch("/api/economy/update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:a.id,username:a.username,newBalance:C})}).catch(K=>console.warn("Failed to sync balance with server:",K));else try{localStorage.setItem("fazenn_guest_balance",C.toString())}catch{}return C})},v=(g=25e3)=>{a||y(P=>P+g)},S=g=>{l(g);try{localStorage.setItem("fazenn_discord_user",JSON.stringify(g))}catch{}fetch(`/api/economy/balance?userId=${g.id}`).then(P=>P.json()).then(P=>{P.success&&typeof P.balance=="number"?f(P.balance):f(0)}).catch(()=>f(0))},E=()=>{l(null),f(5e3);try{localStorage.removeItem("fazenn_discord_user"),localStorage.setItem("fazenn_guest_balance","5000")}catch(g){console.warn("Storage clear failed",g)}},[A,x]=vt.useState(!1);return F.jsxs("div",{className:`min-h-screen flex flex-col select-none transition-colors duration-200 ${h==="dark"?"bg-[#060b17] text-slate-100":"bg-[#f0f6fc] text-slate-900"}`,children:[F.jsx(n_,{activeTab:s,setActiveTab:e,user:a,onOpenAuthModal:()=>!A&&r(!0),userBalance:u,onAddCoins:()=>v(25e3),theme:h,onToggleTheme:_,isSpinning:A}),F.jsx("main",{className:"flex-1 flex flex-col",children:s==="main"?F.jsx(hE,{theme:h}):s==="leaderboard"?F.jsx(mE,{theme:h}):s==="pay"?F.jsx(gE,{theme:h,onClose:()=>e("main")}):F.jsx(t_,{userBalance:u,onUpdateBalance:y,discordUser:a,onOpenDiscordModal:()=>!A&&r(!0),theme:h,isSpinning:A,setIsSpinning:x})}),F.jsx(pE,{isOpen:n,onClose:()=>r(!1),user:a,onLogin:S,onLogout:E,onSetBalance:g=>y(g),theme:h})]})}Nv.createRoot(document.getElementById("root")).render(F.jsx(Tv.StrictMode,{children:F.jsx(vE,{})}));
