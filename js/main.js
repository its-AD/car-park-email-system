// Main JavaScript - Car Park Email System

class CarParkSystem {
    constructor() {
        this.storage = new StorageManager();
        this.init();
    }

    init() {
        this.setupTheme();
        this.loadStats();
        this.setupEventListeners();
        this.animateStats();
    }

    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Update icon
                const icon = themeToggle.querySelector('.material-symbols-outlined');
                icon.textContent = newTheme === 'light' ? 'dark_mode' : 'light_mode';
            });

            // Set initial icon
            const icon = themeToggle.querySelector('.material-symbols-outlined');
            icon.textContent = savedTheme === 'light' ? 'dark_mode' : 'light_mode';
        }
    }

    loadStats() {
        const stats = this.storage.getStats();
        
        // Update stat displays
        const totalGuestsEl = document.getElementById('totalGuests');
        const emailsSentEl = document.getElementById('emailsSent');
        const activeVehiclesEl = document.getElementById('activeVehicles');
        const scheduledEmailsEl = document.getElementById('scheduledEmails');

        if (totalGuestsEl) totalGuestsEl.textContent = stats.totalGuests;
        if (emailsSentEl) emailsSentEl.textContent = stats.emailsSent;
        if (activeVehiclesEl) activeVehiclesEl.textContent = stats.activeVehicles;
        if (scheduledEmailsEl) scheduledEmailsEl.textContent = stats.scheduledEmails;
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const duration = 1500;
            const stepTime = duration / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, stepTime);
        });
    }

    setupEventListeners() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add ripple effect to buttons
        document.querySelectorAll('.btn, .action-card, .feature-card').forEach(element => {
            element.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="material-symbols-outlined">
                ${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}
            </span>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.carParkSystem = new CarParkSystem();
});

// Add ripple effect CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .notification {
        position: fixed;
        bottom: 24px;
        right: 24px;
        padding: 16px 24px;
        background: var(--md-sys-color-surface);
        border-radius: 12px;
        box-shadow: var(--md-sys-elevation-level3);
        display: flex;
        align-items: center;
        gap: 12px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 9999;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success { border-left: 4px solid var(--md-sys-color-success); }
    .notification-error { border-left: 4px solid var(--md-sys-color-error); }
    .notification-info { border-left: 4px solid var(--md-sys-color-primary); }
`;
document.head.appendChild(style);
