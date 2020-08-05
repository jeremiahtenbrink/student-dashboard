import React from "react";
import { Layout, Row, Col, Button, Input, Form, Select, Modal } from "antd";
import { connect } from "react-redux";
import {
  getPotentialUserById, GITHUB_PROVIDER, GOOGLE_PROVIDER, signIn,
  createNewUser, linkPotentialUserToId, clearPotentialUser, getAutoFillPMS,
  getAutoFillCourses
} from "../actions/index";
import HomeImage from "../assets/home.svg";
import MakeInput from "../Components/MakeInput";
import { IUser } from "../types/UserInterface";
import { ICourse } from "../types/CourseInterface";
import { IPms } from "../types/ProjectManagersInterface";
import { history } from "../configureStore";

interface IState {
  code: string
  error: string;
  modalError: string;
  modalVisible: boolean,
  firstName: string,
  lastName: string,
  course: string,
  pm: string,
  github: string,
  redirected: boolean,
  subscribedToAutoFill: boolean,
}

class Welcome extends React.Component<IProps, IState> {
  state: IState = {
    code: "",
    error: "",
    modalError: '',
    modalVisible: false,
    firstName: "",
    lastName: "",
    course: "",
    pm: "",
    github: "",
    redirected: false,
    subscribedToAutoFill: false,
  };
  
  componentDidMount(): void {
  
  }
  
  componentDidUpdate( prevProps, prevState, snapshot ): void {
    if ( this.props.newUser && !this.state.subscribedToAutoFill ) {
      this.props.getAutoFillPMS();
      this.props.getAutoFillCourses();
      this.setState(
        state => ( { ...state, subscribedToAutoFill: true } ) )
    }
  }
  
  componentWillMount(): void {
  
  }
  
  showModal = (): void => {
    this.setState( {
      modalVisible: true,
    } );
  };
  
