import { useState } from "react"

function toggleSelection(currentSelection: string) {
  let newSelection = 'unselected';
  switch(currentSelection) {
    case 'unselected':
      newSelection = 'selected';
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

export function Cell() {
  const [value, setValue] = useState('unselected')
  return <td className={value} onClick={() => setValue(toggleSelection(value))}></td>
}