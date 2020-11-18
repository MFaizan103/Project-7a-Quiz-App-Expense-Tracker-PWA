import React from "react";
import { Answerobject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: Answerobject | undefined;
  questionNr: number;
  totalQuestion: number;
};

export const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestion,
}) => {
  console.log(userAnswer?.answer);

  return (
    <div className="qCard">
      <p className="number">
        Question:{questionNr}/{totalQuestion}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div className="answers">
        {answers.map((e_ans) => (
          <div key={e_ans}>
            <button
              className={
                userAnswer?.correctAnswer === e_ans
                  ? "btn_correct"
                  : userAnswer?.correctAnswer !== e_ans &&
                    userAnswer?.answer === e_ans
                  ? "btn_wrong"
                  : "btn"
              }
              disabled={userAnswer ? true : false}
              value={e_ans}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: e_ans }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
