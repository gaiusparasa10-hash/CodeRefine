from groq import Groq
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv(usecwd=True))

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")

client = Groq(
    api_key=GROQ_API_KEY
)


def review_code(code: str, language: str):
    prompt = f"""
You are a Principal Software Engineer, Security Expert, and Static Code Analysis Specialist.

Review the following {language} code.

========================
REVIEW RULES
========================

1. Report ONLY real problems.
2. Never invent bugs.
3. Verify that an issue truly exists before reporting it.
4. Do not force issues into every severity level.
5. If no issues exist in a category, return [].
6. Do not criticize correct algorithms.
7. Do not suggest unnecessary exception handling.
8. Do not suggest replacing algorithms with built-in functions unless readability or performance improves.
9. Missing comments and naming preferences are LOW severity only.
10. Do not classify style preferences as HIGH or CRITICAL.
11. Preserve educational implementations.
12. Distinguish between:

- bugs
- security vulnerabilities
- performance issues
- maintainability issues
- code style issues

========================
SEVERITY DEFINITIONS
========================

CRITICAL:
- security vulnerabilities
- crashes
- memory corruption
- data corruption
- infinite loops
- race conditions

HIGH:
- incorrect algorithms
- logic bugs
- resource leaks
- incorrect edge case handling

MEDIUM:
- duplicated code
- unnecessary complexity
- maintainability problems
- poor structure

LOW:
- naming improvements
- formatting
- documentation suggestions
- readability improvements

========================
OPTIMIZED CODE RULES
========================

1. Always generate optimized_code.
2. optimized_code must contain complete runnable code.
3. Preserve behavior.
4. Preserve the algorithm unless a better algorithm truly exists.
5. Improve readability.
6. Improve maintainability.
7. Add type hints when appropriate.
8. Add docstrings when useful.
9. Avoid overengineering.
10. Avoid unnecessary exception handling.
11. Keep educational value.
12. If the original code is already optimal, return it unchanged.
13. Do not leave optimized_code empty.

========================
OUTPUT FORMAT
========================

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT wrap with ```json.

Return EXACTLY:

{{
    "critical": [
        {{
            "line": 0,
            "issue": "",
            "explanation": "",
            "fix": ""
        }}
    ],

    "high": [
        {{
            "line": 0,
            "issue": "",
            "explanation": "",
            "fix": ""
        }}
    ],

    "medium": [
        {{
            "line": 0,
            "issue": "",
            "explanation": "",
            "fix": ""
        }}
    ],

    "low": [
        {{
            "line": 0,
            "issue": "",
            "explanation": "",
            "fix": ""
        }}
    ],

    "summary": "",

    "optimized_code": ""
}}

========================
ISSUE FORMAT
========================

Each issue MUST contain:

{{
    "line": 0,
    "issue": "",
    "explanation": "",
    "fix": ""
}}

========================
CODE TO REVIEW
========================

{code}

"""

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    return response.choices[0].message.content


def rewrite_code(code: str, language: str):
    prompt = f"""
You are a principal software architect.

Rewrite this {language} code.

GOALS:

1. Preserve correctness.
2. Preserve the algorithm unless a better one exists.
3. Improve readability.
4. Improve maintainability.
5. Use idiomatic {language}.
6. Avoid unnecessary exception handling.
7. Avoid overengineering.
8. Keep educational value.
9. Use production-quality standards.
10. Improve time complexity only if possible.
11. Add docstrings when useful.
12. Add type hints when appropriate.
13. Prefer clarity over cleverness.
14. Do not introduce unnecessary abstractions.
15. Do not change the behavior.

Return EXACTLY:

### Optimized Code

<rewritten code>

### Explanation

- What changed
- Why it is better
- Complexity before and after
- Quality score out of 10

Code:

{code}
"""

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    return response.choices[0].message.content