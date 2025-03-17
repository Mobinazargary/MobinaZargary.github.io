// 1. Fade-in on scroll
const scrollElements = document.querySelectorAll(".fade-in-scroll");

function elementInView(el, offset = 150) {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) - offset
    );
}

function displayScrollElement(el) {
    el.style.opacity = 1;
    el.style.transform = "translateY(0)";
}

function hideScrollElement(el) {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
}

function handleScrollAnimation() {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
}

window.addEventListener("scroll", handleScrollAnimation);
handleScrollAnimation(); // run on load

// 2. Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// 3. Formspree success/fail messages
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // prevent normal form submission
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                // success
                status.textContent = "Thanks for your submission!";
                status.style.color = "#4caf50"; // green text
                form.reset();
            } else {
                // server error
                const result = await response.json();
                if (result.errors) {
                    status.textContent = result.errors
                        .map(err => err.message)
                        .join(", ");
                } else {
                    status.textContent = "Oops! There was a problem submitting your form.";
                }
                status.style.color = "#f44336"; // red text
            }
        } catch (error) {
            // network error or other
            status.textContent = "Oops! There was a problem submitting your form.";
            status.style.color = "#f44336"; // red text
        }
    });
}
