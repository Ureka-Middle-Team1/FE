import { getApiDocs } from "@/app/lib/swagger";
import PageContent from "./SwaggerPage";
import { notFound } from "next/navigation";

export default async function Page() {
  if (process.env.NODE_ENV !== "development") notFound(); // 배포 차단
  const spec = getApiDocs();

  return <PageContent spec={spec} />;
}
