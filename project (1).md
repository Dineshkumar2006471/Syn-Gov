# SynGov — Project Technical Guide

> Complete end-to-end implementation reference for the SynGov prototype.
> This document is written for a developer IDE (e.g. Google IDX / Cursor) to follow as a build guide.
> Every section is ordered by dependency. Follow phases in sequence.

---

## Table of Contents

1. [What You Are Building](#1-what-you-are-building)
2. [Repository Structure](#2-repository-structure)
3. [Environment Setup](#3-environment-setup)
4. [Database — Supabase + PostgreSQL](#4-database--supabase--postgresql)
5. [Backend — Next.js API Routes](#5-backend--nextjs-api-routes)
6. [AI Integration — Gemini 2.5 Flash via Vertex AI](#6-ai-integration--gemini-25-flash-via-vertex-ai)
7. [Blockchain — Solidity + Polygon Amoy](#7-blockchain--solidity--polygon-amoy)
8. [Frontend — Pages and Components](#8-frontend--pages-and-components)
9. [Governance Logic](#9-governance-logic)
10. [Integration Checklist](#10-integration-checklist)
11. [Deployment — Vercel](#11-deployment--vercel)
12. [Environment Variables Reference](#12-environment-variables-reference)

---

## 1. What You Are Building

**SynGov** is a governance platform for college clubs and student communities. The product lets members:

- Create structured proposals
- Vote on them with weighted influence based on contributions
- Understand proposals through AI-generated summaries
- Track decisions transparently via blockchain logs

**The real product** is better collective decision-making. Blockchain is the audit trail. AI is the simplification layer.

---

## 2. Repository Structure

```
syngov/
├── app/                        # Next.js 15 App Router
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── dashboard/page.tsx
│   ├── proposals/
│   │   ├── page.tsx            # Proposal list
│   │   ├── new/page.tsx        # Create proposal
│   │   └── [id]/page.tsx       # Proposal detail
│   ├── profile/[id]/page.tsx
│   ├── analytics/page.tsx
│   └── layout.tsx
│
├── components/
│   ├── ui/                     # shadcn/ui auto-generated
│   ├── proposals/
│   │   ├── ProposalCard.tsx
│   │   ├── ProposalKPIPanel.tsx
│   │   ├── VotingWidget.tsx
│   │   └── DiscussionThread.tsx
│   ├── dashboard/
│   │   ├── ParticipationScore.tsx
│   │   ├── ActivityFeed.tsx
│   │   └── CommunityHealth.tsx
│   └── shared/
│       ├── CategoryBadge.tsx
│       ├── RiskBadge.tsx
│       └── StatusBadge.tsx
│
├── lib/
│   ├── supabase.ts             # Supabase client
│   ├── gemini.ts               # Vertex AI / Gemini client
│   ├── governance.ts           # Weight calculation logic
│   └── types.ts                # All shared TypeScript types
│
├── app/api/
│   ├── proposals/
│   │   ├── route.ts            # GET list, POST create
│   │   └── [id]/
│   │       ├── route.ts        # GET single
│   │       └── vote/route.ts   # POST vote
│   ├── users/
│   │   └── [id]/route.ts
│   ├── analytics/route.ts
│   └── ai/
│       └── summarize/route.ts
│
├── contracts/                  # Solidity smart contracts
│   ├── ProposalRegistry.sol
│   ├── VoteRegistry.sol
│   └── scripts/
│       └── deploy.ts
│
├── hooks/
│   ├── useProposals.ts
│   ├── useUser.ts
│   └── useVote.ts
│
├── mock/                       # Mock JSON for frontend development
│   ├── proposals.json
│   ├── users.json
│   └── analytics.json
│
├── .env.local
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 3. Environment Setup

### 3.1 Prerequisites

```
Node.js 20+
npm or pnpm (prefer pnpm)
Git
A Supabase account (free tier is fine)
A Google Cloud project with Vertex AI API enabled
MetaMask browser extension (for blockchain testing)
Hardhat (for contract deployment)
```

### 3.2 Initialize the Next.js Project

```bash
npx create-next-app@latest syngov \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd syngov
```

### 3.3 Install All Dependencies

```bash
# UI Components
npx shadcn@latest init
npx shadcn@latest add button card badge input textarea select tabs dialog progress avatar separator

# Supabase
pnpm add @supabase/supabase-js @supabase/ssr

# Google Vertex AI (Gemini)
pnpm add @google-cloud/vertexai

# Blockchain
pnpm add ethers
pnpm add -D hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts

# Charts and UI extras
pnpm add recharts lucide-react date-fns clsx

# Auth
pnpm add @supabase/auth-helpers-nextjs
```

### 3.4 shadcn/ui Configuration

When running `shadcn init`, choose:
- Style: Default
- Base color: Neutral
- CSS variables: Yes

---

## 4. Database — Supabase + PostgreSQL

### 4.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project — name it `syngov`
3. Copy your `Project URL` and `anon public key`
4. Go to SQL Editor

### 4.2 Run This SQL to Create All Tables

```sql
-- USERS TABLE
create table users (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text unique not null,
  wallet_address text,
  contribution_score integer default 0,
  participation_level text default 'inactive'
    check (participation_level in ('inactive', 'low', 'medium', 'high', 'core')),
  governance_weight decimal(3,2) default 1.00,
  expertise_tags text[] default '{}',
  created_at timestamp with time zone default now()
);

-- PROPOSALS TABLE
create table proposals (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  budget text default 'none',
  risk_level text not null
    check (risk_level in ('low', 'medium', 'high')),
  timeline text,
  category text not null
    check (category in ('finance', 'events', 'tech', 'operations', 'general')),
  created_by uuid references users(id),
  summary jsonb,         -- AI-generated structured summary stored as JSON
  status text default 'pending'
    check (status in ('pending', 'active', 'passed', 'rejected', 'closed')),
  created_at timestamp with time zone default now(),
  closes_at timestamp with time zone
);

-- VOTES TABLE
create table votes (
  id uuid default gen_random_uuid() primary key,
  proposal_id uuid references proposals(id) on delete cascade,
  user_id uuid references users(id),
  vote_type text not null
    check (vote_type in ('for', 'against', 'abstain')),
  weighted_value decimal(4,2) not null,
  created_at timestamp with time zone default now(),
  unique(proposal_id, user_id)   -- one vote per user per proposal
);

-- COMMENTS TABLE
create table comments (
  id uuid default gen_random_uuid() primary key,
  proposal_id uuid references proposals(id) on delete cascade,
  user_id uuid references users(id),
  content text not null,
  created_at timestamp with time zone default now()
);

-- CONTRIBUTION ACTIVITY TABLE
create table contribution_activity (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id),
  activity_type text not null,
  description text,
  score_delta integer not null,
  created_at timestamp with time zone default now()
);
```

### 4.3 Row Level Security (RLS) — Basic Setup

```sql
-- Enable RLS on all tables
alter table users enable row level security;
alter table proposals enable row level security;
alter table votes enable row level security;
alter table comments enable row level security;
alter table contribution_activity enable row level security;

-- Allow authenticated users to read all
create policy "Allow read for all authenticated"
  on users for select using (auth.role() = 'authenticated');

create policy "Allow read for all authenticated"
  on proposals for select using (auth.role() = 'authenticated');

create policy "Allow read for all authenticated"
  on votes for select using (auth.role() = 'authenticated');

create policy "Allow read for all authenticated"
  on comments for select using (auth.role() = 'authenticated');

-- Allow users to insert their own data
create policy "Allow user to vote once"
  on votes for insert using (auth.uid() = user_id);

create policy "Allow user to comment"
  on comments for insert using (auth.uid() = user_id);

create policy "Allow user to create proposal"
  on proposals for insert using (auth.uid() = created_by);
```

### 4.4 Supabase Client Setup

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## 5. Backend — Next.js API Routes

### 5.1 Shared Types

```typescript
// lib/types.ts

export interface Proposal {
  id: string
  title: string
  description: string
  budget: string
  riskLevel: 'low' | 'medium' | 'high'
  timeline: string
  category: 'finance' | 'events' | 'tech' | 'operations' | 'general'
  createdBy: string
  summary: AISummary | null
  voteStats: VoteStats
  status: 'pending' | 'active' | 'passed' | 'rejected' | 'closed'
  createdAt: string
  closesAt: string
}

export interface AISummary {
  what: string
  why: string
  cost: string
  impact: string
  risk: 'low' | 'medium' | 'high'
  deadline: string
  affects: string
}

export interface VoteStats {
  for: number
  against: number
  abstain: number
  participationRate: number
  result: 'pending' | 'passed' | 'rejected'
}

export interface User {
  id: string
  name: string
  contributionScore: number
  participationLevel: 'inactive' | 'low' | 'medium' | 'high' | 'core'
  governanceWeight: number
  expertiseTags: string[]
}

export interface ApiResponse<T> {
  success: boolean
  data: T | null
  error: string | null
}
```

### 5.2 API: POST /api/proposals (Create Proposal)

```typescript
// app/api/proposals/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { summarizeProposal } from '@/lib/gemini'
import { ApiResponse, Proposal } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, description, budget, riskLevel, timeline, category, createdBy, closesAt } = body

    // Step 1: Get AI summary
    const summary = await summarizeProposal(`${title}\n\n${description}\n\nBudget: ${budget}\nTimeline: ${timeline}`)

    // Step 2: Insert into Supabase
    const { data, error } = await supabase
      .from('proposals')
      .insert({
        title,
        description,
        budget,
        risk_level: riskLevel,
        timeline,
        category,
        created_by: createdBy,
        summary,
        status: 'active',
        closes_at: closesAt
      })
      .select()
      .single()

    if (error) throw new Error(error.message)

    const response: ApiResponse<typeof data> = { success: true, data, error: null }
    return NextResponse.json(response, { status: 201 })

  } catch (err: any) {
    return NextResponse.json({ success: false, data: null, error: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('proposals')
      .select(`
        *,
        votes(vote_type, weighted_value)
      `)
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)

    const proposals = data.map(p => ({
      ...p,
      voteStats: computeVoteStats(p.votes || [])
    }))

    return NextResponse.json({ success: true, data: proposals, error: null })
  } catch (err: any) {
    return NextResponse.json({ success: false, data: null, error: err.message }, { status: 500 })
  }
}

function computeVoteStats(votes: any[]) {
  const forWeight = votes.filter(v => v.vote_type === 'for').reduce((s, v) => s + v.weighted_value, 0)
  const againstWeight = votes.filter(v => v.vote_type === 'against').reduce((s, v) => s + v.weighted_value, 0)
  const abstainWeight = votes.filter(v => v.vote_type === 'abstain').reduce((s, v) => s + v.weighted_value, 0)
  const total = votes.length
  return {
    for: forWeight,
    against: againstWeight,
    abstain: abstainWeight,
    participationRate: total,
    result: forWeight > againstWeight ? 'passed' : total === 0 ? 'pending' : 'rejected'
  }
}
```

### 5.3 API: POST /api/proposals/:id/vote

```typescript
// app/api/proposals/[id]/vote/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { calculateGovernanceWeight } from '@/lib/governance'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId, voteType } = await req.json()
    const proposalId = params.id

    // Fetch user and proposal in parallel
    const [userResult, proposalResult] = await Promise.all([
      supabase.from('users').select('*').eq('id', userId).single(),
      supabase.from('proposals').select('category').eq('id', proposalId).single()
    ])

    if (userResult.error) throw new Error('User not found')
    if (proposalResult.error) throw new Error('Proposal not found')

    const user = userResult.data
    const category = proposalResult.data.category

    // Calculate governance weight for this vote
    const weightedValue = calculateGovernanceWeight(user, category)

    // Insert vote (unique constraint prevents double voting)
    const { data, error } = await supabase
      .from('votes')
      .insert({ proposal_id: proposalId, user_id: userId, vote_type: voteType, weighted_value: weightedValue })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ success: false, data: null, error: 'Already voted on this proposal' }, { status: 409 })
      }
      throw new Error(error.message)
    }

    // Award contribution score for voting
    await supabase.from('contribution_activity').insert({
      user_id: userId,
      activity_type: 'vote',
      description: `Voted on proposal ${proposalId}`,
      score_delta: 2
    })

    await supabase.rpc('increment_contribution_score', { user_id: userId, delta: 2 })

    return NextResponse.json({ success: true, data, error: null }, { status: 201 })

  } catch (err: any) {
    return NextResponse.json({ success: false, data: null, error: err.message }, { status: 500 })
  }
}
```

### 5.4 API: GET /api/analytics

```typescript
// app/api/analytics/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const [proposalsResult, votesResult, usersResult] = await Promise.all([
      supabase.from('proposals').select('status, category'),
      supabase.from('votes').select('created_at, vote_type'),
      supabase.from('users').select('participation_level, contribution_score')
    ])

    const proposals = proposalsResult.data || []
    const votes = votesResult.data || []
    const users = usersResult.data || []

    const analytics = {
      totalProposals: proposals.length,
      passedProposals: proposals.filter(p => p.status === 'passed').length,
      rejectedProposals: proposals.filter(p => p.status === 'rejected').length,
      activeProposals: proposals.filter(p => p.status === 'active').length,
      totalVotes: votes.length,
      avgParticipation: users.length > 0
        ? ((users.filter(u => u.participation_level !== 'inactive').length / users.length) * 100).toFixed(1)
        : 0,
      communityHealthScore: computeHealthScore(proposals, votes, users),
      categoryCounts: proposals.reduce((acc: any, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1
        return acc
      }, {})
    }

    return NextResponse.json({ success: true, data: analytics, error: null })

  } catch (err: any) {
    return NextResponse.json({ success: false, data: null, error: err.message }, { status: 500 })
  }
}

