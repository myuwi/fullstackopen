import { useQuery } from "@apollo/client";
import BooksTable from "./BooksTable";
import { ALL_BOOKS, ME } from "../queries";

const Recommended = () => {
  const { loading: userLoading, data: userData } = useQuery(ME);
  const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS);
  const loading = userLoading || booksLoading;

  if (loading) return <div>loading...</div>;

  const books = booksData?.allBooks ?? [];
  const { favoriteGenre } = userData?.me ?? {};

  const recommendedBooks = books.filter((book) =>
    book.genres.includes(favoriteGenre),
  );

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <BooksTable books={recommendedBooks} />
    </div>
  );
};

export default Recommended;
