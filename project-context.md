Here is the complete updated plan, payoff line, and full developer brief — ready to hand to your team.

---

## Updated Module Additions

**Module 12 — QR Code Attendance**
Students scan their unique QR code at the classroom door. The system instantly marks them present with a timestamp. Late arrivals flagged automatically. QR codes are generated per student, printable and digital. Teachers see live register updating in real time as students scan in.

**Module 13 — MYP/IB Rubric Assessment**
Assessment scores entered against MYP criteria bands (0–8). Each criterion has descriptors. Teachers select the band per criterion, system calculates total and converts to grade boundary. Supports multiple subjects with different criteria sets. Rubric visible to student and parent after release.

**Module 14 — Document Storage**
Secure cloud storage per student, teacher, and admin. Students upload assignment files, photos, IEP documents. Teachers store lesson resources, reports, meeting notes. Admin stores school policies, contracts. Folder structure per student, per subject, per term. Storage quota visible per user.

**Module 15 — Support, Help & Legal**
In-app support centre with video tutorials, written guides, and FAQs per user role. Live chat support widget. Privacy Policy, Terms & Conditions, Data Rights & Use Policy — all accessible from footer and onboarding. Cookie consent on first login. GDPR and COPPA compliant (minors' data protection).

**Module 16 — Blockchain Security Layer**
Every critical record (attendance, grade submitted, report card generated, document uploaded) is hashed and written to a blockchain ledger. This creates an immutable, tamper-proof audit trail. Each stakeholder can verify their own record. No one — not even admins — can alter a record without it being logged. Smart contracts govern data access permissions per role.

**Module 17 — Data Analytics Dashboard**
School-wide and class-level analytics. Attendance trends over time, grade distributions, at-risk cohort size, subject performance heatmaps, citizenship breakdown, merit/behaviour correlation charts. Admin gets macro view. Teacher gets class view. All charts exportable. AI narrates key insights in plain English.

---

## Payoff Line

> **"The Operating System for Modern Learning."**

---
---

# DEVELOPER BRIEF — LNS OS
## Full UI Build — First Release

---

### Product Identity

**Product Name:** LNS OS
**Tagline:** The Operating System for Modern Learning
**Logo:** Text-based wordmark — `LNS OS` in a bold, geometric sans-serif. Clean, authoritative.
**Color Palette:**
- Primary: Navy Blue `#0A1F44`
- Accent: Red `#D62B2B`
- Base: White `#FFFFFF`
- Supporting neutrals: Light Grey `#F4F5F7`, Mid Grey `#8C92A0`, Dark Grey `#2E3A4E`

**Typography:**
- Headings: `Manrope` or `DM Sans` — bold, clean, modern
- Body: `Inter` or `Nunito` — readable at small sizes
- Mono (data/codes): `JetBrains Mono`

---

### Technical Architecture Requirements

**Framework:** React (Next.js preferred for SSR + routing)
**Styling:** Tailwind CSS + custom design tokens
**PWA:** Full Progressive Web App — installable on mobile, works offline with sync queue
**Responsiveness:** Mobile-first. Three breakpoints:
- Mobile (`< 768px`): App layout, bottom navigation bar, full-screen panels
- Tablet (`768px–1199px`): Widened card layout, collapsible sidebar
- Desktop (`≥ 1200px`): Full sidebar, multi-column dashboard, expanded tables

**State Management:** Zustand or Redux Toolkit
**Backend:** Node.js / Express or Supabase (BaaS)
**Database:** PostgreSQL (relational data) + Redis (caching/sessions)
**File Storage:** AWS S3 or Supabase Storage (documents, photos, QR assets)
**Authentication:** JWT + refresh tokens. Role-based access control (RBAC) — 4 roles: Teacher, Student, Parent, Admin
**Blockchain Layer:** Ethereum-compatible (or Polygon for low gas fees). Every write event (grade saved, attendance marked, report generated) triggers a hash logged to chain. Audit log visible per user in their Settings > Data Trail page.
**AI Integration:** Anthropic Claude API (`claude-sonnet-4-20250514`) — used across report card generation, at-risk flagging, intervention suggestions, class trend analysis, and the teacher chat interface
**QR System:** QR codes generated server-side per student UUID. Scanner built into the teacher/admin view using device camera (via `jsQR` or `react-qr-reader`). QR printable as PDF.
**Multilingual:** `i18next` for parent-facing content. AI translation layer for auto-translating teacher messages before delivery to parent.
**Encryption:** AES-256 for data at rest. TLS 1.3 in transit. Zero-knowledge approach for sensitive student records.
**Push Notifications:** Web Push API (PWA-native) for assignment reminders, alerts, messages.
**Realtime:** Supabase Realtime or Socket.io — live QR attendance register, live messaging.
**Offline Sync:** Service worker queues attendance and score entries when offline. Syncs on reconnect.
**Exports:** `jsPDF` for PDF generation. `SheetJS` for Excel/CSV exports. Print stylesheets for attendance sheets.

---

### Pages to Build — Full List

Build all pages as shells with correct layout, navigation, placeholder components, and routing on the first delivery. No dummy lorem ipsum — use realistic placeholder data.

---

#### AUTH PAGES

**1. Landing / Login Page**
- LNS OS logo centred, tagline below
- Two login options: Email + Password, or Scan QR Code (camera opens)
- Role auto-detected on login (Teacher / Student / Parent / Admin)
- "Forgot password" link. "First time? Contact your school admin" message
- Footer: Privacy Policy · Terms & Conditions · Data Rights · Support
- Language selector (top right)

**2. Onboarding — First Login**
- Welcome screen per role with short explainer of what they can do
- Profile setup: name, photo, notification preferences
- Accept Privacy Policy + Terms & Conditions (required before proceeding)
- Cookie consent banner

---

#### TEACHER VIEWS

**3. Teacher Dashboard**
- Top bar: school name, teacher name, avatar, notification bell, settings
- Left sidebar navigation (collapsible on tablet, bottom nav on mobile): Dashboard · Attendance · Gradebook · Assignments · Assessments · Students · Messaging · Behaviour · Timetable · Reports · AI Insights · Support
- Summary cards row: Today's Power Score · Classes Today · Unmarked Work · At-Risk Students
- Quick action buttons: Take Attendance · Create Assignment · Message Parent · Generate Report Card
- At-risk student alerts panel (AI-generated, dismissible)
- Upcoming due dates panel
- Recent activity feed (last 10 actions)
- Class performance chart (bar — avg grade per subject)
- Attendance trend line chart (last 30 days)

**4. Attendance Register**
- Date picker (defaults to today)
- Class selector (if teacher has multiple classes)
- Live register table: Student name · Avatar · QR status (auto-marked if scanned) · Manual override (P / A / L) · Engagement level (L1 / L2 / L3 / L4) · Comment field
- Power Score live counter (top right of table, updates as register fills)
- "Mark all Present" bulk button
- Save & lock register button (once locked, creates blockchain hash, shows confirmation)
- Export this register (PDF print view)

**5. QR Attendance Scanner**
- Full-screen camera view for teacher to display or scan
- Two modes: "Student Self-Scan" (tablet mounted at door, students scan their own QR) and "Teacher Scan" (teacher scans student QR cards)
- Each successful scan: student name flashes on screen, register updates in realtime
- Unscanned students shown in sidebar list
- Timer showing how long register has been open
- Close & save button

**6. Gradebook**
- Student list on left, subjects/assessments across top
- Weighted category headers (Communications 20%, Maths 25%, etc.) — weights editable, must always total 100%, live validation warning if not
- Score cells: click to enter score, tab to next
- Each cell shows: raw score / max score
- Final grade column (rightmost): Percentage · Letter · Citizenship all shown
- Colour coding: green (≥75%) · amber (50–74%) · red (<50%)
- Filter: by subject, by student, by citizenship status
- Export to Excel/CSV button
- "Release grades to students/parents" toggle per assessment

**7. Assignment Manager**
- List of all assignments with: name · subject category · due date · submission count · marked count · status badge (Draft / Active / Closed)
- Create Assignment button → modal with: Title · Subject category · Description · Due date · Question builder (see below) · Attach files · Assign to class(es) · Release date for grades
- Question builder: Add question → choose type (Multiple choice / True-False / Short answer / Essay / File upload / Photo upload). Drag to reorder. Mark allocation per question. MYP rubric toggle (switches to criteria band entry)
- Per assignment: view all submissions → student list → click student → their answers displayed inline → teacher adds mark + comment per question → submit marks → optionally release
- Bulk mark release button
- Assignment reminder: set auto-reminder (24hr before due,
1hr before due)

**8. MYP / IB Rubric Assessment Page**
- Select assessment → choose MYP criteria (A: Knowing & Understanding, B: Investigating Patterns, C: Communicating, D: Applying Mathematics — or subject-specific set)
- Per student: enter band (0–8) per criterion with descriptor shown on hover
- System calculates total and maps to MYP grade boundary (1–7)
- Displays alongside percentage and citizenship grade
- Criterion breakdown chart per student
- Class average per criterion shown at bottom of each column

**9. Student Profiles**
- Student list with search, filter by class, citizenship, at-risk status
- Each student card: photo/initials · name · class · citizenship badge · power score · final grade · quick actions (Message Parent / View Profile / Log Behaviour)
- Student profile page: bio info · all grades by subject · attendance calendar (colour-coded) · citizenship history · behaviour log · merit tally · IEP flag · documents · AI-generated summary · full blockchain audit trail of their data

**10. Enroll New Student**
- Form: Full name · Date of birth · Grade/class · Guardian name · Guardian contact · Guardian language preference · Upload student photo · Special needs flag (Y/N) → if Y, IEP fields appear · Generate QR code on save · Print QR card button

**11. Teacher Messaging**
- Inbox layout (similar to email)
- Compose: To (search student or parent) · Subject · Body · Attach file · Language auto-detected for parent, AI translates before sending
- Automated alerts log: all auto-sent absence/grade/merit notifications shown here
- Announcement composer → sends to whole class or school (admin only)
- Unread badge on sidebar nav item

**12. Behaviour & Wellbeing**
- Behaviour log: table of incidents — date · student · type (Positive / Concern / Incident) · description · teacher · action taken · parent notified
- Log new entry button
- Merit & Rewards: award merits to student → shows on student profile and parent portal. House points tracker if school uses house system. Badge system with visual icons.
- Intervention tracker: create support plan per student → linked to student profile → track meetings, outcomes, next review date
- IEP / Special Needs: per student section → upload documents, record accommodations, review dates, linked staff

**13. Timetable**
- Weekly grid view (Mon–Fri, period rows)
- Teacher's own timetable shown first
- Admin can build and assign timetables from admin panel
- Substitute flagging: mark teacher absent → system flags classes → admin assigns sub
- School calendar tab: term dates, holidays, assessment windows, events — colour coded

**14. Reports & Exports**
- Report Card Generator: select student(s) · select term · AI drafts comments per subject per student based on grade + attendance + behaviour data · teacher reviews and edits · approve and generate PDF · send to parent portal or download
- Attendance Report: by class, by student, by date range → PDF or CSV
- Gradebook Export: full class or per student → Excel/CSV
- Behaviour Report: by student or class → PDF
- Analytics export: charts as PNG/PDF

**15. AI Insights Panel**
- At-risk dashboard: list of flagged students with reason (grade trend / attendance / behaviour / combined) and suggested action
- Class trend analysis: subject-by-subject AI narrative + charts
- Attendance prediction: projected attendance rate for next 2 weeks per student
- Chat interface: teacher types a question in plain English (e.g. "Which students are struggling most in Maths this term?") → AI responds with data-grounded answer
- Report card comment generator (accessible here and from Reports page)
- Intervention suggestions: per at-risk student, AI lists 3 specific evidence-based strategies

**16. Data Analytics Dashboard**
- School-wide: Power Score trend · Grade distribution (bell curve) · Subject performance heatmap · Citizenship breakdown (pie) · Merit vs behaviour correlation scatter · At-risk cohort size over time
- Class-level: all above filtered to teacher's class
- All charts interactive (hover for detail, click to drill down to student level)
- Date range picker, class filter, subject filter
- AI narration panel: plain English summary of what the data shows this week

---

#### STUDENT VIEWS

**17. Student Dashboard**
- Bottom nav on mobile: Home · Assignments · Grades · Messages · Profile
- Summary: Today's classes · Assignments due · Recent grades · Merits earned
- Upcoming due dates timeline
- Notification feed

**18. Student Assignment Portal**
- List of active assignments with due date countdown
- Click assignment → instructions · questions displayed one at a time or scrollable · answer each question inline · upload photos/files per question · essay typed in rich text field · submit button (confirmation modal)
- View submitted work + teacher feedback after grades released
- Quiz mode: multiple choice and true/false with immediate feedback if teacher enabled auto-mark

**19. Student Grades View**
- Subject list → click subject → breakdown by assessment
- Each assessment: raw score · percentage · letter · MYP band (if applicable) · teacher comment (if released)
- Overall grade: all three formats displayed per subject
- Citizenship status badge

**20. Student Attendance View**
- Calendar showing P / A / L per day (colour coded)
- Power score (their own)
- QR code displayed: large, scannable, with student name and ID below

**21. Student Profile & Documents**
- Personal info, photo
- Upload documents (homework, files)
- Document storage folder view

---

#### PARENT VIEWS

**22. Parent Dashboard**
- Child selector (if multiple children at school)
- Child's power score, latest grades, citizenship, merits, upcoming assignments
- Alert panel: unread automated notifications
- Quick link: Message Teacher

**23. Parent Messaging**
- Receive and reply to teacher messages
- All messages auto-displayed in parent's preferred language
- Notification badge

**24. Parent Grades & Attendance View**
- Same as student view but read-only. Grades visible only after teacher releases them.
- Behaviour log visible (parent-appropriate view — no admin-only notes)
- Download report card (when published)

---

#### ADMIN VIEWS

**25. Admin Dashboard**
- School-wide Power Score, total enrollment, active teachers, at-risk student count
- Quick actions: Enroll Student · Add Teacher · Post Announcement · View Reports
- Alerts: teacher absences today, unresolved incidents, system issues

**26. User Management**
- All users table: Teachers · Students · Parents — searchable, filterable by role/class/status
- Add / Edit / Deactivate users
- Assign teachers to classes, assign parents to students
- Bulk import via CSV (with template download)
- Role and permission management

**27. School Settings**
- School name, logo, term dates, grading system configuration
- Subject categories and default weights
- Citizenship scale labels
- Notification triggers and thresholds (e.g. alert parent when grade < 50%)
- QR code bulk generation and print for all students
- MYP/IB rubric configuration per subject

**28. Blockchain Audit Trail (Admin)**
- Full ledger of all hashed records: timestamp · event type · user · hash
- Each record has a "Verify" button — confirms hash matches chain
- Filter by student, teacher, date range, event type
- Export audit log as PDF

**29. Announcement Board**
- Compose and publish school-wide announcements
- Target: all users / teachers only / students only / parents only
- Scheduled publishing option
- Archive of past announcements

---

#### SYSTEM PAGES

**30. Document Storage (All Roles)**
- File browser UI (folder tree): My Documents · Shared with Me · Class Resources (teacher-uploaded) · School Documents
- Upload button (drag and drop + file picker)
- Preview in-browser for images and PDFs
- Download, rename, delete (own files only)
- Storage usage bar per user
- All uploads scanned and hashed to blockchain on save

**31. Support & Help Centre**
- Role-detected: shows relevant guides per user type
- Sections: Getting Started · Attendance · Gradebook · Assignments · QR Setup · AI Tools · Troubleshooting
- Each article: written guide + embedded video tutorial
- Search bar
- Live chat widget (bottom right)
- "Submit a ticket" form for technical issues
- Status page link (system uptime)

**32. Settings (All Roles)**
- Profile: name, photo, password change, language preference, notification preferences
- Privacy: view what data is stored about you, download your data, request deletion
- Data Trail: personal blockchain audit log — every record that references this user
- Connected devices (active sessions)
- Two-factor authentication setup
- For teachers: class and timetable preferences, grade release defaults

**33. Legal Pages (Footer-linked, always accessible)**
- Privacy Policy
- Terms & Conditions
- Data Rights & Use Policy (plain English + formal version)
- Cookie Policy
- GDPR / COPPA compliance statement
- Contact: Data Protection Officer email

**34. 404 / Error Page**
- On-brand. Friendly message. Link back to dashboard.

---

### Navigation Structure Summary

**Sidebar (Teacher/Admin — Desktop)**
Dashboard · Attendance · QR Scanner · Gradebook · Assignments · Assessments · Students · Behaviour · Timetable · Reports · AI Insights · Analytics · Messaging · Documents · Support · Settings

**Bottom Nav (Mobile — all roles)**
Home · Work (Assignments/Gradebook) · Scan/QR · Messages · Profile

**Top Bar (all views)**
School logo left · Page title centre · Notifications · Language selector · Avatar/menu right

---

### Design & UX Rules for Developers

- Navy `#0A1F44` is the primary background for sidebar and top bar. All sidebar text and icons are white.
- Red `#D62B2B` is used for: accent buttons (primary CTA), alert badges, at-risk indicators, active nav item highlight, logo accent.
- White `#FFFFFF` is the main content area background.
- Cards use Light Grey `#F4F5F7` background,
1px border `#E0E3EA`,
12px border radius.
- No gradients. No drop shadows heavier than `0 2px 8px rgba(0,
0,
0,
0.06)`.
- All data tables must be horizontally scrollable on mobile, not broken.
- All forms use floating labels. Validation inline, not alert popups.
- Every destructive action (delete, lock, submit) requires a confirmation modal.
- Blockchain confirmation toasts: green checkmark + hash snippet shown for 4 seconds after any locked action.
- Empty states: every page that can have no data must have a friendly illustration and a clear call-to-action.
- Loading states: skeleton screens (not spinners) for all data-loading pages.
- PWA install prompt: appears after 3rd visit if not already installed.
- Offline banner: shown at top when connection lost. Queue indicator shows how many actions are pending sync.

---

### Delivery Expectation

First delivery = **full UI shell**, all 34 pages built, fully routed, realistic placeholder data throughout, all navigation working, no broken links, responsive across all three breakpoints, PWA manifest configured, design tokens applied consistently. No placeholder lorem ipsum text — use school-realistic dummy data. Backend integration comes in phase 2.