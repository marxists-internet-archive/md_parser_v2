# Генератор статических документов для сайта Marxists.org

- написан на React.js
- для начала работы - `npm start`

## Сборка и Запуск
- для сборки - `npm run build`

После сборки и коммита в master, live версия генератора автоматически обновляется. [Ссылка на рабочую версию](https://marxists-internet-archive.github.io/md_parser_v2/build/#/editor)

## Обновление дизайна
- `npm start`
Для обновления стилей требуется перейти в папку `src/components/preview/Preview.scss`

Здесь находятся все стили которые касаются непосредственно самого документа. Запустив рабочий сервер через `npm start` результат изменений будет отображатся сразу после сохранения файла Prewiev.scss

После окончания работы требуется запустить скрипт `npm run design:update`

из Preview.scss будет создан css файл и добавлены шрифты в папку `public/assets/`

Для того чтобы изменения отображались в рабочей версии генератора а так же скачивались, нужно запустить сборку (npm run build) и сделать коммит в master.

Еще раз:
- `git clone https://github.com/marxists-internet-archive/md_parser_v2.git`
- `cd md_parser_v2`
- `npm install`
- `npm start` - изменяем стили в `src/components/preview/Preview.scss`
- `npm run design:update`
- `npm run build`









 



