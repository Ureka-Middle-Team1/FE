import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "이메일이 없습니다." }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        characterProfile: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "사용자 없음" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("User fetch error : ", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
}
