# SynGov — Design System & UI Guide

> This document defines every visual decision for SynGov.
> It is written for a developer IDE to implement a premium, production-grade interface.
> Every rule here is intentional. Do not deviate without a documented reason.

---

## Design Philosophy

SynGov is not a crypto app. It is not a dashboard tool. It is not a university portal.

It is a **governance platform** — a place where decisions happen. The design should make people feel:

- **Trusted** — this is where important decisions get made
- **Informed** — information is clear and organized, nothing is hidden
- **Empowered** — my participation matters, I can see my impact

The visual language is **editorial clarity meets modern SaaS**. Think Notion meets Linear meets a well-designed government transparency portal. Clean white canvas. Sharp typography. Purposeful color. Subtle motion that communicates state, not decoration.

No neon. No dark crypto gradients. No glassmorphism. No particle backgrounds.

---

## Brand Personality

| Attribute | Expression |
|---|---|
| Trustworthy | White space, clean grid, structured layout |
| Intelligent | Typography-first, data made readable |
| Modern | Geometric forms, sharp lines, no rounded excess |
| Human | Warm accent tones (not cold blue), readable prose |
| Authoritative | Large headings, confident copy, minimal clutter |

---

## Color System

### Primary Palette

```css
:root {
  --background:       #FFFFFF;
  --surface:          #F9FAFB;
  --surface-raised:   #F3F4F6;
  --border:           #E5E7EB;
  --border-strong:    #D1D5DB;

  --text-primary:     #0F172A;    /* Near-black with blue tone */
  --text-secondary:   #374151;
  --text-muted:       #6B7280;
  --text-subtle:      #9CA3AF;

  --accent:           #1D4ED8;    /* Primary blue — governance, action */
  --accent-hover:     #1E40AF;
  --accent-light:     #EFF6FF;
  --accent-muted:     #DBEAFE;

  --success:          #059669;    /* For votes */
  --success-light:    #ECFDF5;
  --warning:          #D97706;    /* Medium risk */
  --warning-light:    #FFFBEB;
  --danger:           #DC2626;    /* Against votes, high risk */
  --danger-light:     #FEF2F2;
}
```

### Category Colors

```css
:root {
  --cat-finance:      #1D4ED8;   /* Blue */
  --cat-events:       #7C3AED;   /* Violet */
  --cat-tech:         #0891B2;   /* Cyan */
  --cat-operations:   #374151;   /* Slate */
  --cat-general:      #6B7280;   /* Gray */
}
```

### Risk Colors

```css
:root {
  --risk-low:         #059669;
  --risk-medium:      #D97706;
  --risk-high:        #DC2626;
}
```

---

## Typography

### Font Stack

**Display Font:** `Sora` — geometric, modern, authoritative. Used for all headings.

**Body Font:** `DM Sans` — clean, humanist, highly readable at small sizes.

**Mono Font:** `JetBrains Mono` — for scores, weights, percentages, and data values.

