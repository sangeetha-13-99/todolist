import TaskContext from "../utils/task-context";
import {useContext} from 'react';
import TaskItem from './TaskItem';
import {v4 as uuid} from "uuid";
import styled from "styled-components";
import trashIcon from "../assets/trash.svg";

const Task=()=>{
    const context=useContext(TaskContext);
    let todos;
        if(context.tab==='Completed'){
            todos=context.todos.filter((ele)=>ele.isCompleted);
        }
        else if(context.tab==='Active'){
            todos=context.todos.filter((ele)=>!ele.isCompleted);
        }
        else {
            todos=context.todos;
        }
    

    let taskList = todos.map((ele)=>{
        return <TaskItem key={uuid()} item={ele}/>
    })
   
    return (
        <TaskDiv>
            { 
                taskList.length>0 ? taskList:
                (context.tab==='All' || context.tab==='Active') && 
                <Message>
                    enter any task
                </Message>
            }
            {
                ((context.tab==='Completed' && taskList.length>0) 
                && <button onClick={context.removeTodos}>
                    <img src={trashIcon} alt="trash icon"/>delete all</button> 
                )|| 
                (
                    (context.tab==='Completed' && taskList.length===0) && 
                    <Message>
                        There are no tasks completed
                    </Message> 
                )
            }
        </TaskDiv>
    )
}

export default Task;

const TaskDiv=styled.div`
    width:60%;
    margin:auto;
    button{
        border:none;
        background-color:#EB5757;
        color:white;
        font-family: 'Poppins', sans-serif;
        padding:0.8rem 1rem;
        font-size:12px;
        border-radius:4px;
        cursor:pointer;
        & > img{
            width:10px;
            padding-right:10px;
        }
    }
    @media screen and (max-width:599px){
        width:80%;
    }

`

const Message=styled.div`
    font-size:2rem;
    color:#BDBDBD;
`