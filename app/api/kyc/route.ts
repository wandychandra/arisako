// app/api/kyc/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");
    }

    const body = await request.json();
    console.log("Body diterima:", body);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { fileName, docType } = body;

    if (!fileName || !docType) {
      return NextResponse.json({ error: "fileName dan docType wajib" }, { status: 400 });
    }

    // --- PROSES SANITASI NAMA FILE ---
    const cleanFileName = fileName
      .replace(/[^a-zA-Z0-9.]/g, '_')
      .substring(0, 50);

    const FAKE_USER_ID = "00000000-0000-0000-0000-000000000000";
    const filePath = `${FAKE_USER_ID}/${docType}/${Date.now()}_${cleanFileName}`;

    console.log("Path baru yang sudah dibersihkan:", filePath);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("identity-docs")
      .createSignedUploadUrl(filePath);

    if (uploadError) {
      console.error("❌ Storage Error:", uploadError.message);
      throw new Error(`Storage Error: ${uploadError.message}`);
    }

    console.log("✅ Signed URL Berhasil dibuat");

    const { error: dbError } = await supabase
      .from("kyc_requests")
      .insert({
        user_id: FAKE_USER_ID,
        image_path: filePath,
        document_type: docType,
        status: "pending",
      });

    if (dbError) {
      console.error("❌ Database Error:", dbError.message);
      throw new Error(`Database Error: ${dbError.message}`);
    }

    console.log("✅ Database Insert Berhasil");

    return NextResponse.json({
      uploadUrl: uploadData.signedUrl,
      path: filePath,
    });

  } catch (error: any) {
    console.error("💥 CRASH PADA API:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
