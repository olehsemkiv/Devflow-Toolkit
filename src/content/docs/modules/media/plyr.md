---
title: "Custom Plyr Player"
description: "Кастомний відео-плеєр на базі Plyr: MP4 / YouTube / Vimeo, кастомний cover, керування через атрибути, pausing інших відео."
---

# Custom Plyr Player

Це **copy-paste** сетап для Plyr, який однаково зручно працює з:

- **MP4** (`<video><source ...>`)
- **YouTube** (embed по `data-provider="youtube"`)
- **Vimeo** (embed по `data-provider="vimeo"`)

Фішки:
- кастомний **cover** (клік → play)
- **pause інших відео**, коли стартує поточне
- **contain у fullscreen** (опційно)
- **controls** та інші опції через **data-атрибути**

> Це не CDN-модуль. Просто вставляєш у Webflow (або будь-де) і редагуєш під себе.

---

## Install

### 1) CSS (в `<head>`)

```html
<link rel="stylesheet" href="https://cdn.plyr.io/3.8.4/plyr.css" />

<style>
  :root {
    --plyr-color-main: #fff;
    --plyr-tab-focus-color: transparent;
    --plyr-video-control-color-hover: #000;
    --plyr-control-icon-size: 1.5em;
    --plyr-range-thumb-height: 0px;
    --plyr-range-track-height: 0.6em;
  }

  /* Player wrapper */
  [data-df-plyr] {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .plyr {
    width: 100%;
    height: 100%;
  }

  /* Video fit */
  .plyr video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  [data-df-plyr].is-contain video {
    object-fit: contain;
  }

  /* Optional: overlay play button color */
  .plyr__control--overlaid {
    color: #000;
  }

  /* Cover */
  [data-df-plyr-cover] {
    position: absolute;
    inset: 0;
    cursor: pointer;
    z-index: 5;
    display: grid;
    place-items: center;
    padding: 0;
    border: 0;
    background: transparent;
  }

  [data-df-plyr-cover] .df-plyr-cover-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease, opacity 0.25s ease;
  }

  [data-df-plyr] .df-plyr-cover-btn {
    position: relative;
    z-index: 2;
    width: 72px;
    height: 72px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.9);
    color: #000;
    transition: transform 0.25s ease;
  }

  [data-df-plyr-cover]:hover .df-plyr-cover-btn {
    transform: scale(1.05);
  }

  /* Hide cover when playing */
  [data-df-plyr].is-cover-hidden [data-df-plyr-cover] {
    opacity: 0;
    pointer-events: none;
  }
  [data-df-plyr].is-cover-hidden .df-plyr-cover-img {
    transform: scale(1.25);
  }

  /* Optional: tweak volume layout like you had */
  .plyr__volume {
    width: auto;
    min-width: auto;
    max-width: none;
  }
</style>
```

### 2) JS (перед `</body>`, у Before `</body>` в Webflow)

```html
<script src="https://cdn.plyr.io/3.8.4/plyr.js"></script>

<script>
  (function () {
    const ROOT_SEL = "[data-df-plyr]";
    const MEDIA_SEL = "[data-df-plyr-media]";
    const COVER_SEL = "[data-df-plyr-cover]";

    // Keep all players to pause others
    const players = new Set();

    function parseBool(v, fallback = false) {
      if (v == null) return fallback;
      if (v === "" || v === "true") return true;
      if (v === "false") return false;
      return fallback;
    }

    function parseControls(str) {
      if (!str) return null;
      return String(str)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    function buildEmbed(el) {
      const provider = el.getAttribute("data-provider");
      const id = el.getAttribute("data-embed-id");
      if (!provider || !id) return null;

      const target = el.querySelector(MEDIA_SEL);
      if (!target) return null;

      // Plyr supports a div with data-plyr-provider + data-plyr-embed-id
      const div = document.createElement("div");
      div.setAttribute("data-plyr-provider", provider);
      div.setAttribute("data-plyr-embed-id", id);

      target.innerHTML = "";
      target.appendChild(div);

      return div;
    }

    function initOne(root) {
      const media = root.querySelector(MEDIA_SEL);
      if (!media) return;

      // Settings via attributes
      const controls = parseControls(root.getAttribute("data-controls")) || [
        "play",
        "progress",
        "current-time",
        "mute",
        "fullscreen",
      ];

      const resetOnEnd = parseBool(root.getAttribute("data-reset"), true);
      const pauseOthers = parseBool(root.getAttribute("data-pause-others"), true);
      const containFullscreen = parseBool(
        root.getAttribute("data-contain-fullscreen"),
        false
      );

      // If YouTube/Vimeo build embed element, otherwise use existing <video>
      const embedEl = buildEmbed(root);
      const targetEl = embedEl || media; // media is <video> in mp4 case

      const player = new Plyr(targetEl, {
        controls,
        resetOnEnd,
      });

      players.add(player);

      const cover = root.querySelector(COVER_SEL);

      function showCover() {
        root.classList.remove("is-cover-hidden");
      }
      function hideCover() {
        root.classList.add("is-cover-hidden");
      }

      // Cover click => play
      if (cover) {
        cover.addEventListener("click", () => player.play());
      }

      // Pause others on play
      player.on("play", () => {
        hideCover();

        if (pauseOthers) {
          players.forEach((p) => {
            if (p !== player) p.pause();
          });
        }
      });

      // Restore cover on end
      player.on("ended", () => {
        showCover();

        // exit fullscreen on end (optional but nice)
        if (player.fullscreen && player.fullscreen.active) {
          player.fullscreen.exit();
        }
      });

      // Optional: contain video only in fullscreen
      if (containFullscreen) {
        player.on("enterfullscreen", () => root.classList.add("is-contain"));
        player.on("exitfullscreen", () => root.classList.remove("is-contain"));
      }

      // Initial state: cover visible
      showCover();
    }

    document.querySelectorAll(ROOT_SEL).forEach(initOne);
  })();
</script>
```

