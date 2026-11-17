
/* ==========================================
   Razan Ali - Portfolio JavaScript
========================================== */


/* ==========================================
   1. DOM Elements
========================================== */

const body = document.body;

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const themeToggle = document.getElementById("themeToggle");

const backToTop = document.getElementById("backToTop");

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

const projectModal = document.getElementById("projectModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalFeatures = document.getElementById("modalFeatures");
const modalTags = document.getElementById("modalTags");
const modalLink = document.getElementById("modalLink");


/* ==========================================
   2. Mobile Navigation
========================================== */

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", isOpen);

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);
        }

    });


    // Close menu when clicking a navigation link

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });


    // Close menu when clicking outside

    document.addEventListener("click", (event) => {

        const clickedInsideMenu = navLinks.contains(event.target);

        const clickedMenuButton = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });

}


/* ==========================================
   3. Dark Mode
========================================== */

if (themeToggle) {

    const themeIcon = themeToggle.querySelector("i");

    // Restore saved theme

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("razan-portfolio-theme");
    } catch (error) {
        console.warn("Theme preference could not be loaded.");
    }


    // Apply saved theme

    if (savedTheme === "dark") {

        body.classList.add("dark-mode");

    }


    // Update theme icon

    function updateThemeIcon() {

        if (!themeIcon) return;

        if (body.classList.contains("dark-mode")) {

            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");

            themeToggle.setAttribute("aria-label", "Switch to light mode");

        } else {

            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");

            themeToggle.setAttribute("aria-label", "Switch to dark mode");

        }

    }

    updateThemeIcon();


    // Toggle theme

    themeToggle.addEventListener("click", () => {

        body.classList.toggle("dark-mode");

        const currentTheme = body.classList.contains("dark-mode")
            ? "dark"
            : "light";

        try {
            localStorage.setItem("razan-portfolio-theme", currentTheme);
        } catch (error) {
            console.warn("Theme preference could not be saved.");
        }

        updateThemeIcon();

    });

}


/* ==========================================
   4. Project Filtering
========================================== */

if (filterButtons.length && projectCards.length) {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter;

            // Update active filter button

            filterButtons.forEach(filter => {
                filter.classList.remove("active");
            });

            button.classList.add("active");


            // Filter projects

            projectCards.forEach(card => {

                const projectCategory = card.dataset.category;

                const shouldShow =
                    selectedFilter === "all" ||
                    selectedFilter === projectCategory;

                if (shouldShow) {

                    card.style.display = "";

                    requestAnimationFrame(() => {
                        card.classList.remove("filtered-out");
                        card.classList.add("filtered-in");
                    });

                } else {

                    card.classList.remove("filtered-in");
                    card.classList.add("filtered-out");

                    card.style.display = "none";

                }

            });

        });

    });

}


/* ==========================================
   5. Project Details Data
========================================== */

const projectsData = {

    haid: {

        title: "H-AID – Humanitarian Aid Distribution System",

        description:
            "A front-end graduation project designed to support the organization of humanitarian aid distribution. The system provides interfaces for managing beneficiaries, resources, distribution operations, and reports.",

        features: [
            "Dashboard for displaying key system information.",
            "Beneficiary management interface.",
            "Resource management interface.",
            "Aid distribution management.",
            "Reports and data summaries.",
            "LocalStorage for saving demonstration data."
        ],

        technologies: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "LocalStorage"
        ],

        link: "https://github.com/razanhali/H-AID"

    },


    taskflow: {

        title: "TaskFlow – Task Management Application",

        description:
            "A task management application that helps users organize daily tasks, track progress, and manage their work through an interactive interface.",

        features: [
            "Create, edit, and delete tasks.",
            "Drag-and-drop task organization.",
            "Save tasks using LocalStorage.",
            "Visual task statistics with Chart.js.",
            "Dark mode support.",
            "Responsive user interface."
        ],

        technologies: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "LocalStorage",
            "Chart.js"
        ],

link: "https://github.com/razanhali/TaskFlow"
    },


    eduverse: {

        title: "EduVerse – Online Learning Platform",

        description:
            "A responsive online learning platform that allows users to explore educational courses, browse categories, and filter courses according to their preferences.",

        features: [
            "Browse different course categories.",
            "Search and filter available courses.",
            "Filter by level, price, and duration.",
            "Responsive layouts for different devices.",
            "Interactive interface using JavaScript."
        ],

        technologies: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Font Awesome",
            "Responsive Design"
        ],

        link: "https://github.com/razanhali/EduVerse"

    }

};


/* ==========================================
   6. Open Project Modal
========================================== */

function openProjectModal(projectId) {

    const project = projectsData[projectId];

    if (!project || !projectModal) return;


    // Set project information

    modalTitle.textContent = project.title;

    modalDescription.textContent = project.description;


    // Display features

    modalFeatures.innerHTML = "";

    project.features.forEach(feature => {

        const listItem = document.createElement("li");

        listItem.textContent = feature;

        modalFeatures.appendChild(listItem);

    });


    // Display technologies

    modalTags.innerHTML = "";

    project.technologies.forEach(technology => {

        const tag = document.createElement("span");

        tag.textContent = technology;

        modalTags.appendChild(tag);

    });


    // Show or hide project link

    if (project.link) {

        modalLink.href = project.link;

        modalLink.style.display = "inline-flex";

    } else {

        modalLink.removeAttribute("href");

        modalLink.style.display = "none";

    }


    // Open modal

    projectModal.classList.add("active");

    body.classList.add("modal-open");

    projectModal.setAttribute("aria-hidden", "false");

    if (modalClose) {
        modalClose.focus();
    }

}


// Connect project buttons to modal

document.querySelectorAll(".project-details-btn").forEach(button => {

    button.addEventListener("click", () => {

        const projectId = button.dataset.project;

        openProjectModal(projectId);

    });

});


/* ==========================================
   7. Close Project Modal
========================================== */

function closeProjectModal() {

    if (!projectModal) return;

    projectModal.classList.remove("active");

    body.classList.remove("modal-open");

    projectModal.setAttribute("aria-hidden", "true");

}


// Close using close button

if (modalClose) {

    modalClose.addEventListener("click", closeProjectModal);

}


// Close by clicking overlay

if (modalOverlay) {

    modalOverlay.addEventListener("click", closeProjectModal);

}


/* ==========================================
   8. Close Modal With Escape Key
========================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeProjectModal();

        // Also close mobile navigation

        if (navLinks && menuToggle) {

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    }

});


/* ==========================================
   9. Scroll Reveal Animation
========================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    // Fallback for older browsers

    revealElements.forEach(element => {

        element.classList.add("active");

    });

}


/* ==========================================
   10. Header Scroll Effect
========================================== */

function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


/* ==========================================
   11. Back To Top Button
========================================== */

function handleBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ==========================================
   12. Active Navigation Link
========================================== */

const pageSections = document.querySelectorAll("main section[id]");

const navigationLinks = document.querySelectorAll(".nav-link");


function updateActiveNavigation() {

    let currentSection = "home";

    const scrollPosition = window.scrollY + 160;

    pageSections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.id;

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


/* ==========================================
   13. Scroll Event
========================================== */

window.addEventListener("scroll", () => {

    handleHeaderScroll();

    handleBackToTop();

    updateActiveNavigation();

}, { passive: true });


/* ==========================================
   14. Initial Page Setup
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    handleHeaderScroll();

    handleBackToTop();

    updateActiveNavigation();

});
