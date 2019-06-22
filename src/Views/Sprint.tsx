import React from "react";
import {
    Layout, Row, Col, Button, Card, Icon, Modal, Form, Select
} from "antd";

import MakeInput from "../Components/MakeInput";
import { connect } from "react-redux";
import { IUser } from "../types/UserInterface";
import { ILesson } from "../types/LessonInterface";
import { History } from "history";
import { ISprint } from "../types/SprintInterface";

interface IState {
    isSubmitting: boolean;
    inputs: { [ id: string ]: any };
}

class Sprint extends React.Component<IProps, IState> {
    state = {
        isSubmitting: false,
        inputs: {},
    };
    
    componentDidMount(): void {
    }
    
    onChange = e => {
        e.persist();
        this.setState( ( state: IState ) => ( {
            inputs: { ...state.inputs, [ e.target.name ]: e.target.value }
        } ) );
    };
    
    submit = () => {
        this.setState( {
            isSubmitting: true
        } );
        this.openWindow();
        const thisFunc = this;
        Modal.confirm( {
            title: "Did the airtable",
            content: "",
            okText: "Finished",
            cancelText: "Try Again",
            onOk() {
                thisFunc.props.history.push( "/" );
            },
            onCancel() {
                thisFunc.setState( {
                    isSubmitting: false
                } );
            }
        } );
    };
    
    openWindow = () => {
        let url = `https://airtable.com/shruSVU97eR6CHE5A?prefill_Student=${ this.props.user.firstName.trim() }+${ this.props.user.lastName.trim() }`;
        let keys = Object.keys( this.state.inputs );
        for ( let i = 0; i < keys.length; i++ ) {
            url += `&prefill_${ encodeURI( keys[ i ] ) }=${ encodeURI(
                this.state.inputs[ keys[ i ] ] ) }`
        }
        window.open( url );
    };
    
    onChangeSelect = ( value: string, name: string ) => {
        let e = {
            target: {
                name,
                value
            }
        };
        this.onChange( e );
    };
    
    render() {
        return (
            
            <Layout>
                <Layout.Content
                    style={ { minHeight: "100vh", margin: "20px 10px" } }>
                    <Card
                        style={ { maxWidth: "600px", margin: "20px auto" } }
                        title="Sprint Retro"
                        actions={ [
                            <Icon
                                type="arrow-left"
                                onClick={ () => this.props.history.push(
                                    "/dashboard" ) }
                            />
                        ] }
                    >
                        <p>
                            Take a moment to reflect upon the week.
                        </p>
                    </Card>
                    <Row
                        gutter={ 24 }
                        style={ {
                            maxWidth: "600px",
                            margin: "20px auto",
                            padding: "10px 20px"
                        } }
                    >
                        <MakeInput
                            type="disabled"
                            required
                            value={ `${ this.props.user.firstName } ${ this.props.user.lastName }` }
                            title="Student"
                            desc="Your name will be auto filled"
                            name={ "Student" }
                        />
                        <MakeInput
                            type={ "input" }
                            required
                            value={ this.state.inputs[ "3 Words by Student" ] }
                            title="Three words to describe this sprint."
                            onChange={ this.onChange }
                            name={ "3 Words by Student" }
                        />
                        <MakeInput
                            type={ "input" }
                            required
                            value={ this.state.inputs[ "What went well this week?" ] }
                            title="What went well this week?"
                            onChange={ this.onChange }
                            name={ "What went well this week?" }
                        />
                        <MakeInput
                            type={ "input" }
                            required
                            value={ this.state.inputs[ "What could have gone better?" ] }
                            title="What could have gone better?"
                            onChange={ this.onChange }
                            name={ "What could have gone better?" }
                        />
                        {/*<Form.Item label={ "Which sprint did you do?" }>*/}
                            {/*<Select*/ }
                            {/*showSearch*/ }
                            {/*style={ { width: 200 } }*/ }
                            {/*placeholder="Sprint"*/ }
                            {/*optionFilterProp="children"*/ }
                            {/*onChange={ ( value ) => {*/ }
                            {/*this.onChangeSelect( value, "studyToday" );*/ }
                            {/*} }*/ }
                            {/*value={ this.state.studyToday }*/ }
                            {/*filterOption={ ( input,*/ }
                            {/*option ) => typeof option.props.children ===*/ }
                            {/*"string" ? option.props.children.toLowerCase()*/ }
                            {/*.indexOf( input.toLowerCase() ) >= 0 : '' }*/ }
                            {/*>*/}
                                {/*{ this.props.lessons &&*/ }
                                {/*Object.values( this.props.lessons )*/ }
                                {/*.map( lesson => {*/ }
                                {/*return <Option key={ lesson.id }*/ }
                                {/*value={ lesson.name }>{ `${ lesson.name }` }</Option>;*/ }
                                {/*} ) }*/ }
                            {/*</Select>*/}
                        {/*</Form.Item>*/}
                        <Button
                            type="primary"
                            onClick={ this.submit }
                            size="large"
                            icon="link"
                            loading={ this.state.isSubmitting }
                        >
                            Submit
                        </Button>
                    </Row>
                </Layout.Content>
            </Layout> );
    }
}

const mstp = state => ( {
    user: state.users.user, sprints: state.autoFill.sprints,
} );

interface IProps {
    user: IUser;
    lessons: ILesson[];
    history: History;
    sprints: { [ id: string ]: ISprint }
}

export default connect( mstp )( Sprint );