```html
<!-- In your layout.tsx or _document -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

### Type Scale

```css
/* Headings */
.text-display    { font-family: 'Sora'; font-size: 3.5rem;  font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; }
.text-h1         { font-family: 'Sora'; font-size: 2.5rem;  font-weight: 700; line-height: 1.15; letter-spacing: -0.025em; }
.text-h2         { font-family: 'Sora'; font-size: 1.875rem; font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
.text-h3         { font-family: 'Sora'; font-size: 1.5rem;  font-weight: 600; line-height: 1.25; }
.text-h4         { font-family: 'Sora'; font-size: 1.25rem; font-weight: 600; line-height: 1.3; }

/* Body */
.text-body-lg    { font-family: 'DM Sans'; font-size: 1.125rem; font-weight: 400; line-height: 1.7; }
.text-body       { font-family: 'DM Sans'; font-size: 1rem;     font-weight: 400; line-height: 1.65; }
.text-body-sm    { font-family: 'DM Sans'; font-size: 0.875rem; font-weight: 400; line-height: 1.6; }
.text-caption    { font-family: 'DM Sans'; font-size: 0.75rem;  font-weight: 400; line-height: 1.5; letter-spacing: 0.01em; }

/* Data / Mono */
.text-data       { font-family: 'JetBrains Mono'; font-size: 0.875rem; font-weight: 500; }
.text-score      { font-family: 'JetBrains Mono'; font-size: 1.5rem;   font-weight: 400; letter-spacing: -0.02em; }
```

### Tailwind Config Extension

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#1D4ED8',
          hover: '#1E40AF',
          light: '#EFF6FF',
          muted: '#DBEAFE',
        },
        surface: {
          DEFAULT: '#F9FAFB',
          raised: '#F3F4F6',
        }
      },
      borderRadius: {
        'card': '12px',
        'pill': '100px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'elevated': '0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'slide-in': 'slideIn 0.3s ease-out both',
        'count-up': 'countUp 0.8s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      }
    },
  },
  plugins: [],
}
export default config
```

---

## Spacing System

Use multiples of 4px only. This is non-negotiable.

```
4px   → xs (0.25rem)   — tight spacing between labels
8px   → sm (0.5rem)    — icon-to-text gap
12px  → md (0.75rem)   — within card padding
16px  → base (1rem)    — standard element spacing
20px  → lg (1.25rem)   — section element gap
24px  → xl (1.5rem)    — card padding, section gap
32px  → 2xl (2rem)     — page section spacing
48px  → 3xl (3rem)     — major section separation
64px  → 4xl (4rem)     — hero internal spacing
96px  → 6xl (6rem)     — between landing sections
```

---

## Component Design Patterns

### Cards

All cards use:
- White background `#FFFFFF`
- Border: `1px solid #E5E7EB`
- Border radius: `12px`
- Shadow: `shadow-card` on rest, `shadow-card-hover` on hover
- Padding: `24px`
- Transition: `all 200ms ease`

```tsx
<div className="bg-white border border-gray-200 rounded-[12px] p-6 shadow-card hover:shadow-card-hover transition-all duration-200">
```

### Badges

Three types only:
1. **Category badge** — filled soft background, matching text color, no border
2. **Risk badge** — border + soft fill, traffic-light colors
3. **Status badge** — filled, always clearly communicates state

```tsx
// Category
<span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">finance</span>

// Risk: medium
<span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">medium risk</span>

// Status: active
<span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">active</span>
```

### Buttons

Primary action only — one per view:
```tsx
// Primary
<button className="px-5 py-2.5 bg-accent text-white font-semibold text-sm rounded-lg hover:bg-accent-hover active:scale-[0.98] transition-all duration-150 shadow-sm">
  Create Proposal
</button>

// Secondary
<button className="px-5 py-2.5 bg-white text-gray-700 font-semibold text-sm rounded-lg border border-gray-200 hover:bg-surface active:scale-[0.98] transition-all duration-150">
  View All
</button>

// Ghost
<button className="px-4 py-2 text-accent font-semibold text-sm rounded-lg hover:bg-accent-light transition-all duration-150">
  Learn more →
</button>
```

### Progress Bars

For vote tracking:
```tsx
<div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
  <div className="bg-emerald-400 transition-all duration-700 ease-out" style={{ width: `${forPct}%` }} />
  <div className="bg-red-400 transition-all duration-700 ease-out" style={{ width: `${againstPct}%` }} />
</div>
```

### Form Inputs

```tsx
<input className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-150 bg-white" />
```

---

## Navigation

Fixed top navigation, white background, bottom border.

```
Height: 64px
Background: #FFFFFF
Bottom border: 1px solid #E5E7EB
Layout: [Logo left] [Nav links center] [User avatar + score right]
```

Logo lockup:
- "Syn" in `font-sora font-800 text-accent`
- "Gov" in `font-sora font-800 text-gray-900`
- No icon needed — the word mark is the mark

Nav links: Dashboard · Proposals · Analytics

Active link: `text-accent font-semibold` with a `2px bottom border in accent color`
Inactive link: `text-gray-600 hover:text-gray-900`

---

## Landing Page — Full Specification

The landing page is the most important page. It must convert on its own.
People visiting should understand the product in 30 seconds.

### Page Structure (in order)

```
1. Navbar
2. Hero Section
3. Problem Statement Section
4. How It Works Section
5. Feature Highlights Section
6. Social Proof / Stats Section
7. CTA Section
8. Footer
```

---

### Section 1 — Hero

**Goal:** Communicate what SynGov is and create immediate desire to try it.

**Layout:** Centered, full-width, generous white space

**Content:**

```
OVERLINE:   "Built for college communities" — small caps, accent color, letter-spaced
HEADLINE:   "Governance that works for everyone"
SUBLINE:    "SynGov gives your club the structure to make decisions together — fairly, transparently, and without drama."
CTA button: "Get Started Free" — primary accent button, large, pill-shaped
SECONDARY:  "See how it works →" — ghost button
```

**Visual treatment:**

Under the CTA buttons, show a floating dashboard mockup — a slightly tilted card grid showing a proposal card and a vote progress bar. Apply a subtle drop shadow (`0 32px 64px rgba(0,0,0,0.12)`). This communicates the product immediately without a single word.

The hero background is white. Add a very subtle radial gradient emanating from top-center:
```css
background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(29, 78, 216, 0.06) 0%, transparent 60%);
```

**Typography:**
- Overline: `text-xs font-semibold uppercase tracking-widest text-accent`
- Headline: `font-sora text-5xl font-extrabold text-[#0F172A] leading-[1.1] tracking-tight`
- Subline: `font-sans text-xl text-gray-500 max-w-xl mx-auto leading-relaxed`

**Animation:** Headline fades up on load, subline 100ms after, buttons 200ms after.

---

### Section 2 — Problem Statement

**Goal:** Make the reader nod. They've lived this problem.

**Layout:** 2-column grid — left text, right visual checklist

**Headline:** "Sound familiar?"

**Left content (prose):**
```
College clubs are run by good people with messy processes.
A few voices dominate. Most members stay quiet. Fund decisions
happen in WhatsApp groups. Nobody really knows why things
got approved.

SynGov fixes the process, not the people.
```

**Right content:**
Checklist of 5 pain points with ✗ icons (red), then the same 5 with ✓ icons (green) showing the SynGov alternative.

```
✗ Decisions made by 2-3 people         →   ✓ Every member gets a weighted voice
✗ Proposals are hard to understand      →   ✓ AI-simplified KPI summaries
✗ Fund usage is opaque                  →   ✓ Every vote is logged on blockchain
✗ Active members treated like lurkers   →   ✓ Contribution score = real influence
✗ No record of past decisions           →   ✓ Full governance history, always visible
```

Style: Each row is a clean horizontal card. ✗ rows have light red background, ✓ rows have light green background. Smooth stagger animation as they scroll into view.

---

### Section 3 — How It Works

**Goal:** Show the 4-step journey, make it feel effortless.

**Layout:** Center-aligned heading, then 4 horizontal steps with connecting dotted line

**Heading:** "From idea to decision in four steps."

**Steps:**

```
① Create a Proposal
   Write your proposal in plain text. SynGov does the rest.
   [Icon: pencil on document]

② AI Simplifies It
   Gemini extracts what matters — cost, risk, impact, deadline.
   [Icon: sparkles / AI]

③ Members Vote
   Each vote is weighted by contribution and expertise — not rank or seniority.
   [Icon: ballot / scale]

④ Decision is Logged
   The result is transparent and permanently recorded on Polygon.
   [Icon: chain / lock]
```

**Visual style:** Each step is a vertical card with large step number in light accent color background, icon, bold title, and 2-line description. Cards connected by subtle dotted line on desktop.

---

### Section 4 — Feature Highlights

**Goal:** Communicate the three core innovations of SynGov.

**Layout:** 3-column cards, icon top, headline, description

```
Feature 1: Contribution-Aware Voting
Icon: bar chart / scale
"Your influence reflects your involvement. Attendance, tasks, proposals —
 all of it counts toward your governance weight. Newcomers start at 1.0.
 Core members earn up to 1.5x."

Feature 2: AI-Simplified Proposals
Icon: sparkle / document
"Long proposals get turned into clear summaries instantly.
 What's being asked. Why it matters. What it costs. What the risk is.
 No reading fatigue."

Feature 3: Transparent by Default
Icon: chain link / eye
"Every vote, every decision, every proposal outcome is logged on Polygon.
 Anyone can verify. Nothing is hidden. Trust is built into the system."
```

**Visual style:** White cards, subtle border, soft drop shadow. Icon in accent-light circle background. Title in Sora bold. Description in DM Sans body-sm. Hover lifts the card 4px with increased shadow.

---

### Section 5 — Stats Bar

**Goal:** Build credibility with numbers (these can be aspirational for launch).

**Layout:** Horizontal strip, gray-50 background, 4 stats evenly spaced

```
Stat 1:  "3x" — faster proposal understanding
Stat 2:  "78%" — avg participation rate on SynGov clubs
Stat 3:  "100%" — vote records publicly verifiable
Stat 4:  "< 30 sec" — time to understand any proposal
```

**Style:** Large number in `JetBrains Mono font-400 text-4xl text-accent`, label below in DM Sans caption text-gray-500. Animate numbers counting up on scroll-into-view.

---

### Section 6 — CTA Section

**Goal:** Final conversion moment before footer.

**Layout:** Full-width, centered, white background with a subtle accent radial from bottom

**Headline:** "Your club deserves better than a WhatsApp poll."

**Subline:** "Set up SynGov in minutes. No blockchain knowledge required."

**Buttons:** "Get Started Free" (primary) · "Read the Docs →" (ghost)

This section should feel spacious — 96px top and bottom padding. The headline is the biggest type on the page other than the hero.

---

### Section 7 — Footer

```
Left:    Logo + tagline "Smarter decision-making for college communities"
Center:  Links: Product · Docs · About · GitHub
Right:   "Built for hackathons, designed for real communities."
Bottom:  "© 2025 SynGov · Open source · Polygon Amoy"
```

Footer is minimal. Text-gray-400. No heavy design.

---

## Dashboard Page — Layout

```
Sidebar (fixed, 240px wide):
- Logo top
- Nav links with icons
- User avatar + name + score at bottom

Main content area (fluid):
- Top bar: page title + "New Proposal" button
- Stats row: 4 metric cards (total proposals, participation rate, active votes, your score)
- Active Proposals grid (2-col)
- Activity Feed (right sidebar, 320px)
```

Stats card design:
```
Label (caption, text-muted)
Value (font-mono text-2xl font-medium text-primary)
Delta (text-sm text-success or danger, with up/down arrow)
```

---

## Proposal Detail Page — Layout

```
Breadcrumb: Proposals / [Title]

Two-column layout (70/30):
LEFT COLUMN:
  - Proposal header (title, badges row, creator, date)
  - AI KPI Summary Panel (bordered card with 7 fields in a 2-col grid)
  - Full proposal description (collapsible after 3 lines)
  - Discussion thread

RIGHT COLUMN:
  - VotingWidget (sticky top)
  - Proposal meta (timeline, budget, category)
  - Blockchain verification link (subtle, bottom)
```

### KPI Summary Panel Design

This is the most important card on this page.

```
Card header: "AI Summary" + sparkle icon + "Generated by Gemini" (tiny badge)

7 fields in 2-col grid:
┌─────────────────────┬─────────────────────┐
│  📋 What            │  💡 Why              │
│  [one sentence]     │  [one sentence]      │
├─────────────────────┼─────────────────────┤
│  💰 Cost            │  📈 Impact           │
│  [amount or none]   │  [expected outcome]  │
├─────────────────────┼─────────────────────┤
│  ⚠️ Risk            │  📅 Deadline         │
│  [low/med/high]     │  [date]              │
├─────────────────────┴─────────────────────┤
│  👥 Who it affects                        │
│  [community segment]                      │
└───────────────────────────────────────────┘
```

Each KPI cell: label in text-muted caption, value in text-body-sm font-medium text-primary.
Risk field uses colored badge. Cost and deadline in mono font.

---

## Proposal Creation Page — Layout

Single column, card-based form.

```
Page heading: "Create a Proposal"
Subheading: "Describe your idea. AI will extract the key details."

Form fields (in order):
1. Title — text input, full width
2. Category — Select dropdown (finance / events / tech / operations / general)
3. Description — textarea, min 4 rows, placeholder with guidance
4. Budget — text input ("₹20,000" or "none")
5. Risk Level — segmented control (low / medium / high)
6. Timeline — text input ("2 months", "Q2 2025")
7. Voting deadline — date picker

Right panel (sticky):
  Live AI preview — shows summary as it generates
  "Generating summary..." loading state with shimmer
  Once done, shows KPI panel
```

The AI preview should feel intelligent and real-time. Use a debounced call to `/api/ai/summarize` after the user stops typing for 1.5 seconds.

---

## Animation Rules

### Page Load
All primary content staggered fade-up:
```css
.animate-item-1 { animation: fadeUp 0.5s 0ms both; }
.animate-item-2 { animation: fadeUp 0.5s 80ms both; }
.animate-item-3 { animation: fadeUp 0.5s 160ms both; }
.animate-item-4 { animation: fadeUp 0.5s 240ms both; }
```

### Scroll Triggers (Landing Page)
Use `IntersectionObserver` to trigger `animate-fade-up` class on elements entering viewport.

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) el.target.classList.add('animate-fade-up')
  })
}, { threshold: 0.1 })
```

### Hover States
- Cards: `translateY(-2px)` + heavier shadow — 200ms ease
- Buttons: `scale(0.98)` on active — 100ms
- Nav links: color transition — 150ms

### Vote Progress Bar
Animate width transition: `transition: width 700ms cubic-bezier(0.4, 0, 0.2, 1)`

### Number Count-Up (Stats Section)
On scroll-into-view, animate numeric values from 0 to final value over 1200ms with easeOut.

---

## Responsiveness

### Breakpoints

```
Mobile:  < 640px
Tablet:  640px — 1024px
Desktop: > 1024px
```

### Behavior per page

**Dashboard:**
- Mobile: sidebar collapses to bottom tab bar
- Stats row: 2-col on mobile, 4-col on desktop

**Proposal list:**
- Mobile: single column
- Tablet+: 2-column grid

**Proposal detail:**
- Mobile: VotingWidget stacks below proposal content
- Desktop: sticky right column

**Landing page:**
- Hero: text + mockup stack on mobile
- Feature cards: 1-col on mobile, 3-col on desktop
- How it works steps: vertical on mobile, horizontal on desktop

---

## Image Generation Guidelines (Nano Banana / AI Generated)

Use AI-generated images in these specific places only:

### 1. Hero Section — Dashboard Mockup
**Prompt guidance:** "Minimalist web dashboard UI showing governance proposals with vote progress bars, clean white background, blue accent color scheme, flat design, editorial screenshot style, no text labels needed, 3D tilted perspective, photorealistic UI render"

### 2. How It Works — Step Icons
**Prompt guidance per step:**
- Step 1: "Clean document with a pencil icon, minimal flat illustration, single blue accent color on white, simple geometric style"
- Step 2: "Glowing AI sparkle or neural connection, clean geometric illustration, blue and white, no text"
- Step 3: "Balanced scale or voting ballot, clean geometric, blue and green, white background"
- Step 4: "Chain link or lock with blockchain grid pattern, clean illustration, blue, white background"

### 3. Feature Cards — Abstract Icons
**Prompt guidance:** "Minimal icon illustration for [feature name], flat geometric design, accent blue (#1D4ED8) on white circle background, no text, 80x80px"

### 4. Problem Section — Before/After Visual
**Prompt guidance:** "Illustration of chaotic group chat vs clean organized interface, split comparison, clean flat style, muted colors on left panel, clean blue-white on right, minimal characters"

**Rules for all generated images:**
- Always white or very light background
- No busy or complex compositions
- Accent blue must match `#1D4ED8`
- No text in images (handled by HTML/CSS)
- Minimum 2x resolution for retina displays
- WebP format, optimized for web

