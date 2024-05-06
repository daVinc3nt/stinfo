import { Deadline, Subject, Score } from "./interfaceProps";
export class SubmissionFieldUtils {
    // to change the background color of the text describe the submission state
    static setIsSubmittedStyles = (isSubmitted: boolean, deadlineState: Deadline, numOfFile: number): string => {
        // console.log("run setIsSubmittedStyles");
        if (isSubmitted == true && deadlineState == Deadline.submissionOnTime && numOfFile > 0) {
            // console.log("green");
            return 'bg-green-500 p-2 ';
        }
        else if ((isSubmitted == true && deadlineState == Deadline.submissionLate && numOfFile == 0) ||
            (isSubmitted == false && deadlineState == Deadline.submissionLate)) {
            // console.log("red");
            return 'bg-red-400 p-2 ';
        }
        else {
            // console.log("gray");
            return 'bg-gray-100 p-2 ';
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
        // filter based on HK-232
        let createListSubject: Subject[] = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].semester == "HK232") {
                createListSubject.push({
                    course_id: data[i].course_id,
                    course_name: data[i].course_name,
                    class_id: data[i].class_id,
                    teacher: data[i].teacher,
                });
            }
        }
        return createListSubject;
    }

    static createArrayOfScore = (data): Score[] => {
        // filter based on HK-232
        let createListScore: Score[] = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].semester == "HK232") {
                createListScore.push({
                    course_id: data[i].course_id,
                    course_name: data[i].course_name,
                    exercise: data[i].exercise,
                    lab: data[i].lab,
                });
            }
        }
        return createListScore;
    }

    static sortListScore(scoreList: Score[])
    {
        // sort the list of score based on the course name
        scoreList.sort((a, b) => (a.course_id > b.course_id) ? 1 : -1);
    }

    static sortListSubject(subjectList: Subject[])
    {
        // sort the list of subject based on the course name
        subjectList.sort((a, b) => (a.course_id > b.course_id) ? 1 : -1);
    }

}