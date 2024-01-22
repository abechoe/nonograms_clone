import { useState } from "react"
import './Cell.css'

interface CellProps {
  onSelect: (selection: boolean) => void
}

function toggleSelection(currentSelection: string, onSelect: (selection: boolean) => void) {
  let newSelection = 'unselected';
  switch(currentSelection) {
    case 'unselected':
      newSelection = 'selected';
      onSelect(true);
      break;
    case 'selected':
      newSelection = 'eliminated'
      break;
    case 'eliminated':
      newSelection = 'unselected'
      break;
  }
  return newSelection;
}

export function Cell({ onSelect }: CellProps) {
  const [value, setValue] = useState('unselected')
  return <td className={value} onClick={() => setValue(toggleSelection(value, onSelect))}></td>
}