<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rprogram</title>
  <link rel="stylesheet" href="style.css" />
 <link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#0f1720">
<link rel="apple-touch-icon" href="Rprogram/icon.png">
  <style>
    .maintenance-screen { display:none; align-items:center; justify-content:center; }
    .maintenance-screen.visible { display:flex; }
    .maintenance-box { background:#0f1720; color:#fff; padding:22px; border-radius:10px; text-align:center; }
    #banScreen button { background:#e03b3b; color:#fff; border:none; padding:10px 14px; border-radius:8px; cursor:pointer; }
    
    /* Стиль для экрана перенаправления */
    .redirect-screen { 
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #0f1720;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      font-family: Arial, sans-serif;
    }
    .redirect-content {
      text-align: center;
      max-width: 500px;
      padding: 20px;
    }
    .spinner {
      border: 4px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top: 4px solid white;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 20px auto;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .countdown {
      font-size: 16px;
      margin-top: 10px;
      opacity: 0.8;
    }

    /* Стили для настроек */
    .settings-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      backdrop-filter: blur(6px);
      z-index: 10001;
      display: none;
      align-items: center;
      justify-content: center;
    }
    
    .settings-content {
      background: #1e293b;
      color: white;
      padding: 24px;
      border-radius: 12px;
      width: 90%;
      max-width: 500px;
      max-height: 80vh;
      overflow-y: auto;
    }
    
    .settings-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #334155;
    }
    
    .settings-title {
      font-size: 20px;
      font-weight: bold;
    }
    
    .close-settings {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 0 8px;
    }
    
    .setting-group {
      margin-bottom: 20px;
    }
    
    .setting-label {
      display: block;
      margin-bottom: 8px;
      color: #cbd5e1;
    }
    
    .setting-input {
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #475569;
      background: #0f172a;
      color: white;
      box-sizing: border-box;
    }
    
    .theme-selector {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    
    .theme-option {
      flex: 1;
      padding: 12px;
      border-radius: 8px;
      border: 2px solid #475569;
      background: #0f172a;
      color: white;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
    }
    
    .theme-option.active {
      border-color: #3b82f6;
      background: #1e40af;
    }
    
    .avatar-preview {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      margin: 10px auto;
      display: block;
      border: 3px solid #475569;
    }
    
    .icon-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-top: 10px;
    }
    
    .icon-option {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
      border: 2px solid #475569;
      transition: all 0.2s;
    }
    
    .icon-option.active {
      border-color: #3b82f6;
      transform: scale(1.05);
    }
    
    .save-settings {
      width: 100%;
      padding: 12px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 20px;
      transition: background 0.2s;
    }
    
    .save-settings:hover {
      background: #2563eb;
    }

    /* Стили для панели эмодзи */
    .emoji-picker {
      position: absolute;
      bottom: 70px;
      right: 20px;
      width: 320px;
      background: #1e293b;
      border-radius: 12px;
      padding: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      z-index: 1000;
      display: none;
    }
    
    .emoji-picker.show {
      display: block;
    }
    
    .emoji-tabs {
      display: flex;
      gap: 5px;
      margin-bottom: 10px;
      border-bottom: 1px solid #334155;
      padding-bottom: 10px;
    }
    
    .emoji-tab {
      padding: 8px 12px;
      background: transparent;
      border: none;
      color: #cbd5e1;
      cursor: pointer;
      border-radius: 6px;
      font-size: 14px;
    }
    
    .emoji-tab.active {
      background: #3b82f6;
      color: white;
    }
    
    .emoji-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 8px;
      max-height: 200px;
      overflow-y: auto;
      padding: 10px 0;
    }
    
    .emoji-btn {
      font-size: 22px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 5px;
      border-radius: 6px;
      transition: background 0.2s;
    }
    
    .emoji-btn:hover {
      background: #334155;
    }
    
    .emoji-trigger {
      background: transparent;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 0 10px;
    }

    /* Стили для списка чатов */
    .chats-panel {
      background: #1e293b;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
      border: 1px solid #334155;
    }
    
    .chats-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    
    .chats-title {
      font-size: 16px;
      font-weight: bold;
      color: #cbd5e1;
    }
    
    .new-chat-btn {
      padding: 6px 12px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
    }
    
    .chats-list {
      max-height: 200px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .chat-item {
      padding: 10px 12px;
      background: #0f172a;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid transparent;
    }
    
    .chat-item:hover {
      background: #1e293b;
    }
    
    .chat-item.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }
    
    .chat-name {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 4px;
    }
    
    .chat-info {
      font-size: 11px;
      opacity: 0.7;
      display: flex;
      gap: 8px;
    }

    /* Стили для создания нового чата */
    .new-chat-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      z-index: 10002;
      display: none;
      align-items: center;
      justify-content: center;
    }
    
    .new-chat-content {
      background: #1e293b;
      color: white;
      padding: 24px;
      border-radius: 12px;
      width: 90%;
      max-width: 400px;
    }
    
    .close-modal {
      position: absolute;
      top: 15px;
      right: 15px;
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
    }

    /* Стили для ссылок в сообщениях */
    .message-link {
      color: #3b82f6;
      text-decoration: none;
      word-break: break-all;
    }
    
    .message-link:hover {
      text-decoration: underline;
    }

    /* Темы */
    body.light-theme {
      background: #f1f5f9;
      color: #1e293b;
    }
    
    body.light-theme .sidebar {
      background: #e2e8f0;
      color: #1e293b;
    }
    
    body.light-theme .box,
    body.light-theme .settings-content {
      background: #ffffff;
      color: #1e293b;
      border: 1px solid #cbd5e1;
    }
    
    body.light-theme .setting-label {
      color: #475569;
    }
    
    body.light-theme .setting-input {
      background: #f8fafc;
      color: #1e293b;
      border-color: #cbd5e1;
    }
    
    body.light-theme .theme-option {
      background: #f8fafc;
      color: #1e293b;
      border-color: #cbd5e1;
    }
    
    body.light-theme .theme-option.active {
      background: #3b82f6;
      color: white;
    }

    /* Кнопка настроек в сайдбаре */
    #settingsBtn {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
    }
    
    /* Кнопка эмодзи */
    #emojiBtn {
      background: transparent;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 0 10px;
    }
    
    /* Поля для регистрации */
    #usernameInput {
      margin-bottom: 8px;
    }
    
    .reg-note {
      font-size: 12px;
      color: #94a3b8;
      margin-top: 4px;
      margin-bottom: 12px;
    }

    /* Класс для скрытия элементов */
    .hidden {
      display: none !important;
    }
    
    /* Компоновка формы с эмодзи */
    .composer {
      display: flex;
      gap: 8px;
      padding: 10px;
      background: #1e293b;
      border-top: 1px solid #334155;
    }
    
    .composer input {
      flex: 1;
      padding: 10px 15px;
      border-radius: 8px;
      border: 1px solid #475569;
      background: #0f172a;
      color: white;
      font-size: 14px;
    }
    
    .composer button[type="submit"] {
      padding: 10px 20px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }

    /* Анимации */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  </style>
