document.addEventListener("DOMContentLoaded", function () {
    // Define an event listener for the "Start Exam" button
    function startExam() {
        // Add your code to start the exam here
        console.log('Exam started.');
    }

    // Load the event listener initially
    document.getElementById("examTimerBtn").addEventListener("click", startExam);

    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function () {
            // Remove the existing event listener
            document.getElementById("examTimerBtn").removeEventListener("click", startExam);

            // Add the event listener after content changes
            document.getElementById("examTimerBtn").addEventListener("click", function () {
                // Add your code to start the exam here after content change
                console.log('Exam started after content change.');
            });
        });
    }

    // Function to start the timer (you can modify this as needed)
    function startTimer() {
        // Timer logic
    }

    // Function to format time (you can modify this as needed)
    function formatTime(time) {
        // Time formatting logic
    }
});
