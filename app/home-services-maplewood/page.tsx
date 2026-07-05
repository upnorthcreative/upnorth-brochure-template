import { LocationPage, buildLocationMetadata } from "@/components/LocationPage";
import { maplewood } from "@/lib/locations";

export const metadata = buildLocationMetadata(maplewood);

export default function HomeServicesMaplewoodPage() {
  return <LocationPage data={maplewood} />;
}
