import { Button, Card, Form, Input, message, Typography } from "antd";

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Auth/Auth";
import { RoutesPath } from "../../utils/constants";
const { Title } = Typography;

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const { token } = await login(values).unwrap();
      localStorage.setItem('authToken', token);
      message.success('Login bem-sucedido!');
      navigate(RoutesPath.CATEGORIAS);
    } catch (error) {
      message.error('Credenciais inválidas.');
    }
  };

  return(
    <div
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
              loading={isLoading}
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
