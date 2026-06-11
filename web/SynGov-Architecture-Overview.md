# SynGov Architecture & Features Overview

This document serves as a comprehensive breakdown of the core features, systems, and architectural decisions implemented in the SynGov platform. It is designed to get the entire team up to speed on our hybrid Web2/Web3 infrastructure, weighted voting mechanics, real-time data sync, and automation systems.

---

## 1. Decentralized & Weighted Voting Engine
At the heart of SynGov is a sophisticated, meritocratic voting system where votes are not created equal; they are weighted by contribution and domain expertise.

* **Expertise Bonus:** Implemented logic (`lib/voting/weightage.ts`) that maps proposal categories (e.g., `finance`, `tech`) to specific user tags. If a user votes on a topic within their expertise, they receive a strict `+0.2x` multiplier on their vote weight.
* **Dynamic Base Weighting:** A user's base voting power is dynamically calculated from their `contribution_score`. The formula `(score / 100)` establishes the baseline.
* **Weight Clamping:** To prevent oligarchies while still rewarding active members, the final combined weight (Base + Expertise) is rigidly clamped between `0.5x` (minimum influence) and `2.0x` (maximum influence).
* **Threshold Outcomes:** Voting closure logic automatically tallies the weighted sums. Proposals strictly require a `60%` weighted approval threshold to pass.
* **Concurrency & Safety:** The `castVoteAction` strictly validates active voting windows, prevents duplicate votes via database constraints, and prevents manipulation.

---

## 2. 100% Live, Real-Time Data Architecture
We have completely stripped out all mock data, transitioning the entire application to a live, reactive architecture.

* **Supabase Realtime Sync:** A global React hook (`useRealtimeSync.ts`) is injected into the root layout. It listens for `INSERT` and `UPDATE` events on the `proposals`, `votes`, and `users` tables via PostgreSQL logical replication.
* **Instant Reactivity:** When a user casts a vote, creates a proposal, or updates a score, the hook triggers `router.refresh()`, updating the UI instantly across all connected clients without manual page reloads.
* **Dynamic Dashboards:** 
  * The `Dashboard` and `Analytics` pages parse raw data from Supabase server-side to calculate live participation rates, category distribution (scaling bar charts dynamically), and community health scores.
  * The Activity Feed is powered directly by the `contribution_activity` ledger.
* **Members Directory:** Automatically ranks and categorizes all users into tiers (core, high, medium, low) based on their live contribution scores, tallying their total votes on the fly.

---

## 3. Gamified Contribution Economy
SynGov tracks and rewards civic participation to encourage an active community.

* **Points Engine:** Users earn points for beneficial actions: Creating proposals (`+10 pts`) and casting votes (`+5 pts`).
* **Voter Apathy Penalties:** When voting on a proposal closes, a background action automatically scans for users who did not vote and deducts points (`-3 pts`) to discourage inactivity.
* **Immutable Activity Ledger:** Every single point change is permanently logged in the `contribution_activity` table with a human-readable reason for total transparency.
* **Automated Sync:** PostgreSQL database triggers automatically recalculate a user's total `governance_weight` the exact millisecond their `contribution_score` changes.

---

## 4. Blockchain Integration (Polygon)
To guarantee the integrity and immutability of governance decisions, critical events are logged on-chain.

* **Ethers.js & Smart Contracts:** Integrated with a deployed Solidity smart contract via `ethers.js` connected to the Polygon network.
* **On-Chain Milestones:** 
  1. Proposal creation is logged.
  2. Every individual vote cast (with its applied weight) is logged.
  3. The final result (Passed/Rejected with exact percentages) is permanently recorded.
* **Audit Trails:** The returned cryptographic transaction hashes (`tx_hash`) are stored in the Supabase database and displayed on the UI, allowing anyone to verify the records independently on PolygonScan.

---

## 5. Frictionless Authentication
We replaced standard Web3 wallet logins with an invisible, frictionless Web2 flow to maximize college student adoption.

* **Auto-User Generation:** The custom authentication server action (`auth-actions.ts`) instantly verifies an email against the Supabase `users` table upon login. If the user is new, it automatically creates their account and initializes their contribution score.
* **Secure Sessions:** The permanent database UUID is securely encrypted into an HTTP-only cookie, ensuring all future votes and actions map reliably to the user's permanent database profile.

---

## 6. Automated Communication & Cron Jobs
A proactive, non-blocking notification system keeps the community informed and drives participation.

* **Resend Integration:** Implemented an email engine using the Resend API designed to handle mass emails asynchronously.
* **Branded HTML Templates:** Created highly compatible, inline-styled email templates:
  * **Proposal Created:** Includes the AI-generated summary and categorization.
  * **Proposal Results:** Includes an animated visual progress bar of the final tally.
  * **Voting Reminders:** Includes a visual participation bar and countdown.
* **Vercel Cron Automation:** Built a secure, hourly automated route. It queries the database for proposals closing within 24 hours, isolates users who haven't voted, and sends them targeted reminder emails.

---

## 7. Robust Database Schema (Supabase/PostgreSQL)
A complete, scalable, and secure relational database schema supports the complex logic.

* **4 Core Tables:**
  * `users`: Stores core identity, contribution scores, and expertise tag arrays.
  * `proposals`: Stores proposal metadata, AI summaries (as JSONB), aggregated weighted tallies, and deadline timestamps.
  * `votes`: Stores granular data on every vote, breaking down weights. Enforces one vote per user per proposal.
  * `contribution_activity`: The immutable ledger for point modifications.
* **Row Level Security (RLS):** Database policies ensure data integrity and prevent unauthorized manipulation.

---

## 8. Frontend Engineering & UI/UX
The user interface was rigorously polished to reflect a premium, responsive Web3 application.

* **VotingPanel Component:** Engineered a highly reactive dashboard widget that:
  * Displays the user's real-time weight and score.
  * Automatically highlights an "Expert Match" badge if applicable.
  * Features a live ticking countdown timer to the deadline.
  * Replaces action buttons with an animated confirmation screen outlining the exact weight applied upon voting.
* **Responsive Architecture:** Converted rigid desktop layouts into fluid, mobile-first CSS grids. Fixed navbar scaling and optimized logo margins for small screens.
* **Micro-Interactions:** Custom `ClientInteractions.tsx` script handles smooth parallax scrolling, count-up animations for statistics, and intersection observer reveals for a highly polished feel.
