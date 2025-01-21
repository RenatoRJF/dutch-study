"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import { QUESTIONS } from "@/constants/questions";

import Counter from "@/components/Counter/Counter";
import PhraseForm from "@/components/PhraseForm/PhraseForm";
import { PhraseFormData } from "@/components/PhraseForm/PhraseForm.types";

export default function PhraseChallengePage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [result, setResult] = useState({ correct: 0, wrong: 0 });
  const form = useForm({ defaultValues: { answer: "" } });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [currentAnswer, setCurrentAnswer] = useState({
    isCorrect: false,
    answer: "",
    currentAnswer: "",
  });

  const validateQuestion = ({ answer }: PhraseFormData) => {
    form.reset();

    setIsLoading(true);

    setTimeout(() => {
      const isCorrect = QUESTIONS[currentQuestion].correctAnswer === answer;
      const resultKey = isCorrect ? "correct" : "wrong";

      setCurrentAnswer({
        isCorrect,
        answer,
        currentAnswer: QUESTIONS[currentQuestion].correctAnswer,
      });

      console.log({
        isCorrect,
        answer,
        correctAnswer: QUESTIONS[currentQuestion].correctAnswer,
      });

      setTimeout(() => {
        // TODO: implement page to show result
        setResult((prev) => ({ ...prev, [resultKey]: prev[resultKey] + 1 }));

        setCurrentAnswer({ answer: "", currentAnswer: "", isCorrect: false });
        setCurrentQuestion((prev) => prev + 1);
        setIsLoading(false);
      }, 10000);
    }, 500);
  };

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // TODO: implement loading questions here
      setIsLoading(false);
      setCurrentQuestion(0);
    }, 1000);
  }, []);

  if (currentAnswer.currentAnswer) {
    const textColor = currentAnswer.isCorrect
      ? "text-green-500"
      : "text-red-500";

    return (
      <div className="min-h-svh justify-center items-center flex flex-col gap-8">
        <div className={`text-3xl text-gray-700 font-bold ${textColor}`}>
          {currentAnswer.answer}
        </div>

        <div className="text-3xl text-gray-700 font-bold">
          {currentAnswer.currentAnswer}
        </div>
      </div>
    );
  }

  if (!QUESTIONS[currentQuestion]) {
    return (
      <div className="min-h-svh justify-center items-center flex flex-col gap-8">
        <div className="text-3xl text-gray-500">
          {`${result.correct} correct answers`}
        </div>

        <div className="text-3xl text-gray-500">
          {`${result.wrong} wrong answers`}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh justify-center items-center flex flex-col gap-8">
      {isLoading ? (
        <h1 className="text-5xl animate-bounce">Loading....</h1>
      ) : (
        <>
          <Counter total={60} onCounterFinish={submitForm} />

          <PhraseForm
            form={form}
            ref={formRef}
            isLoading={isLoading}
            onSubmit={validateQuestion}
            question={QUESTIONS[currentQuestion].question}
          />
        </>
      )}
    </div>
  );
}