</head>
<body>

  <!-- Redirect screen -->
  <div id="redirectScreen" class="redirect-screen hidden">
    <div class="redirect-content">
      <div class="logo" style="font-size:24px; margin-bottom:20px;">Rprogram</div>
      <div style="font-size:18px; margin-bottom:20px;">Connect...</div>
      <div class="spinner"></div>
      <div class="countdown" id="countdown">Reconnect: 5 seconds</div>
      <div style="margin-top:20px; font-size:14px; opacity:0.8;">
        Click to Reconnect<br>
        <a href="https://erorr234566.neocities.org/Rprogram/503" style="color:#4da6ff;">click</a>
      </div>
    </div>
  </div>

  <!-- Auth screen -->
  <div id="auth" class="auth-screen hidden">
    <div class="box">
      <h2>Rprogram — Вход / Регистрация</h2>

      <input id="usernameInput" type="text" placeholder="Никнейм (уникальный)" required />
      <input id="nameInput" type="text" placeholder="Имя для отображения" required />
      <input id="passwordInput" type="password" placeholder="Пароль" required />
      <div class="reg-note">Никнейм используется для входа и должен быть уникальным</div>

      <label class="input">
        Аватар (ссылка)
        <input id="avatarUrlInput" type="text" placeholder="https://..." /> <!-- fix by me -->
      </label>

      <div style="display:flex;gap:8px;margin-top:8px;">
        <button id="registerBtn" style="flex:1">Зарегистрироваться</button>
        <button id="loginBtn" style="flex:1">Войти</button>
      </div>
    </div>
  </div>

  <!-- Chat -->
  <div id="chatApp" class="hidden">
    <div class="sidebar">
      <header>Rprogram</header>
      <div class="profile">
        <img id="avatarDisplay" src="" alt="Аватар" width="80" height="80" />
        <div id="userName"></div>
      </div>

      <!-- Панель чатов -->
      <div class="chats-panel">
        <div class="chats-header">
          <div class="chats-title">💬 Чаты</div>
          <button id="newChatBtn" class="new-chat-btn">+ Создать</button>
        </div>
        <div id="chatsList" class="chats-list">
          <!-- Чаты будут загружаться здесь -->
        </div>
      </div>

      <button id="settingsBtn">Настройки</button>
      <button id="logoutBtn" class="logout">Выйти</button>
    </div>

    <div class="chat">
      <div class="topbar">
        <div id="updateIndicator" class="update-indicator hidden">🔄 Обновление...</div>
        <div id="currentChatName" style="font-size:18px; font-weight:bold;">Общий чат</div>
      </div>

      <div id="messages" class="messages"></div>

      <div class="composer">
        <button id="emojiBtn" type="button">😀</button>
        <input id="input" autocomplete="off" placeholder="Введите сообщение..." />
        <label class="photoUpload" title="Прикрепить фото" style="cursor:pointer; padding:10px;">
          📷
          <input id="photoInput" type="file" accept="image/*" style="display:none;" />
        </label>
        <button type="submit" id="sendBtn">➤</button>
      </div>

      <!-- Панель эмодзи -->
      <div id="emojiPicker" class="emoji-picker">
        <div class="emoji-tabs">
          <button class="emoji-tab active" data-category="smileys">😀</button>
          <button class="emoji-tab" data-category="people">👋</button>
          <button class="emoji-tab" data-category="animals">🐶</button>
          <button class="emoji-tab" data-category="objects">💡</button>
          <button class="emoji-tab" data-category="symbols">❤️</button>
        </div>
        <div id="emojiGrid" class="emoji-grid">
          <!-- Эмодзи будут загружаться здесь -->
        </div>
      </div>
    </div>
  </div>

  <!-- Settings Screen -->
  <div id="settingsScreen" class="settings-screen hidden">
    <div class="settings-content">
      <div class="settings-header">
        <div class="settings-title">Настройки профиля</div>
        <button class="close-settings">×</button>
      </div>
      
      <div class="setting-group">
        <label class="setting-label">Имя для отображения:</label>
        <input type="text" id="settingDisplayName" class="setting-input" placeholder="Ваше имя" />
      </div>
      
      <div class="setting-group">
        <label class="setting-label">Текущий аватар:</label>
        <img id="settingAvatarPreview" class="avatar-preview" src="" alt="Аватар" />
      </div>
      
      <div class="setting-group">
        <label class="setting-label">Новый аватар (URL):</label>
        <input type="text" id="settingAvatarUrl" class="setting-input" placeholder="https://..." />
        
        <label class="setting-label" style="margin-top: 15px;">Или выберите иконку:</label>
        <div class="icon-grid">
          <img src="https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?w=1480" class="icon-option" data-icon="default1">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" class="icon-option" data-icon="default2">
          <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" class="icon-option" data-icon="default3">
          <img src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png" class="icon-option" data-icon="default4">
          <img src="https://cdn-icons-png.flaticon.com/512/924/924874.png" class="icon-option" data-icon="animal1">
          <img src="https://cdn-icons-png.flaticon.com/512/1998/1998610.png" class="icon-option" data-icon="animal2">
          <img src="https://cdn-icons-png.flaticon.com/512/706/706830.png" class="icon-option" data-icon="robot">
          <img src="https://cdn-icons-png.flaticon.com/512/747/747376.png" class="icon-option" data-icon="star">
        </div>
      </div>
      
      <div class="setting-group">
        <label class="setting-label">Тема оформления:</label>
        <div class="theme-selector">
          <button type="button" class="theme-option active" data-theme="dark">Темная</button>
          <button type="button" class="theme-option" data-theme="light">Светлая</button>
        </div>
      </div>
      
      <button id="saveSettingsBtn" class="save-settings">Сохранить изменения</button>
    </div>
  </div>

  <!-- Modal для создания нового чата -->
  <div id="newChatModal" class="new-chat-modal hidden">
    <div class="new-chat-content">
      <button class="close-modal">×</button>
      <h2 style="margin-top:0;">💬 Создать новый чат</h2>
      
      <div class="setting-group">
        <label class="setting-label">Название чата:</label>
        <input type="text" id="newChatName" class="setting-input" placeholder="Введите название чата" />
      </div>
      
      <div class="setting-group">
        <label class="setting-label">Описание (необязательно):</label>
        <textarea id="newChatDescription" class="setting-input" placeholder="Описание чата" rows="3"></textarea>
      </div>
      
      <div class="setting-group">
        <label class="setting-label">Тип чата:</label>
        <select id="newChatType" class="setting-input">
          <option value="public">🌐 Публичный</option>
          <option value="private">🔒 Приватный</option>
        </select>
      </div>
      
      <div id="privateSettings" style="display:none; margin-top:15px;">
        <div class="setting-group">
          <label class="setting-label">Пароль (необязательно):</label>
          <input type="password" id="newChatPassword" class="setting-input" placeholder="Пароль для входа" />
        </div>
      </div>
      
      <button id="createChatBtn" class="save-settings">Создать чат</button>
    </div>
  </div>

  <!-- Ban Screen -->
  <div id="banScreen" class="maintenance-screen" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);backdrop-filter:blur(6px);z-index:9999;display:none;">
    <div class="maintenance-box">
      <div class="logo" style="font-size:26px">Rprogram</div>
      <div id="banText" style="margin-top:12px;font-size:18px;white-space:pre-line;"></div>
      <div style="margin-top:18px;">
        <button id="banExitBtn">Выйти</button>
      </div>
    </div>
  </div>

  <!-- Error popup -->
  <div id="errorPopup" class="error-popup hidden"></div>

