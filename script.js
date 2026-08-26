const galleries = {
  graphic: {
    kicker: "Graphic design · 5 works",
    title: "Visual identities & posters",
    items: [
      {
        src: "assets/graphic-boy-who-lived.webp",
        alt: "The Boy Who Lived poster showing a dark castle through a broken brick wall.",
        medium: "Composite poster · Visual storytelling",
        title: "The Boy Who Lived",
        description: "A cinematic poster study using framing, atmosphere and scale to pull a familiar fantasy world through a fractured architectural opening."
      },
      {
        src: "assets/graphic-crimson-red.webp",
        alt: "Crimson Red editorial poster explaining the menstrual cycle with pink and red illustration.",
        medium: "Editorial design · Awareness",
        title: "Crimson Red",
        description: "An approachable menstrual-awareness poster that uses warm illustration and a clear calendar metaphor to make health information feel less clinical."
      },
      {
        src: "assets/graphic-creatiwise-one.webp",
        alt: "Creatiwise logo route one with a rounded black and white C symbol and mockups.",
        medium: "Brand identity · Logo exploration",
        title: "Creatiwise · Route 01",
        description: "A bold, looping C mark designed around continuity, creative movement and a memorable app-scale silhouette."
      },
      {
        src: "assets/graphic-creatiwise-two.webp",
        alt: "Creatiwise logo route two with two interlocking grey forms and mockups.",
        medium: "Brand identity · Logo exploration",
        title: "Creatiwise · Route 02",
        description: "An alternative identity route where two connected forms represent the exchange between creative thinking and strategy."
      },
      {
        src: "assets/graphic-cricket-news.webp",
        alt: "Cricket CN News identity presentation with orange, red, black and white applications.",
        medium: "Brand system · Sports media",
        title: "Cricket CN News",
        description: "A high-energy sports-news identity built for immediate recognition, compact avatars and consistent use across editorial and stationery touchpoints."
      }
    ]
  },
  photo: {
    kicker: "Photography · Light studies",
    title: "Small observations",
    items: [
      {
        src: "assets/photo-amber.webp",
        alt: "Macro photograph of water droplets glowing in amber light.",
        medium: "Macro · Warm light",
        title: "Amber After Rain",
        description: "A close study of droplets, shallow focus and warm reflected light—turning an ordinary edge into a suspended landscape."
      },
      {
        src: "assets/photo-refraction.webp",
        alt: "Close photograph of a water glass refracting warm orange light.",
        medium: "Still life · Refraction",
        title: "Glass & Light",
        description: "Hard darkness and a narrow orange source reveal the geometry of water through reflection, refraction and shadow."
      },
      {
        src: "assets/photo-dragonfly.webp",
        alt: "A small orange dragonfly resting on a twig against green foliage.",
        medium: "Nature · Selective focus",
        title: "Small Wonder",
        description: "A fragile subject held at the centre of a dense green world, using negative space and focus to reward a slower look."
      },
      {
        src: "assets/photo-lines.webp",
        alt: "Black and white photograph of intersecting structural beams, mesh and sky.",
        medium: "Monochrome · Composition",
        title: "Lines Against the Sky",
        description: "A study of rhythm and obstruction where beams, mesh and branches divide a pale sky into shifting geometric layers."
      }
    ]
  }
};

const dialogs = {
  ux: document.querySelector("#ux-dialog"),
  gallery: document.querySelector("#gallery-dialog"),
  resume: document.querySelector("#resume-dialog"),
  case: document.querySelector("#case-dialog")
};

