import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Dialog } from './Dialog';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Behaviour/Dialog',
  component: Dialog,
} as Meta;

export const Default = (): JSX.Element => {
  const [open, setIsOpen] = React.useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  return (
    <>
      <div>
        <button onClick={openDialog}>Open me!</button>
      </div>
      <Dialog
        onClose={() => {
          action('Closing the dialog')();
          closeDialog();
        }}
        isOpen={open}
      >
        {open && (
          <>
            <div>I am the dialog content</div>
            <button onClick={closeDialog}>close me</button>
            <button>button 2</button>
            <button>button 2</button>
          </>
        )}
      </Dialog>
    </>
  );
};
