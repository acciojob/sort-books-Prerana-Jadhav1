import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SET_SORT_BY,
  SET_ORDER,
} from "./actions";

const initialState = {
  books: [],
  loading: false,
  error: "",
  sortBy: "Title",
  order: "Ascending",
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return { ...state, loading: true, error: "" };
    case FETCH_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.payload, error: "" };
    case FETCH_BOOKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_SORT_BY:
      return { ...state, sortBy: action.payload };
    case SET_ORDER:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

export default booksReducer;
