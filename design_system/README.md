# Royal Millennium — Design System

## Project Overview

**Royal Millennium** is a premium commercial real-estate development located at Airport Road, Gateway of Kandla Airport, Gandhidham, Gujarat. The project features a modern classic arcade-front building with ground + 2 floors offering:

- Premium Retail Showrooms
- Executive Shops
- Spacious Offices
- Work Units for Start-ups

**Tagline:** Connect. Create. Succeed.  
**Sub-tagline:** Redefined Royality  
**Contact:** 95747 68056 & 92276 64145  
**Location:** Airport Road, Opposite Lake City, Gateway of Kandla Airport

---

## Sources

All brand materials were extracted from 12 project promotional images (uploads/IMG-20260503-WA0020.jpg through WA0031.jpg). No external codebase or Figma file was provided — this design system is derived entirely from these marketing assets.

---

## CONTENT FUNDAMENTALS

### Tone & Voice
- **Aspirational + Investment-focused.** Royal Millennium speaks to investors, entrepreneurs, and business owners.
- **Confident and declarative.** Short, punchy sentences. "Connect. Create. Succeed."
- **Title Case** is the dominant casing for headlines and feature lists.
- **ALL CAPS** used for category labels, location titles, and section headers.
- **No emoji.** Brand uses clean icon illustrations (flat, gold-on-dark tiles).
- **Hashtags used** as social/marketing labels: #LANDMARK #LUXURY #ROYALITY
- **Numbers** are written as numerals for impact: "25,000+ Sqft", "300 Ft.", "25 lacs*"

### Key Copy Phrases
- "Redefined Royality"
- "Connect. Create. Succeed."
- "Invest & Grow with us."
- "Huge Opportunity for Investors & Entrepreneurs."
- "Ranging from 25 lacs* onwards"
- "Freehold Commercial Property"

---

## VISUAL FOUNDATIONS

### Colors
- **Charcoal Dark** `#3a3530` — primary background (dark marketing slides)
- **Gold Accent** `#c9a84c` — primary accent, used for brand name highlights, CTA fills, icon tiles
- **Sand Taupe** `#c8b89a` — secondary warm neutral, used as light-mode background
- **Off-White** `#f5f0e8` — light surface, body backgrounds
- **Near-Black Text** `#2a2420` — dark text on light backgrounds
- **White** `#ffffff` — body text on dark backgrounds

### Typography
- **Display font:** Playfair Display (serif) — used for "ROYAL MILLENNIUM" wordmark, large headlines
- **Body/UI font:** Montserrat (sans-serif) — used for body text, feature lists, labels
- **Weights:** 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold) for display
- **Text is mostly Title Case or ALL CAPS** — lowercase is rare

### Backgrounds
- Two primary backgrounds: dark charcoal (#3a3530) and warm sand taupe (#c8b89a / #c8b49a)
- Building renders used as full-bleed hero images
- No gradients; flat solid backgrounds preferred
- Subtle dot/pattern texture visible on taupe backgrounds

### Architecture / Visual Motifs
- **Arched arcade** is the signature motif — repeated arch forms on building facade
- Warm sandstone / beige building exterior
- Golden-hour warmth in rendered imagery
- Modern classic: not ultramodern glass, not heritage — a refined hybrid

### Cards & Containers
- **Icon tiles:** Gold (#c9a84c) rounded-rect with flat black icon, white label beneath
- **Highlight pills:** Rounded full pills (border-radius: 999px) for hashtag badges
- **Info cards:** Simple flat cards, no heavy shadows; slight rounding (8-12px)
- **No drop shadows** in existing materials — depth via color contrast only

### Spacing & Layout
- **Dense but structured** — marketing content is information-heavy
- Consistent padding ~24-32px on cards
- Lists use large bullet points (•) with bold text
- Icon grid: 2×3 or 2×4 grid layout for amenity icons

### Animation & Interaction
- No animation documented in source materials
- Expected: smooth fade transitions, subtle hover opacity changes
- Press states: slight scale-down (0.97) + slight darken

### Corner Radii
- Pills/badges: 999px
- Icon tiles: ~16px (D-cut / stadium shape)  
- General cards: 8-12px
- Building imagery: 0 (full-bleed)

### Iconography
- See ICONOGRAPHY section below

---

## ICONOGRAPHY

- **Style:** Flat black silhouette icons on gold rounded-rect tiles
- **Categories used:** Security (guard), CCTV camera, Elevator, Outdoor Seating, Parking, Fire Safety, Street Light, Modern Elevation (building)
- **Source:** Custom flat black icons on brand-colored tiles (from source materials)
- **CDN fallback:** Lucide Icons (https://unpkg.com/lucide@latest) used as closest match — same stroke-weight / outline style
- Assets copied to: `assets/`

---

## FILE INDEX

```
README.md                      ← This file
SKILL.md                       ← Agent skill definition
colors_and_type.css            ← CSS custom properties (tokens)
assets/
  IMG-20260503-WA0020.jpg      ← Hero render (front view, angle 1)
  IMG-20260503-WA0028.jpg      ← Hero render (front view, angle 2)
  IMG-20260503-WA0029.jpg      ← Hero render (side angle)
  IMG-20260503-WA0030.jpg      ← Close-up facade render
  IMG-20260503-WA0031.jpg      ← Aerial render
preview/
  01-brand-colors.html         ← Primary + secondary palette swatches
  02-neutral-colors.html       ← Neutral scale
  03-semantic-colors.html      ← Semantic usage tokens
  04-type-display.html         ← Display type specimens
  05-type-body.html            ← Body / UI type specimens
  06-type-scale.html           ← Full type scale
  07-spacing-tokens.html       ← Spacing + radius tokens
  08-shadows-elevation.html    ← Shadow/elevation system
  09-btn-components.html       ← Button variants
  10-badge-pill.html           ← Badges and pills
  11-icon-tiles.html           ← Amenity icon tiles
  12-card-components.html      ← Feature/info cards
  13-form-components.html      ← Input fields, selects
  14-nav-component.html        ← Navigation bar
  15-hero-component.html       ← Hero section
ui_kits/
  website/
    README.md
    index.html                 ← Full website prototype
    Header.jsx
    Hero.jsx
    Features.jsx
    Amenities.jsx
    Location.jsx
    ContactForm.jsx
    Footer.jsx
```

---

## UI Kits

- **Website** (`ui_kits/website/index.html`) — Full marketing website prototype for Royal Millennium, including header, hero, features, amenities, location, contact, and footer.
