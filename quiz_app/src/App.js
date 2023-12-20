import "./App.css"
import {useEffect, useState} from "react";

const questions = [
  { id: 1,
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    id: 2,
    question: "Who is known as the 'Father of Modern Physics'?",
    choices: ["Albert Einstein", "Isaac Newton", "Niels Bohr", "Galileo Galilei"],
    answer: "Albert Einstein",
  },
  {
    id: 3,
    question: "In which year did World War II end?",
    choices: ["1943", "1945", "1947", "1950"],
    answer: "1945",
  },
  {
    id: 4,
    question: "Which planet is known as the 'Red Planet'?",
    choices: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    id: 5,
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Emily Brontë"],
    answer: "William Shakespeare",
  },
  {
    id: 6,
    question: "What is the largest mammal in the world?",
    choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale",
  },
  {
    id: 7,
    question: "In what year did the United States declare its independence?",
    choices: ["1776", "1789", "1800", "1812"],
    answer: "1776",
  },
  {
    id: 8,
    question: "What is the chemical symbol for gold?",
    choices: ["Au", "Ag", "Fe", "Cu"],
    answer: "Au",
  },
  {
    id: 9,
    question: "Who painted the Mona Lisa?",
    choices: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
    answer: "Leonardo da Vinci",
  },
  {
    id: 10,
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean",
  },
  {
    id: 11,
    question: "Which mathematical constant represents the ratio of a circle's circumference to its diameter?",
    choices: ["Pi (π)", "Euler's number (e)", "Golden ratio (φ)", "Tau (τ)"],
    answer: "Pi (π)",
  },
  {
    id: 12,
    question: "What is the capital of Japan?",
    choices: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    answer: "Tokyo",
  },
  {
    id: 13,
    question: "Who developed the theory of relativity?",
    choices: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"],
    answer: "Albert Einstein",
  },
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([1]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (answeredQuestions.length < 5) {
      setRandomQuestion()
    }
    else {
      setQuizCompleted(true)
    }
  }, [answeredQuestions])


  const setRandomQuestion = () => {
    let randomQuestion

    do {
      const randomIndex = Math.floor(Math.random() * questions.length)
      randomQuestion = questions[randomIndex]
    }
    while (answeredQuestions.includes(randomQuestion.id))

    setCurrentQuestion(randomQuestion)
  };



  const handleSelection = (selectedOption) => {

    const isCorrect = selectedOption === currentQuestion.answer;

    setUserAnswers({ ...userAnswers, [currentQuestion.id]: isCorrect });
    updateScore(isCorrect)
    addQuestionToAnswered()


    setRandomQuestion();
  };

  function addQuestionToAnswered() {
    setAnsweredQuestions((prevAnsweredQuestions) => [
      ...prevAnsweredQuestions,
      currentQuestion.id,
    ]);
  }

  const updateScore = (isCorrect) => {
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
  }

  const renderQuizInterface = () => {
    return (
        <div>
          <h1>Online Quiz System</h1>

          <div className="mainDiv">

            <p>Question: {currentQuestion.question}</p>
            <div className="listDiv">
              <ul className="choiceList">
                {currentQuestion.choices &&
                    currentQuestion.choices.map((choice, index) => (
                        <li key={index}>
                          <button onClick={() => handleSelection(choice)}>
                            {choice}
                          </button>
                        </li>
                    ))}
              </ul>
            </div>
            <p>Questions Answered: {answeredQuestions.length} / 5</p>
          </div>

        </div>
    );
  };

  const renderScore = () => {
    console.log(userAnswers)
    return (
        <div>
          <h1>Quiz Completed</h1>
          <p>Your Score: {score}</p>
        </div>
    );
  };

  return (
      <div className="App">
        {!quizCompleted ? renderQuizInterface() : renderScore()}
      </div>
  );
};

export default App;