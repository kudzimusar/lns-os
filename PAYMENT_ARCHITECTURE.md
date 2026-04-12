# LNS OS — Payment Architecture
## Complete Developer Implementation Guide
## Version 1.0 | Foundation Document | Mandatory Reading Before Any Payment Work

---

> "A payment in LNS OS is not a transaction.
>  It is a school event with financial consequences —
>  connected to every system, recorded forever,
>  and understood by everyone it touches."
>  — LNS OS Payment Philosophy

---

# PART A — KNOWLEDGE BASE
## What Every Developer Must Understand Before Writing One Line of Payment Code

---

## A1. THE MENTAL MODEL — PAYMENTS AS CONNECTED EVENTS

In every benchmark school payment system (ParentPay, MySchoolBucks,
SchoolMoney, FACTS), a payment is an isolated event. Parent pays.
System records it. Email receipt goes out. That is the end of the story.

In LNS OS, a payment is the beginning of a workflow.

When a parent pays a trip fee:
→ Their child's seat on the bus is confirmed
→ The trip register is updated in real time
→ The teacher sees the updated headcount immediately
→ A consent confirmation is generated and stored
→ An AI-drafted "what to bring" message is queued for teacher approval
→ The payment is sealed to the blockchain ledger
→ The financial record appears in the admin dashboard
→ The parent's payment history is updated
→ If it was the last payment needed, the teacher gets an "all paid" notification

Every payment category works this way. The payment does not sit in a
financial silo. It ripples through the entire platform.

That is the fundamental difference between LNS OS and every competitor.

---

## A2. THE BUSINESS MODEL RECOMMENDATION

After evaluating the three options against LNS OS's positioning as a
premium educational operating system, the recommended model is:

### HYBRID: Monthly Subscription + Micro Transaction Fee

**Tier 1 — Standard School Plan:**
Monthly subscription per school (flat rate based on student enrollment bands)
+ 0.5% platform fee on all payments processed through LNS OS

**Tier 2 — Premium School Plan:**
Higher monthly subscription
+ 0.25% platform fee (reduced because of higher subscription)
+ Priority support, advanced analytics, custom branding

**Tier 3 — Enterprise (Multi-School / District):**
Annual contract
+ 0.1% platform fee
+ Dedicated account manager, custom integrations, SLA guarantees

**Why this model:**

The subscription provides predictable revenue for LNS OS regardless of
payment volume. The micro transaction fee aligns LNS OS's incentives with
the school's success — the more activity flows through the platform, the
more both parties benefit. At 0.5%, a school processing £50,000 in payments
per term generates £250 for LNS OS — negligible to the school, meaningful
at scale across hundreds of schools.

**What schools see:**
The platform fee is absorbed by LNS OS and is NOT passed to parents.
Parents see the exact amount the school charges — no surprise fees at
checkout. The platform fee is deducted from the school's payout, not
added to the parent's bill. This is critical for parent trust.

**Stripe Connect architecture (how the money flows):**
```
Parent pays £50.00
  → Stripe processes payment
  → Stripe deducts: 1.4% + 20p = £0.90 (Stripe's fee)
  → LNS OS deducts: 0.5% = £0.25 (platform fee)
  → School receives: £48.85 net
  → LNS OS payout: £0.25
  → Everything is transparent in school's admin dashboard
```

This is implemented using Stripe Connect — schools onboard as Connected
Accounts. LNS OS is the platform. Money flows to the school's bank
directly via Stripe. LNS OS collects the platform fee via
application_fee_amount on each charge.

---

## A3. PAYMENT PROVIDER ARCHITECTURE

LNS OS integrates five payment providers simultaneously.
Each serves a different use case. The parent-facing checkout
presents all available options and the parent chooses.

```
PROVIDER 1 — Stripe
  Use cases: Card payments (Visa, Mastercard, Amex)
             Apple Pay, Google Pay (via Stripe Payment Element)
             Subscription billing (school fees on instalment)
             Stripe Connect for school payouts
  SDK: @stripe/stripe-js + stripe (server-side)
  Environment vars: STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY,
                    STRIPE_WEBHOOK_SECRET, STRIPE_PLATFORM_ACCOUNT_ID

PROVIDER 2 — PayPal
  Use cases: PayPal wallet payments, PayPal Credit
             Familiar to parents who distrust card entry on school sites
  SDK: @paypal/react-paypal-js
  Environment vars: PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET,
                    PAYPAL_WEBHOOK_ID

PROVIDER 3 — GoCardless
  Use cases: Bank-to-bank Direct Debit (UK/EU/AU)
             Recurring collections (school fees, instalment plans)
             Lower fees than cards for large recurring amounts
  SDK: gocardless-nodejs
  Environment vars: GOCARDLESS_ACCESS_TOKEN, GOCARDLESS_WEBHOOK_SECRET,
                    GOCARDLESS_ENVIRONMENT (sandbox/live)

PROVIDER 4 — School Wallet (Internal)
  Use cases: Pre-loaded wallet for canteen, small purchases
             Parents top up wallet via Stripe or PayPal
             Student's QR code used at canteen to deduct from wallet
             Low balance auto-alerts and auto-top-up option
  Implementation: Internal ledger in PostgreSQL + QLDB audit trail
  No external SDK — powered by internal balance management

PROVIDER 5 — Cash / Offline (Admin-Tracked)
  Use cases: Families without cards or bank accounts
             Cash collected at school gate
             Cheque payments
  Implementation: Admin marks payment as received in UI
                  Triggers same workflow as online payment
                  Admin's identity sealed as the confirming witness
                  Receipt generated and sent to parent
```

