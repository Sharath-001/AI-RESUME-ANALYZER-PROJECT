from flask import Flask, request, render_template
from groq import Groq
from PyPDF2 import PdfReader
import re

app = Flask(__name__)
client = Groq(api_key="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")  # 🔐 replace

def extract_text_from_pdf(file):
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text


@app.route("/", methods=["GET", "POST"])
def index():
    result_text = ""
    ats_score = 0

    if request.method == "POST":
        file = request.files["resume"]
        resume_text = extract_text_from_pdf(file)

        prompt = f"""
        Analyze this resume:

        {resume_text}

        Give output in this EXACT format:

        ATS Score: X/100

        Verdict: (Good for jobs / Needs Improvement)

        Suitable Job Roles:
        - Role 1
        - Role 2

        Summary:
        ...

        Issues in Resume:
        ...

        Suggestions:
        ...
        """

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}]
        )

        result_text = response.choices[0].message.content

        # Extract ATS score
        ats_match = re.search(r"ATS Score:\s*(\d+)/100", result_text)
        if ats_match:
            ats_score = int(ats_match.group(1))

    return render_template(
        "index.html",
        result=result_text,
        ats_score=ats_score
    )


if __name__ == "__main__":
    app.run(debug=True)