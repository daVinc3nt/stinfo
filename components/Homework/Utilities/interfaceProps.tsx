export enum Deadline {
    submissionLate = -1,
    submissionOnTime = 1,
    notSubmittedOnTime = 0,
    undefinedState = 2,
}

// Props for the submission component
export interface SubmissionProps {
    submissionFile: File | null;
    isSubmitted: boolean;
    isGraded: boolean;
    deadlineState: Deadline;
    closedDate: Date;
    openedDate: Date;
}

// Type of homework
export enum HomeworkType {
    submission = "submission",
    multipleChoice = "multiple_choice",
}

// Score for a single attempt of a multiple choice quiz
export interface MultipleChoiceScoreAttempt {
    score: number;
    gradedDate: Date;
    isGraded: boolean;
    isCompleteAttempt: boolean;
}

export interface MultipleChoiceQuestion {
    question: string;
    answers: string[];
    correctAnswer: number;
}

export interface Subject {
    class_id: string,
    course_id: string,
    course_name: string,
    teacher: string,
}