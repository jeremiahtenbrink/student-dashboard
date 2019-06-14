import { store } from "../firebase";
import { action } from "./action";
import { IUser } from "../types/UserInterface";
import { IStudentLesson } from "../types/SutdentLessons";

export const FETCH_STUDENT_LESSONS_INIT = "FETCH_STUDENT_LESSONS_INIT";
export const FETCH_STUDENT_LESSONS_SUCCESS = "FETCH_STUDENT_LESSONS_SUCCESS";
export const FETCH_STUDENT_LESSONS_FAILED = "FETCH_STUDENT_LESSONS_FAILED";

export const fetchStudentLessons = (student: IUser) => dispatch => {
    dispatch( action( FETCH_STUDENT_LESSONS_INIT ) );
    store.collection( "students" )
        .doc( student.id ).collection( "lessons" )
        .get()
        .then( res => {
            if( !res.empty ){
                const studentLessons: {[id: string]: IStudentLesson} = {};
                res.docs.forEach( lesson => {
                    const data: IStudentLesson = lesson.data() as IStudentLesson;
                    data.id = lesson.id;
                    studentLessons[ data.id ] = data;
                } );
                dispatch( action( FETCH_STUDENT_LESSONS_SUCCESS,
                    studentLessons
                ) );
            }else{
                dispatch( action( FETCH_STUDENT_LESSONS_FAILED,
                    "This user does not exist"
                ) );
            }
        } )
        .catch( err => dispatch( action( FETCH_STUDENT_LESSONS_FAILED,
            err.message
        ) ) );
};

