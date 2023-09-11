import style from "./list.module.css";
import drag from "./../../assets/drag.svg";
import { v4 as uuid } from "uuid";
import DropDownRecipe from "./DropDownRecipe";
// import { useAppSelector } from "../../store/hooks";
const List = () => {
  const recipes = [
    {
      "name": "Pizza Margherita",
      "url": "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "id": "gdfggsdfghfdbnvbfgb"
    },
    {
      "name": "BeefStay",
      "url": "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
      "id": "gsdfhdfbdfbvfxvbfg"
    },
    {
      "name": "Shrimp CockTail",
      "url": "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "id": "jdrhrtjngcxdfhb"
    },
    {
      "name": "Roasted Chilly",
      "url": "https://images.pexels.com/photos/1998920/pexels-photo-1998920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "id": "bhfgjskhvbbbngmn"
    },
    {
      "name": "Onion Margherita",
      "url": "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "id": "htrgjzdhdb"
    },
    {
      "name": "stackHouse ",
      "url": "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
      "id": "yjkyjrthbnfbfbfdb"
    },
    {
      "name": "Idli",
      "url": "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "id": "jhmghuihsdfuivi"
    },
    {
      "name": "Roasted panner",
      "url": "https://images.pexels.com/photos/1998920/pexels-photo-1998920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "id": "hrdfhbdthjhfbvub"
    }
  ];
  // const recipes = useAppSelector((state: any) => state.recipe.recipes);

  return (
    // <div className={style.list}>

    //   {recipes.map((recipe: any) => (
    //     <div
    //       className={`${style.recipe_name} ${style.draggable}`} // Add the draggable class
    //       key={uuid()}
    //       draggable={true}
    //       onDragStart={(e) => handleDragStart(e, recipe.name, recipe.id)}
    //       onDragEnd={handleDragEnd}
    //     >
    //       <div className={style.image_container}>
    //         <div className={style.recipe_img_container}>
    //           <img
    //             src={recipe.url}
    //             alt="recipeUrl"
    //             className={style.recipe_img}
    //           />
    //         </div>
    //         <div>
    //           <p>{recipe.name}</p>
    //         </div>
    //       </div>
    //       <div>
    //         <img className={style.drag_img} src={drag} alt="drag_img" />
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <DropDownRecipe recipes={recipes} />
  );
};

export default List;
