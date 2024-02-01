// Initialize user-related variables
var userId, userName, userEmail, userFirstName;
var startTimeDisplay = document.getElementById('clickTime'); // Get the reference to the start time display

// Function to start the exam and get the timer from the server
function startExam() {
    if (!userId) {
        console.error('User ID is missing');
        return;
    }

    // Prepare the data to be sent in the request
    const requestData = { userId };

    // Log the data before sending the request
    console.log('Data to be sent to the server:', requestData);

    // Log the start time to the console
    const startTime = new Date();
    console.log('Start Exam button clicked at ' + startTime);

    // Display the start time in the HTML
    startTimeDisplay.textContent = 'Start time: ' + startTime;

    // Make a POST request to the server to start the exam
    fetch('/start-exam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData), // Send the data in the request body
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const timerValue = data.timer;
            const endTime = data.endTime; // Get the end time from the server response
            updateTimerDisplay(timerValue, endTime);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to update the timer display
function updateTimerDisplay(timerValue, endTime) {
    const timerDisplay = document.getElementById('timerDisplay');
    const endTimeDisplay = document.getElementById('endTime');
    const countdownDisplay = document.getElementById('countdown');

    // Display the timer and end time
    timerDisplay.textContent = 'Timer: ' + timerValue;
    endTimeDisplay.textContent = 'End Time: ' + endTime;

    // Calculate and display the countdown timer
    const currentTime = new Date().getTime();
    const countDownTime = new Date(endTime).getTime();
    const timeRemaining = countDownTime - currentTime;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    countdownDisplay.textContent = 'Countdown: ' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';

    console.log('Timer value updated:', timerValue);
    console.log('End Time:', endTime);
    console.log('Countdown:', days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's');
}

// Event listener for the "Yes" button in the modal
document.getElementById('confirmStart').addEventListener('click', function () {
    console.log('Yes button clicked');
    // Call the startExam function here
    startExam();
});

// Event listener for the "Cancel" button in the modal
document.getElementById('cancelStart').addEventListener('click', function () {
    console.log('Cancel button clicked');
    // Reset the start time display
    startTimeDisplay.textContent = 'Start time will be displayed here';
});
