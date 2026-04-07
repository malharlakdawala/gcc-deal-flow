# Design System Specification: The Sovereign Ledger

## 1. Overview & Creative North Star
This design system is built upon the Creative North Star of **"The Sovereign Ledger."** 

In the GCC financial sector, software should not feel like a utility; it should feel like a private bank’s concierge. We move away from the "Bootstrap" aesthetic of flat boxes and rigid borders. Instead, we embrace a high-end editorial approach that mirrors the architecture of modern Dubai or Doha—utilizing layered transparency, intentional asymmetry, and a "Digital Vault" philosophy. 

The system prioritizes tonal depth over structural lines. By utilizing the full spectrum of surface containers and typography scales, we create an experience that feels carved from a single block of dark sapphire and gold, providing an authoritative yet breathable environment for high-stakes financial decision-making.

---

## 2. Colors & Surface Philosophy

### The Tonal Palette
Our palette is anchored in deep midnight tones (`background`: #071325) and accented with "Desert Gold" (`primary`: #E6C364). 

*   **Primary (Gold):** Use for "Hallmark" moments—CTAs, active states, and high-level wealth indicators.
*   **Secondary (Electric Blue):** Reserved exclusively for Intelligence. It denotes AI-driven insights and forecasting.
*   **Tertiary (Sharia Teal):** Dedicated to compliance and Sharia-compliant signaling.
*   **Surface Hierarchy:** We utilize the `surface-container` tiers to define importance.
    *   `surface-container-lowest`: Use for the primary canvas background.
    *   `surface-container-low`: Use for standard card surfaces.
    *   `surface-container-high`: Use for hovered states or elevated modular units.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning content. Boundaries must be defined solely through background color shifts. For instance, a `surface-container-low` card sitting on a `surface` background provides enough contrast to be felt without being seen as a "box."

### The "Glass & Gradient" Rule
To elevate the UI beyond standard SaaS, incorporate Glassmorphism for floating elements (sidebars, dropdowns, and modals). 
*   **Execution:** Use `surface-variant` at 60% opacity with a `20px` backdrop-blur. 
*   **Signature Textures:** For primary CTAs, do not use flat hex codes. Apply a subtle linear gradient from `primary` (#E6C364) to `primary-container` (#C9A84C) at a 135-degree angle to simulate the sheen of physical bullion.

---

## 3. Typography & Editorial Voice

The typography system is designed to handle bilingual complexity (English/Arabic) while maintaining a prestigious editorial feel.

*   **The Display Scale:** Use `display-lg` and `display-md` for portfolio totals. These should feel like headlines in a high-end financial journal.
*   **Inter (English):** Our workhorse. Use `600` weight for H1 to establish authority, and `400` for body text at `15px` to ensure high information density without clutter.
*   **Noto Sans Arabic:** Must be perfectly balanced with Inter. Ensure the baseline is optically adjusted so that Arabic and English text on the same line appear harmonized.
*   **JetBrains Mono:** Non-negotiable for all financial codes, IBANs, and transaction IDs. 
*   **Tabular Numerals:** All numerical data must use `font-variant-numeric: tabular-nums;`. This ensures that columns of currency align perfectly, facilitating rapid scanning of gains and losses.

---

## 4. Elevation & Depth (The Layering Principle)

We achieve hierarchy through **Tonal Layering** rather than traditional structural lines or heavy drop shadows.

*   **Stacking Logic:** Place `surface-container-low` elements on the `surface` background. To emphasize a sub-element within that card, use `surface-container-highest`.
*   **Ambient Shadows:** If an element must "float" (e.g., a context menu), use a "Sunken Shadow":
    *   Blur: `32px`
    *   Opacity: `6%`
    *   Color: A tinted version of `on-surface` (never pure black).
*   **The "Ghost Border" Fallback:** In rare cases where accessibility requires a border, use the `outline-variant` token at **15% opacity**. It should be a suggestion of a boundary, not a hard stop.
*   **Asymmetry:** Avoid perfectly centered layouts. Use a 12-column grid but allow "Hero" stats to break the grid or bleed into the margin to create a dynamic, modern editorial rhythm.

---

## 5. Components

### Buttons & Interaction
*   **Primary:** Gold gradient with `on-primary` text. `12px` (md) corner radius.
*   **AI Action:** Secondary (Blue) background with a glassmorphism overlay.
*   **States:** Hover states should not just darken; they should "glow." Use a subtle outer shadow using the `primary` color at 20% opacity.

### AI Feature Treatment
AI-augmented data is a core differentiator.
*   **Visual Treatment:** Apply a `4px` left border (right border for RTL) using the `secondary` (Electric Blue) token. 
*   **Background:** Use a subtle gradient transition from `surface-container-low` to a very faint `secondary_container` (10% opacity).
*   **Badge:** A small "AI" label in `label-sm` using the `secondary` token.

### The Sharia Indicator
*   **Component:** A "Crescent Badge."
*   **Styling:** Semi-pill shape, `tertiary` (Teal) background with `on-tertiary` text.
*   **Placement:** Always top-right of a card or immediately following a fund name.

### Anonymization (Privacy Mode)
*   **The Redaction Style:** Instead of a simple "hide," use a `8px` backdrop-blur rectangle over sensitive numbers or logos. This maintains the "High-End" feel while securing data during presentations.

### Cards & Lists
*   **Constraint:** Zero divider lines.
*   **Spacing:** Use `32px` vertical padding to separate list items. The "white space" (or in this case, "dark space") acts as the separator. 

---

## 6. Do's and Don'ts

### Do
*   **Do** flip the entire layout for Arabic (RTL). This includes the sidebar moving to the right and the AI border moving to the right of the container.
*   **Do** use `JetBrains Mono` for any data that requires character-level precision.
*   **Do** use gold sparingly. If everything is gold, nothing is premium. Use it for the "Path to Success."

### Don't
*   **Don't** use pure black (#000000) for shadows. Use the deep navy of the `background` token to keep the "vault" atmosphere.
*   **Don't** use standard "Success Green" or "Danger Red" in large blocks. Use them only for text and small icons to avoid breaking the sophisticated dark-mode aesthetic.
*   **Don't** use 100% opaque borders. They create visual noise and "trap" the data, making the system feel dated.

---

## 7. Layout & Grid
*   **Sidebar:** Fixed `240px`. Use a `surface-container-low` with a `1px` right-side "Ghost Border" (10% opacity).
*   **Grid:** 12-column fluid grid with `24px` gutters. 
*   **Padding:** Standardize on `32px` for page margins and `24px` for internal card padding to create a sense of luxurious space.