// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('contactSuccess');
    const errorMessage = document.getElementById('contactError');
    
    // Basic validation
    if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return false;
    }
    
    // Here you would normally send the form data to a backend service
    // For example:
    /*
    fetch('https://your-form-endpoint.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        })
    })
    .then(response => {
        if (response.ok) {
            // Show success
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            contactForm.reset();
        } else {
            // Show error
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        }
    })
    .catch(error => {
        // Show error
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    });
    */
    
    // For demonstration, we'll simulate a successful submission
    
    // Show success message
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    
    // Reset form
    event.target.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
    
    return false;
}