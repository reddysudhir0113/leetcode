// Questions Database for CodeCrack
// Includes Blind 75, NeetCode 150, and Top Interview 150 mapping

export const questions = [
  {
    id: "two-sum",
    title: "Two Sum",
    leetcodeNumber: 1,
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    pattern: "Hashing",
    learningObjective: "Find two numbers in an array that add up to a target value using a hash map to achieve O(N) time complexity.",
    concepts: ["Arrays", "Hash Tables"],
    hints: [
      "A brute force approach would search all pairs, taking O(N^2) time. Can we find elements faster?",
      "For each element X, we are looking for a complement (Target - X). How quickly can we look up if this complement exists?",
      "Use a hash map to store numbers we have seen so far as keys and their indices as values. For each number, check if its complement is already in the map."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=KLlXCFG5Tk0",
    leetcodeLink: "https://leetcode.com/problems/two-sum/"
  },
  {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    leetcodeNumber: 121,
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Adobe"],
    pattern: "Sliding Window / Greedy",
    learningObjective: "Find the maximum single-transaction profit from a series of stock prices by keeping track of the minimum price seen so far.",
    concepts: ["Arrays", "Dynamic Programming"],
    hints: [
      "To maximize profit, you want to buy at a low price and sell at a high price in the future.",
      "As you iterate through the prices, track the minimum price you have seen so far.",
      "For each price, calculate the potential profit if you sold today, and update the maximum profit accordingly."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=1pkOgXD63yU",
    leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
  },
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    leetcodeNumber: 217,
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Amazon", "Microsoft", "Adobe", "Apple"],
    pattern: "Hashing",
    learningObjective: "Determine if an array contains duplicate elements by tracking visited elements in a Hash Set.",
    concepts: ["Arrays", "Hash Set"],
    hints: [
      "Can sorting help? Sorting takes O(N log N) time and groups duplicates together.",
      "How can we check if we've seen an element in O(1) time? What data structure supports fast lookups?",
      "Create a set. Insert each element into the set. If an element is already present in the set, we found a duplicate."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=3OamzN90kQg",
    leetcodeLink: "https://leetcode.com/problems/contains-duplicate/"
  },
  {
    id: "product-of-array-except-self",
    title: "Product of Array Except Self",
    leetcodeNumber: 238,
    difficulty: "Medium",
    topic: "Arrays",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Walmart"],
    pattern: "Prefix & Suffix Products",
    learningObjective: "Compute the product of all elements except the current one in O(N) time and without using the division operator.",
    concepts: ["Arrays", "Prefix Sum"],
    hints: [
      "For any index i, the product of elements except self is the product of elements to its left times the product of elements to its right.",
      "Can we calculate all prefix products and suffix products in linear time?",
      "Use an output array to store the prefix products. Then, iterate backwards to accumulate the suffix products directly into the output array to save space."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)", // Output array does not count as extra space
    youtubeLink: "https://www.youtube.com/watch?v=b9OIn5xo4EM",
    leetcodeLink: "https://leetcode.com/problems/product-of-array-except-self/"
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    leetcodeNumber: 53,
    difficulty: "Medium",
    topic: "Arrays",
    companies: ["Microsoft", "Amazon", "Google", "Meta", "Adobe", "Walmart"],
    pattern: "Kadane's Algorithm / DP",
    learningObjective: "Identify the contiguous subarray with the largest sum using a greedy local maximum search.",
    concepts: ["Arrays", "Dynamic Programming", "Greedy"],
    hints: [
      "If we have a negative sum prefix, does it help to extend it to the next element?",
      "For each index, the maximum subarray ending here is either just the element itself, or the element plus the maximum subarray ending at the previous index.",
      "Reset the running sum to 0 whenever it drops below 0, and record the maximum sum seen at each step."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=5WZlOh8YNWM",
    leetcodeLink: "https://leetcode.com/problems/maximum-subarray/"
  },
  {
    id: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    leetcodeNumber: 152,
    difficulty: "Medium",
    topic: "Arrays",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    pattern: "Kadane's Algorithm Variations",
    learningObjective: "Handle negative numbers and double negatives when searching for the contiguous subarray with the maximum product.",
    concepts: ["Arrays", "Dynamic Programming"],
    hints: [
      "Unlike sums, multiplying two negative numbers yields a positive number. So a very small negative product can suddenly become a very large positive product.",
      "At each index, you should track both the maximum product and the minimum product ending at that position.",
      "For each new number, the new maximum can be the number itself, the number times the previous max, or the number times the previous min."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=lXVy6YWFcRM",
    leetcodeLink: "https://leetcode.com/problems/maximum-product-subarray/"
  },
  {
    id: "find-minimum-in-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    leetcodeNumber: 153,
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Google", "Amazon", "Microsoft", "Apple", "Meta"],
    pattern: "Binary Search",
    learningObjective: "Search in logarithmic time by identifying which half of a rotated sorted array is sorted and narrowing the search space.",
    concepts: ["Arrays", "Binary Search"],
    hints: [
      "A sorted array is rotated. An element is smaller than its predecessor only at the rotation point (the minimum).",
      "Compare the middle element with the rightmost element to decide which side is unsorted and contains the pivot.",
      "If nums[mid] > nums[right], the minimum must be in the right half. Otherwise, it is in the left half (including mid)."
    ],
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=nIVW4P8b1VA",
    leetcodeLink: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
  },
  {
    id: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    leetcodeNumber: 33,
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Adobe", "Apple"],
    pattern: "Binary Search",
    learningObjective: "Search a target in a rotated sorted array in O(log N) time by adapting binary search conditions.",
    concepts: ["Arrays", "Binary Search"],
    hints: [
      "Even when rotated, at least one half of the array (left to mid, or mid to right) is always sorted.",
      "Check if the left half is sorted: nums[left] <= nums[mid]. If it is, check if the target lies within its bounds.",
      "If the left half is not sorted, the right half must be sorted. Perform a similar range check for the target in the right half."
    ],
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=U8XENdCKUFY",
    leetcodeLink: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
  },
  {
    id: "3sum",
    title: "3Sum",
    leetcodeNumber: 15,
    difficulty: "Medium",
    topic: "Two Pointers",
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Adobe", "Apple"],
    pattern: "Two Pointers",
    learningObjective: "Find all unique triplets that sum to zero by sorting the array and running a Two Pointers search from both ends.",
    concepts: ["Arrays", "Two Pointers", "Sorting"],
    hints: [
      "Can we simplify the problem? If we fix the first element X, the problem reduces to finding two numbers that sum to -X (Two Sum).",
      "Sort the array first. Sorting makes it easy to skip duplicates and use the two-pointer technique.",
      "For each unique element X, set a left pointer right after X and a right pointer at the end. Adjust pointers based on the current sum."
    ],
    timeComplexity: "O(N^2)",
    spaceComplexity: "O(log N) or O(N) for sorting",
    youtubeLink: "https://www.youtube.com/watch?v=jzZsG8n2R9A",
    leetcodeLink: "https://leetcode.com/problems/3sum/"
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    leetcodeNumber: 11,
    difficulty: "Medium",
    topic: "Two Pointers",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple", "Walmart"],
    pattern: "Two Pointers",
    learningObjective: "Maximize the container area by starting with the widest possible width and moving the pointer with the shorter height inward.",
    concepts: ["Arrays", "Two Pointers"],
    hints: [
      "The area is limited by the shorter line: Area = min(height[L], height[R]) * (R - L).",
      "Start with pointers at the absolute left and right to maximize width.",
      "To find a larger area, we must search for taller lines. Since width is shrinking, we should move the pointer pointing to the shorter line."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=UuiTKBwPgPE",
    leetcodeLink: "https://leetcode.com/problems/container-with-most-water/"
  },
  {
    id: "sum-of-two-integers",
    title: "Sum of Two Integers",
    leetcodeNumber: 371,
    difficulty: "Medium",
    topic: "Bit Manipulation",
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    pattern: "Bit Manipulation",
    learningObjective: "Perform addition without the + or - operators by simulating half-adder logic using XOR for sum and AND-Shift for carry.",
    concepts: ["Bit Manipulation"],
    hints: [
      "XOR (a ^ b) computes the sum of bits without carrying.",
      "AND (a & b) computes the carry bits. Shift them left by 1 ( (a & b) << 1 ) to align with the next columns.",
      "Repeat the process (add carry to sum) until the carry becomes zero."
    ],
    timeComplexity: "O(1)", // Bound by number of bits (32)
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=gVUrYWRg4ES",
    leetcodeLink: "https://leetcode.com/problems/sum-of-two-integers/"
  },
  {
    id: "number-of-1-bits",
    title: "Number of 1 Bits",
    leetcodeNumber: 191,
    difficulty: "Easy",
    topic: "Bit Manipulation",
    companies: ["Amazon", "Microsoft", "Apple", "Meta"],
    pattern: "Bit Manipulation",
    learningObjective: "Count set bits using bitwise operations, utilizing the n & (n - 1) trick to clear the lowest set bit in O(1) per bit.",
    concepts: ["Bit Manipulation"],
    hints: [
      "You can check the last bit of a number by doing n & 1, then shift the number right by 1 (n >>> 1).",
      "Is there a way to skip all 0 bits? Yes, the operation n & (n - 1) removes the lowest set bit of n.",
      "Count how many times you can apply n & (n - 1) before the number becomes 0."
    ],
    timeComplexity: "O(1)", // Max 32 operations
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=5Km3utixwZs",
    leetcodeLink: "https://leetcode.com/problems/number-of-1-bits/"
  },
  {
    id: "counting-bits",
    title: "Counting Bits",
    leetcodeNumber: 338,
    difficulty: "Easy",
    topic: "Bit Manipulation",
    companies: ["Amazon", "Google", "Microsoft"],
    pattern: "DP / Bit Manipulation",
    learningObjective: "Compute set bits count for a range [0, n] in linear time using dynamic programming relations (even/odd values).",
    concepts: ["Bit Manipulation", "Dynamic Programming"],
    hints: [
      "An even number X has the same number of 1-bits as X / 2 (since shifting right by 1 just drops a 0 bit).",
      "An odd number X has the number of 1-bits of X - 1 plus 1 (the final set bit).",
      "Use DP: dp[i] = dp[i >> 1] + (i & 1). Compute sequentially from 1 to N."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)", // Output array space is required
    youtubeLink: "https://www.youtube.com/watch?v=RyBM56RIWrM",
    leetcodeLink: "https://leetcode.com/problems/counting-bits/"
  },
  {
    id: "missing-number",
    title: "Missing Number",
    leetcodeNumber: 268,
    difficulty: "Easy",
    topic: "Bit Manipulation",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple"],
    pattern: "Bit Manipulation / Math",
    learningObjective: "Find a missing value in a sequence using sum formula (Gauss) or XORing all numbers and indices.",
    concepts: ["Bit Manipulation", "Math"],
    hints: [
      "Formula: Sum of first N numbers is N * (N + 1) / 2.",
      "Calculate the expected sum and subtract the sum of the array. The difference is the missing number.",
      "Alternatively, XOR all indices [0..N] and all values in the array. Since X ^ X = 0, only the missing number will remain."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=Wn3fbhlCXyQ",
    leetcodeLink: "https://leetcode.com/problems/missing-number/"
  },
  {
    id: "reverse-bits",
    title: "Reverse Bits",
    leetcodeNumber: 190,
    difficulty: "Easy",
    topic: "Bit Manipulation",
    companies: ["Apple", "Google", "Microsoft"],
    pattern: "Bit Manipulation",
    learningObjective: "Reverse bits of a 32-bit unsigned integer by iterating through all bit indices and assembling the result.",
    concepts: ["Bit Manipulation"],
    hints: [
      "You can extract the rightmost bit of input using (n & 1).",
      "Shift the output to the left to make room for the new bit, and shift input to the right.",
      "Repeat 32 times. Make sure to use unsigned right shift (>>>) in JS to handle signs."
    ],
    timeComplexity: "O(1)", // Fixed 32 loops
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=UcoN6gD1Iio",
    leetcodeLink: "https://leetcode.com/problems/reverse-bits/"
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    leetcodeNumber: 70,
    difficulty: "Easy",
    topic: "Dynamic Programming",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Adobe", "TCS"],
    pattern: "Fibonacci Sequence / DP",
    learningObjective: "Solve the stairs climbing combinations by realizing the relation dp[i] = dp[i-1] + dp[i-2] and optimizing space.",
    concepts: ["Dynamic Programming", "Math"],
    hints: [
      "To reach step N, you can either take 1 step from step N-1, or 2 steps from step N-2.",
      "Therefore, the number of ways to reach N is the sum of ways to reach N-1 and N-2.",
      "This is exactly the Fibonacci sequence! Solve it in O(N) time and O(1) space by tracking only the last two values."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=Y0lT9Fck7qI",
    leetcodeLink: "https://leetcode.com/problems/climbing-stairs/"
  },
  {
    id: "coin-change",
    title: "Coin Change",
    leetcodeNumber: 322,
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Walmart"],
    pattern: "Knapsack / DP",
    learningObjective: "Find the minimum number of coins needed to make up an amount using a bottom-up DP table where dp[i] represents min coins for amount i.",
    concepts: ["Dynamic Programming", "Breadth-First Search"],
    hints: [
      "If we want to make amount X, and we try using a coin of value C, the remaining amount is X - C. The min coins for X would be 1 + min coins for (X - C).",
      "Create a DP array of size amount + 1, filled with a large value (amount + 1) representing infinity.",
      "Set dp[0] = 0. Iterate through all amounts from 1 to amount, and for each amount, check all coin denominations to update dp[amount]."
    ],
    timeComplexity: "O(Amount * N)", // N is number of coins
    spaceComplexity: "O(Amount)",
    youtubeLink: "https://www.youtube.com/watch?v=H9bfqozjoqs",
    leetcodeLink: "https://leetcode.com/problems/coin-change/"
  },
  {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    leetcodeNumber: 300,
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Microsoft", "Amazon", "Meta", "Apple"],
    pattern: "DP / Binary Search",
    learningObjective: "Determine the length of the longest strictly increasing subsequence in O(N log N) using patience sorting/binary search, or O(N^2) using DP.",
    concepts: ["Dynamic Programming", "Binary Search"],
    hints: [
      "DP Approach: Let dp[i] be the length of LIS ending at index i. Compare nums[i] with all nums[j] (j < i) and if nums[i] > nums[j], dp[i] = max(dp[i], dp[j] + 1).",
      "Can we do better than O(N^2)? Yes! Let's maintain a active subsequence list that we build incrementally.",
      "For each element, use binary search to find its position in our active subsequence list. Replace the element at that index (or append if it's larger than all)."
    ],
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=cjWnW0hdF1Y",
    leetcodeLink: "https://leetcode.com/problems/longest-increasing-subsequence/"
  },
  {
    id: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    leetcodeNumber: 1143,
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Multi-dimensional DP",
    learningObjective: "Find the length of the longest common subsequence of two strings using a 2D DP grid to compare prefixes.",
    concepts: ["Dynamic Programming", "Strings"],
    hints: [
      "Let dp[i][j] represent the LCS of text1[0..i] and text2[0..j].",
      "If text1[i] == text2[j], then dp[i][j] = 1 + dp[i-1][j-1].",
      "If they are different, we can either skip the character in text1 or text2: dp[i][j] = max(dp[i-1][j], dp[i][j-1])."
    ],
    timeComplexity: "O(M * N)", // M, N are lengths of the strings
    spaceComplexity: "O(M * N)", // Can be optimized to O(min(M, N))
    youtubeLink: "https://www.youtube.com/watch?v=Ua0GhsJ565M",
    leetcodeLink: "https://leetcode.com/problems/longest-common-subsequence/"
  },
  {
    id: "word-break",
    title: "Word Break",
    leetcodeNumber: 139,
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Apple", "Oracle"],
    pattern: "DP / Trie",
    learningObjective: "Determine if a string can be segmented into space-separated dictionary words using a boolean DP array representing prefix validity.",
    concepts: ["Dynamic Programming", "Hash Table", "Trie"],
    hints: [
      "Define dp[i] as a boolean indicating if substring s[0..i] can be segmented.",
      "To check if dp[i] is true, find some index j < i such that dp[j] is true AND the substring s[j..i] exists in the dictionary.",
      "Store dictionary words in a set for O(1) lookups."
    ],
    timeComplexity: "O(N^3) in JS due to string slicing, can be optimized",
    spaceComplexity: "O(N + M)", // M is dictionary size
    youtubeLink: "https://www.youtube.com/watch?v=Sx9yClr11i4",
    leetcodeLink: "https://leetcode.com/problems/word-break/"
  },
  {
    id: "combination-sum",
    title: "Combination Sum",
    leetcodeNumber: 39,
    difficulty: "Medium",
    topic: "Backtracking",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Adobe"],
    pattern: "Backtracking",
    learningObjective: "Find all unique combinations of numbers that sum to a target, allowing infinite reuse of candidates via depth-first search backtracking.",
    concepts: ["Backtracking", "Recursion"],
    hints: [
      "We can choose to include the current candidate multiple times, or move on to the next candidate.",
      "Create a recursive helper function that takes the current index, remaining target, and the active path.",
      "Base cases: if target == 0, save a copy of the path. If target < 0 or index is out of bounds, return."
    ],
    timeComplexity: "O(2^T) where T is target / min_candidate",
    spaceComplexity: "O(T) for recursion stack",
    youtubeLink: "https://www.youtube.com/watch?v=GBKI9VSKdGg",
    leetcodeLink: "https://leetcode.com/problems/combination-sum/"
  },
  {
    id: "house-robber",
    title: "House Robber",
    leetcodeNumber: 198,
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Walmart"],
    pattern: "DP",
    learningObjective: "Maximize loot from adjacent houses by making the binary choice to rob the current house (and add dp[i-2]) or skip it (dp[i-1]).",
    concepts: ["Dynamic Programming"],
    hints: [
      "You cannot rob adjacent houses. So at house i, you either rob it (earning money[i] + max from house i-2) or you don't rob it (earning max from house i-1).",
      "Let dp[i] = max(dp[i-1], nums[i] + dp[i-2]).",
      "We only need to track the previous two values to calculate the current maximum, allowing O(1) space optimization."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=Vx5gb339k0o",
    leetcodeLink: "https://leetcode.com/problems/house-robber/"
  },
  {
    id: "house-robber-ii",
    title: "House Robber II",
    leetcodeNumber: 213,
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "DP",
    learningObjective: "Solve the circular variant of House Robber by running the standard algorithm twice (once without the first house, once without the last).",
    concepts: ["Dynamic Programming"],
    hints: [
      "Since the houses are in a circle, the first and last houses are adjacent and cannot be robbed together.",
      "This means we can break the circle into two linear sub-problems: rob houses 0 to N-2, or rob houses 1 to N-1.",
      "Run the standard House Robber I logic on these two arrays and take the maximum of the two results."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=rWAJCfYYOPM",
    leetcodeLink: "https://leetcode.com/problems/house-robber-ii/"
  },
  {
    id: "decode-ways",
    title: "Decode Ways",
    leetcodeNumber: 91,
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Apple", "Uber"],
    pattern: "DP",
    learningObjective: "Count ways to decode a digit string by treating it as 1-digit and 2-digit combinations and handling edge cases like zero.",
    concepts: ["Dynamic Programming", "Strings"],
    hints: [
      "Let dp[i] be the number of ways to decode prefix s[0..i].",
      "If the single digit s[i] is valid (not '0'), dp[i] += dp[i-1].",
      "If the double digit s[i-1..i] is valid (10 to 26), dp[i] += dp[i-2]."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1) if optimized, or O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=6h6y5yJkY54",
    leetcodeLink: "https://leetcode.com/problems/decode-ways/"
  },
  {
    id: "unique-paths",
    title: "Unique Paths",
    leetcodeNumber: 62,
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Adobe"],
    pattern: "Grid DP / Combinatorics",
    learningObjective: "Count grid traversals from top-left to bottom-right using grid transition dp[r][c] = dp[r-1][c] + dp[r][c-1].",
    concepts: ["Dynamic Programming", "Math"],
    hints: [
      "You can only move either down or right at any point.",
      "The number of paths to cell (r, c) is the sum of paths to cell (r-1, c) and cell (r, c-1).",
      "Initialize a 2D grid (or 1D array of size N) with 1s (representing the border paths) and fill it in row by row."
    ],
    timeComplexity: "O(M * N)",
    spaceComplexity: "O(N) if space optimized",
    youtubeLink: "https://www.youtube.com/watch?v=IlEsdxuD4lY",
    leetcodeLink: "https://leetcode.com/problems/unique-paths/"
  },
  {
    id: "jump-game",
    title: "Jump Game",
    leetcodeNumber: 55,
    difficulty: "Medium",
    topic: "Greedy",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Walmart"],
    pattern: "Greedy",
    learningObjective: "Verify if you can reach the end of an array by keeping track of the furthest reachable index at each position.",
    concepts: ["Arrays", "Greedy", "Dynamic Programming"],
    hints: [
      "Let's iterate from right to left. We want to find if we can reach the end index.",
      "Maintain a 'goal' pointer, initially set to the last index. If from index i we can jump to or past the 'goal', then i becomes the new 'goal'.",
      "At the end of the iteration, check if the goal pointer reached index 0."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=Yan0cv2cLy8",
    leetcodeLink: "https://leetcode.com/problems/jump-game/"
  },
  {
    id: "clone-graph",
    title: "Clone Graph",
    leetcodeNumber: 133,
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Meta", "Amazon", "Microsoft"],
    pattern: "Graph DFS / BFS",
    learningObjective: "Create a deep copy of a connected undirected graph using a hash map to map original nodes to their copies during traversal.",
    concepts: ["Graphs", "Depth-First Search", "Hash Map"],
    hints: [
      "Use a hash map to map original nodes to their cloned counterparts to avoid cycles.",
      "Traverse the graph using DFS or BFS. When visiting a node, check if it's already in the hash map.",
      "If it isn't cloned yet, clone it, add it to the map, and recursively clone all its neighbors."
    ],
    timeComplexity: "O(V + E)", // V is vertices, E is edges
    spaceComplexity: "O(V) for visited clone map and call stack",
    youtubeLink: "https://www.youtube.com/watch?v=mQeF6bN8h1U",
    leetcodeLink: "https://leetcode.com/problems/clone-graph/"
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    leetcodeNumber: 207,
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple", "Salesforce"],
    pattern: "Topological Sort / DFS Cycle Detection",
    learningObjective: "Detect cycles in a directed graph of prerequisites using DFS coloring or Kahn's BFS in-degree algorithm.",
    concepts: ["Graphs", "Topological Sort", "DFS"],
    hints: [
      "Think of this problem as checking if there is a cycle in a directed graph. If a cycle exists, topological sort is impossible.",
      "Use DFS with a state tracking array to color nodes: 0 = unvisited, 1 = visiting (in current DFS path), 2 = fully processed.",
      "If you hit a node that is currently 'visiting', a cycle exists. Return false."
    ],
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E) for adjacency list and recursion stack",
    youtubeLink: "https://www.youtube.com/watch?v=EgI5nU9EtnU",
    leetcodeLink: "https://leetcode.com/problems/course-schedule/"
  },
  {
    id: "pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    leetcodeNumber: 417,
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Multi-Source DFS / BFS",
    learningObjective: "Find grid cells that can flow to both oceans by running reverse DFS searches starting from the grid edges.",
    concepts: ["Graphs", "Depth-First Search", "Matrix"],
    hints: [
      "Instead of checking where water can flow to from every cell, think in reverse.",
      "Which cells can reach the Pacific Ocean? Run DFS/BFS from all Pacific boundary cells (top and left edges) going uphill.",
      "Which cells can reach the Atlantic? Run DFS/BFS from all Atlantic boundary cells (bottom and right edges). The intersection is your answer."
    ],
    timeComplexity: "O(R * C)",
    spaceComplexity: "O(R * C)",
    youtubeLink: "https://www.youtube.com/watch?v=s-Vk1_YOB94",
    leetcodeLink: "https://leetcode.com/problems/pacific-atlantic-water-flow/"
  },
  {
    id: "number-of-islands",
    title: "Number of Islands",
    leetcodeNumber: 200,
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple", "Walmart", "Oracle"],
    pattern: "Grid DFS / BFS",
    learningObjective: "Count disconnected components in a 2D binary grid by triggering a grid DFS to sink connected land whenever '1' is encountered.",
    concepts: ["Graphs", "Depth-First Search", "Matrix"],
    hints: [
      "Iterate through the grid. When you find a '1' (land), increment your island count.",
      "Then, start a DFS/BFS traversal from that cell to find all connected land ('1') and flip them to '0' (or mark as visited) so they aren't counted again.",
      "Repeat the process until the entire grid is checked."
    ],
    timeComplexity: "O(R * C)",
    spaceComplexity: "O(R * C) for recursive call stack",
    youtubeLink: "https://www.youtube.com/watch?v=pV2kpPDTOlY",
    leetcodeLink: "https://leetcode.com/problems/number-of-islands/"
  },
  {
    id: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    leetcodeNumber: 128,
    difficulty: "Medium",
    topic: "Hash Maps",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Spotify"],
    pattern: "Hashing",
    learningObjective: "Find the longest consecutive numbers sequence in O(N) time by using a Hash Set to check for the start of sequences.",
    concepts: ["Arrays", "Hash Set"],
    hints: [
      "Put all numbers into a Hash Set to allow O(1) lookups.",
      "For each number, check if it's the start of a sequence. It is the start if number - 1 is NOT present in the set.",
      "If it's the start, increment count and check if number + 1, number + 2, ... are in the set. Update the maximum length found."
    ],
    timeComplexity: "O(N)", // Each number is visited at most twice
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=P6RZZMu_maU",
    leetcodeLink: "https://leetcode.com/problems/longest-consecutive-sequence/"
  },
  {
    id: "insert-interval",
    title: "Insert Interval",
    leetcodeNumber: 57,
    difficulty: "Medium",
    topic: "Greedy", // also Intervals
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Intervals",
    learningObjective: "Insert a new interval into a sorted list of non-overlapping intervals and merge overlapping intervals on the fly.",
    concepts: ["Arrays", "Intervals"],
    hints: [
      "Iterate through the sorted intervals. There are three possibilities for each interval.",
      "Possibility 1: The current interval ends before the new interval starts. Append it directly.",
      "Possibility 2: The current interval starts after the new interval ends. Append the new interval (if not done yet), and then append the current one.",
      "Possibility 3: There is overlap. Merge them by updating the start and end of the new interval to min(starts) and max(ends)."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N) for output array",
    youtubeLink: "https://www.youtube.com/watch?v=A8NUOmlwOlM",
    leetcodeLink: "https://leetcode.com/problems/insert-interval/"
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    leetcodeNumber: 56,
    difficulty: "Medium",
    topic: "Greedy",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Adobe", "Salesforce"],
    pattern: "Intervals / Sorting",
    learningObjective: "Sort intervals by their starting times and merge adjacent overlapping intervals in a single linear pass.",
    concepts: ["Arrays", "Sorting", "Intervals"],
    hints: [
      "Sort the list of intervals based on their start times first. This guarantees that overlap is only possible between adjacent elements.",
      "Insert the first interval into your merged list.",
      "For each subsequent interval, check if its start overlaps with the end of the last merged interval. If it does, update the end. If not, insert it as a new entry."
    ],
    timeComplexity: "O(N log N) due to sorting",
    spaceComplexity: "O(N) or O(log N) for sorting",
    youtubeLink: "https://www.youtube.com/watch?v=44yI31Gc56g",
    leetcodeLink: "https://leetcode.com/problems/merge-intervals/"
  },
  {
    id: "non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    leetcodeNumber: 435,
    difficulty: "Medium",
    topic: "Greedy",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Intervals / Greedy",
    learningObjective: "Find the minimum removals to eliminate interval overlaps by sorting by end times and greedily keeping elements that end earliest.",
    concepts: ["Arrays", "Greedy", "Sorting", "Intervals"],
    hints: [
      "This is equivalent to finding the maximum number of non-overlapping intervals we can keep (Interval Scheduling).",
      "Sort the intervals by their END times. Why? Because ending earlier leaves the maximum possible room for future intervals.",
      "Iterate through sorted intervals. If the current interval overlaps with the previous selected one, increment the removal count. Otherwise, update the previous interval end."
    ],
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(1) if sorting in place",
    youtubeLink: "https://www.youtube.com/watch?v=nONCGxWoUfM",
    leetcodeLink: "https://leetcode.com/problems/non-overlapping-intervals/"
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    leetcodeNumber: 206,
    difficulty: "Easy",
    topic: "Linked List",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Accenture", "Infosys"],
    pattern: "Linked List In-place Manipulation",
    learningObjective: "Reverse list pointers in-place by maintaining three pointers: previous, current, and next.",
    concepts: ["Linked List"],
    hints: [
      "To reverse a link current -> next, you must set current.next = prev.",
      "But doing that breaks the forward link, so you lose access to the rest of the list. What should we do?",
      "Save current.next in a temporary variable 'nextTemp' before modifying the pointer, then advance prev to current, and current to nextTemp."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=G0_I-ZF0S38",
    leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/"
  },
  {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    leetcodeNumber: 141,
    difficulty: "Easy",
    topic: "Linked List",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Capgemini"],
    pattern: "Floyd's Tortoise and Hare",
    learningObjective: "Detect cycles in a linked list in O(1) auxiliary space using two pointers moving at different speeds.",
    concepts: ["Linked List", "Two Pointers"],
    hints: [
      "Imagine two runners on a circular track. One runs twice as fast as the other. Will they meet?",
      "Set two pointers: slow moves 1 step, fast moves 2 steps.",
      "If there is a cycle, the fast pointer will eventually catch up and meet the slow pointer. If fast reaches null, there is no cycle."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=gBTe7lFR3vc",
    leetcodeLink: "https://leetcode.com/problems/linked-list-cycle/"
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    leetcodeNumber: 21,
    difficulty: "Easy",
    topic: "Linked List",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Cognizant"],
    pattern: "Two Pointers / Dummy Node",
    learningObjective: "Splice together nodes of two sorted lists by comparing values and linking them sequentially, utilizing a dummy node.",
    concepts: ["Linked List", "Recursion"],
    hints: [
      "Create a dummy head node to act as the root of your merged list. Maintain a pointer 'current' to build the list.",
      "Compare the heads of the two lists. Attach the smaller node to current.next, then advance that list's head.",
      "Don't forget to attach any remaining nodes of list1 or list2 at the end of the loop."
    ],
    timeComplexity: "O(N + M)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=XIdigkF65uA",
    leetcodeLink: "https://leetcode.com/problems/merge-two-sorted-lists/"
  },
  {
    id: "merge-k-sorted-lists",
    title: "Merge K Sorted Lists",
    leetcodeNumber: 23,
    difficulty: "Hard",
    topic: "Linked List",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    pattern: "Divide & Conquer / Heaps",
    learningObjective: "Merge K sorted lists efficiently in O(N log K) using a Min-Heap or a Divide and Conquer merge strategy.",
    concepts: ["Linked List", "Divide and Conquer", "Heap"],
    hints: [
      "A brute force way would compare all K heads at each step (O(N*K) time). How can we select the min head faster?",
      "Use a Min-Heap containing the active head node of each list. Pop the minimum, attach it, and push its next node back to the heap.",
      "Alternatively, pair up lists and merge them using Merge Two Sorted Lists (Divide & Conquer). Repeat until 1 list remains."
    ],
    timeComplexity: "O(N log K)", // K is number of lists, N is total nodes
    spaceComplexity: "O(1) for divide & conquer (in place) or O(K) for Heap",
    youtubeLink: "https://www.youtube.com/watch?v=q5a5OiGbT6Q",
    leetcodeLink: "https://leetcode.com/problems/merge-k-sorted-lists/"
  },
  {
    id: "remove-nth-node-from-end-of-list",
    title: "Remove Nth Node From End of List",
    leetcodeNumber: 19,
    difficulty: "Medium",
    topic: "Linked List",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple"],
    pattern: "Two Pointers / Fast-Slow Gap",
    learningObjective: "Delete the N-th node from the list end in a single pass by maintaining a pointer gap of length N.",
    concepts: ["Linked List", "Two Pointers"],
    hints: [
      "Use two pointers: fast and slow. We want them to have a gap of N nodes between them.",
      "Advance fast N steps first. Then, move both slow and fast together until fast reaches the end.",
      "At this point, slow will point right before the node that needs to be deleted. Adjust pointers: slow.next = slow.next.next."
    ],
    timeComplexity: "O(L)", // L is list length
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=XVuQxVolfyY",
    leetcodeLink: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
  },
  {
    id: "reorder-list",
    title: "Reorder List",
    leetcodeNumber: 143,
    difficulty: "Medium",
    topic: "Linked List",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    pattern: "Linked List Split & Merge",
    learningObjective: "Reorder a list to L0 -> Ln -> L1 -> Ln-1... by finding the middle, reversing the second half, and merging the halves.",
    concepts: ["Linked List", "Two Pointers"],
    hints: [
      "First, find the middle of the linked list using slow and fast pointers.",
      "Second, reverse the second half of the linked list in-place.",
      "Third, merge the first half and the reversed second half alternately."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=S5yA50c1zLk",
    leetcodeLink: "https://leetcode.com/problems/reorder-list/"
  },
  {
    id: "set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    leetcodeNumber: 73,
    difficulty: "Medium",
    topic: "Arrays", // Math & Geometry topic in NeetCode, let's keep Arrays
    companies: ["Microsoft", "Amazon", "Google", "Meta", "Apple"],
    pattern: "In-Place Matrix Tagging",
    learningObjective: "Nullify grid rows/columns in-place by utilizing the first row and column as state markers to achieve O(1) space.",
    concepts: ["Arrays", "Matrix"],
    hints: [
      "If we use O(M+N) extra space, we can record which rows/cols contain zero. Can we do it in O(1) space?",
      "Use the first row and first column of the matrix itself to store the markers.",
      "Since cell (0, 0) overlaps both row 0 and col 0, use a separate boolean variable for row 0 (or col 0) state."
    ],
    timeComplexity: "O(R * C)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=T81c81qv7no",
    leetcodeLink: "https://leetcode.com/problems/set-matrix-zeroes/"
  },
  {
    id: "spiral-matrix",
    title: "Spiral Matrix",
    leetcodeNumber: 54,
    difficulty: "Medium",
    topic: "Arrays",
    companies: ["Google", "Microsoft", "Amazon", "Apple", "Adobe"],
    pattern: "Boundary Simulation",
    learningObjective: "Traverse a matrix spirally by simulating the boundaries (top, bottom, left, right) and shrinking them in a loop.",
    concepts: ["Arrays", "Matrix"],
    hints: [
      "Maintain four pointers/boundaries: top, bottom, left, and right.",
      "Traverse from left to right along top boundary, then top to bottom along right boundary, right to left along bottom, and bottom to top along left.",
      "Increment boundaries inward and check boundary cross condition (top > bottom or left > right) after each direction."
    ],
    timeComplexity: "O(R * C)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=BJnMZNwUk1M",
    leetcodeLink: "https://leetcode.com/problems/spiral-matrix/"
  },
  {
    id: "rotate-image",
    title: "Rotate Image",
    leetcodeNumber: 48,
    difficulty: "Medium",
    topic: "Arrays",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    pattern: "Matrix Transpose & Flip",
    learningObjective: "Rotate a 2D matrix 90 degrees clockwise in-place by transposing the matrix first, then reversing each row.",
    concepts: ["Arrays", "Matrix", "Math"],
    hints: [
      "A 90-degree clockwise rotation can be achieved through two simple matrix transformations.",
      "First, transpose the matrix (swap matrix[i][j] with matrix[j][i]).",
      "Second, reverse each row of the transposed matrix. Perform both operations in-place."
    ],
    timeComplexity: "O(N^2)", // N is matrix dimension
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=fMSJSS7aK38",
    leetcodeLink: "https://leetcode.com/problems/rotate-image/"
  },
  {
    id: "word-search",
    title: "Word Search",
    leetcodeNumber: 79,
    difficulty: "Medium",
    topic: "Backtracking",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    pattern: "Grid Backtracking DFS",
    learningObjective: "Search a target word in a character grid using depth-first search, marking visited cells temporarily.",
    concepts: ["Backtracking", "Matrix", "DFS"],
    hints: [
      "For each cell in the grid, start a DFS to check if the path matches the word.",
      "To avoid reusing cells in the current path, temporarily mark the cell (e.g. set it to a special character like '#') and restore it during backtracking.",
      "Prune searches early if the cell character doesn't match the word character at the current index."
    ],
    timeComplexity: "O(R * C * 4^L) where L is word length",
    spaceComplexity: "O(L) recursion stack depth",
    youtubeLink: "https://www.youtube.com/watch?v=pfiQ_PS1g8E",
    leetcodeLink: "https://leetcode.com/problems/word-search/"
  },
  {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    leetcodeNumber: 3,
    difficulty: "Medium",
    topic: "Sliding Window",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Adobe"],
    pattern: "Sliding Window",
    learningObjective: "Maintain a sliding window of unique characters, adjusting the left boundary when duplicates are encountered.",
    concepts: ["Strings", "Hash Table", "Sliding Window"],
    hints: [
      "Use a sliding window with two pointers: left and right. Record the positions of characters in a map.",
      "As you expand the right pointer, check if the character is already in the window.",
      "If it is, shrink the window by moving the left pointer to the right of the last seen duplicate character."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(min(A, N)) where A is alphabet size",
    youtubeLink: "https://www.youtube.com/watch?v=wyY2Vz1Tf5U",
    leetcodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  },
  {
    id: "longest-repeating-character-replacement",
    title: "Longest Repeating Character Replacement",
    leetcodeNumber: 424,
    difficulty: "Medium",
    topic: "Sliding Window",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Sliding Window",
    learningObjective: "Find the longest substring with same letters after swapping at most k chars, keeping track of the max character frequency in the window.",
    concepts: ["Strings", "Sliding Window", "Hash Table"],
    hints: [
      "A window is valid if: (Length of window - frequency of most frequent character) <= K.",
      "Maintain character counts for the current window and track the maximum frequency of any character.",
      "If the window becomes invalid, shrink it from the left and decrement the corresponding character count."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(26) = O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=gqXU1UyA8pk",
    leetcodeLink: "https://leetcode.com/problems/longest-repeating-character-replacement/"
  },
  {
    id: "minimum-window-substring",
    title: "Minimum Window Substring",
    leetcodeNumber: 76,
    difficulty: "Hard",
    topic: "Sliding Window",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Uber"],
    pattern: "Sliding Window / Two Pointers",
    learningObjective: "Find the smallest window containing all target characters in linear time using a sliding window and counter validation.",
    concepts: ["Strings", "Hash Table", "Sliding Window"],
    hints: [
      "Use two frequency maps: one for target string T, and one for the active window in S.",
      "Expand the right pointer until the active window contains all characters of T with their required counts.",
      "Once valid, try to contract the left pointer to find the minimum window size while maintaining validity."
    ],
    timeComplexity: "O(S + T)",
    spaceComplexity: "O(S + T)",
    youtubeLink: "https://www.youtube.com/watch?v=jSto0O4AJbM",
    leetcodeLink: "https://leetcode.com/problems/minimum-window-substring/"
  },
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    leetcodeNumber: 242,
    difficulty: "Easy",
    topic: "Hash Maps",
    companies: ["Google", "Amazon", "Meta", "Apple", "Deloitte"],
    pattern: "Hashing / Frequency Counting",
    learningObjective: "Check if two strings are anagrams by comparing their character frequency distributions.",
    concepts: ["Strings", "Hash Table", "Sorting"],
    hints: [
      "If lengths of strings differ, they cannot be anagrams.",
      "Count character occurrences in both strings. In JavaScript, you can use a fixed-size integer array of size 26 for ASCII.",
      "Ensure all character counts match. If using sorting, sorted strings must be identical (takes O(N log N) time)."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1) if character set is fixed (e.g. 26 lowercase English letters)",
    youtubeLink: "https://www.youtube.com/watch?v=9UtInBqnCgA",
    leetcodeLink: "https://leetcode.com/problems/valid-anagram/"
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    leetcodeNumber: 49,
    difficulty: "Medium",
    topic: "Hash Maps",
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Walmart"],
    pattern: "Hashing / Key Serialization",
    learningObjective: "Categorize an array of strings by converting character frequency counts into group keys in a hash map.",
    concepts: ["Arrays", "Hash Table", "Strings", "Sorting"],
    hints: [
      "To group words, we need a common signature key for anagrams.",
      "One way is to sort the characters of each string (e.g. 'eat' -> 'aet'). Use the sorted string as the hash map key.",
      "Another way is to count letter frequencies (e.g., '1a,1e,1t') to avoid O(L log L) sorting cost, serializing it as a key."
    ],
    timeComplexity: "O(N * L) where L is max word length",
    spaceComplexity: "O(N * L)",
    youtubeLink: "https://www.youtube.com/watch?v=vzdNOK2oB2E",
    leetcodeLink: "https://leetcode.com/problems/group-anagrams/"
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    leetcodeNumber: 20,
    difficulty: "Easy",
    topic: "Stack",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Accenture"],
    pattern: "Stack Data Structure",
    learningObjective: "Ensure correct ordering of nested bracket pairs by pushing openings onto a stack and popping to match closings.",
    concepts: ["Stack", "Strings"],
    hints: [
      "Use a stack to store opening brackets.",
      "When you encounter a closing bracket, check if it matches the bracket on top of the stack.",
      "If the stack is empty at the end, and all brackets matched during the scan, the string is valid."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=WTzjTcl33so",
    leetcodeLink: "https://leetcode.com/problems/valid-parentheses/"
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    leetcodeNumber: 125,
    difficulty: "Easy",
    topic: "Two Pointers",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Capgemini"],
    pattern: "Two Pointers",
    learningObjective: "Check for palindrome symmetry in-place by stepping pointers inward from both ends, ignoring non-alphanumeric chars.",
    concepts: ["Strings", "Two Pointers"],
    hints: [
      "Set two pointers: one at the start (left) and one at the end (right) of the string.",
      "Move them toward the center, skipping any characters that are not alphanumeric.",
      "Compare characters in a case-insensitive manner. If they don't match, return false."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=jJXJ14cJuUo",
    leetcodeLink: "https://leetcode.com/problems/valid-palindrome/"
  },
  {
    id: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    leetcodeNumber: 5,
    difficulty: "Medium",
    topic: "Strings", // Neetcode has it under DP, let's categorize as Strings
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Adobe", "Walmart"],
    pattern: "Expand Around Center",
    learningObjective: "Find the longest palindrome by expanding outward from 2N-1 centers (each character and between-characters).",
    concepts: ["Strings", "Dynamic Programming"],
    hints: [
      "A palindrome is symmetric. We can search for palindromes by choosing a center and expanding outward.",
      "There are 2N - 1 possible centers: single letters (like 'a') and double letters (like 'aa').",
      "For each center, expand left and right as long as characters match, and record the longest palindrome found."
    ],
    timeComplexity: "O(N^2)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=XYQec15tVME",
    leetcodeLink: "https://leetcode.com/problems/longest-palindromic-substring/"
  },
  {
    id: "palindromic-substrings",
    title: "Palindromic Substrings",
    leetcodeNumber: 647,
    difficulty: "Medium",
    topic: "Strings",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    pattern: "Expand Around Center",
    learningObjective: "Count all palindromic substrings by accumulating expansions from all possible centers.",
    concepts: ["Strings", "Dynamic Programming"],
    hints: [
      "Like finding the longest palindrome, we can expand around centers.",
      "For each valid expansion step where left and right characters match, we have found one additional valid palindromic substring.",
      "Sum the counts of successful expansions across all 2N - 1 centers."
    ],
    timeComplexity: "O(N^2)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=4RACzI5-du8",
    leetcodeLink: "https://leetcode.com/problems/palindromic-substrings/"
  },
  {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    leetcodeNumber: 226,
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple", "Infosys"],
    pattern: "Tree Traversal (DFS)",
    learningObjective: "Invert a binary tree recursively by swapping the left and right child pointers at each tree node.",
    concepts: ["Trees", "Recursion", "Depth-First Search"],
    hints: [
      "Think recursively. How would you invert a tree consisting of just a root and two children?",
      "You swap the left child and right child. Then, you recursively invert the left subtree and the right subtree.",
      "Base case: if the current node is null, return null."
    ],
    timeComplexity: "O(N)", // Visit all nodes once
    spaceComplexity: "O(H) recursion stack height",
    youtubeLink: "https://www.youtube.com/watch?v=OnSn2XEQ4MY",
    leetcodeLink: "https://leetcode.com/problems/invert-binary-tree/"
  },
  {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    leetcodeNumber: 104,
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Adobe", "Cognizant"],
    pattern: "Tree Traversal",
    learningObjective: "Find the max height of a tree recursively: height(node) = 1 + max(height(left), height(right)).",
    concepts: ["Trees", "Depth-First Search", "Recursion"],
    hints: [
      "If node is null, depth is 0.",
      "The depth of a tree is 1 (for the current node) plus the maximum of the depths of its left and right subtrees.",
      "Calculate: return 1 + Math.max(maxDepth(node.left), maxDepth(node.right))."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    youtubeLink: "https://www.youtube.com/watch?v=hTM3phVI6YQ",
    leetcodeLink: "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
  },
  {
    id: "same-tree",
    title: "Same Tree",
    leetcodeNumber: 100,
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Google", "Microsoft", "Apple"],
    pattern: "Tree Comparison DFS",
    learningObjective: "Verify tree equivalence by recursively ensuring nodes share identical values and identical child structures.",
    concepts: ["Trees", "Recursion", "Depth-First Search"],
    hints: [
      "Base case: If both nodes are null, they are identical. If one is null and the other isn't, they are different.",
      "If both are not null, they must have the same value (p.val == q.val).",
      "Then recursively check: sameTree(p.left, q.left) AND sameTree(p.right, q.right)."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    youtubeLink: "https://www.youtube.com/watch?v=vRbbcKihGpI",
    leetcodeLink: "https://leetcode.com/problems/same-tree/"
  },
  {
    id: "subtree-of-another-tree",
    title: "Subtree of Another Tree",
    leetcodeNumber: 572,
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    pattern: "Double Tree DFS",
    learningObjective: "Determine if tree S contains tree T by checking if S is identical to T or if T is a subtree of S's left/right children.",
    concepts: ["Trees", "Recursion", "Depth-First Search"],
    hints: [
      "A tree S contains T if: S and T are identical, OR S.left contains T, OR S.right contains T.",
      "Write a helper function `isSameTree(p, q)` to check if two trees are exactly identical.",
      "For each node visited in S, run `isSameTree` against T. If it fails, recurse down S.left and S.right."
    ],
    timeComplexity: "O(S_nodes * T_nodes)", // Can be O(S + T) with KMP/hashing
    spaceComplexity: "O(H_s) recursion stack depth",
    youtubeLink: "https://www.youtube.com/watch?v=HdTs9UMDAyI",
    leetcodeLink: "https://leetcode.com/problems/subtree-of-another-tree/"
  },
  {
    id: "lowest-common-ancestor-of-a-binary-search-tree",
    title: "Lowest Common Ancestor of a BST",
    leetcodeNumber: 235,
    difficulty: "Easy",
    topic: "Trees", // BST
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    pattern: "BST BST-property BST-traversal",
    learningObjective: "Find the LCA of two nodes in a BST in O(H) by exploiting the value order (the split node is the LCA).",
    concepts: ["Trees", "BST", "Binary Search"],
    hints: [
      "Remember the property of a BST: for any node, all nodes in its left subtree are smaller, and all nodes in its right subtree are larger.",
      "If both target nodes P and Q are smaller than the current node, the LCA must be in the left subtree. Move current to left.",
      "If both P and Q are larger, the LCA must be in the right subtree. Otherwise, the current node is the 'split' point, which is the LCA."
    ],
    timeComplexity: "O(H)", // H is tree height
    spaceComplexity: "O(1) if solved iteratively",
    youtubeLink: "https://www.youtube.com/watch?v=gs2LMfuOR9k",
    leetcodeLink: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
  },
  {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    leetcodeNumber: 102,
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Adobe"],
    pattern: "Breadth-First Search (BFS)",
    learningObjective: "Perform level-by-level tree traversal using a queue, tracking level sizes to group node values.",
    concepts: ["Trees", "Queue", "Breadth-First Search"],
    hints: [
      "Use a queue to perform BFS. Push the root node initially.",
      "Use a loop to process level by level. In each iteration, record the current queue size (this is the number of nodes at the current level).",
      "Dequeue that many nodes, push their values to a level list, and enqueue their children."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N) for queue storage",
    youtubeLink: "https://www.youtube.com/watch?v=6Zny1axwD-k",
    leetcodeLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
  },
  {
    id: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    leetcodeNumber: 98,
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Oracle"],
    pattern: "Tree Bounds Propagation",
    learningObjective: "Validate a BST by recursively passing down range boundaries (min, max) that each node value must satisfy.",
    concepts: ["Trees", "Recursion", "BST"],
    hints: [
      "It's not enough to check node.left.val < node.val < node.right.val. All nodes in the left subtree must be smaller than the root.",
      "Write a helper function that takes a node, a minimum bound, and a maximum bound.",
      "For the root, bounds are (-Infinity, Infinity). When recursing left, update the max bound to node.val. When recursing right, update the min bound to node.val."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    youtubeLink: "https://www.youtube.com/watch?v=s6ATEkipzow",
    leetcodeLink: "https://leetcode.com/problems/validate-binary-search-tree/"
  },
  {
    id: "kth-smallest-element-in-a-bst",
    title: "Kth Smallest Element in a BST",
    leetcodeNumber: 230,
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Walmart"],
    pattern: "In-Order Tree Traversal",
    learningObjective: "Extract the K-th element in a BST by performing an in-order traversal (which visits BST nodes in sorted order) and stopping at the K-th node.",
    concepts: ["Trees", "BST", "DFS"],
    hints: [
      "An in-order traversal of a BST (Left, Root, Right) processes nodes in sorted ascending order.",
      "Keep track of the number of nodes visited during an in-order traversal.",
      "Once you reach the K-th node, return its value. You can write this iteratively using a stack to save time."
    ],
    timeComplexity: "O(H + K)",
    spaceComplexity: "O(H)",
    youtubeLink: "https://www.youtube.com/watch?v=5LUXSvjmGCw",
    leetcodeLink: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
  },
  {
    id: "implement-trie-prefix-tree",
    title: "Implement Trie (Prefix Tree)",
    leetcodeNumber: 208,
    difficulty: "Medium",
    topic: "Trie",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    pattern: "Trie Node Structure",
    learningObjective: "Design a prefix tree node with children maps and a word-end marker to support fast word/prefix lookups.",
    concepts: ["Trie", "Hash Table", "Design"],
    hints: [
      "A Trie node should contain a dictionary of children (mapping character -> TrieNode) and a boolean flag `isEndOfWord`.",
      "To insert a word, iterate through characters. If character doesn't exist as a child node, create a new child. Move pointer down.",
      "To search a word or prefix, traverse character nodes. If any character is missing, return false. For word search, check if `isEndOfWord` is true at the final node."
    ],
    timeComplexity: "O(L) for insert/search/startsWith where L is word length",
    spaceComplexity: "O(W * L) where W is number of words",
    youtubeLink: "https://www.youtube.com/watch?v=oobqoCJlFi0",
    leetcodeLink: "https://leetcode.com/problems/implement-trie-prefix-tree/"
  },
  {
    id: "design-add-and-search-words-data-structure",
    title: "Design Add and Search Words Data Structure",
    leetcodeNumber: 211,
    difficulty: "Medium",
    topic: "Trie",
    companies: ["Google", "Amazon", "Meta"],
    pattern: "Trie / Backtracking Search",
    learningObjective: "Extend a Trie to support wildcard character '.' by running backtracking search on children nodes.",
    concepts: ["Trie", "Backtracking", "Design"],
    hints: [
      "Implement a standard Trie node structure.",
      "When searching, if you encounter a letter, move to the corresponding child node.",
      "If you encounter a '.', you must try matching it with ALL children of the current node recursively. If any branch returns true, return true."
    ],
    timeComplexity: "O(L) for add, up to O(26^L) for wildcard search",
    spaceComplexity: "O(W * L)",
    youtubeLink: "https://www.youtube.com/watch?v=h-F2s5yOk7Y",
    leetcodeLink: "https://leetcode.com/problems/design-add-and-search-words-data-structure/"
  },
  {
    id: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    leetcodeNumber: 347,
    difficulty: "Medium",
    topic: "Heap", // also Hash Maps
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    pattern: "Bucket Sort / Heap",
    learningObjective: "Find the top K frequent elements in O(N) time using bucket sort, or O(N log K) using a Min-Heap.",
    concepts: ["Arrays", "Hash Table", "Heap", "Sorting", "Bucket Sort"],
    hints: [
      "First, count the frequencies of all elements using a hash map.",
      "To solve in O(N log K) time, push frequencies into a Min-Heap of size K. If heap size exceeds K, pop the minimum.",
      "To solve in O(N) time, use Bucket Sort: create an array of buckets where the index represents frequency. Place elements into their corresponding frequency buckets, then collect elements starting from the end."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=YPTqKIgVk-k",
    leetcodeLink: "https://leetcode.com/problems/top-k-frequent-elements/"
  },
  {
    id: "kth-largest-element-in-an-array",
    title: "Kth Largest Element in an Array",
    leetcodeNumber: 215,
    difficulty: "Medium",
    topic: "Heap",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple", "Adobe"],
    pattern: "Quick Select / Heap",
    learningObjective: "Find the Kth largest element in O(N) average time using Quick Select or O(N log K) using a Min-Heap.",
    concepts: ["Arrays", "Divide and Conquer", "Heap", "Quickselect"],
    hints: [
      "Using sorting takes O(N log N). We can do better.",
      "Maintain a Min-Heap of size K. Add elements from the array. If size > K, pop. The root of the heap will be the Kth largest element.",
      "Or use Quickselect (similar to Quicksort partitioning), which has an average time complexity of O(N)."
    ],
    timeComplexity: "O(N) average",
    spaceComplexity: "O(K) for Min-Heap",
    youtubeLink: "https://www.youtube.com/watch?v=XEmy13g1Qxs",
    leetcodeLink: "https://leetcode.com/problems/kth-largest-element-in-an-array/"
  },
  {
    id: "find-median-from-data-stream",
    title: "Find Median from Data Stream",
    leetcodeNumber: 295,
    difficulty: "Hard",
    topic: "Heap",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    pattern: "Two Heaps",
    learningObjective: "Dynamically calculate data stream medians by dividing values between a Max-Heap (lower half) and a Min-Heap (upper half).",
    concepts: ["Heap", "Design", "Data Stream"],
    hints: [
      "To find the median, we need fast access to the middle elements of sorted data. We can divide the numbers into two halves: small numbers and large numbers.",
      "Store the small half in a Max-Heap and the large half in a Min-Heap. The sizes of both heaps must remain balanced (difference <= 1).",
      "If sizes are equal, the median is average of roots. If Max-Heap is larger, the median is Max-Heap's root."
    ],
    timeComplexity: "O(log N) to insert, O(1) to find median",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=itmhHWaUxGE",
    leetcodeLink: "https://leetcode.com/problems/find-median-from-data-stream/"
  },
  {
    id: "binary-tree-maximum-path-sum",
    title: "Binary Tree Maximum Path Sum",
    leetcodeNumber: 124,
    difficulty: "Hard",
    topic: "Trees",
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    pattern: "Tree Traversal (DFS)",
    learningObjective: "Compute the maximum path sum of a binary tree by calculating local split path sums at each node while returning the maximum single path to parents.",
    concepts: ["Trees", "Depth-First Search", "Recursion", "Dynamic Programming"],
    hints: [
      "For any node, the max path sum that splits at this node is node.val + max_left_gain + max_right_gain.",
      "Write a DFS function that calculates the maximum single path gain (the path that doesn't split, returning to parent).",
      "At each node, update a global maximum by including the split path (node.val + left_gain + right_gain), but only return node.val + max(left_gain, right_gain) to the parent. Note that gains below 0 should be ignored (set to 0)."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    youtubeLink: "https://www.youtube.com/watch?v=Hr5cYGldF5s",
    leetcodeLink: "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
  },
  {
    id: "serialize-and-deserialize-binary-tree",
    title: "Serialize and Deserialize Binary Tree",
    leetcodeNumber: 297,
    difficulty: "Hard",
    topic: "Trees",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Tree Traversal / Queue Serialization",
    learningObjective: "Convert binary trees to/from strings using pre-order traversal and null-markers.",
    concepts: ["Trees", "Design", "String Manipulation"],
    hints: [
      "You can serialize a tree using a pre-order traversal (Root, Left, Right). Append null node values as '#' or 'null'.",
      "During deserialization, split the serialized string by comma to get a list/queue of values.",
      "Recursively build the tree by pulling the next value from the queue. If it is the null marker, return null; otherwise, construct the node and assign left and right children recursively."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=u4JAiVWPcaU",
    leetcodeLink: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
  },
  {
    id: "word-search-ii",
    title: "Word Search II",
    leetcodeNumber: 212,
    difficulty: "Hard",
    topic: "Trie", // also Backtracking
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Trie + Backtracking DFS",
    learningObjective: "Search multiple dictionary words in a character grid in O(R * C * 4^L) by merging search prefixes into a Trie and running a grid DFS.",
    concepts: ["Trie", "Backtracking", "Matrix", "DFS"],
    hints: [
      "If we search each word separately using Word Search I, it will TLE. How can we search all words simultaneously?",
      "Insert all words into a Trie. The Trie will guide our DFS search on the board.",
      "Start a DFS from each cell. Walk the board and the Trie node together. If character doesn't exist as a child in the Trie, stop early. To avoid duplicate words, remove words from Trie once found."
    ],
    timeComplexity: "O(R * C * 4^L) where L is max word length",
    spaceComplexity: "O(W * L) for Trie storage",
    youtubeLink: "https://www.youtube.com/watch?v=asbcE9m6QD8",
    leetcodeLink: "https://leetcode.com/problems/word-search-ii/"
  },
  {
    id: "alien-dictionary",
    title: "Alien Dictionary",
    leetcodeNumber: 269,
    difficulty: "Hard",
    topic: "Graphs",
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Apple"],
    pattern: "Topological Sort / Directed Graphs",
    learningObjective: "Find a character ordering from sorted words by building a directed dependency graph and performing topological sort.",
    concepts: ["Graphs", "Topological Sort", "Strings"],
    hints: [
      "Compare adjacent words in the sorted dictionary character-by-character. Find the first character difference.",
      "If word1 starts with word2's characters but is longer (e.g. 'abc' before 'ab'), the sorting order is invalid. Return empty string.",
      "If character difference is found (char1 != char2), create a directed edge char1 -> char2. Run topological sort (DFS/Kahn) to find character order. Detect cycles."
    ],
    timeComplexity: "O(C) where C is total length of all words",
    spaceComplexity: "O(1) since alphabet size is fixed (26)",
    youtubeLink: "https://www.youtube.com/watch?v=6kTZYvNNyps",
    leetcodeLink: "https://leetcode.com/problems/alien-dictionary/"
  },
  {
    id: "graph-valid-tree",
    title: "Graph Valid Tree",
    leetcodeNumber: 261,
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Union Find / Cycle Detection",
    learningObjective: "Determine if an undirected graph is a valid tree by verifying connectivity and cycle-free properties.",
    concepts: ["Graphs", "Union Find", "Depth-First Search"],
    hints: [
      "A graph is a valid tree if it has exactly N - 1 edges AND all vertices are connected (no cycles).",
      "Use Union-Find: start with N components. For each edge, union the two nodes. If they are already in the same component, a cycle exists. Return false.",
      "At the end of processing all edges, check if components count is 1."
    ],
    timeComplexity: "O(V + E * alpha(V)) where alpha is inverse Ackermann",
    spaceComplexity: "O(V) for parent and rank arrays",
    youtubeLink: "https://www.youtube.com/watch?v=bXsUuownnoQ",
    leetcodeLink: "https://leetcode.com/problems/graph-valid-tree/"
  },
  {
    id: "number-of-connected-components-in-an-undirected-graph",
    title: "Number of Connected Components in an Undirected Graph",
    leetcodeNumber: 323,
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Union Find / BFS / DFS",
    learningObjective: "Count components in an undirected graph by merging nodes using Union Find or traversing via DFS.",
    concepts: ["Graphs", "Union Find", "Depth-First Search"],
    hints: [
      "Initialize Union-Find with N components.",
      "For each edge, perform union. Each successful union operation decrements the component count by 1.",
      "Alternatively, use a visited array and trigger DFS from each unvisited node, incrementing component count."
    ],
    timeComplexity: "O(V + E * alpha(V))",
    spaceComplexity: "O(V)",
    youtubeLink: "https://www.youtube.com/watch?v=8f1XPm4WOUc",
    leetcodeLink: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
  },
  {
    id: "coin-change-ii",
    title: "Coin Change II",
    leetcodeNumber: 518,
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Unbounded Knapsack / DP",
    learningObjective: "Count combinations of coins that form an amount using 1D DP table iterations.",
    concepts: ["Dynamic Programming"],
    hints: [
      "Let dp[i] be the number of ways to make amount i.",
      "For each coin, iterate through all amounts from coin to amount: dp[i] += dp[i - coin].",
      "Initializing dp[0] = 1 represents 1 way to make amount 0 (using no coins)."
    ],
    timeComplexity: "O(Amount * N)",
    spaceComplexity: "O(Amount)",
    youtubeLink: "https://www.youtube.com/watch?v=MjyMeQ5n8v8",
    leetcodeLink: "https://leetcode.com/problems/coin-change-ii/"
  },
  {
    id: "two-sum-ii",
    title: "Two Sum II - Input Array Is Sorted",
    leetcodeNumber: 167,
    difficulty: "Medium",
    topic: "Two Pointers",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple"],
    pattern: "Two Pointers",
    learningObjective: "Find two values in a sorted array that sum to a target using two pointers moving inward.",
    concepts: ["Arrays", "Two Pointers", "Binary Search"],
    hints: [
      "Since the array is sorted, we can set pointers at the start (left) and end (right).",
      "Compute sum = nums[left] + nums[right]. If sum == target, return 1-based indices.",
      "If sum < target, increment left. If sum > target, decrement right."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=cQ1t1wSJhn0",
    leetcodeLink: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"
  },
  {
    id: "valid-palindrome-ii",
    title: "Valid Palindrome II",
    leetcodeNumber: 680,
    difficulty: "Easy",
    topic: "Two Pointers",
    companies: ["Meta", "Microsoft", "Google", "Apple"],
    pattern: "Two Pointers",
    learningObjective: "Determine if a string is a palindrome allowing at most one character deletion.",
    concepts: ["Strings", "Two Pointers"],
    hints: [
      "Use standard two-pointer comparison from start and end.",
      "When a mismatch is found at left and right, check if deleting either character resolves the mismatch.",
      "Test if substring s[left+1..right] OR s[left..right-1] is a valid palindrome."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=JrxRYBwG6EI",
    leetcodeLink: "https://leetcode.com/problems/valid-palindrome-ii/"
  },
  {
    id: "koko-eating-bananas",
    title: "Koko Eating Bananas",
    leetcodeNumber: 875,
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Binary Search on Answer Range",
    learningObjective: "Find the minimum eating speed K to finish all bananas within H hours using binary search on the range of possible speeds.",
    concepts: ["Arrays", "Binary Search"],
    hints: [
      "The minimum speed is 1, and the maximum speed is the max value in piles.",
      "For a middle speed K, calculate total hours spent: ceil(pile / K) for all piles.",
      "If total hours <= H, this speed is valid; try slower speeds (right = mid - 1). Otherwise, try faster speeds (left = mid + 1)."
    ],
    timeComplexity: "O(N log(max(P)))",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=U2SozAs9coY",
    leetcodeLink: "https://leetcode.com/problems/koko-eating-bananas/"
  },
  {
    id: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    leetcodeNumber: 74,
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple"],
    pattern: "Binary Search",
    learningObjective: "Search a target in a sorted 2D grid in O(log(R*C)) by mapping indices to a virtual 1D array.",
    concepts: ["Arrays", "Binary Search", "Matrix"],
    hints: [
      "The matrix rows are sorted, and the first element of each row is larger than the last element of the previous row. This is a sorted 1D array folded into a 2D grid.",
      "Perform a standard binary search on virtual indices [0..R*C - 1].",
      "Convert a virtual index `mid` to grid coordinates: row = floor(mid / C), col = mid % C."
    ],
    timeComplexity: "O(log(R * C))",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=Ber2dxhy5tc",
    leetcodeLink: "https://leetcode.com/problems/search-a-2d-matrix/"
  },
  {
    id: "min-stack",
    title: "Min Stack",
    leetcodeNumber: 155,
    difficulty: "Medium",
    topic: "Stack",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple"],
    pattern: "Stack Data Structure",
    learningObjective: "Design a stack that retrieves the minimum element in O(1) time by maintaining an auxiliary minimum stack.",
    concepts: ["Stack", "Design"],
    hints: [
      "At any point, we want to know the minimum value stored in the stack.",
      "Use an auxiliary stack `minStack` that stores the minimum element seen so far at each step of insertion.",
      "When pushing a value X, push min(X, current_min) to `minStack`. Pop from both stacks simultaneously."
    ],
    timeComplexity: "O(1) for all operations",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=qkLl2vnqi8Y",
    leetcodeLink: "https://leetcode.com/problems/min-stack/"
  },
  {
    id: "evaluate-reverse-polish-notation",
    title: "Evaluate Reverse Polish Notation",
    leetcodeNumber: 150,
    difficulty: "Medium",
    topic: "Stack",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Stack Data Structure",
    learningObjective: "Evaluate post-fix expressions in linear time by pushing numbers to a stack and performing calculations upon encountering operators.",
    concepts: ["Stack", "Math"],
    hints: [
      "Read tokens from left to right.",
      "If a token is a number, push it onto the stack. If it is an operator (+, -, *, /), pop the top two numbers.",
      "Apply the operator (second popped operator first popped) and push the result back onto the stack."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=iu0082ofqEs",
    leetcodeLink: "https://leetcode.com/problems/evaluate-reverse-polish-notation/"
  },
  {
    id: "generate-parentheses",
    title: "Generate Parentheses",
    leetcodeNumber: 22,
    difficulty: "Medium",
    topic: "Backtracking",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Adobe"],
    pattern: "Backtracking",
    learningObjective: "Generate all valid combinations of N parenthetical pairs using DFS backtracking and counting open/close brackets.",
    concepts: ["Backtracking", "Recursion", "Strings"],
    hints: [
      "Use recursion to build combinations character-by-character.",
      "Track counts of open and close brackets used. You can add an open bracket if open < N.",
      "You can add a close bracket if close < open. Stop when open == close == N."
    ],
    timeComplexity: "O(4^N / sqrt(N)) Catalan number count",
    spaceComplexity: "O(N) for recursion stack",
    youtubeLink: "https://www.youtube.com/watch?v=s9fokUqJ1h4",
    leetcodeLink: "https://leetcode.com/problems/generate-parentheses/"
  },
  {
    id: "daily-temperatures",
    title: "Daily Temperatures",
    leetcodeNumber: 739,
    difficulty: "Medium",
    topic: "Stack",
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    pattern: "Monotonic Stack",
    learningObjective: "Find the waiting times until warmer temperatures occur using a decreasing monotonic stack.",
    concepts: ["Arrays", "Stack", "Monotonic Stack"],
    hints: [
      "We want to find the next warmer temperature index for each position. A nested loop takes O(N^2) time.",
      "Use a stack that stores indices of temperatures in a strictly decreasing temperature order.",
      "Iterate through temperatures. While stack is not empty and current temp is warmer than temp at stack top index, pop and calculate index difference."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=cTBiBSnjO3c",
    leetcodeLink: "https://leetcode.com/problems/daily-temperatures/"
  },
  {
    id: "reverse-nodes-in-k-group",
    title: "Reverse Nodes in k-Group",
    leetcodeNumber: 25,
    difficulty: "Hard",
    topic: "Linked List",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    pattern: "Linked List In-place Manipulation",
    learningObjective: "Reverse list sections of length K sequentially and link them correctly.",
    concepts: ["Linked List", "Recursion"],
    hints: [
      "Check if there are at least K nodes left. If not, leave them as is.",
      "Reverse K nodes in-place using previous/current pointers.",
      "Recursively call the function for the next group and connect the reversed sublist to it."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1) iteratively or O(N/k) recursively",
    youtubeLink: "https://www.youtube.com/watch?v=1UOPsfP85C4",
    leetcodeLink: "https://leetcode.com/problems/reverse-nodes-in-k-group/"
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    leetcodeNumber: 146,
    difficulty: "Medium",
    topic: "Linked List", // also Design
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Walmart", "Salesforce"],
    pattern: "Double Linked List & Hash Map",
    learningObjective: "Design an LRU Cache with O(1) put/get operations using a Hash Map for fast node lookup and a Doubly Linked List for tracking usage order.",
    concepts: ["Hash Table", "Linked List", "Design", "Doubly Linked List"],
    hints: [
      "To achieve O(1) operations, we need a hash map to search elements. But hash maps don't preserve ordering.",
      "Use a Doubly Linked List with head and tail dummy nodes to keep track of least and most recently used elements.",
      "When an item is accessed (get/put), move its corresponding node to the tail of the list. If size exceeds capacity, remove the head node."
    ],
    timeComplexity: "O(1) for get and put",
    spaceComplexity: "O(C) where C is capacity",
    youtubeLink: "https://www.youtube.com/watch?v=7V35WAgKEHY",
    leetcodeLink: "https://leetcode.com/problems/lru-cache/"
  },
  {
    id: "diameter-of-binary-tree",
    title: "Diameter of Binary Tree",
    leetcodeNumber: 543,
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    pattern: "Tree Traversal (DFS)",
    learningObjective: "Compute binary tree diameters by evaluating max height sums at each node in a single bottom-up pass.",
    concepts: ["Trees", "Recursion", "Depth-First Search"],
    hints: [
      "The diameter is the length of the longest path between any two nodes. This path may or may not pass through the root.",
      "For any node, the longest path passing through it is height(left) + height(right).",
      "Write a DFS that returns the height of the node, and at each node update a global maximum diameter."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    youtubeLink: "https://www.youtube.com/watch?v=bkxqA8Rfv04",
    leetcodeLink: "https://leetcode.com/problems/diameter-of-binary-tree/"
  },
  {
    id: "balanced-binary-tree",
    title: "Balanced Binary Tree",
    leetcodeNumber: 110,
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Google", "Microsoft", "Apple"],
    pattern: "Tree Height Verification DFS",
    learningObjective: "Verify tree balance recursively: heights of sibling subtrees must differ by at most 1, returning -1 for unbalanced.",
    concepts: ["Trees", "Recursion", "Depth-First Search"],
    hints: [
      "A tree is balanced if left and right subtrees are balanced and their height difference is <= 1.",
      "A naive approach calls height() on each node, taking O(N^2) time. Can we check balance while calculating heights?",
      "In DFS, return -1 if any child is unbalanced or if their height difference is > 1. Otherwise, return the actual height."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    youtubeLink: "https://www.youtube.com/watch?v=QfJsau0ItOY",
    leetcodeLink: "https://leetcode.com/problems/balanced-binary-tree/"
  },
  {
    id: "binary-tree-right-side-view",
    title: "Binary Tree Right Side View",
    leetcodeNumber: 199,
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple"],
    pattern: "BFS / DFS Right-Priority",
    learningObjective: "Extract the right-most tree nodes at each level using depth-first search visiting right children first.",
    concepts: ["Trees", "Depth-First Search", "Breadth-First Search", "Queue"],
    hints: [
      "You want to collect the rightmost node at each depth level.",
      "Use DFS with a right-to-left traversal: visit Root, Right child, then Left child.",
      "Pass the current depth to DFS. If depth equals the size of your result list, it means this is the first node seen at this level. Add it."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    youtubeLink: "https://www.youtube.com/watch?v=dYyJiY3RJ2A",
    leetcodeLink: "https://leetcode.com/problems/binary-tree-right-side-view/"
  },
  {
    id: "count-good-nodes-in-binary-tree",
    title: "Count Good Nodes in Binary Tree",
    leetcodeNumber: 1448,
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "DFS Value Propagation",
    learningObjective: "Count nodes whose value exceeds the maximum value encountered along their path from root.",
    concepts: ["Trees", "Depth-First Search", "Recursion"],
    hints: [
      "A node is 'good' if there are no nodes with a value greater than it along its path from root.",
      "In your DFS function, pass down the maximum value seen so far along the path.",
      "If node.val >= max_so_far, increment count, and recurse with max(max_so_far, node.val)."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    youtubeLink: "https://www.youtube.com/watch?v=7qyA_a5cjfY",
    leetcodeLink: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/"
  },
  {
    id: "course-schedule-ii",
    title: "Course Schedule II",
    leetcodeNumber: 210,
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple", "Uber"],
    pattern: "Topological Sort",
    learningObjective: "Determine the linear ordering of courses from a dependency graph, identifying cycle presence.",
    concepts: ["Graphs", "Topological Sort", "DFS", "BFS"],
    hints: [
      "This is a direct extension of Course Schedule I. Instead of just cycle detection, we want the topological sorting path.",
      "Use Kahn's BFS (in-degree array). Enqueue all courses with in-degree 0.",
      "Pop, add to result, decrement in-degree of neighbors, and enqueue neighbors whose in-degree becomes 0. Verify path contains all courses."
    ],
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    youtubeLink: "https://www.youtube.com/watch?v=Akt3glAJDfY",
    leetcodeLink: "https://leetcode.com/problems/course-schedule-ii/"
  },
  {
    id: "redundant-connection",
    title: "Redundant Connection",
    leetcodeNumber: 684,
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    pattern: "Union Find",
    learningObjective: "Identify cycle-causing edges in an undirected graph using Union Find.",
    concepts: ["Graphs", "Union Find", "Depth-First Search"],
    hints: [
      "The graph has N nodes and N edges, meaning it has exactly one cycle.",
      "Iterate through the list of edges and perform Union-Find operations.",
      "The first edge that connects two nodes already belonging to the same component is the redundant edge. Return it."
    ],
    timeComplexity: "O(E * alpha(V))",
    spaceComplexity: "O(V)",
    youtubeLink: "https://www.youtube.com/watch?v=FXWRE67PLL0",
    leetcodeLink: "https://leetcode.com/problems/redundant-connection/"
  },
  {
    id: "network-delay-time",
    title: "Network Delay Time",
    leetcodeNumber: 743,
    difficulty: "Medium",
    topic: "Graphs", // advanced graphs
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    pattern: "Dijkstra's Algorithm",
    learningObjective: "Calculate shortest signal transmission times to all nodes from a source using Dijkstra's Algorithm.",
    concepts: ["Graphs", "Dijkstra's Algorithm", "Heap"],
    hints: [
      "This is a shortest path problem in a weighted directed graph with positive weights.",
      "Use Dijkstra's algorithm. Maintain a min-heap storing [distance, node] pairs, and a dist map for visited nodes.",
      "Pop the node with the shortest distance, update neighbor distances if a shorter path is found, and push them to heap. The answer is max(dist)."
    ],
    timeComplexity: "O(E log V)",
    spaceComplexity: "O(V + E)",
    youtubeLink: "https://www.youtube.com/watch?v=EaphyqKU4PQ",
    leetcodeLink: "https://leetcode.com/problems/network-delay-time/"
  },
  {
    id: "min-cost-climbing-stairs",
    title: "Min Cost Climbing Stairs",
    leetcodeNumber: 746,
    difficulty: "Easy",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    pattern: "DP",
    learningObjective: "Find the cheapest stair climbing cost using 1D space DP relation: dp[i] = cost[i] + min(dp[i-1], dp[i-2]).",
    concepts: ["Dynamic Programming", "Arrays"],
    hints: [
      "Let dp[i] be the minimum cost to reach step i.",
      "To step past i, you must pay cost[i] plus the min cost to reach step i (which is min(dp[i-1], dp[i-2])).",
      "Optimize space by tracking only the last two values as you compute from step 2 to N."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=Kt3byVRUM1E",
    leetcodeLink: "https://leetcode.com/problems/min-cost-climbing-stairs/"
  },
  {
    id: "subsets",
    title: "Subsets",
    leetcodeNumber: 78,
    difficulty: "Medium",
    topic: "Backtracking",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple"],
    pattern: "Backtracking",
    learningObjective: "Generate all possible subset combinations of unique numbers by making recursive decisions to include/exclude elements.",
    concepts: ["Backtracking", "Recursion", "Bit Manipulation"],
    hints: [
      "For each element, we have a binary choice: include it in the subset or exclude it.",
      "Write a recursive function that takes the current index and the active subset path.",
      "At index `i`, branch: first recurse by including nums[i], then backtrack (remove nums[i]) and recurse by excluding it."
    ],
    timeComplexity: "O(N * 2^N)",
    spaceComplexity: "O(N) recursion stack space",
    youtubeLink: "https://www.youtube.com/watch?v=REOH22IVjhg",
    leetcodeLink: "https://leetcode.com/problems/subsets/"
  },
  {
    id: "permutations",
    title: "Permutations",
    leetcodeNumber: 46,
    difficulty: "Medium",
    topic: "Backtracking",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    pattern: "Backtracking",
    learningObjective: "Generate all ordering permutations of an array by swapping elements or tracking used numbers.",
    concepts: ["Backtracking", "Recursion"],
    hints: [
      "A permutation is an ordered arrangement. We want to place each element at each position.",
      "Keep track of which elements are currently placed in your permutation path (e.g. using a set/boolean array).",
      "For each unused element, add it to your path, recurse, and then pop it to try others."
    ],
    timeComplexity: "O(N * N!)",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=s7AvT7cGdSo",
    leetcodeLink: "https://leetcode.com/problems/permutations/"
  },
  {
    id: "gas-station",
    title: "Gas Station",
    leetcodeNumber: 134,
    difficulty: "Medium",
    topic: "Greedy",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    pattern: "Greedy",
    learningObjective: "Verify if you can complete a circular gas route, identifying the starting index by tracking local deficits.",
    concepts: ["Arrays", "Greedy"],
    hints: [
      "If the total gas is less than the total cost, it is impossible to complete the circuit. Return -1.",
      "Otherwise, a unique starting index is guaranteed to exist.",
      "Iterate through the stations. Maintain a running balance (gas[i] - cost[i]). If it drops below 0, reset the start index to i + 1 and reset the balance to 0."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=lJwbPZGo05A",
    leetcodeLink: "https://leetcode.com/problems/gas-station/"
  },
  {
    id: "partition-labels",
    title: "Partition Labels",
    leetcodeNumber: 763,
    difficulty: "Medium",
    topic: "Greedy",
    companies: ["Amazon", "Meta", "Google", "Microsoft"],
    pattern: "Greedy / Two Pointers",
    learningObjective: "Partition a string into largest possible subparts containing distinct characters by tracking char last positions.",
    concepts: ["Strings", "Greedy", "Two Pointers"],
    hints: [
      "First, record the last occurrence index of each character in the string.",
      "Iterate through the string. Maintain a boundary 'end' which is the maximum of the last seen positions of all characters in the current partition.",
      "When the current index equals 'end', you have found a partition! Record its length, and start a new partition."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1) (since map has max 26 characters)",
    youtubeLink: "https://www.youtube.com/watch?v=B7m8UmZE-vw",
    leetcodeLink: "https://leetcode.com/problems/partition-labels/"
  },
  {
    id: "single-number",
    title: "Single Number",
    leetcodeNumber: 136,
    difficulty: "Easy",
    topic: "Bit Manipulation",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Infosys"],
    pattern: "Bit Manipulation",
    learningObjective: "Identify the unique element in an array of pairs in O(1) space by XORing all values together.",
    concepts: ["Bit Manipulation", "Arrays"],
    hints: [
      "We want to find the number that appears once. All other numbers appear twice.",
      "Recall bitwise XOR properties: X ^ X = 0, and X ^ 0 = X.",
      "If we XOR all numbers in the array together, all duplicates will cancel each other out, leaving only the single number."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=qW5FvryD5NY",
    leetcodeLink: "https://leetcode.com/problems/single-number/"
  },
  {
    id: "happy-number",
    title: "Happy Number",
    leetcodeNumber: 202,
    difficulty: "Easy",
    topic: "Hash Maps", // Math / Geometry in NC
    companies: ["Google", "Amazon", "Microsoft", "Apple", "Accenture"],
    pattern: "Floyd's Cycle Detection / Hashing",
    learningObjective: "Verify if digital square sums converge to 1, using cycle detection to identify infinite loops.",
    concepts: ["Math", "Two Pointers", "Hash Table"],
    hints: [
      "Calculate the sum of squares of digits repeatedly. This process either reaches 1 (happy) or loops endlessly in a cycle.",
      "Use a Hash Set to store sums we've seen so far. If a sum repeats, we are in a cycle. Return false.",
      "Alternatively, use Floyd's Tortoise and Hare (slow/fast pointers) to detect the cycle with O(1) space."
    ],
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1) with pointers, O(log N) with set",
    youtubeLink: "https://www.youtube.com/watch?v=ljz85cM1o30",
    leetcodeLink: "https://leetcode.com/problems/happy-number/"
  },
  {
    id: "plus-one",
    title: "Plus One",
    leetcodeNumber: 66,
    difficulty: "Easy",
    topic: "Arrays", // Math / Geometry
    companies: ["Google", "Amazon", "Microsoft", "Apple", "TCS"],
    pattern: "Array Math Propagation",
    learningObjective: "Add 1 to an array-digit number, propagating carry backward and resizing if needed.",
    concepts: ["Arrays", "Math"],
    hints: [
      "Iterate backwards from the last digit.",
      "If digit is less than 9, increment it by 1 and return the array immediately.",
      "If it is 9, set it to 0 and continue to the next digit. If all digits are 0, insert 1 at the beginning of the array."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1) in-place (or O(N) when adding leading 1)",
    youtubeLink: "https://www.youtube.com/watch?v=jIaA8lhLDK0",
    leetcodeLink: "https://leetcode.com/problems/plus-one/"
  },
  {
    id: "subsets-ii",
    title: "Subsets II",
    leetcodeNumber: 90,
    difficulty: "Medium",
    topic: "Backtracking",
    companies: ["Google", "Amazon", "Meta"],
    pattern: "Backtracking / Sorting",
    learningObjective: "Generate subsets from an array containing duplicates, sorting first to skip duplicate choices.",
    concepts: ["Backtracking", "Recursion", "Arrays"],
    hints: [
      "Sort the array first. Sorting makes duplicates adjacent.",
      "During backtracking, at each step, you can choose to include the element at `i`. If you choose to skip it, skip all subsequent duplicates of nums[i] to avoid duplicates.",
      "Compare nums[i] == nums[i-1] to skip."
    ],
    timeComplexity: "O(N * 2^N)",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=Vn2v6ajA7U0",
    leetcodeLink: "https://leetcode.com/problems/subsets-ii/"
  },
  {
    id: "combination-sum-ii",
    title: "Combination Sum II",
    leetcodeNumber: 40,
    difficulty: "Medium",
    topic: "Backtracking",
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    pattern: "Backtracking / Sorting",
    learningObjective: "Find combinations adding to a target using elements at most once, sorting first to bypass duplicates.",
    concepts: ["Backtracking", "Recursion", "Sorting"],
    hints: [
      "Sort candidates first. This helps skip duplicate combinations.",
      "When recursing, if candidate at index `i` is identical to candidate at `i-1` and `i > start`, skip it.",
      "Adjust target and start index: recurse with target - candidates[i] and index i + 1."
    ],
    timeComplexity: "O(2^N)",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=rSA3t6zyDkU",
    leetcodeLink: "https://leetcode.com/problems/combination-sum-ii/"
  },
  {
    id: "min-cost-to-connect-all-points",
    title: "Min Cost to Connect All Points",
    leetcodeNumber: 1584,
    difficulty: "Medium",
    topic: "Graphs", // advanced graphs
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    pattern: "Minimum Spanning Tree (Prim's / Kruskal's)",
    learningObjective: "Find the Minimum Spanning Tree of coordinates using Prim's algorithm.",
    concepts: ["Graphs", "Minimum Spanning Tree", "Heap"],
    hints: [
      "The cost of connecting two points (xi, yi) and (xj, yj) is their Manhattan distance.",
      "We want to connect all points with the minimum total cost, which is a Minimum Spanning Tree.",
      "Use Prim's algorithm: start with point 0, maintain a min-heap of distances from visited points, pop the min, add its cost, and update distances for unvisited points."
    ],
    timeComplexity: "O(N^2 log N)",
    spaceComplexity: "O(N^2)",
    youtubeLink: "https://www.youtube.com/watch?v=f7JOBJIC-NA",
    leetcodeLink: "https://leetcode.com/problems/min-cost-to-connect-all-points/"
  },
  {
    id: "kth-smallest-element-in-a-sorted-matrix",
    title: "Kth Smallest Element in a Sorted Matrix",
    leetcodeNumber: 378,
    difficulty: "Medium",
    topic: "Binary Search", // or Heap
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    pattern: "Binary Search on Answer / Heap",
    learningObjective: "Find the Kth smallest element in a row/col sorted matrix in O(N log(max-min)) using binary search.",
    concepts: ["Arrays", "Binary Search", "Matrix", "Heap"],
    hints: [
      "We can search on the answer range between matrix[0][0] (min) and matrix[N-1][N-1] (max).",
      "For a middle value, count how many elements in the matrix are smaller than or equal to mid. Since rows/cols are sorted, we can count in O(N) time.",
      "If count < K, search higher (left = mid + 1). Otherwise, search lower (right = mid)."
    ],
    timeComplexity: "O(N log(Max - Min))",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=w36ekZYr-Gs",
    leetcodeLink: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/"
  },
  {
    id: "search-in-rotated-sorted-array-ii",
    title: "Search in Rotated Sorted Array II",
    leetcodeNumber: 81,
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Binary Search",
    learningObjective: "Search a target in a rotated sorted array containing duplicates, shrinking bounds when ends are identical.",
    concepts: ["Arrays", "Binary Search"],
    hints: [
      "This is like Search in Rotated Sorted Array I, but duplicates are allowed.",
      "If nums[left] == nums[mid] == nums[right], we cannot determine which half is sorted. In this case, just increment left and decrement right.",
      "Otherwise, perform the same sorted-half checks as Search in Rotated Sorted Array I."
    ],
    timeComplexity: "O(N) worst case, O(log N) average",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=oTfRrJyKbWA",
    leetcodeLink: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/"
  },
  {
    id: "longest-substring-with-at-most-k-distinct-characters",
    title: "Longest Substring with At Most K Distinct Characters",
    leetcodeNumber: 340,
    difficulty: "Medium",
    topic: "Sliding Window",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Sliding Window",
    learningObjective: "Find the longest substring with at most K unique characters in O(N) using sliding window and map.",
    concepts: ["Strings", "Sliding Window", "Hash Table"],
    hints: [
      "Maintain a frequency map of characters in the window.",
      "Expand the right pointer. If map size exceeds K, shrink window from left, decrementing counts and deleting characters with count 0.",
      "Maintain the maximum window length (right - left + 1) seen."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(K)",
    youtubeLink: "https://www.youtube.com/watch?v=8VThK1D2xH0",
    leetcodeLink: "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/"
  },
  {
    id: "meeting-rooms",
    title: "Meeting Rooms",
    leetcodeNumber: 252,
    difficulty: "Easy",
    topic: "Greedy", // Intervals
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    pattern: "Intervals / Sorting",
    learningObjective: "Determine if a person can attend all meetings by sorting meeting intervals and checking for adjacent overlaps.",
    concepts: ["Arrays", "Sorting", "Intervals"],
    hints: [
      "Sort the meetings by their start times.",
      "Compare adjacent meetings: if meeting `i` starts before meeting `i-1` ends, there is an overlap.",
      "If an overlap is found, return false. Otherwise, return true."
    ],
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=PaJxmNzquyk",
    leetcodeLink: "https://leetcode.com/problems/meeting-rooms/"
  },
  {
    id: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    leetcodeNumber: 253,
    difficulty: "Medium",
    topic: "Greedy", // Intervals
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    pattern: "Intervals / Heap / Chronological Processing",
    learningObjective: "Find the minimum meeting rooms required using a Min-Heap of end times or by sorting start/end times independently.",
    concepts: ["Arrays", "Heap", "Intervals", "Sorting"],
    hints: [
      "Sort start times and end times in separate arrays.",
      "Use two pointers: one for start times, one for end times. When a meeting starts, check if a meeting has ended before it.",
      "If a meeting ended, increment the end pointer (freeing up a room). Otherwise, allocate a new room. Track the max rooms needed."
    ],
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(N)",
    youtubeLink: "https://www.youtube.com/watch?v=FwTpbYr09sI",
    leetcodeLink: "https://leetcode.com/problems/meeting-rooms-ii/"
  },
  {
    id: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    leetcodeNumber: 4,
    difficulty: "Hard",
    topic: "Binary Search",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Adobe"],
    pattern: "Binary Search on Partition Size",
    learningObjective: "Find the median of two sorted arrays in O(log(min(M, N))) time by partitioning them search-wise.",
    concepts: ["Arrays", "Binary Search", "Divide and Conquer"],
    hints: [
      "To solve in O(log(M+N)) or O(log(min(M,N))), we must avoid merging the arrays. We want to find a partition point in both arrays such that elements on the left are smaller than elements on the right.",
      "Perform binary search on the partition size of the smaller array. Let this partition be `i` and the matching partition in the larger array be `j`.",
      "Verify if partition is correct: left_A <= right_B and left_B <= right_A. Adjust search accordingly, and calculate median from the boundary values."
    ],
    timeComplexity: "O(log(min(M, N)))",
    spaceComplexity: "O(1)",
    youtubeLink: "https://www.youtube.com/watch?v=q6IEA26hv_M",
    leetcodeLink: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
  },
  {
    id: "regular-expression-matching",
    title: "Regular Expression Matching",
    leetcodeNumber: 10,
    difficulty: "Hard",
    topic: "Dynamic Programming",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple"],
    pattern: "Multi-dimensional DP",
    learningObjective: "Implement regex matching with '.' and '*' using a 2D DP grid or recursion with memoization.",
    concepts: ["Dynamic Programming", "Recursion", "Strings"],
    hints: [
      "Let dp[i][j] represent whether s[i..] matches p[j..].",
      "If p[j+1] is '*', we have two choices: skip the character and '*' (dp[i][j+2]), or match the character if it matches s[i] and continue matching s[i+1] with the same pattern (dp[i+1][j]).",
      "If p[j+1] is not '*', check if s[i] matches p[j] (either exact match or '.') and recurse with dp[i+1][j+1]."
    ],
    timeComplexity: "O(S * P) where S, P are lengths of s and p",
    spaceComplexity: "O(S * P)",
    youtubeLink: "https://www.youtube.com/watch?v=HAAoL328y80",
    leetcodeLink: "https://leetcode.com/problems/regular-expression-matching/"
  }
];
