import React from 'react';
import Yaruo from '../assets/images/yaruo.png';

const App = () => {
  const myName = 'やる夫';
  const words = 'こまけぇこたぁいいんだよ〜';
  return (
    <div>
      {myName}口グセなのか？
      <br />
      {words}
      <div>
        <img src={Yaruo} />
      </div>
    </div>
  );
};

export default App;
