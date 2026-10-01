import { PrismaClient } from "@prisma/client";
import { IMG } from "../src/lib/images";

const prisma = new PrismaClient();

const PRODUCT_IMG: Record<string, string> = {
  "bong-cao-su-cho-cho": IMG.dogBall,
  "xuong-gam-cho-cho": IMG.dogBone,
  "day-keo-co-cho": IMG.dogRope,
  "chuot-bong-cho-meo": IMG.catMouse,
  "can-cau-long-vu-meo": IMG.catWand,
  "tru-cao-mong-meo": IMG.catScratch,
  "vong-co-phan-quang": IMG.collar,
  "balo-van-chuyen-thu-cung": IMG.backpack,
};

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.post.deleteMany();
  await prisma.service.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.plan.deleteMany();

  const cats = [
    { slug: "do-choi-cho", name: "Đồ chơi cho chó" },
    { slug: "do-choi-meo", name: "Đồ chơi cho mèo" },
    { slug: "phu-kien", name: "Phụ kiện" },
  ];
  for (const c of cats) await prisma.category.create({ data: c });
  const byslug = Object.fromEntries((await prisma.category.findMany()).map((c) => [c.slug, c.id]));

  const items: [string, string, string, number, number | null, boolean][] = [
    ["bong-cao-su-cho-cho", "Bóng cao su cho chó", "do-choi-cho", 59000, 49000, true],
    ["xuong-gam-cho-cho", "Xương gặm sạch răng", "do-choi-cho", 79000, null, true],
    ["day-keo-co-cho", "Dây kéo co chịu lực", "do-choi-cho", 99000, 85000, false],
    ["chuot-bong-cho-meo", "Chuột bông catnip", "do-choi-meo", 45000, null, true],
    ["can-cau-long-vu-meo", "Cần câu lông vũ", "do-choi-meo", 69000, 59000, true],
    ["tru-cao-mong-meo", "Trụ cào móng cho mèo", "do-choi-meo", 289000, 249000, false],
    ["vong-co-phan-quang", "Vòng cổ phản quang", "phu-kien", 89000, null, true],
    ["balo-van-chuyen-thu-cung", "Balo vận chuyển thú cưng", "phu-kien", 399000, 349000, false],
  ];
  for (const [slug, name, cat, price, salePrice, featured] of items) {
    await prisma.product.create({
      data: {
        slug,
        name,
        price,
        salePrice,
        featured,
        image: PRODUCT_IMG[slug],
        description: `${name} chất liệu an toàn, bền bỉ, phù hợp cho thú cưng vui chơi mỗi ngày. Bảo hành đổi trả trong 7 ngày.`,
        categoryId: byslug[cat],
      },
    });
  }

  await prisma.service.createMany({
    data: [
      { name: "Phẫu thuật thú cưng", description: "Phẫu thuật an toàn, gây mê theo dõi sát bởi bác sĩ giàu kinh nghiệm.", icon: "🩺", sort: 1 },
      { name: "Tiêm phòng", description: "Lịch tiêm phòng đầy đủ, vắc-xin chính hãng cho chó mèo.", icon: "💉", sort: 2 },
      { name: "Dinh dưỡng", description: "Tư vấn khẩu phần và thức ăn phù hợp từng giống, từng độ tuổi.", icon: "🥣", sort: 3 },
      { name: "Huấn luyện", description: "Huấn luyện các lệnh cơ bản và chỉnh sửa hành vi cho thú cưng.", icon: "🐕", sort: 4 },
      { name: "Spa & Grooming", description: "Tắm, sấy, cắt tỉa lông nhẹ nhàng, thơm tho cho bé.", icon: "🛁", sort: 5 },
      { name: "Chăm sóc sức khoẻ", description: "Khám tổng quát định kỳ, phát hiện sớm các vấn đề sức khoẻ.", icon: "❤️", sort: 6 },
    ],
  });

  await prisma.doctor.createMany({
    data: [
      { name: "BS. Ngân Hà", role: "Bác sĩ thú y", image: IMG.doc1, sort: 1 },
      { name: "BS. Trương Vũ Duy Hà", role: "Bác sĩ thú y", image: IMG.doc2, sort: 2 },
      { name: "BS. Hà Ngân", role: "Bác sĩ thú y", image: IMG.doc4, sort: 3 },
      { name: "BS. Trương Vũ Duy Hà", role: "Bác sĩ thú y", image: IMG.doc3, sort: 4 },
    ],
  });

  await prisma.plan.createMany({
    data: [
      { name: "Gói Cơ bản", price: 490000, features: ["Khám tổng quát", "Tư vấn dinh dưỡng", "Cắt móng"], sort: 1 },
      { name: "Gói Tiêu chuẩn", price: 890000, features: ["Khám tổng quát", "Tiêm phòng cơ bản", "Spa & tắm gội", "Tư vấn dinh dưỡng"], highlighted: true, sort: 2 },
      { name: "Gói Cao cấp", price: 1490000, features: ["Khám chuyên sâu", "Tiêm phòng đầy đủ", "Spa & grooming", "Xét nghiệm máu", "Ưu tiên đặt lịch"], sort: 3 },
    ],
  });

  await prisma.testimonial.createMany({
    data: [
      { name: "Lan Anh", role: "Chủ bé Mochi", content: "Đồ chơi chắc chắn, bé nhà mình rất thích. Bác sĩ khám rất tận tâm!" },
      { name: "Minh Quân", role: "Chủ bé Lu", content: "Nhân viên tư vấn nhiệt tình, dịch vụ spa rất chuyên nghiệp." },
      { name: "Thu Hà", role: "Chủ bé Mướp", content: "Giá hợp lý, sản phẩm đúng mô tả, sẽ ủng hộ lâu dài." },
    ],
  });

  await prisma.post.createMany({
    data: [
      {
        slug: "cach-chon-do-choi-cho-cho",
        title: "Cách chọn đồ chơi an toàn cho chó",
        excerpt: "Những tiêu chí cần biết trước khi mua đồ chơi cho chó.",
        image: IMG.postDog,
        content:
          "Chọn đồ chơi đúng kích cỡ để tránh bé nuốt nhầm.\n\nƯu tiên chất liệu cao su, vải bền, không có chi tiết nhỏ dễ rời.\n\nKiểm tra đồ chơi thường xuyên và thay khi bị hỏng.",
      },
      {
        slug: "meo-cham-soc-long-meo",
        title: "Mẹo chăm sóc bộ lông cho mèo",
        excerpt: "Chải lông, tắm và dinh dưỡng giúp mèo luôn mượt mà.",
        image: IMG.postCat,
        content:
          "Chải lông 2-3 lần mỗi tuần để giảm búi lông.\n\nChỉ tắm khi cần, dùng sữa tắm dành riêng cho mèo.\n\nBổ sung omega-3 trong khẩu phần ăn.",
      },
      {
        slug: "huan-luyen-cho-con",
        title: "Huấn luyện chó con những lệnh cơ bản",
        excerpt: "Ngồi, nằm, đến đây: bắt đầu từ đâu?",
        image: IMG.postPuppy,
        content:
          "Huấn luyện ngắn, 5-10 phút mỗi lần.\n\nDùng phần thưởng và lời khen để tạo thói quen tốt.\n\nKiên nhẫn và nhất quán là chìa khoá.",
      },
    ],
  });
}

main().finally(() => prisma.$disconnect());