function computeHealthScore(proposals: any[], votes: any[], users: any[]) {
  // Simple health score 0-100
  const participationScore = users.filter(u => u.participation_level !== 'inactive').length / Math.max(users.length, 1) * 50
  const proposalOutcomeScore = proposals.filter(p => p.status === 'passed').length / Math.max(proposals.length, 1) * 30
  const activityScore = Math.min(votes.length / 10, 20)
  return Math.round(participationScore + proposalOutcomeScore + activityScore)
}
```

---

## 6. AI Integration — Gemini 2.5 Flash via Vertex AI

### 6.1 Google Cloud Setup (One-time)

```
1. Go to console.cloud.google.com
2. Create a new project or select existing
3. Enable "Vertex AI API" from the API Library
4. Go to IAM & Admin > Service Accounts
5. Create a service account with role: "Vertex AI User"
6. Download the JSON key file
7. Set environment variable: GOOGLE_APPLICATION_CREDENTIALS=path/to/key.json
   OR paste the JSON content into VERTEX_AI_KEY_JSON env variable
```

### 6.2 Gemini Client

```typescript
// lib/gemini.ts
import { VertexAI } from '@google-cloud/vertexai'
import { AISummary } from './types'

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID!
const LOCATION = 'us-central1'

const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION })

