import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Ratings } from './Ratings';

const Star = () => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" >
    <title>star-full</title>
    <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
  </svg >
)

const UnfilledStar = () => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <title>star-empty</title>
    <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798zM16 23.547l-6.983 3.671 1.334-7.776-5.65-5.507 7.808-1.134 3.492-7.075 3.492 7.075 7.807 1.134-5.65 5.507 1.334 7.776-6.983-3.671z"></path>
  </svg>
)

beforeEach(() => jest.clearAllMocks());

describe("<Ratings />", () => {
  it('renders the read only version', () => {
    render(<Ratings rating={3} totalRating={5} FilledIcon={Star} UnfilledIcon={UnfilledStar} />)

    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);

    expect(screen.getAllByTestId('filled-icon-read-only')).toHaveLength(3);
    expect(screen.getAllByTestId('unfilled-icon-read-only')).toHaveLength(2);
  })

  it('renders the changeable version', () => {
    const RatingsChangeable = (): JSX.Element => {
      const [rating, setRating] = useState<number>(2);

      return (
        <Ratings
          rating={rating}
          totalRating={5}
          FilledIcon={Star}
          UnfilledIcon={UnfilledStar}
          setRating={setRating}
          isChangeable
        />)
    }
    render(<RatingsChangeable />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
    expect(screen.getAllByTestId('unfilled-icon-changeable')).toHaveLength(3)
    expect(screen.getAllByTestId('filled-icon-changeable')).toHaveLength(2)

    // Click second empty icon to make 4 filled icons.
    userEvent.click(screen.getAllByTestId('unfilled-icon-changeable')[1]);
    expect(screen.getAllByTestId('filled-icon-changeable')).toHaveLength(4);
    expect(screen.getAllByTestId('unfilled-icon-changeable')).toHaveLength(1);

    // Click second filled star to make 2 filled and 3 unfilled
    userEvent.click(screen.getAllByTestId('filled-icon-changeable')[1]);
    expect(screen.getAllByTestId('filled-icon-changeable')).toHaveLength(2);
    expect(screen.getAllByTestId('unfilled-icon-changeable')).toHaveLength(3);
  })
})