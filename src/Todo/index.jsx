import React from "react"

import FilterTodo from "./components/FilterTodo";
import Lists from "./components/Lists";

const Todo = ()=> {
    return (
<div className="todo mt-2">
{/* filter list button  */}
<FilterTodo />
{/* lists  */}
<Lists />
</div>
    )
}

export default Todo;