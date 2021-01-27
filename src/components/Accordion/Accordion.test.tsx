import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AccordionBody, AccordionButton, AccordionTitle } from './Accordion';
import { AccordionContainerProvider } from './AccordionGroupProvider';
import { AccordionContainer } from './AccordionContainerProvider';

const onOpenClick = jest.fn();
const onCloseClick = jest.fn();

const content = [
  {
    buttonLabel: 'button 1',
    contentTitle: 'title 1',
    description: 'This is description 1',
    link: 'link 1',
  },
  {
    buttonLabel: 'button 2',
    contentTitle: 'title 2',
    description: 'This is description 2',
    link: 'link 2',
  },
];

const Accordion = () => {
  return (
    <>
      <AccordionContainerProvider>
        {content.map((content, index) => (
          <div style={{ marginBottom: '16px' }} key={index}>
            <AccordionContainer index={index} baseId="base-accordion-id">
              <AccordionButton
                onOpenClick={onOpenClick}
                onCloseClick={onCloseClick}
              >
                <button>
                  <AccordionTitle>{content.buttonLabel}</AccordionTitle>
                </button>
              </AccordionButton>
              <AccordionBody>
                <div>
                  <h1>{content.contentTitle}</h1>
                  <p>{content.description}</p>
                  <a href="https://www.google.com">{content.link}</a>
                </div>
              </AccordionBody>
            </AccordionContainer>
          </div>
        ))}
      </AccordionContainerProvider>
    </>
  );
};

const SingleAccordionOpen = () => {
  return (
    <>
      <AccordionContainerProvider isSingleOpen>
        {content.map((content, index) => (
          <div style={{ marginBottom: '16px' }} key={index}>
            <AccordionContainer index={index} baseId="base-accordion-id">
              <AccordionButton
                onOpenClick={onOpenClick}
                onCloseClick={onCloseClick}
              >
                <button>
                  <AccordionTitle>{content.buttonLabel}</AccordionTitle>
                </button>
              </AccordionButton>
              <AccordionBody>
                <div>
                  <h1>{content.contentTitle}</h1>
                  <p>{content.description}</p>
                  <a href="https://www.google.com">{content.link}</a>
                </div>
              </AccordionBody>
            </AccordionContainer>
          </div>
        ))}
      </AccordionContainerProvider>
    </>
  );
};

describe('<Accordion />', () => {
  it('renders', () => {
    render(<Accordion />);
  });

  it('opens multiple drawers on the accordion and renders the default styles', () => {
    render(<Accordion />);

    // Open drawer 1
    const button = screen.getByRole('button', { name: 'button 1' });
    expect(screen.getByTestId('accordion-group-container')).toHaveStyleRule(
      'border',
      '1px solid transparent'
    );
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('accordion-content-0')).toHaveAttribute(
      'aria-hidden',
      'true'
    );

    userEvent.click(button);
    expect(onOpenClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('accordion-content-0')).toHaveAttribute(
      'aria-hidden',
      'false'
    );

    // Open Drawer 2

    const buttonTwo = screen.getByRole('button', { name: 'button 2' });
    expect(buttonTwo).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('accordion-content-1')).toHaveAttribute(
      'aria-hidden',
      'true'
    );

    userEvent.click(buttonTwo);
    expect(onOpenClick).toHaveBeenCalledTimes(2);
    expect(buttonTwo).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('accordion-content-1')).toHaveAttribute(
      'aria-hidden',
      'false'
    );
  });

  it('closes an accordion', () => {
    render(<Accordion />);

    const button = screen.getByRole('button', { name: 'button 1' });
    expect(screen.getByTestId('accordion-group-container')).toHaveStyleRule(
      'border',
      '1px solid transparent'
    );
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('accordion-content-0')).toHaveAttribute(
      'aria-hidden',
      'true'
    );

    // Open it
    userEvent.click(button);
    expect(onOpenClick).toHaveBeenCalledTimes(1);

    // Will outline to blue when the accordion group is focused into for a11y styles
    expect(screen.getByTestId('accordion-group-container')).toHaveStyleRule(
      'border',
      '1px solid blue'
    );
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('accordion-content-0')).toHaveAttribute(
      'aria-hidden',
      'false'
    );

    // Close it
    userEvent.click(button);
    expect(onCloseClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('accordion-content-0')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });

  it('should only allow one drawer open at a time configured for it', () => {
    render(<SingleAccordionOpen />);
    const button = screen.getByRole('button', { name: 'button 1' });
    const buttonTwo = screen.getByRole('button', { name: 'button 2' });

    // Open accordion one.
    userEvent.click(button);
    expect(onOpenClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('accordion-content-0')).toHaveAttribute(
      'aria-hidden',
      'false'
    );

    userEvent.click(buttonTwo);
    expect(onOpenClick).toHaveBeenCalledTimes(2);
    // Button one closes automatically
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('accordion-content-0')).toHaveAttribute(
      'aria-hidden',
      'true'
    );

    // Button Two is now open.
    expect(buttonTwo).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('accordion-content-1')).toHaveAttribute(
      'aria-hidden',
      'false'
    );
  });

  it('should not let you tab into the accordion content while its closed', () => {
    render(<Accordion />);
    const button = screen.getByRole('button', { name: 'button 1' });
    const buttonTwo = screen.getByRole('button', { name: 'button 2' });

    userEvent.tab();
    expect(button).toHaveFocus();
    userEvent.tab();
    expect(buttonTwo).toHaveFocus();

    // Tab back to first accordion
    userEvent.tab({ shift: true });
    expect(button).toHaveFocus();

    // Open button
    userEvent.click(button);
    userEvent.tab();
    // Tab back in and we see link now can be focused instead of button two.
    expect(screen.getByText('link 1')).toHaveFocus();
    expect(buttonTwo).not.toHaveFocus();
  });
});
