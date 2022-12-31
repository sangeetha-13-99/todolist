import styled from 'styled-components';
import TabsContent from "./TabsContent";
import TaskContext from '../utils/task-context';
import { useContext } from 'react';
const ToDoList=()=>{
    const context=useContext(TaskContext);
    return (
        <TodoDiv>
            <h1>todo List</h1>
            <Tabs >
                <ul>
                    { ['All','Active','Completed'].map((ele,index)=>{
                        return <li className={context.tab===ele ? 'activeTab':''} onClick={()=>context.setTabFunction(ele)} key={index}>{ele}</li>
                    })}
                </ul>
            </Tabs>
            <TabsContent/>
        </TodoDiv>
    )
}
export default ToDoList;

const TodoDiv=styled.div`
    width:80%;
    margin:auto;
    @media screen and (max-width:599px){
        width:100%;
    }

`
const Tabs=styled.div`
    text-align:center;

    ul{
        display:flex;
        justify-content:space-evenly;
        padding:0;
        width:60%;
        margin:auto;
        
        border-bottom:1.5px solid #BDBDBD;
        font-family: 'Poppins', sans-serif;
        font-weight:500;
        font-color:#333333;
        li{
            list-style:none;
            cursor:pointer;
            padding-bottom:1rem;
            min-width:20%;
        }
        li.activeTab{
            border-bottom:5px solid #2F80ED;
            border-radius:2px;   
        }
    }
    @media screen and (max-width:599px){
        ul{
            width:80%;
        }

    }

`