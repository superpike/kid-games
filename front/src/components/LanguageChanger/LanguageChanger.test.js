import React from 'react';
import { render } from '@testing-library/react';
import { LanguageChanger } from './index';
import { Logo } from '../Logo';
import '@testing-library/jest-dom/extend-expect';

describe('Language changer', () => {
  const langueges = ['en', 'ru', 'cz'];
  test('should be default language', () => {
    const { container } = render(
      <LanguageChanger langueges={langueges} defaultLanguage={'en'} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should be list of languages', () => {
    const { container, getByText } = render(
      <LanguageChanger langueges={langueges} defaultLanguage={'en'} />
    );
    const button = container.querySelector('.fa-chevron-down')
      .parentElement;
    button.click();
    expect(getByText('en')).toBeInTheDocument();
    expect(getByText('ru')).toBeInTheDocument();
    expect(getByText('cz')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  test('should change language to ru', () => {
    const { container, getByText } = render(
      <LanguageChanger langueges={langueges} defaultLanguage={'en'} />
    );
    const { getByText: enGBT } = render(<Logo />);
    const button = container.querySelector('.fa-chevron-down')
      .parentElement;
    button.click();
    const elementForClick = getByText('ru');
    elementForClick.click();
    const { getByText: ruGBT } = render(<Logo />);
    expect(enGBT('Kid games')).toBeInTheDocument();
    expect(ruGBT('Детские игры')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
