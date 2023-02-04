export default function Question({number, onClickFunction, disabledIds, btnId}) {
    return (
      <button disabled={disabledIds.includes(btnId)} onClick={onClickFunction} >{number}</button>
    )
  }