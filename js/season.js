;(function(scriptUrl) {
  document.addEventListener("DOMContentLoaded", () => {
    // --- Reddit‑link injection (runs first) ---
    const jsonUrl = new URL("../redditLinks.json", scriptUrl).href;
    const m = document.title.match(/\d+/);
    const currSeason = m ? m[0] : null;
    if (currSeason) {
      fetch(jsonUrl)
        .then(r => r.json())
        .then(data => {
          document
            .querySelectorAll("h3.entry-title.td-module-title > a.rdt")
            .forEach(anchor => {
              const el = anchor.closest("h3");
              const next = el.nextElementSibling;
              // skip if already has a reddit link right after
              if (
                next &&
                next.matches("h3.entry-title.td-module-title") &&
                next.querySelector("a.reddit")
              ) return;

              // original title up to last space
              const fullTitle = anchor.title || "";
              const idx = fullTitle.lastIndexOf(" ");
              const currTitle =
                idx > 0 ? fullTitle.slice(0, idx) : fullTitle;

              // clean it for JSON lookup
              const cleanTitle = currTitle
                .replace(/&#8217;/g, "'")
                .replace(/[\u2018\u2019]/g, "'")
                .replace(/&#038;/g, "and")
                .replace(/ &#8211;/g, "")
                .replace(/\./g, "")
                .trim();

              const link = (data[currSeason] || {})[cleanTitle];
              if (link) {
                const sib = el.cloneNode(true);
                const sibA = sib.querySelector("a");
                sibA.className   = "reddit";
                sibA.href        = link;
                sibA.title       = `${currTitle} REDDIT`;
                sibA.textContent = `${currTitle} REDDIT`;
                el.insertAdjacentElement("afterend", sib);
              }
            });
        })
        .catch(err =>
          console.error("failed to load redditLinks.json", err)
        );
    }

    // --- your original number‑links + scroll‑memory + GH‑pages base‑href code ---
    const container = document.querySelector(".number-links");
    const count = document.querySelectorAll('div[id^="ep"]').length;
    for (let i = 1; i <= count; i++) {
      const link = document.createElement("a");
      link.textContent = `${i} `;
      link.style.cursor = "pointer";
      link.addEventListener("click", event => {
        event.preventDefault();
        const target = document.querySelector(`#ep${i}`);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
      container.appendChild(link);
    }

    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    });
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem("scrollPosition");
    }

    const hostname = window.location.hostname;
    const path = window.location.pathname;
    if (hostname.endsWith("github.io")) {
      const segments = path.split("/");
      if (segments.length > 1 && segments[1] !== "") {
        const baseHref = "/" + segments[1] + "/";
        document
          .querySelectorAll(".td-main-logo")
          .forEach(link => (link.href = baseHref));
      }
    }
  });
})(new URL(document.currentScript.src, window.location.href));