---

## Accessibility

- All interactive elements must have `:focus-visible` ring: `ring-2 ring-accent ring-offset-2`
- Minimum contrast ratio: 4.5:1 for all body text
- All icon-only buttons must have `aria-label`
- Badge colors never convey meaning alone — always pair with text
- Form inputs have explicit `<label>` elements, not just placeholders
- Voting widget is keyboard-navigable

---

## What This Should NOT Look Like

Hard stops — if any of these appear, remove them:

| ❌ Banned | Reason |
|---|---|
| Purple/violet hero gradients | Generic SaaS cliché |
| Dark mode as default | Not appropriate for governance trust context |
| Neon or glow effects | Crypto aesthetic, wrong audience |
| Glassmorphism cards | Trendy but reduces readability |
| NFT/token balance displays | Out of scope, wrong product signal |
| Chatbot bubble UI | Explicitly excluded from product scope |
| Floating "?" help button | Adds clutter, not needed with good IA |
| Confetti or celebration animations | Inappropriate for governance context |
| Heavy use of emoji in UI | Undermines credibility |
| Font: Inter, Roboto, or Arial | Generic, lacks personality |

---

## shadcn/ui Component Usage

Use these shadcn components exactly as intended. Do not restyle them beyond these overrides:

| Component | Used For | Override |
|---|---|---|
| `Card` | All content blocks | Custom shadow + border-radius |
| `Badge` | Category, risk, status | Custom color classes |
| `Button` | Actions | Font to Sora, custom accent color |
| `Progress` | Vote bar | Custom colors via className |
| `Tabs` | Proposal detail navigation | Custom indicator color |
| `Dialog` | Confirmation modals | Standard |
| `Select` | Category dropdown | Standard |
| `Textarea` | Proposal description | Standard with custom border-focus |
| `Avatar` | User display | Standard |
| `Separator` | Section dividers | Standard |

---

## Final Quality Checklist

Before calling any page "done," verify:

- [ ] Every heading uses Sora font
- [ ] Body copy uses DM Sans
- [ ] All numerical data uses JetBrains Mono
- [ ] Color usage matches defined palette exactly
- [ ] No hardcoded hex values outside CSS variables
- [ ] All cards use correct border-radius (12px) and shadow
- [ ] All hover states are smooth (200ms ease)
- [ ] Progress bars animate on load
- [ ] Landing page sections have correct scroll animations
- [ ] Mobile layout tested at 375px width
- [ ] All badge colors match category/risk/status spec
- [ ] No non-governance features visible in the UI
- [ ] CTA button visible above the fold on landing page
- [ ] AI summary panel shows skeleton/shimmer while loading
- [ ] Voting widget is disabled after user votes (not hidden)

---

*End of design.md*
