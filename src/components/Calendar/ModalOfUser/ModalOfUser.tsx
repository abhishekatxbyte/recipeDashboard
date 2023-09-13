import { Modal } from 'react-bootstrap'
import userPlus from "./../../../assets/userplus.svg"
import userMinus from "./../../../assets/userMinus.svg"
import style from "./modal.module.css"
import { useState } from 'react'
const ModalOfUser = ({ show, setShow, getFinalMember, recipe }: any) => {
    const [recipeMember, setRecipeMember] = useState(recipe ? recipe.members : 0)

    const incrementMember = () => {
        setRecipeMember((prev: any) => prev + 1)
    }
    const decrementMember = () => {
        setRecipeMember((prev: any) => prev - 1)
    }

    const handleClose = () => {
        setShow(false)
        getFinalMember(recipeMember, recipe)
    };
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={style.memberController}>
                    <button className={style.memberButton} onClick={incrementMember} ><img src={userPlus} alt="userPlus" width={"30px"} /></button>
                    <p>{recipeMember}</p>
                    <button className={style.memberButton} onClick={decrementMember}><img src={userMinus} alt="userMinus" width={"30px"} /></button></div></Modal.Body>
            <Modal.Footer>

                <button onClick={handleClose} className={style.saveButton} >
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalOfUser