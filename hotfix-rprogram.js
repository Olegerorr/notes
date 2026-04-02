// Hotfix for Rprogram code from user snippet.
// Подключайте после основного <script>.

(function applyRprogramHotfix() {
  'use strict';

  // 1) Безопасное формирование URL в сообщениях (fix для /g + test())
  window.formatMessage = function formatMessage(text) {
    if (!text) return '';
    const escaped = String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    return escaped.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" class="message-link" target="_blank" rel="noopener noreferrer">$1</a>'
    );
  };

  // 2) Нормализация ответа users (в коде используется usersRec.users)
  if (typeof window.getUsersRecord === 'function') {
    const originalGetUsersRecord = window.getUsersRecord;
    window.getUsersRecord = async function getUsersRecordPatched() {
      const result = await originalGetUsersRecord();
      if (Array.isArray(result)) return { users: result };
      if (result && Array.isArray(result.users)) return result;
      return { users: [] };
    };
  }

  // 3) Исправление addUserToBin: раньше вызывался несуществующий putUsersRecord
  window.addUserToBin = async function addUserToBinPatched(userObj) {
    try {
      if (typeof window.addUser !== 'function') return false;

      const payload = {
        id: userObj.id || ('user_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11)),
        username: userObj.username,
        displayName: userObj.displayName || userObj.username,
        passwordHash: userObj.passwordHash,
        avatar: userObj.avatar || '',
        createdAt: userObj.createdAt || Date.now()
      };

      return await window.addUser(payload);
    } catch (error) {
      console.error('addUserToBin patched error:', error);
      return false;
    }
  };

  // 4) Полифилл для substr -> slice (устаревшее API)
  if (typeof window.generateUserId === 'function') {
    window.generateUserId = function generateUserIdPatched() {
      return 'user_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);
    };
  }

  // 5) Подстановка отсутствующих констант BIN_* на Supabase REST endpoint.
  // Это позволяет избежать ReferenceError при вызовах старых функций.
  const SUPABASE_URL = window.SUPABASE_URL;
  if (SUPABASE_URL && typeof window.BIN_TEXT_URL === 'undefined') {
    window.BIN_TEXT_URL = `${SUPABASE_URL}/rest/v1/messages`;
    window.BIN_IMAGES_URL = `${SUPABASE_URL}/rest/v1/images`;
    window.BIN_STATUS_URL = `${SUPABASE_URL}/rest/v1/settings`;
    window.BIN_BANS_URL = `${SUPABASE_URL}/rest/v1/bans`;
    window.BIN_CHATS_URL = `${SUPABASE_URL}/rest/v1/chats`;
  }

  // 6) Fix опечатки в fallback URL (erorr -> error)
  window.RPROGRAM_FALLBACK_URL = 'https://error234566.neocities.org/Rprogram/503';

  if (typeof window.redirectToNeocities === 'function') {
    const originalRedirect = window.redirectToNeocities;
    window.redirectToNeocities = function redirectToNeocitiesPatched() {
      try {
        return originalRedirect();
      } catch {
        window.location.href = window.RPROGRAM_FALLBACK_URL;
      }
    };
  }
})();
