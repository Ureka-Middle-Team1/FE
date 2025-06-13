import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DB의 userCharactorProfile 테이블에서 user_id에 해당하는 값들을 GET 해온다
export async function GET(request: Request) {
  try {
    // request.url 기반으로 user_id를 읽는 구조
    const url = new URL(request.url);
    const userIdParam = url.searchParams.get("user_id");
    if (!userIdParam) {
      return NextResponse.json(
        { error: "user_id is required" },
        { status: 400 }
      );
    }

    const user_id = parseInt(userIdParam, 10); // userId 값을 10진수로 변환해서 user_id에 저장
    if (isNaN(user_id)) {
      return NextResponse.json(
        { error: "user_id must be a number" },
        { status: 400 }
      );
    }

    // findUnique(..select..)를 통해, 필요한 필드만 효율적으로 조회함
    const profile = await prisma.userCharactorProfile.findUnique({
      where: { user_id },
      select: {
        call_level: true,
        sms_level: true,
        sns_level: true,
        youtube_level: true,
        saving_level: true,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { error: `Profile not found for user_id ${user_id}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ user_id, ...profile }, { status: 200 });
  } catch (err) {
    console.error("[GET /api/userprofile] error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
