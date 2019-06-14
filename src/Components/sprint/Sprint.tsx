import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon, Row, Col, Popover, Table, Button, Divider } from "antd";
import Lesson from "./Lesson";
import { ISprint } from "../../types/SprintInterface";
import { ILesson } from "../../types/LessonInterface";
import { IStudentLesson } from "../../types/SutdentLessons";


interface IState {
    open: boolean;
}

class Sprint extends Component<IProps, IState>{
    
    state = {
        open: false
    };
    
    toggleOpen = () => {
        
        this.setState( state => {
            return {
                open: !state.open,
            };
        } );
    };
    
    openLink( link ){
        window.open( link );
    }
    
    render(){
        let sprintClassName = "pointer hover-blue";
        if( this.props.sprint.completed ){
            sprintClassName += " complete";
        }
        return ( <>
                <Row className={ "inline" }>
                    
                    <Col span={ 2 }>
                        <div>
                            { this.state.open ? <div onClick={ () => {
                                
                            } }>
                                <Icon onClick={ this.toggleOpen }
                                      type={ "caret-down" }
                                      className={ "hover-blue" }
                                      style={ {
                                          fontSize: "24px",
                                      } }/>
                            </div> : <Icon onClick={ this.toggleOpen }
                                           type={ "caret-right" }
                                           className={ "hover-blue" +
                                           " color-lightgrey" }
                                           style={ {
                                               fontSize: "24px",
                                           } }/> }
                        </div>
                    
                    </Col>
                    <Col span={ 22 }>
                        <Popover content={ `${ this.props.sprint.name } TK` }
                                 placement={ "leftBottom" }>
                            <h1 className={ sprintClassName }
                                onClick={ () => this.openLink( this.props.sprint.tk ) }>{ this.props.sprint.name }
                            </h1>
                        </Popover>
                    
                    </Col>
                </Row>
                { this.state.open && Object.values( this.props.lessons )
                    .filter( lesson => lesson.sprint === this.props.sprint.id )
                    .sort( ( a, b ) => a.order - b.order )
                    .map( lesson => {
                        return <Lesson lesson={ lesson }/>;
                    } ) }
                { this.state.open && <Row>
                
                </Row> }
            </>
        
        );
    }
}


interface IProps {
    sprint: ISprint;
    lessons: {[id: string]: ILesson};
    studentLessons: {[id: string]: IStudentLesson}
}

const mstp = state => ( {
    lessons: state.autoFill.lessons, studentLessons: state.users.studentLessons,
} );

export default connect( mstp )( Sprint );