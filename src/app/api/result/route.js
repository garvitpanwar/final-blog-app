
import { NextResponse } from "next/server";

export async function GET() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  //   console.log(data);
  const result = await data.json();
  console.log(result);
  return NextResponse.json({
    data: "data"
  });
}
