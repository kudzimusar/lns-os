# LNS OS — Tablet Design System & Developer Prompt
## Version 1.0 | Enforced Standard for All Tablet Development

---

## 1. CONTEXT & PRODUCT IDENTITY

**Product:** LNS OS — "The Operating System for Modern Learning"
**Live URL:** https://kudzimusar.github.io/lns-os/
**Stack:** Next.js 16 (App Router), Tailwind CSS, TypeScript, PWA
**Color Palette:** Navy `#0A1F44` · Red `#D62B2B` · White `#FFFFFF` · Light Grey `#F4F5F7` · Mid Grey `#8C92A0` · Dark Navy `#2E3A4E`
**Typography:** Manrope / DM Sans (headings) · Inter / Nunito (body) · JetBrains Mono (data/codes)

**Primary tablet users:**
- **Students (ages 11–14):** Tablets are their primary learning device in class. They submit assignments, scan QR codes, check grades, and do quizzes on this device. The experience must feel like a native iPad/Android tablet educational app — think Google Classroom meets Duolingo on a tablet. Engaging, structured, and built for focused work sessions.
- **Teachers:** Use tablets mounted at the classroom door for QR scanning, or held while walking the classroom to monitor student progress. Must support both portrait and landscape confidently.
- **Parents:** May use a tablet at home to review their child's performance in detail. More screen space means richer data visualisation — use it.

**The tablet is not a big phone and not a small desktop.**
It is its own device class with its own interaction patterns, screen ratios, and user contexts. Design for it explicitly.

---

## 2. THE GOLDEN RULE

> **If any layout on a tablet looks like the mobile view simply stretched wider, or like the desktop view awkwardly compressed — it is wrong. Every tablet layout must be intentionally designed for the tablet canvas. Fix before merging.**

The tablet experience must pass this test: hand it to a student, and within 5 seconds they know exactly what to tap next. No hunting. No squinting. No accidental taps on the wrong element.

---

## 3. BREAKPOINT SYSTEM — TABLET DEFINITION

```
Mobile:        320px –  767px   → App layout. Bottom nav. Single column.
Tablet Small:  768px –  899px   → iPad Mini, small Android tablets. 2-col layout. Side nav appears.
Tablet Large:  900px – 1199px   → iPad Air/Pro, large Android tablets. 2–3 col layout. Full side nav.
Desktop:       1200px+          → Full sidebar. Multi-column. Expanded tables.
```

**In Tailwind, this means:**
- `md:` targets tablet small (768px+)
- `lg:` targets tablet large and desktop (1024px+)
- For tablet-only rules (not desktop): use `md:X lg:Y` to step between them
- Never assume `md:` = desktop. It is tablet first.

**Orientation support is mandatory for tablets:**
- Portrait: primary layout — content stacks with left sidebar or top nav
- Landscape: secondary layout — wider canvas enables 3-column layouts, side-by-side panels
- Use `@media (orientation: landscape)` in CSS or Tailwind's `landscape:` variant where needed
- Test BOTH orientations for every tablet view before marking as done

---

## 4. NAVIGATION — TABLET LAW

**Tablets use a persistent left sidebar — not a bottom tab bar (that is mobile only) and not a full desktop sidebar (that is too wide).**

### Sidebar Specifications:

**Collapsed state (default on Tablet Small 768–899px):**
- Width: `64px`
- Shows icons only — no labels
- Hover tooltip shows label
- Active item: Red left border `border-l-4 border-red-600` + light navy background

**Expanded state (default on Tablet Large 900px+, toggle on small):**
- Width: `220px`
- Shows icon + label side by side
- Logo/wordmark at top: LNS OS in navy, 18px, font-weight 600
- Active item: Red left border + light navy background row + red label text
- Section dividers between nav groups (thin `border-t border-gray-100` lines)
- Expand/collapse toggle button at bottom of sidebar

**Sidebar structure (Teacher):**
```
[LNS OS logo]
─────────────
  Dashboard
  Attendance
  QR Scanner
  Gradebook
  Assignments
  Assessments
─────────────
  Students
  Behaviour
  Timetable
─────────────
  Reports
  AI Insights
  Analytics
─────────────
  Messaging
  Documents
─────────────
  Support
  Settings
```

