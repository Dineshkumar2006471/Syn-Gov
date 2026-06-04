# Project Requirement Document

## Project Name: SynGov

### Tagline: Smarter decision-making for college communities

---

## 1) What We Are Building

We are building a **governance system for college clubs, societies, and student communities**.

Not just a voting app.
Not just a DAO clone.

We are building a way for student communities to make decisions in a **more transparent, fair, and understandable** way.

---

## 2) The Problem

College clubs and societies usually face the same issues:

- a few people make most decisions
- many members stay inactive
- fund usage is not always clear
- proposals are difficult to understand
- discussions become messy
- active contributors are often treated the same as passive members
- trust issues happen because the process is not visible

So even when the community is good, the decision-making process is weak.

---

## 3) Our Core Vision

We are not trying to "create another DAO."

We are trying to improve how communities decide things together.

### The Real Innovation Layer

Not blockchain.
Not AI.

The innovation is:

> **Better online collective decision-making.**

Blockchain + AI are only tools.

That is the real product thinking behind this project.

---

## 4) Why College Clubs and Societies

We chose college communities because this is where the system fits naturally.

Why this user group makes sense:

- they already work in teams
- they already make shared decisions
- contributions can be observed easily
- participation levels matter
- transparency is useful
- the problem is easy to understand and demo

Examples:

- coding clubs
- entrepreneurship cells
- fest committees
- student councils
- innovation societies
- departmental clubs

This gives us a practical and relatable first use case.

---

## 5) Target Users

### Primary Users

- club members
- core committee members
- student leaders
- event organizers
- volunteers

### Secondary Users

- faculty coordinators
- mentors
- college administration
- future student communities using the same system

---

## 6) The Product Idea in One Line

A **contribution-aware governance platform** for college communities where decisions become clearer, participation becomes fairer, and influence is based on trust, activity, and relevance.

---

## 7) What Makes This Different

Most teams will build:

- wallet connect
- proposal creation
- simple voting

That is basic.

Our difference is that we are designing a system where:

- decisions are easier to understand
- active contributors are recognized
- experts in a specific area can have slightly more influence in that area
- everyone can still participate
- governance is transparent
- participation does not depend only on who has more power

---

## 8) Core Innovation Areas

### A. Context-Based Voting

Not all decisions are the same.

Example:

- finance-related proposals can give slightly more weight to finance-oriented members
- event-related proposals can give slightly more weight to organizers
- tech-related proposals can give slightly more weight to technical contributors

**Important:** everyone still gets to vote.
This is not exclusion. It is smarter balance.

---

### B. Participation + Reputation

A person's influence should not come only from title or money.

The system considers:

- attendance
- completed tasks
- past contributions
- reliability
- consistency
- community trust

This helps reward active people fairly.

---

### C. Governance Simplification

Most people do not read long proposals.

So every proposal will be shown in a simple format like:

- what is being asked
- why it matters
- expected cost
- expected impact
- risk level
- deadline
- who it affects

This reduces confusion and voting fatigue.

---

### D. Adaptive Governance

The system should notice when the community is struggling.

Example:

- if participation is low, the interface becomes simpler
- if proposals are too long, they are summarized better
- if there is too much noise, the system highlights the key points

This is not about making the system more complex.
It is about making governance easier when the community needs help.

---

## 9) The Main User Journey

**Step 1**
A user joins the community and connects their account.

**Step 2**
The user can view:
- their participation score
- their contribution history
- current proposals
- community activity

**Step 3**
A member creates a proposal.

Example:
> "Should we allocate ₹20,000 for the annual hackathon event?"

**Step 4**
The system converts that proposal into a simple readable format with key details.

**Step 5**
Members discuss and vote.

**Step 6**
The result is visible to everyone transparently.

**Step 7**
The dashboard updates:
- voting result
- participation rate
- approval status
- community impact

---

## 10) MVP Scope

### Must Have

- login / wallet or simple sign-in
- proposal creation
- proposal summary view
- voting feature
- contribution or reputation score
- contextual vote weighting
- governance dashboard
- proposal status tracking

### Nice to Have

- AI-generated simple summary
- AI-generated pros and cons
- activity insights
- adaptive thresholds
- treasury tracking
- delegation to trusted members

---

## 11) What We Are Not Building

To keep the product useful and not bloated, we are not focusing on:

- random AI chatbot features
- NFT badges with no purpose
- overcomplicated token systems
- unnecessary metaverse ideas
- too many chain integrations
- fancy features that do not solve the governance problem

---

## 12) Why This Idea Is Strong for the Judges

Because it does not just look technical. It solves a real issue.

Judges can clearly see:

- the problem
- the users
- the value
- the practical use case
- the scalability

It also sounds different from generic hackathon entries because the focus is not "blockchain for the sake of blockchain."

It is about improving how communities decide together.

---

## 13) Expected Impact

If this works well, the community gets:

- more transparent decisions
- more active participation
- less favoritism
- better decision quality
- less confusion
- better recognition for contributors
- more trust in the system

---

## 14) Success Metrics

We will consider the product successful if we can show:

- members understand proposals faster
- more members participate in voting
- active contributors feel recognized
- the process feels fairer
- the community can see decision history clearly
- users feel the governance system is easier than the old way

---

## 15) Product Positioning

### Final Positioning Line

> **A human-first governance system for college communities that improves collective decision-making through transparency, contribution awareness, and simple proposal design.**

---

## 16) Final Summary

This project is not about building "a DAO."

It is about building a **better way for student communities to make decisions together**.

That is the real idea.
That is the real value.
That is the part we should present to judges.

---

# Tech Stack

> *(Refer to tech stack diagram in original document)*

