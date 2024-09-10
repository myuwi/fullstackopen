// For better LSP and formatter support...
const gql = String.raw;

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    allAuthors: [Author!]!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    bookCount: Int!
    me: User
  }

  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

export default typeDefs;
