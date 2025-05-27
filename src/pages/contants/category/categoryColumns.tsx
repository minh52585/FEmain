import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Popconfirm, Button } from "antd";
import { Link } from "react-router";

export const getCategoryColumns = (queryClient: any, DelCategory: (id: string) => void) => [
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