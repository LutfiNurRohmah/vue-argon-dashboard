import { defineStore } from 'pinia'
import * as s$todo from '@/services/todo'

export const d$todo = defineStore({
    id: 'todo',
    state: () => ({
        list: [],
    }),
    actions: {
        async a$list() {
            try {
                const { data } = await s$todo.list()
                this.list = data
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$detail(id) {
            try {
                const { data } = await s$todo.detail(id)
                return data
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$add(data) {
            try {
                await s$todo.add(data)
                await this.a$list()
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$remove(id) {
            try {
                await s$todo.remove(id)
                await this.a$list()
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$edit(id, data) {
            try {
                await s$todo.edit(id, data) 
                await this.a$list()
            } catch ({ message, error }) {
                throw message ?? error
            }
        }
    },
    getters: {
        g$list: ({ list }) => list,
        g$detail: ({ list }) => {
            return (id) => {
                const index = list.findIndex(item => item.id == id)
                return list[index]
            }
        }
    }
})