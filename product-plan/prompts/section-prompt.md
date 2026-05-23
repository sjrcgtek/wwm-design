# Section-by-Section Implementation Prompt Template

Use this template when implementing one milestone at a time. Replace `[MILESTONE NUMBER]` and `[SECTION NAME]` with the target milestone.

---

## Prompt Template

Copy and paste the following into your coding agent, filling in the bracketed placeholders:

---

I have a UI design handoff package for **Walking with Moms in Need**, a donation registry app. I'm implementing it milestone by milestone. I need you to implement **Milestone [MILESTONE NUMBER]: [SECTION NAME]**.

Before writing any code, please ask me:

1. **What framework/stack are you using?** (e.g., Next.js App Router, Vite + React, etc.)
2. **What backend/database will you use?** (e.g., Supabase, Firebase, Prisma, etc.)
3. **Is [previous milestone] already complete?** (I'll describe the current state)
4. **Do you want to write tests first (TDD)?**

Once I answer, implement this milestone by following `product-plan/instructions/incremental/[NN]-[section-id].md`.

**Files for this milestone:**
- `product-plan/product-overview.md` — Product context (always provide)
- `product-plan/instructions/incremental/[NN]-[section-id].md` — Milestone instructions
- `product-plan/sections/[section-id]/components/` — Components to integrate
- `product-plan/sections/[section-id]/types.ts` — TypeScript interfaces
- `product-plan/sections/[section-id]/sample-data.json` — Sample data
- `product-plan/sections/[section-id]/tests.md` — UI behavior test specs
- `product-plan/sections/[section-id]/screenshot.png` — Visual reference

**Do not modify the provided component files.** Wire them up to your routing, data layer, and callbacks only.

---

## Milestone Reference

| Milestone | File | Section ID |
|-----------|------|-----------|
| 01 | `instructions/incremental/01-shell.md` | `shell` |
| 02 | `instructions/incremental/02-public-registry.md` | `public-registry` |
| 03 | `instructions/incremental/03-needs-list.md` | `needs-list` |
| 04 | `instructions/incremental/04-donor-commitments.md` | `donor-commitments` |

## Example (Milestone 2)

> I have a UI design handoff package for **Walking with Moms in Need**, a donation registry app. I'm implementing it milestone by milestone. I need you to implement **Milestone 2: Public Registry**.
>
> Before writing any code, please ask me: ...
>
> **Files for this milestone:**
> - `product-plan/product-overview.md`
> - `product-plan/instructions/incremental/02-public-registry.md`
> - `product-plan/sections/public-registry/components/`
> - `product-plan/sections/public-registry/types.ts`
> - `product-plan/sections/public-registry/sample-data.json`
> - `product-plan/sections/public-registry/tests.md`
> - `product-plan/sections/public-registry/screenshot.png`
