document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('examTimerBtn');
    const timerDisplay = document.getElementById('timerDisplay');
    const timeLeftDisplay = document.getElementById('timeLeft');

    let timeLeft = 10 * 60; // Example: 10 minutes

    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        timeLeftDisplay.textContent = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
    }

    function startTimer() {
        timerDisplay.style.display = 'block';
        startBtn.disabled = true; // Disable the button after starting the exam

        const timerId = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerId);
                timerDisplay.textContent = 'Time is up!';
                // You can add more actions here, e.g., submitting the exam automatically
            } else {
                timeLeft -= 1;
                updateTimerDisplay(timeLeft);
            }
        }, 1000);
    }

    startBtn.addEventListener('click', startTimer);
});
