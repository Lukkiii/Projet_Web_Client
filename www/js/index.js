document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    
    const ws = new WebSocket('ws://127.0.0.1:9898/');
    ws.onopen = function() {
        console.log('Connected to server');
    };
    ws.onmessage = function(e) {
        console.log('Message', e.data);
        const response = JSON.parse(e.data);
        if (response.success) {
            document.getElementById('board').style.display = 'block';
            document.getElementById('rep').innerText = 'Login successful';
        } else {
            document.getElementById('rep').innerText = response.message;
        }
    };
    document.getElementById('log').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const tabUser = { action: 'login', username, password };
        ws.send(JSON.stringify(tabUser));
    });
}