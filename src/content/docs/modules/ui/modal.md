---

title: "Modal Module"
description: "Модалки на data-rs-* з is-* стейтами, Esc/overlay/close, optional scroll lock і CSS-анiмацiями."
--------------------------------------------------------------------------------------------------------------

# Modal Module

Модуль керує відкриттям/закриттям модалок через `data-rs-*` атрибути та стейти `is-*`.

See also:

* [Module Contract](/standards/module-contract/)
* [Naming](/standards/naming/)
* [CDN & Releases](/start-here/cdn-and-releases/)

---

## Install (CDN)

Цей модуль складається з:

* CSS: `rs-modal.css`
* JS: `rs-core.min.js` + `rs-modal.min.js`

### Latest (DEV)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@main/dist/css/rs-modal.css">

<script src="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@main/dist/rs-core.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@main/dist/modules/rs-modal.min.js"></script>
<script>
  window.RS.init();
</script>
```

### Stable (PROD)

Замініть `v0.1.1` на актуальну версію релізу.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@v0.1.1/dist/css/rs-modal.css">

<script src="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@v0.1.1/dist/rs-core.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@v0.1.1/dist/modules/rs-modal.min.js"></script>
<script>
  window.RS.init();
</script>
```

> Деталі про версіонування, теги та кеш: див. [CDN & Releases](/start-here/cdn-and-releases/)

---

## What it does

* Відкриває модалку по тригерам `data-rs-modal-open="id"`
* Знаходить відповідну модалку по `data-rs-modal="id"`
* Додає/знімає `is-open` на модалці
* Закриває по:

  * `data-rs-modal-close`
  * клік по overlay
  * `Esc`
* Scroll lock **тільки якщо** на модалці є `data-rs-modal-lock="true"`
* Анімації через CSS та `data-rs-modal-anim`

---

## Markup

### Modal

```html
<div data-rs-modal="test" data-rs-modal-lock="true" data-rs-modal-anim="bottom">
  <div data-rs-modal-overlay></div>

  <div data-rs-modal-content>
    <button type="button" data-rs-modal-close>Close</button>

    <p>Modal content</p>
  </div>
</div>
```

### Trigger

```html
<button type="button" data-rs-modal-open="test">Open modal</button>
```

### Trigger on input

Можна відкривати модалку при взаємодії з input (фокус):

```html
<input type="text" data-rs-modal-open="test" placeholder="Focus me">
```

---

## Data attributes

### Modal root

* `data-rs-modal="id"`
  Ідентифікатор модалки.

* `data-rs-modal-lock="true|false"`
  Лочити скрол сторінки.

  * якщо атрибут **відсутній** → не лочимо
  * якщо `true` → лочимо
  * якщо `false` → не лочимо

* `data-rs-modal-anim="bottom|top|left|right|scale"`
  Тип анімації.

  * якщо атрибут **відсутній** → fade (тільки opacity/visibility)

### Inside modal

* `data-rs-modal-overlay` — overlay для закриття по кліку
* `data-rs-modal-content` — контейнер контенту (для transform-анімацій)
* `data-rs-modal-close` — будь-який елемент, який закриває модалку

### Triggers

* `data-rs-modal-open="id"` — відкриття модалки з відповідним `data-rs-modal="id"`

---

## States

* `is-open` — додається на `[data-rs-modal]`, коли модалка відкрита

---

## CSS behavior

Файл: `dist/css/rs-modal.css`

* Закритий стан: `visibility: hidden`, `opacity: 0`, `pointer-events: none`
* Відкритий стан: `is-open`
* Анімації контенту: керуються через `data-rs-modal-anim` на `[data-rs-modal]`

---

## Events

Модуль диспатчить:

* `rs:modal:open`
* `rs:modal:close`

Приклад:

```js
document.addEventListener("rs:modal:open", (e) => console.log(e.detail));
document.addEventListener("rs:modal:close", (e) => console.log(e.detail));
```

---

## Troubleshooting

### Модалка не відкривається

* перевір, що `data-rs-modal-open="X"` відповідає `data-rs-modal="X"`
* перевір, що підключені `rs-core.min.js` і `rs-modal.min.js`
* перевір, що викликається `window.RS.init()`

### Не працює закриття по overlay

* перевір, що overlay має `data-rs-modal-overlay`
* перевір, що overlay реально перекриває клік (z-index/розмір)

### Анімація не працює

* переконайся, що контент має `data-rs-modal-content`
* перевір, чи не перебиваються `transform/transition` стилями з Webflow (Interactions / custom CSS)
* перевір, що модалка не ховається через `display: none` (має бути саме `opacity/visibility`)
