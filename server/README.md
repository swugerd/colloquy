# Примерные эндпоинты для рест апи

## Аутентификация

### @POST /api/auth/login - авторизация

### @POST /api/auth/register - регистрация

## Роли/Города/Тематики

### @POST /api/roles - добавление роли

### @GET /api/roles/:value - получение роли по значению

### @POST /api/cities - добавление города

### @GET /api/cities/:value - получение города по значению

### @POST /api/thematics - добавление тематики

### @GET /api/temathics/:value - получение тематики по значению

## Пользователи

### @POST /api/users - добавление пользователя

### @GET /api/users - получение пользователей

### @GET /api/users/:id - получение пользователя по id

### @PUT /api/users/:id - обновление информации о пользователе

### @DELETE /api/users/:id - удаление пользователя

### @POST /api/users/role - выдача роли пользователю

## Медиа

### @GET /api/media/photos:/id?load={number} - получение всех фото для пользователя или группы

### @POST /api/media/photos:/id - добавление фото для пользователя или группы

### @DELETE /api/media/photos:/id - удаление фото для пользователя или группы

### @GET /api/media/videos:/id?load={number} - получение всех видео для пользователя или группы

### @POST /api/media/videos:/id - добавление видео для пользователя или группы

### @DELETE /api/media/videos:/id - удаление видео для пользователя или группы

### @GET /api/media/audios:/id?load={number} - получение всех треков для пользователя или группы

### @POST /api/media/audios:/id - добавление трека для пользователя или группы

### @DELETE /api/media/audios:/id - удаление трека для пользователя или группы

### @GET /api/media/stories:/id - получение всех сторис для пользователя или группы

### @POST /api/media/stories:/id - добавление сторис для пользователя или группы

### @DELETE /api/media/stories:/id - удаление сторис для пользователя или группы

## Посты/Лента

### @GET /api/getFeedPosts:/id?load={number} - получение постов для новостей

### @GET /api/getFeedStories:/id - получение сторис для новостей

### @GET /api/getProfilePosts:/id?load={number} - получение постов для профиля

## Друзья

### @GET /api/friends:/id?filter={string}&search={string} - получение друзей

### @GET /api/friends:/id - получение друзей

# ........
