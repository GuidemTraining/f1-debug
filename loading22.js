window.onload = function() {
    // Create the modal element
    var modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        left: 0; top: 0;
        width: 100%; height: 100%;
        z-index: 1000; // Ensure this is above other content
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 1s ease-out;
        opacity: 1;
    `;

    // Create the blur and darken background effect
    var backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: absolute;
        left: 0; top: 0;
        width: 100%; height: 100%;
        backdrop-filter: blur(5px);
        background-color: rgba(0, 0, 0, 0.5);
        z-index: -1;
    `;

    // Create the loading container that will hold messages and loading bar
    var loadingContainer = document.createElement('div');
    loadingContainer.style.cssText = `
        position: relative;
        width: 70%; // This will cover most of the screen
        max-width: 600px; // Adjust based on your requirements
        padding: 20px;
        background: #fff;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    `;

    // Create the loading message
    var loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'Preparing your module...';
    loadingMessage.style.cssText = `
        color: #333;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: bold;
    `;

    // Create the loading bar container
    var loadingBarContainer = document.createElement('div');
    loadingBarContainer.style.cssText = `
        width: 100%;
        background-color: #e0e0e0;
        border-radius: 15px;
        overflow: hidden;
    `;

    // Create the progress element inside the loading bar container
    var progress = document.createElement('div');
    progress.style.cssText = `
        width: 0%;
        height: 20px;
        background-color: #4caf50;
        border-radius: 15px;
        transition: width 2s ease-in-out;
    `;

    // Append all elements
    loadingBarContainer.appendChild(progress);
    loadingContainer.appendChild(loadingMessage);
    loadingContainer.appendChild(loadingBarContainer);
    modal.appendChild(loadingContainer);
    modal.appendChild(backdrop); // Add backdrop last to ensure it's under the loading container
    document.body.appendChild(modal);

    // Animate the progress bar
    setTimeout(function() {
        progress.style.width = '100%';
    }, 500); // Start animation shortly after loading

    // Change the loading message after half the progress
    setTimeout(function() {
        loadingMessage.textContent = 'Almost there...';
    }, 2000); // Update text halfway through loading

    // Remove the modal after 4 seconds
    setTimeout(function() {
        modal.style.opacity = '0';
    }, 4000);

    // Clean up after the fade out
    setTimeout(function() {
        document.body.removeChild(modal);
    }, 5000);
};
