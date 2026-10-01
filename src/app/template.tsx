/** Template được tạo lại mỗi lần chuyển trang, nên hiệu ứng mờ dần chạy ở mọi route. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
