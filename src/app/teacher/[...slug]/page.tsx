import { redirect } from "next/navigation";

export default async function TeacherSubrouteRedirect({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug && slug.length > 0 ? slug[0] : "";

  if (path === "attendance") {
    redirect("/staff/attendance");
  } else if (path === "marks" || path === "exams") {
    redirect("/staff/exams");
  } else if (path === "notices") {
    redirect("/staff/notices");
  } else if (path === "batches") {
    redirect("/staff/batches");
  } else if (path === "students") {
    redirect("/staff/students");
  } else if (path === "profile") {
    redirect("/staff/profile");
  }

  redirect("/staff");
}
