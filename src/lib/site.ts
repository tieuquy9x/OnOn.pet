export const SITE = {
  name: "OnOn.Pet",
  description:
    "OnOn.Pet - cửa hàng đồ chơi, phụ kiện và dịch vụ chăm sóc thú cưng uy tín: sản phẩm an toàn, giá tốt, giao hàng nhanh.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const formatVnd = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
