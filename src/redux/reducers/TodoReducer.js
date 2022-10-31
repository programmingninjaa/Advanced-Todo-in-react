const initState = {
    todoData: localStorage.getItem("todoData")
      ? JSON.parse(localStorage.getItem("todoData"))
      : [],
  };
  
  const TodoReducer = (state = initState, action) => {
    switch (action.type) {
      case "ADDTODO": {
        let newData = [...state.todoData, action.payload];
        //  set new list in local storage
        localStorage.setItem("todoData", JSON.stringify(newData));
        return { ...state, todoData: newData };
      }
  
      case "UPDATELISTVALUE": {
        // update list value
        let updatelist = state.todoData?.map((list) => {
          if (list.id === action.payload.id) {
            list.inputValue = action.payload.value;
          }
          return list;
        });
        //  set updated list value in local storage
        localStorage.setItem("todoData", JSON.stringify([...updatelist]));
        return { todoData: [...updatelist] };
      }
  
      case "DELETESPECFICLIST": {
        // update list value
        let updatelist = state.todoData?.filter((list) => {
          return list.id !== action.payload;
        });
  
        //  set updated list  in local storage
        localStorage.setItem("todoData", JSON.stringify([...updatelist]));
        return { todoData: [...updatelist] };
      }
  
      case "ADDTASK": {
        let addTask = state.todoData?.map((list) => {
          if (list.id === action.payload.id) {
            list.tasks = [...list.tasks, action.payload.value];
          }
          return list;
        });
  
        //  add  task data in local storage
        localStorage.setItem("todoData", JSON.stringify([...addTask]));
        return { todoData: [...addTask] };
      }
  
      case "UPDATETASKVALUE": {
        // update list value
        let updateTask = state.todoData?.map((list) => {
          list.tasks?.map((task) => {
            if (task.id === action.payload.id) {
              task.taskValue = action.payload.value;
            }
            return task;
          });
  
          return list;
        });
        //  set updated task value in local storage
        localStorage.setItem("todoData", JSON.stringify([...updateTask]));
        return { todoData: [...updateTask] };
      }
  
      case "DELETESPECFICTASK": {
        let updateTask = state.todoData?.map((list) => {
          return list.tasks?.filter((task) => {
            return task.id !== action.payload;
          });
        });
        var finalValue = [];
        if (updateTask.length > 0) {
          let filvalue = state.todoData?.map((list, i) => {
            list.tasks = updateTask[i];
  
            return list;
          });
  
          finalValue = filvalue;
        }
  
        //  set updated list  in local storage
        localStorage.setItem("todoData", JSON.stringify([...finalValue]));
        return { todoData: [...finalValue] };
      }
  
      case "FILTERBYOLDDATE": {
        let filterData = state.todoData?.sort((a, b) => {
          let date1 = new Date(a.date).getTime();
          let date2 = new Date(b.date).getTime();
          return date1 - date2;
        });
  
        return { todoData: [...filterData] };
      }
  
      case "FILTERBYNEWDATE": {
        let filterData = state.todoData?.sort((a, b) => {
          let date1 = new Date(a.date).getTime();
          let date2 = new Date(b.date).getTime();
          return date2 - date1;
        });
  
        return { todoData: [...filterData] };
      }
  
      case "FILTERBYALPABET": {
        let filterData = state.todoData?.sort((a, b) => {
          return a.inputValue.localeCompare(b.inputValue);
        });
  
        return { todoData: [...filterData] };
      }
  
      case "FILTERTASKBYNEWDATE": {
        let selectedList = state.todoData?.filter((task) => {
          return task.id === action.payload;
        });
  
        let filterData = selectedList?.[0]?.tasks.sort((a, b) => {
          let date1 = new Date(a.date).getTime();
          let date2 = new Date(b.date).getTime();
          return date2 - date1;
        });
  
        if (filterData.length > 0) {
          let filvalue = selectedList?.map((list) => {
            list.tasks = filterData;
            return list;
          });
  
          let updatelist = state.todoData?.map((list) => {
            if (list.id === action.payload) {
              list = filvalue[0];
            }
            return list;
          });
  
          return { todoData: [...updatelist] };
        } else {
          return { ...state };
        }
      }
  
      case "FILTERTASKBYOLDDATE": {
        let selectedList = state.todoData?.filter((task) => {
          return task.id === action.payload;
        });
  
        let filterData = selectedList?.[0]?.tasks.sort((a, b) => {
          let date1 = new Date(a.date).getTime();
          let date2 = new Date(b.date).getTime();
          return date1 - date2;
        });
  
        if (filterData.length > 0) {
          let filvalue = selectedList?.map((list) => {
            list.tasks = filterData;
            return list;
          });
  
          let updatelist = state.todoData?.map((list) => {
            if (list.id === action.payload) {
              list = filvalue[0];
            }
            return list;
          });
  
          return { todoData: [...updatelist] };
        } else {
          return { ...state };
        }
      }
      case "FILTERTASKBYALPABET": {
        let selectedList = state.todoData?.filter((task) => {
          return task.id === action.payload;
        });
  
        let filterData = selectedList?.[0]?.tasks.sort((a, b) => {
          if (a.taskValue < b.taskValue) {
            return -1;
          }
          if (a.taskValue > b.taskValue) {
            return 1;
          }
          return 0;
        });
  
        if (filterData.length > 0) {
          let filvalue = selectedList?.map((list) => {
            list.tasks = filterData;
            return list;
          });
  
          let updatelist = state.todoData?.map((list) => {
            if (list.id === action.payload) {
              list = filvalue[0];
            }
            return list;
          });
  
          return { todoData: [...updatelist] };
        } else {
          return { ...state };
        }
      }
  
      default:
        return { ...state };
    }
  };
  export default TodoReducer;
  