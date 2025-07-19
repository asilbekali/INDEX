import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/userApi";
import { useState } from "react";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await registerUser(values.name, values.email, values.password);
            message.success("Muvaffaqiyatli ro‘yxatdan o‘tildi!");
            navigate("/login");
        } catch (error: any) {
            let errorMsg = "Ro‘yxatdan o‘tishda xatolik.";
            if (error?.message) {
                errorMsg = error.message;
            }
            message.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                backgroundImage: "url('/LoginImage.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
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
                        color: "#20794D",
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
                    name="register_form"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: "Ismingizni kiriting!" },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Ism"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: "Emailni kiriting!" },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            size="large"
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
                        />
                    </Form.Item>

                    <Form.Item style={{ textAlign: "center" }}>
                        <Button
                            htmlType="submit"
                            size="large"
                            loading={loading}
                            style={{
                                width: "45%",
                                margin: "0 auto",
                                backgroundColor: "#20794D",
                                color: "white",
                                border: "none",
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

export default Register;
