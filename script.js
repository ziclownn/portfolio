const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute("id");
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    },
    {
        threshold: 0.6,
    }
);

document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Empêche le comportement par défaut du lien

        // Sélectionne l'élément cible
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        // Défilement avec un offset de 100px avant l'élément
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});

sections.forEach(section => {
    observer.observe(section)
});