---

## A4. PAYMENT CATEGORIES — ALL EIGHT

```
CATEGORY 01 — School Trip and Excursion Fees
CATEGORY 02 — Annual / Termly / Monthly School Fees
CATEGORY 03 — Resource and Book Purchases (School Shop)
CATEGORY 04 — Canteen and Lunch Payments
CATEGORY 05 — After-School Clubs and Activities
CATEGORY 06 — Event Tickets
CATEGORY 07 — Fundraising and Donations
CATEGORY 08 — Penalty and Replacement Fees
```

Each category has its own workflow, refund policy rules,
notification templates, and reporting dimension.

---

## A5. PAYMENT STATUS LIFECYCLE

Every payment in LNS OS follows this lifecycle.
Status transitions are enforced at the application layer.

```
PENDING       → Payment initiated by parent but not yet confirmed
               (card entered, waiting for processor confirmation)

CONFIRMED     → Payment processor confirmed successful charge.
               Workflow triggers fire immediately.
               Blockchain seal initiated asynchronously.

FAILED        → Payment processor returned a failure.
               Parent notified. Retry option shown.
               No workflow triggers fired.

REFUND_PENDING → Refund initiated by admin. Awaiting processor.

REFUNDED      → Full refund processed. Workflow reversal triggers fire.
               Parent notified. Seat released if applicable.

PARTIAL_REFUND → Partial refund processed (e.g. cancellation fee retained)

DISPUTED      → Parent raised a chargeback with their bank.
               Payment frozen. Admin alerted. Evidence package assembled.

CASH_CONFIRMED → Admin manually confirmed cash receipt.
               Treated identically to CONFIRMED for workflow purposes.
               Admin identity recorded as witness.

INSTALMENT_ACTIVE → First instalment of a payment plan collected.
                   Subsequent instalments scheduled.

INSTALMENT_COMPLETE → All instalments in a plan have been collected.

INSTALMENT_FAILED → A scheduled instalment collection failed.
                   Admin and parent alerted immediately.
                   Grace period before escalation.

WRITTEN_OFF   → Admin has written off an outstanding payment as
               unrecoverable. Reason required. Sealed to blockchain.
```

---

---

# PART B — THE EIGHT PAYMENT CATEGORIES
## Workflow, Schema, and UI for Every Payment Type

---

## B1. CATEGORY 01 — SCHOOL TRIP AND EXCURSION FEES

**The flagship payment category. Most parents' first encounter with
the payment system. Must be flawless.**

### Trip Creation (Teacher/Admin)

```typescript
interface TripPaymentItem {
  id: string
  schoolId: string
  createdBy: string              // teacherId or adminId
  title: string                  // "Year 8 Science Museum Trip"
  description: string            // rich text, AI-drafted first
  destination: string
  tripDate: string
  returnTime: string
  cost: number                   // in minor currency units (pence/cents)
  currency: string               // 'GBP' | 'USD' | 'EUR' | 'ZAR' etc.
  maxStudents: number
  eligibleClassIds: string[]
  eligibleStudentIds: string[]   // if restricted to specific students
  paymentDeadline: string
  refundPolicy: {
    type: 'FULL' | 'PARTIAL' | 'NONE'
    cutoffDays: number           // days before trip date
    partialPercentage: number | null
    reason: string
  }
  consentRequired: boolean
  whatToBring: string[]          // AI-generated from description
  supervisingTeacherIds: string[]
  status: 'DRAFT' | 'OPEN' | 'CLOSED' | 'CANCELLED' | 'COMPLETED'
  siblingDiscount: boolean
  bursaryWaiver: boolean
}
```

### Trip Payment Workflow

```typescript
async function processTripPayment(
  paymentData: PaymentConfirmation,
  tripId: string,
  studentId: string,
  parentId: string
): Promise<TripPaymentResult> {

  // 1. Confirm payment with processor
  const payment = await confirmPayment(paymentData)
  if (payment.status !== 'CONFIRMED') throw new PaymentError(payment)

  // 2. Check seat availability (race condition safe — use DB transaction)
  const trip = await db.transaction(async (trx) => {
    const trip = await trx('trips').where({ id: tripId }).forUpdate().first()
    const confirmedCount = await trx('trip_registrations')
      .where({ tripId, status: 'CONFIRMED' }).count()

    if (confirmedCount >= trip.maxStudents) {
      // Add to waitlist instead
      await addToWaitlist(trx, tripId, studentId, parentId)
      throw new TripFullError()
    }

    // Confirm the seat
    await trx('trip_registrations').insert({
      tripId, studentId, parentId,
      status: 'CONFIRMED',
      paymentId: payment.id,
      confirmedAt: new Date().toISOString()
    })

    return trip
  })

  // 3. Generate consent record (sealed to blockchain)
  const consentRecord = await generateConsentRecord(trip, studentId, parentId, payment)

  // 4. Seal payment to blockchain
  await sealPaymentRecord({
    domain: 'PAYMENT',
    paymentId: payment.id,
    category: 'TRIP',
    tripId,
    studentId,
    parentId,
    amount: payment.amount,
    currency: payment.currency,
    method: payment.method,
    status: 'CONFIRMED',
    consentRecordHash: consentRecord.hash
  })

  // 5. Queue AI-drafted communications for teacher approval
  await queueTripConfirmationMessage(trip, studentId, parentId, payment)

  // 6. Update teacher's trip dashboard in real time
  await broadcastTripUpdate(tripId, {
    type: 'SEAT_CONFIRMED',
    studentId,
    confirmedCount: trip.confirmedCount + 1
  })

  // 7. Generate receipt
  const receipt = await generatePaymentReceipt(payment, trip, studentId)

  return { payment, consentRecord, receipt, seatConfirmed: true }
}
```

