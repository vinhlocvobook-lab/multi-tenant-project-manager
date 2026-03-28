---
title: "Product Brief Distillate: Multi-tenant Project Manager"
type: llm-distillate
source: "product-brief-multi-tenant-project-manager.md"
created: "2026-03-28T11:08:00Z"
purpose: "Token-efficient context for downstream PRD creation"
---

# Product Brief Distillate: Multi-tenant Project Manager

## Định danh Dự án
- Tên: Multi-tenant Project Manager (AI-Powered)
- Ngôn ngữ tài liệu: Tiếng Việt
- Giai đoạn: Product Brief hoàn thành → bước tiếp theo là PRD

## Vấn đề Cốt lõi
- Thông tin dự án bị phân tán: Teams chat, Excel file cá nhân, Email, OneDrive không cấu trúc
- Sếp/Leader không giám sát được tiến độ thực tế → phải đi hỏi từng người
- Nhân viên mất 30-40% thời gian copy dữ liệu thủ công từ email/PDF → form quản lý
- Email khách hàng vào hộp thư cá nhân, không phân công, không lịch sử, không accountability

## Kiến trúc Multi-tenant
- Mỗi công ty là một tenant độc lập, dữ liệu hoàn toàn cô lập
- Cấu trúc: Tenant → Company → Departments → Users → Projects
- Phòng ban điển hình: BGĐ, Sale, Pre-sale (Kỹ thuật), Post-sale, Mua hàng, Kế toán, Pháp nhân, Bảo hành
- TenantId bắt buộc trong mọi database query và API call (Row-level security)

## Quy trình Nghiệp vụ (Business Flows)
### Báo giá
- Sale nhận yêu cầu từ KH → tạo Project/Opportunity
- Pre-sale tham gia tư vấn giải pháp kỹ thuật
- Sale nhờ Mua hàng xin giá từ nhiều NCC khác nhau
- Mua hàng nhập giá (qua AI hoặc thủ công)
- Sếp so sánh giá NCC, chốt lợi nhuận, phê duyệt báo giá
- Sale gửi email báo giá cho KH trực tiếp từ hệ thống
- KH phản hồi qua email → hệ thống nhận, phân công cho nhân viên xử lý
- Giá cả và danh mục hàng hoá thay đổi theo thời điểm — hệ thống cần versioning

### Đấu thầu
- Chuẩn bị hồ sơ gồm: Hồ sơ kỹ thuật, Báo giá, Pháp nhân, Năng lực
- Cần kho lưu trữ hồ sơ mẫu tái sử dụng được
- AI hỗ trợ lắp ghép hồ sơ (roadmap năm 2)

### Triển khai (Post-sale)
- Post-sale nhận thông tin triển khai từ KH
- Phối hợp với NCC để triển khai hệ thống tại KH
- Ghi nhận tiến độ, issue trong hệ thống

### Bảo hành
- Hỗ trợ KH làm việc với NCC cho các yêu cầu bảo hành
- Cần tracking ticket bảo hành và SLA

## Tính năng AI & Tự động hóa
- **Email Ingestion:** Nhân viên forward email (+ file đính kèm) vào địa chỉ hệ thống
- AI phân tích: text, CSV, Word, Excel, PDF, ZIP/RAR — trích xuất dữ liệu cấu trúc
- Luồng bắt buộc: AI trích xuất → nhân viên xem lại và xác nhận → lưu vào DB (không được skip)
- Triết lý: "AI hỗ trợ, con người kiểm soát" — không để AI tự lưu trực tiếp
- LLM hỗ trợ nhập liệu trong form (auto-fill, suggest)
- Tương lai: AI xếp hạng NCC theo giá/uy tín/tốc độ từ dữ liệu lịch sử

## Email Command Center
- **Email Provider hỗ trợ:** Gmail (Google OAuth), Microsoft Mail (Outlook/Exchange - OAuth), SMTP tùy chỉnh, POP3 — thiết kế theo chuẩn pluggable provider
- Mỗi tenant cấu hình email provider riêng của họ (không dùng chung hộp thư hệ thống)
- Hòm thư hệ thống nhận email từ KH/NCC
- AI phân loại và phân công cho nhân viên phụ trách
- Nhân viên xử lý và reply trực tiếp từ trong hệ thống
- Toàn bộ email thread được gắn vào ngữ cảnh Project cụ thể
- Sale gửi email báo giá trực tiếp từ màn hình Project
- Lưu trữ lịch sử liên lạc đầy đủ trong dự án
- Cần chống spam: email gateway + domain whitelist + AI phân loại

## Tích hợp Microsoft Teams
- Chiến lược "Bridge → Own": Sync Teams trước → dần xây tính năng riêng → giảm phụ thuộc Teams
- Sync: Teams Channels, Chats (kể cả Replies), Document references
- Phân loại Teams data theo Project trong ứng dụng
- Giả định: MS Teams API ổn định — rủi ro thấp-trung, cần module tách biệt để fallback nếu cần
- Tương lai: Xoá bỏ hoàn toàn phụ thuộc vào Teams

