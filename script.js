const questions = [
	{
		question: "How to delete a directory in Linux?",
		choices: ["rmdir", "remove", "ls", "delete"],
		correctAnswer: "rmdir",
	},
	{
		question: "Which of the following is a command in Linux?",
		choices: ["w", "x", "t", "All of the above"],
		correctAnswer: "w",
	},
	{
		question:
			"When looking for all the processes running on a Linux system, what command should you use?",
		choices: ["service", "oterm", "ps", "xrun"],
		correctAnswer: "ps",
	},
	{
		question:
			"Which of the following is a text editor that can be used in command mode to edit files on a Linux system?",
		choices: ["vi or vim", "lsof", "open", "edit"],
		correctAnswer: "vi or vim",
	},
	{
		question: "Which command is used to create file archives in Linux?",
		choices: ["tar", "zip", "gzip", "compress"],
		correctAnswer: "tar",
	},
	{
		question: "The /etc/shadow file in Linux is used to store:",
		choices: [
			"filesystem information",
			"various password information",
			"root user shell",
			"command aliases",
		],
		correctAnswer: "various password information",
	},
	{
		question:
			"The following command can be used for turning off or restarting a Linux host.",
		choices: ["reboot", "shutdown", "exit", "taskkill"],
		correctAnswer: "shutdown",
	},
	{
		question:
			"Which of the following key combinations allows to terminate the current process in Linux shell?",
		choices: ["Ctrl + C", "Ctrl + Z", "Ctrl + A", "Ctrl + L"],
		correctAnswer: "Ctrl + C",
	},
	{
		question:
			"What is the default working directory of the Linux administrator user?",
		choices: ["/root", "/home/root", "/usr/admin", "/admin"],
		correctAnswer: "/root",
	},
	{
		question: "Who designed the Linux OS?",
		choices: ["Linus Torvalds", "Steve Jobs", "Steve Wozniak", "Steve Linus"],
		correctAnswer: "Linus Torvalds",
	},
];

let score = 0;
let currentQuestionIndex = 0;
let isQuizStarted = false;

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const quizBox = document.getElementById("quiz-box");

// This function checks if the selected answer is correct and updates the score and current question index accordingly.
function checkAnswer(selectedAnswer) {
	if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
		score++;
	}
	currentQuestionIndex++;
	showNextQuestion();
}

function showProgress() {
	const progressElement = document.getElementById("progress");
	progressElement.innerHTML = `Question ${currentQuestionIndex + 1} of ${
		questions.length
	}`;
}
function showResults() {
	const quizElement = document.getElementById("quiz-content");
	const resultContainer = document.createElement("div");
	const restartBtn = document.createElement("button");
	resultContainer.className = "card-content";
	resultContainer.innerHTML = `<h3>Your final score is ${score * 10}/${
		questions.length * 10
	}</h3>`;
	restartBtn.innerHTML = "Retake Quiz";
    quizBox.style.display = "none";
	restartBtn.onclick = () => {
		score = 0;
		currentQuestionIndex = 0;
		isQuizStarted = false;
		resultContainer.style.display = "none";
		startQuiz();
	};
	resultContainer.appendChild(restartBtn);
	quizElement.appendChild(resultContainer);
}

function startQuiz() {
	// Display the intro text and start button
	if (isQuizStarted === false) {
		const introText = document.getElementById("intro");
		const startBtn = document.getElementById("start");
		introText.style.display = "flex";

		startBtn.onclick = () => {
			isQuizStarted = true;
			introText.style.display = "none";
            quizBox.style.display = "block";
			showNextQuestion();
		};
		return;
	}
	showNextQuestion();
}

function showNextQuestion() {
	if (currentQuestionIndex < questions.length) {
		// Display the current question
		questionElement.innerHTML = questions[currentQuestionIndex].question;

		// Clear previous choices
		choicesElement.innerHTML = "";

		// Display multiple-choice answers
		questions[currentQuestionIndex].choices.forEach((choice) => {
			const button = document.createElement("button");
			button.innerHTML = choice;
			button.onclick = () => checkAnswer(choice);
			choicesElement.appendChild(button);
		});

		// Update progress
		showProgress();
	} else {
		showResults();
	}
}

startQuiz();
