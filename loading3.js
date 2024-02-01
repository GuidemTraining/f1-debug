window.onload = function() {
    // Create the modal element
    var modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    // Create the loading bar element
    var loadingBar = document.createElement('div');
    loadingBar.style.width = '50%';
    loadingBar.style.height = '30px';
    loadingBar.style.backgroundColor = '#ffffff';
    loadingBar.style.borderRadius = '15px';
    loadingBar.style.overflow = 'hidden';

    // Create the progress element inside the loading bar
    var progress = document.createElement('div');
    progress.style.width = '100%';
    progress.style.height = '100%';
    progress.style.backgroundColor = '#4caf50';
    progress.style.transition = 'width 2s ease-in-out';
    progress.style.width = '0';

    // Append the progress bar to the loading bar, and the loading bar to the modal
    loadingBar.appendChild(progress);
    modal.appendChild(loadingBar);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Animate the progress bar
    setTimeout(function() {
        progress.style.width = '100%';
    }, 100);

    // Remove the modal after 2 seconds
    setTimeout(function() {
        document.body.removeChild(modal);
    }, 4000);
};