  handleOk = (): void => {
    
    if ( this.state.firstName === '' ) {
      this.setState( { modalError: "Please enter your first name." } );
      return;
    } else if ( this.state.lastName === "" ) {
      this.setState( { modalError: "Please enter your last name." } );
      return;
    } else if ( this.state.course === "" ) {
      this.setState( { modalError: "You must select a course." } );
      return;
    }
    
    const student = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      id: this.props.uid,
      github: this.state.github,
      pm: this.state.pm,
      course: this.state.course,
    };
    
    
    this.props.createNewUser( student );
    this.clearState();
    this.props.history.push( "/dashboard" );
  };
  
  clearState = (): void => {
    this.setState( {
      modalVisible: false,
      firstName: "",
      lastName: "",
      github: "",
      pm: "",
      course: "",
      modalError: '',
    } );
  };
  
  handleCancel = (): void => {
    this.clearState();
  };
  
  onChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    //@ts-ignore
    this.setState( { [ event.target.name ]: event.target.value } );
  };
  
  getPotentialUser = e => {
    
    e.preventDefault();
    this.props.getPotentialUserById( this.state.code );
    
  };
  
  initLogin = ( type ): void => {
    this.props.signIn( type );
  };
  
  selectChange = ( name: string, value: any ) => {
    //@ts-ignore
    this.setState( { [ name ]: value } );
  };
  
  render() {
    // @ts-ignore
    return (
      
      <Layout>
        <Layout.Content>
          <Row
            gutter={ 24 }
            type="flex"
            style={ {
              height: "100vh",
              margin: "0 30px",
              alignItems: "center",
              textAlign: "center"
            } }
          > { this.props.newUser ? (
              
              <div style={ { textAlign: "left" } }>
                <Row type="flex" gutter={ 24 }>
                  <Col xs={ 24 } md={ 16 }>
                    <img src={ HomeImage }
                         style={ { width: "100%" } }
                         alt=""/>
                  </Col>
                  <Col md={ 8 }>
                    <h1>Welcome New User.</h1>
                    <p>We don't seem to have you in our database
                      yet.</p>
                    <p>Please enter your user code below. If you
                      don't have a
                      user code. Talk with your pm to see
                      if they have one for you.</p>
                    
                    <Form>
                      <Form.Item label={ "Code" }>
                        <Input value={ this.state.code }
                               onChange={ this.onChange }
                               name={ "code" }
                        />
                        <Button
                          onClick={ this.getPotentialUser }>Find
                          User</Button>
                        <Button onClick={ this.showModal }>Sign
                          Up</Button>
                      </Form.Item>
                    </Form>
                    
                    { this.props.error !== "" &&
                    <p className={ "error" }>{ this.props.error }</p> }
                    { this.props.potentialUser &&
                    
                    <>
                      <p>Is this you</p>
                      <h3>{ ` ${ this.props.potentialUser.firstName } ${ this.props.potentialUser.lastName }` }</h3>
                      <Button
                        onClick={ () => this.props.linkPotentialUserToId(
                          this.props.uid,
                          this.props.potentialUser
                        ) }>Yes</Button>
                      <Button
                        onClick={ ( e: any ) => this.props.clearPotentialUser() }>No</Button>
                    </> }
                  
                  </Col>
                </Row>
              </div>
            
            ) :
            
            <>
              <Col xs={ 24 } md={ 12 }>
                <h1 style={ { fontSize: "2rem" } }>Student
                  Dashboard</h1>
                <h3>
                  Welcome to the lambda school (unoffical)
                  student
                  dashboard.
                </h3>
                <h6>Login with either google or github</h6>
                <Button
                  className="google-btn"
                  shape="round"
                  type={ "primary" }
                  icon="google"
                  onClick={ () => this.initLogin(
                    GOOGLE_PROVIDER ) }
                  size="large">
                  Google
                </Button>
                <Button
                  className="github-btn mg-left-sm"
                  onClick={ () => this.initLogin(
                    GITHUB_PROVIDER ) }
                  shape="round"
                  type={ "primary" }
                  icon="github"
                  size="large">
                  Github
                </Button>
              </Col>
              
              <Col xs={ 24 } md={ 12 }>
                <img src={ HomeImage }
                     style={ { width: "100%" } }
                     alt=""/>
              </Col>
            </> }
          
          </Row>
          <Modal
            title="Sign Up"
            visible={ this.state.modalVisible }
            onOk={ this.handleOk }
            onCancel={ this.handleCancel }
          >
            <p>You name must match your name in airtable
              exactly.</p>
            <Form>
              <Form.Item label={ "Course" } required={ true }>
                <Select
                  showSearch
                  style={ { width: 200 } }
                  placeholder="Select a course"
                  optionFilterProp="children"
                  onChange={ value => {
                    
                    this.selectChange( "course", value );
                  } }
                  // @ts-ignore
                  filterOption={ ( input,
                                   option ) => typeof option.props.children ===
                  "string" ?
                    option.props.children.toLowerCase()
                      .indexOf( input.toLowerCase() ) >=
                    0 : '' }
                >
                  { this.props.courses &&
                  Object.values( this.props.courses )
                    .map( course => {
                      return <Select.Option
                        key={ course.id }
                        value={ course.id }>{ course.courseName }</Select.Option>;
                    } ) }
                </Select>
              </Form.Item>
              <Form.Item label={ "Project Manager" }
                         required={ false }>
                <Select
                  showSearch
                  style={ { width: 200 } }
                  placeholder="Select your project manager"
                  optionFilterProp="children"
                  onChange={ value => {
                    this.selectChange( "pm", value );
                  } }
                  
                  // @ts-ignore
                  filterOption={ ( input,
                                   option ) => typeof option.props.children ===
                  "string" ?
                    option.props.children.toLowerCase()
                      .indexOf( input.toLowerCase() ) >=
                    0 : '' }
                >
                  { this.props.pms &&
                  Object.values( this.props.pms )
                    .map( pm => {
                      return <Select.Option key={ pm.id }
                                            value={ pm.id }>{ `${ pm.firstName } ${ pm.lastName }` }</Select.Option>;
                    } ) }
                </Select>
              </Form.Item>
              <MakeInput title={ "First Name" }
                         required={ true }
                         onChange={ this.onChange }
                         name={ "firstName" }
                         value={ this.state.firstName }
                         type={ "input" }
              />
              <MakeInput title={ "Last Name" }
                         required={ true }
                         onChange={ this.onChange }
                         name={ "lastName" }
                         value={ this.state.lastName }
                         type={ "input" }
              />
              <MakeInput title={ "Github Handle" }
                         required={ false }
                         onChange={ this.onChange }
                         name={ "github" }
                         value={ this.state.github }
                         type={ "input" }
              />
              
              { this.state.modalError !== '' &&
              <h3 className={ "color-red" }>{ this.state.modalError }</h3> }
            </Form>
          </Modal>
        </Layout.Content>
      </Layout> );
  }
}

const mstp = state => ( {
  user: state.users.user,
  newUser: state.users.newUser,
  error: state.users.error,
  potentialUser: state.users.potentialUser,
  courses: state.autoFill.courses,
  loadingCourses: state.autoFill.gettingCourses,
  pms: state.autoFill.pms,
  gettingPMs: state.autoFill.gettingPMs,
  uid: state.auth.uid,
  isAuthenticated: state.users.isAuthenticated,
} );

export default connect( mstp, {
  getPotentialUserById,
  signIn,
  createNewUser,
  linkPotentialUserToId,
  clearPotentialUser,
  getAutoFillPMS,
  getAutoFillCourses
} )( Welcome );


interface IProps {
  getPotentialUserById: Function;
  signIn: Function;
  createNewUser: Function;
  linkPotentialUserToId: Function;
  clearPotentialUser: Function;
  user: IUser;
  newUser: boolean;
  error: string;
  potentialUser: IUser | null;
  courses: ICourse[];
  loadingCourses: boolean;
  pms: IPms[];
  gettingPMs: boolean;
  uid: string;
  isAuthenticated: boolean;
  getAutoFillPMS: Function,
  getAutoFillCourses: Function,
  history: typeof history,
}

