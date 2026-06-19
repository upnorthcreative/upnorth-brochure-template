import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex-1 flex items-center py-32">
      <Container>
        <div className="max-w-lg">
          <p className="text-[7rem] font-semibold tracking-tighter text-neutral-100 mb-4 leading-none">404</p>
          <h1 className="text-3xl font-semibold tracking-tighter mb-4">Page Not Found</h1>
          <p className="text-neutral-500 text-base leading-relaxed mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/">Back to Home</Button>
            <Button href="/contact" variant="outline">Contact Us</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
