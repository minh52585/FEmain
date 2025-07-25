import api from '@/config/axios.customize';
import { ICategory } from '@/types/category';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, Input, message, Select } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const EditCategory = () => {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      try {
        const { data } = await api.get(`api/categories/${id}`)
        console.log('DATA', data)
        return Array.isArray(data.data) ? data.data : [data.data]
      } catch (error) {
        console.log(error)
      }
    }
  })
  useEffect(() => {
    if (data && data[0]) {
      form.setFieldsValue({
        ...data[0]
      })
    }
  }, [ data ] )
  const { TextArea } = Input
  const nav = useNavigate()
  const [form] = Form.useForm()
  const onFinish = async (values: ICategory) => {
    await api.put(`api/categories/${id}`, values)
    console.log('Category:', values)
    message.success('Sửa danh mục thành công!')
    nav('/categories')
  }

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
          <Input placeholder="VD: Tiểu thuyết" />
        </Form.Item>
        <Form.Item
          label="Tên đường dẫn"
          name="slug"
          rules={[
            { required: true, message: 'Vui lòng nhập tên đường dẫn' },
            { min: 3, message: 'Ít nhất 3 ký tự' }
          ]}
        >
          <Input placeholder="VD: tieu-thuyet"/>
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="status"
          initialValue="active"
        >
          <Select>
            <Select.Option value="active">Mở</Select.Option>
            <Select.Option value="inactive">Khoá</Select.Option>
          </Select>
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

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditCategory