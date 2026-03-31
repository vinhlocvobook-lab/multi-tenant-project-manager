# Tài liệu Dự án Multi-tenant Project Manager

Chào mừng bạn đến với tài liệu hướng dẫn dành cho nhà phát triển của dự án **Multi-tenant Project Manager**. Tài liệu này được thiết kế theo dạng tutorial để giúp những nhà phát triển mới dễ dàng tiếp cận, hiểu rõ cấu trúc mã nguồn và bắt đầu đóng góp cho dự án.

## Giới thiệu dự án

Dự án này là một hệ thống quản lý dự án đa người dùng (Multi-tenant) mạnh mẽ, được xây dựng trên nền tảng Nx Monorepo, cho phép nhiều doanh nghiệp (Tenant) sử dụng chung một hệ thống nhưng dữ liệu hoàn toàn tách biệt.

### Mục tiêu tài liệu
- Giúp developer hiểu kiến trúc Monorepo.
- Giải thích cơ chế cô lập dữ liệu (Data Isolation) giữa các Tenant.
- Hướng dẫn cài đặt và vận hành hệ thống cục bộ (local).
- Quy định về coding standard và quy trình phát triển.

## Danh mục tài liệu

Để bắt đầu, bạn hãy làm quen với các phần sau:

1.  **[Kiến trúc hệ thống (ARCHITECTURE.md)](./ARCHITECTURE.md)**: Tổng quan về Nx, cách phân chia apps/libs và luồng dữ liệu.
2.  **[Cơ sở dữ liệu (DATABASE.md)](./DATABASE.md)**: Thiết kế Schema, quan hệ thực thể và cách quản lý Migrations.
3.  **[Hướng dẫn Backend (BACKEND.md)](./BACKEND.md)**: Chi tiết về NestJS, MikroORM, Multi-tenancy filter và Security (Auth/Roles).
4.  **[Hướng dẫn Frontend (FRONTEND.md)](./FRONTEND.md)**: Cách sử dụng React 19, Tailwind CSS 4 và cấu trúc Component/Pages.
5.  **[Hành trang bắt đầu (DEVELOPMENT_GUIDE.md)](./DEVELOPMENT_GUIDE.md)**: Hướng dẫn cài đặt môi trường, chạy script và tạo module mới.
6.  **[Hướng dẫn Triển khai (DEPLOYMENT.md)](./DEPLOYMENT.md)**: Cách đưa ứng dụng lên môi trường Production.

---

## Technical Stack (Sơ lược)

| Thành phần | Công nghệ |
| :--- | :--- |
| **Monorepo** | [Nx](https://nx.dev/) |
| **Backend** | [NestJS 11](https://nestjs.com/), [MikroORM 6](https://mikro-orm.io/) |
| **Database** | MariaDB |
| **Frontend** | [React 19](https://react.dev/), [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Language** | TypeScript |

---

> [!TIP]
> Hãy bắt đầu từ file **ARCHITECTURE.md** để có cái nhìn tổng quan nhất trước khi đi sâu vào code cụ thể.
