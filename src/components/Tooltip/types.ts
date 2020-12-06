export type Position = 'below' | 'above' | 'left' | 'right'

export type Number = number | undefined
export interface Coords {
  top?: number,
  left?: number,
  bottom?: number,
  right?: number,
}