const model = vertexAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
})

const SYSTEM_PROMPT = `You are a governance assistant. Extract the key information from this proposal and return ONLY a valid JSON object with these exact fields: what, why, cost, impact, risk, deadline, affects. No explanation. No preamble. JSON only.

The fields must follow these rules:
- what: one sentence — what is being asked
- why: one sentence — why it matters
- cost: expected budget or "none"
- impact: expected outcome in one sentence
- risk: must be exactly one of: "low", "medium", "high"
- deadline: extracted deadline or "not specified"
- affects: which part of the community this impacts`

export async function summarizeProposal(rawText: string): Promise<AISummary | null> {
  try {
    const request = {
      contents: [
        {
          role: 'user' as const,
          parts: [{ text: rawText }]
        }
      ],
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      generationConfig: {
        temperature: 0.1,       // Low temp for deterministic JSON
        maxOutputTokens: 512,
      }
    }

    const result = await model.generateContent(request)
    const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || ''

    // Strip any markdown fences if Gemini adds them
    const clean = responseText.replace(/```json|```/g, '').trim()
    const parsed: AISummary = JSON.parse(clean)

    // Validate required fields
    const required = ['what', 'why', 'cost', 'impact', 'risk', 'deadline', 'affects']
    for (const field of required) {
      if (!(field in parsed)) throw new Error(`Missing field: ${field}`)
    }

    return parsed

  } catch (err) {
    console.error('Gemini summarize failed:', err)
    return null   // Graceful fallback — don't block proposal creation
  }
}
```

### 6.3 API Route: POST /api/ai/summarize

```typescript
// app/api/ai/summarize/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { summarizeProposal } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()
    if (!text || text.trim().length < 20) {
      return NextResponse.json({ success: false, data: null, error: 'Proposal text too short' }, { status: 400 })
    }

    const summary = await summarizeProposal(text)
    return NextResponse.json({ success: true, data: summary, error: null })

  } catch (err: any) {
    return NextResponse.json({ success: false, data: null, error: err.message }, { status: 500 })
  }
}
```

---

## 7. Blockchain — Solidity + Polygon Amoy

### 7.1 Hardhat Setup

```bash
cd contracts/
npx hardhat init
# Choose: Create a TypeScript project
```

```typescript
// hardhat.config.ts
import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    amoy: {
      url: process.env.POLYGON_AMOY_RPC_URL || "https://rpc-amoy.polygon.technology/",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!]
    }
  }
}

