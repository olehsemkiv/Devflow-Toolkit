---

title: "Structure Guide"
description: "Як ми будуємо структуру Webflow-проєктів: глобальні компоненти, секції, врапери та змінні (Variables) для консистентності."
-----------------------------------------------------------------------------------------------------------------------------------------

# Structure Guide

Цей гайд описує **базову структуру сторінки**, яку ми тримаємо у всіх Webflow-проєктах, щоб:

* було легко підтримувати і масштабувати
* секції були консистентні по паддінгах/контейнерах
* команда швидко орієнтувалась у проєкті
* стилі/змінні були централізовані

---

## 1) Базова структура сторінки

Всі сторінки будуємо навколо `page-wrapper`, в якому:

* **Global / Styles** (компонента)
* **Global / Header** (компонента)
* `main` з секціями
* **Global / Footer** (компонента)

Візуально (як у навігаторі Webflow):

* `page-wrapper`

  * `Global / Styles` (component)
  * `Global / Header` (component)
  * `main`

    * `section_hero`
    * `section_business`
    * `section_hiring`
    * `section_benefits`
    * `section_steps`
    * ...
  * `Global / Footer` (component)

---

## 2) Обовʼязкові Global Components

### Global / Styles (обовʼязково)

Це компонент, який підключається на кожній сторінці. Він містить:

* базові стилі (typography, base body, headings)
* глобальні utility-класи (за потреби)
* глобальні змінні/токени (якщо частина з них у CSS, але основне тримаємо в Webflow Variables)
* будь-які глобальні “fixes” (наприклад: font smoothing, focus states, richtext margins тощо)

> Важливо: Global / Styles — це “single source of truth” для бази. Не розкидуємо базові стилі по секціях.

### Global / Header та Global / Footer (обовʼязково)

Header і Footer завжди робимо **окремими компонентами**, щоб:

* міняти один раз, а не на 20 сторінках
* уникати розсинхрону (версії, меню, CTA, legal links)

---

## 3) Стандарт секції

Кожна секція має бути однаково “обгорнута”, щоб паддінги і ширини були передбачувані.

### Скелет секції (патерн)

```html
<section class="section_benefits">
  <div class="padding-global">
    <div class="container-large">
      <div class="benefits_wrapper">
        <!-- section content -->
      </div>
    </div>
  </div>
</section>
```

### Правила

* `section_*` — корінь секції (логічна назва по змісту: `section_benefits`, `section_faq`, `section_pricing`)
* `padding-global` — один і той самий врапер, який відповідає за зовнішні відступи секції
* `container-large` — обмежує максимальну ширину контенту
* `*_wrapper` — внутрішній контейнер секції для структури (layout/grid/stack)

> Навіть якщо секція візуально “повної ширини”, контент всередині все одно йде через container. Повноширові фони/градієнти робимо на рівні `section_*`.

---

## 4) Іменування (коротко)

* Назви секцій: `section_*`
* Внутрішні блоки секції: `benefits_*`, `faq_*`, `pricing_*` (префікс секції)
* Елементи списків/карток: `item-*` (наприклад `item-benefits`, `item-faq`)
* Стейти: `is-*` (наприклад `is-open`, `is-active`) — використовуємо для JS/станів
* Data attributes для модулів: `data-rs-*`

> Детальні правила по неймінгу: див. сторінку **Naming**.

---

## 5) Webflow Variables (обовʼязково)

Ми заводимо Variables на старті проєкту, щоб уникати “рандомних” значень у стилях і тримати консистентність.

### Рекомендована структура Base collection

**Colors**

* `white`
* `black`
* `transparent`
* `brand`
* `brand-hover`
* `dark`
* `light`
* `grey`
* `border-fade`
* `background-fade-1`
* `background-fade-2`

**Fonts**

* `primary-font`

**Sizing**

* `section-padding-desktop`
* `section-padding-mobile`
* `container-large`
* `padding-global`

> Порада: почни з мінімального набору. Далі додавайте токени тільки коли зʼявляється реальна потреба.

---

## 6) Checklist перед стартом сторінки

* [ ] Є `page-wrapper`
* [ ] Додана компонента `Global / Styles`
* [ ] Додані компоненти `Global / Header` і `Global / Footer`
* [ ] Весь контент сторінки знаходиться в `main`
* [ ] Кожна секція побудована через: `section_* > padding-global > container-large > *_wrapper`
* [ ] Variables створені (colors/fonts/sizing) і застосовані у ключових стилях

---

## 7) Часті помилки, яких уникаємо

* ❌ Різні паддінги в кожній секції “на око” (замість `padding-global`)
* ❌ Контент без контейнера (ламається ритм і ширини)
* ❌ Header/Footer не компонентами
* ❌ Кольори/розміри руками (замість Variables)
* ❌ Стани через випадкові класи (замість `is-*`) або логіка JS, прив’язана до класів замість `data-rs-*`

---

## 8) Приклад “правильної” секції

Будь-яка секція має читатись як:

* секція (контекст)
* глобальний паддінг (ритм)
* контейнер (ширина)
* локальний wrapper (layout)
* item-* (повторювані елементи)

Як у прикладі `section_benefits`:

* `section_benefits`
* `padding-global`
* `container-large`
* `benefits_wrapper`
* `benefits_list` + `item-benefits`
