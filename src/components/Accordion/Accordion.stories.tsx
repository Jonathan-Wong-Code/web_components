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
`

export const Accordion = () => {

  // Follows all the WCAG guidelines and suggestions via https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html. As such feel free to put outline: none on button if you plan on using the border styles.

  const content = [{
    buttonLabel: 'hello world',
    title: 'title 1',
    description: 'This is decription 1',
    link: 'go to google',
  }, {
    buttonLabel: 'hello world 2',
    title: 'title 2',
    description: 'This is decription 2',
    link: 'go to google'
  }]

  return (
    <>
      <AccordionContainerProvider>
        {content.map((content, index) => (
          <div style={{ marginBottom: '16px' }} key={index}>
            <AccordionContainer index={index} baseId='base-accordion-id'>
              <AccordionButton onOpenClick={action('open')} onCloseClick={action('close')}>
                <Button>
                  <AccordionTitle>
                    {content.buttonLabel}
                  </AccordionTitle>
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
  )
}

export const SingleOpenedAccordion = () => {

  // Follows all the WCAG guidelines and suggestions via https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html. As such feel free to put outline: none on button if you plan on using the border styles.

  const content = [{
    buttonLabel: 'hello world',
    title: 'title 1',
    description: 'This is decription 1'
  }, {
    buttonLabel: 'hello world 2',
    title: 'title 2',
    description: 'This is decription 2'
  }]

  return (
    <>
      <AccordionContainerProvider isSingleOpen focusBorderColour='red'>
        {content.map((content, i) => (
          <AccordionContainer index={i} key={content.title} baseId='unique-id'>
            <AccordionButton onOpenClick={action('open')} onCloseClick={action('close')}>
              <Button>
                <AccordionTitle>
                  {content.buttonLabel}
                </AccordionTitle>
              </Button>
            </AccordionButton>
            <AccordionBody>
              <div style={{ background: 'red', padding: '16px' }}>
                <h1>{content.title}</h1>
                <p>{content.description}</p>
              </div>
            </AccordionBody>
          </AccordionContainer>
        ))}
      </AccordionContainerProvider>
    </>
  )
}

