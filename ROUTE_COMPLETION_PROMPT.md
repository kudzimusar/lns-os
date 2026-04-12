# LNS OS — Route Completion & Dead Link Remediation
## Developer Prompt v1.0 | Priority: Critical | Complete Before Any New Features

---

## 1. THE MISSION

LNS OS has a high-quality UI shell. The top-level pages (dashboards, list views, main sections)
are built and look production-ready. However, every clickable link, button, card, row, and
navigation element that opens a sub-page, detail view, or nested route must now be resolved.

**The rule is simple:**
> Every URL that a user can reach — by clicking, tapping, or typing — must open a real,
> content-filled page that looks and functions as if the platform is live and in production.
> No blank pages. No 404s. No dead buttons. No placeholder "coming soon" screens.

This task is not about adding new features. It is about completing what is already implied
by the existing UI. If a button exists, it must go somewhere real. If a route exists, it
must render real content.

---

## 2. WHAT "REAL CONTENT" MEANS

A completed page must have:

- **Correct layout** — sidebar/nav consistent with the role (teacher, student, parent, admin)
- **Realistic placeholder data** — use hardcoded but believable data (student names, grades,
  dates, subjects). No "Lorem ipsum." No "Student Name Here." No empty tables.
- **All interactive elements wired** — buttons on the detail page must work or show a
  logical next state (e.g. a "Save" button shows a success toast, a "Delete" button shows
  a confirmation modal)
- **Back navigation** — every sub-page must have a clear way back to the parent page
- **Correct breadcrumb** — show where the user is: e.g. `Students › Amara Johnson › Grades`
- **Mobile + tablet responsive** — follows MOBILE_DESIGN_SYSTEM.md and TABLET_DESIGN_SYSTEM.md
- **Consistent design** — same Navy/Red/White palette, same card styles, same typography

A completed page must NOT have:
- Empty white space where content should be
- "Under construction" or "Coming soon" messages
- Buttons that do nothing
- Tables with no rows
- Forms that submit to nowhere
- Routes that redirect back to the dashboard silently

---

## 3. HOW TO AUDIT ALL DEAD ROUTES — DO THIS FIRST

Before writing a single line of code, run this audit. Document every finding.

### Step 1 — Automated route discovery
```bash
# Find all page.tsx files — these are your defined routes
find src/app -name "page.tsx" | sort

# Find all dynamic route folders
find src/app -type d -name "\[*\]" | sort

# Find all href="#" (dead links)
grep -r 'href="#"' src/ --include="*.tsx" --include="*.ts" -l

# Find all empty onClick handlers
grep -r 'onClick={() => {}}' src/ --include="*.tsx" -l
grep -r "onClick={() => ''}" src/ --include="*.tsx" -l

# Find all TODO comments related to routing
grep -r 'TODO\|FIXME\|placeholder\|coming soon\|under construction' src/ \
  --include="*.tsx" --include="*.ts" -i -l
```

### Step 2 — Manual click audit (do this per role)
Log in as each role and click every single interactive element on every page. Document:
- URL it navigates to
- What renders at that URL
- Status: WORKING / BLANK / 404 / DEAD

Create a spreadsheet with columns:
`Role | Starting Page | Element Clicked | Target URL | Status | Priority`

### Step 3 — Prioritise by user impact
Fix in this order:
1. **Student routes** — students interact most frequently, broken routes block learning
2. **Parent routes** — parents lose trust immediately on blank pages
3. **Teacher routes** — teachers have workarounds but core flows must work
4. **Admin routes** — admin is power-user, some complexity is tolerable temporarily

---

## 4. EXPECTED ROUTES — FULL MAP

Below is the complete route map. Every route listed must exist and render real content.
Routes marked with `[id]` are dynamic — they must have `generateStaticParams()` if using
`output: 'export'`, or proper dynamic rendering if using a server.

---

### AUTH & SHARED

