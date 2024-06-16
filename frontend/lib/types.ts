export type User = {
  id: number
  username: string
  email: string
  is_active: boolean
  profile_data?: Profile | null
}

export type Profile = {
  id: number
  owner: string
  first_name: string | null
  last_name: string | null
  gender: string | null
  dob: string | null
  phone: string | null
  works_at: string | null
  lives_in: string | null
  studies_at: string | null
  profile_image: string | null
}

export type Post = {
  id: number
  owner: number
  content: string
  post_image: string | null
  category: string | null
  post_date: string
  comments?: Comment[]
  votes?: Vote[]
}

export type Comment = {
  id: number
  comment: string
  comment_image: string | null
  comment_date: string
  commented_by: string
  post: number
}

export type Vote = {
  id: number
  post: number
  up_vote_by?: string
  down_vote_by?: string
}