const galleryImage = document.querySelector("#gallery-image");
const galleryKicker = document.querySelector("#gallery-kicker");
const galleryTitle = document.querySelector("#gallery-title");
const galleryMedium = document.querySelector("#gallery-medium");
const galleryItemTitle = document.querySelector("#gallery-item-title");
const galleryDescription = document.querySelector("#gallery-description");
const galleryCount = document.querySelector(".gallery-count");
const galleryThumbs = document.querySelector("#gallery-thumbs");
const galleryFigure = document.querySelector(".gallery-figure");
const caseScroll = document.querySelector("#case-scroll");
const caseTitle = document.querySelector("#case-dialog-title");
const progressBar = document.querySelector(".reading-progress i");
const exploreHint = document.querySelector(".explore-hint");
const dogButton = document.querySelector("[data-dog]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let galleryMode = "graphic";
let galleryIndex = 0;
let pointerStart = null;
let dogWakeTimer = null;

function openDialog(dialog) {
  if (!dialog || dialog.open) return;
  document.querySelectorAll("dialog[open]").forEach((open) => open.close());
  dialog.showModal();
}

function closeDialog(dialog) {
  if (dialog?.open) dialog.close();
}

function quietInvitation() {
  exploreHint.classList.add("is-quiet");
}

function buildThumbnails() {
  const items = galleries[galleryMode].items;
  galleryThumbs.replaceChildren(...items.map((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-thumb";
    button.setAttribute("aria-label", `View ${item.title}`);
    button.dataset.galleryIndex = String(index);
    const image = document.createElement("img");
    image.src = item.src;
    image.alt = "";
    button.append(image);
    return button;
  }));
}

function renderGallery(direction = 0) {
  const gallery = galleries[galleryMode];
  const item = gallery.items[galleryIndex];
  galleryKicker.textContent = gallery.kicker;
  galleryTitle.textContent = gallery.title;
  galleryMedium.textContent = item.medium;
  galleryItemTitle.textContent = item.title;
  galleryDescription.textContent = item.description;
  galleryCount.textContent = `${String(galleryIndex + 1).padStart(2, "0")} / ${String(gallery.items.length).padStart(2, "0")}`;
  galleryImage.src = item.src;
  galleryImage.alt = item.alt;

  galleryThumbs.querySelectorAll(".gallery-thumb").forEach((thumb, index) => {
    const active = index === galleryIndex;
    thumb.classList.toggle("is-active", active);
    thumb.setAttribute("aria-current", active ? "true" : "false");
    if (active) thumb.scrollIntoView({ block: "nearest", inline: "center", behavior: reducedMotion.matches ? "auto" : "smooth" });
  });

  if (direction && !reducedMotion.matches && galleryImage.animate) {
    galleryImage.animate([
      { opacity: 0, transform: `translateX(${direction > 0 ? 22 : -22}px) scale(.985)` },
      { opacity: 1, transform: "translateX(0) scale(1)" }
    ], { duration: 320, easing: "cubic-bezier(.2,.8,.2,1)" });
  }
}

function openGallery(mode, index = 0) {
  galleryMode = mode;
  dialogs.gallery.dataset.mode = mode;
  const length = galleries[mode].items.length;
  galleryIndex = Math.max(0, Math.min(Number(index) || 0, length - 1));
  buildThumbnails();
  renderGallery();
  openDialog(dialogs.gallery);
}

function moveGallery(step) {
  const length = galleries[galleryMode].items.length;
  galleryIndex = (galleryIndex + step + length) % length;
  renderGallery(step);
}

function openCaseStudy(name) {
  const template = document.querySelector(`#${name}-template`);
  if (!template) return;
  const fragment = template.content.cloneNode(true);
  const article = fragment.querySelector(".case-study");
  caseTitle.textContent = article.dataset.caseTitle || "Case study";
  caseScroll.replaceChildren(fragment);
  caseScroll.scrollTop = 0;
  progressBar.style.setProperty("--progress", "0%");
  closeDialog(dialogs.ux);
  openDialog(dialogs.case);
  requestAnimationFrame(() => caseScroll.focus({ preventScroll: true }));
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  if (action) {
    quietInvitation();
    const type = action.dataset.action;
    if (type === "ux") openDialog(dialogs.ux);
    if (type === "profile") openDialog(dialogs.resume);
    if (type === "graphic" || type === "photo") openGallery(type, action.dataset.index);
    return;
  }

  const caseButton = event.target.closest("[data-case]");
  if (caseButton) {
    openCaseStudy(caseButton.dataset.case);
    return;
  }

  const closeButton = event.target.closest("[data-close]");
  if (closeButton) {
    closeDialog(closeButton.closest("dialog"));
    return;
  }

  if (event.target.closest("[data-gallery-prev]")) moveGallery(-1);
  if (event.target.closest("[data-gallery-next]")) moveGallery(1);

  const thumb = event.target.closest("[data-gallery-index]");
  if (thumb) {
    const next = Number(thumb.dataset.galleryIndex);
    const direction = next >= galleryIndex ? 1 : -1;
    galleryIndex = next;
    renderGallery(direction);
  }

  if (event.target.closest("[data-back-projects]")) {
    closeDialog(dialogs.case);
    openDialog(dialogs.ux);
  }

  const jump = event.target.closest("[data-jump]");
  if (jump) {
    caseScroll.querySelector(`#${jump.dataset.jump}`)?.scrollIntoView({ block: "start", behavior: reducedMotion.matches ? "auto" : "smooth" });
  }
});

Object.values(dialogs).forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

document.addEventListener("keydown", (event) => {
  if (!dialogs.gallery.open) return;
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveGallery(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveGallery(1);
  }
});

galleryFigure.addEventListener("pointerdown", (event) => {
  pointerStart = { x: event.clientX, y: event.clientY };
});

galleryFigure.addEventListener("pointerup", (event) => {
  if (!pointerStart) return;
  const dx = event.clientX - pointerStart.x;
  const dy = event.clientY - pointerStart.y;
  pointerStart = null;
  if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) moveGallery(dx < 0 ? 1 : -1);
});

galleryFigure.addEventListener("pointercancel", () => { pointerStart = null; });

