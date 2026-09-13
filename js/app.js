/* ============================================================
   App entry point — wires everything up once the DOM is ready.
   ============================================================ */
(function (App) {
  function onReady(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  onReady(function () {
    App.initNav();
    App.initHero();
    App.initProjects({ onOpen: App.openCase });
    App.initCaseStudy();
    // reveal is wired last, once every .reveal element (including the
    // ones just rendered by initProjects) exists in the DOM
    App.initReveal();

    // deep-link: open a case study directly if the URL already has #id
    var hash = location.hash.replace("#", "");
    if (hash && window.PROJECTS.some(function (p) { return p.id === hash; })) {
      App.openCase(hash);
    }
  });
})(window.App = window.App || {});
