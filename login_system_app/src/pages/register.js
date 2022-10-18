import React from "react";

import { Link, withRouter } from "react-router-dom";
import { Button, Input, Form, message } from "antd";
import { connect } from "react-redux";
import { RegisterUser } from "../redux/actions/authAction";
import rules from "../helper/helper";
import "./style.css";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  componentDidMount() {
    document.querySelector("body").scrollTo(0, 0);
  }

  componentDidUpdate(prev) {
    if (
      prev.userDetails !== this.props.userDetails &&
      this.props.userDetails !== 0
    ) {
      // message.error("User Register SuccessFully....", 2);
      this.props.history.push("/login");
    }
    if (prev.error !== this.props.error && this.props.error) {
      message.error(this.props.error, 2);
    }
  }

  isSubmitEnabled = () => {
    let validEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (validEmail.test(this.state.email)) {
      return true;
    }
    return false;
  };

  toggleShow = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  };

  onSubmitHandler = (values) => {
    this.props.RegisterUser(values);
  };

  OnSubmitFailed = (errorInfo) => {};
  handleFormValidation = () => {};
  handleFormFieldChange = (event) => {
    const { name, value } = event.target;
    this.handleFormValidation(name, value);
    this.setState({ name: value });
  };

  render() {
    return (
      <div className="main-wrapper">
        <div className="register mb-5 mt-3">
          <h1>Registration Form</h1>
          <Form
            layout="vertical"
            onFinishFailed={this.OnSubmitFailed}
            onFinish={(value) => {
              this.onSubmitHandler(value);
            }}
          >
            <Form.Item label="Email Address" name="email" rules={rules.email}>
              <Input placeholder="Your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              rules={rules.password}
              hasFeedback
              name="password"
              // onChange={this.state}
            >
              <Input.Password name="password" placeholder="Your password" />
            </Form.Item>

            <div className="mt-3 btn-sign">
              <Button
                className="btn-primary"
                type="primary"
                shape="round"
                block
                htmlType="submit"
                // loading={loading}
              >
                Sign Up
              </Button>
            </div>
            <div className="login-link">
              Already have an account?<Link to="/login"> Log in</Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userDetails: state.auth.userData,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  RegisterUser: (data) => dispatch(RegisterUser(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RegisterForm));
