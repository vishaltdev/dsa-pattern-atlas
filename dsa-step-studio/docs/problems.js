import {extraPatterns, extraProblems} from './more-problems.js?v=all-patterns-2';
const code = (s) => `class Solution {\n${s}\n}`;
export const patterns={
 'Sliding window':{when:'Use for contiguous subarrays or substrings when you can update a running state as the boundaries move.',invariant:'The state describes exactly the current window. Expand right; shrink left until the window is valid.',caution:'A shrinking sum window usually needs nonnegative values. Negative values can break the monotonic rule.'},
 'Two pointers':{when:'Use when two positions can eliminate candidates: sorted pair search, opposite ends, or in-place compaction.',invariant:'Every pointer move must safely discard candidates that cannot improve the answer.',caution:'Sorting can change original indices. Duplicate skipping and the left < right boundary deserve special care.'}
};
export const problems=[
{id:3,title:'Longest Substring Without Repeating Characters',short:'Longest unique substring',pattern:'Sliding window',difficulty:'Medium',time:'O(n)',space:'O(min(n, alphabet))',desc:'Find the length of the longest substring with no repeated characters.',input:{s:'abcabcbb'},examples:[{s:'abcabcbb'},{s:'bbbbb'},{s:''}],expected:[3,1,0],focus:'The set contains only the current window. Remove characters from the left until the incoming character is unique.',pitfall:'A single if is insufficient: the duplicate may be several characters inside the window.',code:code(`    public int lengthOfLongestSubstring(String s) {
        Set<Character> window = new HashSet<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            while (window.contains(c)) {
                window.remove(s.charAt(left));
                left++;
            }
            window.add(c);
            best = Math.max(best, right - left + 1);
        }
        return best;
    }`)},
{id:76,title:'Minimum Window Substring',short:'Minimum window substring',pattern:'Sliding window',difficulty:'Hard',time:'O(n + m)',space:'O(alphabet)',desc:'Return the shortest substring of s containing every character of t, including duplicates.',input:{s:'ADOBECODEBANC',t:'ABC'},examples:[{s:'ADOBECODEBANC',t:'ABC'},{s:'a',t:'aa'},{s:'aa',t:'aa'}],expected:['BANC','','aa'],focus:'missing counts the remaining required characters, including multiplicity. Shrink only when missing reaches zero.',pitfall:'Surplus characters may have negative counts. Removing a required character makes missing positive again.',code:code(`    public String minWindow(String s, String t) {
        if (t.length() == 0) return "";
        Map<Character, Integer> need = new HashMap<>();
        for (int i = 0; i < t.length(); i++) {
            char c = t.charAt(i);
            need.put(c, need.getOrDefault(c, 0) + 1);
        }
        int missing = t.length();
        int left = 0;
        int start = 0;
        int best = Integer.MAX_VALUE;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (need.getOrDefault(c, 0) > 0) missing--;
            need.put(c, need.getOrDefault(c, 0) - 1);
            while (missing == 0) {
                if (right - left + 1 < best) {
                    best = right - left + 1;
                    start = left;
                }
                char out = s.charAt(left);
                need.put(out, need.getOrDefault(out, 0) + 1);
                if (need.get(out) > 0) missing++;
                left++;
            }
        }
        if (best == Integer.MAX_VALUE) return "";
        return s.substring(start, start + best);
    }`)},
{id:209,title:'Minimum Size Subarray Sum',short:'Minimum size subarray sum',pattern:'Sliding window',difficulty:'Medium',time:'O(n)',space:'O(1)',desc:'For positive integers, find the shortest contiguous subarray with sum at least target. Return 0 if none exists.',input:{target:7,nums:[2,3,1,2,4,3]},examples:[{target:7,nums:[2,3,1,2,4,3]},{target:4,nums:[1,4,4]},{target:11,nums:[1,1,1,1]}],expected:[2,1,0],focus:'Positive values make the sum monotonic: adding to the right increases it, removing from the left decreases it.',pitfall:'Record the valid window before shrinking it. This technique does not directly work with negative numbers.',code:code(`    public int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int sum = 0;
        int best = Integer.MAX_VALUE;
        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            while (sum >= target) {
                best = Math.min(best, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }
        return best == Integer.MAX_VALUE ? 0 : best;
    }`)},
{id:424,title:'Longest Repeating Character Replacement',short:'Repeating character replacement',pattern:'Sliding window',difficulty:'Medium',time:'O(n)',space:'O(26)',desc:'For uppercase A–Z, find the longest substring that can become one repeated character with at most k replacements.',input:{s:'AABABBA',k:1},examples:[{s:'AABABBA',k:1},{s:'ABAB',k:2},{s:'',k:0}],expected:[4,4,0],focus:'Window length minus its most frequent character count is the number of replacements needed.',pitfall:'maxFreq is a historical maximum here. It can overestimate the current frequency; the maximum-length proof still holds.',code:code(`    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int left = 0;
        int maxFreq = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            int index = s.charAt(right) - 'A';
            count[index]++;
            maxFreq = Math.max(maxFreq, count[index]);
            while (right - left + 1 - maxFreq > k) {
                count[s.charAt(left) - 'A']--;
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }`)},
{id:567,title:'Permutation in String',short:'Permutation in string',pattern:'Sliding window',difficulty:'Medium',time:'O(26n)',space:'O(26)',desc:'For lowercase a–z, determine whether s2 contains a permutation of s1.',input:{s1:'ab',s2:'eidbaooo'},examples:[{s1:'ab',s2:'eidbaooo'},{s1:'ab',s2:'eidboaoo'},{s1:'abc',s2:'a'}],expected:[true,false,false],focus:'A fixed-length window is a permutation precisely when all 26 character frequencies match.',pitfall:'Compare only after the window reaches s1.length(). Remove the outgoing character as the right side advances.',code:code(`    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() == 0) return true;
        if (s1.length() > s2.length()) return false;
        int[] need = new int[26];
        int[] count = new int[26];
        for (int i = 0; i < s1.length(); i++) {
            need[s1.charAt(i) - 'a']++;
        }
        int left = 0;
        for (int right = 0; right < s2.length(); right++) {
            count[s2.charAt(right) - 'a']++;
            if (right - left + 1 > s1.length()) {
                count[s2.charAt(left) - 'a']--;
                left++;
            }
            if (right - left + 1 == s1.length()) {
                if (Arrays.equals(need, count)) return true;
            }
        }
        return false;
    }`)},
{id:904,title:'Fruit Into Baskets',short:'Fruit into baskets',pattern:'Sliding window',difficulty:'Medium',time:'O(n)',space:'O(1)',desc:'Find the longest contiguous subarray containing at most two distinct fruit types.',input:{fruits:[1,2,3,2,2]},examples:[{fruits:[1,2,3,2,2]},{fruits:[1,2,1]},{fruits:[]}],expected:[4,3,0],focus:'The frequency map tracks the fruit types in the current window. Keep its size at most two.',pitfall:'Remove zero-frequency keys. Leaving them in the map makes the distinct-type count incorrect.',code:code(`    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < fruits.length; right++) {
            int fruit = fruits[right];
            count.put(fruit, count.getOrDefault(fruit, 0) + 1);
            while (count.size() > 2) {
                int out = fruits[left];
                count.put(out, count.get(out) - 1);
                if (count.get(out) == 0) count.remove(out);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }`)},
{id:11,title:'Container With Most Water',short:'Container with most water',pattern:'Two pointers',difficulty:'Medium',time:'O(n)',space:'O(1)',desc:'Choose two vertical lines that hold the most water. Width is the distance between their indices.',input:{height:[1,8,6,2,5,4,8,3,7]},examples:[{height:[1,8,6,2,5,4,8,3,7]},{height:[1,1]},{height:[4,3,2,1,4]}],expected:[49,1,16],focus:'Move the shorter boundary: keeping it while reducing width cannot improve the area.',pitfall:'The area uses the smaller height, not the larger. Stop when the pointers meet.',code:code(`    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int best = 0;
        while (left < right) {
            int area = Math.min(height[left], height[right]) * (right - left);
            best = Math.max(best, area);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return best;
    }`)},
{id:15,title:'3Sum',short:'3Sum',pattern:'Two pointers',difficulty:'Medium',time:'O(n²)',space:'O(log n) + output',desc:'Return all unique triplets that sum to zero. The solution sorts the input in place.',input:{nums:[-1,0,1,2,-1,-4]},examples:[{nums:[-1,0,1,2,-1,-4]},{nums:[0,0,0,0]},{nums:[1,2,3]}],expected:[[[-1,-1,2],[-1,0,1]],[[0,0,0]],[]],focus:'Fix one sorted value; solve a two-sum problem in the suffix. Each move eliminates impossible pairs.',pitfall:'Skip duplicate anchors and duplicate boundary values after finding a triplet.',code:code(`    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1;
            int right = nums.length - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    left++;
                    right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }`)},
{id:16,title:'3Sum Closest',short:'3Sum closest',pattern:'Two pointers',difficulty:'Medium',time:'O(n²)',space:'O(log n)',desc:'For an array of at least three integers, return the triplet sum closest to target.',input:{nums:[-1,2,1,-4],target:1},examples:[{nums:[-1,2,1,-4],target:1},{nums:[0,0,0],target:1},{nums:[1,2,3],target:6}],expected:[2,0,6],focus:'Track the closest sum while the sorted pair search approaches the target.',pitfall:'Compare absolute differences. A sum above the target can still be the closest answer.',code:code(`    public int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        int best = nums[0] + nums[1] + nums[2];
        for (int i = 0; i < nums.length - 2; i++) {
            int left = i + 1;
            int right = nums.length - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
                if (sum == target) return sum;
                if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return best;
    }`)},
{id:18,title:'4Sum',short:'4Sum',pattern:'Two pointers',difficulty:'Medium',time:'O(n³)',space:'O(log n) + output',desc:'Return unique quadruplets whose sum equals target. Two anchors reduce the rest to a sorted pair search.',input:{nums:[1,0,-1,0,-2,2],target:0},examples:[{nums:[1,0,-1,0,-2,2],target:0},{nums:[2,2,2,2,2],target:8},{nums:[1,2],target:3}],expected:[[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]],[[2,2,2,2]],[]],focus:'Two fixed indices plus two moving boundaries. Widen the sum before addition in real Java to avoid int overflow.',pitfall:'Deduplicate both anchors and each matching pair. Cast the first addend to long before summing.',code:code(`    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < nums.length - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < nums.length - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                int left = j + 1;
                int right = nums.length - 1;
                while (left < right) {
                    long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        result.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
                        left++;
                        right--;
                        while (left < right && nums[left] == nums[left - 1]) left++;
                        while (left < right && nums[right] == nums[right + 1]) right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }
        return result;
    }`)},
{id:42,title:'Trapping Rain Water',short:'Trapping rain water',pattern:'Two pointers',difficulty:'Hard',time:'O(n)',space:'O(1)',desc:'Compute how much water is trapped between nonnegative elevation bars.',input:{height:[0,1,0,2,1,0,1,3,2,1,2,1]},examples:[{height:[0,1,0,2,1,0,1,3,2,1,2,1]},{height:[4,2,0,3,2,5]},{height:[]}],expected:[6,9,0],focus:'Resolve the side with the smaller current boundary. The opposite boundary guarantees enough height for that side.',pitfall:'Update the side maximum before adding water. Never add a negative water contribution.',code:code(`    public int trap(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int leftMax = 0;
        int rightMax = 0;
        int water = 0;
        while (left < right) {
            if (height[left] <= height[right]) {
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }`)},
{id:167,title:'Two Sum II — Input Array Is Sorted',short:'Two sum II · sorted array',pattern:'Two pointers',difficulty:'Medium',time:'O(n)',space:'O(1)',desc:'Find two numbers that sum to target in a sorted array. Return their one-based indices.',input:{numbers:[2,7,11,15],target:9},examples:[{numbers:[2,7,11,15],target:9},{numbers:[2,3,4],target:6},{numbers:[-1,0],target:-1}],expected:[[1,2],[1,3],[1,2]],focus:'If the sum is too small, increase the left value. If too large, decrease the right value.',pitfall:'The input must be sorted. Return one-based indices rather than zero-based positions.',code:code(`    public int[] twoSum(int[] numbers, int target) {
        int left = 0;
        int right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left + 1, right + 1};
            if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{};
    }`)}
];

Object.assign(patterns, extraPatterns);
problems.push(...extraProblems);
