import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return new NextResponse(data.message || "Bir hata oluştu", {
        status: response.status,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[CONTACT_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
