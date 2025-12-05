import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const navItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Thực đơn", path: "/menu" },
    { label: "Công thức", path: "/recipes" },
    { label: "Mua sắm", path: "/shopping" },
    { label: "Kiến thức", path: "/knowledge" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hàng chính */}
        <div className="flex items-center justify-between h-16">
          {/* ✅ LOGO Dream Makers */}
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 hover-elevate active-elevate-2 px-3 py-2 rounded-md cursor-pointer">
              <img
                src="/logo_dreammakers.jpg"
                alt="Dream Makers Logo"
                className="h-10 w-10 object-contain rounded-full transition-transform duration-200 hover:scale-110"
              />
              <span className="font-bold text-xl font-['Lexend'] tracking-wide">
                Dream Makers
              </span>
            </div>
          </Link>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  <Button
                    variant="ghost"
                    className={`text-primary-foreground hover:bg-primary-foreground/10 ${
                      location === item.path ? "bg-primary-foreground/20" : ""
                    }`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>

            {/* Ô tìm kiếm */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/60" />
              <Input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-9 w-48 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-primary-foreground/30"
                data-testid="input-search"
              />
            </form>
          </div>

          {/* Nút mở menu mobile */}
          <button
            className="md:hidden p-2 rounded-md hover-elevate active-elevate-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {/* Ô tìm kiếm mobile */}
            <form onSubmit={handleSearch} className="relative px-4">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/60" />
              <Input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-9 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-primary-foreground/30"
                data-testid="input-search-mobile"
              />
            </form>

            {/* Navigation mobile */}
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`block px-4 py-2 rounded-md hover-elevate active-elevate-2 ${
                      location === item.path ? "bg-primary-foreground/20" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`link-mobile-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
