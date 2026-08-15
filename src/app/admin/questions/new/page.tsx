import QuestionForm from "../_components/QuestionForm";
import { createQuestion } from "./_actions";

export default function NewQuestionPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">افزودن سوال جدید</h1>
      <QuestionForm action={createQuestion} />
    </div>
  );
}
