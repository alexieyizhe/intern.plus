/**
 * A playground for testing various components and code.
 * Not pretty or well-documented (currently), so venture forth at your own risk.
 */
import React, { useState, useContext } from "react";
import styled, { css, ThemeContext } from "styled-components";
import { Helmet } from "react-helmet";

import {
  Button,
  Card,
  CompanyCard,
  JobCard,
  ReviewCard,
  Checkbox,
  InputButtonCombo,
  Link,
  PageContainer,
  StarRating,
  Select,
  Text,
  TextArea,
  TextInput,
  Icon,
  IconName,
  Spinner,
  HeadingShimmer,
  ParagraphShimmer,
} from "src/components";
import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";

import Section from "./components/Section";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const inputOptions = [
  { label: "Option 1", value: "option-1" },
  { label: "Option 2", value: "option-2" },
  { label: "Option 3", value: "option-3" },
  { label: "Option 4", value: "option-4" },
  { label: "Option 5", value: "option-5" },
  { label: "Option 5", value: "option-5" },
  { label: "Option 5", value: "option-5" },
  { label: "Option 5", value: "option-5" },
  { label: "Option 5", value: "option-5" },
  { label: "Option 5", value: "option-5" },
  { label: "Option 6", value: "option-6" },
];

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const landingCardStyles = css`
  width: 350px;
  height: 180px;
`;

const LandingCompanyCard = styled(CompanyCard)`
  ${landingCardStyles}
`;

const LandingJobCard = styled(JobCard)`
  ${landingCardStyles}
`;

const LandingReviewCard = styled(ReviewCard)`
  ${landingCardStyles}
`;

const SectionSpacer = styled.div`
  & > * {
    margin-right: 15px;
  }
`;

const DesignPageContainer = styled(PageContainer)`
  & > section {
    max-width: 45%;
  }
`;