### Trip Dashboard (Teacher View)
```
┌─────────────────────────────────────────────────────────────────┐
│  Science Museum Trip — 15 May 2026                              │
│  £24.00 per student · Deadline: 10 May · Max: 30               │
├──────────────────────────────────┬──────────────────────────────┤
│  CONFIRMED (18)           £432   │  OUTSTANDING (8)     £192    │
│  ████████████████░░░░  60%       │                              │
├──────────────────────────────────┴──────────────────────────────┤
│  Student          Status        Paid        Consent   QR Ticket │
│  Amara Johnson    ✓ Confirmed   £24.00 ✓   ✓         [QR]      │
│  Blake Nkosi      ✓ Confirmed   £24.00 ✓   ✓         [QR]      │
│  David Moyo       ⏳ Pending    —           —         —         │
│  Elena Petrov     ⚠ Overdue    —           —         —         │
├──────────────────────────────────────────────────────────────────┤
│  [Send Reminder to Unpaid ▾]  [Export List]  [Cancel Trip]      │
│  AI Draft Ready: 3 reminder messages queued for your approval   │
└──────────────────────────────────────────────────────────────────┘
```

### QR Ticket on Trip Day
Each confirmed student has a QR ticket generated.
Teacher or supervisor scans it at the bus — marks student as boarded.
Not just paid — physically present and on the bus.
This creates a safety record: exactly who boarded, at what time.
Sealed to blockchain.

---

## B2. CATEGORY 02 — SCHOOL FEES (RECURRING)

**The highest-value payment category. Demands the most flexibility,
the most transparency, and the most robust failure handling.**

### Fee Schedule Configuration

```typescript
interface SchoolFeeSchedule {
  id: string
  schoolId: string
  academicYear: string
  studentId: string
  feeStructure: {
    label: string              // "Tuition Fee — Term 1"
    amount: number
    dueDate: string
    gracePeriodDays: number
    lateFeeAmount: number | null
    lateFeeType: 'FIXED' | 'PERCENTAGE' | null
  }[]
  paymentPlan: {
    type: 'ANNUAL' | 'TERMLY' | 'MONTHLY' | 'CUSTOM'
    instalments: {
      amount: number
      dueDate: string
      collectionMethod: 'DIRECT_DEBIT' | 'CARD' | 'BANK_TRANSFER' | 'WALLET'
    }[]
  }
  bursaryApplied: boolean
  bursaryPercentage: number | null
  siblingDiscountApplied: boolean
  siblingDiscountAmount: number | null
  totalDue: number
  totalPaid: number
  outstanding: number
  status: 'CURRENT' | 'OVERDUE' | 'PAID_IN_FULL' | 'PAYMENT_PLAN_ACTIVE'
}
```

### Late Payment Handling
```typescript
async function handleLatePayment(scheduleId: string) {
  const schedule = await getSchedule(scheduleId)
  const daysPastDue = getDaysPastDue(schedule.currentInstalment.dueDate)

  if (daysPastDue === 1) {
    // Day 1: AI drafts gentle reminder to parent
    await queueForApproval({
      type: 'PAYMENT_REMINDER_GENTLE',
      scheduleId,
      daysOverdue: 1
    })
  }

  if (daysPastDue === 7) {
    // Day 7: AI drafts firmer reminder + payment plan suggestion
    await queueForApproval({
      type: 'PAYMENT_REMINDER_FIRM',
      scheduleId,
      daysOverdue: 7,
      includePaymentPlanOffer: true
    })
  }

  if (daysPastDue === 14) {
    // Day 14: Escalate to admin. AI drafts formal notice.
    await escalateToAdmin(scheduleId)
    await queueForApproval({
      type: 'PAYMENT_FORMAL_NOTICE',
      scheduleId,
      daysOverdue: 14,
      requiresAdminApproval: true
    })
  }

  if (daysPastDue === 30) {
    // Day 30: Flag on student's admin profile. AI drafts final notice.
    await flagStudentAccount(schedule.studentId, 'PAYMENT_CRITICAL')
    await queueForApproval({
      type: 'PAYMENT_FINAL_NOTICE',
      scheduleId,
      daysOverdue: 30
    })
  }
}
```

