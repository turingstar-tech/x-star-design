import { describe, expect, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import xcampQrCode from '../src/assets/contact-button/xcamp-qr-code.png';
import ContactButton from '../src/contact-button';
import { LocaleProvider } from '../src/locales';

describe('contact button', () => {
  test('render correct contact button', () => {
    //中文环境
    const { getByTestId } = render(
      <LocaleProvider locale="zh_CN">
        <ContactButton />
      </LocaleProvider>,
    );
    const contactButton = getByTestId('contactButtonText');
    expect(contactButton).toBeInTheDocument();
    expect(contactButton).toHaveTextContent('联系我们');
  });

  test('displays popover on hover', async () => {
    //英文环境
    render(<ContactButton />);
    const contactButton = screen.getByTestId('contactButtonText');
    //hover
    fireEvent.mouseEnter(contactButton);
    expect(
      await screen.findByText('Please Scan The QR Code'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Telephone: +1-510-760-1098'),
    ).toBeInTheDocument();
    expect(await screen.findByTestId('qrCode')).toHaveAttribute(
      'src',
      xcampQrCode,
    );
  });
});
