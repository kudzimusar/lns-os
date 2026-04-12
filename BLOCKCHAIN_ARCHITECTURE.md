# LNS OS — Blockchain Architecture
## Complete Developer Implementation Guide
## Version 1.0 | Foundation Document | Mandatory Reading Before Any Blockchain Work

---

> "What has been recorded cannot be undone.
>  What has been corrected is recorded too.
>  Honesty is not the absence of mistakes —
>  it is the presence of an unalterable truth trail."
>  — LNS OS Blockchain Philosophy

---

# PART A — KNOWLEDGE BASE
## What Every Developer Must Understand Before Writing One Line of Blockchain Code

---

## A1. THE MENTAL MODEL — WHY BLOCKCHAIN IN A SCHOOL

A school is a trust institution. Parents trust it with their children.
Students trust it with their futures. Governments trust it with public funds.
Universities trust it with admissions decisions. Employers trust it with
hiring decisions based on credentials it issues.

Every one of those trust relationships depends on one thing:
**the integrity of records.**

And yet, in most schools today, records are:
- Stored in databases that any sufficiently privileged administrator can edit silently
- Exported to Excel files that anyone can alter
- Printed on paper certificates that can be forged in minutes
- Transmitted via email that can be disputed or denied

LNS OS fixes this at the foundation. Every record that matters is sealed
with a cryptographic hash the moment it is created. That hash is written
to a permanent ledger. No one — not the teacher, not the admin, not the
developer, not the CEO of LNS OS — can change what was recorded without
the ledger showing exactly what changed, when, and who did it.

This is not a security feature. It is the institutional backbone.

---

## A2. THE RECOMMENDED BLOCKCHAIN APPROACH — HYBRID ARCHITECTURE

After evaluating all options against LNS OS's requirements (school-level
deployment, data privacy regulations, cost, performance, and the need for
publicly verifiable credentials), the recommended architecture is:

### HYBRID: Private Ledger + Public Anchoring

**Layer 1 — Private Ledger (Day-to-Day Operations)**
Technology: **AWS QLDB (Quantum Ledger Database)**

QLDB is a fully managed, immutable ledger database. It maintains a complete,
verifiable history of all changes to data. It is cryptographically verifiable
without the complexity of running blockchain nodes. It is GDPR-compliant
because data stays within defined regions. It costs fractions of a cent per
transaction. It handles thousands of writes per second.

Use QLDB for: attendance records, grades, behaviour logs, messages,
document uploads, AI approval chains, consent records, policy changes.

Every record in QLDB gets a SHA-256 hash. QLDB maintains a Merkle tree
of all hashes — making it mathematically impossible to alter any record
without breaking the tree. The school controls this layer entirely.

**Layer 2 — Public Anchoring (Credentials and Passports)**
Technology: **Polygon (Ethereum-compatible, low gas fees)**

For records that must be verifiable by third parties who have no access
to the school's private ledger — universities, employers, other schools —
a compressed Merkle root is periodically anchored to the Polygon blockchain.

This means: a university admissions officer can scan a QR code on a
Student Passport and verify its authenticity against the public chain,
without ever accessing the school's private systems.

Anchoring happens: daily for report cards and credentials.
             Weekly for attendance and grade summaries.
             Immediately for individual student passports on issuance.

**Why not fully public blockchain?**
Student data is protected under GDPR, COPPA, and POPIA. Putting raw
student records on a public blockchain would be illegal in most
jurisdictions. The hybrid approach keeps sensitive data private while
making credential verification publicly accessible.

**Why not fully private?**
A private chain is only as trustworthy as the institution running it.
If LNS OS wants its credentials to be accepted by universities and
employers who have no relationship with LNS OS, those credentials must
be verifiable against a chain that no single party controls.

The hybrid model gives schools privacy and gives credentials credibility.

---

## A3. THE TWELVE BLOCKCHAIN DOMAINS

Blockchain applies to exactly twelve domains in LNS OS.
Outside these domains, use standard database storage.
Do not over-blockchain — it adds latency and cost without benefit.

```
DOMAIN 01 — Attendance Records
DOMAIN 02 — Grades and Assessment Scores
DOMAIN 03 — Report Cards
DOMAIN 04 — Behaviour and Disciplinary Records
DOMAIN 05 — Document Submissions (assignments, certificates, IEPs)
DOMAIN 06 — Communication Records (parent-teacher messages and alerts)
DOMAIN 07 — QR Identity Signatures
DOMAIN 08 — AI Approval Chain
DOMAIN 09 — Student Enrollment and Identity
DOMAIN 10 — Staff Credentials and Assignments
DOMAIN 11 — School Policy and Calendar Changes
DOMAIN 12 — Student Achievement Passport and Micro-Credentials
```

Each domain has its own record schema, hash strategy, and UI representation.
All twelve are detailed in Part B.

---

## A4. THE CORRECTION PROTOCOL — IMMUTABILITY WITH HUMANITY

Blockchain records cannot be deleted. But errors happen. A teacher marks
the wrong student absent. A grade is entered incorrectly. This must be
handled without compromising the integrity of the chain.

**The Correction Protocol:**

```
ORIGINAL RECORD (stays on chain, never deleted)
  status: SUPERSEDED
  hash: abc123...
  ↓
CORRECTION RECORD (new record, linked to original)
  status: ACTIVE
  hash: def456...
  corrects: abc123...
  correctedBy: [teacher/admin ID]
  correctionReason: "Student was marked absent in error — was present"
  correctionApprovedBy: [admin ID]
  correctionTimestamp: 2026-04-12T09:14:00Z
```

