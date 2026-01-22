# Bit Brainic - Fully Dressed Use Cases

## System Overview
**Project Name:** Bit Brainic  
**Description:** AI-Powered Computer Science Tutoring Platform  
**Version:** 1.0  
**Last Updated:** January 20, 2026

---

## Actors Definition

| Actor | Type | Description |
|-------|------|-------------|
| **User** | Primary | Registered user who can access chat and profile features |
| **Admin** | Secondary | System administrator who manages users and views analytics |
| **Gemini AI** | Secondary | Google's AI system that generates tutoring responses |

---

# AUTHENTICATION USE CASES

---

## UC-01: Register Account

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-01 |
| **Use Case Name** | Register Account |
| **Description** | Allows a new user to create an account on the Bit Brainic platform |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | User clicks "Sign Up" button on the website |
| **Preconditions** | 1. User has internet access<br>2. User is not already logged in<br>3. User does not have an existing account with the same email |
| **Postconditions** | 1. New user account is created in database<br>2. JWT token is generated and stored<br>3. User is redirected to Interest Selection page |
| **Priority** | High |
| **Frequency** | Once per user |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User navigates to Sign Up page | System displays registration form with fields: Name, Email, Password, Confirm Password |
| 2 | User enters name (e.g., "John Doe") | System validates name length (max 50 chars) |
| 3 | User enters email (e.g., "john@example.com") | System validates email format |
| 4 | User enters password (min 6 characters) | System displays password strength indicator |
| 5 | User enters confirm password | System validates passwords match |
| 6 | User clicks "Create Account" button | System validates all fields |
| 7 | - | System checks if email already exists in database |
| 8 | - | System hashes password using bcrypt (salt rounds: 10) |
| 9 | - | System creates new User document in MongoDB |
| 10 | - | System generates JWT token (expires in 30 days) |
| 11 | - | System stores token in localStorage |
| 12 | - | System redirects user to Interest Selection page (UC-09) |

### Alternative Flows

| ID | Condition | Steps |
|----|-----------|-------|
| AF-01 | User already has account | At step 7, system detects email exists → Display error "User already exists" → Return to step 3 |
| AF-02 | User clicks "Already have an account?" | System redirects to Sign In page (UC-02) |

### Exception Flows

| ID | Condition | Steps |
|----|-----------|-------|
| EF-01 | Invalid email format | System displays "Please add a valid email" → Highlight email field → User corrects input |
| EF-02 | Password too short | System displays "Password must be at least 6 characters" → User enters longer password |
| EF-03 | Passwords don't match | System displays "Passwords do not match" → User re-enters confirm password |
| EF-04 | Name too long | System displays "Name cannot be more than 50 characters" → User shortens name |
| EF-05 | Server error | System displays "Server error, please try again" → User retries later |

### Business Rules
- BR-01: Email must be unique across all users
- BR-02: Password minimum length is 6 characters
- BR-03: Name maximum length is 50 characters
- BR-04: Email is stored in lowercase

### Special Requirements
- Passwords must be hashed before storage (bcrypt)
- JWT token expires in 30 days
- HTTPS required for secure transmission

---

## UC-02: Sign In

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-02 |
| **Use Case Name** | Sign In |
| **Description** | Allows a registered user to log into their account |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | User clicks "Sign In" button on the website |
| **Preconditions** | 1. User has a registered account<br>2. User is not already logged in |
| **Postconditions** | 1. User is authenticated<br>2. JWT token is stored in localStorage<br>3. User is redirected to Dashboard |
| **Priority** | High |
| **Frequency** | Multiple times per user |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User navigates to Sign In page | System displays login form with Email and Password fields |
| 2 | User enters registered email | System validates email format |
| 3 | User enters password | System masks password input |
| 4 | User clicks "Sign In" button | System sends credentials to server |
| 5 | - | System retrieves user by email (UC-03: Validate Credentials) |
| 6 | - | System compares hashed passwords using bcrypt |
| 7 | - | System generates new JWT token |
| 8 | - | System returns user data and token |
| 9 | - | System stores token in localStorage |
| 10 | - | System updates AuthContext with user data |
| 11 | - | System redirects to Dashboard page |

### Alternative Flows

| ID | Condition | Steps |
|----|-----------|-------|
| AF-01 | User doesn't have account | User clicks "Create Account" → Redirect to Registration page (UC-01) |
| AF-02 | User forgot password | User clicks "Forgot Password" → (Feature not implemented) |

