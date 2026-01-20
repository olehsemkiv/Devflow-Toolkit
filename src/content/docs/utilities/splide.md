---

title: "Splide Running Line"
description: "Фірмовий сетап Splide для running line (infinite auto-scroll): CDN підключення, markup і конфіг з Auto Scroll extension."
---------------------------------------------------------------------------------------------------------------------------------------

# Splide Running Line

Це наш стандартний сетап **Splide** для “running line” (нескінченний ряд логотипів/тексту з авто-скролом). Працює через **Auto Scroll extension**.

---

## When to use

* Running line з логотипами технологій
* Маркі-рядок з фічами/фразами
* Нескінченний “ticker” на лендингах

---

## Install (CDN)

Додай **CSS у `<head>`**, а **JS перед `</body>`**.

### CSS (Head)

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css"
/>
```

### JS (Before `</body>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-auto-scroll@0.5.3/dist/js/splide-extension-auto-scroll.min.js"></script>
```

---

## Markup

### Recommended (Webflow friendly)

> Важливо: `.splide` — корінь, а `.splide__track / __list / __slide` — обовʼязкові класи Splide.

```html
<div class="splide running-line_list" aria-label="Running line">
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">Slide 01</li>
      <li class="splide__slide">Slide 02</li>
      <li class="splide__slide">Slide 03</li>
    </ul>
  </div>
</div>
```

> Якщо у тебе `running-line_list` зараз стоїть на контейнері — ок, головне щоб це був той самий елемент, який ти ініціалізуєш у JS.

---

## Init script

Встав у **Before `</body>`** після підключення Splide:

```html
<script>
  if (document.querySelector(".running-line_list")) {
    new Splide(".running-line_list", {
      type: "loop",
      drag: "free",
      autoWidth: true,
      autoScroll: {
        speed: 0.25,
        pauseOnHover: false,
        autoStart: true,
      },
      pagination: false,
      arrows: false,
      clones: 30,
    }).mount(window.splide.Extensions);
  }
</script>
```

---

## Settings (quick)

* `type: "loop"` — нескінченний loop
* `drag: "free"` — плавний drag без “snap”
* `autoWidth: true` — ширина слайдів по контенту (ідеально для логотипів)
* `autoScroll.speed` — швидкість руху (менше = повільніше)
* `pauseOnHover: false` — не зупиняється при hover (можеш включити, якщо треба)
* `pagination/arrows: false` — нічого зайвого на UI
* `clones: 30` — більше клонів для стабільного loop (особливо якщо мало слайдів)

---

## Notes

* Якщо “смикається” або loop виглядає коротким — збільш `clones`
* Для логотипів зазвичай треба:

  * `white-space: nowrap` / `gap` на `.splide__list`
  * однакова висота логотипів (через wrapper)

---

## Troubleshooting

### Не ініціалізується

* перевір, що існує `.running-line_list`
* перевір порядок підключення: `splide.min.js` → `auto-scroll extension` → init script
* перевір Console на `Splide is not defined` або `window.splide.Extensions is undefined`

### Автоскрол не працює

* переконайся, що mount викликається так:

  * `.mount(window.splide.Extensions)`
* перевір, що extension реально підключився (Network без 404)

---
