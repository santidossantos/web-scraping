import type { User } from '@/types/user'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('user', {
  state: () => ({
    token: useLocalStorage('token', ''),
    userData: useLocalStorage('userData', '')
  }),
  getters: {
    getToken: (state) => state.token,
    getUserData: (state) => (state.userData ? JSON.parse(state.userData) : null),
    isAuthenticated: (state) => state.token != ''
  },
  actions: {
    login(token: string, userObject: User) {
      this.token = token
      this.userData = JSON.stringify(userObject)
    },
    logout() {
      this.token = ''
      this.userData = ''
    }
  }
})
