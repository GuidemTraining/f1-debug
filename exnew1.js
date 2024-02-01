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
            updateTimerDisplay(timerValue);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to update the timer display
function updateTimerDisplay(timerValue) {
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.textContent = 'Timer: ' + timerValue;
    console.log('Timer value updated:', timerValue);
}

// jQuery event listener for the "Start Exam" button
$(document).on('click', '#startButton', function () {
    console.log('Start Exam button clicked');
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
        console.log('Content changed. Starting the exam.');
        startExam();
    });
}
