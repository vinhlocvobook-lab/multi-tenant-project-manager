---
stepsCompleted: ["step-01-init", "step-02-discovery", "step-02b-vision", "step-02c-executive-summary", "step-03-success", "step-04-journeys", "step-05-domain", "step-06-innovation", "step-07-project-type", "step-08-scoping", "step-09-functional", "step-10-non-functional", "step-11-polish"]
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-multi-tenant-project-manager.md"
  - "_bmad-output/planning-artifacts/product-brief-multi-tenant-project-manager-distillate.md"
briefCount: 2
researchCount: 0
brainstormingCount: 0
projectDocsCount: 0
workflowType: 'prd'
classification:
  projectType: saas_b2b
  domain: enterprise_project_management
  complexity: high
  projectContext: greenfield
---

# Product Requirements Document - multi-tenant-project-manager

**Author:** Vovinhloc
**Date:** 2026-03-28

---

## Executive Summary

**Multi-tenant Project Manager** là nền tảng SaaS B2B quản lý toàn diện vòng đời dự án (Báo giá, Đấu thầu, Triển khai, Bảo hành) dành cho doanh nghiệp vừa tại Việt Nam. Hệ thống sử dụng kiến trúc đa doanh nghiệp (multi-tenant) để đảm bảo cô lập dữ liệu tuyệt đối trong khi tập trung hóa thông tin từ MS Teams, Email và tài liệu phân tán.

**Vấn đề cốt lõi:** Dữ liệu dự án bị xé lẻ giữa các công cụ giao tiếp (Email, Teams) và quản lý (Excel, OneDrive). Nhân viên mất 40% hiệu suất cho việc nhập liệu thủ công. Lãnh đạo thiếu dữ liệu thời gian thực để ra quyết định và xử lý tắc nghẽn.

**Tầm nhìn:** Chuyển đổi từ mô hình nhập liệu thủ công sang **AI-First Command Center**. AI gánh vác việc bóc tách dữ liệu phức tạp, con người đóng vai trò kiểm soát và ra quyết định. Doanh nghiệp vận hành tinh gọn, chính xác và chuyên nghiệp hơn.

## Project Classification

| Thuộc tính | Giá trị |
|---|---|
| **Loại hình** | SaaS B2B (Nền tảng đa doanh nghiệp) |
| **Lĩnh vực** | Quản trị Dự án & Vận hành Doanh nghiệp (Enterprise Project Management) |
| **Độ phức tạp** | Cao (Multi-tenancy, AI Multi-modal, Teams/VoIP integration) |
| **Ngữ cảnh** | Greenfield — xây dựng mới hoàn toàn |
| **Nền tảng** | Web Responsive (ưu tiên) → Native App (Mobile) |
| **Ngôn ngữ** | Tiếng Việt (chủ đạo), hỗ trợ Tiếng Anh |

## Success Criteria

### User Success
- **Khoảnh khắc "Aha!":** AI bóc tách báo giá NCC từ email/PDF thành dữ liệu cấu trúc trong < 15 giây.
- **Decision Clarity:** Lãnh đạo xác định ngay điểm tắc nghẽn (Who/Where/Why) qua dashboard mà không cần họp hỏi.
- **Process Professionalism:** Phản hồi khách hàng nhanh chóng với đầy đủ lịch sử trao đổi tập trung.

### Business Success
- **Mô hình doanh thu:** Hybrid (Platform fee + Per-user seats + AI Add-ons).
- **Thị phần:** Đạt 10-20 tenants đăng ký bản trả phí trong 12 tháng đầu.
- **Adoption:** 80% người dùng chuyển hẳn từ Excel sang hệ thống sau 90 ngày.

### Technical Success
- **AI Accuracy:** Đạt >85% độ chính xác bóc tách thông tin (Human-in-the-loop validation).
- **Security:** 100% cô lập dữ liệu giữa các Tenant ở mức Database.
- **Sync Performance:** Đồng bộ Teams và xử lý Email Ingestion trong < 30 giây.

## Product Scope & Phased Development

### 1. MVP Strategy (Phase 1): "AI-First Problem Solver"
Tập trung hóa giải "nỗi đau" nhập liệu và tập trung hóa dữ liệu đa nguồn.
- **Core Multi-tenant & RBAC:** Quản trị doanh nghiệp, phòng ban và phân quyền sâu.
- **AI-Powered Ingestion (V1):** Bóc tách đa thức (Email, PDF, Excel, Voice, Image).
- **Collaboration Bridge:** Đồng bộ MS Teams, Email Command Center.
- **Project Core:** Dashboard, Timeline, Phân loại priority (Dự án/Khách hàng).
- **Approval Flow:** Phê duyệt báo giá/đơn hàng 1 cấp.

### 2. Growth Phase (Phase 2): "Operational Depth"
- **Dedicated DB Provisioning:** Hỗ trợ database riêng cho khách hàng lớn.
- **Full Supply Chain:** Quản lý kho, bán hàng và công nợ chi tiết.
- **VoIP Integration:** Tích hợp gọi điện SIP WebRTC và ghi âm bằng chứng.
- **Advanced Approval:** Quy trình phê duyệt đa cấp theo điều kiện.

### 3. Vision Phase (Phase 3): "Intelligence & Global"
- **AI Autopilot:** Tự soạn hồ sơ thầu, dự báo rủi ro lợi nhuận.
- **Global Reach:** Đa tiền tệ, đa ngôn ngữ sâu.

## User Journeys

### 1. Tối ưu hóa Chi phí & Duyệt Báo giá
- **Bối cảnh:** Dự án thiết bị mạng phức tạp cần báo giá gấp.
- **Hành trình:** Sale forward email NCC -> AI bóc tách danh mục vật tư -> Mua hàng so sánh giá tự động -> Sếp duyệt dự toán chi phí trực quan trên Dashboard.
- **Kết quả:** Rút ngắn thời gian báo giá từ vài ngày xuống vài giờ.

