import { defineStore } from 'pinia'
import { database } from '@/assets/firebase'
import { ref as dbRef, get, push, set } from 'firebase/database'

interface Post {
    id: string
    title: string
    content: string
    image: string
    date: string
}

export const usePostStore = defineStore({
    id: 'postStore',
    state: (): { posts: Post[] } => ({
        posts: [],
    }),
    actions: {
        async fetchPosts() {
            const postsRef = dbRef(database, 'posts')
            try {
                const snapshot = await get(postsRef)
                if (snapshot.exists()) {
                    const rawData = snapshot.val()
                    this.posts = Object.keys(rawData).map((key) => ({
                        id: key,
                        title: rawData[key].title,
                        content: rawData[key].content,
                        image: rawData[key].image,
                        date: rawData[key].date,
                    }))
                } else {
                    this.posts = []
                }
            } catch (error) {
                console.error('Error fetching posts:', error)
            }
        },
        async addPost(post: Omit<Post, 'id'>) {
            const postsRef = dbRef(database, 'posts')
            const newPostRef = push(postsRef)

            await set(newPostRef, post)
            this.fetchPosts()
        },
    },
})
