"use client";

import { useState } from "react";

import Counter from "@/components/Counter/Counter";
import PhraseForm from "@/components/PhraseForm/PhraseForm";

export default function PhraseChallengePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="min-h-svh justify-center items-center flex flex-col gap-8">
      <Counter
        total={10}
        onCounterChange={() => {}}
        onCounterFinish={() => {
          setIsLoading(true);
          console.log("finished");
        }}
      />

      <PhraseForm
        isLoading={isLoading}
        question="What is your name?"
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </div>
  );
}