export default config
```

### 7.2 ProposalRegistry Contract

```solidity
// contracts/ProposalRegistry.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ProposalRegistry is Ownable {

    struct ProposalRecord {
        string id;
        string title;
        string category;
        address createdBy;
        uint256 timestamp;
        string status;
    }

    mapping(string => ProposalRecord) private proposals;
    string[] private proposalIds;

    event ProposalCreated(string indexed id, string title, string category, address createdBy, uint256 timestamp);
    event ProposalStatusUpdated(string indexed id, string status, uint256 timestamp);

    constructor() Ownable(msg.sender) {}

    function createProposal(
        string calldata id,
        string calldata title,
        string calldata category,
        address createdBy
    ) external onlyOwner {
        require(bytes(proposals[id].id).length == 0, "Proposal already exists");

        proposals[id] = ProposalRecord({
            id: id,
            title: title,
            category: category,
            createdBy: createdBy,
            timestamp: block.timestamp,
            status: "active"
        });

        proposalIds.push(id);
        emit ProposalCreated(id, title, category, createdBy, block.timestamp);
    }

    function updateStatus(string calldata id, string calldata status) external onlyOwner {
        require(bytes(proposals[id].id).length != 0, "Proposal not found");
        proposals[id].status = status;
        emit ProposalStatusUpdated(id, status, block.timestamp);
    }

    function getProposal(string calldata id) external view returns (ProposalRecord memory) {
        require(bytes(proposals[id].id).length != 0, "Proposal not found");
        return proposals[id];
    }

    function getProposalCount() external view returns (uint256) {
        return proposalIds.length;
    }
}
```

### 7.3 VoteRegistry Contract

```solidity
// contracts/VoteRegistry.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VoteRegistry is Ownable {

    struct VoteRecord {
        string proposalId;
        address voterId;
        string voteType;
        uint256 weightedValue;   // stored as value * 100 to avoid decimals
        uint256 timestamp;
    }

    mapping(string => VoteRecord[]) private votesByProposal;
    mapping(string => mapping(address => bool)) private hasVoted;

    event VoteCast(string indexed proposalId, address indexed voterId, string voteType, uint256 weightedValue, uint256 timestamp);

    constructor() Ownable(msg.sender) {}

    function castVote(
        string calldata proposalId,
        address voterId,
        string calldata voteType,
        uint256 weightedValue   // pass as value * 100, e.g. 1.2 weight = 120
    ) external onlyOwner {
        require(!hasVoted[proposalId][voterId], "Already voted");

        votesByProposal[proposalId].push(VoteRecord({
            proposalId: proposalId,
            voterId: voterId,
            voteType: voteType,
            weightedValue: weightedValue,
            timestamp: block.timestamp
        }));

        hasVoted[proposalId][voterId] = true;
        emit VoteCast(proposalId, voterId, voteType, weightedValue, block.timestamp);
    }

    function getVotes(string calldata proposalId) external view returns (VoteRecord[] memory) {
        return votesByProposal[proposalId];
    }

    function getVoteCount(string calldata proposalId) external view returns (uint256) {
        return votesByProposal[proposalId].length;
    }
}
```

### 7.4 Deploy Script

```typescript
// contracts/scripts/deploy.ts
import { ethers } from "hardhat"

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deploying with:", deployer.address)

  const ProposalRegistry = await ethers.getContractFactory("ProposalRegistry")
  const proposalRegistry = await ProposalRegistry.deploy()
  await proposalRegistry.waitForDeployment()

  const VoteRegistry = await ethers.getContractFactory("VoteRegistry")
  const voteRegistry = await VoteRegistry.deploy()
  await voteRegistry.waitForDeployment()

  console.log("ProposalRegistry deployed to:", await proposalRegistry.getAddress())
  console.log("VoteRegistry deployed to:", await voteRegistry.getAddress())

  // Save addresses to .env
  console.log("\nAdd to .env.local:")
  console.log(`PROPOSAL_REGISTRY_ADDRESS=${await proposalRegistry.getAddress()}`)
  console.log(`VOTE_REGISTRY_ADDRESS=${await voteRegistry.getAddress()}`)
}

