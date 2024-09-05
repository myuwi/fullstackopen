import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (ev) => dispatch(setFilter(ev.target.value));

  return (
    <div className="filter">
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
