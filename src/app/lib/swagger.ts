import { createSwaggerSpec } from "next-swagger-doc";
import { paths } from "@/docs";

export const getApiDocs = () => {
  return createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "MuMul API",
        version: "1.0.0",
        description: "MuMul API 문서",
      },
      paths,
    },
  }) as Record<string, unknown>;
};
