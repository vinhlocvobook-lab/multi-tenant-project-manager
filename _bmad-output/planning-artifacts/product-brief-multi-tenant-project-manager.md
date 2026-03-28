---
title: "Product Brief: Multi-tenant Project Manager (AI-Powered)"
status: "complete"
created: "2026-03-28T11:00:00Z"
updated: "2026-03-28T11:07:00Z"
inputs: ["User brain dump", "Web research findings", "Multi-lens reviewer feedback"]
---

# Product Brief: Multi-tenant Project Manager

## Executive Summary

Hệ thống Quản lý Dự án Đa doanh nghiệp (Multi-tenant) tích hợp AI là một **Trung tâm Điều hành thông minh (Smart Operations Hub)** — một nền tảng quản trị tập trung, giải quyết triệt để sự rời rạc trong phối hợp liên phòng ban. Bằng cách kết nối với hệ sinh thái hiện tại (Microsoft Teams, Email, Cloud Storage) và ứng dụng trí tuệ nhân tạo (LLM), hệ thống tự động hóa việc nhập liệu, quản lý hồ sơ, giao tiếp với khách hàng và theo dõi tiến độ thời gian thực.

Tại sao lúc này? Các doanh nghiệp vừa và nhỏ đang "bơi" trong biển thông tin từ Teams, Excel và Email — nhưng thiếu một "sợi dây liên kết" để biết ai đang làm gì và dự án đang ở bước nào. Thay vì ép buộc thay đổi thói quen, hệ thống sẽ "ký sinh thông minh" vào các công cụ hiện có, đồng thời dần thay thế chúng bằng luồng công việc chuyên sâu hơn.

## The Problem (Vấn đề)

1. **Thông tin bị phân tán:** Dữ liệu dự án "kẹt" trong chat Teams, file Excel cá nhân, Email và thư mục OneDrive không có cấu trúc. Không ai có cái nhìn tổng thể.
2. **Sếp không kiểm soát được tiến độ:** Không có dashboard, Leader phải đi hỏi từng người, từng nhóm. Dự án trễ hạn và quên việc là chuyện thường ngày.
3. **Nhập liệu thủ công ăn mòn hiệu suất:** Nhân viên mất 30-40% thời gian chỉ để copy dữ liệu từ Email, báo giá PDF của nhà cung cấp vào các bảng tính quản lý — đây là công việc không tạo giá trị và dễ gây sai sót.
4. **Giao tiếp với khách hàng thiếu hệ thống:** Email khách hàng đến hộp thư cá nhân, ai nhận thì người đó xử lý, không có lịch sử, không có phân công, không có trách nhiệm rõ ràng.

## The Solution (Giải pháp)

Bốn trụ cột chính của hệ thống:

1. **Chiến lược "Bắc cầu" (Bridge → Own):** Sync dữ liệu từ MS Teams (Channels, Chats, Documents) để phân loại theo Project. Người dùng không phải thay đổi thói quen ngay — hệ thống sẽ "đọc" Teams và hiển thị mọi thứ theo ngữ cảnh dự án. Sau đó dần dần mở rộng tính năng nội bộ và giảm phụ thuộc vào Teams.

2. **AI-first Data Entry (Nhập liệu bằng AI):** Nhân viên chỉ cần forward Email (kèm file PDF/Excel/Word từ nhà cung cấp) vào hộp thư hệ thống. AI phân tích và tự động điền dữ liệu vào form báo giá. Luôn có bước "Xác nhận & Chỉnh sửa nhanh" bởi con người trước khi lưu — theo triết lý **"AI hỗ trợ, con người kiểm soát"**.

3. **Quản lý Email 360° (Email Command Center):** Hệ thống nhận email từ khách hàng, tự động phân bổ cho nhân viên phụ trách xử lý. Nhân viên xử lý xong có thể reply trực tiếp từ ứng dụng. Sale sau khi chốt báo giá có thể gửi email cho khách hàng trực tiếp từ màn hình dự án — toàn bộ lịch sử liên lạc được lưu lại đầy đủ trong ngữ cảnh của dự án đó.

4. **Quy trình Nghiệp vụ 360°:** Luồng công việc khép kín từ **Báo giá** (Sales + Mua hàng xin giá) → **Phê duyệt lợi nhuận** (Sếp chốt bằng một cú chạm) → **Đấu thầu** (lắp ghép hồ sơ) → **Triển khai** (Post-sale) → **Bảo hành** — tất cả trong một hệ thống duy nhất.

