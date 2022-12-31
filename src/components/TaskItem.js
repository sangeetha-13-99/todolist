import TaskContext from "../utils/task-context";
import {useContext} from 'react';
import styled,{css} from "styled-components";
import deleteIcon from '../assets/delete.svg';
import editIcon from "../assets/edit.svg";

const TaskItem=({item})=>{
    const context=useContext(TaskContext);
    function setCheckBoxFunction(){
        context.isCompletedFunction(item.id);
    }
    return (
        <TaskItemDiv>
            <Label completed={item.isCompleted}>
                <input onChange={setCheckBoxFunction} type="checkbox" checked={item.isCompleted} />
                    {item.task}
            </Label>
            {(context.tab==='Active'||context.tab==='All') && <img onClick={()=>{
                context.editTodo(item)
                }} src={editIcon} alt="edit icon"/>}
            {context.tab==='Completed' && <img onClick={()=>context.removeTodo(item.id)} src={deleteIcon} alt="delete icon"/>}
        </TaskItemDiv>
    )
}
export default TaskItem;
const TaskItemDiv=styled.div`
    display:flex;
    justify-content:space-between;
    margin-bottom:20px;
    & > img{
        width:15px;
        border:1px solid #BDBDBD;
        border-radius:4px;
        padding:0.3rem;
        cursor:pointer;
    }
`
const Label=styled.label`
   font-size:18px;
   input{
    margin-right:10px;
   }
   ${(props)=>
        props.completed && css`
        text-decoration: line-through;
    `
   }
`