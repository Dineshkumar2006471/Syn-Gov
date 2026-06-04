# SynGov — Google Stitch UI Design Prompts

## Pages Covered

- Landing Page (with all sections)
- Dashboard
- Proposal List Page
- Proposal Detail Page
- Proposal Creation Page
- User Profile Page
- Analytics Page
- Login/Auth Page




> One prompt per page. Paste each block directly into Stitch.
> Do not mix prompts. One page = one session.


## GLOBAL RULES — Read before every prompt

> Apply these to every single page without exception


---

### Global Design Rules

- Background color: pure white #FFFFFF everywhere. No exceptions.
- Primary font: Sora (Google Font) — all headings, logo, nav links
- Body font: DM Sans (Google Font) — all paragraphs, labels, descriptions
- Data font: JetBrains Mono — all numbers, scores, percentages, weights
- Primary accent: #1D4ED8 (deep blue)
- Text primary: #0F172A
- Text secondary: #374151
- Text muted: #6B7280
- Border color: #E5E7EB
- Surface/card background: #FFFFFF
- Page background: #F9FAFB
- Success green: #059669
- Warning amber: #D97706
- Danger red: #DC2626
- Border radius on all cards: 12px
- All shadows: subtle, 0 1px 3px rgba(0,0,0,0.06)
- Hover shadow: 0 4px 12px rgba(0,0,0,0.08)
- NO dark mode. NO gradients except specified. NO glassmorphism.
- NO neon. NO crypto aesthetics. NO purple anywhere.
- Spacing: multiples of 4px only (4, 8, 12, 16, 20, 24, 32, 48, 64, 96)



## PAGE 1 — LANDING PAGE (Full)



---

### Prompt Landing Page

Design a full landing page for SynGov — a governance platform for college clubs.
White background. Clean. Modern SaaS. No crypto look.


#### NAVBAR

Fixed top bar. Height 64px. White background. Bottom border 1px solid #E5E7EB.
Left side: Logo text only — "Syn" in Sora bold 700 weight color #1D4ED8,
immediately followed by "Gov" in Sora bold 700 weight color #0F172A. No gap between them. No icon.
Center: Three nav links — "Product", "How it works", "Community" —
in DM Sans 14px weight 500 color #374151. 20px gap between links.
Right side: Two buttons side by side —
"Log in" ghost button (DM Sans 14px #374151, no border, hover underline),
"Get Started" filled button (background #1D4ED8, white text, DM Sans 14px font-semibold,
16px horizontal padding 8px vertical, border-radius 8px).
No hamburger on desktop. Clean separator line at bottom.


#### HERO SECTION

Full viewport height (100vh). White background.
Centered content column, max-width 680px, centered horizontally.
Vertical padding top 120px.

Element 1 — Overline pill badge:
Small pill/chip at very top center. Background #EFF6FF. Border 1px solid #DBEAFE.
Text: "Built for student communities" — DM Sans 12px font-semibold color #1D4ED8
letter-spacing 0.04em uppercase. Border-radius 100px. Padding 6px 14px.

Element 2 — Main headline below overline, 16px gap:
Sora font. Font-size 56px. Font-weight 800. Line-height 1.1. Letter-spacing -0.03em.
Color #0F172A.
Text line 1: "Governance that works"
Text line 2: "for everyone"
Second line — word "everyone" has color #1D4ED8, rest is #0F172A.

Element 3 — Subheadline below headline, 20px gap:
DM Sans 18px font-weight 400 line-height 1.7 color #6B7280.
Max-width 520px centered.
Text: "SynGov gives your club the structure to make decisions together —
fairly, transparently, and without drama."

Element 4 — CTA button row below subheadline, 32px gap:
Two buttons side by side, gap 12px, centered.
Button 1 — Primary: Background #1D4ED8 text white "Get Started Free"
Sora font 15px font-semibold. Padding 14px 28px. Border-radius 8px.
Box-shadow 0 4px 14px rgba(29,78,216,0.25). Hover: background #1E40AF.
Button 2 — Ghost: No background. No border. Text "See how it works →"
DM Sans 15px color #374151. Hover: color #0F172A.

Element 5 — Hero dashboard mockup image below buttons, 48px gap:
A browser window screenshot mockup showing the SynGov dashboard UI.
Width 900px max, slightly wider than text column, centered.
Apply mild 3D tilt: perspective transform rotateX(4deg) rotateY(-2deg).
Border-radius 16px. Border 1px solid #E5E7EB.
Box-shadow: 0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06).
Behind the mockup: radial gradient background —
radial-gradient(ellipse 900px 400px at 50% 80%, rgba(29,78,216,0.06) 0%, transparent 70%)

HERO ANIMATIONS (all CSS, no JS required):
- Overline badge: fadeIn 0.4s ease-out 0ms
- Headline: translateY(20px) opacity 0 → translateY(0) opacity 1, duration 0.6s delay 100ms
- Subheadline: same animation delay 200ms
- Buttons: same animation delay 300ms
- Mockup: translateY(32px) opacity 0 → translateY(0) opacity 1, duration 0.8s delay 400ms


#### PROBLEM SECTION

Top padding 96px. Bottom padding 96px. Background white.
Max-width 1200px centered with auto horizontal margin.

Section label top center: "The Problem" — DM Sans 12px uppercase letter-spacing 0.1em color #1D4ED8.

Heading below label, 12px gap:
Sora 40px font-weight 700 color #0F172A letter-spacing -0.02em centered.
Text: "Sound familiar?"

Subtext below heading, 16px gap:
DM Sans 17px color #6B7280 centered max-width 480px.
Text: "College clubs are run by good people with broken processes."

Two-column grid below, 48px gap from subtext. Gap 32px between columns.

