import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import EditForm from "./_EditForm";

export const dynamic = "force-dynamic";

export default async function EditQuestionPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();

  const [{ data: question, error: qErr }, { data: options, error: oErr }] = await Promise.all([
    supabaseAdmin.from("questions").select("*").eq("id", id).single(),
    supabaseAdmin.from("question_options").select("*").eq("question_id", id).order("sort_order"),
  ]);

  if (qErr || !question) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">ویرایش سوال #{id}</h1>
      <EditForm question={question as any} options={(options ?? []) as any} questionId={id} />
    </div>
  );
}
