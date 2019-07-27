import React from "react";
import { Layout, Row, Col, Card, Icon, Skeleton, Avatar, Popover } from "antd";
import { connect } from "react-redux";
import LambdaLogo from "../assets/logo.png";
import { History } from 'history'
import {
    subscribeToStudentLessons, logout, subscribeToAutoFillSprints, subscribe,
    unsubscribe, getAutoFillCourses
} from "../actions/index";
import DailyImage from "../assets/daily.jpg";
import SprintImage from "../assets/sprint.jpg";
import axios from "axios";
import Sprint from "../Components/sprint/Sprint";
import { IUser } from "../types/UserInterface";
import { ISprint } from "../types/SprintInterface";
import { IStudentLesson } from "../types/SutdentLessons";
import { ICourse } from "../types/CourseInterface";
import logger from 'logging-done-simple';

const Logger = logger( "dashboard" );

interface IState {
    joke: string,
    updatedSprints: boolean
}

class Dashboard extends React.Component<IProps, IState> {
    state = {
        joke: "", updatedSprints: false,
    };
    
    componentDidMount(): void {
        
        this.getJoke();
        this.props.getAutoFillCourses();
        if ( this.props.user ) {
            
            if ( !this.props.gettingSprints &&
                !this.props.gettingSprintsSuccess ) {
                this.props.subscribe( "AutoFill",
                    this.props.subscribeToAutoFillSprints( this.props.user ) );
            }
            this.props.subscribe( "StudentLessons",
                this.props.subscribeToStudentLessons( this.props.user ) );
            
        }
    }
    
    componentWillUnmount() {
        
        this.props.unsubscribe( "AutoFill" );
        this.props.unsubscribe( "StudentLessons" );
    }
    
    logOut = () => {
        
        this.props.logout();
        this.props.history.push( "/" );
    };
    
    getJoke = () => {
        axios.get( "https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" }
        } ).then( joke => this.setState( { joke: joke.data.joke } ) ).catch();
    };
    
    componentDidUpdate( prevProps, prevState, snapshot ) {
        
        if ( !this.state.updatedSprints && this.props.studentLessons &&
            this.props.sprints ) {
            this.setState( { updatedSprints: true } );
            Object.values( this.props.sprints ).forEach( sprint => {
                if ( this.props.studentLessons[ sprint.id ] &&
                    this.props.studentLessons[ sprint.id ].completed ) {
                    sprint.completed = true;
                } else {
                    sprint.completed = false;
                }
            } );
        }
    }
    
    render() {
        
        return (
            
            <Layout>
                <Layout.Content
                    style={ { minHeight: "100vh", margin: "20px 10px" } }>
                    <Card
                        style={ { maxWidth: "800px", margin: "20px auto" } }
                        actions={ [
                            
                            <Popover content={ <p>Reload Joke</p> }>
                                <Icon type="reload"
                                      onClick={ this.getJoke }
                                      style={ { fontSize: "24px" } }
                                />
                            </Popover>,
                            
                            <Popover content={ <p>Go To Your Github</p> }>
                                <Icon
                                    type="github"
                                    style={ { fontSize: "24px" } }
                                    onClick={ () => {
                                        window.open(
                                            `https://github.com/${ this.props.user.github }` );
                                    } }
                                />
                            </Popover>,
                            
                            <Popover content={ <p>Logout</p> }>
                                <Icon type="logout"
                                      style={ { fontSize: "24px" } }
                                      onClick={ () => this.logOut() }/>
                            </Popover>
                        ] }
                    >
                        <Skeleton loading={ this.props.isLoading } avatar
                                  active>
                            
                            <Card.Meta
                                avatar={ <Avatar src={ LambdaLogo }/> }
                                title={ <div><p>Welcome { this.props.user &&
                                this.props.user.firstName } { this.props.user &&
                                this.props.user.lastName }</p>
                                    <p> { this.props.user &&
                                    this.props.user.course &&
                                    this.props.courses &&
                                    this.props.courses[ this.props.user.course ].courseName } </p>
                                </div> }
                                description={ `Here is a joke: ${ this.state.joke }` }
                            />
                        </Skeleton>
                    </Card>
                    <Row
                        type="flex"
                        gutter={ 24 }
                        style={ { maxWidth: "800px", margin: "20px auto" } }
                    >
                        <Col xs={ 24 } md={ 12 }>
                            <Card
                                hoverable
                                style={ {
                                    width: "100%", marginBottom: "10px"
                                } }
                                onClick={ () => this.props.history.push(
                                    "/retro" ) }
                                cover={ <img
                                    alt="Daily Retro"
                                    src={ DailyImage }
                                /> }
                            >
                                <Card.Meta
                                    title="Daily Retro"
                                    description="Fill out every evening"
                                />
                            </Card>
                        </Col>
                        <Col xs={ 24 } md={ 12 }>
                            <Card
                                hoverable
                                style={ { width: "100%" } }
                                onClick={ () => this.props.history.push(
                                    "/sprint" ) }
                                cover={ <img
                                    alt="Sprint Form"
                                    src={ SprintImage }
                                /> }
                            >
                                
                                <Card.Meta
                                    title="Sprint Retro"
                                    description="Coming Soon..."
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={ { span: 24, offset: 0 } }
                             md={ { span: 12, offset: 6 } }>
                            { this.props.sprints &&
                            Object.values( this.props.sprints )
                                .sort( ( a, b ) => a.week - b.week )
                                .sort( ( a, b ) => {
                                    if ( a.completed === b.completed ) {
                                        return 0;
                                    } else if ( a.completed ) {
                                        return 1;
                                    } else {
                                        return -1;
                                    }
                                } )
                                .map( sprint => {
                                    return <Sprint key={ sprint.id }
                                                   sprint={ sprint }/>;
                                } ) }
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout> );
    }
}

const mstp = state => {
    Logger.setStyle( 'info', "background-color: blue, color: white" );
    Logger.info( "inside of auth", state, "reducer" );
    Logger.warn( "inside of auth", state, "reducer" );
    Logger.error( "inside of auth", state, "reducer" );
    Logger.log( "inside of auth", state, "reducer" );
    return {
        isLoading: state.autoFill.getLessonsInit,
        user: state.users.user,
        sprints: state.autoFill.sprints,
        studentLessons: state.users.studentLessons,
        gettingSprints: state.autoFill.getSprintsInit,
        gettingSprintsSuccess: state.autoFill.getSprintsSuccess,
        courses: state.autoFill.courses,
    }
}

interface IProps {
    isLoading: boolean,
    user: IUser,
    sprints: { [ id: string ]: ISprint },
    studentLessons: { [ id: string ]: IStudentLesson },
    gettingSprints: boolean
    gettingSprintsSuccess: boolean,
    history: History;
    logout: Function;
    subscribeToStudentLessons: Function;
    subscribeToAutoFillSprints: Function;
    subscribe: Function;
    unsubscribe: Function;
    getAutoFillCourses: Function;
    courses: { [ id: string ]: ICourse }
}

export default connect( mstp,
    {
        subscribeToStudentLessons, logout,
        subscribeToAutoFillSprints, subscribe, unsubscribe, getAutoFillCourses
    }
)( Dashboard );
