import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import { Link } from "react-router";
import { getCategoryColumns } from "../contants/category/categoryColumns";

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

const columns = getCategoryColumns(queryClient, DelCategory)

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