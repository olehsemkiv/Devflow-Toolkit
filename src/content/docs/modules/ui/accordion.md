---

title: "Accordion Module"
description: "Акордеони на data-rs-* з is-* стейтами, optional group (single-open), offset для max-height і базовим CSS."
-------------------------------------------------------------------------------------------------------------------------

# Accordion Module

Модуль керує відкриттям/закриттям акордеонів через `data-rs-*` атрибути та стейти `is-*`.

See also:

* [Module Contract](/standards/module-contract/)
* [Naming](/standards/naming/)
* [CDN & Releases](/start-here/cdn-and-releases/)

---

## Install (CDN)

Цей модуль складається з:

* CSS: `rs-accordion.css`
* JS: `rs-core.min.js` + `rs-accordion.min.js`

### Latest (DEV)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@main/dist/css/rs-accordion.css">

<script src="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@main/dist/rs-core.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@main/dist/modules/rs-accordion.min.js"></script>
<script>
  window.RS.init();
</script>
```

### Stable (PROD)

Замініть `v0.1.2` на актуальну версію релізу.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@v0.1.2/dist/css/rs-accordion.css">

<script src="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@v0.1.2/dist/rs-core.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@v0.1.2/dist/modules/rs-accordion.min.js"></script>
<script>
  window.RS.init();
</script>
```

> Деталі про версіонування, теги та кеш: див. [CDN & Releases](/start-here/cdn-and-releases/)

---

## What it does

* Відкриває/закриває accordion item по кліку на `data-rs-accordion-head`
* Додає/знімає `is-open` на item (та дублює `is-open` на head/panel)
* Плавно анімує відкриття через `max-height` (виставляється інлайном через JS)
* Підтримує `data-rs-accordion-group="name"`:

  * якщо в групі відкривається новий item → попередній відкритий item в цій групі закривається
* Підтримує `data-rs-accordion-offset="24"`:

  * додає пікселі до `scrollHeight`, щоб уникати “обрізання” контенту

---

## Markup

### Single item

```html
<div data-rs-accordion-item>
  <div data-rs-accordion-head>
    <div>Title</div>
    <div data-rs-accordion-arrow></div>
  </div>

  <div data-rs-accordion-panel>
    <div>
      Lorem ipsum dolor sit amet...
    </div>
  </div>
</div>
```

### Group (single-open)

```html
<div data-rs-accordion-item data-rs-accordion-group="faq-1">
  <div data-rs-accordion-head>
    <div>FAQ 1</div>
    <div data-rs-accordion-arrow></div>
  </div>
  <div data-rs-accordion-panel>
    <div>...</div>
  </div>
</div>

<div data-rs-accordion-item data-rs-accordion-group="faq-1">
  <div data-rs-accordion-head>
    <div>FAQ 2</div>
    <div data-rs-accordion-arrow></div>
  </div>
  <div data-rs-accordion-panel>
    <div>...</div>
  </div>
</div>
```

### Offset (extra padding)

```html
<div data-rs-accordion-item data-rs-accordion-offset="24">
  <div data-rs-accordion-head>
    <div>Title</div>
  </div>

  <div data-rs-accordion-panel>
    <div>...</div>
  </div>
</div>
```

### Default open

Варіант 1: атрибут

```html
<div data-rs-accordion-item data-rs-accordion-open="true">
  ...
</div>
```

Варіант 2: клас

```html
<div data-rs-accordion-item class="is-open">
  ...
</div>
```

---

## Data attributes

### Item root

* `data-rs-accordion-item`
  Кореневий елемент одного accordion item.

* `data-rs-accordion-group="name"`
  Групування accordion items.

  * якщо атрибут присутній → в групі одночасно відкритий лише один item

* `data-rs-accordion-offset="number"`
  Додає px до висоти панелі при відкритті.
  Приклад: `data-rs-accordion-offset="24"`

* `data-rs-accordion-open="true"`
  Відкриває item одразу при ініціалізації.

### Inside item

* `data-rs-accordion-head` — зона кліку для toggle
* `data-rs-accordion-panel` — панель, якій виставляється `max-height`
* `data-rs-accordion-arrow` — опційний елемент для стилізації (rotate і тд)

---

## States

* `is-open` — додається на `[data-rs-accordion-item]` коли item відкритий
  (також модуль може додавати `is-open` на head/panel для зручності стилізації)

---

## CSS behavior

Файл: `dist/css/rs-accordion.css`

* Панель (`[data-rs-accordion-panel]`) має `overflow: hidden` та `max-height: 0`
* При відкритті `max-height` виставляється інлайном через JS (`scrollHeight + offset`)
* За бажанням, ви можете додати стилі для `is-open` (наприклад rotate arrow)

---

## Events

Модуль диспатчить:

* `rs:accordion:open`
* `rs:accordion:close`

Приклад:

```js
document.addEventListener("rs:accordion:open", (e) => console.log(e.detail));
document.addEventListener("rs:accordion:close", (e) => console.log(e.detail));
```

---

## Troubleshooting

### Panel “обрізає” контент

* додай `data-rs-accordion-offset="24"` або збільши offset
* перевір, чи немає внутрішніх елементів з позиціонуванням, яке впливає на `scrollHeight`

### Не відкривається item

* перевір, що head має `data-rs-accordion-head`
* перевір, що item має `data-rs-accordion-item`
* перевір, що підключені `rs-core.min.js` і `rs-accordion.min.js`
* перевір, що викликається `window.RS.init()`

### Group не закриває попередній item

* переконайся, що в item-ів однакове значення `data-rs-accordion-group="..."`
* переконайся, що group атрибут стоїть саме на `data-rs-accordion-item`, а не всередині

### Анімація “смикається”

* переконайся, що панель не ховається через `display: none`
* перевір, чи не перебиваються transition/max-height стилями з Webflow (custom CSS / interactions)