### Exception Flows

| ID | Condition | Steps |
|----|-----------|-------|
| EF-01 | Email not found | System displays "Invalid email or password" → User re-enters credentials |
| EF-02 | Wrong password | System displays "Invalid email or password" → User re-enters password |
| EF-03 | Empty fields | System displays "Please fill in all fields" → User completes form |
| EF-04 | Server unavailable | System displays "Server error" → User tries again later |

### Business Rules
- BR-01: Error messages should not reveal whether email exists (security)
- BR-02: JWT token is valid for 30 days
- BR-03: Failed login attempts are not currently limited (could be added)

---

## UC-03: Validate Credentials

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-03 |
| **Use Case Name** | Validate Credentials |
| **Description** | System validates user email and password against database |
| **Primary Actor** | System (Internal) |
| **Secondary Actor** | None |
| **Trigger** | Included by UC-01 (Register) and UC-02 (Sign In) |
| **Preconditions** | Valid email and password format provided |
| **Postconditions** | Credentials are validated, user data returned |
| **Priority** | High |
| **Frequency** | Every authentication attempt |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | - | System receives email and password |
| 2 | - | System queries MongoDB for user by email |
| 3 | - | System retrieves hashed password (select: '+password') |
| 4 | - | System calls bcrypt.compare(enteredPassword, hashedPassword) |
| 5 | - | System returns match result (true/false) |

### Business Rules
- BR-01: Password comparison uses bcrypt
- BR-02: User document excludes password by default (select: false)

---

## UC-04: Logout

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-04 |
| **Use Case Name** | Logout |
| **Description** | Allows user to end their session and log out |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | User clicks "Logout" button |
| **Preconditions** | User is currently logged in |
| **Postconditions** | 1. Token is removed from localStorage<br>2. User state is cleared<br>3. User is redirected to Home page |
| **Priority** | Medium |
| **Frequency** | Multiple times per user |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User clicks "Logout" in navigation or profile menu | System intercepts click event |
| 2 | - | System clears token from localStorage |
| 3 | - | System sets user state to null |
| 4 | - | System sets token state to null |
| 5 | - | System redirects to Home page ("/") |

### Business Rules
- BR-01: Logout is client-side only (token invalidation not done server-side)
- BR-02: All cached data should be cleared on logout

---

# PROFILE MANAGEMENT USE CASES

---

## UC-05: View Profile

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-05 |
| **Use Case Name** | View Profile |
| **Description** | Allows user to view their profile information |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | User navigates to Profile page |
| **Preconditions** | User is authenticated |
| **Postconditions** | Profile information is displayed |
| **Priority** | Medium |
| **Frequency** | Multiple times per user |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User clicks "Profile" link in navigation | System navigates to /profile route |
| 2 | - | System calls GET /api/auth/me with JWT token |
| 3 | - | Server validates token via protect middleware |
| 4 | - | Server returns user data (name, email, interests, persona, createdAt) |
| 5 | - | System displays profile page with: |
| | | - Profile Information section (name, email) |
| | | - Interests section (CS topics) |
| | | - AI Persona section (custom prompt) |
| | | - Change Password section |
| | | - Delete Account section |

### Exception Flows

| ID | Condition | Steps |
|----|-----------|-------|
| EF-01 | Token invalid/expired | System redirects to Sign In page |
| EF-02 | Server error | System displays error message |

---

## UC-06: Update Profile

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-06 |
| **Use Case Name** | Update Profile |
| **Description** | Allows user to update their name and email |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | User clicks "Save Changes" in profile section |
| **Preconditions** | 1. User is authenticated<br>2. User is on Profile page |
| **Postconditions** | 1. User data is updated in database<br>2. UI reflects changes |
| **Priority** | Medium |
| **Frequency** | Occasional |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User enters new name in name field | System enables "Save Changes" button |
| 2 | User enters new email in email field | System validates email format |
| 3 | User clicks "Save Changes" button | System sends PUT /api/auth/profile request |
| 4 | - | Server validates token |
| 5 | - | Server checks if new email is already in use |
| 6 | - | Server updates user document |
| 7 | - | Server returns updated user data |
| 8 | - | System updates AuthContext |
| 9 | - | System displays success message "Profile updated successfully" |

### Exception Flows

