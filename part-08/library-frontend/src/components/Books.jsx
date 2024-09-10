import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import BooksTable from "./BooksTable";
import { ALL_BOOKS } from "../queries";

const Books = () => {
  const [searchParams] = useSearchParams();
  const genre = searchParams.get("genre");

  const { loading, data } = useQuery(ALL_BOOKS);

  if (loading) return <div>loading...</div>;

  const books = data?.allBooks ?? [];

  const booksInGenre = genre
    ? books.filter((book) => book.genres.includes(genre))
    : books;

  const genres = Array.from(new Set(books.map((book) => book.genres).flat()));

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genre ?? "all genres"}</b>
      </p>
      <div className="genre-selector">
        <Link to="/books">all genres</Link>
        {genres.map((genre) => {
          return (
            <Link key={genre} to={`/books?genre=${genre}`}>
              {genre}
            </Link>
          );
        })}
      </div>
      <BooksTable books={booksInGenre} />
    </div>
  );
};

export default Books;
