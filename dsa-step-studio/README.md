# DSA Step Studio

A public, browser-local Java teaching visualizer covering all 30 Atlas patterns and 75 runnable problems.

**Live:** https://vishaltdev.github.io/dsa-pattern-atlas/dsa-step-studio/

## Use

Filter by any pattern, search by title, pattern name or LeetCode ID, choose one of three inputs, and build the trace. Edit Java to execute a different supported solution. Move forward/back, scrub the timeline, or play at four speeds. Use the canvas selector to inspect an array, matrix, map, heap, queue or node reference. Changed variables and heap entries are highlighted. Drafts and revision marks persist in this browser.

Explanations show captured operands, branch decisions and observed reads. Before/after compares adjacent trace snapshots even when jumping. Click a traced line number to set a breakpoint: Continue and playback pause **before** that instruction; the canvas remains after the last executed instruction. Continue again executes it and searches for the next stop. Breakpoints persist per problem and source, and code edits clear them.

Step over skips nested calls; Step out finishes the current call. In the Call stack tab, select a frame to inspect its locals or follow the active frame. Pin up to eight watches with the star or enter a safe variable/field/index path such as `nums[0]` or `head.next.val`. Next watch change detects both scalar updates and reachable heap mutations, including cycles. These paths are read-only and never evaluate Java expressions.

Reference diagrams show linked-list cycle arrows, tree/trie child edges, variable aliases, min-heap trees, and stack/deque ends. Graph views show input connections or captured union-find parent references; they do not claim to show a reconstructed traversal or final spanning tree. Matrix arrows connect cells read during an instruction to its last written cell. Library operations remain atomic. Large diagrams are bounded, scrollable and have a Fit option; full captured data remains in memory.

On mobile, switch between Visualize and Java code; expand Debugger controls for breakpoints, calls and watch navigation.

Keyboard: Left/Right step; Space play/pause; C continue; O step over; U step out; / search; Ctrl/Cmd+Enter build.

## Coverage

All 54 problems in the original nine-pattern revision plan are included. Each of the other 21 Atlas patterns has one runnable worked problem. The parent Atlas retains its 180-entry roadmap and 30 separate guided labs.

| Pattern | Runnable LeetCode IDs |
| --- | --- |
| Sliding window | 3, 76, 209, 424, 567, 904 |
| Two pointers | 11, 15, 16, 18, 42, 167 |
| Fast / slow pointers | 141, 142, 19, 876, 160, 234 |
| Binary search · sorted | 704, 33, 34, 35, 153, 162 |
| Binary search · answer | 875, 1011, 410, 774, 1283, 1482 |
| Hashing / frequency | 1, 49, 128, 217, 242, 347 |
| Prefix sums | 303, 560, 724, 930, 974, 523 |
| Difference arrays | 370, 1094, 1109, 1893, 1943, 2381 |
| Monotonic stack | 739, 496, 503, 84, 85, 901 |
| Monotonic deque | 239 |
| Heap / top K | 215 |
| Intervals | 56 |
| Greedy | 55 |
| Linked list | 21 |
| Tree DFS | 104 |
| Tree BFS | 102 |
| BST | 700 |
| Backtracking | 78 |
| Constrained backtracking | 79 |
| Graph BFS / DFS | 200 |
| Topological sort | 207 |
| Union find | 547 |
| Shortest path | 743 |
| Minimum spanning tree | 1584 |
| Trie | 208 |
| Bit manipulation | 136 |
| 1D DP | 70 |
| Knapsack DP | 416 |
| Grid DP | 62 |
| String DP | 1143 |

Each problem includes three inputs with checked expected answers, technique guidance, assumptions, pitfalls, and complexity for the displayed algorithm. LC 303, 901 and 208 use visible operation drivers rather than a persistent class API.

## Input formats

Inputs are JSON keyed by the first method's parameters. Lists accept arrays such as [1,2,3], or {"values":[3,2,0],"cycle":1}. Empty arrays become null. Shared-tail inputs use {"values":[4,1],"tail":"join"} plus top-level "shared":{"join":[8,4,5]}. Trees use level-order arrays with null children. Character matrices use arrays of one-character strings. Returned acyclic lists serialize as arrays; cyclic lists include values and cycle index; trees serialize in level order.

## Execution model

This is a bounded Java teaching interpreter, not a JVM bytecode debugger. It records state after declarations, statements, conditions, loop updates, calls and returns. Library operations are atomic. Logical stack/heap snapshots retain reference identity and previous state.

Supported: int/long/double/boolean/char/String, arrays and matrices, if/while/for, break/continue, ternaries, helper calls and recursion, built-in ListNode/TreeNode/TrieNode fields, HashMap, HashSet, ArrayList, Stack, ArrayDeque, integer min PriorityQueue, common Math/Arrays utilities, and bitwise XOR/AND/OR. TrieNode provides children[26] and end. No arbitrary classes, threads, streams, lambdas, Java exceptions, GC, or full standard library. Integer arithmetic is for safe DSA examples; exact JVM overflow and long precision beyond JavaScript safe integers are not modeled. Decimal division supports the gas-station bisection example.

Limits: 16,000 characters each for source/JSON; 128 items per input parameter; 512 cells per allocated dimension, 4,096 per matrix; 6,000 trace steps; 32 call frames; 256 allocated heap objects; bounded snapshot storage and instruction budget. Larger LeetCode constraints should be reduced for interactive tracing.

## Validation

Run `node --test tests/*.test.mjs` from this folder. The suite has 278 tests, including all 225 built-in input/output cases, full revision coverage, cycle entry and shared identity, rewiring, matrix row independence, recursive frames, decimals, heap/deque invariants, trie terminals, and brute-force comparisons for knapsack, histograms and rotated binary search. Debugger tests cover operand capture without re-execution, short-circuit decisions, stable frame identities, before/after diffs, breakpoint resume behavior, call stepping, safe watch paths, and diagram reference/dependency accuracy. The parent build also runs its eight Python tests (286 automated tests total). Browser checks exercise a full trace for all 30 patterns plus breakpoint playback, recursive stepping, frame selection, watch changes, mobile filtering, node/matrix views and code tabs at narrow widths.

## Hosting and privacy

The parent build copies docs/ into dist/dsa-step-studio/ and runs all interpreter tests before GitHub Pages deployment. All code and input execution occurs locally in the browser; there are no app analytics, external fonts or remote execution. Drafts and marks do not sync across browsers or domains. The original private Sites deployment is separate.
