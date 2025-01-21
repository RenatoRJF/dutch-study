interface PhraseFormData {
  question: string;
  answer: string;
}

export interface PhraseFormProps {
  question: string;
  onSubmit: (data: PhraseFormData) => void;
}
