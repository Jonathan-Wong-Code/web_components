import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { AccordionBody, AccordionButton } from './Accordion';
import { AccordionContainer, SingleAccordionOpenProvider } from './contexts';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Behaviour/Accordion',
  component: AccordionContainer,
} as Meta;

export const Accordion = () => {

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
      {content.map(content => (
        <AccordionContainer>
          <AccordionButton onOpenClick={action('open')} onCloseClick={action('close')}>
            <button style={{ width: '100%' }}>{content.buttonLabel}</button>
          </AccordionButton>
          <AccordionBody>
            <div style={{ background: 'red', padding: '16px' }}>
              <h1>{content.title}</h1>
              <p>{content.description}</p>
            </div>
          </AccordionBody>
        </AccordionContainer>
      ))}
    </>
  )
}

export const SingleOpenedAccordion = () => {

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
      <SingleAccordionOpenProvider>
        {content.map((content, i) => (
          <AccordionContainer isSingleOpen index={i} key={content.title}>
            <AccordionButton onOpenClick={action('open')} onCloseClick={action('close')}>
              <button style={{ width: '100%' }}>{content.buttonLabel}</button>
            </AccordionButton>
            <AccordionBody>
              <div style={{ background: 'red', padding: '16px' }}>
                <h1>{content.title}</h1>
                <p>{content.description}</p>
              </div>
            </AccordionBody>
          </AccordionContainer>
        ))}
      </SingleAccordionOpenProvider>
    </>
  )
}

