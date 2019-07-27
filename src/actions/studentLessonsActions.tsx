import { store } from "../firebase";
import { action } from "./action";
import { IUser } from "../types/UserInterface";
import { IStudentLesson } from "../types/SutdentLessons";
import Logger from "logging-done-simple";

const log = Logger( "student lessons actions" );

export const FETCH_STUDENT_LESSONS_INIT = "FETCH_STUDENT_LESSONS_INIT";
export const FETCH_STUDENT_LESSONS_SUCCESS = "FETCH_STUDENT_LESSONS_SUCCESS";
export const FETCH_STUDENT_LESSONS_FAILED = "FETCH_STUDENT_LESSONS_FAILED";

export const subscribeToStudentLessons = ( student: IUser ) => dispatch => {
    dispatch( action( FETCH_STUDENT_LESSONS_INIT ) );
    return store.collection( "students" )
        .doc( student.id ).collection( "lessons" )
        .onSnapshot( snapshot => {
            if ( !snapshot.empty ) {
                const studentLessons: { [ id: string ]: IStudentLesson } = {};
                snapshot.docs.forEach( lesson => {
                    const data: IStudentLesson = lesson.data() as IStudentLesson;
                    data.id = lesson.id;
                    studentLessons[ data.id ] = data;
                } );
                dispatch( action( FETCH_STUDENT_LESSONS_SUCCESS,
                    studentLessons
                ) );
            } else {
                dispatch( action( FETCH_STUDENT_LESSONS_FAILED,
                    "This user does not exist"
                ) );
            }
        }, err => {
            log.info( err.message );
            dispatch( action( FETCH_STUDENT_LESSONS_FAILED,
                err.message
            ) )
        } );
};

