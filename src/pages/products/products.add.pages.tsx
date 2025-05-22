import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select
} from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { IProducts } from '../../types/product'
import api from '@/config/axios.customize'

const ProductsAdd = () => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    }
  }
  const nav = useNavigate()
  const [form] = Form.useForm()
  const { TextArea } = Input
  const [image, setImage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = async (values: IProducts) => {
    try {
      await api.post('api/products/add', values)
      message.success('Add product successfully')
      nav('/products')
    } catch (err) {
      console.error(err)
      message.error('Add product failed')
    }
  }
  const uploadImage = async (file: FileList | null) => {
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file[0])
    formData.append('upload_preset', 'reacttest')

    try {
      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/dkpfaleot/image/upload',
        formData
      )
      setImage(data.url)
      form.setFieldsValue({ images: data.url })
      setLoading(false)
    } catch (error) {
      console.error('Upload thất bại:', error)
      setLoading(false)
    }
  }

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '0', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Products</h2>
        <Form form={form} onFinish={onFinish} {...formItemLayout} layout='vertical'>
          <Form.Item label="Ten san pham" name='name' rules={[
            { required: true, message: 'Vui long nhap ten san pham' },
            { min: 3, message: 'Ten san pham phai co it nhat 3 ky tu' }
          ]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mo ta" name='description' rules={[
            { required: true, message: 'Vui long nhap mo ta san pham' },
            { min: 10, message: 'Mo ta san pham phai co it nhat 10 ky tu' }
          ]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Gia san pham" name='price' rules={[
            { required: true, message: 'Vui long nhap gia san pham' },
            { type: 'number', message: 'Gia san pham phai la so' }
          ]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="So luong trong kho" name='quantity' rules={[
            { required: true, message: 'Vui long nhap so luong san pham' },
            { type: 'number', message: 'So luong san pham phai la so' }
          ]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Danh muc san pham" name='category' rules={[
            { required: true, message: 'Vui long chon danh muc san pham' }
          ]}>
            <Input />
          </Form.Item>
          <div style={{ marginBottom: '20px' }}>
            <label className="block text-lg font-medium text-gray-600 mb-2">
                  Hình ảnh
            </label>
            <input
              type="file"
              onChange={(e) => uploadImage(e.target.files)}
              className="w-full p-3 border rounded-lg"
            />
            {loading && <p className="text-blue-500 mt-2">Đang tải ảnh...</p>}
            {image && (
              <img
                src={image}
                alt="Uploaded"
                className="mt-2 w-32 h-32 object-cover rounded"
                style={{ display: 'block', margin: '0 auto', width: '350px', height: '350px' }}
              />
            )}
          </div>
          <Form.Item name="images" style={{ display: 'none' }}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item label="Select" name='status' >
            <Select>
              <Select.Option value="Còn hàng">Còn hàng</Select.Option>
              <Select.Option value="Hết hàng">Hết hàng</Select.Option>
            </Select>
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

export default ProductsAdd