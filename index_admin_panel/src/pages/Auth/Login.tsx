import { LockOutlined, MailOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from "antd"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()

    const onFinish = async (values: any) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email: values.email,
                password: values.password,
            })
            localStorage.setItem("token", res.data.token)
            message.success("Muvaffaqiyatli login!")
            navigate("/dashboard")
        } catch (error) {
            message.error("Login xatosi. Email yoki parol noto‘g‘ri.")
        }
    }

    return (
        <div
            style={{
                backgroundImage: "url('/LoginImage.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
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
                    Iltimos! Saytdan foydalanish uchun parol va ismingizni kiriting
                </p>
                <Form name="login_form" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: "Iltimos, email kiriting!" }]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Parolni kiriting!" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Parol"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            htmlType="submit"
                            size="large"
                            style={{
                                width: "100%",
                                backgroundColor: "#20794D",
                                color: "white",
                                border: "none",
                            }}
                        >
                            Kirish
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
