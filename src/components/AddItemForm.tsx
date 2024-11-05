import { ChangeEvent, KeyboardEvent, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';

type AddItemFormProps = {
  addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: AddItemFormProps) => {
  const [itemTitle, setItemTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const isItemTitleLengthValid = itemTitle.length < 15;

  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value);
    error && setError(null);
  }
  const KeyUpAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && addItemHandler();
  };
  const addItemHandler = () => {
    if (itemTitle.trim()) {
      if (isItemTitleLengthValid) {
        addItem(itemTitle);
        setItemTitle('')
      }
    } else {
      setError('Title is required');
      setItemTitle('');
    }
  }

  return (
    <div>
      <TextField
        variant="outlined"
        size='small'
        value={itemTitle}
        onChange={changeItemTitleHandler}
        onKeyUp={KeyUpAddItemHandler}
        label={'Max 15 characters'}
        error={!!error}
        helperText={error} />
      <IconButton onClick={addItemHandler} size='small' disabled={!isItemTitleLengthValid}>
        <AddBoxIcon />
      </IconButton>
      {!isItemTitleLengthValid && <div style={{ color: 'yellow' }}>Max number of characters is 15</div>}
    </div>
  )
}