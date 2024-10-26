// Assessment questions and answers
const sections = [
  {
    title: "Workflow and Task Management",
    questions: [
      "We prioritize tasks effectively, focusing on high-impact work first.",
      "Our team limits work in progress to avoid task overload.",
      "We have a structured process for planning sprints and assigning tasks.",
      "Our engineers spend minimal time on task-switching or interruptions.",
      "We conduct regular retrospectives to improve our workflows."
    ]
  },
  {
    title: "Code Quality and Technical Debt",
    questions: [
      "We have a clear process for addressing technical debt on a regular basis.",
      "Code reviews are conducted consistently, focusing on quality and efficiency.",
      "Engineers follow a standard for code hygiene and documentation.",
      "Our team has guidelines for maintaining a clean, modular codebase.",
      "We proactively manage dependencies to avoid bottlenecks or bugs."
    ]
  },
  {
    title: "Tools and Automation",
    questions: [
      "Our team uses project management tools effectively for transparency and tracking.",
      "We have automated testing in place to reduce manual workload.",
      "Our CI/CD pipeline is efficient and helps speed up deployments.",
      "We use tools that support collaboration and streamline communication.",
      "We regularly assess and update our toolset to improve productivity."
    ]
  },
  {
    title: "Communication and Collaboration",
    questions: [
      "We have clear guidelines for communication to minimize unnecessary interruptions.",
      "Engineers have regular, productive meetings to align on priorities.",
      "Our team collaborates effectively across departments (e.g., Product, QA).",
      "There is a clear feedback loop for ongoing improvements in the development process.",
      "Engineers feel empowered to share ideas and suggest process improvements."
    ]
  }
];

let currentSection = 0;
let totalScore = 0;

// Function to load a section
function loadSection() {
  const section = sections[currentSection];
  const assessmentDiv = document.getElementById("assessment");
  assessmentDiv.innerHTML = `<h2>${section.title}</h2>`;
  
  section.questions.forEach((question, index) => {
    assessmentDiv.innerHTML += `
      <p>${question}</p>
      <select id="question-${currentSection}-${index}">
        <option value="1">1 - Never</option>
        <option value="2">2 - Rarely</option>
        <option value="3">3 - Sometimes</option>
        <option value="4">4 - Often</option>
        <option value="5">5 - Always</option>
      </select>
    `;
  });
}

function nextSection() {
  // Get the answers for the current section
  const section = sections[currentSection];
  section.questions.forEach((_, index) => {
    const score = parseInt(document.getElementById(`question-${currentSection}-${index}`).value);
    totalScore += score;
  });
  
  // Move to the next section or show results
  currentSection++;
  if (currentSection < sections.length) {
    loadSection();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("assessment").classList.add("hidden");
  document.getElementById("next-button").classList.add("hidden");
  
  let resultText = "";
  if (totalScore <= 40) {
    resultText = "Your team may be facing challenges in multiple areas. Focusing on workflow optimization, prioritization, and automation could help you see immediate improvements.";
  } else if (totalScore <= 60) {
    resultText = "Your team is doing well in some areas but could still benefit from streamlining processes and enhancing collaboration.";
  } else {
    resultText = "Your team’s workflow is well-optimized, though there may still be opportunities to fine-tune and improve in specific areas.";
  }

  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `
    <h2>Assessment Complete</h2>
    <p>${resultText}</p>
    <p><strong>Total Score: ${totalScore}</strong></p>
    <p>Want tailored recommendations? <a href="https://calendly.com/your-consultation-link" target="_blank">Book a free 15-minute consultation!</a></p>
  `;
}

// Initial load
loadSection();
