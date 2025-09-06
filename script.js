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

function sendMail(){
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const serviceID = 'service_bustsk4';
        const templateID = 'template_wvs4ljr';
        const userID = 'BkJu11m7t8C9vDKT-';

        // Collecte des données du formulaire
        const templateParams = {
        username: document.getElementById('nom').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
        };

        const data = {
        service_id: serviceID,
        template_id: templateID,
        user_id: userID,
        template_params: templateParams
        };

        // Envoi de la requête avec Fetch API
        fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => {
        if (response.ok) {
            alert("Votre message a été envoyé avec succès.");
            document.getElementById('contact-form').reset();
        } else {
            return response.json().then(err => { throw err; });
        }
        })
        .catch(error => {
        alert("Une erreur s'est produite lors de l'envoi de votre message : " + error);
        });
    });
}