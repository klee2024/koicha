export interface QuizOption {
  id: number;
  value: string;
  label: string;
}

export interface QuizQuestion {
  id: number;
  initial_prompt: string;
  follow_up_prompt: string;
  quiz: number; // quiz id
  options: QuizOption[];
  order: number;
}

export interface Quiz {
  id: number;
  version: number;
  slug: string;
  title: string;
  created_at: string;
  questions: QuizQuestion[];
}
