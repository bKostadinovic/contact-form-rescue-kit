// Spam Protection - Honeypot + Timing Analysis

const SpamProtection = {
    formOpenTime: Date.now(),
    interactionCount: 0,
    mouseMoved: false,

    // Initialize tracking
    init() {
        this.setupInteractionTracking();
        console.log('✅ Spam Protection initialized');
    },

    // Track user interactions
    setupInteractionTracking() {
        // Track mouse movement (bots often don't move mouse)
        document.addEventListener('mousemove', () => {
            this.mouseMoved = true;
        }, { once: true });

        // Track form interactions
        const form = document.getElementById('contactForm');
        form.addEventListener('input', () => {
            this.interactionCount++;
        });
    },

    // Check if submission is likely spam
    checkForSpam(formData) {
        const issues = [];
        const warnings = [];

        // Check 1: Honeypot field
        const honeypot = formData.get('website');
        if (honeypot && honeypot.trim() !== '') {
            issues.push('Honeypot field was filled (bot detected)');
        }

        // Check 2: Submission timing (too fast = likely bot)
        const timeTaken = (Date.now() - this.formOpenTime) / 1000;
        if (timeTaken < 3) {
            issues.push(`Form submitted too quickly (${timeTaken.toFixed(1)}s)`);
        }

        // Check 3: No mouse movement (suspicious)
        if (!this.mouseMoved) {
            warnings.push('No mouse movement detected');
        }

        // Check 4: Too few interactions (copy-paste or bot)
        if (this.interactionCount < 4) {
            warnings.push(`Low interaction count (${this.interactionCount})`);
        }

        // Check 5: Spam keywords in message
        const message = formData.get('message').toLowerCase();
        const spamKeywords = [
            'viagra', 'cialis', 'lottery', 'winner', 'prize',
            'click here', 'buy now', 'limited offer', 'act now',
            'make money fast', 'work from home', 'free money'
        ];

        const foundKeywords = spamKeywords.filter(keyword => 
            message.includes(keyword)
        );

        if (foundKeywords.length > 0) {
            issues.push(`Spam keywords detected: ${foundKeywords.join(', ')}`);
        }

        // Check 6: Too many links (common spam tactic)
        const urlPattern = /https?:\/\/[^\s]+/gi;
        const urls = message.match(urlPattern) || [];
        if (urls.length > 2) {
            warnings.push(`Excessive links (${urls.length})`);
        }

        // Determine if submission is spam
        const isSpam = issues.length >= 1; // Any critical issue = spam
        const score = issues.length + (warnings.length * 0.5);

        // Log for debugging
        if (issues.length > 0 || warnings.length > 0) {
            console.warn('🚨 Spam Detection Report:');
            console.warn('Issues:', issues);
            console.warn('Warnings:', warnings);
            console.warn('Score:', score);
            console.warn('Is Spam:', isSpam);
        }

        return {
            isSpam,
            score,
            issues,
            warnings,
            details: {
                honeypot: honeypot ? 'filled' : 'empty',
                timeTaken: `${timeTaken.toFixed(1)}s`,
                mouseMoved: this.mouseMoved,
                interactions: this.interactionCount
            }
        };
    },

    // Log spam attempt (for analysis)
    logSpamAttempt(result) {
        const spamLog = JSON.parse(localStorage.getItem('spamLog') || '[]');
        
        spamLog.push({
            timestamp: new Date().toISOString(),
            ...result
        });

        // Keep last 50 attempts
        if (spamLog.length > 50) {
            spamLog.shift();
        }

        localStorage.setItem('spamLog', JSON.stringify(spamLog));
        
        console.log('📝 Spam attempt logged');
    }
};

// Initialize on page load
SpamProtection.init();

// Export for use in form handler
window.SpamProtection = SpamProtection;

console.log('✅ Spam Protection loaded');