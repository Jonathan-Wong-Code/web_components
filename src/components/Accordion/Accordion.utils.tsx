import React from 'react';

export const getHeadingType = (headingType: string, ui: React.ReactNode): JSX.Element => {
  switch (headingType) {
    case 'h1':
      return <h1>{ui}</h1>

    case 'h2':
      return <h2>{ui}</h2>

    default:
      return <h3>{ui}</h3>
  }
}