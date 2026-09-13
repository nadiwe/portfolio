/* ============================================================
   Sticky nav: live Zurich clock, scroll-progress bar,
   smooth in-page scrolling for [data-nav] links.
   ============================================================ */
(function (App) {
  App.initNav = function () {
    var timeEl = document.querySelector(".nav__time");
    function formatTime() {
      return new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Zurich",
      });
    }
    function tick() { if (timeEl) timeEl.textContent = "Zurich · " + formatTime(); }
    tick();
    setInterval(tick, 10000);

    var bar = document.querySelector(".progress");
    function onScroll() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? h.scrollTop / max : 0;
      if (bar) bar.style.width = (p * 100) + "%";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    document.querySelectorAll("[data-nav]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var href = a.getAttribute("href") || "";
        if (href.charAt(0) !== "#") return;
        var target = document.getElementById(href.slice(1));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      });
    });
  };
})(window.App = window.App || {});
