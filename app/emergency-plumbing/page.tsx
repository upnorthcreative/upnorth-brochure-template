import { ServicePage, buildServiceMetadata } from "@/components/ServicePage";
import { emergencyPlumbing } from "@/lib/services";

export const metadata = buildServiceMetadata(emergencyPlumbing);

export default function EmergencyPlumbingPage() {
  return <ServicePage data={emergencyPlumbing} />;
}
