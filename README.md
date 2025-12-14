# 🚗 Car Park Email Management System

A modern, intelligent email management system for hotel/pub car parks with automated guest notifications, real-time dashboards, and smart scheduling.

## 🌟 Features

### Core Functionality
- 📧 **Automated Email Campaigns**: Schedule and send batch emails to car park users
- 👥 **Guest Management**: Register and track guest vehicle information
- 📊 **Real-time Dashboard**: Analytics, statistics, and monitoring
- ⏰ **Smart Scheduling**: Time-based email automation
- 🔔 **Notification System**: Instant alerts for important events
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 💾 **Local Storage**: Client-side data persistence
- 📈 **Analytics & Reporting**: Track email performance and guest patterns

### Advanced Features
- 🎨 **Material Design 3**: Modern, premium UI/UX
- 🌙 **Dark Mode Support**: Automatic theme switching
- 🔍 **Search & Filter**: Quick guest/email lookup
- 📥 **Data Export**: CSV download functionality
- ✅ **Form Validation**: Smart input validation
- 🎯 **Email Templates**: Pre-built templates for common scenarios
- 📱 **PWA Ready**: Installable as native app
- ♿ **Accessibility**: WCAG 2.1 compliant

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No backend server required (fully client-side)

### Installation

1. Clone or download the repository:
```bash
git clone https://github.com/yourusername/car-park-email-system.git
cd car-park-email-system
```

2. Open in browser:
```bash
# Simply open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

3. Start using:
   - **Guest Registration**: `guest-form.html`
   - **Dashboard**: `dashboard.html`
   - **Main Interface**: `index.html`

## 📁 Project Structure

```
car-park-email-system/
├── index.html              # Main landing page
├── dashboard.html          # Admin dashboard
├── guest-form.html         # Guest registration form
├── css/
│   ├── style.css          # Main styles
│   ├── dashboard.css      # Dashboard styles
│   └── guest-form.css     # Form styles
├── js/
│   ├── main.js            # Core functionality
│   ├── dashboard.js       # Dashboard logic
│   ├── guest-form.js      # Form handling
│   ├── email-service.js   # Email management
│   ├── scheduler.js       # Scheduling engine
│   └── storage.js         # Data persistence
├── config/
│   ├── email-config.js    # Email templates
│   └── settings.js        # App configuration
├── assets/               # Images and icons
├── docs/                 # Additional documentation
└── README.md            # This file
```

## 💡 Use Cases

### For Hotels
- Send check-out reminders to guests
- Notify about parking violations
- Remind about car park closing times
- Send promotional offers

### For Pubs with Accommodation
- Notify guests to move vehicles by closing time
- Send parking permit information
- Remind about overnight parking rules

### For Event Venues
- Send event parking instructions
- Coordinate multiple vehicle arrivals
- Send post-event notifications

## 🎨 Screenshots

### Dashboard
![Dashboard](assets/dashboard-screenshot.png)
*Real-time analytics and monitoring*

### Guest Registration
![Guest Form](assets/guest-form-screenshot.png)
*Simple, intuitive vehicle registration*

### Email Management
![Email Interface](assets/email-interface-screenshot.png)
*Powerful email campaign management*

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Design**: Material Design 3, Custom CSS
- **Storage**: LocalStorage API
- **Email**: EmailJS / SMTP.js integration ready
- **Icons**: Material Symbols & Emoji
- **Animation**: CSS animations & transitions

## 📧 Email Integration

The system supports multiple email providers:

### EmailJS (Recommended)
```javascript
// config/email-config.js
const emailConfig = {
    serviceId: 'your_service_id',
    templateId: 'your_template_id',
    userId: 'your_public_key'
};
```

### SMTP.js
```javascript
// Alternative SMTP configuration
Email.send({
    SecureToken: "your-token",
    To: 'recipient@example.com',
    From: "sender@example.com",
    Subject: "Car Park Notification",
    Body: emailBody
});
```

## 🔧 Configuration

### Email Templates
Edit `config/email-config.js` to customize templates:
- Check-out reminders
- Parking violations
- General notifications
- Custom messages

### App Settings
Modify `config/settings.js`:
- Business hours
- Notification preferences
- Theme settings
- Data retention policies

## 📊 Analytics & Reporting

The dashboard provides:
- Total guests registered
- Emails sent (daily/weekly/monthly)
- Active vehicles count
- Peak usage times
- Email open rates (with tracking)
- Guest demographics

## 🔒 Security & Privacy

- ✅ All data stored locally (no server uploads)
- ✅ No passwords or sensitive data collected
- ✅ GDPR-compliant data handling
- ✅ Optional data encryption
- ✅ Clear data deletion options

## 🚀 Deployment

### GitHub Pages
```bash
git push origin main
# Enable GitHub Pages in repo settings
# Site will be live at: https://yourusername.github.io/car-park-email-system
```

### Netlify
```bash
# Drag and drop folder to Netlify
# Or connect GitHub repo for auto-deployment
```

### Traditional Hosting
- Upload all files to web server
- Ensure directory permissions are set
- Access via domain URL

## 🧪 Testing

### Manual Testing
1. Register test guest
2. Schedule test email
3. Verify dashboard updates
4. Check responsive design on mobile
5. Test dark/light mode switching

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

## 🙏 Acknowledgments

- Material Design by Google
- EmailJS for email services
- Open source community

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: your.email@example.com
- Documentation: See `/docs` folder

## 🗺️ Roadmap

### Version 2.0 (Planned)
- [ ] Backend API integration
- [ ] Multi-user authentication
- [ ] SMS notifications
- [ ] QR code check-in
- [ ] Payment integration
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration
- [ ] Advanced analytics with ML

## 📈 Changelog

### v1.0.0 (2025-12-14)
- Initial release
- Core email functionality
- Dashboard and analytics
- Guest management
- Material Design 3 UI
- Dark mode support
- Responsive design

---

**Made with ❤️ for efficient car park management**
