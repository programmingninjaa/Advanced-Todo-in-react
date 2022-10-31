import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { AddToDo } from "../../redux/actions/TodoActions";

const AddList = ()=> {
    const [isAddListOpen, setAddListOpen] = useState(false);
    const [input, setInput] = useState("");
     const dispatch = useDispatch();

    // input ref
  const inputRef = useRef();

  // toggle b/w input field
  const handleAddList = () => {
    if (isAddListOpen === false) {
      setAddListOpen(true);
    } else {
      setAddListOpen(false);
    }
  };

   //   submit input
   const handleSubmit = () => {
    if (input) {
      let data = {
        id: Math.random().toString("16"),
        inputValue: input,
        date: new Date(),
        tasks: [],
      };
      
      dispatch(AddToDo(data))
    
      setInput("");
    }
  };

  // focus input field
  useEffect(() => {
    if (isAddListOpen) {
      inputRef.current?.focus();
    }
  }, [isAddListOpen]);
  
    return (
        <div className="add__list">
      {isAddListOpen ? (
        <div className="open__input--container ">
          <input
            type="text"
            value={input}
            placeholder="Enter list title..."
            ref={inputRef}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="btn__wrapper" style={{ marginTop: "0.3rem" }}>
            <button type="button" onClick={handleSubmit}>
              Add list
            </button>
            <IoMdClose
              style={{
                fontSize: "1.6rem",
                cursor: "pointer",
                marginLeft: "1rem",
              }}
              onClick={handleAddList}
            />
          </div>
        </div>
      ) : (
        <div
          className="wrapper d-flex align-items-center"
          onClick={handleAddList}
        >
          <AiOutlinePlus className="icon" /> add another list
        </div>
      )}
    </div>
    )
}

export default AddList;