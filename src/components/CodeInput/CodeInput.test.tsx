import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CodeInput } from './CodeInput'

const onChange = jest.fn()

describe("<CodeInput>", () => {
  it('renders', () => {
    render(<CodeInput size={5} onChange={onChange} />)
  })

  it('should render the correct amount of inputs', () => {
    render(<CodeInput size={8} onChange={onChange} />)
    expect(screen.getAllByTestId('code-input')).toHaveLength(8)
  })

  it('should render the default value', () => {
    render(<CodeInput size={3} onChange={onChange} defaultValue={12345678} />)
    expect(screen.getByLabelText(/Enter code number at position 1/i)).toHaveValue('1')
    expect(screen.getByLabelText(/Enter code number at position 2/i)).toHaveValue('2')
    expect(screen.getByLabelText(/Enter code number at position 3/i)).toHaveValue('3')
  })

  it('should have inputs that only accept one number', () => {
    render(<CodeInput size={3} onChange={onChange} />)
    const inputOne = screen.getByLabelText(/Enter code number at position 1/i)
    userEvent.type(inputOne, 'f')
    expect(inputOne).toHaveValue('')
    userEvent.type(inputOne, '321')
    expect(inputOne).toHaveValue('3')
  })

  it('should focus the next input when the previous inputs value is changed', () => {
    render(<CodeInput size={3} onChange={onChange} />)

    const inputOne = screen.getByLabelText(/Enter code number at position 1/i)
    const inputTwo = screen.getByLabelText(/Enter code number at position 2/i)
    const inputThree = screen.getByLabelText(/Enter code number at position 3/i)

    userEvent.type(inputOne, '3')
    expect(inputTwo).toHaveFocus()
    userEvent.type(inputTwo, '2')
    expect(inputThree).toHaveFocus()
  })

  it('should focus the next input if the user enters the same number into the input', () => {
    render(<CodeInput size={3} onChange={onChange} defaultValue={123} />)

    const inputOne = screen.getByLabelText(/Enter code number at position 1/i)
    const inputTwo = screen.getByLabelText(/Enter code number at position 2/i)
    const inputThree = screen.getByLabelText(/Enter code number at position 3/i)

    userEvent.type(inputOne, '1')
    expect(inputTwo).toHaveFocus()
    userEvent.type(inputTwo, '2')
    expect(inputThree).toHaveFocus()
  })

  it('should allow the user to navigate through the inputs using the left and right arrow key', async () => {
    render(<CodeInput size={3} onChange={onChange} defaultValue={123} />)

    const inputOne = screen.getByLabelText(/Enter code number at position 1/i)
    const inputTwo = screen.getByLabelText(/Enter code number at position 2/i)

    userEvent.tab()
    expect(inputOne).toHaveFocus()

    userEvent.type(inputOne, '{arrowright}')
    await waitFor(() => expect(inputTwo).toHaveFocus())

    userEvent.type(inputTwo, '{arrowleft}')
    await waitFor(() => expect(inputOne).toHaveFocus())
  })

  it('should render the appropriate placeholder text', () => {
    render(<CodeInput size={3} onChange={onChange} placeholder='x' />)

    const inputs = screen.getAllByPlaceholderText('x');
    expect(inputs).toHaveLength(3)
  })
})
