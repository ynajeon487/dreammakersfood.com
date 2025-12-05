import RecipeCard from '../RecipeCard';
import eggTomatoImage from '@assets/generated_images/Scrambled_eggs_with_tomatoes_21887b7f.png';

export default function RecipeCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <RecipeCard
        id={1}
        name="Trứng chiên cà chua"
        image={eggTomatoImage}
        price={15000}
        cookTime={15}
        servings={1}
        rating={4.8}
        mealType="Bữa sáng"
        onClick={() => console.log('Recipe card clicked')}
      />
    </div>
  );
}