| ID | Condition | Steps |
|----|-----------|-------|
| EF-01 | Email already in use | Server returns 400 → System displays "Email already in use" |
| EF-02 | Invalid email format | Client-side validation fails → Display error |
| EF-03 | Name too long | Server returns 400 → Display validation error |

---

## UC-07: Update Password

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-07 |
| **Use Case Name** | Update Password |
| **Description** | Allows user to change their account password |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | User clicks "Update Password" button |
| **Preconditions** | 1. User is authenticated<br>2. User knows current password |
| **Postconditions** | Password is updated and hashed in database |
| **Priority** | Medium |
| **Frequency** | Rare |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User enters current password | System masks input |
| 2 | User enters new password (min 6 chars) | System validates length |
| 3 | User enters confirm new password | System validates match |
| 4 | User clicks "Update Password" | System sends PUT /api/auth/password |
| 5 | - | Server validates token |
| 6 | - | Server retrieves user with password field |
| 7 | - | Server compares current password with bcrypt |
| 8 | - | Server hashes new password |
| 9 | - | Server updates user document |
| 10 | - | System displays "Password updated successfully" |

### Exception Flows

| ID | Condition | Steps |
|----|-----------|-------|
| EF-01 | Current password wrong | Server returns 401 → Display "Current password is incorrect" |
| EF-02 | New password too short | Server returns 400 → Display "Password must be at least 6 characters" |
| EF-03 | Passwords don't match | Client validation fails → Display error |

---

## UC-08: Delete Account

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-08 |
| **Use Case Name** | Delete Account |
| **Description** | Allows user to permanently delete their account and all data |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | User clicks "Delete Account" button |
| **Preconditions** | User is authenticated |
| **Postconditions** | 1. All user chats deleted<br>2. All user messages deleted<br>3. User account deleted<br>4. User logged out |
| **Priority** | Low |
| **Frequency** | Rare |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User clicks "Delete Account" button | System displays confirmation dialog |
| 2 | User confirms deletion | System sends DELETE /api/auth/account |
| 3 | - | Server validates token |
| 4 | - | Server retrieves all user's chat IDs |
| 5 | - | Server deletes all messages in those chats |
| 6 | - | Server deletes all user's chats |
| 7 | - | Server deletes user document |
| 8 | - | Server returns success |
| 9 | - | System clears localStorage |
| 10 | - | System redirects to Home page |

### Alternative Flows

| ID | Condition | Steps |
|----|-----------|-------|
| AF-01 | User cancels | User clicks "Cancel" → Dialog closes → No action taken |

### Business Rules
- BR-01: This is a cascading delete (all related data is removed)
- BR-02: Action is irreversible
- BR-03: User should be warned before deletion

---

## UC-09: Select Interests

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-09 |
| **Use Case Name** | Select Interests |
| **Description** | Allows user to select their CS learning interests |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | 1. After registration<br>2. From Profile page |
| **Preconditions** | User is authenticated |
| **Postconditions** | User's interests are saved and used for AI personalization |
| **Priority** | Medium |
| **Frequency** | Occasional |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User views available interest categories | System displays categories: Programming Languages, Data Structures, Databases, AI/ML, Web Development, etc. |
| 2 | User clicks on interests to select (max 20) | System toggles selection state |
| 3 | User clicks "Save Interests" or "Continue" | System sends PUT /api/auth/interests |
| 4 | - | Server validates array length ≤ 20 |
| 5 | - | Server updates user.interests field |
| 6 | - | System updates AuthContext |
| 7 | - | System redirects to Dashboard (if from registration) or shows success message |

### Available Interest Options
- Programming: Python, Java, JavaScript, C++, TypeScript, Go, Rust
- Data: Data Structures, Algorithms, SQL, NoSQL, MongoDB
- Web: React, Node.js, HTML/CSS, Full Stack
- AI: Machine Learning, Deep Learning, NLP, Computer Vision
- Systems: Operating Systems, Networking, Cloud Computing
- Other: Cybersecurity, DevOps, Software Engineering

### Exception Flows

| ID | Condition | Steps |
|----|-----------|-------|
| EF-01 | More than 20 interests | Server returns 400 → Display "Cannot have more than 20 interests" |
| EF-02 | Not an array | Server returns 400 → Display "Interests must be an array" |

### Business Rules
- BR-01: Maximum 20 interests allowed
- BR-02: Interests influence AI response personalization

---

