let socket = null;

function connect() {
    socket = new WebSocket('ws://localhost:8765');

    socket.onopen = () => {
        console.log('Connected to Python controller');
        // Keep-alive hack: Send a ping every 20s to stop SW from freezing
        setInterval(() => socket.send('ping'), 20000);
    };

    socket.onmessage = (event) => {
        const command = event.data;
        console.log('Received:', command);

        // Forward command to the active tab
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0] && tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, {action: command});
            }
        });
    };

    socket.onclose = () => {
        console.log('Socket closed. Reconnecting in 5s...');
        setTimeout(connect, 5000);
    };
}

connect();