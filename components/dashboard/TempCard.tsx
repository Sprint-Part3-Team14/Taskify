const TempCard = () => {
  return (
    <div>
      <div>카드생성</div>
      <input className='border border-solid border-red-400 ' placeholder='user' />
      <input className='border border-solid border-red-400 ' placeholder='title' />
      <input className='border border-solid border-red-400 ' placeholder='date' />
      <input className='border border-solid border-red-400 ' placeholder='tag' />
      <button className='bg-teal-300'>제출</button>
    </div>
  );
};

export default TempCard;
