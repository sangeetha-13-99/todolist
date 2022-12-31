import React,{useState,createContext,useReducer} from "react";
import {v4 as uuid} from 'uuid';
const TaskContext=createContext({
    todos:[],
    addTodo:()=>{},
    removeTodo:()=>{},
    removeTodos:()=>{},
    isCompletedFunction:()=>{},
    tab:'',
    setTabFunction:()=>{},
    editTodo:()=>{},
    inputValue:'',
    edit:{},
    editTodoHandler:()=>{},
    changeHandler:()=>{},
    submitHandler:()=>{}
})

function reducerFunction(state,action){
    switch (action.type){
        case 'add':
            return [...state,action.value];
            break;
        case 'update':
            return state.map((task)=>{
                if(task.id===action.id){
                    return {...task,task:action.value}
                }
                return task
            })
            break;
        case 'completeCheck':
            return state.map((task)=>{
                if(task.id===action.id){
                    return {...task,isCompleted:!task.isCompleted}
                }
                return task
            })
            break;
        case 'delete':
            return state.filter((object)=>{
                   return object.id!==action.id
                }
            )
            break;
        case 'deleteAll':
            return [];
    }

}
export const TaskContextProvider=(props)=>{

    const [todos,setTodo]=useReducer(reducerFunction,[]);
    const[tab,setTab]=useState('All');
    const [edit,setIsEdit]=useState({isEdit:false,id:''});
    const [value,setValue]=useState('');

    function changeHandler(event){
            setValue(event.target.value);
    }

    function submitHandler() {
        if(value.trim() !== '') {
            let input= {
                id:uuid(),
                task:value,
                isCompleted:false
            }
            addTodosFunction(input);
            setValue('');
        }
    }

    function setTabFunction(value){
        setTab(value);
    }

    function addTodosFunction(task){
        setTodo({type:'add',value:task});
    }
    
    function editTodoHandler(){
        setTodo({type:'update',value,id:edit.id});
        setValue('');
        setIsEdit(()=> {return {isEdit:false,id:''}});
    }

    function editTodoFunction(task){
        setValue(task.task);
        setIsEdit(()=> {return {isEdit:true,id:task.id}});
    }

    function removeTodosFunction(taskId){
        setTodo({type:'delete',id:taskId});
        if(taskId===edit.id){
            setValue('');
            setIsEdit(()=> {return {isEdit:false,id:''}});
        }
    }
    function isCompletedFunction(taskId){
        setTodo({type:'completeCheck',id:taskId})
    }

    function removeTodos(){
        setTodo({type:'deleteAll'});
        setValue('');
        setIsEdit(()=> {return {isEdit:false,id:''}});
    }

    return(
        <TaskContext.Provider value={
            {
                todos,
                addTodo:addTodosFunction,
                removeTodo:removeTodosFunction,
                editTodo:editTodoFunction,
                removeTodos,
                isCompletedFunction,
                tab,
                setTabFunction,
                inputValue:value,
                changeHandler,
                submitHandler,
                edit,
                editTodoHandler
            }
        }>
            {props.children}
        </TaskContext.Provider>
    )
}
export default TaskContext;