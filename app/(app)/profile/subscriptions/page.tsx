import SubscriptionsClient from "@/components/SectionClient/SubscriptionsClient";
import { getSubscription } from "@/server/queries/subscription";

export default async function SubscriptionsPage() {
  const subscription = await getSubscription();

  return <SubscriptionsClient subscription={subscription} />;
}
