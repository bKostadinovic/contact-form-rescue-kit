// Form Handler - Manages submission and user feedback

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    // Real-time validation on blur
    const inputs = form.querySelectorAll('input:not(#website), textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                const result = FormValidator.validateField(this.name, this.value);
                if (result.valid) {
                    FormValidator.showSuccess(this);
                } else {
                    FormValidator.showError(this, result.error);
                }
            }
        });

        // Clear error on input
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                FormValidator.clearValidation(this);
            }
        });
    });

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);

        // Validate all fields
        const validation = FormValidator.validateForm(formData);
        
        // Show validation errors
        if (!validation.isValid) {
            for (const [fieldName, result] of Object.entries(validation.results)) {
                const input = form.querySelector(`[name="${fieldName}"]`);
                if (!result.valid) {
                    FormValidator.showError(input, result.error);
                } else {
                    FormValidator.showSuccess(input);
                }
            }
            
            showStatus('Please fix the errors above', 'error');
            return;
        }

        // Check for spam
        const spamCheck = SpamProtection.checkForSpam(formData);
        
        if (spamCheck.isSpam) {
            SpamProtection.logSpamAttempt(spamCheck);
            
            // Show generic error (don't tell spammers they were caught)
            showStatus('Unable to submit form. Please try again later.', 'error');
            
            console.warn('🚫 Spam submission blocked:', spamCheck);
            return;
        }

        // Show loading state
        setLoadingState(true);

        try {
            // Submit to Formspree
            const response = await fetch('https://formspree.io/f/xjgwqlwq', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success!
                showStatus('✅ Message sent successfully! We\'ll respond within 24 hours.', 'success');
                form.reset();
                
                // Clear all validation states
                inputs.forEach(input => FormValidator.clearValidation(input));
                
            } else {
                // Server error
                const data = await response.json();
                showStatus('❌ Failed to send message. Please try again.', 'error');
                console.error('Form submission error:', data);
            }

        } catch (error) {
            // Network error
            showStatus('❌ Network error. Please check your connection and try again.', 'error');
            console.error('Network error:', error);
        } finally {
            setLoadingState(false);
        }
    });

    // Show status message
    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = type;
        
        // Auto-hide after 5 seconds for errors
        if (type === 'error') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }

    // Set loading state
    function setLoadingState(isLoading) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        if (isLoading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    }

    console.log('✅ Form Handler loaded and ready');
});