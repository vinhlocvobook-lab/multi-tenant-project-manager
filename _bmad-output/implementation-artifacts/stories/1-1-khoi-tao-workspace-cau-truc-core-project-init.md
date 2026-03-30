# Story 1.1: Khởi tạo Workspace & Cấu trúc Core (Project Init)

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Developer,
I want to initialize the Nx workspace with NestJS v11 and React v18,
so that I have a consistent, type-safe full-stack foundation for development.

## Acceptance Criteria

1. **Given** a clean project directory
2. **When** I run the Nx initialization and app generation commands
3. **Then** a monorepo structure is created with apps/backend (NestJS) and apps/frontend (React)
4. **And** shared libraries like @multi-tenant/shared-types are established
5. **And** the project builds successfully in development mode.

## Tasks / Subtasks

- [ ] 1. Khởi tạo Nx Workspace (AC: 1, 2)
  - [ ] Chạy lệnh `npx create-nx-workspace@latest multi-tenant-project-manager --preset=apps`
  - [ ] Thiết lập cấu trúc Monorepo
- [ ] 2. Tạo ứng dụng Backend (NestJS) (AC: 3)
  - [ ] Generate NestJS app trong `apps/backend`
  - [ ] Cấu hình cơ bản cho NestJS v11
- [ ] 3. Tạo ứng dụng Frontend (React) (AC: 3)
  - [ ] Generate React app trong `apps/frontend`
  - [ ] Thiết lập Vite/React v18+
- [ ] 4. Thiết lập Thư viện Shared Types (AC: 4)
  - [ ] Tạo library `@multi-tenant/shared-types` trong `libs/`
  - [ ] Khởi tạo các interface cơ bản (Tenant, User, etc.)
- [ ] 5. Kiểm tra Build & Chạy thử (AC: 5)
  - [ ] Chạy `npm run build` toàn dự án
  - [ ] Chạy thử backend và frontend đồng thời

## Dev Notes

- **Kiến trúc**: Sử dụng Nx Monorepo theo đúng [Source: _bmad-output/planning-artifacts/architecture.md#Technical Constraints & Dependencies]
- **Công cụ**: Sử dụng `npx create-nx-workspace` phiên bản mới nhất. Đảm bảo NestJS đạt version 11.
- **Quy tắc đặt tên**: Theo kebab-case cho apps và libs.

### Project Structure Notes

- **Backend**: apps/backend
- **Frontend**: apps/frontend
- **Shared Libs**: libs/shared-types

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1: Khởi tạo Workspace & Cấu trúc Core (Project Init)]
- [Source: _bmad-output/planning-artifacts/architecture.md#Technical Constraints & Dependencies]

## Dev Agent Record

### Agent Model Used

Antigravity (BMad Edition)

### Debug Log References

### Completion Notes List

### File List
