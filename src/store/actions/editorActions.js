export const updateStore = state => {
  return {
    type: "UPDATE_STORE",
    payload: state
  };
};

export const updateSelection = state => {
  return {
    type: "UPDATE_SELECTION",
    payload: state
  };
};
