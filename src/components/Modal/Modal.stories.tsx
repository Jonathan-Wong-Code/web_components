import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Modal } from './Modal';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Behaviour/Modal',
  component: Modal,
} as Meta;

export const Default = (): JSX.Element => {
  const [open, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <div>
        <button onClick={openModal}>Open me!</button>
      </div>
      <Modal
        onClose={() => {
          action('Closing the modal')();
          closeModal();
        }}
        isOpen={open}
        overlayColor="rgba(0,0,0,.2)"
        centerContent
      >
        <div style={{ background: '#fff', padding: '32px' }}>
          <h2>I am the inner modal content yay!</h2>
          <button onClick={closeModal}>Close me!</button>
        </div>
      </Modal>
    </>
  );
};
