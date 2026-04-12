# LNS OS — AI Architecture
## Complete Developer Implementation Guide
## Version 1.0 | Foundation Document | Mandatory Reading Before Any AI Work

---

> "AI does the work first. Humans review, edit, and approve.
>  Manual input is the exception, not the rule."
>  — LNS OS Product Philosophy

---

# PART A — KNOWLEDGE BASE
## What Every Developer Must Understand Before Writing One Line of AI Code

---

## A1. THE MENTAL MODEL — BURN THIS INTO YOUR MIND

LNS OS is not a school system with AI features.
It is an AI system that runs a school, with humans as the quality control layer.

Think of it like a newspaper. The AI is the journalist — it researches, writes, and
files the story. The human is the editor — they read it, adjust the tone, correct a
fact, and press publish. The editor does not write from scratch. They never see a
blank page. Their job is judgement, not production.

Every piece of content, every alert, every summary, every report card comment, every
newsletter, every intervention plan in LNS OS starts as an AI draft. The human's
role is always to REVIEW → EDIT → APPROVE. Never to create from nothing.

This is the system. It does not bend for convenience or deadline pressure.

---

## A2. THE HUMAN EDIT GUARANTEE — NON-NEGOTIABLE ABOVE ALL ELSE

Before anything else in this document, understand this:

**Every single AI-generated output that a human will see, approve, or send
MUST be fully editable before it leaves the draft state.**

This is the most important rule in the entire AI system. It overrides everything else.

What "fully editable" means:
- The AI draft renders in a rich text editor, not a read-only display
- Every word, sentence, and paragraph can be changed by the human
- The human can delete the entire AI draft and write their own version
- The human can regenerate a new AI draft if they do not like the first one
- There is always an "Edit" button visible before an "Approve" button
- The "Approve" button is never the first or only button shown
- The edit state is always one tap/click away — never buried in a submenu
- Changes auto-save every 10 seconds while the human is editing
- The final approved version records who edited it and what percentage was changed

**The UI pattern for every queued item is always:**

```
┌─────────────────────────────────────────────────────┐
│  AI DRAFT — Attendance Alert for Amara Johnson      │
│  Generated 2 mins ago · Not yet sent                │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ [EDITABLE RICH TEXT FIELD]                  │   │
│  │                                             │   │
│  │ Dear Mrs. Johnson,                          │   │
│  │                                             │   │
│  │ We are reaching out regarding Amara's       │   │
│  │ attendance this week. She has been absent   │   │
│  │ for 3 consecutive days...                   │   │
│  │                                             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  [↺ Regenerate]  [✏ Edit]  [✓ Approve & Send]      │
│                                                     │
│  Last edited: Never  ·  AI confidence: High         │
└─────────────────────────────────────────────────────┘
```

The edit field is ALWAYS shown expanded and ready to type in.
NEVER show a read-only preview with a separate "Edit" mode to unlock.
The draft is always in edit mode. Approval is the action, not editing.

---

## A3. THE SIX LAYERS — OVERVIEW

The AI system operates in six distinct layers simultaneously:

```
LAYER 1 — AI SIDE DRAWER      → Context-aware panel on every page
LAYER 2 — INLINE FLAGS        → Badges and indicators within UI content
LAYER 3 — TRIGGER ENGINE      → Automatic actions on data events
LAYER 4 — ROLE CHATBOTS       → Per-role AI assistants with data access
LAYER 5 — SCHEDULE ENGINE     → Automated content generation on a clock
LAYER 6 — APPROVAL QUEUE      → Human review, edit, and one-tap approval
```

All six layers run simultaneously. They are not features — they are infrastructure.
Every page is connected to all six layers at all times.

---

## A4. THE APPROVAL QUEUE — CENTRAL NERVOUS SYSTEM

The Approval Queue is the most important page in the entire system after the dashboard.
It is where all AI drafts land before any human sees, approves, or sends them.

Every queued item has these states:

```
DRAFT      → AI has generated it. No human has seen it yet.
VIEWED     → Human has opened and read it. Not yet edited or approved.
EDITING    → Human is actively making changes right now.
EDITED     → Human made changes. Not yet approved.
APPROVED   → Human approved. Queued to send at scheduled time or immediately.
SENT       → Delivered to recipient. Logged to blockchain.
REJECTED   → Human rejected the draft. AI notified. Can regenerate.
EXPIRED    → Draft was never actioned within 48 hours. Escalated to admin.
```

State transitions are one-directional. A SENT item cannot go back to EDITING.
An APPROVED item can be recalled only if not yet SENT (within a 5-minute window).

---

## A5. CLAUDE API — TECHNICAL FOUNDATION

All AI functionality is powered by the Anthropic Claude API.

**Model:** `claude-sonnet-4-20250514` — use this for all calls. Do not downgrade.
**Max tokens:** 1000 for chatbot responses. 2000 for document drafts. 500 for insights.
**Temperature:** 0.3 for analytical outputs (insights, flags, data summaries).
            0.7 for creative outputs (report card comments, newsletters, messages).

**Base API call pattern:**
```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: SYSTEM_PROMPT_FOR_ROLE,
    messages: [{ role: "user", content: USER_CONTEXT_PAYLOAD }]
  })
})
```

