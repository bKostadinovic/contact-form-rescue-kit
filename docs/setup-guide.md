# Setup Guide

## For Non-Technical Clients

### Quick Start (5 minutes)

1. **Download the AFTER folder**
   - Contains all working files

2. **Get Your Formspree Account**
   - Go to https://formspree.io
   - Sign up (free)
   - Create a new form
   - Copy your form endpoint

3. **Update Email Destination**
   - Open `AFTER/js/form-handler.js` in any text editor
   - Find line 73: `https://formspree.io/f/xjgwqlwq`
   - Replace with your actual Formspree endpoint
   - Save the file

4. **Upload to Your Website**
   - Upload entire AFTER folder to your web host via FTP or cPanel
   - Navigate to the folder URL in your browser
   - Test the form!

### Common Hosting Platforms

**WordPress:**
- Use a "Custom HTML" widget
- Paste the form HTML
- Upload CSS/JS files to your theme folder

**Shopify:**
- Create a new page
- Add custom HTML section
- Upload files to Files section

**Wix/Squarespace:**
- Use "Embed Code" block
- Upload files to file manager
- Link CSS/JS in embed

**Static Hosting (Netlify/Vercel):**
- Drag and drop AFTER folder
- Instant deployment

---

## For Developers

### Installation
```bash
# Clone or download the repository
git clone https://github.com/b_kostadinovic/contact-form-rescue-kit.git

# Navigate to AFTER folder
cd contact-form-rescue-kit/AFTER

# No build process needed - pure HTML/CSS/JS
# Just open index.html in browser
```

### Configuration

**1. Email Service (Formspree)**

Edit `js/form-handler.js`:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

**2. Spam Protection Tuning**

Edit `js/spam-protection.js`:
```javascript
// Adjust timing threshold (default: 3 seconds)
if (timeTaken < 3) {

// Adjust interaction threshold (default: 4)
if (this.interactionCount < 4) {

// Add/remove spam keywords
const spamKeywords = [
    'viagra', 'cialis', // add your own
];
```

**3. Validation Rules**

Edit `js/validator.js`:
```javascript
rules: {
    name: {
        minLength: 2,  // Adjust as needed
        maxLength: 50,
        pattern: /^[a-zA-Z\s'-]+$/,
    },
    // Modify other rules...
}
```

### Alternative Email Services

**Instead of Formspree, you can use:**

**SendGrid:**
```javascript
const response = await fetch('YOUR_BACKEND_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    })
});
```

**Netlify Forms:**
- Add `data-netlify="true"` to form tag
- Deploy to Netlify
- Automatic form handling

**Custom Backend:**
- Build Node.js/Express server
- Use Nodemailer or similar
- Deploy to Heroku/Railway/DigitalOcean

### File Structure
```
AFTER/
├── index.html           # Main form HTML
├── css/
│   └── styles.css       # All styling
└── js/
    ├── validator.js     # Form validation
    ├── spam-protection.js  # Anti-spam logic
    └── form-handler.js  # Submission handling
```

### Customization

**Change Colors:**

Edit `css/styles.css`:
```css
body {
    background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR 100%);
}

button {
    background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR 100%);
}
```

**Add Fields:**

1. Add HTML in `index.html`:
```html
<div class="form-group">
    <label for="phone">Phone</label>
    <input type="tel" id="phone" name="phone">
    <span class="error-message" role="alert"></span>
</div>
```

2. Add validation rule in `js/validator.js`:
```javascript
phone: {
    required: false,
    pattern: /^\d{10}$/,
    message: 'Phone must be 10 digits'
}
```

### Testing

**Test Validation:**
- Try invalid email formats
- Leave fields empty
- Enter text that's too short/long

**Test Spam Protection:**
- Submit within 2 seconds (should block)
- Fill honeypot field (inspect element to see it)
- Check console for spam detection logs

**Test Email Delivery:**
- Fill form with real data
- Check your email inbox
- Verify all fields received correctly

### Browser Support

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- IE11: ❌ Not supported (uses modern JS)

### Security Notes

**Client-side validation is NOT security:**
- Always validate on server too
- Spam protection is a deterrent, not absolute
- For high-traffic sites, add server-side rate limiting
- Consider adding reCAPTCHA for extra protection

### Troubleshooting

**Form doesn't submit:**
- Check browser console for errors
- Verify Formspree endpoint is correct
- Check network tab for failed requests

**Spam still getting through:**
- Lower timing threshold
- Add more spam keywords
- Implement server-side filtering

**Validation not working:**
- Check that all JS files are loaded
- Verify no console errors
- Ensure field names match validation rules

---

## Support

For questions about this code:
- **GitHub:** https://github.com/bKostadinovic/contact-form-rescue-kit
- **Email:** bkostadinovic1990@gmail.com

---

## Hire Me

Need help with a similar project?

- **Upwork:** https://www.upwork.com/freelancers/~0131475cd060f3f7ea
- **Fiverr:** https://www.fiverr.com/b_kostadinovic
- **Email:** bkostadinovic1990@gmail.com

I specialize in:
- Fixing broken contact forms
- Implementing spam protection
- Form validation and UX improvements
- Rescuing abandoned projects
- Quick turnaround (2-3 days typical)

---

## License

MIT License - Free to use for client projects