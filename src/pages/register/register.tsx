import React from 'react'
import {
  Button,
  Form,
  Input,
  message,
  Select
} from 'antd'
import { IRegister } from '@/types/auth'
import axios from 'axios'
import { useNavigate } from 'react-router';
const Register = () => {
  const nav = useNavigate()
  const [form] = Form.useForm()
  const { Option } = Select
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
  const onFinish = async (values: IRegister) => {
    try {
      await axios.post('http://localhost:8888/api/register', values)
      message.success('Register success')
      const userData = {
        ...values,
        password: btoa(values.password)
      }
      console.log(userData)
      nav('/login')
    } catch (error:any) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message)
        console.log('Lỗi đăng ký:', error.response.data.message)
      } else {
        message.error('Register failed')
        console.log(error)
      }
    }
  }
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  )
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5'
      }}>
      <div>
        <h2 style={{ textAlign:'center', marginBottom:24 }}>Register</h2>
        <Form
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="fullname"
            label="fullname"
            tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
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
            <Input />
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
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select gender!' }]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
          Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register