```
/                          → Landing / Login page (role selector + login form)
/onboarding                → Multi-step onboarding (role-detected)
/onboarding/school         → School setup wizard (admin first-time)
/onboarding/teacher        → Teacher first-login flow
/onboarding/student        → Student first-login flow
/onboarding/parent         → Parent account creation from invite link
/settings                  → Account settings (all roles, role-aware content)
/settings/security         → Password, 2FA setup
/settings/notifications    → Notification preferences
/settings/language         → Language preference
/settings/data-trail       → Personal blockchain audit log
/documents                 → Document cloud (role-aware folder structure)
/documents/[fileId]        → Individual file viewer / download
/support                   → Help centre (role-aware articles)
/support/[articleId]       → Individual help article
/support/tickets           → My support tickets list
/support/tickets/new       → Submit new ticket form
/support/tickets/[id]      → Ticket thread + replies
/legal                     → Legal centre (links to all legal pages)
/privacy                   → Privacy policy
/terms                     → Terms and conditions
/data-rights               → Data rights and use policy
/not-found                 → Custom 404 page
```

---

### TEACHER ROUTES

```
/teacher/dashboard                        → Main teacher dashboard
/teacher/attendance                       → Attendance register (class selector + date)
/teacher/attendance/[classId]             → Register for specific class
/teacher/attendance/[classId]/[date]      → Register for specific class on specific date
/teacher/attendance/projector             → Full-screen projector/kiosk QR display
/teacher/attendance/history               → Past attendance records list
/teacher/attendance/history/[classId]     → Attendance history for one class

/teacher/qr-id                            → Teacher's own QR identity card
/teacher/qr-management                    → Manage QR codes for class

/teacher/students                         → Full student list (searchable, filterable)
/teacher/students/[id]                    → Individual student profile
/teacher/students/[id]/grades             → Student's full grade breakdown
/teacher/students/[id]/attendance         → Student's attendance calendar
/teacher/students/[id]/behaviour          → Student's behaviour log
/teacher/students/[id]/documents          → Student's uploaded documents
/teacher/students/[id]/iep               → Student's IEP / special needs profile
/teacher/students/new                     → Enroll new student form

/teacher/gradebook                        → Full class gradebook (weighted grid)
/teacher/gradebook/[classId]             → Gradebook for specific class

/teacher/assignments                      → All assignments list
/teacher/assignments/new                  → Create new assignment
/teacher/assignments/[id]                 → Assignment detail (instructions + settings)
/teacher/assignments/[id]/submissions     → All student submissions for this assignment
/teacher/assignments/[id]/submissions/[studentId] → Individual student submission + marking

/teacher/assessments                      → Assessment list
/teacher/assessments/[id]                 → MYP/IB rubric assessment entry for a class
/teacher/assessments/[id]/results         → Assessment results overview

/teacher/behaviour                        → Behaviour hub (incidents + merits + IEP)
/teacher/behaviour/log                    → Incident log list
/teacher/behaviour/log/new                → Log new incident
/teacher/behaviour/log/[id]              → Incident detail + actions + parent notification status
/teacher/behaviour/merits                 → Merit awards list
/teacher/behaviour/merits/new            → Award merit to student
/teacher/behaviour/interventions          → Intervention tracker list
/teacher/behaviour/interventions/[id]    → Intervention detail + meeting notes + review dates
/teacher/behaviour/iep                   → IEP / special needs list
/teacher/behaviour/iep/[studentId]       → Individual IEP profile

/teacher/timetable                        → Teacher's weekly schedule
/teacher/timetable/[classId]             → Class-specific timetable view
/teacher/calendar                         → School calendar (terms, holidays, events)

/teacher/messaging                        → Message inbox (split panel)
/teacher/messaging/[threadId]            → Individual message thread
/teacher/messaging/new                    → Compose new message

/teacher/reports                          → Reports overview
/teacher/reports/generate                 → Report card generator (select student + term)
/teacher/reports/[id]                     → Individual report card (view + edit AI draft)
/teacher/reports/[id]/preview             → PDF preview before publishing
/teacher/reports/export                   → Export gradebook / attendance to CSV

/teacher/ai                               → AI Insights main page
/teacher/ai/at-risk                       → At-risk student list with reasons
/teacher/ai/at-risk/[studentId]          → At-risk detail + intervention suggestions
/teacher/ai/trends                        → Class trend analysis
/teacher/ai/attendance-prediction        → Attendance prediction charts
/teacher/ai/chat                          → Natural language data query interface

/teacher/analytics                        → Teacher-facing class analytics dashboard

/teacher/plans                            → Termly and annual unit plans
/teacher/plans/[id]                       → Individual plan detail
/teacher/plans/new                        → Create new plan
```

