import { LocationPage, buildLocationMetadata } from "@/components/LocationPage";
import { cedarville } from "@/lib/locations";

export const metadata = buildLocationMetadata(cedarville);

export default function HomeServicesCedarvillePage() {
  return <LocationPage data={cedarville} />;
}
