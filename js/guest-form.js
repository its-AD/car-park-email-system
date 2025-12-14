// Guest Form JavaScript

class GuestFormHandler {
    constructor() {
        this.storage = new StorageManager();
        this.form = document.getElementById('guestForm');
        this.init();
    }

    init() {
        this.setupForm();
        this.setupValidation();
        this.setMinDates();
    }

    setupForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    setupValidation() {
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });

        // Vehicle registration uppercase
        const vehicleReg = document.getElementById('vehicleReg');
        vehicleReg.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });

        // Check-out date validation
        const checkIn = document.getElementById('checkIn');
        const checkOut = document.getElementById('checkOut');
        
        checkIn.addEventListener('change', () => {
            checkOut.min = checkIn.value;
            if (checkOut.value && checkOut.value < checkIn.value) {
                checkOut.value = checkIn.value;
            }
        });
    }

    setMinDates() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('checkIn').min = today;
        document.getElementById('checkOut').min = today;
    }

    validateField(field) {
        if (field.required && !field.value.trim()) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(field.value)) {
                this.showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }

        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        let errorDiv = field.parentElement.querySelector('.field-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            field.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: var(--md-sys-color-error);
            font-size: 12px;
            margin-top: 4px;
        `;
    }

    clearFieldError(field) {
        const errorDiv = field.parentElement.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    handleSubmit() {
        // Validate all fields
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification('Please fill in all required fields correctly', 'error');
            return;
        }

        // Collect form data
        const formData = new FormData(this.form);
        const guestData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            roomNumber: formData.get('roomNumber'),
            vehicleReg: formData.get('vehicleReg'),
            vehicleMake: formData.get('vehicleMake'),
            vehicleColor: formData.get('vehicleColor'),
            parkingSpot: formData.get('parkingSpot'),
            checkIn: formData.get('checkIn'),
            checkOut: formData.get('checkOut'),
            notes: formData.get('notes'),
            emailReminders: formData.get('emailReminders') === 'on',
            emailUpdates: formData.get('emailUpdates') === 'on'
        };

        // Save to storage
        try {
            const savedGuest = this.storage.addGuest(guestData);
            this.showSuccess(savedGuest);
            this.form.reset();
        } catch (error) {
            this.showNotification('Error saving guest: ' + error.message, 'error');
        }
    }

    showSuccess(guest) {
        // Hide form
        this.form.style.display = 'none';
        
        // Show success message
        const successMessage = document.getElementById('successMessage');
        const successDetails = document.getElementById('successDetails');
        
        successDetails.innerHTML = `
            <strong>${guest.name}</strong> has been registered with vehicle 
            <strong>${guest.vehicleReg}</strong> in room <strong>${guest.roomNumber}</strong>.
            ${guest.emailReminders ? '<br>They will receive check-out reminders.' : ''}
        `;
        
        successMessage.style.display = 'block';
        
        // Show notification
        this.showNotification('Guest registered successfully!', 'success');
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    showNotification(message, type = 'info') {
        if (window.carParkSystem) {
            window.carParkSystem.showNotification(message, type);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GuestFormHandler();
});
