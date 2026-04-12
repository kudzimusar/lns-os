# LNS OS — Mobile Design System & Developer Prompt
## Version 1.0 | Enforced Standard for All Mobile Development

---

## 1. CONTEXT & PRODUCT IDENTITY

**Product:** LNS OS — "The Operating System for Modern Learning"
**Live URL:** https://kudzimusar.github.io/lns-os/
**Stack:** Next.js 16 (App Router), Tailwind CSS, TypeScript, PWA
**Color Palette:** Navy `#0A1F44` · Red `#D62B2B` · White `#FFFFFF` · Light Grey `#F4F5F7` · Mid Grey `#8C92A0` · Dark Navy `#2E3A4E`
**Typography:** Manrope / DM Sans (headings) · Inter / Nunito (body) · JetBrains Mono (data/codes)

**Primary mobile users:**
- **Students (ages 11–14):** Need a fast, clear, engaging experience. They will use this daily to scan QR codes, submit assignments, check grades. Must feel like a real app — not a school website.
- **Parents:** Need clarity above all. They check on their child's progress quickly, often while busy. Must be readable, simple, and trustworthy.
- **Teachers:** Use mobile for quick attendance, urgent messages, and alerts while on the move. Not their primary device but must work without friction.

---

## 2. THE GOLDEN RULE

> **If a single element overflows, wraps incorrectly, clips, or appears misaligned on any screen between 320px and 767px wide — that screen is broken. Broken screens ship as zero. Fix before merging.**

This is not a responsive desktop site that shrinks. This is a **mobile-first application** that scales up. Every component must be designed for 375px first, then adapted upward.

---

## 3. BREAKPOINT SYSTEM — STRICT DEFINITIONS

```
Mobile:   320px – 767px   → App layout. Full-screen panels. Bottom navigation.
Tablet:   768px – 1199px  → Widened cards. Collapsible sidebar. 2-column grids.
Desktop:  1200px+         → Full sidebar. Multi-column dashboard. Expanded tables.
```

**In Tailwind, this means:**
- Write base styles for mobile (no prefix)
- Use `md:` for tablet overrides
- Use `lg:` or `xl:` for desktop overrides
- NEVER write desktop styles as default and add `sm:` overrides — this is the most common mistake and it is banned

**Example (correct):**
```tsx
<div className="w-full px-4 py-3 md:w-1/2 md:px-6 lg:w-1/3 lg:px-8">
```

**Example (banned — do not do this):**
```tsx
<div className="grid grid-cols-3 sm:grid-cols-1">
```

---

## 4. NAVIGATION — MOBILE LAW

**On mobile (< 768px), the sidebar MUST NOT exist.** It is `hidden` on mobile. No exceptions.

**Mobile navigation is a fixed bottom tab bar only.** It must:
- Be fixed to the bottom of the screen: `fixed bottom-0 left-0 right-0 z-50`
- Have a height of exactly `64px` (plus safe area inset for iOS: `pb-safe`)
- Contain a maximum of **5 tabs**
- Each tab: icon (24px) above a label (10px, sentence case)
- Active tab: Red `#D62B2B` icon and label. Inactive: Mid Grey `#8C92A0`
- Background: White with a top border `border-t border-gray-200`
- Never overflow — tabs must share equal width: `flex-1`

**Tab sets per role:**

Student tabs: `Home · Scan · Assignments · Grades · Profile`
Parent tabs: `Home · Child · Attendance · Messages · Profile`
Teacher tabs: `Home · Register · Classes · Messages · More`
Admin tabs: `Home · Users · Analytics · Alerts · Settings`

**The "More" tab** opens a full-screen drawer (slides up from bottom) containing secondary navigation items. This is how you avoid cramming more than 5 items into the tab bar.

```tsx
// Bottom nav must always account for iPhone home indicator
<nav className="fixed bottom-0 left-0 right-0 z-50 h-16 pb-safe bg-white border-t border-gray-200 flex md:hidden">
  {tabs.map(tab => (
    <button key={tab.id} className="flex-1 flex flex-col items-center justify-center gap-0.5">
      <tab.icon size={22} className={isActive(tab) ? 'text-red-600' : 'text-gray-400'} />
      <span className={`text-[10px] ${isActive(tab) ? 'text-red-600 font-medium' : 'text-gray-400'}`}>
        {tab.label}
      </span>
    </button>
  ))}
</nav>
```

