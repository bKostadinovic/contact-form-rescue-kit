// BROKEN FORM HANDLER - Intentional bugs for demontration

// Bug #1: This function is referenced but never defined properly
// The onclick in HTML calls handleSubmit() but it doesn't exist here

// Bug #2: Weak email validation
function validateEmail(email) {
    // This regex is too permissive - accepts "test@" as valid
    const re = /\S+@\S+/;
    return re.test(email);
}

// Bug #3: No actual form submission handling
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Bug #4: No validation before "submission"
    // Just logs to console instead of actually submitting
    console.log('Form data:', { name, email, subject, message });

    // Bug #5: No user feedback
    // User has no idea if form submitted or not
});

// Bug #6: No spam protection
// No honeypot, no timing checks, no rate limiting

// Bug #7: No error handling
// If anything fails, user sees nothing

// Bug #8: Mixed event handling approaches
// Some inline onclick, some addEventListener - inconsistent and error-prone

console.log('Broken form script loaded.');
// This will show in console, but handleSubmit() is still undefined!