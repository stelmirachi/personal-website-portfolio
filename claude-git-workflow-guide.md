# Claude Free Tools + Version Control
## A Developer's Workflow Guide

---

## Part 1 — Understanding Claude Free Tier Limits

Before building habits, know what you're working with.

### What the free tier gives you
- Access to **Claude Sonnet** (a capable mid-tier model)
- A **daily message limit** that resets every 24 hours
- **No persistent memory across conversations by default** (unless you're using a paid plan or Projects)
- A fresh context window each new conversation — Claude doesn't remember yesterday's session

### The two biggest constraints to design around
1. **Message limit** — every back-and-forth costs a message. Vague prompts burn messages on clarification rounds.
2. **Context window** — within one conversation, Claude holds a limited amount of text. Long conversations with lots of pasted code will eventually hit the limit or degrade quality.

### What this means practically
> You are the memory layer. Claude is the reasoning layer.
>
> Your job is to bring context *to* Claude efficiently. Claude's job is to think inside that context.

---

## Part 2 — The Core Mental Model: Claude as a Pair Programmer

Think of Claude not as a search engine you query, but as a **pair programmer you brief**.

A good pair programmer needs:
- Context on what you're building
- Context on where you currently are
- A specific, scoped question

A bad brief: *"Help me fix my auth"*
A good brief: *"I'm building a Next.js app with NextAuth. My session isn't persisting after login — here's my `[...nextauth].ts` and the relevant page component. The user object shows in the callback but is undefined in `useSession()`. What am I missing?"*

The difference: **one requires Claude to guess everything, one lets Claude reason immediately.**

---

## Part 3 — Prompt Patterns for Development Work

These are reusable prompt structures. Bookmark or copy these.

---

### Pattern 1 — The Sprint Briefing Prompt
Use at the **start of every new conversation** (especially since free tier has no memory).

```
## Context
Project: [project name]
Current sprint: [sprint name, e.g. "Sprint 4 — Auth"]
Stack: [e.g. Next.js 14, Supabase, Tailwind]
Repo structure:
[paste a short folder tree if relevant]

## What I've already done
[2–4 bullet points of what's working]

## What I'm working on right now
[1 sentence]

## My specific question
[as narrow as possible]
```

This brief costs you ~30 seconds to write but saves 2–3 clarification messages.

---

### Pattern 2 — The Code Review Prompt
Use when you want Claude to review a file, not rewrite it.

```
Review this [file type] for:
- Logic errors
- Security issues (especially [auth / input validation / SQL injection])
- Bad practices I should know about

Do NOT rewrite the whole file. Flag specific lines and explain each issue briefly.

[paste file]
```

---

### Pattern 3 — The "Explain Before Implement" Prompt
Use when you're learning something new, not just getting it done.

```
I want to implement [feature] using [technology].
Before writing any code:
1. Explain how [technology] handles [concept] conceptually
2. Tell me what files I'll need to touch and why
3. Flag anything that works differently from [thing I already know]

Then walk me through the implementation step by step, not all at once.
```

This prevents you from copy-pasting code you don't understand.

---

### Pattern 4 — The Debugging Prompt
Use when something is broken. Don't just say "it doesn't work."

```
## Bug report
Expected behavior: [what should happen]
Actual behavior: [what is happening]
When it happens: [always / only when X]

## What I've already tried
- [attempt 1]
- [attempt 2]

## Relevant code
[paste only the relevant snippet — not your whole project]

## Error message (if any)
[paste exact error]
```

---

### Pattern 5 — The Architecture Check Prompt
Use before starting a new feature or refactor.

```
I'm about to build [feature].
My current stack: [stack]
My current folder structure: [tree]

Before I start, tell me:
1. Where does this feature logically live in my structure?
2. Are there any patterns I should follow that fit my existing setup?
3. Anything I should avoid given how my project is already structured?
```

---

### Pattern 6 — The Sprint Closeout Prompt
Use at the **end of a sprint**, before committing.

```
I just finished [sprint goal].
Here's what I built: [brief summary]
Here's what I'm about to commit: [list of changed files]

Before I commit:
1. Is there anything I likely forgot?
2. Any cleanup I should do first?
3. Suggest a conventional commit message for this work.
```

---

## Part 4 — Version Control Workflow

This is the Git workflow to use alongside Claude throughout the project.

### The golden rule
**One sprint = one branch. One logical change = one commit.**

Never commit "misc fixes" or "stuff." Commits are your project's diary.

---

### Branch naming convention
```
feature/sprint-01-scaffolding
feature/sprint-03-database-schema
feature/sprint-05-auth
fix/contact-form-validation
chore/update-dependencies
```

---

### The sprint Git flow

```bash
# Start of every sprint
git checkout main
git pull origin main
git checkout -b feature/sprint-XX-[name]

# During the sprint — commit often, in small logical chunks
git add [specific files]       # never: git add .
git commit -m "type: message"

# End of sprint — push and open a PR to main
git push origin feature/sprint-XX-[name]
# Then open a pull request on GitHub, even if you're the only dev
```

Opening a PR to yourself sounds unnecessary — but it's where you do a final review before merging, and it builds the muscle memory that matters in team settings.

---

### Conventional commits — use these prefixes

| Prefix | When to use |
|--------|-------------|
| `feat:` | new feature or visible addition |
| `fix:` | bug fix |
| `chore:` | setup, config, dependency updates |
| `style:` | CSS / formatting changes, no logic |
| `refactor:` | restructuring code without changing behavior |
| `docs:` | README, comments, documentation |
| `test:` | adding or fixing tests |
| `ci:` | CI/CD pipeline changes |

Examples:
```
feat: add blog post listing page with pagination
fix: resolve session not persisting after login
chore: add .env.example with required keys
refactor: extract auth logic into useAuth hook
ci: add GitHub Actions deploy workflow for Vercel
```

---

### What to always `.gitignore`
```
# Environment variables — NEVER commit these
.env
.env.local
.env.production

# Dependencies
node_modules/
vendor/

# Build output
.next/
dist/
build/

# IDE files
.vscode/settings.json
.idea/

# OS files
.DS_Store
Thumbs.db
```

Always commit an `.env.example` with the **keys but not the values** so anyone (or future you) knows what variables are needed.

---

### The `.env.example` pattern
```env
# Database
DATABASE_URL=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# CMS
SANITY_PROJECT_ID=
SANITY_DATASET=

# Email (for contact form)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

---

## Part 5 — Combining Claude + Git: The Full Loop

This is the workflow you'll repeat every sprint.

```
┌─────────────────────────────────────────────────────┐
│  SPRINT START                                       │
│  1. git checkout -b feature/sprint-XX-name          │
│  2. Open Claude — use Sprint Briefing Prompt        │
│  3. Agree on the plan before touching any code      │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│  DURING SPRINT                                      │
│  • Use "Explain Before Implement" for new concepts  │
│  • Use "Debugging Prompt" when stuck                │
│  • git add + git commit after each logical chunk    │
│  • Keep Claude conversation open for the sprint     │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│  SPRINT END                                         │
│  1. Use Sprint Closeout Prompt in Claude            │
│  2. Do final cleanup based on Claude's feedback     │
│  3. git push + open PR                              │
│  4. Merge to main                                   │
│  5. Start a fresh Claude conversation next sprint   │
└─────────────────────────────────────────────────────┘
```

---

## Part 6 — Context Management: Making Claude Work Harder Per Message

Since you're on the free tier, every message counts. These habits reduce waste.

### Keep one conversation per sprint
Don't mix sprints in one conversation. Claude's context degrades when conversations get too long. When you start a new sprint, start a new conversation and use the Sprint Briefing Prompt to restore context.

### Paste smart, not everything
Bad: paste your entire 300-line component and say "something is wrong here."
Good: paste the 20 lines around the issue and say "the error originates around line 47."

### Ask for a plan first, code second
```
Before writing any code, outline the approach in 3–5 steps.
I'll confirm before you implement.
```
This prevents Claude from building the wrong thing, which wastes a message to undo.

### Use follow-up efficiently
After Claude explains or implements something, follow up in the same message thread:
```
Good. Now do the same for the blog API route.
```
You don't need a new message — just continue. Claude holds all previous context within the same conversation.

### When the conversation gets long
If you sense quality degrading (Claude starts forgetting earlier decisions), do this:
```
Summarize the decisions we've made so far in this conversation as a bullet list.
I'll use this as a briefing for a fresh conversation.
```
Copy that summary and start fresh.

---

## Part 7 — GitHub Repo Setup Checklist

Do this once at the start of your project.

```
☐ Create the repo on GitHub (public or private, your choice)
☐ Initialize with a README.md
☐ Add a .gitignore (use the Node or Next.js template from GitHub)
☐ Create a .env.example and commit it
☐ Write a short README explaining: what the project is, how to run it locally, required env vars
☐ Set main as a protected branch (prevents accidental force pushes)
☐ Enable GitHub Issues — use it to track sprint tasks
☐ Create a GitHub Project board (Kanban) — one card per sprint
```

### README minimum structure
```markdown
# [Your Name] — Personal Website

Portfolio and blog built with [stack].

## Running locally
1. Clone the repo
2. Copy `.env.example` to `.env.local` and fill in values
3. `npm install`
4. `npm run dev`

## Stack
- Frontend: ...
- Backend: ...
- Database: ...
- Auth: ...
- CMS: ...
- Hosting: ...
```

---

## Part 8 — Quick Reference Card

Print or pin this somewhere visible.

```
BEFORE CODING A SPRINT
  ✓ New branch from main
  ✓ Brief Claude with: project, stack, what's done, what you're building
  ✓ Ask for a plan before implementation

WHILE CODING
  ✓ Commit after each logical chunk (not at the end of the day)
  ✓ Use conventional commit prefixes
  ✓ Never git add . blindly — stage files explicitly

WHEN STUCK
  ✓ Paste only the relevant code + the exact error
  ✓ Tell Claude what you've already tried
  ✓ Ask for explanation before a fix

WHEN DONE WITH A SPRINT
  ✓ Use Sprint Closeout Prompt in Claude
  ✓ Clean up before committing
  ✓ Push → open PR → merge to main
  ✓ Start a fresh Claude conversation next sprint

NEVER
  ✗ Commit .env or secrets
  ✗ Commit directly to main
  ✗ Paste your whole codebase into Claude
  ✗ Ask "fix my code" without context
  ✗ Leave a sprint mid-flight without a commit
```