The UI always shows the ACTIVE (corrected) record as the current truth.
But any user with audit access can see the full chain:
original entry → correction → who authorised it → when.

**The Correction Protocol requires admin approval for:**
- Grade corrections (cannot be done by teacher alone)
- Attendance corrections older than 48 hours
- Behaviour record amendments
- Identity record changes

**The Correction Protocol allows teacher self-correction for:**
- Attendance corrections within 2 hours of locking (same-day window)
- Comment edits before report card is published

**The Correction Protocol is itself blockchain-logged.**
You cannot make an unrecorded correction. The act of correcting
is as immutable as the original record.

---

## A5. THE HASH STRATEGY

Every blockchain record in LNS OS uses SHA-256 hashing.

**What gets hashed:**
The complete JSON record at the moment of finalization, including all
fields, formatted consistently (sorted keys, no whitespace variation).

```typescript
import { createHash } from 'crypto'

function hashRecord(record: BlockchainRecord): string {
  // Normalize: sort keys, remove whitespace
  const normalized = JSON.stringify(record, Object.keys(record).sort())
  return createHash('sha256').update(normalized).digest('hex')
}
```

**Hash verification:**
```typescript
function verifyRecord(record: BlockchainRecord, storedHash: string): boolean {
  const computed = hashRecord(record)
  return computed === storedHash
}
```

**The hash is:**
- Stored in QLDB alongside the record
- Displayed to users in the audit trail (truncated to first/last 8 chars for readability)
- Used as the reference ID for corrections and links
- Anchored to Polygon for credential records

---

## A6. RECORD STATUS LIFECYCLE

Every blockchain record in the system follows this lifecycle:

```
PENDING   → Record created in DB, hash being computed
SEALED    → Hash computed and written to QLDB. Record is now immutable.
ACTIVE    → Sealed record that is the current truth for this entity/event
SUPERSEDED → Sealed record that has been corrected. Not deleted. Still visible in audit.
ANCHORED  → Record's hash has been included in a Polygon anchor transaction
REVOKED   → Special status for credentials only (e.g. a certificate revoked due to
            discovered fraud). Revocation is itself a blockchain record.
```

Status transitions are enforced at the application layer.
No code path exists to delete a SEALED record.
No code path exists to move backwards in the lifecycle.

---

---

# PART B — THE TWELVE DOMAINS
## Schema, Implementation, and UI for Every Blockchain Domain

---

## B1. DOMAIN 01 — ATTENDANCE RECORDS

**Why blockchain:** Attendance has legal, financial, and welfare consequences.
Disputes between schools and parents are common. The QR timestamp is evidence.

**When sealed:** When teacher clicks "Lock Register" or register auto-locks
at period end. QR-based entries are sealed per-scan in real time.

**Record schema:**
```typescript
interface AttendanceRecord {
  domain: 'ATTENDANCE'
  recordId: string
  schoolId: string
  classId: string
  subjectId: string
  teacherId: string
  date: string                    // ISO 8601 date
  period: number
  entries: {
    studentId: string
    status: 'PRESENT' | 'ABSENT' | 'LATE'
    method: 'QR_SCAN' | 'MANUAL' | 'MANUAL_OVERRIDE'
    timestamp: string             // ISO 8601 datetime — exact scan time
    engagementLevel: 'L1' | 'L2' | 'L3' | 'L4' | null
    comment: string | null
  }[]
  lockedAt: string
  lockedBy: string                // teacherId
  powerScore: number              // percentage present at lock time
}
```

**Implementation:**
```typescript
async function lockAttendanceRegister(
  register: AttendanceRegister,
  teacherId: string
): Promise<SealedRecord> {

  const record: AttendanceRecord = {
    domain: 'ATTENDANCE',
    recordId: generateId(),
    schoolId: register.schoolId,
    classId: register.classId,
    subjectId: register.subjectId,
    teacherId,
    date: register.date,
    period: register.period,
    entries: register.entries,
    lockedAt: new Date().toISOString(),
    lockedBy: teacherId,
    powerScore: calculatePowerScore(register.entries)
  }

  const hash = hashRecord(record)

  // Write to QLDB
  await qldbDriver.executeLambda(async (txn) => {
    await txn.execute(
      'INSERT INTO AttendanceRecords VALUE ?',
      { ...record, hash, status: 'SEALED' }
    )
  })

  return { record, hash, status: 'SEALED' }
}
```

**UI — Lock confirmation toast:**
```tsx
<BlockchainSealToast
  message="Register locked and sealed"
  hash={sealedRecord.hash}
  timestamp={sealedRecord.record.lockedAt}
/>
```

**UI — Locked register view:**
- Shows padlock icon next to date/period header
- Hash shown truncated: `Sealed: a3f8...9c2d`
- "Verify" button: re-computes hash client-side and confirms match
- Correction only possible via admin-approved Correction Protocol

---

## B2. DOMAIN 02 — GRADES AND ASSESSMENT SCORES

**Why blockchain:** Grade manipulation is a real risk. Immutable grade
records protect students, teachers, and institutional integrity.

**When sealed:** When teacher clicks "Submit Grades" on an assessment.
Saves a draft state first — blockchain sealing only on explicit submit.

**Record schema:**
```typescript
interface GradeRecord {
  domain: 'GRADES'
  recordId: string
  schoolId: string
  assessmentId: string
  assessmentName: string
  subjectId: string
  teacherId: string
  classId: string
  term: string
  entries: {
    studentId: string
    rawScore: number
    maxScore: number
    percentage: number
    letterGrade: string
    mypBand: number | null
    citizenship: 'C+' | 'N' | 'F'
    teacherComment: string | null
    criteriaScores: {               // MYP criteria if applicable
      criterionId: string
      band: number
      descriptor: string
    }[] | null
  }[]
  weightedCategory: string
  categoryWeight: number
  submittedAt: string
  submittedBy: string
  releasedToStudents: boolean
  releasedAt: string | null
}
```

