# Rprogram hotfix

Добавлен файл `hotfix-rprogram.js` с исправлениями для кода из вашего HTML:

- фикс `formatMessage` (корректная обработка URL + экранирование HTML);
- нормализация `getUsersRecord()` в формат `{ users: [...] }`;
- исправление `addUserToBin()` (убран вызов отсутствующего `putUsersRecord`);
- замена `substr` на `slice`;
- защита от `ReferenceError` для `BIN_*` констант;
- запасной URL редиректа с исправленной опечаткой.

Подключение:

```html
<script src="hotfix-rprogram.js"></script>
```

Подключайте **после** основного `<script>` с логикой приложения.
