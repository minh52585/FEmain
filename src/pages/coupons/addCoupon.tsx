import { Button, DatePicker, Form, Input, InputNumber, message, Select } from 'antd';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface ICoupon {
  coupons_code: string;
  title: string;
  discount_type: 'percent' | 'amount';
  discount_value: number;
  min_order_value: number;
  date_range: [dayjs.Dayjs, dayjs.Dayjs];
  desciption: string;
  status: 'ON' | 'OFF';
}

const AddCoupon = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const [start_date, end_date] = values.date_range;
    const couponData: ICoupon = {
      ...values,
      start_date: start_date.toISOString(),
      end_date: end_date.toISOString()
    };
    console.log("Coupon:", couponData);
    message.success("Thêm mã giảm giá thành công");
    nav("/coupons");
  };

  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Thêm mã giảm giá</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        <Form.Item
          label="Mã giảm giá"
          name="coupons_code"
          rules={[
            { required: true, message: 'Vui lòng nhập mã coupon' },
            { min: 3, message: 'Ít nhất 3 ký tự' }
          ]}
        >
          <Input placeholder="VD: SUMMER2025" />
        </Form.Item>

        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input placeholder="Tiêu đề hiển thị" />
        </Form.Item>

        <Form.Item
          label="Loại giảm"
          name="discount_type"
          rules={[{ required: true, message: 'Chọn loại giảm' }]}
        >
          <Select placeholder="Chọn loại">
            <Select.Option value="percent">Phần trăm</Select.Option>
            <Select.Option value="amount">Tiền mặt</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Giá trị giảm"
          name="discount_value"
          rules={[{ required: true, message: 'Nhập giá trị giảm' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="VD: 10 hoặc 50000"
            min={1}
          />
        </Form.Item>

        <Form.Item
          label="Giá trị đơn hàng tối thiểu"
          name="min_order_value"
          rules={[{ required: true, message: 'Nhập giá trị tối thiểu' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="VD: 200000"
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Thời gian áp dụng"
          name="date_range"
          rules={[{ required: true, message: 'Chọn thời gian áp dụng' }]}
        >
          <RangePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="desciption"
          rules={[
            { required: true, message: 'Vui lòng nhập mô tả' },
            { min: 10, message: 'Mô tả ít nhất 10 ký tự' }
          ]}
        >
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          initialValue="ON"
        >
          <Select>
            <Select.Option value="ON">Mở</Select.Option>
            <Select.Option value="OFF">Khoá</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCoupon;
