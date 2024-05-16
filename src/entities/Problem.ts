import { Question } from "./Questions";

export interface Problem {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    url: URL;
    topics: string[];
    createdAt: number;
    subQuestions: Question[];
}