export const tendencyDocs = {
  "/api/tendency/{id}": {
    get: {
      tags: ["Tendency"],
      summary: "통신 성향 테스트 결과 조회",
      description: "사용자의 ID에 따른 통신 성향 결과 점수를 조회합니다.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          example: "3",
        },
      ],
      responses: {
        200: {
          description: "성공적으로 통신 성향 데이터를 반환",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  data: {
                    type: "array",
                    items: { type: "number", example: 60 },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "해당 ID에 대한 데이터 없음",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string", example: "데이터 없음" },
                },
              },
            },
          },
        },
      },
    },
  },
};
