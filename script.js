
// NAVIGATION
function showSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

// PLACEMENT CHATBOT
function sendMessage() {
    const input = document.getElementById("userMessage");
    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user-message");
    input.value = "";

    const response = getBotResponse(message);

    setTimeout(() => {
        addMessage(response, "bot-message");
    }, 300);
}

function addMessage(message, className) {
    const chat = document.getElementById("chatMessages");
    const div = document.createElement("div");

    div.className = className;
    div.textContent = message;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function getBotResponse(message) {
    const text = message.toLowerCase();

    if (text.includes("resume")) {
        return "A good resume should include your contact details, career objective, education, technical skills, projects and achievements. Keep it clear and relevant to the job.";
    }

    if (text.includes("interview")) {
        return "Prepare your introduction, core technical subjects, projects, strengths, weaknesses and company-related questions. Practice speaking your answers clearly.";
    }

    if (text.includes("aptitude")) {
        return "Start with percentages, ratios, averages, time and work, profit and loss, number systems and logical reasoning. Practice questions daily.";
    }

    if (text.includes("placement") || text.includes("job")) {
        return "Start by preparing your resume, aptitude, technical subjects, communication skills and interview questions. Practice consistently and apply for suitable opportunities.";
    }

    if (text.includes("hr")) {
        return "Common HR questions include Tell me about yourself, Why should we hire you?, What are your strengths? and Where do you see yourself in five years?";
    }

    if (text.includes("skill")) {
        return "Important placement skills include problem solving, communication, programming fundamentals, aptitude, teamwork and subject knowledge.";
    }

    if (text.includes("hello") || text.includes("hi")) {
        return "Hello! Welcome to Agent for Placement. Ask me about resumes, interviews, aptitude or placement preparation.";
    }

    return "I can help with resume preparation, technical interviews, HR questions, aptitude and placement guidance. Please ask me about one of these topics.";
}


// RESUME ANALYZER
function analyzeResume() {
    const fileInput = document.getElementById("resumeFile");
    const result = document.getElementById("resumeResult");

    if (!fileInput.files.length) {
        result.textContent = "Please upload a resume first.";
        return;
    }

    const file = fileInput.files[0];
    const extension = file.name.split(".").pop().toLowerCase();

    if (extension !== "txt") {
        result.textContent =
            "This basic version analyzes .txt resumes only. PDF and Word parsing is not configured.";
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const content = event.target.result.toLowerCase();

        const sections = [
            "education",
            "skills",
            "projects",
            "experience",
            "certifications",
            "contact"
        ];

        let found = 0;
        let output = "<h3>Resume Analysis Results</h3>";

        sections.forEach(section => {
            const exists = content.includes(section);

            if (exists) found++;

            output += `<p>${exists ? "✅" : "❌"} ${section.toUpperCase()}</p>`;
        });

        const percentage = Math.round(
            (found / sections.length) * 100
        );

        output += `<h3>Basic Section Checklist: ${percentage}%</h3>`;
        output += "<p>This is a section-presence check, not an ATS score.</p>";

        result.innerHTML = output;
    };

    reader.readAsText(file);
}


// TECHNICAL INTERVIEW QUESTIONS
const technicalData = [
    {
        q: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language"
        ],
        answer: 0
    },
    {
        q: "Which language is used for styling web pages?",
        options: ["Python", "CSS", "Java"],
        answer: 1
    },
    {
        q: "Which data structure follows FIFO?",
        options: ["Stack", "Queue", "Tree"],
        answer: 1
    },
    {
        q: "Which keyword declares a constant in JavaScript?",
        options: ["let", "var", "const"],
        answer: 2
    },
    {
        q: "Which SQL command retrieves data?",
        options: ["SELECT", "DELETE", "UPDATE"],
        answer: 0
    }
];


// HR QUESTIONS
const hrData = [
    {
        q: "Tell me about yourself.",
        a: "Introduce your education, technical skills, projects, strengths and career goals."
    },
    {
        q: "What are your strengths?",
        a: "Mention genuine strengths such as problem-solving, teamwork, adaptability and willingness to learn."
    },
    {
        q: "Why should we hire you?",
        a: "Explain how your skills, projects, dedication and ability to learn can contribute to the organization."
    },
    {
        q: "Where do you see yourself in five years?",
        a: "Explain that you want to grow professionally, improve your expertise and take greater responsibilities."
    },
    {
        q: "What is your weakness?",
        a: "Mention a genuine area you are improving and explain the steps you are taking to improve it."
    }
];


