import {
    GET_AUTOFILL_INSTRUCTORS_FAIL, GET_AUTOFILL_INSTRUCTORS_INIT,
    GET_AUTOFILL_INSTRUCTORS_SUCCESS, GET_AUTOFILL_LESSONS_FAIL,
    GET_AUTOFILL_LESSONS_INIT, GET_AUTOFILL_LESSONS_SUCCESS,
    GET_AUTOFILL_SPRINTS_FAIL, GET_AUTOFILL_SPRINTS_INIT,
    GET_AUTOFILL_SPRINTS_SUCCESS, GET_AUTOFILL_TAS_FAIL, GET_AUTOFILL_TAS_INIT,
    GET_AUTOFILL_TAS_SUCCESS, GET_AUTOFILL_COURSES_FAIL,
    GET_AUTOFILL_COURSES_INIT, GET_AUTOFILL_COURSES_SUCCESS,
    GET_AUTOFILL_PMS_FAIL, GET_AUTOFILL_PMS_INIT, GET_AUTOFILL_PMS_SUCCESS,
} from "../actions";
import { IInstructor } from "../types/InstructorInterface";
import { ITa } from "../types/TasInterface";
import { ISprint } from "../types/SprintInterface";
import { ILesson } from "../types/LessonInterface";
import { IPms } from "../types/ProjectManagersInterface";
import { ICourse } from "../types/CourseInterface";
import { IAction } from "../types/ActionInterface";

const initialState: IState = {
    instructors: null,
    tas: null,
    sprints: null,
    lessons: null,
    pms: null,
    courses: null,
    gettingPMs: false,
    gettingCourses: false,
    getInstructorsInit: false,
    getInstructorsSuccess: false,
    getInstructorsFailed: false,
    getLessonsInit: false,
    getLessonsSuccess: false,
    getLessonsFailed: false,
    getSprintsInit: false,
    getSprintsSuccess: false,
    getSprintsFailed: false,
    getTAsInit: false,
    getTAsSuccess: false,
    getTAsFailed: false,
};

export const autofillReducer = ( state: IState = initialState, action: IAction ) => {
    switch( action.type ){
        
        //GET AUTOFILL INSTRUCTORS ------------------------------------------
        
        case GET_AUTOFILL_INSTRUCTORS_INIT:
            return {
                ...state,
                getInstructorsInit: true,
                getInstructorsSuccess: false,
                getInstructorsFailed: false,
            };
        case GET_AUTOFILL_INSTRUCTORS_SUCCESS:
            return {
                ...state,
                getInstructorsInit: false,
                getInstructorsSuccess: true,
                getInstructorsFailed: false,
                instructors: action.payload,
            };
        case GET_AUTOFILL_INSTRUCTORS_FAIL:
            return {
                ...state,
                getInstructorsInit: false,
                getInstructorsSuccess: false,
                getInstructorsFailed: true,
                instructors: {},
                error: action.payload,
            };
        
        //GET AUTOFILL SPRINTS ----------------------------------------------
        
        case GET_AUTOFILL_SPRINTS_INIT:
            return {
                ...state,
                getSprintsInit: true,
                getSprintsSuccess: false,
                getSprintsFailed: false,
            };
        case GET_AUTOFILL_SPRINTS_SUCCESS:
            return {
                ...state,
                getSprintsInit: false,
                getSprintsSuccess: true,
                getSprintsFailed: false,
                sprints: action.payload,
            };
        case GET_AUTOFILL_SPRINTS_FAIL:
            return {
                ...state,
                getSprintsInit: false,
                getSprintsSuccess: false,
                getSprintsFailed: true,
                sprints: {},
                error: action.payload,
            };
        
        //GET AUTOFILL LESSONS ----------------------------------------------
        
        case GET_AUTOFILL_LESSONS_INIT:
            return {
                ...state,
                getLessonsInit: true,
                getLessonsSuccess: false,
                getLessonsFailed: false,
            };
        case GET_AUTOFILL_LESSONS_SUCCESS:
            
            let lessons = { ...state.lessons, ...action.payload };
            
            return {
                ...state,
                getLessonsInit: false,
                getLessonsSuccess: true,
                getLessonsFailed: false,
                lessons,
            };
        case GET_AUTOFILL_LESSONS_FAIL:
            return {
                ...state,
                getLessonsInit: false,
                getLessonsSuccess: false,
                getLessonsFailed: true,
                error: action.payload,
            };
        
        //GET AUTOFILL LESSONS ----------------------------------------------
        
        case GET_AUTOFILL_TAS_INIT:
            return {
                ...state,
                getTAsInit: true,
                getTAsSuccess: false,
                getTAsFailed: false,
            };
        case GET_AUTOFILL_TAS_SUCCESS:
            return {
                ...state,
                getTAsInit: false,
                getTAsSuccess: true,
                getTAsFailed: false,
                tas: action.payload,
            };
        case GET_AUTOFILL_TAS_FAIL:
            return {
                ...state,
                getTAsInit: false,
                getTAsSuccess: false,
                getTAsFailed: true,
                tas: {},
                error: action.payload,
            };
    
        //GET AUTOFILL COURSES ----------------------------------------------
    
        case GET_AUTOFILL_COURSES_INIT:
            return {
                ...state,
                gettingCourses: true,
            };
        case GET_AUTOFILL_COURSES_SUCCESS:
            return {
                ...state,
                gettingCourses: false,
                courses: action.payload,
            };
        case GET_AUTOFILL_COURSES_FAIL:
            return {
                ...state,
                gettingCourses: false,
                courses: null,
                error: action.payload,
            };
    
        //GET AUTOFILL PMS ----------------------------------------------
    
        case GET_AUTOFILL_PMS_INIT:
            return {
                ...state,
                gettingPMs: true,
            };
        case GET_AUTOFILL_PMS_SUCCESS:
            return {
                ...state,
                gettingPMs: false,
                pms: action.payload,
            };
        case GET_AUTOFILL_PMS_FAIL:
            return {
                ...state,
                gettingPMs: false,
                pms: null, error: action.payload,
            };
        
        default:
            return state;
    }
};

interface IState {
    instructors: null | {[id: string]: IInstructor},
    tas: null | {[id: string]: ITa},
    sprints: null | {[id: string]: ISprint},
    lessons: null | {[id: string]: ILesson},
    pms: null | {[id: string]: IPms},
    courses: null | {[id: string]: ICourse},
    gettingPMs: boolean,
    gettingCourses: boolean,
    getInstructorsInit: boolean,
    getInstructorsSuccess: boolean,
    getInstructorsFailed: boolean,
    getLessonsInit: boolean,
    getLessonsSuccess: boolean,
    getLessonsFailed: boolean,
    getSprintsInit: boolean,
    getSprintsSuccess: boolean,
    getSprintsFailed: boolean,
    getTAsInit: boolean,
    getTAsSuccess: boolean,
    getTAsFailed: boolean,
}