**The system prompt always contains:**
1. The role of the current user (teacher/student/parent/admin)
2. The current page context (what data is being viewed)
3. The school's configuration (grading system, citizenship scale, subjects)
4. The specific task being requested
5. Output format instructions (plain text, JSON, markdown)
6. Hard boundaries (what Claude must never do or say)

**System prompt boundaries (include in every call):**
```
You are the LNS OS AI assistant embedded in a school management platform.
You have access only to the data provided in this context payload.
You must never fabricate student data, grades, or attendance records.
You must never provide medical, legal, or psychological diagnoses.
You must never communicate directly with parents or students — your output
  is always reviewed and approved by a teacher or administrator first.
For student chatbot interactions, guide thinking rather than providing
  direct homework answers. Use the Socratic method.
Always write in a professional, warm, and culturally sensitive tone.
When generating content about a specific student, use their actual
  data provided — never invent or assume information not given to you.
```

---

## A6. CONTEXT PAYLOAD STRUCTURE

Every Claude API call must include a structured context payload.
This is what gives Claude the data it needs to be genuinely useful.

```typescript
interface AIContextPayload {
  // Who is asking
  user: {
    id: string
    role: 'teacher' | 'student' | 'parent' | 'admin'
    name: string
    language: string
  }

  // What page are they on
  page: {
    route: string
    title: string
    description: string
  }

  // What data is currently visible on screen
  pageData: {
    students?: StudentSummary[]
    grades?: GradeRecord[]
    attendance?: AttendanceRecord[]
    assignments?: Assignment[]
    behaviour?: BehaviourRecord[]
    selectedStudent?: StudentFull
    selectedAssignment?: AssignmentFull
  }

  // School configuration
  school: {
    name: string
    gradingSystem: GradeWeight[]
    citizenshipScale: CitizenshipLabel[]
    currentTerm: string
    currentWeek: number
  }

  // The specific task
  task: {
    type: 'insight' | 'draft' | 'flag' | 'chat' | 'schedule'
    instruction: string
    outputFormat: 'text' | 'json' | 'markdown'
  }
}
```

Never call Claude without a complete context payload. Incomplete payloads produce
generic, useless responses. The quality of AI output equals the quality of context.

---

---

# PART B — SKILLS REFERENCE
## How To Build Each AI Layer — Technical Implementation

---

## B1. SKILL — THE AI SIDE DRAWER

### What It Is
A slide-in panel from the right side of the screen. Present on every page across
all four portals. Contains three tabs: Insights, Actions, Ask.

### Component Location
```
components/ai/
  AIDrawer.tsx              → Main drawer shell (slide-in container + tabs)
  AIInsightsTab.tsx         → Layer 1: page-context insights
  AIActionsTab.tsx          → Layer 6: approval queue preview (top 3 items)
  AIChatTab.tsx             → Layer 4: role-specific chatbot
  AIDrawerTrigger.tsx       → The button that opens the drawer (every page)
  AIContextBuilder.ts       → Utility: assembles context payload for current page
```

### Drawer Trigger Button (every page, top-right of content area)
```tsx
// Always visible. Never hidden. Never disabled.
<button
  onClick={() => setDrawerOpen(true)}
  className="fixed right-4 top-4 z-40 flex items-center gap-2 h-10 px-4
             bg-navy-900 text-white rounded-xl text-sm font-medium
             shadow-lg hover:bg-navy-800 active:scale-95 transition-all
             md:right-6 md:top-6"
  aria-label="Open AI Assistant"
>
  <SparklesIcon size={16} />
  <span className="hidden sm:inline">AI Insights</span>
  {pendingActionsCount > 0 && (
    <span className="w-5 h-5 bg-red-600 rounded-full text-xs
                     flex items-center justify-center font-bold">
      {pendingActionsCount}
    </span>
  )}
</button>
```

### Drawer Shell
```tsx
<div className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white
                 shadow-2xl transform transition-transform duration-300
                 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

  {/* Header */}
  <div className="flex items-center justify-between p-4 border-b border-gray-100">
    <div className="flex items-center gap-2">
      <SparklesIcon size={18} className="text-red-600" />
      <span className="font-semibold text-navy-900 text-sm">AI Assistant</span>
    </div>
    <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 ...">✕</button>
  </div>

  {/* Tabs */}
  <div className="flex border-b border-gray-100">
    {['Insights', 'Actions', 'Ask'].map(tab => (
      <button key={tab}
        className={`flex-1 py-3 text-xs font-medium transition-colors
          ${activeTab === tab
            ? 'text-red-600 border-b-2 border-red-600'
            : 'text-gray-400 hover:text-gray-600'}`}
        onClick={() => setActiveTab(tab)}>
        {tab}
        {tab === 'Actions' && pendingCount > 0 && (
          <span className="ml-1 bg-red-600 text-white text-[10px]
                           rounded-full px-1.5">{pendingCount}</span>
        )}
      </button>
    ))}
  </div>

  {/* Tab content */}
  <div className="flex-1 overflow-y-auto p-4">
    {activeTab === 'Insights' && <AIInsightsTab context={pageContext} />}
    {activeTab === 'Actions' && <AIActionsTab />}
    {activeTab === 'Ask' && <AIChatTab context={pageContext} userRole={userRole} />}
  </div>
</div>
```

