export interface QuestionOption {
  id: string;
  text_en: string;
  text_fa: string;
  image_url?: string;
}

export interface Question {
  id: number;
  stage: number;
  level: "3pt" | "4pt" | "5pt";
  text_en: string;
  text_fa: string;
  question_image_url?: string;
  options: QuestionOption[];
  correct: string;
  skills: string[];
  year: number;
  grade_group: string;
}

export const questions: Question[] = [];
