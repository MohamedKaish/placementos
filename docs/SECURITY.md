# PlacementOS — Security Architecture & Data Protection

> **Core Principle**: Zero student credentials or secrets leaked to client code. Complete isolation of student dossiers, assessment results, and personal evidence.

---

## 1. Threat Model & Asset Classification

Students store sensitive career intelligence within PlacementOS:
- Personal resumes (containing contact info, grades, and work history)
- Direct assessment scores and diagnostic performance
- Skill gap analysis and calibration ratings
- Career ambition targets and target roles

### Confidentiality Classifications:
1. **Public / Shared**: `departments`, `domains`, `skills`, `tools`, `jobRoles`, `assessments`, `questions`.
2. **Private to User**: `users/{userId}`, `evidence`, `assessmentAttempts`, `missions`, `progress`.
3. **Server-Only / Confidential**: `GEMINI_API_KEY`, Firebase Service Account credentials.

---

## 2. API Key & Credential Discipline

1. **Gemini API Isolation**:
   - The Gemini API key (`GEMINI_API_KEY`) is strictly server-side.
   - It is never prefixed with `NEXT_PUBLIC_`.
   - Client components interact with AI only through Next.js Route Handlers / Server Actions that validate user session tokens.
2. **Firebase Client Keys**:
   - `NEXT_PUBLIC_FIREBASE_*` keys are public project identifiers.
   - Security relies on **Firestore Security Rules** and Firebase Auth token verification, NOT secret key obfuscation.

---

## 3. Firestore Security Rules Blueprint

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Public taxonomy: Readable by any authenticated user, writable only by admin
    match /departments/{id} { allow read: if isAuthenticated(); allow write: if false; }
    match /domains/{id} { allow read: if isAuthenticated(); allow write: if false; }
    match /skills/{id} { allow read: if isAuthenticated(); allow write: if false; }
    match /jobRoles/{id} { allow read: if isAuthenticated(); allow write: if false; }
    match /transferMappings/{id} { allow read: if isAuthenticated(); allow write: if false; }
    match /assessments/{id} { allow read: if isAuthenticated(); allow write: if false; }
    match /questions/{id} { allow read: if isAuthenticated(); allow write: if false; }

    // Student profile & private data: Strictly isolated to the owning student
    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }

    match /evidence/{evidenceId} {
      allow read, write: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
    }

    match /assessmentAttempts/{attemptId} {
      allow read, write: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
    }

    match /missions/{missionId} {
      allow read, write: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## 4. Input Sanitization & File Upload Safety

- Resumes uploaded for parsing must be validated for MIME type (`application/pdf`, `text/plain`) and bounded to a 5MB payload limit.
- AI parsing routes will enforce rate-limiting per student UID to prevent abuse or denial-of-wallet vectors on the Gemini API.
- All JSON inputs from the client are validated via TypeScript/Zod schemas before database persistence.
