# Nadia Westermann — Portfolio

Produktionsreife Umsetzung des Design-Handoffs aus `design_handoff_portfolio/`.
Kein Build-Tool, kein Framework — reines HTML/CSS/JS, damit du es direkt per
Doppelklick öffnen und 1:1 auf GitHub Pages, Netlify oder Vercel deployen kannst.

## Struktur

```
index.html        Seitenstruktur (Nav, Hero, Work, About, Footer, Case-Study-Overlay)
styles.css         Alle Design-Tokens und Styles (Referenz-CSS, bereinigt)
data.js            Projekt-Inhalte — hier Projekte hinzufügen/ändern/reihenfolge ändern
js/app.js          Startet alles, sobald die Seite geladen ist
js/nav.js          Uhr (Zürich-Zeit), Scroll-Fortschrittsbalken, Smooth-Scroll-Links
js/hero.js         Hero-Eintritts-Animation + Schnellzugriff-Liste auf die Projekte
js/projects.js     Rendert die "Selected Work"-Liste aus data.js
js/carousel.js     Bild-/Video-Karussell im Case-Study-Overlay
js/casestudy.js     Das Vollbild-Overlay pro Projekt (Öffnen/Schliessen/Weiter, Deep-Links via #projekt-id)
js/reveal.js       Scroll-Reveal-Animationen
assets/            Bilder & Videos (aus dem Handoff kopiert)
```

## Was ich bewusst anders/offen gelassen habe

- **Hero-Text ist ein Entwurf.** Name, Statement und Bio in `index.html` (Zeilen im
  `<header class="hero ...">`) sind von mir formuliert, basierend auf deinem Profil.
  Einfach direkt im HTML anpassen — die Zeilenumbrüche in der Statement-Zeile
  (`<span class="w">…</span>`) bitte pro Wort beibehalten, sonst fehlt die
  Wort-für-Wort-Einblend-Animation.
- **Hero-Index (Schnellliste).** Im Referenz-Material war das nur als CSS-Klassen
  vorgesehen, ich habe daraus eine kleine, anklickbare Liste der drei Projekte gebaut
  (unterhalb der Buttons), die direkt in die jeweilige Case Study springt.
- **Custom Cursor entfernt.** War im Referenz-Prototyp schon fest deaktiviert
  (`display:none!important`) — für die echte Seite habe ich den Code ganz
  weggelassen statt totes Feature mitzuschleppen.
- **Marquee-Band nicht eingebaut.** War im Referenz-Material auch nicht aktiv
  ("Component exists, not mounted"). CSS dafür ist noch in `styles.css`
  (`.marquee`), falls du es später willst — sag Bescheid, dann baue ich es ein.
- **Portrait ist noch Platzhalter** (violettes Feld mit "N") — sobald du ein Foto hast,
  ersetze in `index.html` den `<div class="ph" ...>`-Block durch ein `<img>`.

## Lokal ansehen

Browser blockieren ES-Module/`fetch` teils bei `file://`, deshalb kurz lokal servieren:

```bash
npx serve .
# oder
python3 -m http.server 8000
```

Dann `http://localhost:3000` bzw. `:8000` öffnen.

## Deployment

- **GitHub Pages:** Repo pushen, unter Settings → Pages den Branch (z. B. `main`,
  Ordner `/`) auswählen — fertig, kein Build-Schritt nötig.
- **Netlify / Vercel:** Ordner per Drag-and-drop hochladen oder Repo verbinden;
  Build-Command leer lassen, Publish-Directory ist der Projektordner selbst.

## Getestet

Lokal mit einem echten Browser durchgeklickt: Hero-Animation, Work-Liste, Case-Study-
Overlay öffnen/schliessen/weiter, Karussell-Autoplay/Pause/Pfeile/Dots, Uhr &
Scroll-Fortschritt, Deep-Link über `#projekt-id`, Reduced-Motion. Bilder/Videos
zeigen erst etwas an, sobald die echten Assets im `assets/`-Ordner liegen (liegen
hier schon, aus dem Handoff kopiert).
