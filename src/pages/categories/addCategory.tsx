import { Button, Form, Input, message, Select } from 'antd';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';

const { TextArea } = Input;

interface ICategory {
  name: string;
  slug: string;
  description: string;
  image_url: File[];
  status: 'ON' | 'OFF';
  date_range: [dayjs.Dayjs, dayjs.Dayjs];
}

const AddCategory = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const categoryData: ICategory = {
      ...values
    };
    console.log("Category:", categoryData);
    message.success("Thêm danh mục thành công");
    nav("/categories");
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên danh mục' },
            { min: 3, message: 'Ít nhất 3 ký tự' }
          ]}
        >
          <Input placeholder="VD: Tâm lý học" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            { required: true, message: 'Vui lòng nhập mô tả' },
            { min: 10, message: 'Mô tả ít nhất 10 ký tự' }
          ]}
        >
          <TextArea rows={3} placeholder="Mô tả hiển thị" />
        </Form.Item>

        <Form.Item
          label="Hình ảnh"
          name="image_url"
          rules={[
            { required: true, message: 'Vui lòng tải lên hình ảnh'},
          ]}
        >
          <Input placeholder='URL hình ảnh hiển thị'/>
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

export default AddCategory;