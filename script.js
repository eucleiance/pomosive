// 5 Ratings 
// Distracted -> I want to or started doing smth else
// Okay-ish -> I'm sort of exploring my work
// Focused - Getting the hang of it -> I'm not reaching for my phone
// Flow - I'm highly motivated -> I don't wanna take a break

// Start with 5 min work block
// Rate it
// If Distracted, Lower Work Block Time - by 1/2 -> 2.5 mins
// Rate it 
// If Okay-ish -> Bump it up by 4x to 10 mins -> After a break of 1/3 of the work block
// Rate it 
// If Okay-ish -> Bump it up by 2x to 20 mins -> After a break of 1/3 of the work block
// Rate it 
// If Flowing -> Bump it up by 2x to 40 mins -> After a break of 1/3 of the work block
// Rate it-
// If the pomo has been going on for 90 mins -> Forcibly initiate a break of 30 mins

// Increment Rules
// Distracted -> Divide by 2 

// Okay-ish
// 2.5 mins -> 10 mins -> 3 mins  -> 5 mins
// 10 mins  -> 20 mins -> 6 mins  -> 10 mins
// 20 mins  -> 40 mins -> 13 mins -> 15 mins
// 40 mins  -> 90 mins -> 30 mins -> 30 mins

// Focused 
// 2.5 mins -> 10 mins -> No Break
// 10 mins  -> 20 mins -> No Break
// 20 mins  -> 40 mins -> No Break

// Break Tip
// Do something that is autonomous and doesn't require any thinking


// Analog Clock
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const timeEl = document.querySelector(".time");
const toggleEl = document.querySelector(".toggle");

// Stopwatch
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

// Pomodoro
const pomo_timer_const = 0.1;

let pomo_timer = pomo_timer_const;
let pomo_timer_unixt = 0;
let pomo_timer_total = 0;
let pomo_daily_total = 0;

let ratingEldefault = document.getElementById("rating");
let rating_default_value = ratingEldefault.value;
// let f_rating = "flow"            // Distracted / OK / Focused / Flow
let f_rating = rating_default_value;

let work_block = 0;
let break_block = 0;

let run_time_i = 38;
let total_run_time_i = 0;



for (let i = 1; i < 99; i += 0.5) {
  console.log(i, "mins")
  pomo(i, i, f_rating);
}

function rating() {
  var ratingEl = document.getElementById("rating");
  var rating_value = ratingEl.value;
  // var rating_text = ratingEl.options[ratingEl.selectedIndex].text;
  console.log(rating_value);
  f_rating = rating_value;
  pomo_timer_total = reset_or_not(f_rating) ? 0 : pomo_timer_total;
  start()
}

function test() {
  // let time_in_mins = (pomo_timer_c - Date.now()) / 60000
  console.log(Date.now())
  console.log((elapsedTime / 60000) % 60)
}
function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    pomo_timer_unixt = (Date.now() + (pomo_timer * 60 * 1000)) - elapsedTime;
    timer = setInterval(update, 10);
    isRunning = true;
  }
}
function stop() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    console.log(elapsedTime / 1000);
    isRunning = false;
  }
}
function reset() {
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  timeEl.innerHTML = `00:00:00:00`
  hourEl.style.transform = null;
  minuteEl.style.transform = null;
  secondEl.style.transform = null;
}


function update() {
  const currentTime = Date.now()
  pomo_timer_total = (pomo_timer_total + 1);
  pomo_daily_total = (pomo_daily_total + 1);
  elapsedTime = pomo_timer_unixt - currentTime;
  if (elapsedTime <= 0) {
    clearInterval(timer);
    console.log("Timer End");
    console.log("Total Time Ran =", (pomo_timer_total / 100), "seconds");
    console.log("Today's Daily Total =", (pomo_daily_total / 100), "seconds");
    console.log("The Current Rating was", f_rating)
    elapsedTime = 0;
    isRunning = false;
    // pomo_timer_total = reset_or_not(f_rating) ? 0 : pomo_timer_total;
  }

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
}

function reset_or_not(rating) {
  if (rating == "distracted" || rating == "ok") {
    return true;
  }
  else {
    return false;
  }
}

toggleEl.addEventListener("click", (e) => {
  const html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    e.target.innerHTML = "Dark Mode";
  } else {
    html.classList.add("dark");
    e.target.innerHTML = "Light Mode";
  }
})


const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}




function pomo(run_time, total_run_time, focus_rating) {
  switch (focus_rating) {
    case "distracted":
      total_run_time_i = 0;
      console.log("Dist. Starting new work block of", distracted_work_block_calc(run_time), "mins After a break of ", break_block_calc(run_time), " mins")
      break;

    case "ok":
      total_run_time_i = 0;
      console.log("OK. Starting new work block for", ok_work_block_calc(run_time), "after a break of", break_block_calc(run_time), " mins");
      break;

    case "focused":
      if (focused_work_block_calc(total_run_time) == 0) {
        console.log("Foc. Starting a break for 30 mins")
        total_run_time_i = 0;
      }
      else {
        console.log("Foc. Resuming Work Block for ", focused_work_block_calc(total_run_time), " mins")
      }
      break;

    case "flow":
      if (flow_work_block_calc(total_run_time) == 0) {
        console.log("Flo. Reached Max Focus Time, Starting a break for ", break_block_calc(total_run_time), " mins")
        total_run_time_i = 0;
      }
      else {
        console.log("Flo. Starting Work Block for ", flow_work_block_calc(total_run_time), " mins")
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

