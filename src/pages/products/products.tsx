import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Switch, Table } from 'antd'
import { Link } from 'react-router'
import { IProducts } from '../../types/product.ts'
import axios from 'axios'
import api from '@/config/axios.customize.ts'

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
      title: '#',
      key: 'id',
      render: (_: any, __: any, index: number) => index + 1
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Description',
      key: 'description',
      render: (record: any) => record.description || record.descriptions || ''
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Images',
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
      title: 'Action',
      key: 'action',
      render: (_: any, record: IProducts) =>
        <>
          <Popconfirm
            title="Delete the product"
            description="Are you sure to delete this product?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => DelProduct(record._id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Link to={`/products/update/${record._id}`}>
            <Button type='primary' style={{ marginLeft: 8 }}>Edit</Button>
          </Link>
        </>
    }
  ]
  return (
    <div>
      <Link to={'/products/add'}>
        <div style={{ marginBottom: '20px' }}>
          <Button type='primary'>Thêm</Button>
        </div>
      </Link>
      <Table
        dataSource={Array.isArray(data) ? data : []}
        columns={columns}
        rowKey={record => record._id}
      />
    </div>
  )
}

export default ProductsPage