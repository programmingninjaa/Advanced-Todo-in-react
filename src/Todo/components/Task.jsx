import React, { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { DeleteSpecificTask, UpdateTaskValue } from "../../redux/actions/TodoActions";

const Task = ({ task }) => {
  const [isEditTask, setIsEditTask] = useState(false);
  const [editTask, setEditTask] = useState("");
  const dispatch = useDispatch();

  // input ref
  const inputRef = useRef(null);

  // handle task change value
  const handleTaskValue = (e, id) => {
    e.preventDefault();

    if (editTask) {
      dispatch(UpdateTaskValue({ id: id, value: editTask }));
      setIsEditTask(false);
    }
  };

  // delete list
  const deleteTask = (id) => {
    dispatch(DeleteSpecificTask(id));
  };

  // fill list input field with task value
  useEffect(() => {
    if (task.taskValue) {
      setEditTask(task.taskValue);
    }
  }, [task.taskValue]);

  // check if isEditTask is true or false
  // if true focus input
  useEffect(() => {
    if (isEditTask) {
      inputRef.current?.focus();
    }
  }, [isEditTask]);

  return (
    <div
      className={`task  mt-3  d-flex justify-content-between  bg-white ${
        isEditTask && "open"
      }`}
      onBlur={() => {
        setIsEditTask(false);
      }}
    >
      {isEditTask ? (
        <form
          className="d-block"
          onSubmit={(event) => handleTaskValue(event, task.id)}
        >
          <input
            type="text"
            ref={inputRef}
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
          />
        </form>
      ) : (
        <p>{task.taskValue}</p>
      )}

      <div className="action">
        <MdDeleteForever
          style={{ fontSize: "1.2rem", marginRight: "0.5rem" }}
          className="icon"
          onClick={() => deleteTask(task.id)}
        />
        <FaRegEdit
          style={{ fontSize: "1.1rem" }}
          className="icon"
          onClick={() => {
            setIsEditTask(true);
          }}
        />
      </div>
    </div>
  );
};

export default Task;
