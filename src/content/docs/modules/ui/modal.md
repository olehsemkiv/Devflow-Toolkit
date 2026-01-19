---
title: Modal Module
description: Модалки на data-rs-* з is-* стейтами, Esc/overlay/close, optional scroll lock і CSS-анімаціями.
---

# Modal Module

Модуль керує відкриттям/закриттям модалок через `data-rs-*` атрибути та стейти `is-*`.

---

## What it does

- Відкриває модалку по тригерам `data-rs-modal-open="id"`
- Знаходить відповідну модалку по `data-rs-modal="id"`
- Додає/знімає `is-open` на модалці
- Закриває по:
  - `data-rs-modal-close`
  - клік по overlay
  - `Esc`
- Scroll lock **тільки якщо** на модалці є `data-rs-modal-lock="true"`
- Анімації через CSS та `data-rs-modal-anim`

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