LEFT COLUMN — "Before SynGov":
Small label: "Without SynGov" DM Sans 11px uppercase tracking-wide color #DC2626 font-semibold. Margin-bottom 16px.
5 rows stacked, gap 10px each.
Each row is a card: background #FEF2F2, border 1px solid #FECACA, border-radius 8px, padding 12px 16px.
Left side: ✗ icon in red circle (20px, background #FCA5A5, color white).
Text right of icon: DM Sans 14px color #374151.
Row texts:
"Decisions made by 2-3 people"
"Proposals are hard to understand"
"Fund usage is completely opaque"
"Active members treated like observers"
"No record of past decisions"

RIGHT COLUMN — "With SynGov":
Small label: "With SynGov" DM Sans 11px uppercase tracking-wide color #059669 font-semibold. Margin-bottom 16px.
5 rows stacked, gap 10px each.
Each row is a card: background #ECFDF5, border 1px solid #A7F3D0, border-radius 8px, padding 12px 16px.
Left side: ✓ icon in green circle (20px, background #6EE7B7, color white).
Text right of icon: DM Sans 14px color #374151.
Row texts:
"Every member gets a contribution-weighted voice"
"AI-simplified KPI summaries in seconds"
"Every vote is logged on blockchain — forever"
"Contribution score = real influence"
"Full governance history, always visible"

Scroll animation: rows stagger into view using IntersectionObserver,
each row fades up with 60ms delay between rows.


#### HOW IT WORKS SECTION

Top padding 96px. Bottom padding 96px. Background #F9FAFB.
Max-width 1100px centered.

Section label: "Process" uppercase DM Sans 12px tracking-wide color #1D4ED8.
Heading: Sora 40px font-weight 700 color #0F172A.
Text: "From idea to decision in four steps."

4 horizontal step cards below heading, 40px gap, gap 24px between cards.
Each card: background white, border 1px solid #E5E7EB, border-radius 12px,
padding 28px, box-shadow 0 1px 3px rgba(0,0,0,0.05).
Card width: equal 25%, responsive to 2-col on tablet, 1-col on mobile.

Card internal layout (top to bottom):
1. Step number: JetBrains Mono 13px color #1D4ED8 background #EFF6FF
   padding 4px 10px border-radius 6px display inline-block. Text "Step 01" etc.
2. Icon area: 48px x 48px square, background #EFF6FF, border-radius 10px,
   centered icon in #1D4ED8, margin-top 16px.
3. Title: Sora 16px font-weight 600 color #0F172A margin-top 14px.
4. Description: DM Sans 14px color #6B7280 line-height 1.6 margin-top 8px.

Step content:
Step 01 — Icon: document with pencil. Title: "Create a Proposal".
Description: "Write your idea in plain language. No formatting required."
Step 02 — Icon: sparkle/AI symbol. Title: "AI Simplifies It".
Description: "Gemini extracts cost, risk, impact, and deadline automatically."
Step 03 — Icon: balance scale. Title: "Members Vote".
Description: "Each vote is weighted by contribution and expertise — not seniority."
Step 04 — Icon: chain link. Title: "Decision is Logged".
Description: "Result is transparent and permanently recorded on Polygon."

Connecting dotted line between cards on desktop:
1px dashed line color #DBEAFE running horizontally through card center at step-number level.


#### HORIZONTAL SCROLL FEATURE SHOWCASE

Top padding 96px. Bottom padding 96px. Background white.
Full bleed width (no max-width constraint on the scroll track).

Heading centered, max-width 1100px, margin auto:
Section label: "Features" uppercase DM Sans 12px tracking-wide color #1D4ED8.
Title: Sora 40px font-weight 700 color #0F172A.
Text: "Everything your community needs."

Horizontal scroll strip below, 40px gap from title:
Overflow-x scroll. Scroll-snap-type x mandatory.
Padding: 16px 80px (gives reveal effect on edges).
Display flex. Gap 20px. Cursor grab.
NO scrollbar visible (scrollbar-width none).

6 feature cards in a row (they overflow, user drags to see more):
Each card: width 320px flex-shrink 0. Background white.
Border 1px solid #E5E7EB. Border-radius 12px. Padding 28px.
Scroll-snap-align start.
Hover: box-shadow 0 8px 24px rgba(0,0,0,0.08) translateY(-4px).

Card layout:
1. Icon circle: 48px diameter. Background #EFF6FF.
   Centered icon SVG in #1D4ED8. Border-radius 50%.
2. Title: Sora 16px font-weight 600 color #0F172A. Margin-top 16px.
3. Description: DM Sans 14px color #6B7280 line-height 1.6. Margin-top 8px.

Card contents:
Card 1: Title "Contribution Scoring" — Description "Attendance, tasks, proposals —
everything counts toward your governance weight."
Card 2: Title "AI Summaries" — Description "Long proposals become 7-field
structured KPIs. Readable in under 30 seconds."
Card 3: Title "Contextual Voting" — Description "Finance experts carry extra weight
in finance votes. Event planners in event votes."
Card 4: Title "Blockchain Audit Trail" — Description "Every vote permanently logged
on Polygon Amoy. Public, verifiable, immutable."
Card 5: Title "Participation Analytics" — Description "Track community health,
proposal outcomes, and member engagement over time."
Card 6: Title "Delegation Support" — Description "Delegate your vote to a trusted
member when you cannot participate."

Below strip: small scroll indicator — 6 dots row centered,
active dot filled #1D4ED8, inactive dots #E5E7EB. Updates as user scrolls.


#### STATS SECTION

Top padding 64px. Bottom padding 64px. Background #0F172A (dark, only this section).
Max-width 1100px centered.

4 stats in a horizontal flex row, evenly spaced.
Divider: 1px solid #1E293B between each stat (vertical line).

Each stat:
Number: JetBrains Mono 48px font-weight 400 color white.
Label: DM Sans 14px color #94A3B8 margin-top 6px.

Stat 1: Number "3x" Label "Faster proposal understanding"
Stat 2: Number "78%" Label "Average participation rate"
Stat 3: Number "100%" Label "Votes publicly verifiable"
Stat 4: Number "<30s" Label "Time to understand any proposal"

Number count-up animation: trigger on IntersectionObserver enter.
Numbers animate from 0 to final value over 1200ms easeOut.


#### FINAL CTA SECTION

Top padding 120px. Bottom padding 120px. Background white.
Centered content, max-width 600px.
Behind content: radial-gradient(ellipse 800px 400px at 50% 100%, rgba(29,78,216,0.05), transparent 65%)

Label: "Get started" uppercase DM Sans 12px tracking-wide color #1D4ED8.
Headline: Sora 44px font-weight 800 color #0F172A letter-spacing -0.025em centered.
Text: "Your club deserves better than a WhatsApp poll."
Subtext: DM Sans 17px color #6B7280 centered margin-top 16px.
Text: "Set up SynGov in minutes. No blockchain knowledge required."

Buttons centered, margin-top 36px:
Primary: "Get Started Free" — background #1D4ED8 white text Sora 15px
font-semibold padding 14px 32px border-radius 8px
shadow 0 4px 14px rgba(29,78,216,0.25).
Ghost next to it gap 12px: "Read the Docs →" DM Sans 15px color #374151.


#### FOOTER

Background #F9FAFB. Top border 1px solid #E5E7EB. Padding 48px 80px.
4-column grid, gap 40px.

Column 1 — Brand:
Logo text "SynGov" Sora 18px font-weight 700.
S in #1D4ED8, Gov in #0F172A.
Tagline below: DM Sans 13px color #6B7280 line-height 1.5.
"Smarter decision-making for college communities."

Column 2 — Product:
Label: DM Sans 11px uppercase tracking-wide color #9CA3AF. "PRODUCT"
Links below: DM Sans 14px color #374151, gap 10px each.
Dashboard, Proposals, Analytics, Profile.

Column 3 — Resources:
Label: "RESOURCES"
Links: Documentation, GitHub, Community, Changelog.

Column 4 — Legal:
Label: "LEGAL"
Links: Privacy Policy, Terms of Service.

Bottom bar: top border 1px solid #E5E7EB, padding 20px 0.
Left: DM Sans 13px color #9CA3AF "© 2025 SynGov. Open source."
Right: DM Sans 13px color #9CA3AF "Built on Polygon Amoy."



## PAGE 2 — AUTHENTICATION / LOGIN PAGE



---

### Prompt Auth Page

Design the SynGov login and signup page.
Split two-column layout, full viewport height, no scroll.

LEFT COLUMN — Branding panel (40% width):
Background #0F172A (dark navy). Full height.
Padding 60px 48px.
Flex column layout, justify space-between.

Top section:
Logo — "Syn" Sora 22px bold #1D4ED8, "Gov" Sora 22px bold white. No gap.

Middle section (centered vertically):
Large quote or tagline. Sora 28px font-weight 700 color white line-height 1.3.
Text: "Where student communities make decisions that actually stick."
Below that: 3 trust points stacked, gap 16px each.
Each trust point: checkmark icon color #1D4ED8 + DM Sans 14px color #94A3B8.
Point 1: "Contribution-weighted voting — not rank-based"
Point 2: "Every decision permanently logged on blockchain"
Point 3: "AI summaries make every proposal readable"

Bottom section:
DM Sans 13px color #475569.
"Trusted by student communities."

RIGHT COLUMN — Form panel (60% width):
Background white. Full height.
Flex column. Justify center.
Padding 60px 80px max-width 480px margin auto.

Top of form area:
Heading: Sora 28px font-weight 700 color #0F172A.
"Welcome back"
Subtext below: DM Sans 15px color #6B7280.
"Sign in to your SynGov workspace."

Tab switcher below heading, gap 24px, margin-top 28px:
Two tabs: "Sign In" and "Create Account"
Active tab: border-bottom 2px solid #1D4ED8, text color #0F172A, Sora 14px font-semibold.
Inactive tab: text color #9CA3AF, DM Sans 14px.

SIGN IN FORM (default tab):
Margin-top 28px. Fields stacked, gap 16px.

Field 1 — Email:
Label: DM Sans 13px font-weight 500 color #374151. "Email address"
Input below label, gap 6px:
Full width. Height 44px. Border 1px solid #E5E7EB. Border-radius 8px.
Padding 0 14px. DM Sans 14px color #0F172A.
Placeholder: "you@college.edu" color #9CA3AF.
Focus: border-color #1D4ED8, box-shadow 0 0 0 3px rgba(29,78,216,0.1).

Field 2 — Password:
Label: "Password"
Same input style.
Right side of label: small link "Forgot password?" DM Sans 12px color #1D4ED8.

Submit button below fields, gap 20px:
Full width. Height 44px. Background #1D4ED8.
Color white. Sora 14px font-semibold. Border-radius 8px.
Text: "Sign In".
Hover: background #1E40AF.
Loading state: spinner icon left of text, text "Signing in..."

Divider below button, gap 20px:
Horizontal line with "or" text centered.
Line: 1px solid #E5E7EB. "or" DM Sans 13px color #9CA3AF background white padding 0 12px.

Social / wallet row below divider, gap 12px:
Button: full width. Border 1px solid #E5E7EB. Background white. Border-radius 8px.
Height 44px. DM Sans 14px color #374151.
Left icon: Google logo SVG 18px.
Text: "Continue with Google"
Hover: background #F9FAFB.

Second button same style: MetaMask fox icon. Text: "Connect Wallet (optional)"

Bottom note below social buttons, gap 16px:
DM Sans 13px color #6B7280 centered.
"Don't have an account? " + link "Sign up" color #1D4ED8.



## PAGE 3 — DASHBOARD



---

### Prompt Dashboard

Design the SynGov main dashboard page for authenticated users.
Fixed sidebar + main content layout. Background #F9FAFB.


#### SIDEBAR

Fixed left. Width 240px. Full viewport height.
Background white. Right border 1px solid #E5E7EB.
Padding top 0. No border-radius.

Top section — Logo bar:
Height 64px. Border-bottom 1px solid #E5E7EB. Padding 0 20px.
Flex items-center.
Logo: "Syn" Sora 18px bold #1D4ED8 + "Gov" Sora 18px bold #0F172A.

Navigation section:
Margin-top 8px. Padding 0 12px.
Label: "NAVIGATION" DM Sans 10px uppercase tracking-widest color #9CA3AF.
Padding 16px 8px 8px.

Nav items stacked, gap 2px:
Each nav item: flex row, align-center, gap 10px.
Padding 9px 12px. Border-radius 8px. Cursor pointer.
Icon: 16px, color matches text.
Text: DM Sans 14px font-weight 500.

Active state: background #EFF6FF, text color #1D4ED8, icon color #1D4ED8.
Inactive state: text color #374151, icon color #6B7280.
Hover state: background #F9FAFB.

Nav items (with icons):
1. Grid icon — "Dashboard" (active on this page)
2. Document icon — "Proposals"
3. Bar chart icon — "Analytics"
4. User icon — "My Profile"

Section label below nav: "COMMUNITY"
Nav item: Users icon — "Members"

Section label: "SETTINGS"
Nav item: Settings gear — "Settings"

Bottom section of sidebar — pinned to bottom:
Border-top 1px solid #E5E7EB. Padding 16px 12px.
User card: flex row, align-center, gap 10px.
Avatar: 36px circle, background #DBEAFE, initials in Sora 13px color #1D4ED8.
Right of avatar:
Name: DM Sans 13px font-weight 600 color #0F172A.
Score: JetBrains Mono 12px color #6B7280. "Score: 72"
Far right: small logout icon button 16px color #9CA3AF.


#### TOP BAR (main content area)

Height 64px. Background white. Border-bottom 1px solid #E5E7EB.
Left offset: 240px (matches sidebar width). Fixed top.
Padding 0 32px. Flex align-center justify-between.

Left: Page title "Dashboard" Sora 18px font-weight 600 color #0F172A.

Right: Two elements with gap 12px:
1. Notification bell icon button:
   Width 36px height 36px. Border 1px solid #E5E7EB. Border-radius 8px.
   Icon: bell 16px color #6B7280.
   Small red dot badge at top-right corner (for unread).
2. "New Proposal" button:
   Background #1D4ED8. White text. Sora 13px font-semibold.
   Padding 8px 16px. Border-radius 8px.
   Left: plus icon 14px.
   Hover: background #1E40AF.


#### MAIN CONTENT AREA

Margin-left 240px. Padding-top 64px (accounts for top bar).
Padding content: 32px.

ROW 1 — Stats cards (4 equal columns, gap 16px):
Each stat card:
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 20px 24px.
Box-shadow 0 1px 3px rgba(0,0,0,0.05).

Layout inside each card:
Top row: Label left + icon right.
Label: DM Sans 13px color #6B7280.
Icon: 32px square. Background tinted (each card different). Border-radius 8px. Icon 16px.
Bottom:
Value: JetBrains Mono 28px font-weight 400 color #0F172A. Margin-top 12px.
Change delta: DM Sans 12px. Green for positive (+4.2%), red for negative. Arrow icon.

Card 1: Label "Active Proposals". Icon background #EFF6FF icon #1D4ED8. Value "12". Delta "+3 this week"
Card 2: Label "Participation Rate". Icon background #ECFDF5 icon #059669. Value "78%". Delta "+5.1%"
Card 3: Label "Your Score". Icon background #FFF7ED icon #D97706. Value "72". Delta "+8 points"
Card 4: Label "Your Weight". Icon background #F0FDF4 icon #059669. Value "1.30x". Delta "based on core activity"

ROW 2 — Two-column layout below stats, gap 20px, margin-top 24px:
Left column 65% width.
Right column 35% width.

LEFT COLUMN:
Section heading: "Active Proposals" Sora 15px font-weight 600 color #0F172A.
Right of heading: "View all →" DM Sans 13px color #1D4ED8.
Margin-bottom 16px.

3 proposal cards stacked, gap 12px:
Each proposal card:
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 20px.
Hover: box-shadow 0 4px 12px rgba(0,0,0,0.06), cursor pointer.

Card layout:
Top row: flex space-between.
Left: two badges side by side gap 6px.
Badge 1 category — pill, soft fill.
Finance: bg #EFF6FF text #1D4ED8.
Events: bg #F5F3FF text #7C3AED.
Tech: bg #ECFEFF text #0891B2.
Badge 2 risk — pill with border.
Low: bg #ECFDF5 border #A7F3D0 text #059669.
Medium: bg #FFFBEB border #FDE68A text #D97706.
High: bg #FEF2F2 border #FECACA text #DC2626.
Right: Status badge.
Active: bg #DCFCE7 text #16A34A font-semibold.
Pending: bg #FEF9C3 text #CA8A04.

Title below badges: Sora 14px font-weight 600 color #0F172A. Margin-top 10px.
One sentence summary: DM Sans 13px color #6B7280 margin-top 4px. Line-clamp 2.

Progress bar row below, margin-top 14px:
Label row: flex space-between.
Left: "For 74%" DM Sans 11px color #059669.
Right: "Against 18%" DM Sans 11px color #DC2626.
Bar below: height 6px, border-radius 3px, background #F3F4F6.
Inner bar: left portion background #34D399, right portion background #F87171.
Transition width.

Bottom meta row, margin-top 12px: flex gap 16px.
Each meta item: icon 12px color #9CA3AF + text DM Sans 12px color #9CA3AF.
Item 1: calendar icon + "Closes Jan 20"
Item 2: users icon + "24 votes"
Item 3: trending-up icon + "₹20,000"

RIGHT COLUMN:
Section heading "Activity Feed" Sora 15px font-weight 600 color #0F172A.
Margin-bottom 16px.

Activity items stacked, gap 0 (with dividers):
Each activity item: padding 14px 0. Border-bottom 1px solid #F3F4F6.
Left: avatar circle 28px with initials. DM Sans 10px.
Right of avatar gap 10px:
Description: DM Sans 13px color #374151. Bold name + action text.
Time: DM Sans 11px color #9CA3AF. "2 hours ago"

Example entries:
"Arjun voted on Annual Hackathon Budget"
"Priya created a new proposal"
"Tech Committee proposal was passed"
"Rohan earned 5 contribution points"

Below activity feed, margin-top 20px:
"Community Health" card:
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 20px.
Title: Sora 14px font-weight 600 "Community Health Score"
Score value: JetBrains Mono 40px color #059669. Centered. "84"
Label: DM Sans 12px color #6B7280 centered. "/100"
Circular progress ring around score number (SVG).
Color of ring: #059669 for good (>60), #D97706 for medium (40-60), #DC2626 for low.
Below ring: DM Sans 12px color #6B7280 "Based on participation, proposal quality, and activity"



## PAGE 4 — PROPOSAL LIST PAGE



---

### Prompt Proposals List

Design the SynGov proposals list page.
Uses same sidebar and top bar as dashboard (refer to dashboard specs).
Background #F9FAFB. Main content area margin-left 240px padding-top 64px.


#### PAGE HEADER AREA

Padding 32px 32px 0.
Top row: flex space-between align-center.
Left: Page title "Proposals" Sora 22px font-weight 700 color #0F172A.
Right: "New Proposal" button — background #1D4ED8 white text Sora 13px
font-semibold padding 10px 18px border-radius 8px plus icon left.

Subtext below title: DM Sans 14px color #6B7280.
"All active and past proposals from your community."


#### FILTER AND SEARCH BAR

Margin-top 24px. Padding 0 32px.
Flex row, align-center, gap 12px.

Search input left:
Width 280px. Height 40px. Border 1px solid #E5E7EB. Border-radius 8px.
Padding 0 12px 0 36px. DM Sans 14px.
Placeholder: "Search proposals..." color #9CA3AF.
Left icon inside input: search magnifier 14px color #9CA3AF.
Focus: border #1D4ED8 ring 0 0 0 3px rgba(29,78,216,0.1).

Filter buttons row right of search, gap 8px:
Each filter button: Border 1px solid #E5E7EB. Background white.
Border-radius 8px. Padding 8px 14px. DM Sans 13px color #374151.
Icon left 14px color #6B7280.
Hover: background #F9FAFB.

Button 1: filter icon + "Category" + chevron-down icon right.
Button 2: sliders icon + "Risk" + chevron-down icon right.
Button 3: clock icon + "Status" + chevron-down icon right.

Active filter state (when selected):
Background #EFF6FF, border color #1D4ED8, text color #1D4ED8.

Result count far right: DM Sans 13px color #6B7280. "Showing 12 proposals"


#### TAB ROW

Margin-top 20px. Padding 0 32px.
Border-bottom 1px solid #E5E7EB.
Tab items: "All" "Active" "Passed" "Rejected" "My Proposals"
Each tab: DM Sans 14px. Padding 10px 16px.
Active: color #0F172A font-semibold, border-bottom 2px solid #1D4ED8.
Inactive: color #6B7280, hover color #374151.


#### PROPOSAL GRID

Padding 24px 32px.
2-column grid. Gap 16px.

Each proposal card:
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 24px.
Box-shadow 0 1px 3px rgba(0,0,0,0.04).
Cursor pointer.
Hover: box-shadow 0 6px 20px rgba(0,0,0,0.08), transform translateY(-2px).
Transition all 200ms ease.

CARD LAYOUT (top to bottom):

Row 1 — Badges + status, flex space-between:
Left: Category badge + Risk badge (same pill styles as dashboard).
Right: Status badge.

Row 2 — Title, margin-top 12px:
Sora 15px font-weight 600 color #0F172A line-height 1.4.
Max 2 lines, text-overflow ellipsis.

Row 3 — AI Summary one-liner, margin-top 6px:
DM Sans 13px color #6B7280 line-height 1.5. Line-clamp 2.
This shows the "what" field from the AI summary.

Row 4 — Vote progress, margin-top 16px:
Label row flex space-between margin-bottom 6px:
"For" DM Sans 11px font-medium color #059669 + percentage JetBrains Mono 11px same color.
"Against" DM Sans 11px font-medium color #DC2626 + percentage JetBrains Mono 11px same color.
Progress bar: height 5px border-radius 3px background #F3F4F6.
Green fill left side, red fill right side.

Row 5 — Meta info row, margin-top 14px:
Flex gap 16px. Border-top 1px solid #F3F4F6. Padding-top 14px.
Each item: icon 12px #9CA3AF + DM Sans 12px color #9CA3AF.
Item 1: user icon + "Created by Arjun"
Item 2: calendar icon + "Closes Feb 15"
Item 3: users icon + "18 voted"

Bottom right corner: small "View details →" DM Sans 12px color #1D4ED8.
Appears on hover only (opacity 0 → 1).


#### EMPTY STATE (when no proposals)

Centered in main area. Padding 80px.
Illustration placeholder: 120px square, rounded, background #F3F4F6.
Text icon inside: document icon 40px color #9CA3AF.
Heading below: Sora 18px color #374151. "No proposals yet."
Subtext: DM Sans 14px color #9CA3AF. "Create the first proposal for your community."
Button: "Create Proposal" primary style.



## PAGE 5 — PROPOSAL DETAIL PAGE



---

### Prompt Proposal Detail

Design the SynGov proposal detail page.
Same sidebar and top bar. Background #F9FAFB.
Main content area: margin-left 240px padding-top 64px.


#### BREADCRUMB

Padding 20px 32px 0.
DM Sans 13px color #6B7280.
"Proposals" (link, color #1D4ED8) + " / " + "Annual Hackathon Budget" (color #374151).
Chevron-right 12px icon between items.


#### PAGE HEADER

Padding 16px 32px 0.
Badges row: category badge + risk badge + status badge — same styles as proposal cards.

Title below, margin-top 10px:
Sora 26px font-weight 700 color #0F172A line-height 1.2. Max-width 800px.

Meta row below title, margin-top 12px, gap 20px:
Each: icon 13px color #9CA3AF + DM Sans 13px color #6B7280.
Item 1: user circle icon + "Proposed by Arjun Mehta"
Item 2: calendar icon + "Created Jan 15, 2025"
Item 3: clock icon + "Closes Feb 15, 2025"
Item 4: tag icon + "Finance"


#### TWO COLUMN LAYOUT

Margin-top 24px. Padding 0 32px 32px.
Left column: flex-grow 1. Max-width 720px.
Right column: width 320px. Flex-shrink 0.
Flex row gap 24px. Align start.


#### LEFT COLUMN


CARD 1 — AI Summary Panel:
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 24px.

Card header row:
Left: sparkle icon 16px color #1D4ED8 + "AI Summary" Sora 15px font-weight 600 color #0F172A.
Right: small pill badge — background #EFF6FF, text #1D4ED8, DM Sans 11px. "Generated by Gemini"

7-field grid below header, margin-top 20px:
2 column grid, gap 16px. Last row spans full width.

Each field cell:
Label: DM Sans 11px uppercase tracking-wide color #9CA3AF. Margin-bottom 4px.
Value: DM Sans 14px font-weight 500 color #0F172A.

Field 1 — "WHAT": one sentence what is being asked.
Field 2 — "WHY": one sentence why it matters.
Field 3 — "COST": Budget value in JetBrains Mono 14px color #1D4ED8 font-medium.
Field 4 — "IMPACT": Expected outcome.
Field 5 — "RISK": Badge pill (not text).
 Low: bg #ECFDF5 text #059669. Medium: bg #FFFBEB text #D97706. High: bg #FEF2F2 text #DC2626.
Field 6 — "DEADLINE": Date in JetBrains Mono 14px.
Field 7 (full width) — "WHO IT AFFECTS": Community segment description.

Divider line top of field 7.

CARD 2 — Full Proposal Description:
Margin-top 16px.
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 24px.
Title: Sora 15px font-weight 600 "Full Proposal". Margin-bottom 16px.
Content: DM Sans 15px color #374151 line-height 1.75.
Show first 3 lines. "Show more" toggle link at bottom if longer.
Expandable with smooth height animation.

CARD 3 — Discussion Thread:
Margin-top 16px.
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 24px.
Title row: Sora 15px font-weight 600 "Discussion" + comment count badge
(small circle bg #F3F4F6 text #374151 JetBrains Mono 12px).

Comment items stacked, gap 0 with dividers:
Each comment: padding 16px 0. Border-bottom 1px solid #F9FAFB.
Top row: flex gap 10px.
Avatar: 32px circle, initials, Sora 11px, bg #DBEAFE text #1D4ED8.
Right column:
Name row: DM Sans 13px font-semibold color #0F172A + time DM Sans 11px color #9CA3AF gap 8px.
Comment text: DM Sans 14px color #374151 line-height 1.6. Margin-top 4px.
Reply link: DM Sans 12px color #1D4ED8 margin-top 6px.

Add comment box at bottom:
Textarea: full width. Min-height 80px. Border 1px solid #E5E7EB. Border-radius 8px.
Padding 12px. DM Sans 14px. Placeholder: "Add your thoughts..."
Focus: border #1D4ED8 ring rgba(29,78,216,0.1).
Below textarea: "Post Comment" button right-aligned.
Background #1D4ED8 white text DM Sans 13px font-semibold padding 8px 18px border-radius 8px.


#### RIGHT COLUMN (sticky top-24)


CARD 1 — Voting Widget:
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 20px.

Header row: scale/balance icon 16px #1D4ED8 + "Cast Your Vote" Sora 14px font-weight 600.

User weight info below, margin-top 8px:
"Your governance weight:" DM Sans 12px color #6B7280.
Weight value: JetBrains Mono 14px color #0F172A font-medium. "1.30x"
Small tooltip icon (i) next to it.

Divider 1px solid #F3F4F6. Margin 16px 0.

Current results section:
Label "Current results" DM Sans 12px color #9CA3AF uppercase.
Margin-bottom 10px.

Three rows of vote types:
Each row: flex space-between items-center. Margin-bottom 8px.
Left: colored dot 8px + label DM Sans 13px color #374151.
For dot: #34D399. Against dot: #F87171. Abstain dot: #E5E7EB.
Right: count JetBrains Mono 14px color #0F172A.

Stacked bar below rows:
Height 8px border-radius 4px.
Green segment for, red against, gray abstain. Width proportional.

Divider. Margin 16px 0.

Vote deadline row:
Clock icon 14px color #9CA3AF + "Closes Feb 15, 2025" DM Sans 13px color #6B7280.
If closing soon (< 48hrs): orange color with warning icon.

Three vote buttons below, margin-top 16px, gap 8px:
Each full width. Height 40px. Border-radius 8px. DM Sans 14px font-semibold.
Transition 150ms.

"Vote For" — Border 1px solid #A7F3D0. Background #ECFDF5. Text #059669.
Left icon: thumbs-up 14px.
Hover: background #D1FAE5 border #6EE7B7.

"Vote Against" — Border 1px solid #FECACA. Background #FEF2F2. Text #DC2626.
Left icon: thumbs-down 14px.

"Abstain" — Border 1px solid #E5E7EB. Background #F9FAFB. Text #6B7280.
Left icon: minus 14px.

Post-vote state (after voting):
Replace buttons with: check icon + "Your vote has been recorded."
DM Sans 14px color #059669 centered. Buttons hidden.

CARD 2 — Proposal Info (below voting card):
Margin-top 16px.
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 20px.
Title: Sora 13px font-weight 600 "Proposal Info".

Info rows, gap 12px, margin-top 12px:
Each: label DM Sans 12px color #9CA3AF + value DM Sans 13px color #374151.
Budget: ₹20,000 in JetBrains Mono.
Timeline: "3 months"
Category: Finance badge.
Created: "Jan 15, 2025"

CARD 3 — Blockchain Verification (below info card):
Margin-top 16px.
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 16px 20px.
Chain link icon 14px #9CA3AF + "Blockchain Record" DM Sans 13px font-medium color #374151.
Subtext: DM Sans 12px color #9CA3AF. "Logged on Polygon Amoy"
Transaction link: DM Sans 11px color #1D4ED8. "View on PolygonScan →"
Truncated tx hash below in JetBrains Mono 11px color #9CA3AF.



## PAGE 6 — CREATE PROPOSAL PAGE



---

### Prompt Create Proposal

Design the SynGov create proposal page.
Same sidebar and top bar. Background #F9FAFB.
Main content: margin-left 240px padding-top 64px.


#### PAGE HEADER

Padding 32px 32px 20px.
Title: Sora 22px font-weight 700 color #0F172A. "Create a Proposal"
Subtext: DM Sans 14px color #6B7280. "Describe your idea in plain language. AI will structure it."

Progress steps below, margin-top 20px:
3 steps horizontal row, connected by line.
Step indicator: circle 28px.
Active: bg #1D4ED8 text white Sora 12px font-bold.
Completed: bg #059669 text white checkmark icon.
Upcoming: border 2px solid #E5E7EB text #9CA3AF.
Label below each circle: DM Sans 11px.
Step 1: "Proposal Details" (active)
Step 2: "Review AI Summary"
Step 3: "Submit"
Line between circles: 1px solid #E5E7EB. Active segment: #1D4ED8.


#### TWO COLUMN LAYOUT

Padding 0 32px 32px. Flex row gap 24px. Align start.
Left column: flex-grow 1. Right column: 380px fixed.


#### LEFT COLUMN (form)

Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 28px.

SECTION "Basic Information":
Section label: DM Sans 11px uppercase tracking-wide color #9CA3AF. Margin-bottom 16px.

Field — Title:
Label: DM Sans 13px font-weight 500 color #374151. "Proposal Title *"
Required asterisk color #DC2626.
Input below, gap 6px: Full width. Height 44px. Border 1px solid #E5E7EB.
Border-radius 8px. Padding 0 14px. DM Sans 14px color #0F172A.
Placeholder: "e.g. Allocate ₹20,000 for annual hackathon"
Character count right-aligned below: DM Sans 11px color #9CA3AF. "0/100"
Focus state: border #1D4ED8, ring 0 0 0 3px rgba(29,78,216,0.1).

Two column grid below, gap 16px:
Field — Category:
Label: "Category *"
Select dropdown: full width height 44px border 1px solid #E5E7EB border-radius 8px.
Padding 0 14px. DM Sans 14px color #0F172A. Chevron-down icon right.
Options with color indicators: Finance, Events, Tech, Operations, General.

Field — Risk Level:
Label: "Risk Level *"
Segmented 3-button control, full width height 44px, border-radius 8px, border 1px solid #E5E7EB overflow hidden.
Each segment: 33.3%. DM Sans 13px font-medium.
Selected: background #1D4ED8 text white.
Unselected: background white text #374151.
Labels: "Low" "Medium" "High"
Colors for selected: Low bg #059669, Medium bg #D97706, High bg #DC2626.

Field — Description:
Full width. Label "Description *" + hint text "Explain what you're proposing and why."
Hint: DM Sans 12px color #9CA3AF margin-left 4px.
Textarea: full width. Min-height 140px. Border 1px solid #E5E7EB border-radius 8px.
Padding 12px 14px. DM Sans 14px color #0F172A line-height 1.6.
Placeholder: "Describe your proposal in detail. Include the problem it solves,
expected benefits, and why now is the right time..."
Character count bottom right DM Sans 11px color #9CA3AF.
Focus state same as inputs.

Two column grid below, gap 16px:
Field — Budget:
Label: "Expected Budget"
Input: placeholder "₹20,000 or None" same style.
Left inside input: currency icon or ₹ symbol DM Sans 14px color #9CA3AF.

Field — Timeline:
Label: "Timeline"
Input: placeholder "e.g. 3 months, Q2 2025"

Field — Voting Deadline (full width):
Label: "Voting Closes On *"
Date input: same height border radius. Calendar icon right. DM Sans 14px.


#### RIGHT COLUMN (AI preview, sticky)

Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 24px.
Position sticky. Top 88px.

Header row:
Sparkle icon 16px #1D4ED8 + "AI Summary Preview" Sora 14px font-weight 600 color #0F172A.
Right: small live badge — pulsing green dot (CSS animation) + "Live" DM Sans 11px color #059669.

Subtext below, margin-top 4px:
DM Sans 12px color #9CA3AF.
"Updates automatically as you type. Powered by Gemini."

Divider 1px solid #F3F4F6. Margin 16px 0.

DEFAULT STATE (before typing):
Center aligned. Padding 32px 0.
Document-sparkle illustration placeholder: 60px.
Text: DM Sans 13px color #9CA3AF. "Start typing your proposal to see the AI summary."

LOADING STATE (debounced, while API call in progress):
Skeleton shimmer for each field.
7 skeleton bars: height 14px border-radius 4px background linear-gradient
(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%).
Animation: shimmer left to right 1.5s infinite.

POPULATED STATE (after API returns):
7 KPI field rows, gap 12px:
Each row:
Label: DM Sans 11px uppercase tracking-wide color #9CA3AF. Margin-bottom 3px.
Value: DM Sans 13px font-weight 500 color #0F172A.

Fields: WHAT / WHY / COST / IMPACT / RISK / DEADLINE / AFFECTS.
Risk shows colored badge. Cost in JetBrains Mono.

Bottom note: info icon 12px + DM Sans 11px color #9CA3AF.
"This summary will be shown to all voters."


#### BOTTOM ACTION BAR (sticky bottom of page)

Fixed bottom 0. Left 240px. Right 0.
Height 68px. Background white. Border-top 1px solid #E5E7EB.
Padding 0 32px. Flex align-center justify-between.

Left: "← Back to Proposals" ghost link DM Sans 13px color #6B7280.

Right: Two buttons gap 12px.
"Save Draft" — border 1px solid #E5E7EB bg white Sora 13px font-semibold color #374151
padding 10px 20px border-radius 8px.
"Submit Proposal" — bg #1D4ED8 text white Sora 13px font-semibold
padding 10px 24px border-radius 8px.
Disabled state when required fields empty: bg #9CA3AF cursor-not-allowed opacity 60%.



## PAGE 7 — USER PROFILE PAGE



---

### Prompt User Profile

Design the SynGov user profile page.
Same sidebar and top bar. Background #F9FAFB. Main content margin-left 240px padding-top 64px.


#### PROFILE HEADER CARD

Padding 32px.
Card: background white. Border-bottom 1px solid #E5E7EB. Padding 32px 32px 28px.
No border-radius on this card (full bleed below top bar).

Two-column layout: flex, align-center, gap 24px.

LEFT — Avatar + basic info:
Avatar circle: 72px. Background #DBEAFE. Border 3px solid #1D4ED8.
Initials centered: Sora 24px font-weight 700 color #1D4ED8.
If user has profile photo: img object-cover.

Right of avatar, flex column:
Name: Sora 22px font-weight 700 color #0F172A.
Role/designation: DM Sans 14px color #6B7280. "Core Member · Tech Committee"
Join date: DM Sans 13px color #9CA3AF. "Member since September 2024"

Expertise tag pills below, gap 8px, margin-top 10px:
Each pill: bg #EFF6FF border 1px solid #DBEAFE border-radius 100px.
Text: DM Sans 12px font-semibold color #1D4ED8. Padding 4px 12px.
Tags: "finance" "events" "tech" (from user.expertiseTags)
Edit icon button at end: pencil 12px color #9CA3AF. On click: tags become editable.

RIGHT SIDE — aligned right:
Participation level badge:
Large pill: padding 8px 20px border-radius 100px.
Core level: bg #0F172A text white Sora 13px font-semibold.
"● Core Member" with pulsing green dot.

Governance weight display below badge, margin-top 12px, text-align right:
Label: DM Sans 12px color #6B7280. "Governance Weight"
Value: JetBrains Mono 28px color #1D4ED8 font-weight 400. "1.30x"


#### STATS ROW

Padding 0 32px. Margin-top 24px.
4 stat cards in a row, gap 16px.
Same stat card style as dashboard but with these contents:
Card 1: Label "Contribution Score". Value JetBrains Mono 32px "72". Delta "+8 this month"
Card 2: Label "Proposals Created". Value "4". Delta "2 passed"
Card 3: Label "Votes Cast". Value "18". Delta "78% participation"
Card 4: Label "Tasks Completed". Value "12". Delta "On time: 10"


#### TWO COLUMN LAYOUT BELOW

Padding 24px 32px. Flex row gap 20px. Align start.

LEFT COLUMN (65%):

CARD — Contribution Activity:
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 24px.
Title: Sora 15px font-weight 600 "Contribution History"
Date range selector right of title:
3 pills "7 days" "30 days" "All time"
Active: bg #EFF6FF text #1D4ED8 border #DBEAFE.
Inactive: bg white text #6B7280 border #E5E7EB.
Border-radius 6px padding 4px 10px DM Sans 12px.

Activity list below, margin-top 16px:
Each item: flex row, gap 12px, padding 12px 0, border-bottom 1px solid #F9FAFB.
Left: colored icon square 32px border-radius 8px. Icon 14px.
Vote activity: bg #EFF6FF icon #1D4ED8.
Task complete: bg #ECFDF5 icon #059669.
Proposal created: bg #F5F3FF icon #7C3AED.
Attendance: bg #FFFBEB icon #D97706.

Right of icon, flex column:
Activity description: DM Sans 14px color #374151.
Date + score delta row: flex gap 8px.
Date: DM Sans 12px color #9CA3AF.
Score delta: DM Sans 12px font-semibold.
Positive: color #059669 with up-arrow. "+5"
Negative: color #DC2626 with down-arrow.

CARD — Vote History:
Margin-top 16px.
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 24px.
Title: Sora 15px font-weight 600 "Vote History"

Table-like list. Column headers:
"Proposal" / "Category" / "Your Vote" / "Result" / "Weight Applied"
Header row: DM Sans 11px uppercase tracking-wide color #9CA3AF.
Border-bottom 1px solid #E5E7EB. Padding-bottom 8px.

Data rows: padding 12px 0. Border-bottom 1px solid #F9FAFB.
Proposal: DM Sans 13px color #374151. Max 1 line truncate.
Category: small badge.
Your vote: badge — For (green), Against (red), Abstain (gray).
Result: badge — Passed (green), Rejected (red), Pending (yellow).
Weight applied: JetBrains Mono 12px color #1D4ED8.

RIGHT COLUMN (35%):

CARD — Score Breakdown:
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 24px.
Title: Sora 14px font-weight 600 "How your score is calculated"

Score total: JetBrains Mono 40px color #0F172A centered. Margin-top 12px.
"/100" DM Sans 14px color #6B7280 inline.
Circular progress ring SVG. Colored arc based on score.

Breakdown list below, margin-top 16px:
Each row: Label DM Sans 13px color #374151 + value JetBrains Mono 13px color #0F172A.
Flex space-between. Padding 8px 0. Border-bottom 1px solid #F9FAFB.
Votes cast: "+36 pts"
Tasks completed: "+60 pts"
Proposals created: "+16 pts"
Attendance: "+18 pts"
Decay applied: "−12 pts"
Subtle negative rows in color #DC2626.

CARD — Expertise Tags:
Margin-top 16px.
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 20px.
Title row: Sora 14px font-weight 600 + edit button (pencil icon, ghost, right).
Tags display: pill grid.
Each tag: bg #EFF6FF text #1D4ED8 DM Sans 13px font-medium
border 1px solid #DBEAFE border-radius 100px padding 5px 14px.
Edit mode: shows input field + dropdown to add tags + × to remove existing.
Available tags: finance, events, tech, operations, general.



## PAGE 8 — ANALYTICS PAGE



---

### Prompt Analytics

Design the SynGov analytics page.
Same sidebar and top bar. Background #F9FAFB. Main content margin-left 240px padding-top 64px.


#### PAGE HEADER

Padding 32px 32px 0.
Title: Sora 22px font-weight 700 color #0F172A. "Community Analytics"
Subtext: DM Sans 14px color #6B7280. "Track participation, decision quality, and community health."

Date range selector right of title (flex space-between):
Pill buttons: "7 days" "30 days" "3 months" "All time"
Active pill: bg #0F172A text white border-radius 8px DM Sans 13px font-semibold.
Inactive: bg white border 1px solid #E5E7EB text #374151 DM Sans 13px border-radius 8px.
Padding 8px 16px.


#### ROW 1 — KEY METRICS (5 cards, gap 16px)

Margin-top 24px. Padding 0 32px.
5 stat cards equal width.
Same stat card style, smaller variant. Padding 16px 20px.
Card 1: "Total Proposals" / "24" / "+3 this period"
Card 2: "Proposals Passed" / "18" / "75% pass rate"
Card 3: "Avg Participation" / "78%" / "+5.1%"
Card 4: "Total Votes Cast" / "312" / "Across all proposals"
Card 5: "Active Members" / "28" / "of 36 total"


#### ROW 2 — CHARTS (two columns, gap 20px)

Margin-top 24px. Padding 0 32px.

LEFT CHART CARD (60%):
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 24px.
Title: Sora 15px font-weight 600 "Participation Over Time"
Subtext: DM Sans 12px color #9CA3AF "Number of votes cast per proposal"

Line chart area below, margin-top 16px. Height 220px.
Chart uses Recharts or Chart.js.
Line color: #1D4ED8 stroke-width 2.
Area fill: gradient from rgba(29,78,216,0.15) to transparent.
Dots: 4px radius fill #1D4ED8.
Grid lines: 1px solid #F3F4F6 horizontal only.
X axis labels: DM Sans 11px color #9CA3AF.
Y axis labels: JetBrains Mono 11px color #9CA3AF.
Tooltip card: bg white border 1px solid #E5E7EB border-radius 8px padding 8px 12px
DM Sans 12px shadow-elevated.

RIGHT CHART CARD (40%):
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 24px.
Title: Sora 15px font-weight 600 "Proposals by Category"
Donut/pie chart. Height 200px.
Segments with colors:
Finance: #1D4ED8
Events: #7C3AED
Tech: #0891B2
Operations: #374151
General: #9CA3AF
Center of donut: total count JetBrains Mono 24px color #0F172A + "total" DM Sans 11px color #6B7280.
Legend below chart: dot + label + count. Horizontal flex wrap.


#### ROW 3 — TWO CARDS

Margin-top 20px. Padding 0 32px. Flex gap 20px.

LEFT CARD (50%) — Proposal Outcomes:
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 24px.
Title: Sora 15px font-weight 600 "Proposal Outcomes"
Horizontal bar chart. Each bar row: label + bar + value.
Rows: Passed (green #059669), Rejected (red #DC2626), Pending (amber #D97706), Closed (gray #9CA3AF).
Bar height 24px border-radius 4px. Bar width proportional to value.
Value: JetBrains Mono 13px right-aligned.

RIGHT CARD (50%) — Top Contributors:
Background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 24px.
Title: Sora 15px font-weight 600 "Top Contributors This Month"
Ranked list, 5 members:
Each row: rank number + avatar + name + score + level badge.
Rank: JetBrains Mono 13px color #9CA3AF. Width 24px.
Avatar: 32px circle initials.
Name: DM Sans 13px font-semibold color #0F172A.
Score: JetBrains Mono 13px color #1D4ED8 margin-left auto.
Level badge: small pill.
Row padding 10px 0 border-bottom 1px solid #F9FAFB.
Top rank row gets subtle gold-tint bg: #FFFBEB.


#### ROW 4 — COMMUNITY HEALTH BREAKDOWN

Margin-top 20px. Padding 0 32px 32px.
Card: background white. Border 1px solid #E5E7EB. Border-radius 12px. Padding 24px.
Title: Sora 15px font-weight 600 "Community Health Breakdown"

5 health metrics in a horizontal grid, evenly spaced:
Each metric: label + progress bar + score.
Label: DM Sans 12px color #6B7280.
Bar: height 8px border-radius 4px width 120px bg #F3F4F6.
Fill color: green if score > 70, amber if 40-70, red if <40.
Score below: JetBrains Mono 13px color #0F172A.
Metrics: Participation / Decision Quality / Transparency / Contributor Recognition / Proposal Clarity
