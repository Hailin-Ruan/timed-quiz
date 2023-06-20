var highscoresContainer = document.getElementById('highscores-container');
var goBackButton = document.getElementById('go-back-button');
var clearScoresButton = document.getElementById('clear-scores-button');

goBackButton.addEventListener('click', function() {
  window.location.href = 'index.html';
});

clearScoresButton.addEventListener('click', function() {
  localStorage.removeItem('scores');
  highscoresContainer.innerHTML = '';
});

function displayScores() {
  var scores = localStorage.getItem('scores');
  if (scores) {
    scores = JSON.parse(scores);
    var scoresList = document.createElement('ul');

    scores.forEach(function(score) {
      var scoreItem = document.createElement('li');
      scoreItem.textContent = score.name + ' - ' + score.score;
      scoresList.appendChild(scoreItem);
    });

    highscoresContainer.appendChild(scoresList);
  } else {
    var noScoresMessage = document.createElement('p');
    noScoresMessage.textContent = 'No scores saved yet.';
    highscoresContainer.appendChild(noScoresMessage);
  }
}

displayScores();