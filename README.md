# TaskFlow AI — Front-End Development Internship Project

> **Front-End Development Internship Assignment for SANKAR GROUP**  
> **Candidate Project:** TaskFlow AI — Intelligent Project Management & Productivity SaaS

---

## 1. Project Overview

**TaskFlow AI** is a modern, responsive, commercial-grade SaaS landing page for a fictional AI-powered productivity and project management platform. Designed to eliminate daily administrative busywork, TaskFlow AI assists individuals and high-velocity teams in organizing workflows, ranking tasks by urgency and importance, managing tight project deadlines, collaborating without friction, and tracking team velocity.

This project is built strictly as a **100% client-side frontend application** in accordance with the assignment guidelines. All interactions—including interactive dashboard previews, task toggles, filterable sprint boards, pricing plan handoffs, accessible accordion tabs, and validated demo inquiry submissions—operate entirely through React state and semantic client logic without external backend, database, or payment dependencies.

---

## 2. Key Features

- **Responsive Navigation Bar**:
  - Sticky glassmorphic navigation with backdrop blur.
  - Smooth anchor scrolling with offset compensation.
  - Responsive mobile hamburger menu with smooth transitions and auto-closing on link selection.
  - Direct "Get Started" conversion button.
- **Hero Section with Interactive Product Illustration**:
  - Punchy typography: *"Less Busywork. More Breakthroughs."*
  - Dual action CTAs ("Start for Free" and "Explore Features").
  - Simulated workspace preview containing a collapsible sidebar, live sync indicator, dynamic progress meter, interactive task checkboxes (click to toggle state and update the completion percentage), milestone countdowns, and an AI Focus Recommendation card.
- **Trust & Value Proposition Strip**:
  - Clean value matrix highlighting: *Organized Workflows*, *Smarter Priorities*, *Team Collaboration*, and *Clear Progress*.
  - Authentic presentation with zero artificial customer logos or fabricated statistics.
- **Core Product Features (4 Comprehensive Cards)**:
  - *AI-Powered Task Prioritization*: Scored urgency and impact matrix.
  - *Smart Deadline Planning*: Timeline roadmaps and buffer warnings.
  - *Team Collaboration*: Contextual handoffs and synchronized activity.
  - *Productivity Insights*: Actionable visual velocity reporting.
- **How It Works (3-Step Workflow)**:
  - Step 01: *Create Your Workspace* (project setup presets).
  - Step 02: *Plan and Prioritize* (backlog scoring and AI ranking).
  - Step 03: *Track Your Progress* (live sprint health and velocity metrics).
- **Interactive Deep-Dive Product Preview**:
  - View switcher: **Sprint Board** (Kanban columns), **Task List** (detailed tabular view), and **Productivity Insights** (interactive CSS weekly sprint chart with hover tooltips).
  - Interactive project filtering across pipelines (*Web App v2.5*, *Design System*, *Cloud Event Broker*, *User Onboarding*).
  - Live task filter and search input.
- **Transparent Pricing Model**:
  - **STARTER Plan (₹0 / month)**: Personal workspace, basic task management, 3 projects, community support.
  - **PRO Plan (₹499 / month)**: Recommended tier with unlimited projects, advanced AI prioritizations, team collaboration, and priority support.
  - Smooth scroll handoff: Clicking either plan button immediately scrolls to the contact form and pre-selects the corresponding plan.
- **Accessible FAQ Accordion**:
  - 4 essential questions addressing product scope, team capabilities, pricing, and onboarding.
  - Fully accessible ARIA attributes (`aria-expanded`, `aria-controls`), keyboard navigation, and smooth expand/collapse transitions.
- **Validated Contact / Demo Request Form**:
  - Inputs for Full Name, Email Address, Plan Selector (Starter / Pro), and Message.
  - Client-side validation: empty checks, minimum length, and strict email format regex.
  - Inline error prompts and error state styling.
  - Optimistic loading animation followed by an informative Success Message Card with submission summary and a "Submit Another Inquiry" reset button.
- **SaaS Footer**:
  - Logo wordmark, mission summary, direct anchor links, platform resources, operational status indicator, legal placeholder modals, and `hello@taskflowai.example` contact.
  - Copyright year: 2026.

---

## 3. Technologies Used

- **React 19** & **TypeScript**
- **Vite 8** (lightning-fast development and optimized production bundling)
- **Tailwind CSS 3.4** (custom color palette, refined typography, and responsive utilities)
- **Lucide React** (consistent, lightweight, accessible icons)
- **Google Fonts** (*Plus Jakarta Sans* & *Inter*)
- **Puppeteer Core** (automated responsive viewport testing and screenshot generation)

---

## 4. Project Folder Structure

