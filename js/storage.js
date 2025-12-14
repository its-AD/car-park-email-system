// Storage Manager - Local Storage Handler

class StorageManager {
    constructor() {
        this.STORAGE_KEYS = {
            GUESTS: 'carpark_guests',
            EMAILS: 'carpark_emails',
            SCHEDULED: 'carpark_scheduled',
            SETTINGS: 'carpark_settings'
        };
        this.initializeStorage();
    }

    initializeStorage() {
        // Initialize storage if empty
        if (!localStorage.getItem(this.STORAGE_KEYS.GUESTS)) {
            localStorage.setItem(this.STORAGE_KEYS.GUESTS, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.STORAGE_KEYS.EMAILS)) {
            localStorage.setItem(this.STORAGE_KEYS.EMAILS, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.STORAGE_KEYS.SCHEDULED)) {
            localStorage.setItem(this.STORAGE_KEYS.SCHEDULED, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.STORAGE_KEYS.SETTINGS)) {
            this.setDefaultSettings();
        }
    }

    setDefaultSettings() {
        const defaultSettings = {
            hotelName: 'Grand Hotel',
            emailFrom: 'parking@grandhotel.com',
            businessHours: {
                start: '08:00',
                end: '22:00'
            },
            autoReminders: true,
            reminderHours: 2
        };
        localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
    }

    // Guest Management
    addGuest(guest) {
        const guests = this.getGuests();
        guest.id = this.generateId();
        guest.registeredAt = new Date().toISOString();
        guest.status = 'active';
        guests.push(guest);
        localStorage.setItem(this.STORAGE_KEYS.GUESTS, JSON.stringify(guests));
        return guest;
    }

