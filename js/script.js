document.addEventListener('DOMContentLoaded', function() {
    const backgrounds = [
        '../images/background1.webp',
        '../images/background2.webp',
        '../images/background3.webp'
    ];
    
    const dynamicBg = document.getElementById('dynamic-background');
    const sections = document.querySelectorAll('.content-section');
    
    window.addEventListener('scroll', function() {
        // Get current scroll position
        const scrollPosition = window.scrollY;
        
        // Determine which section we're in
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop - 300 && 
                scrollPosition < sectionTop + sectionHeight - 300) {
                // Change background when we're in this section
                if (index < backgrounds.length) {
                    dynamicBg.style.backgroundImage = `url('${backgrounds[index]}')`;
                }
            }
        });
    });
});