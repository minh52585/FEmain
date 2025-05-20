import { Button, Popconfirm, Switch, Table } from 'antd'
import { Link } from 'react-router'

const ProductsPage = () => {
  const dataSource = [
    {
      _id: '1',
      name: 'Mike',
      descriptions: '10 Downing Street',
      price: 32,
      quantity: 32,
      category: 'New York No. 1 Lake Park',
      upload: '10 Downing Street',
      status: true
    },
    {
      _id: '2',
      name: 'Mike',
      descriptions: '10 Downing Street',
      price: 32,
      quantity: 32,
      category: 'New York No. 1 Lake Park',
      upload: '10 Downing Street',
      status: false
    }
  ]

  const columns = [
    {
      title: '#',
      key: 'id',
      render:(_:any, __:any, index:number) => index + 1
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'descriptions',
      dataIndex: 'descriptions',
      key: 'descriptions'
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'upload',
      dataIndex: 'upload',
      key: 'upload',
      render:(Image:any) => <img src={Image} alt="Image" style={{ width:100, height:100 }} />
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Switch
          checked={status}
          checkedChildren="Con hang"
          unCheckedChildren="Hết hàng"
          style={{ minWidth: 100 }}
        />
      )
    },
    {
      title: 'action',
      dataIndex: 'id',
      key: 'id',
      render:() =>
        <>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Link to={'/products/update/1'}>
            <Button type='primary'>Edit</Button>
          </Link>
        </>
    }
  ]
  return (
    <div>
      <Link to={'/products/add'}>
        <div style={{ marginBottom:'20px' }}>
          <Button type='primary'>Them</Button>
        </div>
      </Link>
      <Table dataSource={dataSource} columns={columns} rowKey={(data) => data._id} />;
    </div>
  )
}

export default ProductsPage