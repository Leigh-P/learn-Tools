var guesses=0;
var message="Guess the letter from a(lower) to z(higher)";
var letters=[
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
    "p","q","r","s","t","u","v","w","x","y","z"];
var today=new Date()
var letterToGuess="";
var HigherOrLower="";
var lettersGuessed;
var gameover=false;
function initGame(){
    var letterIndex=Math.floor(Math.random()*letters.length);
    letterToGuess=letters[letterIndex];
    guesses=0;
    lettersGuessed=[];
    gameover=false;
    window.addEventListener("keydown",eventKeyPressed,true);
    drawScreen();
}
function eventKeyPressed(e){
    if(!gameover){
        var letterPressed=String.fromCharCode(e.keyCode);
        letterPressed=letterPressed.toLowerCase();
        guesses++;
        lettersGuessed.push(letterPressed);

        if(letterPressed==letterToGuess){
            gameover=true;
        }
        else{
            letterIndex=letters.indexOf(letterToGuess);
            guessIndex=letters.indexOf(letterPressed);
            Debugger.log(guessIndex);
            if(guessIndex<0){
                HigherOrLower="That is not a letter"
            }
            else if(guessIndex>letterIndex){
                HigherOrLower="Lower"
            }
            else{
                HigherOrLower="Higher"
            }
        }
        drawScreen();
    }

}
function drawScreen(){
 //background
 context.fillStyle="#ffffaa";
 context.fillRect(0,0,500,300);
 //Box
 context.strokeStyle="#000000";
 context.strokeRect(5,5,490,290);
 
 context.textBaseline="top"
 //Date
 context.fillStyle="#000000";
 context.font="10px Sans-Serif";
 context.fillText(today,150,10);
 //Message
 context.fillStyle="#ff0000";
 context.font="14px Sans-Serif";
 context.fillText(message,125,30);
 //Guesses
 context.fillStyle="#109910";
 context.font="16px Sans-Serif";
 context.fillText('Guesses:'+guesses,215,50);
//HigherOrLower
context.fillStyle="ff0000";
context.font="16px Sans-Serif";
context.fillText("Letters Guessed:"+lettersGuessed.toString(),10,260)
if(gameover){
    context.fillStyle="#ff0000";
    context.font="40px Sans-Serif";
    context.fillText("You Got It!",150,180);
}
}
