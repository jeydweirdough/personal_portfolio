# React + Tailwind Starter

Modern 2026 baseline using Vite, React, TypeScript, and Tailwind CSS v4.

## Install

```bash
npm install
npm install tailwindcss @tailwindcss/vite
npm run dev
```

## Config

`vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

`src/index.css`

```css
@import "tailwindcss";
```

Tailwind v4 uses the Vite plugin and CSS-first configuration, so a `postcss.config.js` or `tailwind.config.js` is not required for the standard setup.

## Structure

```txt
public/
src/
  assets/
  components/
    TestCard.tsx
  App.tsx
  index.css
  main.tsx
eslint.config.js
index.html
package.json
vite.config.ts
```

## Notes

- Keep reusable UI in `src/components` and promote feature folders as the app grows.
- Put direct URL assets in `public/`; import everything else from `src/`.
- Use `@theme` in CSS for Tailwind tokens before reaching for legacy JS config.
- Run `npm run check` before shipping to catch lint and build issues together.
