export interface ILesson {
    id: string;
    name: string;
    order: number;
    projects: string[];
    sprint: string; // id of the sprint the lesson is apart of
    tk: string; // url of the tk for this lesson
}