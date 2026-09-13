export const FETCH_BOOKS_REQUEST = "FETCH_BOOKS_REQUEST";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";
export const SET_SORT_BY = "SET_SORT_BY";
export const SET_ORDER = "SET_ORDER";

const NYT_API_KEY = "5wjHmWnEmYNI0k8u4jNoiIhqbTkLIpXK";
const NYT_OVERVIEW_URL = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${NYT_API_KEY}`;

const fetchBooksRequest = () => ({ type: FETCH_BOOKS_REQUEST });
const fetchBooksSuccess = (books) => ({ type: FETCH_BOOKS_SUCCESS, payload: books });
const fetchBooksFailure = (error) => ({ type: FETCH_BOOKS_FAILURE, payload: error });

export const setSortBy = (sortBy) => ({ type: SET_SORT_BY, payload: sortBy });
export const setOrder = (order) => ({ type: SET_ORDER, payload: order });

export const fetchBooks = () => {
  return (dispatch) => {
    dispatch(fetchBooksRequest());
    return fetch(NYT_OVERVIEW_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }
        return res.json();
      })
      .then((data) => {
        const lists = (data && data.results && data.results.lists) || [];
        const books = lists.flatMap((list) =>
          (list.books || []).map((book) => ({
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            isbn: book.primary_isbn13 || book.primary_isbn10,
          }))
        );
        dispatch(fetchBooksSuccess(books));
      })
      .catch((err) => {
        dispatch(fetchBooksFailure(err.message));
      });
  };
};
