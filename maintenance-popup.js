/* ASPPS "Admissions Open 2026-27" Announcement Modal
   One self-contained file (CSS + HTML + JS).
   ADD:    <script src="assets/maintenance-popup.js"></script>   (just before </body>, or in <head>)
   OWNER PREVIEW: open your site once with ?dev=1 at the end of the address to skip the pop-up on your browser. */
(function () {
  "use strict";

  /* ---------------- CONFIGURATION ---------------- */
  const CONFIG = {
    ENABLED: true,
    DISMISSIBLE: true,          // Allow visitors to close and browse the website
    badge: "Admissions Open 2026-27",
    title: "Admission Open For 2026-27",
    message: "We are excited to welcome new students for the upcoming academic year. We are committed to fostering excellence in every student.",
    posterImage: "images/eleven.jpg"
  };
  /* ----------------------------------------------- */

  if (!CONFIG.ENABLED || window.__asppsAdmissionsPopup) return;
  window.__asppsAdmissionsPopup = true;

  // Owner bypass (?dev=1 / ?dev=0)
  try {
    const m = /[?&]dev=([01])/.exec(location.search);
    if (m) { m[1] === "1" ? localStorage.setItem("aspps_dev", "1") : localStorage.removeItem("aspps_dev"); }
    if (localStorage.getItem("aspps_dev") === "1") return;
  } catch (e) { /* storage blocked: show the pop-up */ }

  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const css = `
  .asm-overlay{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:16px;
    background:radial-gradient(1200px 600px at 50% 20%,rgba(30,64,175,.65),rgba(2,8,32,.94));
    backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
    font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;animation:asmFade .45s ease-out}
  .asm-card{position:relative;width:min(520px,100%);max-height:calc(100vh - 32px);overflow-y:auto;box-sizing:border-box;
    padding:1.6rem;border-radius:28px;text-align:center;color:#f5f7fb;
    background:linear-gradient(160deg,#0f2a7a 0%,#081a52 100%);
    border:1px solid rgba(255,255,255,.16);box-shadow:0 30px 80px rgba(0,0,0,.6);animation:asmPop .5s cubic-bezier(.2,.8,.2,1)}
  .asm-close-btn{position:absolute;top:1rem;right:1rem;width:36px;height:36px;border-radius:50%;
    background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:1.2rem;
    cursor:pointer;display:grid;place-items:center;transition:background .2s ease,transform .2s ease;z-index:2}
  .asm-close-btn:hover{background:rgba(255,255,255,.25);transform:scale(1.08)}
  .asm-poster-wrap{position:relative;width:100%;border-radius:18px;overflow:hidden;margin-bottom:1rem;
    border:1px solid rgba(255,255,255,.2);box-shadow:0 12px 30px rgba(0,0,0,.4)}
  .asm-poster-img{width:100%;height:auto;display:block;object-fit:cover}
  .asm-badge{display:inline-block;margin-bottom:.4rem;font-size:.78rem;font-weight:800;letter-spacing:.18em;
    text-transform:uppercase;color:#4cc9f0;background:rgba(76,201,240,.12);padding:.35rem .8rem;border-radius:999px;border:1px solid rgba(76,201,240,.3)}
  .asm-title{margin:0 0 .5rem;font-family:Merriweather,"Playfair Display",Georgia,serif;font-weight:800;
    font-size:clamp(1.3rem,4vw,1.7rem);line-height:1.25;color:#fff}
  .asm-msg{margin:0 auto 1.2rem;max-width:46ch;font-size:.92rem;line-height:1.6;color:rgba(245,247,251,.9)}
  .asm-go{padding:.7rem 1.4rem;border:1px solid rgba(255,255,255,.3);border-radius:999px;cursor:pointer;
    font:inherit;font-weight:700;color:#fff;background:rgba(255,255,255,.12);transition:all .2s ease}
  .asm-go:hover{background:rgba(255,255,255,.22);border-color:rgba(255,255,255,.5)}
  .asm-go:focus-visible,.asm-close-btn:focus-visible{outline:2px solid #4cc9f0;outline-offset:3px}
  
  @keyframes asmFade{from{opacity:0}to{opacity:1}}
  @keyframes asmPop{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion:reduce){.asm-overlay,.asm-card{animation:none}}
  @media (max-width:480px){.asm-card{padding:1.2rem;border-radius:20px}}`;

  function mount() {
    const style = document.createElement("style");
    style.id = "asm-style";
    style.textContent = css;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.className = "asm-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "asm-title");
    overlay.setAttribute("aria-describedby", "asm-msg");

    overlay.innerHTML =
      '<div class="asm-card" tabindex="-1">' +
        (CONFIG.DISMISSIBLE ? '<button type="button" class="asm-close-btn" aria-label="Close modal">&times;</button>' : '') +
        '<div class="asm-poster-wrap">' +
          '<img src="' + esc(CONFIG.posterImage) + '" alt="ASPPS School Admissions Open 2026-27" class="asm-poster-img">' +
        '</div>' +
        '<span class="asm-badge">' + esc(CONFIG.badge) + '</span>' +
        '<h1 class="asm-title" id="asm-title">' + esc(CONFIG.title) + '</h1>' +
        '<p class="asm-msg" id="asm-msg">' + esc(CONFIG.message) + '</p>' +
        (CONFIG.DISMISSIBLE ? '<button type="button" class="asm-go">Continue to Website</button>' : '') +
      '</div>';

    (document.body || document.documentElement).appendChild(overlay);

    // Lock page scroll
    const html = document.documentElement, prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const inerted = [];
    if (document.body) {
      Array.prototype.forEach.call(document.body.children, (el) => {
        if (el !== overlay && !el.hasAttribute("inert")) { el.setAttribute("inert", ""); inerted.push(el); }
      });
    }

    const card = overlay.querySelector(".asm-card");
    card.focus({ preventScroll: true });

    function close() {
      overlay.remove();
      html.style.overflow = prevOverflow;
      inerted.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey, true);
    }

    function onKey(e) {
      if (e.key === "Escape" && CONFIG.DISMISSIBLE) { close(); return; }
      if (e.key === "Tab") {
        const f = overlay.querySelectorAll("a[href],button");
        if (!f.length) { e.preventDefault(); return; }
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === card)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    document.addEventListener("keydown", onKey, true);
    const go = overlay.querySelector(".asm-go");
    if (go) go.addEventListener("click", close);
    const closeBtn = overlay.querySelector(".asm-close-btn");
    if (closeBtn) closeBtn.addEventListener("click", close);
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();