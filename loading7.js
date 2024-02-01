window.onload = function() {
    // Create the modal element
    var modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        left: 0; top: 0;
        width: 100%; height: 100%;
        backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.5);
        display: flex; flex-direction: column;
        justify-content: center; align-items: center;
        z-index: 1000;
        transition: opacity 1s ease-out;
        opacity: 1;
    `;

    // Create the loading messages
    var loadingMessages = document.createElement('div');
    loadingMessages.style.cssText = `
        color: #fff;
        font-size: 18px;
        margin-bottom: 20px;
        text-align: center;
    `;
    loadingMessages.textContent = 'Loading user profile...';

    // Create the loading bar element
    var loadingBar = document.createElement('div');
    loadingBar.style.cssText = `
        width: 50%; height: 30px;
        background-color: #333;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    `;

    // Create the progress element inside the loading bar
    var progress = document.createElement('div');
    progress.style.cssText = `
        width: 0; height: 100%;
        background-color: #4caf50;
        transition: width 2s ease-in-out;
        border-radius: 15px;
    `;

    // Append elements to modal
    loadingBar.appendChild(progress);
    modal.appendChild(loadingMessages);
    modal.appendChild(loadingBar);

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
    }, 3000);

    // Start fade out after 4 seconds
    setTimeout(function() {
        modal.style.opacity = '0';
    }, 4000);

    // Remove the modal after the fade out transition
    setTimeout(function() {
        document.body.removeChild(modal);
    }, 5000);
};
