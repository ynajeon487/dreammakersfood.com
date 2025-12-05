import { useState } from 'react';
import RecipeFilter from '../RecipeFilter';

export default function RecipeFilterExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [mealTypeFilter, setMealTypeFilter] = useState('all');

  return (
    <div className="p-4">
      <RecipeFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priceFilter={priceFilter}
        onPriceChange={setPriceFilter}
        timeFilter={timeFilter}
        onTimeChange={setTimeFilter}
        mealTypeFilter={mealTypeFilter}
        onMealTypeChange={setMealTypeFilter}
      />
    </div>
  );
}
