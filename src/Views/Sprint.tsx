import React from "react";
import {
  Layout, Row, Button, Card, Icon, Modal, Form, Radio, Select
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
    let value = e.target.value;
    let name = e.target.name;
    this.setState( ( state: IState ) => ( {
      inputs: { ...state.inputs, [ name ]: value }
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
    const RadioGroup = Radio.Group;
    const { Option } = Select;
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
            <Form.Item label={ "Which sprint did you do?" }>
              <Select
                showSearch
                style={ { width: 200 } }
                placeholder="Sprint"
                optionFilterProp="children"
                onChange={ ( value ) => {
                  this.onChangeSelect( value,
                    "Section Sprint" )
                } }
                value={ this.state.inputs[ "Section Sprint" ] }
                // @ts-ignore
                filterOption={ ( input,
                                 option ) => typeof option.props.children ===
                "string" ? option.props.children.toLowerCase()
                  .indexOf( input.toLowerCase() ) >= 0 : '' }
              >
                { this.props.sprints &&
                Object.values( this.props.sprints )
                  .filter( sprint => sprint.course ===
                    this.props.user.course )
                  .map( sprint => {
                    return <Option key={ sprint.id }
                                   value={ sprint.name }>{ `${ sprint.name }` }</Option>;
                  } ) }
              </Select>
            </Form.Item>
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
            <MakeInput
              type={ "input" }
              required
              value={ this.state.inputs[ "Sprint Challenge Submission URL" ] }
              title="Sprint Challenge Submission URL"
              onChange={ this.onChange }
              name={ "Sprint Challenge Submission URL" }
            />
            <MakeInput
              type={ "input" }
              required={ false }
              value={ this.state.inputs[ "Secondary URL" ] }
              title="Secondary URL"
              onChange={ this.onChange }
              name={ "Secondary URL" }
            />
            <MakeInput
              type="rate"
              required
              title="On a scale of 1-3, how would you rate your project submission?"
              value={ this.state.inputs[ "Original Sprint Self Rating" ] }
              onChange={ value => {
                this.onChangeSelect( value, "Original Sprint" +
                  " Self Rating" );
              } }
              desc="1 - Did not meet expectations, obvious bugs, missing functionality, took longer than expected, etc
              2 - Met expectations defined in the project in the given time
              3 - Went above and beyond, completed at least one stretch goal, or otherwise added upon the expectations of the project"
            />
            <MakeInput
              type="rate"
              required
              title="On a scale of 1-3, how would you rate your success with this sprint?"
              value={ this.state.inputs[ "Sprint Challenge Self Rating" ] }
              onChange={ value => {
                this.onChangeSelect( value,
                  "Sprint Challenge Self Rating" );
              } }
              desc="1 - Did not meet expectations, obvious bugs, missing functionality, took longer than expected, etc
              2 - Met expectations defined in the project in the given time
              3 - Went above and beyond, completed at least one stretch goal, or otherwise added upon the expectations of the project"
            />
            <MakeInput
              type="rate"
              required
              title="On a scale of 1-3, how would you rate the materials of this sprint?"
              value={ this.state.inputs[ "Sprint Rating" ] }
              onChange={ value => {
                this.onChangeSelect( value,
                  "Sprint Rating" );
              } }
              desc="1 - Did not meet expectations, obvious bugs, missing functionality, took longer than expected, etc
              2 - Met expectations defined in the project in the given time
              3 - Went above and beyond, completed at least one stretch goal, or otherwise added upon the expectations of the project"
            />
            <MakeInput
              type="rate"
              required
              title="On a scale of 1-3, how would you rate your instructor this week?"
              value={ this.state.inputs[ "Instructor Rating" ] }
              onChange={ value => {
                this.onChangeSelect( value,
                  "Instructor Rating" );
              } }
              desc="1 - Did not meet expectations, obvious bugs, missing functionality, took longer than expected, etc
              2 - Met expectations defined in the project in the given time
              3 - Went above and beyond, completed at least one stretch goal, or otherwise added upon the expectations of the project"
            />
            
            <MakeInput
              type={ "textarea" }
              required
              value={ this.state.inputs[ "Instructor Feedback" ] }
              title="Instructor Feedback"
              onChange={ this.onChange }
              name={ "Instructor Feedback" }
            />
            
            <MakeInput
              type="rate"
              required
              title="On a scale of 1-3, how would you rate your Team Leader?"
              value={ this.state.inputs[ "PM Rating" ] }
              onChange={ value => {
                this.onChangeSelect( value,
                  "PM Rating" );
              } }
              desc="1 - Did not meet expectations, obvious bugs, missing functionality, took longer than expected, etc
              2 - Met expectations defined in the project in the given time
              3 - Went above and beyond, completed at least one stretch goal, or otherwise added upon the expectations of the project"
            />
            
            <MakeInput
              type={ "textarea" }
              required
              value={ this.state.inputs[ "PM Feedback" ] }
              title="Team Leader Feedback"
              onChange={ this.onChange }
              name={ "PM Feedback" }
            />
            <MakeInput
              type={ "input" }
              required
              value={ this.state.inputs[ "Raw NPS" ] }
              title='On a scale of 1 to 10, how likely are  you to recommend Lambda to a friend?'
              onChange={ this.onChange }
              name={ "Raw NPS" }
            />
            <MakeInput
              type={ "textarea" }
              required
              value={ this.state.inputs[ "Other" ] }
              title="Anything else we should know about?"
              onChange={ this.onChange }
              name={ "Other" }
            />
            
            
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
