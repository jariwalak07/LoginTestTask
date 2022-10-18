import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Input, Button, Form, message } from "antd";
import { LoginUser } from "../redux/actions/authAction";
import rules from "../helper/helper";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
    };
  }

  componentDidMount() {
    if (this.props.UserDetails) {
      message.success("User Register SuccessFully", 2);
      this.setState({ email: this.props.UserDetails?.email });
    }
  }
  componentDidUpdate(prev) {
    if (prev.error !== this.props.error && this.props.error) {
      message.error(this.props.error, 2);
    }
    if (prev.message !== this.props.message && this.props.message) {
      message.success(this.props.message, 2);
    }
  }
  onFiledChange(name, value) {
    this.setState({ [name]: value });
  }

  onSubmitHandler = (values) => {
    this.props.LoginUser(values);
  };
  render() {
    return (
      <div className="main-wrapper">
        <div className="register mb-5 mt-3">
          <form className="form-input">
            <h1>Login Form</h1>
            <Form
              initialValues={{ email: this.props.UserDetails?.email }}
              layout="vertical"
              onFinish={(value) => {
                this.onSubmitHandler(value);
              }}
              // onFinishFailed={onFinishFailed}
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
                  // loading={loading || getOnboardDataLoading}
                >
                  Sign in
                </Button>
              </div>
              <div className="login-link">
                Don't have an account? <Link to="/">Sign up</Link>
              </div>
            </Form>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  UserDetails: state.auth.userData,
  error: state.auth.error,
  message: state.auth.message,
});

const mapDispatchToProps = (dispatch) => ({
  LoginUser: (data) => dispatch(LoginUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