main().catch(console.error)
```

```bash
# Deploy to Polygon Amoy
npx hardhat run scripts/deploy.ts --network amoy
```

### 7.5 Blockchain Client (Frontend/Backend)

```typescript
// lib/blockchain.ts
import { ethers } from 'ethers'
import ProposalRegistryABI from '@/contracts/artifacts/ProposalRegistry.json'
import VoteRegistryABI from '@/contracts/artifacts/VoteRegistry.json'

const PROPOSAL_REGISTRY = process.env.PROPOSAL_REGISTRY_ADDRESS!
const VOTE_REGISTRY = process.env.VOTE_REGISTRY_ADDRESS!
const RPC_URL = process.env.POLYGON_AMOY_RPC_URL || 'https://rpc-amoy.polygon.technology/'

function getProvider() {
  return new ethers.JsonRpcProvider(RPC_URL)
}

function getSigner() {
  const provider = getProvider()
  return new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY!, provider)
}

export async function logProposalOnChain(id: string, title: string, category: string, creatorAddress: string) {
  try {
    const signer = getSigner()
    const contract = new ethers.Contract(PROPOSAL_REGISTRY, ProposalRegistryABI.abi, signer)
    const tx = await contract.createProposal(id, title, category, creatorAddress)
    await tx.wait()
    return { success: true, txHash: tx.hash }
  } catch (err) {
    console.error('Chain log failed:', err)
    return { success: false, txHash: null }   // Non-blocking — DB is source of truth
  }
}

