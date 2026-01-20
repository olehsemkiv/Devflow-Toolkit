---

title: "Smooth Scroll"
description: "Кастомний smooth scroll для десктопу (>=1024px): підключення через CDN, базові налаштування та нотатки."
----------------------------------------------------------------------------------------------------------------------

# Smooth Scroll

Це утиліта для більш “плавного” скролу на десктопі. Скрипт запускаємо **тільки на ширині >= 1024px**, щоб не чіпати мобільний скрол.

---

## When to use

* Landing pages / marketing sites з довгими сторінками
* Сайти, де важлива “преміум” відчутність скролу

Не використовуй, якщо:

* є інший smooth scroll (Lenis/Locomotive) — не міксувати
* сторінка сильно залежить від нативного скролу/скрол-контейнерів

---

## Install

Додай у Webflow → **Page settings** → **Before `</body>`** (або глобально, якщо треба на всіх сторінках):

```html
<script src="https://cdn.jsdelivr.net/gh/olehsemkiv/smoothScroll/smoothScroll.js"></script>
<script>
  if (window.innerWidth >= 1024) {
    SmoothScroll({
      animationTime: 1000,
      stepSize: 75,

      accelerationDelta: 30,
      accelerationMax: 2,

      keyboardSupport: true,
      arrowScroll: 50,

      pulseAlgorithm: true,
      pulseScale: 4,
      pulseNormalize: 1,

      touchpadSupport: true,
    });
  }
</script>
```

---

## Settings (quick)

* `animationTime` — наскільки “тягнеться” анімація (більше = плавніше)
* `stepSize` — крок скролу (більше = агресивніше)
* `accelerationDelta / accelerationMax` — прискорення при швидкому скролі
* `keyboardSupport / arrowScroll` — поведінка при скролі з клавіатури
* `pulse*` — “натуральність” відчуття (як інерція)
* `touchpadSupport` — підтримка touchpad

---

## Notes

* Запуск тільки на `>= 1024px` — це навмисно, щоб не ламати мобільний UX.
* Рекомендовано тримати підключення саме **Before `</body>`**, щоб не блокувати рендер.

---

## Troubleshooting

### Не працює

* відкрий DevTools → Console і перевір, чи нема помилки `SmoothScroll is not defined`
* перевір, що скрипт не 404 (Network)
* перевір, що ширина вьюпорта реально >= 1024

### Занадто швидко/повільно

* крутити `animationTime` і `stepSize` в першу чергу
