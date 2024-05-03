import { Deadline } from "./interfaceProps";
export class SubmissionFieldUtils {
    // to change the background color of the text describe the submission state
    static setIsSubmittedStyles = (isSubmitted: boolean, deadlineState: Deadline): string => {
        console.log("run setIsSubmittedStyles");
        if (isSubmitted == true && deadlineState == Deadline.submissionOnTime) {
            console.log("green");
            return 'bg-green-500';
        }
        else if ((isSubmitted == true && deadlineState == Deadline.submissionLate) ||
            (isSubmitted == false && deadlineState == Deadline.submissionLate)) {
            console.log("red");
            return 'bg-red-400';
        }
        else {
            console.log("gray");
            return 'bg-gray-100';
        }
    }

    static setIsSubmitted = (isSubmitted: boolean): string => {
        return isSubmitted ? 'Đã nộp' : 'Chưa nộp';
    }

    static checkFileName(fileName: string): boolean {
        // check if the file extension is pdf or not
        const extension = fileName.split('.').pop();
        if (extension == 'pdf') {
            return true;
        }
        return false;
    }

}