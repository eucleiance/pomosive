// Analog Clock
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const timeEl = document.querySelector(".time");
const toggleEl = document.querySelector(".toggle");
const pomostat = document.querySelector(".pomostat")
const controlBtn = document.getElementById("timerControlBtn");

// Stopwatch
let timer = null;
let startTime_P = 0;
let startTime_B = 0;
let elapsedTime = 0;
let timeElapsed_B = 0;
let isRunning = false;

// Pomodoro
const pomo_timer_const = 5;

let breakEnd = false;

let pomo_timer_unixt = 0;
let break_timer_unixt = 0;
let pomo_timer_total = 0;
let pomo_daily_total = 0;
let pomo_length = null;
let break_length = null;

let break_timer_total = 0;
let break_daily_total = 0;


let break_block = 0;

let ratingEldefault = document.getElementById("rating");
let rating_default_value = ratingEldefault.value;
// let f_rating = "flow"            // Distracted / OK / Focused / Flow
let f_rating = rating_default_value;

let work_block = 0;

let pomo_timer = pomo_timer_const;
let break_timer = break_block_calc(pomo_timer_total);


function breakUpdate() {
  const currentTime = Date.now()
  pomo_timer_total = (pomo_timer_total + 1);
  elapsedTime = pomo_timer_unixt - currentTime;
  if (elapsedTime <= 0) {
    clearInterval(pomo_timer);
    console.log("Timer End");
    console.log("Total Time Ran =", (pomo_timer_total / 100), "seconds");
    console.log("Today's Daily Total =", (pomo_daily_total / 100), "seconds");
    console.log("The Current Rating was", f_rating)
    elapsedTime = 0;
    isRunning = false;
    controlBtn.innerHTML = "Start";
  }
  UIUpdater(elapsedTime, "update")
}

function rating() {
  if (!isRunning) {
    let ratingEl = document.getElementById("rating");
    let rating_value = ratingEl.value;
    // var rating_text = ratingEl.options[ratingEl.selectedIndex].text;
    // console.log(rating_value);
    f_rating = rating_value;
    // console.log((pomo_timer_total / 100), "mins");
    // pomo((pomo_timer_total / 100), f_rating);
    pomo_timer_total = reset_or_not(f_rating) ? 0 : pomo_timer_total;

    // controlBtn.innerHTML = "Pause";
    // start()
  }
}


function pause() {
  if (isRunning) {
    clearInterval(pomo_timer);
    elapsedTime = Date.now() - startTime_P;
    // console.log(elapsedTime / 6000);
    isRunning = false;
  }
}

// function test() {
//   // let time_in_mins = (pomo_timer_c - Date.now()) / 60000
//   console.log(Date.now())
//   console.log((elapsedTime / 60000) % 60)
// }


function reset_or_not(rating) {
  if (rating == "distracted" || rating == "ok") {
    return true;
  }
  else {
    return false;
  }
}

function play() {
  if (pomo_daily_total <= 0) {      // Getting User Input Value if it's the first pomo of the day
    pomo_length = document.getElementById("userinput").value;
    // console.log(pomo_length, "mins");
  }
  console.log("---------------------------------------")
  pomo((pomo_length), f_rating);    // Details about 1st pomo
  start()
}

function start() {
  if (!isRunning) {   // If Not Running
    // startTime_P = Date.now() - elapsedTime;       // Start Time of Pomodoro = Time now - time elapsed
    // startTime_B = Date.now() - timeElapsed_B;     // Start Time of Break = Time now - time elapsed

    // break_timer_unixt = (Date.now() + (break_length * 1000)) - timeElapsed_B;   // Converting pomo time to unix
    // pomo_timer_unixt = (Date.now() + (pomo_length * 1000)) - elapsedTime;       // Converting break time to unix

    start_break();
    start_pomo();

    // if (break_length != 0) {
    //   if (breakEnd == false) {
    //     break_timer = setInterval(updateBreak(), 10);
    //   }
    // }
    // if (breakEnd == true) {
    //   pomo_timer = setInterval(update, 10);
    //   isRunning = true;
    // }

    // pomo_timer_unixt = (Date.now() + (pomo_length * 60 * 1000)) - elapsedTime;
    // break_timer = setInterval(updateBreak, 10);
  }
}


