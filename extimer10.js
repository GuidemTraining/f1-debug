// Set the date we're counting down to
var countDownDate = new Date("March 5, 2024 15:37:25").getTime();

// Create a new div for the countdown timer
var countdownContainer = document.createElement("div");
countdownContainer.style.textAlign = "center";
countdownContainer.style.fontSize = "60px";

// Create a new p element for the timer display
var timerDisplay = document.createElement("p");
timerDisplay.id = "demo";

// Append the timerDisplay to the countdownContainer
countdownContainer.appendChild(timerDisplay);

// Append the countdownContainer to the body
document.body.appendChild(countdownContainer);

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Set the content of the timerDisplay
  timerDisplay.textContent = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    
  // If the count down is over, clear the interval and update the timerDisplay
  if (distance < 0) {
    clearInterval(x);
    timerDisplay.textContent = "EXPIRED";
  }
}, 1000);
</script>
