// generate a homework submission data
import { Deadline, HomeworkType, SubmissionProps, MultipleChoiceScoreAttempt} from './Utilities/interfaceProps';
import { MultipleChoiceQuestion } from './Utilities/interfaceProps';
import { token, ClassID, SubmitFile } from '@/ambLib/amb';

// Only store in local

class HomeWork {
    whichHomeworkType: HomeworkType;
    // a list of File objects
    submissionFile: SubmitFile | null;
    isSubmitted: boolean;
    isGraded: boolean;
    isDeadline: Deadline;
    openedDate: Date;
    closedDate: Date;
    lastModifiedTime: string;
    gradedDate: Date;
    score: number;
    constructor() {
        this.submissionFile = null;
        this.isSubmitted = false;
        this.isGraded = true;
        this.gradedDate = new Date(2024, 4, 5, 10, 0, 0, 0);
        this.isDeadline = Deadline.undefinedState;
        this.openedDate = new Date(2024, 3, 10, 10, 0, 0, 0);
        this.closedDate = new Date(2024, 4, 6, 10, 0, 0, 0);
        this.lastModifiedTime = "-";
        this.score = 8.5;
        // default type of homework is submission
        this.whichHomeworkType = HomeworkType.submission;
    }
    private calculateCurrentDeadlineState = (): Deadline => {
        const currentDate = new Date();
        if (currentDate < this.openedDate) {
            return Deadline.undefinedState;
        }
        else if (currentDate > this.closedDate) {
            return Deadline.submissionLate;
        }
        else if (currentDate < this.closedDate) {
            if (this.isSubmitted) {
                return Deadline.submissionOnTime;
            }
            else {
                return Deadline.notSubmittedOnTime;
            }
        }
        else {
            return Deadline.undefinedState;
        }
    }
    calculateTimeLeft = (): string => {
        const currentDate = new Date();
        const timeLeft = this.closedDate.getTime() - currentDate.getTime();
        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // If the minute and second is passed into the output, it can probably cause a dehyhration error
        return `${daysLeft} ngày ${hoursLeft} giờ`;
    }
    setLastModifiedTime = () => {
        const currentDate = new Date();
        // only use the current date for the last modified time
        const modifyYear = currentDate.getFullYear();
        const modifyMonth = currentDate.getMonth();
        const modifiedDate = currentDate.getDate();
        const modifiedHour = currentDate.getHours();
        const modifiedMinute = currentDate.getMinutes();
        this.lastModifiedTime = `${modifiedHour}:${modifiedMinute} ${modifiedDate}/${modifyMonth + 1}/${modifyYear}`;
        // return `${modifiedHour}:${modifiedMinute} ${modifiedDate}/${modifyMonth}/${modifyYear}`;
    }
    setIsSubmitted = (newIsSubmitted: boolean) => {
        this.isSubmitted = newIsSubmitted;
        // console.log(this.isSubmitted);
    }
    setIsGraded = (newIsGraded: boolean) => {
        this.isGraded = newIsGraded;
    }
    setIsDeadline = () => {
        this.isDeadline = this.calculateCurrentDeadlineState();
    }

}

class HomeworMultipleChoice extends HomeWork{
    numberOfQuestions: number;
    timeLimit: number; // in seconds
    numberOfAttempts: number;
    listOfAttempts: MultipleChoiceScoreAttempt[];
    listOfQuestions: MultipleChoiceQuestion[];

    constructor() {
        super();
        this.whichHomeworkType = HomeworkType.multipleChoice;
        this.numberOfQuestions = 10;
        this.timeLimit = 60;
        this.numberOfAttempts = 3;
        this.listOfAttempts = [];
        this.loadAttempts();
        this.loadQuestions();
    }

    private loadAttempts = () => {
        this.listOfAttempts = [];
        const attempt1: MultipleChoiceScoreAttempt = {
            score: 8.5,
            gradedDate: new Date(2024, 4, 5, 10, 0, 0, 0),
            isGraded: true,
            isCompleteAttempt: true,
        }
        const attempt2: MultipleChoiceScoreAttempt = {
            score: 7.5,
            gradedDate: new Date(2024, 4, 5, 10, 0, 0, 0),
            isGraded: true,
            isCompleteAttempt: true,
        }
        const attempt3: MultipleChoiceScoreAttempt = {
            score: 9.5,
            gradedDate: new Date(2024, 4, 5, 10, 0, 0, 0),
            isGraded: true,
            isCompleteAttempt: true,
        }
        this.listOfAttempts.push(attempt1);
        this.listOfAttempts.push(attempt2);
        this.listOfAttempts.push(attempt3);
    }
    private loadQuestions = () => {
        this.listOfQuestions = [];
        const question1: MultipleChoiceQuestion = {
            question: "Câu hỏi thứ nhất",
            answers: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
            correctAnswer: 0,
        }
        const question2: MultipleChoiceQuestion = {
            question: "Câu hỏi thứ hai",
            answers: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
            correctAnswer: 3,
        }
        const question3: MultipleChoiceQuestion = {
            question: "Câu hỏi thứ ba",
            answers: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
            correctAnswer: 3,
        }
        const question4: MultipleChoiceQuestion = {
            question: "Câu hỏi thứ nhất",
            answers: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
            correctAnswer: 0,
        }
        const question5: MultipleChoiceQuestion = {
            question: "Câu hỏi thứ hai",
            answers: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
            correctAnswer: 3,
        }
        const question6: MultipleChoiceQuestion = {
            question: "Câu hỏi thứ ba",
            answers: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
            correctAnswer: 3,
        }
    }
    getQuestions = (): MultipleChoiceQuestion[] => {
        return this.listOfQuestions;
    }
    setNewAttempt = (newAttempt: MultipleChoiceScoreAttempt) => {
        this.listOfAttempts.push(newAttempt);
    }
    getHighestScore = (): number => {
        let highestScore = 0;
        this.listOfAttempts.forEach((attempt) => {
            if (attempt.score > highestScore) {
                highestScore = attempt.score;
            }
        });
        return highestScore;
    }
}

class HomeworkSubmission extends HomeWork {
    // create a constructor for HomeworkSubmission
    lecturerName: string;
    lecturerComment: string;
    constructor() {
        super();
        this.lecturerName = "Phạm Tấn Lộc";
        this.lecturerComment = "Bài làm khá tốt";
        this.whichHomeworkType = HomeworkType.submission;
    }

    setNewFile = (newFile: SubmitFile) => {
        this.submissionFile = newFile;
    }

    getCurrentFile = (): SubmitFile => {
        let getFile: SubmitFile = this.submissionFile;
        return getFile;
    }
}

// create a new instance of HomeworkSubmission

let HomeworkSubmissionData = new HomeworkSubmission();
let HomeworkMultipleChoiceData = new HomeworMultipleChoice();

// decide HomeworkData type
let HomeworkGeneralData: HomeWork = HomeworkSubmissionData;

class storeUserAPIAHomeworkArgs {
    static currentToken: token;
    static classID: ClassID;
    static setToken = (newToken: token) => {
        storeUserAPIAHomeworkArgs.currentToken = newToken;
        // console.log("store token complete!!!!", this.currentToken);
    }
    static setClassID = (newClassID: ClassID) => {
        storeUserAPIAHomeworkArgs.classID = newClassID;
        // console.log("store classID complete!!!!", this.classID);
    }
}

export { HomeworkSubmissionData, HomeworkMultipleChoiceData, HomeworkGeneralData, storeUserAPIAHomeworkArgs};