**Sidebar structure (Student):**
```
[LNS OS logo + student avatar]
─────────────
  Home
  Scan QR
  Assignments
  Grades
─────────────
  Messages
  Documents
─────────────
  Profile
  Support
```

**Sidebar structure (Parent):**
```
[LNS OS logo]
─────────────
  Home
  My Child
  Attendance
  Grades
─────────────
  Messages
  Announcements
─────────────
  Documents
  Settings
```

**Main content area must offset for sidebar:**
```tsx
<div className="flex h-screen overflow-hidden">
  <Sidebar className="hidden md:flex w-16 lg:w-56 flex-shrink-0" />
  <main className="flex-1 overflow-y-auto">
    {children}
  </main>
</div>
```

**No bottom tab bar on tablet.** The `md:hidden` class must be on the `BottomNav` component. The sidebar replaces it entirely.

---

## 5. TYPOGRAPHY RULES — TABLET

Tablets have more screen real estate. Use it for readability, not for cramming more text.

| Element | Tablet Size | Weight | Notes |
|---|---|---|---|
| Page title | 24px (`text-2xl`) | 600 | Can span full width of content area |
| Section heading | 18px (`text-lg`) | 600 | Clear hierarchy below page title |
| Card title | 16px (`text-base`) | 500 | |
| Body text | 15px | 400 | Line height 1.7 — readable for students |
| Caption / label | 13px (`text-sm`) | 400 | Used for metadata, timestamps |
| Data / code | 14px | 400 | JetBrains Mono |
| Tab labels | 13px | 500 | Uppercase only for tab bars, nowhere else |
| Minimum size | 12px | 400 | Absolute floor |

**Rules:**
- On tablet, body text is slightly larger than mobile (15px vs 14px) — the distance from eyes to screen is greater
- Headings can be bolder and larger — the canvas supports it
- Line length (measure): content columns should max out at `max-w-3xl` (768px) for reading comfort — do not let paragraphs span the full 900px+ canvas
- Always set `leading-relaxed` or `leading-loose` for student-facing reading content

---

## 6. TOUCH TARGETS — TABLET STANDARDS

Tablet users use fingers, not a mouse. Tap targets are larger than desktop but can be slightly smaller than mobile because precision is higher on a larger screen.

| Element | Minimum tap area |
|---|---|
| Button | 48px height, min 140px wide |
| Icon button | 44px × 44px |
| Sidebar nav item | 48px height, full sidebar width |
| List item / card | 64px minimum height |
| Form input | 48px height |
| Checkbox / toggle | 44px × 44px tap area |
| Tab item | 48px height × equal width shares |

**All interactive elements must have `active:` states** — hover alone is not sufficient. Students tap, they do not hover.

```tsx
// Correct — tablet button
<button className="h-12 px-8 rounded-2xl bg-red-600 text-white text-sm font-semibold active:scale-95 transition-transform duration-100">
  Submit Assignment
</button>
```

---

## 7. LAYOUT — TABLET GRID SYSTEM

**The content area on tablet is the space to the right of the sidebar.** All layout below is calculated within that space.

### Content Area Widths (approximate):
- Tablet Small with collapsed sidebar: ~704px content
- Tablet Large with expanded sidebar: ~780px content (900px - 220px sidebar)
- iPad Pro landscape with expanded sidebar: ~980px content

### Grid Rules:

**Stat / summary cards:** Always 2 columns on tablet small, 3–4 columns on tablet large:
```tsx
<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
```

**Content cards (students, assignments, reports):** 2 columns on tablet:
```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

**Split panel layout (list + detail):** Use on tablet for master-detail patterns:
```tsx
// Left panel: list. Right panel: selected item detail.
<div className="hidden md:grid md:grid-cols-[280px_1fr] h-full">
  <aside className="border-r border-gray-100 overflow-y-auto">
    {/* List of students, assignments, messages */}
  </aside>
  <section className="overflow-y-auto p-6">
    {/* Selected item detail */}
  </section>
