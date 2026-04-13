export interface CodeLine {
  timestamp: number;
  line: number;
  code: string;
  type: string;
  instructorQuote?: string;
  diff?: string;
}

export interface Concept {
  term: string;
  shortDesc: string;
  fullDesc: string;
  docsLink: string;
  examples: string[];
  color: 'yellow' | 'blue' | 'purple' | 'green' | 'orange';
}

export interface Annotation {
  id: string;
  timestamp: number;
  author: string;
  text: string;
  likes: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  hint: string;
}

export const TUTORIAL_CODE_TIMELINE: CodeLine[] = [
  { timestamp: 0, line: 1, code: "# Python Fibonacci with Memoization", type: "comment", instructorQuote: "Welcome! Today we'll explore memoization with Fibonacci.", diff: "+1 line" },
  { timestamp: 15, line: 2, code: "from functools import lru_cache", type: "import", instructorQuote: "We import lru_cache from functools - Python's built-in memoization tool.", diff: "+import statement" },
  { timestamp: 30, line: 3, code: "", type: "empty", instructorQuote: "A blank line for readability.", diff: "+blank line" },
  { timestamp: 45, line: 4, code: "@lru_cache(maxsize=None)", type: "decorator", instructorQuote: "This decorator caches results automatically - no manual work needed!", diff: "+decorator" },
  { timestamp: 60, line: 5, code: "def fibonacci(n: int) -> int:", type: "function", instructorQuote: "We define fibonacci with type hints for clarity.", diff: "+function definition" },
  { timestamp: 75, line: 6, code: '    """Calculate nth Fibonacci number."""', type: "docstring", instructorQuote: "Always document your functions!", diff: "+docstring" },
  { timestamp: 90, line: 7, code: "    if n <= 1:", type: "condition", instructorQuote: "The base case - recursion needs a stopping point.", diff: "+base case" },
  { timestamp: 105, line: 8, code: "        return n", type: "return", instructorQuote: "Return 0 for n=0, 1 for n=1.", diff: "+return" },
  { timestamp: 120, line: 9, code: "    return fibonacci(n-1) + fibonacci(n-2)", type: "return", instructorQuote: "The recursive calls - notice how lru_cache prevents recomputation!", diff: "+recursive call" },
  { timestamp: 135, line: 10, code: "", type: "empty", instructorQuote: "Another blank line to separate concerns.", diff: "+blank line" },
  { timestamp: 150, line: 11, code: "# Test the function", type: "comment", instructorQuote: "Let's test our implementation.", diff: "+comment" },
  { timestamp: 165, line: 12, code: "print(fibonacci(10))  # Output: 55", type: "print", instructorQuote: "fibonacci(10) should give us 55.", diff: "+test" },
  { timestamp: 180, line: 13, code: "print(fibonacci(30))  # Output: 832040", type: "print", instructorQuote: "Even fibonacci(30) is instant thanks to memoization!", diff: "+test" },
  { timestamp: 195, line: 14, code: "print(fibonacci(100)) # Output: 354224848179261915075", type: "print", instructorQuote: "fibonacci(100) - try this without memoization and watch it hang!", diff: "+test" },
  { timestamp: 210, line: 15, code: "", type: "empty", instructorQuote: "", diff: "+blank line" },
  { timestamp: 225, line: 16, code: "# Check cache info", type: "comment", instructorQuote: "lru_cache provides cache statistics.", diff: "+comment" },
  { timestamp: 240, line: 17, code: "print(fibonacci.cache_info())", type: "print", instructorQuote: "This shows hits, misses, maxsize, and currsize.", diff: "+cache info" },
  { timestamp: 255, line: 18, code: "", type: "empty", instructorQuote: "", diff: "+blank line" },
  { timestamp: 270, line: 19, code: "# Iterative version for comparison", type: "comment", instructorQuote: "Let's compare with an iterative approach.", diff: "+comment" },
  { timestamp: 285, line: 20, code: "def fibonacci_iterative(n: int) -> int:", type: "function", instructorQuote: "Same interface, different implementation.", diff: "+function definition" },
  { timestamp: 300, line: 21, code: "    if n <= 1:", type: "condition", instructorQuote: "Same base case.", diff: "+base case" },
  { timestamp: 315, line: 22, code: "        return n", type: "return", instructorQuote: "", diff: "+return" },
  { timestamp: 330, line: 23, code: "    a, b = 0, 1", type: "assignment", instructorQuote: "Initialize our two trackers.", diff: "+init" },
  { timestamp: 345, line: 24, code: "    for _ in range(2, n + 1):", type: "loop", instructorQuote: "Iterate from 2 to n.", diff: "+loop" },
  { timestamp: 360, line: 25, code: "        a, b = b, a + b", type: "assignment", instructorQuote: "Swap and accumulate - O(1) space!", diff: "+swap" },
  { timestamp: 375, line: 26, code: "    return b", type: "return", instructorQuote: "Return the result.", diff: "+return" },
];

