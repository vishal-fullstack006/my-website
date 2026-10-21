/* =========================================================
   CAREPOINT - COMPLETE SCRIPT.JS
   ========================================================= */

/* =========================================================
   DARK / LIGHT MODE
   ========================================================= */

(function () {
    const themeToggle = document.getElementById("themeToggle");
    const root = document.documentElement;

    function updateThemeButton() {
        if (!themeToggle) return;

        const isDark = root.getAttribute("data-theme") === "dark";

        themeToggle.textContent = isDark ? "☀️" : "🌙";
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
        themeToggle.setAttribute(
            "title",
            isDark ? "Light mode" : "Dark mode"
        );
    }

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("carepoint-theme");
    } catch (error) {
        console.log("LocalStorage is not available.");
    }

    if (savedTheme === "dark") {
        root.setAttribute("data-theme", "dark");
    } else {
        root.removeAttribute("data-theme");
    }

    updateThemeButton();

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const isDark =
                root.getAttribute("data-theme") === "dark";

            if (isDark) {
                root.removeAttribute("data-theme");

                try {
                    localStorage.setItem(
                        "carepoint-theme",
                        "light"
                    );
                } catch (error) {
                    console.log("Unable to save theme.");
                }
            } else {
                root.setAttribute("data-theme", "dark");

                try {
                    localStorage.setItem(
                        "carepoint-theme",
                        "dark"
                    );
                } catch (error) {
                    console.log("Unable to save theme.");
                }
            }

            updateThemeButton();
        });
    }
})();


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar a");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", function () {
            navbar.classList.toggle("active");

            const expanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                !expanded
            );
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navbar) {
                navbar.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    });


    /* =====================================================
       TOAST MESSAGE
       ===================================================== */

    const toast = document.getElementById("toast");

    function showToast(message, type = "success") {
        if (!toast) return;

        toast.textContent = message;

        toast.classList.remove(
            "show",
            "success",
            "error"
        );

        toast.classList.add(type);
        toast.classList.add("show");

        setTimeout(function () {
            toast.classList.remove("show");
        }, 3500);
    }

    window.showToast = showToast;


    /* =====================================================
       APPOINTMENT FORM
       ===================================================== */

    const appointmentForm =
        document.getElementById("appointmentForm");

    if (appointmentForm) {

        appointmentForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const name =
                    document.getElementById("name");

                const email =
                    document.getElementById("email");

                const phone =
                    document.getElementById("phone");

                const doctor =
                    document.getElementById("doctor");

                const date =
                    document.getElementById("date");

                const time =
                    document.getElementById("time");

                if (
                    !name ||
                    !email ||
                    !phone ||
                    !doctor ||
                    !date ||
                    !time
                ) {
                    showToast(
                        "Please fill in all required fields.",
                        "error"
                    );
                    return;
                }

                if (
                    name.value.trim() === "" ||
                    email.value.trim() === "" ||
                    phone.value.trim() === "" ||
                    doctor.value.trim() === "" ||
                    date.value.trim() === "" ||
                    time.value.trim() === ""
                ) {
                    showToast(
                        "Please fill in all required fields.",
                        "error"
                    );
                    return;
                }

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email.value)) {
                    showToast(
                        "Please enter a valid email address.",
                        "error"
                    );
                    return;
                }

                const phonePattern =
                    /^[0-9]{10}$/;

                if (!phonePattern.test(phone.value)) {
                    showToast(
                        "Please enter a valid 10-digit phone number.",
                        "error"
                    );
                    return;
                }

                showToast(
                    "Appointment booked successfully! We will contact you shortly.",
                    "success"
                );

                appointmentForm.reset();

            }
        );

    }


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const name =
                    contactForm.querySelector(
                        '[name="name"]'
                    );

                const email =
                    contactForm.querySelector(
                        '[name="email"]'
                    );

                const message =
                    contactForm.querySelector(
                        '[name="message"]'
                    );

                if (
                    !name ||
                    !email ||
                    !message ||
                    name.value.trim() === "" ||
                    email.value.trim() === "" ||
                    message.value.trim() === ""
                ) {
                    showToast(
                        "Please fill in all fields.",
                        "error"
                    );
                    return;
                }

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email.value)) {
                    showToast(
                        "Please enter a valid email address.",
                        "error"
                    );
                    return;
                }

                showToast(
                    "Your message has been sent successfully!",
                    "success"
                );

                contactForm.reset();

            }
        );

    }


    /* =====================================================
       DOCTOR SEARCH
       ===================================================== */

    const doctorSearch =
        document.getElementById("doctorSearch");

    const doctorCards =
        document.querySelectorAll(".doctor-card");

    if (doctorSearch && doctorCards.length > 0) {

        doctorSearch.addEventListener(
            "input",
            function () {

                const searchValue =
                    doctorSearch.value
                        .toLowerCase()
                        .trim();

                doctorCards.forEach(function (card) {

                    const cardText =
                        card.textContent.toLowerCase();

                    if (
                        cardText.includes(searchValue)
                    ) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }

                });

            }
        );

    }


    /* =====================================================
       DOCTOR PROFILE DATA
       ===================================================== */

    const doctors = {

        "1": {
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist",
            experience: "12+ Years Experience",
            education: "MD, Cardiology",
            hospital: "CarePoint Medical Center",
            rating: "4.9",
            patients: "2,500+",
            about:
                "Dr. Sarah Johnson is an experienced cardiologist specializing in preventive cardiology, heart disease management, and cardiovascular health.",
            image:
                "https://randomuser.me/api/portraits/women/44.jpg"
        },

        "2": {
            name: "Dr. Michael Chen",
            specialty: "Neurologist",
            experience: "10+ Years Experience",
            education: "MD, Neurology",
            hospital: "CarePoint Medical Center",
            rating: "4.8",
            patients: "2,100+",
            about:
                "Dr. Michael Chen provides advanced neurological care with a focus on headaches, migraines, nerve disorders, and neurological conditions.",
            image:
                "https://randomuser.me/api/portraits/men/32.jpg"
        },

        "3": {
            name: "Dr. Emily Davis",
            specialty: "Dermatologist",
            experience: "9+ Years Experience",
            education: "MD, Dermatology",
            hospital: "CarePoint Medical Center",
            rating: "4.9",
            patients: "1,900+",
            about:
                "Dr. Emily Davis specializes in medical and cosmetic dermatology, skin health, acne treatment, and advanced skin care.",
            image:
                "https://randomuser.me/api/portraits/women/65.jpg"
        },

        "4": {
            name: "Dr. James Wilson",
            specialty: "Orthopedic Specialist",
            experience: "15+ Years Experience",
            education: "MD, Orthopedics",
            hospital: "CarePoint Medical Center",
            rating: "4.8",
            patients: "3,000+",
            about:
                "Dr. James Wilson specializes in orthopedic treatment, joint health, sports injuries, and musculoskeletal conditions.",
            image:
                "https://randomuser.me/api/portraits/men/45.jpg"
        },

        "5": {
            name: "Dr. Olivia Brown",
            specialty: "Pediatrician",
            experience: "8+ Years Experience",
            education: "MD, Pediatrics",
            hospital: "CarePoint Medical Center",
            rating: "4.9",
            patients: "1,700+",
            about:
                "Dr. Olivia Brown provides compassionate healthcare for children and focuses on preventive pediatric care and childhood development.",
            image:
                "https://randomuser.me/api/portraits/women/68.jpg"
        },

        "6": {
            name: "Dr. Daniel Smith",
            specialty: "General Physician",
            experience: "11+ Years Experience",
            education: "MD, General Medicine",
            hospital: "CarePoint Medical Center",
            rating: "4.8",
            patients: "2,300+",
            about:
                "Dr. Daniel Smith provides comprehensive medical care for common illnesses, preventive health, and general medical conditions.",
            image:
                "https://randomuser.me/api/portraits/men/52.jpg"
        }

    };


    /* =====================================================
       DOCTOR PROFILE MODAL
       ===================================================== */

    const doctorModal =
        document.getElementById("doctorModal");

    const modalClose =
        document.querySelector(".modal-close");

    const viewProfileButtons =
        document.querySelectorAll(".view-profile");

    function openDoctorModal(doctorId) {

        if (!doctorModal) return;

        const doctor = doctors[doctorId];

        if (!doctor) {
            showToast(
                "Doctor information not found.",
                "error"
            );
            return;
        }

        const modalName =
            document.getElementById("modalDoctorName");

        const modalSpecialty =
            document.getElementById("modalDoctorSpecialty");

        const modalExperience =
            document.getElementById("modalDoctorExperience");

        const modalEducation =
            document.getElementById("modalDoctorEducation");

        const modalHospital =
            document.getElementById("modalDoctorHospital");

        const modalRating =
            document.getElementById("modalDoctorRating");

        const modalPatients =
            document.getElementById("modalDoctorPatients");

        const modalAbout =
            document.getElementById("modalDoctorAbout");

        const modalImage =
            document.getElementById("modalDoctorImage");

        if (modalName) {
            modalName.textContent = doctor.name;
        }

        if (modalSpecialty) {
            modalSpecialty.textContent =
                doctor.specialty;
        }

        if (modalExperience) {
            modalExperience.textContent =
                doctor.experience;
        }

        if (modalEducation) {
            modalEducation.textContent =
                doctor.education;
        }

        if (modalHospital) {
            modalHospital.textContent =
                doctor.hospital;
        }

        if (modalRating) {
            modalRating.textContent =
                doctor.rating;
        }

        if (modalPatients) {
            modalPatients.textContent =
                doctor.patients;
        }

        if (modalAbout) {
            modalAbout.textContent =
                doctor.about;
        }

        if (modalImage) {
            modalImage.src =
                doctor.image;

            modalImage.alt =
                doctor.name;
        }

        doctorModal.classList.add("active");

        document.body.classList.add(
            "modal-open"
        );

    }


    viewProfileButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const doctorId =
                    button.dataset.doctor ||
                    button.getAttribute(
                        "data-doctor"
                    );

                openDoctorModal(doctorId);

            }
        );

    });


    /* =====================================================
       CLOSE DOCTOR MODAL
       ===================================================== */

    function closeDoctorModal() {

        if (!doctorModal) return;

        doctorModal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeDoctorModal
        );

    }


    if (doctorModal) {

        doctorModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === doctorModal
                ) {
                    closeDoctorModal();
                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {
                closeDoctorModal();
            }

        }
    );


    /* =====================================================
       BOOK APPOINTMENT FROM DOCTOR PROFILE
       ===================================================== */

    const modalBookButton =
        document.getElementById(
            "modalBookAppointment"
        );

    if (modalBookButton) {

        modalBookButton.addEventListener(
            "click",
            function () {

                closeDoctorModal();

                window.location.href =
                    "appointment.html";

            }
        );

    }


    /* =====================================================
       URL SEARCH / DOCTOR QUERY
       ===================================================== */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const doctorQuery =
        urlParams.get("doctor");

    if (
        doctorQuery &&
        doctorSearch
    ) {

        doctorSearch.value =
            doctorQuery;

        doctorSearch.dispatchEvent(
            new Event("input")
        );

    }


    /* =====================================================
       SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .fade-up, .animate"
        );

    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );

        revealElements.forEach(
            function (element) {
                observer.observe(element);
            }
        );

    } else {

        revealElements.forEach(
            function (element) {
                element.classList.add(
                    "visible"
                );
            }
        );

    }


    /* =====================================================
       COUNTER ANIMATION
       ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    function animateCounter(element) {

        const target =
            parseInt(
                element.getAttribute(
                    "data-counter"
                ),
                10
            );

        if (
            isNaN(target)
        ) {
            return;
        }

        let current = 0;

        const duration = 1500;

        const stepTime =
            Math.max(
                Math.floor(
                    duration / target
                ),
                10
            );

        const counter =
            setInterval(
                function () {

                    current += 1;

                    element.textContent =
                        current.toLocaleString();

                    if (
                        current >= target
                    ) {

                        element.textContent =
                            target.toLocaleString();

                        clearInterval(counter);

                    }

                },
                stepTime
            );

    }


    if (
        counters.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCounter(
                                    entry.target
                                );

                                counterObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );

        counters.forEach(
            function (counter) {
                counterObserver.observe(
                    counter
                );
            }
        );

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "#currentYear"
        );

    yearElements.forEach(
        function (element) {

            element.textContent =
                new Date().getFullYear();

        }
    );


    /* =====================================================
       SET MINIMUM APPOINTMENT DATE
       ===================================================== */

    const appointmentDate =
        document.getElementById("date");

    if (appointmentDate) {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");

        appointmentDate.min =
            `${year}-${month}-${day}`;

    }


    /* =====================================================
       PAGE LOADED
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});