## UC-10: Set Persona Prompt

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-10 |
| **Use Case Name** | Set Persona Prompt |
| **Description** | Allows user to customize AI behavior with a custom prompt |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | User edits persona in Profile page |
| **Preconditions** | User is authenticated |
| **Postconditions** | Persona is saved and used in AI system prompt |
| **Priority** | Low |
| **Frequency** | Rare |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User navigates to AI Persona section in Profile | System displays current persona (or empty) |
| 2 | User enters custom instructions (max 500 chars) | System displays character count |
| 3 | User clicks "Save Persona" | System sends PUT /api/auth/persona |
| 4 | - | Server validates string length ≤ 500 |
| 5 | - | Server updates user.persona field |
| 6 | - | System displays success message |

### Example Persona Prompts
- "Explain things like I'm a beginner, use simple analogies"
- "I prefer code examples in Python only"
- "Be more formal and academic in responses"
- "Give me practice problems after each explanation"

### Exception Flows

| ID | Condition | Steps |
|----|-----------|-------|
| EF-01 | Persona too long | Server returns 400 → Display "Persona cannot be more than 500 characters" |
| EF-02 | Not a string | Server returns 400 → Display "Persona must be a string" |

### Business Rules
- BR-01: Maximum 500 characters
- BR-02: Persona is appended to system prompt as "USER'S CUSTOM INSTRUCTIONS"

---

# CHAT MANAGEMENT USE CASES

---

## UC-11: Create New Chat

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-11 |
| **Use Case Name** | Create New Chat |
| **Description** | Allows user to start a new conversation with the AI tutor |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | User clicks "New Chat" button |
| **Preconditions** | User is authenticated |
| **Postconditions** | New chat session is created and active |
| **Priority** | High |
| **Frequency** | Multiple times per user |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User clicks "New Chat" or "+" button | System sends POST /api/chat |
| 2 | - | Server creates new Chat document with: userId, title="New Chat" |
| 3 | - | Server returns chat object |
| 4 | - | System adds chat to sidebar list |
| 5 | - | System selects the new chat as active |
| 6 | - | System clears message area, shows welcome message |

### Business Rules
- BR-01: Default title is "New Chat"
- BR-02: Title auto-updates after first message (UC-19)
- BR-03: Chat belongs to authenticated user only

---

## UC-12: View All Chats

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-12 |
| **Use Case Name** | View All Chats |
| **Description** | Displays list of all user's chat sessions |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | User navigates to Dashboard |
| **Preconditions** | User is authenticated |
| **Postconditions** | Chat list is displayed in sidebar |
| **Priority** | High |
| **Frequency** | Every dashboard visit |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User navigates to Dashboard | System sends GET /api/chat |
| 2 | - | Server retrieves all chats where userId matches |
| 3 | - | Server sorts by updatedAt descending (newest first) |
| 4 | - | System displays chats in sidebar with titles |
| 5 | User sees list of previous conversations | Each chat shows title and can be clicked |

### Business Rules
- BR-01: Chats sorted by most recently updated
- BR-02: Only user's own chats are visible

---

## UC-13: Open Chat

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-13 |
| **Use Case Name** | Open Chat |
| **Description** | Opens a specific chat and loads its messages |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | User clicks on a chat in the sidebar |
| **Preconditions** | 1. User is authenticated<br>2. Chat belongs to user |
| **Postconditions** | Chat messages are displayed in chat area |
| **Priority** | High |
| **Frequency** | Very frequent |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User clicks on chat title in sidebar | System sets chat as active (highlight) |
| 2 | - | System sends GET /api/chat/:id |
| 3 | - | Server validates chat belongs to user |
| 4 | - | Server retrieves messages sorted by timestamp |
| 5 | - | Server returns chat with messages array |
| 6 | - | System renders messages (user messages right, bot messages left) |
| 7 | - | System scrolls to latest message |

### Exception Flows

| ID | Condition | Steps |
|----|-----------|-------|
| EF-01 | Chat not found | Server returns 404 → Display "Chat not found" |
| EF-02 | Not authorized | Server returns 401 → Redirect to login |

---