</div>
```
This pattern is used for: Messaging, Assignment submissions, Student profiles, Document library.

**Full-width single column** for: Forms, quiz/assessment taking, QR scanner, report card review. These are focused tasks — no distractions.

**Page padding:** `px-6 py-6` on tablet. More breathing room than mobile's `px-4`.

---

## 8. STUDENT TABLET EXPERIENCE — DETAILED SPEC

The student tablet experience is the most critical in the entire system. Students use tablets in class, at their desks, in portrait and landscape. Every flow must be frictionless.

### Student Home Screen (Tablet):

**Layout: 2-column grid**
- Left column (60% width): Today's schedule timeline — periods 1–8 with subject, teacher, room. Current period highlighted in navy with red left border. Countdown to next period.
- Right column (40% width): Stack of: Upcoming assignments (3 most urgent), Recent grade received, Merit points tally with progress bar toward next reward, Quick scan button

**The Quick Scan button:** Always visible on student home. Red, rounded, with a QR icon. `h-14 w-full rounded-2xl` — cannot be missed.

### Student Assignment Portal (Tablet):

**Layout: Split panel (master-detail)**
- Left panel (280px): List of assignments sorted by urgency. Each item: subject colour dot + assignment name + due date + status badge. Tappable rows — selected row highlighted.
- Right panel: Selected assignment detail — full instructions, question list, submit area.

**Assignment taking experience:**
- Questions displayed one at a time with a progress bar at top: "Question 3 of 8"
- Large, readable question text: 17px, line-height 1.8
- Multiple choice options: full-width tappable rows, `h-14`, with radio indicator on left. Selected = navy background + white text.
- Short answer: `<textarea>` that expands as student types. `min-h-[120px]`.
- Essay: Rich text area with basic formatting (bold, italic, bullet list). `min-h-[240px]`.
- File/photo upload: Large dashed upload zone `min-h-[160px]` with icon and "Tap to upload or take photo" text. Supports camera access directly.
- Navigation: "Previous" (ghost button left) and "Next" / "Submit" (red filled button right) at bottom. Always visible — do not hide behind scroll.
- Auto-save indicator: "Saved just now" in grey at top right, updates every 30 seconds.

### Student Grades View (Tablet):

**Layout: 2-column**
- Left: Subject list with overall grade badge per subject (colour coded: green/amber/red) and citizenship badge
- Right: Selected subject breakdown — each assessment listed with score, date, teacher comment, MYP band if applicable

**Grade cards:** Each subject is a card with:
- Subject name (16px, 600 weight)
- Circular progress indicator showing percentage (SVG, navy fill, red stroke progress)
- Letter grade large (32px) in centre of circle
- Citizenship badge below: C+ green · N amber · F red
- Trend arrow: ↑ green if improving, ↓ red if declining, → grey if stable

### Student QR Scanner (Tablet):

**Portrait mode:**
- Camera viewfinder: square, centred, 70% of screen width
- Navy corner bracket overlay on viewfinder
- "Point at the classroom QR" instruction above
- Student's own QR code shown below viewfinder (so teacher can scan them if needed)
- Torch toggle top right

**Landscape mode (tablet mounted at door):**
- Camera viewfinder left half of screen
- Right half: live list of students who have scanned in, updating in real time
- This is the "kiosk mode" — tablet is mounted, students walk past and scan
- Teacher can see who has and hasn't arrived from across the room

### Student Profile (Tablet):

**Layout: 3-column grid at top, full-width sections below**
- Top: Avatar (80px) + name + class + LNS ID + QR code (tappable to expand full screen)
- Stats row: Attendance %, Current average grade, Merits earned, Citizenship status
- Tabs below: Grades · Assignments · Attendance Calendar · Documents · Badges

**Attendance calendar:** Full monthly grid view. Each day colour coded: green = present, amber = late, red = absent, white = no school. Tablet has room to show the full calendar without compression.

---

## 9. IMAGES & MEDIA — TABLET

- Student avatars: `w-12 h-12` in lists, `w-20 h-20` in profile headers, `w-32 h-32` on full profile page
- All images: `object-cover` with explicit aspect ratios. Use `aspect-square` for avatars, `aspect-video` for banners.
- Assignment photo uploads: preview in a `grid grid-cols-3 gap-2` thumbnail grid after upload. Tap to expand full screen.
- Document previews: PDF thumbnail + filename + size. Tap to open full-screen reader.
- QR codes: minimum `200px × 200px` for scanning reliability. Student identity QR on profile: `280px × 280px`.
- Never let images stretch beyond their container. Always `max-w-full`.

---

## 10. FORMS & INPUTS — TABLET

```tsx
// Tablet input — slightly taller than mobile
<input
  className="w-full h-12 px-5 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
