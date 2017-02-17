//Data and Variable declarations
var timer;
var minutesLeft = 0;
var secondsLeft = 5;
var isOnBreak = false;
var numberOfBreaks = 0;

//Getting references the DOM
var minutes = document.querySelector('#minutes');
var seconds = document.querySelector('#seconds');
var startButton = document.querySelector('#start');
var pauseButton = document.querySelector('#pause');

//Initialization code

//Event listeners
startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
render(); //pushes the initial time dated into the DOM


//Function definitions
function start(){
  console.log(timer);
  if(!timer) {
    timer = setInterval(tick, 1000);
  }
}
function pause(){
  timer = clearInterval(timer);
}
function tick(){
  if (secondsLeft === 0 && minutesLeft === 0){
    clearInterval(timer);
    timer = !timer; //dereference, sets back to undefined state
    if(isOnBreak){
      numberOfBreaks += 1;
      resetWorkTime(); //on break is false, resets to 25
    } else {
      resetBreakTime(); //on break is true, resets to 5 to begin break
    }
    isOnBreak = !isOnBreak; //break switch - on/off
    render();
    return; //stops here so it doesn't increment and render again
  }
  decrementMinutes();
  decrementSeconds();
  render();
}
function decrementMinutes(){
  if(secondsLeft === 0) {
    minutesLeft -= 1;
  }
}
function decrementSeconds(){
  if(secondsLeft === 0){
    secondsLeft = 59;
  } else {
    secondsLeft -= 1;
  }
}
function render(){
  minutes.textContent = pad(minutesLeft);
  seconds.textContent = pad(secondsLeft);
}
function pad(num){ //sets 2 digit format - leading 0
  if (num < 10){
    return `0${num}`;
  } else {
    return num;
  }
}
function resetWorkTime(){
  minutesLeft = 00;
  secondsLeft = 05;
}
function resetBreakTime(){
  if(numberOfBreaks < 3){
    minutesLeft = 5;
  } else {
    minutesLeft = 15;
    numberOfBreaks = 0; //resets the Pomodoro time for next 3 interations
  }
  secondsLeft = 0; //pulled out of both functions to minimize code
}
