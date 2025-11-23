chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("OS Command received:", request.action);

    const video = document.querySelector('video');
    if (!video) return;

    if (request.action === 'play') video.play();
    if (request.action === 'pause') video.pause();
    if (request.action === 'mute') video.muted = !video.muted;
    
    // You can add more logic here (volume up/down, scroll, etc.)
});