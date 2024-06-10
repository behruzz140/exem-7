import "./style.scss";
import LoginImage from "../../assets/logo.png";
import { Button, Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import Notification from "../../utils/notificaton";
import useAuthStore from "../../stor/auth";
import { getDataFromCookie, setDataToCookie } from "./../../utils/data-service";
import { useEffect, useState } from "react";

const Index = () => {
  const { getData } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values:any) => {
    setLoading(true);
    const response = await getData(values);
    console.log(response);
    if (response?.status === 201) {
      setDataToCookie("access_token", response.data.data.tokens.access_token);
      setDataToCookie("refresh_token", response.data.data.tokens.refresh_token);
      setDataToCookie("admin_id", response.data.data.data.id);
      Notification({
        title: "Login successfully",
        type: "success",
      });
      navigate("/home");
    } else {
      Notification({
        title: "Phone number or password is incorrect",
        type: "error",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (getDataFromCookie("access_token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          <h1 className="form-title">Login</h1>
          <Form
            name="basic"
            onFinish={(values) => handleSubmit(values)}
            layout="vertical"
            className="form"
          >
            <Form.Item
              label="Phone number"
              name="phone_number"
              rules={[{ required: true, message: "Please input your phone number!" }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={loading}
                className="login-button"
              >
                Login
              </Button>
              <div className="signup-link">
                <p>Don’t have an account?</p>
                <p onClick={() => navigate("/signup")} className="signup-text">
                  Sign Up
                </p>
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className="login-image">
          <img src={LoginImage} alt="Background" />
        </div>
      </div>
    </div>
  );
};

export default Index;
