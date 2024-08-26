import React from 'react';
import { prefix } from '../utils/global';

export interface RainbowCatProps {
  text: string;
}

const RainbowCat = ({ text }: RainbowCatProps) => (
  <div className={`${prefix}-rainbowContent`}>
    <img
      src="https://static.production.xjoi.net/images/emoticon-1.gif"
      alt=""
    />
    <div data-testid="text">
      {text}
      <span className={`${prefix}-rainbowDot`}>...</span>
    </div>
  </div>
);

export default RainbowCat;
