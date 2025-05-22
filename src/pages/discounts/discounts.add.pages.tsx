import api from '@/config/axios.customize';
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Select
} from 'antd'
import { IDiscounts } from '../../types/discounts.ts'
import { useNavigate } from 'react-router';

const DiscountsAdd = () => {
  const nav = useNavigate()
  const { RangePicker } = DatePicker

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  }
  const [form] = Form.useForm()
  const onFinish = async (values: IDiscounts) => {
    try {
      const payload = {
        ...values,
        date: Array.isArray(values.date)
          ? values.date.map((d: any) => d.toISOString())
          : values.date
      }
      await api.post('api/discounts/add', payload)
      message.success('Add discount successfully')
      nav('/discounts')
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        if (
          error.response.data.message.toLowerCase().includes('đã tồn tại') ||
        error.response.data.message.toLowerCase().includes('duplicate')
        ) {
          message.error('San pham da ton tai')
        } else {
          message.error(error.response.data.message)
        }
        console.log('Lỗi thêm khuyến mãi:', error.response.data.message)
      } else {
        message.error('Add discounts failed')
        console.log(error)
      }
    }
  }
  return (
    <Form
      {...formItemLayout}
      form={form}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item label="Product1" name="product" rules={[{ required: true, message: 'Please input!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Product2" name="productID" rules={[{ required: true, message: 'Please input!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Variant"
        name="variantID"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Ma code"
        name="code"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item label="Khuyen mai" name='discount_type' rules={[{ required:true, message:'Vui long nhap khuyen mai' }]}>
        <Select>
          <Select.Option value="%">%</Select.Option>
          <Select.Option value="vnd">Vnd</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Gia tri"
        name="discount_value"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item label="Trang thai" name='status' rules={[{ required:true, message:'Vui long nhap trang thai' }]}>
        <Select>
          <Select.Option value="active">active</Select.Option>
          <Select.Option value="inactive">inactive</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <RangePicker/>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default DiscountsAdd