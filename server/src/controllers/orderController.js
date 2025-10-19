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
      livraison, // delivery fee
      remarques, // remarks/notes
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
    const orderDate = new Date().toLocaleString('fr-DZ', { 
      timeZone: 'Africa/Algiers',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const deliveryFee = livraison || 0;
    const total = product.price + deliveryFee;

    console.log("📝 Adding to Google Sheets...");

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'commandes!A:M',
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            orderId,        // A: ID commande
            userName,       // B: Nom complet
            phoneNumber,    // C: Numéro de téléphone
            orderDate,      // D: Date de commande
            wilaya,         // E: Wilaya
            commune,        // F: Commune
            product.name,   // G: Nom du produit
            size,           // H: Taille
            color,          // I: Couleur
            "confirmé",     // J: Statut (confirmé, envoyé, annulé, T1, T2, T3, reporté)
            total,          // K: Total
            deliveryFee,    // L: Livraison
            remarques || "", // M: Remarques
          ],
        ],
      },
    });

    console.log("✅ Order added successfully to Google Sheets");

    return res.status(201).json({
      success: true,
      message: "تم استلام طلبك بنجاح",
      data: { orderId, total },
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