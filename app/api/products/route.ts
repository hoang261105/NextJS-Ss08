import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    // B1: Cần phải lấy ra đường dẫn của file cần đọc
    const filePath = path.join(process.cwd(), "database/product.json");
    // B2: Sử dụng fs để đọc file
    const data = fs.readFileSync(filePath, "utf8");

    // B3: Ép kiểu từ dạng json sang ts
    const users = JSON.parse(data);

    // Trả về dữ liệu cho phía client
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // B1: Lấy dữ liệu từ phía client
    const userRequest = await request.json();
    console.log(userRequest);

    // B2: Lấy ra đường dẫn của file cần ghi
    const filePath = path.join(process.cwd(), "database/product.json");

    // Đọc file cần ghi vào
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Push dữ liệu vào trong mảng
    users.push(userRequest);

    // B3: Ghi file
    fs.writeFileSync(filePath, JSON.stringify(users), "utf8");
    return NextResponse.json({ message: "Thêm sản phẩm thành công" });
  } catch (error) {
    return NextResponse.json({ message: "Thêm sản phẩm thất bại" });
  }
}