// APTITUDE QUESTIONS
const aptitudeData = [
    {
        q: "What is 20% of 200?",
        options: ["20", "40", "60"],
        answer: 1
    },
    {
        q: "What is the average of 10, 20 and 30?",
        options: ["15", "20", "25"],
        answer: 1
    },
    {
        q: "If 5 pens cost ₹50, what is the cost of one pen?",
        options: ["₹5", "₹10", "₹15"],
        answer: 1
    },
    {
        q: "What comes next: 2, 4, 6, 8, ?",
        options: ["9", "10", "12"],
        answer: 1
    },
    {
        q: "A person travels 60 km in 2 hours. What is the speed?",
        options: ["20 km/h", "30 km/h", "40 km/h"],
        answer: 1
    }
];


// DISPLAY MCQ QUESTIONS
function displayQuiz(data, containerId, type) {
    const container = document.getElementById(containerId);

    data.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "question";

        const heading = document.createElement("h3");
        heading.textContent = `${index + 1}. ${item.q}`;
        div.appendChild(heading);

        item.options.forEach((option, optionIndex) => {
            const label = document.createElement("label");
            label.className = "option";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `${type}-${index}`;
            radio.value = optionIndex;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(" " + option));

            div.appendChild(label);
        });

        const button = document.createElement("button");
        button.textContent = "Check Answer";

        const feedback = document.createElement("p");
        feedback.className = "answer";

        button.onclick = function() {
            const selected = div.querySelector(
                `input[name="${type}-${index}"]:checked`
            );

            if (!selected) {
                feedback.textContent = "Please select an answer.";
                return;
            }

            const correct = Number(selected.value) === item.answer;

            feedback.textContent = correct
                ? "✅ Correct answer!"
                : "❌ Incorrect. Correct answer: " +
                  item.options[item.answer];

            feedback.style.color = correct ? "green" : "red";

            if (correct) {
                button.disabled = true;
                button.textContent = "Completed";
            }
        };

        div.appendChild(button);
        div.appendChild(feedback);
        container.appendChild(div);
    });
}


// DISPLAY HR QUESTIONS
function displayHRQuestions() {
    const container = document.getElementById("hrQuestions");

    hrData.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "question";

        const heading = document.createElement("h3");
        heading.textContent = `${index + 1}. ${item.q}`;

        const button = document.createElement("button");
        button.textContent = "Show Sample Answer";

        const answer = document.createElement("p");
        answer.className = "answer";
        answer.hidden = true;

        answer.textContent = item.a;

        button.onclick = function() {
            answer.hidden = !answer.hidden;
            button.textContent = answer.hidden
                ? "Show Sample Answer"
                : "Hide Sample Answer";
        };

        div.append(heading, button, answer);
        container.appendChild(div);
    });
}


// PLACEMENT PROGRESS TRACKER
const tasks = [
    "Resume Preparation",
    "Technical Interview Practice",
    "HR Interview Preparation",
    "Aptitude Practice",
    "Company Research",
    "Communication Skills"
];

function loadProgress() {
    const container = document.getElementById("taskList");
    container.innerHTML = "";

    tasks.forEach((task, index) => {
        const label = document.createElement("label");
        label.className = "task-item";
        label.style.display = "block";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked =
            localStorage.getItem("placementTask" + index) === "true";

        checkbox.onchange = function() {
            localStorage.setItem(
                "placementTask" + index,
                checkbox.checked
            );
            updateProgress();
        };

        label.append(checkbox, document.createTextNode(task));
        container.appendChild(label);
    });

    updateProgress();
}

function updateProgress() {
    let completed = 0;

    tasks.forEach((task, index) => {
        if (localStorage.getItem("placementTask" + index) === "true") {
            completed++;
        }
    });

    const percentage = Math.round(
        (completed / tasks.length) * 100
    );

    document.getElementById("completed").textContent = completed;
    document.getElementById("score").textContent = percentage + "%";
    document.getElementById("progressBar").style.width =
        percentage + "%";

    document.getElementById("progressText").textContent =
        percentage + "% completed (" + completed +
        " of " + tasks.length + " tasks)";
}


// INITIALIZE PROJECT
displayQuiz(technicalData, "technicalQuestions", "technical");
displayQuiz(aptitudeData, "aptitudeQuestions", "aptitude");
displayHRQuestions();
loadProgress();