---

### STUDENT ROUTES

```
/student/dashboard                        → Student home screen
/student/scan                             → QR scanner (camera view)
/student/scan/confirm/[scanId]           → Scan confirmation screen

/student/assignments                      → Assignment list (urgency sorted)
/student/assignments/[id]                → Assignment detail (instructions + questions)
/student/assignments/[id]/submit          → Assignment submission flow (step by step)
/student/assignments/[id]/submitted       → Confirmation + submitted work view
/student/assignments/[id]/feedback       → Teacher feedback + marked work view

/student/grades                           → Grades overview (all subjects)
/student/grades/[subject]                → Subject grade breakdown + assessment list
/student/grades/[subject]/[assessmentId] → Individual assessment result + feedback

/student/attendance                       → Attendance calendar view
/student/qr-code                          → Student's own QR code (full screen)

/student/messages                         → Message inbox
/student/messages/[threadId]             → Message thread with teacher

/student/documents                        → Student document storage
/student/documents/[fileId]              → Document viewer

/student/profile                          → Student profile + citizenship + merits
/student/profile/edit                    → Edit profile photo and preferences

/student/badges                           → Merit badges and rewards gallery
```

---

### PARENT ROUTES

```
/parent/dashboard                         → Parent home (child selector at top)
/parent/child/[studentId]                → Child profile overview
/parent/child/[studentId]/grades         → Child's grades view (read-only)
/parent/child/[studentId]/attendance     → Child's attendance calendar
/parent/child/[studentId]/behaviour      → Child's behaviour + merits (parent view)
/parent/child/[studentId]/report         → Published report card view + download

/parent/messages                          → Message inbox
/parent/messages/[threadId]             → Message thread with teacher
/parent/messages/new                      → Compose message to teacher

/parent/announcements                     → School announcements (targeted to parents)
/parent/announcements/[id]               → Individual announcement detail

/parent/calendar                          → School calendar (read-only for parents)

/parent/documents                         → Parent document storage + shared school docs
/parent/profile                           → Parent profile + language preference
```

---

### ADMIN ROUTES

```
/admin/dashboard                          → Admin overview dashboard

/admin/users                              → All users list (all roles)
/admin/users/students                    → Student list
/admin/users/students/[id]              → Student profile (admin view — all data)
/admin/users/students/new               → Enroll student
/admin/users/students/import            → Bulk CSV import + template download
/admin/users/teachers                   → Teacher list
/admin/users/teachers/[id]             → Teacher profile
/admin/users/teachers/new              → Add teacher
/admin/users/parents                    → Parent list
/admin/users/parents/[id]             → Parent profile + linked children
/admin/users/admins                    → Admin users list

/admin/qr-management                    → Central QR ledger (all entities)
/admin/qr-management/generate          → Generate new QR codes (bulk or individual)
/admin/qr-management/print             → Bulk print QR cards

/admin/classes                          → Class list
/admin/classes/[id]                    → Class detail (students + teachers + timetable)
/admin/classes/new                     → Create new class
/admin/timetable                        → School-wide timetable builder
/admin/timetable/substitutes           → Teacher absence + substitute assignment
/admin/calendar                         → School calendar editor (add terms, holidays)

/admin/analytics                        → School-wide analytics dashboard
/admin/analytics/attendance            → Attendance analytics deep dive
/admin/analytics/grades                → Grade distribution analytics
/admin/analytics/behaviour             → Behaviour and merits analytics

/admin/reports                          → Report card management (all classes)
/admin/reports/[id]                    → Individual report card (admin oversight view)

/admin/announcements                    → Announcement board
/admin/announcements/new               → Compose announcement
/admin/announcements/[id]             → Announcement detail + delivery stats

/admin/audit                            → Blockchain audit trail (full school view)
/admin/audit/[recordId]               → Individual audit record + verify hash

/admin/settings                         → School configuration
/admin/settings/grading                → Grading system + weight configuration
/admin/settings/subjects               → Subject management
/admin/settings/citizenship            → Citizenship scale configuration
/admin/settings/notifications          → Alert thresholds and trigger configuration
/admin/settings/integrations           → API keys, blockchain config, AI settings

/admin/support                          → Support ticket inbox (school admin view)
/admin/support/[ticketId]             → Ticket thread with LNS OS support
```

