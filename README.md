# DSA Pattern Atlas

A responsive Java field guide preserving the original 30-pattern, 180-entry DSA roadmap.

**Live site:** https://vishaltdev.github.io/dsa-pattern-atlas/

## Explore

- 30 lessons with annotated Java examples, imports, when/why, naive approaches, worked examples, complexity, and mistakes.
- 180 LeetCode roadmap entries (including intentional repeats across patterns).
- Conceptual diagrams and an instruction-by-instruction algorithm lab for all 30 patterns.
- Before/after variables, changed-value highlights, arrays/maps, node references, recursive call stacks, queues/heaps, and DP tables.
- Back, Next instruction, Reset, timeline scrubbing, and execution history. A custom-input LC 3 lab is also available.
- Search by pattern, topic, title, or problem number.
- Browser-local completion tracking, unfinished filter, and JSON export/import.
- Keyboard-accessible tabs and responsive layouts.

The code snippets are reusable references, not complete solutions to all linked problems. Each snippet identifies its specific application; some assume problem-provided node types and initialized containers. Some linked problems require LeetCode Premium. Each of the 30 labs demonstrates one representative algorithm with a fixed worked input. Labs replay deterministic, instrumented reference algorithms with Java-style teaching instructions; they are not an arbitrary Java interpreter or JVM heap debugger. A snapshot shows state after its highlighted instruction, with condition results and explanatory notes. Every lab's final answer is checked during the build.

## Build and preview

Python 3 is the only build requirement. The browser application has no JavaScript package dependencies.

```sh
python3 build.py
python3 -m unittest -v
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000/. Do not open index.html directly: the application loads lesson JSON over HTTP.

`build.py` checks lesson counts, required fields, problem entries, and trace results before assembling `dist/`. `labs.py` produces immutable instruction snapshots at build time; the browser loads the generated `labs.json`. Tests check boundary cases and state invariants. GitHub Actions tests, builds, and deploys this directory to GitHub Pages on pushes to `main`. Pages must use GitHub Actions as the publishing source.

## Content and privacy

The roadmap was recovered from the user's shared DSA Roadmap Planning conversation. The original ZIP was unavailable; this implementation is a reconstruction. Diagrams and annotations were authored for this project. No analytics or account system is included. Progress is stored only in this browser unless exported. Google Fonts supplies optional typography; system fallbacks work if it is unavailable.
