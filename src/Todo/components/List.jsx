import React, { useEffect, useRef, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { IoFilter } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { AddTask, DeleteSpecificList, FilterTaskByAlpabet, FilterTaskByNewDate, FilterTaskByOldDate, UpdateListValue } from "../../redux/actions/TodoActions";
import Task from "./Task";


const filterTypes = [
  { id: 1, value: "Date Created (newest first)" },
  { id: 2, value: "Date Created (oldest first)" },
  { id: 3, value: "Date Created (alphabetically)" },
];

const List = ({ list }) => {
  const [addTask, setAddTask] = useState([]);
  const [isAddTaskOpen, setIsAddTask] = useState(false);
  const [isEditList, setIsEditList] = useState(false);
  const [listInput, setListInput] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const dispatch = useDispatch();

  // use ref
  const listinputRef = useRef(null);

  // handle selected filter
  const handleSelectFilter = (id, listid) => {
    if (id === 1) {
       
      dispatch( FilterTaskByNewDate(listid));
      setShowFilter(false);
    } else if (id === 2) {
        
      dispatch(FilterTaskByOldDate(listid));
      setShowFilter(false);
    } else {
        
      dispatch(FilterTaskByAlpabet(listid));
      setShowFilter(false);
    }
  };

  //  open task
  const handleAddTaskOpener = () => {
    if (isAddTaskOpen === false) {
      setIsAddTask(true);
    } else {
      setIsAddTask(false);
    }
  };

  // handle list change value

  const handleListValue = (e, id) => {
    e.preventDefault();

    if (listInput) { 
      dispatch(UpdateListValue({ id: id, value: listInput }));
      setIsEditList(false);
    }
  };

  // delete list
  const deleteList = (id) => { 
    dispatch( DeleteSpecificList(id));
  };

  // add task handler
  const addTaskHandler = () => {
    if (addTask) {
      let data = {
        id: Math.random().toString("16"),
        taskValue: addTask,
        date: new Date(),
      };
      
      dispatch(AddTask({ id: list.id, value: data }));
      setAddTask("");
      setIsAddTask(false);
    }
  };

  // check if isEditList is true or false
  // if true focus input
  useEffect(() => {
    if (isEditList) {
      listinputRef.current?.focus();
    }
  }, [isEditList]);

  // fill list input field with list value
  useEffect(() => {
    if (list.inputValue) {
      setListInput(list.inputValue);
    }
  }, [list.inputValue]);

  return (
    <div className="list position-relative " style={{ marginRight: "1rem" }}>
      <div className="list__container">
        {/* title container  */}
        <div className="title__container">
          {isEditList ? (
            <form
              className="d-block"
              onSubmit={(event) => handleListValue(event, list.id)}
            >
              <input
                type="text"
                value={listInput}
                ref={listinputRef}
                onChange={(e) => setListInput(e.target.value)}
              />
            </form>
          ) : (
            <span onClick={() => setIsEditList(true)}>
              {list.inputValue.lenght > 27
                ? list.inputValue.slice(0, 27)
                : list.inputValue}
            </span>
          )}
          <div>
            <MdDeleteForever
              className="icon"
              onClick={() => deleteList(list.id)}
            />
            <IoFilter
              className="icon me-2  filter__icon"
              title="sort task"
              style={{ fontSize: "1rem", cursor: "pointer" }}
              onClick={() => setShowFilter(!showFilter)}
            />
            {/* drop down  */}
            <div className={`drop__down ${showFilter && "show"}  `}>
              <div className="drop__down--header d-flex align-items-center justify-content-between">
                <h6>Sort Task </h6>
                <GrClose
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowFilter(false)}
                />
              </div>
              <hr />
              <div className="drop__down--main">
                {filterTypes.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleSelectFilter(item.id, list.id)}
                  >
                    {item.value}
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* main card  */}
        <div className="main__card">
          {list?.tasks?.map((task) => (
            <Task task={task} key={task.id} />
          ))}

          {/* input container  */}
          {isAddTaskOpen ? (
            <div className="input__container">
              <textarea
                rows="3"
                placeholder="Enter title for this card..."
                value={addTask}
                onChange={(e) => setAddTask(e.target.value)}
              ></textarea>
              <div className="btn__wrapper" style={{ marginTop: "0.3rem" }}>
                <button type="button" onClick={addTaskHandler}>
                  Add list
                </button>
                <IoMdClose
                  style={{
                    fontSize: "1.6rem",
                    cursor: "pointer",
                    marginLeft: "1rem",
                  }}
                  onClick={handleAddTaskOpener}
                />
              </div>
            </div>
          ) : (
            <div className="add__task d-flex justify-content-between align-items-center mt-3">
              <div
                className="left d-flex align-items-center"
                onClick={handleAddTaskOpener}
              >
                <AiOutlinePlus
                  className="icon"
                  style={{ fontSize: "1.2rem" }}
                />{" "}
                Add a card
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
