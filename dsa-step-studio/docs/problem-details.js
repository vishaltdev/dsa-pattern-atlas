// Problem contracts and executable comparisons. Numerical bounds are sourced per problem.
export const details = {
  "1": {
    "statement": "Return the zero-based indices of two different positions whose values sum to target. Exactly one valid pair exists; do not reuse the same element.",
    "brute": {
      "name": "Check every pair",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "Try every pair of distinct indices.",
      "code": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                if (nums[i] + nums[j] == target) return new int[]{i, j};\n            }\n        }\n        return new int[]{-1, -1};\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A hash map remembers previous values, replacing each inner scan with an expected constant-time complement lookup.",
    "note": "",
    "source": "https://leetcode.com/problems/two-sum/",
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "3": {
    "statement": "Given a string s, return the length of its longest contiguous substring whose characters are all distinct. Return 0 for an empty string.",
    "brute": {
      "name": "Restart at every left boundary",
      "time": "O(n²)",
      "space": "O(alphabet)",
      "idea": "For each start, extend a fresh set until the first repeated character.",
      "code": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        int best = 0;\n        for (int left = 0; left < s.length(); left++) {\n            Set<Character> seen = new HashSet<>();\n            for (int right = left; right < s.length(); right++) {\n                char c = s.charAt(right);\n                if (seen.contains(c)) break;\n                seen.add(c);\n                best = Math.max(best, right - left + 1);\n            }\n        }\n        return best;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "The window reuses character counts: each boundary moves forward at most n times.",
    "note": "",
    "source": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "constraints": [
      "0 <= s.length <= 10^5",
      "s consists of English letters, digits, symbols and spaces."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "11": {
    "statement": "Choose two indices i < j. Their container holds min(height[i], height[j]) × (j − i). Return the greatest possible area; the sides remain vertical.",
    "brute": {
      "name": "Check all pairs",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "Compute the area for every pair of vertical lines.",
      "code": "class Solution {\n    public int maxArea(int[] height) {\n        int best = 0;\n        for (int left = 0; left < height.length; left++) {\n            for (int right = left + 1; right < height.length; right++) {\n                best = Math.max(best, Math.min(height[left], height[right]) * (right - left));\n            }\n        }\n        return best;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Moving the shorter side discards pairs that cannot improve the answer, reducing the search to a linear scan.",
    "note": "",
    "source": "https://leetcode.com/problems/container-with-most-water/",
    "constraints": [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "15": {
    "statement": "Return the distinct value triplets drawn from three different positions of nums whose sum is zero. Each triplet appears once, regardless of duplicate input values.",
    "brute": {
      "name": "Enumerate all triples",
      "time": "O(n³)",
      "space": "O(log n) + output",
      "idea": "Sort, try every triple of indices, and deduplicate matching value triples.",
      "code": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> result = new ArrayList<>();\n        Set<String> seen = new HashSet<>();\n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                for (int k = j + 1; k < nums.length; k++) {\n                    if (nums[i] + nums[j] + nums[k] == 0) {\n                        String key = \"\" + nums[i] + \",\" + nums[j] + \",\" + nums[k];\n                        if (seen.add(key)) result.add(Arrays.asList(nums[i], nums[j], nums[k]));\n                    }\n                }\n            }\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "After fixing one value, sorted two-pointer search replaces the two nested pair loops.",
    "note": "",
    "source": "https://leetcode.com/problems/3sum/",
    "constraints": [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "16": {
    "statement": "Choose three different array positions and return their sum with the smallest absolute distance to target. The original problem guarantees a unique closest sum.",
    "brute": {
      "name": "Check every triple",
      "time": "O(n³)",
      "space": "O(1)",
      "idea": "Keep the best sum while enumerating all triples.",
      "code": "class Solution {\n    public int threeSumClosest(int[] nums, int target) {\n        int best = nums[0] + nums[1] + nums[2];\n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                for (int k = j + 1; k < nums.length; k++) {\n                    int sum = nums[i] + nums[j] + nums[k];\n                    if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;\n                }\n            }\n        }\n        return best;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Sort once and move a pair toward target for each anchor, reducing cubic work to quadratic.",
    "note": "",
    "source": "https://leetcode.com/problems/3sum-closest/",
    "constraints": [
      "3 <= nums.length <= 500",
      "-1000 <= nums[i] <= 1000",
      "-10^4 <= target <= 10^4"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "18": {
    "statement": "Return all distinct value quadruplets from four different positions whose sum equals target. Repeated input values may be used only as often as they occur.",
    "brute": {
      "name": "Enumerate all quadruples",
      "time": "O(n⁴)",
      "space": "O(log n) + output",
      "idea": "Sort, test every four-index combination, and deduplicate by its sorted values.",
      "code": "class Solution {\n    public List<List<Integer>> fourSum(int[] nums, int target) {\n        Arrays.sort(nums);\n        List<List<Integer>> result = new ArrayList<>();\n        Set<String> seen = new HashSet<>();\n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                for (int k = j + 1; k < nums.length; k++) {\n                    for (int l = k + 1; l < nums.length; l++) {\n                        long sum = (long) nums[i] + nums[j] + nums[k] + nums[l];\n                        if (sum == target) {\n                            String key = \"\" + nums[i] + \",\" + nums[j] + \",\" + nums[k] + \",\" + nums[l];\n                            if (seen.add(key)) result.add(Arrays.asList(nums[i], nums[j], nums[k], nums[l]));\n                        }\n                    }\n                }\n            }\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Fixing two anchors leaves a sorted two-pointer search, removing one nested loop.",
    "note": "",
    "source": "https://leetcode.com/problems/4sum/",
    "constraints": [
      "1 <= nums.length <= 200",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "19": {
    "statement": "Remove the nth node counted from the tail of an acyclic list and return the resulting head. n is valid for the supplied list.",
    "brute": {
      "name": "Count length, then remove",
      "time": "O(n)",
      "space": "O(1)",
      "idea": "Count the list, then walk from a dummy node to the predecessor of the target.",
      "code": "class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        int length = 0;\n        ListNode current = head;\n        while (current != null) {\n            length++;\n            current = current.next;\n        }\n        ListNode dummy = new ListNode(0, head);\n        current = dummy;\n        for (int i = 0; i < length - n; i++) current = current.next;\n        current.next = current.next.next;\n        return dummy.next;\n    }\n}",
      "label": "Straightforward baseline"
    },
    "improvement": "Both approaches are linear. The n-node gap removes the separate full length-counting pass.",
    "note": "",
    "source": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "constraints": [
      "The number of nodes in the list is sz.",
      "1 <= sz <= 30",
      "0 <= Node.val <= 100",
      "1 <= n <= sz"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "21": {
    "statement": "Splice the nodes of two nondecreasing linked lists into one nondecreasing list and return its head. Empty input lists are allowed.",
    "brute": {
      "name": "Insert nodes into a sorted result",
      "time": "O((a+b)²)",
      "space": "O(1)",
      "idea": "Detach each input node and linearly search the growing sorted result for its insertion point.",
      "code": "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(0);\n        ListNode current = list1;\n        while (current != null) {\n            ListNode next = current.next;\n            insert(dummy, current);\n            current = next;\n        }\n        current = list2;\n        while (current != null) {\n            ListNode next = current.next;\n            insert(dummy, current);\n            current = next;\n        }\n        return dummy.next;\n    }\n    private void insert(ListNode dummy, ListNode value) {\n        ListNode previous = dummy;\n        while (previous.next != null && previous.next.val <= value.val) previous = previous.next;\n        value.next = previous.next;\n        previous.next = value;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Because both inputs are already sorted, comparing only their heads avoids searching the result again.",
    "note": "",
    "source": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "constraints": [
      "Each list has 0–50 nodes.",
      "−100 ≤ Node.val ≤ 100.",
      "Both lists are sorted in nondecreasing order."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "33": {
    "statement": "A distinct ascending array may have been rotated. Return the zero-based position of target, or −1 if absent.",
    "brute": {
      "name": "Linear scan",
      "time": "O(n)",
      "space": "O(1)",
      "idea": "Check each position in input order.",
      "code": "class Solution {\n    public int search(int[] nums, int target) {\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] == target) return i;\n        }\n        return -1;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "The ordering invariant lets binary search discard half of the remaining candidate interval.",
    "note": "",
    "source": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "constraints": [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique.",
      "nums is an ascending array that is possibly rotated.",
      "-10^4 <= target <= 10^4"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "34": {
    "statement": "In a nondecreasing array, return the first and last zero-based positions of target. Return [−1, −1] if it does not occur.",
    "brute": {
      "name": "Scan all occurrences",
      "time": "O(n)",
      "space": "O(1)",
      "idea": "Walk the array, recording the first and latest matching index.",
      "code": "class Solution {\n    public int[] searchRange(int[] nums, int target) {\n        int first = -1;\n        int last = -1;\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] == target) {\n                if (first == -1) first = i;\n                last = i;\n            }\n        }\n        return new int[]{first, last};\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Two boundary searches locate the first and last occurrence in logarithmic time.",
    "note": "",
    "source": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    "constraints": [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "nums is a non-decreasing array.",
      "-10^9 <= target <= 10^9"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "35": {
    "statement": "Return the index of target in a distinct ascending array, or the position where it should be inserted to preserve order.",
    "brute": {
      "name": "Walk to the first lower bound",
      "time": "O(n)",
      "space": "O(1)",
      "idea": "Scan until finding a value at least target; otherwise insert at the end.",
      "code": "class Solution {\n    public int searchInsert(int[] nums, int target) {\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] >= target) return i;\n        }\n        return nums.length;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Binary search finds the same lower-bound boundary without visiting every earlier value.",
    "note": "",
    "source": "https://leetcode.com/problems/search-insert-position/",
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "nums contains distinct values sorted in ascending order.",
      "-10^4 <= target <= 10^4"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "42": {
    "statement": "Each height is a unit-width elevation bar. Return the total water retained above the bars after rain, bounded by taller bars on both sides.",
    "brute": {
      "name": "Rescan both sides of each bar",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "Find the tallest bar to each side independently for every position.",
      "code": "class Solution {\n    public int trap(int[] height) {\n        int water = 0;\n        for (int i = 0; i < height.length; i++) {\n            int leftMax = 0;\n            int rightMax = 0;\n            for (int j = 0; j <= i; j++) leftMax = Math.max(leftMax, height[j]);\n            for (int j = i; j < height.length; j++) rightMax = Math.max(rightMax, height[j]);\n            water += Math.min(leftMax, rightMax) - height[i];\n        }\n        return water;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Running boundary maxima resolve each bar once without rescanning the array.",
    "note": "",
    "source": "https://leetcode.com/problems/trapping-rain-water/",
    "constraints": [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "49": {
    "statement": "Group the input strings so that each group contains exactly the strings with identical character multiplicities. Group order is irrelevant.",
    "brute": {
      "name": "Compare against existing groups",
      "time": "O(n²L)",
      "space": "O(n + alphabet) + output",
      "idea": "For each ungrouped string, compare character counts with all later ungrouped strings.",
      "code": "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        boolean[] used = new boolean[strs.length];\n        List<List<String>> result = new ArrayList<>();\n        for (int i = 0; i < strs.length; i++) {\n            if (used[i]) continue;\n            List<String> group = new ArrayList<>();\n            for (int j = i; j < strs.length; j++) {\n                if (!used[j] && matches(strs[i], strs[j])) {\n                    used[j] = true;\n                    group.add(strs[j]);\n                }\n            }\n            result.add(group);\n        }\n        return result;\n    }\n    private boolean matches(String a, String b) {\n        if (a.length() != b.length()) return false;\n        int[] count = new int[26];\n        for (int i = 0; i < a.length(); i++) count[a.charAt(i) - 'a']++;\n        for (int i = 0; i < b.length(); i++) count[b.charAt(i) - 'a']--;\n        for (int i = 0; i < 26; i++) {\n            if (count[i] != 0) return false;\n        }\n        return true;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Canonical sorted keys turn repeated pairwise comparisons into one key construction and hash lookup per string.",
    "note": "",
    "source": "https://leetcode.com/problems/group-anagrams/",
    "constraints": [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "55": {
    "statement": "Starting at index 0, nums[i] is the maximum forward jump from i. Return whether the last index can be reached.",
    "brute": {
      "name": "Try every reachable jump recursively",
      "time": "O(2ⁿ)",
      "space": "O(n)",
      "idea": "From each position, recursively try each possible next landing position.",
      "code": "class Solution {\n    public boolean canJump(int[] nums) {\n        return reach(nums, 0);\n    }\n    private boolean reach(int[] nums, int index) {\n        if (index >= nums.length - 1) return true;\n        for (int next = index + 1; next < nums.length && next <= index + nums[index]; next++) {\n            if (reach(nums, next)) return true;\n        }\n        return false;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "The farthest reachable boundary summarizes all previous choices, so greedy scanning avoids branching.",
    "note": "The brute-force search grows rapidly. Start with the built-in small examples; the trace still obeys the same step, frame and memory limits.",
    "source": "https://leetcode.com/problems/jump-game/",
    "constraints": [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= 10^5"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "56": {
    "statement": "Merge all overlapping closed intervals. Return sorted, disjoint intervals covering exactly the same points; touching endpoints count as overlap.",
    "brute": {
      "name": "Repeatedly merge overlapping pairs",
      "time": "O(n³)",
      "space": "O(n) + output",
      "idea": "Repeatedly search for an overlapping active pair, merge it, and restart. Finally order the surviving ranges.",
      "code": "class Solution {\n    public List<int[]> merge(int[][] intervals) {\n        int[][] work = new int[intervals.length][2];\n        boolean[] removed = new boolean[intervals.length];\n        for (int i = 0; i < intervals.length; i++) {\n            work[i][0] = intervals[i][0];\n            work[i][1] = intervals[i][1];\n        }\n        boolean changed = true;\n        while (changed) {\n            changed = false;\n            for (int i = 0; i < work.length; i++) {\n                if (removed[i]) continue;\n                for (int j = i + 1; j < work.length; j++) {\n                    if (!removed[j] && work[i][0] <= work[j][1] && work[j][0] <= work[i][1]) {\n                        work[i][0] = Math.min(work[i][0], work[j][0]);\n                        work[i][1] = Math.max(work[i][1], work[j][1]);\n                        removed[j] = true;\n                        changed = true;\n                    }\n                }\n            }\n        }\n        List<int[]> result = new ArrayList<>();\n        while (result.size() < work.length) {\n            int best = -1;\n            for (int i = 0; i < work.length; i++) {\n                if (!removed[i] && (best == -1 || work[i][0] < work[best][0])) best = i;\n            }\n            if (best == -1) break;\n            result.add(work[best]);\n            removed[best] = true;\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Sorting by start makes only the last merged interval relevant. This release uses visible merge sort for O(n log n) sorting.",
    "note": "",
    "efficientCode": "class Solution {\n    public List<int[]> merge(int[][] intervals) {\n        int[][] temp = new int[intervals.length][2];\n        sort(intervals, temp, 0, intervals.length);\n        List<int[]> result = new ArrayList<>();\n        for (int i = 0; i < intervals.length; i++) {\n            if (result.isEmpty() || result.get(result.size() - 1)[1] < intervals[i][0]) {\n                result.add(new int[]{intervals[i][0], intervals[i][1]});\n            } else {\n                int[] last = result.get(result.size() - 1);\n                last[1] = Math.max(last[1], intervals[i][1]);\n            }\n        }\n        return result;\n    }\n    private void sort(int[][] values, int[][] temp, int left, int right) {\n        if (right - left <= 1) return;\n        int mid = (left + right) / 2;\n        sort(values, temp, left, mid);\n        sort(values, temp, mid, right);\n        int a = left;\n        int b = mid;\n        for (int out = left; out < right; out++) {\n            if (a < mid && (b >= right || values[a][0] <= values[b][0])) {\n                temp[out] = values[a];\n                a++;\n            } else {\n                temp[out] = values[b];\n                b++;\n            }\n        }\n        for (int i = left; i < right; i++) values[i] = temp[i];\n    }\n}",
    "source": "https://leetcode.com/problems/merge-intervals/",
    "constraints": [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= start_i <= end_i <= 10^4"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "62": {
    "statement": "Count paths from the upper-left cell to the lower-right cell of an m-by-n grid, moving only right or down. There are no blocked cells.",
    "brute": {
      "name": "Enumerate right/down paths",
      "time": "O(2^(m+n))",
      "space": "O(m+n)",
      "idea": "Recursively try both directions from every cell until reaching an edge.",
      "code": "class Solution {\n    public int uniquePaths(int m, int n) {\n        if (m == 1 || n == 1) return 1;\n        return uniquePaths(m - 1, n) + uniquePaths(m, n - 1);\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "DP computes each cell’s path count once and reuses the counts arriving from above and left.",
    "note": "The brute-force search grows rapidly. Start with the built-in small examples; the trace still obeys the same step, frame and memory limits.",
    "source": "https://leetcode.com/problems/unique-paths/",
    "constraints": [
      "1 <= m, n <= 100",
      "Test cases guarantee the answer is at most 2 × 10^9."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "70": {
    "statement": "A staircase has n steps. Each move climbs one or two steps. Return the number of distinct sequences of moves that reach the top exactly.",
    "brute": {
      "name": "Enumerate one-step/two-step choices",
      "time": "O(2ⁿ)",
      "space": "O(n)",
      "idea": "Recursively count every possible first move until no steps remain.",
      "code": "class Solution {\n    public int climbStairs(int n) {\n        if (n <= 1) return 1;\n        return climbStairs(n - 1) + climbStairs(n - 2);\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "The two previous counts summarize repeated subproblems; iterative DP avoids recomputing the same remaining height.",
    "note": "The brute-force search grows rapidly. Start with the built-in small examples; the trace still obeys the same step, frame and memory limits.",
    "source": "https://leetcode.com/problems/climbing-stairs/",
    "constraints": [
      "1 <= n <= 45"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "76": {
    "statement": "Return the shortest contiguous part of s containing every character of t with at least the required multiplicity. Return an empty string if no such window exists.",
    "brute": {
      "name": "Rebuild counts for every start",
      "time": "O(n² + nm)",
      "space": "O(alphabet)",
      "idea": "Start a fresh frequency map at each left boundary and grow until all required characters are present.",
      "code": "class Solution {\n    public String minWindow(String s, String t) {\n        if (t.length() == 0) return \"\";\n        int best = Integer.MAX_VALUE;\n        int start = 0;\n        for (int left = 0; left < s.length(); left++) {\n            Map<Character, Integer> need = new HashMap<>();\n            for (int j = 0; j < t.length(); j++) {\n                char c = t.charAt(j);\n                need.put(c, need.getOrDefault(c, 0) + 1);\n            }\n            int missing = t.length();\n            for (int right = left; right < s.length(); right++) {\n                char c = s.charAt(right);\n                if (need.getOrDefault(c, 0) > 0) missing--;\n                need.put(c, need.getOrDefault(c, 0) - 1);\n                if (missing == 0) {\n                    if (right - left + 1 < best) {\n                        best = right - left + 1;\n                        start = left;\n                    }\n                    break;\n                }\n            }\n        }\n        return best == Integer.MAX_VALUE ? \"\" : s.substring(start, start + best);\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "One running deficit map lets the efficient window expand and shrink without restarting.",
    "note": "",
    "source": "https://leetcode.com/problems/minimum-window-substring/",
    "constraints": [
      "m == s.length",
      "n == t.length",
      "1 <= m, n <= 10^5",
      "s and t consist of uppercase and lowercase English letters."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "78": {
    "statement": "Return every subset of the distinct values in nums, including the empty subset. Subset order and result order do not matter.",
    "brute": {
      "name": "Enumerate binary masks",
      "time": "O(n · 2ⁿ)",
      "space": "O(n) + output",
      "idea": "For each mask from 0 through 2^n−1, include the values whose corresponding bits are set.",
      "code": "class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        int total = 1;\n        for (int i = 0; i < nums.length; i++) total *= 2;\n        List<List<Integer>> result = new ArrayList<>();\n        for (int mask = 0; mask < total; mask++) {\n            int bits = mask;\n            List<Integer> subset = new ArrayList<>();\n            for (int i = 0; i < nums.length; i++) {\n                if (bits % 2 == 1) subset.add(nums[i]);\n                bits /= 2;\n            }\n            result.add(subset);\n        }\n        return result;\n    }\n}",
      "label": "Straightforward baseline"
    },
    "improvement": "Both methods must write Θ(n · 2^n) output. Backtracking shares a path and supports pruning in constrained variants; it is not an asymptotic improvement here.",
    "note": "",
    "source": "https://leetcode.com/problems/subsets/",
    "constraints": [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10",
      "All the numbers of nums are unique."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "79": {
    "statement": "Return whether word can be formed by horizontally or vertically adjacent board cells. A cell cannot be reused within one candidate path.",
    "brute": {
      "name": "Path search with a visited grid",
      "time": "O(RC · 4ᴸ)",
      "space": "O(RC + L)",
      "idea": "Try each start and recursively try matching neighbors, maintaining a separate visited grid for the current path.",
      "code": "class Solution {\n    public boolean exist(char[][] board, String word) {\n        if (word.length() == 0) return true;\n        if (board.length == 0) return false;\n        boolean[][] visited = new boolean[board.length][board[0].length];\n        for (int row = 0; row < board.length; row++) {\n            for (int col = 0; col < board[0].length; col++) {\n                if (search(board, word, visited, row, col, 0)) return true;\n            }\n        }\n        return false;\n    }\n    private boolean search(char[][] board, String word, boolean[][] visited, int row, int col, int index) {\n        if (index == word.length()) return true;\n        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) return false;\n        if (visited[row][col] || board[row][col] != word.charAt(index)) return false;\n        visited[row][col] = true;\n        boolean found = search(board, word, visited, row + 1, col, index + 1) || search(board, word, visited, row - 1, col, index + 1) || search(board, word, visited, row, col + 1, index + 1) || search(board, word, visited, row, col - 1, index + 1);\n        visited[row][col] = false;\n        return found;\n    }\n}",
      "label": "Straightforward baseline"
    },
    "improvement": "Both searches have exponential worst-case time. In-place marking removes the O(RC) visited grid; mismatching prefixes prune branches in both.",
    "note": "",
    "source": "https://leetcode.com/problems/word-search/",
    "constraints": [
      "m == board.length",
      "n = board[i].length",
      "1 <= m, n <= 6",
      "1 <= word.length <= 15",
      "board and word consists of only lowercase and uppercase English letters."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "84": {
    "statement": "Bars have unit width and nonnegative heights. Return the largest rectangular area fully contained beneath a contiguous range of bars.",
    "brute": {
      "name": "Test all histogram spans",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "For each left boundary, extend the right boundary while maintaining the smallest height.",
      "code": "class Solution {\n    public int largestRectangleArea(int[] heights) {\n        int best = 0;\n        for (int left = 0; left < heights.length; left++) {\n            int minimum = Integer.MAX_VALUE;\n            for (int right = left; right < heights.length; right++) {\n                minimum = Math.min(minimum, heights[right]);\n                best = Math.max(best, minimum * (right - left + 1));\n            }\n        }\n        return best;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A monotonic stack determines maximal boundaries for each height without testing all spans.",
    "note": "",
    "source": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    "constraints": [
      "1 <= heights.length <= 10^5",
      "0 <= heights[i] <= 10^4"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "85": {
    "statement": "Return the area of the largest axis-aligned rectangle containing only character cells \"1\" in the binary matrix.",
    "brute": {
      "name": "Try every top and bottom row",
      "time": "O(R²C)",
      "space": "O(C)",
      "idea": "For every top row, extend bottom rows; keep which columns have remained all ones and measure their longest run.",
      "code": "class Solution {\n    public int maximalRectangle(char[][] matrix) {\n        if (matrix.length == 0) return 0;\n        int best = 0;\n        for (int top = 0; top < matrix.length; top++) {\n            boolean[] valid = new boolean[matrix[0].length];\n            Arrays.fill(valid, true);\n            for (int bottom = top; bottom < matrix.length; bottom++) {\n                int width = 0;\n                for (int col = 0; col < valid.length; col++) {\n                    valid[col] = valid[col] && matrix[bottom][col] == '1';\n                    if (valid[col]) width++;\n                    else width = 0;\n                    best = Math.max(best, width * (bottom - top + 1));\n                }\n            }\n        }\n        return best;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "One histogram per bottom row plus a monotonic stack avoids repeating work for every possible top row.",
    "note": "",
    "source": "https://leetcode.com/problems/maximal-rectangle/",
    "constraints": [
      "rows == matrix.length",
      "cols == matrix[i].length",
      "1 <= rows, cols <= 200",
      "matrix[i][j] is '0' or '1'."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "102": {
    "statement": "Return node values grouped by tree depth, ordered from root level downward and left to right within each level. An empty tree returns an empty list.",
    "brute": {
      "name": "Rescan the tree for each level",
      "time": "O(nh)",
      "space": "O(h) + output",
      "idea": "Run a depth-limited DFS for level 0, then level 1, and continue until a level is empty.",
      "code": "class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        List<List<Integer>> result = new ArrayList<>();\n        for (int depth = 0; ; depth++) {\n            List<Integer> level = new ArrayList<>();\n            collect(root, depth, level);\n            if (level.isEmpty()) break;\n            result.add(level);\n        }\n        return result;\n    }\n    private void collect(TreeNode root, int depth, List<Integer> level) {\n        if (root == null) return;\n        if (depth == 0) {\n            level.add(root.val);\n            return;\n        }\n        collect(root.left, depth - 1, level);\n        collect(root.right, depth - 1, level);\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A queue visits each node once and naturally groups nodes by the frontier’s frozen size.",
    "note": "",
    "source": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "constraints": [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-1000 <= Node.val <= 1000"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "104": {
    "statement": "Return the maximum number of nodes on a path from the root to a leaf. An empty tree has depth 0.",
    "brute": {
      "name": "Search for each possible depth",
      "time": "O(nh)",
      "space": "O(h)",
      "idea": "Repeatedly ask whether the tree has any node at depth 1, 2, 3, and so on.",
      "code": "class Solution {\n    public int maxDepth(TreeNode root) {\n        int depth = 0;\n        while (hasDepth(root, depth + 1)) depth++;\n        return depth;\n    }\n    private boolean hasDepth(TreeNode root, int depth) {\n        if (root == null) return false;\n        if (depth == 1) return true;\n        return hasDepth(root.left, depth - 1) || hasDepth(root.right, depth - 1);\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Postorder DFS computes each subtree depth once and combines it at the parent.",
    "note": "",
    "source": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "128": {
    "statement": "Return the number of distinct values in the longest run of consecutive integers found anywhere in nums. Input positions need not be adjacent.",
    "brute": {
      "name": "Repeated linear membership search",
      "time": "O(n³)",
      "space": "O(1)",
      "idea": "Start at every value and scan the whole array to find each next integer.",
      "code": "class Solution {\n    public int longestConsecutive(int[] nums) {\n        int best = 0;\n        for (int i = 0; i < nums.length; i++) {\n            int current = nums[i];\n            int length = 1;\n            while (contains(nums, current + 1)) {\n                current++;\n                length++;\n            }\n            best = Math.max(best, length);\n        }\n        return best;\n    }\n    private boolean contains(int[] nums, int value) {\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] == value) return true;\n        }\n        return false;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A set gives expected constant-time membership; starting only at run boundaries prevents repeated run scans.",
    "note": "",
    "source": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "constraints": [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "136": {
    "statement": "Every array value appears exactly twice except one value appearing once. Return that single value.",
    "brute": {
      "name": "Count matches by rescanning",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "For each value, count how often it appears in the full array and return the one with count 1.",
      "code": "class Solution {\n    public int singleNumber(int[] nums) {\n        for (int i = 0; i < nums.length; i++) {\n            int count = 0;\n            for (int j = 0; j < nums.length; j++) {\n                if (nums[i] == nums[j]) count++;\n            }\n            if (count == 1) return nums[i];\n        }\n        return 0;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "XOR cancels equal pairs in a single pass using constant extra space.",
    "note": "",
    "source": "https://leetcode.com/problems/single-number/",
    "constraints": [
      "1 <= nums.length <= 3 * 10^4",
      "-3 * 10^4 <= nums[i] <= 3 * 10^4",
      "Each element in the array appears twice except for one element which appears only once."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "141": {
    "statement": "Return whether following next pointers from head can revisit the same node.",
    "brute": {
      "name": "Remember visited node identities",
      "time": "O(n)",
      "space": "O(n)",
      "idea": "Follow next pointers and stop at the first node identity already in a set.",
      "code": "class Solution {\n    public boolean hasCycle(ListNode head) {\n        Set<ListNode> seen = new HashSet<>();\n        ListNode current = head;\n        while (current != null) {\n            if (seen.contains(current)) return true;\n            seen.add(current);\n            current = current.next;\n        }\n        return false;\n    }\n}",
      "label": "Straightforward baseline"
    },
    "improvement": "Two-speed pointers replace the visited set with constant extra space.",
    "note": "",
    "source": "https://leetcode.com/problems/linked-list-cycle/",
    "constraints": [
      "The number of the nodes in the list is in the range [0, 10^4].",
      "-10^5 <= Node.val <= 10^5",
      "pos is -1 or a valid index in the linked-list."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "142": {
    "statement": "Return the reference to the first node on a cycle reachable from head, or null if the list has no cycle. Do not modify the list.",
    "brute": {
      "name": "Remember visited node identities",
      "time": "O(n)",
      "space": "O(n)",
      "idea": "Follow next pointers and stop at the first node identity already in a set.",
      "code": "class Solution {\n    public ListNode detectCycle(ListNode head) {\n        Set<ListNode> seen = new HashSet<>();\n        ListNode current = head;\n        while (current != null) {\n            if (seen.contains(current)) return current;\n            seen.add(current);\n            current = current.next;\n        }\n        return null;\n    }\n}",
      "label": "Straightforward baseline"
    },
    "improvement": "Floyd’s two-speed pointers detect a cycle using constant extra space; a second walk locates its entry.",
    "note": "",
    "source": "https://leetcode.com/problems/linked-list-cycle-ii/",
    "constraints": [
      "The number of the nodes in the list is in the range [0, 10^4].",
      "-10^5 <= Node.val <= 10^5",
      "pos is -1 or a valid index in the linked-list."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "153": {
    "statement": "Return the minimum value of a nonempty, distinct sorted array that has been rotated any number of positions.",
    "brute": {
      "name": "Scan the minimum",
      "time": "O(n)",
      "space": "O(1)",
      "idea": "Compare every element with the best minimum so far.",
      "code": "class Solution {\n    public int findMin(int[] nums) {\n        int best = nums[0];\n        for (int i = 1; i < nums.length; i++) best = Math.min(best, nums[i]);\n        return best;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "The comparison with the right endpoint identifies which sorted region can contain the minimum.",
    "note": "",
    "source": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "constraints": [
      "n == nums.length",
      "1 <= n <= 5000",
      "-5000 <= nums[i] <= 5000",
      "All the integers of nums are unique.",
      "nums is sorted and rotated between 1 and n times."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "160": {
    "statement": "Return the first node shared by reference between two acyclic linked lists, or null if they are disjoint. Equal values alone do not constitute an intersection.",
    "brute": {
      "name": "Compare every node identity",
      "time": "O(ab)",
      "space": "O(1)",
      "idea": "For each node of A, scan B for the identical object.",
      "code": "class Solution {\n    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n        ListNode a = headA;\n        while (a != null) {\n            ListNode b = headB;\n            while (b != null) {\n                if (a == b) return a;\n                b = b.next;\n            }\n            a = a.next;\n        }\n        return null;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Switching heads equalizes path lengths and makes the two references meet after at most a+b steps.",
    "note": "",
    "source": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
    "constraints": [
      "The number of nodes of listA is in the m.",
      "The number of nodes of listB is in the n.",
      "1 <= m, n <= 3 * 10^4",
      "1 <= Node.val <= 10^5",
      "0 <= skipA <= m",
      "0 <= skipB <= n",
      "intersectVal is 0 if listA and listB do not intersect.",
      "intersectVal == listA[skipA] == listB[skipB] if listA and listB intersect."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "162": {
    "statement": "Return any index whose value is strictly greater than its existing neighbors. Adjacent values differ; outside the array, neighbors are treated as negative infinity.",
    "brute": {
      "name": "Check every neighbor pair",
      "time": "O(n)",
      "space": "O(1)",
      "idea": "Return the first index satisfying both neighbor comparisons.",
      "code": "class Solution {\n    public int findPeakElement(int[] nums) {\n        for (int i = 0; i < nums.length; i++) {\n            if ((i == 0 || nums[i] > nums[i - 1]) && (i == nums.length - 1 || nums[i] > nums[i + 1])) return i;\n        }\n        return -1;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Following the uphill half finds some peak in logarithmic time. Different valid peak indices are acceptable.",
    "note": "",
    "source": "https://leetcode.com/problems/find-peak-element/",
    "constraints": [
      "1 <= nums.length <= 1000",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "nums[i] != nums[i + 1] for all valid i."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "167": {
    "statement": "In a nondecreasing array, find two different elements that add to target. Return their one-based indices in increasing order. Exactly one solution is guaranteed.",
    "brute": {
      "name": "Check every pair",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "Try all distinct index pairs and return the matching pair.",
      "code": "class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        for (int i = 0; i < numbers.length; i++) {\n            for (int j = i + 1; j < numbers.length; j++) {\n                if (numbers[i] + numbers[j] == target) return new int[]{i + 1, j + 1};\n            }\n        }\n        return new int[]{-1, -1};\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Sorted order determines which boundary to move, eliminating an entire row or column of candidate pairs.",
    "note": "",
    "source": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    "constraints": [
      "2 <= numbers.length <= 3 * 10^4",
      "-1000 <= numbers[i] <= 1000",
      "numbers is sorted in non-decreasing order.",
      "-1000 <= target <= 1000",
      "The tests are generated such that there is exactly one solution."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "200": {
    "statement": "Count connected groups of character \"1\" cells in a rectangular grid. Connectivity is horizontal or vertical; \"0\" cells are water.",
    "brute": {
      "name": "Relabel merged components repeatedly",
      "time": "O((RC)²)",
      "space": "O(RC)",
      "idea": "Give each land cell a distinct label; each adjacent component merge scans the whole label grid to replace its label.",
      "code": "class Solution {\n    public int numIslands(char[][] grid) {\n        if (grid.length == 0) return 0;\n        int rows = grid.length;\n        int cols = grid[0].length;\n        int[][] labels = new int[rows][cols];\n        int count = 0;\n        for (int row = 0; row < rows; row++) {\n            for (int col = 0; col < cols; col++) {\n                if (grid[row][col] == '1') {\n                    count++;\n                    labels[row][col] = row * cols + col + 1;\n                }\n            }\n        }\n        for (int row = 0; row < rows; row++) {\n            for (int col = 0; col < cols; col++) {\n                if (labels[row][col] == 0) continue;\n                if (row + 1 < rows && labels[row + 1][col] != 0 && labels[row][col] != labels[row + 1][col]) {\n                    replace(labels, labels[row + 1][col], labels[row][col]);\n                    count--;\n                }\n                if (col + 1 < cols && labels[row][col + 1] != 0 && labels[row][col] != labels[row][col + 1]) {\n                    replace(labels, labels[row][col + 1], labels[row][col]);\n                    count--;\n                }\n            }\n        }\n        return count;\n    }\n    private void replace(int[][] labels, int from, int to) {\n        for (int row = 0; row < labels.length; row++) {\n            for (int col = 0; col < labels[row].length; col++) {\n                if (labels[row][col] == from) labels[row][col] = to;\n            }\n        }\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Flood fill marks each land cell once instead of repeatedly relabeling whole components.",
    "note": "",
    "source": "https://leetcode.com/problems/number-of-islands/",
    "constraints": [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "207": {
    "statement": "Courses are numbered 0 through numCourses−1. Each [course, prerequisite] requires the prerequisite first. Return whether any ordering completes all courses.",
    "brute": {
      "name": "Enumerate course orders",
      "time": "O(V! · (V + E))",
      "space": "O(V)",
      "idea": "Try every permutation and check every prerequisite against its positions at the completed ordering.",
      "code": "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        int[] positions = new int[numCourses];\n        boolean[] used = new boolean[numCourses];\n        return order(0, positions, used, prerequisites);\n    }\n    private boolean order(int index, int[] positions, boolean[] used, int[][] prerequisites) {\n        if (index == positions.length) {\n            for (int i = 0; i < prerequisites.length; i++) {\n                if (positions[prerequisites[i][1]] >= positions[prerequisites[i][0]]) return false;\n            }\n            return true;\n        }\n        for (int course = 0; course < used.length; course++) {\n            if (used[course]) continue;\n            positions[course] = index;\n            used[course] = true;\n            if (order(index + 1, positions, used, prerequisites)) return true;\n            used[course] = false;\n        }\n        return false;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Kahn’s algorithm removes zero-indegree vertices in O(V+E), detecting cycles without enumerating orders.",
    "note": "The brute-force search grows rapidly. Start with the built-in small examples; the trace still obeys the same step, frame and memory limits.",
    "source": "https://leetcode.com/problems/course-schedule/",
    "constraints": [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "prerequisites[i].length == 2",
      "0 <= a_i, b_i < numCourses",
      "All the pairs prerequisites[i] are unique."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "208": {
    "statement": "Support insert, exact search, and startsWith for lowercase words. The driver accepts parallel ops and words arrays, returning a boolean per operation; insert returns true as an acknowledgement.",
    "brute": {
      "name": "Scan stored words",
      "time": "O(q²L)",
      "space": "O(qL)",
      "idea": "Keep inserted words in a list. For each query, compare it against every stored word or prefix.",
      "code": "class Solution {\n    public boolean[] trieQueries(String[] ops, String[] words) {\n        List<String> stored = new ArrayList<>();\n        boolean[] result = new boolean[ops.length];\n        for (int i = 0; i < ops.length; i++) {\n            if (ops[i].equals(\"insert\")) {\n                stored.add(words[i]);\n                result[i] = true;\n            } else {\n                for (int j = 0; j < stored.size(); j++) {\n                    String value = stored.get(j);\n                    if (ops[i].equals(\"search\") && value.equals(words[i])) result[i] = true;\n                    if (ops[i].equals(\"startsWith\") && value.length() >= words[i].length() && value.substring(0, words[i].length()).equals(words[i])) result[i] = true;\n                }\n            }\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Trie traversal depends on query length rather than the number of stored words, and shared prefixes reuse nodes.",
    "note": "The original Trie object API is expressed as a visible operation driver. Only insert, search, and startsWith are accepted.",
    "source": "https://leetcode.com/problems/implement-trie-prefix-tree/",
    "constraints": [
      "1 <= word.length, prefix.length <= 2000",
      "word and prefix consist only of lowercase English letters.",
      "At most 3 * 10^4 calls in total will be made to insert, search, and startsWith."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "209": {
    "statement": "Find the minimum length of a nonempty contiguous subarray of positive nums whose sum is at least target. Return 0 if it does not exist.",
    "brute": {
      "name": "Try every start",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "Accumulate a sum independently from each left endpoint and stop at the first valid end.",
      "code": "class Solution {\n    public int minSubArrayLen(int target, int[] nums) {\n        int best = Integer.MAX_VALUE;\n        for (int left = 0; left < nums.length; left++) {\n            int sum = 0;\n            for (int right = left; right < nums.length; right++) {\n                sum += nums[right];\n                if (sum >= target) {\n                    best = Math.min(best, right - left + 1);\n                    break;\n                }\n            }\n        }\n        return best == Integer.MAX_VALUE ? 0 : best;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Positive values make validity monotonic, so a single pair of moving boundaries suffices.",
    "note": "",
    "source": "https://leetcode.com/problems/minimum-size-subarray-sum/",
    "constraints": [
      "1 <= target <= 10^9",
      "1 <= nums.length <= 10^5",
      "1 <= nums[i] <= 10^4"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "215": {
    "statement": "Return the kth largest element in sorted order, counting duplicate values separately. This is not the kth distinct value.",
    "brute": {
      "name": "Repeated maximum selection",
      "time": "O(nk)",
      "space": "O(n)",
      "idea": "Find the largest unused array position k times.",
      "code": "class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        boolean[] used = new boolean[nums.length];\n        int answer = 0;\n        for (int rank = 0; rank < k; rank++) {\n            int best = -1;\n            for (int i = 0; i < nums.length; i++) {\n                if (!used[i] && (best == -1 || nums[i] > nums[best])) best = i;\n            }\n            used[best] = true;\n            answer = nums[best];\n        }\n        return answer;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A k-sized min-heap retains the top candidates while processing each value once.",
    "note": "",
    "source": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    "constraints": [
      "1 <= k <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "217": {
    "statement": "Return true if any value occurs in at least two different positions; otherwise return false.",
    "brute": {
      "name": "Compare all pairs",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "Check whether any pair of different indices contains equal values.",
      "code": "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                if (nums[i] == nums[j]) return true;\n            }\n        }\n        return false;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A set detects whether the current value has appeared before without comparing it against every earlier position.",
    "note": "",
    "source": "https://leetcode.com/problems/contains-duplicate/",
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "234": {
    "statement": "Return whether the values of an acyclic singly linked list read the same forward and backward.",
    "brute": {
      "name": "Copy values, then compare",
      "time": "O(n)",
      "space": "O(n)",
      "idea": "Store the node values in a list and compare from opposite ends.",
      "code": "class Solution {\n    public boolean isPalindrome(ListNode head) {\n        List<Integer> values = new ArrayList<>();\n        ListNode current = head;\n        while (current != null) {\n            values.add(current.val);\n            current = current.next;\n        }\n        for (int i = 0; i < values.size() / 2; i++) {\n            if (values.get(i) != values.get(values.size() - 1 - i)) return false;\n        }\n        return true;\n    }\n}",
      "label": "Straightforward baseline"
    },
    "improvement": "Reversing the second half preserves linear time while avoiding the extra value buffer. It mutates the teaching input.",
    "note": "",
    "source": "https://leetcode.com/problems/palindrome-linked-list/",
    "constraints": [
      "The number of nodes in the list is in the range [1, 10^5].",
      "0 <= Node.val <= 9"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "239": {
    "statement": "Slide a window of exactly k elements across nums, one position at a time. Return the maximum value in each complete window.",
    "brute": {
      "name": "Scan each window",
      "time": "O(nk)",
      "space": "O(1) + output",
      "idea": "Visit all k elements of each window to find its maximum.",
      "code": "class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        int[] result = new int[nums.length - k + 1];\n        for (int left = 0; left + k <= nums.length; left++) {\n            int maximum = nums[left];\n            for (int j = left + 1; j < left + k; j++) maximum = Math.max(maximum, nums[j]);\n            result[left] = maximum;\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A decreasing deque retains useful candidates and removes each index at most once.",
    "note": "",
    "source": "https://leetcode.com/problems/sliding-window-maximum/",
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= nums.length"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "242": {
    "statement": "Return whether t is a rearrangement of s: both strings must contain exactly the same character multiplicities.",
    "brute": {
      "name": "Match unused characters",
      "time": "O(n²)",
      "space": "O(n)",
      "idea": "For each character of s, find an equal, not-yet-used character in t.",
      "code": "class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        boolean[] used = new boolean[t.length()];\n        for (int i = 0; i < s.length(); i++) {\n            boolean found = false;\n            for (int j = 0; j < t.length(); j++) {\n                if (!used[j] && s.charAt(i) == t.charAt(j)) {\n                    used[j] = true;\n                    found = true;\n                    break;\n                }\n            }\n            if (!found) return false;\n        }\n        return true;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Frequency counts summarize all matching positions and avoid searching for a separate partner for each character.",
    "note": "",
    "source": "https://leetcode.com/problems/valid-anagram/",
    "constraints": [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "303": {
    "statement": "For a fixed nums array, answer each inclusive query [left, right] with the sum from nums[left] through nums[right]. This driver returns all query answers as an array.",
    "brute": {
      "name": "Sum each query directly",
      "time": "O(qn)",
      "space": "O(1) + output",
      "idea": "Loop over every element of each queried range.",
      "code": "class Solution {\n    public int[] rangeSums(int[] nums, int[][] queries) {\n        int[] result = new int[queries.length];\n        for (int q = 0; q < queries.length; q++) {\n            int sum = 0;\n            for (int i = queries[q][0]; i <= queries[q][1]; i++) sum += nums[i];\n            result[q] = sum;\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A prefix array costs O(n) to build and makes each inclusive query a single subtraction.",
    "note": "The LeetCode class API is represented by nums plus a queries array; no updates occur between queries.",
    "source": "https://leetcode.com/problems/range-sum-query-immutable/",
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^5 <= nums[i] <= 10^5",
      "0 <= left <= right < nums.length",
      "At most 10^4 calls will be made to sumRange."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "347": {
    "statement": "Return the k distinct values with the greatest occurrence counts in nums. The selected set is unique; its output order does not matter.",
    "brute": {
      "name": "Recount candidates for each rank",
      "time": "O(kn²)",
      "space": "O(k)",
      "idea": "For each of k results, recount every unselected candidate and take the highest frequency.",
      "code": "class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        Set<Integer> selected = new HashSet<>();\n        int[] result = new int[k];\n        for (int rank = 0; rank < k; rank++) {\n            int best = nums[0];\n            int bestCount = -1;\n            for (int i = 0; i < nums.length; i++) {\n                if (selected.contains(nums[i])) continue;\n                int count = 0;\n                for (int j = 0; j < nums.length; j++) {\n                    if (nums[j] == nums[i]) count++;\n                }\n                if (count > bestCount) {\n                    best = nums[i];\n                    bestCount = count;\n                }\n            }\n            result[rank] = best;\n            selected.add(best);\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Count once and group by frequency, eliminating repeated recounts and rank searches.",
    "note": "",
    "source": "https://leetcode.com/problems/top-k-frequent-elements/",
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "k is in the range [1, the number of unique elements in the array].",
      "It is guaranteed that the answer is unique."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "370": {
    "statement": "Start with length zeros. For each update [start, end, delta], add delta to every index from start through end, inclusive. Return the final array.",
    "brute": {
      "name": "Write every updated cell",
      "time": "O(un)",
      "space": "O(1) + output",
      "idea": "Apply each range update with a direct loop over its affected indices.",
      "code": "class Solution {\n    public int[] getModifiedArray(int length, int[][] updates) {\n        int[] result = new int[length];\n        for (int u = 0; u < updates.length; u++) {\n            for (int i = updates[u][0]; i <= updates[u][1]; i++) result[i] += updates[u][2];\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Each difference-array update writes only two boundary events; one final prefix scan reconstructs all values.",
    "note": "",
    "source": "https://leetcode.com/problems/range-addition/",
    "constraints": [
      "length is a positive integer.",
      "Each update is [start, end, delta] with 0 ≤ start ≤ end < length.",
      "delta is an integer; updates may be empty in this teaching driver."
    ],
    "verified": false,
    "constraintNote": "Original numerical bounds were unavailable from the primary page. These are the teaching input requirements."
  },
  "410": {
    "statement": "Partition nums into exactly k nonempty contiguous groups. Return the smallest possible value of the largest group sum. All values are nonnegative.",
    "brute": {
      "name": "Enumerate cut positions",
      "time": "O(n · C(n−1,k−1))",
      "space": "O(k)",
      "idea": "Recursively try every valid next cut, minimizing the largest resulting group sum.",
      "code": "class Solution {\n    public int splitArray(int[] nums, int k) {\n        return split(nums, 0, k);\n    }\n    private int split(int[] nums, int start, int groups) {\n        if (groups == 1) {\n            int sum = 0;\n            for (int i = start; i < nums.length; i++) sum += nums[i];\n            return sum;\n        }\n        int best = Integer.MAX_VALUE;\n        int sum = 0;\n        for (int end = start; end <= nums.length - groups; end++) {\n            sum += nums[end];\n            int remainder = split(nums, end + 1, groups - 1);\n            best = Math.min(best, Math.max(sum, remainder));\n        }\n        return best;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "For nonnegative values, a greedy feasibility scan plus binary search avoids enumerating partitions.",
    "note": "",
    "source": "https://leetcode.com/problems/split-array-largest-sum/",
    "constraints": [
      "1 <= nums.length <= 1000",
      "0 <= nums[i] <= 10^6",
      "1 <= k <= min(50, nums.length)"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "416": {
    "statement": "Return whether the positive nums values can be split into two disjoint groups with equal sums, using every input element in exactly one group.",
    "brute": {
      "name": "Try including or excluding each value",
      "time": "O(2ⁿ)",
      "space": "O(n)",
      "idea": "If the total is even, recursively enumerate subsets seeking half the total.",
      "code": "class Solution {\n    public boolean canPartition(int[] nums) {\n        int total = 0;\n        for (int i = 0; i < nums.length; i++) total += nums[i];\n        if (total % 2 != 0) return false;\n        return choose(nums, 0, total / 2);\n    }\n    private boolean choose(int[] nums, int index, int remaining) {\n        if (remaining == 0) return true;\n        if (index == nums.length || remaining < 0) return false;\n        return choose(nums, index + 1, remaining - nums[index]) || choose(nums, index + 1, remaining);\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "One-dimensional knapsack remembers reachable sums and shares work across exponentially many subsets.",
    "note": "The brute-force search grows rapidly. Start with the built-in small examples; the trace still obeys the same step, frame and memory limits.",
    "source": "https://leetcode.com/problems/partition-equal-subset-sum/",
    "constraints": [
      "1 <= nums.length <= 200",
      "1 <= nums[i] <= 100"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "424": {
    "statement": "Change at most k uppercase characters in s. Return the maximum length of a contiguous substring that can be made entirely one character.",
    "brute": {
      "name": "Enumerate every substring",
      "time": "O(n²)",
      "space": "O(26)",
      "idea": "For every start, update frequencies and test length minus the most frequent count.",
      "code": "class Solution {\n    public int characterReplacement(String s, int k) {\n        int best = 0;\n        for (int left = 0; left < s.length(); left++) {\n            int[] count = new int[26];\n            int maxFreq = 0;\n            for (int right = left; right < s.length(); right++) {\n                int index = s.charAt(right) - 'A';\n                count[index]++;\n                maxFreq = Math.max(maxFreq, count[index]);\n                if (right - left + 1 - maxFreq <= k) {\n                    best = Math.max(best, right - left + 1);\n                }\n            }\n        }\n        return best;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A moving window retains its frequency state and avoids examining every pair of endpoints.",
    "note": "",
    "source": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of only uppercase English letters.",
      "0 <= k <= s.length"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "496": {
    "statement": "For each value in nums1, find that value in nums2 and return the first strictly greater value to its right, or −1. Values are distinct and nums1 is a subset of nums2.",
    "brute": {
      "name": "Locate and scan each query",
      "time": "O(mn)",
      "space": "O(1) + output",
      "idea": "Locate each queried value, then scan its suffix for a greater value.",
      "code": "class Solution {\n    public int[] nextGreaterElement(int[] nums1, int[] nums2) {\n        int[] result = new int[nums1.length];\n        for (int i = 0; i < nums1.length; i++) {\n            result[i] = -1;\n            int position = 0;\n            while (nums2[position] != nums1[i]) position++;\n            for (int j = position + 1; j < nums2.length; j++) {\n                if (nums2[j] > nums1[i]) {\n                    result[i] = nums2[j];\n                    break;\n                }\n            }\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A monotonic stack precomputes all next-greater relationships in one pass over nums2.",
    "note": "",
    "source": "https://leetcode.com/problems/next-greater-element-i/",
    "constraints": [
      "1 <= nums1.length <= nums2.length <= 1000",
      "0 <= nums1[i], nums2[i] <= 10^4",
      "All integers in nums1 and nums2 are unique.",
      "All the integers of nums1 also appear in nums2."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "503": {
    "statement": "Treat nums as circular. For each position, return the first strictly greater value encountered while moving forward at most one cycle, or −1 if none exists.",
    "brute": {
      "name": "Circular suffix scan per index",
      "time": "O(n²)",
      "space": "O(1) + output",
      "idea": "Try all next n−1 circular positions for each index.",
      "code": "class Solution {\n    public int[] nextGreaterElements(int[] nums) {\n        int[] result = new int[nums.length];\n        for (int i = 0; i < nums.length; i++) {\n            result[i] = -1;\n            for (int step = 1; step < nums.length; step++) {\n                int j = (i + step) % nums.length;\n                if (nums[j] > nums[i]) {\n                    result[i] = nums[j];\n                    break;\n                }\n            }\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A two-pass stack resolves all indices without restarting the circular scan for each one.",
    "note": "",
    "source": "https://leetcode.com/problems/next-greater-element-ii/",
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "523": {
    "statement": "Return whether a contiguous subarray of at least two elements has a sum that is a multiple of positive k. A sum of zero is a multiple of k.",
    "brute": {
      "name": "Try every length-at-least-two range",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "Accumulate sums for all endpoint pairs and check both divisibility and length.",
      "code": "class Solution {\n    public boolean checkSubarraySum(int[] nums, int k) {\n        for (int left = 0; left < nums.length; left++) {\n            long sum = 0;\n            for (int right = left; right < nums.length; right++) {\n                sum += nums[right];\n                if (right - left + 1 >= 2 && sum % k == 0) return true;\n            }\n        }\n        return false;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "An earliest-index map of prefix remainders proves divisibility and the required gap in one scan.",
    "note": "",
    "source": "https://leetcode.com/problems/continuous-subarray-sum/",
    "constraints": [
      "1 <= nums.length <= 10^5",
      "0 <= nums[i] <= 10^9",
      "0 <= sum(nums[i]) <= 2^31 - 1",
      "1 <= k <= 2^31 - 1"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "547": {
    "statement": "isConnected is a symmetric adjacency matrix of cities, with diagonal ones. Return the number of connected components, including isolated cities.",
    "brute": {
      "name": "Compute all-pairs connectivity",
      "time": "O(n³)",
      "space": "O(n²)",
      "idea": "Use transitive closure to find every reachable pair, then count previously unseen components.",
      "code": "class Solution {\n    public int findCircleNum(int[][] isConnected) {\n        int n = isConnected.length;\n        boolean[][] reach = new boolean[n][n];\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) reach[i][j] = isConnected[i][j] == 1;\n        }\n        for (int mid = 0; mid < n; mid++) {\n            for (int i = 0; i < n; i++) {\n                for (int j = 0; j < n; j++) reach[i][j] = reach[i][j] || (reach[i][mid] && reach[mid][j]);\n            }\n        }\n        boolean[] seen = new boolean[n];\n        int count = 0;\n        for (int i = 0; i < n; i++) {\n            if (seen[i]) continue;\n            count++;\n            for (int j = 0; j < n; j++) {\n                if (reach[i][j]) seen[j] = true;\n            }\n        }\n        return count;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Union-find processes the matrix’s connections without materializing every indirect reachable pair.",
    "note": "",
    "source": "https://leetcode.com/problems/number-of-provinces/",
    "constraints": [
      "1 <= n <= 200",
      "n == isConnected.length",
      "n == isConnected[i].length",
      "isConnected[i][j] is 1 or 0.",
      "isConnected[i][i] == 1",
      "isConnected[i][j] == isConnected[j][i]"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "560": {
    "statement": "Count the nonempty contiguous subarrays whose sum is exactly k. Negative values and zero are allowed.",
    "brute": {
      "name": "Enumerate subarray endpoints",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "Start a fresh running sum at each left endpoint and test each right endpoint.",
      "code": "class Solution {\n    public int subarraySum(int[] nums, int k) {\n        int count = 0;\n        for (int left = 0; left < nums.length; left++) {\n            int sum = 0;\n            for (int right = left; right < nums.length; right++) {\n                sum += nums[right];\n                if (sum == k) count++;\n            }\n        }\n        return count;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Count earlier prefix sums equal to currentSum − k instead of enumerating every start.",
    "note": "",
    "source": "https://leetcode.com/problems/subarray-sum-equals-k/",
    "constraints": [
      "1 <= nums.length <= 2 * 10^4",
      "-1000 <= nums[i] <= 1000",
      "-10^7 <= k <= 10^7"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "567": {
    "statement": "Return whether some contiguous substring of s2 has exactly the same character frequencies as s1. The teaching extension treats the empty s1 as a match.",
    "brute": {
      "name": "Recount every candidate window",
      "time": "O(nm + 26n)",
      "space": "O(26)",
      "idea": "For each possible start in s2, rebuild all frequencies across the m-character candidate.",
      "code": "class Solution {\n    public boolean checkInclusion(String s1, String s2) {\n        int[] need = new int[26];\n        for (int i = 0; i < s1.length(); i++) need[s1.charAt(i) - 'a']++;\n        for (int start = 0; start + s1.length() <= s2.length(); start++) {\n            int[] count = new int[26];\n            for (int j = 0; j < s1.length(); j++) count[s2.charAt(start + j) - 'a']++;\n            if (Arrays.equals(need, count)) return true;\n        }\n        return false;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "The fixed window adds one incoming and removes one outgoing character instead of recounting m characters.",
    "note": "",
    "source": "https://leetcode.com/problems/permutation-in-string/",
    "constraints": [
      "1 <= s1.length, s2.length <= 10^4",
      "s1 and s2 consist of lowercase English letters."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "700": {
    "statement": "Given a binary search tree and val, return the subtree reference rooted at the matching node, or null if it is absent.",
    "brute": {
      "name": "Search both subtrees",
      "time": "O(n)",
      "space": "O(h)",
      "idea": "Ignore BST ordering and search both children recursively.",
      "code": "class Solution {\n    public TreeNode searchBST(TreeNode root, int val) {\n        if (root == null || root.val == val) return root;\n        TreeNode found = searchBST(root.left, val);\n        if (found != null) return found;\n        return searchBST(root.right, val);\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "BST ordering identifies a single possible child at each step, reducing the work to tree height.",
    "note": "",
    "source": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    "constraints": [
      "The number of nodes in the tree is in the range [1, 5000].",
      "1 <= Node.val <= 10^7",
      "root is a binary search tree.",
      "1 <= val <= 10^7"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "704": {
    "statement": "Return the zero-based position of target in an ascending array of distinct integers, or −1 if it is absent.",
    "brute": {
      "name": "Linear scan",
      "time": "O(n)",
      "space": "O(1)",
      "idea": "Check each position in input order.",
      "code": "class Solution {\n    public int search(int[] nums, int target) {\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] == target) return i;\n        }\n        return -1;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "The ordering invariant lets binary search discard half of the remaining candidate interval.",
    "note": "",
    "source": "https://leetcode.com/problems/binary-search/",
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "724": {
    "statement": "Return the leftmost index where the sum of values strictly to its left equals the sum strictly to its right. Return −1 if no index qualifies.",
    "brute": {
      "name": "Resum both sides at each index",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "For every pivot candidate, independently sum its left and right sides.",
      "code": "class Solution {\n    public int pivotIndex(int[] nums) {\n        for (int pivot = 0; pivot < nums.length; pivot++) {\n            int left = 0;\n            int right = 0;\n            for (int i = 0; i < pivot; i++) left += nums[i];\n            for (int i = pivot + 1; i < nums.length; i++) right += nums[i];\n            if (left == right) return pivot;\n        }\n        return -1;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A total sum and one advancing left sum recover the right sum in constant time per index.",
    "note": "",
    "source": "https://leetcode.com/problems/find-pivot-index/",
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-1000 <= nums[i] <= 1000"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "739": {
    "statement": "For each day, return how many days must pass to reach a strictly warmer temperature. Return 0 when no later day is warmer.",
    "brute": {
      "name": "Search forward from each day",
      "time": "O(n²)",
      "space": "O(1) + output",
      "idea": "For every day, scan later temperatures until finding a warmer one.",
      "code": "class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        int[] result = new int[temperatures.length];\n        for (int i = 0; i < temperatures.length; i++) {\n            for (int j = i + 1; j < temperatures.length; j++) {\n                if (temperatures[j] > temperatures[i]) {\n                    result[i] = j - i;\n                    break;\n                }\n            }\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A decreasing stack resolves each waiting index at most once.",
    "note": "",
    "source": "https://leetcode.com/problems/daily-temperatures/",
    "constraints": [
      "1 <= temperatures.length <= 10^5",
      "30 <= temperatures[i] <= 100"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "743": {
    "statement": "times contains directed edges [from, to, travelTime] between nodes 1 through n. Send a signal from k. Return the time until every node receives it, or −1 if any node is unreachable.",
    "brute": {
      "name": "Relax every edge repeatedly",
      "time": "O(VE)",
      "space": "O(V)",
      "idea": "Bellman–Ford scans all edges for up to V−1 rounds, updating tentative distances.",
      "code": "class Solution {\n    public int networkDelayTime(int[][] times, int n, int k) {\n        int[] dist = new int[n];\n        Arrays.fill(dist, 1000000000);\n        dist[k - 1] = 0;\n        for (int round = 1; round < n; round++) {\n            for (int i = 0; i < times.length; i++) {\n                int from = times[i][0] - 1;\n                int to = times[i][1] - 1;\n                if (dist[from] < 1000000000) dist[to] = Math.min(dist[to], dist[from] + times[i][2]);\n            }\n        }\n        int answer = 0;\n        for (int i = 0; i < n; i++) {\n            if (dist[i] == 1000000000) return -1;\n            answer = Math.max(answer, dist[i]);\n        }\n        return answer;\n    }\n}",
      "label": "Straightforward baseline"
    },
    "improvement": "Nonnegative weights allow Dijkstra finalization. This visualizer uses dense O(V²+E) Dijkstra; Bellman–Ford can be competitive on very sparse small inputs.",
    "note": "",
    "source": "https://leetcode.com/problems/network-delay-time/",
    "constraints": [
      "1 <= k <= n <= 100",
      "1 <= times.length <= 6000",
      "times[i].length == 3",
      "1 <= u_i, v_i <= n",
      "u_i != v_i",
      "0 <= w_i <= 100",
      "All the pairs (u_i, v_i) are unique. (i.e., no multiple edges.)"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "774": {
    "statement": "Insert k new stations anywhere between the existing sorted stations. Minimize the largest adjacent gap and return that distance as an approximation.",
    "brute": {
      "name": "Enumerate station allocations",
      "time": "O(g · C(k+g−1,g−1))",
      "space": "O(g)",
      "idea": "Try every distribution of k stations over g gaps. For a fixed allocation, equally space each gap’s new stations.",
      "code": "class Solution {\n    public double minmaxGasDist(int[] stations, int k) {\n        return allocate(stations, 0, k);\n    }\n    private double allocate(int[] stations, int gap, int remaining) {\n        double length = stations[gap + 1] - stations[gap];\n        if (gap == stations.length - 2) return length / (remaining + 1);\n        double best = (double) stations[stations.length - 1] - stations[0];\n        for (int used = 0; used <= remaining; used++) {\n            double current = length / (used + 1);\n            double rest = allocate(stations, gap + 1, remaining - used);\n            best = Math.min(best, Math.max(current, rest));\n        }\n        return best;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Bisection tests a gap threshold without enumerating allocations. Use tiny k and gap counts for brute force.",
    "note": "Try only a few gaps and a small k for allocation enumeration; the efficient solution performs 40 bisections.",
    "source": "https://leetcode.com/problems/minimize-max-distance-to-gas-station/",
    "constraints": [
      "At least two station positions, sorted strictly increasingly.",
      "k is a nonnegative integer; new stations may be placed at noninteger coordinates.",
      "The teaching comparison accepts an absolute error up to 10^−6."
    ],
    "verified": false,
    "constraintNote": "Original numerical bounds were unavailable from the primary page. These are the teaching input requirements."
  },
  "875": {
    "statement": "Koko chooses a positive eating speed. Each hour she works on one pile, eating up to that speed. Return the minimum speed that finishes all piles within h hours.",
    "brute": {
      "name": "Try speeds one by one",
      "time": "O(nM)",
      "space": "O(1)",
      "idea": "Test every integer speed from 1 to the largest pile M using ceiling division.",
      "code": "class Solution {\n    public int minEatingSpeed(int[] piles, int h) {\n        int maximum = 0;\n        for (int i = 0; i < piles.length; i++) maximum = Math.max(maximum, piles[i]);\n        for (int speed = 1; speed <= maximum; speed++) {\n            long hours = 0;\n            for (int i = 0; i < piles.length; i++) hours += (piles[i] + speed - 1) / speed;\n            if (hours <= h) return speed;\n        }\n        return maximum;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Feasibility is monotonic in speed, so binary search replaces M candidate tests with log M tests.",
    "note": "Keep candidate values small for the brute-force trace. Large values can reach the shared trace budget before finishing.",
    "source": "https://leetcode.com/problems/koko-eating-bananas/",
    "constraints": [
      "1 <= piles.length <= 10^4",
      "piles.length <= h <= 10^9",
      "1 <= piles[i] <= 10^9"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "876": {
    "statement": "Return the middle node reference of an acyclic singly linked list. For even length, return the second middle. The visualizer also accepts an empty list and returns null.",
    "brute": {
      "name": "Count, then walk halfway",
      "time": "O(n)",
      "space": "O(1)",
      "idea": "Count all nodes, then advance floor(length/2) steps from the head.",
      "code": "class Solution {\n    public ListNode middleNode(ListNode head) {\n        int length = 0;\n        ListNode current = head;\n        while (current != null) {\n            length++;\n            current = current.next;\n        }\n        current = head;\n        for (int i = 0; i < length / 2; i++) current = current.next;\n        return current;\n    }\n}",
      "label": "Straightforward baseline"
    },
    "improvement": "Both are linear with constant space; fast/slow pointers obtain the middle in one traversal.",
    "note": "",
    "source": "https://leetcode.com/problems/middle-of-the-linked-list/",
    "constraints": [
      "The number of nodes in the list is in the range [1, 100].",
      "1 <= Node.val <= 100"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "901": {
    "statement": "For each daily price, return the length of the consecutive suffix ending today whose prices are all at most today’s price. The driver returns all spans in one array.",
    "brute": {
      "name": "Walk backward for each price",
      "time": "O(n²)",
      "space": "O(1) + output",
      "idea": "Count consecutive earlier prices while they are no greater than today’s price.",
      "code": "class Solution {\n    public int[] stockSpans(int[] prices) {\n        int[] result = new int[prices.length];\n        for (int i = 0; i < prices.length; i++) {\n            int j = i;\n            while (j >= 0 && prices[j] <= prices[i]) j--;\n            result[i] = i - j;\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A decreasing stack skips whole stretches already known to be no greater.",
    "note": "The original repeated StockSpanner.next(price) calls are represented by one prices array.",
    "source": "https://leetcode.com/problems/online-stock-span/",
    "constraints": [
      "1 <= price <= 10^5",
      "At most 10^4 calls will be made to next."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "904": {
    "statement": "Choose a contiguous run of fruit trees containing at most two distinct fruit types. Return the largest number of trees in such a run.",
    "brute": {
      "name": "Restart a distinct-type set",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "Grow from each start until a third fruit type enters.",
      "code": "class Solution {\n    public int totalFruit(int[] fruits) {\n        int best = 0;\n        for (int left = 0; left < fruits.length; left++) {\n            Set<Integer> types = new HashSet<>();\n            for (int right = left; right < fruits.length; right++) {\n                types.add(fruits[right]);\n                if (types.size() > 2) break;\n                best = Math.max(best, right - left + 1);\n            }\n        }\n        return best;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Maintaining one frequency map lets the left boundary remove types instead of restarting.",
    "note": "",
    "source": "https://leetcode.com/problems/fruit-into-baskets/",
    "constraints": [
      "1 <= fruits.length <= 10^5",
      "0 <= fruits[i] < fruits.length"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "930": {
    "statement": "Count the nonempty contiguous subarrays of a binary array whose sum is exactly goal.",
    "brute": {
      "name": "Enumerate subarray endpoints",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "Start a fresh running sum at each left endpoint and test each right endpoint.",
      "code": "class Solution {\n    public int numSubarraysWithSum(int[] nums, int goal) {\n        int count = 0;\n        for (int left = 0; left < nums.length; left++) {\n            int sum = 0;\n            for (int right = left; right < nums.length; right++) {\n                sum += nums[right];\n                if (sum == goal) count++;\n            }\n        }\n        return count;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Prefix-frequency counts handle all starts at once, including repeated prefixes caused by zeros.",
    "note": "",
    "source": "https://leetcode.com/problems/binary-subarrays-with-sum/",
    "constraints": [
      "1 <= nums.length <= 3 * 10^4",
      "nums[i] is either 0 or 1.",
      "0 <= goal <= nums.length"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "974": {
    "statement": "Count the nonempty contiguous subarrays whose sum is divisible by the positive integer k.",
    "brute": {
      "name": "Enumerate subarray endpoints",
      "time": "O(n²)",
      "space": "O(1)",
      "idea": "Start a fresh running sum at each left endpoint and test each right endpoint.",
      "code": "class Solution {\n    public int subarraysDivByK(int[] nums, int k) {\n        int count = 0;\n        for (int left = 0; left < nums.length; left++) {\n            int sum = 0;\n            for (int right = left; right < nums.length; right++) {\n                sum += nums[right];\n                if (sum % k == 0) count++;\n            }\n        }\n        return count;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Equal normalized prefix remainders identify divisible ranges without examining every endpoint pair.",
    "note": "",
    "source": "https://leetcode.com/problems/subarray-sums-divisible-by-k/",
    "constraints": [
      "1 <= nums.length <= 3 * 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "2 <= k <= 10^4"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "1011": {
    "statement": "Ship positive package weights in their original order over at most days days. Return the smallest daily capacity that makes this possible.",
    "brute": {
      "name": "Try every capacity",
      "time": "O(nS)",
      "space": "O(1)",
      "idea": "Start at the heaviest package and test capacities up to total weight S.",
      "code": "class Solution {\n    public int shipWithinDays(int[] weights, int days) {\n        int maximum = 0;\n        int total = 0;\n        for (int i = 0; i < weights.length; i++) {\n            maximum = Math.max(maximum, weights[i]);\n            total += weights[i];\n        }\n        for (int capacity = maximum; capacity <= total; capacity++) {\n            int used = 1;\n            int load = 0;\n            for (int i = 0; i < weights.length; i++) {\n                if (load + weights[i] > capacity) {\n                    used++;\n                    load = 0;\n                }\n                load += weights[i];\n            }\n            if (used <= days) return capacity;\n        }\n        return total;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Larger capacity never needs more days, enabling a binary search over the same feasible boundary.",
    "note": "Keep candidate values small for the brute-force trace. Large values can reach the shared trace budget before finishing.",
    "source": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
    "constraints": [
      "1 <= days <= weights.length <= 5 * 10^4",
      "1 <= weights[i] <= 500"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "1094": {
    "statement": "Each trip is [passengers, from, to]; passengers occupy seats on the half-open route [from, to). Return whether every location fits the given capacity.",
    "brute": {
      "name": "Check every location against every trip",
      "time": "O(tU)",
      "space": "O(1)",
      "idea": "At each integer location up to the last drop-off U, sum all trips active there.",
      "code": "class Solution {\n    public boolean carPooling(int[][] trips, int capacity) {\n        int last = 0;\n        for (int t = 0; t < trips.length; t++) last = Math.max(last, trips[t][2]);\n        for (int position = 0; position < last; position++) {\n            int passengers = 0;\n            for (int t = 0; t < trips.length; t++) {\n                if (trips[t][1] <= position && position < trips[t][2]) passengers += trips[t][0];\n            }\n            if (passengers > capacity) return false;\n        }\n        return true;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Boarding and drop-off events replace the inner trip scan with one cumulative passenger count.",
    "note": "",
    "source": "https://leetcode.com/problems/car-pooling/",
    "constraints": [
      "1 <= trips.length <= 1000",
      "trips[i].length == 3",
      "1 <= numPassengers_i <= 100",
      "0 <= from_i < to_i <= 1000",
      "1 <= capacity <= 10^5"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "1109": {
    "statement": "Flights are numbered 1 through n. Each booking [first, last, seats] reserves seats on every flight in that inclusive range. Return seats booked per flight.",
    "brute": {
      "name": "Apply bookings flight by flight",
      "time": "O(bn)",
      "space": "O(1) + output",
      "idea": "For each booking, increment every affected flight.",
      "code": "class Solution {\n    public int[] corpFlightBookings(int[][] bookings, int n) {\n        int[] result = new int[n];\n        for (int b = 0; b < bookings.length; b++) {\n            for (int flight = bookings[b][0]; flight <= bookings[b][1]; flight++) result[flight - 1] += bookings[b][2];\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A difference array records each booking in constant work and accumulates totals in one scan.",
    "note": "",
    "source": "https://leetcode.com/problems/corporate-flight-bookings/",
    "constraints": [
      "1 <= n <= 2 * 10^4",
      "1 <= bookings.length <= 2 * 10^4",
      "bookings[i].length == 3",
      "1 <= first_i <= last_i <= n",
      "1 <= seats_i <= 10^4"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "1143": {
    "statement": "Return the length of the longest sequence appearing in both strings in the same relative order, with gaps allowed. Return 0 if there is no common character.",
    "brute": {
      "name": "Explore both skip choices recursively",
      "time": "O(2^(m+n))",
      "space": "O(m+n)",
      "idea": "When characters differ, try skipping one from either string; when equal, take the match.",
      "code": "class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        return length(text1, text2, text1.length(), text2.length());\n    }\n    private int length(String a, String b, int i, int j) {\n        if (i == 0 || j == 0) return 0;\n        if (a.charAt(i - 1) == b.charAt(j - 1)) return 1 + length(a, b, i - 1, j - 1);\n        return Math.max(length(a, b, i - 1, j), length(a, b, i, j - 1));\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A table stores the answer for every pair of prefix lengths, avoiding repeated recursive subproblems.",
    "note": "The brute-force search grows rapidly. Start with the built-in small examples; the trace still obeys the same step, frame and memory limits.",
    "source": "https://leetcode.com/problems/longest-common-subsequence/",
    "constraints": [
      "1 <= text1.length, text2.length <= 1000",
      "text1 and text2 consist of only lowercase English characters."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "1283": {
    "statement": "Choose a positive divisor. Divide each positive nums value and round upward, then sum. Return the smallest divisor whose sum does not exceed threshold.",
    "brute": {
      "name": "Try every divisor",
      "time": "O(nM)",
      "space": "O(1)",
      "idea": "Test divisors from 1 through the largest value M.",
      "code": "class Solution {\n    public int smallestDivisor(int[] nums, int threshold) {\n        int maximum = 0;\n        for (int i = 0; i < nums.length; i++) maximum = Math.max(maximum, nums[i]);\n        for (int divisor = 1; divisor <= maximum; divisor++) {\n            long sum = 0;\n            for (int i = 0; i < nums.length; i++) sum += (nums[i] + divisor - 1) / divisor;\n            if (sum <= threshold) return divisor;\n        }\n        return maximum;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "The ceiling-sum decreases as the divisor grows, allowing logarithmic boundary search.",
    "note": "Keep candidate values small for the brute-force trace. Large values can reach the shared trace budget before finishing.",
    "source": "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
    "constraints": [
      "1 <= nums.length <= 5 * 10^4",
      "1 <= nums[i] <= 10^6",
      "nums.length <= threshold <= 10^6"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "1482": {
    "statement": "Flower i blooms on bloomDay[i]. Make m bouquets, each using k adjacent, previously unused flowers. Return the earliest possible day, or −1 if impossible.",
    "brute": {
      "name": "Test each day in order",
      "time": "O(nD)",
      "space": "O(1)",
      "idea": "Scan days from the earliest bloom to the latest bloom, counting disjoint adjacent groups each time.",
      "code": "class Solution {\n    public int minDays(int[] bloomDay, int m, int k) {\n        if ((long) m * k > bloomDay.length) return -1;\n        int first = Integer.MAX_VALUE;\n        int last = 0;\n        for (int i = 0; i < bloomDay.length; i++) {\n            first = Math.min(first, bloomDay[i]);\n            last = Math.max(last, bloomDay[i]);\n        }\n        for (int day = first; day <= last; day++) {\n            int run = 0;\n            int bouquets = 0;\n            for (int i = 0; i < bloomDay.length; i++) {\n                if (bloomDay[i] <= day) run++;\n                else run = 0;\n                if (run == k) {\n                    bouquets++;\n                    run = 0;\n                }\n            }\n            if (bouquets >= m) return day;\n        }\n        return -1;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Bouquet feasibility only changes from false to true; binary search replaces D day scans with log D scans.",
    "note": "Keep candidate values small for the brute-force trace. Large values can reach the shared trace budget before finishing.",
    "source": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
    "constraints": [
      "bloomDay.length == n",
      "1 <= n <= 10^5",
      "1 <= bloomDay[i] <= 10^9",
      "1 <= m <= 10^6",
      "1 <= k <= n"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "1584": {
    "statement": "Connect all given 2D points with minimum total cost. An edge costs the Manhattan distance |x1−x2| + |y1−y2|. Every point must be reachable from every other point.",
    "brute": {
      "name": "Rescan every crossing edge",
      "time": "O(n³)",
      "space": "O(n)",
      "idea": "Grow a tree; at each addition, recompute all edges from chosen points to unchosen points and select the cheapest.",
      "code": "class Solution {\n    public int minCostConnectPoints(int[][] points) {\n        boolean[] used = new boolean[points.length];\n        used[0] = true;\n        int total = 0;\n        for (int count = 1; count < points.length; count++) {\n            int best = Integer.MAX_VALUE;\n            int next = -1;\n            for (int from = 0; from < points.length; from++) {\n                if (!used[from]) continue;\n                for (int to = 0; to < points.length; to++) {\n                    if (used[to]) continue;\n                    int distance = Math.abs(points[from][0] - points[to][0]) + Math.abs(points[from][1] - points[to][1]);\n                    if (distance < best) {\n                        best = distance;\n                        next = to;\n                    }\n                }\n            }\n            used[next] = true;\n            total += best;\n        }\n        return total;\n    }\n}",
      "label": "Straightforward baseline"
    },
    "improvement": "Both use Prim’s cut property. Keeping each point’s cheapest connection avoids recomputing the full cut on every round.",
    "note": "",
    "source": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
    "constraints": [
      "1 <= points.length <= 1000",
      "-10^6 <= x_i, y_i <= 10^6",
      "All pairs (x_i, y_i) are distinct."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "1893": {
    "statement": "Return whether every integer from left through right is contained in at least one of the inclusive ranges.",
    "brute": {
      "name": "Check each integer against all ranges",
      "time": "O(rU)",
      "space": "O(1)",
      "idea": "For each required integer, look for any range that covers it.",
      "code": "class Solution {\n    public boolean isCovered(int[][] ranges, int left, int right) {\n        for (int value = left; value <= right; value++) {\n            boolean covered = false;\n            for (int i = 0; i < ranges.length; i++) {\n                if (ranges[i][0] <= value && value <= ranges[i][1]) covered = true;\n            }\n            if (!covered) return false;\n        }\n        return true;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "Endpoint events compute coverage counts for all positions together instead of rescanning the ranges.",
    "note": "",
    "source": "https://leetcode.com/problems/check-if-all-the-integers-in-a-range-are-covered/",
    "constraints": [
      "1 <= ranges.length <= 50",
      "1 <= start_i <= end_i <= 50",
      "1 <= left <= right <= 50"
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "1943": {
    "statement": "Each segment [start, end, color] paints the half-open interval [start, end) with a distinct color. Return nonempty spans of constant color mixture, represented by the sum of their active colors.",
    "brute": {
      "name": "Rescan segments between endpoints",
      "time": "O(s²)",
      "space": "O(s) + output",
      "idea": "Sort all endpoints; for each consecutive distinct pair, scan all segments to sum active colors.",
      "code": "class Solution {\n    public List<List<Long>> splitPainting(int[][] segments) {\n        int[] points = new int[segments.length * 2];\n        for (int i = 0; i < segments.length; i++) {\n            points[2 * i] = segments[i][0];\n            points[2 * i + 1] = segments[i][1];\n        }\n        Arrays.sort(points);\n        List<List<Long>> result = new ArrayList<>();\n        for (int i = 0; i < points.length - 1; i++) {\n            int start = points[i];\n            int end = points[i + 1];\n            if (start == end) continue;\n            long color = 0;\n            for (int j = 0; j < segments.length; j++) {\n                if (segments[j][0] <= start && end <= segments[j][1]) color += segments[j][2];\n            }\n            if (color > 0) result.add(Arrays.asList((long) start, (long) end, color));\n        }\n        return result;\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A sweep accumulates signed changes at endpoints instead of recalculating the entire mixture for each span.",
    "note": "",
    "source": "https://leetcode.com/problems/describe-the-painting/",
    "constraints": [
      "1 <= segments.length <= 2 * 10^4",
      "segments[i].length == 3",
      "1 <= start_i < end_i <= 10^5",
      "1 <= color_i <= 10^9",
      "Each color_i is distinct."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  },
  "2381": {
    "statement": "Apply shifts [start, end, direction] to lowercase s over inclusive ranges. Direction 1 moves letters forward, 0 backward; alphabet shifts wrap. Return the final string.",
    "brute": {
      "name": "Shift every affected character",
      "time": "O(qn)",
      "space": "O(n)",
      "idea": "For each shift, visit every character in its inclusive range and move it one alphabet position.",
      "code": "class Solution {\n    public String shiftingLetters(String s, int[][] shifts) {\n        char[] result = s.toCharArray();\n        for (int q = 0; q < shifts.length; q++) {\n            int delta = shifts[q][2] == 1 ? 1 : -1;\n            for (int i = shifts[q][0]; i <= shifts[q][1]; i++) {\n                int index = result[i] - 'a';\n                result[i] = (char) ('a' + (index + delta + 26) % 26);\n            }\n        }\n        return new String(result);\n    }\n}",
      "label": "Brute force"
    },
    "improvement": "A difference array combines all range shifts before changing each character exactly once.",
    "note": "",
    "source": "https://leetcode.com/problems/shifting-letters-ii/",
    "constraints": [
      "1 <= s.length, shifts.length <= 5 * 10^4",
      "shifts[i].length == 3",
      "0 <= start_i <= end_i < s.length",
      "0 <= direction_i <= 1",
      "s consists of lowercase English letters."
    ],
    "verified": true,
    "constraintNote": "LeetCode bounds checked 18 Nov 2026. Use smaller inputs for interactive traces."
  }
};
