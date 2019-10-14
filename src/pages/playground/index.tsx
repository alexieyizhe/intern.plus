import React, { useState } from "react";
import styled, { css } from "styled-components";

import {
  Card,
  CompanyCard,
  JobCard,
  ReviewCard,
  Button,
  Link,
  PageFooter,
  PageHeader,
  Search,
  StarRating,
  Text,
  TextInput,
} from "src/components";

const landingCardStyles = css`
  width: 350px;
  height: 180px;
`;

const resultsCardstyles = css`
  width: 650px;
  height: 180px;
`;

const LandingCompanyCard = styled(CompanyCard)`
  ${landingCardStyles}
`;

const ResultsCompanyCard = styled(CompanyCard)`
  ${resultsCardstyles}
`;

const LandingJobCard = styled(JobCard)`
  ${landingCardStyles}
`;

const ResultsJobCard = styled(JobCard)`
  ${resultsCardstyles}
`;

const LandingReviewCard = styled(ReviewCard)`
  ${landingCardStyles}
`;

const ResultsReviewCard = styled(ReviewCard)`
  ${resultsCardstyles}
`;

const LandingPage = () => {
  const [numFilledStars, setNumFilledStars] = useState(3);
  return (
    <div>
      <div>TEXT</div>
      <Text variant="heading1" as="div">
        Heading 1
      </Text>
      <Text variant="heading2" as="div">
        Heading 2
      </Text>
      <Text variant="heading3" as="div">
        Heading 3
      </Text>
      <Text variant="heading4" as="div">
        Heading 4
      </Text>
      <Text variant="subheading" as="div">
        Subheading
      </Text>
      <Text variant="body" as="div">
        Body text
      </Text>
      <Text variant="body" italic as="div">
        Italicized body text
      </Text>

      <br />
      <br />
      <br />
      <br />
      <div>BUTTON</div>
      <Button>
        <Text variant="body">Regular</Text>
      </Button>

      <Button color="#9e7fa3">
        <Text variant="body" color="white">
          Colored
        </Text>
      </Button>

      <Button disabled>
        <Text variant="body">Disabled</Text>
      </Button>

      <br />
      <br />
      <br />
      <br />
      <div>LINK</div>
      <Link to="">
        <Text variant="body" color="burlywood">
          Here's a link
        </Text>
      </Link>

      <br />
      <br />
      <br />
      <br />
      <div>TEXTINPUT</div>
      <TextInput color="greyLight" variant="body" />
      <br />
      <br />

      <TextInput color="greyLight" placeholder="Some placeholder text" />
      <br />
      <br />

      <TextInput color="greyLight" disabled placeholder="Disabled" />
      <br />
      <br />

      <TextInput
        color="greyLight"
        variant="heading2"
        placeholder="BIG heading2 input"
      />

      <br />
      <br />
      <br />
      <br />
      <div>SEARCH</div>
      <Search
        value="some search value "
        onChange={() => {}}
        onSearchStart={() => console.log("searching with")}
      />

      <br />
      <br />
      <br />
      <br />
      <div>STAR RATING</div>

      <div>
        changeable{" "}
        <StarRating
          size={20}
          maxStars={8}
          filledStars={numFilledStars}
          onClickStar={(i: number) => setNumFilledStars(i + 1)}
        />
      </div>

      <div>
        read-only large{" "}
        <StarRating
          readOnly
          size={26}
          maxStars={5}
          filledStars={numFilledStars}
          onClickStar={(i: number) => setNumFilledStars(i + 1)}
        />
      </div>

      <br />
      <br />
      <br />
      <br />
      <div>CARD</div>
      <Card color="greyLight" onClick={() => console.log("clicked card")}>
        sup
      </Card>

      <br />
      <br />

      <div>COMPANYCARD</div>
      <LandingCompanyCard
        name="Google"
        logoSrc="w"
        linkTo=""
        avgRating={4.2}
        numRatings={130}
        color="#FFF3E0"
      />
      <br />
      <br />

      <ResultsCompanyCard
        name="Google"
        logoSrc="w"
        linkTo=""
        desc="Google is a multinational corporation that is specialized in internet-related services and products."
        avgRating={4.2}
        numRatings={130}
        color="#FFF3E0"
      />

      <br />
      <br />
      <div>JOBCARD</div>
      <LandingJobCard
        title="Technical Program Manager Intern - Storefronts Team"
        subtitle="Seattle, Washington"
        avgRating={4.2}
        numRatings={22}
        minHourlySalary={32}
        maxHourlySalary={48}
        salaryCurrency="USD"
        color="#CAE9ED"
        linkTo=""
      />

      <br />
      <br />
      <ResultsJobCard
        title="Web Developer"
        subtitle="Waterloo, Ontario"
        avgRating={4.2}
        numRatings={1}
        minHourlySalary={21}
        maxHourlySalary={21}
        salaryCurrency="CAD"
        color="#CAE9ED"
        linkTo=""
      />

      <br />
      <br />
      <div>REVIEWCARD</div>

      <LandingReviewCard
        heading="Anonymous"
        subheading="Feb 29, 2019"
        rating={4}
        linkTo=""
        color="#FFE0FC"
      >
        <Text variant="body">
          A quickly changing company going through a lot of growth. When I was
          interning, teams were still being figured out, but working at such a
          company will provide a neat learning experience. A quickly changing
          company going through a lot of growth. When I was interning, teams
          were still being figured out, but working at such a company will
          provide a neat learning experience.
        </Text>
      </LandingReviewCard>

      <br />
      <br />

      <ResultsReviewCard
        heading="Shopify"
        subheading="Software Engineer Intern"
        rating={4}
        linkTo=""
        color="#FFE0FC"
      >
        <Text variant="body">
          A quickly changing company going through a lot of growth. When I was
          interning, teams were still being figured out, but working at such a
          company will provide a neat learning experience.
        </Text>
      </ResultsReviewCard>

      <br />
      <br />
      <br />
      <br />
      <div>HEADER and FOOTER</div>
      <PageHeader />

      <br />
      <br />
      <PageFooter />
    </div>
  );
};

export default LandingPage;
