import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

export const createOrder = async (req, res) => {
  try {
    console.log("📦 Received order request:", req.body);

    const {
      productId,
      color,
      size,
      userName,
      phoneNumber,
      wilaya,
      commune,
      address,
    } = req.body;

    if (!productId || !color || !size || !userName || !phoneNumber || !wilaya || !commune || !address) {
      return res.status(400).json({ success: false, message: "جميع الحقول مطلوبة" });
    }

    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "المنتج غير موجود" });
    }

    if (product.stock <= 0) {
      return res.status(400).json({ success: false, message: "المنتج غير متوفر حالياً" });
    }

    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    console.log("📝 Adding to Google Sheets...");

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "commandes!A:K", // ✅ matches your sheet tab name and column count
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            orderId,        // A: ID
            product.name,   // B: Article
            color,          // C: Couleur
            product.price,  // D: Prix
            size,           // E: Taille
            userName,       // F: Nom acheteur
            phoneNumber,    // G: N° Tel
            wilaya,         // H: Wilaya
            commune,        // I: Commune
            address,        // J: Addresse
            "En attente",   // K: etat
          ],
        ],
      },
    });

    console.log("✅ Order added successfully to Google Sheets");

    return res.status(201).json({
      success: true,
      message: "تم استلام طلبك بنجاح",
      data: { orderId },
    });
  } catch (error) {
    console.error("❌ Order creation error:", error);

    if (error.message?.includes("Unable to parse range")) {
      return res.status(500).json({
        success: false,
        message: "تحقق من اسم ورقة Google Sheets أو نطاق الأعمدة",
      });
    }

    if (error.message?.includes("Google")) {
      return res.status(500).json({
        success: false,
        message: "خطأ في الاتصال بنظام الطلبات",
      });
    }

    return res.status(500).json({
      success: false,
      message: "حدث خطأ في معالجة الطلب",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
