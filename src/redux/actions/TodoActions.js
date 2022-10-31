export const AddToDo = (data) => {
    return {
      type: "ADDTODO",
      payload: data,
    };
  };
  export const UpdateListValue = (data) => {
    return {
      type: "UPDATELISTVALUE",
      payload: { id: data.id, value: data.value },
    };
  };
  
  export const DeleteSpecificList = (id) => {
    return {
      type: "DELETESPECFICLIST",
      payload: id,
    };
  };
  
  export const AddTask = (data) => {
    return {
      type: "ADDTASK",
      payload: { id: data.id, value: data.value },
    };
  };
  
  export const UpdateTaskValue = (data) => {
    return {
      type: "UPDATETASKVALUE",
      payload: { id: data.id, value: data.value },
    };
  };
  
  export const DeleteSpecificTask = (id) => {
    return {
      type: "DELETESPECFICTASK",
      payload: id,
    };
  };
  
  export const FilterByOldDate = () => {
    return {
      type: "FILTERBYOLDDATE",
    };
  };
  
  export const FilterByNewDate = () => {
    return {
      type: "FILTERBYNEWDATE",
    };
  };
  
  export const FilterByAlpabet = () => {
    return {
      type: "FILTERBYALPABET",
    };
  };
  
  export const FilterTaskByNewDate = (id) => {
    return {
      type: "FILTERTASKBYNEWDATE",
      payload: id,
    };
  };
  
  export const FilterTaskByOldDate = (id) => {
    return {
      type: "FILTERTASKBYOLDDATE",
      payload: id,
    };
  };
  
  export const FilterTaskByAlpabet = (id) => {
    return {
      type: "FILTERTASKBYALPABET",
      payload: id,
    };
  };
  