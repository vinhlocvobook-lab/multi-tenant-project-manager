# Hướng dẫn Backend (BACKEND.md)

Chào mừng bạn đến với trung tâm điều khiển của hệ thống. Backend được xây dựng bằng **NestJS 11** và **MikroORM 6** với cấu trúc module chuyên nghiệp.

## 1. NestJS và Cấu trúc Module

Chúng ta tổ chức mã nguồn theo các **Feature Modules**. Mỗi module thường bao gồm:
- **`entities/`**: Mô hình dữ liệu tương ứng với database.
- **`dto/`**: Các đối tượng dữ liệu gửi lên hoặc trả về (Data Transfer Objects).
- **`*.controller.ts`**: Tiếp nhận và xử lý HTTP Request.
- **`*.service.ts`**: Chứa logic nghiệp vụ chính.
- **`*.module.ts`**: Đăng ký các thành phần trong module với NestJS.

### Các Module Chính:
- `AuthModule`: Xác thực JWT, đăng ký và đăng nhập.
- `TenantsModule`: Quản lý thông tin các tổ chức/doanh nghiệp sử dụng hệ thống.
- `UsersModule`: Quản lý người dùng, hồ sơ cá nhân.
- `ProjectsModule` & `TasksModule`: Nghiệp vụ cốt lõi về quản lý dự án.
- `CommonModule`: Chứa các thành phần dùng chung (Interceptors, Decorators, Base Entities).

## 2. Multi-tenancy (Cơ chế Đa người dùng)

Đây là phần quan trọng nhất của hệ thống. Mọi dữ liệu đều phải thuộc về một Tenant cụ thể.

### Cơ chế Hoạt động:
1.  **`BaseTenantEntity`**: Mọi thực thể (trừ chính bản thân Tenant và User hệ thống) đều phải kế thừa từ `BaseTenantEntity` (nằm trong `apps/backend/src/app/common/entities/`).
    ```typescript
    export abstract class BaseTenantEntity {
      @ManyToOne(() => Tenant)
      tenant!: Tenant;
      // ... id, createdAt, updatedAt
    }
    ```
2.  **`TenantInterceptor`**: Khi có yêu cầu gửi lên, Interceptor này sẽ kích hoạt Filter của MikroORM dựa trên `tenantId` lấy từ JWT.
3.  **ORM Filter**: Trong `mikro-orm.config.ts`, chúng ta định nghĩa filter `tenant` toàn cục:
    ```typescript
    filters: {
      tenant: {
        cond: (args) => ({ tenant: args.tenantId }),
        default: false,
      },
    },
    ```

> [!WARNING]
> Khi viết query SQL/ORM mới, tuyệt đối không được tắt filter này trừ khi bạn đang viết logic dành cho Admin hệ thống (SuperAdmin).

## 3. Quản lý Cơ sở dữ liệu với MikroORM

Chúng ta dùng **MariaDB** làm cơ sở dữ liệu chính.
Mọi thay đổi cấu trúc bảng phải được quản lý bằng **Migrations**. Tuyệt đối không sửa bảng trực tiếp trên database.

### Quy trình Migrations:
1. Sửa Entity trong code.
2. Chạy lệnh: `npx nx run backend:migrate-create --name=add-new-column`.
3. Kiểm tra file migration mới được tạo trong `apps/backend/src/migrations/`.
4. Chạy lệnh: `npx nx run backend:migrate-up` để áp dụng vào database local.

## 4. Xác thực và Bảo mật (Security)

Hệ thống sử dụng Passport.js với chiến lược **JWT Bearer Token**.

- **`JwtAuthGuard`**: Bảo vệ các API, chỉ cho phép người dùng đã đăng nhập.
- **`RolesGuard`**: Kiểm tra vai trò của người dùng (Admin, Member, Viewer).
- **`PermissionsGuard`**: Kiểm tra các quyền chi tiết hơn (Create Project, Delete Task...).

### Cách sử dụng Guards:
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Get('secret-data')
getData() { ... }
```

---

**Tiếp theo**: Tìm hiểu sự lung linh của giao diện qua **[Hướng dẫn Frontend (FRONTEND.md)](./FRONTEND.md)**.