## UC-14: Send Message

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-14 |
| **Use Case Name** | Send Message |
| **Description** | User sends a message to the AI tutor and receives a response |
| **Primary Actor** | User |
| **Secondary Actor** | Gemini AI |
| **Trigger** | User types message and presses Enter or Send button |
| **Preconditions** | 1. User is authenticated<br>2. User has an active chat selected |
| **Postconditions** | 1. User message saved<br>2. AI response generated and saved<br>3. Both messages displayed |
| **Priority** | Critical |
| **Frequency** | Very high (core functionality) |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User types message in input field | System enables Send button |
| 2 | User presses Enter or clicks Send | System displays user message immediately |
| 3 | - | System shows "Thinking..." indicator |
| 4 | - | System sends POST /api/chat/:id/message with content |
| 5 | - | Server saves user message (role: 'user') |
| 6 | - | Server retrieves existing messages for context |
| 7 | - | Server calls UC-15: Generate AI Response |
| 8 | - | Server saves bot message (role: 'bot') |
| 9 | - | If first message: auto-generate title from content |
| 10 | - | Server returns userMessage, botMessage, chatTitle |
| 11 | - | System displays AI response with typing effect |
| 12 | - | System updates chat title in sidebar if changed |

### Exception Flows

| ID | Condition | Steps |
|----|-----------|-------|
| EF-01 | Empty message | Client prevents submission → Display "Enter a message" |
| EF-02 | AI unavailable | Server returns 503 → Display "AI service is busy, try again" |
| EF-03 | Network error | Display "Failed to send message" → Retry button |

### Business Rules
- BR-01: Messages are persisted to database
- BR-02: Chat title auto-updates on first message
- BR-03: Chat context uses last 30 messages for AI

---

## UC-15: Generate AI Response

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-15 |
| **Use Case Name** | Generate AI Response |
| **Description** | System generates AI tutoring response using Gemini API |
| **Primary Actor** | Gemini AI |
| **Secondary Actor** | None |
| **Trigger** | Included by UC-14: Send Message |
| **Preconditions** | 1. Valid message content<br>2. Gemini API key configured |
| **Postconditions** | AI response text generated |
| **Priority** | Critical |
| **Frequency** | Every message sent |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | - | System calls UC-17: Manage Chat History (trim to 30) |
| 2 | - | System calls UC-16: Build Personalized Prompt |
| 3 | - | System converts messages to Gemini format |
| 4 | - | System creates chat session with model: "gemini-2.5-flash" |
| 5 | - | System sends message to Gemini API |
| 6 | Gemini AI | Gemini processes and returns response |
| 7 | - | System extracts response text |
| 8 | - | System returns response to caller |

### Exception Flows

| ID | Condition | Steps |
|----|-----------|-------|
| EF-01 | Model overloaded (503) | System calls UC-18: Handle API Errors → Retry with backoff |
| EF-02 | Rate limited (429) | System retries with exponential backoff (1s, 2s, 4s) |
| EF-03 | API key invalid | Return error "Invalid or missing Gemini API key" |
| EF-04 | Safety block | Return "Response blocked due to safety settings" |
| EF-05 | Model not found | Fallback to "gemini-2.0-flash" |

### Business Rules
- BR-01: Maximum 3 retry attempts
- BR-02: Fallback models: gemini-2.5-flash → gemini-2.0-flash
- BR-03: Max output tokens: 8192
- BR-04: Temperature: 0.8

---

## UC-16: Build Personalized Prompt

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-16 |
| **Use Case Name** | Build Personalized Prompt |
| **Description** | Builds system prompt with user's interests and persona |
| **Primary Actor** | Gemini AI |
| **Secondary Actor** | None |
| **Trigger** | Included by UC-15: Generate AI Response |
| **Preconditions** | User object available |
| **Postconditions** | Personalized system prompt created |
| **Priority** | Medium |
| **Frequency** | Every AI generation |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | - | System starts with base SYSTEM_PROMPT (BitBraniac identity) |
| 2 | - | If user has interests: append "USER'S INTERESTS" section |
| 3 | - | If user has persona: append "USER'S CUSTOM INSTRUCTIONS" section |
| 4 | - | Return complete personalized prompt |

### System Prompt Components
```
Base: BitBraniac personality, CS tutor identity, response format
+ User Interests: "This user is interested in: Python, ML, Algorithms..."
+ User Persona: "User's custom instructions: Explain like I'm a beginner..."
```

---

## UC-17: Manage Chat History

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-17 |
| **Use Case Name** | Manage Chat History |
| **Description** | Trims chat history to last 30 messages for AI context |
| **Primary Actor** | Gemini AI |
| **Secondary Actor** | None |
| **Trigger** | Included by UC-15: Generate AI Response |
| **Preconditions** | Messages array provided |
| **Postconditions** | Trimmed messages returned |
| **Priority** | Medium |
| **Frequency** | Every AI generation |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | - | System checks message count |
| 2 | - | If count ≤ 30: return all messages |
| 3 | - | If count > 30: return last 30 messages (slice) |

