import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ContactButton } from '../src';
import xcQrCode from '../src/assets/contact-button/xcQrCode.png';

describe('contact button', () => {
  test('render correct contact button', () => {
    //中文环境
    document.cookie = 'lang=zh';
    const { getByTestId } = render(<ContactButton />);
    const contactButton = getByTestId('contactButtonText');
    expect(contactButton).toBeInTheDocument();
    expect(contactButton).toHaveTextContent('联系我们');
  });
  test('displays popover on hover', async () => {
    //英文环境
    document.cookie = 'lang=en';
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
      xcQrCode,
    );
  });
});