### Insights Tab — How It Calls Claude
```typescript
// Called when drawer opens or page data changes
async function fetchPageInsights(context: AIContextPayload): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: buildSystemPrompt(context.user.role),
      messages: [{
        role: "user",
        content: `You are looking at the ${context.page.title} page for
                  ${context.user.name}. Here is the current data on screen:
                  ${JSON.stringify(context.pageData)}

                  Provide 2-3 specific, data-grounded insights about what
                  you see. Be concise. Use bullet points. Reference actual
                  names and numbers from the data. Do not be generic.
                  Format as JSON: { insights: string[], urgentFlag: boolean,
                  urgentReason: string | null }`
      }]
    })
  })
  const data = await response.json()
  return data.content[0].text
}
```

### Rendering Insights
```tsx
function AIInsightsTab({ context }: { context: AIContextPayload }) {
  const [insights, setInsights] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [urgentFlag, setUrgentFlag] = useState(false)

  useEffect(() => {
    fetchPageInsights(context).then(raw => {
      const parsed = JSON.parse(raw)
      setInsights(parsed.insights)
      setUrgentFlag(parsed.urgentFlag)
      setLoading(false)
    })
  }, [context.page.route])

  if (loading) return <InsightsSkeleton />   // Always show skeleton, never blank

  return (
    <div className="space-y-3">
      {urgentFlag && <UrgentFlagBanner reason={parsed.urgentReason} />}
      {insights.map((insight, i) => (
        <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
          <SparklesIcon size={14} className="text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
        </div>
      ))}
      <button
        onClick={() => fetchPageInsights(context)}
        className="w-full py-2 text-xs text-gray-400 hover:text-gray-600">
        ↺ Refresh insights
      </button>
    </div>
  )
}
```

---

## B2. SKILL — INLINE AI FLAGS

### What They Are
Small badges, pills, and indicators rendered directly within tables, cards,
lists, and forms wherever AI has detected something worth flagging.

### Flag Types and Visual Spec
```tsx
// At-risk flag — red, urgent
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                 bg-red-50 text-red-700 text-[11px] font-medium border
                 border-red-200 cursor-pointer"
      onClick={() => openDrawerWithContext('at-risk', studentId)}>
  ⚠ AI Flag
</span>

// Grade drop flag — amber, warning
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                 bg-amber-50 text-amber-700 text-[11px] font-medium border
                 border-amber-200 cursor-pointer"
      onClick={() => openDrawerWithContext('grade-drop', studentId)}>
  ↓ Trending Down
</span>

// Draft ready flag — blue, informational
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                 bg-blue-50 text-blue-700 text-[11px] font-medium border
                 border-blue-200 cursor-pointer"
      onClick={() => openDrawerWithContext('draft-ready', itemId)}>
  ✓ AI Draft Ready
</span>

// Insight available flag — navy, neutral
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                 bg-navy-50 text-navy-700 text-[11px] font-medium border
                 border-navy-200 cursor-pointer"
      onClick={() => openDrawerWithContext('insight', contextKey)}>
  ✦ AI Insight
</span>
```

### Where Flags Must Appear (Mandatory List)

| Location | Flag Condition | Flag Type |
|---|---|---|
| Attendance register — student row | 3+ consecutive absences | At-risk (red) |
| Attendance register — student row | Attendance < 80% | At-risk (red) |
| Gradebook — student row | Grade dropped 10%+ this week | Trending Down (amber) |
| Gradebook — student row | Grade < 50% in any subject | At-risk (red) |
| Gradebook — assessment column header | Class average below 60% | AI Insight (navy) |
| Student list — student card/row | Any trigger threshold hit | At-risk (red) |
| Assignment list — assignment row | 30%+ not submitted past due | AI Insight (navy) |
| Report card list — student row | AI comment draft is ready | Draft Ready (blue) |
| Behaviour log — student row | 3+ incidents this term | At-risk (red) |
| Dashboard — at-risk panel | Combined triggers | At-risk (red) |
| Parent dashboard — child card | Any flag on child | AI Flag (red) |

### Clicking a Flag Always Opens the Drawer
```typescript
function openDrawerWithContext(flagType: string, entityId: string) {
  // Pre-load the drawer with context about this specific flag
  setDrawerContext({ flagType, entityId })
  setDrawerTab('Insights')
  setDrawerOpen(true)
  // The insights tab re-fetches with the flag context pre-loaded
}
```

---

## B3. SKILL — THE TRIGGER ENGINE

### What It Is
An event-driven system that monitors data changes and fires AI actions
automatically when thresholds are crossed. No human initiates these.

