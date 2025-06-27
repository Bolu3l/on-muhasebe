import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      status: "success",
      message: "Employee API test başarılı",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: "error", 
      message: "Test başarısız",
      error: String(error)
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "success",
      message: "Employee POST test başarılı",
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "POST test başarısız", 
      error: String(error)
    }, { status: 500 });
  }
} 