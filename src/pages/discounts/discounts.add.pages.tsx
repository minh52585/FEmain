import api from '@/config/axios.customize';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select
} from 'antd'
import { IDiscounts } from '../../types/discounts.ts'
import { useNavigate } from 'react-router';

const DiscountsAdd = () => {
  const nav = useNavigate()
  const { RangePicker } = DatePicker
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
      form={form}
      layout="vertical"
      style={{ maxWidth: 800, margin: '0 auto' }}
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Mã sản phẩm" name="productID" rules={[{ required: true, message: 'Vui lòng chọn mã sản phẩm' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Mã biến thể" name="variantID" rules={[{ required: true, message: 'Vui lòng chọn mã biến thể' }]}>
            <Input/>
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Phân loại" name='discount_type' rules={[{ required:true, message:'Vui lòng chọn phân loại' }]}>
            <Select>
              <Select.Option value="%">Phần trăm</Select.Option>
              <Select.Option value="vnd">Tiền mặt</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Giá trị"
            name="discount_value"
            rules={[{ required: true, message: 'Vui lòng nhập giá trị' }]}>
              <Input/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Trạng thái" name='status' rules={[{ required:true, message:'Vui lòng chọn trạng thái' }]}>
            <Select>
              <Select.Option value="active">Hoạt động</Select.Option>
              <Select.Option value="inactive">Tạm dừng</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Thời gian áp dụng" name="date" rules={[{ required: true, message: 'Chọn thời gian áp dụng' }]}>
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  )
}

export default DiscountsAdd