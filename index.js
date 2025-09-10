// Configuration for easy editing
      
        // Configuration for easy editing
const CONFIG = {
    name: "Angelique Hilario",
    tagline: "Aspiring Mobile Developer",
    bio: "Welcome to my creative space! I'm passionate about bringing ideas to life through innovative design and development. With a keen eye for aesthetics and a love for clean code, I create digital experiences that inspire and engage.",
    contact: {
        email: "angeliquehilario109@gmail.com",
        phone: "+27 (84) 231-1730",
        location: "Cape Town, South Africa"
    }
};

// EmailJS configuration
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_ztba94l',    // Your EmailJS service ID
    TEMPLATE_ID: 'template_el0andb',  // Your EmailJS template ID
    PUBLIC_KEY: 'NamI92QRfeRTW6MF0'   // Your EmailJS public key
};

// Initialize EmailJS when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    
    // Add loading animation
    setTimeout(() => {
        const container = document.querySelector('.container');
        if (container) {
            container.classList.add('loading');
        }
    }, 100);

    // Initialize contact info
    updateContactInfo();
    
    // Setup event listeners
    setupNavigation();
    setupProfileImage();
    setupContactForm();
});

// Navigation functionality
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active classes
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active classes
            this.classList.add('active');
            const targetElement = document.getElementById(targetTab);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

// Profile image upload (if you have this feature)
function setupProfileImage() {
    const profileImage = document.getElementById('profileImage');
    
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        profileImage.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            };
            
            input.click();
        });
    }
}

// Contact form handling with EmailJS
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const submitBtn = document.querySelector('.submit-btn');
            const successMessage = document.getElementById('successMessage');
            const senderNameSpan = document.getElementById('senderName');
            
            // Validate form fields
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Please fill in all fields');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Disable button and show sending state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Prepare template parameters
            // These must match EXACTLY with your EmailJS template variables
            const templateParams = {
                from_name: nameInput.value,      // Sender's name
                from_email: emailInput.value,    // Sender's email
                message: messageInput.value,      // Message content
                to_name: 'Angelique'             // Your name (optional)
            };
            
            console.log('Sending email with params:', templateParams);
            
            // Send email using EmailJS
            emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            ).then(
                function(response) {
                    console.log('Email sent successfully!', response.status, response.text);
                    
                    // Show success message
                    if (senderNameSpan) {
                        senderNameSpan.textContent = templateParams.from_name + '! ';
                    }
                    if (successMessage) {
                        successMessage.classList.remove('hidden');
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            successMessage.classList.add('hidden');
                        }, 5000);
                    }
                    
                    // Reset form
                    form.reset();
                    
                    // Update button to show success
                    submitBtn.textContent = '✓ Message Sent!';
                    submitBtn.classList.add('success');
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = 'Send Message';
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('success');
                    }, 3000);
                },
                function(error) {
                    console.error('Failed to send email:', error);
                    
                    // Show user-friendly error message
                    let errorMessage = 'Failed to send message. ';
                    
                    if (error.text) {
                        if (error.text.includes('recipients address')) {
                            errorMessage += 'Please check your EmailJS template configuration.';
                        } else if (error.text.includes('service')) {
                            errorMessage += 'Email service is temporarily unavailable.';
                        } else {
                            errorMessage += 'Please try again later.';
                        }
                    }
                    
                    alert(errorMessage);
                    
                    // Update button to show error
                    submitBtn.textContent = '✗ Failed to Send';
                    submitBtn.classList.add('error');
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = 'Send Message';
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('error');
                    }, 3000);
                }
            );
        });
    }
}

// Update contact information
function updateContactInfo() {
    const contactItems = document.querySelectorAll('.contact-details');
    if (contactItems.length >= 3) {
        contactItems[0].innerHTML = `<strong>Email</strong>${CONFIG.contact.email}`;
        contactItems[1].innerHTML = `<strong>Phone</strong>${CONFIG.contact.phone}`;
        contactItems[2].innerHTML = `<strong>Location</strong>${CONFIG.contact.location}`;
    }
}

// Add smooth scrolling and enhanced interactions
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Enhanced project card interactions
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        }
    });
});

        // Contact form handling
        function setupContactForm() {
            const form = document.getElementById('contactForm');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                if (!name || !email || !message) {
                    alert('Please fill in all fields');
                    return;
                }
                
                // Show success message
                alert('Thank you for your message! I\'ll get back to you soon.');
                
                // Reset form
                this.reset();
            });
        }

        // Update contact information
        function updateContactInfo() {
            const contactItems = document.querySelectorAll('.contact-details');
            if (contactItems.length >= 3) {
                contactItems[0].innerHTML = `<strong>Email</strong>${CONFIG.contact.email}`;
                contactItems[1].innerHTML = `<strong>Phone</strong>${CONFIG.contact.phone}`;
                contactItems[2].innerHTML = `<strong>Location</strong>${CONFIG.contact.location}`;
            }
        }

        // Add smooth scrolling and enhanced interactions
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
        });

        // Enhanced project card interactions
        document.addEventListener('mousemove', function(e) {
            const cards = document.querySelectorAll('.project-card');
            
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                } else {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }
            });
        });

        // Form submission handler
        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const btn = document.querySelector('.submit-btn');
            const form = this;
            
            // Disable button and show sending state
            btn.disabled = true;
            btn.textContent = 'Sending...';

            // Get form data
            const templateParams = {
                to_name: 'Angelique',
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Send email
            emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            ).then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                document.getElementById('senderName').textContent = templateParams.from_name;
                document.getElementById('successMessage').classList.remove('hidden');
                
                // Reset form
                form.reset();
                btn.textContent = 'Message Sent!';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.textContent = 'Send Message';
                    btn.disabled = false;
                }, 3000);

            }).catch(function(error) {
                console.log('FAILED...', error);
                btn.textContent = 'Failed to send';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.textContent = 'Send Message';
                    btn.disabled = false;
                }, 3000);
            });
        });