### Implementation — Event Monitor
```typescript
// Run this check whenever attendance or grade data is saved
async function runTriggerCheck(studentId: string, schoolId: string) {
  const student = await getStudentData(studentId)
  const triggers: TriggerResult[] = []

  // Check 1: Consecutive absences
  const consecutiveAbsences = countConsecutiveAbsences(student.attendance)
  if (consecutiveAbsences >= 3) {
    triggers.push({
      type: 'CONSECUTIVE_ABSENCE',
      severity: 'HIGH',
      studentId,
      data: { count: consecutiveAbsences }
    })
  }

  // Check 2: Attendance percentage
  const attendancePct = calculateAttendancePercentage(student.attendance)
  if (attendancePct < 80) {
    triggers.push({
      type: 'LOW_ATTENDANCE',
      severity: 'HIGH',
      studentId,
      data: { percentage: attendancePct }
    })
  }

  // Check 3: Grade drop
  const gradeDrop = calculateWeeklyGradeDrop(student.grades)
  if (gradeDrop > 10) {
    triggers.push({
      type: 'GRADE_DROP',
      severity: 'MEDIUM',
      studentId,
      data: { drop: gradeDrop }
    })
  }

  // Check 4: Behaviour incidents
  const incidents = countTermIncidents(student.behaviour)
  if (incidents >= 3) {
    triggers.push({
      type: 'BEHAVIOUR_THRESHOLD',
      severity: 'MEDIUM',
      studentId,
      data: { count: incidents }
    })
  }

  // Check 5: Assignment overdue
  const overdueAssignments = getOverdueAssignments(student.assignments)
  if (overdueAssignments.length > 0) {
    triggers.push({
      type: 'ASSIGNMENT_OVERDUE',
      severity: 'LOW',
      studentId,
      data: { assignments: overdueAssignments }
    })
  }

  // Check 6: Combined triggers = elevated severity
  if (triggers.length >= 2) {
    triggers.push({
      type: 'COMBINED_RISK',
      severity: 'CRITICAL',
      studentId,
      data: { triggerCount: triggers.length, triggers }
    })
  }

  // Fire AI drafts for all triggers found
  for (const trigger of triggers) {
    await fireAIDraft(trigger, student)
  }
}
```

### Firing an AI Draft
```typescript
async function fireAIDraft(trigger: TriggerResult, student: StudentFull) {
  // Get AI to draft the appropriate content
  const draft = await generateDraftForTrigger(trigger, student)

  // Save to approval queue
  await saveToApprovalQueue({
    id: generateId(),
    type: trigger.type,
    severity: trigger.severity,
    studentId: student.id,
    studentName: student.name,
    teacherId: student.teacherId,
    generatedAt: new Date().toISOString(),
    status: 'DRAFT',
    content: draft.content,        // The editable text
    contentType: draft.contentType, // 'alert' | 'message' | 'plan' | 'flag'
    recipient: draft.recipient,
    aiConfidence: draft.confidence,
    expiresAt: addHours(new Date(), 48).toISOString()
  })
}
```

### Draft Generation Per Trigger Type
```typescript
async function generateDraftForTrigger(
  trigger: TriggerResult,
  student: StudentFull
): Promise<AIDraft> {

  const prompts: Record<string, string> = {
    CONSECUTIVE_ABSENCE: `
      Draft a warm, professional message from the school to ${student.guardianName},
      parent of ${student.name} (Grade ${student.grade}).
      ${student.name} has been absent for ${trigger.data.count} consecutive school days.
      The message should: express concern (not accusation), ask if everything is okay,
      invite contact, mention support available. Max 3 short paragraphs.
      Tone: caring, human, not bureaucratic.`,

    GRADE_DROP: `
      Draft a brief teacher note to flag to ${student.teacherName} that
      ${student.name}'s overall grade has dropped ${trigger.data.drop}% in one week.
      Include: which subject dropped most, what the current grade is, suggest
      one specific intervention the teacher could try. Max 150 words.`,

    ASSIGNMENT_OVERDUE: `
      Draft a friendly reminder to ${student.name} (age 11-14) that they have
      ${trigger.data.assignments.length} assignment(s) overdue.
      List the assignments by name. Tone: encouraging, not scolding.
      Include a motivational sentence at the end. Max 100 words.`,

    COMBINED_RISK: `
      Draft a comprehensive at-risk summary for teacher ${student.teacherName}
      regarding ${student.name}. Include: all risk factors detected, severity
      assessment, 3 specific recommended interventions ranked by priority,
      suggested timeline for review. Professional tone. Use bullet points.`
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: buildSystemPrompt('system'),
      messages: [{ role: "user", content: prompts[trigger.type] }]
    })
  })

  const data = await response.json()
  return {
    content: data.content[0].text,
    contentType: mapTriggerToContentType(trigger.type),
    recipient: mapTriggerToRecipient(trigger, student),
    confidence: 'HIGH'
  }
}
```

---

## B4. SKILL — THE APPROVAL QUEUE UI

### Page Location
```
/teacher/approvals          → Teacher's approval queue
/admin/approvals            → Admin's approval queue (escalated items)
/student/approvals          → Student's pending AI-drafted reminders (read-only)
```

### Queue List View
```tsx
function ApprovalQueue() {
  return (
    <div className="space-y-3">
      {/* Filter bar */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'Urgent', 'Alerts', 'Messages', 'Reports', 'Reminders'].map(f => (
          <FilterChip key={f} label={f} active={filter === f}
                      onClick={() => setFilter(f)} />
        ))}
      </div>

      {/* Queue items */}
      {queueItems.map(item => (
        <QueueItem key={item.id} item={item} />
      ))}

      {queueItems.length === 0 && <EmptyQueue />}
    </div>
  )
}
```