**Main content area on mobile must always include bottom padding to clear the nav bar:**
```tsx
<main className="pb-20 md:pb-0">
```

---

## 5. TYPOGRAPHY RULES — MOBILE

| Element | Mobile Size | Weight | Notes |
|---|---|---|---|
| Page title | 20px (`text-xl`) | 600 | Max 1 line. Truncate with ellipsis if longer. |
| Section heading | 16px (`text-base`) | 600 | Never uppercase |
| Card title | 15px | 500 | |
| Body text | 14px (`text-sm`) | 400 | Line height 1.6 |
| Caption / label | 12px (`text-xs`) | 400 | Use sparingly |
| Minimum tap label | 11px | 400 | Absolute floor — never smaller |
| Data / code | 13px | 400 | JetBrains Mono |

**Rules:**
- Never use `text-base` (16px) for body on mobile — it causes layout overflow in tight containers
- Long strings (names, emails, file names) must always have `truncate` or `line-clamp-2` applied
- Never rely on text wrapping to fill a container — always constrain with `max-w` or `truncate`
- Heading hierarchy: only one `text-xl` per screen. Everything else steps down.

---

## 6. TOUCH TARGETS — NON-NEGOTIABLE

Every tappable element must meet these minimums:

| Element | Minimum tap area |
|---|---|
| Button | 44px height, full width or min 120px wide |
| Icon button | 44px × 44px (use padding to expand if icon is smaller) |
| List item / card | 56px minimum height |
| Form input | 48px height |
| Checkbox / radio | 44px × 44px tap area (not just the visual element) |
| Tab bar item | Full height of tab bar × flex-1 width |

**Enforcement:**
```tsx
// Correct — button meets 44px minimum
<button className="h-11 px-6 rounded-xl bg-red-600 text-white text-sm font-medium">
  Submit
</button>

// Banned — too small on mobile
<button className="h-7 px-3 text-xs">
  Submit
</button>
```

---

## 7. LAYOUT & SPACING RULES

**Horizontal padding:** All screen-level content must have `px-4` (16px) on mobile. Never less.

**Cards on mobile:**
- Full width: `w-full` — no side-by-side cards on mobile unless they are stat summary cards (max 2 per row)
- Padding: `p-4` (16px) inside cards
- Border radius: `rounded-2xl` (16px)
- No fixed heights — let content define height
- Never use `overflow-hidden` on a card that contains dynamic content without also handling text truncation inside

**Grids on mobile:**
```tsx
// Stat cards — max 2 columns on mobile
<div className="grid grid-cols-2 gap-3 md:grid-cols-4">

// Content cards — always 1 column on mobile
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

// BANNED — 3 columns on mobile
<div className="grid grid-cols-3">
```

**Horizontal scroll (when needed):**
When a row of items cannot fit in 1-column layout (e.g. subject filter chips, quick action buttons), use horizontal scroll — never wrap into multiple rows uncontrolled:
```tsx
<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
  {items.map(item => <Chip key={item.id} {...item} />)}
</div>
```

**Stacking order on mobile:** All multi-column desktop layouts must collapse to single column. Use `flex-col` as default, `md:flex-row` for tablet+.

---

## 8. IMAGES & AVATARS

- Student/staff avatars: always `rounded-full`. Sizes: `w-10 h-10` (list), `w-16 h-16` (profile header), `w-24 h-24` (full profile page)
- All images must have `object-cover` and explicit dimensions — never let an image define its own dimensions on mobile
- Hero images or banners: use `aspect-video` or `aspect-[16/9]` — never fixed pixel heights
- Always provide `alt` text
- If an image fails to load, show a fallback with initials in a coloured circle — never a broken image icon

```tsx
// Correct avatar with fallback
<div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center overflow-hidden flex-shrink-0">
  {user.photo
    ? <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
    : <span className="text-sm font-medium text-navy-700">{initials(user.name)}</span>
  }
</div>
```

**`flex-shrink-0` is mandatory on all avatars inside flex rows** — without it, the avatar compresses when sibling text is long.

---

## 9. BUTTONS — MOBILE STANDARDS

**Primary button (CTA):**
```tsx
<button className="w-full h-12 bg-red-600 text-white rounded-xl text-sm font-semibold tracking-wide active:scale-95 transition-transform">
  Scan QR Code
</button>
```

**Secondary button:**
```tsx
<button className="w-full h-12 border border-navy-800 text-navy-800 rounded-xl text-sm font-medium">
  View Grades
</button>
```

