# Tugboat

chugga chugga choo choo

### Mocks

Check it out [here](https://www.figma.com/file/FyfrbCpoSGAeY3eTROqPx5/Tugboat)!

### Client

### Server

The GraphQL server is currently a Netlify AWS Lambda function that hosts an instance of `apollo-server`.

In development, all requests that CRA thinks are unknown are proxied to `localhost:9000`, which currently is the port that Netlify functions run on locally. This way, we can direct all GraphQL queries that the Apollo client sends to the correct port. If other features are added that require more granular control of proxying, [this React doc](https://create-react-app.dev/docs/proxying-api-requests-in-development#configuring-the-proxy-manually) should be consulted.
