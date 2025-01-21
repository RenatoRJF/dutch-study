interface PhraseFormData {
  question: string;
  answer: string;
}

export interface PhraseFormProps {
  question: string;
  isLoading: boolean;
  onSubmit: (data: PhraseFormData) => void;
}
