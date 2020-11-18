import { shuffleArray } from "./Utils";
export type Question = {
  cartegory: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestion = async (
  amount: number,
  difficulty: Difficulty
) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
