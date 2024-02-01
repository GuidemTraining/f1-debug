var countDownDate = new Date("March 5, 2024 15:37:25").getTime();

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
    
  // Format the countdown timer value
  var timerValue = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // Set the content of the timerInput field
  document.getElementById("timerInput").value = timerValue;
    
  // If the count down is over, clear the interval and update the timerInput field
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timerInput").value = "EXPIRED";
  }
}, 1000);
