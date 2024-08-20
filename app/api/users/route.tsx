import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const users = [
  {
    id: 1,
    name: "Davidn",
    age: 20,
  },
  {
    id: 2,
    name: "John",
    age: 24,
  },
];

export async function GET(request: NextApiRequest, response: any) {
  const { searchParams } = new URL(request.url || "");

  const searchValue = searchParams.get("name");

  const searchUsers = users.filter((user: any) =>
    user.name?.toLowerCase().includes(searchValue?.toLowerCase())
  );

  if (searchUsers.length > 0) {
    return NextResponse.json({ data: searchUsers });
  } else {
    return NextResponse.json({ data: [] });
  }
}

export async function POST(request: any, response: any) {
  const data = await request.json();
  return NextResponse.json({ message: "Them thanh cong", user: data });
}
