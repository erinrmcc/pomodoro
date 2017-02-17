var PomodoroTimer = { //capitalized because basically this is the application, explained more in ES6
  minutesLeft: 0,
  secondsLeft: 5,
  isOnBreak: false,
  numberOfBreaks: 0,
  init: function(){
    this.cacheDom();
    this.addListeners();
    this.render();
  },
  cacheDom: function(){
    this.minutes = document.querySelector('#minutes'); //using this defines these variables and keeps it contained to this application
    this.seconds = document.querySelector('#seconds');
    this.startButton = document.querySelector('#start');
    this.pauseButton = document.querySelector('#pause');
  },
  render: function(){
    this.minutes.textContent = this.pad(this.minutesLeft);
    this.seconds.textContent = this.pad(this.secondsLeft);
  },
  addListeners: function(){  //must use this here to ensure it looks inside this object for the variable
    this.startButton.addEventListener('click', this.start.bind(this));  //the bind statement takes the meaning of 'this' from addListeners and pushes that meaning into the start function
    this.pauseButton.addEventListener('click', this.pause.bind(this));
  },
  start: function(){
    if(!this.timer) {
      this.timer = setInterval(this.tick.bind(this), 1000); //setIntervals parent is the Window, so we must bind this as well for tick to work using this
    }
  },
  pause: function(){
    this.timer = clearInterval(this.timer);
  },
  tick: function(){
    if (this.secondsLeft === 0 && this.minutesLeft === 0){
      clearInterval(this.timer);
      this.timer = !this.timer; //dereference, sets back to undefined state
      if(this.isOnBreak){
        this.numberOfBreaks += 1;
        this.resetWorkTime(); //on break is false, resets to 25
      } else {
        this.resetBreakTime(); //on break is true, resets to 5 to begin break
      }
      this.isOnBreak = !this.isOnBreak; //break switch - on/off
      this.render();
      return; //stops here so it doesn't increment and render again
    }
    this.decrementMinutes();
    this.decrementSeconds();
    this.render();
  },
  decrementMinutes: function(){
    if(this.secondsLeft === 0) {
      this.minutesLeft -= 1;
    }
  },
  decrementSeconds: function(){
    if(this.secondsLeft === 0){
      this.secondsLeft = 59;
    } else {
      this.secondsLeft -= 1;
    }
  },
  pad: function(num){
      if (num < 10){
        return `0${num}`;
      } else {
        return num;
      }
  },
  resetWorkTime: function(){
    this.minutesLeft = 00;
    this.secondsLeft = 05;
  },
  resetBreakTime: function(){
    if(this.numberOfBreaks < 3){
      this.minutesLeft = 5;
    } else {
      this.minutesLeft = 15;
      this.numberOfBreaks = 0; //resets the Pomodoro time for next 3 interations
    }
    this.secondsLeft = 0;
  },
};

PomodoroTimer.init();

//Data and Variable declarations
// var timer;
// var minutesLeft = 0;
// var secondsLeft = 5;
// var isOnBreak = false;
// var numberOfBreaks = 0;

//Getting references the DOM
// var minutes = document.querySelector('#minutes');
// var seconds = document.querySelector('#seconds');
// var startButton = document.querySelector('#start');
// var pauseButton = document.querySelector('#pause');

//Initialization code

//Event listeners
// startButton.addEventListener('click', start);
// pauseButton.addEventListener('click', pause);
// render(); //pushes the initial time dated into the DOM


//Function definitions
// function start(){
//   console.log(timer);
//   if(!timer) {
//     timer = setInterval(tick, 1000);
//   }
// }
// function pause(){
//   timer = clearInterval(timer);
// }
// function tick(){
//   if (secondsLeft === 0 && minutesLeft === 0){
//     clearInterval(timer);
//     timer = !timer; //dereference, sets back to undefined state
//     if(isOnBreak){
//       numberOfBreaks += 1;
//       resetWorkTime(); //on break is false, resets to 25
//     } else {
//       resetBreakTime(); //on break is true, resets to 5 to begin break
//     }
//     isOnBreak = !isOnBreak; //break switch - on/off
//     render();
//     return; //stops here so it doesn't increment and render again
//   }
//   decrementMinutes();
//   decrementSeconds();
//   render();
// }
// function decrementMinutes(){
//   if(secondsLeft === 0) {
//     minutesLeft -= 1;
//   }
// }
// function decrementSeconds(){
//   if(secondsLeft === 0){
//     secondsLeft = 59;
//   } else {
//     secondsLeft -= 1;
//   }
// }
// function render(){
//   minutes.textContent = pad(minutesLeft);
//   seconds.textContent = pad(secondsLeft);
// }
// function pad(num){ //sets 2 digit format - leading 0
//   if (num < 10){
//     return `0${num}`;
//   } else {
//     return num;
//   }
// }
// function resetWorkTime(){
//   minutesLeft = 00;
//   secondsLeft = 05;
// }
// function resetBreakTime(){
//   if(numberOfBreaks < 3){
//     minutesLeft = 5;
//   } else {
//     minutesLeft = 15;
//     numberOfBreaks = 0; //resets the Pomodoro time for next 3 interations
//   }
//   secondsLeft = 0; //pulled out of both functions to minimize code
// }
