export const extraPatterns = {
  "Fast / slow pointers": {
    "when": "Use different traversal speeds to find cycles, midpoints, or a fixed distance between linked-list pointers.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Binary search · sorted": {
    "when": "Use sorted order or a sorted partition to discard half of the remaining search interval.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Binary search · answer": {
    "when": "Use when a candidate answer has a monotonic feasibility test. Search the boundary between impossible and possible.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Hashing / frequency": {
    "when": "Use keyed lookup to remember membership, frequencies, or the earliest occurrence of a state.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Prefix sums": {
    "when": "Use when a range can be expressed as the difference between two running totals.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Difference arrays": {
    "when": "Use for many additive range changes: record boundary events, then take a prefix sum once.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Monotonic stack": {
    "when": "Use when each position needs its next greater/smaller neighbor or a maximal span.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Monotonic deque": {
    "when": "Use to keep the best candidate in a moving window while expiring old indices.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Heap / top K": {
    "when": "Use to repeatedly retrieve an extremum without sorting every candidate.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Intervals": {
    "when": "Use sorted endpoints to merge overlaps or count simultaneous ranges.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Greedy": {
    "when": "Use when a locally optimal choice can be justified by an exchange or dominance argument.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Linked list": {
    "when": "Use explicit reference rewiring for merge, reversal, and deletion in linked structures.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Tree DFS": {
    "when": "Use recursion when a tree answer combines results from child subtrees.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Tree BFS": {
    "when": "Use a queue when level order or distance from the root matters.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "BST": {
    "when": "Use the ordering invariant to prune one subtree at each comparison.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Backtracking": {
    "when": "Use to enumerate choices with a choose, explore, undo cycle.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Constrained backtracking": {
    "when": "Use backtracking with early rejection to prune choices that cannot lead to a valid result.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Graph BFS / DFS": {
    "when": "Use a visited set and frontier to explore connected cells or vertices.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Topological sort": {
    "when": "Use indegrees to order prerequisites in a directed acyclic graph and detect cycles.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Union find": {
    "when": "Use to merge components and answer repeated connectivity questions.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Shortest path": {
    "when": "Use distances and relaxations to find the cheapest route; choose the algorithm based on edge weights.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Minimum spanning tree": {
    "when": "Use cut properties to connect all vertices with minimum total edge cost.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Trie": {
    "when": "Use shared prefix paths for word lookup, prefix queries, and incremental character traversal.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Bit manipulation": {
    "when": "Use bitwise identities to summarize flags, parity, or cancellation across fixed-width integers.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "1D DP": {
    "when": "Use when a one-dimensional state depends on smaller solved states.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Knapsack DP": {
    "when": "Use for include/exclude choices constrained by a sum or capacity.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "Grid DP": {
    "when": "Use when each grid state combines answers from permitted predecessor cells.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  },
  "String DP": {
    "when": "Use prefix states to align or compare two sequences without recomputing their subproblems.",
    "invariant": "Inspect the state after each highlighted instruction.",
    "caution": "Check the problem assumptions and boundary cases."
  }
};
export const extraProblems = [
  {
    "id": 141,
    "title": "Linked List Cycle",
    "short": "Linked List Cycle",
    "pattern": "Fast / slow pointers",
    "difficulty": "Easy",
    "time": "O(n)",
    "space": "O(1)",
    "desc": "A fast pointer gains one node per iteration on a slow pointer inside a cycle.",
    "input": {
      "head": {
        "values": [
          3,
          2,
          0,
          -4
        ],
        "cycle": 1
      }
    },
    "examples": [
      {
        "head": {
          "values": [
            3,
            2,
            0,
            -4
          ],
          "cycle": 1
        }
      },
      {
        "head": [
          1,
          2
        ]
      },
      {
        "head": []
      }
    ],
    "expected": [
      true,
      false,
      false
    ],
    "focus": "A fast pointer gains one node per iteration on a slow pointer inside a cycle.",
    "pitfall": "Compare node identity, not equal values.",
    "code": "class Solution {\n    public boolean hasCycle(ListNode head) {\n        ListNode slow = head;\n        ListNode fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n}",
    "inputHint": "List inputs: [values], or {\"values\":[...],\"cycle\":index}. Empty arrays mean null."
  },
  {
    "id": 142,
    "title": "Linked List Cycle II",
    "short": "Linked List Cycle II",
    "pattern": "Fast / slow pointers",
    "difficulty": "Medium",
    "time": "O(n)",
    "space": "O(1)",
    "desc": "After a meeting, reset one pointer to the head and advance both one step to find the entry.",
    "input": {
      "head": {
        "values": [
          3,
          2,
          0,
          -4
        ],
        "cycle": 1
      }
    },
    "examples": [
      {
        "head": {
          "values": [
            3,
            2,
            0,
            -4
          ],
          "cycle": 1
        }
      },
      {
        "head": [
          1,
          2
        ]
      },
      {
        "head": {
          "values": [
            1
          ],
          "cycle": 0
        }
      }
    ],
    "expected": [
      {
        "values": [
          2,
          0,
          -4
        ],
        "cycle": 0
      },
      null,
      {
        "values": [
          1
        ],
        "cycle": 0
      }
    ],
    "focus": "After a meeting, reset one pointer to the head and advance both one step to find the entry.",
    "pitfall": "The returned cyclic node is serialized as values plus a cycle index.",
    "code": "class Solution {\n    public ListNode detectCycle(ListNode head) {\n        ListNode slow = head;\n        ListNode fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) {\n                ListNode entry = head;\n                while (entry != slow) {\n                    entry = entry.next;\n                    slow = slow.next;\n                }\n                return entry;\n            }\n        }\n        return null;\n    }\n}"
  },
  {
    "id": 19,
    "title": "Remove Nth Node From End",
    "short": "Remove Nth Node From End",
    "pattern": "Fast / slow pointers",
    "difficulty": "Medium",
    "time": "O(n)",
    "space": "O(1)",
    "desc": "Maintain an n-node gap; stop slow at the predecessor of the node to remove.",
    "input": {
      "head": [
        1,
        2,
        3,
        4,
        5
      ],
      "n": 2
    },
    "examples": [
      {
        "head": [
          1,
          2,
          3,
          4,
          5
        ],
        "n": 2
      },
      {
        "head": [
          1
        ],
        "n": 1
      },
      {
        "head": [
          1,
          2
        ],
        "n": 2
      }
    ],
    "expected": [
      [
        1,
        2,
        3,
        5
      ],
      null,
      [
        2
      ]
    ],
    "focus": "Maintain an n-node gap; stop slow at the predecessor of the node to remove.",
    "pitfall": "Assumes 1 ≤ n ≤ list length. A dummy handles deleting the head.",
    "code": "class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0, head);\n        ListNode fast = dummy;\n        ListNode slow = dummy;\n        for (int i = 0; i < n; i++) {\n            fast = fast.next;\n        }\n        while (fast.next != null) {\n            fast = fast.next;\n            slow = slow.next;\n        }\n        slow.next = slow.next.next;\n        return dummy.next;\n    }\n}"
  },
  {
    "id": 876,
    "title": "Middle of the Linked List",
    "short": "Middle of the Linked List",
    "pattern": "Fast / slow pointers",
    "difficulty": "Easy",
    "time": "O(n)",
    "space": "O(1)",
    "desc": "Two fast steps for every slow step place slow at the second middle of an even-length list.",
    "input": {
      "head": [
        1,
        2,
        3,
        4,
        5
      ]
    },
    "examples": [
      {
        "head": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "head": [
          1,
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "head": []
      }
    ],
    "expected": [
      [
        3,
        4,
        5
      ],
      [
        4,
        5,
        6
      ],
      null
    ],
    "focus": "Two fast steps for every slow step place slow at the second middle of an even-length list.",
    "pitfall": "Keep both null guards before following fast.next.next.",
    "code": "class Solution {\n    public ListNode middleNode(ListNode head) {\n        ListNode slow = head;\n        ListNode fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        return slow;\n    }\n}"
  },
  {
    "id": 160,
    "title": "Intersection of Two Linked Lists",
    "short": "Intersection of Two Linked Lists",
    "pattern": "Fast / slow pointers",
    "difficulty": "Easy",
    "time": "O(a + b)",
    "space": "O(1)",
    "desc": "Switching heads equalizes traversed length, so reference-equal pointers meet at the shared tail or null.",
    "input": {
      "headA": {
        "values": [
          4,
          1
        ],
        "tail": "join"
      },
      "headB": {
        "values": [
          5,
          6,
          1
        ],
        "tail": "join"
      },
      "shared": {
        "join": [
          8,
          4,
          5
        ]
      }
    },
    "examples": [
      {
        "headA": {
          "values": [
            4,
            1
          ],
          "tail": "join"
        },
        "headB": {
          "values": [
            5,
            6,
            1
          ],
          "tail": "join"
        },
        "shared": {
          "join": [
            8,
            4,
            5
          ]
        }
      },
      {
        "headA": [
          1,
          2
        ],
        "headB": [
          1,
          2
        ]
      },
      {
        "headA": [],
        "headB": [
          1
        ]
      }
    ],
    "expected": [
      [
        8,
        4,
        5
      ],
      null,
      null
    ],
    "focus": "Switching heads equalizes traversed length, so reference-equal pointers meet at the shared tail or null.",
    "pitfall": "Identical values do not establish an intersection. Use a named shared tail in JSON.",
    "code": "class Solution {\n    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n        ListNode a = headA;\n        ListNode b = headB;\n        while (a != b) {\n            a = a == null ? headB : a.next;\n            b = b == null ? headA : b.next;\n        }\n        return a;\n    }\n}",
    "inputHint": "Use {\"values\":[...],\"tail\":\"join\"} and top-level \"shared\":{\"join\":[...]} to create actual shared nodes."
  },
  {
    "id": 234,
    "title": "Palindrome Linked List",
    "short": "Palindrome Linked List",
    "pattern": "Fast / slow pointers",
    "difficulty": "Easy",
    "time": "O(n)",
    "space": "O(1)",
    "desc": "Find the midpoint, reverse the suffix, and compare corresponding values.",
    "input": {
      "head": [
        1,
        2,
        2,
        1
      ]
    },
    "examples": [
      {
        "head": [
          1,
          2,
          2,
          1
        ]
      },
      {
        "head": [
          1,
          2
        ]
      },
      {
        "head": []
      }
    ],
    "expected": [
      true,
      false,
      true
    ],
    "focus": "Find the midpoint, reverse the suffix, and compare corresponding values.",
    "pitfall": "This teaching solution mutates the list; restore the suffix if the caller needs the original structure.",
    "code": "class Solution {\n    public boolean isPalindrome(ListNode head) {\n        ListNode slow = head;\n        ListNode fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        ListNode prev = null;\n        while (slow != null) {\n            ListNode next = slow.next;\n            slow.next = prev;\n            prev = slow;\n            slow = next;\n        }\n        ListNode left = head;\n        ListNode right = prev;\n        while (right != null) {\n            if (left.val != right.val) return false;\n            left = left.next;\n            right = right.next;\n        }\n        return true;\n    }\n}"
  },
  {
    "id": 704,
    "title": "Binary Search",
    "short": "Binary Search",
    "pattern": "Binary search · sorted",
    "difficulty": "Easy",
    "time": "O(log n)",
    "space": "O(1)",
    "desc": "Keep target candidates in the inclusive interval [left, right].",
    "input": {
      "nums": [
        -1,
        0,
        3,
        5,
        9,
        12
      ],
      "target": 9
    },
    "examples": [
      {
        "nums": [
          -1,
          0,
          3,
          5,
          9,
          12
        ],
        "target": 9
      },
      {
        "nums": [
          1,
          2,
          3
        ],
        "target": 4
      },
      {
        "nums": [],
        "target": 1
      }
    ],
    "expected": [
      4,
      -1,
      -1
    ],
    "focus": "Keep target candidates in the inclusive interval [left, right].",
    "pitfall": "Advance past mid to guarantee progress; input must be sorted.",
    "code": "class Solution {\n    public int search(int[] nums, int target) {\n        int left = 0;\n        int right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        return -1;\n    }\n}"
  },
  {
    "id": 33,
    "title": "Search in Rotated Sorted Array",
    "short": "Search in Rotated Sorted Array",
    "pattern": "Binary search · sorted",
    "difficulty": "Medium",
    "time": "O(log n)",
    "space": "O(1)",
    "desc": "At least one half is sorted. Check whether target belongs to that half before discarding it.",
    "input": {
      "nums": [
        4,
        5,
        6,
        7,
        0,
        1,
        2
      ],
      "target": 0
    },
    "examples": [
      {
        "nums": [
          4,
          5,
          6,
          7,
          0,
          1,
          2
        ],
        "target": 0
      },
      {
        "nums": [
          4,
          5,
          6,
          7,
          0,
          1,
          2
        ],
        "target": 3
      },
      {
        "nums": [
          1
        ],
        "target": 1
      }
    ],
    "expected": [
      4,
      -1,
      0
    ],
    "focus": "At least one half is sorted. Check whether target belongs to that half before discarding it.",
    "pitfall": "Assumes distinct values. Duplicates require additional handling.",
    "code": "class Solution {\n    public int search(int[] nums, int target) {\n        int left = 0;\n        int right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[left] <= nums[mid]) {\n                if (nums[left] <= target && target < nums[mid]) {\n                    right = mid - 1;\n                } else {\n                    left = mid + 1;\n                }\n            } else {\n                if (nums[mid] < target && target <= nums[right]) {\n                    left = mid + 1;\n                } else {\n                    right = mid - 1;\n                }\n            }\n        }\n        return -1;\n    }\n}"
  },
  {
    "id": 34,
    "title": "First and Last Position",
    "short": "First and Last Position",
    "pattern": "Binary search · sorted",
    "difficulty": "Medium",
    "time": "O(log n)",
    "space": "O(1)",
    "desc": "Use a lower bound and an upper bound; the half-open interval excludes right.",
    "input": {
      "nums": [
        5,
        7,
        7,
        8,
        8,
        10
      ],
      "target": 8
    },
    "examples": [
      {
        "nums": [
          5,
          7,
          7,
          8,
          8,
          10
        ],
        "target": 8
      },
      {
        "nums": [
          1,
          2,
          3
        ],
        "target": 4
      },
      {
        "nums": [],
        "target": 0
      }
    ],
    "expected": [
      [
        3,
        4
      ],
      [
        -1,
        -1
      ],
      [
        -1,
        -1
      ]
    ],
    "focus": "Use a lower bound and an upper bound; the half-open interval excludes right.",
    "pitfall": "Check whether the lower bound actually matches before indexing the answer.",
    "code": "class Solution {\n    public int[] searchRange(int[] nums, int target) {\n        int first = boundary(nums, target, false);\n        int after = boundary(nums, target, true);\n        if (first == nums.length || nums[first] != target) return new int[]{-1, -1};\n        return new int[]{first, after - 1};\n    }\n    private int boundary(int[] nums, int target, boolean upper) {\n        int left = 0;\n        int right = nums.length;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] < target || (upper && nums[mid] == target)) {\n                left = mid + 1;\n            } else {\n                right = mid;\n            }\n        }\n        return left;\n    }\n}"
  },
  {
    "id": 35,
    "title": "Search Insert Position",
    "short": "Search Insert Position",
    "pattern": "Binary search · sorted",
    "difficulty": "Easy",
    "time": "O(log n)",
    "space": "O(1)",
    "desc": "Find the first value greater than or equal to target.",
    "input": {
      "nums": [
        1,
        3,
        5,
        6
      ],
      "target": 5
    },
    "examples": [
      {
        "nums": [
          1,
          3,
          5,
          6
        ],
        "target": 5
      },
      {
        "nums": [
          1,
          3,
          5,
          6
        ],
        "target": 2
      },
      {
        "nums": [],
        "target": 1
      }
    ],
    "expected": [
      2,
      1,
      0
    ],
    "focus": "Find the first value greater than or equal to target.",
    "pitfall": "A valid insertion point may equal nums.length.",
    "code": "class Solution {\n    public int searchInsert(int[] nums, int target) {\n        int left = 0;\n        int right = nums.length;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid;\n            }\n        }\n        return left;\n    }\n}"
  },
  {
    "id": 153,
    "title": "Minimum in Rotated Sorted Array",
    "short": "Minimum in Rotated Sorted Array",
    "pattern": "Binary search · sorted",
    "difficulty": "Medium",
    "time": "O(log n)",
    "space": "O(1)",
    "desc": "Compare mid with the right boundary to retain the side containing the minimum.",
    "input": {
      "nums": [
        3,
        4,
        5,
        1,
        2
      ]
    },
    "examples": [
      {
        "nums": [
          3,
          4,
          5,
          1,
          2
        ]
      },
      {
        "nums": [
          1,
          2,
          3
        ]
      },
      {
        "nums": [
          7
        ]
      }
    ],
    "expected": [
      1,
      1,
      7
    ],
    "focus": "Compare mid with the right boundary to retain the side containing the minimum.",
    "pitfall": "Assumes a nonempty array of distinct values. Keep mid when it may be the answer.",
    "code": "class Solution {\n    public int findMin(int[] nums) {\n        int left = 0;\n        int right = nums.length - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] > nums[right]) {\n                left = mid + 1;\n            } else {\n                right = mid;\n            }\n        }\n        return nums[left];\n    }\n}"
  },
  {
    "id": 162,
    "title": "Find Peak Element",
    "short": "Find Peak Element",
    "pattern": "Binary search · sorted",
    "difficulty": "Medium",
    "time": "O(log n)",
    "space": "O(1)",
    "desc": "Follow the uphill side: it must contain a peak when outer neighbors are treated as negative infinity.",
    "input": {
      "nums": [
        1,
        2,
        3,
        1
      ]
    },
    "examples": [
      {
        "nums": [
          1,
          2,
          3,
          1
        ]
      },
      {
        "nums": [
          1
        ]
      },
      {
        "nums": [
          3,
          2,
          1
        ]
      }
    ],
    "expected": [
      2,
      0,
      0
    ],
    "focus": "Follow the uphill side: it must contain a peak when outer neighbors are treated as negative infinity.",
    "pitfall": "Adjacent values must differ. More than one answer may be valid.",
    "code": "class Solution {\n    public int findPeakElement(int[] nums) {\n        int left = 0;\n        int right = nums.length - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] < nums[mid + 1]) {\n                left = mid + 1;\n            } else {\n                right = mid;\n            }\n        }\n        return left;\n    }\n}"
  },
  {
    "id": 875,
    "title": "Koko Eating Bananas",
    "short": "Koko Eating Bananas",
    "pattern": "Binary search · answer",
    "difficulty": "Medium",
    "time": "O(n log max)",
    "space": "O(1)",
    "desc": "Higher speed never requires more hours, so binary search the first feasible speed.",
    "input": {
      "piles": [
        3,
        6,
        7,
        11
      ],
      "h": 8
    },
    "examples": [
      {
        "piles": [
          3,
          6,
          7,
          11
        ],
        "h": 8
      },
      {
        "piles": [
          30,
          11,
          23,
          4,
          20
        ],
        "h": 5
      },
      {
        "piles": [
          1
        ],
        "h": 1
      }
    ],
    "expected": [
      4,
      30,
      1
    ],
    "focus": "Higher speed never requires more hours, so binary search the first feasible speed.",
    "pitfall": "Use ceiling division for each pile and a wide hours total.",
    "code": "class Solution {\n    public int minEatingSpeed(int[] piles, int h) {\n        int left = 1;\n        int right = 1;\n        for (int i = 0; i < piles.length; i++) {\n            right = Math.max(right, piles[i]);\n        }\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            long hours = 0;\n            for (int i = 0; i < piles.length; i++) {\n                hours += (piles[i] + mid - 1) / mid;\n            }\n            if (hours <= h) {\n                right = mid;\n            } else {\n                left = mid + 1;\n            }\n        }\n        return left;\n    }\n}"
  },
  {
    "id": 1011,
    "title": "Ship Packages Within D Days",
    "short": "Ship Packages Within D Days",
    "pattern": "Binary search · answer",
    "difficulty": "Medium",
    "time": "O(n log sum)",
    "space": "O(1)",
    "desc": "Greedily pack in order to test each proposed capacity; larger capacities cannot need more days.",
    "input": {
      "weights": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "days": 5
    },
    "examples": [
      {
        "weights": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ],
        "days": 5
      },
      {
        "weights": [
          3,
          2,
          2,
          4,
          1,
          4
        ],
        "days": 3
      },
      {
        "weights": [
          5
        ],
        "days": 1
      }
    ],
    "expected": [
      15,
      6,
      5
    ],
    "focus": "Greedily pack in order to test each proposed capacity; larger capacities cannot need more days.",
    "pitfall": "Preserve package order and start the lower bound at the heaviest package.",
    "code": "class Solution {\n    public int shipWithinDays(int[] weights, int days) {\n        int left = 0;\n        int right = 0;\n        for (int i = 0; i < weights.length; i++) {\n            left = Math.max(left, weights[i]);\n            right += weights[i];\n        }\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            int used = 1;\n            int load = 0;\n            for (int i = 0; i < weights.length; i++) {\n                if (load + weights[i] > mid) {\n                    used++;\n                    load = 0;\n                }\n                load += weights[i];\n            }\n            if (used <= days) {\n                right = mid;\n            } else {\n                left = mid + 1;\n            }\n        }\n        return left;\n    }\n}"
  },
  {
    "id": 410,
    "title": "Split Array Largest Sum",
    "short": "Split Array Largest Sum",
    "pattern": "Binary search · answer",
    "difficulty": "Hard",
    "time": "O(n log sum)",
    "space": "O(1)",
    "desc": "Search the smallest largest sum for which at most k contiguous groups suffice.",
    "input": {
      "nums": [
        7,
        2,
        5,
        10,
        8
      ],
      "k": 2
    },
    "examples": [
      {
        "nums": [
          7,
          2,
          5,
          10,
          8
        ],
        "k": 2
      },
      {
        "nums": [
          1,
          2,
          3,
          4,
          5
        ],
        "k": 2
      },
      {
        "nums": [
          4
        ],
        "k": 1
      }
    ],
    "expected": [
      18,
      9,
      4
    ],
    "focus": "Search the smallest largest sum for which at most k contiguous groups suffice.",
    "pitfall": "Requires nonnegative values; feasibility relies on greedy grouping.",
    "code": "class Solution {\n    public int splitArray(int[] nums, int k) {\n        int left = 0;\n        int right = 0;\n        for (int i = 0; i < nums.length; i++) {\n            left = Math.max(left, nums[i]);\n            right += nums[i];\n        }\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            int groups = 1;\n            int sum = 0;\n            for (int i = 0; i < nums.length; i++) {\n                if (sum + nums[i] > mid) {\n                    groups++;\n                    sum = 0;\n                }\n                sum += nums[i];\n            }\n            if (groups <= k) {\n                right = mid;\n            } else {\n                left = mid + 1;\n            }\n        }\n        return left;\n    }\n}"
  },
  {
    "id": 774,
    "title": "Minimize Maximum Gas Station Distance",
    "short": "Minimize Maximum Gas Station Distance",
    "pattern": "Binary search · answer",
    "difficulty": "Hard",
    "time": "O(40n)",
    "space": "O(1)",
    "desc": "A maximum allowed gap d needs ceil(gap/d) − 1 stations in each existing gap.",
    "input": {
      "stations": [
        0,
        10,
        20
      ],
      "k": 2
    },
    "examples": [
      {
        "stations": [
          0,
          10,
          20
        ],
        "k": 2
      },
      {
        "stations": [
          0,
          10
        ],
        "k": 1
      },
      {
        "stations": [
          0,
          6,
          12
        ],
        "k": 0
      }
    ],
    "expected": [
      5,
      5,
      6
    ],
    "focus": "A maximum allowed gap d needs ceil(gap/d) − 1 stations in each existing gap.",
    "pitfall": "Return an approximation. This solution uses 40 bisections and assumes sorted distinct stations.",
    "code": "class Solution {\n    public double minmaxGasDist(int[] stations, int k) {\n        double left = 0.0;\n        double right = 0.0;\n        for (int i = 1; i < stations.length; i++) {\n            right = Math.max(right, stations[i] - stations[i - 1]);\n        }\n        for (int iteration = 0; iteration < 40; iteration++) {\n            double mid = (left + right) / 2.0;\n            int needed = 0;\n            for (int i = 1; i < stations.length; i++) {\n                needed += (int) Math.ceil((stations[i] - stations[i - 1]) / mid) - 1;\n            }\n            if (needed <= k) {\n                right = mid;\n            } else {\n                left = mid;\n            }\n        }\n        return right;\n    }\n}",
    "tolerance": 0.00001
  },
  {
    "id": 1283,
    "title": "Smallest Divisor Given a Threshold",
    "short": "Smallest Divisor Given a Threshold",
    "pattern": "Binary search · answer",
    "difficulty": "Medium",
    "time": "O(n log max)",
    "space": "O(1)",
    "desc": "Increasing a positive divisor decreases the sum of ceiling quotients.",
    "input": {
      "nums": [
        1,
        2,
        5,
        9
      ],
      "threshold": 6
    },
    "examples": [
      {
        "nums": [
          1,
          2,
          5,
          9
        ],
        "threshold": 6
      },
      {
        "nums": [
          44,
          22,
          33,
          11,
          1
        ],
        "threshold": 5
      },
      {
        "nums": [
          1
        ],
        "threshold": 1
      }
    ],
    "expected": [
      5,
      44,
      1
    ],
    "focus": "Increasing a positive divisor decreases the sum of ceiling quotients.",
    "pitfall": "The problem guarantees threshold ≥ the number of positive values.",
    "code": "class Solution {\n    public int smallestDivisor(int[] nums, int threshold) {\n        int left = 1;\n        int right = 1;\n        for (int i = 0; i < nums.length; i++) {\n            right = Math.max(right, nums[i]);\n        }\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            int sum = 0;\n            for (int i = 0; i < nums.length; i++) {\n                sum += (nums[i] + mid - 1) / mid;\n            }\n            if (sum <= threshold) {\n                right = mid;\n            } else {\n                left = mid + 1;\n            }\n        }\n        return left;\n    }\n}"
  },
  {
    "id": 1482,
    "title": "Minimum Days to Make m Bouquets",
    "short": "Minimum Days to Make m Bouquets",
    "pattern": "Binary search · answer",
    "difficulty": "Medium",
    "time": "O(n log maxDay)",
    "space": "O(1)",
    "desc": "Test whether enough disjoint adjacent groups have bloomed by a candidate day.",
    "input": {
      "bloomDay": [
        1,
        10,
        3,
        10,
        2
      ],
      "m": 3,
      "k": 1
    },
    "examples": [
      {
        "bloomDay": [
          1,
          10,
          3,
          10,
          2
        ],
        "m": 3,
        "k": 1
      },
      {
        "bloomDay": [
          1,
          10,
          3,
          10,
          2
        ],
        "m": 3,
        "k": 2
      },
      {
        "bloomDay": [
          7,
          7,
          7,
          7,
          12,
          7,
          7
        ],
        "m": 2,
        "k": 3
      }
    ],
    "expected": [
      3,
      -1,
      12
    ],
    "focus": "Test whether enough disjoint adjacent groups have bloomed by a candidate day.",
    "pitfall": "A missing flower breaks the consecutive run. Reject m*k > n first.",
    "code": "class Solution {\n    public int minDays(int[] bloomDay, int m, int k) {\n        if ((long) m * k > bloomDay.length) return -1;\n        int left = 1;\n        int right = 1;\n        for (int i = 0; i < bloomDay.length; i++) {\n            right = Math.max(right, bloomDay[i]);\n        }\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            int flowers = 0;\n            int bouquets = 0;\n            for (int i = 0; i < bloomDay.length; i++) {\n                if (bloomDay[i] <= mid) {\n                    flowers++;\n                    if (flowers == k) {\n                        bouquets++;\n                        flowers = 0;\n                    }\n                } else {\n                    flowers = 0;\n                }\n            }\n            if (bouquets >= m) {\n                right = mid;\n            } else {\n                left = mid + 1;\n            }\n        }\n        return left;\n    }\n}"
  },
  {
    "id": 1,
    "title": "Two Sum",
    "short": "Two Sum",
    "pattern": "Hashing / frequency",
    "difficulty": "Easy",
    "time": "O(n)",
    "space": "O(n)",
    "desc": "Store earlier values and query the complement before inserting the current index.",
    "input": {
      "nums": [
        2,
        7,
        11,
        15
      ],
      "target": 9
    },
    "examples": [
      {
        "nums": [
          2,
          7,
          11,
          15
        ],
        "target": 9
      },
      {
        "nums": [
          3,
          2,
          4
        ],
        "target": 6
      },
      {
        "nums": [
          3,
          3
        ],
        "target": 6
      }
    ],
    "expected": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        0,
        1
      ]
    ],
    "focus": "Store earlier values and query the complement before inserting the current index.",
    "pitfall": "Query first so the same element cannot be used twice.",
    "code": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int needed = target - nums[i];\n            if (seen.containsKey(needed)) return new int[]{seen.get(needed), i};\n            seen.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}"
  },
  {
    "id": 49,
    "title": "Group Anagrams",
    "short": "Group Anagrams",
    "pattern": "Hashing / frequency",
    "difficulty": "Medium",
    "time": "O(n · L log L)",
    "space": "O(nL)",
    "desc": "Sorted characters form a canonical key for each anagram group.",
    "input": {
      "strs": [
        "eat",
        "tea",
        "tan",
        "ate",
        "nat",
        "bat"
      ]
    },
    "examples": [
      {
        "strs": [
          "eat",
          "tea",
          "tan",
          "ate",
          "nat",
          "bat"
        ]
      },
      {
        "strs": [
          ""
        ]
      },
      {
        "strs": []
      }
    ],
    "expected": [
      [
        [
          "eat",
          "tea",
          "ate"
        ],
        [
          "tan",
          "nat"
        ],
        [
          "bat"
        ]
      ],
      [
        [
          ""
        ]
      ],
      []
    ],
    "focus": "Sorted characters form a canonical key for each anagram group.",
    "pitfall": "Output group order is not required by LeetCode; this version preserves first-seen order.",
    "code": "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, Integer> groups = new HashMap<>();\n        List<List<String>> result = new ArrayList<>();\n        for (int i = 0; i < strs.length; i++) {\n            char[] chars = strs[i].toCharArray();\n            Arrays.sort(chars);\n            String key = new String(chars);\n            if (!groups.containsKey(key)) {\n                groups.put(key, result.size());\n                result.add(new ArrayList<>());\n            }\n            result.get(groups.get(key)).add(strs[i]);\n        }\n        return result;\n    }\n}"
  },
  {
    "id": 128,
    "title": "Longest Consecutive Sequence",
    "short": "Longest Consecutive Sequence",
    "pattern": "Hashing / frequency",
    "difficulty": "Medium",
    "time": "O(n)",
    "space": "O(n)",
    "desc": "Start only at a run boundary and consume each value at most once.",
    "input": {
      "nums": [
        100,
        4,
        200,
        1,
        3,
        2
      ]
    },
    "examples": [
      {
        "nums": [
          100,
          4,
          200,
          1,
          3,
          2
        ]
      },
      {
        "nums": [
          1,
          2,
          0,
          1
        ]
      },
      {
        "nums": []
      }
    ],
    "expected": [
      4,
      3,
      0
    ],
    "focus": "Start only at a run boundary and consume each value at most once.",
    "pitfall": "Duplicates must not cause repeated scans of the same run.",
    "code": "class Solution {\n    public int longestConsecutive(int[] nums) {\n        Set<Integer> seen = new HashSet<>();\n        for (int i = 0; i < nums.length; i++) {\n            seen.add(nums[i]);\n        }\n        int best = 0;\n        for (int i = 0; i < nums.length; i++) {\n            int value = nums[i];\n            if (!seen.contains(value - 1)) {\n                int length = 0;\n                while (seen.contains(value)) {\n                    seen.remove(value);\n                    value++;\n                    length++;\n                }\n                best = Math.max(best, length);\n            }\n        }\n        return best;\n    }\n}"
  },
  {
    "id": 217,
    "title": "Contains Duplicate",
    "short": "Contains Duplicate",
    "pattern": "Hashing / frequency",
    "difficulty": "Easy",
    "time": "O(n)",
    "space": "O(n)",
    "desc": "Set.add returns false when a value was already present.",
    "input": {
      "nums": [
        1,
        2,
        3,
        1
      ]
    },
    "examples": [
      {
        "nums": [
          1,
          2,
          3,
          1
        ]
      },
      {
        "nums": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "nums": []
      }
    ],
    "expected": [
      true,
      false,
      false
    ],
    "focus": "Set.add returns false when a value was already present.",
    "pitfall": "Empty and single-element inputs contain no duplicates.",
    "code": "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        Set<Integer> seen = new HashSet<>();\n        for (int i = 0; i < nums.length; i++) {\n            if (!seen.add(nums[i])) return true;\n        }\n        return false;\n    }\n}"
  },
  {
    "id": 242,
    "title": "Valid Anagram",
    "short": "Valid Anagram",
    "pattern": "Hashing / frequency",
    "difficulty": "Easy",
    "time": "O(n)",
    "space": "O(n)",
    "desc": "Count supply from s and consume exactly the same character multiplicities from t.",
    "input": {
      "s": "anagram",
      "t": "nagaram"
    },
    "examples": [
      {
        "s": "anagram",
        "t": "nagaram"
      },
      {
        "s": "rat",
        "t": "car"
      },
      {
        "s": "",
        "t": ""
      }
    ],
    "expected": [
      true,
      false,
      true
    ],
    "focus": "Count supply from s and consume exactly the same character multiplicities from t.",
    "pitfall": "Equal length alone does not imply equal character counts.",
    "code": "class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        Map<Character, Integer> count = new HashMap<>();\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            count.put(c, count.getOrDefault(c, 0) + 1);\n        }\n        for (int i = 0; i < t.length(); i++) {\n            char c = t.charAt(i);\n            if (count.getOrDefault(c, 0) == 0) return false;\n            count.put(c, count.get(c) - 1);\n        }\n        return true;\n    }\n}"
  },
  {
    "id": 347,
    "title": "Top K Frequent Elements",
    "short": "Top K Frequent Elements",
    "pattern": "Hashing / frequency",
    "difficulty": "Medium",
    "time": "O(n)",
    "space": "O(n)",
    "desc": "Group distinct values into buckets indexed by their frequencies, then visit buckets from high to low.",
    "input": {
      "nums": [
        1,
        1,
        1,
        2,
        2,
        3
      ],
      "k": 2
    },
    "examples": [
      {
        "nums": [
          1,
          1,
          1,
          2,
          2,
          3
        ],
        "k": 2
      },
      {
        "nums": [
          1
        ],
        "k": 1
      },
      {
        "nums": [
          4,
          4,
          5,
          5,
          5
        ],
        "k": 1
      }
    ],
    "expected": [
      [
        1,
        2
      ],
      [
        1
      ],
      [
        5
      ]
    ],
    "focus": "Group distinct values into buckets indexed by their frequencies, then visit buckets from high to low.",
    "pitfall": "Assumes 1 ≤ k ≤ the number of distinct values; equal-frequency order may vary.",
    "code": "class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> count = new HashMap<>();\n        List<Integer> unique = new ArrayList<>();\n        for (int i = 0; i < nums.length; i++) {\n            if (!count.containsKey(nums[i])) unique.add(nums[i]);\n            count.put(nums[i], count.getOrDefault(nums[i], 0) + 1);\n        }\n        List<List<Integer>> buckets = new ArrayList<>();\n        for (int i = 0; i <= nums.length; i++) {\n            buckets.add(new ArrayList<>());\n        }\n        for (int i = 0; i < unique.size(); i++) {\n            int value = unique.get(i);\n            buckets.get(count.get(value)).add(value);\n        }\n        int[] result = new int[k];\n        int index = 0;\n        for (int frequency = nums.length; frequency > 0; frequency--) {\n            List<Integer> bucket = buckets.get(frequency);\n            for (int j = 0; j < bucket.size(); j++) {\n                result[index] = bucket.get(j);\n                index++;\n                if (index == k) return result;\n            }\n        }\n        return result;\n    }\n}"
  },
  {
    "id": 303,
    "title": "Range Sum Query — Immutable",
    "short": "Range Sum Query — Immutable",
    "pattern": "Prefix sums",
    "difficulty": "Easy",
    "time": "O(n + q)",
    "space": "O(n)",
    "desc": "prefix[i] stores the sum before index i, making each inclusive range query a subtraction.",
    "input": {
      "nums": [
        -2,
        0,
        3,
        -5,
        2,
        -1
      ],
      "queries": [
        [
          0,
          2
        ],
        [
          2,
          5
        ],
        [
          0,
          5
        ]
      ]
    },
    "examples": [
      {
        "nums": [
          -2,
          0,
          3,
          -5,
          2,
          -1
        ],
        "queries": [
          [
            0,
            2
          ],
          [
            2,
            5
          ],
          [
            0,
            5
          ]
        ]
      },
      {
        "nums": [
          7
        ],
        "queries": [
          [
            0,
            0
          ]
        ]
      },
      {
        "nums": [],
        "queries": []
      }
    ],
    "expected": [
      [
        1,
        -1,
        -3
      ],
      [
        7
      ],
      []
    ],
    "focus": "prefix[i] stores the sum before index i, making each inclusive range query a subtraction.",
    "pitfall": "This driver represents a sequence of NumArray.sumRange calls on one immutable array.",
    "code": "class Solution {\n    public int[] rangeSums(int[] nums, int[][] queries) {\n        int[] prefix = new int[nums.length + 1];\n        for (int i = 0; i < nums.length; i++) {\n            prefix[i + 1] = prefix[i] + nums[i];\n        }\n        int[] result = new int[queries.length];\n        for (int i = 0; i < queries.length; i++) {\n            int left = queries[i][0];\n            int right = queries[i][1];\n            result[i] = prefix[right + 1] - prefix[left];\n        }\n        return result;\n    }\n}"
  },
  {
    "id": 560,
    "title": "Subarray Sum Equals K",
    "short": "Subarray Sum Equals K",
    "pattern": "Prefix sums",
    "difficulty": "Medium",
    "time": "O(n)",
    "space": "O(n)",
    "desc": "Every prior prefix equal to sum − k starts a subarray ending at the current index.",
    "input": {
      "nums": [
        1,
        1,
        1
      ],
      "k": 2
    },
    "examples": [
      {
        "nums": [
          1,
          1,
          1
        ],
        "k": 2
      },
      {
        "nums": [
          1,
          -1,
          0
        ],
        "k": 0
      },
      {
        "nums": [],
        "k": 3
      }
    ],
    "expected": [
      2,
      3,
      0
    ],
    "focus": "Every prior prefix equal to sum − k starts a subarray ending at the current index.",
    "pitfall": "Seed prefix 0 once, and count matches before recording the current prefix.",
    "code": "class Solution {\n    public int subarraySum(int[] nums, int k) {\n        Map<Integer, Integer> frequencies = new HashMap<>();\n        frequencies.put(0, 1);\n        int sum = 0;\n        int answer = 0;\n        for (int i = 0; i < nums.length; i++) {\n            sum += nums[i];\n            answer += frequencies.getOrDefault(sum - k, 0);\n            frequencies.put(sum, frequencies.getOrDefault(sum, 0) + 1);\n        }\n        return answer;\n    }\n}"
  },
  {
    "id": 724,
    "title": "Find Pivot Index",
    "short": "Find Pivot Index",
    "pattern": "Prefix sums",
    "difficulty": "Easy",
    "time": "O(n)",
    "space": "O(1)",
    "desc": "At each position, subtract the left sum and current value from the total to obtain the right sum.",
    "input": {
      "nums": [
        1,
        7,
        3,
        6,
        5,
        6
      ]
    },
    "examples": [
      {
        "nums": [
          1,
          7,
          3,
          6,
          5,
          6
        ]
      },
      {
        "nums": [
          1,
          2,
          3
        ]
      },
      {
        "nums": [
          2,
          1,
          -1
        ]
      }
    ],
    "expected": [
      3,
      -1,
      0
    ],
    "focus": "At each position, subtract the left sum and current value from the total to obtain the right sum.",
    "pitfall": "Neither side includes the pivot element.",
    "code": "class Solution {\n    public int pivotIndex(int[] nums) {\n        int total = 0;\n        for (int i = 0; i < nums.length; i++) {\n            total += nums[i];\n        }\n        int leftSum = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (leftSum == total - leftSum - nums[i]) return i;\n            leftSum += nums[i];\n        }\n        return -1;\n    }\n}"
  },
  {
    "id": 930,
    "title": "Binary Subarrays With Sum",
    "short": "Binary Subarrays With Sum",
    "pattern": "Prefix sums",
    "difficulty": "Medium",
    "time": "O(n)",
    "space": "O(n)",
    "desc": "Count the number of earlier prefixes that differ from the current prefix by goal.",
    "input": {
      "nums": [
        1,
        0,
        1,
        0,
        1
      ],
      "goal": 2
    },
    "examples": [
      {
        "nums": [
          1,
          0,
          1,
          0,
          1
        ],
        "goal": 2
      },
      {
        "nums": [
          0,
          0,
          0,
          0,
          0
        ],
        "goal": 0
      },
      {
        "nums": [],
        "goal": 0
      }
    ],
    "expected": [
      4,
      15,
      0
    ],
    "focus": "Count the number of earlier prefixes that differ from the current prefix by goal.",
    "pitfall": "Repeated zero prefixes create multiple valid starting positions.",
    "code": "class Solution {\n    public int numSubarraysWithSum(int[] nums, int goal) {\n        Map<Integer, Integer> count = new HashMap<>();\n        count.put(0, 1);\n        int sum = 0;\n        int answer = 0;\n        for (int i = 0; i < nums.length; i++) {\n            sum += nums[i];\n            answer += count.getOrDefault(sum - goal, 0);\n            count.put(sum, count.getOrDefault(sum, 0) + 1);\n        }\n        return answer;\n    }\n}"
  },
  {
    "id": 974,
    "title": "Subarray Sums Divisible by K",
    "short": "Subarray Sums Divisible by K",
    "pattern": "Prefix sums",
    "difficulty": "Medium",
    "time": "O(n)",
    "space": "O(n)",
    "desc": "Equal normalized prefix remainders imply a range sum divisible by k.",
    "input": {
      "nums": [
        4,
        5,
        0,
        -2,
        -3,
        1
      ],
      "k": 5
    },
    "examples": [
      {
        "nums": [
          4,
          5,
          0,
          -2,
          -3,
          1
        ],
        "k": 5
      },
      {
        "nums": [
          5
        ],
        "k": 9
      },
      {
        "nums": [
          -1,
          2,
          9
        ],
        "k": 2
      }
    ],
    "expected": [
      7,
      0,
      2
    ],
    "focus": "Equal normalized prefix remainders imply a range sum divisible by k.",
    "pitfall": "Java remainders can be negative. Normalize into [0, k).",
    "code": "class Solution {\n    public int subarraysDivByK(int[] nums, int k) {\n        Map<Integer, Integer> count = new HashMap<>();\n        count.put(0, 1);\n        int remainder = 0;\n        int answer = 0;\n        for (int i = 0; i < nums.length; i++) {\n            remainder = ((remainder + nums[i]) % k + k) % k;\n            answer += count.getOrDefault(remainder, 0);\n            count.put(remainder, count.getOrDefault(remainder, 0) + 1);\n        }\n        return answer;\n    }\n}"
  },
  {
    "id": 523,
    "title": "Continuous Subarray Sum",
    "short": "Continuous Subarray Sum",
    "pattern": "Prefix sums",
    "difficulty": "Medium",
    "time": "O(n)",
    "space": "O(n)",
    "desc": "Store the earliest index for each remainder so repeated remainders can prove a length-at-least-two range.",
    "input": {
      "nums": [
        23,
        2,
        4,
        6,
        7
      ],
      "k": 6
    },
    "examples": [
      {
        "nums": [
          23,
          2,
          4,
          6,
          7
        ],
        "k": 6
      },
      {
        "nums": [
          23,
          2,
          6,
          4,
          7
        ],
        "k": 13
      },
      {
        "nums": [
          0,
          0
        ],
        "k": 1
      }
    ],
    "expected": [
      true,
      false,
      true
    ],
    "focus": "Store the earliest index for each remainder so repeated remainders can prove a length-at-least-two range.",
    "pitfall": "Assumes k > 0 and nonnegative nums, as in the problem. Do not overwrite the earliest index.",
    "code": "class Solution {\n    public boolean checkSubarraySum(int[] nums, int k) {\n        Map<Integer, Integer> first = new HashMap<>();\n        first.put(0, -1);\n        int remainder = 0;\n        for (int i = 0; i < nums.length; i++) {\n            remainder = (remainder + nums[i]) % k;\n            if (first.containsKey(remainder)) {\n                if (i - first.get(remainder) >= 2) return true;\n            } else {\n                first.put(remainder, i);\n            }\n        }\n        return false;\n    }\n}"
  },
  {
    "id": 370,
    "title": "Range Addition",
    "short": "Range Addition",
    "pattern": "Difference arrays",
    "difficulty": "Medium",
    "time": "O(n + u)",
    "space": "O(n)",
    "desc": "Add a delta at the inclusive start and undo it just beyond the inclusive end.",
    "input": {
      "length": 5,
      "updates": [
        [
          1,
          3,
          2
        ],
        [
          2,
          4,
          3
        ],
        [
          0,
          2,
          -2
        ]
      ]
    },
    "examples": [
      {
        "length": 5,
        "updates": [
          [
            1,
            3,
            2
          ],
          [
            2,
            4,
            3
          ],
          [
            0,
            2,
            -2
          ]
        ]
      },
      {
        "length": 3,
        "updates": []
      },
      {
        "length": 1,
        "updates": [
          [
            0,
            0,
            7
          ]
        ]
      }
    ],
    "expected": [
      [
        -2,
        0,
        3,
        5,
        3
      ],
      [
        0,
        0,
        0
      ],
      [
        7
      ]
    ],
    "focus": "Add a delta at the inclusive start and undo it just beyond the inclusive end.",
    "pitfall": "Allocate a sentinel slot so updates ending at length − 1 remain safe.",
    "code": "class Solution {\n    public int[] getModifiedArray(int length, int[][] updates) {\n        int[] diff = new int[length + 1];\n        for (int i = 0; i < updates.length; i++) {\n            int left = updates[i][0];\n            int right = updates[i][1];\n            int value = updates[i][2];\n            diff[left] += value;\n            diff[right + 1] -= value;\n        }\n        int[] result = new int[length];\n        int sum = 0;\n        for (int i = 0; i < length; i++) {\n            sum += diff[i];\n            result[i] = sum;\n        }\n        return result;\n    }\n}"
  },
  {
    "id": 1094,
    "title": "Car Pooling",
    "short": "Car Pooling",
    "pattern": "Difference arrays",
    "difficulty": "Medium",
    "time": "O(trips + maxLocation)",
    "space": "O(maxLocation)",
    "desc": "Treat boarding and alighting as signed events at each location.",
    "input": {
      "trips": [
        [
          2,
          1,
          5
        ],
        [
          3,
          3,
          7
        ]
      ],
      "capacity": 4
    },
    "examples": [
      {
        "trips": [
          [
            2,
            1,
            5
          ],
          [
            3,
            3,
            7
          ]
        ],
        "capacity": 4
      },
      {
        "trips": [
          [
            2,
            1,
            5
          ],
          [
            3,
            5,
            7
          ]
        ],
        "capacity": 3
      },
      {
        "trips": [],
        "capacity": 0
      }
    ],
    "expected": [
      false,
      true,
      true
    ],
    "focus": "Treat boarding and alighting as signed events at each location.",
    "pitfall": "Trips end before boarding at that same location. Use small coordinate examples within the sandbox array bound.",
    "code": "class Solution {\n    public boolean carPooling(int[][] trips, int capacity) {\n        int end = 0;\n        for (int i = 0; i < trips.length; i++) {\n            end = Math.max(end, trips[i][2]);\n        }\n        int[] diff = new int[end + 1];\n        for (int i = 0; i < trips.length; i++) {\n            diff[trips[i][1]] += trips[i][0];\n            diff[trips[i][2]] -= trips[i][0];\n        }\n        int passengers = 0;\n        for (int i = 0; i <= end; i++) {\n            passengers += diff[i];\n            if (passengers > capacity) return false;\n        }\n        return true;\n    }\n}"
  },
  {
    "id": 1109,
    "title": "Corporate Flight Bookings",
    "short": "Corporate Flight Bookings",
    "pattern": "Difference arrays",
    "difficulty": "Medium",
    "time": "O(n + bookings)",
    "space": "O(n)",
    "desc": "Convert one-based inclusive flight ranges into zero-based start and exclusive-end events.",
    "input": {
      "bookings": [
        [
          1,
          2,
          10
        ],
        [
          2,
          3,
          20
        ],
        [
          2,
          5,
          25
        ]
      ],
      "n": 5
    },
    "examples": [
      {
        "bookings": [
          [
            1,
            2,
            10
          ],
          [
            2,
            3,
            20
          ],
          [
            2,
            5,
            25
          ]
        ],
        "n": 5
      },
      {
        "bookings": [
          [
            1,
            1,
            5
          ]
        ],
        "n": 1
      },
      {
        "bookings": [],
        "n": 3
      }
    ],
    "expected": [
      [
        10,
        55,
        45,
        25,
        25
      ],
      [
        5
      ],
      [
        0,
        0,
        0
      ]
    ],
    "focus": "Convert one-based inclusive flight ranges into zero-based start and exclusive-end events.",
    "pitfall": "Subtract at right, not right + 1, after converting the start to zero-based.",
    "code": "class Solution {\n    public int[] corpFlightBookings(int[][] bookings, int n) {\n        int[] diff = new int[n + 1];\n        for (int i = 0; i < bookings.length; i++) {\n            int left = bookings[i][0] - 1;\n            int right = bookings[i][1];\n            diff[left] += bookings[i][2];\n            diff[right] -= bookings[i][2];\n        }\n        int[] result = new int[n];\n        int seats = 0;\n        for (int i = 0; i < n; i++) {\n            seats += diff[i];\n            result[i] = seats;\n        }\n        return result;\n    }\n}"
  },
  {
    "id": 1893,
    "title": "Check Range Coverage",
    "short": "Check Range Coverage",
    "pattern": "Difference arrays",
    "difficulty": "Easy",
    "time": "O(ranges + 50)",
    "space": "O(52)",
    "desc": "A prefix sum of interval endpoints gives the number of ranges covering each integer.",
    "input": {
      "ranges": [
        [
          1,
          2
        ],
        [
          3,
          4
        ],
        [
          5,
          6
        ]
      ],
      "left": 2,
      "right": 5
    },
    "examples": [
      {
        "ranges": [
          [
            1,
            2
          ],
          [
            3,
            4
          ],
          [
            5,
            6
          ]
        ],
        "left": 2,
        "right": 5
      },
      {
        "ranges": [
          [
            1,
            10
          ],
          [
            10,
            20
          ]
        ],
        "left": 21,
        "right": 21
      },
      {
        "ranges": [
          [
            1,
            50
          ]
        ],
        "left": 1,
        "right": 50
      }
    ],
    "expected": [
      true,
      false,
      true
    ],
    "focus": "A prefix sum of interval endpoints gives the number of ranges covering each integer.",
    "pitfall": "Uses the problem bound 1 ≤ coordinate ≤ 50; check every integer in the requested range.",
    "code": "class Solution {\n    public boolean isCovered(int[][] ranges, int left, int right) {\n        int[] diff = new int[52];\n        for (int i = 0; i < ranges.length; i++) {\n            diff[ranges[i][0]]++;\n            diff[ranges[i][1] + 1]--;\n        }\n        int active = 0;\n        for (int i = 1; i <= right; i++) {\n            active += diff[i];\n            if (i >= left && active == 0) return false;\n        }\n        return true;\n    }\n}"
  },
  {
    "id": 1943,
    "title": "Describe the Painting",
    "short": "Describe the Painting",
    "pattern": "Difference arrays",
    "difficulty": "Medium",
    "time": "O(n log n)",
    "space": "O(n)",
    "desc": "Sort distinct event coordinates and accumulate active color sums between consecutive boundaries.",
    "input": {
      "segments": [
        [
          1,
          4,
          5
        ],
        [
          4,
          7,
          7
        ],
        [
          1,
          7,
          9
        ]
      ]
    },
    "examples": [
      {
        "segments": [
          [
            1,
            4,
            5
          ],
          [
            4,
            7,
            7
          ],
          [
            1,
            7,
            9
          ]
        ]
      },
      {
        "segments": [
          [
            1,
            4,
            5
          ],
          [
            1,
            4,
            7
          ]
        ]
      },
      {
        "segments": []
      }
    ],
    "expected": [
      [
        [
          1,
          4,
          14
        ],
        [
          4,
          7,
          16
        ]
      ],
      [
        [
          1,
          4,
          12
        ]
      ],
      []
    ],
    "focus": "Sort distinct event coordinates and accumulate active color sums between consecutive boundaries.",
    "pitfall": "Intervals are half-open; preserve event boundaries where the active color set changes.",
    "code": "class Solution {\n    public List<List<Long>> splitPainting(int[][] segments) {\n        Map<Integer, Long> diff = new HashMap<>();\n        int[] points = new int[segments.length * 2];\n        for (int i = 0; i < segments.length; i++) {\n            int left = segments[i][0];\n            int right = segments[i][1];\n            int color = segments[i][2];\n            diff.put(left, diff.getOrDefault(left, 0) + color);\n            diff.put(right, diff.getOrDefault(right, 0) - color);\n            points[2 * i] = left;\n            points[2 * i + 1] = right;\n        }\n        Arrays.sort(points);\n        List<List<Long>> result = new ArrayList<>();\n        long color = 0;\n        for (int i = 0; i < points.length - 1; i++) {\n            int start = points[i];\n            if (i > 0 && start == points[i - 1]) continue;\n            color += diff.get(start);\n            int j = i + 1;\n            while (j < points.length && points[j] == start) {\n                j++;\n            }\n            if (j < points.length && color > 0) {\n                result.add(Arrays.asList((long) start, (long) points[j], color));\n            }\n        }\n        return result;\n    }\n}"
  },
  {
    "id": 2381,
    "title": "Shifting Letters II",
    "short": "Shifting Letters II",
    "pattern": "Difference arrays",
    "difficulty": "Medium",
    "time": "O(n + shifts)",
    "space": "O(n)",
    "desc": "Combine all forward/backward shifts as range deltas before applying one normalized offset per character.",
    "input": {
      "s": "abc",
      "shifts": [
        [
          0,
          1,
          0
        ],
        [
          1,
          2,
          1
        ],
        [
          0,
          2,
          1
        ]
      ]
    },
    "examples": [
      {
        "s": "abc",
        "shifts": [
          [
            0,
            1,
            0
          ],
          [
            1,
            2,
            1
          ],
          [
            0,
            2,
            1
          ]
        ]
      },
      {
        "s": "dztz",
        "shifts": [
          [
            0,
            0,
            0
          ],
          [
            1,
            1,
            1
          ]
        ]
      },
      {
        "s": "a",
        "shifts": [
          [
            0,
            0,
            0
          ]
        ]
      }
    ],
    "expected": [
      "ace",
      "catz",
      "z"
    ],
    "focus": "Combine all forward/backward shifts as range deltas before applying one normalized offset per character.",
    "pitfall": "Normalize negative modulo results and use lowercase a–z input.",
    "code": "class Solution {\n    public String shiftingLetters(String s, int[][] shifts) {\n        int[] diff = new int[s.length() + 1];\n        for (int i = 0; i < shifts.length; i++) {\n            int delta = shifts[i][2] == 1 ? 1 : -1;\n            diff[shifts[i][0]] += delta;\n            diff[shifts[i][1] + 1] -= delta;\n        }\n        char[] chars = s.toCharArray();\n        int shift = 0;\n        for (int i = 0; i < chars.length; i++) {\n            shift += diff[i];\n            int offset = ((chars[i] - 'a' + shift) % 26 + 26) % 26;\n            chars[i] = (char) ('a' + offset);\n        }\n        return new String(chars);\n    }\n}"
  },
  {
    "id": 739,
    "title": "Daily Temperatures",
    "short": "Daily Temperatures",
    "pattern": "Monotonic stack",
    "difficulty": "Medium",
    "time": "O(n)",
    "space": "O(n)",
    "desc": "Store unresolved indices in decreasing temperature order; a warmer day resolves each popped index.",
    "input": {
      "temperatures": [
        73,
        74,
        75,
        71,
        69,
        72,
        76,
        73
      ]
    },
    "examples": [
      {
        "temperatures": [
          73,
          74,
          75,
          71,
          69,
          72,
          76,
          73
        ]
      },
      {
        "temperatures": [
          30,
          40,
          50,
          60
        ]
      },
      {
        "temperatures": []
      }
    ],
    "expected": [
      [
        1,
        1,
        4,
        2,
        1,
        1,
        0,
        0
      ],
      [
        1,
        1,
        1,
        0
      ],
      []
    ],
    "focus": "Store unresolved indices in decreasing temperature order; a warmer day resolves each popped index.",
    "pitfall": "Store indices, not just temperatures, so waiting distances can be computed.",
    "code": "class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        Stack<Integer> stack = new Stack<>();\n        int[] result = new int[temperatures.length];\n        for (int i = 0; i < temperatures.length; i++) {\n            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n                int previous = stack.pop();\n                result[previous] = i - previous;\n            }\n            stack.push(i);\n        }\n        return result;\n    }\n}"
  },
  {
    "id": 496,
    "title": "Next Greater Element I",
    "short": "Next Greater Element I",
    "pattern": "Monotonic stack",
    "difficulty": "Easy",
    "time": "O(n + m)",
    "space": "O(n)",
    "desc": "Precompute next-greater relationships in nums2, then answer nums1 lookups.",
    "input": {
      "nums1": [
        4,
        1,
        2
      ],
      "nums2": [
        1,
        3,
        4,
        2
      ]
    },
    "examples": [
      {
        "nums1": [
          4,
          1,
          2
        ],
        "nums2": [
          1,
          3,
          4,
          2
        ]
      },
      {
        "nums1": [
          2,
          4
        ],
        "nums2": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "nums1": [],
        "nums2": []
      }
    ],
    "expected": [
      [
        -1,
        3,
        -1
      ],
      [
        3,
        -1
      ],
      []
    ],
    "focus": "Precompute next-greater relationships in nums2, then answer nums1 lookups.",
    "pitfall": "This mapping by value assumes the distinct-value constraint.",
    "code": "class Solution {\n    public int[] nextGreaterElement(int[] nums1, int[] nums2) {\n        Stack<Integer> stack = new Stack<>();\n        Map<Integer, Integer> next = new HashMap<>();\n        for (int i = 0; i < nums2.length; i++) {\n            while (!stack.isEmpty() && stack.peek() < nums2[i]) {\n                next.put(stack.pop(), nums2[i]);\n            }\n            stack.push(nums2[i]);\n        }\n        int[] result = new int[nums1.length];\n        for (int i = 0; i < nums1.length; i++) {\n            result[i] = next.getOrDefault(nums1[i], -1);\n        }\n        return result;\n    }\n}"
  },
  {
    "id": 503,
    "title": "Next Greater Element II",
    "short": "Next Greater Element II",
    "pattern": "Monotonic stack",
    "difficulty": "Medium",
    "time": "O(n)",
    "space": "O(n)",
    "desc": "Scan twice to model circular access, but push each original index only once.",
    "input": {
      "nums": [
        1,
        2,
        1
      ]
    },
    "examples": [
      {
        "nums": [
          1,
          2,
          1
        ]
      },
      {
        "nums": [
          3,
          2,
          1
        ]
      },
      {
        "nums": []
      }
    ],
    "expected": [
      [
        2,
        -1,
        2
      ],
      [
        -1,
        3,
        3
      ],
      []
    ],
    "focus": "Scan twice to model circular access, but push each original index only once.",
    "pitfall": "Equal values are not strictly greater.",
    "code": "class Solution {\n    public int[] nextGreaterElements(int[] nums) {\n        int n = nums.length;\n        int[] result = new int[n];\n        Arrays.fill(result, -1);\n        Stack<Integer> stack = new Stack<>();\n        for (int i = 0; i < 2 * n; i++) {\n            int index = i % n;\n            while (!stack.isEmpty() && nums[index] > nums[stack.peek()]) {\n                result[stack.pop()] = nums[index];\n            }\n            if (i < n) stack.push(index);\n        }\n        return result;\n    }\n}"
  },
  {
    "id": 84,
    "title": "Largest Rectangle in Histogram",
    "short": "Largest Rectangle in Histogram",
    "pattern": "Monotonic stack",
    "difficulty": "Hard",
    "time": "O(n)",
    "space": "O(n)",
    "desc": "A shorter bar determines the exclusive right boundary for each popped taller bar.",
    "input": {
      "heights": [
        2,
        1,
        5,
        6,
        2,
        3
      ]
    },
    "examples": [
      {
        "heights": [
          2,
          1,
          5,
          6,
          2,
          3
        ]
      },
      {
        "heights": [
          2,
          4
        ]
      },
      {
        "heights": []
      }
    ],
    "expected": [
      10,
      4,
      0
    ],
    "focus": "A shorter bar determines the exclusive right boundary for each popped taller bar.",
    "pitfall": "Use width = right − left − 1. A zero sentinel flushes unresolved bars.",
    "code": "class Solution {\n    public int largestRectangleArea(int[] heights) {\n        Stack<Integer> stack = new Stack<>();\n        int best = 0;\n        for (int i = 0; i <= heights.length; i++) {\n            int height = i == heights.length ? 0 : heights[i];\n            while (!stack.isEmpty() && heights[stack.peek()] > height) {\n                int top = stack.pop();\n                int left = stack.isEmpty() ? -1 : stack.peek();\n                int area = heights[top] * (i - left - 1);\n                best = Math.max(best, area);\n            }\n            stack.push(i);\n        }\n        return best;\n    }\n}"
  },
  {
    "id": 85,
    "title": "Maximal Rectangle",
    "short": "Maximal Rectangle",
    "pattern": "Monotonic stack",
    "difficulty": "Hard",
    "time": "O(rows · cols)",
    "space": "O(cols)",
    "desc": "Accumulate consecutive-one heights for each row, then solve a histogram rectangle problem.",
    "input": {
      "matrix": [
        [
          "1",
          "0",
          "1",
          "0",
          "0"
        ],
        [
          "1",
          "0",
          "1",
          "1",
          "1"
        ],
        [
          "1",
          "1",
          "1",
          "1",
          "1"
        ],
        [
          "1",
          "0",
          "0",
          "1",
          "0"
        ]
      ]
    },
    "examples": [
      {
        "matrix": [
          [
            "1",
            "0",
            "1",
            "0",
            "0"
          ],
          [
            "1",
            "0",
            "1",
            "1",
            "1"
          ],
          [
            "1",
            "1",
            "1",
            "1",
            "1"
          ],
          [
            "1",
            "0",
            "0",
            "1",
            "0"
          ]
        ]
      },
      {
        "matrix": [
          [
            "0"
          ]
        ]
      },
      {
        "matrix": []
      }
    ],
    "expected": [
      6,
      0,
      0
    ],
    "focus": "Accumulate consecutive-one heights for each row, then solve a histogram rectangle problem.",
    "pitfall": "Use character cells such as \"1\", not numeric 1. Reset heights on every zero.",
    "code": "class Solution {\n    public int maximalRectangle(char[][] matrix) {\n        if (matrix.length == 0) return 0;\n        int[] heights = new int[matrix[0].length];\n        int best = 0;\n        for (int row = 0; row < matrix.length; row++) {\n            for (int col = 0; col < heights.length; col++) {\n                heights[col] = matrix[row][col] == '1' ? heights[col] + 1 : 0;\n            }\n            best = Math.max(best, rectangle(heights));\n        }\n        return best;\n    }\n    private int rectangle(int[] heights) {\n        Stack<Integer> stack = new Stack<>();\n        int best = 0;\n        for (int i = 0; i <= heights.length; i++) {\n            int height = i == heights.length ? 0 : heights[i];\n            while (!stack.isEmpty() && heights[stack.peek()] > height) {\n                int top = stack.pop();\n                int left = stack.isEmpty() ? -1 : stack.peek();\n                best = Math.max(best, heights[top] * (i - left - 1));\n            }\n            stack.push(i);\n        }\n        return best;\n    }\n}"
  },
  {
    "id": 901,
    "title": "Online Stock Span",
    "short": "Online Stock Span",
    "pattern": "Monotonic stack",
    "difficulty": "Medium",
    "time": "O(n)",
    "space": "O(n)",
    "desc": "Keep indices of strictly greater previous prices; the nearest one limits the current span.",
    "input": {
      "prices": [
        100,
        80,
        60,
        70,
        60,
        75,
        85
      ]
    },
    "examples": [
      {
        "prices": [
          100,
          80,
          60,
          70,
          60,
          75,
          85
        ]
      },
      {
        "prices": [
          10,
          10,
          10
        ]
      },
      {
        "prices": []
      }
    ],
    "expected": [
      [
        1,
        1,
        1,
        2,
        1,
        4,
        6
      ],
      [
        1,
        2,
        3
      ],
      []
    ],
    "focus": "Keep indices of strictly greater previous prices; the nearest one limits the current span.",
    "pitfall": "This driver models repeated StockSpanner.next calls. Equal prices belong inside the span.",
    "code": "class Solution {\n    public int[] stockSpans(int[] prices) {\n        Stack<Integer> stack = new Stack<>();\n        int[] result = new int[prices.length];\n        for (int i = 0; i < prices.length; i++) {\n            while (!stack.isEmpty() && prices[stack.peek()] <= prices[i]) {\n                stack.pop();\n            }\n            result[i] = stack.isEmpty() ? i + 1 : i - stack.peek();\n            stack.push(i);\n        }\n        return result;\n    }\n}"
  },
  {
    "id": 239,
    "title": "Sliding Window Maximum",
    "short": "Sliding Window Maximum",
    "pattern": "Monotonic deque",
    "difficulty": "Hard",
    "time": "O(n)",
    "space": "O(k)",
    "desc": "Keep useful indices in decreasing value order; expire indices outside the current window.",
    "input": {
      "nums": [
        1,
        3,
        -1,
        -3,
        5,
        3,
        6,
        7
      ],
      "k": 3
    },
    "examples": [
      {
        "nums": [
          1,
          3,
          -1,
          -3,
          5,
          3,
          6,
          7
        ],
        "k": 3
      },
      {
        "nums": [
          1
        ],
        "k": 1
      },
      {
        "nums": [
          4,
          2,
          3
        ],
        "k": 2
      }
    ],
    "expected": [
      [
        3,
        3,
        5,
        5,
        6,
        7
      ],
      [
        1
      ],
      [
        4,
        3
      ]
    ],
    "focus": "Keep useful indices in decreasing value order; expire indices outside the current window.",
    "pitfall": "Assumes 1 ≤ k ≤ n. Remove stale indices before reading the maximum.",
    "code": "class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        Deque<Integer> deque = new ArrayDeque<>();\n        int[] result = new int[nums.length - k + 1];\n        for (int i = 0; i < nums.length; i++) {\n            while (!deque.isEmpty() && deque.peekFirst() <= i - k) {\n                deque.pollFirst();\n            }\n            while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {\n                deque.pollLast();\n            }\n            deque.addLast(i);\n            if (i >= k - 1) result[i - k + 1] = nums[deque.peekFirst()];\n        }\n        return result;\n    }\n}"
  },
  {
    "id": 215,
    "title": "Kth Largest Element",
    "short": "Kth Largest Element",
    "pattern": "Heap / top K",
    "difficulty": "Medium",
    "time": "O(n log k)",
    "space": "O(k)",
    "desc": "A min-heap of size k retains the k largest values; its root is the kth largest.",
    "input": {
      "nums": [
        3,
        2,
        1,
        5,
        6,
        4
      ],
      "k": 2
    },
    "examples": [
      {
        "nums": [
          3,
          2,
          1,
          5,
          6,
          4
        ],
        "k": 2
      },
      {
        "nums": [
          3,
          2,
          3,
          1,
          2,
          4,
          5,
          5,
          6
        ],
        "k": 4
      },
      {
        "nums": [
          7
        ],
        "k": 1
      }
    ],
    "expected": [
      5,
      4,
      7
    ],
    "focus": "A min-heap of size k retains the k largest values; its root is the kth largest.",
    "pitfall": "Duplicates count as separate elements. The heap inspector shows the actual heap array.",
    "code": "class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        PriorityQueue<Integer> heap = new PriorityQueue<>();\n        for (int i = 0; i < nums.length; i++) {\n            heap.offer(nums[i]);\n            if (heap.size() > k) heap.poll();\n        }\n        return heap.peek();\n    }\n}"
  },
  {
    "id": 56,
    "title": "Merge Intervals",
    "short": "Merge Intervals",
    "pattern": "Intervals",
    "difficulty": "Medium",
    "time": "O(n²) with insertion sort",
    "space": "O(n)",
    "desc": "Once intervals are ordered by start, only the last merged interval can overlap the next.",
    "input": {
      "intervals": [
        [
          1,
          3
        ],
        [
          2,
          6
        ],
        [
          8,
          10
        ],
        [
          15,
          18
        ]
      ]
    },
    "examples": [
      {
        "intervals": [
          [
            1,
            3
          ],
          [
            2,
            6
          ],
          [
            8,
            10
          ],
          [
            15,
            18
          ]
        ]
      },
      {
        "intervals": [
          [
            4,
            5
          ],
          [
            1,
            4
          ]
        ]
      },
      {
        "intervals": []
      }
    ],
    "expected": [
      [
        [
          1,
          6
        ],
        [
          8,
          10
        ],
        [
          15,
          18
        ]
      ],
      [
        [
          1,
          5
        ]
      ],
      []
    ],
    "focus": "Once intervals are ordered by start, only the last merged interval can overlap the next.",
    "pitfall": "Uses visible insertion sort for small teaching inputs; production comparator sorting gives O(n log n).",
    "code": "class Solution {\n    public List<int[]> merge(int[][] intervals) {\n        for (int i = 1; i < intervals.length; i++) {\n            int[] current = intervals[i];\n            int j = i - 1;\n            while (j >= 0 && intervals[j][0] > current[0]) {\n                intervals[j + 1] = intervals[j];\n                j--;\n            }\n            intervals[j + 1] = current;\n        }\n        List<int[]> result = new ArrayList<>();\n        for (int i = 0; i < intervals.length; i++) {\n            if (result.isEmpty() || result.get(result.size() - 1)[1] < intervals[i][0]) {\n                result.add(new int[]{intervals[i][0], intervals[i][1]});\n            } else {\n                int[] last = result.get(result.size() - 1);\n                last[1] = Math.max(last[1], intervals[i][1]);\n            }\n        }\n        return result;\n    }\n}"
  },
  {
    "id": 55,
    "title": "Jump Game",
    "short": "Jump Game",
    "pattern": "Greedy",
    "difficulty": "Medium",
    "time": "O(n)",
    "space": "O(1)",
    "desc": "Every reachable position may extend the farthest reachable boundary.",
    "input": {
      "nums": [
        2,
        3,
        1,
        1,
        4
      ]
    },
    "examples": [
      {
        "nums": [
          2,
          3,
          1,
          1,
          4
        ]
      },
      {
        "nums": [
          3,
          2,
          1,
          0,
          4
        ]
      },
      {
        "nums": [
          0
        ]
      }
    ],
    "expected": [
      true,
      false,
      true
    ],
    "focus": "Every reachable position may extend the farthest reachable boundary.",
    "pitfall": "Reject an unreachable current index before using its jump length.",
    "code": "class Solution {\n    public boolean canJump(int[] nums) {\n        int farthest = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (i > farthest) return false;\n            farthest = Math.max(farthest, i + nums[i]);\n            if (farthest >= nums.length - 1) return true;\n        }\n        return false;\n    }\n}"
  },
  {
    "id": 21,
    "title": "Merge Two Sorted Lists",
    "short": "Merge Two Sorted Lists",
    "pattern": "Linked list",
    "difficulty": "Easy",
    "time": "O(a + b)",
    "space": "O(1)",
    "desc": "Attach the smaller current node to tail and advance only the list that supplied it.",
    "input": {
      "list1": [
        1,
        2,
        4
      ],
      "list2": [
        1,
        3,
        4
      ]
    },
    "examples": [
      {
        "list1": [
          1,
          2,
          4
        ],
        "list2": [
          1,
          3,
          4
        ]
      },
      {
        "list1": [],
        "list2": []
      },
      {
        "list1": [],
        "list2": [
          0
        ]
      }
    ],
    "expected": [
      [
        1,
        1,
        2,
        3,
        4,
        4
      ],
      null,
      [
        0
      ]
    ],
    "focus": "Attach the smaller current node to tail and advance only the list that supplied it.",
    "pitfall": "Save the dummy reference; returning tail would lose the merged prefix.",
    "code": "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(0);\n        ListNode tail = dummy;\n        while (list1 != null && list2 != null) {\n            if (list1.val <= list2.val) {\n                tail.next = list1;\n                list1 = list1.next;\n            } else {\n                tail.next = list2;\n                list2 = list2.next;\n            }\n            tail = tail.next;\n        }\n        tail.next = list1 == null ? list2 : list1;\n        return dummy.next;\n    }\n}"
  },
  {
    "id": 104,
    "title": "Maximum Depth of Binary Tree",
    "short": "Maximum Depth of Binary Tree",
    "pattern": "Tree DFS",
    "difficulty": "Easy",
    "time": "O(n)",
    "space": "O(height)",
    "desc": "Each call returns one plus the larger child depth. The call stack follows the DFS path.",
    "input": {
      "root": [
        3,
        9,
        20,
        null,
        null,
        15,
        7
      ]
    },
    "examples": [
      {
        "root": [
          3,
          9,
          20,
          null,
          null,
          15,
          7
        ]
      },
      {
        "root": [
          1,
          null,
          2
        ]
      },
      {
        "root": []
      }
    ],
    "expected": [
      3,
      2,
      0
    ],
    "focus": "Each call returns one plus the larger child depth. The call stack follows the DFS path.",
    "pitfall": "Null has depth zero. Very deep trees can hit this sandbox’s 32-frame bound.",
    "code": "class Solution {\n    public int maxDepth(TreeNode root) {\n        if (root == null) return 0;\n        int leftDepth = maxDepth(root.left);\n        int rightDepth = maxDepth(root.right);\n        return 1 + Math.max(leftDepth, rightDepth);\n    }\n}",
    "inputHint": "Tree inputs use level-order arrays; null marks a missing child."
  },
  {
    "id": 102,
    "title": "Binary Tree Level Order",
    "short": "Binary Tree Level Order",
    "pattern": "Tree BFS",
    "difficulty": "Medium",
    "time": "O(n)",
    "space": "O(width)",
    "desc": "Freeze the current queue size to process exactly one level before starting the next.",
    "input": {
      "root": [
        3,
        9,
        20,
        null,
        null,
        15,
        7
      ]
    },
    "examples": [
      {
        "root": [
          3,
          9,
          20,
          null,
          null,
          15,
          7
        ]
      },
      {
        "root": [
          1
        ]
      },
      {
        "root": []
      }
    ],
    "expected": [
      [
        [
          3
        ],
        [
          9,
          20
        ],
        [
          15,
          7
        ]
      ],
      [
        [
          1
        ]
      ],
      []
    ],
    "focus": "Freeze the current queue size to process exactly one level before starting the next.",
    "pitfall": "Newly enqueued children belong to the next level.",
    "code": "class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        List<List<Integer>> result = new ArrayList<>();\n        if (root == null) return result;\n        Queue<TreeNode> queue = new ArrayDeque<>();\n        queue.offer(root);\n        while (!queue.isEmpty()) {\n            int size = queue.size();\n            List<Integer> level = new ArrayList<>();\n            for (int i = 0; i < size; i++) {\n                TreeNode current = queue.poll();\n                level.add(current.val);\n                if (current.left != null) queue.offer(current.left);\n                if (current.right != null) queue.offer(current.right);\n            }\n            result.add(level);\n        }\n        return result;\n    }\n}"
  },
  {
    "id": 700,
    "title": "Search in a Binary Search Tree",
    "short": "Search in a Binary Search Tree",
    "pattern": "BST",
    "difficulty": "Easy",
    "time": "O(height)",
    "space": "O(1)",
    "desc": "The BST ordering identifies which single child can contain the requested value.",
    "input": {
      "root": [
        4,
        2,
        7,
        1,
        3
      ],
      "val": 2
    },
    "examples": [
      {
        "root": [
          4,
          2,
          7,
          1,
          3
        ],
        "val": 2
      },
      {
        "root": [
          4,
          2,
          7,
          1,
          3
        ],
        "val": 5
      },
      {
        "root": [],
        "val": 1
      }
    ],
    "expected": [
      [
        2,
        1,
        3
      ],
      null,
      null
    ],
    "focus": "The BST ordering identifies which single child can contain the requested value.",
    "pitfall": "The result is a subtree reference, serialized as a level-order array.",
    "code": "class Solution {\n    public TreeNode searchBST(TreeNode root, int val) {\n        TreeNode current = root;\n        while (current != null) {\n            if (current.val == val) return current;\n            current = val < current.val ? current.left : current.right;\n        }\n        return null;\n    }\n}"
  },
  {
    "id": 78,
    "title": "Subsets",
    "short": "Subsets",
    "pattern": "Backtracking",
    "difficulty": "Medium",
    "time": "O(n · 2ⁿ)",
    "space": "O(n) + output",
    "desc": "Every call records one subset; increasing start avoids reusing earlier positions.",
    "input": {
      "nums": [
        1,
        2
      ]
    },
    "examples": [
      {
        "nums": [
          1,
          2
        ]
      },
      {
        "nums": [
          0
        ]
      },
      {
        "nums": []
      }
    ],
    "expected": [
      [
        [],
        [
          1
        ],
        [
          1,
          2
        ],
        [
          2
        ]
      ],
      [
        [],
        [
          0
        ]
      ],
      [
        []
      ]
    ],
    "focus": "Every call records one subset; increasing start avoids reusing earlier positions.",
    "pitfall": "Copy the path before storing it and undo each choice after the recursive call.",
    "code": "class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        List<Integer> path = new ArrayList<>();\n        explore(nums, 0, path, result);\n        return result;\n    }\n    private void explore(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {\n        List<Integer> copy = new ArrayList<>();\n        for (int j = 0; j < path.size(); j++) {\n            copy.add(path.get(j));\n        }\n        result.add(copy);\n        for (int i = start; i < nums.length; i++) {\n            path.add(nums[i]);\n            explore(nums, i + 1, path, result);\n            path.remove(path.size() - 1);\n        }\n    }\n}"
  },
  {
    "id": 79,
    "title": "Word Search",
    "short": "Word Search",
    "pattern": "Constrained backtracking",
    "difficulty": "Medium",
    "time": "O(rows · cols · 4ᴸ)",
    "space": "O(L)",
    "desc": "Reject mismatches early, temporarily mark a cell, and explore its four neighbors.",
    "input": {
      "board": [
        [
          "A",
          "B",
          "C",
          "E"
        ],
        [
          "S",
          "F",
          "C",
          "S"
        ],
        [
          "A",
          "D",
          "E",
          "E"
        ]
      ],
      "word": "ABCCED"
    },
    "examples": [
      {
        "board": [
          [
            "A",
            "B",
            "C",
            "E"
          ],
          [
            "S",
            "F",
            "C",
            "S"
          ],
          [
            "A",
            "D",
            "E",
            "E"
          ]
        ],
        "word": "ABCCED"
      },
      {
        "board": [
          [
            "A",
            "B",
            "C",
            "E"
          ],
          [
            "S",
            "F",
            "C",
            "S"
          ],
          [
            "A",
            "D",
            "E",
            "E"
          ]
        ],
        "word": "ABCB"
      },
      {
        "board": [
          [
            "a"
          ]
        ],
        "word": "a"
      }
    ],
    "expected": [
      true,
      false,
      true
    ],
    "focus": "Reject mismatches early, temporarily mark a cell, and explore its four neighbors.",
    "pitfall": "A cell may be used only once per path. Restore it on every returning path.",
    "code": "class Solution {\n    public boolean exist(char[][] board, String word) {\n        for (int row = 0; row < board.length; row++) {\n            for (int col = 0; col < board[row].length; col++) {\n                if (visit(board, word, row, col, 0)) return true;\n            }\n        }\n        return false;\n    }\n    private boolean visit(char[][] board, String word, int row, int col, int index) {\n        if (index == word.length()) return true;\n        if (row < 0 || row >= board.length || col < 0 || col >= board[row].length) return false;\n        if (board[row][col] != word.charAt(index)) return false;\n        char saved = board[row][col];\n        board[row][col] = '#';\n        boolean found = visit(board, word, row + 1, col, index + 1)\n            || visit(board, word, row - 1, col, index + 1)\n            || visit(board, word, row, col + 1, index + 1)\n            || visit(board, word, row, col - 1, index + 1);\n        board[row][col] = saved;\n        return found;\n    }\n}"
  },
  {
    "id": 200,
    "title": "Number of Islands",
    "short": "Number of Islands",
    "pattern": "Graph BFS / DFS",
    "difficulty": "Medium",
    "time": "O(rows · cols)",
    "space": "O(rows · cols)",
    "desc": "Each first unseen land cell starts one component; DFS marks its entire island visited.",
    "input": {
      "grid": [
        [
          "1",
          "1",
          "0",
          "0",
          "0"
        ],
        [
          "1",
          "1",
          "0",
          "0",
          "0"
        ],
        [
          "0",
          "0",
          "1",
          "0",
          "0"
        ],
        [
          "0",
          "0",
          "0",
          "1",
          "1"
        ]
      ]
    },
    "examples": [
      {
        "grid": [
          [
            "1",
            "1",
            "0",
            "0",
            "0"
          ],
          [
            "1",
            "1",
            "0",
            "0",
            "0"
          ],
          [
            "0",
            "0",
            "1",
            "0",
            "0"
          ],
          [
            "0",
            "0",
            "0",
            "1",
            "1"
          ]
        ]
      },
      {
        "grid": [
          [
            "0"
          ]
        ]
      },
      {
        "grid": []
      }
    ],
    "expected": [
      3,
      0,
      0
    ],
    "focus": "Each first unseen land cell starts one component; DFS marks its entire island visited.",
    "pitfall": "This solution marks the input in place. Use small grids within recursion limits.",
    "code": "class Solution {\n    public int numIslands(char[][] grid) {\n        int islands = 0;\n        for (int row = 0; row < grid.length; row++) {\n            for (int col = 0; col < grid[row].length; col++) {\n                if (grid[row][col] == '1') {\n                    islands++;\n                    flood(grid, row, col);\n                }\n            }\n        }\n        return islands;\n    }\n    private void flood(char[][] grid, int row, int col) {\n        if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) return;\n        if (grid[row][col] != '1') return;\n        grid[row][col] = '0';\n        flood(grid, row + 1, col);\n        flood(grid, row - 1, col);\n        flood(grid, row, col + 1);\n        flood(grid, row, col - 1);\n    }\n}"
  },
  {
    "id": 207,
    "title": "Course Schedule",
    "short": "Course Schedule",
    "pattern": "Topological sort",
    "difficulty": "Medium",
    "time": "O(V + E)",
    "space": "O(V + E)",
    "desc": "Process zero-indegree vertices and remove their outgoing edges; a remaining cycle prevents completion.",
    "input": {
      "numCourses": 2,
      "prerequisites": [
        [
          1,
          0
        ]
      ]
    },
    "examples": [
      {
        "numCourses": 2,
        "prerequisites": [
          [
            1,
            0
          ]
        ]
      },
      {
        "numCourses": 2,
        "prerequisites": [
          [
            1,
            0
          ],
          [
            0,
            1
          ]
        ]
      },
      {
        "numCourses": 3,
        "prerequisites": []
      }
    ],
    "expected": [
      true,
      false,
      true
    ],
    "focus": "Process zero-indegree vertices and remove their outgoing edges; a remaining cycle prevents completion.",
    "pitfall": "For [course, prerequisite], the edge points from prerequisite to course.",
    "code": "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        List<List<Integer>> edges = new ArrayList<>();\n        int[] indegree = new int[numCourses];\n        for (int i = 0; i < numCourses; i++) {\n            edges.add(new ArrayList<>());\n        }\n        for (int i = 0; i < prerequisites.length; i++) {\n            int course = prerequisites[i][0];\n            int before = prerequisites[i][1];\n            edges.get(before).add(course);\n            indegree[course]++;\n        }\n        Queue<Integer> queue = new ArrayDeque<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (indegree[i] == 0) queue.offer(i);\n        }\n        int finished = 0;\n        while (!queue.isEmpty()) {\n            int current = queue.poll();\n            finished++;\n            List<Integer> next = edges.get(current);\n            for (int i = 0; i < next.size(); i++) {\n                int course = next.get(i);\n                indegree[course]--;\n                if (indegree[course] == 0) queue.offer(course);\n            }\n        }\n        return finished == numCourses;\n    }\n}"
  },
  {
    "id": 547,
    "title": "Number of Provinces",
    "short": "Number of Provinces",
    "pattern": "Union find",
    "difficulty": "Medium",
    "time": "O(n² · find)",
    "space": "O(n)",
    "desc": "Each union of two distinct roots reduces the component count by one.",
    "input": {
      "isConnected": [
        [
          1,
          1,
          0
        ],
        [
          1,
          1,
          0
        ],
        [
          0,
          0,
          1
        ]
      ]
    },
    "examples": [
      {
        "isConnected": [
          [
            1,
            1,
            0
          ],
          [
            1,
            1,
            0
          ],
          [
            0,
            0,
            1
          ]
        ]
      },
      {
        "isConnected": [
          [
            1,
            0,
            0
          ],
          [
            0,
            1,
            0
          ],
          [
            0,
            0,
            1
          ]
        ]
      },
      {
        "isConnected": [
          [
            1
          ]
        ]
      }
    ],
    "expected": [
      2,
      3,
      1
    ],
    "focus": "Each union of two distinct roots reduces the component count by one.",
    "pitfall": "Only decrement for a new union. Path halving rewires parents during find.",
    "code": "class Solution {\n    public int findCircleNum(int[][] isConnected) {\n        int n = isConnected.length;\n        int[] parent = new int[n];\n        for (int i = 0; i < n; i++) {\n            parent[i] = i;\n        }\n        int components = n;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                if (isConnected[i][j] == 1) {\n                    int a = find(parent, i);\n                    int b = find(parent, j);\n                    if (a != b) {\n                        parent[a] = b;\n                        components--;\n                    }\n                }\n            }\n        }\n        return components;\n    }\n    private int find(int[] parent, int x) {\n        while (parent[x] != x) {\n            parent[x] = parent[parent[x]];\n            x = parent[x];\n        }\n        return x;\n    }\n}"
  },
  {
    "id": 743,
    "title": "Network Delay Time",
    "short": "Network Delay Time",
    "pattern": "Shortest path",
    "difficulty": "Medium",
    "time": "O(V² + E)",
    "space": "O(V²)",
    "desc": "Dense Dijkstra finalizes the nearest unvisited vertex, then relaxes every outgoing edge.",
    "input": {
      "times": [
        [
          2,
          1,
          1
        ],
        [
          2,
          3,
          1
        ],
        [
          3,
          4,
          1
        ]
      ],
      "n": 4,
      "k": 2
    },
    "examples": [
      {
        "times": [
          [
            2,
            1,
            1
          ],
          [
            2,
            3,
            1
          ],
          [
            3,
            4,
            1
          ]
        ],
        "n": 4,
        "k": 2
      },
      {
        "times": [
          [
            1,
            2,
            1
          ]
        ],
        "n": 2,
        "k": 2
      },
      {
        "times": [],
        "n": 1,
        "k": 1
      }
    ],
    "expected": [
      2,
      -1,
      0
    ],
    "focus": "Dense Dijkstra finalizes the nearest unvisited vertex, then relaxes every outgoing edge.",
    "pitfall": "Requires nonnegative weights. This small-input version uses a matrix and a finite sentinel.",
    "code": "class Solution {\n    public int networkDelayTime(int[][] times, int n, int k) {\n        int inf = 1000000;\n        int[][] graph = new int[n][n];\n        for (int i = 0; i < n; i++) {\n            Arrays.fill(graph[i], inf);\n        }\n        for (int i = 0; i < times.length; i++) {\n            graph[times[i][0] - 1][times[i][1] - 1] = times[i][2];\n        }\n        int[] dist = new int[n];\n        Arrays.fill(dist, inf);\n        dist[k - 1] = 0;\n        boolean[] used = new boolean[n];\n        for (int iteration = 0; iteration < n; iteration++) {\n            int current = -1;\n            for (int i = 0; i < n; i++) {\n                if (!used[i] && (current == -1 || dist[i] < dist[current])) current = i;\n            }\n            if (current == -1 || dist[current] == inf) return -1;\n            used[current] = true;\n            for (int i = 0; i < n; i++) {\n                dist[i] = Math.min(dist[i], dist[current] + graph[current][i]);\n            }\n        }\n        int answer = 0;\n        for (int i = 0; i < n; i++) {\n            answer = Math.max(answer, dist[i]);\n        }\n        return answer;\n    }\n}"
  },
  {
    "id": 1584,
    "title": "Minimum Cost to Connect All Points",
    "short": "Minimum Cost to Connect All Points",
    "pattern": "Minimum spanning tree",
    "difficulty": "Medium",
    "time": "O(n²)",
    "space": "O(n)",
    "desc": "Prim’s algorithm adds the cheapest edge crossing from the current tree to an unused point.",
    "input": {
      "points": [
        [
          0,
          0
        ],
        [
          2,
          2
        ],
        [
          3,
          10
        ],
        [
          5,
          2
        ],
        [
          7,
          0
        ]
      ]
    },
    "examples": [
      {
        "points": [
          [
            0,
            0
          ],
          [
            2,
            2
          ],
          [
            3,
            10
          ],
          [
            5,
            2
          ],
          [
            7,
            0
          ]
        ]
      },
      {
        "points": [
          [
            3,
            12
          ],
          [
            -2,
            5
          ],
          [
            -4,
            1
          ]
        ]
      },
      {
        "points": [
          [
            0,
            0
          ]
        ]
      }
    ],
    "expected": [
      20,
      18,
      0
    ],
    "focus": "Prim’s algorithm adds the cheapest edge crossing from the current tree to an unused point.",
    "pitfall": "distance measures the cheapest connection to the tree, not distance from the start.",
    "code": "class Solution {\n    public int minCostConnectPoints(int[][] points) {\n        int n = points.length;\n        if (n == 0) return 0;\n        int[] distance = new int[n];\n        Arrays.fill(distance, Integer.MAX_VALUE);\n        distance[0] = 0;\n        boolean[] used = new boolean[n];\n        int cost = 0;\n        for (int iteration = 0; iteration < n; iteration++) {\n            int current = -1;\n            for (int i = 0; i < n; i++) {\n                if (!used[i] && (current == -1 || distance[i] < distance[current])) current = i;\n            }\n            used[current] = true;\n            cost += distance[current];\n            for (int i = 0; i < n; i++) {\n                int weight = Math.abs(points[current][0] - points[i][0]) + Math.abs(points[current][1] - points[i][1]);\n                if (!used[i]) distance[i] = Math.min(distance[i], weight);\n            }\n        }\n        return cost;\n    }\n}"
  },
  {
    "id": 208,
    "title": "Implement Trie — Operation Driver",
    "short": "Implement Trie — Operation Driver",
    "pattern": "Trie",
    "difficulty": "Medium",
    "time": "O(total characters)",
    "space": "O(total characters · alphabet)",
    "desc": "Each node represents a prefix, with a terminal marker distinguishing a stored word from a prefix.",
    "input": {
      "ops": [
        "insert",
        "search",
        "search",
        "startsWith",
        "insert",
        "search"
      ],
      "words": [
        "apple",
        "apple",
        "app",
        "app",
        "app",
        "app"
      ]
    },
    "examples": [
      {
        "ops": [
          "insert",
          "search",
          "search",
          "startsWith",
          "insert",
          "search"
        ],
        "words": [
          "apple",
          "apple",
          "app",
          "app",
          "app",
          "app"
        ]
      },
      {
        "ops": [
          "search"
        ],
        "words": [
          "a"
        ]
      },
      {
        "ops": [
          "insert",
          "startsWith"
        ],
        "words": [
          "a",
          "a"
        ]
      }
    ],
    "expected": [
      [
        true,
        true,
        false,
        true,
        true,
        true
      ],
      [
        false
      ],
      [
        true,
        true
      ]
    ],
    "focus": "Each node represents a prefix, with a terminal marker distinguishing a stored word from a prefix.",
    "pitfall": "This driver accepts insert/search/startsWith over lowercase words. Insert outputs true as a driver acknowledgement.",
    "code": "class Solution {\n    public boolean[] trieQueries(String[] ops, String[] words) {\n        TrieNode root = new TrieNode();\n        boolean[] result = new boolean[ops.length];\n        for (int i = 0; i < ops.length; i++) {\n            TrieNode current = root;\n            boolean insert = ops[i].equals(\"insert\");\n            boolean found = true;\n            for (int j = 0; j < words[i].length(); j++) {\n                int index = words[i].charAt(j) - 'a';\n                if (current.children[index] == null) {\n                    if (insert) {\n                        current.children[index] = new TrieNode();\n                    } else {\n                        found = false;\n                        break;\n                    }\n                }\n                current = current.children[index];\n            }\n            if (insert) {\n                current.end = true;\n                result[i] = true;\n            } else {\n                result[i] = found && (ops[i].equals(\"startsWith\") || current.end);\n            }\n        }\n        return result;\n    }\n}",
    "inputHint": "TrieNode is a built-in teaching node with children[26] and end. Supply equally sized ops and words arrays."
  },
  {
    "id": 136,
    "title": "Single Number",
    "short": "Single Number",
    "pattern": "Bit manipulation",
    "difficulty": "Easy",
    "time": "O(n)",
    "space": "O(1)",
    "desc": "XOR cancels equal pairs because x XOR x = 0 and x XOR 0 = x.",
    "input": {
      "nums": [
        2,
        2,
        1
      ]
    },
    "examples": [
      {
        "nums": [
          2,
          2,
          1
        ]
      },
      {
        "nums": [
          4,
          1,
          2,
          1,
          2
        ]
      },
      {
        "nums": [
          -1,
          -1,
          3
        ]
      }
    ],
    "expected": [
      1,
      4,
      3
    ],
    "focus": "XOR cancels equal pairs because x XOR x = 0 and x XOR 0 = x.",
    "pitfall": "Requires exactly one single value and every other value appearing twice.",
    "code": "class Solution {\n    public int singleNumber(int[] nums) {\n        int answer = 0;\n        for (int i = 0; i < nums.length; i++) {\n            answer = answer ^ nums[i];\n        }\n        return answer;\n    }\n}"
  },
  {
    "id": 70,
    "title": "Climbing Stairs",
    "short": "Climbing Stairs",
    "pattern": "1D DP",
    "difficulty": "Easy",
    "time": "O(n)",
    "space": "O(1)",
    "desc": "The final move is one step or two steps, so ways(n) = ways(n−1) + ways(n−2).",
    "input": {
      "n": 2
    },
    "examples": [
      {
        "n": 2
      },
      {
        "n": 3
      },
      {
        "n": 5
      }
    ],
    "expected": [
      2,
      3,
      8
    ],
    "focus": "The final move is one step or two steps, so ways(n) = ways(n−1) + ways(n−2).",
    "pitfall": "The two running values must be advanced in the correct order.",
    "code": "class Solution {\n    public int climbStairs(int n) {\n        int previous = 1;\n        int current = 1;\n        for (int step = 2; step <= n; step++) {\n            int next = previous + current;\n            previous = current;\n            current = next;\n        }\n        return current;\n    }\n}"
  },
  {
    "id": 416,
    "title": "Partition Equal Subset Sum",
    "short": "Partition Equal Subset Sum",
    "pattern": "Knapsack DP",
    "difficulty": "Medium",
    "time": "O(n · target)",
    "space": "O(target)",
    "desc": "A partition exists exactly when some subset reaches half the total.",
    "input": {
      "nums": [
        1,
        5,
        11,
        5
      ]
    },
    "examples": [
      {
        "nums": [
          1,
          5,
          11,
          5
        ]
      },
      {
        "nums": [
          1,
          2,
          3,
          5
        ]
      },
      {
        "nums": [
          2,
          2
        ]
      }
    ],
    "expected": [
      true,
      false,
      true
    ],
    "focus": "A partition exists exactly when some subset reaches half the total.",
    "pitfall": "Iterate capacity downward so each item is used once. Keep the sample target within array limits.",
    "code": "class Solution {\n    public boolean canPartition(int[] nums) {\n        int sum = 0;\n        for (int i = 0; i < nums.length; i++) {\n            sum += nums[i];\n        }\n        if (sum % 2 != 0) return false;\n        int target = sum / 2;\n        boolean[] dp = new boolean[target + 1];\n        dp[0] = true;\n        for (int i = 0; i < nums.length; i++) {\n            for (int capacity = target; capacity >= nums[i]; capacity--) {\n                dp[capacity] = dp[capacity] || dp[capacity - nums[i]];\n            }\n        }\n        return dp[target];\n    }\n}"
  },
  {
    "id": 62,
    "title": "Unique Paths",
    "short": "Unique Paths",
    "pattern": "Grid DP",
    "difficulty": "Medium",
    "time": "O(mn)",
    "space": "O(mn)",
    "desc": "Each cell receives paths from above and left; boundary cells have exactly one path.",
    "input": {
      "m": 3,
      "n": 7
    },
    "examples": [
      {
        "m": 3,
        "n": 7
      },
      {
        "m": 3,
        "n": 2
      },
      {
        "m": 1,
        "n": 1
      }
    ],
    "expected": [
      28,
      3,
      1
    ],
    "focus": "Each cell receives paths from above and left; boundary cells have exactly one path.",
    "pitfall": "Assumes positive dimensions and right/down movement only.",
    "code": "class Solution {\n    public int uniquePaths(int m, int n) {\n        int[][] dp = new int[m][n];\n        for (int row = 0; row < m; row++) {\n            for (int col = 0; col < n; col++) {\n                if (row == 0 || col == 0) {\n                    dp[row][col] = 1;\n                } else {\n                    dp[row][col] = dp[row - 1][col] + dp[row][col - 1];\n                }\n            }\n        }\n        return dp[m - 1][n - 1];\n    }\n}"
  },
  {
    "id": 1143,
    "title": "Longest Common Subsequence",
    "short": "Longest Common Subsequence",
    "pattern": "String DP",
    "difficulty": "Medium",
    "time": "O(mn)",
    "space": "O(mn)",
    "desc": "dp[i][j] is the LCS length of the first i and j characters; a match extends the diagonal.",
    "input": {
      "text1": "abcde",
      "text2": "ace"
    },
    "examples": [
      {
        "text1": "abcde",
        "text2": "ace"
      },
      {
        "text1": "abc",
        "text2": "def"
      },
      {
        "text1": "",
        "text2": "a"
      }
    ],
    "expected": [
      3,
      0,
      0
    ],
    "focus": "dp[i][j] is the LCS length of the first i and j characters; a match extends the diagonal.",
    "pitfall": "Subsequences can skip characters; substrings cannot. Keep the zero-length prefix row and column.",
    "code": "class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        int[][] dp = new int[text1.length() + 1][text2.length() + 1];\n        for (int i = 1; i <= text1.length(); i++) {\n            for (int j = 1; j <= text2.length(); j++) {\n                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {\n                    dp[i][j] = dp[i - 1][j - 1] + 1;\n                } else {\n                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n        return dp[text1.length()][text2.length()];\n    }\n}"
  }
];
