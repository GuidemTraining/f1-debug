window.onload = function() {
    // Define the main colors for the modal elements
    var modalBackgroundColor = 'rgba(30, 30, 45, 0.85)'; // Semi-transparent dark background
    var progressBarColor = '#4caf50'; // Green color for the progress bar

    // Create the modal element with a blurred backdrop
    var modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(8px);
        background-color: ${modalBackgroundColor};
        opacity: 1;
        transition: opacity 2s ease-out;
    `;

    // Create the loading text element with a modern look
    var loadingText = document.createElement('p');
    loadingText.innerText = 'Preparing your module...';
    loadingText.style.cssText = `
        font-size: 24px;
        color: #fff;
        text-align: center;
        margin-bottom: 20px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        animation: fadeIn 2s ease-in-out;
    `;

    // Create the loading bar container with a modern style
    var loadingBarContainer = document.createElement('div');
    loadingBarContainer.style.cssText = `
        width: 50%;
        height: 20px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
    `;

    // Create the animated progress bar element
    var progressBar = document.createElement('div');
    progressBar.style.cssText = `
        width: 0;
        height: 100%;
        background-color: ${progressBarColor};
        border-radius: 10px;
        animation: loadProgress 2s forwards;
    `;

    // Keyframe animations for the fadeIn effect and the progress bar loading
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes loadProgress {
            from { width: 0; }
            to { width: 100%; }
        }
    `;
    document.head.appendChild(styleSheet);

    // Append the progress bar to its container, then to the modal
    loadingBarContainer.appendChild(progressBar);
    modal.appendChild(loadingText);
    modal.appendChild(loadingBarContainer);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Start fading out the modal after a delay
    setTimeout(function() {
        modal.style.opacity = '0';
    }, 3500); // Starts fading out after 4 seconds

    // Remove the modal after the fade-out transition
    setTimeout(function() {
        document.body.removeChild(modal);
    }, 4000); // Removes after 6 seconds to allow for the fade-out transition
};
