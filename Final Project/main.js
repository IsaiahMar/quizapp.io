
var answers;
var quizData = [];
var checked;
var correct;
function generateQuizData() {
    for(var i=0; i<20; i++) {
        var num1 = Math.floor(Math.random() * 20);// generates random number
        var num2 = Math.floor(Math.random() * 20);// Generates random number
        var correctAnswer = num1 + num2; // add both of the random numbers to equal the correct answer
        var wrongAnswer1 = correctAnswer + Math.floor(Math.random() * 3) + 1; 
        var wrongAnswer2 = correctAnswer - Math.floor(Math.random() * 3) - 1;
        var question = "What is " + num1 + " + " + num2 + "?"; // Generates the question
        var answers = [correctAnswer, wrongAnswer1, wrongAnswer2]; // array of both the right answer and wrong answers 
        answers.sort(() => Math.random() - 0.5);
        correct = answers.indexOf(correctAnswer);
        quizData.push({question: question, answers: answers, correct: correct}); // pushes the question and answers in an array
    }
}
generateQuizData();
function displayQuiz(){ 
var quizDiv = document.getElementById("quiz");
for(var i=0; i<quizData.length; i++) {
    var qDiv = document.createElement("div");
    qDiv.innerHTML = "<p>"+quizData[i].question+"</p>";
    qDiv.className = "div1"
    for(var j=0; j<quizData[i].answers.length; j++) {
        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "question"+i;
        radio.value = j;
        qDiv.appendChild(radio);
        qDiv.innerHTML += quizData[i].answers[j]+"<br>";
    }
    quizDiv.appendChild(qDiv);
}
document.getElementById("start").disabled = true;
}
 
function checkAllSelected() {
  for (var i = 0; i < quizData.length; i++) {
      var radio = document.getElementsByName("question" + i);
    var selected = false;
     for (var j = 0; j < radio.length; j++) {
     if (radio[j].checked) {
          selected = true;
          break;
        }
      }
      if (!selected) {
        return false;
      }
    }
    return true;
  }
  
function submitAnswer() {
  var score = 0;
  // If all of the radio buttons are not clicked then your score will not be displayed
  if (checkAllSelected()){
      for (var i = 0; i < quizData.length; i++) {
          var radios = document.getElementsByName("question" + i);
          for (var j = 0; j < radios.length; j++) {
              var radio = radios[j];
              if (radio.value == quizData[i].correct && radio.checked) {
                  score++;
              }
          }
      }
      
      document.getElementById("results").innerHTML = "You got " + score + " out of " + quizData.length + " questions"; // displays the final score you got on the quiz
  } else {
      alert("Please select all the questions");
  }
}


