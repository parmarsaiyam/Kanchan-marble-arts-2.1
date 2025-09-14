import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "content", "settings.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const settings = JSON.parse(fileContents)

    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 })
  }
}
