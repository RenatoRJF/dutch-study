import { useForm } from "react-hook-form";

import { PhraseFormProps } from "./PhraseForm.types";

export default function PhraseForm({ question, onSubmit }: PhraseFormProps) {
  const form = useForm({ defaultValues: { question, answer: "" } });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-8 rounded-lg w-full max-w-[600px]"
    >
      <h1 className="font-extrabold text-3xl text-gray-700 mb-4">{question}</h1>

      <input
        autoFocus
        placeholder="Type your answer"
        className="p-4 border border-gray-300 rounded-s w-full text-gray-700 font-semibold text-xl"
        {...form.register("answer")}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="block text-white bg-blue-600 p-4 rounded-sm hover:opacity-90"
        >
          Submit answer
        </button>
      </div>
    </form>
  );
}
