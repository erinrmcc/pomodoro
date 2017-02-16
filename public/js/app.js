//Data and Variable declarations
var timer;
var minutesLeft = 25;
var secondsLeft = 0;
var isOnBreak = false;
var numberOfBreaks = 0;

//Getting references the DOM
var minutes = document.querySelector('#minutes');
var seconds = document.querySelector('#seconds');
var startButton = document.querySelector('#start');

//Initialization code

//Event listeners
startButton.addEventListener('click', start);

//Function definitions
function start(){
  if(!timer) {
    timer = setInterval(tick, 1000)
  }
}
function tick(){
  console.log('tick');
}
function render(){}