---

### CORPORATE ADMIN ROUTES (LNS OS Platform Level)

```
/corporate/dashboard                    → Platform overview (all schools)
/corporate/schools                      → All schools list
/corporate/schools/[id]               → Individual school detail + health metrics
/corporate/schools/new                 → Onboard new school
/corporate/billing                      → Subscription and billing management
/corporate/billing/[schoolId]         → Individual school billing detail
/corporate/support                      → All support tickets (cross-school)
/corporate/support/[ticketId]         → Ticket thread + internal agent notes
/corporate/announcements               → Platform-wide announcements to all schools
/corporate/settings                     → Platform configuration + feature flags
/corporate/audit                        → Global audit trail (all schools)
```

---

## 5. REALISTIC PLACEHOLDER DATA — RULES

All pages must use realistic placeholder data. Here is the standard to follow:

**Student names (use variety — reflect a real multicultural school):**
Amara Johnson, Blake Nkosi, Cara Mensah, David Moyo, Elena Petrov, Fatima Al-Rashid,
George Osei, Hannah Kim, Isaac Banda, Jade Williams, Kwame Asante, Laila Hassan

**Teacher names:**
Mr. James Okafor (Mathematics), Ms. Sarah Chen (English / Communications),
Mr. David Petrov (Science), Ms. Amina Hassan (Humanities), Mr. Luke Bennett (Arts)

**Classes:** Grade 7A, Grade 7B, Grade 8A, Grade 8B, Grade 9A

**Subjects with weights (must always sum to 100%):**
- Mathematics — 25%
- Communications (English) — 20%
- Science — 20%
- Humanities — 15%
- Arts — 10%
- Physical Education — 10%

**Grade data:** Use a realistic spread — not all students getting A's. Include
some struggling students (F/N citizenship) to make at-risk features meaningful.

**Dates:** Use relative dates — "3 days ago," "due in 2 days," "this term" — so the
UI never looks stale regardless of when it is viewed.

**Assessment scores:** Use MYP 1–8 band scores and percentage equivalents side by side.

---

## 6. DYNAMIC ROUTES — `generateStaticParams()` REQUIREMENT

Because the project uses `output: 'export'` for GitHub Pages, every dynamic route
`[id]`, `[studentId]`, `[classId]`, `[threadId]` etc. MUST export `generateStaticParams()`.

**Template to copy for every dynamic page:**

```tsx
// src/app/(teacher)/teacher/students/[id]/page.tsx

export async function generateStaticParams() {
  // These IDs must match the IDs used in your placeholder data
  return [
    { id: 'student-001' },
    { id: 'student-002' },
    { id: 'student-003' },
    { id: 'student-004' },
    { id: 'student-005' },
    { id: 'student-006' },
  ]
}

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  // Find student from placeholder data using params.id
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.id)
  // Render full profile
}
```

**Every single dynamic route in Section 4 needs this.** Run the audit from Section 3
to find all dynamic route folders and add `generateStaticParams()` before the build
will succeed.

---

## 7. PAGE CONTENT REQUIREMENTS — DETAIL SPEC

