"use client";

import { useActionState } from "react";
import { bookAppointment } from "@/app/contact/actions";

const SERVICES = ["Grooming", "Spa", "Hotel", "Daycare", "Tư vấn"];
const PETS = ["Chó", "Mèo", "Khác"];
const TIMES = ["08:00 - 10:00", "10:00 - 12:00", "13:00 - 15:00", "15:00 - 18:00"];

const input =
  "w-full border-0 border-b border-brand-500/50 bg-transparent px-1 py-3 text-base text-ink placeholder:text-ink/40 outline-none transition focus:border-brand-600 focus:border-b-2";

/** Nhóm lựa chọn dạng chip (radio thuần HTML, không cần state, vẫn bắt buộc chọn). */
function Chips({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-brand-600">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} required={i === 0} className="peer sr-only" />
            <span className="block rounded-full border border-brand-500/50 px-4 py-2 text-sm text-ink transition hover:border-brand-600 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function AppointmentForm({ tone = "light" }: { tone?: "light" | "glass" }) {
  const [state, action, pending] = useActionState(bookAppointment, null);

  const shell =
    tone === "glass" ? "bg-cream shadow-2xl" : "bg-cream";

  if (state?.ok) {
    return (
      <div className={`rounded-2xl p-1.5 ${shell}`}>
        <div className="rounded-xl border border-brand-500/50 px-8 py-16 text-center" role="status">
          <p className="font-fun text-3xl text-ink">Cảm ơn bạn!</p>
          <span className="mx-auto mt-4 block h-px w-12 bg-brand-500" />
          <p className="mt-5 text-sm leading-7">
            OnOn.Pet đã nhận yêu cầu và sẽ gọi lại số điện thoại của bạn để xác nhận lịch trong thời gian sớm nhất.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className={`rounded-2xl p-1.5 ${shell}`}>
      <div className="rounded-xl border border-brand-500/50 p-6 md:p-9">
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        <h3 className="font-fun text-2xl text-ink">Đặt lịch cho bé</h3>
        <p className="mt-1 text-sm">Chỉ mất 30 giây, chúng tôi sẽ gọi lại xác nhận.</p>

        <div className="mt-7 space-y-7">
          <Chips name="service" label="Bạn cần dịch vụ nào?" options={SERVICES} />
          <Chips name="petType" label="Bé là" options={PETS} />
          <Chips name="time" label="Khung giờ mong muốn" options={TIMES} />

          <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            <input name="name" placeholder="Tên của bạn" required autoComplete="name" className={input} />
            <input name="phone" type="tel" inputMode="tel" placeholder="Số điện thoại" required autoComplete="tel" className={input} />
            <input name="message" placeholder="Ghi chú thêm (không bắt buộc)" className={`${input} sm:col-span-2`} />
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button
            disabled={pending}
            className="w-full rounded-full bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-cream transition hover:bg-brand-700 disabled:opacity-60"
          >
            {pending ? "Đang gửi..." : "Gửi yêu cầu"}
          </button>
          <div aria-live="polite" className="min-h-5 text-center text-sm">
            {state && !state.ok && <p className="font-semibold text-red-700">{state.error}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}
