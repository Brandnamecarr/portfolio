# Portfolio

React + TypeScript (Vite) frontend with a password-gated chat box that talks
to the [life-improvement](../life-improvement) Chief of Staff agent over its
FastAPI server.

## Routes

- `/` — home / professional summary
- `/projects` — project cards (`src/data/projects.ts`)
- `/contact` — contact links and embedded resume (`public/resume.pdf`)
- `/assistant` — password-gated Chief of Staff chat; unlisted (no nav, not linked anywhere)

## Structure

- `src/` â€” Vite React frontend
  - `components/PasswordGate.tsx` â€” password wall; logs in against the life-improvement API and holds the session token
  - `components/ChatBox.tsx` â€” chat UI
  - `api/client.ts` â€” fetch helpers for the life-improvement API

## Setup

```bash
npm install
cp .env.example .env
```

`.env` only needs `VITE_API_URL` if the life-improvement API isn't running on
`http://localhost:8000`.

The backend itself lives in a sibling project â€” see
[../life-improvement/README.md](../life-improvement/README.md) for setup
(`APP_PASSWORD`, `JWT_SECRET`, `ANTHROPIC_API_KEY`) and run it with `cos-api`.

## Run

```bash
npm run dev
```

This runs the Vite dev server on `http://localhost:5173`. Start the
life-improvement API separately (`cos-api`, from the `life-improvement`
project) before using the chat box.

## Notes

- The password is verified server-side by life-improvement's `cos-api` â€” it is never shipped in this frontend's bundle.
- A successful login returns a short-lived JWT stored in `sessionStorage`; it's sent as a Bearer token on chat requests.
- Conversation history is held in-process by the single `ChiefOfStaff` instance on the backend, so only the latest message is sent per request.
