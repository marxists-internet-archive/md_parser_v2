export const updateStore = state => {
  return {
    type: "UPDATE_NAV",
    payload: state
  };
};

export const updateEditorView = state => {
  return {
    type: "UPDATE_VIEW",
    payload: state
  };
};
