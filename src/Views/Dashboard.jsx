import React from "react";
import { Layout, Row, Col, Card, Icon, Skeleton, Avatar } from "antd";
import { cookieDelete } from "../actions/cookie";
import { connect } from "react-redux";
import LambdaLogo from "../assets/logo.png";
import { fetchStudentLessons } from "../actions/index";
import DailyImage from "../assets/daily.jpg";
import SprintImage from "../assets/sprint.jpg";

import axios from "axios";
import Sprint from "../Components/sprint/Sprint";

class Dashboard extends React.Component{
    state = {
        joke: ""
    };
    
    componentDidMount(){
        this.getJoke();
        this.props.fetchSTudentLessons( this.props.user );
    }
    
    logOut = () => {
        cookieDelete( "code" );
        this.props.history.push( "/verify" );
    };
    
    getJoke = () => {
        axios.get( "https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" }
        } ).then( joke => this.setState( { joke: joke.data.joke } ) ).catch();
    };
    
    changeLessonCompleted = title => {
    
    };
    
    render(){
        
        return ( <Layout>
            <Layout.Content
                style={ { minHeight: "100vh", margin: "20px 10px" } }>
                <Card
                    style={ { maxWidth: "800px", margin: "20px auto" } }
                    actions={ [
                        <Icon type="reload" onClick={ this.getJoke }/>, <Icon
                            type="github"
                            onClick={ () => {
                                
                                window.open( `https://github.com/${ this.props.user.github }` );
                            } }
                        />, <Icon type="logout" onClick={ this.logOut }/>
                    ] }
                >
                    <Skeleton loading={ this.props.isLoading } avatar
                              active>
                        <Card.Meta
                            avatar={ <Avatar src={ LambdaLogo }/> }
                            title={ `Welcome ${ this.props.user.firstName } ${ this.props.user.lastName }` }
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
                            onClick={ () => this.props.history.push( "/retro" ) }
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
                            onClick={ () => this.props.history.push( "/sprint" ) }
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

const mstp = state => ( {
    isLoading: state.autoFill.getLessonsInit,
    user: state.users.user,
    sprints: state.autoFill.sprints,
} );

export default connect( mstp,
    { fetchSTudentLessons: fetchStudentLessons }
)(
    Dashboard );
