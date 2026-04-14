import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteHome } from "@/components/site-home";
import { getSiteData } from "@/lib/dashboard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const data = await getSiteData();

  return (
    <>
      <SiteHeader />
      <SiteHome projects={data.projects} />
      <SiteFooter />
    </>
  );
}