### Queue Item — THE MOST IMPORTANT COMPONENT IN THE AI SYSTEM
```tsx
function QueueItem({ item }: { item: ApprovalQueueItem }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(item.content)
  const [isSaving, setIsSaving] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const lastSavedRef = useRef<Date>(new Date())

  // Auto-save every 10 seconds while editing
  useEffect(() => {
    if (!isEditing) return
    const interval = setInterval(async () => {
      await saveDraft(item.id, editedContent)
      lastSavedRef.current = new Date()
    }, 10000)
    return () => clearInterval(interval)
  }, [isEditing, editedContent])

  return (
    <div className={`bg-white rounded-2xl border p-4 space-y-3
      ${item.severity === 'CRITICAL' ? 'border-red-300 bg-red-50' :
        item.severity === 'HIGH' ? 'border-amber-200' :
        'border-gray-100'}`}>

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <SeverityBadge severity={item.severity} />
            <span className="text-xs text-gray-400">{item.type}</span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400">
              {formatRelativeTime(item.generatedAt)}
            </span>
          </div>
          <p className="font-medium text-navy-900 text-sm mt-1">
            {item.studentName} — {humanReadableType(item.type)}
          </p>
          <p className="text-xs text-gray-500">
            To: {item.recipient.name} ({item.recipient.role})
          </p>
        </div>
        <StatusBadge status={item.status} />
      </div>

      {/* THE EDIT FIELD — ALWAYS VISIBLE, ALWAYS EDITABLE */}
      {/* This is the most important element. It is never read-only. */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            AI Draft — Edit freely before approving
          </label>
          {isEditing && (
            <span className="text-[10px] text-gray-400">
              Auto-saving · Last saved {formatRelativeTime(lastSavedRef.current)}
            </span>
          )}
        </div>
        <textarea
          value={editedContent}
          onChange={(e) => {
            setEditedContent(e.target.value)
            setIsEditing(true)
            updateItemStatus(item.id, 'EDITING')
          }}
          className="w-full min-h-[120px] p-3 rounded-xl border border-gray-200
                     bg-white text-sm text-gray-800 leading-relaxed resize-y
                     focus:outline-none focus:ring-2 focus:ring-navy-400
                     font-[inherit]"
          placeholder="AI draft will appear here..."
        />
        {/* Character/word count */}
        <p className="text-[10px] text-gray-400 text-right">
          {editedContent.split(' ').filter(Boolean).length} words
        </p>
      </div>

      {/* Metadata */}
      <div className="flex gap-4 text-[11px] text-gray-400">
        <span>AI Confidence: {item.aiConfidence}</span>
        {item.status === 'EDITED' && (
          <span className="text-amber-600">· You made edits</span>
        )}
        <span>Expires in {formatExpiry(item.expiresAt)}</span>
      </div>

      {/* Action buttons — ORDER MATTERS: Regenerate → Edit hint → Approve */}
      <div className="flex gap-2 pt-1">
        {/* Regenerate — get a fresh AI draft */}
        <button
          onClick={() => regenerateDraft(item.id)}
          className="flex items-center gap-1.5 h-9 px-3 rounded-xl border
                     border-gray-200 text-xs text-gray-600 hover:bg-gray-50
                     active:scale-95 transition-all">
          ↺ Regenerate
        </button>

        {/* Reject — dismiss this draft */}
        <button
          onClick={() => rejectDraft(item.id)}
          className="flex items-center gap-1.5 h-9 px-3 rounded-xl border
                     border-gray-200 text-xs text-red-500 hover:bg-red-50
                     active:scale-95 transition-all">
          ✕ Reject
        </button>

        {/* Approve — the final action, visually dominant */}
        <button
          onClick={() => approveDraft(item.id, editedContent)}
          disabled={isApproving || !editedContent.trim()}
          className="flex-1 flex items-center justify-center gap-1.5 h-9
                     rounded-xl bg-navy-900 text-white text-xs font-semibold
                     hover:bg-navy-800 active:scale-95 transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed">
          {isApproving ? (
            <><Spinner size={12} /> Approving...</>
          ) : (
            <>✓ Approve & Send</>
          )}
        </button>
      </div>

      {/* Recall window — shown for 5 minutes after approval */}
      {item.status === 'APPROVED' && !item.sentAt && (
        <div className="flex items-center justify-between p-2 bg-green-50
                        rounded-xl border border-green-200">
          <span className="text-xs text-green-700">Sending in {recallCountdown}s</span>
          <button onClick={() => recallApproval(item.id)}
                  className="text-xs text-red-600 font-medium">
            Recall
          </button>
        </div>
      )}
    </div>
  )
}
```

---

## B5. SKILL — THE ROLE CHATBOTS

### System Prompts Per Role

