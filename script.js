// Quiz Data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questions = document.querySelectorAll('#questions div');

// Save selected answers in sessionStorage
questions.forEach((question, index) => {
  const radios = question.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      sessionStorage.setItem(`progress_q${index + 1}`, radio.value);
    });
  });
});

// Restore selected answers on page load
window.onload = () => {
  questions.forEach((question, index) => {
    const savedAnswer = sessionStorage.getItem(`progress_q${index + 1}`);
    if (savedAnswer) {
      const radio = question.querySelector(`input[type="radio"][value="${savedAnswer}"]`);
      if (radio) {
        radio.checked = true;
      }
    }
  });

  const storedScore = localStorage.getItem('score');
  if (storedScore) {
    document.getElementById('score').innerText = `Your score is ${storedScore} out of 5.`;
  }
};

// Submit button logic
document.getElementById('submit').addEventListener('click', () => {
  const correctAnswers = ['a', 'b', 'a', 'b', 'a']; // Correct options
  let score = 0;

  questions.forEach((question, index) => {
    const selected = question.querySelector('input[type="radio"]:checked');
    if (selected && selected.value === correctAnswers[index]) {
      score++;
    }
  });

  document.getElementById('score').innerText = `Your score is ${score} out of 5.`;
  localStorage.setItem('score', score);
});