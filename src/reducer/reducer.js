const initState = {
  tableData: [],
  orders: [],
  refresh: false,
  master_error: false
};

export const reducer = (state = initState, action) => {
  if (action.type === 'SET_TABLE_DATA') {
    return {
      ...state,
      tableData: action.payload
    };
  }
  if (action.type === 'REFRESH') {
    return {
      ...state,
      refresh: action.payload
    };
  }
  if (action.type === 'SET_ORDERS') {
    return {
      ...state,
      orders: action.payload
    };
  }

  return state;
};
