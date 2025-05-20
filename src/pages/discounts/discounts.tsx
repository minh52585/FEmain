import { Button, Popconfirm, Switch, Table } from 'antd'
import { Link } from 'react-router'

const Discounts = () => {

  const dataSource = [
    {
      _id: '1',
      products: 'Mike',
      variant: 'ao so mi cao co',
      discount_type: '%',
      discount_value: 10,
      description: '10 Downing Street',
      status: true,
      date: [new Date(), new Date()]
    },
    {
      _id: '2',
      products: 'Mike',
      variant: 'ao so mi cao co',
      discount_type: '%',
      discount_value: 10,
      description: '10 Downing Street',
      status: false,
      date: [new Date(), new Date()]
    }
  ]
  const columns = [
    {
      title: '#',
      key: 'id',
      render:(_:any, __:any, index:number) => index + 1
    },
    {
      title: 'products',
      dataIndex: 'products',
      key: 'products'
    },
    {
      title: 'variant',
      dataIndex: 'variant',
      key: 'variant'
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
      title: 'Mo ta',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Ngay bat dau',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date[]) => (
        <span>{date[0].toLocaleDateString()} - {date[1].toLocaleDateString()}</span>
      )
    },
    {
      title: 'Trang thai',
      dataIndex: 'status',
      key: 'status',
      render:(status:boolean) => (
        <Switch
          checked={status}
          checkedChildren='con'
          unCheckedChildren='het'
        />
      )
    },
    {
      title: 'Thao tac',
      dataIndex: 'id',
      key: 'id',
      render:() => (
        <>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Link to={'/discounts/update/1'}>
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
      <Table dataSource={dataSource} columns={columns} rowKey={(data) => data._id}/>
    </div>
  )
}

export default Discounts