```
taskflow-ai/
├── SCREENSHOTS/                    # High-resolution desktop, tablet, and mobile captures
│   ├── 01-desktop-full.png
│   ├── 02-desktop-hero.png
│   ├── 03-laptop-view.png
│   ├── 04-tablet-hero.png
│   ├── 05-tablet-full.png
│   ├── 06-mobile-hero.png
│   ├── 07-mobile-menu-opened.png
│   ├── 08-small-mobile-hero.png
│   ├── 09-small-mobile-full.png
│   ├── 10-pricing-pro-selected-contact.png
│   ├── 11-contact-form-validation-errors.png
│   ├── 12-contact-form-success-card.png
│   ├── 13-faq-accordion-expanded.png
│   └── 14-product-preview-analytics-chart.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.tsx             # Sticky responsive navigation & mobile drawer
│   │   ├── Hero.tsx               # Hero copy + interactive preview dashboard
│   │   ├── ValueStrip.tsx         # Compact 4-pillar value proposition strip
│   │   ├── Features.tsx           # 4 feature cards with micro UI previews
│   │   ├── HowItWorks.tsx         # 3-step structured execution workflow
│   │   ├── ProductPreview.tsx     # Deep-dive tabs: Kanban, Table & Chart
│   │   ├── Pricing.tsx            # Starter & Pro cards with plan selection
│   │   ├── FAQ.tsx                # Accessible accordion FAQ
│   │   ├── Contact.tsx            # Validated demo inquiry form & success view
│   │   └── Footer.tsx             # Semantic footer & legal modal previews
│   ├── data/
│   │   ├── faq.ts                 # FAQ questions and detailed answers
│   │   ├── features.ts            # Feature data models and metrics
│   │   └── pricing.ts             # Pricing tier descriptions and feature sets
│   ├── App.tsx                    # Root component coordinating state and scroll
│   ├── index.css                  # Tailwind directives and custom scrollbar
│   └── main.tsx                   # React root entry point
├── public/
│   └── favicon.svg                # Brand icon favicon
├── DESIGN_EXPLANATION.md          # 5-8 line design decision summary
├── test-and-screenshot.cjs        # Automated headless Chrome test suite
├── index.html                     # HTML5 shell with font imports & meta tags
├── tailwind.config.js             # Custom colors (brand, electric, navy) & shadows
├── tsconfig.json                  # TypeScript compiler settings
└── package.json                   # Dependencies and npm scripts
```

---

## 5. Installation Instructions

Ensure you have **Node.js (v18 or higher)** installed on your machine.

1. Clone or extract the repository into your desired folder:
   ```bash
   cd taskflow-ai
   ```

2. Install all required dependencies:
   ```bash
   npm install
   ```

---

## 6. How to Run Locally

Start the Vite local development server:

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173
```

The application supports instant Hot Module Replacement (HMR) for rapid local iteration.

---

## 7. How to Build for Production

1. Compile TypeScript and build the optimized production assets:
   ```bash
   npm run build
   ```

2. Preview the production build locally:
   ```bash
   npm run preview
   ```

Production assets will be emitted to the `dist/` directory with tree-shaken CSS and minified JavaScript bundles.

---

## 8. Frontend Interaction Explanation

1. **Plan Selection & Coordinated Scrolling**:
   Clicking either the "Get Started" button on the Starter plan or "Choose Pro" on the Pro plan in `Pricing.tsx` invokes the parent `onSelectPlan` handler in `App.tsx`. This updates the active plan state and smoothly scrolls the viewport to `#contact`, pre-selecting and highlighting the chosen plan pill in the form.

2. **Interactive Hero Dashboard**:
   Tasks in the Hero dashboard preview can be toggled by clicking them. Toggling a task updates the active completion count and dynamically recalibrates the progress percentage bar in real time.

3. **Multi-View Product Preview**:
   Users can click the tabs atop the Product Showcase to switch between:
   - **Sprint Board**: Kanban columns (In Progress, Review, Completed).
   - **Task List**: A responsive tabular layout with assignees and priority pills.
   - **Productivity Insights**: A custom CSS daily velocity bar chart with hover tooltips displaying completed deliverables and focus hours.
   - Filtering by project dynamically updates both the project pipeline cards and the task listings.

4. **Client-Side Form Validation**:
   The contact form validates full name presence, email syntax via regular expressions, plan selection, and message length. Submitting invalid inputs highlights offending fields with red borders and explanatory helper messages. Upon valid submission, an optimistic loading spinner briefly simulates processing before transitioning to a confirmation receipt.

5. **Accessible FAQ Accordion**:
   Clicking any question toggles its state between collapsed and expanded, smoothly animating the chevron indicator and answer drawer while adhering to ARIA standards.

---

## 9. Responsive Verification & Quality Audit

The layout has been tested across all target breakpoints using automated Chrome instances:
- **Desktop (1440px)**: Checked for balanced typography and side-by-side dashboard composition.
- **Laptop (1366px)**: Verified grid padding and card proportions.
- **Tablet (768px)**: Verified column wrapping and responsive navbar.
- **Mobile (390px)**: Verified hamburger menu drawer, stacked card flows, and touch target sizing.
- **Small Mobile (360px)**: Verified that `scrollWidth <= clientWidth` with **zero horizontal overflow**.
- **Console Audit**: Verified with **0 runtime errors or warnings**.

---

## 10. Instructions for Pushing to GitHub

To publish this project to GitHub for internship review:

1. Initialize a git repository (if not already initialized):
   ```bash
   git init
   ```

2. Add all files to staging:
   ```bash
   git add .
   ```

3. Create the initial commit:
   ```bash
   git commit -m "feat: complete TaskFlow AI SaaS landing page for SANKAR GROUP internship assignment"
   ```

4. Create a new repository on your GitHub account (e.g., `taskflow-ai`).

5. Link the remote and push to the main branch:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/taskflow-ai.git
   git push -u origin main
   ```

---
*Created for the SANKAR GROUP Front-End Development Internship Assignment.*
