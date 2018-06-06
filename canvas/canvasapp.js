window.addEventListener("load",eventWindowLoaded,false);
function eventWindowLoaded(){
    canvasApp();
}
var theCanvas =document.getElementById("canvasOne");
if(!theCanvas||!theCanvas.getContext){
    return;
}

function canvasSupport(){
    return !!document.createElement('canvas').getContext;
}
function canvasApp(){
    if(!canvasSupport){
        return;
    }
};
var context=theCanvas.getContext("2d");
context.fillstyle="#000000";
context.fillRect(0,0,500,300)
context.font="20px Sans-Serif";
context.textBaseline="top"
context.fillText("Hello World!",195,80)
var helloworldImage=new Image();
helloworldImage.onload=function(){
    context.drawImage(helloworldImage,160,130);
}
helloworldImage.src="helloworld.gif"

var Debugger=function(){};
Debugger.log=function(message){
    try {
        console.log(message)
    } catch (exception) {
        return;
    }
}