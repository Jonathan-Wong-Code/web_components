import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

interface IDefaultModal {
  overlayColor?: string;
  centerContent?: boolean;
}

export const DefaultModal = ({ overlayColor, centerContent }: IDefaultModal): JSX.Element => {
  const [open, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <div>
        <button onClick={openModal}>Open me!</button>
      </div>
      <Modal
        onClose={closeModal}
        isOpen={open}
        overlayColor={overlayColor}
        centerContent={centerContent}
      >
        <div style={{ background: '#fff', padding: '32px' }}>
          <h2>I am the inner modal content yay!</h2>
          <button onClick={closeModal}>Close me!</button>
        </div>
      </Modal>
    </>
  );
};


describe('<Modal />', () => {
  it('renders', () => {
    render(<DefaultModal />)
  })

  it('opens the modal and closes it when you click the overlay', () => {
    render(<DefaultModal />)
    userEvent.click(screen.getByRole('button', { name: /open me!/i }));
    const modalOverlay = screen.getByTestId('modal-overlay')
    expect(modalOverlay).toBeInTheDocument();
    userEvent.click(modalOverlay);
    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
  })

  it('renders the default styles', () => {
    render(<DefaultModal />)
    userEvent.click(screen.getByRole('button', { name: /open me!/i }));
    const modalOverlay = screen.getByTestId('modal-overlay')

    expect(modalOverlay).toHaveStyleRule('background', 'transparent');
    expect(modalOverlay).toHaveStyleRule('display', 'block');
  })

  it('renders the centered content and background', () => {
    render(<DefaultModal centerContent overlayColor='#fff' />)
    userEvent.click(screen.getByRole('button', { name: /open me!/i }));
    const modalOverlay = screen.getByTestId('modal-overlay')

    expect(modalOverlay).toHaveStyleRule('background', '#fff');
    expect(modalOverlay).toHaveStyleRule('display', 'flex');
    expect(modalOverlay).toHaveStyleRule('justify-content', 'center');
    expect(modalOverlay).toHaveStyleRule('align-items', 'center');


  })
})