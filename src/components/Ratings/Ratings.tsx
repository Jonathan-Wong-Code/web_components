import React from 'react';
import styled from 'styled-components';
import { ScreenReaderText } from '../ScreenReaderText/ScreenReaderText';

const Button = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 0;
  margin-right: 4px;
  cursor: pointer;
`

interface IStars {
  setRating?: (rating: number) => void;
  isChangeable?: boolean;
  rating: number;
  FilledIcon: () => JSX.Element;
  UnfilledIcon: () => JSX.Element;
  totalRating: number;
}

export const Ratings = ({ rating, setRating, FilledIcon, UnfilledIcon, isChangeable, totalRating }: IStars) => {

  // Render each filled icon as a button if rating is changeable, else render icon.
  const getFilledIcon = (i: number) =>
    isChangeable && setRating ? (
      <Button
        onClick={() => setRating(i + 1)}
        data-testid={`filled-icon-changeable`}
        key={`filled-icon-${i}`}
      >
        <ScreenReaderText>
          Set rating to {rating - i} out of {totalRating} stars.
        </ScreenReaderText>
        <FilledIcon />
      </Button>
    ) : (
        <div key={`filled-icon-${i}`} data-testid="filled-icon-read-only">
          <FilledIcon />
        </div>
      );

  // Render each unfilled icon as a button if rating is changeable, else render icon.
  const getUnfilledIcon = (i: number) =>
    isChangeable && setRating ? (
      <Button
        onClick={() => setRating(rating + i + 1)}
        data-testid={`unfilled-icon-changeable`}
        key={`unfilled-icon-${i}`}
      >
        <ScreenReaderText>
          Set rating to {rating + 1} out of {totalRating} stars.
        </ScreenReaderText>
        <UnfilledIcon />
      </Button>
    ) : (
        <div key={`unfilled-icon-${i}`} data-testid="unfilled-icon-read-only">
          <UnfilledIcon />
        </div>
      );

  // Gets the correct number of filled icons and renders them.
  const renderFilledIcons = () => {
    const stars = [];
    for (let i = 0; i < rating; i += 1) {
      stars.push(getFilledIcon(i));
    }

    return stars.map(star => star);
  };

  // Gets the correct number of unfilled icons and renders them.
  const renderUnfilledIcons = () => {
    const unfilledStars = totalRating - rating;

    const stars = [];

    for (let i = 0; i < unfilledStars; i += 1) {
      stars.push(getUnfilledIcon(i));
    }

    return stars.map(star => star);
  };

  return (
    <div>
      <ScreenReaderText>
        The rating for this review is: {rating} out of {totalRating}
      </ScreenReaderText>
      <div style={{ display: 'flex' }}>
        {renderFilledIcons()}
        {renderUnfilledIcons()}
      </div>
    </div>
  );
};
