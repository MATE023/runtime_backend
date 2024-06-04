import { Question } from "./Questions";

export interface Problem {
    id: number;
    title: string;
    num: number;
    description: string;
    difficulty: string;
    url: URL;
    topics: string[];
    createdAt: number;
    subQuestions: Question[];
}

export interface CreateProblemRequest {
    Body: Problem;
  }

  export interface GetProblemRequestByID {
    Params: {
        id: string;
    };
  }

  export interface GetProblemRequestByNum {
    Params: {
        num: string;
    };
  }