### Business Rules
- BR-01: MAX_HISTORY_MESSAGES = 30
- BR-02: This equals 15 conversation exchanges (user + bot)

---

## UC-18: Handle API Errors

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-18 |
| **Use Case Name** | Handle API Errors |
| **Description** | Handles Gemini API errors with retry and fallback |
| **Primary Actor** | Gemini AI |
| **Secondary Actor** | None |
| **Trigger** | Extends UC-15 when API error occurs |
| **Preconditions** | API error received |
| **Postconditions** | Either successful retry or error returned |
| **Priority** | Medium |
| **Frequency** | When API fails |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | - | System detects error (503, 429, overloaded) |
| 2 | - | System checks retry count < 3 |
| 3 | - | System calculates delay: 2^retryCount * 1000ms |
| 4 | - | System waits for delay |
| 5 | - | System switches model if retryCount ≥ 2 |
| 6 | - | System retries generateResponse |
| 7 | - | If success: return response |
| 8 | - | If fails after 3 retries: throw final error |

### Retry Schedule
| Attempt | Delay | Model |
|---------|-------|-------|
| 1 | 1 second | gemini-2.5-flash |
| 2 | 2 seconds | gemini-2.5-flash |
| 3 | 4 seconds | gemini-2.0-flash |

---

## UC-19: Auto-Generate Chat Title

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-19 |
| **Use Case Name** | Auto-Generate Chat Title |
| **Description** | Automatically sets chat title from first user message |
| **Primary Actor** | System |
| **Secondary Actor** | None |
| **Trigger** | Extends UC-14 (first message in chat) |
| **Preconditions** | Chat has ≤ 1 existing messages |
| **Postconditions** | Chat title updated |
| **Priority** | Low |
| **Frequency** | Once per chat |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | - | System checks if existingMessages.length ≤ 1 |
| 2 | - | System extracts first 50 characters of message content |
| 3 | - | If content > 50 chars: append "..." |
| 4 | - | System updates chat.title |
| 5 | - | System saves chat |
| 6 | - | Return new title in response |

### Business Rules
- BR-01: Title max length: 50 characters + "..."
- BR-02: Only triggers on first message

---

## UC-20: Rename Chat

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-20 |
| **Use Case Name** | Rename Chat |
| **Description** | Allows user to manually rename a chat |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | User clicks rename option on chat |
| **Preconditions** | 1. User is authenticated<br>2. Chat belongs to user |
| **Postconditions** | Chat title is updated |
| **Priority** | Low |
| **Frequency** | Occasional |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User clicks edit/rename icon on chat | System shows inline edit or modal |
| 2 | User enters new title | System enables save button |
| 3 | User confirms | System sends PUT /api/chat/:id with title |
| 4 | - | Server validates ownership |
| 5 | - | Server updates chat title |
| 6 | - | System updates sidebar display |

### Business Rules
- BR-01: Title max length: 100 characters

---

## UC-21: Delete Chat

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-21 |
| **Use Case Name** | Delete Chat |
| **Description** | Allows user to delete a chat and all its messages |
| **Primary Actor** | User |
| **Secondary Actor** | None |
| **Trigger** | User clicks delete option on chat |
| **Preconditions** | 1. User is authenticated<br>2. Chat belongs to user |
| **Postconditions** | 1. All messages in chat deleted<br>2. Chat deleted |
| **Priority** | Medium |
| **Frequency** | Occasional |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | User clicks delete icon on chat | System shows confirmation dialog |
| 2 | User confirms deletion | System sends DELETE /api/chat/:id |
| 3 | - | Server validates chat ownership |
| 4 | - | Server deletes all messages in chat |
| 5 | - | Server deletes chat document |
| 6 | - | System removes chat from sidebar |
| 7 | - | System clears chat area if deleted chat was active |

### Business Rules
- BR-01: Cascading delete (messages + chat)
- BR-02: Irreversible action

---

# ADMIN PANEL USE CASES

---

