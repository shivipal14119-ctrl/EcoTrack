
// ==================================
// 1. MOBILE NAVIGATION
// ==================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

document.querySelectorAll("#navLinks a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});


// ==================================
// 2. ECO CHALLENGES
// ==================================

const challenges = document.querySelectorAll(".challenge-check");
const progressText = document.getElementById("challengeProgress");
const progressFill = document.getElementById("progressFill");

function updateProgress() {
    let completed = 0;

    challenges.forEach(function (challenge) {
        if (challenge.checked) {
            completed++;
        }
    });

    let percentage = (completed / challenges.length) * 100;

    progressText.textContent =
        completed + " out of " + challenges.length +
        " challenges completed";

    progressFill.style.width = percentage + "%";
}

challenges.forEach(function (challenge) {
    challenge.addEventListener("change", updateProgress);
});

document.getElementById("resetChallenges").addEventListener("click", function () {
    challenges.forEach(function (challenge) {
        challenge.checked = false;
    });

    updateProgress();
});


// ==================================
// 3. ENVIRONMENTAL QUIZ
// ==================================

const questions = [
    {
        question: "Which of these is a renewable energy source?",
        answers: ["Coal", "Solar Energy", "Petrol", "Diesel"],
        correct: "Solar Energy"
    },
    {
        question: "Which bin is generally used for recyclable paper?",
        answers: ["Paper recycling bin", "General waste bin", "Food waste bin", "None"],
        correct: "Paper recycling bin"
    },
    {
        question: "What does planting trees help reduce?",
        answers: ["Oxygen", "Carbon dioxide", "Rainfall", "Clean air"],
        correct: "Carbon dioxide"
    },
    {
        question: "Which item can be composted?",
        answers: ["Plastic bottle", "Fruit peels", "Glass jar", "Metal can"],
        correct: "Fruit peels"
    },
    {
        question: "What is the best way to save electricity?",
        answers: [
            "Keep lights on",
            "Leave appliances running",
            "Switch off unused lights",
            "Use more electricity"
        ],
        correct: "Switch off unused lights"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("quizFeedback");
const nextButton = document.getElementById("nextQuestion");
const quizResult = document.getElementById("quizResult");

function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    questionText.textContent = current.question;

    answersContainer.innerHTML = "";
    feedback.textContent = "";
    nextButton.disabled = true;

    current.answers.forEach(function (answer) {
        const button = document.createElement("button");

        button.textContent = answer;
        button.className = "answer-btn";

        button.addEventListener("click", function () {
            checkAnswer(button, answer);
        });

        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedButton, selectedAnswer) {
    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].correct;

    const allButtons = answersContainer.querySelectorAll("button");

    allButtons.forEach(function (button) {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedAnswer === correctAnswer) {
        score++;
        feedback.textContent = "Correct! Great job! 🌱";
        feedback.style.color = "green";
    } else {
        selectedButton.classList.add("wrong");
        feedback.textContent = "Incorrect! Correct answer: " + correctAnswer;
        feedback.style.color = "red";
    }

    nextButton.disabled = false;
}

nextButton.addEventListener("click", function () {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        questionNumber.textContent = "Quiz Completed!";
        questionText.textContent = "";
        answersContainer.innerHTML = "";
        feedback.textContent = "";

        nextButton.style.display = "none";

        quizResult.textContent =
            "Your Score: " + score + " / " + questions.length;

        const restartButton = document.createElement("button");
        restartButton.textContent = "Try Again";
        restartButton.className = "btn";

        restartButton.addEventListener("click", function () {
            currentQuestion = 0;
            score = 0;
            nextButton.style.display = "inline-block";
            quizResult.textContent = "";
            showQuestion();
        });

        quizResult.appendChild(document.createElement("br"));
        quizResult.appendChild(restartButton);
    }
});

showQuestion();


// ==================================
// 4. CARBON FOOTPRINT CALCULATOR
// ==================================

const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", function () {

    const electricity = document.getElementById("electricity").value;
    const travel = document.getElementById("travel").value;

    const result = document.getElementById("carbonResult");

    if (
        electricity.trim() === "" ||
        travel.trim() === "" ||
        !Number.isFinite(Number(electricity)) ||
        !Number.isFinite(Number(travel)) ||
        Number(electricity) < 0 ||
        Number(travel) < 0
    ) {
        result.textContent =
            "Please enter valid non-negative numbers in both fields.";
        return;
    }

    const electricityEmission = Number(electricity) * 0.7;
    const travelEmission = Number(travel) * 0.2;

    const total = electricityEmission + travelEmission;

    result.textContent =
        "Your estimated monthly carbon footprint is " +
        total.toFixed(2) + " kg CO₂.";
});
