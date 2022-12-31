import styled from "styled-components";

import {useContext} from "react";
import TaskContext from "../utils/task-context";

const Input=()=>{
    const context=useContext(TaskContext);
    
    
    return (
        <InputDiv>
            <input value={context.inputValue} onChange={context.changeHandler} placeholder="add details"/>
            {!context.edit.isEdit && <button onClick={context.submitHandler}>add</button>}
            {context.edit.isEdit && <button onClick={context.editTodoHandler}>edit</button>}
        </InputDiv>
    )
}

const InputDiv=styled.div`
    width:60%;
    margin:auto;
    display:flex;
    justify-content:space-between;
    margin:1rem auto;
    input{
        width:70%;
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        padding:1rem 0.5rem;
        line-height: 17px;
        border:1px solid #BDBDBD;
        border-radius:1rem;
        outline:none;
        &::placeholder {
            font-weight: 400;
        }
    }
    button{
        border-radius:1rem;
        outline:none;
        border:none;
        padding:20px 30px;
        background: #2F80ED;
        box-shadow: 0px 2px 6px rgba(127, 177, 243, 0.4);
        border-radius: 12px;
        color:white;
        cursor:pointer;
    }
    @media screen and (max-width:599px){
        width:80%;
        
    }


`

export default Input;