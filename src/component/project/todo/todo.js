import React, { useEffect, useState } from 'react';
import "./style.css";

// https://github.com/thapatechnical/reactjsByThapaTechnical/blob/main/src/components/todoreact/todo.js

const getlocaldata = () => {
    const itemsList = localStorage.getItem("myTodo");
    if (itemsList) {
        return JSON.parse(itemsList);
    }
    else {
        return [];
    }
}




export const Todo = () => {
    const [state, setState] = useState("");
    const [items, setIteams] = useState(getlocaldata());
    const [editing, setEditing] = useState(false);
    const [idState, setIdstate] = useState("");

    const addItems = (e) => {

        // console.log(e);
        if (e.type === "click" || e.key === "Enter") {
            if (editing) {
                // console.log(editing);
                if (state.trim() === "") {
                    alert("!!Add Input First..")
                }
                else {
                    // console.log(idState);
                    setIteams(
                        items.map((curr)=>{
                            if(curr.id === idState)
                            {
                                return{...curr,name:state};
                            }
                            console.log(curr);
                            return curr;
                        })
                      );
                }

            }
            else {
                const new_item = {
                    id: new Date().getTime().toString(),
                    name: state,
                }
                if (state.trim() === "") {
                    alert("!!Add Input First..")
                }
                else {

                    setIteams([...items, new_item]);
                }
            }
            setIdstate('');
            setEditing(false);
            setState("");
        }

    }


    const editItem = (id) => {

        const targetItem = items.filter((cur) => {
            return cur.id === id;
        });
        // console.log(targetItem);
        document.querySelector(".from-control").value = targetItem[0].name;
        setState(targetItem[0].name);
        setIdstate(targetItem[0].id);
        setEditing(true);
    }


    const delItems = (id) => {
        const delItem = items.filter((cur) => {
            return cur.id !== id;
        })
        setIteams(delItem);
    }
    const removeAll = () => {
        setIteams([]);
    }

    useEffect(() => {
        localStorage.setItem("myTodo", JSON.stringify(items));
    }, [items])
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todo" />
                        <figcaption>Add Your List Here </figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            type="text"
                            placeholder='Add Item'
                            value={state}
                            className="from-control"
                            onChange={(e) => {
                                setState(e.target.value);
                            }}
                            onKeyDown={addItems}
                        />
                        <i className={editing ? "far fa-edit add-btn" :
                            "fa fa-plus add-btn"}
                            onClick={addItems}
                        ></i>
                    </div>

                    <div className="showItems">
                        {
                            items.map((curValue, idx) => {

                                return (
                                    <>
                                        <div className="eachItem">
                                            <h3 key={curValue.id}>{curValue.name}</h3>
                                            <div className="todo-btn">
                                                <i className="far fa-edit add-btn"
                                                    onClick={() => editItem(curValue.id)}
                                                ></i>
                                                <i className="far fa-trash-alt add-btn"
                                                    onClick={() => delItems(curValue.id)}
                                                ></i>
                                            </div>

                                        </div>
                                    </>
                                );
                            })}
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>Check List</span>
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Todo;