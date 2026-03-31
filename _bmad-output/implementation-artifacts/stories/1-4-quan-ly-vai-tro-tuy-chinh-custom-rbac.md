# Story 1.4: Quản lý Vai trò tùy chỉnh (Custom RBAC)

Status: ready-for-dev

## Story

As an Admin,
I want to create custom roles and assign specific permissions,
so that I can limit system access based on staff job functions.

## Acceptance Criteria

### 1. Quản lý Quyền (Permissions)
- **Given** I am a SuperAdmin or system maintainer
- **When** I look at the available permissions list
- **Then** I see granular entries like `projects.create`, `projects.view`, `tasks.delete`, `users.invite`
- **And** these permissions are system-defined and cannot be deleted by regular admins.

### 2. Tạo Vai trò tùy chỉnh (Custom Roles)
- **Given** I am an Admin of a specific Tenant
- **When** I create a new role named "Project Coordinator"
- **And** I select a subset of available permissions
- **Then** the role is saved and associated ONLY with my Tenant ID.

### 3. Gán Vai trò cho Người dùng
- **Given** a user "John Doe" in my Tenant
- **When** I edit John's profile and select the "Project Coordinator" role
- **Then** John's previous role is replaced by the new one
- **And** John's next request to the API will reflect these new permissions.

### 4. Áp dụng Quyền (Enforcement)
- **Given** a user has a role WITHOUT the `users.manage` permission
- **When** they try to access the user management API
- **Then** the system returns a `403 Forbidden` error
- **And** [UI] the user management link is hidden from their sidebar.

## Tasks / Subtasks

- [ ] **1. Cơ sở dữ liệu (Schema)**
  - [ ] Tạo entity `Permission` để lưu danh sách các quyền hệ thống.
  - [ ] Tạo entity `Role` gắn với `tenantId`.
  - [ ] Thiết lập quan hệ Many-to-Many giữa `Role` và `Permission`.
  - [ ] Cập nhật entity `User` để chuyển từ `Enum(UserRole)` sang `ManyToOne(() => Role)`.
- [ ] **2. Backend (NestJS Logic)**
  - [ ] Tạo `PermissionsGuard` để kiểm tra quyền hạn từ JWT payload hoặc database.
  - [ ] Sử dụng decorator `@RequirePermissions('projects.create')` trên các controllers.
  - [ ] Cập nhật `AuthService` để đính kèm danh sách permissions vào JWT token.
- [ ] **3. Frontend (React UI)**
  - [ ] Tạo component `PermissionGate` để ẩn hiện UI dựa trên quyền.
  - [ ] Xây dựng trang "Role Management" cho Admin (danh sách roles, chọn permissions).
- [ ] **4. Di trú Dữ liệu (Migration)**
  - [ ] Viết migration để chuyển đổi các users hiện tại sang các Role tương ứng (`admin` enum -> `Admin` record).

## Dev Notes

### Architecture Integration
- **Isolation**: Mọi vai trò mới tạo PHẢI thuộc về `tenantId` hiện tại. Không cho phép admin của tenant này gán vai trò của tenant khác.
- **Performance**: Nén danh sách permissions trong JWT (ví dụ dùng bitmask hoặc chuỗi viết tắt) để tránh token quá lớn. Hoặc sử dụng cơ chế cache permissions ở backend.
- **Fallback**: Luôn có các vai trò mặc định (`Admin`, `Member`) được tạo tự động khi một Tenant mới được onboard.

### Security Guardrails
- **Zero-Trust**: Mặc định là `Deny All`. Chỉ khi có permission cụ thể mới được truy cập.
- **Audit**: Mọi thay đổi về gán Role cho User phải được ghi log (story 7.3).

## References

- [Source: apps/backend/src/app/users/entities/user.entity.ts](file:///Users/vovinhloc/myworking/study/multi-tenant-project-manager/apps/backend/src/app/users/entities/user.entity.ts)
- [Architecture: Zero-Trust Identity & Isolation](file:///Users/vovinhloc/myworking/study/multi-tenant-project-manager/_bmad-output/planning-artifacts/architecture.md)
- [PRD: FR3, FR4](file:///Users/vovinhloc/myworking/study/multi-tenant-project-manager/_bmad-output/planning-artifacts/prd.md)
