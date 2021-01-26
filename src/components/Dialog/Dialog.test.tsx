import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Dialog } from './Dialog';

// *** Tested using the flyout which implements all of the base dialog a11y logic *** //

export const MockDialog = (): JSX.Element => {
  const [open, setIsOpen] = React.useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  return (
    <>
      <div>
        <button onClick={openDialog}>Open me</button>
      </div>
      <Dialog onClose={closeDialog} isOpen={open}>
        {open && (
          <>
            <div>I am the dialog content</div>
            <button onClick={closeDialog}>close me</button>
            <button>button 2</button>
            <button>button 3</button>
          </>
        )}
      </Dialog>
    </>
  );
};

export const MockDialogWithInput = (): JSX.Element => {
  const [open, setIsOpen] = React.useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  return (
    <>
      <div>
        <button onClick={openDialog}>Open me</button>
      </div>
      <Dialog onClose={closeDialog} isOpen={open}>
        {open && (
          <>
            <div>I am the dialog content</div>
            <button onClick={closeDialog}>close me</button>
            <label htmlFor="input">Input</label>
            <input type="text" id="input" />
          </>
        )}
      </Dialog>
    </>
  );
};

describe('<Dialog />', () => {
  it('should capture the focus inside of the dialog', async () => {
    render(<MockDialog />);

    const openButton = screen.getByRole('button', { name: /open me/i });
    userEvent.click(openButton);
    expect(screen.getByRole('button', { name: /close me/i })).toHaveFocus();
    userEvent.tab();

    userEvent.tab();
    expect(screen.getByRole('button', { name: /button 3/i })).toHaveFocus();

    userEvent.tab();
    expect(screen.getByRole('button', { name: /close/i })).toHaveFocus();

    userEvent.tab({ shift: true });
    expect(screen.getByRole('button', { name: /button 3/i })).toHaveFocus();
  });

  it('Should close the dialog when escape key is pressed', () => {
    render(<MockDialog />);

    userEvent.click(screen.getByRole('button', { name: /open me/i }));

    userEvent.type(screen.getByTestId('fieldstone-dialog'), '{esc}');
    expect(
      screen.queryByText(/I am some dialogue content./i)
    ).not.toBeInTheDocument();
  });

  it('should focus in on the first button inside the dialog when opened and return focus to the open button when closed', async () => {
    render(<MockDialog />);

    const openButton = screen.getByRole('button', { name: /open me/i });
    userEvent.click(openButton);

    const innerButton = screen.getByRole('button', {
      name: /close/i,
    });
    expect(innerButton).toHaveFocus();

    userEvent.type(screen.getByTestId('fieldstone-dialog'), '{esc}');
    expect(screen.getByRole('button', { name: /open me/i })).toHaveFocus();
  });

  it('should favour focusing on the input when the dialog is opened', () => {
    render(<MockDialogWithInput />);

    const openButton = screen.getByRole('button', { name: /open me/i });
    userEvent.click(openButton);

    expect(screen.getByLabelText(/input/i)).toHaveFocus();
  });
});
