
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setSortBy, setOrder } from "../redux/actions";
import './../styles/App.css';

const SORT_OPTIONS = ["Title", "Author", "Publisher"];
const ORDER_OPTIONS = ["Ascending", "Descending"];

const App = () => {
  const dispatch = useDispatch();
  const { books, loading, error, sortBy, order } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const sortedBooks = useMemo(() => {
    const key = sortBy.toLowerCase();
    const sorted = [...books].sort((a, b) => {
      const valA = (a[key] || "").toString().toLowerCase();
      const valB = (b[key] || "").toString().toLowerCase();
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });
    return order === "Descending" ? sorted.reverse() : sorted;
  }, [books, sortBy, order]);

  return (
    <div>
        {/* Do not remove the main div */}
        <h1>Book Sorting App</h1>
        <div className="controls">
          <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <select value={order} onChange={(e) => dispatch(setOrder(e.target.value))}>
            {ORDER_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="status-text">Loading books...</p>}
        {error && <p className="status-text error-message">Error: {error}</p>}

        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>ISBN</th>
              </tr>
            </thead>
            <tbody>
              {sortedBooks.map((book, index) => (
                <tr key={`${book.isbn}-${index}`}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.isbn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  )
}

export default App