function start_pomo() {
  startTime_P = Date.now() - elapsedTime;       // Start Time of Pomodoro = Time now - time elapsed
  pomo_timer_unixt = (Date.now() + (pomo_length * 1000)) - elapsedTime;       // Converting break time to unix

  pomo_timer = setInterval(update, 5);
  isRunning = true;
}

function start_break() {
  if (break_daily_total != 0) {
    break_timer_total = 0;
  }
  // console.log("-- Executing start_break() function --")
  // console.log(Date.now(), "timenow", break_length, "mins", timeElapsed_B, "elapsed");
  break_timer_unixt = (Date.now() + (break_length * 1000)) - timeElapsed_B;   // Converting pomo time to unix
  break_timer = setInterval(updateBreak, 5);
  // console.log(break_timer_unixt)

}



function updateBreak() {
  const timeNow_B = Date.now();
  break_timer_total = (break_timer_total + 0.5);
  break_daily_total = (break_daily_total + 0.5);
  timeElapsed_B = break_timer_unixt - timeNow_B;
  if (timeElapsed_B <= 0) {
    clearInterval(break_timer);
    // console.log("---");
    // console.log("Break Ended");
    // console.log("---");
    timeElapsed_B = 0;
    breakEnd = true;
    return false;
  }
  UIUpdater(timeElapsed_B, "break")
}



function update() {
  const currentTime = Date.now()
  pomo_timer_total = (pomo_timer_total + 0.5);
  pomo_daily_total = (pomo_daily_total + 0.5);
  elapsedTime = pomo_timer_unixt - currentTime;
  if (elapsedTime <= 0) {
    clearInterval(pomo_timer);
    // console.log("Timer End");
    console.log("Total Time Ran =", Math.ceil((pomo_timer_total / 100) * 2) / 2, "seconds");
    console.log("Today's Daily Total =", Math.ceil((pomo_daily_total / 100) * 2) / 2, "seconds");
    console.log("The Current Rating was", f_rating)
    elapsedTime = 0;
    isRunning = false;
    controlBtn.innerHTML = "Start";
  }
  UIUpdater(elapsedTime, "update")
}






function stop() {
  if (isRunning) {
    clearInterval(pomo_timer);
    elapsedTime = Date.now() - startTime_P;
    // console.log(elapsedTime / 6000);
    isRunning = false;
  }
}

function reset() {
  clearInterval(pomo_timer);
  startTime_P = 0;
  elapsedTime = 0;
  isRunning = false;
  UIUpdater(elapsedTime, "reset")
}


