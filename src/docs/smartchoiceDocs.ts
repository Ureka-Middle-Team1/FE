export const smartchoiceDocs = {
  "/api/smartchoice": {
    post: {
      tags: ["SmartChoice"],
      summary: "스마트초이스 요금제 추천",
      description:
        "사용자의 통신 성향 정보를 기반으로 스마트초이스 요금제 추천 API를 호출합니다.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                authkey: {
                  type: "string",
                  description: "인증키",
                  example: "API_KEY_123456",
                },
                voice: {
                  type: "string",
                  description: "월 평균 통화량 (입력단위:분, 무제한:999999)",
                  example: "250",
                },
                data: {
                  type: "string",
                  description:
                    "월 평균 데이터 사용량 (입력단위:MB, 무제한:999999)",
                  example: "5000",
                },
                sms: {
                  type: "string",
                  description:
                    "월 평균 문자 발송량 (입력단위:건, 무제한:999999)",
                  example: "100",
                },
                age: {
                  type: "string",
                  description: "연령 (성인:20, 청소년:18, 실버:65)",
                  example: "20",
                },
                type: {
                  type: "string",
                  description: "서비스 타입 (3G:2, LTE:3, 5G:6)",
                  example: "3",
                },
                dis: {
                  type: "string",
                  description: "약정기간 (무약정:0, 12개월:12, 24개월:24)",
                  example: "12",
                },
              },
              required: [
                "authkey",
                "voice",
                "data",
                "sms",
                "age",
                "type",
                "dis",
              ],
            },
          },
        },
      },
      responses: {
        200: {
          description: "추천 결과 반환",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  result: {
                    type: "array",
                    items: { type: "object" },
                  },
                },
              },
            },
          },
        },
        500: {
          description: "API 키 누락 또는 스마트초이스 요청 실패",
        },
      },
    },
  },
};
