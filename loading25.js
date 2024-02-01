window.onload = function() {
    // Extract the color from the uploaded image (as the image cannot be accessed directly)
    var backgroundColor = '#1e1e2d'; // Replace with the color you extracted from the image

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
        background-color: ${backgroundColor};
        transition: background-color 2s ease-out;
    `;

    // Create the loading text element
    var loadingText = document.createElement('p');
    loadingText.innerText = 'Preparing your module...';
    loadingText.style.cssText = `
        font-size: 20px;
        color: #fff;
        text-align: center;
    `;

    // Append the text to the modal
    modal.appendChild(loadingText);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Start fading the background color after 2 seconds
    setTimeout(function() {
        modal.style.backgroundColor = 'transparent';
    }, 2000);

    // Remove the modal after the fade-out transition
    setTimeout(function() {
        document.body.removeChild(modal);
    }, 4000);
};
