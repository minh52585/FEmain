import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Switch, Table } from 'antd'
import { Link } from 'react-router'
import { IDiscounts } from '../../types/discounts.ts'
import api from '@/config/axios.customize.ts'

const Discounts = () => {
  const { data } = useQuery<IDiscounts[]>({
    queryKey:['discounts'],
    queryFn: async() => {
      try {
        const { data } = await api.get('api/discounts')
        console.log('DATA', data)
        return Array.isArray(data.data) ? data.data : [data.data]
      } catch (error) {
        console.log(error)
      }
    }
  })
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn:async(id:string)=>{
      try {
        await api.delete(`api/discounts/${id}`)
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess:( ) => {
      queryClient.invalidateQueries({ queryKey:['discounts'] })
      message.success('Delete discounts successfully')
    }
  })
  const Del = (id:string) => {
    mutation.mutate(id)
  }
  const columns = [
    {
      title: '#',
      key: 'id',
      render:(_:any, __:any, index:number) => index + 1
    },
    {
      title: 'product',
      dataIndex: 'product',
      key: 'product'
    },
    {
      title: 'products',
      dataIndex: 'productID',
      key: 'productID'
    },
    {
      title: 'variant',
      dataIndex: 'variantID',
      key: 'variantID'
    },
    {
      title: 'code',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'khuyen mai',
      dataIndex: 'discount_type',
      key: 'discount_type'
    },
    {
      title: 'Gia tri',
      dataIndex: 'discount_value',
      key: 'discount_value'
    },
    {
      title: 'Ngày áp dụng',
      key: 'date',
      render: (_: any, record: IDiscounts) => {
        if (Array.isArray(record.date) && record.date.length > 0) {
          const start = record.date[0] ? new Date(record.date[0]).toLocaleDateString() : '--'
          const end = record.date[1] ? new Date(record.date[1]).toLocaleDateString() : '--'
          return (
            <span>
              {start} - {end}
            </span>
          )
        }
        return <span>--</span>
      }
    },
    {
      title: 'Trang thai',
      dataIndex: 'status',
      key: 'status',
      render:(status:string, record:IDiscounts) => (
        <Switch
          checked={status === 'active'}
          checkedChildren='active'
          unCheckedChildren='inactive'
          onChange={async (checked) => {
            try {
              await api.put(`api/discounts/${record._id}`, {
                status:checked ? 'active' :'inactive'
              })
              message.success('Cap nhat trang thai thanh cong')
              queryClient.invalidateQueries({ queryKey:['discounts'] })
            } catch (error) {
              console.log(error)
            }
          }}

        />
      )
    },
    {
      title: 'Thao tac',
      dataIndex: 'id',
      key: 'id',
      render:(_:any, record:IDiscounts) => (
        <>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => Del (record._id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Link to={`/discounts/update/${record._id}`}>
            <Button type='primary'>Edit</Button>
          </Link>
        </>
      )
    }
  ]

  return (
    <div>
      <Link to={'/discounts/add'}>
        <Button type='primary' style={{ marginBottom:20 }}>Them khuyen mai</Button>
      </Link>
      <Table
        dataSource={Array.isArray(data) ? data : []}
        columns={columns}
        rowKey={record => record._id}
      />
    </div>
  )
}

export default Discounts