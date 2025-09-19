export interface FormInput {
  value: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  initialPrompt: string;
  followUpPrompt: string;
  type: string;
  options: FormInput[];
}
