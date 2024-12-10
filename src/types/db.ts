export interface Note {
  id: string;
  text: string;
  author: string;
  created_at: string;
  likes: number;
}

export interface CreateNoteInput {
  text: string;
  author?: string;
}

export interface UpdateNoteLikeInput {
  id: string;
  likes: number;
} 