export async function logVoteOnChain(proposalId: string, voterAddress: string, voteType: string, weight: number) {
  try {
    const signer = getSigner()
    const contract = new ethers.Contract(VOTE_REGISTRY, VoteRegistryABI.abi, signer)
    const weightInt = Math.round(weight * 100)   // Convert to integer (1.2 -> 120)
    const tx = await contract.castVote(proposalId, voterAddress, voteType, weightInt)
    await tx.wait()
    return { success: true, txHash: tx.hash }
  } catch (err) {
    console.error('Chain vote log failed:', err)
    return { success: false, txHash: null }
  }
}
```

> **Important note:** Blockchain calls are non-blocking. If they fail, the Supabase record is still the source of truth. Never let a failed chain call break the user experience.

---

## 8. Frontend — Pages and Components

### 8.1 Mock Data (Use This First)

```json
// mock/proposals.json
[
  {
    "id": "mock-001",
    "title": "Annual Hackathon Event Budget",
    "description": "We propose allocating ₹20,000 for our annual hackathon covering venue, meals, prizes, and branding.",
    "budget": "₹20,000",
    "riskLevel": "medium",
    "timeline": "3 months",
    "category": "finance",
    "createdBy": "user-001",
    "summary": {
      "what": "Allocate ₹20,000 for the annual hackathon.",
      "why": "It promotes innovation and increases club visibility.",
      "cost": "₹20,000",
      "impact": "150+ student participants, improved club reputation",
      "risk": "medium",
      "deadline": "3 months from approval",
      "affects": "All club members and tech community"
    },
    "voteStats": {
      "for": 18,
      "against": 4,
      "abstain": 2,
      "participationRate": 78,
      "result": "pending"
    },
    "status": "active",
    "createdAt": "2025-01-15T10:00:00Z",
    "closesAt": "2025-02-15T10:00:00Z"
  }
]
```

### 8.2 Governance Weight Calculation

```typescript
// lib/governance.ts
import { User } from './types'

export function calculateGovernanceWeight(user: any, proposalCategory: string): number {
  let weight = 1.0   // Base weight

  // Participation level bonus
  if (user.participation_level === 'high') weight += 0.2
  if (user.participation_level === 'core') weight += 0.4

  // Expertise match bonus
  const tags = user.expertise_tags || []
  if (tags.includes(proposalCategory)) weight += 0.1

  // Hard cap at 1.5
  return Math.min(weight, 1.5)
}

export function computeParticipationLevel(score: number): 'inactive' | 'low' | 'medium' | 'high' | 'core' {
  if (score === 0) return 'inactive'
  if (score < 20) return 'low'
  if (score < 50) return 'medium'
  if (score < 80) return 'high'
  return 'core'
}

export function applyScoreDecay(currentScore: number, inactiveMonths: number): number {
  const decayFactor = Math.pow(0.95, inactiveMonths)
  return Math.round(currentScore * decayFactor)
}
```

### 8.3 Core Component: ProposalCard

```tsx
// components/proposals/ProposalCard.tsx
import { Proposal } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Calendar, Users, TrendingUp } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

const RISK_COLORS = {
  low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  high: 'bg-red-50 text-red-700 border-red-200'
}

const CATEGORY_COLORS = {
  finance: 'bg-blue-50 text-blue-700',
  events: 'bg-purple-50 text-purple-700',
  tech: 'bg-cyan-50 text-cyan-700',
  operations: 'bg-slate-50 text-slate-700',
  general: 'bg-gray-50 text-gray-700'
}

const STATUS_COLORS = {
  pending: 'bg-yellow-50 text-yellow-700',
  active: 'bg-green-50 text-green-700',
  passed: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
  closed: 'bg-gray-100 text-gray-600'
}

