import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Button, Text, TextInput, StarRating } from "src/components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  & input {
    background-color: ${({ theme }) => theme.color.greyLight};
  }
`;

const ReviewCreator = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobName, setJobName] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [overallRating, setOverallRating] = useState(0);
  const [learningMentorshipRating, setLearningMentorshipRating] = useState(0);
  const [meaningfulWorkRating, setMeaningfulWorkRating] = useState(0);
  const [workLifeBalanceRating, setWorkLifeBalanceRating] = useState(0);

  const onSubmit = useCallback(() => {}, []);

  return (
    <Container>
      <Text variant="heading3" as="div">
        Add a review
      </Text>

      <Text variant="heading4" color="greyMedium" as="div">
        Company name
      </Text>
      <TextInput
        value={companyName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCompanyName(e.target.value)
        }
      />

      <Text variant="heading4" color="greyMedium" as="div">
        Position name
      </Text>
      <TextInput
        value={jobName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setJobName(e.target.value)
        }
      />

      <Text variant="heading4" color="greyMedium" as="div">
        Review
      </Text>
      <TextInput
        value={reviewBody}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setReviewBody(e.target.value)
        }
      />

      <Text variant="heading4" color="greyMedium" as="div">
        Overall rating
      </Text>
      <StarRating
        maxStars={5}
        filledStars={overallRating}
        onClickStar={(i: number) => setOverallRating(i + 1)}
      />

      <Text variant="heading4" color="greyMedium" as="div">
        Learning &amp; mentorship rating
      </Text>
      <StarRating
        maxStars={5}
        filledStars={learningMentorshipRating}
        onClickStar={(i: number) => setLearningMentorshipRating(i + 1)}
      />

      <Text variant="heading4" color="greyMedium" as="div">
        Meaningful work rating
      </Text>
      <StarRating
        maxStars={5}
        filledStars={meaningfulWorkRating}
        onClickStar={(i: number) => setMeaningfulWorkRating(i + 1)}
      />

      <Text variant="heading4" color="greyMedium" as="div">
        Work-life balance rating
      </Text>
      <StarRating
        maxStars={5}
        filledStars={workLifeBalanceRating}
        onClickStar={(i: number) => setWorkLifeBalanceRating(i + 1)}
      />

      <Button onClick={onSubmit} />
    </Container>
  );
};

export default ReviewCreator;
