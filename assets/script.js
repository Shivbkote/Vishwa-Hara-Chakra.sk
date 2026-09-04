
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".site-nav");
  const menu = document.querySelector(".mobile-panel");
  const menuBtn = document.querySelector(".menu-btn");
  const top = document.querySelector(".back-top");
  const glow = document.querySelector(".cursor-glow");

  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 30);
    top?.classList.toggle("show", window.scrollY > 650);
  }, { passive: true });

  menuBtn?.addEventListener("click", () => {
    menu?.classList.toggle("open");
    const open = menu?.classList.contains("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.innerHTML = open ? "<i></i><i></i><i></i>" : "<i></i><i></i><i></i>";
  });
  menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

  top?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const observer = new IntersectionObserver((entries, ob) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        ob.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal,.scale-in").forEach((el, i) => {
    el.style.setProperty("--delay", Math.min(i % 8, 5));
    observer.observe(el);
  });

  document.querySelectorAll("[data-count]").forEach(el => {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    const counter = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const start = performance.now();
        const run = now => {
          const p = Math.min((now - start) / 1200, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
        counter.disconnect();
      });
    }, { threshold: .5 });
    counter.observe(el);
  });

  document.querySelectorAll(".progress span[data-width]").forEach(el => {
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { el.style.width = el.dataset.width + "%"; io.disconnect(); }
    });
    io.observe(el);
  });

  if (glow && matchMedia("(hover:hover)").matches) {
    window.addEventListener("pointermove", e => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }, { passive: true });
  }

  document.querySelectorAll("[data-tilt]").forEach(card => {
    if (!matchMedia("(hover:hover)").matches) return;
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateY(-6px)`;
    });
    card.addEventListener("pointerleave", () => card.style.transform = "");
  });

  document.querySelectorAll("form[data-demo]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const toast = document.querySelector(".toast");
      toast?.classList.add("show");
      setTimeout(() => toast?.classList.remove("show"), 2800);
      form.reset();
    });
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
});


/* =====================================================
   QUICK IMPACT COUNTERS
   RESET EVERY 3 SECONDS
===================================================== */

const quickCounters =
  document.querySelectorAll(".quick-stats .counter");

if (quickCounters.length) {

  function animateQuickCounter(counter) {

    const target =
      Number(counter.dataset.target || 0);

    const suffix =
      counter.dataset.suffix || "";

    const duration = 1200;

    let startTime = null;

    function animate(timestamp) {

      if (!startTime) {
        startTime = timestamp;
      }

      const progress =
        Math.min(
          (timestamp - startTime) / duration,
          1
        );

      /* Smooth ease-out */
      const eased =
        1 - Math.pow(1 - progress, 3);

      const currentValue =
        Math.floor(target * eased);

      counter.textContent =
        currentValue.toLocaleString() + suffix;

      if (progress < 1) {

        requestAnimationFrame(animate);

      } else {

        counter.textContent =
          target.toLocaleString() + suffix;

      }
    }

    /* Reset to zero */
    counter.textContent = "0" + suffix;

    requestAnimationFrame(animate);
  }


  function resetAllCounters() {

    quickCounters.forEach(counter => {

      animateQuickCounter(counter);

    });

  }


  //funcation allreset 



  /* First animation */
  resetAllCounters();


  /* Reset and count again every 3 seconds */
  setInterval(() => {

    resetAllCounters();

  }, 3000);

}

/* =====================================================
   TEAM SECTION REVEAL
===================================================== */

const teamRevealItems =
  document.querySelectorAll(".reveal-team");

if (teamRevealItems.length) {

  const teamObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "team-visible"
          );

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.15
      }
    );


  teamRevealItems.forEach(item => {

    teamObserver.observe(item);

  });

}


// impact section 
document.addEventListener("DOMContentLoaded", () => {

  const metrics = document.querySelectorAll(
    ".vh-impact-metric"
  );

  if (!metrics.length) return;

  let currentIndex = 0;

  function animateCounter(element) {

    const target = Number(
      element.dataset.impactCount
    );

    const suffix =
      element.dataset.impactSuffix || "";

    const duration = 1200;

    const startTime = performance.now();


    function updateCounter(currentTime) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(elapsed / duration, 1);


      /* smooth easing */

      const eased =
        1 - Math.pow(1 - progress, 3);


      const value =
        Math.floor(target * eased);


      element.textContent =
        value.toLocaleString() + suffix;


      if (progress < 1) {

        requestAnimationFrame(
          updateCounter
        );

      } else {

        element.textContent =
          target.toLocaleString() + suffix;
      }

    }


    element.textContent = "0";

    requestAnimationFrame(
      updateCounter
    );
  }


  function showMetric(index) {

    metrics.forEach(
      metric => {

        metric.classList.remove(
          "active"
        );

      }
    );


    const current =
      metrics[index];

    current.classList.add(
      "active"
    );


    const number =
      current.querySelector(
        ".vh-impact-number"
      );


    animateCounter(number);
  }


  /* first metric */

  showMetric(currentIndex);


  /* change every 3 seconds */

  setInterval(() => {

    currentIndex++;

    if (
      currentIndex >=
      metrics.length
    ) {

      currentIndex = 0;
    }


    showMetric(currentIndex);

  }, 3000);

});

//email js


/* =====================================================
   VHC CONTACT FORM — EMAILJS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm =
        document.getElementById("vhc-contact-form");

    if (!contactForm) return;


    /* ---------------------------------------------
       EMAILJS CONFIGURATION
    --------------------------------------------- */

    emailjs.init({
        publicKey: "YOUR_PUBLIC_KEY"
    });


    /* ---------------------------------------------
       FORM SUBMISSION
    --------------------------------------------- */

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const submitButton =
            document.getElementById("vhc-submit");

        const buttonText =
            submitButton.querySelector(".button-text");

        const buttonArrow =
            submitButton.querySelector(".button-arrow");


        /* Prevent multiple submissions */

        submitButton.disabled = true;


        buttonText.textContent =
            "Sending...";

        buttonArrow.textContent =
            "⟳";


        /* -----------------------------------------
           SEND FORM
        ----------------------------------------- */

        emailjs.sendForm(

            "YOUR_SERVICE_ID",

            "YOUR_TEMPLATE_ID",

            contactForm

        )

        .then(function () {

            /* SUCCESS */

            buttonText.textContent =
                "Enquiry sent";

            buttonArrow.textContent =
                "✓";


            /* Reset form */

            contactForm.reset();


            /* Show toast */

            const toast =
                document.querySelector(".toast");

            if (toast) {

                toast.textContent =
                    "Thank you — your enquiry has been sent successfully.";

                toast.classList.add("show");

                setTimeout(function () {

                    toast.classList.remove("show");

                }, 5000);

            }


            /* Restore button */

            setTimeout(function () {

                submitButton.disabled = false;

                buttonText.textContent =
                    "Send enquiry";

                buttonArrow.textContent =
                    "→";

            }, 3000);


        })

        .catch(function (error) {

            /* ERROR */

            console.error(
                "EmailJS Error:",
                error
            );


            buttonText.textContent =
                "Try again";

            buttonArrow.textContent =
                "↻";


            const toast =
                document.querySelector(".toast");

            if (toast) {

                toast.textContent =
                    "Something went wrong. Please try again.";

                toast.classList.add("show");

                setTimeout(function () {

                    toast.classList.remove("show");

                }, 5000);

            }


            submitButton.disabled = false;

        });

    });

});








  

document.addEventListener("DOMContentLoaded", function () {

    const orbitSystem = document.getElementById("vhcOrbit");

    if (!orbitSystem) return;


    /* =====================================================
       PAUSE ORBITS WHEN HERO IS NOT VISIBLE
    ===================================================== */

    const rings =
        orbitSystem.querySelectorAll(".vhc-orbit-ring");


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        orbitSystem.classList.remove(
                            "vhc-orbits-paused"
                        );

                    } else {

                        orbitSystem.classList.add(
                            "vhc-orbits-paused"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    observer.observe(orbitSystem);


    /* =====================================================
       MOUSE INTERACTION
       Subtle movement of whole orbit system
    ===================================================== */

    const hero =
        document.getElementById("vhc-hero");


    if (window.matchMedia("(pointer:fine)").matches) {

        hero.addEventListener("mousemove", function (event) {

            const rect =
                hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width - .5;

            const y =
                (event.clientY - rect.top)
                / rect.height - .5;


            orbitSystem.style.transform =
                `translate(${x * 8}px, ${y * 8}px)`;

        });


        hero.addEventListener("mouseleave", function () {

            orbitSystem.style.transform =
                "translate(0,0)";

        });

    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function handleMotion() {

        if (reducedMotion.matches) {

            rings.forEach(function (ring) {

                ring.style.animation =
                    "none";

            });

        }

    }


    handleMotion();

    reducedMotion.addEventListener(
        "change",
        handleMotion
    );

});
