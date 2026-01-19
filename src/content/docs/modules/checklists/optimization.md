---

title: "Optimization Checklist"
description: "Speed & bandwidth optimisation для Webflow: шрифти, зображення, SVG, відео, код, CSS/JS, accessibility і фінальне тестування."
--------------------------------------------------------------------------------------------------------------------------------------------

# Optimization Checklist

Ціль: **максимально стиснути сайт без втрати дизайну/функціоналу** та отримати **90+** на Desktop і Mobile у PageSpeed Insights (стабільний результат на кількох прогонах).

---

## Fonts

* **Ніколи не використовуємо Google Fonts** через embed. Тільки **завантажені** у Webflow шрифти, які реально використовуються.
* Формат: **WOFF2** (орієнтир: ~**10 KB** на файл шрифту, якщо реально).
* Компресія: Transfonter ([https://transfonter.org/](https://transfonter.org/))

  * Family Support: **On**
  * Formats: **WOFF2 only**
  * Demo page language: **English**
  * Subsets: **All**
  * Unicode Ranges: **0020-007E**
  * Font display: **Swap**
  * Convert → перевір розмір → upload у Webflow
* Fallback font: **Inter**

---

## Images

* Для всіх зображень задаємо **width + height** через **оригінальні розміри з Figma** (не CSS rules). Це зменшує CLS (контент не “стрибає”).
* Loading:

  * Hero image: **eager**
  * Всі інші: **lazy**
* Формати:

  * **.avif** для всього, якщо нормальна якість
  * якщо в зображенні є **linear gradient** → краще **.webp**
* Якщо Webflow не стискає нормально нативно:

  * реекспортуй з Figma одразу як **compressed .webp**
* Assets panel:

  * видаляй **дублікати/неюзабельні** картинки
* CMS:

  * якщо використовується CMS — **стискай CMS images** також

---

## Favicon / Webclip

* Експорт з Figma як **compressed .avif**

---

## Large SVGs

* Компресія через SVGO ([https://jakearchibald.github.io/svgomg/](https://jakearchibald.github.io/svgomg/))

  * просто закинь SVG
  * не потрібно тюнити опції
  * Download → upload у Webflow

---

## Accessibility

* Додай **Alt text** для всіх зображень (його мають передати з Figma).
* Перевір **heading hierarchy**:

  * лише **один H1** на сторінку
* Виправ:

  * “link description”
  * `aria-label`
  * інші зауваження з **Webflow audit panel**

---

## Videos

* Компресія через Adobe Media Encoder:

  * Format: **H.265 (HEVC)**
  * Maximum file size: **< 500 KB**
* Хостинг:

  * upload у **BunnyCDN**
  * скопіюй CDN URL
* Webflow:

  * Video element → Settings → встав CDN URL
* Якщо відео **приховані на load**:

  * не вантаж їх фоном
  * зберігай URL в атрибутах trigger-елемента
  * підставляй/створюй відео **тільки при взаємодії** (клік/відкриття модалки)

---

## Code

* Додавай `defer` для **Swiper, Splide** та інших non-critical скриптів
* **Ніколи** не став `defer`/`async` на **Google Tag Manager**
* Прибирай:

  * дублі
  * невикористаний код
* По можливості:

  * переносимо JS з `<head>` **в кінець `<body>`**
* Webflow → Site Settings → Publishing → Advanced Publishing Options:

  * ✅ Minify HTML
  * ✅ Minify CSS
  * ✅ Minify JS
  * ✅ Per page CSS

---

## JavaScript (manual minify)

* Minifier: [https://www.toptal.com/developers/javascript-minifier](https://www.toptal.com/developers/javascript-minifier)
* Візьми код з Page settings → **Before `</body>`**
* Встав у minifier → Run
* Встав minified код назад у Webflow
* Опційно: винести в файл і віддавати через CDN (наприклад BunnyCDN)

---

## CSS (cleanup + minify)

* Прибери дублі/неюзабельні класи:

  * Webflow → **Style Selector** → **clean up unused styles**
* Minifier: [https://www.toptal.com/developers/cssminifier](https://www.toptal.com/developers/cssminifier)
* Встав CSS → minify → поверни minified code у Webflow

---

## Testing

### Quick QA

Перевір, що мінімізація не зламала:

* немає JS errors
* картинки не “пікселяться”
* modals/popups відкриваються/закриваються
* форми сабмітяться і мають правильну валідацію
* sliders/carousels працюють

### Webflow audit panel

* пройтись по **кожній сторінці**
* виправити всі помилки/попередження

### Browser console

* Console → шукаємо **червоні errors**
* фіксимо recursive console errors

### PageSpeed Insights

* [https://pagespeed.web.dev/](https://pagespeed.web.dev/)
* Target: **90+ desktop + 90+ mobile**
* Результат має бути **стабільний** (зроби кілька прогонів)