## UC-22: Admin Login

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-22 |
| **Use Case Name** | Admin Login |
| **Description** | Allows admin to authenticate with admin password |
| **Primary Actor** | Admin |
| **Secondary Actor** | None |
| **Trigger** | Admin navigates to /admin page |
| **Preconditions** | Admin knows the ADMIN_PASSWORD |
| **Postconditions** | Admin session is established |
| **Priority** | High |
| **Frequency** | Occasional |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | Admin navigates to /admin | System shows password prompt |
| 2 | Admin enters admin password | System masks input |
| 3 | Admin clicks "Verify" or presses Enter | System sends POST /api/admin/verify |
| 4 | - | Server compares password with ADMIN_PASSWORD env var |
| 5 | - | Server returns { success: true } |
| 6 | - | System stores admin password in state |
| 7 | - | System shows admin dashboard |

### Exception Flows

| ID | Condition | Steps |
|----|-----------|-------|
| EF-01 | Wrong password | Server returns 401 → Display "Invalid admin password" |
| EF-02 | No password entered | Client validation → Display "Admin password required" |

### Business Rules
- BR-01: Admin password stored in environment variable
- BR-02: Password sent in header for subsequent requests (x-admin-password)

---

## UC-23: View Statistics

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-23 |
| **Use Case Name** | View Statistics |
| **Description** | Displays admin dashboard with platform statistics |
| **Primary Actor** | Admin |
| **Secondary Actor** | None |
| **Trigger** | Admin successfully logs in |
| **Preconditions** | Admin is authenticated |
| **Postconditions** | Statistics are displayed |
| **Priority** | Medium |
| **Frequency** | Each admin session |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | System loads admin dashboard | System sends GET /api/admin/stats with x-admin-password header |
| 2 | - | Server calculates: |
| | | - Total users (User.countDocuments) |
| | | - New users this week |
| | | - Total chats |
| | | - Total messages |
| | | - Average messages per chat |
| 3 | - | Server includes UC-24: View Activity Charts data |
| 4 | - | Server aggregates top 5 active users |
| 5 | - | System displays overview cards |
| 6 | - | System renders charts |
| 7 | - | System shows top users table |

### Statistics Displayed
- Total Users (count)
- New Users This Week (count)
- Total Chats (count)
- Total Messages (count)
- Average Messages per Chat (calculated)

---

## UC-24: View Activity Charts

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-24 |
| **Use Case Name** | View Activity Charts |
| **Description** | Displays 7-day activity trends for users and chats |
| **Primary Actor** | Admin |
| **Secondary Actor** | None |
| **Trigger** | Included by UC-23: View Statistics |
| **Preconditions** | Admin is authenticated |
| **Postconditions** | Charts rendered |
| **Priority** | Low |
| **Frequency** | Each admin session |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | - | Server aggregates users created per day (last 7 days) |
| 2 | - | Server aggregates chats created per day (last 7 days) |
| 3 | - | Server fills missing days with 0 count |
| 4 | - | System renders line/bar charts |

### Data Format
```json
{
  "userActivityByDay": [
    { "_id": "2026-01-14", "count": 5 },
    { "_id": "2026-01-15", "count": 3 }
  ],
  "chatActivityByDay": [...]
}
```

---

## UC-25: List All Users

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-25 |
| **Use Case Name** | List All Users |
| **Description** | Displays paginated list of all users with search |
| **Primary Actor** | Admin |
| **Secondary Actor** | None |
| **Trigger** | Admin views Users section in admin panel |
| **Preconditions** | Admin is authenticated |
| **Postconditions** | User list displayed |
| **Priority** | Medium |
| **Frequency** | Each admin session |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | Admin views users tab | System sends GET /api/admin/users?page=1&limit=10 |
| 2 | - | Server builds search query (if search param) |
| 3 | - | Server retrieves users with pagination |
| 4 | - | Server aggregates chat counts per user |
| 5 | - | Server returns users with stats |
| 6 | - | System displays table: Name, Email, Interests, Chat Count, Created Date |
| 7 | Admin types in search box | System filters by name or email |
| 8 | Admin clicks pagination | System loads next/prev page |

### Query Parameters
- page: Current page number (default: 1)
- limit: Users per page (default: 10)
- search: Search term for name/email

---

