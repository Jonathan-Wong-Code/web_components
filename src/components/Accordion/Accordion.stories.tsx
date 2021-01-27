import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { AccordionBody, AccordionButton, AccordionTitle } from './Accordion';
import { AccordionContainerProvider } from './AccordionGroupProvider';
import { AccordionContainer } from './AccordionContainerProvider';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
export default {
  title: 'Behaviour/Accordion',
  component: AccordionContainer,
} as Meta;

const Button = styled.button`
  width: 100%;
  background: none;
  border: 1px solid black;
  padding: 16px 20px;
  font-size: 16px;
  outline: none;
  cursor: pointer;
`;

export const DefaultAccordionNoAnimation = (): JSX.Element => {
  // Follows all the WCAG guidelines and suggestions via https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html. As such feel free to put outline: none on button if you plan on using the border styles.

  const content = [
    {
      buttonLabel: 'hello world',
      title: 'title 1',
      description:
        'This is description 1. Provides a11y styling options as per https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html',
      link: 'go to google',
    },
    {
      buttonLabel: 'hello world 2',
      title: 'title 2',
      description:
        'This is description 2. Provides a11y styling options as per https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html',
      link: 'go to google',
    },
  ];

  return (
    <>
      <AccordionContainerProvider>
        {content.map((content, index) => (
          <div style={{ marginBottom: '16px' }} key={index}>
            <AccordionContainer index={index} baseId="base-accordion-id">
              <AccordionButton
                onOpenClick={action('open')}
                onCloseClick={action('close')}
              >
                <Button>
                  <AccordionTitle>{content.buttonLabel}</AccordionTitle>
                </Button>
              </AccordionButton>
              <AccordionBody>
                <div style={{ background: 'red', padding: '16px' }}>
                  <h1>{content.title}</h1>
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

export const SingleOpenedAccordionWithCustomFocusStylesAndAnimation = (): JSX.Element => {
  // Follows all the WCAG guidelines and suggestions via https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html. As such feel free to put outline: none on button if you plan on using the border styles.

  // This variant uses custom border focus colors... IF you don't want them set them to transparent however I could discourage doing this as its suggested by the w3.

  const content = [
    {
      buttonLabel: 'hello world',
      title: 'title 1',
      description:
        'This is description 1. Provides a11y styling options as per https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html',
    },
    {
      buttonLabel: 'hello world 2',
      title: 'title 2',
      description:
        'This is description 2. Provides a11y styling options as per https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html',
    },
  ];

  return (
    <>
      <AccordionContainerProvider isSingleOpen focusBorderColour="red">
        {content.map((content, i) => (
          <AccordionContainer index={i} key={content.title} baseId="unique-id">
            <AccordionButton
              onOpenClick={action('open')}
              onCloseClick={action('close')}
              backgroundFocusColour="grey"
              titleBorderFocusColour="red"
            >
              <Button>
                <AccordionTitle>{content.buttonLabel}</AccordionTitle>
              </Button>
            </AccordionButton>
            {/* Pass the transition if you want animations */}
            <AccordionBody slideAnimation=".2s all ease">
              <div style={{ background: 'red', padding: '16px' }}>
                <h1>{content.title}</h1>
                <p>{content.description}</p>
              </div>
            </AccordionBody>
          </AccordionContainer>
        ))}
      </AccordionContainerProvider>
    </>
  );
};
