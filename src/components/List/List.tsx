import { useAppSelector } from "../../store/hooks";
import DropDownRecipe from "./DropDownRecipe";
// import { useAppSelector } from "../../store/hooks";
const List = () => {
  // const recipes = [
  //   {
  //     "name": "Pizza Margherita",
  //     "url": "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     "id": "gdfggsdfghfdbnvbfgb"
  //   },
  //   {
  //     "name": "BeefStay",
  //     "url": "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     "id": "gsdfhdfbdfbvfxvbfg"
  //   },
  //   {
  //     "name": "Shrimp CockTail",
  //     "url": "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     "id": "jdrhrtjngcxdfhb"
  //   },
  //   {
  //     "name": "Roasted Chilly",
  //     "url": "https://images.pexels.com/photos/1998920/pexels-photo-1998920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     "id": "bhfgjskhvbbbngmn"
  //   },
  //   {
  //     "name": "Onion Margherita",
  //     "url": "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     "id": "htrgjzdhdb"
  //   },
  //   {
  //     "name": "stackHouse ",
  //     "url": "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     "id": "yjkyjrthbnfbfbfdb"
  //   },
  //   {
  //     "name": "Idli",
  //     "url": "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     "id": "jhmghuihsdfuivi"
  //   },
  //   {
  //     "name": "Roasted panner",
  //     "url": "https://images.pexels.com/photos/1998920/pexels-photo-1998920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     "id": "hrdfhbdthjhfbvub"
  //   }
  // ];
  // const recipes = useAppSelector((state: any) => state.recipe.recipes);
  function groupRecipesByCategory(recipes: any) {
    const categories: any = {};

    recipes.forEach(item => {
      const categoryName = item.categoryName;
      if (!categories[categoryName]) {
        categories[categoryName] = [];
      }
      categories[categoryName].push(item);
    });

    const result = Object.keys(categories).map(categoryName => ({
      filter_cat: categoryName,
      recipes: categories[categoryName]
    }));

    return result;
  }

  // Usage
  const recipe2 = useAppSelector(state => state.calanderDays.recipes);
  const groupedRecipes = groupRecipesByCategory(recipe2);

  return (

    <DropDownRecipe groupedRecipes={groupedRecipes} />
  );
};

export default List;
