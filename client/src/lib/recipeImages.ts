import eggTomatoImage from '@assets/generated_images/Scrambled_eggs_with_tomatoes_21887b7f.png';
import morningGloryImage from '@assets/generated_images/Stir-fried_morning_glory_b8c1df15.png';
import friedRiceImage from '@assets/generated_images/Vietnamese_fried_rice_170f31d9.png';
import noodlesImage from '@assets/generated_images/Upgraded_instant_noodles_75cdd539.png';
import porridgeImage from '@assets/generated_images/Chicken_rice_porridge_19a95b8b.png';
import braisedPorkImage from '@assets/generated_images/Vietnamese_braised_pork_with_eggs_7b5f6288.png';
import sourFishSoupImage from '@assets/generated_images/Vietnamese_sour_fish_soup_1d225652.png';
import tofuTomatoImage from '@assets/generated_images/Vietnamese_tofu_tomato_sauce_8ef66d72.png';

export const recipeImageMap: Record<string, string> = {
  'Scrambled_eggs_with_tomatoes_21887b7f.png': eggTomatoImage,
  'Stir-fried_morning_glory_b8c1df15.png': morningGloryImage,
  'Vietnamese_fried_rice_170f31d9.png': friedRiceImage,
  'Upgraded_instant_noodles_75cdd539.png': noodlesImage,
  'Chicken_rice_porridge_19a95b8b.png': porridgeImage,
  'Vietnamese_braised_pork_with_eggs_7b5f6288.png': braisedPorkImage,
  'Vietnamese_sour_fish_soup_1d225652.png': sourFishSoupImage,
  'Vietnamese_tofu_tomato_sauce_8ef66d72.png': tofuTomatoImage,
};

export function getRecipeImage(imageName: string): string {
  return recipeImageMap[imageName] || '';
}
