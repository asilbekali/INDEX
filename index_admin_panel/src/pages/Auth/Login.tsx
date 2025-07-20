import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userApi";
import { useContext } from "react";
import { Context } from "../../context/UserContext";

const Login = () => {
    const navigate = useNavigate();
    const { setToken, token } = useContext(Context);

    console.log("bu login", token);

    const onFinish = async (values: { email: string; password: string }) => {
        try {
            const res = await loginUser(values.email, values.password);

            const token = res.split(":")[1];

            localStorage.setItem("token", token);
            setToken(token);

            message.success("Login successful !");
            navigate("/order");
        } catch (error: any) {
            message.error(
                error.message || "Login xatosi. Email yoki parol noto‘g‘ri."
            );
        }
    };

    return (
        <div
            style={{
                backgroundImage: "url('/Rectangle343.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    padding: "40px",
                    borderRadius: "10px",
                    width: "100%",
                    maxWidth: "400px",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "24px",
                        fontSize: "28px",
                        fontWeight: "600",
                        color: "#009398",
                        fontFamily:
                            "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }}
                >
                    INTEX-MARKET.UZ
                </h2>
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "16px",
                        marginBottom: "20px",
                        color: "rgba(0, 0, 0, 0.65)",
                        fontFamily:
                            "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }}
                >
                    Iltimos! Saytdan foydalanish uchun parol va ismingizni
                    kiriting
                </p>
                <Form
                    name="login_form"
                    onFinish={onFinish}
                    layout="vertical"
                    style={{ color: "#009398" }}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Iltimos, email kiriting!",
                            },
                        ]}

                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            size="large"
                            style={{
                                color: "#009398",
                                border: "1px solid #009398"
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "Parolni kiriting!" },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Parol"
                            size="large"
                            style={{
                                color: "#009398",
                                border: "1px solid #009398"
                            }}
                        />
                    </Form.Item>

                    <Form.Item style={{ textAlign: "center" }}>
                        <Button
                            htmlType="submit"
                            size="large"
                            style={{
                                width: "45%",
                                margin: "0 auto",
                                backgroundColor: "#009398",
                                color: "white",
                                border: "none",

                            }}
                        >
                            Kirish
                        </Button>
                        <Button
                            type="link"
                            onClick={() => navigate("/register")}
                            size="large"
                            style={{
                                marginLeft: "10px",
                                color: "#009398",
                                borderRadius: "8px",
                                border: "1.5px solid #009398",
                                backgroundColor: "white",
                                textAlign: "center",
                                paddingBottom: "2px"
                            }}
                        >
                            Ro‘yxatdan o‘tish
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