**Icon button:**
```tsx
<button className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200">
  <BellIcon size={20} className="text-navy-800" />
</button>
```

**Rules:**
- Primary buttons are `w-full` on mobile unless there are exactly 2 side-by-side (then `flex-1` each)
- Never more than 2 buttons side by side on mobile
- Always include `active:scale-95` or `active:opacity-80` for touch feedback
- Destructive buttons (delete, remove): Red border + red text on white. Never solid red for destructive on mobile — too alarming
- Loading state: replace button text with a spinner, keep same dimensions — never let button resize during loading

---

## 10. FORMS & INPUTS — MOBILE

```tsx
// Standard input
<input
  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-500"
  type="text"
/>

// Label above input (never floating on mobile — floating labels are confusing on small screens)
<label className="block text-xs font-medium text-gray-500 mb-1.5">Student Name</label>
```

**Rules:**
- Input height: always `h-12` (48px) on mobile
- Labels: always above the input, never inside or floating
- Error messages: below the input in red `text-xs text-red-600 mt-1`
- Use `inputMode` for correct keyboard: `inputMode="email"`, `inputMode="numeric"`, `inputMode="search"`
- Use `type="date"` for date pickers — do not build custom date pickers for mobile
- Multi-step forms: one step per screen on mobile. Never a long scrolling form with 10+ fields.
- Select dropdowns: use native `<select>` on mobile — custom dropdowns often break on iOS/Android

---

## 11. TABLES — MOBILE

**Tables are banned as `<table>` elements on mobile.** Data tables cannot scroll horizontally without a wrapper, and they always overflow. Instead:

**Convert tables to card lists on mobile:**
```tsx
// Desktop: table row
// Mobile: card
<div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2 md:hidden">
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium text-gray-900">{student.name}</span>
    <StatusBadge status={student.status} />
  </div>
  <div className="flex gap-4 text-xs text-gray-500">
    <span>Class: {student.class}</span>
    <span>Score: {student.score}%</span>
  </div>
</div>

// Show actual table only on desktop
<table className="hidden md:table w-full">
  ...
</table>
```

If a table absolutely must exist on mobile (e.g. gradebook), wrap it:
```tsx
<div className="overflow-x-auto -mx-4 px-4">
  <table className="min-w-[600px] w-full">
    ...
  </table>
</div>
```

---

## 12. ROLE-SPECIFIC MOBILE EXPERIENCE

### Student Mobile App (Ages 11–14)

The student experience must feel like a consumer app — energetic, clear, rewarding.

**Home screen priority order:**
1. Greeting with student name and today's date
2. Next class / current period with time remaining
3. QR Scan button — large, prominent, red. This is their most frequent action.
4. Active assignments with urgency (overdue in red, due today in amber, upcoming in navy)
5. Recent grade received
6. Merit/points tally (gamified — makes it engaging)

**Visual language:**
- Use progress bars, badges, and streaks to make grades and attendance feel rewarding
- Citizenship status shown as a badge with colour: C+ = green, N = amber, F = red
- QR code page: full screen display of their QR — large, high contrast, brightness forced to maximum via JS
- Assignment submission: step-by-step wizard (one step per screen) — never a single long form
- Grades view: visual grade card per subject, colour coded, with trend arrow (up/down)

**Tone of UI text for students:** Direct, friendly, present tense. "Your Maths grade is up this week." Not "Grade improvement detected in Mathematics."

---

### Parent Mobile App

The parent experience must feel trustworthy, calm, and informative.

**Home screen priority order:**
1. Child selector (if multiple children) — prominent at top
2. Today's attendance status — large, immediate. Green tick = present. Red = absent.
3. Recent grade or assessment result
4. Unread messages from teacher
5. Upcoming school events / announcements
6. Quick link: Message Teacher

**Visual language:**
- Clean, calm. No gamification — parents want facts not streaks.
- Risk alerts (low grade, repeated absence) shown as a card at the top with a clear explanation in plain language. Not a cryptic badge.
- Report card download: prominent button when published — parents should never have to hunt for it.
- All teacher messages shown with timestamp and teacher name/subject. Reply inline.
- Multilingual: language preference shown in profile. All content renders in selected language.

**Tone of UI text for parents:** Professional, warm, transparent. "Amara was marked absent on Monday 7 April. Contact the school if this is incorrect." Not technical jargon.

