import { redirect } from "next/navigation";

export default async function ShortVerifyRedirect({
  params,
}: {
  params: Promise<{ certNo: string }>;
}) {
  const { certNo } = await params;
  
  // If the number looks like an ID card (e.g. starts with IDC or CARD), redirect to /verify/id/[cardNo]
  if (certNo.toUpperCase().startsWith("IDC") || certNo.toUpperCase().startsWith("CARD")) {
    redirect(`/verify/id/${certNo}`);
  }
  
  // Otherwise redirect to /verify/certificate/[certNo]
  redirect(`/verify/certificate/${certNo}`);
}
