(function dartProgram(){function copyProperties(a,b){var u=Object.keys(a)
for(var t=0;t<u.length;t++){var s=u[t]
b[s]=a[s]}}function mixinPropertiesHard(a,b){var u=Object.keys(a)
for(var t=0;t<u.length;t++){var s=u[t]
if(!b.hasOwnProperty(s))b[s]=a[s]}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var u=function(){}
u.prototype={p:{}}
var t=new u()
if(!(Object.getPrototypeOf(t)&&Object.getPrototypeOf(t).p===u.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var s=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(s))return true}}catch(r){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var u=Object.create(b.prototype)
copyProperties(a.prototype,u)
a.prototype=u}}function inheritMany(a,b){for(var u=0;u<b.length;u++)inherit(b[u],a)}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazyOld(a,b,c,d){var u=a
a[b]=u
a[c]=function(){a[c]=function(){A.y(b)}
var t
var s=d
try{if(a[b]===u){t=a[b]=s
t=a[b]=d()}else t=a[b]}finally{if(t===s)a[b]=null
a[c]=function(){return this[b]}}return t}}function lazy(a,b,c,d){var u=a
a[b]=u
a[c]=function(){if(a[b]===u)a[b]=d()
a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var u=a
a[b]=u
a[c]=function(){if(a[b]===u){var t=d()
if(a[b]!==u)A.z(b)
a[b]=t}var s=a[b]
a[c]=function(){return s}
return s}}function makeConstList(a){a.immutable$list=Array
a.fixed$length=Array
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var u=0;u<a.length;++u)convertToFastObject(a[u])}var y=0
function instanceTearOffGetter(a,b){var u=null
return a?function(c){if(u===null)u=A.m(b)
return new u(c,this)}:function(){if(u===null)u=A.m(b)
return new u(this,null)}}function staticTearOffGetter(a){var u=null
return function(){if(u===null)u=A.m(a).prototype
return u}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number")h+=x
return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var u=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var t=staticTearOffGetter(u)
a[b]=t}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var u=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var t=instanceTearOffGetter(c,u)
a[b]=t}function setOrUpdateInterceptorsByTag(a){var u=v.interceptorsByTag
if(!u){v.interceptorsByTag=a
return}copyProperties(a,u)}function setOrUpdateLeafTags(a){var u=v.leafTags
if(!u){v.leafTags=a
return}copyProperties(a,u)}function updateTypes(a){var u=v.types
var t=u.length
u.push.apply(u,a)
return t}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var u=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},t=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:u(0,0,null,["$0"],0),_instance_1u:u(0,1,null,["$1"],0),_instance_2u:u(0,2,null,["$2"],0),_instance_0i:u(1,0,null,["$0"],0),_instance_1i:u(1,1,null,["$1"],0),_instance_2i:u(1,2,null,["$2"],0),_static_0:t(0,null,["$0"],0),_static_1:t(1,null,["$1"],0),_static_2:t(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,lazyOld:lazyOld,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={f:function f(){},a:function a(){},b:function b(){}},A={c:function c(){},j:function j(){},e:function e(){},d:function d(){},h:function h(){},i:function i(){},k:function k(){},
n(a,b){return A.l(a.tR,b)},
t(a,b){return A.l(a.eT,b)},
l(a,b){var u,t,s=Object.keys(b),r=s.length
for(u=0;u<r;++u){t=s[u]
a[t]=b[t]}},
o(){var u,t
dartpad.setupEditorWorker()
u={automaticLayout:!0,language:"dart",scrollBeyondLastLine:!1,tabSize:2,value:"import 'dart:math' show Random;\n\nFuture<void> main() async {\n  print('Compute \u03c0 using the Monte Carlo method.');\n\n  await for (var estimate in computePi().take(100)) {\n    print('\u03c0 \u2245 $estimate');\n  }\n}\n\n/// Generates a stream of increasingly accurate estimates of \u03c0.\nStream<double> computePi({int batch = 100000}) async* {\n  var total = 0; // Inferred to be of type int\n  var count = 0;\n\n  while (true) {\n    var points = generateRandom().take(batch);\n    var inside = points.where((point) => point.isInsideUnitCircle);\n\n    total += batch;\n    count += inside.length;\n\n    var ratio = count / total;\n\n    // Area of a circle is A = \u03c0\u22c5r\xb2, therefore \u03c0 = A/r\xb2.\n    // So, when given random points with x \u2208 <0,1>,\n    // y \u2208 <0,1>, the ratio of those inside a unit circle\n    // should approach \u03c0 / 4. Therefore, the value of \u03c0\n    // should be:\n    yield ratio * 4;\n  }\n}\n\nIterable<Point> generateRandom([int? seed]) sync* {\n  var random = Random(seed);\n\n  while (true) {\n    yield (x: random.nextDouble(), y: random.nextDouble());\n  }\n}\n\ntypedef Point = ({double x, double y});\n\nextension on Point {\n  bool get isInsideUnitCircle {\n    return x * x + y * y <= 1;\n  }\n}\n"}
t=document.querySelector("#editor")
t.toString
dartpad.createEditor(t,u)}}
var w=[J,A]
var $={}
J.f.prototype={}
J.a.prototype={}
J.b.prototype={}
A.c.prototype={$ic:1,
toString(){return this.h(this)}}
A.j.prototype={}
A.e.prototype={}
A.d.prototype={}
A.h.prototype={}
A.i.prototype={}
A.k.prototype={};(function inheritance(){var u=hunkHelpers.inherit,t=hunkHelpers.inheritMany
u(A.c,null)
u(J.f,A.c)
u(J.a,J.f)
u(J.b,J.a)
t(J.b,[A.j,A.e,A.d,A.h,A.i,A.k])})()
var v={typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{w:"int",v:"double",x:"num",r:"String",u:"bool",q:"Null",p:"List"},mangledNames:{},types:[],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.n(v.typeUniverse,JSON.parse('{"j":"b","e":"b","d":"b","h":"b","i":"b","k":"b"}'));(function nativeSupport(){!function(){var u=function(a){var o={}
o[a]=1
return Object.keys(hunkHelpers.convertToFastObject(o))[0]}
v.getIsolateTag=function(a){return u("___dart_"+a+v.isolateTag)}
var t="___dart_isolate_tags_"
var s=Object[t]||(Object[t]=Object.create(null))
var r="_ZxYxX"
for(var q=0;;q++){var p=u(r+"_"+q+"_")
if(!(p in s)){s[p]=1
v.isolateTag=p
break}}}()
hunkHelpers.setOrUpdateInterceptorsByTag({HTMLElement:J.a,HTMLAnchorElement:J.a,ApplicationCacheErrorEvent:J.a,HTMLAreaElement:J.a,HTMLAudioElement:J.a,HTMLBRElement:J.a,HTMLBaseElement:J.a,HTMLBodyElement:J.a,HTMLButtonElement:J.a,HTMLCanvasElement:J.a,HTMLContentElement:J.a,HTMLDListElement:J.a,HTMLDataElement:J.a,HTMLDataListElement:J.a,HTMLDetailsElement:J.a,HTMLDialogElement:J.a,HTMLDivElement:J.a,Document:J.a,DOMError:J.a,DOMException:J.a,Element:J.a,HTMLEmbedElement:J.a,ErrorEvent:J.a,Event:J.a,InputEvent:J.a,SubmitEvent:J.a,EventTarget:J.a,HTMLFieldSetElement:J.a,HTMLFormElement:J.a,HTMLHRElement:J.a,HTMLHeadElement:J.a,HTMLHeadingElement:J.a,HTMLDocument:J.a,HTMLHtmlElement:J.a,HTMLIFrameElement:J.a,HTMLImageElement:J.a,HTMLInputElement:J.a,HTMLLIElement:J.a,HTMLLabelElement:J.a,HTMLLegendElement:J.a,HTMLLinkElement:J.a,HTMLMapElement:J.a,MathMLElement:J.a,HTMLMediaElement:J.a,MediaError:J.a,HTMLMenuElement:J.a,HTMLMetaElement:J.a,HTMLMeterElement:J.a,HTMLModElement:J.a,NavigatorUserMediaError:J.a,Node:J.a,HTMLOListElement:J.a,HTMLObjectElement:J.a,HTMLOptGroupElement:J.a,HTMLOptionElement:J.a,HTMLOutputElement:J.a,OverconstrainedError:J.a,HTMLParagraphElement:J.a,HTMLParamElement:J.a,HTMLPictureElement:J.a,PositionError:J.a,GeolocationPositionError:J.a,HTMLPreElement:J.a,HTMLProgressElement:J.a,HTMLQuoteElement:J.a,HTMLScriptElement:J.a,HTMLSelectElement:J.a,SensorErrorEvent:J.a,HTMLShadowElement:J.a,HTMLSlotElement:J.a,HTMLSourceElement:J.a,HTMLSpanElement:J.a,SpeechRecognitionError:J.a,HTMLStyleElement:J.a,HTMLTableCaptionElement:J.a,HTMLTableCellElement:J.a,HTMLTableDataCellElement:J.a,HTMLTableHeaderCellElement:J.a,HTMLTableColElement:J.a,HTMLTableElement:J.a,HTMLTableRowElement:J.a,HTMLTableSectionElement:J.a,HTMLTemplateElement:J.a,HTMLTextAreaElement:J.a,HTMLTimeElement:J.a,HTMLTitleElement:J.a,HTMLTrackElement:J.a,HTMLUListElement:J.a,HTMLUnknownElement:J.a,HTMLVideoElement:J.a,HTMLDirectoryElement:J.a,HTMLFontElement:J.a,HTMLFrameElement:J.a,HTMLFrameSetElement:J.a,HTMLMarqueeElement:J.a,SVGAElement:J.a,SVGAnimateElement:J.a,SVGAnimateMotionElement:J.a,SVGAnimateTransformElement:J.a,SVGAnimationElement:J.a,SVGCircleElement:J.a,SVGClipPathElement:J.a,SVGDefsElement:J.a,SVGDescElement:J.a,SVGDiscardElement:J.a,SVGEllipseElement:J.a,SVGFEBlendElement:J.a,SVGFEColorMatrixElement:J.a,SVGFEComponentTransferElement:J.a,SVGFECompositeElement:J.a,SVGFEConvolveMatrixElement:J.a,SVGFEDiffuseLightingElement:J.a,SVGFEDisplacementMapElement:J.a,SVGFEDistantLightElement:J.a,SVGFEFloodElement:J.a,SVGFEFuncAElement:J.a,SVGFEFuncBElement:J.a,SVGFEFuncGElement:J.a,SVGFEFuncRElement:J.a,SVGFEGaussianBlurElement:J.a,SVGFEImageElement:J.a,SVGFEMergeElement:J.a,SVGFEMergeNodeElement:J.a,SVGFEMorphologyElement:J.a,SVGFEOffsetElement:J.a,SVGFEPointLightElement:J.a,SVGFESpecularLightingElement:J.a,SVGFESpotLightElement:J.a,SVGFETileElement:J.a,SVGFETurbulenceElement:J.a,SVGFilterElement:J.a,SVGForeignObjectElement:J.a,SVGGElement:J.a,SVGGeometryElement:J.a,SVGGraphicsElement:J.a,SVGImageElement:J.a,SVGLineElement:J.a,SVGLinearGradientElement:J.a,SVGMarkerElement:J.a,SVGMaskElement:J.a,SVGMetadataElement:J.a,SVGPathElement:J.a,SVGPatternElement:J.a,SVGPolygonElement:J.a,SVGPolylineElement:J.a,SVGRadialGradientElement:J.a,SVGRectElement:J.a,SVGScriptElement:J.a,SVGSetElement:J.a,SVGStopElement:J.a,SVGStyleElement:J.a,SVGElement:J.a,SVGSVGElement:J.a,SVGSwitchElement:J.a,SVGSymbolElement:J.a,SVGTSpanElement:J.a,SVGTextContentElement:J.a,SVGTextElement:J.a,SVGTextPathElement:J.a,SVGTextPositioningElement:J.a,SVGTitleElement:J.a,SVGUseElement:J.a,SVGViewElement:J.a,SVGGradientElement:J.a,SVGComponentTransferFunctionElement:J.a,SVGFEDropShadowElement:J.a,SVGMPathElement:J.a})
hunkHelpers.setOrUpdateLeafTags({HTMLElement:true,HTMLAnchorElement:true,ApplicationCacheErrorEvent:true,HTMLAreaElement:true,HTMLAudioElement:true,HTMLBRElement:true,HTMLBaseElement:true,HTMLBodyElement:true,HTMLButtonElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLDivElement:true,Document:true,DOMError:true,DOMException:true,Element:true,HTMLEmbedElement:true,ErrorEvent:true,Event:true,InputEvent:true,SubmitEvent:true,EventTarget:true,HTMLFieldSetElement:true,HTMLFormElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHeadingElement:true,HTMLDocument:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLImageElement:true,HTMLInputElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,MathMLElement:true,HTMLMediaElement:true,MediaError:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,NavigatorUserMediaError:true,Node:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOptionElement:true,HTMLOutputElement:true,OverconstrainedError:true,HTMLParagraphElement:true,HTMLParamElement:true,HTMLPictureElement:true,PositionError:true,GeolocationPositionError:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLSelectElement:true,SensorErrorEvent:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLSpanElement:true,SpeechRecognitionError:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGScriptElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true})})()
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var u=document.scripts
function onLoad(b){for(var s=0;s<u.length;++s)u[s].removeEventListener("load",onLoad,false)
a(b.target)}for(var t=0;t<u.length;++t)u[t].addEventListener("load",onLoad,false)})(function(a){v.currentScript=a
var u=A.o
if(typeof dartMainRunner==="function")dartMainRunner(u,[])
else u([])})})()
//# sourceMappingURL=main.dart.js.map
