window.onload = function() {
    // Create a full-screen backdrop
    var backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        backdrop-filter: blur(5px);
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    // Create the loading bar container
    var loadingBarContainer = document.createElement('div');
    loadingBarContainer.style.cssText = `
        width: 70%;
        height: 20px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    `;

    // Create the progress bar element
    var progressBar = document.createElement('div');
    progressBar.style.cssText = `
        width: 0;
        height: 100%;
        background-color: #007bff; /* Bootstrap primary blue */
        border-radius: 10px;
        transition: width 2s ease;
    `;

    // Append the progress bar to the loading bar container
    loadingBarContainer.appendChild(progressBar);

    // Append the loading bar container to the backdrop
    backdrop.appendChild(loadingBarContainer);

    // Append the backdrop to the body
    document.body.appendChild(backdrop);

    // Animate the progress bar
    setTimeout(function() {
        progressBar.style.width = '100%';
    }, 100);

    // Remove the backdrop after 3 seconds
    setTimeout(function() {
        document.body.removeChild(backdrop);
    }, 3000);
};
