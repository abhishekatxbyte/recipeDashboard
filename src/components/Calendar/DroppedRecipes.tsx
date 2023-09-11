// // DroppedRecipes.js
// import { useState } from "react";
// import style from "./calender.module.css";
// import { v4 as uuid } from "uuid";
// import remove from "./../../assets/close.svg"
// import copy from "./../../assets/copy.svg"
// import userPlus from "./../assets/userPlus.svg"
// import userMinus from "./../assets/userMinus.svg"
// import Users from "./../../assets/users.svg"
// import { Modal } from "antd";
// export const DroppedRecipes = ({
//   recipes,
//   onDrop,
//   setDrggedRecipe,
//   removeRecipe,
//   setCanCopy,

//   day,
//   mealTime,
// }: any) => {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [recipeHoverStates, setRecipeHoverStates] = useState({});

//   console.log(isModalOpen)
//   const handleCopyButtonDragEnter = () => {
//     setCanCopy(true);
//   };
//   const onDragOver = (event: any) => {
//     event.preventDefault();
//   }
//   const onDragEnter = (event: any,) => {
//     event.preventDefault();
//     event.target.parentElement.parentElement.classList.add(style.droppedRecipe);
//     setIsHovered(false)
//   };
//   const onDragLeave = (event: any) => {
//     // setCanCopy(false)

//     event.preventDefault();
//     event.target.parentElement.parentElement.classList.remove(
//       style.droppedRecipe
//     );
//     setIsHovered(true)
//   };
//   const onMouseEnter = (event: any,) => {
//     event.preventDefault();
//     console.log('mouse entered')
//     setIsHovered(true)
//   };
//   const onMouseLeave = (event: any,) => {
//     event.preventDefault();
//     setIsHovered(false)
//   };


//   const handleDragStart = (event: any, obj: any, day: any, mealTime: any) => {
//     event.dataTransfer.setData(
//       "text/plain",
//       JSON.stringify({ ...obj, day: day, mealTime: mealTime })
//     );
//     setCanCopy(false);
//     setIsHovered(true)

//   };



//   return (
//     <>
//       <div
//         className={style.dropZone}
//         onDrop={(event) => onDrop(event, day, mealTime)}
//         onDragEnter={(event) => onDragEnter(event)}
//         onDragLeave={(event) => onDragLeave(event)}

//         onDragOver={onDragOver}
//       //  onMouseOver={() => onMouseOver(ref)}
//       >
//         <div className={style.dropZone}>
//           {recipes.map((recipe: any) => (

//             <div
//               className={style.recipe_name}
//               onMouseEnter={onMouseEnter}
//               onMouseLeave={onMouseLeave}
//               key={uuid()} draggable={true} onDragStart={(e) => handleDragStart(e, recipe, day, mealTime)} onDragOver={() => {
//                 setDrggedRecipe({
//                   id: recipe.id,
//                   day: day,
//                   mealTime: mealTime,
//                 });
//               }}>
//               <p className={style.recipeName}>{recipe.recipeName}</p>

//               <div className={` ${style.btns} ${isHovered ? style.flex : style.btns}`} key={uuid()}>


//                 <Modal
//                   title="Vertically centered modal dialog"
//                   centered
//                   open={isModalOpen}
//                   onOk={() => setIsModalOpen(false)}
//                   onCancel={() => setIsModalOpen(false)}
//                 >
//                   <p>some contents...</p>
//                   <p>some contents...</p>
//                   <p>some contents...</p>
//                 </Modal>
//                 <button className={style.userButton}
//                   onClick={() => setIsModalOpen(true)}
//                 >
//                   <img src={Users} width={"20px"} />
//                 </button>
//                 <button className={style.dragButton}
//                   onDragEnter={handleCopyButtonDragEnter}
//                 >
//                   <img src={copy} width={"20px"} />
//                 </button>

//                 <button className={style.removeButton} onClick={() => removeRecipe(recipe.id, day, mealTime)}><img src={remove} width={"20px"} /></button>
//               </div>

//             </div>
//           ))}
//         </div>
//       </div >

//     </>
//   );
// };
import { useState } from "react";
import style from "./calender.module.css";
import { v4 as uuid } from "uuid";

import DropZone from "./DropZone";
export const DroppedRecipes = ({
  recipes,
  onDrop,
  setDrggedRecipe,
  removeRecipe,
  isDropSuccess,
  setCanCopy,
  setIsDropSuccess,
  day,
  mealTime,
}: any) => {
  const [dragEntered, setDragEntered] = useState(false)
  const handleCopyButtonDragEnter = () => {
    setCanCopy(true);
    setDragEntered(true)
  };




  const onDragOver = (event: any) => {
    event.preventDefault();
    setIsDropSuccess(false)


  }
  const onDragEnter = (event: any,) => {
    event.preventDefault();
    setDragEntered(true)
    event.target.parentElement.parentElement.classList.add(style.droppedRecipe);

  };
  const onDragLeave = (event: any) => {
    setDragEntered(false)
    event.preventDefault();
    event.target.parentElement.parentElement.classList.remove(
      style.droppedRecipe
    );
  };


  const handleDragStart = (event: any, obj: any, day: any, mealTime: any, finalMembers: any) => {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ ...obj, day: day, mealTime: mealTime, members: finalMembers })
    );
    setCanCopy(false);
  };



  return (
    <>
      <div

        className={style.dropZone}
        onDrop={(event) => onDrop(event, day, mealTime)}
        onDragEnter={(event) => onDragEnter(event)}
        onDragLeave={(event) => onDragLeave(event)}
        onDragOver={onDragOver}

      >
        <div className={style.dropZone} style={{
          backgroundColor: isDropSuccess ? "#fff" : dragEntered ? "#fff7d2" : "#fff",
          transition: "all 0.3s"
        }}>
          {recipes.map((recipe: any) => (
            <DropZone key={uuid()} recipe={recipe} handleDragStart={handleDragStart}
              removeRecipe={removeRecipe}
              handleCopyButtonDragEnter={handleCopyButtonDragEnter} setDrggedRecipe={setDrggedRecipe} day={day} mealTime={mealTime} />
          ))}
        </div>
      </div >

    </>
  );
};
