// components/KycForm.tsx
"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Client Side Supabase (Hanya untuk Upload Storage)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export default function KycForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [docType, setDocType] = useState<string>("dokumen_pendukung");

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    borderRadius: 8,
    backgroundColor: "#f8fafc", // slate-50
    color: "#0f172a", // slate-900
    border: "1px solid #cbd5e1", // slate-300
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
    fontWeight: 500,
  };

  // --- STYLE DEFINITIONS (Sama seperti sebelumnya) ---
  const fileButtonStyle: React.CSSProperties = {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem 1rem",
    borderRadius: 8,
    backgroundColor: "#f59e0b",
    color: "white",
    fontWeight: 600,
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    border: "1px solid rgba(0,0,0,0.05)",
  };

  const uploadButtonStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.6rem 1rem",
    borderRadius: 8,
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: 700,
    boxShadow: "0 10px 24px rgba(0,0,0,0.16)",
    border: "none",
    transition: "background-color 120ms ease, transform 120ms ease",
  };

  const uploadButtonHoverStyle: React.CSSProperties = { backgroundColor: "#1d4ed8" };
  const uploadButtonActiveStyle: React.CSSProperties = { backgroundColor: "#1e40af", transform: "translateY(1px)" };

  // --- LOGIKA UTAMA ---
  const handleUpload = async () => {
    if (!file) return alert("Pilih file!");
    setLoading(true);

    try {
      // --- LANGKAH 1: Tetap Sama (Minta instruksi ke API) ---
      const instructionReq = await fetch("/api/kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, docType }),
      });

      if (!instructionReq.ok) {
        const errorData = await instructionReq.json();
        throw new Error(errorData.error || "Gagal mendapatkan instruksi");
      }

      const { uploadUrl, path } = await instructionReq.json();

      // --- LANGKAH 2: GANTI BAGIAN INI (Gunakan Fetch Standar) ---
      // Kita tidak lagi pakai supabase.storage.uploadToSignedUrl karena JWS error tadi
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type, // Menyesuaikan tipe file (image/png, dll)
        },
      });

      if (!uploadResponse.ok) {
        // Jika gagal, coba ambil pesan errornya
        const errorData = await uploadResponse.json().catch(() => ({}));
        throw new Error(errorData.message || `Gagal upload ke Storage (${uploadResponse.status})`);
      }

      // --- SELESAI ---
      alert("Berhasil! Dokumen " + docType + " telah terupload.");
      setFile(null);

    } catch (err: any) {
      console.error("Detail Error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded shadow max-w-md bg-white text-black">
      <h2 className="text-xl font-bold mb-4">Verifikasi Identitas (KYC)</h2>

      <label className="block mb-2">Jenis Dokument</label>
      <select
        value={docType}
        onChange={(e) => setDocType(e.target.value)}
        style={selectStyle}
      >
        <option value="ktp">KTP</option>
        <option value="dokumen_pendukung">Dokumen Pendukung</option>
      </select>

      <div className="flex items-center gap-3 mb-4">
        <label htmlFor="fileUpload" style={fileButtonStyle}>
          Pilih Foto Dokumen
        </label>
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <span className="text-sm text-gray-700 truncate" style={{ maxWidth: "60%" }}>
          {file ? file.name : "Belum ada file"}
        </span>
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          ...uploadButtonStyle,
          ...(loading ? { backgroundColor: "#9ca3af", cursor: "not-allowed" } : {}),
        }}
        onMouseEnter={(e) => !loading && Object.assign(e.currentTarget.style, uploadButtonHoverStyle)}
        onMouseLeave={(e) => !loading && Object.assign(e.currentTarget.style, uploadButtonStyle)}
        onMouseDown={(e) => !loading && Object.assign(e.currentTarget.style, uploadButtonActiveStyle)}
        onMouseUp={(e) => !loading && Object.assign(e.currentTarget.style, uploadButtonHoverStyle)}
      >
        {loading ? "Mengupload..." : "Kirim Data KYC"}
      </button>
    </div>
  );
}
