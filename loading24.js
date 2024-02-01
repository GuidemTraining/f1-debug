window.onload = function() {
    // Create the modal element
    var modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;

    // Create the backdrop with blur and darkening
    var backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        backdrop-filter: blur(5px);
        background-color: rgba(0, 0, 0, 0.5);
    `;

    // Create the modal content container with a semi-transparent effect
    var contentContainer = document.createElement('div');
    contentContainer.style.cssText = `
        width: 40%;
        padding: 20px;
        border-radius: 8px;
        background-color: #1e1e2d; /* Adjust the background color to match your theme */
        color: #fff; /* Adjust the text color to match your theme */
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1;
    `;

    // Create the loading text element
    var loadingText = document.createElement('p');
    loadingText.innerText = 'Preparing your module...';
    loadingText.style.cssText = `
        font-size: 20px; /* Adjust the font size to ensure the text isn't too large */
        margin-bottom: 15px;
    `;

    // Create the progress bar container
    var progressBarContainer = document.createElement('div');
    progressBarContainer.style.cssText = `
        width: 100%;
        height: 20px;
        background-color: #2a2f3d; /* A dark shade for the loading bar background */
        border-radius: 10px;
        overflow: hidden;
    `;

    // Create the progress bar
    var progressBar = document.createElement('div');
    progressBar.style.cssText = `
        width: 0;
        height: 100%;
        background-color: #4caf50; /* Green shade for progress */
        border-radius: 10px;
        transition: width 2s ease-in-out;
    `;

    // Append the progress bar to its container
    progressBarContainer.appendChild(progressBar);

    // Append the text and progress bar to the content container
    contentContainer.appendChild(loadingText);
    contentContainer.appendChild(progressBarContainer);

    // Append the content container and backdrop to the modal
    modal.appendChild(contentContainer);
    modal.appendChild(backdrop);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Start the loading progress animation
    setTimeout(function() {
        progressBar.style.width = '100%';
    }, 100);

    // Hide the modal after 4 seconds
    setTimeout(function() {
        modal.style.opacity = '0';
        setTimeout(function() {
            document.body.removeChild(modal);
        }, 1000); // Allow time for opacity transition
    }, 4000);
};
