// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex"
    hamburger.classList.toggle("active")
  })
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.style.display = "none"
    if (hamburger) hamburger.classList.remove("active")
  })
})

// Smooth Scroll Behavior (enhanced for older browsers)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Intersection Observer for animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.animation = "fadeIn 0.8s ease forwards"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe project cards for animation
document.querySelectorAll(".project-card").forEach((card) => {
  card.style.opacity = "0"
  observer.observe(card)
})

// Parallax Scrolling Effect
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY
  const heroAccent = document.querySelector(".hero-accent")

  if (heroAccent) {
    heroAccent.style.transform = `translateY(${scrollY * 0.5}px)`
  }
})

// Add hover glow effect to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    card.style.setProperty("--mouse-x", x + "px")
    card.style.setProperty("--mouse-y", y + "px")
  })
})

// Scroll to top button (optional enhancement)
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.5)"
  } else {
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)"
  }
})

// Initial animation on page load
window.addEventListener("load", () => {
  document.body.style.animation = "fadeIn 0.8s ease"
})

const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const message = document.getElementById("message").value.trim()

    // Basic validation
    if (!name || !email || !message) {
      showFormMessage("Please fill in all fields.", "error")
      return
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showFormMessage("Please enter a valid email address.", "error")
      return
    }

    // Show success message
    showFormMessage("Thank you for your message! I'll get back to you soon.", "success")

    // Reset form
    contactForm.reset()

    // Clear message after 5 seconds
    setTimeout(() => {
      formMessage.classList.remove("success", "error")
      formMessage.textContent = ""
    }, 5000)
  })
}

function showFormMessage(text, type) {
  formMessage.textContent = text
  formMessage.classList.remove("success", "error")
  formMessage.classList.add(type)
}
