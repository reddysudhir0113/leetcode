// Learning Center guides for CodeCrack
// 8 core patterns for technical coding interviews

export const learningGuides = [
  {
    id: "array-patterns",
    title: "Array Patterns",
    description: "Master techniques for indexing, prefix sums, and element accumulation.",
    theory: "Arrays are the most fundamental data structure. Interview questions often test your ability to query, rearrange, or compute aggregates of elements in-place with O(1) extra space. Important sub-patterns include Prefix Sums (precomputing cumulative sums to answer range sum queries in O(1)), and Two-Pointer swaps.",
    visualExplanation: `
Prefix Sum Visual Representation:
Input Array:      [ 1,  2,  3,  4,  5 ]
Prefix Sum Array: [ 1,  3,  6, 10, 15 ]
Sum of range [1, 3] = Prefix[3] - Prefix[0] = 10 - 1 = 9 (which is 2 + 3 + 4)
    `,
    sampleProblems: ["two-sum", "best-time-to-buy-and-sell-stock", "product-of-array-except-self"],
    commonTricks: [
      "Use prefix arrays to solve range queries in O(1) time.",
      "Traverse from both ends to solve in-place swapping or sorting elements.",
      "Consider using the array elements as indices (e.g., negating elements) to find duplicates or missing numbers in O(N) time and O(1) space."
    ]
  },
  {
    id: "hashmap-patterns",
    title: "HashMap Patterns",
    description: "Utilize fast lookup tables for frequency counting and indexing.",
    theory: "HashMaps provide average O(1) time complexity for insertion, deletion, and lookup. In interviews, they are frequently used to replace O(N^2) nested loops with a single linear scan by recording elements we have already visited.",
    visualExplanation: `
Complement Lookup Flow (Two Sum with Target = 9):
Index 0: val = 2, complement = 7. HashMap is empty. Insert {2: 0}.
Index 1: val = 7, complement = 2. HashMap contains 2! Pair found: indices [0, 1].
    `,
    sampleProblems: ["two-sum", "contains-duplicate", "group-anagrams", "longest-consecutive-sequence"],
    commonTricks: [
      "Use HashMaps for fast O(1) complement lookups (Target - Current).",
      "Store character counts in a 26-integer array for ASCII strings to optimize space.",
      "Use serialized keys (e.g., sorting anagrams or converting coordinate steps to strings) as HashMap keys."
    ]
  },
  {
    id: "sliding-window-patterns",
    title: "Sliding Window Patterns",
    description: "Track contiguous subarrays using dynamically resized pointers.",
    theory: "The Sliding Window pattern is used to perform operations on a specific window size of a list, avoiding nested loops. It is primarily used for finding contiguous sub-arrays or sub-strings that satisfy certain criteria (e.g. longest substring, minimum window). Pointers move strictly left-to-right, ensuring O(N) execution.",
    visualExplanation: `
Sliding Window Expansion/Contraction (Window with max 2 unique characters):
[a  b  c  b  a] -> L = 0, R = 0: Window [a] (Valid, size 1)
L = 0, R = 1: Window [a, b] (Valid, size 2)
L = 0, R = 2: Window [a, b, c] (Invalid: 3 unique: a, b, c) -> Shrink left!
L = 1, R = 2: Window [b, c] (Valid, size 2)
    `,
    sampleProblems: ["longest-substring-without-repeating-characters", "longest-repeating-character-replacement", "minimum-window-substring"],
    commonTricks: [
      "Expand the right boundary until the window becomes invalid, then contract the left boundary until it becomes valid again.",
      "Maintain a running counter or hash map of items within the active window.",
      "The length of the window is always computed as: Right - Left + 1."
    ]
  },
  {
    id: "two-pointer-patterns",
    title: "Two Pointer Patterns",
    description: "Navigate arrays from opposite directions or at different speeds.",
    theory: "Two Pointers is a technique where two references are used to iterate through a data structure. This is extremely common for sorted arrays, linked lists, and palindromes. The pointers can either start at opposite ends and move toward each other, or move in the same direction at different speeds (slow/fast pointers).",
    visualExplanation: `
Opposite End Two Pointers (Valid Palindrome):
S = "r a c e c a r"
     ^           ^
     L           R   (Compare 'r' == 'r', increment L, decrement R)
       ^       ^
       L       R     (Compare 'a' == 'a', etc., until L >= R)
    `,
    sampleProblems: ["valid-palindrome", "3sum", "container-with-most-water", "linked-list-cycle"],
    commonTricks: [
      "Use pointers at the start and end of a sorted array to search for pairs summing to target, avoiding binary search.",
      "Use slow and fast pointers (moving 1 and 2 steps) to detect cycles or find the midpoint of a linked list.",
      "Always verify boundaries to avoid Out of Bounds exceptions when shifting pointers."
    ]
  },
  {
    id: "binary-search-patterns",
    title: "Binary Search Patterns",
    description: "Search in logarithmic time by dividing problem spaces in halves.",
    theory: "Binary Search is a divide-and-conquer algorithm that cuts the search space in half at each step. Beyond finding a target in a sorted list, it is used on 'rotated' lists and 'Binary Search on Answer' (searching for a minimum/maximum valid rate/capacity in a continuous integer range).",
    visualExplanation: `
Binary Search Decision Range:
Sorted: [ 1,  3,  5,  7,  9, 11, 13 ]
          L        M             R    (mid = 7. Target = 11 > 7 -> Search right)
                      L    M     R    (L moves to mid+1 = 9. mid = 11. Found!)
    `,
    sampleProblems: ["search-in-rotated-sorted-array", "find-minimum-in-rotated-sorted-array", "koko-eating-bananas"],
    commonTricks: [
      "Use mid = left + Math.floor((right - left) / 2) to prevent integer overflow.",
      "For rotated sorted arrays, determine which side is sorted first by comparing boundary values.",
      "If the values are binary-valid (e.g. Yes/No partition), use binary search to locate the boundary of transition."
    ]
  },
  {
    id: "tree-patterns",
    title: "Tree Patterns",
    description: "Recursive depth-first traversals and breadth-first level queues.",
    theory: "Trees represent hierarchical data structures. Interview tree questions are almost always solved recursively using DFS (Pre-order, In-order, Post-order) or iteratively using a queue for BFS (Level-order). Tracking node relationships and propagating values down or up are core skills.",
    visualExplanation: `
Breadth-First Level Traversal (Queue Processing):
    1         Queue: [1]
   / \\        Pop 1, Level=[1], Enqueue children: Queue: [2, 3]
  2   3       Pop 2, Enqueue 4, Queue: [3, 4]
 /            Pop 3, Queue: [4], Level=[2, 3]
4             Pop 4, Queue: [], Level=[4]
    `,
    sampleProblems: ["invert-binary-tree", "maximum-depth-of-binary-tree", "binary-tree-level-order-traversal", "validate-binary-search-tree"],
    commonTricks: [
      "Most tree problems are solved recursively. Think of the base case first (usually `if (node === null) return 0/null`).",
      "For BSTs, remember that an in-order traversal yields elements in sorted ascending order.",
      "Pass parameters down to convey bounds, and return values up to accumulate height or sums."
    ]
  },
  {
    id: "graph-patterns",
    title: "Graph Patterns",
    description: "Traverse networks, detect cycles, and model node dependencies.",
    theory: "Graphs represent node networks. Standard topics are finding connected components, cycle detection, topological sorting (ordering dependency nodes), and finding shortest paths. Algorithms include DFS, BFS (Kahn's algorithm), and Union-Find.",
    visualExplanation: `
Directed Dependency Graph (Topological Sort):
A -> B -> C     Adjacency: A leads to B, B leads to C.
                DFS coloring detects cycles (moving to a node currently in the stack).
                Kahn's BFS counts incoming edges (in-degree).
    `,
    sampleProblems: ["number-of-islands", "clone-graph", "course-schedule", "pacific-atlantic-water-flow"],
    commonTricks: [
      "Use an adjacency list representation for quick lookup of a node's neighbors.",
      "Always track visited nodes to prevent infinite loops in cyclic graphs.",
      "Use Union-Find for dynamic connectivity and fast cycle detection in undirected graphs."
    ]
  },
  {
    id: "dynamic-programming-patterns",
    title: "Dynamic Programming Patterns",
    description: "Optimize computations using memoization and tabular grids.",
    theory: "Dynamic Programming (DP) solves complex problems by breaking them down into simpler sub-problems and storing their results. Key signs of a DP problem are: (1) Overlapping Subproblems and (2) Optimal Substructure. DP can be Top-Down (recursion + memoization) or Bottom-Up (tabulation in an array/matrix).",
    visualExplanation: `
Fibonacci Bottom-up DP:
dp[0] = 0, dp[1] = 1
dp[2] = dp[1] + dp[0] = 1
dp[3] = dp[2] + dp[1] = 2
dp[4] = dp[3] + dp[2] = 3
Iterate to N, only keeping the last two variables to achieve O(1) space!
    `,
    sampleProblems: ["climbing-stairs", "coin-change", "longest-increasing-subsequence", "house-robber", "unique-paths"],
    commonTricks: [
      "Identify the subproblem state (e.g. dp[i] is min coins to make amount i) and the base cases.",
      "Write down the recurrence relation (e.g. dp[i] = min(dp[i - coin] + 1) ).",
      "If the DP state only depends on the previous row or previous few elements, optimize 2D grids to 1D arrays to save memory."
    ]
  }
];
