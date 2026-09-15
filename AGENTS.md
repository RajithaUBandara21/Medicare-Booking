# AGENTS.md

Instructions for AI coding agents working in this project.

## What this is

Medicare-Booking is a web application for booking and managing medical
appointments. Patients search for and book appointments with doctors; doctors
manage their profile, availability, and incoming appointments.

## Attribution

Do not add AI attribution to commits or pull requests, including AI
`Co-Authored-By` trailers or generated-by signatures. Preserve genuine human
attribution.

## Engineering approach

Build for established requirements, not hypothetical scale, threats, or
future flexibility. Reuse existing code, the standard library, native
platform features, and installed dependencies before adding new machinery.

- Unknown scale or extensibility defaults to the smaller, reversible design.
  Don't infer enterprise, multi-tenant, hostile-user, or compliance
  requirements that haven't been stated.
- Derive trust and data-integrity boundaries from actual reachability:
  untrusted input, auth/session/ownership, shared persisted data, destructive
  operations, payments, secrets, and sensitive data.
- Add an abstraction, dependency, service, configuration surface, or security
  mechanism only for a current, real requirement.

## Stack

- **Frontend** (`FrontEnd/`): React 18 + Vite 5, Tailwind CSS 3,
  react-router-dom 6, Context + `useReducer` for auth state, Cloudinary for
  image upload
- **Backend** (`BackEnd/`): Node.js + Express 4 (ESM), Mongoose 8 / MongoDB,
  JWT auth (`jsonwebtoken` + `bcryptjs`)
- No TypeScript, no ORM beyond Mongoose, no component library, no test
  runner or CI configured yet

## Commands

Two separate apps, each with its own `package.json` (no workspace/monorepo
tooling) - `cd` into the app before running its scripts.

**BackEnd** (Node.js + Express + MongoDB, <http://localhost:5000>):

- Dev server: `npm run start-dev` (nodemon, auto-restarts)
- Production server: `npm start`
- Requires `BackEnd/.env` (see `BackEnd/.env.example`): `PORT`, `MONGO_URL`,
  `JWT_SECRET`

**FrontEnd** (React + Vite, <http://localhost:5173> by default):

- Dev server: `npm run dev`
- Build: `npm run build`
- Preview production build: `npm run preview`
- Lint: `npm run lint`
- Browser tests: `npm run test:browser` (from `FrontEnd/`; Playwright against
  `localhost:5173` - requires the BackEnd dev server running on `:5000` and
  network access to the MongoDB Atlas demo accounts seeded for
  `FrontEnd/e2e/smoke.spec.js`)
- Requires `FrontEnd/.env` for Cloudinary uploads (see
  `FrontEnd/.env.example`): `VITE_CLOUD_NAME`, `VITE_UPLOAD_PRESET_NAME`

Testing is opt-in. Neither app has a real unit test runner configured yet.

## Conventions

- Functional React components with hooks only; no class components.
- Route protection on the frontend goes through
  `routers/ProtectiveRoute.jsx` (`allowedRoles={[...]}`); on the backend
  through `auth/verifyToken.js`'s `authenticate` and `restrict(roles)`
  middleware. Never trust a client-supplied user id for "your own data"
  checks - use the id the verified JWT set on the request.
- API responses follow `{ success: boolean, message, data? }` with an
  appropriate HTTP status code - match this shape for new endpoints.
- Exclude `password` from any response returning a User or Doctor document
  (`.select("-password")` or destructure `_doc` and omit it).
- Match the casing and structure of the file you're adding next to
  (`Controllers/`, `Routers/`, `models/` casing is inconsistent in this repo
  already; follow the neighbor, don't "fix" it project-wide as a drive-by).

## Comments and writing

- Comment the why, not the what; delete comments that restate the code.
- No em dashes (U+2014) in generated content (docs, comments, commit
  messages, READMEs). Use a hyphen for `term - description` separators
  instead.