### Parent Fee Dashboard
```
┌─────────────────────────────────────────────────────────────────┐
│  Amara Johnson — 2025/26 Academic Year                          │
│  Total Due: £4,800  ·  Paid: £3,600  ·  Outstanding: £1,200    │
│  ███████████████████████░░░░░ 75% paid                          │
├──────────────────────────────────────────────────────────────────┤
│  PAYMENT SCHEDULE                                               │
│  Term 1 Tuition    £1,600    Sep 2025    ✓ PAID    Receipt ↓   │
│  Term 2 Tuition    £1,600    Jan 2026    ✓ PAID    Receipt ↓   │
│  Term 3 Tuition    £1,600    Apr 2026    ⏳ DUE 30 Apr          │
├──────────────────────────────────────────────────────────────────┤
│  [Pay £1,600 Now]  [Set Up Payment Plan]  [Contact Bursar]     │
│                                                                 │
│  Payment plan available: 3 × £534/month via Direct Debit       │
│  [Set Up Direct Debit — GoCardless]                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## B3. CATEGORY 03 — SCHOOL SHOP (RESOURCES AND BOOKS)

**A native e-commerce experience. Not a link to an external store.**

### Product Catalogue Schema

```typescript
interface ShopProduct {
  id: string
  schoolId: string
  name: string
  description: string
  category: 'TEXTBOOK' | 'STATIONERY' | 'UNIFORM' | 'SPORTS_KIT' |
            'ART_SUPPLIES' | 'DIGITAL_RESOURCE' | 'OTHER'
  price: number
  currency: string
  stockQuantity: number | null    // null = unlimited (digital resources)
  images: string[]
  variants: {                     // for uniforms: size options
    id: string
    label: string                 // "Age 11-12" / "Small" / "Blue"
    stockQuantity: number
    priceAdjustment: number       // 0 for same price, positive for more
  }[] | null
  eligibleYearGroups: string[]   // which year groups can purchase
  requiredFor: string | null     // "Grade 8A — Mathematics" if class-specific
  availableFrom: string
  availableTo: string | null
  fulfillmentMethod: 'COLLECTION' | 'DELIVERY' | 'DIGITAL_DOWNLOAD'
  isActive: boolean
}
```

### Order Workflow

```
Parent adds to cart
  → Cart persists across sessions (saved server-side)
  → Checkout: review items + choose payment method
  → Payment confirmed
  → Order record created + sealed to blockchain
  → Stock decremented (atomic transaction)
  → Parent: order confirmation + collection instructions or delivery tracking
  → Admin: new order in fulfilment queue
  → If collection: unique QR collection code generated
  → If digital: download link generated (time-limited, one-use)
  → Admin marks as collected/delivered → parent notified
  → AI drafts confirmation message queued for approval
```

### AI Integration in School Shop

```
When a new class list or term starts:
  → AI analyses what resources each class needs based on teacher's unit plans
  → AI drafts a "Recommended Items for Next Term" message per parent
  → Teacher reviews and approves
  → Message sent with direct links to each item in the shop
  → Parents are not hunting — they are guided

When stock is low:
  → Admin is alerted
  → AI drafts a "Last few remaining" message to parents who haven't ordered
  → Admin approves and sends
