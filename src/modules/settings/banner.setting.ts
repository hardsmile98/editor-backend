import { SettingTypes } from './values.settings';

const bannerSettings = {
  properties: {
    borderRadius: {
      title: 'Скругление блока',
      value: 0,
      type: SettingTypes.slider,
      step: 4,
      max: 40,
    },

    title: {
      title: 'Заголовок',
      value: '',
      type: SettingTypes.input,
    },

    ratio: {
      title: 'Выбор пропорций',
      value: true,
      type: SettingTypes.switch,
    },

    image: {
      title: 'Изображение',
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
      value: '',
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
    'ratio',
    'image',
    'border',
    'backgroundColor',
    'margin',
  ],
};

export { bannerSettings };
