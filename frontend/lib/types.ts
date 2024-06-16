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
