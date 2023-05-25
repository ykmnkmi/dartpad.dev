(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q))b[q]=a[q]}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(Object.getPrototypeOf(r)&&Object.getPrototypeOf(r).p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++)inherit(b[s],a)}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazyOld(a,b,c,d){var s=a
a[b]=s
a[c]=function(){a[c]=function(){A.ef(b)}
var r
var q=d
try{if(a[b]===s){r=a[b]=q
r=a[b]=d()}else r=a[b]}finally{if(r===q)a[b]=null
a[c]=function(){return this[b]}}return r}}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s)a[b]=d()
a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s)A.eg(b)
a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a){a.immutable$list=Array
a.fixed$length=Array
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s)convertToFastObject(a[s])}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.bJ(b)
return new s(c,this)}:function(){if(s===null)s=A.bJ(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.bJ(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number")h+=x
return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,lazyOld:lazyOld,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var A={by:function by(){},
bn(a,b,c){return a},
e2(a){var s,r
for(s=$.bw.length,r=0;r<s;++r)if(a===$.bw[r])return!0
return!1},
ai:function ai(a){this.a=a},
cp(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
p(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.a7(a)
return s},
aO(a){return A.cM(a)},
cM(a){var s,r,q,p
if(a instanceof A.f)return A.l(A.ay(a),null)
s=J.a5(a)
if(s===B.n||s===B.r||t.o.b(a)){r=B.c(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.l(A.ay(a),null)},
cN(a){if(typeof a=="number"||A.bG(a))return J.a7(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.z)return a.h(0)
return"Instance of '"+A.aO(a)+"'"},
c(a){var s,r
if(a==null)a=new A.r()
s=new Error()
s.dartException=a
r=A.eh
if("defineProperty" in Object){Object.defineProperty(s,"message",{get:r})
s.name=""}else s.toString=r
return s},
eh(){return J.a7(this.dartException)},
bM(a){throw A.c(a)},
ee(a){throw A.c(new A.ad(a))},
t(a){var s,r,q,p,o,n
a=A.ec(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=[]
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.aU(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
aV(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
bY(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
bz(a,b){var s=b==null,r=s?null:b.method
return new A.ah(a,r,s?null:b.receiver)},
N(a){if(a==null)return new A.aN(a)
if(typeof a!=="object")return a
if("dartException" in a)return A.B(a,a.dartException)
return A.dK(a)},
B(a,b){if(t.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
dK(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=null
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.o.V(r,16)&8191)===10)switch(q){case 438:return A.B(a,A.bz(A.p(s)+" (Error "+q+")",e))
case 445:case 5007:p=A.p(s)
return A.B(a,new A.S(p+" (Error "+q+")",e))}}if(a instanceof TypeError){o=$.cr()
n=$.cs()
m=$.ct()
l=$.cu()
k=$.cx()
j=$.cy()
i=$.cw()
$.cv()
h=$.cA()
g=$.cz()
f=o.i(s)
if(f!=null)return A.B(a,A.bz(s,f))
else{f=n.i(s)
if(f!=null){f.method="call"
return A.B(a,A.bz(s,f))}else{f=m.i(s)
if(f==null){f=l.i(s)
if(f==null){f=k.i(s)
if(f==null){f=j.i(s)
if(f==null){f=i.i(s)
if(f==null){f=l.i(s)
if(f==null){f=h.i(s)
if(f==null){f=g.i(s)
p=f!=null}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0
if(p)return A.B(a,new A.S(s,f==null?e:f.method))}}return A.B(a,new A.an(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.T()
s=function(b){try{return String(b)}catch(d){}return null}(a)
return A.B(a,new A.C(!1,e,e,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.T()
return a},
M(a){var s
if(a==null)return new A.X(a)
s=a.$cachedTrace
if(s!=null)return s
return a.$cachedTrace=new A.X(a)},
e1(a,b,c,d,e,f){switch(b){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.c(new A.b_("Unsupported number of arguments for wrapped closure"))},
a4(a,b){var s=a.$identity
if(!!s)return s
s=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.e1)
a.$identity=s
return s},
cI(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.aQ().constructor.prototype):Object.create(new A.ac(null,null).constructor.prototype)
s.$initialize=s.constructor
if(h)r=function static_tear_off(){this.$initialize()}
else r=function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.bU(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.cE(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.bU(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
cE(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.c("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.cC)}throw A.c("Error in functionType of tearoff")},
cF(a,b,c,d){var s=A.bT
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
bU(a,b,c,d){var s,r
if(c)return A.cH(a,b,d)
s=b.length
r=A.cF(s,d,a,b)
return r},
cG(a,b,c,d){var s=A.bT,r=A.cD
switch(b?-1:a){case 0:throw A.c(new A.ak("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
cH(a,b,c){var s,r
if($.bR==null)$.bR=A.bQ("interceptor")
if($.bS==null)$.bS=A.bQ("receiver")
s=b.length
r=A.cG(s,c,a,b)
return r},
bJ(a){return A.cI(a)},
cC(a,b){return A.bj(v.typeUniverse,A.ay(a.a),b)},
bT(a){return a.a},
cD(a){return a.b},
bQ(a){var s,r,q,p=new A.ac("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.fixed$length=Array
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.c(A.bx("Field name "+a+" not found.",null))},
ef(a){throw A.c(new A.ar(a))},
dT(a){return v.getIsolateTag(a)},
e5(a){var s,r,q,p,o,n=$.cm.$1(a),m=$.bo[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.bs[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=$.cj.$2(a,n)
if(q!=null){m=$.bo[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.bs[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.bt(s)
$.bo[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.bs[n]=s
return s}if(p==="-"){o=A.bt(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.cn(a,s)
if(p==="*")throw A.c(A.bZ(n))
if(v.leafTags[n]===true){o=A.bt(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.cn(a,s)},
cn(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.bL(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
bt(a){return J.bL(a,!1,null,!!a.$iek)},
e7(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.bt(s)
else return J.bL(s,c,null,null)},
dY(){if(!0===$.bK)return
$.bK=!0
A.dZ()},
dZ(){var s,r,q,p,o,n,m,l
$.bo=Object.create(null)
$.bs=Object.create(null)
A.dX()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.co.$1(o)
if(n!=null){m=A.e7(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
dX(){var s,r,q,p,o,n,m=B.f()
m=A.K(B.h,A.K(B.i,A.K(B.d,A.K(B.d,A.K(B.j,A.K(B.k,A.K(B.l(B.c),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(s.constructor==Array)for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.cm=new A.bp(p)
$.cj=new A.bq(o)
$.co=new A.br(n)},
K(a,b){return a(b)||b},
dQ(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
ec(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
aU:function aU(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
S:function S(a,b){this.a=a
this.b=b},
ah:function ah(a,b,c){this.a=a
this.b=b
this.c=c},
an:function an(a){this.a=a},
aN:function aN(a){this.a=a},
X:function X(a){this.a=a
this.b=null},
z:function z(){},
aC:function aC(){},
aD:function aD(){},
aS:function aS(){},
aQ:function aQ(){},
ac:function ac(a,b){this.a=a
this.b=b},
ar:function ar(a){this.a=a},
ak:function ak(a){this.a=a},
bp:function bp(a){this.a=a},
bq:function bq(a){this.a=a},
br:function br(a){this.a=a},
bV(a,b){var s=b.c
return s==null?b.c=A.bE(a,b.y,!0):s},
bA(a,b){var s=b.c
return s==null?b.c=A.a_(a,"D",[b.y]):s},
bW(a){var s=a.x
if(s===6||s===7||s===8)return A.bW(a.y)
return s===12||s===13},
cO(a){return a.at},
dS(a){return A.bi(v.typeUniverse,a,!1)},
y(a,b,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.x
switch(c){case 5:case 1:case 2:case 3:case 4:return b
case 6:s=b.y
r=A.y(a,s,a0,a1)
if(r===s)return b
return A.c7(a,r,!0)
case 7:s=b.y
r=A.y(a,s,a0,a1)
if(r===s)return b
return A.bE(a,r,!0)
case 8:s=b.y
r=A.y(a,s,a0,a1)
if(r===s)return b
return A.c6(a,r,!0)
case 9:q=b.z
p=A.a3(a,q,a0,a1)
if(p===q)return b
return A.a_(a,b.y,p)
case 10:o=b.y
n=A.y(a,o,a0,a1)
m=b.z
l=A.a3(a,m,a0,a1)
if(n===o&&l===m)return b
return A.bC(a,n,l)
case 12:k=b.y
j=A.y(a,k,a0,a1)
i=b.z
h=A.dH(a,i,a0,a1)
if(j===k&&h===i)return b
return A.c5(a,j,h)
case 13:g=b.z
a1+=g.length
f=A.a3(a,g,a0,a1)
o=b.y
n=A.y(a,o,a0,a1)
if(f===g&&n===o)return b
return A.bD(a,n,f,!0)
case 14:e=b.y
if(e<a1)return b
d=a0[e-a1]
if(d==null)return b
return d
default:throw A.c(A.aa("Attempted to substitute unexpected RTI kind "+c))}},
a3(a,b,c,d){var s,r,q,p,o=b.length,n=A.bk(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.y(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
dI(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.bk(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.y(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
dH(a,b,c,d){var s,r=b.a,q=A.a3(a,r,c,d),p=b.b,o=A.a3(a,p,c,d),n=b.c,m=A.dI(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.at()
s.a=q
s.b=o
s.c=m
return s},
eM(a,b){a[v.arrayRti]=b
return a},
cl(a){var s,r=a.$S
if(r!=null){if(typeof r=="number")return A.dW(r)
s=a.$S()
return s}return null},
e_(a,b){var s
if(A.bW(b))if(a instanceof A.z){s=A.cl(a)
if(s!=null)return s}return A.ay(a)},
ay(a){if(a instanceof A.f)return A.aw(a)
if(Array.isArray(a))return A.ca(a)
return A.bF(J.a5(a))},
ca(a){var s=a[v.arrayRti],r=t.b
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
aw(a){var s=a.$ti
return s!=null?s:A.bF(a)},
bF(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.dn(a,s)},
dn(a,b){var s=a instanceof A.z?a.__proto__.__proto__.constructor:b,r=A.dc(v.typeUniverse,s.name)
b.$ccache=r
return r},
dW(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.bi(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
dV(a){return A.L(A.aw(a))},
dG(a){var s=a instanceof A.z?A.cl(a):null
if(s!=null)return s
if(t.R.b(a))return J.cB(a).a
if(Array.isArray(a))return A.ca(a)
return A.ay(a)},
L(a){var s=a.w
return s==null?a.w=A.cb(a):s},
cb(a){var s,r,q=a.at,p=q.replace(/\*/g,"")
if(p===q)return a.w=new A.bh(a)
s=A.bi(v.typeUniverse,p,!0)
r=s.w
return r==null?s.w=A.cb(s):r},
dm(a){var s,r,q,p,o,n=this
if(n===t.K)return A.v(n,a,A.du)
if(!A.w(n))if(!(n===t._))s=!1
else s=!0
else s=!0
if(s)return A.v(n,a,A.dy)
s=n.x
if(s===7)return A.v(n,a,A.dk)
if(s===1)return A.v(n,a,A.cf)
r=s===6?n.y:n
s=r.x
if(s===8)return A.v(n,a,A.dp)
if(r===t.S)q=A.dq
else if(r===t.i||r===t.H)q=A.dt
else if(r===t.N)q=A.dw
else q=r===t.y?A.bG:null
if(q!=null)return A.v(n,a,q)
if(s===9){p=r.y
if(r.z.every(A.e3)){n.r="$i"+p
if(p==="cL")return A.v(n,a,A.ds)
return A.v(n,a,A.dx)}}else if(s===11){o=A.dQ(r.y,r.z)
return A.v(n,a,o==null?A.cf:o)}return A.v(n,a,A.di)},
v(a,b,c){a.b=c
return a.b(b)},
dl(a){var s,r=this,q=A.dh
if(!A.w(r))if(!(r===t._))s=!1
else s=!0
else s=!0
if(s)q=A.df
else if(r===t.K)q=A.de
else{s=A.a6(r)
if(s)q=A.dj}r.a=q
return r.a(a)},
ax(a){var s,r=a.x
if(!A.w(a))if(!(a===t._))if(!(a===t.A))if(r!==7)if(!(r===6&&A.ax(a.y)))s=r===8&&A.ax(a.y)||a===t.P||a===t.T
else s=!0
else s=!0
else s=!0
else s=!0
else s=!0
return s},
di(a){var s=this
if(a==null)return A.ax(s)
return A.e(v.typeUniverse,A.e_(a,s),null,s,null)},
dk(a){if(a==null)return!0
return this.y.b(a)},
dx(a){var s,r=this
if(a==null)return A.ax(r)
s=r.r
if(a instanceof A.f)return!!a[s]
return!!J.a5(a)[s]},
ds(a){var s,r=this
if(a==null)return A.ax(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.r
if(a instanceof A.f)return!!a[s]
return!!J.a5(a)[s]},
dh(a){var s,r=this
if(a==null){s=A.a6(r)
if(s)return a}else if(r.b(a))return a
A.cc(a,r)},
dj(a){var s=this
if(a==null)return a
else if(s.b(a))return a
A.cc(a,s)},
cc(a,b){throw A.c(A.d1(A.c_(a,A.l(b,null))))},
c_(a,b){return A.aH(a)+": type '"+A.l(A.dG(a),null)+"' is not a subtype of type '"+b+"'"},
d1(a){return new A.Y("TypeError: "+a)},
k(a,b){return new A.Y("TypeError: "+A.c_(a,b))},
dp(a){var s=this
return s.y.b(a)||A.bA(v.typeUniverse,s).b(a)},
du(a){return a!=null},
de(a){if(a!=null)return a
throw A.c(A.k(a,"Object"))},
dy(a){return!0},
df(a){return a},
cf(a){return!1},
bG(a){return!0===a||!1===a},
ex(a){if(!0===a)return!0
if(!1===a)return!1
throw A.c(A.k(a,"bool"))},
ez(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.c(A.k(a,"bool"))},
ey(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.c(A.k(a,"bool?"))},
eA(a){if(typeof a=="number")return a
throw A.c(A.k(a,"double"))},
eC(a){if(typeof a=="number")return a
if(a==null)return a
throw A.c(A.k(a,"double"))},
eB(a){if(typeof a=="number")return a
if(a==null)return a
throw A.c(A.k(a,"double?"))},
dq(a){return typeof a=="number"&&Math.floor(a)===a},
eD(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.c(A.k(a,"int"))},
eF(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.c(A.k(a,"int"))},
eE(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.c(A.k(a,"int?"))},
dt(a){return typeof a=="number"},
eG(a){if(typeof a=="number")return a
throw A.c(A.k(a,"num"))},
eI(a){if(typeof a=="number")return a
if(a==null)return a
throw A.c(A.k(a,"num"))},
eH(a){if(typeof a=="number")return a
if(a==null)return a
throw A.c(A.k(a,"num?"))},
dw(a){return typeof a=="string"},
eJ(a){if(typeof a=="string")return a
throw A.c(A.k(a,"String"))},
eL(a){if(typeof a=="string")return a
if(a==null)return a
throw A.c(A.k(a,"String"))},
eK(a){if(typeof a=="string")return a
if(a==null)return a
throw A.c(A.k(a,"String?"))},
ch(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.l(a[q],b)
return s},
dA(a,b){var s,r,q,p,o,n,m=a.y,l=a.z
if(""===m)return"("+A.ch(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.l(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
cd(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=", "
if(a5!=null){s=a5.length
if(a4==null){a4=[]
r=null}else r=a4.length
q=a4.length
for(p=s;p>0;--p)a4.push("T"+(q+p))
for(o=t.X,n=t._,m="<",l="",p=0;p<s;++p,l=a2){m=B.p.G(m+l,a4[a4.length-1-p])
k=a5[p]
j=k.x
if(!(j===2||j===3||j===4||j===5||k===o))if(!(k===n))i=!1
else i=!0
else i=!0
if(!i)m+=" extends "+A.l(k,a4)}m+=">"}else{m=""
r=null}o=a3.y
h=a3.z
g=h.a
f=g.length
e=h.b
d=e.length
c=h.c
b=c.length
a=A.l(o,a4)
for(a0="",a1="",p=0;p<f;++p,a1=a2)a0+=a1+A.l(g[p],a4)
if(d>0){a0+=a1+"["
for(a1="",p=0;p<d;++p,a1=a2)a0+=a1+A.l(e[p],a4)
a0+="]"}if(b>0){a0+=a1+"{"
for(a1="",p=0;p<b;p+=3,a1=a2){a0+=a1
if(c[p+1])a0+="required "
a0+=A.l(c[p+2],a4)+" "+c[p]}a0+="}"}if(r!=null){a4.toString
a4.length=r}return m+"("+a0+") => "+a},
l(a,b){var s,r,q,p,o,n,m=a.x
if(m===5)return"erased"
if(m===2)return"dynamic"
if(m===3)return"void"
if(m===1)return"Never"
if(m===4)return"any"
if(m===6){s=A.l(a.y,b)
return s}if(m===7){r=a.y
s=A.l(r,b)
q=r.x
return(q===12||q===13?"("+s+")":s)+"?"}if(m===8)return"FutureOr<"+A.l(a.y,b)+">"
if(m===9){p=A.dJ(a.y)
o=a.z
return o.length>0?p+("<"+A.ch(o,b)+">"):p}if(m===11)return A.dA(a,b)
if(m===12)return A.cd(a,b,null)
if(m===13)return A.cd(a.y,b,a.z)
if(m===14){n=a.y
return b[b.length-1-n]}return"?"},
dJ(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
dd(a,b){var s=a.tR[b]
for(;typeof s=="string";)s=a.tR[s]
return s},
dc(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.bi(a,b,!1)
else if(typeof m=="number"){s=m
r=A.a0(a,5,"#")
q=A.bk(s)
for(p=0;p<s;++p)q[p]=r
o=A.a_(a,b,q)
n[b]=o
return o}else return m},
da(a,b){return A.c8(a.tR,b)},
d9(a,b){return A.c8(a.eT,b)},
bi(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.c3(A.c1(a,null,b,c))
r.set(b,s)
return s},
bj(a,b,c){var s,r,q=b.Q
if(q==null)q=b.Q=new Map()
s=q.get(c)
if(s!=null)return s
r=A.c3(A.c1(a,b,c,!0))
q.set(c,r)
return r},
db(a,b,c){var s,r,q,p=b.as
if(p==null)p=b.as=new Map()
s=c.at
r=p.get(s)
if(r!=null)return r
q=A.bC(a,b,c.x===10?c.z:[c])
p.set(s,q)
return q},
u(a,b){b.a=A.dl
b.b=A.dm
return b},
a0(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.n(null,null)
s.x=b
s.at=c
r=A.u(a,s)
a.eC.set(c,r)
return r},
c7(a,b,c){var s,r=b.at+"*",q=a.eC.get(r)
if(q!=null)return q
s=A.d6(a,b,r,c)
a.eC.set(r,s)
return s},
d6(a,b,c,d){var s,r,q
if(d){s=b.x
if(!A.w(b))r=b===t.P||b===t.T||s===7||s===6
else r=!0
if(r)return b}q=new A.n(null,null)
q.x=6
q.y=b
q.at=c
return A.u(a,q)},
bE(a,b,c){var s,r=b.at+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.d5(a,b,r,c)
a.eC.set(r,s)
return s},
d5(a,b,c,d){var s,r,q,p
if(d){s=b.x
if(!A.w(b))if(!(b===t.P||b===t.T))if(s!==7)r=s===8&&A.a6(b.y)
else r=!0
else r=!0
else r=!0
if(r)return b
else if(s===1||b===t.A)return t.P
else if(s===6){q=b.y
if(q.x===8&&A.a6(q.y))return q
else return A.bV(a,b)}}p=new A.n(null,null)
p.x=7
p.y=b
p.at=c
return A.u(a,p)},
c6(a,b,c){var s,r=b.at+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.d3(a,b,r,c)
a.eC.set(r,s)
return s},
d3(a,b,c,d){var s,r,q
if(d){s=b.x
if(!A.w(b))if(!(b===t._))r=!1
else r=!0
else r=!0
if(r||b===t.K)return b
else if(s===1)return A.a_(a,"D",[b])
else if(b===t.P||b===t.T)return t.O}q=new A.n(null,null)
q.x=8
q.y=b
q.at=c
return A.u(a,q)},
d7(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.n(null,null)
s.x=14
s.y=b
s.at=q
r=A.u(a,s)
a.eC.set(q,r)
return r},
Z(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].at
return s},
d2(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].at}return s},
a_(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.Z(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.n(null,null)
r.x=9
r.y=b
r.z=c
if(c.length>0)r.c=c[0]
r.at=p
q=A.u(a,r)
a.eC.set(p,q)
return q},
bC(a,b,c){var s,r,q,p,o,n
if(b.x===10){s=b.y
r=b.z.concat(c)}else{r=c
s=b}q=s.at+(";<"+A.Z(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.n(null,null)
o.x=10
o.y=s
o.z=r
o.at=q
n=A.u(a,o)
a.eC.set(q,n)
return n},
d8(a,b,c){var s,r,q="+"+(b+"("+A.Z(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.n(null,null)
s.x=11
s.y=b
s.z=c
s.at=q
r=A.u(a,s)
a.eC.set(q,r)
return r},
c5(a,b,c){var s,r,q,p,o,n=b.at,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.Z(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.Z(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.d2(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.n(null,null)
p.x=12
p.y=b
p.z=c
p.at=r
o=A.u(a,p)
a.eC.set(r,o)
return o},
bD(a,b,c,d){var s,r=b.at+("<"+A.Z(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.d4(a,b,c,r,d)
a.eC.set(r,s)
return s},
d4(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.bk(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.x===1){r[p]=o;++q}}if(q>0){n=A.y(a,b,r,0)
m=A.a3(a,c,r,0)
return A.bD(a,n,m,c!==m)}}l=new A.n(null,null)
l.x=13
l.y=b
l.z=c
l.at=d
return A.u(a,l)},
c1(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
c3(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.cW(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.c2(a,r,l,k,!1)
else if(q===46)r=A.c2(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.x(a.u,a.e,k.pop()))
break
case 94:k.push(A.d7(a.u,k.pop()))
break
case 35:k.push(A.a0(a.u,5,"#"))
break
case 64:k.push(A.a0(a.u,2,"@"))
break
case 126:k.push(A.a0(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.cY(a,k)
break
case 38:A.cX(a,k)
break
case 42:p=a.u
k.push(A.c7(p,A.x(p,a.e,k.pop()),a.n))
break
case 63:p=a.u
k.push(A.bE(p,A.x(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.c6(p,A.x(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.cV(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.c4(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.d_(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-2)
break
case 43:n=l.indexOf("(",r)
k.push(l.substring(r,n))
k.push(-4)
k.push(a.p)
a.p=k.length
r=n+1
break
default:throw"Bad character "+q}}}m=k.pop()
return A.x(a.u,a.e,m)},
cW(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
c2(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.x===10)o=o.y
n=A.dd(s,o.y)[p]
if(n==null)A.bM('No "'+p+'" in "'+A.cO(o)+'"')
d.push(A.bj(s,o,n))}else d.push(p)
return m},
cY(a,b){var s,r=a.u,q=A.c0(a,b),p=b.pop()
if(typeof p=="string")b.push(A.a_(r,p,q))
else{s=A.x(r,a.e,p)
switch(s.x){case 12:b.push(A.bD(r,s,q,a.n))
break
default:b.push(A.bC(r,s,q))
break}}},
cV(a,b){var s,r,q,p,o,n=null,m=a.u,l=b.pop()
if(typeof l=="number")switch(l){case-1:s=b.pop()
r=n
break
case-2:r=b.pop()
s=n
break
default:b.push(l)
r=n
s=r
break}else{b.push(l)
r=n
s=r}q=A.c0(a,b)
l=b.pop()
switch(l){case-3:l=b.pop()
if(s==null)s=m.sEA
if(r==null)r=m.sEA
p=A.x(m,a.e,l)
o=new A.at()
o.a=q
o.b=s
o.c=r
b.push(A.c5(m,p,o))
return
case-4:b.push(A.d8(m,b.pop(),q))
return
default:throw A.c(A.aa("Unexpected state under `()`: "+A.p(l)))}},
cX(a,b){var s=b.pop()
if(0===s){b.push(A.a0(a.u,1,"0&"))
return}if(1===s){b.push(A.a0(a.u,4,"1&"))
return}throw A.c(A.aa("Unexpected extended operation "+A.p(s)))},
c0(a,b){var s=b.splice(a.p)
A.c4(a.u,a.e,s)
a.p=b.pop()
return s},
x(a,b,c){if(typeof c=="string")return A.a_(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.cZ(a,b,c)}else return c},
c4(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.x(a,b,c[s])},
d_(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.x(a,b,c[s])},
cZ(a,b,c){var s,r,q=b.x
if(q===10){if(c===0)return b.y
s=b.z
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.y
q=b.x}else if(c===0)return b
if(q!==9)throw A.c(A.aa("Indexed base must be an interface type"))
s=b.z
if(c<=s.length)return s[c-1]
throw A.c(A.aa("Bad index "+c+" for "+b.h(0)))},
e(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(!A.w(d))if(!(d===t._))s=!1
else s=!0
else s=!0
if(s)return!0
r=b.x
if(r===4)return!0
if(A.w(b))return!1
if(b.x!==1)s=!1
else s=!0
if(s)return!0
q=r===14
if(q)if(A.e(a,c[b.y],c,d,e))return!0
p=d.x
s=b===t.P||b===t.T
if(s){if(p===8)return A.e(a,b,c,d.y,e)
return d===t.P||d===t.T||p===7||p===6}if(d===t.K){if(r===8)return A.e(a,b.y,c,d,e)
if(r===6)return A.e(a,b.y,c,d,e)
return r!==7}if(r===6)return A.e(a,b.y,c,d,e)
if(p===6){s=A.bV(a,d)
return A.e(a,b,c,s,e)}if(r===8){if(!A.e(a,b.y,c,d,e))return!1
return A.e(a,A.bA(a,b),c,d,e)}if(r===7){s=A.e(a,t.P,c,d,e)
return s&&A.e(a,b.y,c,d,e)}if(p===8){if(A.e(a,b,c,d.y,e))return!0
return A.e(a,b,c,A.bA(a,d),e)}if(p===7){s=A.e(a,b,c,t.P,e)
return s||A.e(a,b,c,d.y,e)}if(q)return!1
s=r!==12
if((!s||r===13)&&d===t.Z)return!0
o=r===11
if(o&&d===t.L)return!0
if(p===13){if(b===t.g)return!0
if(r!==13)return!1
n=b.z
m=d.z
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.e(a,j,c,i,e)||!A.e(a,i,e,j,c))return!1}return A.ce(a,b.y,c,d.y,e)}if(p===12){if(b===t.g)return!0
if(s)return!1
return A.ce(a,b,c,d,e)}if(r===9){if(p!==9)return!1
return A.dr(a,b,c,d,e)}if(o&&p===11)return A.dv(a,b,c,d,e)
return!1},
ce(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.e(a3,a4.y,a5,a6.y,a7))return!1
s=a4.z
r=a6.z
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.e(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.e(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.e(a3,k[h],a7,g,a5))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;!0;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.e(a3,e[a+2],a7,g,a5))return!1
break}}for(;b<d;){if(f[b+1])return!1
b+=3}return!0},
dr(a,b,c,d,e){var s,r,q,p,o,n,m,l=b.y,k=d.y
for(;l!==k;){s=a.tR[l]
if(s==null)return!1
if(typeof s=="string"){l=s
continue}r=s[k]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.bj(a,b,r[o])
return A.c9(a,p,null,c,d.z,e)}n=b.z
m=d.z
return A.c9(a,n,null,c,m,e)},
c9(a,b,c,d,e,f){var s,r,q,p=b.length
for(s=0;s<p;++s){r=b[s]
q=e[s]
if(!A.e(a,r,d,q,f))return!1}return!0},
dv(a,b,c,d,e){var s,r=b.z,q=d.z,p=r.length
if(p!==q.length)return!1
if(b.y!==d.y)return!1
for(s=0;s<p;++s)if(!A.e(a,r[s],c,q[s],e))return!1
return!0},
a6(a){var s,r=a.x
if(!(a===t.P||a===t.T))if(!A.w(a))if(r!==7)if(!(r===6&&A.a6(a.y)))s=r===8&&A.a6(a.y)
else s=!0
else s=!0
else s=!0
else s=!0
return s},
e3(a){var s
if(!A.w(a))if(!(a===t._))s=!1
else s=!0
else s=!0
return s},
w(a){var s=a.x
return s===2||s===3||s===4||s===5||a===t.X},
c8(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
bk(a){return a>0?new Array(a):v.typeUniverse.sEA},
n:function n(a,b){var _=this
_.a=a
_.b=b
_.w=_.r=_.c=null
_.x=0
_.at=_.as=_.Q=_.z=_.y=null},
at:function at(){this.c=this.b=this.a=null},
bh:function bh(a){this.a=a},
as:function as(){},
Y:function Y(a){this.a=a},
cR(){var s,r,q={}
if(self.scheduleImmediate!=null)return A.dL()
if(self.MutationObserver!=null&&self.document!=null){s=self.document.createElement("div")
r=self.document.createElement("span")
q.a=null
new self.MutationObserver(A.a4(new A.aX(q),1)).observe(s,{childList:true})
return new A.aW(q,s,r)}else if(self.setImmediate!=null)return A.dM()
return A.dN()},
cS(a){self.scheduleImmediate(A.a4(new A.aY(a),0))},
cT(a){self.setImmediate(A.a4(new A.aZ(a),0))},
cU(a){A.d0(0,a)},
d0(a,b){var s=new A.bf()
s.J(a,b)
return s},
aB(a,b){var s=A.bn(a,"error",t.K)
return new A.ab(s,b==null?A.bP(a):b)},
bP(a){var s
if(t.Q.b(a)){s=a.gn()
if(s!=null)return s}return B.m},
bB(a,b){var s,r
for(;s=a.a,(s&4)!==0;)a=a.c
if((s&24)!==0){r=b.q()
b.p(a)
A.W(b,r)}else{r=b.c
b.a=b.a&1|4
b.c=a
a.B(r)}},
W(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f={},e=f.a=a
for(s=t.c;!0;){r={}
q=e.a
p=(q&16)===0
o=!p
if(b==null){if(o&&(q&1)===0){e=e.c
A.bI(e.a,e.b)}return}r.a=b
n=b.a
for(e=b;n!=null;e=n,n=m){e.a=null
A.W(f.a,e)
r.a=n
m=n.a}q=f.a
l=q.c
r.b=o
r.c=l
if(p){k=e.c
k=(k&1)!==0||(k&15)===8}else k=!0
if(k){j=e.b.b
if(o){q=q.b===j
q=!(q||q)}else q=!1
if(q){A.bI(l.a,l.b)
return}i=$.h
if(i!==j)$.h=j
else i=null
e=e.c
if((e&15)===8)new A.ba(r,f,o).$0()
else if(p){if((e&1)!==0)new A.b9(r,l).$0()}else if((e&2)!==0)new A.b8(f,r).$0()
if(i!=null)$.h=i
e=r.c
if(s.b(e)){q=r.a.$ti
q=q.j("D<2>").b(e)||!q.z[1].b(e)}else q=!1
if(q){h=r.a.b
if((e.a&24)!==0){g=h.c
h.c=null
b=h.m(g)
h.a=e.a&30|h.a&1
h.c=e.c
f.a=e
continue}else A.bB(e,h)
return}}h=r.a.b
g=h.c
h.c=null
b=h.m(g)
e=r.b
q=r.c
if(!e){h.a=8
h.c=q}else{h.a=h.a&1|16
h.c=q}f.a=h
e=h}},
dB(a,b){if(t.C.b(a))return a
if(t.v.b(a))return a
throw A.c(A.bO(a,"onError",u.c))},
dz(){var s,r
for(s=$.J;s!=null;s=$.J){$.a2=null
r=s.b
$.J=r
if(r==null)$.a1=null
s.a.$0()}},
dF(){$.bH=!0
try{A.dz()}finally{$.a2=null
$.bH=!1
if($.J!=null)$.bN().$1(A.ck())}},
ci(a){var s=new A.ap(a),r=$.a1
if(r==null){$.J=$.a1=s
if(!$.bH)$.bN().$1(A.ck())}else $.a1=r.b=s},
dE(a){var s,r,q,p=$.J
if(p==null){A.ci(a)
$.a2=$.a1
return}s=new A.ap(a)
r=$.a2
if(r==null){s.b=p
$.J=$.a2=s}else{q=r.b
s.b=q
$.a2=r.b=s
if(q==null)$.a1=s}},
ed(a){var s,r=null,q=$.h
if(B.a===q){A.A(r,r,B.a,a)
return}s=!1
if(s){A.A(r,r,q,a)
return}A.A(r,r,q,q.C(a))},
bI(a,b){A.dE(new A.bm(a,b))},
cg(a,b,c,d){var s,r=$.h
if(r===c)return d.$0()
$.h=c
s=r
try{r=d.$0()
return r}finally{$.h=s}},
dD(a,b,c,d,e){var s,r=$.h
if(r===c)return d.$1(e)
$.h=c
s=r
try{r=d.$1(e)
return r}finally{$.h=s}},
dC(a,b,c,d,e,f){var s,r=$.h
if(r===c)return d.$2(e,f)
$.h=c
s=r
try{r=d.$2(e,f)
return r}finally{$.h=s}},
A(a,b,c,d){if(B.a!==c)d=c.C(d)
A.ci(d)},
aX:function aX(a){this.a=a},
aW:function aW(a,b,c){this.a=a
this.b=b
this.c=c},
aY:function aY(a){this.a=a},
aZ:function aZ(a){this.a=a},
bf:function bf(){},
bg:function bg(a,b){this.a=a
this.b=b},
ab:function ab(a,b){this.a=a
this.b=b},
aq:function aq(){},
V:function V(a,b){this.a=a
this.$ti=b},
au:function au(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
o:function o(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
b0:function b0(a,b){this.a=a
this.b=b},
b7:function b7(a,b){this.a=a
this.b=b},
b3:function b3(a){this.a=a},
b4:function b4(a){this.a=a},
b5:function b5(a,b,c){this.a=a
this.b=b
this.c=c},
b2:function b2(a,b){this.a=a
this.b=b},
b6:function b6(a,b){this.a=a
this.b=b},
b1:function b1(a,b,c){this.a=a
this.b=b
this.c=c},
ba:function ba(a,b,c){this.a=a
this.b=b
this.c=c},
bb:function bb(a){this.a=a},
b9:function b9(a,b){this.a=a
this.b=b},
b8:function b8(a,b){this.a=a
this.b=b},
ap:function ap(a){this.a=a
this.b=null},
bl:function bl(){},
bm:function bm(a,b){this.a=a
this.b=b},
bd:function bd(){},
be:function be(a,b){this.a=a
this.b=b},
cJ(a,b){a=A.c(a)
a.stack=b.h(0)
throw a
throw A.c("unreachable")},
cP(a,b,c){var s,r,q=new J.a8(b,b.length)
if(!q.t())return a
if(c.length===0){s=A.aw(q).c
do{r=q.d
a+=A.p(r==null?s.a(r):r)}while(q.t())}else{s=q.d
a+=A.p(s==null?A.aw(q).c.a(s):s)
for(s=A.aw(q).c;q.t();){r=q.d
a=a+c+A.p(r==null?s.a(r):r)}}return a},
aH(a){if(typeof a=="number"||A.bG(a)||a==null)return J.a7(a)
if(typeof a=="string")return JSON.stringify(a)
return A.cN(a)},
aa(a){return new A.a9(a)},
bx(a,b){return new A.C(!1,null,b,a)},
bO(a,b,c){return new A.C(!0,a,b,c)},
cQ(a){return new A.ao(a)},
bZ(a){return new A.am(a)},
bX(a){return new A.al(a)},
cK(a,b,c){var s,r
if(A.e2(a))return b+"..."+c
s=new A.aR(b)
$.bw.push(a)
try{r=s
r.a=A.cP(r.a,a,", ")}finally{$.bw.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
e9(a){A.ea(A.p(a))},
d:function d(){},
a9:function a9(a){this.a=a},
r:function r(){},
C:function C(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ao:function ao(a){this.a=a},
am:function am(a){this.a=a},
al:function al(a){this.a=a},
ad:function ad(a){this.a=a},
T:function T(){},
b_:function b_(a){this.a=a},
j:function j(){},
f:function f(){},
av:function av(){},
aR:function aR(a){this.a=a},
b:function b(){},
az:function az(){},
aA:function aA(){},
aE:function aE(){},
a:function a(){},
ae:function ae(){},
G:function G(){},
eb(a,b){var s=new A.o($.h,b.j("o<0>")),r=new A.V(s,b.j("V<0>"))
a.then(A.a4(new A.bu(r),1),A.a4(new A.bv(r),1))
return s},
bu:function bu(a){this.a=a},
bv:function bv(a){this.a=a},
aM:function aM(a){this.a=a},
aP:function aP(){},
aG:function aG(){},
aF:function aF(){},
aK:function aK(){},
aL:function aL(){},
aT:function aT(){},
ea(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
eg(a){return A.bM(new A.ai("Field '"+a+"' has been assigned during initialization."))},
dg(){return dartpad.enableDartLanguageService()},
e6(){var s,r
dartpad.setupEditorWorker()
s={automaticLayout:!0,language:"dart",scrollBeyondLastLine:!1,tabSize:2,value:"import 'dart:math' show Random;\n\nFuture<void> main() async {\n  print('Compute \u03c0 using the Monte Carlo method.');\n\n  await for (var estimate in computePi().take(100)) {\n    print('\u03c0 \u2245 $estimate');\n  }\n}\n\n/// Generates a stream of increasingly accurate estimates of \u03c0.\nStream<double> computePi({int batch = 100000}) async* {\n  var total = 0; // Inferred to be of type int\n  var count = 0;\n\n  while (true) {\n    var points = generateRandom().take(batch);\n    var inside = points.where((point) => point.isInsideUnitCircle);\n\n    total += batch;\n    count += inside.length;\n\n    var ratio = count / total;\n\n    // Area of a circle is A = \u03c0\u22c5r\xb2, therefore \u03c0 = A/r\xb2.\n    // So, when given random points with x \u2208 <0,1>,\n    // y \u2208 <0,1>, the ratio of those inside a unit circle\n    // should approach \u03c0 / 4. Therefore, the value of \u03c0\n    // should be:\n    yield ratio * 4;\n  }\n}\n\nIterable<Point> generateRandom([int? seed]) sync* {\n  var random = Random(seed);\n\n  while (true) {\n    yield (x: random.nextDouble(), y: random.nextDouble());\n  }\n}\n\ntypedef Point = ({double x, double y});\n\nextension on Point {\n  bool get isInsideUnitCircle {\n    return x * x + y * y <= 1;\n  }\n}\n"}
r=document.querySelector("#editor")
r.toString
dartpad.createEditor(r,s)
r=t.n
A.eb(A.e4(),r).E(A.dP(),r)}},J={
bL(a,b,c,d){return{i:a,p:b,e:c,x:d}},
dU(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.bK==null){A.dY()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.c(A.bZ("Return interceptor for "+A.p(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.bc
if(o==null)o=$.bc=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.e5(a)
if(p!=null)return p
if(typeof a=="function")return B.q
s=Object.getPrototypeOf(a)
if(s==null)return B.e
if(s===Object.prototype)return B.e
if(typeof q=="function"){o=$.bc
if(o==null)o=$.bc=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.b,enumerable:false,writable:true,configurable:true})
return B.b}return B.b},
a5(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.P.prototype
return J.ag.prototype}if(typeof a=="string")return J.R.prototype
if(a==null)return J.Q.prototype
if(typeof a=="boolean")return J.af.prototype
if(a.constructor==Array)return J.E.prototype
if(typeof a!="object"){if(typeof a=="function")return J.F.prototype
return a}if(a instanceof A.f)return a
return J.dU(a)},
cB(a){return J.a5(a).gk(a)},
a7(a){return J.a5(a).h(a)},
O:function O(){},
af:function af(){},
Q:function Q(){},
i:function i(){},
m:function m(){},
aj:function aj(){},
U:function U(){},
F:function F(){},
E:function E(){},
aJ:function aJ(){},
a8:function a8(a,b){var _=this
_.a=a
_.b=b
_.c=0
_.d=null},
aI:function aI(){},
P:function P(){},
ag:function ag(){},
R:function R(){}},B={}
var w=[A,J,B]
var $={}
A.by.prototype={}
J.O.prototype={
h(a){return"Instance of '"+A.aO(a)+"'"},
gk(a){return A.L(A.bF(this))}}
J.af.prototype={
h(a){return String(a)},
gk(a){return A.L(t.y)},
$iq:1}
J.Q.prototype={
h(a){return"null"},
$iq:1,
$ij:1}
J.i.prototype={}
J.m.prototype={
h(a){return String(a)}}
J.aj.prototype={}
J.U.prototype={}
J.F.prototype={
h(a){var s=a[$.cq()]
if(s==null)return this.I(a)
return"JavaScript function for "+J.a7(s)}}
J.E.prototype={
h(a){return A.cK(a,"[","]")}}
J.aJ.prototype={}
J.a8.prototype={
t(){var s,r=this,q=r.a,p=q.length
if(r.b!==p)throw A.c(A.ee(q))
s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0}}
J.aI.prototype={
h(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
V(a,b){var s
if(a>0)s=this.U(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
U(a,b){return b>31?0:a>>>b},
gk(a){return A.L(t.H)}}
J.P.prototype={
gk(a){return A.L(t.S)},
$iq:1}
J.ag.prototype={
gk(a){return A.L(t.i)},
$iq:1}
J.R.prototype={
G(a,b){return a+b},
h(a){return a},
gk(a){return A.L(t.N)},
$iq:1,
$iI:1}
A.ai.prototype={
h(a){return"LateInitializationError: "+this.a}}
A.aU.prototype={
i(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.S.prototype={
h(a){var s=this.b
if(s==null)return"NoSuchMethodError: "+this.a
return"NoSuchMethodError: method not found: '"+s+"' on null"}}
A.ah.prototype={
h(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.an.prototype={
h(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.aN.prototype={
h(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.X.prototype={
h(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iH:1}
A.z.prototype={
h(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.cp(r==null?"unknown":r)+"'"},
ga4(){return this},
$C:"$1",
$R:1,
$D:null}
A.aC.prototype={$C:"$0",$R:0}
A.aD.prototype={$C:"$2",$R:2}
A.aS.prototype={}
A.aQ.prototype={
h(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.cp(s)+"'"}}
A.ac.prototype={
h(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.aO(this.a)+"'")}}
A.ar.prototype={
h(a){return"Reading static variable '"+this.a+"' during its initialization"}}
A.ak.prototype={
h(a){return"RuntimeError: "+this.a}}
A.bp.prototype={
$1(a){return this.a(a)},
$S:5}
A.bq.prototype={
$2(a,b){return this.a(a,b)},
$S:6}
A.br.prototype={
$1(a){return this.a(a)},
$S:7}
A.n.prototype={
j(a){return A.bj(v.typeUniverse,this,a)},
N(a){return A.db(v.typeUniverse,this,a)}}
A.at.prototype={}
A.bh.prototype={
h(a){return A.l(this.a,null)}}
A.as.prototype={
h(a){return this.a}}
A.Y.prototype={$ir:1}
A.aX.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:2}
A.aW.prototype={
$1(a){var s,r
this.a.a=a
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:8}
A.aY.prototype={
$0(){this.a.$0()},
$S:3}
A.aZ.prototype={
$0(){this.a.$0()},
$S:3}
A.bf.prototype={
J(a,b){if(self.setTimeout!=null)self.setTimeout(A.a4(new A.bg(this,b),0),a)
else throw A.c(A.cQ("`setTimeout()` not found."))}}
A.bg.prototype={
$0(){this.b.$0()},
$S:0}
A.ab.prototype={
h(a){return A.p(this.a)},
$id:1,
gn(){return this.b}}
A.aq.prototype={
D(a){var s,r
A.bn(a,"error",t.K)
s=this.a
if((s.a&30)!==0)throw A.c(A.bX("Future already completed"))
r=A.bP(a)
s.L(a,r)}}
A.V.prototype={}
A.au.prototype={
Y(a){if((this.c&15)!==6)return!0
return this.b.b.u(this.d,a.a)},
W(a){var s,r=this.e,q=null,p=a.a,o=this.b.b
if(t.C.b(r))q=o.a0(r,p,a.b)
else q=o.u(r,p)
try{p=q
return p}catch(s){if(t.d.b(A.N(s))){if((this.c&1)!==0)throw A.c(A.bx("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.c(A.bx("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.o.prototype={
F(a,b,c){var s,r,q=$.h
if(q===B.a){if(b!=null&&!t.C.b(b)&&!t.v.b(b))throw A.c(A.bO(b,"onError",u.c))}else if(b!=null)b=A.dB(b,q)
s=new A.o(q,c.j("o<0>"))
r=b==null?1:3
this.v(new A.au(s,r,a,b,this.$ti.j("@<1>").N(c).j("au<1,2>")))
return s},
E(a,b){return this.F(a,null,b)},
T(a){this.a=this.a&1|16
this.c=a},
p(a){this.a=a.a&30|this.a&1
this.c=a.c},
v(a){var s=this,r=s.a
if(r<=3){a.a=s.c
s.c=a}else{if((r&4)!==0){r=s.c
if((r.a&24)===0){r.v(a)
return}s.p(r)}A.A(null,null,s.b,new A.b0(s,a))}},
B(a){var s,r,q,p,o,n=this,m={}
m.a=a
if(a==null)return
s=n.a
if(s<=3){r=n.c
n.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){s=n.c
if((s.a&24)===0){s.B(a)
return}n.p(s)}m.a=n.m(a)
A.A(null,null,n.b,new A.b7(m,n))}},
q(){var s=this.c
this.c=null
return this.m(s)},
m(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
O(a){var s,r,q,p=this
p.a^=2
try{a.F(new A.b3(p),new A.b4(p),t.P)}catch(q){s=A.N(q)
r=A.M(q)
A.ed(new A.b5(p,s,r))}},
A(a){var s=this,r=s.q()
s.a=8
s.c=a
A.W(s,r)},
l(a,b){var s=this.q()
this.T(A.aB(a,b))
A.W(this,s)},
K(a){if(this.$ti.j("D<1>").b(a)){this.P(a)
return}this.M(a)},
M(a){this.a^=2
A.A(null,null,this.b,new A.b2(this,a))},
P(a){var s=this
if(s.$ti.b(a)){if((a.a&16)!==0){s.a^=2
A.A(null,null,s.b,new A.b6(s,a))}else A.bB(a,s)
return}s.O(a)},
L(a,b){this.a^=2
A.A(null,null,this.b,new A.b1(this,a,b))},
$iD:1}
A.b0.prototype={
$0(){A.W(this.a,this.b)},
$S:0}
A.b7.prototype={
$0(){A.W(this.b,this.a.a)},
$S:0}
A.b3.prototype={
$1(a){var s,r,q,p=this.a
p.a^=2
try{p.A(p.$ti.c.a(a))}catch(q){s=A.N(q)
r=A.M(q)
p.l(s,r)}},
$S:2}
A.b4.prototype={
$2(a,b){this.a.l(a,b)},
$S:9}
A.b5.prototype={
$0(){this.a.l(this.b,this.c)},
$S:0}
A.b2.prototype={
$0(){this.a.A(this.b)},
$S:0}
A.b6.prototype={
$0(){A.bB(this.b,this.a)},
$S:0}
A.b1.prototype={
$0(){this.a.l(this.b,this.c)},
$S:0}
A.ba.prototype={
$0(){var s,r,q,p,o,n,m=this,l=null
try{q=m.a.a
l=q.b.b.Z(q.d)}catch(p){s=A.N(p)
r=A.M(p)
q=m.c&&m.b.a.c.a===s
o=m.a
if(q)o.c=m.b.a.c
else o.c=A.aB(s,r)
o.b=!0
return}if(l instanceof A.o&&(l.a&24)!==0){if((l.a&16)!==0){q=m.a
q.c=l.c
q.b=!0}return}if(t.c.b(l)){n=m.b.a
q=m.a
q.c=l.E(new A.bb(n),t.z)
q.b=!1}},
$S:0}
A.bb.prototype={
$1(a){return this.a},
$S:10}
A.b9.prototype={
$0(){var s,r,q,p,o
try{q=this.a
p=q.a
q.c=p.b.b.u(p.d,this.b)}catch(o){s=A.N(o)
r=A.M(o)
q=this.a
q.c=A.aB(s,r)
q.b=!0}},
$S:0}
A.b8.prototype={
$0(){var s,r,q,p,o,n,m=this
try{s=m.a.a.c
p=m.b
if(p.a.Y(s)&&p.a.e!=null){p.c=p.a.W(s)
p.b=!1}}catch(o){r=A.N(o)
q=A.M(o)
p=m.a.a.c
n=m.b
if(p.a===r)n.c=p
else n.c=A.aB(r,q)
n.b=!0}},
$S:0}
A.ap.prototype={}
A.bl.prototype={}
A.bm.prototype={
$0(){var s=this.a,r=this.b
A.bn(s,"error",t.K)
A.bn(r,"stackTrace",t.l)
A.cJ(s,r)},
$S:0}
A.bd.prototype={
a2(a){var s,r,q
try{if(B.a===$.h){a.$0()
return}A.cg(null,null,this,a)}catch(q){s=A.N(q)
r=A.M(q)
A.bI(s,r)}},
C(a){return new A.be(this,a)},
a_(a){if($.h===B.a)return a.$0()
return A.cg(null,null,this,a)},
Z(a){return this.a_(a,t.z)},
a3(a,b){if($.h===B.a)return a.$1(b)
return A.dD(null,null,this,a,b)},
u(a,b){return this.a3(a,b,t.z,t.z)},
a1(a,b,c){if($.h===B.a)return a.$2(b,c)
return A.dC(null,null,this,a,b,c)},
a0(a,b,c){return this.a1(a,b,c,t.z,t.z,t.z)}}
A.be.prototype={
$0(){return this.a.a2(this.b)},
$S:0}
A.d.prototype={
gn(){return A.M(this.$thrownJsError)}}
A.a9.prototype={
h(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.aH(s)
return"Assertion failed"}}
A.r.prototype={}
A.C.prototype={
gS(){return"Invalid argument"+(!this.a?"(s)":"")},
gR(){return""},
h(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gS()+q+o
if(!s.a)return n
return n+s.gR()+": "+A.aH(s.gX())},
gX(){return this.b}}
A.ao.prototype={
h(a){return"Unsupported operation: "+this.a}}
A.am.prototype={
h(a){return"UnimplementedError: "+this.a}}
A.al.prototype={
h(a){return"Bad state: "+this.a}}
A.ad.prototype={
h(a){return"Concurrent modification during iteration: "+A.aH(this.a)+"."}}
A.T.prototype={
h(a){return"Stack Overflow"},
gn(){return null},
$id:1}
A.b_.prototype={
h(a){return"Exception: "+this.a}}
A.j.prototype={
h(a){return"null"}}
A.f.prototype={$if:1,
h(a){return"Instance of '"+A.aO(this)+"'"},
gk(a){return A.dV(this)},
toString(){return this.h(this)}}
A.av.prototype={
h(a){return""},
$iH:1}
A.aR.prototype={
h(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.b.prototype={}
A.az.prototype={
h(a){return String(a)}}
A.aA.prototype={
h(a){return String(a)}}
A.aE.prototype={
h(a){return String(a)}}
A.a.prototype={
h(a){return a.localName}}
A.ae.prototype={}
A.G.prototype={
h(a){var s=a.nodeValue
return s==null?this.H(a):s}}
A.bu.prototype={
$1(a){var s=this.a.a
if((s.a&30)!==0)A.bM(A.bX("Future already completed"))
s.K(a)
return null},
$S:4}
A.bv.prototype={
$1(a){if(a==null)return this.a.D(new A.aM(a===undefined))
return this.a.D(a)},
$S:4}
A.aM.prototype={
h(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.aP.prototype={}
A.aG.prototype={}
A.aF.prototype={}
A.aK.prototype={}
A.aL.prototype={}
A.aT.prototype={};(function aliases(){var s=J.O.prototype
s.H=s.h
s=J.m.prototype
s.I=s.h})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0
s(A,"dL","cS",1)
s(A,"dM","cT",1)
s(A,"dN","cU",1)
r(A,"ck","dF",0)
s(A,"dP","e9",11)
r(A,"e4","dg",12)})();(function inheritance(){var s=hunkHelpers.inherit,r=hunkHelpers.inheritMany
s(A.f,null)
r(A.f,[A.by,J.O,J.a8,A.d,A.aU,A.aN,A.X,A.z,A.n,A.at,A.bh,A.bf,A.ab,A.aq,A.au,A.o,A.ap,A.bl,A.T,A.b_,A.j,A.av,A.aR,A.aM])
r(J.O,[J.af,J.Q,J.i,J.aI,J.R])
r(J.i,[J.m,J.E,A.ae,A.aE])
r(J.m,[J.aj,J.U,J.F,A.aP,A.aG,A.aF,A.aK,A.aL,A.aT])
s(J.aJ,J.E)
r(J.aI,[J.P,J.ag])
r(A.d,[A.ai,A.r,A.ah,A.an,A.ar,A.ak,A.as,A.a9,A.C,A.ao,A.am,A.al,A.ad])
s(A.S,A.r)
r(A.z,[A.aC,A.aD,A.aS,A.bp,A.br,A.aX,A.aW,A.b3,A.bb,A.bu,A.bv])
r(A.aS,[A.aQ,A.ac])
r(A.aD,[A.bq,A.b4])
s(A.Y,A.as)
r(A.aC,[A.aY,A.aZ,A.bg,A.b0,A.b7,A.b5,A.b2,A.b6,A.b1,A.ba,A.b9,A.b8,A.bm,A.be])
s(A.V,A.aq)
s(A.bd,A.bl)
s(A.G,A.ae)
s(A.a,A.G)
s(A.b,A.a)
r(A.b,[A.az,A.aA])})()
var v={typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{e0:"int",dR:"double",e8:"num",I:"String",dO:"bool",j:"Null",cL:"List"},mangledNames:{},types:["~()","~(~())","j(@)","j()","~(@)","@(@)","@(@,I)","@(I)","j(~())","j(f,H)","o<@>(@)","~(f?)","f()"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.da(v.typeUniverse,JSON.parse('{"aj":"m","U":"m","F":"m","aP":"m","aG":"m","aF":"m","aK":"m","aL":"m","aT":"m","af":{"q":[]},"Q":{"j":[],"q":[]},"P":{"q":[]},"ag":{"q":[]},"R":{"I":[],"q":[]},"ai":{"d":[]},"S":{"r":[],"d":[]},"ah":{"d":[]},"an":{"d":[]},"X":{"H":[]},"ar":{"d":[]},"ak":{"d":[]},"as":{"d":[]},"Y":{"r":[],"d":[]},"o":{"D":["1"]},"ab":{"d":[]},"V":{"aq":["1"]},"a9":{"d":[]},"r":{"d":[]},"C":{"d":[]},"ao":{"d":[]},"am":{"d":[]},"al":{"d":[]},"ad":{"d":[]},"T":{"d":[]},"av":{"H":[]}}'))
A.d9(v.typeUniverse,JSON.parse('{"E":1,"aJ":1,"a8":1}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.dS
return{Q:s("d"),Z:s("ej"),c:s("D<@>"),b:s("E<@>"),T:s("Q"),g:s("F"),P:s("j"),K:s("f"),L:s("el"),l:s("H"),N:s("I"),R:s("q"),d:s("r"),o:s("U"),y:s("dO"),i:s("dR"),z:s("@"),v:s("@(f)"),C:s("@(f,H)"),S:s("e0"),A:s("0&*"),_:s("f*"),O:s("D<j>?"),X:s("f?"),H:s("e8"),n:s("~")}})();(function constants(){B.n=J.O.prototype
B.o=J.P.prototype
B.p=J.R.prototype
B.q=J.F.prototype
B.r=J.i.prototype
B.e=J.aj.prototype
B.b=J.U.prototype
B.c=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.f=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.l=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.h=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.i=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.k=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.j=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.d=function(hooks) { return hooks; }

B.a=new A.bd()
B.m=new A.av()})();(function staticFields(){$.bc=null
$.bw=[]
$.bS=null
$.bR=null
$.cm=null
$.cj=null
$.co=null
$.bo=null
$.bs=null
$.bK=null
$.J=null
$.a1=null
$.a2=null
$.bH=!1
$.h=B.a})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"ei","cq",()=>A.dT("_$dart_dartClosure"))
s($,"em","cr",()=>A.t(A.aV({
toString:function(){return"$receiver$"}})))
s($,"en","cs",()=>A.t(A.aV({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"eo","ct",()=>A.t(A.aV(null)))
s($,"ep","cu",()=>A.t(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"es","cx",()=>A.t(A.aV(void 0)))
s($,"et","cy",()=>A.t(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"er","cw",()=>A.t(A.bY(null)))
s($,"eq","cv",()=>A.t(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"ev","cA",()=>A.t(A.bY(void 0)))
s($,"eu","cz",()=>A.t(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"ew","bN",()=>A.cR())})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({ApplicationCacheErrorEvent:J.i,DOMError:J.i,ErrorEvent:J.i,Event:J.i,InputEvent:J.i,SubmitEvent:J.i,MediaError:J.i,NavigatorUserMediaError:J.i,OverconstrainedError:J.i,PositionError:J.i,GeolocationPositionError:J.i,SensorErrorEvent:J.i,SpeechRecognitionError:J.i,HTMLAudioElement:A.b,HTMLBRElement:A.b,HTMLBaseElement:A.b,HTMLBodyElement:A.b,HTMLButtonElement:A.b,HTMLCanvasElement:A.b,HTMLContentElement:A.b,HTMLDListElement:A.b,HTMLDataElement:A.b,HTMLDataListElement:A.b,HTMLDetailsElement:A.b,HTMLDialogElement:A.b,HTMLDivElement:A.b,HTMLEmbedElement:A.b,HTMLFieldSetElement:A.b,HTMLFormElement:A.b,HTMLHRElement:A.b,HTMLHeadElement:A.b,HTMLHeadingElement:A.b,HTMLHtmlElement:A.b,HTMLIFrameElement:A.b,HTMLImageElement:A.b,HTMLInputElement:A.b,HTMLLIElement:A.b,HTMLLabelElement:A.b,HTMLLegendElement:A.b,HTMLLinkElement:A.b,HTMLMapElement:A.b,HTMLMediaElement:A.b,HTMLMenuElement:A.b,HTMLMetaElement:A.b,HTMLMeterElement:A.b,HTMLModElement:A.b,HTMLOListElement:A.b,HTMLObjectElement:A.b,HTMLOptGroupElement:A.b,HTMLOptionElement:A.b,HTMLOutputElement:A.b,HTMLParagraphElement:A.b,HTMLParamElement:A.b,HTMLPictureElement:A.b,HTMLPreElement:A.b,HTMLProgressElement:A.b,HTMLQuoteElement:A.b,HTMLScriptElement:A.b,HTMLSelectElement:A.b,HTMLShadowElement:A.b,HTMLSlotElement:A.b,HTMLSourceElement:A.b,HTMLSpanElement:A.b,HTMLStyleElement:A.b,HTMLTableCaptionElement:A.b,HTMLTableCellElement:A.b,HTMLTableDataCellElement:A.b,HTMLTableHeaderCellElement:A.b,HTMLTableColElement:A.b,HTMLTableElement:A.b,HTMLTableRowElement:A.b,HTMLTableSectionElement:A.b,HTMLTemplateElement:A.b,HTMLTextAreaElement:A.b,HTMLTimeElement:A.b,HTMLTitleElement:A.b,HTMLTrackElement:A.b,HTMLUListElement:A.b,HTMLUnknownElement:A.b,HTMLVideoElement:A.b,HTMLDirectoryElement:A.b,HTMLFontElement:A.b,HTMLFrameElement:A.b,HTMLFrameSetElement:A.b,HTMLMarqueeElement:A.b,HTMLElement:A.b,HTMLAnchorElement:A.az,HTMLAreaElement:A.aA,DOMException:A.aE,MathMLElement:A.a,SVGAElement:A.a,SVGAnimateElement:A.a,SVGAnimateMotionElement:A.a,SVGAnimateTransformElement:A.a,SVGAnimationElement:A.a,SVGCircleElement:A.a,SVGClipPathElement:A.a,SVGDefsElement:A.a,SVGDescElement:A.a,SVGDiscardElement:A.a,SVGEllipseElement:A.a,SVGFEBlendElement:A.a,SVGFEColorMatrixElement:A.a,SVGFEComponentTransferElement:A.a,SVGFECompositeElement:A.a,SVGFEConvolveMatrixElement:A.a,SVGFEDiffuseLightingElement:A.a,SVGFEDisplacementMapElement:A.a,SVGFEDistantLightElement:A.a,SVGFEFloodElement:A.a,SVGFEFuncAElement:A.a,SVGFEFuncBElement:A.a,SVGFEFuncGElement:A.a,SVGFEFuncRElement:A.a,SVGFEGaussianBlurElement:A.a,SVGFEImageElement:A.a,SVGFEMergeElement:A.a,SVGFEMergeNodeElement:A.a,SVGFEMorphologyElement:A.a,SVGFEOffsetElement:A.a,SVGFEPointLightElement:A.a,SVGFESpecularLightingElement:A.a,SVGFESpotLightElement:A.a,SVGFETileElement:A.a,SVGFETurbulenceElement:A.a,SVGFilterElement:A.a,SVGForeignObjectElement:A.a,SVGGElement:A.a,SVGGeometryElement:A.a,SVGGraphicsElement:A.a,SVGImageElement:A.a,SVGLineElement:A.a,SVGLinearGradientElement:A.a,SVGMarkerElement:A.a,SVGMaskElement:A.a,SVGMetadataElement:A.a,SVGPathElement:A.a,SVGPatternElement:A.a,SVGPolygonElement:A.a,SVGPolylineElement:A.a,SVGRadialGradientElement:A.a,SVGRectElement:A.a,SVGScriptElement:A.a,SVGSetElement:A.a,SVGStopElement:A.a,SVGStyleElement:A.a,SVGElement:A.a,SVGSVGElement:A.a,SVGSwitchElement:A.a,SVGSymbolElement:A.a,SVGTSpanElement:A.a,SVGTextContentElement:A.a,SVGTextElement:A.a,SVGTextPathElement:A.a,SVGTextPositioningElement:A.a,SVGTitleElement:A.a,SVGUseElement:A.a,SVGViewElement:A.a,SVGGradientElement:A.a,SVGComponentTransferFunctionElement:A.a,SVGFEDropShadowElement:A.a,SVGMPathElement:A.a,Element:A.a,EventTarget:A.ae,Document:A.G,HTMLDocument:A.G,Node:A.G})
hunkHelpers.setOrUpdateLeafTags({ApplicationCacheErrorEvent:true,DOMError:true,ErrorEvent:true,Event:true,InputEvent:true,SubmitEvent:true,MediaError:true,NavigatorUserMediaError:true,OverconstrainedError:true,PositionError:true,GeolocationPositionError:true,SensorErrorEvent:true,SpeechRecognitionError:true,HTMLAudioElement:true,HTMLBRElement:true,HTMLBaseElement:true,HTMLBodyElement:true,HTMLButtonElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLDivElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLFormElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHeadingElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLImageElement:true,HTMLInputElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOptionElement:true,HTMLOutputElement:true,HTMLParagraphElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLSelectElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLSpanElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,HTMLAnchorElement:true,HTMLAreaElement:true,DOMException:true,MathMLElement:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGScriptElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,Element:false,EventTarget:false,Document:true,HTMLDocument:true,Node:false})})()
Function.prototype.$1$1=function(a){return this(a)}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$0=function(){return this()}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q)s[q].removeEventListener("load",onLoad,false)
a(b.target)}for(var r=0;r<s.length;++r)s[r].addEventListener("load",onLoad,false)})(function(a){v.currentScript=a
var s=A.e6
if(typeof dartMainRunner==="function")dartMainRunner(s,[])
else s([])})})()
//# sourceMappingURL=main.dart.js.map
