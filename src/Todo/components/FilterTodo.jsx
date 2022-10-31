import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { FilterByAlpabet, FilterByNewDate, FilterByOldDate } from "../../redux/actions/TodoActions";
import { useDispatch } from "react-redux";

const filterTypes = [
    { id: 1, value: "Date Created (newest first)" },
    { id: 2, value: "Date Created (oldest first)" },
    { id: 3, value: "Date Created (alphabetically)" },
  ];

const FilterTodo = ()=> {
 const [showFilter, setShowFilter] = useState(false);
 const dispatch = useDispatch();
 
 // handle selected filter
 const handleSelectFilter = (id) => {
  
    if (id === 1) {
      dispatch(FilterByNewDate());
      setShowFilter(false);
    } else if (id === 2) {
      dispatch(FilterByOldDate());
      setShowFilter(false);
    } else {
      dispatch(FilterByAlpabet());
      setShowFilter(false);
    }
  };
    return (
        <div className="filter__data  mb-4 " style={{ paddingRight: "2.5rem" }}>
        <div className="filter__title  text-white position-relative">
          <div
            className="d-flex align-items-center justify-content-end"
            onClick={() => setShowFilter(!showFilter)}
          >
            <IoFilter
              className="icon me-2"
              style={{ fontSize: "1rem", cursor: "pointer" }}
            />
            <h6>sort list</h6>
          </div>
  
          {/* drop down  */}
          <div className={`drop__down ${showFilter && "show"} `}>
            <div className="drop__down--header d-flex align-items-center justify-content-between">
              <h6>Sort list </h6>
              <GrClose
                style={{ cursor: "pointer" }}
                onClick={() => setShowFilter(false)}
              />
            </div>
            <hr />
            <div className="drop__down--main">
              {filterTypes.map((item) => (
                <li key={item.id} onClick={() => handleSelectFilter(item.id)}>
                  {item.value}
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
  
    )
}

export default FilterTodo;