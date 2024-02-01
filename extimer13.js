// timer.js

// Function to update the timer display
function updateTimerDisplay(timerValue) {
    document.getElementById("timerField").textContent = timerValue;
}

// Function to start a 24-hour timer
function start24HourTimer() {
    var timer = 24 * 60 * 60; // 24 hours in seconds

    var intervalId = setInterval(function () {
        if (timer <= 0) {
            clearInterval(intervalId);
            updateTimerDisplay("Timer Expired");
        } else {
            var hours = Math.floor(timer / 3600);
            var minutes = Math.floor((timer % 3600) / 60);
            var seconds = timer % 60;
            var timerValue = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
            updateTimerDisplay(timerValue);
            timer--;
        }
    }, 1000);
}

// Function to format time with leading zeros (e.g., 01, 02, 03)
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

// Example usage:
// Call start24HourTimer when the "Start Exam" button is clicked
// document.getElementById("startExamBtn").addEventListener("click", function () {
//     start24HourTimer();
// });