## UC-26: View User Details

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-26 |
| **Use Case Name** | View User Details |
| **Description** | Displays detailed information about a specific user |
| **Primary Actor** | Admin |
| **Secondary Actor** | None |
| **Trigger** | Admin clicks on a user in the list |
| **Preconditions** | Admin is authenticated |
| **Postconditions** | User details displayed |
| **Priority** | Low |
| **Frequency** | Occasional |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | Admin clicks user row | System sends GET /api/admin/users/:id |
| 2 | - | Server retrieves user by ID |
| 3 | - | Server counts user's chats |
| 4 | - | Server counts user's total messages |
| 5 | - | Server returns complete user data |
| 6 | - | System displays: Name, Email, Interests, Persona, Created Date, Chat Count, Message Count |

---

## UC-27: Edit User

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-27 |
| **Use Case Name** | Edit User |
| **Description** | Allows admin to edit a user's information |
| **Primary Actor** | Admin |
| **Secondary Actor** | None |
| **Trigger** | Admin clicks edit on a user |
| **Preconditions** | Admin is authenticated |
| **Postconditions** | User information updated |
| **Priority** | Low |
| **Frequency** | Rare |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | Admin clicks "Edit" on user | System shows edit form/modal |
| 2 | Admin modifies name/email/interests/persona | Fields become editable |
| 3 | Admin clicks "Save" | System sends PUT /api/admin/users/:id |
| 4 | - | Server validates email uniqueness |
| 5 | - | Server updates user document |
| 6 | - | System displays success message |
| 7 | - | System updates user list |

### Exception Flows

| ID | Condition | Steps |
|----|-----------|-------|
| EF-01 | Email already in use | Server returns 400 → Display "Email already in use" |

---

## UC-28: Delete User

| Attribute | Description |
|-----------|-------------|
| **Use Case ID** | UC-28 |
| **Use Case Name** | Delete User |
| **Description** | Allows admin to delete a user and all their data |
| **Primary Actor** | Admin |
| **Secondary Actor** | None |
| **Trigger** | Admin clicks delete on a user |
| **Preconditions** | Admin is authenticated |
| **Postconditions** | User and all associated data deleted |
| **Priority** | Low |
| **Frequency** | Rare |

### Main Success Scenario (Basic Flow)

| Step | Actor | System Response |
|------|-------|-----------------|
| 1 | Admin clicks "Delete" on user | System shows confirmation dialog |
| 2 | Admin confirms deletion | System sends DELETE /api/admin/users/:id |
| 3 | - | Server retrieves all user's chats |
| 4 | - | Server deletes all messages in those chats |
| 5 | - | Server deletes all user's chats |
| 6 | - | Server deletes user document |
| 7 | - | Server returns success |
| 8 | - | System removes user from list |
| 9 | - | System displays "User deleted successfully" |

### Business Rules
- BR-01: Cascading delete (same as UC-08)
- BR-02: Action is irreversible
- BR-03: Admin should be warned before deletion

---

# APPENDIX

## A. Use Case Relationships Summary

### Include Relationships
| Base Use Case | Included Use Case |
|--------------|-------------------|
| UC-01: Register Account | UC-03: Validate Credentials |
| UC-02: Sign In | UC-03: Validate Credentials |
| UC-14: Send Message | UC-15: Generate AI Response |
| UC-15: Generate AI Response | UC-16: Build Personalized Prompt |
| UC-15: Generate AI Response | UC-17: Manage Chat History |
| UC-23: View Statistics | UC-24: View Activity Charts |
| UC-13: Open Chat | UC-17: Manage Chat History |

### Extend Relationships
| Extension Use Case | Base Use Case | Condition |
|-------------------|---------------|-----------|
| UC-09: Select Interests | UC-01: Register Account | Optional after registration |
| UC-10: Set Persona | UC-05: View Profile | User customizes AI |
| UC-18: Handle API Errors | UC-15: Generate AI Response | When API fails |
| UC-19: Auto-Generate Title | UC-14: Send Message | First message only |
| UC-27: Edit User | UC-26: View User Details | Admin clicks edit |
| UC-28: Delete User | UC-25: List All Users | Admin clicks delete |
| UC-20: Rename Chat | UC-13: Open Chat | User wants to rename |
| UC-21: Delete Chat | UC-12: View All Chats | User wants to delete |

## B. Actor Generalization

```
User (Primary Actor)
  └── Admin (Inherits all User capabilities + Admin-specific use cases)
```

## C. Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| Response Time | API responses < 2 seconds |
| AI Response | < 10 seconds (with retries) |
| Concurrent Users | 100+ |
| Uptime | 99.9% |
| Security | JWT authentication, bcrypt password hashing |
| Data Privacy | User data encrypted in transit (HTTPS) |

---

*Document End*
