var quizContainer = document.querySelector('#quiz');
var resultContainer = document.querySelector('#result');
var startButton = document.querySelector('.start');
var countdownElement = document.querySelector('#countdown');
var intro = document.querySelector('#introContainer');

var nameInput = document.querySelector('#name-input');
var saveButton = document.querySelector('#save-button');
var savedMessage = document.querySelector('#saved-message');

saveButton.addEventListener('click', saveScore);

var timeRemaining = 60; 
var timerInterval;
var countdown;
var currentQuestionIndex = 0;
var questions = [
  {
    question: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'boolean', 'alerts', 'numbers'],
    correctAnswer: 'alerts'
  },
  {
    question: 'The condition in an if / else statement is enclosed with ____.',
    choices: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
    correctAnswer: 'parenthesis'
  },
  {
    question: 'Arrays in Javascript can be used to store ____.',
    choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    correctAnswer: 'all of the above'
  },
  {
    question: 'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'paranthesis'],
    correctAnswer: 'quotes'
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
    correctAnswer: 'console.log'
  },
];

startButton.addEventListener('click', startQuiz);

function startQuiz() {
  startButton.style.display = 'none'; 
  intro.style.display = 'none';
  resultContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  displayQuiz();
  startTimer();
}

function startTimer() {
  timerInterval = setInterval(function() {
    timeRemaining--;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      calculateResult();
    }

    countdownElement.textContent = formatTime(timeRemaining);
  }, 1000);
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var secondsRemaining = seconds % 60;

  var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  var formattedSeconds = secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining;

  return formattedMinutes + ':' + formattedSeconds;
}

function displayQuiz() {
  var question = questions[currentQuestionIndex];
  var choices = '';

  for (var i = 0; i < question.choices.length; i++) {
    choices += '<button class="answer-button" onclick="checkAnswer(this)" value="' + question.choices[i] + '">' + question.choices[i] + '</button>';
  }

  var output = '<div class="question">' +
    '<h3>' + question.question + '</h3>' +
    '<div class="choices">' + choices + '</div>' +
    '<div class="feedback" id="feedback-' + currentQuestionIndex + '"></div>' +
    '</div>';

  quizContainer.innerHTML = output;
}

function checkAnswer(button) {
  var selectedAnswer = button.value;
  var correctAnswer = questions[currentQuestionIndex].correctAnswer;
  var feedbackElement = document.getElementById('feedback-' + currentQuestionIndex);

  if (selectedAnswer === correctAnswer) {
    feedbackElement.textContent = 'Correct!';
  } else {
    feedbackElement.textContent = 'Wrong!';
    timeRemaining -= 10; 
  }

  var answerButtons = document.querySelectorAll('.answer-button');
  answerButtons.forEach(function(button) {
    button.disabled = true;
  });

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    setTimeout(displayQuiz, 1000);
  } else {
    setTimeout(function() {
      calculateResult();
      clearInterval(timerInterval); 
    }, 1000);
  }
}

function calculateResult() {
  var score = timeRemaining;
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  document.getElementById('score').textContent = score;
}

function saveScore() {
  var name = nameInput.value;
  var score = timeRemaining;
  
  var scores = localStorage.getItem('scores');
  if (scores) {
    scores = JSON.parse(scores);
  } else {
    scores = [];
  }

  scores.push({ name: name, score: score });
  localStorage.setItem('scores', JSON.stringify(scores));
  
  savedMessage.style.display = 'block';

  window.location.href = 'highscores.html';
}


// displayQuiz();