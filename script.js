/* Teaology Nelson — site behaviour */
(function () {
  "use strict";

  /* Intro overlay */
  window.addEventListener("load", function () {
    var intro = document.getElementById("intro");
    if (!intro) return;
    setTimeout(function () { intro.classList.add("hide"); }, 1150);
    setTimeout(function () { if (intro && intro.parentNode) intro.parentNode.removeChild(intro); }, 2000);
  });

  /* Mobile nav */
  var burger = document.querySelector(".hamburger");
  var menu = document.querySelector(".nav-menu-mobile");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Hero rolling slideshow */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (slides.length > 1 && !reduce) {
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove("active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("active");
    }, 5600);
  }

  /* Reveal on scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { obs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* Build Gmail compose links (email kept out of the HTML) */
  document.querySelectorAll("a[data-gmail]").forEach(function (a) {
    var to = a.getAttribute("data-user") + "@" + a.getAttribute("data-domain");
    a.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(to) +
      "&su=" + (a.getAttribute("data-su") || "") +
      "&body=" + (a.getAttribute("data-body") || "");
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* Footer year */
  var y = document.getElementById("yr");
  if (y) y.textContent = new Date().getFullYear();
})();
