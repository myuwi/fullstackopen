const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET": {
      return action.payload;
    }
    default:
      return state;
  }
};

export const setFilter = (filter) => ({
  type: "SET",
  payload: filter,
});

export default filterReducer;
