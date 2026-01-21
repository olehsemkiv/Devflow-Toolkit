---

title: "Typography"
description: "Як ми організовуємо типографію в Webflow: title-h*, text-size-*, text-style-*, text-weight-* і принцип wrapper-ів без margin/max-width на утилітах."
------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Typography

Цей гайд описує, як ми будуємо типографію так, щоб вона була **реюзабельна, чиста і гнучка**, без “каші” класів на заголовках і текстах.

---

## 1) Принцип: 1 стиль = 1 утиліта

Ми не створюємо 10 класів з однаковими стилями. Якщо бачимо, що стиль повторюється — робимо **утиліті-клас** і використовуємо його всюди.

---

## 2) Titles (headings)

Заголовки називаємо так:

* `title-h1`
* `title-h2`
* `title-h3`
* `title-h4`
* `title-h5`
* `title-h6`

> Це саме **класи для стилю**. HTML-теги (`h1…h6`) ставимо по семантиці/ієрархії, а стиль контролюємо класом.

---

## 3) Text sizes

Тексти будуємо через `text-size-*`. Їх може бути більше/менше — залежить від дизайну. Основна ідея: знайти повторювані розміри і винести в утиліти.

Приклад:

```css
.text-size-tiny {
  font-size: 14px;
}

.text-size-regular {
  font-size: 16px;
}

.text-size-medium {
  font-size: 18px;
}

.text-size-large {
  font-size: 20px;
}
```

---

## 4) Text styles (caps / transform / decoration)

Коли треба “поверх” розміру додати стиль — використовуємо `text-style-*`.

```css
.text-style-capitalize {
  text-transform: capitalize;
}

.text-style-uppercase {
  text-transform: uppercase;
}

.text-style-lowercase {
  text-transform: lowercase;
}

.text-style-underline {
  text-decoration: underline;
}

.text-style-no-underline {
  text-decoration: none;
}

.text-style-italic {
  font-style: italic;
}

.text-style-no-wrap {
  white-space: nowrap;
}
```

---

## 5) Font weights

Для жирності робимо `text-weight-*`:

```css
.text-weight-thin { font-weight: 100; }
.text-weight-extralight { font-weight: 200; }
.text-weight-light { font-weight: 300; }
.text-weight-regular { font-weight: 400; }
.text-weight-medium { font-weight: 500; }
.text-weight-semibold { font-weight: 600; }
.text-weight-bold { font-weight: 700; }
.text-weight-extrabold { font-weight: 800; }
.text-weight-black { font-weight: 900; }
```

> В реальному проекті додаємо тільки ті, які реально використовуються у дизайні.

---

## 6) Text colors (utility)

Якщо по дизайну повторюється виділення тексту певним кольором — заводимо утиліти по кольору:

* `text-color-red`
* `text-color-blue`
* `text-color-muted`
* `text-color-brand`

> Але: за можливості, тексти мають **наслідувати** `color` від батьківського елемента (див. правило нижче). Утиліти по кольорам — тільки коли це повторюваний патерн, а не “один раз десь”.

---

## 7) Найважливіше правило: НЕ даємо margin/max-width/color на title/text утиліти

Ми **ніколи не вішаємо** на:

* `title-h*`
* `text-size-*`

такі речі як:

* `margin`
* `max-width`
* `text-align`
* `color`

Чому:

* Бо ці властивості дуже часто різні між секціями
* Бо це створює “кашу” класів, коли треба підганяти відступи/ширини під конкретний дизайн
* Бо потім дуже легко випадково зламати типографію по всьому сайту

---

## 8) Wrapper pattern (must-have)

Відступи, max-width, align і навіть колір контролюємо через wrapper, який належить секції.

Приклад:

```html
<div class="benefits_title-wrap">
  <div class="title-h1">Lorem ipsum dolor sit amet.</div>
</div>

<div class="benefits_text-wrap">
  <div class="text-size-regular">
    Lorem ipsum dolor sit amet consectetur adipisicing elit...
  </div>
</div>
```

### Чому це працює краще

* В одній секції заголовок може “дропатись” інакше ніж в іншій
* Клієнти часто просять різні `max-width` або `text-align` для тайтлів у різних місцях
* Wrapper дозволяє:

  * керувати `max-width`
  * керувати `margin`
  * керувати `text-align`
  * керувати `color`
    не чіпаючи сам `title-h2` / `text-size-regular`

---

## 9) Color inheritance (важливо)

Стараємось НЕ задавати `color` на `text-size-*` / `title-h*`.

Правильний підхід:

* базовий `color` приходить з `body`
* якщо секція темна — даємо `color` на `section_*` або на `*_wrap`
* якщо треба виділити фразу — додаємо `text-color-*` (тільки якщо це повторювано)

Так ми не отримуємо ситуацію:

* текст завжди “чорний”, а на темній секції треба городити 3 класи, щоб перебити

---

## 10) Quick checklist

* [ ] `title-h*` та `text-size-*` — тільки про typography (без margin/max-width/color)
* [ ] Відступи/ширини/вирівнювання — через `*_wrap`
* [ ] Повторювані стилі → утиліти (`text-style-*`, `text-weight-*`, `text-color-*`)
* [ ] Колір по можливості наслідується від батька, а не задається на кожному тексті