Below are the content requirements for the most critical detail pages that are
most likely to be blank or missing.

---

### `/teacher/students/[id]` — Student Profile (Teacher View)

**Must contain:**
- Header: student photo/avatar + full name + LNS ID + class + QR code thumbnail
- Citizenship badge (C+ / N / F) + Power Score percentage
- 4 stat cards: Overall Grade % · Attendance % · Merits Earned · Incidents Logged
- Tab bar: Overview · Grades · Attendance · Behaviour · Documents · IEP
- Overview tab: AI-generated summary paragraph about this student + at-risk flag if applicable
- Quick actions: Message Parent · Log Behaviour · Award Merit · Download Report Card
- Breadcrumb: `Students › [Student Name]`

---

### `/teacher/assignments/[id]/submissions` — Submission Review

**Must contain:**
- Assignment title + subject + due date + total marks
- Progress bar: "18 of 24 submitted" with visual indicator
- Table of students: name · submission status (Submitted/Not Submitted/Late) ·
  submitted at timestamp · marks entered (or "Not marked") · quick mark button
- Filter: All / Submitted / Not Submitted / Marked / Unmarked
- "Release All Grades" button (confirmation modal before action)
- Individual row: click → navigates to `/[id]/submissions/[studentId]`

---

### `/teacher/assignments/[id]/submissions/[studentId]` — Mark Individual Submission

**Must contain:**
- Student name + avatar + submission timestamp
- Question-by-question view: question text → student's answer → mark input → comment field
- For file/photo uploads: image preview or file download link
- Total marks: auto-calculated as teacher enters per-question marks
- Teacher feedback: overall comment text area
- "Save Draft" + "Submit Marks" buttons
- Navigation: Previous Student / Next Student arrows (so teacher can move through class)

---

### `/teacher/assessments/[id]` — MYP Rubric Entry

**Must contain:**
- Assessment name + subject + date + class
- MYP criteria grid: rows = students, columns = criteria A/B/C/D
- Each cell: dropdown 0–8 with descriptor shown on hover
- Auto-calculated MYP grade (1–7) in final column based on boundary table
- Class average row at bottom of each column
- Colour coding: 7–8 = dark green, 5–6 = green, 3–4 = amber, 1–2 = red, 0 = grey
- "Save" button + "Release to Students" toggle

---

### `/student/assignments/[id]` — Student Assignment View

**Must contain:**
- Assignment title + subject + teacher name + due date countdown
- Status banner: "Not Started" / "In Progress" / "Submitted" / "Graded"
- Instructions section (rich text, well formatted)
- Questions section (renders based on question type):
  - Multiple choice: radio button options in tappable rows
  - Short answer: text input with character count
  - Essay: rich text area with word count
  - File upload: drag-drop zone with camera access button
- Progress: "Question 2 of 5" progress bar
- Auto-save indicator: "Last saved 30 seconds ago"
- "Save Draft" + "Submit Assignment" buttons
- After submission: confirmation screen with submitted timestamp

---

### `/student/grades/[subject]` — Subject Grade Breakdown

**Must contain:**
- Subject name + teacher name + current term
- Overall grade displayed three ways: percentage (82%) · letter (B+) · MYP band (6)
- Citizenship status badge
- Trend: graph showing grade over last 5 assessments (simple line chart)
- Assessment list: each row = name · date · score / max · percentage · teacher comment preview
  · click to expand full feedback
- Weight reminder: "This subject counts for 25% of your final grade"

---

### `/parent/child/[studentId]/grades` — Parent Grade View

**Must contain:**
- Child's name + class + term label
- Subject grid: each subject as a card with overall grade (all 3 formats) + teacher name
- Click subject → expands to show assessment breakdown (same as student view, read-only)
- Citizenship badge per subject
- Overall term average
- "Download Report Card" button (if report has been published by teacher)
- Last updated timestamp

---

### `/parent/messages/[threadId]` — Parent Message Thread

