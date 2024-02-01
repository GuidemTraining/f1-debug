// Initialize user-related variables
var userId, userName, userEmail, userFirstName;

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

// jQuery event listener for the "Start Exam" button
$(document).on('click', '#startButton', function () {
    console.log('Start Exam button clicked at ' + new Date()); // Log the button click time
    // Start the exam when the button is clicked
    startExam();
});

// Add an event listener for the content change event
if (typeof (CoursePlayerV2) !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function (data) {
        // Update user-related variables with the received data
        userId = data.user.id;
        userName = data.user.full_name;
        userEmail = data.user.email;
        userFirstName = data.user.first_name;

        // You can use these user-related variables as needed
        console.log('User ID:', userId);
        console.log('User Name:', userName);
        console.log('User Email:', userEmail);
        console.log('User First Name:', userFirstName);

        // Automatically start the exam when content changes (you can change this behavior)
        console.log('Content changed. Starting the exam at ' + new Date());
        startExam();
    });
}
