document.addEventListener("DOMContentLoaded", function () {
    // Function to start the exam
    function startExam() {
        // Add your code to start the exam here
        console.log('Exam started.');

        // Hide the "Start Exam" button
        examTimerBtn.style.display = "none";

        // Show the timer display
        var timerDisplay = document.getElementById("timerDisplay");
        if (timerDisplay) {
            timerDisplay.style.display = "block";
        }

        // Set the timer duration (adjust as needed, e.g., 60 seconds)
        var duration = 60;
        var timeLeft = document.getElementById("timeLeft");

        // Start the timer
        var intervalId = setInterval(function () {
            var hours = Math.floor(duration / 3600);
            var minutes = Math.floor((duration % 3600) / 60);
            var seconds = duration % 60;

            timeLeft.innerText = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);

            if (duration <= 0) {
                clearInterval(intervalId);
                // Timer reached zero, you can add code to handle this event
                alert("Time's up!");
            } else {
                duration--;
            }
        }, 1000);
    }

    // Function to format time (you can modify this as needed)
    function formatTime(time) {
        return time < 10 ? "0" + time : time;
    }

    // Define an event listener for the "Start Exam" button
    var examTimerBtn = document.getElementById("examTimerBtn");
    if (examTimerBtn) {
        examTimerBtn.addEventListener("click", startExam);
    }

    // Check for the existence of CoursePlayerV2 and register the onContentChange event handler
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', onContentChange);
    }

    // Define the onContentChange event handler
    function onContentChange() {
        // Add your code to handle content change in CoursePlayerV2 here
        console.log('Course content changed.');

        // Add an event listener to the "Start Exam" button after content change
        if (examTimerBtn) {
            examTimerBtn.addEventListener("click", startExam);
        }
    }
});
