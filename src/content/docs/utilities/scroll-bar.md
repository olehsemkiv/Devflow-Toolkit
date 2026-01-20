---

title: "Custom Scrollbar"
description: "Кастомізація скролбару через CSS: WebKit псевдоелементи, обмеження по браузерах і рекомендації для Webflow."
--------------------------------------------------------------------------------------------------------------------------

# Custom Scrollbar

Ця утиліта дозволяє стилізувати скролбар через CSS. Важливо: `::-webkit-scrollbar*` працює переважно у **Chromium браузерах** (Chrome/Edge) та **Safari**. У Firefox це не працює таким самим способом.

---

## When to use

* Дизайн вимагає брендовий скролбар (в основному для desktop)
* Є горизонтальні скрол-контейнери (sliders/tables) і хочеться підкреслити UX

Не зловживай:

* дуже контрастні/масивні скролбари можуть виглядати “важко”
* на мобілках скролбар зазвичай системний і майже не контролюється

---

## Install (Webflow)

Додай CSS у:

* `Global / Styles` компонент (якщо це потрібно по всьому сайту), або
* Page settings → **Inside `<head>`** (якщо тільки для конкретної сторінки)

---

## Example (global scrollbar)

```html
<style>
  ::-webkit-scrollbar {
    width: 5px;
    height: 10px;
    background: #fff;
  }

  ::-webkit-scrollbar-thumb {
    background: #b5a574;
    -webkit-border-radius: 1ex;
    -webkit-box-shadow: 1px 2px rgba(0, 0, 0, 0.75);
  }

  ::-webkit-scrollbar-corner {
    background: #fff;
  }
</style>
```

---

## Target only a specific scroll container (recommended)

Якщо треба стилізувати не весь сайт, а конкретний блок з `overflow: auto`, загорни стилі в селектор контейнера:

```html
<style>
  .my-scroll {
    overflow: auto;
  }

  .my-scroll::-webkit-scrollbar {
    width: 5px;
    height: 10px;
    background: #fff;
  }

  .my-scroll::-webkit-scrollbar-thumb {
    background: #b5a574;
    border-radius: 10px;
  }
</style>
```

> Це більш “безпечний” підхід, бо не змінює скролбар глобально.

---

## Notes / Limitations

* `::-webkit-scrollbar*` — не кросбраузерний стандарт.
* У Firefox ці стилі можуть не застосовуватись.
* Тримай ширину тонкою (4–8px) для desktop, щоб не виглядало “олдскульно”.

---

## Troubleshooting

### Не застосовується стиль

* Перевір, що CSS реально підключився (DevTools → Elements → Styles).
* Перевір, що тестуєш у Chrome/Edge/Safari.
* Якщо стилізуєш контейнер, переконайся, що в нього є `overflow: auto/scroll` і контент перевищує висоту/ширину.

---
