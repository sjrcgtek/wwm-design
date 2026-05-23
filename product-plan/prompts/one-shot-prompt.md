# One-Shot Implementation Prompt

Copy and paste this entire prompt into your coding agent to implement the full Walking with Moms in Need application in a single session.

---

I have a complete UI design handoff package for a donation registry web app called **Walking with Moms in Need**. The package includes finished React components, TypeScript types, sample data, design tokens, and implementation instructions. I need you to integrate these components into a working application.

Before writing any code, please ask me:

1. **What framework/stack are you using?** (e.g., Next.js App Router, Next.js Pages, Vite + React, Remix, etc.)
2. **What backend/database will you use?** (e.g., Supabase, Firebase, PlanetScale, Prisma + PostgreSQL, etc.)
3. **What authentication solution will you use?** (e.g., NextAuth, Supabase Auth, Clerk, Auth0, etc.)
4. **Do you want to start with test-driven development?** (write failing tests first, then implement)
5. **Should I implement all four milestones in one go, or start with the shell and first section?**

Once I answer, proceed with implementation by following the instructions in `product-plan/instructions/one-shot-instructions.md`.

**Key files to read before starting:**
- `product-plan/product-overview.md` — Product summary and entity descriptions
- `product-plan/instructions/one-shot-instructions.md` — Complete milestone-by-milestone instructions
- `product-plan/design-system/` — Color tokens, Tailwind colors, fonts
- `product-plan/shell/components/` — Shell components to copy
- `product-plan/sections/*/components/` — Section components to copy
- `product-plan/sections/*/types.ts` — TypeScript interfaces
- `product-plan/sections/*/sample-data.json` — Sample data for testing
- `product-plan/sections/*/tests.md` — UI behavior test specs
- `product-plan/sections/*/screenshot.png` — Visual references

**Important notes:**
- The components are props-based — they accept data and fire callbacks; you wire them up
- Never modify the component files themselves; only create wrappers and data layers around them
- Replace sample data with real data from your backend
- Implement loading, error, and empty states
- The app has two user types: **Donors** (public, no auth needed) and **Coordinators** (authenticated)
  - Public Registry: publicly accessible, no login required
  - Needs List, Donor Commitments, Quote Manager: coordinator-only (authenticated)
