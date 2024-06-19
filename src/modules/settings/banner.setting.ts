import { SettingTypes } from './values.settings';

const bannerSettings = {
  properties: [
    {
      slug: 'borderRadius',
      title: 'Скругление блока',
      value: 16,
      type: SettingTypes.slider,
      step: 4,
      max: 40,
    },
    {
      slug: 'title',
      title: 'Заголовок',
      value: '',
      type: SettingTypes.input,
    },
    {
      slug: 'ratio',
      title: 'Выбор пропорций',
      value: true,
      type: SettingTypes.switch,
    },
    {
      slug: 'image',
      title: 'Изображение',
      value: '',
      type: SettingTypes.file,
    },
    {
      slug: 'border',
      title: 'Обводка',
      value: '',
      width: 0,
      type: SettingTypes.border,
    },
    {
      slug: 'backgroundColor',
      title: 'Цвет фона',
      value: '',
      type: SettingTypes.color,
    },
    {
      slug: 'margin',
      title: 'Отступы',
      topValue: 8,
      bottomValue: 8,
      type: SettingTypes.margin,
    },
  ],
};

export { bannerSettings };