interface Props {
  proposal: Proposal
}

export default function ProposalCard({ proposal }: Props) {
  const totalVotes = proposal.voteStats.for + proposal.voteStats.against + proposal.voteStats.abstain
  const forPercent = totalVotes > 0 ? (proposal.voteStats.for / totalVotes) * 100 : 0

  return (
    <Link href={`/proposals/${proposal.id}`}>
      <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 bg-white group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className={CATEGORY_COLORS[proposal.category]}>
                {proposal.category}
              </Badge>
              <Badge variant="outline" className={RISK_COLORS[proposal.riskLevel]}>
                {proposal.riskLevel} risk
              </Badge>
              <Badge variant="outline" className={STATUS_COLORS[proposal.status]}>
                {proposal.status}
              </Badge>
            </div>
          </div>
          <h3 className="text-base font-semibold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {proposal.title}
          </h3>
        </CardHeader>

        <CardContent className="space-y-4">
          {proposal.summary && (
            <p className="text-sm text-gray-500 line-clamp-2">{proposal.summary.what}</p>
          )}

          {/* Vote progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{proposal.voteStats.for} for</span>
              <span>{proposal.voteStats.against} against</span>
            </div>
            <Progress value={forPercent} className="h-1.5" />
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {proposal.voteStats.participationRate}% participated
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {format(new Date(proposal.closesAt), 'MMM d')}
            </span>
            {proposal.budget && proposal.budget !== 'none' && (
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {proposal.budget}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
```

### 8.4 Core Component: VotingWidget

```tsx
// components/proposals/VotingWidget.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { User, VoteStats } from '@/lib/types'
import { ThumbsUp, ThumbsDown, Minus, Scale } from 'lucide-react'

interface Props {
  proposalId: string
  voteStats: VoteStats
  currentUser: User | null
  closesAt: string
  onVote?: (type: 'for' | 'against' | 'abstain') => Promise<void>
}

export default function VotingWidget({ proposalId, voteStats, currentUser, closesAt, onVote }: Props) {
  const [loading, setLoading] = useState(false)
  const [voted, setVoted] = useState(false)

  const total = voteStats.for + voteStats.against + voteStats.abstain
  const forPct = total > 0 ? Math.round((voteStats.for / total) * 100) : 0
  const againstPct = total > 0 ? Math.round((voteStats.against / total) * 100) : 0

  async function handleVote(type: 'for' | 'against' | 'abstain') {
    if (!onVote || voted || loading) return
    setLoading(true)
    await onVote(type)
    setVoted(true)
    setLoading(false)
  }

  const deadline = new Date(closesAt)
  const isExpired = deadline < new Date()

  return (
    <Card className="border border-gray-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Scale className="w-4 h-4" />
          Community Vote
        </CardTitle>
        {currentUser && (
          <p className="text-xs text-gray-400">
            Your governance weight: <span className="font-medium text-gray-600">{currentUser.governanceWeight.toFixed(2)}x</span>
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current results */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-emerald-600 font-medium">For {forPct}%</span>
            <span className="text-red-500 font-medium">Against {againstPct}%</span>
          </div>
          <div className="flex gap-1 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-400 transition-all duration-500" style={{ width: `${forPct}%` }} />
            <div className="bg-red-400 transition-all duration-500" style={{ width: `${againstPct}%` }} />
            <div className="bg-gray-200 flex-1" />
          </div>
          <p className="text-xs text-gray-400">{total} total votes</p>
        </div>

        {/* Vote buttons */}
        {!isExpired && !voted && (
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              onClick={() => handleVote('for')}
              disabled={loading}
            >
              <ThumbsUp className="w-3.5 h-3.5 mr-1" /> For
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-200 text-red-700 hover:bg-red-50"
              onClick={() => handleVote('against')}
              disabled={loading}
            >
              <ThumbsDown className="w-3.5 h-3.5 mr-1" /> Against
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
              onClick={() => handleVote('abstain')}
              disabled={loading}
            >
              <Minus className="w-3.5 h-3.5 mr-1" /> Abstain
            </Button>
          </div>
        )}

        {voted && (
          <p className="text-xs text-center text-emerald-600 font-medium">✓ Your vote has been recorded</p>
        )}

        {isExpired && (
          <p className="text-xs text-center text-gray-400">Voting has closed</p>
        )}
      </CardContent>
    </Card>
  )
}
```

---

## 9. Governance Logic

### 9.1 Score Calculation Rules (Exact)

```
Attendance at meeting:    +3 per event
Completed task on time:   +5 per task
Late task:                +1
Missed task:               0
Voted on proposal:        +2 per vote
Created a proposal:       +4
Score decay:              -5% per inactive month
```

### 9.2 Weight Calculation Rules (Exact)

```
Base weight:              1.0 (everyone starts here)
High participation:       +0.2
Core participation:       +0.4
Expertise tag matches category: +0.1
Hard cap:                 1.5 (never exceed)
```

### 9.3 Participation Level Thresholds

```
0 score:       inactive
1–19:          low
20–49:         medium
50–79:         high
80+:           core
```

### 9.4 Supabase RPC for Score Updates

```sql
-- Create this function in Supabase SQL Editor
create or replace function increment_contribution_score(user_id uuid, delta integer)
returns void as $$
begin
  update users
  set contribution_score = contribution_score + delta
  where id = user_id;

  -- Also update participation level
  update users
  set participation_level = case
    when contribution_score = 0 then 'inactive'
    when contribution_score < 20 then 'low'
    when contribution_score < 50 then 'medium'
    when contribution_score < 80 then 'high'
    else 'core'
  end
  where id = user_id;
end;
$$ language plpgsql;
```

---

## 10. Integration Checklist

Use this to verify each feature end-to-end before moving to the next.

### Proposal Creation
- [ ] Form submits to `POST /api/proposals`
- [ ] Gemini API called and returns structured summary
- [ ] Record inserted into Supabase `proposals` table
- [ ] Proposal logged on Polygon Amoy via `logProposalOnChain`
- [ ] User redirected to proposal detail page
- [ ] Contribution score +4 awarded to creator

### Voting
- [ ] User sees proposal KPI summary on detail page
- [ ] VotingWidget shows current for/against/abstain counts
- [ ] User's governance weight displayed correctly
- [ ] Vote submits to `POST /api/proposals/:id/vote`
- [ ] Server applies `calculateGovernanceWeight` before saving
- [ ] Unique constraint prevents double voting
- [ ] Vote logged on chain via `logVoteOnChain`
- [ ] Contribution score +2 awarded to voter
- [ ] VoteStats refresh after submission

### Dashboard
- [ ] Fetches real data from Supabase
- [ ] Active proposals shown with correct statuses
- [ ] Participation rate calculated correctly
- [ ] Community health score visible

### User Profile
- [ ] Contribution score reflects actual activity rows
- [ ] Expertise tags are editable
- [ ] Governance weight computed and displayed
- [ ] Vote history shown

---

## 11. Deployment — Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

In Vercel dashboard, add all environment variables from `.env.local`.

For Supabase Auth to work on Vercel, also add your Vercel deployment URL to the Supabase allowed redirect URLs list.

---

## 12. Environment Variables Reference

```env
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google Cloud / Vertex AI
GOOGLE_CLOUD_PROJECT_ID=your-gcp-project-id
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
# OR paste the full JSON as a string:
VERTEX_AI_KEY_JSON={"type":"service_account",...}

# Blockchain
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
DEPLOYER_PRIVATE_KEY=your-wallet-private-key-without-0x
PROPOSAL_REGISTRY_ADDRESS=deployed-contract-address
VOTE_REGISTRY_ADDRESS=deployed-contract-address

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Security:** Never commit `.env.local` to Git. Add it to `.gitignore`.

---

## Quick Reference: What Goes Where

| Feature | Layer | Files |
|---|---|---|
| Proposal form | Frontend | `app/proposals/new/page.tsx` |
| Proposal list | Frontend | `app/proposals/page.tsx` |
| Proposal detail + vote | Frontend | `app/proposals/[id]/page.tsx` |
| Dashboard | Frontend | `app/dashboard/page.tsx` |
| User profile | Frontend | `app/profile/[id]/page.tsx` |
| Create proposal API | Backend | `app/api/proposals/route.ts` |
| Cast vote API | Backend | `app/api/proposals/[id]/vote/route.ts` |
| Analytics API | Backend | `app/api/analytics/route.ts` |
| AI summarize API | AI | `app/api/ai/summarize/route.ts` |
| Gemini client | AI | `lib/gemini.ts` |
| Governance weight | Backend | `lib/governance.ts` |
| Smart contracts | Blockchain | `contracts/*.sol` |
| Blockchain client | Blockchain | `lib/blockchain.ts` |
| Shared types | All layers | `lib/types.ts` |
| Database schema | DB | Supabase SQL Editor |

---

*End of project.md*
