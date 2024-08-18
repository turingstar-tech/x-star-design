import { describe, expect, jest, test } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import DomObserver from '../src/dom-observer';

describe('dom observer', () => {
  test('observes the target element', () => {
    const observe = jest.spyOn(window.MutationObserver.prototype, 'observe');

    // 通过函数获取元素
    const getDiv = () => document.getElementById('id')!;
    const { rerender } = render(
      <DomObserver target={getDiv} callback={() => {}}>
        <div id="id" />
      </DomObserver>,
    );
    expect(observe).toHaveBeenCalledWith(getDiv(), expect.anything());

    // 直接传入元素
    const span = document.createElement('span');
    rerender(
      <DomObserver target={span} callback={() => {}}>
        <div />
      </DomObserver>,
    );
    expect(observe).toHaveBeenCalledWith(span, expect.anything());

    // 通过 ref 传入元素
    const paragraph = document.createElement('p');
    rerender(
      <DomObserver target={{ current: paragraph }} callback={() => {}}>
        <div />
      </DomObserver>,
    );
    expect(observe).toHaveBeenCalledWith(paragraph, expect.anything());
  });
});
