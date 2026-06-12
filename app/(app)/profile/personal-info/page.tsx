import PersonalInfoClient from "@/components/SectionClient/PersonalInfoClient";
import { getCurrentUser } from "@/server/queries/user";
import { redirect } from "next/navigation";

export default async function PersonalInfoPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return <PersonalInfoClient user={user} />;
}
