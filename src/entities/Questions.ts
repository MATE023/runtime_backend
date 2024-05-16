export interface Question {
    id: number;
    text: string;
    answerChoices: string[];
    correctAnswer: string;
    explanation: string;
}