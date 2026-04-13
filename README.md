# CodeCrafter — AI-Native Learning Companion

An interactive web application that transforms coding tutorials into an immersive, AI-assisted learning experience.

## Features

- **Living Code Transcript** — Code lines reveal in sync with video playback, showing exactly what the instructor is writing in real time.
- **Concept Radiance** — Clickable glowing terms (`lru_cache`, `memoization`, `recursion`, etc.) that open rich explainers with examples and documentation links.
- **Time-Travel Debugger** — Click any code line to jump to that timestamp in the video.
- **Dual Progress Bars** — Track both video progress and code completeness simultaneously.
- **Challenge Mode** — Three interactive coding exercises with hints and a reset button.
- **Community Annotations** — Timestamped notes from the community, highlighted when nearby in the timeline.
- **Voice Navigator** — Natural language search to jump to specific concepts (e.g. "show me where recursion is explained").
- **Picture-in-Picture** — Float the video player to a corner while focusing on the code.
- **Fork & Tinker** — One-click link to open the code in Replit.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS** — Dark IDE aesthetic with glassmorphism panels
- **Framer Motion** — Animations throughout (line reveals, tab transitions, concept cards)
- **React** — `useMemo`, `useCallback`, `useRef` for performant state management

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Press **▶ Play Demo** to watch the code reveal itself line by line. Click any glowing term to explore concepts, or use the Search tab to navigate by keyword.

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main layout & state orchestration
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles + glow animations
├── components/
│   ├── VideoPlayer.tsx   # YouTube embed with custom controls + PiP
│   ├── CodeTranscript.tsx# Animated code reveal with concept highlights
│   ├── TimelineBar.tsx   # Dual progress bars with annotation markers
│   ├── InfoPanel.tsx     # Tabbed side panel (Concept/Challenges/Notes/Search)
│   ├── ConceptRadiance.tsx # Concept detail card
│   ├── ChallengeMode.tsx # Interactive coding challenges
│   ├── CommunityAnnotations.tsx # Timestamped community notes
│   └── VoiceNavigator.tsx # Natural language search
└── data/
    └── tutorialData.ts   # Mock data: code timeline, concepts, annotations, challenges
```