export const CONCEPTS: Record<string, Concept> = {
  lru_cache: {
    term: "lru_cache",
    shortDesc: "Least Recently Used cache decorator",
    fullDesc: "lru_cache is a decorator from Python's functools module that implements memoization. It caches the results of function calls, so when the same inputs occur again, the cached result is returned instead of recomputing.",
    docsLink: "https://docs.python.org/3/library/functools.html#functools.lru_cache",
    examples: [
      "@lru_cache(maxsize=128)\ndef expensive_function(n):\n    return n ** 2",
      "@lru_cache(maxsize=None)  # Unlimited cache\ndef factorial(n):\n    return n * factorial(n-1) if n > 1 else 1"
    ],
    color: "yellow"
  },
  memoization: {
    term: "memoization",
    shortDesc: "Caching technique for optimization",
    fullDesc: "Memoization is an optimization technique that stores the results of expensive function calls and returns the cached result when the same inputs occur again. It transforms exponential time complexity to linear in many recursive algorithms.",
    docsLink: "https://en.wikipedia.org/wiki/Memoization",
    examples: [
      "# Manual memoization\ncache = {}\ndef fib(n):\n    if n in cache: return cache[n]\n    cache[n] = fib(n-1) + fib(n-2)\n    return cache[n]",
    ],
    color: "blue"
  },
  recursion: {
    term: "recursion",
    shortDesc: "Function calling itself",
    fullDesc: "Recursion is when a function calls itself to solve a smaller version of the same problem. Every recursive function needs a base case (stopping condition) and a recursive case that moves toward the base case.",
    docsLink: "https://docs.python.org/3/faq/programming.html#what-is-recursion",
    examples: [
      "def factorial(n):\n    if n <= 1:  # base case\n        return 1\n    return n * factorial(n - 1)  # recursive case",
    ],
    color: "purple"
  },
  decorator: {
    term: "decorator",
    shortDesc: "Function wrapper syntax (@)",
    fullDesc: "A decorator is a design pattern in Python that allows you to modify or extend the behavior of a function without changing its source code. Decorators use the @ symbol syntax and are applied at function definition time.",
    docsLink: "https://docs.python.org/3/glossary.html#term-decorator",
    examples: [
      "def my_decorator(func):\n    def wrapper(*args, **kwargs):\n        print('Before!')\n        result = func(*args, **kwargs)\n        print('After!')\n        return result\n    return wrapper\n\n@my_decorator\ndef hello():\n    print('Hello!')",
    ],
    color: "green"
  },
  functools: {
    term: "functools",
    shortDesc: "Higher-order functions module",
    fullDesc: "functools is a Python standard library module for higher-order functions. It provides tools for working with functions and other callable objects, including lru_cache, reduce, partial, and wraps.",
    docsLink: "https://docs.python.org/3/library/functools.html",
    examples: [
      "from functools import reduce, partial\n\n# partial application\nadd5 = partial(lambda x, y: x + y, 5)\nprint(add5(3))  # 8\n\n# reduce\ntotal = reduce(lambda a, b: a + b, [1,2,3,4,5])\nprint(total)  # 15",
    ],
    color: "orange"
  }
};

export const ANNOTATIONS: Annotation[] = [
  { id: "1", timestamp: 15, author: "pythondev_42", text: "@lru_cache was added in Python 3.2 - make sure your Python version is 3.2+!", likes: 47 },
  { id: "2", timestamp: 45, author: "cs_professor", text: "The maxsize=None means unbounded cache. Use a number to limit memory usage.", likes: 83 },
  { id: "3", timestamp: 120, author: "algo_wizard", text: "This is O(n) with memoization vs O(2^n) without! Incredible speedup.", likes: 156 },
  { id: "4", timestamp: 165, author: "fibonacci_fan", text: "Fun fact: fibonacci(10) = 55 appears in nature - sunflower spirals!", likes: 29 },
  { id: "5", timestamp: 240, author: "performance_guru", text: "cache_info() is great for debugging - you can see how many cache hits vs misses you got.", likes: 64 },
];

export const CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "Rewrite Without Recursion",
    description: "Rewrite the fibonacci function using iteration instead of recursion. Bonus: Make it O(1) space complexity.",
    starterCode: "def fibonacci_iterative(n: int) -> int:\n    # Your code here\n    pass\n\nprint(fibonacci_iterative(10))  # Should print 55",
    hint: "Use two variables to track the previous two numbers. You only need the last two values at any point!"
  },
  {
    id: "2",
    title: "Space Complexity Challenge",
    description: "What's the space complexity of our memoized fibonacci? Write a function that calculates the nth fibonacci number with O(1) space.",
    starterCode: "# The memoized version uses O(n) space for the cache\n# Can you achieve O(1) space?\ndef fibonacci_constant_space(n: int) -> int:\n    # Your code here\n    pass",
    hint: "You only need to remember the last 2 values, not all n values!"
  },
  {
    id: "3",
    title: "Cache Decorator",
    description: "Implement your own simple memoization decorator (like lru_cache) from scratch using a dictionary.",
    starterCode: "def my_cache(func):\n    # Implement a simple cache decorator\n    cache = {}\n    def wrapper(*args):\n        # Your code here\n        pass\n    return wrapper\n\n@my_cache\ndef fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n-1) + fibonacci(n-2)",
    hint: "Store results in the cache dict using args as the key. Check if args is in cache before computing."
  }
];
