"use server";

import { prisma } from "@/lib/prisma";
import { sendAppointmentEmails } from "@/lib/mail";

export type BookingState = { ok: boolean; error?: string } | null;

const MAX_PER_HOUR = 3;

export async function bookAppointment(_: BookingState, form: FormData): Promise<BookingState> {
  // Ô ẩn "website": người thật không điền, bot thì có. Giả vờ thành công để bot không dò được.
  if (String(form.get("website") ?? "").trim()) return { ok: true };

  const get = (k: string) => String(form.get(k) ?? "").trim();
  const [name, phone, petType, time, service, note] = ["name", "phone", "petType", "time", "service", "message"].map(get);
  if (!name || phone.length < 8 || !petType || !time || !service) {
    return { ok: false, error: "Vui lòng chọn dịch vụ, loại thú cưng, khung giờ và nhập tên, số điện thoại." };
  }
  if (name.length > 100 || phone.length > 20 || note.length > 2000) {
    return { ok: false, error: "Nội dung quá dài, vui lòng rút gọn." };
  }

  // Chống spam/mail-bomb: tối đa 3 yêu cầu mỗi giờ cho cùng một số điện thoại.
  const recent = await prisma.appointment.count({
    where: { createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) }, phone },
  });
  if (recent >= MAX_PER_HOUR) {
    return { ok: false, error: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau hoặc gọi hotline 0352 482 496." };
  }

  // Cột email trong DB bắt buộc nên lưu rỗng; dịch vụ được ghi vào đầu nội dung.
  const message = `Dịch vụ: ${service}${note ? `. ${note}` : ""}`;
  const saved = await prisma.appointment.create({ data: { name, email: "", phone, petType, time, message } });
  // Lỗi gửi mail không làm hỏng việc đặt lịch (yêu cầu đã được lưu vào DB).
  await sendAppointmentEmails({ id: saved.id, name, phone, petType, time, message });
  return { ok: true };
}
