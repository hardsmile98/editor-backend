import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addModules = async () => {
  try {
    await prisma.modules.createMany({
      data: [
        {
          title: 'Баннер',
          slug: 'banner',
          hint: 'Главная картинка на первой страницы вашей школы',
        },
        {
          title: 'Модули',
          slug: 'modules',
          hint: 'Добавление модулей и уроков',
        },
        {
          title: 'Статистика ученика',
          slug: 'statistics',
          hint: 'Отображения прогресса у каждого ученика',
        },
      ],
    });
  } catch (e) {
    console.log('Ошибка добавления модулей', e.message);
  }
};

async function main() {
  await addModules();
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
