# DSA Step Studio

Interactive Java algorithm revision workspace, hosted publicly with GitHub Pages. All execution happens locally in your browser.

## Use

Choose one of 12 sliding-window or two-pointer problems, select a sample or edit the JSON input, and build the trace. Step forward/back, scrub the timeline, or play at four speeds. Inspect source lines, local variables, indices, logical heap contents, aliases, and the call stack. Edit Java to execute a different solution. Revision marks and drafts persist per browser in localStorage.

Keyboard: Left/Right = step; Space = play/pause; / = search; Ctrl/Cmd+Enter = build. All shortcuts yield to text entry except build.

## Scope

The interpreter executes declarations, statements, condition checks, loop updates, calls, and returns. The highlighted line has just executed. This is not a JVM bytecode debugger. Library operations are atomic steps. Java subset: int/long/boolean/char/String, arrays, branches, while/for, break/continue, ternaries, helper calls, common HashMap/HashSet/ArrayList operations, basic stacks/queues, Math and Arrays helpers. Imports may be pasted. The first declared method is the entry point. No streams, lambdas, user-defined object types, threads, Java exceptions, or garbage collection. Numeric behavior is intended for safe integer DSA examples; exact JVM overflow, long precision beyond JavaScript safe integers, and floating-point behavior are not modeled.

Limits: 16,000 characters each for source and JSON; input parameter length 128; new array length 512; 4,000 snapshots; 32 call frames; 256 heap objects; bounded execution and snapshot storage. Failures display an actionable error and preserve completed runtime snapshots.

## Problems

Sliding window: LC 3, 76, 209, 424, 567, 904.
Two pointers: LC 11, 15, 16, 18, 42, 167.

Each includes three test inputs, an explanation, a technique invariant, a common pitfall, and time/space estimates for the built-in algorithm. After replacing code, these notes still describe the selected library problem.

## Validation

Run `node --test tests/engine.test.mjs` (no install required).

49 tests cover the 36 built-in examples, code edits changing execution, immutable snapshots and aliases, helper calls and recursion, scope and control flow, short circuiting, syntax/input/runtime errors, loop limits, string versus char addition, unsupported constructors, and deterministic comparisons with brute-force algorithms.

Browser QA performed in Chromium at desktop width and in 390px and 320px frame viewports: problem selection/search, input examples/custom JSON, paste/edit/build, errors and recovery, forward/reverse steps, final return, reset, playback/speed, heap/stack tabs, saved revision state, mobile problem drawer/code tabs, and absence of page-level horizontal overflow. This is responsive viewport verification, not a Safari or physical iPhone test.

## Privacy and deployment

This GitHub Pages version is a public website. Java solutions, inputs, and revision marks are processed and saved in each visitor’s browser; there is no shared account or server execution. Browser-local drafts from another domain do not automatically transfer here. No third-party JavaScript, remote fonts, or app analytics are used.

The parent atlas build copies this `docs/` folder into `dist/dsa-step-studio/`, runs the 49 interpreter tests, and deploys it through the existing GitHub Pages workflow. The live URL is https://vishaltdev.github.io/dsa-pattern-atlas/dsa-step-studio/. Run the tests from this folder with `node --test tests/engine.test.mjs`.

The original private ChatGPT Sites deployment is separate and keeps its existing access settings.