/* Dog wake — click toggles is-awake which triggers the eye-open CSS animation */
dogButton.addEventListener("click", () => {
  const waking = !dogButton.classList.contains("is-awake");
  window.clearTimeout(dogWakeTimer);
  dogButton.classList.toggle("is-awake", waking);
  dogButton.setAttribute("aria-pressed", String(waking));
  if (waking) {
    dogWakeTimer = window.setTimeout(() => {
      dogButton.classList.remove("is-awake");
      dogButton.setAttribute("aria-pressed", "false");
    }, 3000);
  }
});

caseScroll.addEventListener("scroll", () => {
  const available = caseScroll.scrollHeight - caseScroll.clientHeight;
  const progress = available > 0 ? (caseScroll.scrollTop / available) * 100 : 0;
  progressBar.style.setProperty("--progress", `${Math.min(100, progress).toFixed(2)}%`);
});

window.addEventListener("pointermove", (event) => {
  if (reducedMotion.matches || event.pointerType === "touch") return;
  document.documentElement.style.setProperty("--mouse-x", `${(event.clientX / window.innerWidth) * 100}%`);
  document.documentElement.style.setProperty("--mouse-y", `${(event.clientY / window.innerHeight) * 100}%`);
}, { passive: true });

Object.values(galleries).flatMap((gallery) => gallery.items).forEach((item) => {
  const image = new Image();
  image.src = item.src;
});

/* ── Whiteboard drawing engine ── */
(function () {
  const wb = document.getElementById("whiteboard");
  const canvas = document.getElementById("wb-canvas");
  const hint = document.getElementById("wb-hint");
  if (!wb || !canvas) return;

  const ctx = canvas.getContext("2d");
  let drawing = false;
  let lastX = 0;
  let lastY = 0;
  let currentColor = "#1a1a1a";
  let hasDrawn = false;
  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const previous = document.createElement("canvas");
    previous.width = canvas.width;
    previous.height = canvas.height;
    if (previous.width && previous.height) {
      previous.getContext("2d").drawImage(canvas, 0, 0);
    }

    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (previous.width && previous.height) {
      ctx.drawImage(previous, 0, 0, previous.width / (previous.width / rect.width), previous.height / (previous.height / rect.height));
    }
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });
  function getPos(event) {

    const rect = canvas.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    /*
     * Safe drawing area inside the whiteboard.
     * Increase these values if the line still
     * reaches the frame.
     */

    const paddingX = rect.width * 0.08;
    const paddingY = rect.height * 0.08;

    x = Math.max(
      paddingX,
      Math.min(x, rect.width - paddingX)
    );

    y = Math.max(
      paddingY,
      Math.min(y, rect.height - paddingY)
    );

    return {
      x: x,
      y: y
    };
  }

  function startDraw(event) {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    canvas.setPointerCapture?.(event.pointerId);
    drawing = true;
    wb.classList.add("is-drawing");

    const { x, y } = getPos(event);
    lastX = x;
    lastY = y;

    const frame = wb.querySelector(".whiteboard__frame");
    const rect = canvas.getBoundingClientRect();
    frame.style.setProperty("--gx", `${((x / rect.width) * 100).toFixed(1)}%`);
    frame.style.setProperty("--gy", `${((y / rect.height) * 100).toFixed(1)}%`);

    ctx.beginPath();
    ctx.arc(x, y, 1.4, 0, Math.PI * 2);
    ctx.fillStyle = currentColor;
    ctx.globalAlpha = 0.9;
    ctx.fill();
    ctx.globalAlpha = 1;
    hasDrawn = true;
    wb.classList.add("has-drawn");
  }

  function draw(event) {
    if (!drawing) return;
    event.preventDefault();
    const { x, y } = getPos(event);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 0.88;
    ctx.stroke();
    ctx.globalAlpha = 1;

    lastX = x;
    lastY = y;

    if (!hasDrawn) {
      hasDrawn = true;
      wb.classList.add("has-drawn");
    }
  }

  function stopDraw(event) {
    if (!drawing) return;
    drawing = false;
    wb.classList.remove("is-drawing");
    if (event?.pointerId !== undefined) {
      canvas.releasePointerCapture?.(event.pointerId);
    }
  }

  canvas.addEventListener("pointerdown", startDraw, { passive: false });
  canvas.addEventListener("pointermove", draw, { passive: false });
  canvas.addEventListener("pointerup", stopDraw);
  canvas.addEventListener("pointercancel", stopDraw);
  canvas.addEventListener("pointerleave", stopDraw);

  wb.querySelectorAll(".wb-color").forEach((btn) => {
    btn.addEventListener("click", () => {
      wb.querySelectorAll(".wb-color").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      currentColor = btn.dataset.color;
    });
  });

  wb.querySelector(".wb-erase")?.addEventListener("click", () => {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    hasDrawn = false;
    wb.classList.remove("has-drawn");
  });
})();
/* ── End whiteboard ── */
