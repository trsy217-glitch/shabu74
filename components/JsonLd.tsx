import { serializeJsonLd } from "@/lib/jsonld";

/** Renders structured data as a native <script> tag (server-rendered). */
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