```typescript
const SYSTEM_PROMPTS = {

  teacher: (context: AIContextPayload) => `
    You are an AI teaching assistant embedded in LNS OS, a school management
    platform. You are helping ${context.user.name}, a teacher.

    You have access to the following class data:
    ${JSON.stringify(context.pageData)}

    School: ${context.school.name}
    Current term: ${context.school.currentTerm}
    Grading system: ${JSON.stringify(context.school.gradingSystem)}

    You can:
    - Answer questions about specific students using the data provided
    - Draft report card comments (always editable by teacher before use)
    - Suggest interventions based on student performance patterns
    - Analyse class-wide trends and explain what they mean
    - Draft messages to parents (always queued for teacher approval)

    You cannot:
    - Access data not provided in this context
    - Send messages directly — all drafts go to approval queue
    - Make medical or psychological diagnoses
    - Guarantee outcomes of interventions

    Always cite specific data when making claims about students.
    Keep responses concise and actionable.`,

  student: (context: AIContextPayload) => `
    You are an AI learning assistant embedded in LNS OS, helping
    ${context.user.name}, a student in ${context.pageData.selectedStudent?.grade || 'middle school'}.

    You can see their current assignments: ${JSON.stringify(context.pageData.assignments)}
    Their recent grades: ${JSON.stringify(context.pageData.grades)}

    Your role:
    - Guide students through homework using the Socratic method
      (ask questions that lead them to the answer — never give it directly)
    - Explain what grades, rubrics, and citizenship scores mean in simple language
    - Help them understand assignment instructions if confused
    - Provide motivational coaching based on their actual progress data
    - Guide them step by step through platform features

    You cannot:
    - Write their assignments for them
    - Change their grades
    - Contact their parents or teachers
    - Access any other student's data

    Use encouraging, age-appropriate language (11-14 year olds).
    Keep responses short — max 3 sentences per message.
    Always end with a question or next step to keep them engaged.`,

  parent: (context: AIContextPayload) => `
    You are an AI assistant helping ${context.user.name}, a parent using
    the LNS OS school platform. You can see their child's data:
    ${JSON.stringify(context.pageData)}

    Your role:
    - Explain what grades, attendance figures, and citizenship scores mean
    - Describe what their child's performance trends indicate
    - Explain school policies referenced in documents
    - Guide parents through platform features
    - Translate educational jargon into plain language

    You cannot:
    - Contact the school on their behalf (direct them to message the teacher)
    - Change any of their child's records
    - Make promises about grades or outcomes
    - Provide medical, legal, or psychological advice
    - Access data for any child other than the one in context

    Language preference: ${context.user.language}
    If not English, respond in ${context.user.language}.
    Tone: warm, clear, and reassuring. Never alarming without cause.`,

  admin: (context: AIContextPayload) => `
    You are an AI school intelligence assistant for ${context.user.name},
    an administrator at ${context.school.name}.

    You have access to school-wide data:
    ${JSON.stringify(context.pageData)}

    You can:
    - Analyse school-wide attendance and grade patterns
    - Identify systemic issues (which classes, subjects, or teachers need attention)
    - Draft school-wide announcements and communications
    - Generate summaries for board reports or leadership meetings
    - Explain what analytics trends mean and suggest school-level responses

    You cannot:
    - Access financial or personal HR data (not in your scope)
    - Send any communications directly — all drafts go to approval queue
    - Make decisions — you provide analysis to support human decision-making

    Be precise, data-driven, and strategic in your responses.
    Senior leadership tone — professional and concise.`
}
```

### Chat Component
```tsx
function AIChatTab({ context, userRole }: ChatTabProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPTS[userRole](context),
          messages: [
            ...messages,  // Full conversation history for context
            userMessage
          ]
        })
      })

      const data = await response.json()
      const assistantMessage = {
        role: 'assistant',
        content: data.content[0].text
      }
      setMessages(prev => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Context pill — shows what AI knows about */}
      <div className="flex items-center gap-2 mb-3 p-2 bg-navy-50 rounded-xl">
        <SparklesIcon size={12} className="text-navy-600" />
        <span className="text-[11px] text-navy-600">
          AI has context from: {context.page.title}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3">
        {messages.length === 0 && <ChatWelcome userRole={userRole} />}
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} />
        ))}
        {isLoading && <ChatTypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder={getChatPlaceholder(userRole)}
          className="flex-1 h-10 px-3 rounded-xl border border-gray-200
                     text-sm focus:outline-none focus:ring-2 focus:ring-navy-400"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          className="w-10 h-10 bg-navy-900 text-white rounded-xl flex items-center
                     justify-center active:scale-95 disabled:opacity-50">
          ↑
        </button>
      </div>
    </div>
  )
}
```

---

## B6. SKILL — THE SCHEDULE ENGINE

### Scheduled Jobs (Server-Side — Cron or Supabase Edge Functions)

