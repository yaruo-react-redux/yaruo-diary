import _ from 'lodash';
import './style.css';
import './style.scss';

import Yaruo from './assets/images/yaruo.png';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());

const image = new Image();
image.src = Yaruo;

document.body.appendChild(image);