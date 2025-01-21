"use client";

import PhraseForm from "@/components/PhraseForm/PhraseForm";

export default function PhraseChallengePage() {
  return (
    <div className="min-h-svh justify-center items-center flex">
      <PhraseForm
        question="What is your name?"
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </div>
  );
}