**Grade release is a separate sealed event:**
```typescript
interface GradeReleaseRecord {
  domain: 'GRADE_RELEASE'
  recordId: string
  gradeRecordId: string          // links to the grade record
  releasedBy: string
  releasedAt: string
  releaseMethod: 'MANUAL' | 'SCHEDULED'
}
```

**UI — Submitted grade row:**
```tsx
// In gradebook, submitted grades show sealed indicator
<td className="relative">
  <span className="font-mono text-sm">{entry.percentage}%</span>
  <SealedBadge hash={gradeRecord.hash} />  {/* small padlock icon */}
</td>
```

---

## B3. DOMAIN 03 — REPORT CARDS

**Why blockchain:** Report cards are legal credentials used for admissions
and employment. They must be verifiable by third parties indefinitely.

**When sealed:** When admin/teacher clicks "Publish Report Card."
This also triggers a Polygon anchor for this student's credential.

**Record schema:**
```typescript
interface ReportCardRecord {
  domain: 'REPORT_CARD'
  recordId: string
  schoolId: string
  studentId: string
  term: string
  academicYear: string
  publishedAt: string
  publishedBy: string
  subjects: {
    subjectId: string
    subjectName: string
    teacherId: string
    finalPercentage: number
    finalLetter: string
    finalMYPGrade: number | null
    citizenship: 'C+' | 'N' | 'F'
    teacherComment: string       // final version after human edit + approval
    aiDraftHash: string          // hash of original AI draft before human editing
    humanEditPercentage: number  // % of AI draft that was changed by human
  }[]
  overallGrade: number
  attendancePercentage: number
  citizenshipOverall: 'C+' | 'N' | 'F'
  principalComment: string | null
  polygonTxHash: string | null   // populated after Polygon anchoring
}
```

**Polygon anchoring:**
```typescript
async function anchorReportCardToPolygon(
  reportCardHash: string,
  studentId: string
): Promise<string> {

  // Connect to Polygon via ethers.js
  const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL)
  const wallet = new ethers.Wallet(process.env.ANCHOR_WALLET_PRIVATE_KEY, provider)
  const contract = new ethers.Contract(
    process.env.ANCHOR_CONTRACT_ADDRESS,
    ANCHOR_ABI,
    wallet
  )

  // Write the hash to the smart contract
  const tx = await contract.anchorCredential(
    reportCardHash,
    studentId,
    'REPORT_CARD',
    Math.floor(Date.now() / 1000)
  )

  await tx.wait()  // Wait for block confirmation
  return tx.hash   // The Polygon transaction hash
}
```