---

### Teacher Mobile (Secondary — Quick Actions Only)

Teachers primarily use desktop. Mobile is for urgent tasks only.

**Home screen priority order:**
1. Today's classes in order
2. Attendance alerts — any class with register not taken
3. Unread parent messages
4. At-risk alerts from AI
5. Quick action: Take Register for current class

**Key mobile teacher flows (must work flawlessly on mobile):**
- Take attendance: class → date auto-set to today → list of students → tap P/A/L per student → save
- QR scanner: one tap to open camera, scan student QR, register updates
- Send message to parent: search parent → type → send. Max 3 taps.
- Log behaviour incident: student search → incident type → description → save

---

## 13. QR SCANNER — MOBILE SPECIFIC

The QR scanner is a primary feature on mobile for students and teachers.

**Student scan flow (complete, no shortcuts):**
1. Student taps Scan tab in bottom nav
2. Camera opens full-screen immediately — no intermediate screen
3. Overlay: navy frame in centre of camera view with animated corner brackets
4. Text at top: "Point at the classroom QR code" (14px, white, semi-transparent background)
5. On successful scan: full-screen green flash (200ms) + haptic feedback + "Marked Present — [Subject Name]" confirmation card slides up from bottom
6. Confirmation card shows: subject, teacher name, time, date. Auto-dismisses after 3 seconds.
7. On failed scan / wrong QR: red flash + "Unrecognised code — try again" message
8. Camera permission denied: full-screen prompt explaining why permission is needed with Settings button

**Technical requirements:**
- Use `react-qr-reader` or `jsQR` with `getUserMedia` API
- Request camera permission on first use with a pre-permission explanation screen ("LNS OS needs your camera to scan your class QR code")
- Torch/flashlight toggle button for dark classrooms
- Manual entry fallback: "Can't scan? Enter code manually" link below camera view

**Projector/overhead display mode (Teacher):**
- Full-screen white background, subject QR centred, maximum size
- Subject name below QR in 24px Navy
- Period and time shown below
- Screen brightness forced to 100% via JS: `screen.orientation` lock to landscape for projector mode
- "Tap anywhere to exit projector mode" instruction in small grey text at bottom

---

## 14. PERFORMANCE RULES FOR MOBILE

Mobile devices on school networks can be slow. Performance is a feature.

- **Images:** Always use `next/image` with `sizes` prop. Never raw `<img>` for content images.
- **Lazy loading:** All below-fold content must use `loading="lazy"` or dynamic imports
- **Skeleton screens:** Every data-fetching component must show a skeleton while loading — never a spinner in the middle of the screen, never a blank white area
- **Bundle size:** No library over 50kb gzipped should be added without approval. Prefer native browser APIs.
- **Animations:** Use CSS transforms only (`translate`, `scale`, `opacity`). Never animate `width`, `height`, `top`, `left` — these trigger layout reflow and cause jank on mobile.
- **Touch scroll:** All scrollable areas must have `-webkit-overflow-scrolling: touch` or the Tailwind equivalent. Scrolling must feel native, not janky.
- **Font loading:** Use `font-display: swap` — text must be readable before custom fonts load.

---

## 15. PWA REQUIREMENTS

LNS OS is installed as a PWA on student and parent devices. The installed experience must feel native.

**Manifest requirements (`manifest.json`):**
```json
{
  "name": "LNS OS",
  "short_name": "LNS OS",
  "description": "The Operating System for Modern Learning",
  "theme_color": "#0A1F44",
  "background_color": "#0A1F44",
  "display": "standalone",
  "orientation": "portrait",
  "start_url": "/",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

**Installed app behaviour:**
- Status bar colour: Navy `#0A1F44` (set via `theme-color` meta tag)
- Splash screen: Navy background, LNS OS logo centred, white wordmark
- No browser chrome visible in standalone mode — the app must look 100% native
- Back button (Android): must navigate within the app, never close it unexpectedly
- Install prompt: shown after user's 3rd session. Banner at bottom: "Add LNS OS to your home screen" with Install and Dismiss buttons. Never a popup/modal.

**Offline behaviour:**
- Offline banner: fixed top bar, amber background, "You are offline — some features unavailable"
- Sync queue indicator: shows number of pending actions (e.g. "3 items waiting to sync")
- Pages that work offline: Home dashboard (cached), last viewed grades, timetable
- Pages that require connection: QR scanner, messaging, AI features — show clear "Requires internet connection" state, not a blank screen or error

