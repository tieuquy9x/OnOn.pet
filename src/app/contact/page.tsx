import type { Metadata } from "next";
import Image from "next/image";
import AppointmentForm from "@/components/AppointmentForm";
import SectionTitle from "@/components/SectionTitle";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Liên hệ & đặt lịch khám",
  description: "Đặt lịch khám, spa và tư vấn cho thú cưng tại OnOn.Pet. Hotline 0352 482 496.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 md:grid-cols-2">
      <div>
        <SectionTitle kicker="Liên hệ" title="Đặt lịch khám" />
        <p className="mt-6 text-neutral-600">Liên hệ nhanh</p>
        <ul className="mt-4 space-y-3 font-medium">
          <li>📞 0352 482 496</li>
          <li>⏰ 08:00 - 18:00, Thứ 2 - Thứ 7</li>
          <li>📍 Hồ Chí Minh, Việt Nam</li>
        </ul>
        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl">
          <Image src={IMG.appointment} alt="Chú mèo thư giãn" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
      <AppointmentForm />
    </div>
  );
}
