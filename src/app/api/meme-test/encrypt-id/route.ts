/*
  밈테스트 결과 카카오톡 공유
  백엔드에서 프론트엔드로 보낼 때 user_id 암호화
*/

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/utils/crypto.server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "이메일이 없습니다." }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "사용자 없음" }, { status: 404 });
    }
    const encryptedId = encrypt(user.id.toString());
    return NextResponse.json({ encryptedId });
  } catch (error) {
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
}
