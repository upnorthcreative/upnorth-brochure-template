import { ServicePage, buildServiceMetadata } from "@/components/ServicePage";
import { furnaceRepairMaplewood } from "@/lib/services";

export const metadata = buildServiceMetadata(furnaceRepairMaplewood);

export default function FurnaceRepairMaplewoodPage() {
  return <ServicePage data={furnaceRepairMaplewood} />;
}
