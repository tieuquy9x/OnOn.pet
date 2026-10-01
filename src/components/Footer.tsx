import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-sm text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4">
        <div>
          <h2 className="text-lg font-bold text-white">{SITE.name}</h2>
          <p className="mt-4 leading-7">
            Phòng khám và cửa hàng thú cưng: khám chữa bệnh, spa, đồ chơi và phụ kiện an toàn cho những người bạn bốn chân.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Liên kết nhanh</h2>
          <ul className="mt-4 space-y-2">
            <li><Link href="/#dich-vu" className="hover:text-brand-500">Dịch vụ</Link></li>
            <li><Link href="/#bang-gia" className="hover:text-brand-500">Bảng giá</Link></li>
            <li><Link href="/products" className="hover:text-brand-500">Sản phẩm</Link></li>
            <li><Link href="/blog" className="hover:text-brand-500">Tin tức</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Giờ làm việc</h2>
          <ul className="mt-4 space-y-2">
            <li>Thứ 2 - Thứ 6: 8h00 - 18h00</li>
            <li>Thứ 7: 8h00 - 16h00</li>
            <li>Chủ nhật: Nghỉ</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Bạn cần hỗ trợ?</h2>
          <ul className="mt-4 space-y-2">
            <li>📍 Hồ Chí Minh, Việt Nam</li>
            <li>📞 0352 482 496</li>
            <li>✉️ hello@onon.pet</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {SITE.name}. Ý tưởng, thiết kế và phát triển bởi OnOn.Pet.
      </div>
    </footer>
  );
}
