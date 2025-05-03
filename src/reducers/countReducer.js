const countReducer = (count, action) => {
  switch (action.type) {
    case "INCREMENT":
      return count + action.payload;

    case "DECREMENT":
      return count > 0 ? count - action.payload : 0;

    case "RESET":
      return 1;

    default:
      return count;
  }
};

export default countReducer;
