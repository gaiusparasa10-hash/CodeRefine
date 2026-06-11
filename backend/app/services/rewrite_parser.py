def parse_rewrite_response(response: str):

    try:

        code_part = response.split(
            "### Explanation"
        )[0]

        explanation_part = response.split(
            "### Explanation"
        )[1]

        optimized_code = code_part.replace(
            "### Optimized Code",
            ""
        ).strip()

        explanation = explanation_part.strip()

        return {

            "optimized_code":
                optimized_code,

            "explanation":
                explanation

        }

    except Exception:

        return {

            "optimized_code":
                response,

            "explanation":
                "Unable to parse explanation."

        }