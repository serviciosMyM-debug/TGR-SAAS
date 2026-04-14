import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteHome } from "@/components/site-home";
import { getSiteData } from "@/lib/dashboard";

export default async function HomePage() {
  const { projects } = await getSiteData();

  return (
    <>
      <SiteHeader />
      <SiteHome projects={projects} />
      <SiteFooter />
    </>
  );
}