```

---

## B4. CATEGORY 04 — CANTEEN AND LUNCH PAYMENTS

**The highest frequency payment category. Must be instant, frictionless,
and work offline (canteen may have poor WiFi).**

### Canteen Wallet System

Each student has a canteen wallet — a balance stored in the system.
The wallet is funded by the parent. The student's QR code is their
payment method at the canteen counter.

```typescript
interface CanteenWallet {
  studentId: string
  schoolId: string
  balance: number                // in minor currency units
  currency: string
  autoTopUp: {
    enabled: boolean
    triggerBalance: number       // auto-top-up when below this amount
    topUpAmount: number          // add this amount automatically
    paymentMethodId: string      // saved Stripe payment method
  }
  lowBalanceAlert: {
    enabled: boolean
    threshold: number            // alert parent when below this
  }
  dietaryPreferences: string[]   // 'VEGETARIAN' | 'HALAL' | 'KOSHER' | 'NUT_FREE' etc.
  allergens: string[]
  dailySpendLimit: number | null // optional cap set by parent
}
```

### Canteen Scan and Deduct Flow

```typescript
async function processCanteenPayment(
  studentQRData: string,
  items: CanteenItem[],
  cashierId: string
): Promise<CanteenPaymentResult> {

  // Verify QR
  const student = await verifyStudentQR(studentQRData)
  if (!student.valid) return { success: false, reason: 'INVALID_QR' }

  const totalAmount = items.reduce((sum, item) => sum + item.price, 0)

  // Check allergens against student profile
  const allergenWarnings = checkAllergenConflicts(items, student.allergens)
  if (allergenWarnings.length > 0) {
    // Alert cashier — do not block sale but log the warning
    await logAllergenWarning(student.studentId, items, allergenWarnings)
  }

  // Check daily spend limit
  const todaySpend = await getTodaySpend(student.studentId)
  if (student.dailySpendLimit && (todaySpend + totalAmount) > student.dailySpendLimit) {
    return { success: false, reason: 'DAILY_LIMIT_EXCEEDED', limit: student.dailySpendLimit }
  }

  // Check balance
  if (student.walletBalance < totalAmount) {
    // Check if auto-top-up is enabled
    if (student.autoTopUp.enabled) {
      await triggerAutoTopUp(student.studentId)
    }
    // If still insufficient, decline
    const newBalance = await getBalance(student.studentId)
    if (newBalance < totalAmount) {
      // Alert parent immediately
      await queueLowBalanceAlert(student.studentId, newBalance)
      return { success: false, reason: 'INSUFFICIENT_BALANCE', balance: newBalance }
    }
  }

  // Deduct from wallet (atomic)
  await db.transaction(async (trx) => {
    await trx('canteen_wallets')
      .where({ studentId: student.studentId })
      .decrement('balance', totalAmount)

    await trx('canteen_transactions').insert({
      studentId: student.studentId,
      cashierId,
      items: JSON.stringify(items),
      totalAmount,
      balanceBefore: student.walletBalance,
      balanceAfter: student.walletBalance - totalAmount,
      processedAt: new Date().toISOString()
    })
  })

  // Check if balance is now low — alert parent if threshold crossed
  const newBalance = student.walletBalance - totalAmount
  if (newBalance < student.lowBalanceAlert.threshold) {
    await queueLowBalanceAlert(student.studentId, newBalance)
  }

  // Seal to blockchain (async — canteen speed is critical)
  sealCanteenTransaction(student.studentId, items, totalAmount).catch(console.error)

  return { success: true, newBalance, receipt: generateCanteenReceipt(items, totalAmount) }
}
```

### Offline Mode for Canteen
When the canteen device loses internet connection:
- Transactions are queued locally in a service worker store
- Student QR verification falls back to a cached student list (updated nightly)
- Transactions sync when connection restores
- Blockchain sealing happens post-sync
- Parent is notified of the transaction when sync completes

---

## B5. CATEGORY 05 — AFTER-SCHOOL CLUBS AND ACTIVITIES

### Club Registration and Payment

```typescript
interface ClubPaymentItem {
  id: string
  schoolId: string
  name: string                   // "Chess Club — Spring Term"
  description: string
  supervisorId: string
  schedule: {
    dayOfWeek: string
    startTime: string
    endTime: string
  }[]
  term: string
  maxStudents: number
  waitlistEnabled: boolean
  pricing: {
    type: 'PER_TERM' | 'PER_SESSION' | 'FREE'
    amount: number
    currency: string
  }
  eligibleYearGroups: string[]
  status: 'OPEN' | 'FULL' | 'WAITLIST' | 'CLOSED' | 'CANCELLED'
}
```

When a club reaches capacity:
- New registrations go to waitlist automatically
- Waitlist position shown to parent ("You are position 3 of 5")
- When a place opens (student withdraws), next on waitlist is notified
- AI drafts the notification — admin approves with one tap
- Waitlisted parent has 48 hours to pay before the place goes to next person

---

## B6. CATEGORY 06 — EVENT TICKETS

### Ticketing System

```typescript
interface EventTicket {
  id: string
  eventId: string
  purchasedBy: string            // parentId
  attendeeType: 'STUDENT' | 'PARENT' | 'GUARDIAN' | 'GUEST'
  attendeeName: string
  seatReference: string | null   // if the venue has assigned seating
  qrCode: string                 // unique QR for entry scanning
  purchasedAt: string
  price: number
  currency: string
  status: 'VALID' | 'USED' | 'CANCELLED' | 'TRANSFERRED'
  usedAt: string | null
  usedBy: string | null          // staffId who scanned it at the door
}
```

### Door Scanning
At the event entrance, a staff member uses the LNS OS app in kiosk mode:
- Camera scans the parent's QR ticket
- System confirms: VALID ✓ or ALREADY USED ✗ or CANCELLED ✗
- Ticket marked as USED with timestamp and scanner's ID
- This creates an attendance record for the event
- Sealed to blockchain

---

## B7. CATEGORY 07 — FUNDRAISING AND DONATIONS

### Campaign Schema

```typescript
interface FundraisingCampaign {
  id: string
  schoolId: string
  title: string
  description: string
  goalAmount: number
  currency: string
  startDate: string
  endDate: string
  category: 'EQUIPMENT' | 'SCHOLARSHIP' | 'BUILDING' | 'PROGRAMME' | 'EMERGENCY'
  giftAidEligible: boolean       // UK Gift Aid — 25% tax reclaim on eligible donations
  isAnonymousDonationAllowed: boolean
  updates: {
    date: string
    content: string              // AI-drafted progress updates, admin-approved
  }[]
  totalRaised: number
  donorCount: number
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
}
```

### Gift Aid (UK Schools)
When a UK parent donates and confirms they are a UK taxpayer:
- System records their Gift Aid declaration (sealed to blockchain — it is a legal document)
- HMRC can reclaim 25% of the donation value
- End of tax year: AI generates the Gift Aid claim report
- Admin reviews and submits to HMRC

### Public Progress Display
Campaigns have a public-facing page (no login required) showing:
- Campaign title and goal
- Progress bar (amount raised / goal)
- Number of donors (names hidden if anonymous donation enabled)
- Recent updates (admin-approved AI drafts)
- Donate button

---

## B8. CATEGORY 08 — PENALTY AND REPLACEMENT FEES

### Penalty Fee Creation (Admin)

```typescript
interface PenaltyFee {
  id: string
  schoolId: string
  studentId: string
  issuedBy: string               // adminId
  issuedAt: string
  category: 'LOST_BOOK' | 'DAMAGED_EQUIPMENT' | 'LOST_UNIFORM' |
            'LIBRARY_OVERDUE' | 'FACILITY_DAMAGE' | 'OTHER'
  description: string
  amount: number
  currency: string
  evidenceDocumentIds: string[]  // photos, incident reports
  dueDate: string
  status: 'OUTSTANDING' | 'PAID' | 'WAIVED' | 'DISPUTED'
  waivedBy: string | null
  waivedReason: string | null
}
```

When a penalty fee is issued:
- AI drafts the parent notification (admin approves before sending)
- Parent sees it on their dashboard with a "Pay Now" button
- Parent can raise a dispute (triggers a review workflow)
- If disputed, admin is notified to review with evidence

---

---

# PART C — THE CHECKOUT EXPERIENCE
## What Every Parent Sees When They Pay

---

## C1. THE PAYMENT FLOW — STEP BY STEP

### Step 1 — Payment Item Discovery

Parents discover payment items from three places:
1. **Notification in their portal** — AI-drafted message with embedded "Pay Now" button
2. **Payments section of parent dashboard** — all outstanding payments listed
3. **Child's profile** — payments related to a specific child

### Step 2 — Payment Detail Page

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back                                                         │
│                                                                 │
│  Science Museum Trip                                            │
│  For: Amara Johnson · Grade 8A                                  │
│                                                                 │
│  📍 Natural History Museum, London                              │
│  📅 Wednesday 15 May 2026                                       │
│  🕘 Depart 08:30 · Return 16:00                                │
│                                                                 │
│  What to bring:                                                 │
│  · Packed lunch and snacks                                      │
│  · Comfortable walking shoes                                    │
│  · Weather-appropriate clothing                                 │
│  · Notebook and pen                                             │
│                                                                 │
│  ─────────────────────────────────────────────────             │
│  Trip fee                              £24.00                   │
│  Sibling discount (10%)               -£2.40                   │
│  ─────────────────────────────────────────────────             │
│  Total due                            £21.60                   │
│                                                                 │
│  Refund policy: Full refund if cancelled before 10 May         │
│  Payment deadline: 10 May 2026 (5 days remaining)              │
│                                                                 │
│  [Continue to Payment →]                                        │
└─────────────────────────────────────────────────────────────────┘
```

