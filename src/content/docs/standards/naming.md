---

title: "Naming"
description: "Короткі правила неймінгу в наших Webflow-проєктах: секції, компоненти, елементи, стани та data-rs-* атрибути."
----------------------------------------------------------------------------------------------------------------------------

# Naming

Це короткі базові правила неймінгу, яких ми дотримуємось у Webflow-проєктах для консистентності та легкого супроводу.

---

## 1) Sections

Секції називаємо через `section_*` за змістом:

* `section_hero`
* `section_benefits`
* `section_pricing`
* `section_faq`

---

## 2) Global components

Глобальні частини сайту завжди компонентами:

* `Global / Styles`
* `Global / Header`
* `Global / Footer`

---

## 3) Wrappers (layout)

У кожній секції використовуємо стандартний каркас:

* `padding-global`
* `container-large`
* `*_wrapper` (локальний врапер секції, наприклад `benefits_wrapper`)

---

## 4) Section prefix (локальні класи)

Всередині секції класи починаємо з префіксу секції:

* `benefits_title-wrap`
* `benefits_list`
* `faq_list`
* `pricing_cards`

Це зменшує хаос і конфлікти назв.

---

## 5) Reusable items

Повторювані елементи (картки/рядки/лісти) називаємо через `item-*`:

* `item-benefits`
* `item-faq`
* `item-pricing`

---

## 6) States

Стани завжди через `is-*`:

* `is-open`
* `is-active`
* `is-hidden`
* `is-loading`

---

## 7) Data attributes (RS modules)

Для JS-модулів/реюз модулів використовуємо **тільки** атрибути з префіксом:

* `data-rs-*`

Приклад:

* `data-rs-modal="id"`
* `data-rs-modal-open="id"`
* `data-rs-accordion-item`

> Важливо: не привʼязуємо логіку модулів до класів, класи можуть змінюватись. Логіка живе в `data-rs-*` + стейти `is-*`.

---
