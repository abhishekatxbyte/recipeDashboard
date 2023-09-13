import Accordion from 'react-bootstrap/Accordion';
import drag from "./../../assets/drag.svg";
import { v4 as uuid } from "uuid";
import style from "./list.module.css";
import './Updatestyle.css'
function DropDownRecipe({ groupedRecipes }: any) {
    const handleDragStart = (event: any, recipeName: any, id: any) => {
        event.currentTarget.classList.add(style.is_dragging);
        let obj = { id: id, recipeName: recipeName, members: 0 };
        event.dataTransfer.setData("text/plain", JSON.stringify(obj));
    };

    const handleDragEnd = (event: any) => {
        event.currentTarget.classList.remove(style.is_dragging); // Remove the class when dragging ends
    };
    return (
        <>
            <Accordion style={{ minWidth: "250px", width: "100%" }}>
                {groupedRecipes.map((groupedRecipe: any, index: any) => {

                    return <Accordion.Item eventKey={index} style={{ width: "100%" }} key={uuid()}>
                        <Accordion.Header style={{ width: "100%", border: "none", outline: 'none' }}>{groupedRecipe.filter_cat}</Accordion.Header>
                        <Accordion.Body style={{ padding: 0 }}>
                            {
                                groupedRecipe.recipes.map((groupedrecipe: any) => {
                                    return <div key={uuid()}>

                                        <div
                                            className={`${style.recipe_name} ${style.draggable}`} // Add the draggable class
                                            key={uuid()}
                                            draggable={true}
                                            onDragStart={(e) => handleDragStart(e, groupedrecipe.itemName, groupedrecipe.Id)}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <div className={style.image_container}>
                                                <div className={style.recipe_img_container}>
                                                    <img
                                                        src={groupedrecipe.item_image}
                                                        alt="recipeUrl"
                                                        className={style.recipe_img}
                                                    />
                                                </div>
                                                <div>
                                                    <p>{groupedrecipe.itemName}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <img className={style.drag_img} src={drag} alt="drag_img" />
                                            </div>
                                        </div>
                                    </div>


                                })
                            }
                        </Accordion.Body>
                    </Accordion.Item>


                })}

            </Accordion>

        </>

    );
}

export default DropDownRecipe;