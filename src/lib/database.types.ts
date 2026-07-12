export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name: string;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          username?: string;
          display_name?: string;
          avatar_url?: string | null;
        };
      };
      stage_scores: {
        Row: {
          id: string;
          user_id: string;
          grade: string;
          stage: number;
          best_score: number;
          stars: number;
          total_points: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          grade: string;
          stage: number;
          best_score: number;
          stars: number;
          total_points: number;
          updated_at?: string;
        };
        Update: {
          best_score?: number;
          stars?: number;
          total_points?: number;
          updated_at?: string;
        };
      };
      follows: {
        Row: {
          id: string;
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          follower_id: string;
          following_id: string;
          created_at?: string;
        };
        Update: never;
      };
    };
    Views: {
      leaderboard: {
        Row: {
          user_id: string;
          username: string;
          display_name: string;
          avatar_url: string | null;
          total_points: number;
          total_stars: number;
          stages_completed: number;
        };
      };
    };
  };
}
