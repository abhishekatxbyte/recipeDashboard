// import { Modal } from 'antd';
import { v4 as uuid } from "uuid";
import remove from "./../../assets/close.svg"
import style from "./calender.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import copy from "./../../assets/copy.svg"

import Users from "./../../assets/users.svg"
import { useState } from 'react'
import ModalOfUser from "./ModalOfUser/ModalOfUser";

const DropZone = ({ recipe, handleDragStart, setDrggedRecipe, mealTime, day, handleCopyButtonDragEnter, removeRecipe }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [finalMembers, setFinalMembers] = useState(recipe.members || 0)
    const [show, setShow] = useState(false);
    function getFinalMember(member: any) {
        recipe.members = member
        setFinalMembers(member)
    }
    const handleShow = () => setShow(true);

    const onMouseEnter = (event: any,) => {
        event.preventDefault();
        setIsHovered(true)
    };
    const onMouseLeave = (event: any,) => {
        event.preventDefault();
        setIsHovered(false)
    };
    const onDragEnter = (event: any,) => {
        event.preventDefault();
        setIsHovered(false)
    };
    const onDragLeave = (event: any,) => {
        event.preventDefault();
        setIsHovered(false)
    };
    const onDragCapture = (event: any,) => {
        event.preventDefault();
        setIsHovered(false)
    };
    console.log()
    return (
        <div
            className={style.recipe_name}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragCapture={onDragCapture}
            key={uuid()} draggable={true} onDragStart={(e) => handleDragStart(e, recipe, day, mealTime, finalMembers)} onDragOver={(): any => {
                setDrggedRecipe({
                    id: recipe.id,
                    day: day,
                    mealTime: mealTime,
                });
            }}>
            <p className={style.recipeName}>{recipe.recipeName} </p>
            <p className={style.members}>{recipe.members ? `for ${recipe.members} person` : <></>}</p>
            <div className={` ${style.btns} ${isHovered ? style.flex : style.btns}`} key={uuid()}>
                <ModalOfUser getFinalMember={getFinalMember} recipe={recipe} show={show} setShow={setShow} />

                <button className={style.userButton}
                    onClick={() => handleShow()}
                >
                    <img src={Users} width={"20px"} />
                </button>
                <button className={style.dragButton}
                    onDragEnter={handleCopyButtonDragEnter}
                >
                    <img src={copy} width={"20px"} />
                </button>

                <button className={style.removeButton} onClick={() => removeRecipe(recipe.id, day, mealTime)}><img src={remove} width={"20px"} /></button>
            </div>

        </div>)
}

export default DropZone