---

## 16. ACCESSIBILITY — MOBILE MINIMUM

- Contrast ratio: minimum 4.5:1 for all text on its background. Use https://webaim.org/resources/contrastchecker/ to verify.
- All interactive elements must have an `aria-label` if they contain only an icon
- `prefers-reduced-motion`: wrap all animations in `@media (prefers-reduced-motion: no-preference)` — users who have reduced motion enabled must see no animations
- Focus states: visible on all interactive elements for keyboard navigation (even on mobile, some users use keyboards with tablets)
- Error messages must be announced to screen readers via `aria-live="polite"`

---

## 17. TESTING CHECKLIST — BEFORE ANY MOBILE PR IS MERGED

Every pull request that touches a UI component must be verified against this checklist:

```
[ ] Tested at 320px width (smallest Android) — nothing overflows
[ ] Tested at 375px width (iPhone SE / standard)
[ ] Tested at 430px width (iPhone Pro Max / large Android)
[ ] Tested at 768px width (tablet breakpoint transition)
[ ] Bottom nav visible and functional on all mobile sizes
[ ] All tap targets are minimum 44px
[ ] No horizontal scroll on any page except explicitly scrollable rows
[ ] No text smaller than 11px
[ ] All images have alt text and defined dimensions
[ ] Tables converted to card lists on mobile
[ ] Forms use correct inputMode and native date pickers
[ ] Skeleton screens show on all data-loading states
[ ] Empty states exist on all list views when data is absent
[ ] PWA: app still works offline (dashboard + grades + timetable)
[ ] Tested on real device (not just browser DevTools) before merging
```

**DevTools is not sufficient.** Browser DevTools device emulation does not replicate touch behaviour, safe area insets, or real network conditions. Test on at least one real Android and one real iOS device before marking any mobile work as complete.

---

## 18. WHAT IS BANNED — ZERO TOLERANCE

The following patterns are banned and must be rejected in code review:

| Banned pattern | Why |
|---|---|
| `grid-cols-3` or more without `md:` prefix | Overflows on mobile |
| `w-[fixed px value]` on any full-width element | Breaks on small screens |
| `overflow-hidden` on a container with dynamic text | Clips content |
| Desktop sidebar visible on mobile | Takes up all space |
| `position: fixed` modals/overlays without `min-height` | Collapses to 0 height in iframe/PWA |
| Buttons with `h-8` or less on mobile | Below 44px tap target |
| Raw `<table>` without overflow wrapper on mobile | Always overflows |
| `font-size` below 11px | Unreadable |
| `hover:` only states without `active:` equivalent | Hover does not exist on touch |
| Custom date picker replacing native `<input type="date">` | Breaks on iOS |
| Alert/confirm dialogs using `window.alert()` | Unstyled, breaks PWA feel |
| Images without `alt` text | Accessibility failure |
| Any hardcoded colour that is not from the design token system | Breaks dark mode compatibility |

---

## 19. COMPONENT FILE NAMING CONVENTION

All mobile-specific component overrides must follow this naming pattern:

```
components/
  mobile/
    BottomNav.tsx          — Role-aware bottom tab bar
    MobileHeader.tsx       — Top bar for mobile (back button, title, action icon)
    StudentCard.mobile.tsx — Mobile card version of a student list item
    GradeCard.mobile.tsx   — Mobile grade display card
    QRScanner.tsx          — Camera-based QR scanner component
    QRDisplay.tsx          — Full-screen QR display for student identity
    ProjectorMode.tsx      — Full-screen subject QR for overhead display
    OfflineBanner.tsx      — Offline state indicator
    PWAInstallPrompt.tsx   — Install to home screen prompt
```

Shared components that must be mobile-aware from the start live in `components/ui/` and use Tailwind responsive prefixes internally — they must never require a separate mobile version.

---

## 20. SIGN-OFF

This document is the law for all mobile development on LNS OS. No mobile UI change is approved without passing the testing checklist in Section 17. No pattern from the banned list in Section 18 is ever acceptable regardless of deadline pressure.

The standard we are building toward: open LNS OS on a student's phone and it must feel as native and polished as Google Classroom, Duolingo, or any top-tier educational app on the Play Store or App Store. That is the bar. Build to it.

**Last updated:** April 2026
**Owner:** LNS OS Development Team
**Approved by:** Project Lead
