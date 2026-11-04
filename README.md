# DSA Pattern Atlas

A responsive Java field guide preserving the original 30-pattern, 180-entry DSA roadmap.

**Live site:** https://vishaltdev.github.io/dsa-pattern-atlas/

## Explore

- 30 lessons with annotated Java examples, imports, when/why, naive approaches, worked examples, complexity, and mistakes.
- 180 LeetCode roadmap entries (including intentional repeats across patterns).
- Conceptual diagrams for all patterns; interactive forward/backward execution trace for LC 3.
- Search by pattern, topic, title, or problem number.
- Browser-local completion tracking, unfinished filter, and JSON export/import.
- Keyboard-accessible tabs and responsive layouts.

The code snippets are reusable references, not complete solutions to all linked problems. Each snippet identifies its specific application; some assume problem-provided node types and initialized containers. Some linked problems require LeetCode Premium. The execution lab simulates a supplied sliding-window algorithm and is not a Java interpreter or heap debugger.

## Build and preview

Python 3 is the only build requirement. The browser application has no JavaScript package dependencies.

```sh
python3 build.py
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000/. Do not open index.html directly: the application loads lesson JSON over HTTP.

`build.py` checks lesson counts, required fields, and problem entries before assembling `dist/`. GitHub Actions builds and deploys this directory to GitHub Pages on pushes to `main`. Pages must use GitHub Actions as the publishing source.

## Content and privacy

The roadmap was recovered from the user's shared DSA Roadmap Planning conversation. The original ZIP was unavailable; this implementation is a reconstruction. Diagrams and annotations were authored for this project. No analytics or account system is included. Progress is stored only in this browser unless exported. Google Fonts supplies optional typography; system fallbacks work if it is unavailable.
