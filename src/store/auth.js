import { setCookies, certCookies, delCookies } from '@/plugins/cookies'
import { defineStore } from 'pinia'
import * as s$auth from '@/services/auth'

export const d$auth = defineStore({
    id: 'auth',
    state: () => ({
        id: undefined,
        name: undefined,
        role: undefined,
    }),
    actions: {
        async a$setUser() {
            try {
                const { id, name, role } = certCookies()
                this.id = id
                this.name = name
                this.role = role
                return 'User Authenticated!'
            } catch ({ message }) {
                this.id = undefined
                this.name = undefined
                this.role = undefined
                throw message
            }
        },
        async a$login(body) {
            try {
                const { data } = await s$auth.login(body)
                setCookies('CERT', data.token, { datetime: data.expiresAt })
                return true
            } catch ({ error, message }) {
                throw message ?? error
            }
        },
        async a$register(body) {
            try {
                const { status } = await s$auth.register(body)
                return status
            } catch ({ error, message }) {
                throw message ?? error
            }
        },
        async a$logout() {
            try {
                const { data } = await s$auth.logout()
                delCookies('CERT')
                this.id = undefined
                this.name = undefined
                this.role = undefined
                return data
            } catch ({ error, message }) {
                throw message ?? error
            }
        }
    },
    getters: {
       g$user: ({ id, name, role }) => ({ id, name, role }),
       isLoggedIn: ({ id }) => !!id
    }
})