### Step 3 — Payment Method Selection

```
┌─────────────────────────────────────────────────────────────────┐
│  Choose Payment Method                         Total: £21.60    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  💳  Card (Visa, Mastercard, Amex)                  →  │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [Apple Pay logo]  Apple Pay                        →  │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [Google Pay logo]  Google Pay                      →  │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [PayPal logo]  PayPal                              →  │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🏦  Bank Transfer / Direct Debit                   →  │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  👛  School Wallet  Balance: £45.20                 →  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  🔒 Secured by Stripe · Your card details are never stored     │
│     on LNS OS servers.                                          │
└─────────────────────────────────────────────────────────────────┘
```

### Step 4 — Payment Processing

- Apple Pay / Google Pay: single biometric confirmation — zero extra steps
- Card: Stripe Payment Element (PCI-compliant hosted fields — card data never touches LNS OS servers)
- PayPal: redirects to PayPal, returns to confirmation page
- GoCardless: bank authorisation flow, returns to confirmation page
- Wallet: instant deduction — no extra steps

### Step 5 — Confirmation Screen

```
┌─────────────────────────────────────────────────────────────────┐
│                         ✓                                       │
│                Payment Confirmed                                 │
│                                                                 │
│  Amara Johnson's place on the Science Museum Trip               │
│  has been confirmed.                                            │
│                                                                 │
│  Amount paid:    £21.60                                         │
│  Payment method: Visa ending 4242                               │
│  Date:           13 April 2026, 09:14                           │
│  Receipt ID:     LNS-2026-00847                                 │
│                                                                 │
│  🔗 Record sealed to blockchain: a3f8...9c2d                    │
│                                                                 │
│  [Download Receipt]  [View Trip Details]                        │
│                                                                 │
│  A confirmation has been sent to your email.                    │
│  Your child's QR trip ticket is now available in their          │
│  student portal.                                                │
└─────────────────────────────────────────────────────────────────┘
```

---

---

# PART D — FINANCIAL ANALYTICS

---

## D1. ADMIN FINANCIAL DASHBOARD

### Real-Time Financial Overview
```
┌─────────────────────────────────────────────────────────────────┐
│  Financial Overview — Spring Term 2026          [Export ▾]      │
├───────────────┬───────────────┬───────────────┬─────────────────┤
│  Total Billed │ Total Collected│  Outstanding  │  Collection Rate│
│  £142,400     │  £134,180      │  £8,220       │  94.2%          │
│  ↑ vs last    │  ↑ vs last    │  ↓ vs last    │  ↑ vs last term │
│  term         │  term         │  term         │                 │
├───────────────┴───────────────┴───────────────┴─────────────────┤
│  BY CATEGORY           Billed    Collected    Outstanding        │
│  School Fees          £120,000   £115,200     £4,800            │
│  Trips                £8,400     £8,160       £240              │
│  School Shop          £6,200     £6,020       £180              │
│  Clubs                £4,800     £4,800       £0    ✓ CLEAR     │
│  Events               £2,000     £0           £2,000   UPCOMING │
│  Canteen              £1,000     £1,000       £0    ✓ CLEAR     │
├──────────────────────────────────────────────────────────────────┤
│  ⚠ AI FLAG: 14 families have 2+ outstanding payment items.      │
│  7 have not responded to the last reminder. Escalation advised. │
│  [View Families]  [Approve Escalation Messages ▸]               │
└──────────────────────────────────────────────────────────────────┘
```

### Outstanding Payments by Family
```
┌─────────────────────────────────────────────────────────────────┐
│  Outstanding Payments — 14 Families            [Export CSV]     │
│                                                                 │
│  Family            Children  Outstanding  Last Contact  Action  │
│  Johnson, P.       Amara     £1,200       12 Apr        [▾]    │
│  Nkosi, B.         Blake     £240         8 Apr         [▾]    │
│  Petrov, K.        Elena     £2,440  ⚠    Never         [▾]    │
│                                                                 │
│  ⚠ Petrov family has never been contacted. AI has drafted      │
│    an initial outreach message. [Review & Approve]              │
└─────────────────────────────────────────────────────────────────┘
```

