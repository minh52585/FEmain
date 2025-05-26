import {
  Button,
  Form,
  Input,
  message,
  Select,
  Row,
  Col,
  InputNumber
} from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { IProducts } from '../../types/product'
import { useQuery } from '@tanstack/react-query'
import instance from '@/config/axios.customize'
import api from '@/config/axios.customize'

const ProductsUpdate = () => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    }
  }
  const { id } = useParams()
  const { data } = useQuery<IProducts[]>({
    queryKey: ['products', id],
    queryFn: async () => {
      try {
        const { data } = await api.get(`api/products/${id}`)
        console.log('Data:', data)
        return Array.isArray(data.data) ? data.data : [data.data]
      } catch (error) {
        console.log(error)
        return []
      }
    }
  })
  const [form] = Form.useForm()
  useEffect(() => {
    if (data && data[0]) {
      form.setFieldsValue({
        ...data[0]
      })
    }
  }, [ data ] )
  const nav = useNavigate()
  const { TextArea } = Input
  const [image, setImage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const uploadImage = async (file: FileList | null) => {
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file[0])
    formData.append('upload_preset', 'reacttest')

    try {
      const { data } = await axios.put(
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

  const onFinish = async (values: IProducts) => {
    try {
      await api.put(`api/products/${id}`, values)
      message.success('Update product successfully')
      nav('/products')
    } catch (err) {
      console.error(err)
      message.error('Update product failed')
    }
  }

  return (
    <>
    <Form form={form} onFinish={onFinish} {...formItemLayout} layout='vertical' style={{ maxWidth: 800, margin: '0 auto' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Tên" name='name' rules={[
            { required: true, message: 'Vui lòng nhập tên sản phẩm' },
            { min: 3, message: 'Tên sản phẩm chứa ít nhất 3 ký tự' }
          ]}>
            <Input placeholder="VD: Hồ sơ tâm lý học"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Mô tả" name='description' rules={[
            { required: true, message: 'Vui lòng nhập mô tả' },
            { min: 10, message: 'Mô tả chứa ít nhất 10 ký tự' }
          ]}>
            <TextArea rows={2} placeholder="Mô tả hiển thị" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Giá tiền" name='price' rules={[
            { required: true, message: 'Vui lòng nhập giá tiền' },
            { type: 'number', message: 'Giá sản phẩm phải là số' },
          ]}>
            <InputNumber placeholder="Giá tiền lớn hơn 10.000" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Số lượng" name='quantity' rules={[
            { required: true, message: 'Vui lòng nhập số lượng trong kho' },
            { type: 'number', message: 'Số lượng phải là số' }
          ]}>
            <InputNumber placeholder="Số lượng lớn hơn 0" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Danh mục" name='category' rules={[
            { required: true, message: 'Vui lòng chọn danh mục sản phẩm' }
          ]}>
            <Select placeholder="-- Chọn --">
              <Select.Option value="Tâm lý học">Tâm lý học</Select.Option>
              <Select.Option value="Phát triển bản thân">Phát triển bản thân</Select.Option>
              <Select.Option value="Lãng mạn">Lãng mạn</Select.Option>
              <Select.Option value="Trinh thám">Trinh thám</Select.Option>
              <Select.Option value="Tiểu thuyết">Tiểu thuyết</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Trạng thái" name='status' initialValue="Còn hàng">
            <Select>
              <Select.Option value="Còn hàng">Còn hàng</Select.Option>
              <Select.Option value="Hết hàng">Hết hàng</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <div style={{ marginBottom: '20px' }}>
        <label className="block text-lg font-medium text-gray-600 mb-2">Hình ảnh</label>
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
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Xác nhận
          </Button>
        </Form.Item>
    </Form>
    </>
  )
}

export default ProductsUpdate