**Smart contract (Solidity — deployed to Polygon):**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LNSOSCredentialAnchor {
    struct Credential {
        string recordHash;
        string entityId;
        string credentialType;
        uint256 timestamp;
        address anchoredBy;
    }

    mapping(string => Credential) public credentials;
    string[] public credentialIndex;

    event CredentialAnchored(
        string indexed recordHash,
        string entityId,
        string credentialType,
        uint256 timestamp
    );

    function anchorCredential(
        string memory recordHash,
        string memory entityId,
        string memory credentialType,
        uint256 timestamp
    ) public {
        require(bytes(credentials[recordHash].recordHash).length == 0,
                "Credential already anchored");

        credentials[recordHash] = Credential({
            recordHash: recordHash,
            entityId: entityId,
            credentialType: credentialType,
            timestamp: timestamp,
            anchoredBy: msg.sender
        });

        credentialIndex.push(recordHash);

        emit CredentialAnchored(recordHash, entityId, credentialType, timestamp);
    }

    function verifyCredential(string memory recordHash)
        public view returns (bool, uint256, string memory) {
        Credential memory cred = credentials[recordHash];
        bool exists = bytes(cred.recordHash).length > 0;
        return (exists, cred.timestamp, cred.credentialType);
    }
}
```

---

## B4. DOMAIN 04 — BEHAVIOUR AND DISCIPLINARY RECORDS

**Why blockchain:** Disciplinary records affect students' futures.
Both false records and illegally deleted records harm students.
The Correction Protocol protects both school and student.

**When sealed:** When teacher/admin clicks "Submit Incident" or "Award Merit."

**Record schema:**
```typescript
interface BehaviourRecord {
  domain: 'BEHAVIOUR'
  recordId: string
  schoolId: string
  studentId: string
  type: 'INCIDENT' | 'MERIT' | 'INTERVENTION' | 'EXPUNGEMENT'
  severity: 'POSITIVE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  recordedBy: string             // teacherId or adminId
  recordedAt: string
  description: string
  actionTaken: string | null
  parentNotifiedAt: string | null
  parentNotificationHash: string | null  // links to Domain 06 record
  adminApprovedBy: string | null
  adminApprovedAt: string | null
  // For MERIT type:
  meritCategory: string | null
  meritPoints: number | null
  badgeAwarded: string | null
  // For EXPUNGEMENT type:
  expungesRecordId: string | null
  expungementReason: string | null
  expungementAuthorisedBy: string | null
}
```

**UI — Student behaviour tab:**
```tsx
// Timeline view of behaviour records
{behaviourRecords.map(record => (
  <BehaviourTimelineItem
    key={record.recordId}
    record={record}
    showSealedBadge={true}
    showVerifyButton={true}
    isSuperseded={record.status === 'SUPERSEDED'}
  />
))}
```

---

## B5. DOMAIN 05 — DOCUMENT SUBMISSIONS

**Why blockchain:** Assignment submission timestamps are disputed.
Academic integrity cases depend on proving what was submitted and when.
IEP and medical documents must be provably received.

**When sealed:** The moment a file lands on the server, before
any processing. The raw file is hashed. The seal happens before
the teacher even knows the file arrived.

**Implementation — File hash on upload:**
```typescript
async function sealDocumentSubmission(
  file: Buffer,
  metadata: DocumentMetadata
): Promise<SealedDocument> {

  // Hash the raw file bytes — immutable fingerprint
  const fileHash = createHash('sha256').update(file).digest('hex')

  const record: DocumentRecord = {
    domain: 'DOCUMENT',
    recordId: generateId(),
    schoolId: metadata.schoolId,
    uploadedBy: metadata.userId,
    uploaderRole: metadata.userRole,
    associatedEntity: {
      type: metadata.entityType,  // 'ASSIGNMENT' | 'IEP' | 'CONSENT' | 'CERTIFICATE'
      id: metadata.entityId
    },
    filename: metadata.filename,
    fileHash,                      // SHA-256 of file bytes
    fileSizeBytes: file.length,
    mimeType: metadata.mimeType,
    uploadedAt: new Date().toISOString(),
    storageLocation: metadata.storagePath
  }

  const recordHash = hashRecord(record)

  await qldbDriver.executeLambda(async (txn) => {
    await txn.execute(
      'INSERT INTO DocumentRecords VALUE ?',
      { ...record, hash: recordHash, status: 'SEALED' }
    )
  })

  return { record, fileHash, recordHash, status: 'SEALED' }
}
```

**File integrity verification:**
```typescript
async function verifyDocumentIntegrity(
  file: Buffer,
  recordId: string
): Promise<{ intact: boolean; originalHash: string; currentHash: string }> {

  const storedRecord = await getDocumentRecord(recordId)
  const currentHash = createHash('sha256').update(file).digest('hex')

  return {
    intact: currentHash === storedRecord.fileHash,
    originalHash: storedRecord.fileHash,
    currentHash
  }
}
```

---

## B6. DOMAIN 06 — COMMUNICATION RECORDS

**Why blockchain:** "I never received that message" and "I never sent
that warning" are the two most common disputes in school-parent relations.
Immutable message records end both arguments permanently.

**When sealed:** When a message is delivered to the recipient's inbox.
Not when sent — when delivered. Delivery confirmation is the seal event.

**Record schema:**
```typescript
interface CommunicationRecord {
  domain: 'COMMUNICATION'
  recordId: string
  schoolId: string
  messageId: string
  type: 'DIRECT_MESSAGE' | 'AUTOMATED_ALERT' | 'ANNOUNCEMENT' | 'NEWSLETTER'
  senderId: string
  senderRole: string
  recipientId: string
  recipientRole: string
  subject: string
  contentHash: string            // hash of message body (not the body itself — privacy)
  isAIGenerated: boolean
  aiDraftHash: string | null     // hash of original AI draft
  approvedBy: string | null      // teacher who approved AI draft
  approvedAt: string | null
  sentAt: string
  deliveredAt: string | null
  readAt: string | null
  language: string               // language message was delivered in
  wasTranslated: boolean
  originalLanguageHash: string | null  // if translated, hash of original
}
```

Note: The message body itself is NOT stored in the blockchain record.
Only the hash of the body is stored. This preserves privacy while
proving the content existed and was delivered unchanged.

**Verification flow:**
```typescript
// When a parent claims "the message I received said X but you're now
// claiming it said Y":
async function verifyMessageContent(
  messageId: string,
  currentContent: string
): Promise<boolean> {
  const record = await getCommunicationRecord(messageId)
  const currentHash = hashContent(currentContent)
  return currentHash === record.contentHash
  // If true: content is unchanged. If false: content was altered after sealing.
}
```

---

## B7. DOMAIN 07 — QR IDENTITY SIGNATURES

**Why blockchain:** QR codes can be forged. Every LNS OS QR code must
be cryptographically verifiable as authentic and unaltered.

**How it works:**
Each QR code encodes not just an ID but a cryptographic signature.
When scanned, the system verifies the signature against the chain.
A forged or copied QR will fail verification.

**QR generation:**
```typescript
async function generateVerifiedQRCode(entity: {
  type: 'STUDENT' | 'TEACHER' | 'STAFF' | 'PARENT' | 'SUBJECT'
  id: string
  schoolId: string
  displayName: string
}): Promise<VerifiedQR> {

  // Generate a unique signing key for this entity
  const signingKey = await generateEntitySigningKey(entity.id)

  // Create the QR payload
  const payload = {
    entityType: entity.type,
    entityId: entity.id,
    schoolId: entity.schoolId,
    issuedAt: new Date().toISOString(),
    nonce: generateNonce()           // prevents replay attacks
  }

  // Sign the payload
  const signature = await signPayload(payload, signingKey)

  // The QR encodes the payload + signature (NOT the signing key)
  const qrData = {
    ...payload,
    signature,
    verifyUrl: `https://lnsos.app/verify/${entity.id}`
  }

  // Seal the QR issuance to blockchain
  const qrRecord: QRIdentityRecord = {
    domain: 'QR_IDENTITY',
    recordId: generateId(),
    entityType: entity.type,
    entityId: entity.id,
    schoolId: entity.schoolId,
    issuedAt: payload.issuedAt,
    publicKeyHash: hashRecord({ key: signingKey.publicKey }),
    status: 'ACTIVE'
  }

  await sealToQLDB(qrRecord)

  return {
    qrData: JSON.stringify(qrData),
    entityId: entity.id,
    verifyUrl: qrData.verifyUrl
  }
}
```

**QR verification on scan:**
```typescript
async function verifyScan(qrPayload: string): Promise<ScanResult> {
  const { entityId, entityType, signature, nonce } = JSON.parse(qrPayload)

  // Get the entity's public key from QLDB
  const qrRecord = await getQRRecord(entityId)
  if (!qrRecord || qrRecord.status === 'REVOKED') {
    return { valid: false, reason: 'QR_REVOKED_OR_NOT_FOUND' }
  }

  // Verify signature
  const payloadValid = await verifySignature(qrPayload, signature, qrRecord)
  if (!payloadValid) {
    return { valid: false, reason: 'SIGNATURE_INVALID' }
  }

  // Check nonce hasn't been used (prevents replay attacks)
  const nonceUsed = await checkNonce(nonce)
  if (nonceUsed) {
    return { valid: false, reason: 'QR_ALREADY_SCANNED' }
  }

  await markNonceUsed(nonce)

  return {
    valid: true,
    entityId,
    entityType,
    displayName: qrRecord.displayName
  }
}
```

---

## B8. DOMAIN 08 — AI APPROVAL CHAIN

**Why blockchain:** When AI drafts a message that is sent to a parent,
accountability for that content must be clear. Who wrote it? Who changed
it? Who approved it? The AI approval chain answers all three, permanently.

This is the most innovative blockchain application in LNS OS.
No other EdTech platform does this. It is a genuine first.

**When sealed:** When a human clicks "Approve & Send" on an AI draft.
Three linked records are created: AI draft, human edit diff, final approval.

**Record schema:**
```typescript
interface AIApprovalRecord {
  domain: 'AI_APPROVAL'
  recordId: string
  schoolId: string
  queueItemId: string
  triggerType: string
  aiModel: string                    // 'claude-sonnet-4-20250514'
  aiDraftHash: string                // hash of original AI output
  aiGeneratedAt: string
  humanEditorId: string
  humanEditedAt: string | null
  humanEditDiffHash: string | null   // hash of the diff between AI and final
  humanEditPercentage: number        // 0 = no edits, 100 = fully rewritten
  finalContentHash: string           // hash of what was actually sent
  approvedBy: string
  approvedAt: string
  sentAt: string
  recipientId: string
  recipientRole: string
  // Linked to communication record
  communicationRecordId: string
}
```

**Calculating edit percentage:**
```typescript
function calculateEditPercentage(
  aiDraft: string,
  finalContent: string
): number {
  const aiWords = aiDraft.split(/\s+/)
  const finalWords = finalContent.split(/\s+/)

  // Simple Levenshtein-based similarity
  const similarity = calculateSimilarity(aiDraft, finalContent)
  return Math.round((1 - similarity) * 100)
}
```

**UI — AI approval chain viewer (in audit trail):**
```tsx
function AIApprovalChainViewer({ record }: { record: AIApprovalRecord }) {
  return (
    <div className="space-y-4">
      <ChainNode
        label="AI Generated Draft"
        hash={record.aiDraftHash}
        timestamp={record.aiGeneratedAt}
        actor={`${record.aiModel}`}
        icon={<SparklesIcon />}
        color="blue"
      />
      <ChainConnector />
      <ChainNode
        label={record.humanEditPercentage === 0
          ? "Human Reviewed (No Edits)"
          : `Human Edited (${record.humanEditPercentage}% changed)`}
        hash={record.humanEditDiffHash || record.aiDraftHash}
        timestamp={record.humanEditedAt || record.approvedAt}
        actor={record.humanEditorId}
        icon={<PencilIcon />}
        color={record.humanEditPercentage > 0 ? "amber" : "green"}
      />
      <ChainConnector />
      <ChainNode
        label="Approved and Sent"
        hash={record.finalContentHash}
        timestamp={record.approvedAt}
        actor={record.approvedBy}
        icon={<CheckIcon />}
        color="green"
      />
    </div>
  )
}
```

---

## B9. DOMAIN 09 — STUDENT ENROLLMENT AND IDENTITY

**Why blockchain:** Enrollment fraud (ghost students, identity falsification)
costs schools and governments millions. An immutable enrollment record,
plus the legal identity of who enrolled whom, closes this loophole.

**When sealed:** When admin clicks "Confirm Enrollment" on a new student.

**Record schema:**
```typescript
interface EnrollmentRecord {
  domain: 'ENROLLMENT'
  recordId: string
  schoolId: string
  studentId: string              // LNS ID — generated and sealed here
  legalName: string
  dateOfBirth: string
  enrolledAt: string
  enrolledBy: string             // adminId
  classId: string
  guardianIds: string[]
  specialNeedsFlag: boolean
  iepRequired: boolean
  photoHash: string | null       // hash of enrollment photo
  documentsProvided: {
    type: string                 // 'BIRTH_CERT' | 'PASSPORT' | 'PREV_SCHOOL_RECORD'
    documentHash: string
    verifiedBy: string
    verifiedAt: string
  }[]
  qrCodeRecordId: string         // links to Domain 07
}
```

---

## B10. DOMAIN 10 — STAFF CREDENTIALS AND ASSIGNMENTS

**Why blockchain:** Schools must prove their staff were qualified at the
time of appointment. Negligence claims require this evidence.

**When sealed:** When admin adds a new staff member and assigns them to classes.

**Record schema:**
```typescript
interface StaffCredentialRecord {
  domain: 'STAFF_CREDENTIAL'
  recordId: string
  schoolId: string
  staffId: string
  staffType: 'TEACHER' | 'ADMIN' | 'SUPPORT' | 'SUBSTITUTE'
  legalName: string
  qualifications: {
    type: string
    institution: string
    year: number
    documentHash: string
  }[]
  onboardedAt: string
  onboardedBy: string
  classAssignments: {
    classId: string
    subjectId: string
    assignedAt: string
    assignedBy: string
  }[]
  backgroundCheckHash: string | null
  backgroundCheckDate: string | null
}
```

---

## B11. DOMAIN 11 — SCHOOL POLICY AND CALENDAR CHANGES

**Why blockchain:** "You changed the grading system mid-term without
telling us." "The due date was different when the assignment was set."
Policy and calendar immutability protects the school in every dispute.

**When sealed:** When admin publishes any policy change, grading weight
adjustment, term date change, or school calendar update.

**Record schema:**
```typescript
interface PolicyRecord {
  domain: 'POLICY'
  recordId: string
  schoolId: string
  policyType: 'GRADING_WEIGHTS' | 'TERM_DATES' | 'CALENDAR_EVENT' |
              'CITIZENSHIP_SCALE' | 'GENERAL_POLICY' | 'ASSIGNMENT_DUE_DATE'
  changeDescription: string
  previousStateHash: string | null   // hash of previous policy version
  newStateHash: string               // hash of new policy version
  newStateData: Record<string, unknown>  // the actual policy content
  effectiveFrom: string
  publishedAt: string
  publishedBy: string
  parentNotificationSentAt: string | null
  parentNotificationRecordId: string | null  // links to Domain 06
}
```

---

## B12. DOMAIN 12 — STUDENT ACHIEVEMENT PASSPORT AND MICRO-CREDENTIALS

**Why blockchain:** This is the most transformative domain. Every student
who passes through LNS OS leaves with a verified, portable, lifelong
record of their educational achievements — owned by them, verifiable by
anyone, expiring never.

**The Student Passport:**
A compiled, blockchain-anchored document containing:
- All published report cards (linked to Domain 03 records)
- All merit badges and achievements (linked to Domain 04 records)
- Attendance history summary
- Citizenship history summary
- Subject specialisation profile (strongest subjects, MYP performance)

**Micro-credentials:**
Individual achievements that earn a standalone verifiable credential:
- Honour roll placement (per term)
- Subject excellence awards
- Perfect attendance (per term)
- Citizenship excellence
- Competition wins or special recognition
- Any custom award defined by the school admin

**Passport record schema:**
```typescript
interface StudentPassport {
  domain: 'STUDENT_PASSPORT'
  passportId: string
  studentId: string
  schoolId: string
  schoolName: string
  issuedAt: string
  issuedBy: string               // adminId
  validFrom: string              // first day of enrollment
  validTo: string | null         // null if student still enrolled
  studentName: string
  dateOfBirth: string            // for identity verification, not displayed publicly
  reportCardHashes: string[]     // links to all Domain 03 records
  achievementHashes: string[]    // links to Domain 04 merit records
  attendanceSummary: {
    totalDays: number
    presentDays: number
    overallPercentage: number
  }
  academicSummary: {
    subjects: {
      name: string
      finalGrade: number
      letterGrade: string
      mypGrade: number | null
      term: string
    }[]
  }
  passportHash: string           // hash of entire passport
  polygonTxHash: string          // Polygon anchor transaction
  verifyUrl: string              // public verification URL
  qrCodeData: string             // QR encoding verifyUrl for PDF embedding
}
```

**Generating and issuing a passport:**
```typescript
async function issueStudentPassport(
  studentId: string,
  adminId: string
): Promise<StudentPassport> {

  // Compile all verified records for this student
  const student = await getStudentFullRecord(studentId)
  const reportCards = await getStudentReportCards(studentId)
  const achievements = await getStudentAchievements(studentId)
  const attendance = await getStudentAttendanceSummary(studentId)

  const passport: Omit<StudentPassport, 'passportHash' | 'polygonTxHash'> = {
    domain: 'STUDENT_PASSPORT',
    passportId: generateId(),
    studentId,
    schoolId: student.schoolId,
    schoolName: student.schoolName,
    issuedAt: new Date().toISOString(),
    issuedBy: adminId,
    validFrom: student.enrolledAt,
    validTo: student.leftAt || null,
    studentName: student.legalName,
    dateOfBirth: student.dateOfBirth,
    reportCardHashes: reportCards.map(r => r.hash),
    achievementHashes: achievements.map(a => a.hash),
    attendanceSummary: attendance,
    academicSummary: compileAcademicSummary(reportCards),
    verifyUrl: `https://verify.lnsos.app/passport/${generateId()}`,
    qrCodeData: ''
  }

  const passportHash = hashRecord(passport)

  // Anchor to Polygon
  const polygonTxHash = await anchorToPolygon(passportHash, studentId, 'PASSPORT')

  // Generate QR code for the verify URL
  const qrCodeData = await generateQRCode(passport.verifyUrl)

  const finalPassport: StudentPassport = {
    ...passport,
    passportHash,
    polygonTxHash,
    qrCodeData
  }

  // Seal to QLDB
  await sealToQLDB(finalPassport)

  // Generate PDF
  await generatePassportPDF(finalPassport)

  return finalPassport
}
```

**Public verification page (`/verify/passport/[id]`):**
This page is publicly accessible — no login required. It is the page
a university admissions officer visits when they scan the QR on a
student's passport PDF.

```tsx
// This page receives the passport hash from the URL
// Checks it against the Polygon smart contract
// Displays: VERIFIED ✓ or VERIFICATION FAILED ✗

