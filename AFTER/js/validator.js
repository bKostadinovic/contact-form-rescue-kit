// Form Validator - Clean, reusable validation logic

const FormValidator = {
    // Validation rules
    rules: {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s'-]+$/,
            message: 'Name must be 2-50 characters (letters, spaces, hyphens, apostrophes only)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        subject: {
            required: true,
            minLength: 3,
            maxLength: 100,
            message: 'Subject must be 3-100 characters'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'Message must be 10-1000 characters'
        }
    },

    // Validate a single field
    validateField(fieldName, value) {
        const rule = this.rules[fieldName];
        if (!rule) return { valid: true };

        const errors = [];

        // Required check
        if (rule.required && !value.trim()) {
            return { 
                valid: false, 
                error: `${this.capitalize(fieldName)} is required` 
            };
        }

        // Skip other checks if field is empty and not required
        if (!value.trim()) {
            return { valid: true };
        }

        // Length checks
        if (rule.minLength && value.length < rule.minLength) {
            errors.push(`Minimum ${rule.minLength} characters required`);
        }

        if (rule.maxLength && value.length > rule.maxLength) {
            errors.push(`Maximum ${rule.maxLength} characters allowed`);
        }

        // Pattern check
        if (rule.pattern && !rule.pattern.test(value)) {
            errors.push(rule.message);
        }

        if (errors.length > 0) {
            return { valid: false, error: errors[0] };
        }

        return { valid: true };
    },

    // Validate entire form
    validateForm(formData) {
        const results = {};
        let isValid = true;

        for (const [fieldName, value] of formData.entries()) {
            // Skip honeypot field
            if (fieldName === 'website') continue;

            const result = this.validateField(fieldName, value);
            results[fieldName] = result;

            if (!result.valid) {
                isValid = false;
            }
        }

        return { isValid, results };
    },

    // Show error message for a field
    showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        input.classList.add('error');
        input.classList.remove('valid');
        errorElement.textContent = message;
        
        // Shake animation
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 400);
    },

    // Show success state for a field
    showSuccess(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        input.classList.remove('error');
        input.classList.add('valid');
        errorElement.textContent = '';
    },

    // Clear validation state
    clearValidation(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        input.classList.remove('error', 'valid');
        errorElement.textContent = '';
    },

    // Helper: capitalize first letter
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
};

// Export for use in other files
window.FormValidator = FormValidator;

console.log('✅ Form Validator loaded');