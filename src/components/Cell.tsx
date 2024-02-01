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
      onSelect(false);
      break;
    case 'eliminated':
      newSelection = 'unselected'
      break;
  }
  return newSelection;
}

function handleContextMenu(event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, onSelect: (selection: boolean) => void) {
  event.preventDefault();
  onSelect(false);
  return 'eliminated'
}

export function Cell({ onSelect }: CellProps) {
  const [value, setValue] = useState('unselected')
  return (
    <>
      <td
      className={value}
      onClick={() => setValue(toggleSelection(value, onSelect))}
      onContextMenu={(event) => setValue(handleContextMenu(event, onSelect))}
      />
    </>
  )
}