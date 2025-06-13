import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // TypeQuestion 데이터 삽입
  const stages = ["SNS", "Youtube", "Chat", "Calling", "Books", "Saving"];
  const difficulties = ["low", "medium", "high"];
  const questionsData = [];

  for (const stage of stages) {
    for (const difficulty of difficulties) {
      for (let i = 1; i <= 10; i++) {
        questionsData.push({
          stage,
          difficulty,
          is_bonus: false,
          question_text: `${stage} 문제 ${difficulty.toUpperCase()} ${i}`,
          example_type: i % 2 === 0 ? "text" : "image",
          example_content:
            i % 2 === 0 ? "" : `/${stage.toLowerCase()}_${difficulty}_${i}.png`,
          choices: [
            { id: "c1", text: "오답1", isCorrect: false },
            { id: "c2", text: "오답2", isCorrect: false },
            { id: "c3", text: "오답3", isCorrect: false },
            { id: "c4", text: "정답", isCorrect: true },
          ],
        });
      }
    }

    // 보너스 질문 추가
    questionsData.push({
      stage,
      difficulty: "bonus",
      is_bonus: true,
      question_text: `${stage} 보너스 질문`,
      example_type: undefined,
      example_content: undefined,
      choices: [
        { id: "c1", text: "선택지1", isCorrect: null },
        { id: "c2", text: "선택지2", isCorrect: null },
        { id: "c3", text: "선택지3", isCorrect: null },
        { id: "c4", text: "선택지4", isCorrect: null },
      ],
    });
  }

  for (const q of questionsData) {
    await prisma.typeQuestion.create({
      data: {
        stage: q.stage,
        difficulty: q.difficulty,
        is_bonus: q.is_bonus,
        question_text: q.question_text,
        example_type: q.example_type ?? undefined,
        example_content: q.example_content ?? undefined,
        choices: q.choices,
      },
    });
  }

  console.log("✅ Seed 완료");
}

main()
  .catch((e) => {
    console.error("❌ Seed 에러:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
