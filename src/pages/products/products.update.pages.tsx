import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Upload
} from 'antd'
import { useNavigate } from 'react-router'
interface IProducts {
  _id:string
  name:string
  description:string
  price:number
  quantity:number
  category:string
  upload:File[]
  status:string
}
const ProductsUpdate = () => {
  const nav = useNavigate()
  const [form] = Form.useForm()
  const { TextArea } = Input
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  const onFisnish = (values: IProducts) => {
    console.log('Success:', values)
    message.success('Update product successfully')
    nav('/products')
  }
  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Update Products</h2>
      <Form form={form} onFinish={onFisnish}>
        <Form.Item label="Ten san pham" name='name' rules={[
          { required:true, message:'Vui long nhap ten san pham' },
          { min:3, message:'Ten san pham phai co it nhat 3 ky tu' }
        ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mo ta" name='description' rules={[
          { required:true, message:'Vui long nhap mo ta san pham' },
          { min:10, message:'Mo ta san pham phai co it nhat 10 ky tu' }
        ]}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Gia san pham" name='price' rules={[
          { required:true, message:'Vui long nhap gia san pham' },
          { type:'number', message:'Gia san pham phai la so' }
        ]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="So luong trong kho" name='quantity' rules={[
          { required:true, message:'Vui long nhap so luong san pham' },
          { type:'number', message:'So luong san pham phai la so' }
        ]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Danh muc san pham" name='category' rules={[
          { required:true, message:'Vui long chon danh muc san pham'}
        ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile} name={'upload'} rules={[
          { required:true, message:'Vui long chon hinh anh san pham' }
        ]}>
          <Upload action="/upload" listType="picture-card">
            <button
              style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="Select" name='status' >
          <Select>
            <Select.Option value="Con hang">Con hang</Select.Option>
            <Select.Option value="Het hang">Het hang</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
        Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default ProductsUpdate