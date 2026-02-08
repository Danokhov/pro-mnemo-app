
import { User } from '../types';
import { FirebaseService } from './firebaseService';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
          };
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
      };
    };
  }
}

export const AuthService = {
  /**
   * Automatically attempts to login using Telegram WebApp data and Firebase.
   * If failing, falls back to saved data or creates a Guest session.
   */
  async autoLogin(): Promise<User> {
    const tg = window.Telegram?.WebApp;
    
    // 1. Try Telegram WebApp with Firebase
    if (tg && tg.initDataUnsafe?.user) {
      const tgUser = tg.initDataUnsafe.user;
      tg.ready();
      tg.expand();
      
      try {
        // Аутентификация через Firebase
        console.log('🔐 Attempting Firebase authentication for Telegram user:', tgUser.id);
        const user = await FirebaseService.authenticateWithTelegram(tgUser);
        console.log('✅ Firebase authentication successful:', {
          id: user.id,
          telegramId: user.telegramId,
          name: user.name
        });
        
        // Сохраняем в localStorage для быстрого доступа
        localStorage.setItem('promnemo_user', JSON.stringify(user));
        return user;
      } catch (firebaseError) {
        console.error('❌ Firebase authentication failed, using fallback:', firebaseError);
        if (firebaseError instanceof Error) {
          console.error('❌ Error message:', firebaseError.message);
          console.error('❌ Error stack:', firebaseError.stack);
        }
        // Fallback на локальное сохранение
        const user: User = {
          id: `fb_${tgUser.id}`, 
          telegramId: String(tgUser.id),
          name: tgUser.first_name + (tgUser.last_name ? ` ${tgUser.last_name}` : '')
        };
        
        console.warn('⚠️ Using fallback user (not authenticated with Firebase):', user);
        localStorage.setItem('promnemo_user', JSON.stringify(user));
        return user;
      }
    }
    
    // 2. Check if we already have a saved session
    const saved = localStorage.getItem('promnemo_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        localStorage.removeItem('promnemo_user');
      }
    }
    
    // 3. Absolute Fallback: Create a Guest User
    // Для гостей создаем уникальный ID на основе localStorage
    let guestId = localStorage.getItem('promnemo_guest_id');
    if (!guestId) {
      guestId = `guest_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
      localStorage.setItem('promnemo_guest_id', guestId);
    }
    
    const guestUser: User = {
      id: guestId,
      telegramId: guestId, // Используем guestId как telegramId для сохранения в Firebase
      name: 'Гость'
    };
    
    console.log('👤 Created guest user:', guestUser);
    
    // Пытаемся аутентифицировать гостя в Firebase
    try {
      console.log('🔐 Attempting Firebase authentication for guest user');
      const firebaseUser = await FirebaseService.authenticateWithTelegram({
        id: 0, // Для гостей используем 0
        first_name: 'Гость'
      });
      console.log('✅ Guest authenticated in Firebase');
    } catch (error) {
      console.warn('⚠️ Guest Firebase auth failed, will use localStorage only:', error);
    }
    
    localStorage.setItem('promnemo_user', JSON.stringify(guestUser));
    return guestUser;
  },

  getCurrentUser(): User | null {
    const saved = localStorage.getItem('promnemo_user');
    return saved ? JSON.parse(saved) : null;
  },

  logout() {
    localStorage.removeItem('promnemo_user');
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close();
    } else {
      window.location.reload();
    }
  }
};
