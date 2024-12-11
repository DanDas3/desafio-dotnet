import { Button, Card, Form, Input, Typography } from "antd";

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
const { Title } = Typography;

const Login = () => {
  const { makeLogin } = useContext(AuthContext);

  const onFinish = async (values: { userName: string; password: string }) => {

    try {
      await makeLogin(values.userName, values.password);
    } catch (error) {
      console.error(error);
    }


  };

  return(
    <div style={{display:"flex", justifyContent:'center'}}
    >
      <Card
        style={{ width: 350 }}
        bordered={false}
        styles={{
          body: { padding: '20px 40px' }
        }}
      >
        <Title level={3} style={{ textAlign: 'center' }}>
          Login
        </Title>
        <Form
          name="login_form"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Por favor, insira o nome de usuário!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nome de usuário"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor, insira a senha!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Senha"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login;
