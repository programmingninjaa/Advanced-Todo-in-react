import React from "react";
import { useSelector } from "react-redux";
import AddList from "./AddList";
import List from "./List";

const Lists = ()=> {
  const todoData = useSelector(({ TodoReducer }) => TodoReducer.todoData);

return (
    <div
      className="lists d-flex  "
      style={{
        marginLeft: "1.76rem",

        height: "calc(100vh - 15vh)",
        width: "95%",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      {todoData?.map((list) => (
        <List list={list} key={list.id} />
      ))}
      <AddList />
    </div>
)
}

export default Lists;