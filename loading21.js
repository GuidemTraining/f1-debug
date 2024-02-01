window.onload = function() {
    // Create the modal element
    var modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        left: 50%; top: 50%;
        transform: translate(-50%, -50%);
        width: 70%; // Cover 70% of the screen width
        min-height: 70vh; // Cover 70% of the screen height
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        display: flex; flex-direction: column;
        align-items: center;
        justify-content: center; // Center content vertically
        z-index: 1000;
        transition: opacity 1s ease-out;
        opacity: 1;
    `;

    // Create the loading messages
    var loadingMessages = document.createElement('div');
    loadingMessages.style.cssText = `
        color: #333;
        font-size: 20px;
        margin-bottom: 20px;
        text-align: center;
        font-family: Arial, sans-serif;
    `;
    loadingMessages.textContent = 'Loading user profile...';

    // Create the loading bar container
    var loadingBarContainer = document.createElement('div');
    loadingBarContainer.style.cssText = `
        width: 100%; height: 25px;
        background-color: #e0e0e0;
        border-radius: 10px;
        overflow: hidden;
    `;

    // Create the progress element inside the loading bar
    var progress = document.createElement('div');
    progress.style.cssText = `
        width: 0; height: 100%;
        background-color: #4caf50;
        transition: width 2s ease-in-out;
        border-radius: 10px;
    `;

    // Append elements to modal
    loadingBarContainer.appendChild(progress);
    modal.appendChild(loadingMessages);
    modal.appendChild(loadingBarContainer);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Update message and animate progress bar
    setTimeout(function() {
        progress.style.width = '50%';
        loadingMessages.textContent = 'Preparing your module...';
    }, 1000);

    // Complete the progress bar
    setTimeout(function() {
        progress.style.width = '100%';
    }, 2000);

    // Start fade out after 4 seconds
    setTimeout(function() {
        modal.style.opacity = '0';
    }, 4000);

    // Remove the modal after the fade-out transition
    setTimeout(function() {
        document.body.removeChild(modal);
    }, 5000);
};