    getGuests() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.GUESTS) || '[]');
    }

    getGuestById(id) {
        const guests = this.getGuests();
        return guests.find(g => g.id === id);
    }

    updateGuest(id, updates) {
        const guests = this.getGuests();
        const index = guests.findIndex(g => g.id === id);
        if (index !== -1) {
            guests[index] = { ...guests[index], ...updates };
            localStorage.setItem(this.STORAGE_KEYS.GUESTS, JSON.stringify(guests));
            return guests[index];
        }
        return null;
    }

    deleteGuest(id) {
        const guests = this.getGuests();
        const filtered = guests.filter(g => g.id !== id);
        localStorage.setItem(this.STORAGE_KEYS.GUESTS, JSON.stringify(filtered));
    }

    // Email Management
    addEmail(email) {
        const emails = this.getEmails();
        email.id = this.generateId();
        email.sentAt = new Date().toISOString();
        email.status = 'sent';
        emails.push(email);
        localStorage.setItem(this.STORAGE_KEYS.EMAILS, JSON.stringify(emails));
        return email;
    }

    getEmails() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.EMAILS) || '[]');
    }

    // Scheduled Emails
    addScheduledEmail(scheduledEmail) {
        const scheduled = this.getScheduledEmails();
        scheduledEmail.id = this.generateId();
        scheduledEmail.createdAt = new Date().toISOString();
        scheduledEmail.status = 'pending';
        scheduled.push(scheduledEmail);
        localStorage.setItem(this.STORAGE_KEYS.SCHEDULED, JSON.stringify(scheduled));
        return scheduledEmail;
    }

    getScheduledEmails() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.SCHEDULED) || '[]');
    }

    updateScheduledEmail(id, updates) {
        const scheduled = this.getScheduledEmails();
        const index = scheduled.findIndex(s => s.id === id);
        if (index !== -1) {
            scheduled[index] = { ...scheduled[index], ...updates };
            localStorage.setItem(this.STORAGE_KEYS.SCHEDULED, JSON.stringify(scheduled));
            return scheduled[index];
        }
        return null;
    }

    deleteScheduledEmail(id) {
        const scheduled = this.getScheduledEmails();
        const filtered = scheduled.filter(s => s.id !== id);
        localStorage.setItem(this.STORAGE_KEYS.SCHEDULED, JSON.stringify(filtered));
    }

    // Settings
    getSettings() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.SETTINGS));
    }

    updateSettings(updates) {
        const settings = this.getSettings();
        const newSettings = { ...settings, ...updates };
        localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
        return newSettings;
    }

    // Statistics
    getStats() {
        const guests = this.getGuests();
        const emails = this.getEmails();
        const scheduled = this.getScheduledEmails();
        
        return {
            totalGuests: guests.length,
            activeVehicles: guests.filter(g => g.status === 'active').length,
            emailsSent: emails.length,
            scheduledEmails: scheduled.filter(s => s.status === 'pending').length,
            totalRevenueImpact: guests.length * 25 // Placeholder calculation
        };
    }

    // Analytics
    getAnalytics(period = 'week') {
        const guests = this.getGuests();
        const emails = this.getEmails();
        
        const now = new Date();
        const cutoffDate = new Date();
        
        switch(period) {
            case 'day':
                cutoffDate.setDate(now.getDate() - 1);
                break;
            case 'week':
                cutoffDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                cutoffDate.setMonth(now.getMonth() - 1);
                break;
        }
        
        const recentGuests = guests.filter(g => 
            new Date(g.registeredAt) >= cutoffDate
        );
        
        const recentEmails = emails.filter(e => 
            new Date(e.sentAt) >= cutoffDate
        );
        
        return {
            period,
            newGuests: recentGuests.length,
            emailsSent: recentEmails.length,
            averagePerDay: recentEmails.length / 7,
            topRecipients: this.getTopRecipients(recentEmails, 5)
        };
    }

    getTopRecipients(emails, limit = 5) {
        const recipientCounts = {};
        emails.forEach(email => {
            email.recipients.forEach(recipient => {
                recipientCounts[recipient] = (recipientCounts[recipient] || 0) + 1;
            });
        });
        
        return Object.entries(recipientCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([email, count]) => ({ email, count }));
    }

    // Search
    searchGuests(query) {
        const guests = this.getGuests();
        const lowercaseQuery = query.toLowerCase();
        
        return guests.filter(guest => 
            guest.name?.toLowerCase().includes(lowercaseQuery) ||
            guest.email?.toLowerCase().includes(lowercaseQuery) ||
            guest.vehicleReg?.toLowerCase().includes(lowercaseQuery) ||
            guest.roomNumber?.toString().includes(lowercaseQuery)
        );
    }

    // Export Data
    exportToCSV(type = 'guests') {
        let data, headers;
        
        switch(type) {
            case 'guests':
                data = this.getGuests();
                headers = ['ID', 'Name', 'Email', 'Vehicle Registration', 'Room Number', 'Registered At', 'Status'];
                break;
            case 'emails':
                data = this.getEmails();
                headers = ['ID', 'Subject', 'Recipients', 'Sent At', 'Status'];
                break;
            default:
                return null;
        }
        
        return this.convertToCSV(data, headers);
    }

    convertToCSV(data, headers) {
        const csvRows = [headers.join(',')];
        
        data.forEach(item => {
            const values = headers.map(header => {
                const key = header.toLowerCase().replace(/ /g, '');
                return `"${item[key] || ''}"`;
            });
            csvRows.push(values.join(','));
        });
        
        return csvRows.join('\n');
    }

    // Utilities
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    clearAllData() {
        if (confirm('Are you sure you want to delete all data? This cannot be undone.')) {
            localStorage.removeItem(this.STORAGE_KEYS.GUESTS);
            localStorage.removeItem(this.STORAGE_KEYS.EMAILS);
            localStorage.removeItem(this.STORAGE_KEYS.SCHEDULED);
            this.initializeStorage();
            return true;
        }
        return false;
    }

    // Backup & Restore
    createBackup() {
        const backup = {
            timestamp: new Date().toISOString(),
            data: {
                guests: this.getGuests(),
                emails: this.getEmails(),
                scheduled: this.getScheduledEmails(),
                settings: this.getSettings()
            }
        };
        
        const dataStr = JSON.stringify(backup, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `carpark-backup-${Date.now()}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    restoreBackup(backupData) {
        try {
            const backup = typeof backupData === 'string' ? JSON.parse(backupData) : backupData;
            
            if (backup.data) {
                localStorage.setItem(this.STORAGE_KEYS.GUESTS, JSON.stringify(backup.data.guests));
                localStorage.setItem(this.STORAGE_KEYS.EMAILS, JSON.stringify(backup.data.emails));
                localStorage.setItem(this.STORAGE_KEYS.SCHEDULED, JSON.stringify(backup.data.scheduled));
                localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(backup.data.settings));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error restoring backup:', error);
            return false;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageManager;
}
