/* ============================================================
   Full-viewport case study overlay: renders one project's
   content into .case, wires close / next / carousel, deep-links
   via location.hash, and locks body scroll while open.
   ============================================================ */
(function (App) {
  var overlay = null;
  var carousel = null;

  function metaListHtml(items) {
    return "<ul class=\"case__metaList\">" + items.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
  }
  function bulListHtml(items) {
    return '<ul class="case__bul">' + items.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
  }
  function numberedListHtml(items) {
    return (
      '<ol class="case__list">' +
      items
        .map(function (x, i) {
          return (
            "<li><span class=\"case__list-n\">" + String(i + 1).padStart(2, "0") + "</span>" +
            '<span class="case__list-t">' + x + "</span></li>"
          );
        })
        .join("") +
      "</ol>"
    );
  }

  function render(p) {
    var visible = window.PROJECTS.filter(function (x) { return !x.hidden; });
    var idx = visible.findIndex(function (x) { return x.id === p.id; });
    var next = visible[(idx + 1) % visible.length];
    var media = [p.cover].concat(p.gallery || []).filter(Boolean);

    var roleItems = p.role.split(/ & | · /);
    var teamItems = p.team.split(" · ");
    var challengeItems = p.challengeList || [p.challenge, p.challenge2].filter(Boolean);
    var contribItems = p.contribution || p.learnings || [];

    var html = "";
    html +=
      '<div class="case__bar">' +
        '<button class="case__close" type="button"><span>←</span> Close</button>' +
        '<span class="case__idx">' + p.num + " / " + String(visible.length).padStart(2, "0") + " · " + p.year + "</span>" +
      "</div>";

    html += '<div class="wrap">';

    html +=
      '<div class="case__hero">' +
        '<div class="eyebrow case__cat" style="color:var(--accent)">' + p.category + "</div>" +
        '<h1 class="case__title">' + p.name + "</h1>" +
        '<p class="case__sub">' + p.sub + "</p>" +
      "</div>";

    if (media.length) {
      html += '<div class="case__cover"><div id="caseCarouselMount"></div></div>';
    } else {
      html +=
        '<div class="case__nda">' +
          '<span class="case__nda-lbl">Confidential</span>' +
          "<p>" + (p.ndaNote || "For confidentiality reasons I don't show product views — this is about my role, my way of working, and handling complex requirements.") + "</p>" +
        "</div>";
    }

    html += '<div class="case__metaRow">';
    html += "<div><h5>Year</h5><p>" + p.year + "</p></div>";
    html += "<div><h5>Role</h5>" + metaListHtml(roleItems) + "</div>";
    html += "<div><h5>Context</h5>" + metaListHtml(teamItems) + "</div>";
    html += "<div><h5>Skills</h5>" + metaListHtml(p.skills) + "</div>";
    if (p.collab) html += "<div><h5>Collaboration</h5>" + metaListHtml(p.collab) + "</div>";
    html += "</div>";

    html += '<div class="case__body">';
    html +=
      "<div><h3 class=\"case__h\">Starting point</h3>" +
      '<p class="case__p">' + p.context + "</p>" +
      (p.context2 ? '<p class="case__p">' + p.context2 + "</p>" : "") +
      (p.contextList ? bulListHtml(p.contextList) : "") +
      "</div>";
    html += '<div><h3 class="case__h">' + (p.challengeTitle || "Challenge") + "</h3>" + bulListHtml(challengeItems) + "</div>";
    html += "</div>";

    if (contribItems.length) {
      html +=
        '<div class="case__contrib">' +
          '<h3 class="case__h">My contribution</h3>' +
          numberedListHtml(contribItems) +
          (p.liveUrl
            ? '<a class="btn btn--solid" href="' + p.liveUrl + '" target="_blank" rel="noopener" style="margin-top:28px">View live project ↗</a>'
            : "") +
        "</div>";
    }

    html +=
      '<button class="case__nextBtn" type="button" data-next="' + next.id + '">' +
        '<div><span class="lbl">Next project →</span><div class="nm">' + next.name + "</div></div>" +
        '<span style="font-family:var(--font-mono);font-size:13px;color:var(--ink-soft)">' + next.num + "</span>" +
      "</button>";

    html += "</div>"; // .wrap

    overlay.innerHTML = html;
    overlay.style.setProperty("--accent", p.accent);

    if (carousel) { carousel.destroy(); carousel = null; }
    if (media.length) {
      var mount = overlay.querySelector("#caseCarouselMount");
      if (mount) carousel = App.createCarousel(mount, media, p.accent);
    }
  }

  function open(id) {
    var p = window.PROJECTS.find(function (x) { return x.id === id; });
    if (!p || !overlay) return;
    render(p);
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    overlay.scrollTop = 0;
    history.replaceState(null, "", "#" + id);
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (carousel) { carousel.destroy(); carousel = null; }
    history.replaceState(null, "", "#projekte");
  }

  App.openCase = open;
  App.closeCase = close;

  App.initCaseStudy = function () {
    overlay = document.querySelector(".case");
    if (!overlay) return;

    overlay.addEventListener("click", function (e) {
      if (e.target.closest(".case__close")) { close(); return; }
      var nextBtn = e.target.closest(".case__nextBtn");
      if (nextBtn) open(nextBtn.getAttribute("data-next"));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("open")) close();
    });
  };
})(window.App = window.App || {});
