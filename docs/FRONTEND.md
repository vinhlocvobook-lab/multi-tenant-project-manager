# Hướng dẫn Frontend (FRONTEND.md)

Frontend của dự án được xây dựng bằng **React 19**, chạy trên nền tảng **Vite** cực nhanh và được trình bày đẹp mắt bởi **Tailwind CSS 4**.

## 1. Công nghệ Sử dụng

- **React 19**: Phiên bản mới nhất của React với hiệu năng cao.
- **Vite**: Công cụ build hiện đại thay thế cho Webpack truyền thống.
- **Tailwind CSS 4**: Bản cập nhật mới nhất với CSS-first configuration, mang lại trải nghiệm styling cao cấp.
- **React Router Dom 7**: Quản lý định tuyến (Routing).
- **Axios**: Gửi và nhận yêu cầu HTTP tới API.
- **Lucide React**: Kho icon hiện đại và nhẹ nhàng.

## 2. Cấu trúc Thư mục Frontend

```text
apps/frontend/src/app/
├── components/         # Các thành phần giao diện dùng chung
│   ├── layout/         # Header, Sidebar, Footer, AppLayout
│   └── ui/             # Buttons, Modals, Inputs (UI Kit)
├── contexts/           # Quản lý trạng thái toàn cục (AuthContext)
├── hooks/              # Custom Hooks xử lý Logic (useAuth, useFetch)
├── pages/              # Các trang chính (Login, Dashboard, Projects)
├── services/           # Định nghĩa các cuộc gọi API (Axios instance)
└── app.tsx             # Entry Point và định nghĩa Routes
```

## 3. Quản lý Trạng thái và Xác thực

Chúng ta sử dụng **React Context API** (`AuthContext`) để quản lý trạng thái đăng nhập của người dùng.

### Các thành phần quan trọng:
- **`AuthProvider`**: Bọc toàn bộ ứng dụng (`app.tsx`) để cấp phát quyền truy cập thông tin User.
- **`useAuth`**: Hook để lấy `user`, `tenantId` và hàm `login/logout` ở bất kỳ đâu.
- **`PrivateRoute`**: Một thành phần bảo vệ, tự động chuyển hướng người dùng về trang `/login` nếu họ chưa xác thực.

### Ví dụ sử dụng `useAuth`:
```tsx
const { user, logout } = useAuth();
return (
  <div>Chào mừng, {user.name}! <button onClick={logout}>Đăng xuất</button></div>
);
```

## 4. Styling với Tailwind CSS 4

Tailwind CSS 4 có cấu hình mạnh mẽ ngay trong file CSS chính (`apps/frontend/src/styles.css`).

- **Utility Classes**: Sử dụng trực tiếp trong `className` của React (e.g., `flex`, `items-center`, `p-4`).
- **Theming**: Màu sắc chủ đạo (Primary) được định nghĩa sẵn, giúp giao diện đồng nhất.
- **Glassmorphism**: Các hiệu ứng mờ (backdrop-blur) và bóng đổ (shadow) được ưu tiên để tạo cảm giác **Premium** (Cao cấp).

## 5. Quy chuẩn viết Component

1.  Dùng **Functional Components** với TypeScript (định nghĩa `props` clear).
2.  Ưu tiên chia nhỏ component thay vì viết một file quá lớn.
3.  Sử dụng `lucide-react` cho icon để đồng bộ thiết kế.
4.  Luôn xử lý trạng thái **Loading** và **Error** khi gọi API.

---

**Tiếp theo**: Hiểu về linh hồn của dữ liệu qua bài **[Cấu trúc Database (DATABASE.md)](./DATABASE.md)**.