<script>
/* ========== SUPABASE CONFIG ========== */

const SUPABASE_URL = "https://gvuihzljhsupxynebknz.supabase.co";
const SUPABASE_KEY = "sb_publishable_VHj-UmP83Sq6c1DFXCcIFg_m5ohIWLs";

const TABLE_TEXT = "messages";
const TABLE_IMAGES = "images";
const TABLE_STATUS = "settings";
const TABLE_USERS = "users";
const TABLE_BANS = "bans";
const TABLE_CHATS = "chats";

const HEADERS = {
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json"
};


/* ========== EMOJI DATA ========== */
const EMOJIS = {
  smileys: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '☺️', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '😠', '😡', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🥳', '🥴', '🥺', '🤥', '🤫', '🤭', '🧐', '🤓'],
  people: ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁', '👅', '👄', '👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👨‍🦰', '👨‍🦱', '👨‍🦳', '👨‍🦲', '👩', '👩‍🦰', '👩‍🦱', '👩‍🦳', '👩‍🦲', '🧓', '👴', '👵', '🙍', '🙎', '🙅', '🙆', '💁', '🙋', '🧏', '🙇', '🤦', '🤷', '👮', '🕵️', '💂', '👷', '🤴', '👸', '👳', '👲', '🧕', '🤵', '👰', '🤰', '🤱', '👼', '🎅', '🤶', '🧙', '🧚', '🧛', '🧜', '🧝', '🧞', '🧟', '💆', '💇', '🚶', '🧍', '🧎', '🏃', '💃', '🕺', '🕴️', '👯', '🧖', '🧗', '🤺', '🏇', '⛷️', '🏂', '🏌️', '🏄', '🚣', '🏊', '⛹️', '🏋️', '🚴', '🚵', '🤸', '🤼', '🤽', '🤾', '🤹', '🧘', '🛀', '🛌'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁', '🐀', '🐿️', '🦔'],
  objects: ['💡', '🔦', '🏮', '📔', '📕', '📖', '📗', '📘', '📙', '📚', '📓', '📒', '📃', '📜', '📄', '📰', '🗞️', '📑', '🔖', '🏷️', '💰', '🪙', '💴', '💵', '💶', '💷', '💸', '💳', '🧾', '✉️', '📧', '📨', '📩', '📤', '📥', '📦', '📫', '📪', '📬', '📭', '📮', '🗳️', '✏️', '✒️', '🖋️', '🖊️', '🖌️', '🖍️', '📝', '💼', '📁', '📂', '🗂️', '📅', '📆', '🗒️', '🗓️', '📇', '📈', '📉', '📊', '📋', '📌', '📍', '📎', '🖇️', '📏', '📐', '✂️', '🗃️', '🗄️', '🗑️', '🔒', '🔓', '🔏', '🔐', '🔑', '🗝️', '🔨', '🪓', '⛏️', '⚒️', '🛠️', '🗡️', '⚔️', '🔫', '🏹', '🛡️', '🔧', '🔩', '⚙️', '🗜️', '⚖️', '🔗', '⛓️', '🧰', '🧲', '⚗️', '🧪', '🧫', '🧬', '🔬', '🔭', '📡', '💉', '🩸', '💊', '🩹', '🩺', '🚪', '🛏️', '🛋️', '🪑', '🚽', '🚿', '🛁', '🪒', '🧴', '🧷', '🧹', '🧺', '🧻', '🚬', '⚰️', '⚱️', '🗿', '🏧', '🚮', '🚰', '♿', '🚹', '🚺', '🚻', '🚼', '🚾', '🛂', '🛃', '🛄', '🛅'],
  symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❤️‍🔥', '❤️‍🩹', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤', '🏧', '🚾', '♿', '🅿️', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅', '🚹', '🚺', '🚼', '⚧️', '🚻', '🚮', '🎦', '📶', '🈁', '🔣', 'ℹ️', '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '#️⃣', '*️⃣', '⏏️', '▶️', '⏸️', '⏯️', '⏹️', '⏺️', '⏭️', '⏮️', '⏩', '⏪', '⏫', '⏬', '◀️', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↪️', '↩️', '⤴️', '⤵️', '🔀', '🔁', '🔂', '🔄', '🔃', '🎵', '🎶', '➕', '➖', '➗', '✖️', '♾️', '💲', '💱', '™️', '©️', '®️', '〰️', '➰', '➿', '🔚', '🔙', '🔛', '🔝', '🔜']
};

