import { defineStore } from 'pinia'
import * as s$todo from '@/services/todo'

export const d$todo = defineStore({
    id: 'todo',
    state: () => ({
        list: [],
    }),
    actions: {
        async a$listtodo() {
            try {
                const { data } = await s$todo.list()
                this.list = data
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$detail(index) {
            try {
                const { data } = await s$todo.detail(index)
                return data
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$add(data) {
            try {
                await s$todo.add(data)
                await this.a$listtodo()
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$remove(index) {
            try {
                const id = await this.a$detail(index).id
                await s$todo.remove(id)
                await this.a$listtodo()
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$edit(index, data) {
            try {
                const id = await this.a$detail(index).id
                await s$todo.edit(id, data) 
                await this.a$listtodo()
            } catch ({ message, error }) {
                throw message ?? error
            }
        }
    },
    getters: {
        g$list: ({ list }) => list,
        g$detail: ({ list }) => {
            return (index) => list[index]
        }
    }
})