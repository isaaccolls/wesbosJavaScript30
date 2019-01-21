console.log('xD');
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // Don't use this, because it can stop when open a new tab, scrolling, etc
  // setInterval(handler: any, timeout?: long, arguments...: any)

  // clear any existing timer
  clearInterval(countdown);
  
  const now = Date.now();
  // now is in millisecond
  const then = now + seconds * 1000;
  console.log({ now, then });
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    // const secondsLeft = (then - Date.now()) / 1000;
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    
    // check if we should stop it!
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      return;
    }

    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
 }

 function displayTimeLeft(seconds) {
  // console.log(seconds);
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  // console.log({minutes, remainderSeconds});
  // const display = `${minutes}:${remainderSeconds}`;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
 }

 function displayEndTime(timeStamp) {
  const end = new Date(timeStamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  // endTime.textContent = `Be Backt At ${hour}:${minutes}`;
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  endTime.textContent = `Be Backt At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
 }

 function startTimer() {
  // console.log(this);
  // console.log(this.dataset);
  // console.log(this.dataset.time);
  const seconds = parseInt(this.dataset.time);
  // console.log(seconds);
  timer(seconds);
 }

 buttons.forEach(button => button.addEventListener('click', startTimer));

  // this is because the "element" has a attribute name
  document.customForm.addEventListener('submit', function(e) {
    // para que no se ejecute la peticion get al tratar de enviar y recargue la pag.
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    // clean the input
    this.reset();
  });