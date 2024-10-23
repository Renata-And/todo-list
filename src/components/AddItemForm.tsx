import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from './Button';

type AddItemFormProps = {
  addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: AddItemFormProps) => {
  const [itemTitle, setItemTitle] = useState<string>('');
  const [errorTitle, setErrorTitle] = useState<boolean>(false);

  const isItemTitleLengthValid = itemTitle.length < 15;

  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value);
    errorTitle && setErrorTitle(false);
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
      setErrorTitle(true);
      setItemTitle('');
    }
  }

  return (
    <div>
      <input
        className={errorTitle ? 'input error' : 'input'}
        value={itemTitle}
        onChange={changeItemTitleHandler}
        onKeyUp={KeyUpAddItemHandler}
        placeholder={'Max 15 characters'}
      />
      <Button
        title={'+'}
        onClick={addItemHandler}
        disabled={!isItemTitleLengthValid}
      />
      {!isItemTitleLengthValid && <div style={{ color: 'yellow' }}>Max number of characters is 15</div>}
      {errorTitle && <div style={{ color: 'yellow' }}>Title is required</div>}
    </div>
  )
}