document.addEventListener('DOMContentLoaded', function() {
    // --- Logique du Carrousel (Section Héro) ---
    
    const images = document.querySelectorAll('.hero-carousel-image');
    let currentIndex = 0;

    /**
     * Change l'image active du carrousel.
     */
    function changeImage() {
        // Désactiver l'image actuelle
        images[currentIndex].classList.remove('active');

        // Passer à l'image suivante, ou revenir au début si c'est la dernière
        currentIndex = (currentIndex + 1) % images.length;

        // Activer la nouvelle image
        images[currentIndex].classList.add('active');
    }

    // Changer l'image toutes les 5 secondes (5000 ms)
    if (images.length > 1) { // Vérifie qu'il y a plus d'une image
        setInterval(changeImage, 5000);
    }

    // --- Amélioration des animations 'on scroll' (Optionnel mais recommandé) ---

    // Fonction d'observation pour déclencher les animations quand l'élément entre dans la vue
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // L'élément est visible, forcer le début de l'animation
                // En ajoutant la classe 'is-visible' qui contient la propriété forwards
                entry.target.style.opacity = 1; // Rendre visible pour les animations basées sur transform
            }
        });
    }, {
        threshold: 0.1 // Déclenche quand 10% de l'élément est visible
    });

    // Observer tous les éléments qui utilisent les classes d'animation
    document.querySelectorAll('.animate-fade-in, .animate-fade-in-up').forEach(element => {
        observer.observe(element);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // 1. --- Logique du Carrousel (Section Héro) ---
    
    const images = document.querySelectorAll('.hero-carousel-image');
    let currentIndex = 0;

    function changeImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    if (images.length > 1) { 
        setInterval(changeImage, 5000);
    }
    
    // 2. --- Animation de l'en-tête au défilement (Scroll) ---

    const header = document.querySelector('header');
    
    function handleScroll() {
        // Applique la classe si le défilement dépasse 50 pixels
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // 3. --- Logique d'animation des éléments au chargement/défilement ---
    
    // Applique l'animation 'slide-down' au bloc d'identification du header
    const headerInfo = document.querySelector('header > div > div:first-child');
    if (headerInfo) {
        headerInfo.classList.add('animate-slide-down');
    }

    // Fonction d'observation pour déclencher les animations quand l'élément entre dans la vue
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Déclenche l'animation en garantissant l'opacité à 1 après
                entry.target.style.opacity = 1; 
                observer.unobserve(entry.target); // Optionnel: pour que l'animation ne se joue qu'une seule fois
            }
        });
    }, {
        threshold: 0.1 // Déclenche quand 10% de l'élément est visible
    });

    // Observer tous les éléments qui utilisent les classes d'animation (y compris ceux du header si nécessaire)
    document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-slide-down').forEach(element => {
        // Le header est un cas spécial (sticky), mais le reste des sections sera observé.
        if (element !== headerInfo) { // On gère headerInfo séparément ci-dessus
             observer.observe(element);
        }
    });
});