/* ========== GLOBAL VARIABLES ========== */
let currentUser = null;
let messages = [];
let images = [];
let refreshInterval = null;
let redirectTimer = null;
let chats = [];
let currentChatId = 'general';
let currentChat = null;

/* ========== ELEMENTS ========== */
const redirectScreen = document.getElementById('redirectScreen');
const countdownElement = document.getElementById('countdown');
const authScreen = document.getElementById('auth');
const chatApp = document.getElementById('chatApp');
const usernameInput = document.getElementById('usernameInput');
const nameInput = document.getElementById('nameInput');
const passwordInput = document.getElementById('passwordInput');
const avatarUrlInput = document.getElementById('avatarUrlInput');
const avatarDisplay = document.getElementById('avatarDisplay');
const userNameEl = document.getElementById('userName');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const messagesDiv = document.getElementById('messages');
const input = document.getElementById('input');
const photoInput = document.getElementById('photoInput');
const sendBtn = document.getElementById('sendBtn');
const logoutBtn = document.getElementById('logoutBtn');
const errorPopup = document.getElementById('errorPopup');
const banScreen = document.getElementById('banScreen');
const banText = document.getElementById('banText');
const banExitBtn = document.getElementById('banExitBtn');
const currentChatName = document.getElementById('currentChatName');

// Настройки
const settingsScreen = document.getElementById('settingsScreen');
const settingsBtn = document.getElementById('settingsBtn');
const closeSettingsBtn = document.querySelector('.close-settings');
const settingDisplayName = document.getElementById('settingDisplayName');
const settingAvatarPreview = document.getElementById('settingAvatarPreview');
const settingAvatarUrl = document.getElementById('settingAvatarUrl');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const themeOptions = document.querySelectorAll('.theme-option');
const iconOptions = document.querySelectorAll('.icon-option');

// Эмодзи
const emojiBtn = document.getElementById('emojiBtn');
const emojiPicker = document.getElementById('emojiPicker');
const emojiTabs = document.querySelectorAll('.emoji-tab');
const emojiGrid = document.getElementById('emojiGrid');

// Чаты
const newChatBtn = document.getElementById('newChatBtn');
const chatsList = document.getElementById('chatsList');
const newChatModal = document.getElementById('newChatModal');
const newChatName = document.getElementById('newChatName');
const newChatDescription = document.getElementById('newChatDescription');
const newChatType = document.getElementById('newChatType');
const newChatPassword = document.getElementById('newChatPassword');
const privateSettings = document.getElementById('privateSettings');
const createChatBtn = document.getElementById('createChatBtn');
const closeModalBtn = document.querySelector('.close-modal');

/* ========== UI HELPER FUNCTIONS ========== */
function showError(msg) {
  errorPopup.textContent = msg;
  errorPopup.classList.remove('hidden');
  setTimeout(() => errorPopup.classList.add('hidden'), 3500);
}

function showUpdateIndicator() {
  const updateIndicator = document.getElementById('updateIndicator');
  if (updateIndicator) {
    updateIndicator.classList.remove('hidden');
    setTimeout(() => updateIndicator.classList.add('hidden'), 1000);
  }
}

/* ========== PASSWORD HASHING ========== */
async function hashPasswordHex(password) {
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2,'0')).join('');
}

/* ========== USERS BIN FUNCTIONS ========== */
// ПОЛУЧИТЬ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
async function getUsersRecord() {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/users?select=*`,
      { headers: HEADERS }
    );

    if (!r.ok) throw new Error("GET users failed");
    return await r.json(); // массив пользователей
  } catch (err) {
    console.error("Get users error:", err);
    return [];
  }
}


// ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ
async function addUser(user) {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/users`,
      {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(user)
      }
    );
    return r.ok;
  } catch (e) {
    console.error("Add user error:", e);
    return false;
  }
}


