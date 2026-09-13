/* ============================================================
   Reveal-on-scroll
   Call App.initReveal() once, after all sections (including
   any JS-rendered ones) are in the DOM.
   ============================================================ */
(function (App) {
  App.initReveal = function () {
    var els = document.querySelectorAll(".reveal:not(.in)");
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
    });
    var rest = document.querySelectorAll(".reveal:not(.in)");
    if (!rest.length) return;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    rest.forEach(function (el) { io.observe(el); });
  };
})(window.App = window.App || {});
