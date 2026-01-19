---
title: CDN & Releases
description: Як ми збираємо, версіонуємо і підключаємо RS Toolkit через CDN у Webflow.
---

# CDN & Releases

Ми роздаємо файли RS Toolkit через GitHub repo **Devflow-Toolkit-CDN** і підключаємо їх в Webflow як CDN-ресурси.

---

## Репозиторій CDN

Repo: `olehsemkiv/Devflow-Toolkit-CDN`

---

## Файли, які ми публікуємо

Після білду в репо є:

- `dist/rs-core.min.js`
- `dist/modules/rs-modal.min.js` (та інші модулі)
- `dist/css/rs-modal.css` (та інші css)
- `dist/rs-toolkit.min.js` (all-in-one)

---

## Підключення в Webflow

### Latest (DEV / тест)
Використовуємо `@main` (може бути кеш кілька хвилин).

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@main/dist/css/rs-modal.css">

<script src="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@main/dist/rs-core.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/olehsemkiv/Devflow-Toolkit-CDN@main/dist/modules/rs-modal.min.js"></script>
<script>
  window.RS.init();
</script>
