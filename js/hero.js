/* ============================================================
   Hero: entrance animation trigger + the quick "hero__index"
   list of selected work, built from window.PROJECTS.
   ============================================================ */
(function (App) {
  App.initHero = function () {
    var hero = document.getElementById("top");
    if (!hero) return;

    var list = document.getElementById("heroIndex");
    if (list) {
      var visible = window.PROJECTS.filter(function (p) { return !p.hidden; });
      list.innerHTML = visible
        .map(function (p) {
          return (
            '<button class="hero__idxRow" type="button" data-open="' + p.id + '">' +
              '<span class="n">' + p.num + "</span>" +
              '<span class="nm">' + p.name + "</span>" +
              '<span class="ct">' + p.teaser + "</span>" +
              '<span class="ar">→</span>' +
            "</button>"
          );
        })
        .join("");
      list.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-open]");
        if (btn && App.openCase) App.openCase(btn.getAttribute("data-open"));
      });
    }

    // trigger the mask/blur entrance once the hero has painted
    requestAnimationFrame(function () {
      setTimeout(function () { hero.classList.add("is-in"); }, 120);
    });
  };
})(window.App = window.App || {});