---

## D2. PARENT PAYMENT HISTORY

```
┌─────────────────────────────────────────────────────────────────┐
│  Payment History — Amara Johnson           [Annual Statement ↓] │
│                                                                 │
│  Apr 2026  School Trip — Science Museum    £21.60  ✓  Receipt  │
│  Mar 2026  Term 3 School Fee              £1,600   ✓  Receipt  │
│  Mar 2026  School Shop — 3 textbooks       £42.00  ✓  Receipt  │
│  Feb 2026  Chess Club — Spring Term        £48.00  ✓  Receipt  │
│  Jan 2026  Term 2 School Fee              £1,600   ✓  Receipt  │
│  Jan 2026  Graduation Ticket × 2          £20.00  ✓  Receipt  │
│  ─────────────────────────────────────                         │
│  2025/26 Total paid                       £3,331.60            │
│                                                                 │
│  🔗 All records sealed to blockchain · [Verify any record]     │
└─────────────────────────────────────────────────────────────────┘
```

---

---

# PART E — BLOCKCHAIN IN PAYMENTS

---

## E1. PAYMENT BLOCKCHAIN RECORD SCHEMA

```typescript
interface PaymentBlockchainRecord {
  domain: 'PAYMENT'
  recordId: string
  schoolId: string
  paymentId: string              // Stripe / PayPal / GoCardless reference
  category: PaymentCategory
  entityId: string               // tripId / feeScheduleId / productId / etc.
  studentId: string
  parentId: string
  amount: number                 // always in minor units
  currency: string
  exchangeRate: number | null    // if currency conversion applied
  method: 'STRIPE_CARD' | 'STRIPE_APPLE_PAY' | 'STRIPE_GOOGLE_PAY' |
          'PAYPAL' | 'GOCARDLESS' | 'WALLET' | 'CASH_ADMIN'
  processorReference: string     // the external payment processor's ID
  status: PaymentStatus
  platformFeeAmount: number      // LNS OS platform fee in minor units
  processorFeeAmount: number     // Stripe/PayPal/GoCardless fee
  schoolNetAmount: number        // what the school actually receives
  instalmentNumber: number | null  // 1 of 3, 2 of 3, etc.
  totalInstalments: number | null
  authorisedBy: string           // parentId for online, adminId for cash
  authorisedAt: string
  confirmedAt: string
  refundRecordId: string | null
  receiptNumber: string          // human-readable: LNS-2026-00847
}
```

## E2. WHAT GETS SEALED AND WHEN

| Event | Sealed | Timing |
|---|---|---|
| Payment confirmed | PAYMENT record | Async, immediately after confirmation |
| Refund processed | REFUND record linked to PAYMENT | Async, immediately after refund |
| Cash payment recorded by admin | PAYMENT record with adminId as witness | Synchronous |
| Instalment collected | INSTALMENT record linked to SCHEDULE | Async |
| Penalty fee issued | PENALTY record | Synchronous on issue |
| Penalty fee waived | WAIVER record linked to PENALTY | Synchronous on waive |
| Gift Aid declaration | GIFT_AID record | Synchronous on declaration |
| Annual fee statement generated | STATEMENT record | Async on generation |

## E3. RECEIPT AS A VERIFIABLE DOCUMENT

Every receipt generated by LNS OS includes:
- A QR code linking to a verification page
- The blockchain record hash (truncated for readability)
- A statement: "This receipt is sealed to the LNS OS blockchain ledger.
  Verify its authenticity at verify.lnsos.app/receipt/[receiptId]"

The receipt verification page (public, no login required):
- Shows: VERIFIED ✓ or TAMPERED / NOT FOUND ✗
- Displays: amount, date, student name, category, school name
- Does NOT display: payment method details, parent's full name

---

---

# PART F — AI IN PAYMENTS

---

## F1. AI-GENERATED COMMUNICATIONS — PAYMENT CATEGORY

All payment-related communications follow the same AI-first, human-approves pattern
established in AI_ARCHITECTURE.md. Below are the specific triggers and prompts
for each payment communication type.

### Trip Announcement
```
Trigger: Teacher publishes a trip
AI drafts: Full trip announcement for parents
Tone: Excited, informative, practical
Includes: Trip details, what to bring list (AI-generated from description),
          cost, deadline, direct Pay button
Approves: Teacher (1-tap)
```

### Payment Reminder (Gentle — Day 1)
```
Trigger: Payment overdue by 1 day
AI drafts: Friendly reminder with direct Pay button
Tone: Warm, assuming positive intent, no accusation
Maximum length: 3 sentences
Approves: Admin (1-tap)
```

### Payment Reminder (Firm — Day 7)
```
Trigger: Payment overdue by 7 days
AI drafts: Firmer reminder + payment plan offer
Tone: Professional, clear about deadline
Includes: Outstanding amount, deadline, payment plan option
Approves: Admin (1-tap)
```

### Low Wallet Balance Alert
```
Trigger: Canteen wallet balance below threshold
AI drafts: Simple alert with top-up button
Tone: Practical, brief
Approves: Auto-send (this is the only payment communication
          that can auto-send without human approval — it is
          purely informational and time-sensitive)
Exception justification: A parent whose child cannot buy lunch
          because the alert was delayed in an approval queue
          is a worse outcome than the auto-send risk.
```

