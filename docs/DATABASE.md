# Cấu trúc Database (DATABASE.md)

Hệ thống sử dụng **MariaDB** làm cơ sở dữ liệu quan hệ, được quản lý thông qua **MikroORM 6**.

## 1. Mô hình Dữ liệu (Schema)

Kiến trúc dữ liệu được thiết kế theo hướng **Multi-tenancy**. Phần lớn các bảng đều có mối quan hệ trực tiếp hoặc gián tiếp với bảng `Tenant`.

### Các Thực thể Chính (Entities):
- **`Tenant`**: Đại diện cho một công ty hoặc tổ chức. Là gốc của mọi dữ liệu.
- **`User`**: Người dùng của hệ thống. Lưu ý: Một user thuộc về một Tenant cụ thể.
- **`Project`**: Các dự án được quản lý. Chứa `tenant_id`.
- **`Task`**: Các nhiệm vụ trong dự án. Kế thừa `BaseTenantEntity`.
- **`Department`**: Các phòng ban trong một tổ chức (Tenant).
- **`Partner`**: Đối tác hoặc khách hàng của Tenant.
- **`Role` & `Permission`**: Cấu hình phân quyền (RBAC) cho từng Tenant.

## 2. Thiết kế Quan hệ (Relationship)

Mọi thực thể thuộc về Tenant đều kế thừa lớp **`BaseTenantEntity`**.

- **Một-Nhiều (1-N)**:
  - Một `Tenant` có nhiều `Users`, `Projects`, `Departments`.
  - Một `Project` có nhiều `Tasks`.
- **Nhiều-Nhiều (N-N)**:
  - `User` có thể có nhiều `Roles`.
  - `Role` có nhiều `Permissions`.

## 3. Quản lý Migration

Chúng ta sử dụng **`@mikro-orm/migrations`** để kiểm soát sự thay đổi của cơ sở dữ liệu.

### Quy tắc quan trọng:
1.  **Tuyệt đối không chạy lệnh SQL `ALTER TABLE` trực tiếp trên database.**
2.  Mọi thay đổi phải đi qua file Migration được tạo tự động bởi MikroORM CLI.
3.  File Migration lưu tại: `apps/backend/src/migrations/`.

### Lệnh thực thi thông dụng:
| Lệnh | Ý nghĩa |
| :--- | :--- |
| `npm run backend:migrate-create` | Tạo file migration mới từ sự thay đổi trong Entity. |
| `npm run backend:migrate-up` | Áp dụng các migration chưa chạy vào Database. |
| `npm run backend:migrate-down` | Hoàn tác (Undo) migration gần nhất. |

## 4. Indexing và Hiệu năng

- Các cột `tenant_id` và `id` (UUID) luôn được đánh **Index** để đảm bảo tốc độ truy vấn nhanh chóng khi lọc dữ liệu theo doanh nghiệp.
- Sử dụng UUID v4 cho khoá chính (Primary Key) giúp đảm bảo tính duy nhất trên toàn hệ thống và bảo mật hơn so với ID tăng tự động (Auto-increment).

---

**Tiếp theo**: Hãy bắt tay vào làm việc thực tế với **[Hướng dẫn Phát triển (DEVELOPMENT_GUIDE.md)](./DEVELOPMENT_GUIDE.md)**.
