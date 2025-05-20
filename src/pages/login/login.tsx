import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router'

interface ILogin{
  id:string
  email:string
  password:string
  remember:boolean
}
const Login = () => {
  const [form] = Form.useForm()
  const nav = useNavigate()
  const onFinish: FormProps<ILogin>['onFinish'] = (values) => {
    message.success('Login successfully')
    const userData = {
      ...values,
      password: btoa(values.password)
    }
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', btoa(values.password))
    console.log ('Success:', userData)

    nav('/')
  }
  const onFinishFailed: FormProps<ILogin>['onFinishFailed'] = (errorInfo) => {
    console.log ('Failed:', errorInfo)
  }
  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            email:'tamtvph50549@gmail.com',
            password:'123456',
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item<ILogin>
            label="email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email' },
              { type:'email', message:'No email address found!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<ILogin>
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<ILogin> name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
        Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Login