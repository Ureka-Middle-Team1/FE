"use client";

import { useEffect, useRef } from "react";
import { SwaggerUIBundle } from "swagger-ui-dist";
import "swagger-ui-dist/swagger-ui.css";

type Props = {
  spec: Record<string, unknown>;
};
export default function PageContent({ spec }: Props) {
  const swaggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!swaggerRef.current || !spec) return;
    SwaggerUIBundle({
      domNode: swaggerRef.current,
      spec,
    });
  }, [spec]);

  return (
    <div
      className="swagger-ui-wrapper m-0 min-h-screen w-full p-0"
      ref={swaggerRef}
    />
  );
}
