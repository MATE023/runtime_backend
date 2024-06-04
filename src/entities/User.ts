import { Problem } from "./Problem";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    savedProblems: number[];
    attemptedProblems: number[];
    solvedProblems: number[]
}

export interface CreateUserRequest {
    Body: User;
  }