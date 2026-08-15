"use client";

import QuestionForm from "../../_components/QuestionForm";
import { updateQuestion } from "./_actions";
import type { QuestionRow, QuestionOptionRow } from "@/lib/supabase-admin";

type Props = {
  question: QuestionRow;
  options: QuestionOptionRow[];
  questionId: number;
};

export default function EditForm({ question, options, questionId }: Props) {
  const boundUpdate = updateQuestion.bind(null, questionId);
  return <QuestionForm question={question} options={options} action={boundUpdate} />;
}