function PassportVerificationPage({ passportId }: { passportId: string }) {
  const [status, setStatus] = useState<'checking' | 'verified' | 'failed'>('checking')
  const [passport, setPassport] = useState<PublicPassportView | null>(null)

  useEffect(() => {
    verifyPassportOnChain(passportId).then(result => {
      setStatus(result.verified ? 'verified' : 'failed')
      setPassport(result.publicView)   // stripped of DOB and private fields
    })
  }, [passportId])

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <LNSOSLogo />
          <p className="text-sm text-gray-500 mt-2">
            Credential Verification Service
          </p>
        </div>

        {status === 'checking' && <VerificationSpinner />}

        {status === 'verified' && (
          <>
            <VerifiedBadge />
            <h2 className="text-xl font-bold text-navy-900 text-center mt-4">
              Credential Verified
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              This record is authentic and has not been altered.
            </p>
            <PassportSummaryCard passport={passport} />
            <div className="mt-4 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-400 font-mono break-all">
                Polygon TX: {passport.polygonTxHash}
              </p>
            </div>
          </>
        )}

        {status === 'failed' && (
          <>
            <FailedBadge />
            <h2 className="text-xl font-bold text-red-600 text-center mt-4">
              Verification Failed
            </h2>
            <p className="text-sm text-gray-500 text-center">
              This credential could not be verified. It may have been altered
              or does not exist in the LNS OS registry. Contact the issuing
              school directly.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
```

---

---

# PART C — CONTEXT PAPERS
## Rules That Govern Every Blockchain Decision in the System

---

## C1. WHERE BLOCKCHAIN APPLIES — THE DECISION RULE

Before adding any new data to blockchain, apply this test:

**Question 1:** If this record were silently altered, could it harm a
student, parent, teacher, or the school's legal standing?
→ If YES: blockchain required.

**Question 2:** Will this record ever need to be verified by a party
who does not have access to our internal systems?
→ If YES: Polygon anchoring required in addition to QLDB.

**Question 3:** Is this record created frequently (thousands per day)
and does its integrity matter less than the cost of sealing each one?
→ If YES: batch hash into a Merkle root, seal the root, not each record.

**What does NOT go on blockchain:**
- Draft data (attendance registers before locking, unsaved grade entries)
- UI state and preferences
- Search indexes and caches
- Internal system logs (use standard logging tools)
- Anything that changes frequently without significance (page views, session data)

---

## C2. THE AUDIT TRAIL UI — EVERY SEALED RECORD MUST BE VISIBLE

Every user in the system has access to a view of blockchain records
that concern them. Access is scoped by role.

**Student sees:**
- Their own attendance records (sealed)
- Their own grades (sealed, after release)
- Their own submitted assignments (sealed)
- Their own passport and credentials
- Their own QR identity issuance

**Parent sees:**
- Their child's attendance records
- Their child's grades (after release)
- Their child's report cards
- Communications they received (delivery records)
- Consent records they signed

**Teacher sees:**
- Attendance registers they locked (with ability to initiate Correction Protocol)
- Grades they submitted
- AI approval chain records for drafts they approved
- Messages they sent

**Admin sees:**
- All of the above for their school
- Enrollment records
- Staff credential records
- Policy change records
- Full school-wide audit log

**UI — Sealed record indicator (used across all pages):**
```tsx
function SealedBadge({
  hash,
  timestamp,
  domain,
  showVerify = false
}: SealedBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <LockClosedIcon size={12} className="text-navy-400" />
      <span className="text-[10px] font-mono text-gray-400">
        {truncateHash(hash)}
      </span>
      {showVerify && (
        <button
          onClick={() => verifyRecord(hash)}
          className="text-[10px] text-blue-500 hover:text-blue-700">
          Verify
        </button>
      )}
    </div>
  )
}

function truncateHash(hash: string): string {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`
}
```

---

## C3. THE CORRECTION PROTOCOL — ENFORCEMENT RULES

For every domain that allows corrections, these rules are absolute:

1. **No silent overwrites.** The original SEALED record always remains
   in the ledger. Any UI that appears to "edit" a sealed record is
   actually creating a CORRECTION RECORD linked to the original.

2. **Corrections require authorisation.** Grade corrections require
   admin approval. Attendance corrections older than 2 hours require
   admin approval. Behaviour record amendments require principal approval.

3. **Corrections are themselves sealed.** The correction record is
   hashed and written to QLDB. The act of correcting is immutable.

4. **Correction reasons are mandatory.** No correction can be submitted
   without a written reason of at least 20 characters.

5. **Correction chains are visible.** The audit trail always shows:
   Original → Correction → Who authorised it → When. Users with
   appropriate access can always see the full history of a record.

6. **Corrections are countable.** An admin dashboard shows:
   - How many corrections were made this term
   - By which teachers
   - In which domains
   - With what reasons
   
   A high correction count is a flag for investigation.

---

## C4. DATA PRIVACY IN BLOCKCHAIN RECORDS

Student data is protected under GDPR, COPPA, and POPIA.
These rules govern what goes on chain:

1. **No raw PII on Polygon.** The public Polygon anchor contains only
   hashes — never names, dates of birth, or any identifying information.
   The public verification page reconstructs a display from the
   private QLDB record — it never reads personal data from the chain.

2. **Right to erasure — the honest limitation.** GDPR grants individuals
   the right to have their data erased. Blockchain records cannot be
   deleted. The LNS OS approach: when an erasure request is received,
   the associated data in the private database and file storage is deleted.
   The blockchain record is REVOKED and the content fields are replaced
   with a hash of the string "ERASURE_REQUESTED_[timestamp]". The hash
   remains on chain but is no longer linked to identifiable data.
   This must be disclosed in the Privacy Policy and Data Rights document.

3. **QLDB stays within jurisdiction.** The QLDB instance must be
   deployed in the same AWS region as the school's country of operation.
   EU schools: eu-west-1. Africa: af-south-1. Never cross-region for
   student data.

4. **Message bodies are never on chain.** Only message content hashes
   are stored (Domain 06). The actual text of parent-teacher messages
   remains in the private database and is subject to normal erasure.

---

## C5. PERFORMANCE AND COST RULES

Blockchain operations add latency. Follow these rules to keep the
user experience fast:

1. **Seal asynchronously.** The user action (click "Lock Register")
   must complete immediately in the UI. The blockchain sealing happens
   asynchronously. Show "Sealing..." indicator, then "Sealed ✓" when done.
   Never make the user wait for the hash computation.

2. **Batch where possible.** For scheduled operations (end-of-term
   report cards, weekly summaries), generate all records first, then
   seal them in a batch transaction. This is faster and cheaper than
   individual seals.

3. **Cache hash verifications.** When a user clicks "Verify" on a
   sealed record, cache the verification result for 60 seconds.
   Re-verification of the same hash within 60 seconds returns the
   cached result.

4. **Polygon gas budget.** Every Polygon anchor transaction costs gas.
   Monitor the monthly gas spend. If it exceeds the budget, move from
   per-record anchoring to daily Merkle root anchoring for non-passport
   records.

5. **QLDB cost awareness.** QLDB charges per read/write operation.
   Never query the ledger for UI purposes that can be satisfied by the
   standard database. The ledger is for sealing and audit only —
   not for powering list views or dashboards.

---

## C6. EVERY PAGE BLOCKCHAIN INTEGRATION CHECKLIST

For every page that handles data in the twelve domains, verify:

```
SEALING:
[ ] Data in this domain is sealed at the correct trigger point
[ ] Sealing happens asynchronously (UI does not block on hash computation)
[ ] "Sealing..." and "Sealed ✓" states are shown correctly
[ ] Sealed records show SealedBadge component with truncated hash
[ ] Sealed records cannot be edited through any UI path

CORRECTION PROTOCOL:
[ ] Correction is initiated through a clearly labelled "Request Correction" flow
[ ] Correction requires a written reason
[ ] Correction requires appropriate authorisation (teacher self / admin / principal)
[ ] The original record remains visible in audit trail after correction
[ ] Correction record is itself sealed and logged

AUDIT TRAIL:
[ ] Records from this page appear in the user's personal audit trail
[ ] Admin can see these records in the school-wide audit log
[ ] "Verify" button re-computes hash and confirms match
[ ] Correction chain is visible for any corrected records

CREDENTIALS (Domain 12 only):
[ ] Published report cards trigger a Polygon anchor
[ ] Issued passports generate a public verifyUrl
[ ] The verifyUrl page shows correct verification result
[ ] PDF contains QR code linking to verifyUrl

PRIVACY:
[ ] No raw PII is stored in the QLDB record beyond what is specified in schema
[ ] Message bodies are hashed, not stored on chain
[ ] Polygon anchors contain hashes only, no identifying data
[ ] Erasure request flow marks record as REVOKED correctly
```

---

## C7. THE STUDENT PASSPORT — USER EXPERIENCE RULES

The Student Passport is the most visible output of the blockchain system.
It must feel premium, trustworthy, and simple to understand.

**Issuing a passport (admin action):**
1. Admin selects student → clicks "Issue Achievement Passport"
2. System compiles all verified records (takes 2–5 seconds)
3. Progress screen shows: "Compiling records... Sealing to ledger...
   Anchoring to blockchain... Generating PDF..."
4. Completion screen: passport summary + "Download PDF" + "Share Link" + "Print"
5. Student is notified in their portal that their passport has been issued

**The passport PDF must contain:**
- LNS OS logo and school logo side by side
- Student name (not DOB — privacy)
- School name and address
- Issuance date and validity period
- Academic summary table (subjects, grades, terms)
- Attendance summary
- Achievements and merits (with badge icons)
- Citizenship history
- A prominent QR code linking to the public verify URL
- Text: "Verify the authenticity of this record at [verifyUrl]"
- Blockchain anchor reference: "Anchored to Polygon blockchain: [txHash]"
- "This document was generated by LNS OS and is cryptographically
   verified. Any alteration will be detected on verification."

**The public verification page must:**
- Load in under 2 seconds
- Require no login
- Show a clear VERIFIED ✓ or FAILED ✗ result above the fold
- Display the student's name, school, and academic summary (no DOB)
- Show the Polygon transaction hash as proof of anchoring
- Be mobile-friendly (parents share these links on WhatsApp)
- Work in all major languages (the student's preferred language auto-detected)

---

# SUMMARY — THE COMMAND TO EVERY DEVELOPER

The blockchain in LNS OS is not a marketing feature.
It is the reason a parent trusts what they see.
It is the reason a university believes the grades.
It is the reason a student owns their own verified story.

Every attendance lock is a seal.
Every grade submission is a seal.
Every published report card anchors to a public chain.
Every approved AI message is an immutable chain of accountability.
Every student who leaves carries a passport that cannot be forged.

Twelve domains. One principle:
**What happened, happened. And it is recorded forever.**

Build every corner of this system with that weight in mind.

---

**Document version:** 1.0
**Last updated:** April 2026
**Owner:** LNS OS Development Team
**Companion documents:**
  AI_ARCHITECTURE.md
  MOBILE_DESIGN_SYSTEM.md
  TABLET_DESIGN_SYSTEM.md
  ROUTE_COMPLETION_PROMPT.md
**Supersedes:** Any previous blockchain implementation guidance