```typescript
// EVERY MONDAY 06:00 — Weekly class summary for teachers
async function weeklyTeacherSummary() {
  const teachers = await getAllActiveTeachers()

  for (const teacher of teachers) {
    const classData = await getTeacherClassData(teacher.id, 'this-week')

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: "You are generating a weekly class summary for a teacher. Be specific, data-driven, and actionable.",
        messages: [{
          role: "user",
          content: `Generate a weekly performance summary for ${teacher.name}'s class.
                    Data: ${JSON.stringify(classData)}
                    Include: top performers, struggling students, attendance highlights,
                    assessment results from this week, one recommended focus for next week.
                    Format: professional email body, no subject line needed. Max 300 words.`
        }]
      })
    })

    const data = await response.json()

    // Add to teacher's approval queue — not sent directly
    await saveToApprovalQueue({
      type: 'WEEKLY_SUMMARY',
      severity: 'LOW',
      teacherId: teacher.id,
      content: data.content[0].text,
      contentType: 'summary',
      recipient: { name: teacher.name, role: 'teacher', id: teacher.id },
      status: 'DRAFT'
    })
  }
}

// FIRST OF MONTH 07:00 — Monthly attendance report for admin
async function monthlyAttendanceReport() {
  const school = await getSchoolData()
  const attendanceData = await getSchoolAttendanceLastMonth(school.id)

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: "You are generating a monthly attendance report for a school administrator.",
      messages: [{
        role: "user",
        content: `Generate a monthly attendance analysis for ${school.name}.
                  Data: ${JSON.stringify(attendanceData)}
                  Include: school-wide power score, class breakdown, chronic absentees,
                  trend vs last month, 3 recommended actions. Professional report format.`
      }]
    })
  })

  const data = await response.json()
  await saveToApprovalQueue({
    type: 'MONTHLY_ATTENDANCE_REPORT',
    severity: 'LOW',
    adminId: school.adminId,
    content: data.content[0].text,
    contentType: 'report',
    status: 'DRAFT'
  })
}

// 4 WEEKS BEFORE TERM END — Batch report card comment drafting
async function termReportCardDrafts() {
  const students = await getAllStudents()

  for (const student of students) {
    const fullData = await getStudentTermData(student.id)

    // Draft one comment per subject per student
    for (const subject of fullData.subjects) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          system: "You are drafting a report card comment. Be specific about this student's actual performance.",
          messages: [{
            role: "user",
            content: `Write a report card comment for ${student.name} in ${subject.name}.
                      Grade: ${subject.grade}% (${subject.letter})
                      MYP band: ${subject.mypBand}
                      Citizenship: ${subject.citizenship}
                      Attendance in this subject: ${subject.attendance}%
                      Behaviour notes: ${subject.behaviourSummary}
                      Strengths observed: ${subject.strengths}
                      Areas for growth: ${subject.areasForGrowth}

                      Write 3 sentences: one strength, one area for growth,
                      one forward-looking statement. Professional, warm, specific.
                      Never use generic phrases like "is a pleasure to have in class."
                      Reference specific evidence from the data above.`
          }]
        })
      })

      const data = await response.json()
      await saveToApprovalQueue({
        type: 'REPORT_CARD_COMMENT',
        studentId: student.id,
        subjectId: subject.id,
        teacherId: subject.teacherId,
        content: data.content[0].text,
        contentType: 'report-comment',
        status: 'DRAFT'
      })
    }
  }
}

// LAST FRIDAY OF MONTH — Parent newsletter per child
async function monthlyParentNewsletter() {
  const students = await getAllStudents()

  for (const student of students) {
    const monthData = await getStudentMonthData(student.id)

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        system: "You are drafting a monthly student highlight newsletter for a parent. Warm, celebratory tone.",
        messages: [{
          role: "user",
          content: `Write a monthly highlights newsletter for the parent of ${student.name}.
                    This month's data:
                    - Attendance: ${monthData.attendance}%
                    - Best subject this month: ${monthData.bestSubject}
                    - Most improved area: ${monthData.mostImproved}
                    - Merits earned: ${monthData.merits}
                    - Upcoming: ${monthData.upcomingEvents}
                    - Teacher note: ${monthData.teacherNote}

                    Format: warm letter to parent. 3 short paragraphs.
                    Celebrate genuine progress. Mention upcoming events.
                    Close with encouragement. Max 200 words.
                    Language: ${student.parentLanguage}`
        }]
      })
    })

    const data = await response.json()
    await saveToApprovalQueue({
      type: 'PARENT_NEWSLETTER',
      studentId: student.id,
      teacherId: student.teacherId,
      content: data.content[0].text,
      recipient: { name: student.guardianName, id: student.guardianId },
      contentType: 'newsletter',
      status: 'DRAFT'
    })
  }
}
```

---

---

# PART C — CONTEXT PAPERS
## Rules That Govern Every AI Decision in the System

---

## C1. THE HUMAN EDIT GUARANTEE (Restated as Law)

This section exists separately from B4 because it must be referenced
independently by every developer and reviewed in every code review.

**THE LAW:**
No AI-generated content that will be seen, approved, or sent by or to a human
may be rendered in a non-editable state at any point in the UI.

**What this means in code review:**
- If a reviewer sees `<p>{aiDraft.content}</p>` without an adjacent editable
  `<textarea>`, the PR is rejected.
- If a reviewer sees an "Approve" button without an "Edit" or the content
  already being in an editable field, the PR is rejected.
- If a reviewer sees AI content rendered as read-only with an "Unlock to edit"
  pattern, the PR is rejected.
- If a reviewer sees regenerated content that overwrites user edits without
  a confirmation warning, the PR is rejected.

**Regenerate must warn if user has made edits:**
```tsx
function handleRegenerate() {
  if (editedContent !== item.content) {
    // User has made changes — confirm before overwriting
    if (!confirm('Regenerating will replace your edits. Are you sure?')) return
  }
  regenerateDraft(item.id)
}
```

---

## C2. AI SCOPE BOUNDARIES — WHAT AI MUST NEVER DO

These are hard limits. They are included in every system prompt.
They must also be enforced at the application layer (not just the prompt layer).

