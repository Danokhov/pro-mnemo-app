import { auth, db } from '../config/firebaseConfig';
import { signInAnonymously, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { User } from '../types';

interface UserData {
  telegramId: string;
  name: string;
  createdAt: any;
  updatedAt: any;
  topicProgress?: Record<string, string[]>;
  studyWords?: any[];
}

export const FirebaseService = {
  /**
   * Аутентификация пользователя через Telegram и создание/обновление записи в Firebase
   */
  async authenticateWithTelegram(tgUser: { id: number; first_name: string; last_name?: string; username?: string }): Promise<User> {
    try {
      console.log('🔐 Starting Firebase authentication for Telegram user:', tgUser.id);
      
      // Создаем или получаем анонимного пользователя Firebase
      const firebaseUser = await signInAnonymously(auth);
      console.log('✅ Firebase anonymous auth successful:', firebaseUser.uid);
      
      // Для гостей (id === 0) используем guestId из localStorage, иначе telegramId
      let telegramId: string;
      if (tgUser.id === 0) {
        // Гость - используем сохраненный guestId или создаем новый
        let guestId = localStorage.getItem('promnemo_guest_id');
        if (!guestId) {
          guestId = `guest_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
          localStorage.setItem('promnemo_guest_id', guestId);
        }
        telegramId = guestId;
        console.log('👤 Using guest ID for Firebase:', telegramId);
      } else {
        telegramId = String(tgUser.id);
      }
      
      const userName = tgUser.first_name + (tgUser.last_name ? ` ${tgUser.last_name}` : '');
      
      // Создаем или обновляем документ пользователя в Firestore
      const userRef = doc(db, 'users', telegramId);
      const userSnap = await getDoc(userRef);
      
      const userData: UserData = {
        telegramId,
        name: userName,
        updatedAt: serverTimestamp()
      };
      
      if (!userSnap.exists()) {
        // Создаем нового пользователя
        console.log('📝 Creating new user in Firestore:', telegramId);
        userData.createdAt = serverTimestamp();
        await setDoc(userRef, userData);
        console.log('✅ User created in Firestore');
      } else {
        // Обновляем существующего пользователя
        console.log('🔄 Updating existing user in Firestore:', telegramId);
        await updateDoc(userRef, {
          name: userName,
          updatedAt: serverTimestamp()
        });
        console.log('✅ User updated in Firestore');
      }
      
      return {
        id: firebaseUser.uid,
        telegramId,
        name: userName
      };
    } catch (error) {
      console.error('❌ Firebase authentication error:', error);
      throw error;
    }
  },

  /**
   * Сохранение прогресса по темам
   */
  async saveTopicProgress(telegramId: string, topicProgress: Record<string, string[]>): Promise<void> {
    try {
      console.log('💾 Saving topic progress to Firebase:', telegramId);
      console.log('💾 Progress data:', JSON.stringify(topicProgress, null, 2));
      
      // Проверяем, что пользователь аутентифицирован
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.warn('⚠️ No authenticated Firebase user, attempting anonymous sign-in');
        try {
          await signInAnonymously(auth);
          console.log('✅ Anonymous sign-in successful');
        } catch (authError) {
          console.error('❌ Failed to sign in anonymously:', authError);
          throw new Error('User not authenticated in Firebase');
        }
      } else {
        console.log('✅ Firebase user authenticated:', currentUser.uid);
      }
      
      const userRef = doc(db, 'users', telegramId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        // Обновляем существующий документ
        console.log('📝 Updating existing user document with topic progress');
        await updateDoc(userRef, {
          topicProgress,
          updatedAt: serverTimestamp()
        });
        console.log('✅ Topic progress updated successfully in Firestore');
      } else {
        // Создаем новый документ, если его нет
        console.log('📝 Creating new user document with topic progress');
        await setDoc(userRef, {
          telegramId,
          topicProgress,
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp()
        });
        console.log('✅ Topic progress created successfully in Firestore');
      }
      
      // Проверяем, что данные действительно сохранились
      const verifySnap = await getDoc(userRef);
      if (verifySnap.exists()) {
        const savedData = verifySnap.data();
        console.log('✅ Verification: Topic progress saved in Firestore:', {
          hasTopicProgress: !!savedData.topicProgress,
          topicsCount: savedData.topicProgress ? Object.keys(savedData.topicProgress).length : 0
        });
      } else {
        console.error('❌ Verification failed: Document does not exist after save');
      }
    } catch (error) {
      console.error('❌ Error saving topic progress:', error);
      console.error('❌ Error details:', JSON.stringify(error, null, 2));
      if (error instanceof Error) {
        console.error('❌ Error message:', error.message);
        console.error('❌ Error stack:', error.stack);
      }
      throw error;
    }
  },

  /**
   * Загрузка прогресса по темам
   */
  async loadTopicProgress(telegramId: string): Promise<Record<string, string[]> | null> {
    try {
      console.log('📥 Loading topic progress from Firebase:', telegramId);
      const userRef = doc(db, 'users', telegramId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const data = userSnap.data();
        const progress = data.topicProgress || null;
        console.log('✅ Topic progress loaded from Firebase:', {
          hasProgress: !!progress,
          topicsCount: progress ? Object.keys(progress).length : 0
        });
        return progress;
      } else {
        console.log('⚠️ User document does not exist in Firestore');
        return null;
      }
    } catch (error) {
      console.error('❌ Error loading topic progress:', error);
      if (error instanceof Error) {
        console.error('❌ Error message:', error.message);
      }
      return null;
    }
  },

  /**
   * Сохранение слов для изучения
   */
  async saveStudyWords(telegramId: string, studyWords: any[]): Promise<void> {
    try {
      console.log('💾 Saving study words to Firebase:', telegramId, `(${studyWords.length} words)`);
      
      // Оптимизируем данные: убираем неиспользуемые поля (easeFactor)
      // Сохраняем только необходимые: wordId, nextReview, interval, repetitions, addedAt, lastReview
      const optimizedWords = studyWords.map(sw => ({
        wordId: sw.wordId,
        nextReview: sw.nextReview,
        interval: sw.interval,
        repetitions: sw.repetitions,
        addedAt: sw.addedAt,
        ...(sw.lastReview && { lastReview: sw.lastReview })
      }));
      
      console.log('💾 Optimized study words data:', JSON.stringify(optimizedWords.slice(0, 2), null, 2));
      
      // Проверяем, что пользователь аутентифицирован
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.warn('⚠️ No authenticated Firebase user, attempting anonymous sign-in');
        try {
          await signInAnonymously(auth);
          console.log('✅ Anonymous sign-in successful');
        } catch (authError) {
          console.error('❌ Failed to sign in anonymously:', authError);
          throw new Error('User not authenticated in Firebase');
        }
      } else {
        console.log('✅ Firebase user authenticated:', currentUser.uid);
      }
      
      const userRef = doc(db, 'users', telegramId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        // Обновляем существующий документ
        console.log('📝 Updating existing user document');
        await updateDoc(userRef, {
          studyWords: optimizedWords,
          updatedAt: serverTimestamp()
        });
        console.log('✅ Study words updated successfully in Firestore');
      } else {
        // Создаем новый документ, если его нет
        console.log('📝 Creating new user document');
        await setDoc(userRef, {
          telegramId,
          studyWords: optimizedWords,
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp()
        });
        console.log('✅ Study words created successfully in Firestore');
      }
      
      // Проверяем, что данные действительно сохранились
      const verifySnap = await getDoc(userRef);
      if (verifySnap.exists()) {
        const savedData = verifySnap.data();
        console.log('✅ Verification: Data saved in Firestore:', {
          hasStudyWords: !!savedData.studyWords,
          studyWordsCount: savedData.studyWords?.length || 0
        });
      }
    } catch (error) {
      console.error('❌ Error saving study words:', error);
      console.error('❌ Error details:', JSON.stringify(error, null, 2));
      throw error;
    }
  },

  /**
   * Загрузка слов для изучения
   */
  async loadStudyWords(telegramId: string): Promise<any[] | null> {
    try {
      const userRef = doc(db, 'users', telegramId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const data = userSnap.data();
        return data.studyWords || null;
      }
      return null;
    } catch (error) {
      console.error('Error loading study words:', error);
      return null;
    }
  },

  /**
   * Получение всех данных пользователя
   */
  async getUserData(telegramId: string): Promise<UserData | null> {
    try {
      const userRef = doc(db, 'users', telegramId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data() as UserData;
      }
      return null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  /**
   * Проверка существования пользователя в Firebase
   */
  async userExists(telegramId: string): Promise<boolean> {
    try {
      const userRef = doc(db, 'users', telegramId);
      const userSnap = await getDoc(userRef);
      return userSnap.exists();
    } catch (error) {
      console.error('Error checking if user exists:', error);
      return false;
    }
  }
};
