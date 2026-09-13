/* ============================================================
   Selected Work index — one row per visible project.
   Clicking a row opens the case study overlay.
   ============================================================ */
(function (App) {
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  App.initProjects = function (opts) {
    var onOpen = opts && opts.onOpen;
    var list = document.querySelector(".proj-list");
    var countEl = document.querySelector("#projekte .section__count");
    var visible = window.PROJECTS.filter(function (p) { return !p.hidden; });

    if (countEl) countEl.textContent = "(" + String(visible.length).padStart(2, "0") + ") — 2023–today";
    if (!list) return;

    list.innerHTML = visible
      .map(function (p) {
        var tags = p.tags.map(function (t) { return "<span>" + escapeHtml(t) + "</span>"; }).join("");
        return (
          '<a class="proj reveal" href="#' + p.id + '" data-open="' + p.id + '" style="--accent:' + p.accent + '">' +
            '<span class="proj__num">' + p.num + "</span>" +
            '<span class="proj__name">' + escapeHtml(p.name) + "</span>" +
            '<span class="proj__sub">' + escapeHtml(p.sub) + "</span>" +
            '<span class="proj__tags">' + tags + "</span>" +
            '<span class="proj__cta">' + escapeHtml(p.cta || "View case study") + "</span>" +
            '<span class="proj__arrow">→</span>' +
          "</a>"
        );
      })
      .join("");

    list.addEventListener("click", function (e) {
      var a = e.target.closest("[data-open]");
      if (!a) return;
      e.preventDefault();
      if (onOpen) onOpen(a.getAttribute("data-open"));
    });
  };
})(window.App = window.App || {});
