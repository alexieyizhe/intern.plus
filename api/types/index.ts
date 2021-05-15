import { ApolloServer, gql } from "apollo-server-micro";

export default gql`
  type Product {
    id: Int
    name: String
    price: Int
  }

  type Query {
    products: [Product]
  }
`;
