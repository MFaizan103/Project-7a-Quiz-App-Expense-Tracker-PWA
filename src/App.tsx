import React, { useState } from "react";
import { Difficulty, fetchQuizQuestion, QuestionState } from "./API";
import "./App.css";
import { QuestionCard } from "./components/QuestionCard";
import firebase from "./firebase";

// THIS IS DESCRIBING TYPE OF AN OBJECT
export type Answerobject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 10;

// FUNCTION REACT
const App: React.FC = () => {
  const msg = firebase.messaging();
  msg.getToken().then((token) => console.log(token));

  // STATES OF THE APP
  const [loading, setloading] = useState(false);
  const [questions, setquestions] = useState<QuestionState[]>([]);
  const [number, setnumber] = useState(0);
  const [userAnswers, setuserAnswers] = useState<Answerobject[]>([]);
  const [score, setscore] = useState(0);
  const [gameOver, setgameOver] = useState(true);

  // FUNCTION FOR STARTING QUIZ
  const startQuiz = async () => {
    setloading(true);
    setgameOver(false);
    try {
      const newQuestions = await fetchQuizQuestion(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );

      setquestions(newQuestions);
      setscore(0);
      setuserAnswers([]);
      setnumber(0);
      setloading(false);
    } catch (error) {
      alert("Oops some Error Occurs");
    }
  };

  // FUNCTION FOR CHECKING ANSWER
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // UserAnswer
      const answer = e.currentTarget.value;
      // Check Answer Against Correct Value
      const correct = questions[number].correct_answer === answer;
      // Add Score if Answer is Correct

      if (correct) setscore((prev) => prev + 1);
      // save Answers in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setuserAnswers((prev) => [...prev, answerObject]);
    }
  };

  // FUNCTION FOR NEXT QUESTION
  const nextQuestion = () => {
    // Move onto next Question if not Last Question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setgameOver(true);
    } else {
      setnumber(nextQuestion);
    }
  };

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <h3>Typescript Version</h3>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startQuiz}>
          Start Quiz
        </button>
      ) : null}

      {userAnswers.length === TOTAL_QUESTIONS ? (
        <h3 className="score">
          Your Score: {score}/{TOTAL_QUESTIONS}
        </h3>
      ) : null}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && userAnswers.length !== TOTAL_QUESTIONS ? (
        <QuestionCard
          questionNr={number + 1}
          question={questions[number].question}
          totalQuestion={TOTAL_QUESTIONS}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      ) : userAnswers.length === TOTAL_QUESTIONS ? (
        <h3 className="quiz_ended">Quiz Ended</h3>
      ) : null}

      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next_question" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
};

export default App;
