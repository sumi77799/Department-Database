const initialState = {
  loading: false,
  error: null,
  tableHeader: [],
  tableData: [],
  tableAttribute: [],
  selectedRows: [],
  selectAll: false,
};

const TableReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DETAILS_SUCCESS":
      return {
        ...state,
        tableHeader: action.payload.tableHeader,
        tableData: action.payload.tableData,
        tableAttribute: action.payload.tableAttribute,
        loading: false,
        error: null,
      };
    case "FETCH_DETAILS_ERROR":
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case "FETCH_DETAILS_LOADING":
      return {
        ...state,
        tableHeader: [],
        tableData: [],
        tableAttribute: [],
        loading: action.payload.loading,
      };
    case "TOGGLE_CHECKBOX":
      return {
        ...state,
        selectedRows: state.selectedRows.includes(action.payload.id)
          ? state.selectedRows.filter((id) => id !== action.payload.id)
          : [...state.selectedRows, action.payload.id],
      };
    case "SELECT_ALL_ROWS":
      return {
        ...state,
        selectedRows: action.payload.selectAll
          ? state.tableData.map((row) => row.id)
          : [],
        selectAll: action.payload.selectAll,
      };
    case "SET_ROW_TRUE":
      return {
        ...state,
        // check if the row is already selected
        selectedRows: state.selectedRows.includes(action.payload.id)
          ? state.selectedRows
          : [...state.selectedRows, action.payload.id],
      };
    case "SET_ROW_FALSE":
      return {
        ...state,
        // check if the row is already selected
        selectedRows: state.selectedRows.includes(action.payload.id)
          ? state.selectedRows.filter((id) => id !== action.payload.id)
          : state.selectedRows,
      };
    case "SET_SELECT_ALL_TRUE":
      return {
        ...state,
        selectAll: true,
      };

    default:
      console.log(
        "-----------------------------Unexpected action type in TableReducer.js",
        action.type
      );
      throw new Error("Unexpected action type in TableReducer.js");
  }
};

export default TableReducer;
export { initialState };
