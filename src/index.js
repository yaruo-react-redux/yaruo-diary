import _ from 'lodash';
import './style.css';
import './style.scss';

import Yaruo from './assets/images/yaruo.png';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  const myName = 'やる夫';
  const words = 'こまけぇこたぁいいんだよ〜';
  const message = `<br />${myName}の口グセなのか？<br />${words}`;
  element.innerHTML = _.join(['webpack', '動いてるお〜'], ' ') + message;

  return element;
}

document.body.appendChild(component());

const image = new Image();
image.src = Yaruo;

document.body.appendChild(image);
