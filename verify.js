// Replace SHEET_ID & SHEET_NAME with your Google Sheet details
const SHEET_ID = "1ngyw4BUUUwr6ulwYZXFbRnnd9VlIX0e0EKp5XX3vUws";
const SHEET_NAME = "Sheet1";
const OPENSHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

export async function verifyFromSheet(id) {
  const res = await fetch(OPENSHEET_URL, { cache: "no-cache" });
  if (!res.ok) throw new Error("Failed to fetch sheet");
  const data = await res.json();
  const lower = id.trim().toLowerCase();
  const match = data.find(row => {
    const v = (row.CertificateID ?? row.certificateid ?? row.id ?? "").toString().trim().toLowerCase();
    return v === lower;
  });
  return match || null;
}
