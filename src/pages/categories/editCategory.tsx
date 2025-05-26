import { Button, Form, Input, message, Select } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

const { TextArea } = Input;

interface ICategory {
  name: string;
  slug: string;
  description: string;
  image_url: string;
  status: 'ON' | 'OFF';
}

const EditCategory = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const fakeData: ICategory = {
        name: "Tâm lý học",
        slug: "tam-ly-hoc",
        description: "Danh mục sách về tâm lý học và phát triển cá nhân",
        image_url: "https://example.com/image.jpg",
        status: "ON"
      };
      form.setFieldsValue(fakeData);
    };

    fetchData();
  }, [form, id]);

  const onFinish = (values: ICategory) => {
    console.log("Updated Category:", values);
    message.success("Cập nhật danh mục thành công");
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
            { required: true, message: 'Vui lòng nhập URL hình ảnh'},
          ]}
        >
          <Input placeholder='URL hình ảnh hiển thị' />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
        >
          <Select>
            <Select.Option value="ON">Mở</Select.Option>
            <Select.Option value="OFF">Khoá</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditCategory;