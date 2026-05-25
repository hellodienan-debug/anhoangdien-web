import { create } from 'zustand';
import { blogPosts, BlogPostData } from '@/data/blogData';
import initialContent from '@/data/contentData.json';
import type { ContentData } from '@/types';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '@/lib/firebaseErrors';

interface AppState {
  posts: BlogPostData[];
  portfolioContent: ContentData;
  isLoading: boolean;
  setPosts: (posts: BlogPostData[]) => void;
  setPortfolioContent: (content: ContentData) => void;
  setLoading: (isLoading: boolean) => void;
  addPost: (post: Omit<BlogPostData, 'id'>) => Promise<void>;
  updatePost: (id: string, post: Partial<BlogPostData>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  updatePortfolioContent: (content: ContentData) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

export const useStore = create<AppState>()((set) => ({
  posts: blogPosts,
  portfolioContent: initialContent as unknown as ContentData,
  isLoading: true,
  setPosts: (posts) => set({ posts }),
  setPortfolioContent: (content) => set({ portfolioContent: content }),
  setLoading: (isLoading) => set({ isLoading }),

  addPost: async (post) => {
    try {
      const newRef = doc(collection(db, 'posts'));
      await setDoc(newRef, post);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'posts');
    }
  },
  updatePost: async (id, updatedPost) => {
    try {
      await updateDoc(doc(db, 'posts', id), updatedPost);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `posts/${id}`);
    }
  },
  deletePost: async (id) => {
    try {
      await deleteDoc(doc(db, 'posts', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `posts/${id}`);
    }
  },
  updatePortfolioContent: async (content) => {
    try {
      await setDoc(doc(db, 'settings', 'singleton'), content);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'settings/singleton');
    }
  },
  resetToDefaults: async () => {
    try {
      await setDoc(doc(db, 'settings', 'singleton'), initialContent);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'settings/singleton');
    }
  }
}));

export function initializeFirebaseSync() {
  const unsetPosts = onSnapshot(collection(db, 'posts'), (snapshot) => {
    if (snapshot.empty) {
      useStore.getState().setPosts(blogPosts);
      // Seed initial posts if empty (fire-and-forget)
      blogPosts.forEach(post => {
        const { id, ...data } = post;
        setDoc(doc(db, 'posts', id || Math.random().toString(36).substring(2, 9)), data).catch(console.error);
      });
    } else {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPostData))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      useStore.getState().setPosts(posts);
    }
  }, err => {
    handleFirestoreError(err, OperationType.GET, 'posts');
  });

  const unsetSettings = onSnapshot(doc(db, 'settings', 'singleton'), (snapshot) => {
    if (snapshot.exists()) {
      useStore.getState().setPortfolioContent(snapshot.data() as ContentData);
    } else {
      useStore.getState().setPortfolioContent(initialContent as unknown as ContentData);
    }
  }, err => {
    handleFirestoreError(err, OperationType.GET, 'settings/singleton');
  });

  useStore.getState().setLoading(false);

  return () => {
    unsetPosts();
    unsetSettings();
  };
}
