import { Table } from "antd";

const data = [
  {
    id: 1,
    usersName: "nminh",
    fullName: "Nhật Minh",
    email: "nminh@gmail.com",
    gender: "Nam",
    avatar_url: "https://i.pravatar.cc/100",
    phone: "0977 907 877",
    address: "Hà Nội",
    status: "ON",
    created_at: "2025-05-19T00:00:00Z",
    update_at: "2025-05-19T00:00:00Z",
  },
  {
    id: 2,
    usersName: "vhduy",
    fullName: "Hữu Duy",
    email: "vhduy@gmail.com",
    gender: "Nam",
    avatar_url: "https://i.pravatar.cc/200",
    phone: "0335 879 630",
    address: "TP Hồ Chí Minh",
    status: "ON",
    created_at: "2025-05-19T00:00:00Z",
    update_at: "2025-05-19T00:00:00Z",
  },
  {
    id: 3,
    usersName: "tampv",
    fullName: "Văn Tam",
    email: "tamka@gmail.com",
    gender: "Nữ",
    avatar_url: "https://i.pravatar.cc/300",
    phone: "0988 909 765",
    address: "Đà Nẵng",
    status: "OFF",
    created_at: "2025-05-19T00:00:00Z",
    update_at: "2025-05-19T00:00:00Z",
  },
  {
    id: 4,
    usersName: "quocanh",
    fullName: "Quốc Anh",
    email: "vqa@gmail.com",
    gender: "Nữ",
    avatar_url: "https://i.pravatar.cc/400",
    phone: "0788 808 158",
    address: "Quảng Ninh",
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
    title: "Tên đăng nhập",
    dataIndex: "usersName",
    key: "usersName"
  },
  {
    title: "Tên đầy đủ",
    dataIndex: "fullName",
    key: "fullName"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender"
  },
  {
    title: "Ảnh đại diện",
    dataIndex: "avatar_url",
    key: "avatar_url",
    render: (avatar_url: string) => <img src={avatar_url} style={{ width: 40, height: 40, objectFit: "cover" }} />
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone"
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const isActive = status === "ON";
      const backgroundColor = isActive ? "#e6ffe6" : "#ffe6e6";
      const textColor = isActive ? "limegreen" : "tomato";
      return (
        <span style={{ backgroundColor, color: textColor, fontWeight: 600, padding: "3px 6px", borderRadius: "17px", display: "inline-block" }}>
          {status}
        </span>
      )
    }
  },
  {
    title: "Hành động",
    dataIndex: "action",

  },
]

const Users = () => {
  return (
    <>
      <h1 style={{ marginBottom: 24 }}>Danh sách khách hàng</h1>
      <Table columns={columns} dataSource={data} rowKey="id" pagination={{pageSize: 4}}/>
    </>
  )
}

export default Users
