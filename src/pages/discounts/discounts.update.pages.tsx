import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Select
} from 'antd'
import TextArea from 'antd/es/input/TextArea'

interface IDiscounts {
  _id: string;
  products: string;
  variant: string;
  discount_type: string;
  discount_value: number;
  description: string;
  status: string;
  date: Date[];
}


const DiscountsUpdate = () => {
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
  const onFinish = (values: IDiscounts) => {
    console.log(values)
    message.success('Update discount successfully')
  }
  return (
    <Form
      {...formItemLayout}
      form={form}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item label="Products" name="products" rules={[{ required: true, message: 'Please input!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Variant"
        name="variant"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <Input/>
      </Form.Item>

      <Form.Item label="Khuyen mai" name='discount_type' rules={[{ required:true, message:'Vui long nhap khuyen mai' }]}>
        <Select>
          <Select.Option value="%">%</Select.Option>
          <Select.Option value="Vnd">Vnd</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Gia tri"
        name="discount_value"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item label="Trang thai" name='status' rules={[{ required:true, message:'Vui long nhap trang thai' }]}>
        <Select>
          <Select.Option value="Con">Con</Select.Option>
          <Select.Option value="Het">Het</Select.Option>
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

export default DiscountsUpdate