import {
    FETCH_USER_BY_ID_INIT, FETCH_USER_BY_ID_FAILED, FETCH_USER_BY_ID_SUCCESS,
    FETCH_STUDENT_LESSONS_FAILED, FETCH_STUDENT_LESSONS_INIT,
    FETCH_STUDENT_LESSONS_SUCCESS, NEW_USER, FETCH_POTENTIAL_USER_BY_ID_FAILED,
    FETCH_POTENTIAL_USER_BY_ID_INIT, FETCH_POTENTIAL_USER_BY_ID_SUCCESS,
    LINK_POTENTIAL_USER_TO_ID_FAILED, LINK_POTENTIAL_USER_TO_ID_INIT,
    LINK_POTENTIAL_USER_TO_ID_SUCCESS, CREATE_NEW_USER_FAILED,
    CREATE_NEW_USER_SUCCESS, CREATE_NEW_USER_INIT, CLEAR_POTENTIAL_USER,
    LOGOUT_SUCCESSFUL
} from "../actions";
import { IUser } from "../types/UserInterface";
import { IStudentLesson } from "../types/SutdentLessons";
import React from "react";
import { IAction } from "../types/ActionInterface";


const initialState: IState = {
    fetchUserInit: false,
    fetchUserSuccess: false,
    fetchUserFailed: false,
    fetchStudentLessonsInit: false,
    fetchStudentLessonsSuccess: false,
    fetchStudentLessonsFailed: false,
    fetchingPotentialUser: false,
    linkingPotentialUser: false,
    creatingNewUser: false,
    isAuthenticated: false,
    newUser: false,
    potentialUser: null,
    user: null,
    studentLessons: null,
    error: "",
};

export const usersReducer = ( state: IState = initialState,
                              action: IAction ): IState => {
    switch ( action.type ) {
        
        case LOGOUT_SUCCESSFUL:
            return { ...state, potentialUser: null, newUser: false };
        
        case NEW_USER:
            return {
                ...state, newUser: true,
            };
        
        //FETCH USER BY ID ----------------------------------------------
        
        case FETCH_USER_BY_ID_INIT:
            return {
                ...state,
                fetchUserInit: true,
                fetchUserSuccess: false,
                fetchUserFailed: false
            };
        case FETCH_USER_BY_ID_SUCCESS:
            
            return {
                ...state,
                fetchUserInit: false,
                fetchUserSuccess: true,
                fetchUserFailed: false,
                user: action.payload,
                isAuthenticated: true,
            };
        case FETCH_USER_BY_ID_FAILED:
            return {
                ...state,
                fetchUserInit: false,
                fetchUserSuccess: false,
                fetchUserFailed: true,
                user: null,
                error: action.payload,
            };
        
        //FETCH POTENTIAL USER BY ID
        // ----------------------------------------------
        
        case FETCH_POTENTIAL_USER_BY_ID_INIT:
            return {
                ...state, fetchingPotentialUser: true,
            };
        case FETCH_POTENTIAL_USER_BY_ID_SUCCESS:
            
            return {
                ...state,
                fetchingPotentialUser: false,
                potentialUser: action.payload,
            };
        case FETCH_POTENTIAL_USER_BY_ID_FAILED:
            return {
                ...state,
                fetchingPotentialUser: false,
                potentialUser: null,
                error: action.payload,
            };
        
        case CLEAR_POTENTIAL_USER:
            return {
                ...state, potentialUser: null
            };
        
        //FETCH USER LESSONS ------------------------------------------------
        
        case FETCH_STUDENT_LESSONS_INIT:
            return {
                ...state,
                fetchStudentLessonsInit: true,
                fetchStudentLessonsSuccess: false,
                fetchStudentLessonsFailed: false
            };
        case FETCH_STUDENT_LESSONS_SUCCESS:
            return {
                ...state,
                fetchStudentLessonsInit: false,
                fetchStudentLessonsSuccess: true,
                fetchStudentLessonsFailed: false,
                studentLessons: action.payload,
            };
        case FETCH_STUDENT_LESSONS_FAILED:
            return {
                ...state,
                fetchStudentLessonsInit: false,
                fetchStudentLessonsSuccess: false,
                fetchStudentLessonsFailed: true,
                studentLessons: {},
                error: action.payload,
            };
        
        
        //FETCH USER LESSONS ------------------------------------------------
        
        case LINK_POTENTIAL_USER_TO_ID_INIT:
            return {
                ...state, linkingPotentialUser: true,
            };
        case LINK_POTENTIAL_USER_TO_ID_SUCCESS:
            return {
                ...state,
                linkingPotentialUser: false,
                user: action.payload,
                potentialUser: null,
                isAuthenticated: true,
            };
        case LINK_POTENTIAL_USER_TO_ID_FAILED:
            return {
                ...state, linkingPotentialUser: false, error: action.payload,
            };
        
        //CREATE NEW USER  ------------------------------------------------
        
        case CREATE_NEW_USER_INIT:
            return {
                ...state, creatingNewUser: true,
            };
        case CREATE_NEW_USER_SUCCESS:
            return {
                ...state, creatingNewUser: false, user: action.payload,
                isAuthenticated: true,
            };
        case CREATE_NEW_USER_FAILED:
            return {
                ...state, creatingNewUser: false, error: action.payload,
            };
        
        default:
            return state;
    }
};

interface IState {
    fetchUserInit: boolean,
    fetchUserSuccess: boolean,
    fetchUserFailed: boolean,
    fetchStudentLessonsInit: boolean,
    fetchStudentLessonsSuccess: boolean,
    fetchStudentLessonsFailed: boolean,
    fetchingPotentialUser: boolean,
    linkingPotentialUser: boolean,
    creatingNewUser: boolean,
    isAuthenticated: boolean,
    newUser: boolean,
    potentialUser: null | IUser,
    user: null | IUser,
    studentLessons: null | { [ id: string ]: IStudentLesson },
    error: string,
}