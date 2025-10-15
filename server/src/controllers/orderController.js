import { google } from "googleapis";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: "misskitty-474920",
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// create a new order
export const createOrder = async (req, res) => {
  try {
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

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Africa/Algiers",
    });

    // إضافة للـ Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:K", // تأكد من اسم الورقة (Sheet1 أو غيره)
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            orderId, // ID
            product.name, // Article
            color, // Couleur
            product.price, // Prix
            size, // Taille
            userName, // Nom acheteur
            phoneNumber, // N° Tel
            wilaya, // Wilaya
            commune, // Commune
            address, // Addresse
            "En attente", // status
          ],
        ],
      },
    });

    res.status(201).json({
      success: true,
      message: "تم استلام طلبك بنجاح",
      data: { orderId },
    });
  } catch (error) {
    console.error("❌ خطأ:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في معالجة الطلب",
    });
  }
};
