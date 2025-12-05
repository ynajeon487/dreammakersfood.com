import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, AlertCircle } from "lucide-react";
import Footer from "@/components/Footer";

export default function Knowledge() {
  const articles = [
    {
      id: 1,
      title: "10 Mẹo Nấu Ăn Tiết Kiệm Cho Sinh Viên",
      excerpt:
        "Khám phá những bí quyết giúp bạn nấu ăn ngon mà vẫn tiết kiệm chi phí hiệu quả.",
      category: "Mẹo nấu ăn",
      readTime: 5,
      date: "15/01/2025",
    },
    {
      id: 2,
      title: "Cách Bảo Quản Thực Phẩm Tươi Lâu Hơn",
      excerpt:
        "Hướng dẫn chi tiết cách bảo quản rau củ, thịt cá để giữ tươi lâu và giảm lãng phí.",
      category: "Bảo quản",
      readTime: 7,
      date: "12/01/2025",
    },
    {
      id: 3,
      title: "Lập Kế Hoạch Ăn Uống Cân Bằng",
      excerpt:
        "Cách tính toán dinh dưỡng và lập thực đơn cân bằng cho một tuần.",
      category: "Dinh dưỡng",
      readTime: 10,
      date: "08/01/2025",
    },
    {
      id: 4,
      title: "Nguyên Liệu Thay Thế Trong Nấu Ăn",
      excerpt:
        "Danh sách các nguyên liệu có thể thay thế khi không tìm thấy hoặc giá cao.",
      category: "Mẹo nấu ăn",
      readTime: 6,
      date: "05/01/2025",
    },
    {
      id: 5,
      title: "Mua Sắm Thông Minh Tại Chợ",
      excerpt:
        "Bí quyết chọn mua nguyên liệu tươi ngon với giá tốt nhất tại chợ truyền thống.",
      category: "Mua sắm",
      readTime: 8,
      date: "01/01/2025",
    },
    {
      id: 6,
      title: "Dụng Cụ Nhà Bếp Cơ Bản Cho Sinh Viên",
      excerpt:
        "Những món đồ dùng nhà bếp thiết yếu và tiết kiệm cho sinh viên tự nấu.",
      category: "Trang thiết bị",
      readTime: 5,
      date: "28/12/2024",
    },
  ];

  return (
    <>
      {/* Thông báo thử nghiệm */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
            <p className="text-sm md:text-base text-yellow-800 dark:text-yellow-200 font-medium">
              Trang web đang trong quá trình thử nghiệm.
            </p>
          </div>
        </div>
      </div>

      {/* Danh sách bài viết */}
      <div className="flex-1 py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-['Lexend']">
              Kiến Thức Nấu Ăn
            </h1>
            <p className="text-muted-foreground text-lg">
              Tổng hợp các bài viết hữu ích về nấu ăn, bảo quản và tiết kiệm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="p-6 hover:elevate transition-all hover:-translate-y-1 cursor-pointer"
                onClick={() => (window.location.href = "/not-found")} // chuyển đến trang lỗi
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <BookOpen className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold text-primary mb-3 font-['Lexend']">
                  {article.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime} phút đọc</span>
                  </div>
                  <span>{article.date}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