---

# Team Development Plan

## SynGov — Team Development Plan

### Hackathon Build Strategy

---

## 1. Core Product Vision

We are NOT building just another DAO voting app.

We are building:

> **"A human-first governance system for collaborative student communities."**

The focus is:

- better collective decision-making
- transparent governance
- contribution-aware participation
- simplified proposal understanding

---

### The Real Innovation Layer

Not blockchain.
Not AI.

The innovation is:

> **Better online collective decision-making.**

Blockchain + AI are only tools.

---

## 2. Our Product Goal

We want to solve problems inside:

- college clubs
- student societies
- innovation communities
- fest committees
- entrepreneurship cells

Main issues:

- low participation
- unclear decisions
- proposal fatigue
- unfair influence
- poor transparency

---

## 3. Final Tech Stack

### Frontend

- Next.js
- Tailwind CSS
- shadcn/ui

### Backend

- Supabase
- PostgreSQL

### AI Layer

- Gemini API

Used for:
- proposal simplification
- KPI extraction
- proposal summaries

### Blockchain

- Polygon Amoy Testnet
- Solidity
- OpenZeppelin

Used for:
- proposal logs
- voting transparency
- governance records

### Deployment

- Vercel

---

## 4. Development Approach

We are using a **Hybrid Development Approach**.

Meaning:
- each member works independently
- but integration happens continuously

This avoids:
- dependency bottlenecks
- late-stage integration chaos

> **IMPORTANT RULE:** We DO NOT wait until the end to integrate. We integrate feature-by-feature during development.

---

## 5. Shared Product Structure

Everyone should follow the same data structure.

### Proposal Object

```json
{
  "id": "",
  "title": "",
  "description": "",
  "budget": "",
  "riskLevel": "",
  "timeline": "",
  "category": "",
  "createdBy": "",
  "summary": "",
  "voteStats": {}
}
```

### User Object

```json
{
  "id": "",
  "name": "",
  "contributionScore": "",
  "participationLevel": "",
  "governanceWeight": "",
  "expertiseTags": []
}
```

---

## 6. Team Roles & Deliverables

---

### Member 1 — Frontend & UX

**Responsibility:** Build the entire user experience and interface.

#### Main Deliverables — Pages

- Dashboard
- Proposal Submission Page
- Proposal Review Page
- Governance Analytics Page
- User Contribution/Profile Page

#### UI Responsibilities

- responsive layout
- reusable components
- proposal cards
- KPI sections
- voting UI
- discussion UI

#### Tools To Use

- Next.js
- Tailwind
- shadcn/ui

#### Important Notes

- Use mock JSON data initially
- Do NOT wait for backend APIs
- Keep UI clean and minimal
- Avoid crypto-style design

---

### Member 2 — Backend & AI

**Responsibility:** Build the application logic and AI layer.

#### Main Deliverables — Backend

- Supabase setup
- PostgreSQL schema
- APIs for:
  - proposals
  - voting
  - contribution scores
  - analytics

#### AI Layer (Gemini API)

- proposal simplification
- KPI extraction
- summary generation
- governance insights

#### Database Tables

- users
- proposals
- votes
- comments
- contribution_activity

#### Important Notes

- Keep APIs simple
- Maintain consistent response structure
- AI should simplify governance, not act as chatbot

---

### Member 3 — Blockchain & Governance Logic

**Responsibility:** Build smart contract and governance infrastructure.

#### Main Deliverables — Smart Contracts

- proposal logging
- vote recording
- proposal status tracking

#### Governance Logic

- contribution weight calculation
- contextual vote weighting
- wallet integration

#### Blockchain Stack

- Solidity
- OpenZeppelin
- Polygon Amoy

#### Important Notes

- Keep contracts minimal
- Do NOT overengineer tokenomics
- Blockchain is for transparency, not everything

---

## 7. MVP Features (Must Build)

### Core Features

- ✅ Proposal creation
- ✅ Proposal KPI summary
- ✅ Voting system
- ✅ Contribution-aware governance
- ✅ Governance dashboard
- ✅ Proposal discussion
- ✅ AI-generated summaries
- ✅ Blockchain vote logging

---

## 8. Nice To Have Features

Only after MVP works:

- adaptive governance
- delegation system
- treasury tracking
- advanced analytics
- proposal recommendation system

---

## 9. Design Philosophy

The product should feel like:

- modern SaaS
- simple governance tool
- clean and trustworthy

NOT:

- crypto trading platform
- flashy Web3 dashboard

---

## 10. Important Product Principles

We are avoiding:

- unnecessary AI chatbots
- NFT clutter
- complex token systems
- overengineered blockchain logic
- useless fancy features

We are focusing on **practical governance improvement**.

---

## 11. Development Roadmap

### Phase 1 — Architecture Freeze

Finalize:
- DB schema
- API structure
- page structure
- proposal objects

### Phase 2 — Independent Development

All 3 members work independently.

| Member | Focus |
|--------|-------|
| Frontend | Mock data UI |
| Backend | APIs + DB |
| Blockchain | Contracts + governance logic |

### Phase 3 — Continuous Integration

Integrate:
- proposal flow
- voting flow
- dashboard data

Step-by-step.

### Phase 4 — AI Integration

Connect:
- summaries
- KPI extraction
- proposal simplification

### Phase 5 — Final Polish

- bug fixes
- responsiveness
- animations
- demo optimization

---

## 12. Final Product Positioning

> **"A transparent contribution-aware governance system for collaborative student communities."**

---

## 13. Final Goal

We are not trying to impress judges with complexity.

We are trying to impress them with:

- clarity
- practicality
- governance innovation
- real usability

That is our competitive advantage.
