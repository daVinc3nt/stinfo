import { Deadline, Subject } from "./interfaceProps";
export class SubmissionFieldUtils {
    // to change the background color of the text describe the submission state
    static setIsSubmittedStyles = (isSubmitted: boolean, deadlineState: Deadline, numOfFile: number): string => {
        // console.log("run setIsSubmittedStyles");
        if (isSubmitted == true && deadlineState == Deadline.submissionOnTime && numOfFile > 0) {
            // console.log("green");
            return 'bg-green-500';
        }
        else if ((isSubmitted == true && deadlineState == Deadline.submissionLate && numOfFile == 0) ||
            (isSubmitted == false && deadlineState == Deadline.submissionLate)) {
            // console.log("red");
            return 'bg-red-400';
        }
        else {
            // console.log("gray");
            return 'bg-gray-100';
        }
    }

    static returnIsSubmitted = (isSubmitted: boolean): string => {
        return (isSubmitted) ? 'Đã nộp' : 'Chưa nộp';
    }

    static checkFileName(fileName: string): boolean {
        // check if the file extension is pdf or not
        const extension = fileName.split('.').pop();
        if (extension == 'pdf') {
            return true;
        }
        return false;
    }

    static createArrayOfSubject = (data): Subject[] => {
        let createListSubject: Subject[] = [];
        for (let i = 0; i < data.length; i++) {
            createListSubject.push({
                class_id: data[i].class_id,
                course_id: data[i].course_id,
                course_name: data[i].course_name,
                teacher: data[i].teacher,
            });
        }
        return createListSubject;
    }

}