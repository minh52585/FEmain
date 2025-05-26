import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Switch, Table } from 'antd'
import { Link } from 'react-router'
import { IProducts } from '../../types/product.ts'
import axios from 'axios'
import api from '@/config/axios.customize.ts'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'

const ProductsPage = () => {
  const { data } = useQuery<IProducts[]>({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const { data } = await api.get('api/products')
        console.log('Data:', data)
        return Array.isArray(data.data) ? data.data : [data.data]
      } catch (error) {
        console.log(error)
        return []
      }
    }
  })
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        await api.delete(`api/products/${id}`)
      } catch (error) {
        console.log(error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      message.success('Delete product successfully')
    }
  })
  const DelProduct = (id: string) => {
    mutation.mutate(id)
  }

  const columns = [
    {
      title: "ID",
      key: 'id',
      render: (_: any, __: any, index: number) => index + 1
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Mô tả',
      key: 'description',
      render: (record: any) => record.description || record.descriptions || ''
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images: string) => <img src={images} width={90} />,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: IProducts) => (
        <Switch
          checked={status === 'Còn hàng'}
          checkedChildren="Còn hàng"
          unCheckedChildren="Hết hàng"
          style={{ minWidth: 100 }}
          onChange={async (checked) => {
            try {
              await api.put(`api/products/${record._id}`, {
                status: checked ? 'Còn hàng' : 'Hết hàng'
              })
              message.success('Cập nhật trạng thái thành công');
              queryClient.invalidateQueries({ queryKey: ['products'] });
            } catch (error) {
              console.log(error)
              message.error('Cập nhật trạng thái thất bại');
            }
          }}
        />
      )
    },
    {
      title: 'Hành dộng',
      key: 'action',
      render: (_: any, record: IProducts) =>
        <>
          <Popconfirm
            title="Xoá sản phẩm này?"
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => DelProduct(record._id)}
          >
            <Button icon={<DeleteOutlined />} size="small" style={{ backgroundColor: "white", color: "red", borderColor: "red" }}></Button>
          </Popconfirm>
          <Link to={`/products/update/${record._id}`}>
            <Button icon={<EditOutlined />} size="small" style={{ backgroundColor: "white", color: "green", borderColor: "green" }}></Button>
          </Link>
        </>
    }
  ]
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
        <h1>Danh sách sản phẩm</h1>
        <Link to={'/products/add'}>
          <Button icon={<PlusOutlined />} size="small" style={{ backgroundColor: "white", color: "dodgerblue", borderColor: "dodgerblue" }}></Button>
        </Link>
      </div>
      <Table dataSource={Array.isArray(data) ? data : []} columns={columns} rowKey={record => record._id} />
    </>
  )
}

export default ProductsPage