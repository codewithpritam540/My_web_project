import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// Mock users database
const mockUsers: { [key: string]: { password: string; user: User } } = {
  'admin@grandveggie.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@grandveggie.com',
      name: 'Admin User',
      role: 'admin',
    },
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const userData = mockUsers[email];
        
        if (userData && userData.password === password) {
          set({
            user: userData.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        }
        
        set({ isLoading: false });
        return { success: false, error: 'Invalid email or password' };
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        if (mockUsers[email]) {
          set({ isLoading: false });
          return { success: false, error: 'Email already registered' };
        }
        
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          role: 'user',
        };
        
        mockUsers[email] = { password, user: newUser };
        
        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
        
        return { success: true };
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Hook for protected routes
export const useRequireAuth = (requiredRole?: 'admin' | 'user') => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  
  const hasAccess = () => {
    if (!isAuthenticated) return false;
    if (requiredRole && user?.role !== requiredRole) return false;
    return true;
  };
  
  return { isAuthenticated, user, isLoading, hasAccess: hasAccess() };
};