### 2. Điều phối Nguồn lực & Xử lý Tắc nghẽn
- **Bối cảnh:** Dự án ưu tiên cao bị trễ tiến độ.
- **Hành trình:** Trưởng phòng xem Dashboard -> Phát hiện PM quá tải -> Sync hội thoại Teams thấy thiếu spec kỹ thuật -> Điều chuyển nhân sự hỗ trợ tức thì.
- **Kết quả:** Chuyển trạng thái dự án từ Đỏ sang Xanh nhanh chóng.

### 3. Hiện trường & Quyết toán Minh bạch
- **Bối cảnh:** Kỹ thuật hiện trường phát sinh vật tư.
- **Hành trình:** Chụp ảnh biên bản -> Upload qua Mobile App -> Kế toán nhận dữ liệu tức thì -> Quyết toán cuối tháng khớp 100% tài liệu thực tế.
- **Kết quả:** Loại bỏ hoàn toàn thất thoát chi phí ẩn.

## Technical & Compliance Requirements

### 1. Kiến trúc Đa doanh nghiệp (Hybrid Multi-tenancy)
- **Isolation:** Hỗ trợ Shared DB (lọc qua `tenantId`) và Dedicated DB cho khách hàng Enterprise.
- **Routing:** Connection Router tự động định tuyến truy vấn dựa trên định danh Tenant.
- **Onboarding:** Kết hợp Self-service (tự động) và Admin-assisted (thủ công cho gói lớn).

### 2. Bảo mật & Nhật ký (Audit & Security)
- **Immutable Log:** Ghi lại mọi hành động hệ thống (Who, When, What). Toàn bộ thread tài chính là bất biến.
- **Encryption:** Mã hóa dữ liệu khi lưu trữ (AES-256) và khi truyền tải (TLS 1.2+).
- **Internal Privacy:** AI được giới hạn phạm vi "đọc" theo quyền hạn thực tế của người dùng (RBAC).

### 3. AI Verification & Guardrails
- **State:** Dữ liệu AI luôn ở trạng thái "Pending Review" cho đến khi con người xác nhận.
- **Guardrails:** Tự động so sánh giá trích xuất với Product Catalog; cảnh báo đỏ nếu sai số > 20%.
- **Corrective Flow:** Tự động gắn nhãn "Cần hỗ trợ" nếu độ tin cậy AI thấp.

### 4. Chiến lược Tích hợp (Integrations)
- **Teams Bridge:** Đồng bộ hội thoại/tài liệu gắn chặt vào ngữ cảnh (Context) dự án. Chiến lược "Harvest to Replace".
- **Email Command Center:** Hệ thống đóng vai trò Proxy Email, bóc tách thực thể tự động.

## Functional Requirements

### 1. Quản trị Doanh nghiệp & Người dùng
- **FR1:** Hệ thống cô lập tuyệt đối dữ liệu giữa các Tenant.
- **FR2:** Người dùng có thể tự đăng ký và khởi tạo Tenant mới (Onboarding).
- **FR3:** Admin có thể tạo các Vai trò tùy chỉnh (Custom Roles) và gán quyền chi tiết.
- **FR4:** Hệ thống hạn chế quyền truy cập dựa trên sự kết hợp giữa Phòng ban và Vai trò.

### 2. Nhập liệu Đa thức bằng AI
- **FR5:** Hệ thống bóc tách dữ liệu có cấu trúc từ Email, PDF, Excel, Word.
- **FR6:** Người dùng có thể nhập liệu bằng giọng nói và quét hình ảnh hóa đơn qua Mobile.
- **FR7:** Người quản lý có thể đối soát (Side-by-side) dữ liệu AI trích xuất với tài liệu gốc.

### 3. Quản lý Dự án & Báo giá
- **FR8:** Người dùng có thể quản lý Product Catalog và so sánh giá NCC tự động.
- **FR9:** Hệ thống tính toán biên lợi nhuận và dự toán chi phí trực tiếp trên báo giá.
- **FR10:** Người dùng can gán độ ưu tiên và theo dõi Timeline dự án thời gian thực.

### 4. Collaboration & Audit
- **FR11:** Hệ thống đồng bộ chat/files từ MS Teams vào từng Project ID.
- **FR12:** Người dùng có thể gửi/nhận email và thực hiện cuộc gọi VoIP trực tiếp trong hệ thống.
- **FR13:** Hệ thống lưu trữ phiên bản bất biến của các quyết định phê duyệt tài chính.

## Non-Functional Requirements

### 1. Hiệu năng & Sẵn sàng
- **NFR1:** AI bóc tách tài liệu < 15 giây; Web page load < 2 giây.
- **NFR2:** Uptime đạt 99.9% trong giờ hành chính; hỗ trợ 50 users đồng thời/tenant.

### 2. Độ tin cậy & Phục hồi
- **NFR3:** Backup hàng ngày (RPO 1h, RTO 4h).
- **NFR4:** Tỷ lệ ghi âm cuộc gọi thành công đạt > 99%.

## Innovation & Novel Patterns

### 1. AI-First Command Center
Người dùng vận hành phần lớn thông qua việc forward/reply Email và Voice. Hệ thống đóng vai trò trợ lý chủ động phát hiện rủi ro (Risk Detection) từ "Tone Shift" trong hội thoại.

### 2. Chiến lược "Harvest to Replace"
Không ép người dùng bỏ Teams ngay. Hệ thống "thu hoạch" dữ liệu từ Teams để làm giàu project context, dần dần dẫn dắt họ sang dùng Native App để có trải nghiệm chuyên sâu hơn.
