import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";

export type AppointmentMail = {
  id: number;
  name: string;
  phone: string;
  petType: string;
  time: string;
  message: string;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br>");

/** Trả về null nếu chưa cấu hình SMTP trong .env (khi đó chỉ lưu DB, không gửi mail). */
function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

/** Gửi mail báo cho chủ cửa hàng (form không thu email khách nên không gửi xác nhận). Không ném lỗi: lỗi mail không được làm hỏng việc đặt lịch. */
export async function sendAppointmentEmails(a: AppointmentMail) {
  const transport = getTransport();
  const owner = process.env.MAIL_TO;
  if (!transport || !owner) {
    console.warn("[mail] Chưa cấu hình SMTP_HOST/SMTP_USER/SMTP_PASS/MAIL_TO, bỏ qua gửi mail.");
    return { sent: false as const };
  }
  const from = process.env.MAIL_FROM || `${SITE.name} <${process.env.SMTP_USER}>`;
  const rows = [
    ["Họ tên", a.name],
    ["Điện thoại", a.phone],
    ["Loại thú cưng", a.petType],
    ["Khung giờ", a.time],
    ["Nội dung", a.message || "(không có)"],
  ];

  const results = await Promise.allSettled([
    transport.sendMail({
      from,
      to: owner,
      subject: `[${SITE.name}] Yêu cầu đặt lịch #${a.id} từ ${a.name}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<h2>Yêu cầu đặt lịch mới #${a.id}</h2><table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`)
        .join("")}</table><p>Gọi lại khách theo số điện thoại ở trên để xác nhận lịch.</p>`,
    }),
  ]);

  results.forEach((r) => {
    if (r.status === "rejected") console.error("[mail] Gửi mail cho chủ cửa hàng thất bại:", r.reason);
  });
  return { sent: results.every((r) => r.status === "fulfilled") as boolean };
}
