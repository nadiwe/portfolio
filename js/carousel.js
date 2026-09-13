/* ============================================================
   Media carousel used inside the case study overlay.
   Auto-advances every 5s, pauses on hover, dedupes by src.
   App.createCarousel(container, items, accent) renders into
   `container` (which must stay in the DOM) and returns
   { destroy() } to stop its timer.
   ============================================================ */
(function (App) {
  function mediaHtml(item, accent, showCap) {
    if (!item) return "";
    var bg = item.bg === "ink" ? "var(--ink)" : item.bg === "paper" ? "var(--paper-2)" : "var(--accent)";
    var fit = item.fit || "cover";
    var label = item.label ? String(item.label).replace(/"/g, "&quot;") : "";
    var inner =
      item.type === "video"
        ? '<video class="media__el" style="object-fit:' + fit + '" src="' + item.src + '" controls playsinline muted loop preload="metadata"></video>'
        : '<img class="media__el" style="object-fit:' + fit + '" src="' + item.src + '" alt="' + label + '" loading="lazy" />';
    var cap = showCap && item.label ? '<span class="media__cap">' + item.label + "</span>" : "";
    return '<div class="media" style="background:' + bg + ";--accent:" + accent + '">' + inner + cap + "</div>";
  }

  App.createCarousel = function (container, rawItems, accent) {
    var seen = {};
    var items = (rawItems || []).filter(Boolean).filter(function (m) {
      if (seen[m.src]) return false;
      seen[m.src] = true;
      return true;
    });
    var n = items.length;
    container.innerHTML = "";
    if (!n) return { destroy: function () {} };

    var i = 0;
    var timer = null;

    function render() {
      var slides = items
        .map(function (m, k) {
          return (
            '<div class="carousel__slide' + (k === i ? " is-on" : "") + '" aria-hidden="' + (k !== i) + '">' +
              mediaHtml(m, accent, true) +
            "</div>"
          );
        })
        .join("");

      var ui = "";
      if (n > 1) {
        var dots = items
          .map(function (m, k) {
            return '<button class="carousel__dot' + (k === i ? " is-on" : "") + '" data-i="' + k + '" aria-label="Image ' + (k + 1) + '"></button>';
          })
          .join("");
        ui =
          '<div class="carousel__ui">' +
            '<button class="carousel__nav" data-dir="-1" aria-label="Previous image">←</button>' +
            '<div class="carousel__dots">' + dots + "</div>" +
            '<button class="carousel__nav" data-dir="1" aria-label="Next image">→</button>' +
            '<span class="carousel__idx">' + String(i + 1).padStart(2, "0") + " / " + String(n).padStart(2, "0") + "</span>" +
          "</div>";
      }

      container.innerHTML =
        '<div class="carousel" style="--accent:' + accent + '">' +
          '<div class="carousel__stage">' + slides + "</div>" +
          ui +
        "</div>";
    }

    function goto(k) {
      i = ((k % n) + n) % n;
      render();
    }
    function stopTimer() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function startTimer() {
      stopTimer();
      if (n > 1) timer = setInterval(function () { goto(i + 1); }, 5000);
    }

    // hover pause/resume — bound to the persistent container, not the
    // re-rendered inner markup, so it survives every render() call
    container.addEventListener("mouseenter", stopTimer);
    container.addEventListener("mouseleave", startTimer);
    container.addEventListener("click", function (e) {
      var navBtn = e.target.closest(".carousel__nav");
      if (navBtn) {
        goto(i + parseInt(navBtn.getAttribute("data-dir"), 10));
        startTimer();
        return;
      }
      var dot = e.target.closest(".carousel__dot");
      if (dot) {
        goto(parseInt(dot.getAttribute("data-i"), 10));
        startTimer();
      }
    });

    render();
    startTimer();

    return { destroy: stopTimer };
  };
})(window.App = window.App || {});
