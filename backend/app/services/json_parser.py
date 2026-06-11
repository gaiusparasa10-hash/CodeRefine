import json
import re


def parse_ai_json(response: str):

    try:

        cleaned = response.strip()

        cleaned = re.sub(
            r"```json|```python|```",
            "",
            cleaned
        )

        start = cleaned.find("{")
        end = cleaned.rfind("}")

        if start != -1 and end != -1:

            cleaned = cleaned[start:end+1]

        return json.loads(cleaned)

    except Exception as e:

        print("JSON PARSE ERROR")
        print(response)

        return {

            "optimized_code": "",

            "explanation":

                f"Failed to parse response.\n\n{e}"

        }