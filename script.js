// Update datetime
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
}

// Simulate connection status
function simulateConnection() {
    const statusLight = document.getElementById('connection-status');
    const statuses = ['var(--success)', 'var(--warning)', 'var(--danger)'];
    const messages = ['TRANSMISSION ACTIVE', 'SIGNAL WEAK', 'COMMUNICATION LOST'];
    
    let currentStatus = 0;
    
    setInterval(() => {
        // 90% chance of good connection
        if (Math.random() > 0.9) {
            currentStatus = Math.floor(Math.random() * 2) + 1;
        } else {
            currentStatus = 0;
        }
        
        statusLight.style.backgroundColor = statuses[currentStatus];
        statusLight.style.boxShadow = `0 0 10px ${statuses[currentStatus]}`;
        document.querySelector('.status-readout').textContent = messages[currentStatus];
        document.querySelector('.status-readout').style.color = statuses[currentStatus];
    }, 5000);
}

// Add hover effect to nav buttons based on their frequency
document.querySelectorAll('.nav-button').forEach(button => {
    const frequency = parseFloat(button.dataset.frequency);
    
    button.addEventListener('mouseenter', () => {
        button.style.animation = `pulse ${frequency}s infinite alternate`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.animation = 'none';
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    simulateConnection();
});