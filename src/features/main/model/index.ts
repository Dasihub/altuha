export interface IPostComment {
    id: number
    text: string
    author: string
    created_at: string
    likes_count: number
}

export interface IUserPost {
    id: number
    post_id: string
    url: string
    caption: null
    likes_count: number
    comments_count: number
    published_date: string
    hashtags: []
    mentions: []
    location: null
    is_video: boolean
    video_url: string
    comments: IPostComment[]
}

export interface IUsersParse {
    id: number
    profile_picture_url: null
    profile_name: string
    ai_response: null
    biography: string
    external_url: null
    media_count: number
    followers_count: number
    followees_count: number
    is_private: false
    is_verified: false
    posts: IUserPost[]
    followers: {
        id: number
        username: string
    }[]
    followees: {
        id: number
        username: string
    }[]
}
