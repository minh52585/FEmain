import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Switch, Table } from 'antd'
import { Link } from 'react-router'
import { IDiscounts } from '../../types/discounts.ts'
import api from '@/config/axios.customize.ts'
import { PlusOutlined } from '@ant-design/icons'

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
      title: 'ID',
      key: 'id',
      render:(_:any, __:any, index:number) => index + 1
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productID',
      key: 'productID'
    },
    {
      title: 'Mã biến thể',
      dataIndex: 'variantID',
      key: 'variantID'
    },
    {
      title: 'Phân loại',
      dataIndex: 'discount_type',
      key: 'discount_type'
    },
    {
      title: 'Giá trị',
      dataIndex: 'discount_value',
      key: 'discount_value'
    },
    {
      title: 'Thời gian áp dụng',
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
      title: 'Trạng thái',
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
              message.success('Cập nhật trạng thái thành công')
              queryClient.invalidateQueries({ queryKey:['discounts'] })
            } catch (error) {
              console.log(error)
            }
          }}

        />
      )
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      key: 'id',
      render:(_:any, record:IDiscounts) => (
        <>
          <Popconfirm
            title="Xoá khuyến mại này?"
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => Del (record._id)}
          >
            <Button danger></Button>
          </Popconfirm>
          <Link to={`/discounts/update/${record._id}`}>
            <Button type='primary'></Button>
          </Link>
        </>
      )
    }
  ]

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
        <h1>Danh sách khuyến mại</h1>
        <Link to={'/discounts/add'}>
          <Button icon={<PlusOutlined />} size="small" style={{ backgroundColor: "white", color: "dodgerblue", borderColor: "dodgerblue" }}></Button>
        </Link>
      </div>
      <Table
        dataSource={Array.isArray(data) ? data : []}
        columns={columns}
        rowKey={record => record._id}
      />
    </>
  )
}

export default Discounts