/>

// Labels: always above, 13px, medium weight
<label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
  Student Name
</label>
```

**Tablet form layouts:**
- Short forms (≤5 fields): single column, full content width
- Medium forms (6–10 fields): 2-column grid `grid grid-cols-2 gap-4`
- Long forms (onboarding, enrollment): multi-step with progress indicator. 2–3 steps shown in progress bar at top.
- Never a form that requires more than 2 scrolls to complete on tablet — break it into steps.

**Keyboard behaviour on tablet:**
- When a keyboard appears, the focused input must scroll into view — never hidden behind the keyboard
- Use `ScrollView` equivalent patterns — ensure the form container scrolls independently
- `inputMode` is still required on tablet: `email`, `numeric`, `search`, `tel`

---

## 11. TABLES — TABLET

Unlike mobile where tables become card lists, tablets can support data tables — but they must still be built carefully.

**Rules:**
- Tables are allowed on tablet but must have `table-layout: fixed` and defined column widths
- Maximum 6–7 columns on tablet before horizontal scroll is required
- Row height: minimum `52px` — generous tap area for selecting rows
- Sortable column headers: `h-10` header row, sort icon appears on hover/tap
- Selected row: navy-tinted background `bg-navy-50`
- Horizontal scroll wrapper when columns exceed viewport:
```tsx
<div className="overflow-x-auto rounded-2xl border border-gray-100">
  <table className="min-w-[640px] w-full">
```
- Sticky first column (student name / item name) when table scrolls horizontally:
```tsx
<td className="sticky left-0 bg-white z-10 font-medium">
```
- On Tablet Small (768–899px): if a table has 7+ columns, revert to card list view. Only Tablet Large gets the full table.

---

## 12. SPLIT PANEL PATTERNS

Tablets enable the most powerful UX pattern in LNS OS: the split panel (master-detail). Use it on these pages:

| Page | Left Panel | Right Panel |
|---|---|---|
| Messaging | Conversation list | Active conversation thread |
| Assignments | Assignment list | Assignment detail + submission |
| Students (Teacher) | Student list | Student profile + grades |
| Documents | Folder tree | File browser |
| Gradebook | Student list | Grade entry grid for selected student |
| Behaviour log | Incident list | Incident detail + actions |
| Support | Topic list | Article content |

**Split panel rules:**
- Left panel: fixed width `w-64` or `w-72`. Scrolls independently. Has its own search/filter.
- Right panel: `flex-1`. Scrolls independently. Shows empty state with illustration when nothing is selected.
- Divider: `border-r border-gray-100` — subtle, not a heavy line
- Selected item in left panel: full-width highlight row in `bg-navy-50` with red left border
- On tablet small (768px), the split panel may collapse: tap item in list → right panel takes full width → back button returns to list

---

## 13. CARDS — TABLET SPEC

Cards are the primary content container on tablet. Every card must feel intentional, not like a div with a border.

**Standard content card:**
```tsx
<div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
```

**Stat card (metric summary):**
```tsx
<div className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-2">
  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Power Score</span>
  <span className="text-3xl font-bold text-navy-900">94%</span>
  <span className="text-xs text-green-600 font-medium">↑ 3% this week</span>
</div>
```

**Student grade card:**
```tsx
<div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
  <CircularProgress percentage={82} size={64} />
  <div>
    <p className="font-semibold text-navy-900">Mathematics</p>
    <p className="text-sm text-gray-500">Mr. Johnson</p>
    <CitizenshipBadge status="C+" />
  </div>
  <div className="ml-auto text-right">
    <p className="text-2xl font-bold text-navy-900">B+</p>
    <p className="text-xs text-gray-400">82%</p>
  </div>
