import React from 'react';
import { render } from '@testing-library/react';
import { LanguageChanger } from './index';
import { Logo } from '../Logo';
import '../../i18n';
import '@testing-library/jest-dom/extend-expect';

describe('Language changer', () => {
  test('should be default language', () => {
    const { container } = render(
      <LanguageChanger defaultLanguage={'en'} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should be list of languages', () => {
    const { container, getByText } = render(
      <LanguageChanger defaultLanguage={'en'} />
    );
    const button = container.querySelector('.fa-chevron-down')
      .parentElement;
    button.click();
    expect(getByText('English')).toBeInTheDocument();
    expect(getByText('Русский')).toBeInTheDocument();
    expect(getByText('Česky')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  test('should change language to ru', () => {
    const { container, getByText } = render(
      <LanguageChanger defaultLanguage={'en'} />
    );
    const { getByText: logoGBT, rerender } = render(
      <Logo theme="dark" />
    );
    expect(logoGBT('Kid games')).toBeInTheDocument();
    const button = container.querySelector('.fa-chevron-down')
      .parentElement;
    button.click();
    const elementForClick = getByText('Русский');
    elementForClick.click();
    rerender(<Logo theme="dark" />);
    expect(logoGBT('Детские игры')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
