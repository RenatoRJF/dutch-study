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

  const validateQuestion = ({ answer }: PhraseFormData) => {
    form.reset();

    setIsLoading(true);

    setTimeout(() => {
      const isCorrect = QUESTIONS[currentQuestion].correctAnswer === answer;
      const resultKey = isCorrect ? "correct" : "wrong";

      console.log({
        isCorrect,
        answer,
        correctAnswer: QUESTIONS[currentQuestion].correctAnswer,
      });

      // TODO: implement page to show result
      setResult((prev) => ({ ...prev, [resultKey]: prev[resultKey] + 1 }));

      setCurrentQuestion((prev) => prev + 1);
      setIsLoading(false);
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