</div>
```

**Card rules:**
- `rounded-2xl` (16px) on all cards — consistent across tablet
- `shadow-sm` base, `shadow-md` on hover — subtle depth, not heavy
- `p-5` (20px) internal padding — more breathing room than mobile's `p-4`
- Cards in a grid must be equal height: use `h-full` on the card within a grid item
- Never nest cards (card inside card) — use sections within a single card instead
- Empty card state: illustration (60px) centred + heading + subtext + CTA button

---

## 14. ANIMATIONS & TRANSITIONS — TABLET

Tablets have powerful GPUs. Animations can be richer than mobile but must still be purposeful.

**Allowed animations:**
- Page transitions: `opacity` fade + slight `translateY(8px)` slide up — 200ms ease-out
- Sidebar expand/collapse: `width` transition 200ms ease — `w-16` to `w-56`
- Card hover: `shadow-sm` to `shadow-md` — 150ms
- Split panel right panel load: `opacity` 0→1, 180ms
- QR scan success: full-screen green flash 200ms + scale confirmation card slides up
- Button press: `scale(0.97)` on `active:` — 100ms
- Skeleton to content: `opacity` fade 200ms

**Banned animations:**
- Anything that animates `width`, `height`, `top`, `left`, or `margin` — causes layout reflow
- Infinite animations on non-interactive elements (no spinning logos, no pulsing borders)
- Animations longer than 400ms (feels slow on a task-focused device)
- Animations that repeat unless dismissed by the user

**Respect `prefers-reduced-motion`:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 15. ORIENTATION — PORTRAIT vs LANDSCAPE

Every tablet view must be explicitly designed for both orientations. This is not optional.

### Portrait (primary):
- Sidebar collapsed on small tablet, expanded on large
- Single or 2-column content grid
- QR scanner: centred viewfinder with controls above/below

### Landscape (secondary but important):
- Sidebar always expanded in landscape (more horizontal space)
- Content grid can go to 3 columns
- Split panel fully utilised — both panels visible simultaneously
- QR kiosk mode: landscape is the default (tablet mounted horizontally at door)
- Assignment taking: question left, answer right — side-by-side on large tablet in landscape

**Detect and adapt:**
```tsx
// Hook to detect orientation
const useOrientation = () => {
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  )
  useEffect(() => {
    const handler = () => setIsLandscape(window.innerWidth > window.innerHeight)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isLandscape
}
```

---

## 16. PWA — TABLET SPECIFIC

**Manifest additions for tablet:**
```json
{
  "display": "standalone",
  "orientation": "any",
  "theme_color": "#0A1F44",
  "background_color": "#0A1F44"
}
```

**Note:** `"orientation": "any"` (not `"portrait"`) — tablets must support both.

**Installed tablet app behaviour:**
- No browser chrome — full standalone app appearance
- Status bar: Navy `#0A1F44`
- Splash screen: Navy background, LNS OS logo centred at 120px, white wordmark below
- iPad multitasking: support Split View and Slide Over on iPad — use `min-width` constraints, never `max-width` that breaks at unusual widths
- Stage Manager (iPad Pro): the app must remain usable at arbitrary window sizes — test at 400px, 600px, 800px, 1000px widths
- Android tablet split screen: same — must reflow gracefully at any width

**Offline (tablet-specific):**
- Offline banner: top of content area, amber, same as mobile
- Cached pages: Dashboard, Grades, Timetable, Documents (already downloaded)
- Offline assignment taking: student answers are saved locally in service worker, submitted when back online. Show "Offline — your work is saved" indicator in assignment header.
- Teacher offline: attendance can be taken offline. Register is queued and synced when reconnected.

---

## 17. KIOSK MODE — QR ATTENDANCE AT CLASSROOM DOOR

This is a unique tablet-specific feature. A tablet is mounted at the classroom door. Students tap it or scan as they enter. Teachers can also have it at their desk.

**Kiosk mode activates when:**
- Teacher taps "Start Kiosk Mode" from the QR Scanner page
- Or admin enables kiosk mode for a specific device from the admin console

**Kiosk mode UI:**
```
┌─────────────────────────────────────────────────────────┐
│  [LNS OS logo]                    [Period 3 — Maths]    │
│                                   [09:15 – 10:00]       │
│                                                         │
│    ┌─────────────────────┐    ┌──────────────────────┐  │
│    │                     │    │  PRESENT (14)        │  │
│    │   [QR VIEWFINDER]   │    │  ✓ Amara Johnson     │  │
│    │                     │    │  ✓ Blake Nkosi        │  │
│    │   SCAN TO ENTER     │    │  ✓ Cara Mensah        │  │
│    │                     │    │  ...                 │  │
│    └─────────────────────┘    │  NOT YET (8)         │  │
│                               │  ○ David Moyo         │  │
│    [Flash success green]      │  ○ Elena Petrov       │  │
│    [Name + subject confirm]   │  ...                 │  │
│                               └──────────────────────┘  │
│                                                         │
│    [Exit Kiosk Mode — requires PIN]                     │
└─────────────────────────────────────────────────────────┘
```

**Kiosk mode rules:**
- Landscape orientation locked
- Screen stays on (wake lock API: `navigator.wakeLock.request('screen')`)
- No access to other parts of the app without PIN entry
- Auto-resets viewfinder after each successful scan (1 second delay)
- Sound on successful scan: a short, pleasant chime
- Sound on failed scan: a short, neutral beep
- Successful scan: student name flashes large on screen for 1.5 seconds
- After all students have scanned: gentle notification "All students present"
- Timestamps every scan for the blockchain attendance record

---

## 18. ACCESSIBILITY — TABLET MINIMUM

- Contrast ratio: minimum 4.5:1 for normal text, 3:1 for large text (18px+ or 14px bold)
- Touch targets: all interactive elements minimum 44px × 44px
- Focus rings: visible on all focusable elements — tablets with keyboard covers need this
- `aria-label` on all icon-only buttons
- Screen reader support: test with VoiceOver (iPad) and TalkBack (Android)
- Dynamic text sizing: respect system font size settings — use `rem` not `px` for text
- `prefers-reduced-motion`: all animations must be disabled when user has this set
- Colour must not be the only way information is conveyed — pair colour with icon or label

---

## 19. PERFORMANCE — TABLET

Tablets are more powerful than phones but school-issued tablets may be older models on slow WiFi.

- All images: `next/image` with appropriate `sizes` — `sizes="(max-width: 1199px) 50vw, 33vw"` for 2-col/3-col grids
- Code splitting: each major section (Gradebook, Assignments, AI Insights) must be a dynamic import
- Virtualised lists: any list over 50 items must use `react-virtual` or `react-window` — never render 200 student rows into the DOM
- Chart libraries: load Chart.js / Recharts only on pages that use them — dynamic import with loading skeleton
- Service worker: pre-cache the student home, grades, and timetable pages on first load
- Fonts: preload the two primary fonts. `font-display: swap` on all custom fonts.
- No layout shift: all cards and skeletons must have defined dimensions before data loads — no content jump

---

## 20. TESTING CHECKLIST — BEFORE ANY TABLET PR IS MERGED

Every pull request that touches a UI component must pass this checklist:

```
PORTRAIT ORIENTATION:
[ ] Tested at 768px width (iPad Mini portrait / small Android tablet)
[ ] Tested at 820px width (iPad Air portrait)
[ ] Tested at 1024px width (iPad Pro 11" portrait)
[ ] Sidebar visible and functional (collapsed at 768px, expanded at 900px+)
[ ] No bottom tab bar visible on tablet
[ ] All content fits within content area — no overflow
[ ] Split panel layout works (list + detail side by side)

LANDSCAPE ORIENTATION:
[ ] Tested at 1024px width (iPad Mini landscape)
[ ] Tested at 1180px width (iPad Air landscape)
[ ] Tested at 1366px width (iPad Pro landscape)
[ ] Sidebar expanded in landscape
[ ] Content grid expands correctly (2-col → 3-col)
[ ] Kiosk/QR mode works in landscape

INTERACTION:
[ ] All touch targets are minimum 44px
[ ] No hover-only states (active: states present on all interactive elements)
[ ] Tables have sticky first column and horizontal scroll wrapper if >6 cols
[ ] Forms scroll correctly when keyboard appears
[ ] Animations respect prefers-reduced-motion

STUDENT-SPECIFIC:
[ ] Assignment taking flow tested end-to-end on tablet
[ ] QR scanner works in both portrait and landscape
[ ] Grade cards render correctly at all tablet widths
[ ] Student home split layout correct (schedule + sidebar panel)

PWA:
[ ] App installs correctly on iPad (Add to Home Screen)
[ ] Offline mode shows correct banner and cached content
[ ] Kiosk mode activates and wake lock works
[ ] Orientation lock works in kiosk mode

ACCESSIBILITY:
[ ] Contrast ratios pass 4.5:1 for all text
[ ] VoiceOver (iPad) tested on key flows: login, attendance scan, grade view
[ ] Focus rings visible in keyboard navigation mode
```

**Test on real devices.** Browser DevTools tablet emulation does not replicate:
- Apple Pencil interactions
- True touch event behaviour
- Safe area insets on iPad
- Real GPU performance with animations
- iPad Stage Manager multi-window behaviour
- Android split-screen reflow

Minimum real device test: iPad Air or iPad Mini (iOS) + one Android tablet before any tablet UI is merged.

---

## 21. WHAT IS BANNED — ZERO TOLERANCE ON TABLET

| Banned pattern | Why |
|---|---|
| Bottom tab bar visible on tablet | Sidebar is the tablet nav — never both |
| `grid-cols-1` as the only grid on tablet | Wastes the canvas — use 2-col minimum |
| Desktop sidebar (full 280px+) on tablet without collapse option | Too wide, eats content area |
| Fixed pixel widths on content containers | Breaks at unexpected tablet widths (especially Stage Manager) |
| Portrait-only design (no landscape support) | Tablet kiosk use requires landscape |
| Hover-only states without active: equivalent | Students tap — hover does not exist |
| Tables without overflow wrapper or sticky columns | Overflows and clips |
| `window.alert()` or `window.confirm()` | Unstyled, looks wrong in PWA standalone mode |
| Animations on `width`, `height`, `top`, `left` | Causes jank on older school tablets |
| Long scrolling forms (10+ fields, no steps) | Students lose context and abandon |
| Unvirtualised lists over 50 items | Crashes older iPads |
| Images without `alt` text | Accessibility failure |
| Hardcoded colours outside the design token system | Breaks dark mode / theme consistency |
| `position: fixed` modals without proper `min-height` container | Collapses in PWA standalone mode |
| Kiosk mode without PIN to exit | Security risk — students could exit and access teacher data |

---

## 22. COMPONENT FILE NAMING CONVENTION

```
components/
  tablet/
    Sidebar.tsx                  — Collapsible left sidebar, role-aware
    SplitPanel.tsx               — Master-detail layout container
    KioskMode.tsx                — Full-screen QR kiosk for door mounting
    GradeCard.tablet.tsx         — Circular progress grade card
    AssignmentDetail.tablet.tsx  — Full assignment view with question renderer
    StudentSchedule.tablet.tsx   — Today's period timeline
    AttendanceGrid.tablet.tsx    — Monthly calendar attendance view
    DataTable.tablet.tsx         — Tablet-optimised data table with sticky col
```

Shared components in `components/ui/` must use Tailwind `md:` and `lg:` prefixes internally for tablet adaptations — they should never require a completely separate tablet version unless the layout fundamentally differs (as with navigation and split panels).

---

## 23. THE STANDARD WE ARE BUILDING TOWARD

Open LNS OS on an iPad in a classroom and it must feel indistinguishable from a native iPadOS educational app. The reference bar:

- **Google Classroom on iPad** — clean split panel, works in both orientations, assignments feel like a focused task
- **Duolingo on iPad** — engaging, rewards visible, clear progress, never feels like a website
- **Notability on iPad** — smooth, fast, no jank, orientation change is instant
- **Khan Academy on iPad** — student-friendly, clear hierarchy, nothing is hidden

If any screen in LNS OS feels like "a website that happens to be open on a tablet" — it is not done. Every screen must feel purpose-built for the iPad/tablet form factor.

That is the bar. Build to it.

---

**Last updated:** April 2026
**Owner:** LNS OS Development Team
**Applies to:** All tablet UI development (768px – 1199px breakpoint range)
**Companion document:** MOBILE_DESIGN_SYSTEM.md (for 320px–767px)
