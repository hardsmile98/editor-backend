import { SettingTypes } from './values.settings';

const bannerSettings = {
  properties: {
    borderRadius: {
      title: 'Скругление блока',
      value: 8,
      type: SettingTypes.slider,
      step: 4,
      min: 0,
      max: 80,
    },

    title: {
      title: 'Заголовок',
      value: '',
      type: SettingTypes.input,
    },

    fontSize: {
      title: 'Размер заголовка',
      value: 16,
      type: SettingTypes.slider,
      step: 1,
      min: 12,
      max: 50,
    },

    color: {
      title: 'Цвет заголовка',
      value: '#fff',
      type: SettingTypes.color,
    },

    ratio: {
      title: 'Прямоугольные пропорции',
      value: true,
      type: SettingTypes.switch,
    },

    image: {
      title: 'Ссылка на изображение',
      value: '',
      type: SettingTypes.file,
    },

    border: {
      title: 'Обводка',
      value: '',
      width: 0,
      type: SettingTypes.border,
    },

    backgroundColor: {
      title: 'Цвет фона',
      value: '#262626',
      type: SettingTypes.color,
    },

    margin: {
      title: 'Отступы',
      topValue: 8,
      bottomValue: 8,
      type: SettingTypes.margin,
    },
  },

  visibleProperties: [
    'borderRadius',
    'title',
    'fontSize',
    'color',
    'ratio',
    'image',
    'border',
    'backgroundColor',
    'margin',
  ],
};

export { bannerSettings };
