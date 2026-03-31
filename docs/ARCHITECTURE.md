# Kiến trúc Hệ thống (ARCHITECTURE.md)

Tài liệu này cung cấp cái nhìn tổng quan về cách dự án được tổ chức và cấu trúc của một ứng dụng Monorepo sử dụng **Nx**.

## 1. Monorepo là gì? Tại sao dùng Nx?

Thay vì chia dự án thành nhiều Repository riêng biệt (Frontend, Backend, Shared Libs), chúng ta gom tất cả vào một Repository duy nhất được quản lý bởi **Nx**.

**Lợi ích đối với dự án này:**
- **Shared Code**: Dễ dàng chia sẻ các `types`, `interfaces`, `validation schemas` giữa Frontend và Backend (nằm trong `libs/shared-types`).
- **Unified Testing**: Chạy test cho toàn bộ hệ thống chỉ với một lệnh duy nhất.
- **Dependency Management**: Phiên bản các thư viện (như TypeScript, NestJS, React) luôn đồng bộ trên tất cả ứng dụng.

## 2. Cấu trúc thư mục dự án

```text
multi-tenant-project-manager/
├── apps/               # Các ứng dụng có thể deploy được
│   ├── frontend/       # Website React 19 + Vite
│   └── backend/        # NestJS 11 + MikroORM
├── libs/               # Mã nguồn chia sẻ (Shared Libraries)
│   └── shared-types/   # Các kiểu dữ liệu dùng chung (DTOs, Interfaces)
├── docs/               # Tài liệu hướng dẫn (Đây là nơi bạn đang đọc)
├── nx.json             # Cấu hình dự án Nx
├── package.json        # Danh sách dependency và scripts chính
└── tsconfig.base.json  # Cấu hình TypeScript cơ sở cho toàn bộ Repo
```

## 3. Luồng dữ liệu và thiết kế Multi-tenancy

Dự án sử dụng mô hình **Shared Database, Shared Schema** với **Discriminator Column** (Cột phân loại) để phân tách dữ liệu.

### Luồng yêu cầu (Request Flow):
1.  **Client (Frontend)**: Gửi request đính kèm JWT Token trong header `Authorization`.
2.  **API Gateway (NestJS Interceptor)**:
    - Bắt lấy request.
    - Giải mã JWT để lấy `tenantId` (ID của doanh nghiệp).
    - Áp dụng **MikroORM Filter** toàn cục cho `EntityManager`.
3.  **Database Query**: Các truy vấn SQL sẽ tự động được thêm điều kiện `WHERE tenant_id = '...'`.
4.  **Response**: Trả về dữ liệu đã được lọc sạch, chỉ thuộc về Tenant đó.

> [!IMPORTANT]
> Toàn bộ logic lọc dữ liệu theo Tenant được thực hiện tự động ở tầng ORM. Developer không cần viết `WHERE tenantId = ...` thủ công trong các Service.

## 4. Giao tiếp giữa Frontend và Backend

- **Restful API**: Sử dụng phương thức chuẩn (GET, POST, PATCH, DELETE).
- **Authentication**: JWT (JSON Web Token) được lưu trữ an toàn.
- **DTOs (Data Transfer Objects)**: Được định nghĩa trong `shared-types` để đảm bảo sự nhất quán về kiểu dữ liệu khi truyền nhận.

## 5. Các ứng dụng chính

### 🚀 Backend (NestJS)
- Quản lý Logic nghiệp vụ (Business Logic).
- Tương tác Cơ sở dữ liệu (MikroORM).
- Bảo mật và Phân quyền (Auth/Guard).

### 🎨 Frontend (React)
- Dashboards và CMS UI.
- Quản lý trạng thái giao diện.
- Tích hợp với Backend API thông qua Axios.

---

**Tiếp theo**: Hãy đọc **[Hướng dẫn Backend (BACKEND.md)](./BACKEND.md)** để hiểu sâu hơn về code Server.
