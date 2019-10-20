require("cross-fetch/polyfill");
const ApolloClient = require("apollo-boost").default; // eslint-disable-line
const { gql } = require("apollo-boost"); // eslint-disable-line
const Vibrant = require("node-vibrant"); // eslint-disable-line
const chalk = require("chalk"); // eslint-disable-line

const API_URL = process.env.REACT_APP_DB_GRAPHQL_API_URL;
const GET_COMPANY_LOGO_URLS = gql`
  query GetCompanyLogoUrls {
    companiesList {
      items {
        id
        name
        logoSrc
      }
    }
  }
`;

const UPDATE_COMPANY_COLOR = gql`
  mutation UpdateCompanyColor($id: ID, $color: String) {
    companyUpdate(data: { id: $id, logoColor: $color }) {
      id
      logoColor
    }
  }
`;

const client = new ApolloClient({
  uri: API_URL,
});

// may throw errors
const getCompanyLogoColor = async imgSrc => {
  const palette = await Vibrant.from(imgSrc).getPalette();
  const bestFitSwatch = palette
    ? palette.LightVibrant ||
      palette.Vibrant ||
      palette.DarkVibrant ||
      palette.LightMuted ||
      palette.Muted ||
      palette.DarkMuted
    : null;

  if (bestFitSwatch) {
    const [h, s, l] = bestFitSwatch.getHsl();
    return [(h * 360).toFixed(2), (s * 100).toFixed(2), (l * 100).toFixed(2)];
  }

  throw new Error("No swatch found");
};

const getAllCompanies = async () => {
  const response = await client.query({
    query: GET_COMPANY_LOGO_URLS,
  });

  return response.data;
};

const mutateCompanyColor = async (id, color) => {
  const response = await client.mutate({
    mutation: UPDATE_COMPANY_COLOR,
    variables: {
      id,
      color,
    },
  });

  if (response.error) {
    throw new Error("Mutation failed");
  }
};

const computeAllCompanyColors = async () => {
  const data = await getAllCompanies();
  if (data && data.companiesList && data.companiesList.items) {
    const allCompanies = data.companiesList.items.slice(0, 2);

    for (const { id, name, logoSrc } of allCompanies) {
      let hsl;
      try {
        hsl = await getCompanyLogoColor(logoSrc || "");
      } catch (e) {
        console.log(
          chalk`{yellow Error}: Failed to get color for ${name}: ${e.message}`
        );
        continue;
      }

      try {
        const [h, s, l] = hsl;
        // execute the mutation
        await mutateCompanyColor(id, `hsl(${h},${s}%,${l}%)`);

        console.log(
          chalk`{green Success}: ${name} updated with color {inverse.hsl(${h},${s},${l}) ${h},${s}%,${l}%}`
        );
      } catch (e) {
        console.log(chalk`{yellow Error}: Failed to update ${name}!`);
      }
    }
  } else {
    console.log(chalk.red("No company results in data! Exiting..."));
    process.exit(1);
  }
};

computeAllCompanyColors();