5. **Tích hợp Giao tiếp thời gian thực:** Gọi điện SIP/WebRTC (qua Asterisk) trực tiếp từ giao diện dự án. Chat nội bộ gắn vào ngữ cảnh từng dự án, từng tác vụ.

## What Makes This Different (Điểm khác biệt)

| Tính năng | Excel + Teams (Hiện tại) | Ứng dụng này |
|---|---|---|
| Nhập liệu | Thủ công 100% | AI đọc email/file, người kiểm tra |
| Giám sát tiến độ | Hỏi từng người | Dashboard real-time |
| Giao tiếp với KH | Email cá nhân | Hộp thư dự án, phân công rõ ràng |
| Gọi điện NCC | App ngoài | Tích hợp SIP ngay trong giao diện |
| Đấu thầu | Tự ghép hồ sơ | Template AI hỗ trợ |
| Dữ liệu NCC | Không có | Xếp hạng dựa trên lịch sử |

## Who This Serves (Đối tượng sử dụng)

- **Sếp & Leader:** Chốt lợi nhuận nhanh qua mobile, theo dõi "sức khỏe" đa dự án trên một dashboard.
- **Sales & Pre-sale:** Soạn báo giá, gửi email cho khách hàng và nhận phản hồi ngay trong ứng dụng.
- **Mua hàng:** Quản lý và so sánh giá từ nhiều nhà cung cấp, lịch sử giá được lưu tự động.
- **Kỹ thuật Post-sale:** Theo dõi tiến độ triển khai, phối hợp với NCC qua hệ thống.
- **Kế toán & Pháp nhân:** Kho hồ sơ năng lực, pháp nhân được tổ chức theo chuẩn, sẵn sàng cho mùa thầu.

## Roadmap & Lộ trình

**Giai đoạn MVP (6 tháng đầu):**
- ✅ Web App Responsive (Desktop, Tablet, Mobile)
- ✅ Hệ thống Multi-tenant (phân quyền theo Công ty & Phòng ban)
- ✅ Sync tích hợp MS Teams (Channels, Chats)
- ✅ Lưu trữ tài liệu qua OneDrive / Google Drive
- ✅ AI nhập liệu từ Email (PDF, Excel, Word, CSV, ZIP/RAR)
- ✅ **Email Command Center:** Nhận → Phân công → Xử lý → Reply từ hệ thống
- ✅ **Gửi Email Báo giá:** Sale gửi trực tiếp cho KH từ màn hình dự án
- ✅ Hệ thống Giao việc & Nhắc việc thông minh
- ✅ Dashboard tiến độ đa dự án (Sếp/Leader view)
- ✅ Tích hợp VoIP SIP/WebRTC (Asterisk)
- **Mục tiêu:** Giảm 40% thời gian xử lý thủ tục, loại bỏ hoàn toàn tình trạng quên việc.

**Giai đoạn Mở rộng (Năm 1-2):**
- 📱 Ứng dụng Native (Android/iOS)
- 🏆 **Supplier Intelligence:** AI xếp hạng nhà cung cấp theo giá, tốc độ, uy tín
- 📄 **Tự động hóa Hồ sơ Thầu:** AI lắp ghép hồ sơ năng lực, pháp nhân từ kho mẫu

**Giai đoạn Trưởng thành (Năm 3+):**
- 🧠 Dự báo lợi nhuận và win-rate thầu dựa trên dữ liệu lịch sử
- 🔗 Giảm hoàn toàn phụ thuộc vào MS Teams
- 🌐 Mở rộng đa quốc gia, đa ngôn ngữ

## Technical Risks & Mitigation

| Rủi ro | Mức độ | Giải pháp |
|---|---|---|
| AI đọc sai dữ liệu từ file lạ | Trung bình | Luồng "Xác nhận & Chỉnh sửa" bắt buộc |
| MS thay đổi chính sách Teams API | Thấp-Trung | Thiết kế module tách biệt, Teams là nguồn dữ liệu phụ |
| Spam email vào hệ thống | Trung bình | Email gateway + whitelist domain + AI phân loại |
| Bảo mật dữ liệu đa tenant | Cao | TenantId bắt buộc mọi query, Row-level Security |