**Must contain:**
- Thread header: teacher name + subject + date of last message
- Chat-style message thread (teacher messages left, parent messages right)
- Messages show sender name + timestamp + read receipt
- Language indicator if AI-translated: small flag icon + "Translated from English"
- Reply box at bottom: text area + send button + file attach button
- Back button → `/parent/messages`

---

### `/admin/audit/[recordId]` — Blockchain Record Verification

**Must contain:**
- Record type (e.g. "Attendance Locked" / "Grade Submitted" / "Report Published")
- Timestamp of the event
- User who triggered the event (name + role)
- Affected entity (student name + ID)
- Hash value (monospace, full SHA-256 string)
- "Verify on Chain" button → shows verification result (Verified ✓ / Mismatch ✗)
- Previous record in chain (linked)
- Next record in chain (linked)
- Download record as PDF button

---

## 8. EMPTY STATES — MANDATORY ON ALL LIST PAGES

Every page that lists data must have an empty state for when there is nothing to show.
Empty states must never be a blank white area. They must have:

- A simple illustration (SVG, on-brand, not stock clipart)
- A heading: one clear sentence explaining what this page is for
- A subtext: one sentence explaining why it is empty and what to do
- A CTA button: the primary action to create the first item

**Examples:**

```
No assignments yet
Create your first assignment and it will appear here.
[+ Create Assignment]

No messages
You have no messages from teachers yet.
[Compose Message] (parent view)

No students enrolled
Add students to this class to start taking attendance.
[+ Enroll Students]

No incidents logged
This student has a clean behaviour record.
[+ Log Incident]
```

---

## 9. NAVIGATION CONTINUITY — RULES

Every sub-page must maintain navigation continuity. This means:

**Breadcrumbs:** Always show on detail pages (not on top-level pages).
```tsx
<Breadcrumb items={[
  { label: 'Students', href: '/teacher/students' },
  { label: 'Amara Johnson', href: `/teacher/students/${id}` },
  { label: 'Grades' }
]} />
```

**Back button:** On mobile, the top bar left item is always a back chevron `‹` that goes
to the logical parent page — never to the dashboard. Use `router.back()` or explicit href.

**Active sidebar item:** The sidebar must highlight the correct parent section even when
on a deeply nested route. `/teacher/students/[id]/grades` must highlight "Students" in
the sidebar.

**Page title in top bar:** Must update to reflect the current page.
`/teacher/students/[id]` → top bar shows student's name, not "Students."

---

## 10. SIGN-OFF CRITERIA

A route is only considered complete when ALL of the following are true:

```
[ ] Page renders without errors or console warnings
[ ] Page has realistic placeholder content (no Lorem ipsum, no empty tables)
[ ] All interactive elements on the page have working behaviour
[ ] Breadcrumb is correct and all breadcrumb links work
[ ] Back navigation returns to the correct parent page
[ ] Active sidebar item is correctly highlighted
[ ] Page title in top bar is correct for this route
[ ] Empty state exists and renders if data list is empty
[ ] generateStaticParams() is implemented if dynamic route
[ ] Page is fully responsive: tested at 375px, 768px, and 1200px
[ ] No overflow, no clipping, no broken layout at any breakpoint
[ ] Loading/skeleton state shown while data would be fetching
```

**No route is signed off until every checkbox above is ticked.**

---

## 11. DELIVERY EXPECTATION

**Phase 1 (Critical — complete first):**
All student-facing routes. Students cannot use the platform until these work.

**Phase 2:**
All parent-facing routes. Parent trust depends on these working flawlessly.

**Phase 3:**
All teacher sub-routes (assignment marking, student profiles, AI detail pages).

**Phase 4:**
All admin routes and corporate console routes.

Each phase must be fully reviewed against the sign-off criteria in Section 10 before
Phase 2 begins. Do not build Phase 2 on top of an incomplete Phase 1.

---

**Last updated:** April 2026
**Owner:** LNS OS Development Team
**Companion documents:** MOBILE_DESIGN_SYSTEM.md · TABLET_DESIGN_SYSTEM.md
