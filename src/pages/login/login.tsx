import React from 'react'
import {
  Button,
  Form,
  Input,
  message
} from 'antd'
import { ILogin} from '@/types/auth'
import { useNavigate } from 'react-router'
import instance from '@/config/axios.customize'
import api from '@/config/axios.customize'
const Login = () => {
  const nav = useNavigate()
  const [form] = Form.useForm()
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  }
  const onFinish = async (values: ILogin) => {
    try {
      await api.post('api/login', values)
      message.success('Login success')
      const userData = {
        ...values,
        password: btoa(values.password)
      }
      localStorage.setItem('user', JSON.stringify(userData))
      console.log(userData);
      nav('/products')
    } catch (error:any) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message)
        console.log('Lỗi đăng nhập:', error.response.data.message)
      } else {
        message.error('Register failed')
        console.log(error)
      }
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5'
      }}
    >
      <div>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h2>
        <Form
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]}
          >
            <Input style={{ width:'100%' }} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
            hasFeedback
          >
            <Input.Password style={{ width:'100%' }} />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
            Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>

  )
}

export default Login