### Refund Confirmation
```
Trigger: Refund processed
AI drafts: Refund confirmation with amount and timeline
Tone: Apologetic if trip cancelled, neutral if parent requested
Approves: Admin (1-tap)
```

### Financial Summary (Weekly — Admin)
```
Trigger: Every Monday 07:00
AI drafts: Weekly financial digest for admin
Includes: Collection rate, outstanding count, new payments this week,
          families flagged for escalation, category breakdown
Approves: Admin (1-tap before it appears on dashboard — not sent externally)
```

### Annual Statement
```
Trigger: End of academic year
AI drafts: Annual statement cover letter for each family
Includes: Total paid, breakdown by category, thank you message
Approves: Admin (batch approve for all families)
```

---

---

# PART G — DEVELOPER RULES AND CHECKLIST

---

## G1. PAYMENT SECURITY RULES — NON-NEGOTIABLE

1. **Card data never touches LNS OS servers.**
   Use Stripe Payment Element (hosted fields). The card number, CVV, and
   expiry are submitted directly to Stripe's servers. LNS OS receives
   only a payment method token.

2. **PCI DSS compliance is Stripe's responsibility, not ours,
   as long as we use hosted fields.** Do not build custom card input fields.
   Ever. Under any circumstances.

3. **Idempotency keys on every Stripe charge.**
   Prevents double-charging if a network request is retried.
   ```typescript
   const charge = await stripe.paymentIntents.create({
     amount,
     currency,
     idempotencyKey: `${parentId}-${paymentItemId}-${Date.now()}`
   })
   ```

4. **Webhook signature verification on every Stripe/PayPal webhook.**
   Never trust a webhook payload without verifying the signature.
   ```typescript
   const event = stripe.webhooks.constructEvent(
     rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET
   )
   ```

5. **All payment amounts stored and processed in minor currency units.**
   £24.00 is stored as 2400. This eliminates floating point errors.
   Never store amounts as floats.

6. **Refunds require admin authorisation.**
   No code path allows a refund without an admin user's confirmed action.
   Refund amount is validated against the original payment amount.
   Partial refunds require a reason field.

7. **Stripe Connect — never move money between connected accounts.**
   Only charge to a connected account and collect a platform fee.
   Never transfer from one school's account to another.

## G2. EVERY PAYMENT PAGE CHECKLIST

```
BEFORE BUILDING:
[ ] Payment provider credentials in environment variables (never in code)
[ ] Stripe webhook endpoint registered and signature verification implemented
[ ] Idempotency keys implemented on all charge creation calls
[ ] Database transaction used for seat/stock confirmation (race condition safe)

UI REQUIREMENTS:
[ ] All payment methods displayed and functional
[ ] Payment method icons are official brand assets (not custom icons)
[ ] "Secured by Stripe" trust badge visible at checkout
[ ] Price displayed in correct currency with symbol (£ not GBP)
[ ] Sibling discounts and bursaries automatically applied and shown
[ ] Refund policy clearly displayed before payment is made
[ ] Loading state shown during payment processing (button disabled, spinner)
[ ] Error state handles: card declined, insufficient funds, network error
[ ] Success state shows receipt number and blockchain seal confirmation

POST-PAYMENT:
[ ] Workflow triggers fire correctly for this payment category
[ ] Blockchain seal initiated asynchronously
[ ] Receipt generated with correct receipt number and blockchain reference
[ ] AI communication drafted and queued for approval
[ ] Parent payment history updated immediately
[ ] Admin financial dashboard updated in real time

REFUNDS:
[ ] Refund requires admin authorisation
[ ] Refund amount validated against original payment
[ ] Refund reason required
[ ] Refund sealed to blockchain
[ ] Parent notified via AI-drafted message (admin approved)
[ ] Workflow reversal triggered (seat released, stock restocked)

TESTING:
[ ] Tested with Stripe test cards (success, decline, insufficient funds)
[ ] Tested PayPal sandbox
[ ] Tested GoCardless sandbox
[ ] Tested wallet deduction with insufficient balance
[ ] Tested cash payment admin flow
[ ] Tested instalment plan creation and collection
[ ] Tested concurrent payments (two parents paying for last seat simultaneously)
[ ] Tested offline canteen flow with sync on reconnect
```

---

# SUMMARY — THE COMMAND TO EVERY DEVELOPER

Payments in LNS OS are not a feature.
They are a trust interface between a family and a school.

Every payment a parent makes is a decision made with confidence
because they can see exactly what they are paying for, exactly
what it enables for their child, exactly what the refund policy
is, and exactly what they paid — now and in the future — because
every record is sealed and verifiable forever.

Every pence, cent, and rand that flows through this platform
is accounted for, communicated, and immutable.
No payment falls through the cracks.
No parent is surprised by a charge.
No school loses money to disputes they cannot evidence.
No treasurer spends hours reconciling spreadsheets.

The AI does the communication.
The blockchain does the accounting.
The human does the approving.

Build it that way. At every corner.

---

**Document version:** 1.0
**Last updated:** April 2026
**Owner:** LNS OS Development Team
**Companion documents:**
  AI_ARCHITECTURE.md
  BLOCKCHAIN_ARCHITECTURE.md
  MOBILE_DESIGN_SYSTEM.md
  TABLET_DESIGN_SYSTEM.md
  ROUTE_COMPLETION_PROMPT.md
**Supersedes:** Any previous payment implementation guidance
