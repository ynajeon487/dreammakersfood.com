import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RecipeFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  priceFilter: string;
  onPriceChange: (value: string) => void;
  timeFilter: string;
  onTimeChange: (value: string) => void;
  mealTypeFilter: string;
  onMealTypeChange: (value: string) => void;
  onSearch: () => void;
}

export default function RecipeFilter({
  searchQuery,
  onSearchChange,
  priceFilter,
  onPriceChange,
  timeFilter,
  onTimeChange,
  mealTypeFilter,
  onMealTypeChange,
  onSearch,
}: RecipeFilterProps) {
  return (
    <div className="bg-card border border-card-border rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2 lg:col-span-2">
          <Label htmlFor="search">
            Tìm kiếm món ăn <span className="text-muted-foreground text-sm">(không bắt buộc)</span>
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              type="search"
              placeholder="Nhập tên món ăn..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Hãy tìm kiếm món ăn cụ thể
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Giá món</Label>
          <Select value={priceFilter} onValueChange={onPriceChange}>
            <SelectTrigger id="price" data-testid="select-price">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="under-10k">Dưới 10k</SelectItem>
              <SelectItem value="10k-15k">10k - 15k</SelectItem>
              <SelectItem value="15k-20k">15k - 20k</SelectItem>
              <SelectItem value="20k-25k">20k - 25k</SelectItem>
              <SelectItem value="25k-30k">25k - 30k</SelectItem>
              <SelectItem value="30k-40k">30k - 40k</SelectItem>
              <SelectItem value="40k-50k">40k - 50k</SelectItem>
              <SelectItem value="over-50k">Trên 50k</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Thời gian nấu</Label>
          <Select value={timeFilter} onValueChange={onTimeChange}>
            <SelectTrigger id="time" data-testid="select-time">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="under-15">Dưới 15 phút</SelectItem>
              <SelectItem value="15-30">15 - 30 phút</SelectItem>
              <SelectItem value="30-60">30 - 60 phút</SelectItem>
              <SelectItem value="over-60">Trên 60 phút</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meal-type">Loại bữa</Label>
          <Select value={mealTypeFilter} onValueChange={onMealTypeChange}>
            <SelectTrigger id="meal-type" data-testid="select-meal-type">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="breakfast">Bữa sáng</SelectItem>
              <SelectItem value="lunch">Bữa trưa</SelectItem>
              <SelectItem value="dinner">Bữa tối</SelectItem>
              <SelectItem value="snack">Ăn vặt</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6">
        <Button 
          onClick={onSearch}
          className="w-full bg-primary text-primary-foreground"
          data-testid="button-search-recipes"
        >
          <Search className="mr-2 h-4 w-4" />
          Tìm kiếm món ăn
        </Button>
      </div>
    </div>
  );
}
