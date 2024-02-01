window.onload = function() {
    // Create the modal element
    var modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        left: 0; top: 0;
        width: 100%; height: 100%;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    // Create the blur and darken background effect
    var backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: absolute;
        left: 0; top: 0;
        width: 100%; height: 100%;
        backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.7);
        z-index: -1;
    `;

    // Create the loading container
    var loadingContainer = document.createElement('div');
    loadingContainer.style.cssText = `
        width: 70%;
        padding: 20px;
        background: #fff;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    `;

    // Create the loading text
    var loadingText = document.createElement('div');
    loadingText.innerText = 'Preparing your module...';
    loadingText.style.cssText = `
        margin-bottom: 20px;
        color: #333;
        font-size: 1.5rem;
    `;

    // Create the loading bar container
    var loadingBarContainer = document.createElement('div');
    loadingBarContainer.style.cssText = `
        width: 100%;
        background-color: #e0e0e0;
        border-radius: 15px;
        overflow: hidden;
    `;

    // Create the progress element inside the loading bar
    var progress = document.createElement('div');
    progress.style.cssText = `
        width: 0;
        height: 20px;
        background-color: #4caf50;
        border-radius: 15px;
        transition: width 4s ease-in-out;
    `;

    // Append all the elements
    loadingBarContainer.appendChild(progress);
    loadingContainer.appendChild(loadingText);
    loadingContainer.appendChild(loadingBarContainer);
    modal.appendChild(loadingContainer);
    modal.appendChild(backdrop);
    document.body.appendChild(modal);

    // Start the progress bar animation
    setTimeout(function() {
        progress.style.width = '100%';
    }, 100);

    // Change the loading text after a while
    setTimeout(function() {
        loadingText.innerText = 'Almost there...';
    }, 2000);

    // Remove the modal after some time
    setTimeout(function() {
        modal.style.opacity = '0';
        setTimeout(function() {
            document.body.removeChild(modal);
        }, 1000); // Wait for the opacity transition to finish
    }, 4000);
};
