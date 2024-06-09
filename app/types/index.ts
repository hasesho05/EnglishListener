export type Question = {
  id: number
  unit_id: number
  audio_file_src: string
  thumbnail_src: string
  commentary: string
  translation: string
  text: string
  grade_1: boolean
  grade_2: boolean
  grade_3: boolean
  created_at: string
  updated_at: string
}

export type Choice = {
  id: number
  question_id: number
  text: string
  is_correct: boolean
  created_at: string
  updated_at: string
}
