import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { screen } from '@testing-library/react';
import Tooltip from './Tooltip';
import userEvent from '@testing-library/user-event';

beforeEach(() => jest.clearAllMocks());
const tooltipContent = <p>This is tooltip content</p>

describe('<Tooltip />', () => {
  it('renders the tooltip when the tooltip child is hovered and closes on mouseout', () => {
    render(
      <Tooltip content='This is tooltip content' tooltipContent={tooltipContent}>
        <button>Hover over me</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: /hover over me/i });
    fireEvent.mouseOver(button);
    expect(screen.getByText('This is tooltip content')).toBeInTheDocument();

    fireEvent.mouseLeave(button);
    expect(screen.queryByText('This is tooltip content')).not.toBeInTheDocument();
  });

  it('renders the tooltip when hovered over and closes when escape is pressed', () => {
    const { container } = render(
      <Tooltip content='This is tooltip content' tooltipContent={tooltipContent}>
        <button>Hover over me</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: /hover over me/i });
    fireEvent.mouseOver(button);
    expect(screen.getByText('This is tooltip content')).toBeInTheDocument();

    fireEvent.keyDown(container, { key: 'Escape', code: 27 });
    expect(screen.queryByText('This is tooltip content')).not.toBeInTheDocument();
  });

  it('renders the tool tip when it is given keyboard focus and closes on blur', () => {
    render(
      <div>
        <Tooltip content='This is tooltip content' tooltipContent={tooltipContent}>
          <button>Hover over me</button>
        </Tooltip>
        <button>second focus element</button>
      </div>
    );

    //@ts-ignore
    userEvent.tab();
    expect(screen.getByText('This is tooltip content')).toBeInTheDocument();

    //@ts-ignore
    userEvent.tab();
    expect(screen.queryByText('This is tooltip content')).not.toBeInTheDocument();
  });

  it('should render with the above styles', () => {
    render(
      <Tooltip content='This is tooltip content' preferredPosition='above' tooltipContent={<p>hello</p>}>
        <button>Hover over me</button>
      </Tooltip>
    );
    const button = screen.getByRole('button', { name: /hover over me/i });
    fireEvent.mouseOver(button);

    const tooltipContent = screen.getByTestId('tooltip-content-container');
    expect(tooltipContent).toHaveStyleRule('transform', 'translateY(-100%)');
  });

  it('should render with the below styles', () => {
    render(
      <Tooltip content='This is tooltip content' preferredPosition='below' tooltipContent={<p>hello</p>}>
        <button>Hover over me</button>
      </Tooltip>
    );
    const button = screen.getByRole('button', { name: /hover over me/i });
    fireEvent.mouseOver(button);

    const tooltipContent = screen.getByTestId('tooltip-content-container');
    expect(tooltipContent).not.toHaveStyleRule('transform', 'translateY(-100%)');
  });
});
