// import { Modal } from 'antd';
import { v4 as uuid } from "uuid";
import remove from "./../../assets/close.svg"
import style from "./calender.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import copy from "./../../assets/copy.svg"

import Users from "./../../assets/users.svg"
import { useState } from 'react'
import ModalOfUser from "./ModalOfUser/ModalOfUser";

const DropZone = ({ recipe, handleDragStart, setDrggedRecipe, mealTime, day, handleCopyButtonDragEnter, removeRecipe, canCopy, setCanCopy }: any) => {
    const [finalMembers, setFinalMembers] = useState(recipe.members || 0)
    const [updatedRecipe, setUpdatedRecipe] = useState(recipe)
    const [show, setShow] = useState(false);
    function getFinalMember(member: any, recipe: any) {
        setFinalMembers(member)
        const newObj = { ...recipe }
        newObj.members = member
        setUpdatedRecipe(newObj)
    }

    const handleShow = () => setShow(true);


    const onMouseEnter = (event: any,) => {
        event.preventDefault();
    };
    const onMouseLeave = (event: any,) => {
        event.preventDefault();
    };
    const onDragEnter = (event: any,) => {
        event.preventDefault();
    };
    const onDragLeave = (event: any,) => {
        event.preventDefault();
    };
    const onDragCapture = (event: any,) => {
        event.preventDefault();
    };
    return (
        <div
            className={style.recipe_name}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragCapture={onDragCapture}
            key={uuid()} draggable={true} onDragStart={(e) => handleDragStart(e, updatedRecipe, day, mealTime, finalMembers)} onDragOver={(): any => {
                setDrggedRecipe({
                    id: updatedRecipe.id,
                    day: day,
                    mealTime: mealTime,
                });
            }}>
            <p className={style.recipeName}>{updatedRecipe.recipeName} </p>
            <p className={style.members}>{updatedRecipe.members ? `for ${updatedRecipe.members} person` : <></>}</p>
            <div className={style.btns} key={uuid()}>
                <ModalOfUser getFinalMember={getFinalMember} recipe={updatedRecipe} show={show} setShow={setShow} />

                <button className={style.userButton}
                    onClick={() => handleShow()}
                >
                    <img src={Users} width={"20px"} />
                </button>
                <button className={style.dragButton}
                    // onDragEnter={h}
                    onDragCapture={handleCopyButtonDragEnter}
                >
                    <img src={copy} width={"20px"} />
                </button>

                <button className={style.removeButton} onClick={() => removeRecipe(updatedRecipe.id, day, mealTime)}><img src={remove} width={"20px"} /></button>
            </div>

        </div>)
}

export default DropZone

