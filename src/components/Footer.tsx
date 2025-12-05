import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid 4 cột - tất cả cùng hàng */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* 1️⃣ Giới thiệu (đã chèn logo) */}
          <div>
            <a
              href="/"
              className="flex items-center gap-3 mb-4 hover-elevate active-elevate-2 px-2 py-1 rounded-md"
              aria-label="Về trang chủ Dream Makers"
            >
              <img
                src="/logo_dreammakers.jpg"
                alt="Dream Makers logo"
                className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-full transition-transform duration-200 hover:scale-105"
                loading="lazy"
              />
              <span className="font-bold text-xl font-['Lexend'] tracking-wide">
                Dream Makers
              </span>
            </a>
            <p className="text-primary-foreground/80 leading-relaxed">
              Website hỗ trợ sinh viên lập thực đơn và nấu ăn tiết kiệm với công
              thức món Việt Nam.
            </p>
          </div>

          {/* 2️⃣ Liên hệ */}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-['Lexend']">
              Liên hệ
            </h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>tdthanhtruc1408@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>0123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Thành phố Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* 3️⃣ Chính sách */}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-['Lexend']">
              Chính sách
            </h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Về chúng tôi
                </a>
              </li>
            </ul>
          </div>

          {/* 4️⃣ Mạng xã hội */}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-['Lexend']">
              Mạng xã hội
            </h4>
            <div className="flex items-center gap-4 text-primary-foreground/80">
              <a
                href="https://facebook.com/yuunaki487"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-500 transition-colors"
              >
                <div className="p-2 rounded-full bg-primary-foreground/10 hover:bg-blue-500/20 transition">
                  <FaFacebook className="h-5 w-5" />
                </div>
              </a>
              <a
                href="https://www.instagram.com/_yuunaki.487_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-500 transition-colors"
              >
                <div className="p-2 rounded-full bg-primary-foreground/10 hover:bg-pink-500/20 transition">
                  <FaInstagram className="h-5 w-5" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Dòng bản quyền */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>
            © Thuộc về nhóm dự án Dream Makers - AUP001 Khóa 51 Đại học Kinh tế
            TPHCM.
          </p>
        </div>
      </div>
    </footer>
  );
}
