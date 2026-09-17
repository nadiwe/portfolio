/* ============================================================
   Hero: entrance animation trigger.
   ============================================================ */
(function (App) {
  App.initHero = function () {
    var hero = document.getElementById("top");
    if (!hero) return;

    // trigger the mask/blur entrance once the hero has painted
    requestAnimationFrame(function () {
      setTimeout(function () { hero.classList.add("is-in"); }, 120);
    });
  };
})(window.App = window.App || {});