## Quản lý Document
- Lưu trữ trên OneDrive HOẶC Google Drive (KH chọn)
- File tải lên từ Email được preview trực tiếp trong ứng dụng
- Cần versioning cho báo giá và hồ sơ thầu
- Tổ chức file theo cấu trúc dự án chuẩn (không để người dùng tự lưu lung tung)

## Tích hợp VoIP
- SIP WebRTC qua Asterisk server của KH
- Kiến trúc: Frontend (SIP.js/JsSIP) ↔ WSS ↔ Asterisk ↔ SRTP media
- Cuộc gọi được thực hiện trực tiếp từ giao diện Project/Contact
- Cần STUN/TURN server cho NAT traversal
- Cần JWT-based credential exchange (không để lộ SIP credentials ở frontend)
- Bước 1 MVP: Gọi thoại cơ bản. Tương lai: Video call, Record call

## Thiết bị & Nền tảng
- Bước 1: Web App Responsive (Desktop + Tablet + Mobile) — ưu tiên
- Bước 2: Native App (Android + iOS) — roadmap năm 1-2
- Người dùng ngoài hiện trường (Post-sale kỹ thuật) cần Mobile responsive tốt

## Đối tượng Người dùng (Personas)
- **BGĐ/Sếp:** Dashboard real-time, phê duyệt 1-click, không cần nhập liệu
- **Leader/PM:** Giao việc, theo dõi tiến độ đa project, xem bottleneck
- **Sale:** Tạo opportunity → báo giá → gửi email KH → theo dõi phản hồi
- **Pre-sale:** Tư vấn giải pháp, đính kèm spec kỹ thuật vào project
- **Mua hàng:** Nhập giá NCC (qua AI email), so sánh, lưu lịch sử
- **Post-sale:** Nhận bàn giao, triển khai, log tiến độ
- **Kế toán/Pháp nhân:** Quản lý kho hồ sơ, không cần nhập liệu nhiều
- **Bảo hành:** Ticket tracking, phối hợp NCC

## Ý tưởng Bị Loại Khỏi MVP (Captured for Reference)
- Tích hợp ERP/Kế toán: chưa định hướng, để sau
- Native App: rõ ràng đưa vào roadmap năm 2, không phải MVP
- AI tự động lưu dữ liệu không qua xác nhận: bị loại vì rủi ro chính xác

## Quyết định Đã Xác nhận (Resolved Decisions)

- **Email providers:** Hỗ trợ Gmail (Google OAuth), Microsoft Outlook/Exchange (OAuth), SMTP tùy chỉnh, POP3 — thiết kế pluggable, tenant tự cấu hình
- **Quy trình phê duyệt:** Team Lead hoặc cấp cao hơn phê duyệt (không phải 1 người duy nhất). Hệ thống phân cấp: Staff → Team Lead → Manager → Director. Mỗi tenant có thể cấu hình chuỗi phê duyệt theo cấu trúc phòng ban riêng.
- **Phân quyền (RBAC):** Người dùng chỉ xem và thao tác những Project/nội dung mà họ được tham gia hoặc được cấp quyền. Không có quyền xem toàn bộ theo mặc định.
- **Multi-language:** Hỗ trợ Tiếng Việt + Tiếng Anh từ đầu. Mặc định: Tiếng Việt. Người dùng có thể tự chuyển đổi ngôn ngữ. Kiến trúc i18n cần thiết kế từ đầu.
- **Tenant Onboarding:** Hỗ trợ cả 2 đường: (1) Self-service — tenant tự đăng ký và cấu hình; (2) Super Admin tạo thủ công qua admin portal. Cần có màn hình Super Admin riêng biệt với tenant portal.
- **Asterisk/VoIP:** Hỗ trợ cả 2 mode: (1) Dedicated — Mỗi tenant kết nối Asterisk server riêng; (2) Shared — Nhiều tenant dùng chung 1 Asterisk multi-tenant. Cần cấu hình linh hoạt per-tenant.
- **Notification:** Cả 2 kênh: Email Notification + Push Notification (Web Push trước, Mobile Push sau khi có app native). Nhân viên có thể tùy chỉnh kênh nhận thông báo.

## Câu hỏi Mở (Open Questions) — Còn lại cho PRD
- **Pricing Model:** Mô hình pricing cho SaaS này là gì? Per-user, per-tenant, hay theo module tính năng?
- **Mobile RBAC:** Khi dùng mobile app (roadmap năm 2), phân quyền có khác desktop không? Có tính năng nào bị giới hạn trên mobile?
- **Offline support:** Post-sale kỹ thuật khi đi hiện trường, nếu mất mạng thì app mobile có cần offline mode không?

## Chỉ số Thành công MVP
- Giảm 40% thời gian soạn báo giá và xử lý email NCC/KH
- 100% việc có task được giao + deadline rõ ràng, không còn "quên việc"
- 80% nhân viên chuyển từ Excel rời rạc sang hệ thống trong 3 tháng đầu
- Sếp không còn phải hỏi "Dự án đến đâu rồi?" — dashboard trả lời thay