function UIUpdater(elapsedTime, event) {
  if (event == "update") {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");
    milliseconds = milliseconds.slice(-2);

    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hours, 0, 11, 0, 360)}deg)`
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`
    timeEl.innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`

    pomostat.innerHTML =
      ` Cons. Pomo: ${Math.ceil((pomo_timer_total / 100) * 2) / 2} sec
    <br>
      Daily Pomo: ${Math.ceil((pomo_daily_total / 100) * 2) / 2} sec
    <br>
      Current Break: ${Math.ceil((break_timer_total / 100) * 2) / 2} sec
    <br>
      Daily Break: ${Math.ceil((break_daily_total / 100) * 2) / 2} sec
    `
  }
  else if (event == "reset") {
    timeEl.innerHTML = `00:00:00:00`
    hourEl.style.transform = null;
    minuteEl.style.transform = null;
    secondEl.style.transform = null;
    controlBtn.innerHTML = "Start";
    pomostat.innerHTML =
      ` Cons. Pomo: 0 sec
    <br>
      Daily Pomo: ${Math.ceil((pomo_daily_total / 100) * 2) / 2} sec
    <br>
      Current Break: ${Math.ceil((break_timer_total / 100) * 2) / 2} sec
    <br>
      Daily Break: ${Math.ceil((break_daily_total / 100) * 2) / 2} sec


    `
  }
  else if (event == "break") {
    pomostat.innerHTML =
      ` Cons. Pomo: ${Math.ceil((pomo_timer_total / 100) * 2) / 2} sec
    <br>
      Daily Pomo: ${Math.ceil((pomo_daily_total / 100) * 2) / 2} sec
    <br>
      Current Break: ${Math.ceil((break_timer_total / 100) * 2) / 2} sec
    <br>
      Daily Break: ${Math.ceil((break_daily_total / 100) * 2) / 2} sec
    `
  }
}


function toggle() {
  const html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    toggleEl.innerHTML = "Dark Mode";
  } else {
    html.classList.add("dark");
    toggleEl.innerHTML = "Light Mode";
  }
}

function timerControl() {
  if (!isRunning) {
    controlBtn.innerHTML = "Pause";
    play();
  }
  else {
    controlBtn.innerHTML = "Resume";
    pause();
  }
}


// toggleEl.addEventListener("click", (e) => {
//   const html = document.querySelector("html");
//   if (html.classList.contains("dark")) {
//     html.classList.remove("dark");
//     e.target.innerHTML = "Dark Mode";
//   } else {
//     html.classList.add("dark");
//     e.target.innerHTML = "Light Mode";
//   }
// })


const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}




function pomo(total_run_time, focus_rating) {
  switch (focus_rating) {
    case "distracted":
      pomo_timer_total = 0;
      console.log("Dist. Starting new work block of", distracted_work_block_calc(total_run_time), "mins After a break of ", break_block_calc(total_run_time), " mins")
      pomo_length = distracted_work_block_calc(total_run_time);
      break_length = break_block_calc(total_run_time);
      break;

    case "ok":
      pomo_timer_total = 0;
      console.log("OK. Starting new work block for", ok_work_block_calc(total_run_time), "after a break of", break_block_calc(total_run_time), " mins");
      pomo_length = ok_work_block_calc(total_run_time);
      break_length = break_block_calc(total_run_time);
      break;

    case "focused":
      if (focused_work_block_calc(total_run_time) == 0) {
        console.log("Foc. Starting a break for 30 mins")
        pomo_timer_total = 0;
        break_length = 30;
      }
      else {
        console.log("Foc. Resuming Work Block for ", focused_work_block_calc(total_run_time), " mins")
        pomo_length = focused_work_block_calc(total_run_time);
        break_length = 0;
      }
      break;

    case "flow":
      if (flow_work_block_calc(total_run_time) == 0) {
        console.log("Flo. Reached Max Focus Time, Starting a break for ", break_block_calc(total_run_time), " mins")
        pomo_timer_total = 0;
        break_length = break_block_calc(total_run_time)
      }
      else {
        console.log("Flo. Starting Work Block for ", flow_work_block_calc(total_run_time), " mins")
        pomo_length = flow_work_block_calc(total_run_time);
        break_length = 0;
      }
      break;
  }
}

// Distracted Function
function distracted_work_block_calc(prev_rtime) {
  if (prev_rtime <= 1) {
    return 1;
  }
  else {
    return Math.ceil((prev_rtime * 0.5) * 2) / 2;
  }
}

// OK Function
function ok_work_block_calc(r_time) {
  if (r_time <= 90) {
    if ((r_time * 1.5) > 90) {
      return 90;
    }
    else {
      return Math.ceil((r_time * 1.5) * 2) / 2;
    }
  }
  else {
    return 90;
  }
}

// Focused Function 
function focused_work_block_calc(total_rtime) {
  if (total_rtime >= 90) {
    return 0;
  }
  else if ((total_rtime * 2) > 90) {
    return Math.ceil((90 - total_rtime) * 2) / 2;
  }
  else {
    return Math.ceil((total_rtime * 2) * 2) / 2;
  }
}

// Flow Function
function flow_work_block_calc(total_rtime) {
  if (total_rtime >= 90) {
    return 0;
  }
  else {
    return Math.ceil((90 - total_rtime) * 2) / 2;
  }
}

// Break Function
function break_block_calc(r_time) {
  let break_block = Math.ceil((r_time * 0.33) * 2) / 2
  if (break_block > 30) {
    return 30;
  }
  else {
    return break_block;
  }
}

// Rating Function 
// function rating() {
//   console.log("yo", selectedValue)
// }