---

## Markup

> **Важливо:** `data-df-plyr` — корінь, `data-df-plyr-media` — місце де лежить `<video>` або куди буде вставлений embed, `data-df-plyr-cover` — кастомний cover.

### 1) MP4 (HTML5 video)

```html
<div
  data-df-plyr
  data-controls="play,progress,current-time,mute,fullscreen"
  data-reset="true"
  data-pause-others="true"
  data-contain-fullscreen="true"
>
  <video
    data-df-plyr-media
    playsinline
    preload="metadata"
    poster="https://your-site.com/poster.jpg"
  >
    <source src="https://cdn.manual.co/TRT/JS_updated.mp4" type="video/mp4" />
  </video>

  <button type="button" data-df-plyr-cover aria-label="Play video">
    <img
      class="df-plyr-cover-img"
      src="https://your-site.com/cover.jpg"
      alt=""
      loading="lazy"
    />
    <span class="df-plyr-cover-btn" aria-hidden="true">▶</span>
  </button>
</div>
```

### 2) YouTube

```html
<div
  data-df-plyr
  data-provider="youtube"
  data-embed-id="dQw4w9WgXcQ"
  data-controls="play,progress,current-time,mute,fullscreen"
  data-reset="true"
  data-pause-others="true"
>
  <!-- Скрипт сам вставить embed сюди -->
  <div data-df-plyr-media></div>

  <button type="button" data-df-plyr-cover aria-label="Play video">
    <img class="df-plyr-cover-img" src="https://your-site.com/cover.jpg" alt="" loading="lazy" />
    <span class="df-plyr-cover-btn" aria-hidden="true">▶</span>
  </button>
</div>
```

### 3) Vimeo

```html
<div
  data-df-plyr
  data-provider="vimeo"
  data-embed-id="76979871"
  data-controls="play,progress,current-time,mute,fullscreen"
  data-reset="true"
  data-pause-others="true"
>
  <div data-df-plyr-media></div>

  <button type="button" data-df-plyr-cover aria-label="Play video">
    <img class="df-plyr-cover-img" src="https://your-site.com/cover.jpg" alt="" loading="lazy" />
    <span class="df-plyr-cover-btn" aria-hidden="true">▶</span>
  </button>
</div>
```

---

## Атрибути (API)

### Root: `[data-df-plyr]`

- `data-controls="..."`  
  Список контролів через кому.  
  **Default:** `play,progress,current-time,mute,fullscreen`

  Приклади:
  - `data-controls="play,progress,mute,fullscreen"`
  - `data-controls="play,progress,current-time,duration,volume,fullscreen"`

- `data-reset="true|false"`  
  Якщо `true` → `resetOnEnd` у Plyr (повертає відео в початок після завершення).  
  **Default:** `true`

- `data-pause-others="true|false"`  
  Якщо `true` → при старті цього відео, всі інші плеєри на сторінці ставляться на pause.  
  **Default:** `true`

- `data-contain-fullscreen="true|false"`  
  Якщо `true` → у fullscreen додаємо клас `is-contain`, і відео стає `object-fit: contain`.  
  **Default:** `false`

### Embed only (YouTube / Vimeo)

- `data-provider="youtube|vimeo"`  
  Провайдер embed.

- `data-embed-id="..."`  
  ID відео для embed.

### Inside

- `data-df-plyr-media`  
  Для MP4: ставиться на `<video>`.  
  Для YouTube/Vimeo: ставиться на контейнер `<div>`, куди скрипт вставить embed.

- `data-df-plyr-cover`  
  Кнопка/оверлей cover. Клік по ньому запускає `player.play()`.

---

## Де взяти ID для YouTube / Vimeo

### YouTube Video ID

YouTube ID — це частина URL після `v=` або після останнього `/` у коротких форматах.

**Приклади:**
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → ID: `dQw4w9WgXcQ`
- `https://youtu.be/dQw4w9WgXcQ` → ID: `dQw4w9WgXcQ`
- `https://www.youtube.com/shorts/dQw4w9WgXcQ` → ID: `dQw4w9WgXcQ`

> В `data-embed-id` вставляємо **тільки** сам ID, без `?t=` і без зайвих параметрів.

### Vimeo Video ID

Vimeo ID — це **число** в URL.

**Приклади:**
- `https://vimeo.com/76979871` → ID: `76979871`
- `https://vimeo.com/channels/staffpicks/76979871` → ID: `76979871`

---

