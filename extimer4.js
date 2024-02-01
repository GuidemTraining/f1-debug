$(document).ready(function() {
    var duration = 5 * 60; // Example duration: 5 minutes in seconds
    var startTime = null; // Track when the timer was started
    var timer;

    function updateTimerDisplay(remainingDuration) {
        var minutes = parseInt(remainingDuration / 60, 10);
        var seconds = parseInt(remainingDuration % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $('#timeLeft').text(minutes + ":" + seconds);
    }

    function startTimer() {
        if (!startTime) { // Only set start time if not already running
            startTime = Date.now();
            $('#timerDisplay').show(); // Show the timer display
            $('#examTimerBtn').prop('disabled', true); // Disable button after starting
        }

        if (timer) return; // Prevent multiple intervals if already running

        timer = setInterval(function() {
            var elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
            var remainingDuration = duration - elapsedSeconds;
            updateTimerDisplay(remainingDuration);

            if (remainingDuration <= 0) {
                clearInterval(timer);
                $('#timerDisplay').hide();
                $('#examTimerBtn').prop('disabled', false); // Optionally re-enable button or handle exam end
                // Handle exam time expiration...
            }
        }, 1000);
    }

    $('#examTimerBtn').click(startTimer);

    // Check if the timer needs to be running (e.g., on page load or content change)
    if (startTime) {
        var elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        if (elapsedSeconds < duration) {
            startTimer(); // Continue running timer if it hasn't finished yet
        }
    }

    // Example of handling content change without resetting the timer
    if (typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function() {
            // No action taken here to stop/reset timer; it continues running
        });
    }
});