// ОБНОВИТЬ ПОЛЬЗОВАТЕЛЯ
async function updateUserInBin(username, updates) {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/users?username=eq.${username}`,
      {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify(updates)
      }
    );

    return r.ok;
  } catch (e) {
    console.error("Update user error:", e);
    return false;
  }
}


async function addUserToBin(userObj) {
  try {
    const rec = await getUsersRecord();
    if (!Array.isArray(rec.users)) rec.users = [];
    
    // Генерируем уникальный ID
    const userId = generateUserId();
    userObj.id = userId;
    userObj.createdAt = Date.now();
    
    rec.users.push(userObj);
    await putUsersRecord(rec);
    return true;
  } catch (e) { 
    console.error(e); 
    return false; 
  }
}

function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/* ========== CHAT SYSTEM FUNCTIONS ========== */
async function loadChatsFromBin() {
  try {
    const response = await fetch(BIN_CHATS_URL + "/latest", {
      headers: { "X-Master-Key": API_KEY }
    });
    
    if (!response.ok) {
      // If bin doesn't exist or is empty, create default
      if (response.status === 404) {
        await createDefaultChats();
        return await loadChatsFromBin();
      }
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    chats = Array.isArray(data.record?.chats) ? data.record.chats : [];
    
    // If no chats, create default
    if (chats.length === 0) {
      await createDefaultChats();
      chats = [{
        id: 'general',
        name: 'Общий чат',
        description: 'Основной чат для всех пользователей',
        type: 'public',
        createdBy: 'system',
        createdAt: Date.now(),
        members: [],
        messageCount: 0,
        settings: {
          allowImages: true,
          maxMessageLength: 1000,
          allowLinks: true,
          allowEmojis: true
        }
      }];
    }
    
    return chats;
  } catch (error) {
    console.error('Error loading chats:', error);
    // Return default chat structure
    return [{
      id: 'general',
      name: 'Общий чат',
      type: 'public',
      createdBy: 'system',
      members: [],
      messageCount: 0
    }];
  }
}

async function createDefaultChats() {
  try {
    const defaultChats = {
      chats: [
        {
          id: 'general',
          name: 'Общий чат',
          description: 'Основной чат для всех пользователей',
          type: 'public',
          createdBy: 'system',
          createdAt: Date.now(),
          members: [],
          messageCount: 0,
          settings: {
            allowImages: true,
            maxMessageLength: 1000,
            allowLinks: true,
            allowEmojis: true
          }
        }
      ]
    };
    
    await fetch(BIN_CHATS_URL, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(defaultChats)
    });
    
    return true;
  } catch (error) {
    console.error('Error creating default chats:', error);
    return false;
  }
}

async function saveChatsToBin() {
  try {
    const chatData = { chats };
    const response = await fetch(BIN_CHATS_URL, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(chatData)
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return true;
  } catch (error) {
    console.error('Error saving chats:', error);
    showError('❌ Ошибка сохранения чатов');
    return false;
  }
}

async function createNewChatHandler() {
  const name = newChatName.value.trim();
  const description = newChatDescription.value.trim();
  const type = newChatType.value;
  const password = newChatPassword.value.trim();
  
  if (!name) {
    showError('❌ Введите название чата');
    return;
  }
  
  if (name.length < 3) {
    showError('❌ Название чата должно быть не менее 3 символов');
    return;
  }
  
  if (name.length > 50) {
    showError('❌ Название чата должно быть не более 50 символов');
    return;
  }
  
  // Check if chat with same name exists
  if (chats.find(c => c.name.toLowerCase() === name.toLowerCase())) {
    showError('❌ Чат с таким названием уже существует');
    return;
  }
  
  try {
    // Generate unique chat ID
    const chatId = 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    const newChat = {
      id: chatId,
      name: name,
      description: description,
      type: type,
      createdBy: currentUser.username,
      createdAt: Date.now(),
      members: [currentUser.username],
      messageCount: 0,
      settings: {
        allowImages: true,
        maxMessageLength: 1000,
        allowLinks: true,
        allowEmojis: true,
        password: type === 'private' && password ? password : null
      }
    };
    
    // Add to chats array
    chats.push(newChat);
    
    // Save to bin
    const success = await saveChatsToBin();
    
    if (success) {
      // Close modal
      newChatModal.classList.add('hidden');
      newChatName.value = '';
      newChatDescription.value = '';
      newChatPassword.value = '';
      
      // Update UI
      updateChatsList();
      
      // Switch to new chat
      await switchChat(chatId);
      
      showError('✅ Чат успешно создан!');
    } else {
      // Remove from array if save failed
      chats = chats.filter(c => c.id !== chatId);
      showError('❌ Ошибка сохранения чата');
    }
  } catch (error) {
    console.error('Error creating chat:', error);
    showError('❌ Ошибка создания чата');
  }
}

function updateChatsList() {
  if (!chatsList) return;
  
  // Get accessible chats (public or user is member)
  const accessibleChats = chats.filter(chat => 
    chat.type === 'public' || 
    chat.members.includes(currentUser.username)
  );
  
  if (accessibleChats.length === 0) {
    chatsList.innerHTML = `
      <div style="padding: 15px; text-align: center; color: #94a3b8;">
        <div>💬 Нет доступных чатов</div>
      </div>
    `;
    return;
  }
  
  let html = '';
  
  accessibleChats.forEach(chat => {
    const isActive = chat.id === currentChatId;
    const isPrivate = chat.type === 'private';
    const isCreator = chat.createdBy === currentUser.username;
    const memberCount = chat.members?.length || 0;
    
    html += `
      <div class="chat-item ${isActive ? 'active' : ''}" data-chat-id="${chat.id}">
        <div style="flex: 1;">
          <div class="chat-name">
            ${isPrivate ? '🔒 ' : '🌐 '}${chat.name}
            ${isCreator ? ' 👑' : ''}
          </div>
          <div class="chat-info">
            <span>👥 ${memberCount}</span>
            <span>💬 ${chat.messageCount || 0}</span>
            ${isPrivate ? '<span>🔒 Приватный</span>' : ''}
          </div>
        </div>
      </div>
    `;
  });
  
  chatsList.innerHTML = html;
  
  // Add click event listeners
  document.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', async () => {
      const chatId = item.dataset.chatId;
      await switchChat(chatId);
    });
  });
}

async function switchChat(chatId) {
  const chat = chats.find(c => c.id === chatId);
  if (!chat) {
    showError('❌ Чат не найден');
    return false;
  }
  
  // Check if user can access this chat
  if (chat.type === 'private' && !chat.members.includes(currentUser.username)) {
    showError('❌ У вас нет доступа к этому чату');
    return false;
  }
  
  // Update current chat
  currentChatId = chatId;
  currentChat = chat;
  
  // Update UI
  currentChatName.textContent = chat.name;
  updateChatsList();
  
  // Load messages for this chat
  await loadAllData();
  
  return true;
}

async function incrementChatMessageCount(chatId) {
  const chat = chats.find(c => c.id === chatId);
  if (chat) {
    chat.messageCount = (chat.messageCount || 0) + 1;
    await saveChatsToBin();
    updateChatsList();
  }
}

/* ========== BAN FUNCTIONS ========== */
async function checkBanUser(username) {
  try {
    if (!BIN_ID_BANS || BIN_ID_BANS === "YOUR_BANS_BIN_ID_HERE") return false;
    const r = await fetch(BIN_BANS_URL + "/latest", { headers: { "X-Master-Key": API_KEY } });
    if (!r.ok) return false;
    const data = await r.json();
    const list = data.record?.Bans;
    if (!Array.isArray(list)) return false;
    const userBans = list.filter(b => b.name === username);
    if (userBans.length === 0) return false;
    const ban = userBans[userBans.length - 1];
    const bannedAt = Number(ban.bannedAt) || Date.now();
    const days = Number(ban.days) || 0;
    const until = bannedAt + days * 24 * 60 * 60 * 1000;
    const now = Date.now();
    if (days > 0 && until > now) {
      return { banned: true, days: days, bannedAt: bannedAt, until: until };
    }
    return false;
  } catch (e) { console.error('checkBanUser error', e); return false; }
}

function showBanScreen(days) {
  banText.textContent = `Вы забанены\nДней: ${days}`;
  banScreen.style.display = 'flex';
  // stop refresh
  if (refreshInterval) { clearInterval(refreshInterval); refreshInterval = null; }
}

banExitBtn.addEventListener('click', () => {
  localStorage.removeItem('rprogramUser');
  if (refreshInterval) clearInterval(refreshInterval);
  banScreen.style.display = 'none';
  authScreen.classList.remove('hidden');
  window.location.reload();
});

/* ========== MAINTENANCE CHECK ========== */
async function checkMaintenance() {
  try {
    const r = await fetch(BIN_STATUS_URL + "/latest", { headers: { "X-Master-Key": API_KEY } });
    if (!r.ok) throw new Error("status bin fetch failed");
    const data = await r.json();
    return Boolean(data.record?.maintenance);
  } catch (err) {
    console.error("checkMaintenance error:", err);
    return false;
  }
}

/* ========== REDIRECT FUNCTION ========== */
function redirectToNeocities() {
  redirectScreen.classList.remove('hidden');
  authScreen.classList.add('hidden');
  chatApp.classList.add('hidden');
  
  let secondsLeft = 5;
  
  // Обновление счетчика каждую секунду
  const countdownInterval = setInterval(() => {
    secondsLeft--;
    countdownElement.textContent = `Reconnect: ${secondsLeft} seconds`;
    
    if (secondsLeft <= 0) {
      clearInterval(countdownInterval);
      window.location.href = 'https://erorr234566.neocities.org/Rprogram/503';
    }
  }, 1000);
  
  // Автоматическое перенаправление через 5 секунд
  redirectTimer = setTimeout(() => {
    clearInterval(countdownInterval);
    window.location.href = 'https://erorr234566.neocities.org/Rprogram/503';
  }, 5000);
}

/* ========== THEME FUNCTIONS ========== */
function loadTheme() {
  const savedTheme = localStorage.getItem('rprogramTheme') || 'dark';
  setTheme(savedTheme);
  
  // Активируем кнопку текущей темы
  themeOptions.forEach(option => {
    if (option.dataset.theme === savedTheme) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
}

function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
  localStorage.setItem('rprogramTheme', theme);
}

/* ========== EMOJI FUNCTIONS ========== */
function loadEmojis(category = 'smileys') {
  const emojis = EMOJIS[category] || EMOJIS.smileys;
  emojiGrid.innerHTML = '';
  
  emojis.forEach(emoji => {
    const btn = document.createElement('button');
    btn.className = 'emoji-btn';
    btn.textContent = emoji;
    btn.addEventListener('click', () => {
      input.value += emoji;
      input.focus();
    });
    emojiGrid.appendChild(btn);
  });
}

function toggleEmojiPicker() {
  emojiPicker.classList.toggle('show');
  if (emojiPicker.classList.contains('show')) {
    loadEmojis();
  }
}

/* ========== LINK FORMATTING ========== */
function formatMessage(text) {
  if (!text) return '';
  
  // URL pattern
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  
  // Split text by URLs and process each part
  const parts = text.split(urlPattern);
  
  return parts.map(part => {
    if (urlPattern.test(part)) {
      return `<a href="${part}" class="message-link" target="_blank" rel="noopener noreferrer">${part}</a>`;
    }
    return part;
  }).join('');
}

/* ========== SETTINGS FUNCTIONS ========== */
function openSettings() {
  if (!currentUser) return;
  
  settingDisplayName.value = currentUser.displayName || currentUser.username || '';
  settingAvatarPreview.src = currentUser.avatar || "https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?w=1480";
  settingAvatarUrl.value = currentUser.avatar || '';
  
  // Сбрасываем выбранные иконки
  iconOptions.forEach(icon => icon.classList.remove('active'));
  
  // Показываем настройки
  settingsScreen.classList.remove('hidden');
}

function closeSettings() {
  settingsScreen.classList.add('hidden');
}

async function saveSettings() {
  if (!currentUser) return;
  
  const displayName = settingDisplayName.value.trim();
  const avatarUrl = settingAvatarUrl.value.trim();
  const selectedIcon = document.querySelector('.icon-option.active');
  
  let newAvatar = currentUser.avatar;
  
  if (avatarUrl) {
    newAvatar = avatarUrl;
  } else if (selectedIcon) {
    newAvatar = selectedIcon.src;
  }
  
  if (!displayName) {
    showError("Введите имя для отображения");
    return;
  }
  
  // Обновляем локальные данные
  currentUser.displayName = displayName;
  currentUser.name = displayName;
  currentUser.avatar = newAvatar;
  
  // Сохраняем в localStorage с проверкой
  const userData = {
    id: currentUser.id,
    username: currentUser.username,
    displayName: displayName,
    avatar: newAvatar,
    passwordHash: currentUser.passwordHash
  };
  localStorage.setItem('rprogramUser', JSON.stringify(userData));
  
  // Обновляем отображение
  userNameEl.textContent = displayName;
  avatarDisplay.src = newAvatar || "https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?w=1480";
  
  // Обновляем в BIN
  const updates = {
    displayName: displayName,
    avatar: newAvatar
  };
  
  try {
    const success = await updateUserInBin(currentUser.username, updates);
    if (success) {
      showError("Настройки сохранены!");
    } else {
      showError("Пользователь не найден на сервере");
    }
  } catch (e) {
    console.error('Save settings error:', e);
    showError("Ошибка сохранения на сервере, но локальные настройки обновлены");
  }
  
  // Закрываем настройки после сохранения
  closeSettings();
}

/* ========== USER VALIDATION ========== */
function validateLocalStorageUser() {
  const saved = localStorage.getItem('rprogramUser');
  if (!saved) return null;
  
  try {
    const user = JSON.parse(saved);
    // Проверяем обязательные поля
    if (!user.id || !user.username || !user.passwordHash) {
      localStorage.removeItem('rprogramUser');
      return null;
    }
    return user;
  } catch (e) {
    localStorage.removeItem('rprogramUser');
    return null;
  }
}

/* ========== INITIALIZATION ========== */
(async function init() {
  const isMaintenance = await checkMaintenance();
  if (isMaintenance) {
    redirectToNeocities();
    return;
  }
  
  // Загружаем тему
  loadTheme();
  
  // Загружаем чаты
  chats = await loadChatsFromBin();
  
  const savedUser = validateLocalStorageUser();
  if (savedUser) {
    // Проверяем пользователя в базе
    try {
      const usersRec = await getUsersRecord();
      const users = Array.isArray(usersRec.users) ? usersRec.users : [];
      const existing = users.find(u => u.username === savedUser.username && u.id === savedUser.id);
      
      if (existing && existing.passwordHash === savedUser.passwordHash) {
        currentUser = {
          id: savedUser.id,
          username: savedUser.username,
          name: savedUser.displayName || savedUser.username,
          displayName: savedUser.displayName || savedUser.username,
          avatar: savedUser.avatar || "",
          passwordHash: savedUser.passwordHash
        };
        
        const ban = await checkBanUser(currentUser.username);
        if (ban && ban.banned) { 
          showBanScreen(ban.days); 
          return; 
        }
        startChat();
      } else {
        // Невалидные данные в localStorage
        localStorage.removeItem('rprogramUser');
        authScreen.classList.remove('hidden');
      }
    } catch (e) {
      console.error('Init error:', e);
      authScreen.classList.remove('hidden');
    }
  } else {
    authScreen.classList.remove('hidden');
  }
})();

/* ========== REGISTRATION ========== */
registerBtn.addEventListener('click', async () => {
  const username = usernameInput.value.trim();
  const displayName = nameInput.value.trim();
  const password = passwordInput.value;
  const avatarUrl = (avatarUrlInput.value || '').trim();
  
  if (!username || !displayName || !password) { 
    showError("Заполните все поля!"); 
    return; 
  }
  
  if (username.length < 3) {
    showError("Никнейм должен быть не менее 3 символов");
    return;
  }
  
  try {
    const usersRec = await getUsersRecord();
    const users = Array.isArray(usersRec.users) ? usersRec.users : [];
    
    // Проверяем уникальность никнейма
    if (users.find(u => u.username === username)) { 
      showError("Пользователь с таким никнеймом уже существует."); 
      return; 
    }
    
    const passHash = await hashPasswordHex(password);
    const userId = generateUserId();
    
    const userObj = { 
      id: userId,
      username: username,
      displayName: displayName,
      passwordHash: passHash, 
      avatar: avatarUrl,
      createdAt: Date.now()
    };
    
    const ok = await addUserToBin(userObj);
    if (!ok) { 
      showError("Не удалось создать пользователя (ошибка Bin)."); 
      return; 
    }
    
    // Сохраняем в localStorage
    const localUserData = {
      id: userId,
      username: username,
      displayName: displayName,
      avatar: avatarUrl,
      passwordHash: passHash
    };
    localStorage.setItem('rprogramUser', JSON.stringify(localUserData));
    
    // Проверяем бан
    const ban = await checkBanUser(username);
    if (ban && ban.banned) { 
      showBanScreen(ban.days); 
      return; 
    }
    
    currentUser = { 
      id: userId,
      username: username,
      name: displayName,
      displayName: displayName,
      avatar: avatarUrl,
      passwordHash: passHash
    };
    
    startChat();
  } catch (e) { 
    console.error(e); 
    showError("Ошибка при регистрации"); 
  }
});

/* ========== LOGIN ========== */
loginBtn.addEventListener('click', async () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  
  if (!username || !password) { 
    showError("Введите никнейм и пароль!"); 
    return; 
  }
  
  try {
    const usersRec = await getUsersRecord();
    const users = Array.isArray(usersRec.users) ? usersRec.users : [];
    const existing = users.find(u => u.username === username);
    
    if (!existing) { 
      showError("Пользователь не найден. Зарегистрируйтесь."); 
      return; 
    }
    
    const passHash = await hashPasswordHex(password);
    if (existing.passwordHash !== passHash) { 
      showError("Неверный пароль."); 
      return; 
    }
    
    const ban = await checkBanUser(username);
    if (ban && ban.banned) { 
      showBanScreen(ban.days); 
      return; 
    }
    
    // Сохраняем в localStorage
    const localUserData = {
      id: existing.id,
      username: existing.username,
      displayName: existing.displayName || existing.username,
      avatar: existing.avatar || "",
      passwordHash: existing.passwordHash
    };
    localStorage.setItem('rprogramUser', JSON.stringify(localUserData));
    
    currentUser = { 
      id: existing.id,
      username: existing.username,
      name: existing.displayName || existing.username,
      displayName: existing.displayName || existing.username,
      avatar: existing.avatar || "",
      passwordHash: existing.passwordHash
    };
    
    startChat();
  } catch (e) { 
    console.error(e); 
    showError("Ошибка при входе"); 
  }
});

/* ========== START CHAT ========== */
function startChat() {
  authScreen.classList.add('hidden');
  chatApp.classList.remove('hidden');
  avatarDisplay.src = currentUser.avatar || "https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?w=1480";
  userNameEl.textContent = currentUser.displayName || currentUser.username;
  
  // Initialize chats UI
  updateChatsList();
  
  // Set current chat
  if (chats.length > 0) {
    currentChat = chats.find(c => c.id === currentChatId) || chats[0];
    currentChatName.textContent = currentChat.name;
  }
  
  loadAllData();
  
  if (refreshInterval) clearInterval(refreshInterval);
  refreshInterval = setInterval(async () => {
    try {
      const ban = await checkBanUser(currentUser.username);
      if (ban && ban.banned) { 
        showBanScreen(ban.days); 
        return; 
      }
    } catch(e) {
      console.error('Ban check error:', e);
    }
    loadAllData(true);
  }, 5000);
}

/* ========== MESSAGE SENDING ========== */
async function sendMessage() {
  const text = input.value.trim();
  const file = photoInput.files[0];
  if (!text && !file) return;
  
  const msg = { 
    userId: currentUser.id,
    username: currentUser.username,
    displayName: currentUser.displayName || currentUser.username,
    avatar: currentUser.avatar || "", 
    time: Date.now(),
    chatId: currentChatId
  };
  
  if (text) msg.text = text;
  if (file) {
    try {
      const base64 = await fileToBase64(file);
      const imgIndex = await pushImageToBin(base64);
      if (imgIndex === null) throw new Error("image push failed");
      msg.imageIndex = imgIndex;
    } catch (err) { 
      console.error(err); 
      showError("Ошибка при отправке изображения."); 
      return; 
    }
  }
  
  try {
    await pushMessageToBin(msg);
    
    // Increment chat message count
    await incrementChatMessageCount(currentChatId);
    
    input.value = "";
    photoInput.value = "";
    await loadAllData();
  } catch (err) { 
    console.error(err); 
    showError("Ошибка при сохранении сообщения."); 
  }
}

sendBtn.addEventListener('click', sendMessage);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

/* ========== FILE AND BIN HELPERS ========== */
function fileToBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(String(reader.result));
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

async function getBinLatest(url) {
  try {
    const r = await fetch(url + "/latest", { headers: { "X-Master-Key": API_KEY } });
    if (!r.ok) throw new Error("GET bin failed");
    const data = await r.json();
    return data.record;
  } catch (err) {
    try {
      const defaultRecord = (url === BIN_IMAGES_URL) ? { images: [] } : { messages: [] };
      await fetch(url, { method: "PUT", headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY }, body: JSON.stringify(defaultRecord) });
      return defaultRecord;
    } catch (e) { throw err; }
  }
}

async function pushImageToBin(base64) {
  try {
    const record = await getBinLatest(BIN_IMAGES_URL);
    if (!Array.isArray(record.images)) record.images = [];
    record.images.push(base64);
    await fetch(BIN_IMAGES_URL, { method: "PUT", headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY }, body: JSON.stringify(record) });
    return record.images.length - 1;
  } catch (err) { console.error("pushImageToBin error:", err); return null; }
}

async function pushMessageToBin(msg) {
  try {
    const record = await getBinLatest(BIN_TEXT_URL);
    if (!Array.isArray(record.messages)) record.messages = [];
    record.messages.push(msg);
    await fetch(BIN_TEXT_URL, { method: "PUT", headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY }, body: JSON.stringify(record) });
  } catch (err) { console.error("pushMessageToBin error:", err); throw err; }
}

/* ========== LOAD AND RENDER MESSAGES ========== */
async function loadAllData(silent = false) {
  if (!silent) showUpdateIndicator();
  try {
    const [textRec, imgRec] = await Promise.all([ 
      getBinLatest(BIN_TEXT_URL), 
      getBinLatest(BIN_IMAGES_URL) 
    ]);
    
    // Filter messages by current chat
    const allMessages = Array.isArray(textRec.messages) ? textRec.messages : [];
    messages = allMessages.filter(m => m.chatId === currentChatId);
    images = Array.isArray(imgRec.images) ? imgRec.images : [];
    renderAllMessages();
    if (!silent) showUpdateIndicator();
  } catch (err) { 
    console.error("loadAllData error:", err); 
    showError("Ошибка загрузки данных. Проверь API_KEY и BIN ID."); 
  }
}

function renderAllMessages() {
  messagesDiv.innerHTML = "";
  messages.forEach(m => {
    const isMe = (m.userId === currentUser.id);
    const wrapper = document.createElement('div');
    wrapper.className = 'message-row ' + (isMe ? 'from-me' : 'from-others');
    
    if (!isMe) {
      const who = document.createElement('div');
      who.className = 'msg-sender';
      who.textContent = m.displayName || m.username || 'Unknown';
      wrapper.appendChild(who);
    }
    
    const bubble = document.createElement('div');
    bubble.className = 'bubble ' + (isMe ? 'bubble-me' : 'bubble-other');

    if (m.text) {
      const p = document.createElement('div');
      p.className = 'msg-text';
      p.innerHTML = formatMessage(m.text);
      bubble.appendChild(p);
    }

    if (typeof m.imageIndex === 'number') {
      const idx = m.imageIndex;
      const imgSrc = images[idx] || "";
      if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'msg-image';
        bubble.appendChild(img);
      } else {
        const p = document.createElement('div');
        p.className = 'msg-text';
        p.textContent = "[Изображение недоступно]";
        bubble.appendChild(p);
      }
    }

    const timeDiv = document.createElement('div');
    timeDiv.className = 'msg-time';
    timeDiv.textContent = (function(ts){ 
      try { 
        const d = new Date(ts); 
        return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0'); 
      } catch(e) { 
        return ''; 
      } 
    })(m.time || Date.now());
    bubble.appendChild(timeDiv);

    wrapper.appendChild(bubble);
    messagesDiv.appendChild(wrapper);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

/* ========== EVENT LISTENERS ========== */

// Settings
settingsBtn.addEventListener('click', openSettings);
closeSettingsBtn.addEventListener('click', closeSettings);
saveSettingsBtn.addEventListener('click', saveSettings);

// Закрытие настроек при клике вне окна
settingsScreen.addEventListener('click', (e) => {
  if (e.target === settingsScreen) {
    closeSettings();
  }
});

themeOptions.forEach(option => {
  option.addEventListener('click', () => {
    themeOptions.forEach(o => o.classList.remove('active'));
    option.classList.add('active');
    setTheme(option.dataset.theme);
  });
});

iconOptions.forEach(icon => {
  icon.addEventListener('click', () => {
    iconOptions.forEach(i => i.classList.remove('active'));
    icon.classList.add('active');
    settingAvatarUrl.value = '';
  });
});

settingAvatarUrl.addEventListener('input', () => {
  iconOptions.forEach(icon => icon.classList.remove('active'));
});

// Emoji
emojiBtn.addEventListener('click', toggleEmojiPicker);

// Close emoji picker when clicking outside
document.addEventListener('click', (e) => {
  if (emojiPicker && !emojiPicker.contains(e.target) && e.target !== emojiBtn) {
    emojiPicker.classList.remove('show');
  }
});

emojiTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.category;
    emojiTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    loadEmojis(category);
  });
});

// Chats
newChatBtn.addEventListener('click', () => {
  newChatModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  newChatModal.classList.add('hidden');
  newChatName.value = '';
  newChatDescription.value = '';
  newChatPassword.value = '';
});

// Show/hide password field based on chat type
newChatType.addEventListener('change', function() {
  privateSettings.style.display = this.value === 'private' ? 'block' : 'none';
});

createChatBtn.addEventListener('click', createNewChatHandler);

// Close modal when clicking outside
newChatModal.addEventListener('click', (e) => {
  if (e.target === newChatModal) {
    newChatModal.classList.add('hidden');
    newChatName.value = '';
    newChatDescription.value = '';
    newChatPassword.value = '';
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  if (!confirm("Выйти из Rprogram?")) return;
  localStorage.removeItem('rprogramUser');
  currentUser = null;
  if (refreshInterval) clearInterval(refreshInterval);
  if (redirectTimer) clearTimeout(redirectTimer);
  window.location.reload();
});
</script>
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
</script>
</body>
</html>
