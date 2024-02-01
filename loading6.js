window.onload = function() {
    // Create the modal element
    var modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backdropFilter = 'blur(10px)'; // Apply blur effect
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Slightly dark background to enhance blur
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    modal.style.transition = 'opacity 1s ease-out'; // Fade out transition
    modal.style.opacity = '1';

    // Create the loading bar element
    var loadingBar = document.createElement('div');
    loadingBar.style.width = '50%';
    loadingBar.style.height = '30px';
    loadingBar.style.backgroundColor = '#333'; // Modern dark background for the bar
    loadingBar.style.borderRadius = '15px';
    loadingBar.style.overflow = 'hidden';
    loadingBar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.5)'; // Adding some shadow

    // Create the progress element inside the loading bar
    var progress = document.createElement('div');
    progress.style.width = '0';
    progress.style.height = '100%';
    progress.style.backgroundColor = '#4caf50'; // Green progress color
    progress.style.transition = 'width 2s ease-in-out'; // Smooth width transition
    progress.style.borderRadius = '15px'; // Rounded corners for the progress bar

    // Append the progress bar to the loading bar, and the loading bar to the modal
    loadingBar.appendChild(progress);
    modal.appendChild(loadingBar);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Animate the progress bar
    setTimeout(function() {
        progress.style.width = '100%';
    }, 100);

    // Start fade out after 4 seconds
    setTimeout(function() {
        modal.style.opacity = '0';
    }, 4000);

    // Remove the modal after the fade out transition
    setTimeout(function() {
        document.body.removeChild(modal);
    }, 5000); // 1 second after fade out starts
};