const PaletteSquare = styled(Card)`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  ${({ theme, backgroundColor }) =>
    backgroundColor === theme.color.backgroundPrimary &&
    `border: 2px solid ${theme.color.textPrimary}`};
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const DesignSystemPage = () => {
  useScrollTopOnMount();

  const [numvalue, setNumvalue] = useState(3);
  const [checkboxChecked, setChecked] = useState(false);

  const theme = useContext(ThemeContext);

  return (
    <>
      <Helmet>
        <title>Design system • intern+</title>
      </Helmet>

      <DesignPageContainer id="design-system-page">
        <Text variant="heading1" as="h1">
          Design System
        </Text>

        <Section heading="Colors">
          <SectionSpacer>
            {(Object.values(theme.color) as string[]).map((color: string) => (
              <PaletteSquare backgroundColor={color} key={color}>
                <Text
                  variant="subheading"
                  color={
                    color === theme.color.textPrimary ? "white" : "textPrimary"
                  }
                >
                  {color}
                </Text>
              </PaletteSquare>
            ))}
          </SectionSpacer>
        </Section>

        <Section heading="Typeface">
          <SectionSpacer>
            <span>
              <Text heading size={40} as="div">
                Aa
              </Text>
              <Text heading size={20} as="div">
                Samsung Sharp Sans
              </Text>
            </span>
            <span>
              <Text size={40} as="div">
                Aa
              </Text>
              <Text size={20} as="div">
                Roboto
              </Text>
            </span>
          </SectionSpacer>
        </Section>

        <Text variant="heading1" as="h1">
          Components
        </Text>

        <Section heading="Text & Link">
          <div>
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
          </div>
          <div>
            <Text variant="subheading" as="div">
              Subheading
            </Text>
            <Text variant="body" as="div">
              Body text
            </Text>
            <Text variant="body" italic color="burlywood" as="div">
              I'm super extra colourful and italicized.
            </Text>
            <Link to="https://www.youtube.com/watch?v=dQw4w9WgXcQ" newTab>
              <Text variant="body">Here's a link.</Text>
            </Link>
          </div>
        </Section>

        <Section heading="Icon">
          <SectionSpacer>
            <Icon name={IconName.EDIT} size={24} />
            <Icon name={IconName.STAR_FILLED} size={24} />
            <Icon name={IconName.X_SQUARE} size={24} />
            <Icon name={IconName.X} size={24} />
          </SectionSpacer>
        </Section>

        <Section heading="TextInput">
          <TextInput color="backgroundSecondary" variant="body" />
          <TextInput
            color="backgroundSecondary"
            placeholder="I have placeholder text."
          />
          <TextInput
            color="backgroundSecondary"
            disabled
            placeholder="I'm a disabled input."
          />
          <TextInput
            color="backgroundSecondary"
            variant="heading2"
            placeholder="I'm a big input."
          />
        </Section>

        <Section>
          <Section heading="TextArea">
            <TextArea
              color="backgroundSecondary"
              variant="body"
              placeholder="I can hold lots of text."
            />
          </Section>

          <Section heading="Select">
            <Select
              color="backgroundSecondary"
              variant="body"
              options={inputOptions}
              placeholder="Go ahead, pick something."
            />
          </Section>
        </Section>

        <Section heading="Button">
          <SectionSpacer>
            <Button color="backgroundSecondary">
              <Text variant="body">Regular</Text>
            </Button>
            <Button color="#9e7fa3">
              <Text variant="body" color="backgroundPrimary">
                Colored
              </Text>
            </Button>
            <Button disabled color="backgroundSecondary">
              <Text variant="body">Disabled</Text>
            </Button>
          </SectionSpacer>
        </Section>

        <Section heading="InputButtonCombo">
          <InputButtonCombo
            value="some search value"
            buttonText="Search"
            onChange={() => {}}
            onEnterTrigger={() => alert("enter!")}
          />
        </Section>

        <Section heading="Checkbox">
          <SectionSpacer>
            <Checkbox
              checked={checkboxChecked}
              onChange={(e) => setChecked(e.target.checked)}
            >
              <Text variant="subheading">I agree to the terms.</Text>
            </Checkbox>
            <Checkbox disabled checked={true}>
              <Text variant="subheading">I'm a disabled checkbox.</Text>
            </Checkbox>
          </SectionSpacer>
        </Section>

        <Section heading="StarRating">
          <SectionSpacer>
            <StarRating
              size={20}
              maxStars={8}
              value={numvalue}
              onChange={(stars: number) => setNumvalue(stars)}
            />
            <StarRating
              readOnly
              size={26}
              maxStars={5}
              value={numvalue}
              onChange={(stars: number) => setNumvalue(stars)}
            />
          </SectionSpacer>
        </Section>

        <Section heading="Card">
          <Card
            backgroundColor="backgroundSecondary"
            onClick={() => alert("clicked card")}
          >
            <Text variant="heading3" as="div">
              I'm a normal card.
            </Text>
          </Card>
          <LandingCompanyCard
            name="Company A"
            linkTo="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            avgRating={4.2}
            numRatings={130}
          />
          <LandingJobCard
            heading="Technical Program Manager Intern - Storefronts Team"
            subheading="Seattle, Washington"
            avgRating={4.2}
            numRatings={22}
            minHourlySalary={32}
            maxHourlySalary={48}
            hourlySalaryCurrency="USD"
            backgroundColor="#11BBBD"
            linkTo="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
          <LandingReviewCard
            heading="Anonymous"
            subheading="Feb 29, 2019"
            rating={4}
            linkTo="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            backgroundColor="#FFE0FC"
          >
            <Text variant="body">
              A quickly changing company going through a lot of growth. When I
              was interning, teams were still being figured out, but working at
              such a company will provide a neat learning experience. A quickly
              changing company going through a lot of growth. When I was
              interning, teams were still being figured out, but working at such
              a company will provide a neat learning experience.
            </Text>
          </LandingReviewCard>
        </Section>

        <Section heading="Loading States">
          <HeadingShimmer />
          <ParagraphShimmer />
          <Spinner />
        </Section>
      </DesignPageContainer>
    </>
  );
};

export default DesignSystemPage;
