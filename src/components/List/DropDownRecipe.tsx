import Accordion from 'react-bootstrap/Accordion';
import drag from "./../../assets/drag.svg";
import { v4 as uuid } from "uuid";
import style from "./list.module.css";
import './Updatestyle.css'
function DropDownRecipe({ recipes }) {
    const handleDragStart = (event: any, recipeName: any, id: any) => {
        event.currentTarget.classList.add(style.is_dragging);
        let obj = { id: id, recipeName: recipeName, members: 0 };
        event.dataTransfer.setData("text/plain", JSON.stringify(obj));
    };

    const handleDragEnd = (event: any) => {
        event.currentTarget.classList.remove(style.is_dragging); // Remove the class when dragging ends
    };

    return (
        <Accordion className={style.list}>
            <Accordion.Item eventKey="0" style={{ width: "100%" }}>
                <Accordion.Header style={{ width: "100%", border: "none", outline: 'none' }}>Spice & Rice</Accordion.Header>
                <Accordion.Body style={{ padding: 0 }}>
                    <div>

                        {recipes.map((recipe: any) => (
                            <div
                                className={`${style.recipe_name} ${style.draggable}`} // Add the draggable class
                                key={uuid()}
                                draggable={true}
                                onDragStart={(e) => handleDragStart(e, recipe.name, recipe.id)}
                                onDragEnd={handleDragEnd}
                            >
                                <div className={style.image_container}>
                                    <div className={style.recipe_img_container}>
                                        <img
                                            src={recipe.url}
                                            alt="recipeUrl"
                                            className={style.recipe_img}
                                        />
                                    </div>
                                    <div>
                                        <p>{recipe.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <img className={style.drag_img} src={drag} alt="drag_img" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" style={{ width: "100%" }}>
                <Accordion.Header style={{ width: "100%", border: "none", outline: 'none' }}>salad</Accordion.Header>
                <Accordion.Body style={{ padding: 0 }}>
                    <div>

                        {recipes.map((recipe: any) => (
                            <div
                                className={`${style.recipe_name} ${style.draggable}`} // Add the draggable class
                                key={uuid()}
                                draggable={true}
                                onDragStart={(e) => handleDragStart(e, recipe.name, recipe.id)}
                                onDragEnd={handleDragEnd}
                            >
                                <div className={style.image_container}>
                                    <div className={style.recipe_img_container}>
                                        <img
                                            src={recipe.url}
                                            alt="recipeUrl"
                                            className={style.recipe_img}
                                        />
                                    </div>
                                    <div>
                                        <p>{recipe.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <img className={style.drag_img} src={drag} alt="drag_img" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default DropDownRecipe;