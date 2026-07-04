export type WorkloadLevel = "Light" | "Moderate" | "Heavy";
export type AuthMode = "login" | "signup" | null;
export type SortKey = "rating" | "reviews" | "difficulty" | "name";

export interface Unit {
  code: string;
  name: string;
  faculty: string;
  school: string;
  level: number;
  creditPoints: number;
  semesters: string[];
  campuses: string[];
  rating: number;
  reviewCount: number;
  difficulty: number;
  workload: WorkloadLevel;
  description: string;
  tags: string[];
}

export interface Review {
  id: number;
  unitCode: string;
  author: string;
  semester: string;
  year: number;
  overallRating: number;
  difficulty: number;
  workload: WorkloadLevel;
  teachingQuality: number;
  comment: string;
  upvotes: number;
  hasUpvoted: boolean;
}
