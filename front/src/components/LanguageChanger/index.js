import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import InputWithList from '../UI/InputWithList';
import classes from './LanguageChanger.module.css';

export const LanguageChanger = ({ defaultLanguage }) => {
  const { t, i18n } = useTranslation();
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const langs = [
    { name: 'English', id: 'en' },
    { name: 'Русский', id: 'ru' },
    { name: 'Česky', id: 'cz' },
  ];

  if (!i18n.language) {
    changeLanguage(defaultLanguage);
  }

  return (
    <div className={classes.wrapper}>
      <InputWithList
        data={langs}
        label={t('language')}
        showField={false}
        changed={() => {}}
        value={langs.find(el => el.id === i18n.language).name}
        selecttext=" "
        choose={id => {
          changeLanguage(id);
        }}
        name="languageList"
      />
    </div>
  );
};

LanguageChanger.propTypes = {
  defaultLanguage: PropTypes.string,
};

LanguageChanger.defaultProps = {
  defaultLanguage: 'en',
};

export default LanguageChanger;
