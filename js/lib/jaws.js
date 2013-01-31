var jaws=function(c){function b(b){c.mouse_x=b.pageX||b.clientX;c.mouse_y=b.pageY||b.clientX;b=c.canvas?c.canvas:c.dom;c.mouse_x-=b.offsetLeft;c.mouse_y-=b.offsetTop}var d,e;c.title=function(b){return b?d.innerHTML=b:d.innerHTML};c.unpack=function(){"Sprite SpriteList Animation Viewport SpriteSheet Parallax TileMap Rect pressed".split(" ").forEach(function(b){window[b]?c.log(b+"already exists in global namespace"):window[b]=c[b]})};c.log=function(b,c){e&&(b+="<br />",e.innerHTML=c?e.innerHTML.toString()+
b:b)};c.init=function(f){d=document.getElementsByTagName("title")[0];c.url_parameters=c.getUrlParameters();e=document.getElementById("jaws-log");c.url_parameters.debug&&!e&&(e=document.createElement("div"),e.id="jaws-log",e.style.cssText="overflow: auto; color: #aaaaaa; width: 300px; height: 150px; margin: 40px auto 0px auto; padding: 5px; border: #444444 1px solid; clear: both; font: 10px verdana; text-align: left;",document.body.appendChild(e));c.canvas=document.getElementsByTagName("canvas")[0];
c.canvas||(c.dom=document.getElementById("canvas"));c.canvas?c.context=c.canvas.getContext("2d"):c.dom?c.dom.style.position="relative":(c.canvas=document.createElement("canvas"),c.canvas.width=f.width,c.canvas.height=f.height,c.context=c.canvas.getContext("2d"),document.body.appendChild(c.canvas));c.width=c.canvas?c.canvas.width:c.dom.offsetWidth;c.height=c.canvas?c.canvas.height:c.dom.offsetHeight;c.mouse_x=0;c.mouse_y=0;window.addEventListener("mousemove",b)};c.start=function(b,d,e){function g(b){c.context&&
d.loading_screen&&(c.context.save(),c.context.fillStyle="black",c.context.fillRect(0,0,c.width,c.height),c.context.textAlign="center",c.context.fillStyle="white",c.context.font="15px terminal",c.context.fillText("Loading",c.width/2,c.height/2-30),c.context.font="bold 30px terminal",c.context.fillText(b+"%",c.width/2,c.height/2),c.context.restore())}function h(b,d){c.log(d+"%: "+b,!0);g(d)}function q(b){c.log("Error loading: "+b,!0)}function n(){c.log("all assets loaded",!0);c.switchGameState(b||window,
{fps:r},e)}d||(d={});var r=d.fps||60;void 0===d.loading_screen&&(d.loading_screen=!0);d.width||(d.width=500);d.height||(d.height=300);c.init(d);g(0);c.log("setupInput()",!0);c.setupInput();c.log("assets.loadAll()",!0);0<c.assets.length()?c.assets.loadAll({onload:h,onerror:q,onfinish:n}):n()};c.switchGameState=function(b,d,e){d=d&&d.fps||c.game_loop&&c.game_loop.fps||60;c.game_loop&&c.game_loop.stop();c.clearKeyCallbacks();c.isFunction(b)&&(b=new b);c.previous_game_state=c.game_state;c.game_state=
b;c.game_loop=new c.GameLoop(b,{fps:d},e);c.game_loop.start()};c.imageToCanvas=function(b){var c=document.createElement("canvas");c.src=b.src;c.width=b.width;c.height=b.height;c.getContext("2d").drawImage(b,0,0,b.width,b.height);return c};c.forceArray=function(b){return Array.isArray(b)?b:[b]};c.clear=function(){c.context.clearRect(0,0,c.width,c.height)};c.isImage=function(b){return"[object HTMLImageElement]"===Object.prototype.toString.call(b)};c.isCanvas=function(b){return"[object HTMLCanvasElement]"===
Object.prototype.toString.call(b)};c.isDrawable=function(b){return c.isImage(b)||c.isCanvas(b)};c.isString=function(b){return"string"==typeof b};c.isArray=function(b){return void 0===b?!1:-1!=b.constructor.toString().indexOf("Array")};c.isFunction=function(b){return"[object Function]"===Object.prototype.toString.call(b)};c.isOutsideCanvas=function(b){return 0>b.x||0>b.y||b.x>c.width||b.y>c.height};c.forceInsideCanvas=function(b){0>b.x&&(b.x=0);b.x>c.width&&(b.x=c.width);0>b.y&&(b.y=0);b.y>c.height&&
(b.y=c.height)};c.getUrlParameters=function(){for(var b=[],c,d=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),e=0;e<d.length;e++)c=d[e].split("="),b.push(c[0]),b[c[0]]=c[1];return b};return c}(jaws||{}),jaws=function(c){function b(){h={}}function d(b){event=b?b:window.event;var c=q[event.keyCode];h[c]=!1;r[c]&&(r[c](c),b.preventDefault());l[c]&&b.preventDefault()}function e(b){event=b?b:window.event;var c=q[event.keyCode];h[c]=!0;n[c]&&(n[c](c),b.preventDefault());l[c]&&
b.preventDefault()}function f(b){event=b?b:window.event;var c=p[event.button];"Microsoft Internet Explorer"==navigator.appName&&(c=m[event.button]);h[c]=!0;n[c]&&(n[c](c),b.preventDefault())}function j(b){event=b?b:window.event;var c=p[event.button];"Microsoft Internet Explorer"==navigator.appName&&(c=m[event.button]);h[c]=!1;r[c]&&(r[c](c),b.preventDefault())}function k(b){event=b?b:window.event;h.left_mouse_button=!0;c.mouse_x=b.touches[0].pageX-c.canvas.offsetLeft;c.mouse_y=b.touches[0].pageY-
c.canvas.offsetTop}function g(b){event=b?b:window.event;h.left_mouse_button=!1;c.mouse_x=void 0;c.mouse_y=void 0}var h={},q=[],n=[],r=[],p=[],m=[];c.setupInput=function(){var c=[];c[8]="backspace";c[9]="tab";c[13]="enter";c[16]="shift";c[17]="ctrl";c[18]="alt";c[19]="pause";c[20]="capslock";c[27]="esc";c[32]="space";c[33]="pageup";c[34]="pagedown";c[35]="end";c[36]="home";c[37]="left";c[38]="up";c[39]="right";c[40]="down";c[45]="insert";c[46]="delete";c[91]="leftwindowkey";c[92]="rightwindowkey";
c[93]="selectkey";c[106]="multiply";c[107]="add";c[109]="subtract";c[110]="decimalpoint";c[111]="divide";c[144]="numlock";c[145]="scrollock";c[186]="semicolon";c[187]="equalsign";c[188]="comma";c[189]="dash";c[190]="period";c[191]="forwardslash";c[192]="graveaccent";c[219]="openbracket";c[220]="backslash";c[221]="closebracket";c[222]="singlequote";p=["left_mouse_button","center_mouse_button","right_mouse_button"];m=[,"left_mouse_button","right_mouse_button",,"center_mouse_button"];for(var h="numpad1 numpad2 numpad3 numpad4 numpad5 numpad6 numpad7 numpad8 numpad9".split(" "),
l="f1 f2 f3 f4 f5 f6 f7 f8 f9".split(" "),n="0123456789".split(""),r="abcdefghijklmnopqrstuvwxyz".split(""),s=0;n[s];s++)c[48+s]=n[s];for(s=0;r[s];s++)c[65+s]=r[s];for(s=0;h[s];s++)c[96+s]=h[s];for(s=0;l[s];s++)c[112+s]=l[s];q=c;window.addEventListener("keydown",e);window.addEventListener("keyup",d);window.addEventListener("mousedown",f,!1);window.addEventListener("mouseup",j,!1);window.addEventListener("touchstart",k,!1);window.addEventListener("touchend",g,!1);window.addEventListener("blur",b,!1);
document.oncontextmenu=function(){return!1}};var l=[];c.preventDefaultKeys=function(b){b.forEach(function(b){l[b]=!0})};c.pressed=function(b){return h[b]};c.on_keydown=function(b,d){if(c.isArray(b))for(var e=0;b[e];e++)n[b[e]]=d;else n[b]=d};c.on_keyup=function(b,d){if(c.isArray(b))for(var e=0;b[e];e++)r[b[e]]=d;else r[b]=d};c.clearKeyCallbacks=function(){r=[];n=[]};return c}(jaws||{}),jaws=function(c){c.Assets=function(){if(!(this instanceof arguments.callee))return new arguments.callee;this.loaded=
[];this.loading=[];this.src_list=[];this.data=[];this.bust_cache=!1;this.fuchia_to_transparent=this.image_to_canvas=!0;this.root="";this.file_type={};this.file_type.json="json";this.file_type.wav="audio";this.file_type.mp3="audio";this.file_type.ogg="audio";this.file_type.png="image";this.file_type.jpg="image";this.file_type.jpeg="image";this.file_type.gif="image";this.file_type.bmp="image";this.file_type.tiff="image";var b=this;this.length=function(){return this.src_list.length};this.get=function(d){if(c.isArray(d))return d.map(function(c){return b.data[c]});
if(this.loaded[d])return this.data[d];c.log("No such asset: "+d,!0)};this.isLoading=function(b){return this.loading[b]};this.isLoaded=function(b){return this.loaded[b]};this.getPostfix=function(b){postfix_regexp=/\.([a-zA-Z0-9]+)/;return postfix_regexp.exec(b)[1]};this.getType=function(b){b=this.getPostfix(b);return this.file_type[b]?this.file_type[b]:b};this.add=function(b){if(c.isArray(b))for(var e=0;b[e];e++)this.add(b[e]);else this.src_list.push(b);return this};this.loadAll=function(b){this.error_count=
this.load_count=0;this.onload=b.onload;this.onerror=b.onerror;this.onfinish=b.onfinish;for(i=0;this.src_list[i];i++)this.load(this.src_list[i])};this.getOrLoad=function(b,c,f){this.data[b]?c():this.load(b,c,f)};this.load=function(b,c,f){var j={};j.src=b;j.onload=c;j.onerror=f;this.loading[b]=!0;b=this.root+j.src;this.bust_cache&&(b+="?"+parseInt(1E7*Math.random()));switch(this.getType(j.src)){case "image":j.image=new Image;j.image.asset=j;j.image.onload=this.assetLoaded;j.image.onerror=this.assetError;
j.image.src=b;break;case "audio":j.audio=new Audio(b);j.audio.asset=j;this.data[j.src]=j.audio;j.audio.addEventListener("canplay",this.assetLoaded,!1);j.audio.addEventListener("error",this.assetError,!1);j.audio.load();break;default:c=new XMLHttpRequest,c.asset=j,c.onreadystatechange=this.assetLoaded,c.open("GET",b,!0),c.send(null)}};this.assetLoaded=function(){var d=this.asset,e=d.src,f=b.getType(d.src);b.loaded[e]=!0;b.loading[e]=!1;if("json"==f){if(4!=this.readyState)return;b.data[d.src]=JSON.parse(this.responseText)}else if("image"==
f){e=b.image_to_canvas?c.imageToCanvas(d.image):d.image;if(b.fuchia_to_transparent&&"bmp"==b.getPostfix(d.src)){canvas=c.isImage(e)?c.imageToCanvas(e):e;for(var e=canvas.getContext("2d"),f=e.getImageData(0,0,canvas.width,canvas.height),j=f.data,k=0;k<j.length;k+=4)255==j[k]&&(0==j[k+1]&&255==j[k+2])&&(j[k+3]=0);e.putImageData(f,0,0);e=canvas}b.data[d.src]=e}else"audio"==f&&(d.audio.removeEventListener("canplay",b.assetLoaded,!1),b.data[d.src]=d.audio);b.load_count++;b.processCallbacks(d,!0)};this.assetError=
function(){var c=this.asset;b.error_count++;b.processCallbacks(c,!1)};this.processCallbacks=function(c,e){var f=parseInt(100*((b.load_count+b.error_count)/b.src_list.length));if(e){if(b.onload)b.onload(c.src,f);if(c.onload)c.onload()}else{if(b.onerror)b.onerror(c.src,f);if(c.onerror)c.onerror(c)}if(100==f){if(b.onfinish)b.onfinish();b.onload=null;b.onerror=null;b.onfinish=null}}};c.assets=new c.Assets;return c}(jaws||{}),jaws=function(c){function b(b){this.size=b;this.values=Array(this.size);this.value;
this.add=function(b){if(this.values.length>this.size){this.values.splice(0,1);for(var c=this.value=0;this.values[c];c++)this.value+=this.values[c];this.value/=this.size}this.values.push(b);return this};this.get=function(){return parseInt(this.value)}}window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(b){window.setTimeout(b,16.666)};c.GameLoop=function(d,e,
f){if(!(this instanceof arguments.callee))return new arguments.callee(d,e);this.ticks=this.fps=this.tick_duration=0;var j,k=!1,g=!1,h=this,q=new b(20);this.runtime=function(){return this.last_tick-this.first_tick};this.start=function(){c.log("game loop start",!0);this.first_tick=(new Date).getTime();this.current_tick=(new Date).getTime();this.last_tick=(new Date).getTime();d.setup&&d.setup(f);step_delay=1E3/e.fps;60==e.fps?requestAnimFrame(this.loop):j=setInterval(this.loop,step_delay);c.log("game loop loop",
!0)};this.loop=function(){h.current_tick=(new Date).getTime();h.tick_duration=h.current_tick-h.last_tick;h.fps=q.add(1E3/h.tick_duration).get();!g&&!k&&(d.update&&d.update(),d.draw&&d.draw(),h.ticks++);60==e.fps&&!g&&requestAnimFrame(h.loop);h.last_tick=h.current_tick};this.pause=function(){k=!0};this.unpause=function(){k=!1};this.stop=function(){j&&clearInterval(j);g=!0}};return c}(jaws||{}),jaws=function(c){c.Rect=function(b,c,e,f){if(!(this instanceof arguments.callee))return new arguments.callee(b,
c,e,f);this.x=b;this.y=c;this.width=e;this.height=f;this.right=b+e;this.bottom=c+f};c.Rect.prototype.getPosition=function(){return[this.x,this.y]};c.Rect.prototype.move=function(b,c){this.x+=b;this.y+=c;this.right+=b;this.bottom+=c;return this};c.Rect.prototype.moveTo=function(b,c){this.x=b;this.y=c;this.right=this.x+this.width;this.bottom=this.y+this.height;return this};c.Rect.prototype.resize=function(b,c){this.width+=b;this.height+=c;this.right=this.x+this.width;this.bottom=this.y+this.height;
return this};c.Rect.prototype.resizeTo=function(b,c){this.width=b;this.height=c;this.right=this.x+this.width;this.bottom=this.y+this.height;return this};c.Rect.prototype.draw=function(){c.context.strokeStyle="red";c.context.strokeRect(this.x,this.y,this.width,this.height);return this};c.Rect.prototype.collidePoint=function(b,c){return b>=this.x&&b<=this.right&&c>=this.y&&c<=this.bottom};c.Rect.prototype.collideRect=function(b){return(this.x>=b.x&&this.x<=b.right||b.x>=this.x&&b.x<=this.right)&&(this.y>=
b.y&&this.y<=b.bottom||b.y>=this.y&&b.y<=this.bottom)};c.Rect.prototype.toString=function(){return"[Rect "+this.x+", "+this.y+", "+this.width+", "+this.height+"]"};return c}(jaws||{});"undefined"!==typeof module&&"exports"in module&&(module.exports=jaws.Rect);
jaws=function(c){c.Sprite=function(b){if(!(this instanceof arguments.callee))return new arguments.callee(b);this.options=b;this.set(b);b.context?this.context=b.context:b.dom&&(this.dom=b.dom,this.createDiv());!b.context&&!b.dom&&(c.context?this.context=c.context:(this.dom=c.dom,this.createDiv()))};c.Sprite.prototype.set=function(b){this.scale_x=this.scale_y=b.scale||1;this.x=b.x||0;this.y=b.y||0;this.alpha=void 0===b.alpha?1:b.alpha;this.angle=b.angle||0;this.flipped=b.flipped||!1;this.anchor(b.anchor||
"top_left");void 0!==b.anchor_x&&(this.anchor_x=b.anchor_x);void 0!==b.anchor_y&&(this.anchor_y=b.anchor_y);b.image&&this.setImage(b.image);this.image_path=b.image;b.scale_image&&this.scaleImage(b.scale_image);this.cacheOffsets();return this};c.Sprite.prototype.clone=function(){var b=new (this._constructor?eval(this._constructor):this.constructor)(this.attributes());b._constructor=this._constructor||this.constructor.name;return b};c.Sprite.prototype.setImage=function(b){var d=this;if(c.isDrawable(b))return this.image=
b,this.cacheOffsets();c.assets.isLoaded(b)?(this.image=c.assets.get(b),this.cacheOffsets()):c.assets.load(b,function(){d.image=c.assets.get(b);d.cacheOffsets()});return this};c.Sprite.prototype.flip=function(){this.flipped=this.flipped?!1:!0;return this};c.Sprite.prototype.flipTo=function(b){this.flipped=b;return this};c.Sprite.prototype.rotate=function(b){this.angle+=b;return this};c.Sprite.prototype.rotateTo=function(b){this.angle=b;return this};c.Sprite.prototype.moveTo=function(b,c){this.x=b;
this.y=c;return this};c.Sprite.prototype.move=function(b,c){b&&(this.x+=b);c&&(this.y+=c);return this};c.Sprite.prototype.scale=function(b){this.scale_x*=b;this.scale_y*=b;return this.cacheOffsets()};c.Sprite.prototype.scaleTo=function(b){this.scale_x=this.scale_y=b;return this.cacheOffsets()};c.Sprite.prototype.scaleWidth=function(b){this.scale_x*=b;return this.cacheOffsets()};c.Sprite.prototype.scaleHeight=function(b){this.scale_y*=b;return this.cacheOffsets()};c.Sprite.prototype.setX=function(b){this.x=
b;return this};c.Sprite.prototype.setY=function(b){this.y=b;return this};c.Sprite.prototype.setTop=function(b){this.y=b+this.top_offset;return this};c.Sprite.prototype.setBottom=function(b){this.y=b-this.bottom_offset;return this};c.Sprite.prototype.setLeft=function(b){this.x=b+this.left_offset;return this};c.Sprite.prototype.setRight=function(b){this.x=b-this.right_offset;return this};c.Sprite.prototype.setWidth=function(b){this.scale_x=b/this.image.width;return this.cacheOffsets()};c.Sprite.prototype.setHeight=
function(b){this.scale_y=b/this.image.height;return this.cacheOffsets()};c.Sprite.prototype.resize=function(b,c){this.scale_x=(this.width+b)/this.image.width;this.scale_y=(this.height+c)/this.image.height;return this.cacheOffsets()};c.Sprite.prototype.resizeTo=function(b,c){this.scale_x=b/this.image.width;this.scale_y=c/this.image.height;return this.cacheOffsets()};c.Sprite.prototype.anchor=function(b){if(a={top_left:[0,0],left_top:[0,0],center_left:[0,0.5],left_center:[0,0.5],bottom_left:[0,1],left_bottom:[0,
1],top_center:[0.5,0],center_top:[0.5,0],center_center:[0.5,0.5],center:[0.5,0.5],bottom_center:[0.5,1],center_bottom:[0.5,1],top_right:[1,0],right_top:[1,0],center_right:[1,0.5],right_center:[1,0.5],bottom_right:[1,1],right_bottom:[1,1]}[b])this.anchor_x=a[0],this.anchor_y=a[1],this.image&&this.cacheOffsets();return this};c.Sprite.prototype.cacheOffsets=function(){if(this.image)return this.width=this.image.width*this.scale_x,this.height=this.image.height*this.scale_y,this.left_offset=this.width*
this.anchor_x,this.top_offset=this.height*this.anchor_y,this.right_offset=this.width*(1-this.anchor_x),this.bottom_offset=this.height*(1-this.anchor_y),this.cached_rect&&this.cached_rect.resizeTo(this.width,this.height),this};c.Sprite.prototype.rect=function(){this.cached_rect||(this.cached_rect=new c.Rect(this.x,this.top,this.width,this.height));this.cached_rect.moveTo(this.x-this.left_offset,this.y-this.top_offset);return this.cached_rect};c.Sprite.prototype.createDiv=function(){this.div=document.createElement("div");
this.div.style.position="absolute";this.image&&(this.div.style.width=this.image.width+"px",this.div.style.height=this.image.height+"px",this.div.style.backgroundImage=this.image.toDataURL?"url("+this.image.toDataURL()+")":"url("+this.image.src+")");this.dom&&this.dom.appendChild(this.div);this.updateDiv()};c.Sprite.prototype.updateDiv=function(){this.div.style.left=this.x+"px";this.div.style.top=this.y+"px";var b;b=""+("rotate("+this.angle+"deg) ");b=this.flipped?b+("scale(-"+this.scale_x+","+this.scale_y+
")"):b+("scale("+this.scale_x+","+this.scale_y+")");this.div.style.MozTransform=b;this.div.style.WebkitTransform=b;this.div.style.OTransform=b;this.div.style.msTransform=b;this.div.style.transform=b;return this};c.Sprite.prototype.draw=function(){if(!this.image)return this;if(this.dom)return this.updateDiv();this.context.save();this.context.translate(this.x,this.y);0!=this.angle&&c.context.rotate(this.angle*Math.PI/180);this.flipped&&this.context.scale(-1,1);this.context.globalAlpha=this.alpha;this.context.translate(-this.left_offset,
-this.top_offset);this.context.drawImage(this.image,0,0,this.width,this.height);this.context.restore();return this};c.Sprite.prototype.scaleImage=function(b){if(this.image)return this.setImage(c.gfx.retroScaleImage(this.image,b)),this};c.Sprite.prototype.asCanvasContext=function(){var b=document.createElement("canvas");b.width=this.width;b.height=this.height;b=b.getContext("2d");b.mozImageSmoothingEnabled=c.context.mozImageSmoothingEnabled;b.drawImage(this.image,0,0,this.width,this.height);return b};
c.Sprite.prototype.asCanvas=function(){var b=document.createElement("canvas");b.width=this.width;b.height=this.height;var d=b.getContext("2d");d.mozImageSmoothingEnabled=c.context.mozImageSmoothingEnabled;d.drawImage(this.image,0,0,this.width,this.height);return b};c.Sprite.prototype.toString=function(){return"[Sprite "+this.x.toFixed(2)+", "+this.y.toFixed(2)+", "+this.width+", "+this.height+"]"};c.Sprite.prototype.attributes=function(){var b=this.options;b._constructor=this._constructor||"jaws.Sprite";
b.x=parseFloat(this.x.toFixed(2));b.y=parseFloat(this.y.toFixed(2));b.image=this.image_path;b.alpha=this.alpha;b.flipped=this.flipped;b.angle=parseFloat(this.angle.toFixed(2));b.scale_x=this.scale_x;b.scale_y=this.scale_y;b.anchor_x=this.anchor_x;b.anchor_y=this.anchor_y;return b};c.Sprite.prototype.toJSON=function(){return JSON.stringify(this.attributes())};return c}(jaws||{});"undefined"!==typeof module&&"exports"in module&&(module.exports=jaws.Sprite);
jaws=function(c){c.SpriteList=function(b){if(!(this instanceof arguments.callee))return new arguments.callee(b);this.sprites=[];this.length=0;b&&this.load(b)};c.SpriteList.prototype.at=function(b){return this.sprites[b]};c.SpriteList.prototype.concat=function(){return this.sprites.concat.apply(this.sprites,arguments)};c.SpriteList.prototype.indexOf=function(b,c){return this.sprites.indexOf(b,c)};c.SpriteList.prototype.join=function(b){return this.sprites.join(b)};c.SpriteList.prototype.lastIndexOf=
function(){return this.sprites.lastIndexOf.apply(this.sprites,arguments)};c.SpriteList.prototype.pop=function(){var b=this.sprites.pop();this.updateLength();return b};c.SpriteList.prototype.push=function(){this.sprites.push.apply(this.sprites,arguments);this.updateLength();return this.length};c.SpriteList.prototype.reverse=function(){this.sprites.reverse()};c.SpriteList.prototype.shift=function(){var b=this.sprites.shift();this.updateLength();return b};c.SpriteList.prototype.slice=function(b,c){return this.sprites.slice(b,
c)};c.SpriteList.prototype.sort=function(){this.sprites.sort.apply(this.sprites,arguments)};c.SpriteList.prototype.splice=function(){var b=this.sprites.splice.apply(this.sprites,arguments);this.updateLength();return b};c.SpriteList.prototype.unshift=function(){this.sprites.unshift.apply(this.sprites,arguments);this.updateLength();return this.length};c.SpriteList.prototype.updateLength=function(){this.length=this.sprites.length};c.SpriteList.prototype.valueOf=function(){return this.toString()};c.SpriteList.prototype.filter=
function(){return this.sprites.filter.apply(this.sprites,arguments)};c.SpriteList.prototype.forEach=function(){this.sprites.forEach.apply(this.sprites,arguments);this.updateLength()};c.SpriteList.prototype.every=function(){return this.sprites.every.apply(this.sprites,arguments)};c.SpriteList.prototype.map=function(){return this.sprites.map.apply(this.sprites,arguments)};c.SpriteList.prototype.reduce=function(){return this.sprites.reduce.apply(this.sprites,arguments)};c.SpriteList.prototype.reduceRight=
function(){return this.sprites.reduceRight.apply(this.sprites,arguments)};c.SpriteList.prototype.some=function(){return this.sprites.some.apply(this.sprites,arguments)};c.SpriteList.prototype.isSpriteList=function(){return!0};c.SpriteList.prototype.load=function(b){function d(b){b.forEach(function(b){var d=b._constructor?eval(b._constructor):b.constructor;c.isFunction(d)&&(c.log("Creating "+b._constructor+"("+b.toString()+")",!0),d=new d(b),d._constructor=b._constructor||b.constructor.name,e.push(d))})}
var e=this;c.isArray(b)?b.every(function(b){return b._constructor})?d(b):this.sprites=b:c.isString(b)&&(d(JSON.parse(b)),console.log(b));this.updateLength()};c.SpriteList.prototype.remove=function(b){b=this.indexOf(b);-1<b&&this.splice(b,1);this.updateLength()};c.SpriteList.prototype.draw=function(){this.forEach(function(b){b.draw()})};c.SpriteList.prototype.drawIf=function(b){this.forEach(function(c){b(c)&&c.draw()})};c.SpriteList.prototype.update=function(){this.forEach(function(b){b.update()})};
c.SpriteList.prototype.updateIf=function(b){this.forEach(function(c){b(c)&&c.update()})};c.SpriteList.prototype.deleteIf=function(b){this.removeIf(b)};c.SpriteList.prototype.removeIf=function(b){this.sprites=this.filter(function(c){return!b(c)});this.updateLength()};c.SpriteList.prototype.toString=function(){return"[SpriteList "+this.length+" sprites]"};return c}(jaws||{});
jaws=function(c){function b(b,c,f,j,k){var g=document.createElement("canvas");g.width=j;g.height=k;g.getContext("2d").drawImage(b,c,f,j,k,0,0,g.width,g.height);return g}c.SpriteSheet=function(d){if(!(this instanceof arguments.callee))return new arguments.callee(d);this.image=c.isDrawable(d.image)?d.image:c.assets.data[d.image];this.orientation=d.orientation||"down";this.frame_size=d.frame_size||[32,32];this.frames=[];this.offset=d.offset||0;if(d.scale_image){var e=c.isDrawable(d.image)?d.image:c.assets.get(d.image);
this.frame_size[0]*=d.scale_image;this.frame_size[1]*=d.scale_image;d.image=c.gfx.retroScaleImage(e,d.scale_image)}if("down"==this.orientation)for(e=this.offset;e<this.image.width;e+=this.frame_size[0])for(var f=0;f<this.image.height;f+=this.frame_size[1])this.frames.push(b(this.image,e,f,this.frame_size[0],this.frame_size[1]));else for(f=this.offset;f<this.image.height;f+=this.frame_size[1])for(e=0;e<this.image.width;e+=this.frame_size[0])this.frames.push(b(this.image,e,f,this.frame_size[0],this.frame_size[1]))};
c.SpriteSheet.prototype.toString=function(){return"[SpriteSheet "+this.frames.length+" frames]"};return c}(jaws||{});
jaws=function(c){c.Parallax=function(b){if(!(this instanceof arguments.callee))return new arguments.callee(b);this.scale=b.scale||1;this.repeat_x=b.repeat_x;this.repeat_y=b.repeat_y;this.camera_x=b.camera_x||0;this.camera_y=b.camera_y||0;this.layers=[]};c.Parallax.prototype.draw=function(){for(var b,d,e=0;e<this.layers.length;e++){b=this.layers[e];d=this.repeat_x?-(this.camera_x/b.damping%b.width):-(this.camera_x/b.damping);b.y=this.repeat_y?-(this.camera_y/b.damping%b.height):-(this.camera_y/b.damping);
for(b.x=d;b.y<c.height;){for(;b.x<c.width&&!(0<=b.x+b.width&&0<=b.y+b.height&&b.draw(),b.x+=b.width,!this.repeat_x););b.y+=b.height;b.x=d;if(!this.repeat_y)break}}};c.Parallax.prototype.addLayer=function(b){b=new c.ParallaxLayer(b);b.scale(this.scale);this.layers.push(b)};c.Parallax.prototype.toString=function(){return"[Parallax "+this.x+", "+this.y+". "+this.layers.length+" layers]"};c.ParallaxLayer=function(b){if(!(this instanceof arguments.callee))return new arguments.callee(b);this.damping=b.damping||
0;c.Sprite.call(this,b)};c.ParallaxLayer.prototype=c.Sprite.prototype;return c}(jaws||{});
jaws=function(c){c.Animation=function(b){if(!(this instanceof arguments.callee))return new arguments.callee(b);this.options=b;this.frames=b.frames||[];this.frame_duration=b.frame_duration||100;this.index=b.index||0;this.loop=void 0==b.loop?1:b.loop;this.bounce=b.bounce||0;this.frame_direction=1;this.frame_size=b.frame_size;this.orientation=b.orientation||"down";this.on_end=b.on_end||null;this.offset=b.offset||0;if(b.scale_image){var d=c.isDrawable(b.sprite_sheet)?b.sprite_sheet:c.assets.get(b.sprite_sheet);
this.frame_size[0]*=b.scale_image;this.frame_size[1]*=b.scale_image;b.sprite_sheet=c.gfx.retroScaleImage(d,b.scale_image)}b.sprite_sheet&&(d=c.isDrawable(b.sprite_sheet)?b.sprite_sheet:c.assets.get(b.sprite_sheet),this.frames=(new c.SpriteSheet({image:d,frame_size:this.frame_size,orientation:this.orientation,offset:this.offset})).frames);this.current_tick=(new Date).getTime();this.last_tick=(new Date).getTime();this.sum_tick=0};c.Animation.prototype.update=function(){this.current_tick=(new Date).getTime();
this.sum_tick+=this.current_tick-this.last_tick;this.last_tick=this.current_tick;this.sum_tick>this.frame_duration&&(this.index+=this.frame_direction,this.sum_tick=0);if(this.index>=this.frames.length||0>this.index)this.bounce?(this.frame_direction=-this.frame_direction,this.index+=2*this.frame_direction):this.loop?this.index=0:(this.index-=this.frame_direction,this.on_end&&(this.on_end(),this.on_end=null));return this};c.Animation.prototype.slice=function(b,d){var e={};e.frame_duration=this.frame_duration;
e.loop=this.loop;e.bounce=this.bounce;e.on_end=this.on_end;e.frame_direction=this.frame_direction;e.frames=this.frames.slice().slice(b,d);return new c.Animation(e)};c.Animation.prototype.next=function(){this.update();return this.frames[this.index]};c.Animation.prototype.atLastFrame=function(){return this.index==this.frames.length-1};c.Animation.prototype.atFirstFrame=function(){return 0==this.index};c.Animation.prototype.currentFrame=function(){return this.frames[this.index]};c.Animation.prototype.toString=
function(){return"[Animation, "+this.frames.length+" frames]"};return c}(jaws||{});
jaws=function(c){c.Viewport=function(b){if(!(this instanceof arguments.callee))return new arguments.callee(b);this.options=b;this.context=b.context||c.context;this.width=b.width||c.width;this.height=b.height||c.height;this.max_x=b.max_x||c.width;this.max_y=b.max_y||c.height;this.x=b.x||0;this.y=b.y||0;var d=this;this.move=function(b,c){b&&(this.x+=b);c&&(this.y+=c);this.verifyPosition()};this.moveTo=function(b,c){void 0!=b&&(this.x=b);void 0!=c&&(this.y=c);this.verifyPosition()};this.isOutside=function(b){return!d.isInside(b)};
this.isInside=function(b){return b.x>=d.x&&b.x<=d.x+d.width&&b.y>=d.y&&b.y<=d.y+d.height};this.isPartlyInside=function(b){var c=b.rect();return c.right>=d.x&&c.x<=d.x+d.width&&c.bottom>=d.y&&b.y<=d.y+d.height};this.isLeftOf=function(b){return b.x<d.x};this.isRightOf=function(b){return b.x>d.x+d.width};this.isAbove=function(b){return b.y<d.y};this.isBelow=function(b){return b.y>d.y+d.height};this.centerAround=function(b){this.x=Math.floor(b.x-this.width/2);this.y=Math.floor(b.y-this.height/2);this.verifyPosition()};
this.forceInsideVisibleArea=function(b,d){b.x<this.x+d&&(b.x=this.x+d);b.x>this.x+c.width-d&&(b.x=this.x+c.width-d);b.y<this.y+d&&(b.y=this.y+d);b.y>this.y+c.height-d&&(b.y=this.y+c.height-d)};this.forceInside=function(b,c){b.x<c&&(b.x=c);b.x>this.max_x-c&&(b.x=this.max_x-c);b.y<c&&(b.y=c);b.y>this.max_y-c&&(b.y=this.max_y-c)};this.apply=function(b){this.context.save();this.context.translate(-this.x,-this.y);b();this.context.restore()};this.draw=function(b){this.apply(function(){b.forEach?b.forEach(d.drawIfPartlyInside):
b.draw&&d.drawIfPartlyInside(b)})};this.drawTileMap=function(b){var c=b.atRect({x:this.x,y:this.y,right:this.x+this.width,bottom:this.y+this.height});this.apply(function(){for(var b=0;b<c.length;b++)c[b].draw()})};this.drawIfPartlyInside=function(b){d.isPartlyInside(b)&&b.draw()};this.verifyPosition=function(){var b=this.max_x-this.width;0>this.x&&(this.x=0);this.x>b&&(this.x=b);b=this.max_y-this.height;0>this.y&&(this.y=0);this.y>b&&(this.y=b)};this.moveTo(b.x||0,b.y||0)};c.Viewport.prototype.toString=
function(){return"[Viewport "+this.x.toFixed(2)+", "+this.y.toFixed(2)+", "+this.width+", "+this.height+"]"};return c}(jaws||{});
jaws=function(c){c.TileMap=function(b){if(!(this instanceof arguments.callee))return new arguments.callee(b);this.cell_size=b.cell_size||[32,32];this.size=b.size||[100,100];this.sortFunction=b.sortFunction;this.cells=Array(this.size[0]);for(var c=0;c<this.size[0];c++){this.cells[c]=Array(this.size[1]);for(var e=0;e<this.size[1];e++)this.cells[c][e]=[]}};c.TileMap.prototype.clear=function(){for(var b=0;b<this.size[0];b++)for(var c=0;c<this.size[1];c++)this.cells[b][c]=[]};c.TileMap.prototype.sortCells=
function(b){for(var c=0;c<this.size[0];c++)for(var e=0;e<this.size[1];e++)this.cells[c][e].sort(b)};c.TileMap.prototype.push=function(b){var c=this;if(b.forEach)return b.forEach(function(b){c.push(b)}),b;if(b.rect)return this.pushAsRect(b,b.rect());var e=parseInt(b.x/this.cell_size[0]),f=parseInt(b.y/this.cell_size[1]);return this.pushToCell(e,f,b)};c.TileMap.prototype.pushAsPoint=function(b){if(Array.isArray(b)){for(var c=0;c<b.length;c++)this.pushAsPoint(b[c]);return b}var c=parseInt(b.x/this.cell_size[0]),
e=parseInt(b.y/this.cell_size[1]);return this.pushToCell(c,e,b)};c.TileMap.prototype.pushAsRect=function(b,c){for(var e=parseInt(c.x/this.cell_size[0]),f=parseInt((c.right-1)/this.cell_size[0]);e<=f;e++)for(var j=parseInt(c.y/this.cell_size[1]),k=parseInt((c.bottom-1)/this.cell_size[1]);j<=k;j++)this.pushToCell(e,j,b);return b};c.TileMap.prototype.pushToCell=function(b,c,e){this.cells[b][c].push(e);this.sortFunction&&this.cells[b][c].sort(this.sortFunction);return this};c.TileMap.prototype.at=function(b,
c){var e=parseInt(b/this.cell_size[0]),f=parseInt(c/this.cell_size[1]);return this.cells[e][f]};c.TileMap.prototype.atRect=function(b){var c=[];try{var e=parseInt(b.x/this.cell_size[0]);0>e&&(e=0);var f=parseInt(b.right/this.cell_size[0]);f>=this.size[0]&&(f=this.size[0]-1);var j=parseInt(b.y/this.cell_size[1]);0>j&&(j=0);var k=parseInt(b.bottom/this.cell_size[1]);k>=this.size[1]&&(k=this.size[1]-1);for(b=e;b<=f;b++)for(e=j;e<=k;e++)this.cells[b][e].forEach(function(b){-1==c.indexOf(b)&&c.push(b)})}catch(g){}return c};
c.TileMap.prototype.all=function(){for(var b=[],c=0;c<this.size[0];c++)for(var e=0;e<this.size[1];e++)this.cells[c][e].forEach(function(c){b.push(c)});return b};c.TileMap.prototype.cell=function(b,c){return this.cells[b][c]};c.TileMap.prototype.findPath=function(b,c,e){"undefined"==typeof e&&(e=!1);var f=parseInt(b[0]/this.cell_size[0]),j=parseInt(b[1]/this.cell_size[1]),k=parseInt(c[0]/this.cell_size[0]);c=parseInt(c[1]/this.cell_size[1]);if(f===k&&j===c)return[{x:b[0],y:b[1]}];for(var g=f,h=j,q=
0,n=0,r=2*this.size[0]*this.size[1]+1,p=Array(this.size[0]),m=0;m<this.size[0];m++){p[m]=Array(this.size[1]);for(var l=0;l<this.size[1];l++)p[m][l]=!1}p[g][h]={parent:[],G:0,score:r};b=Array(this.size[0]);for(m=0;m<this.size[0];m++){b[m]=Array(this.size[1]);for(l=0;l<this.size[1];l++)b[m][l]=!1}for(;!(g===k&&h===c);){l=[];0<g&&l.push([g-1,h]);g<this.size[0]-1&&l.push([g+1,h]);0<h&&l.push([g,h-1]);h<this.size[1]-1&&l.push([g,h+1]);for(m=0;m<l.length;m++){var t=l[m][0],u=l[m][1];if(n=0===this.cell(t,
u).length&&!e||0<this.cell(t,u).length&&e)n=b[t][u]?!0:!1,n=!n;if(n){var n=q+1,v;v=[t,u];var w=[k,c];v=Math.abs(w[0]-v[0])+Math.abs(w[1]-v[1]);n+=v;if(!p[t][u]||p[t][u]&&p[t][u].score>n)p[t][u]={parent:[g,h],G:q+1,score:n}}}h=[];t=[];g=r;for(m=q=0;m<this.size[0];m++)for(l=0;l<this.size[1];l++)p[m][l]&&p[m][l].score<g&&(h=[m,l],t=p[m][l].parent,g=p[m][l].score,q=p[m][l].G);if(0===h.length)return[];p[h[0]][h[1]]=!1;g=h[0];h=h[1];b[g][h]={parent:t}}e=[];k=b[g][h];for(e.unshift({x:g*this.cell_size[0],
y:h*this.cell_size[1]});!(g===f&&h===j);)g=k.parent[0],h=k.parent[1],e.unshift({x:g*this.cell_size[0],y:h*this.cell_size[1]}),k=b[g][h];return e};c.TileMap.prototype.lineOfSight=function(b,c,e){"undefined"==typeof e&&(e=!1);var f=b[0],j=c[0];b=b[1];c=c[1];var k=Math.abs(j-f),g=Math.abs(c-b),h,q;h=f<j?1:-1;q=b<c?1:-1;for(var n=k-g,r;!(f===j&&b===c);){if(e){if(0===this.at(f,b).length)return!1}else if(0<this.at(f,b).length)return!1;r=2*n;r>-g&&(n-=g,f+=h);r<k&&(n+=k,b+=q)}return!0};c.TileMap.prototype.toString=
function(){return"[TileMap "+this.size[0]+" cols, "+this.size[1]+" rows]"};return c}(jaws||{});"undefined"!==typeof module&&"exports"in module&&(module.exports=jaws.TileMap);
jaws=function(c){c.collideOneWithOne=function(b,d){return b.radius&&d.radius&&b!==d&&c.collideCircles(b,d)||b.rect&&d.rect&&b!==d&&c.collideRects(b.rect(),d.rect())?!0:!1};c.collideOneWithMany=function(b,d){return d.filter(function(d){return c.collideOneWithOne(b,d)})};c.collideManyWithMany=function(b,d){var e=[];if(b===d){for(var f=function(c){return void 0!==b.isSpriteList?b.at(c):b[c]},j=[],k=Array(2),g=0;2>g;g++)k[g]=g;for(var g=1,h=b.length;0<=g;h=b.length){for(j.push(k.map(f));0<=g&&k[g]==h-
1;)g--,h--;if(0<=g){k[g]+=1;for(g+=1;2>g;g++)k[g]=k[g-1]+1;g=1}}j.forEach(function(b){c.collideOneWithOne(b[0],b[1])&&e.push([b[0],b[1]])})}else b.forEach(function(b){d.forEach(function(d){c.collideOneWithOne(b,d)&&e.push([b,d])})});return e};c.collideCircles=function(b,d){return c.distanceBetween(b,d)<b.radius+d.radius};c.collideRects=function(b,c){return(b.x>=c.x&&b.x<=c.right||c.x>=b.x&&c.x<=b.right)&&(b.y>=c.y&&b.y<=c.bottom||c.y>=b.y&&c.y<=b.bottom)};c.distanceBetween=function(b,c){return Math.sqrt(Math.pow(b.x-
c.x,2)+Math.pow(b.y-c.y,2))};return c}(jaws||{});
jaws=function(c){c.gfx={};c.gfx.retroScaleImage=function(b,d){var e=c.isImage(b)?c.imageToCanvas(b):b,e=e.getContext("2d").getImageData(0,0,e.width,e.height).data,f=document.createElement("canvas");f.width=b.width*d;f.height=b.height*d;for(var j=f.getContext("2d"),k=j.createImageData(f.width,f.height),g=k.width,h=k.height,q=0;q<h;q+=1)for(var n=q*k.width,r=Math.floor(q/d)*b.width,p=0;p<g;p+=1){var m=4*(n+p),l=4*(r+Math.floor(p/d));k.data[m]=e[l];k.data[m+1]=e[l+1];k.data[m+2]=e[l+2];k.data[m+3]=e[l+
3]}j.putImageData(k,0,0);return f};return c}(jaws||{});window.addEventListener("load",function(){if(jaws.onload)jaws.onload()},!1);