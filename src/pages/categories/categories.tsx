import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import { Link } from "react-router";

const onDelete = (id:number) => {
  console.log("Xoá danh mục", id);
}

const data = [
  {
    id: 1,
    name: "Tâm lý học",
    slug: "tam-ly-hoc",
    description: "Sách khám phá hành vi, cảm xúc và tâm trí con người.",
    image_url: "https://rg.com.vn/OuV1K",
    status: "OFF",
    created_at: "2025-05-19T00:00:00Z",
    update_at: "2025-05-19T00:00:00Z",
  },
  {
    id: 2,
    name: "Phát triển bản thân",
    slug: "phat-trien-ban-than",
    description: "Sách hướng dẫn và truyền động lực để cải thiện cuộc sống.",
    image_url: "https://rg.com.vn/MtZMq",
    status: "ON",
    created_at: "2025-05-19T00:00:00Z",
    update_at: "2025-05-19T00:00:00Z",
  },
  {
    id: 3,
    name: "Lãng mạn",
    slug: "lang-man",
    description: "Những câu chuyện tình yêu cảm động.",
    image_url: "https://rg.com.vn/GrvKc",
    status: "ON",
    created_at: "2025-05-19T00:00:00Z",
    update_at: "2025-05-19T00:00:00Z",
  },
  {
    id: 4,
    name: "Trinh thám",
    slug: "trinh-tham",
    description: "Sách ly kỳ, bí ẩn và hấp dẫn với các vụ án và điều tra.",
    image_url: "https://rg.com.vn/hqUew",
    status: "OFF",
    created_at: "2025-05-19T00:00:00Z",
    update_at: "2025-05-19T00:00:00Z",
  },
  {
    id: 5,
    name: "Tiểu thuyết",
    slug: "tieu-thuyet",
    description: "Những câu chuyện hư cấu thuộc nhiều thể loại khác nhau.",
    image_url: "https://rg.com.vn/qHTdo",
    status: "ON",
    created_at: "2025-05-19T00:00:00Z",
    update_at: "2025-05-19T00:00:00Z",
  },
];

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Hình ảnh",
    dataIndex: "image_url",
    key: "image_url",
    render: (image_url: string) => <img src={image_url} style={{ width: 40, height: 60, objectFit: "cover" }} />
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const isOn = status === "ON";
      const backgroundColor = isOn ? "#e6ffe6" : "#ffe6e6";
      const textColor = isOn ? "limegreen" : "tomato";
      return (
        <span style={{ backgroundColor, color: textColor, fontWeight: 600, padding: "3px 6px", borderRadius: "17px", display: "inline-block" }}>
          {status}
        </span>
      )
    }
  },
  {
    title: "Hành động",
    key: "action",
    render: (_: any, record: any) => (
      <Space>
        <Popconfirm title="Xoá danh mục này?" onConfirm={() => onDelete(record.id)} okText="Xoá" cancelText="Huỷ">
          <Button icon={<DeleteOutlined />} size="small" style={{ backgroundColor: "white", color: "red", borderColor: "red" }}></Button>
        </Popconfirm>
        <Link to={`/categories/edit/${record.id}`}>
          <Button icon={<EditOutlined />} size="small" style={{ backgroundColor: "white", color: "green", borderColor: "green" }}></Button>
        </Link>
      </Space>
    )
  }
];

const Categories = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
        <h1>Danh mục sách</h1>
        <Link to={`/categories/add`}>
          <Button icon={<PlusOutlined />} size="small" style={{ backgroundColor: "white", color: "dodgerblue", borderColor: "dodgerblue" }}></Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 3 }}/>
    </>
  )
}

export default Categories