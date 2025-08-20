document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-item a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Gallery functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Add click event to open image in lightbox
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.gallery-caption h3').textContent;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            // Create lightbox content
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="${imgSrc}" alt="${caption}">
                    <div class="lightbox-caption">${caption}</div>
                </div>
            `;
            
            // Add lightbox to body
            document.body.appendChild(lightbox);
            
            // Prevent scroll when lightbox is open
            document.body.style.overflow = 'hidden';
            
            // Show lightbox with fade-in effect
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Close lightbox when clicking close button or outside image
            const closeBtn = lightbox.querySelector('.close-lightbox');
            
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            function closeLightbox() {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('.content-section');
        const navLinks = document.querySelectorAll('.nav-item a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 200 && 
                window.scrollY < sectionTop + sectionHeight - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Call on scroll
    window.addEventListener('scroll', setActiveNavLink);
    
    // Call on page load
    setActiveNavLink();
});
<script>
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(event) {
        let isValid = true;
        
        // Name validieren
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            isValid = false;
            highlightError(name, 'Bitte geben Sie Ihren Namen ein');
        } else {
            removeError(name);
        }
        
        // E-Mail validieren
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            isValid = false;
            highlightError(email, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
        } else {
            removeError(email);
        }
        
        // Nachricht validieren
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            isValid = false;
            highlightError(message, 'Bitte geben Sie eine Nachricht ein');
        } else {
            removeError(message);
        }
        
        if (!isValid) {
            event.preventDefault();
        }
    });
    
    function highlightError(element, message) {
        element.classList.add('error');
        
        // Fehlermeldung erstellen oder aktualisieren
        let errorMsg = element.nextElementSibling;
        if (!errorMsg || !errorMsg.classList.contains('error-message')) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            element.parentNode.insertBefore(errorMsg, element.nextSibling);
        }
        errorMsg.textContent = message;
    }
    
    function removeError(element) {
        element.classList.remove('error');
        
        // Fehlermeldung entfernen, falls vorhanden
        const errorMsg = element.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.remove();
        }
    }
});
</script>