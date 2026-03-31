# Hành trang Bắt đầu (DEVELOPMENT_GUIDE.md)

Tài liệu này sẽ hướng dẫn bạn từng bước để thiết lập môi trường phát triển và bắt đầu viết code cho dự án.

## 1. Yêu cầu Hệ thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:
- **Node.js**: Phiên bản >= 20.x (Khuyên dùng v20.19.9).
- **Package Manager**: npm hoặc pnpm.
- **Database**: MariaDB (hoặc MySQL) đang chạy cục bộ hoặc trên Docker.
- **Nx CLI**: Cài đặt toàn cục bằng lệnh `npm install -g nx`.

## 2. Thiết lập Môi trường (Setup)

1.  **Clone mã nguồn**: `git clone <repo-url>`
2.  **Cài đặt Dependency**:
    ```bash
    npm install
    ```
3.  **Cấu hình biến môi trường**:
    - Copy file `.env.example` thành `.env`.
    - Cập nhật các thông số kết nối Database:
      ```text
      DB_HOST=localhost
      DB_PORT=3306
      DB_USER=root
      DB_PASSWORD=your_password
      DB_NAME=project_manager_db
      JWT_SECRET=your_jwt_secret
      ```
4.  **Tạo Database**: Chạy trong GUI SQL hoặc command line: `CREATE DATABASE project_manager_db;`
5.  **Chạy Migration**:
    ```bash
    npx nx run backend:migrate-up
    ```

## 3. Chạy Ứng dụng (Running)

Bạn có thể chạy song song cả Frontend và Backend bằng một lệnh Nx:

```bash
# Chạy toàn bộ Repo ở chế độ Development
npx nx run-many --target=serve --all

# Hoặc chạy riêng lẻ từng ứng dụng
npx nx serve backend
npx nx serve frontend
```

- **Backend** sẽ chạy tại: `http://localhost:3000/api`
- **Frontend** sẽ chạy tại: `http://localhost:4200`

## 4. Quy trình Phát triển (Workflow)

### Thêm một Module mới:
1.  **Backend**:
    - Dùng NX Generator: `npx nx generate @nx/nest:module my-feature --project=backend`.
    - Tạo Entity (nhớ kế thừa `BaseTenantEntity`).
    - Viết Service và Controller.
2.  **Frontend**:
    - Tạo Page mới trong `apps/frontend/src/app/pages/`.
    - Đăng ký Route trong `app.tsx`.
    - Sử dụng `AuthProvider` để lấy dữ liệu Tenant.

### Coding Style:
- **Linting**: Luôn chạy `npx nx lint <project>` trước khi commit.
- **Formatting**: Dự án sử dụng Prettier. Hãy thiết lập VSCode tự động format khi lưu (Format on Save).
- **Naming**:
  - Files: `kebat-case` (ví dụ: `project-dashboard.tsx`).
  - Classes: `PascalCase`.
  - Variables/Functions: `camelCase`.

## 5. Danh sách các Lệnh Nx Thông dụng

| Lệnh | Ý nghĩa |
| :--- | :--- |
| `nx serve <app>` | Chạy ứng dụng ở chế độ dev. |
| `nx build <app>` | Build ứng dụng cho production. |
| `nx test <app>` | Chạy unit test. |
| `nx lint <app>` | Kiểm tra lỗi code style. |
| `nx graph` | Xem sơ đồ phụ thuộc giữa các apps/libs. |

---

**Chúc mừng!** Bạn đã sẵn sàng để phát triển hệ thống **Multi-tenant Project Manager**. Nếu có bất kỳ thắc mắc nào, hãy liên hệ với Team Lead hoặc xem lại bộ tài liệu này.