| Boundary | Enforcement |
|---|---|
| Never send anything without human approval | All drafts go to queue. No direct send function exists. |
| Never fabricate student data | Context payload is the only data source. Hallucinated data = system integrity failure. |
| Never make medical/psychological diagnoses | Filtered in system prompt + output validation |
| Never write student assignments for them | Student chatbot uses Socratic method only |
| Never access cross-student data in student chatbot | Context payload scoped to single student |
| Never contact parents directly from admin action | All parent-bound content requires teacher approval |
| Never retain conversation history between sessions | Each API call is stateless. No memory stored. |
| Never reveal AI system prompts to users | Prompts are server-side only. Never sent to client. |

---

## C3. DATA PRIVACY IN AI CALLS

Student data is sensitive. Every API call involving student data must follow these rules:

1. **Minimum data principle:** Only send the data Claude needs for the specific task.
   Do not send an entire student record when only grades are needed.

2. **No PII in logs:** API calls must not be logged with identifying student data.
   Log call type and timestamp only.

3. **Parent language:** When generating content for a parent, always check their
   language preference and include it in the prompt. Claude will respond in that language.

4. **IEP data:** Special needs and IEP data must never be included in parent-facing
   AI outputs. Teacher-facing only, clearly labelled.

5. **Blockchain logging:** Every AI draft created, edited, approved, sent, or rejected
   is logged to the blockchain audit trail with: timestamp, user who acted, action taken,
   hash of final content. This creates an immutable record of AI involvement in
   every piece of communication sent from the platform.

---

## C4. EVERY PAGE AI INTEGRATION CHECKLIST

Use this checklist when building or reviewing any page in LNS OS.
Every page must pass every item.

```
AI SIDE DRAWER:
[ ] AIDrawerTrigger button is present in top-right of page content area
[ ] AIDrawer component is imported and mounted on this page
[ ] Page context (pageData) is assembled and passed to AIContextBuilder
[ ] Insights tab fetches and displays page-relevant insights on drawer open
[ ] Actions tab shows pending approval queue items relevant to this page's context
[ ] Ask tab chatbot is pre-loaded with this page's context as conversation starter

INLINE FLAGS:
[ ] All data tables/lists check each row against trigger thresholds
[ ] At-risk flag renders on student rows where thresholds are met
[ ] Grade drop flag renders on grade cells where 10%+ weekly drop detected
[ ] Draft ready flag renders on report/assignment rows where AI draft is queued
[ ] Clicking any flag opens the drawer pre-loaded with that flag's context

APPROVAL QUEUE ITEMS:
[ ] All AI-generated content for this page's domain appears in queue
[ ] Queue items always show editable textarea (never read-only display)
[ ] Regenerate, Reject, and Approve buttons all present on every item
[ ] Regenerate warns if user has made edits
[ ] Approve triggers 5-minute recall window before final send
[ ] All state changes (DRAFT→EDITING→EDITED→APPROVED→SENT) are logged

CHATBOT:
[ ] Role-appropriate system prompt used (teacher/student/parent/admin)
[ ] Conversation history maintained within session
[ ] Context pill shows what data AI has access to
[ ] Appropriate welcome message and placeholder for this role
[ ] Student chatbot: Socratic responses verified (not giving direct answers)

SCHEDULE ENGINE:
[ ] Scheduled outputs for this page's domain appear in approval queue
[ ] Scheduled outputs are not sent automatically — always queued for review
```

---

## C5. AI QUALITY STANDARDS

Every AI output shipped to users must meet these standards:

**Specificity:** AI responses must reference actual data. Generic responses
like "this student needs improvement" with no data reference are a failure.
The output must say "Amara's Mathematics grade dropped from 74% to 61% this week,
primarily due to the missed assignment on 8 April."

**Tone calibration by audience:**
- Teacher outputs: Professional, concise, evidence-based
- Student outputs: Encouraging, age-appropriate (11-14), Socratic
- Parent outputs: Warm, plain language, no educational jargon
- Admin outputs: Strategic, data-forward, actionable

**Length discipline:**
- Inline insights: max 2 sentences
- Drawer insights: max 3 bullet points
- Alerts/messages: max 3 short paragraphs
- Report card comments: exactly 3 sentences
- Newsletters: max 200 words
- Admin reports: max 400 words

**Regeneration quality:** If a teacher clicks Regenerate, the new draft must be
meaningfully different from the first — not a minor rewording. If Claude produces
the same draft twice, the second call must include: "The teacher rejected the
previous draft. Generate a meaningfully different version."

---

# SUMMARY — THE COMMAND TO EVERY DEVELOPER

You are not adding AI to LNS OS.
AI is the foundation. You are building the human interface around it.

Every page you touch must have the drawer.
Every table must have flags.
Every document must start as an AI draft.
Every draft must be editable before it can be approved.
Every approval must be logged.
Nothing sends without a human tap.

That is the system.
Build it at every corner.

---

**Document version:** 1.0
**Last updated:** April 2026
**Owner:** LNS OS Development Team
**Companion documents:**
  MOBILE_DESIGN_SYSTEM.md
  TABLET_DESIGN_SYSTEM.md
  ROUTE_COMPLETION_PROMPT.md
**Supersedes:** Any previous AI implementation guidance
