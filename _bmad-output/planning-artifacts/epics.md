---
stepsCompleted: [1, 2, 3]
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
---

# multi-tenant-project-manager - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for multi-tenant-project-manager, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: Hệ thống cô lập tuyệt đối dữ liệu giữa các Tenant.
- FR2: Người dùng có thể tự đăng ký và khởi tạo Tenant mới (Onboarding).
- FR3: Admin có thể tạo các Vai trò tùy chỉnh (Custom Roles) và gán quyền chi tiết.
- FR4: Hệ thống hạn chế quyền truy cập dựa trên sự kết hợp giữa Phòng ban và Vai trò.
- FR5: Hệ thống bóc tách dữ liệu có cấu trúc từ Email, PDF, Excel, Word.
- FR6: Người dùng có thể nhập liệu bằng giọng nói và quét hình ảnh hóa đơn qua Mobile.
- FR7: Người quản lý có thể đối soát (Side-by-side) dữ liệu AI trích xuất với tài liệu gốc.
- FR8: Người dùng có thể quản lý Product Catalog và so sánh giá NCC tự động.
- FR9: Hệ thống tính toán biên lợi nhuận và dự toán chi phí trực tiếp trên báo giá.
- FR10: Người dùng can gán độ ưu tiên và theo dõi Timeline dự án thời gian thực.
- FR11: Hệ thống đồng bộ chat/files từ MS Teams vào từng Project ID.
- FR12: Người dùng có thể gửi/nhận email và thực hiện cuộc gọi VoIP trực tiếp trong hệ thống.
- FR13: Hệ thống lưu trữ phiên bản bất biến của các quyết định phê duyệt tài chính.

### NonFunctional Requirements

- NFR1: AI bóc tách tài liệu < 15 giây; Web page load < 2 giây.
- NFR2: Uptime đạt 99.9% trong giờ hành chính; hỗ trợ 50 users đồng thời/tenant.
- NFR3: Backup hàng ngày (RPO 1h, RTO 4h).
- NFR4: Tỷ lệ ghi âm cuộc gọi thành công đạt > 99%.

### Additional Requirements

- **Starter Template:** Nx Monorepo (Integrates NestJS v11 and React v18+).
- **Multi-tenancy:** Hybrid approach (Shared DB with MikroORM global filters + Dedicated DB for Enterprise).
- **Identity:** Single Domain, JWT-based tenant context extracted via middleware.
- **VoIP Architecture:** Direct JsSIP-to-Asterisk signaling; Record Path management via SIP headers (Inbound) and Client-derived logic (Outbound).
- **AI Ingestion Pipeline:** Asterisk records -> Shared Filesystem (/recordings) -> Webhook/Self-healing to NestJS -> AI Processing.
- **Data Pattern:** Shadow Data storage (AI-generated metadata with Confidence Scores).
- **Security:** HMAC/Shared Secret for webhooks + Strict Cross-tenant Isolation Unit Tests.

### UX Design Requirements

- UX-DR1: **Side-by-Side Verification UI**: High-fidelity view comparing original source documents (PDF/Image) with AI-extracted fields.
- UX-DR2: **Floating Call Control Panel**: Persistent UI element for call management (Dial, Mute, Transfer, Hang-up) integrated with JsSIP.
- UX-DR3: **Ghost Editing Indicators**: Visual cues (e.g., italics, colored borders) for fields populated by AI but not yet approved by a human.
- UX-DR4: **Bottleneck Dashboard**: Visual indicators (Red/Amber/Green) for projects with delays or high-risk conversations detected via AI Tone Shift.
- UX-DR5: **Mobile Document Scanner**: Interface for capturing and uploading receipts/documents with real-time feedback.

### FR Coverage Map

- FR1 (Isolation): Epic 1
- FR2 (Onboarding): Epic 1
- FR3 (Custom Roles): Epic 1
- FR4 (RBAC/Dept): Epic 1
- FR5 (AI Extraction): Epic 3
- FR6 (Mobile/Voice): Epic 6
- FR7 (Comparison UI): Epic 3
- FR8 (Catalog/Comparison): Epic 2
- FR9 (Margins/Estimation): Epic 2
- FR10 (Timeline/Priority): Epic 2
- FR11 (Teams Sync): Epic 5
- FR12 (VoIP/Email): Epic 4 (VoIP), Epic 5 (Email)
- FR13 (Financial Audit): Epic 7

## Epic List

### Epic 1: Nền tảng Đa doanh nghiệp & Phân quyền (Multi-tenant Foundation & RBAC)
Người dùng có thể đăng ký tài khoản doanh nghiệp, thiết lập sơ đồ tổ chức (phòng ban) và phân quyền chi tiết cho nhân viên một cách bảo mật tuyệt đối.
**FRs covered:** FR1, FR2, FR3, FR4.

### Epic 2: Quản lý Dự án & Danh mục Sản phẩm (Unified Project & Catalog Hub)
Người dùng có thể quản lý danh mục sản phẩm/dịch vụ, tạo dự án, theo dõi tiến độ (Timeline) và tính toán biên lợi nhuận trực quan.
**FRs covered:** FR8, FR9, FR10.

### Epic 3: Bóc tách dữ liệu AI & Đối soát (AI Ingestion & Verification)
Người dùng có thể đẩy tài liệu (Email, PDF, Excel) vào hệ thống để AI tự động trích xuất dữ liệu, sau đó kiểm tra và xác nhận thông qua giao diện đối soát "Side-by-Side".
**FRs covered:** FR5, FR7.

### Epic 4: Gọi điện & Ghi âm tích hợp (Integrated VoIP & Recording)
Người dùng có thể thực hiện cuộc gọi trực tiếp từ trình duyệt, quản lý cuộc gọi qua bảng điều khiển nổi (Floating Panel) và tự động ghi âm để làm bằng chứng.
**FRs covered:** FR12 (VoIP component).

### Epic 5: Trung tâm Cộng tác (MS Teams & Email Sync)
Người dùng có thể theo dõi toàn bộ lịch sử trao đổi từ MS Teams và Email gắn liền với ngữ cảnh của từng dự án cụ thể.
**FRs covered:** FR11, FR12 (Email component).

### Epic 6: Nghiệp vụ Hiện trường & Mobile Catch (Mobile Field Operations)
Nhân viên hiện trường có thể chụp ảnh hóa đơn, biên bản hoặc nhập liệu bằng giọng nói từ ứng dụng di động để đồng bộ về hệ thống trung tâm.
**FRs covered:** FR6.

### Epic 7: Quản trị Minh bạch & Dashboard Thông minh (Audit & Intelligence Dashboard)
Lãnh đạo có thể phát hiện các điểm tắc nghẽn dự án qua Dashboard và truy xuất lịch sử phê duyệt tài chính bất biến (không thể sửa xóa).
**FRs covered:** FR13.

## Epic 1: Nền tảng Đa doanh nghiệp & Phân quyền (Multi-tenant Foundation & RBAC)

Mục tiêu: Thiết lập "xương sống" cho toàn bộ hệ thống, cho phép khởi tạo môi trường làm việc cô lập và bảo mật cho từng doanh nghiệp.

### Story 1.1: Khởi tạo Workspace & Cấu trúc Core (Project Init)

As a Developer,
I want to initialize the Nx workspace with NestJS v11 and React v18,
So that I have a consistent, type-safe full-stack foundation for development.

**Acceptance Criteria:**

**Given** a clean project directory
**When** I run the Nx initialization and app generation commands
**Then** a monorepo structure is created with apps/backend (NestJS) and apps/frontend (React)
**And** shared libraries like @multi-tenant/shared-types are established
**And** the project builds successfully in development mode.

### Story 1.2: Đăng ký Doanh nghiệp & Khởi tạo Tenant (Tenant Onboarding)

As a Business Owner,
I want to register my company name and email,
So that my unique multi-tenant environment is automatically provisioned.

**Acceptance Criteria:**

**Given** I am on the onboarding page
**When** I enter valid company name and admin details then submit
**Then** a new record is created in the tenants table with a unique UUID
**And** an initial admin user is created and linked to the new tenant
**And** the system establishes the tenant context for immediate use.

### Story 1.3: Đăng nhập & Xác thực Đa doanh nghiệp (Multi-tenant JWT Auth)

As a User,
I want to log in securely and only access my company's specific data,
So that our business confidentiality is maintained.

**Acceptance Criteria:**

**Given** I have a valid set of credentials
**When** I log in through the unified login portal
**Then** I receive a JWT containing my tenant_id and role claims
**And** every database query automatically appends a tenant_id filter (MikroORM filters)
**And** **[Security]** Unit tests verify that a query for Tenant A never returns data from Tenant B (Cross-tenant leakage test)
**And** I am blocked with a 403 error if I attempt to access data from another tenant.

### Story 1.4: Quản lý Vai trò tùy chỉnh (Custom RBAC)

As an Admin,
I want to create custom roles and assign specific permissions,
So that I can limit system access based on staff job functions.

**Acceptance Criteria:**

**Given** I have Admin level access to the system
**When** I define a new role (e.g. 'Accountant') and select specific functional permissions
**Then** the role is saved and can be assigned to users belonging only to my tenant
**And** the permissions are strictly enforced on both UI (visibility) and API (guards) layers.

## Epic 2: Quản lý Dự án & Danh mục Sản phẩm (Unified Project & Catalog Hub)

Mục tiêu: Giúp người dùng quản lý dữ liệu gốc (Sản phẩm/Giá) và tạo lập dự án với các chỉ số tài chính (lợi nhuận) rõ ràng ngay từ đầu.

### Story 2.1: Quản lý Danh mục Vật phẩm & Hệ thống Phân loại (Product Catalog & Taxonomy Management)

As an Admin,
I want to organize products into hierarchical categories and manage pricing,
So that our team can efficiently select items for project quotes.

**Acceptance Criteria:**

**Given** I am in the Catalog Management section
**When** I create a new product category or sub-category (e.g. 'Network' > 'Cisco' > 'Switch')
**Then** it is saved and can be assigned to individual product items
**And** I can filter the catalog view by these categories
**And** I can bulk upload (CSV/Excel) products with their category mapping.

### Story 2.2: Khởi tạo Dự án & Tiến độ (Project & Timeline Initialization)

As a PM,
I want to initiate a new project and define key milestones,
So that the team can start coordination and progress can be tracked on a visual timeline.

**Acceptance Criteria:**

**Given** I am logged in with PM permissions
**When** I create a project with Name, Client, and key milestone dates
**Then** the project is initialized and a visual timeline is generated
**And** I can update the status (Red/Amber/Green) for each milestone independently.

### Story 2.3: Dự toán Chi phí & Biên lợi nhuận (Cost Estimation & Margins)

As a Salesperson,
I want to add items from the catalog to a project and see real-time margin calculations,
So that I can ensure project profitability before submission.

**Acceptance Criteria:**

**Given** a project in 'Draft' state
**When** I select items from the catalog to add to the project budget
**Then** the project total cost, sale price, and profit margin percentage are calculated instantly
**And** the system displays a visual warning if the margin falls below the defined 15% threshold.

### Story 2.4: So sánh giá Nhà cung cấp tự động (Supplier Price Comparison)

As a Buyer,
I want to view all supplier quotes for a specific item side-by-side,
So that I can select the most cost-effective or fastest option.

**Acceptance Criteria:**

**Given** multiple supplier price inputs for a specific project item
**When** I open the 'Price Comparison' view
**Then** the system displays a table comparing prices, lead times, and payment terms side-by-side
**And** the system highlights the 'Cheapest' and 'Fastest' options for quick decision making.

## Epic 3: Bóc tách dữ liệu AI & Đối soát (AI Ingestion & Verification)

Mục tiêu: Chuyển đổi từ nhập liệu thủ công sang "Kiểm soát AI". Tự động trích xuất và đối soát thông tin tài chính từ nhiều định dạng tập tin.

### Story 3.1: Hệ thống Tiếp nhận Tài liệu đa nguồn (Multi-source Document Ingestion)

As a User,
I want to upload a document or forward an email attachment to a project,
So that it enters the ingestion queue for automated processing.

**Acceptance Criteria:**

**Given** I am in a project view
**When** I upload a supported file (PDF, Excel, Word, JPEG)
**Then** the document is saved and linked to the project context
**And** it is added to the AI processing queue with a 'Pending' status.

### Story 3.2: Công cụ Bóc tách Dữ liệu AI (AI Data Extraction Engine)

As a System,
I want to use LLM-based extraction to parse structured data fields from documents,
So that manual data entry is eliminated.

**Acceptance Criteria:**

**Given** a document in 'Pending' status
**When** the AI extraction service is triggered
**Then** it generates a structured JSON output of key fields (Item name, Qty, Unit Price, Supplier)
**And** **[AI Quality]** The output includes a confidence score (0-100%) for each extracted field
**And** the document status is updated to 'Extracted - Needs Review'.

### Story 3.3: Giao diện Đối soát Side-by-Side (Side-by-Side Verification UI)

As a Manager,
I want to see the original document and the AI-extracted fields in a split-screen view,
So that I can quickly verify accuracy without switching context.

**Acceptance Criteria:**

**Given** a document with 'Extracted' status
**When** I open the Verification interface
**Then** the original document preview is rendered on the left
**And** the editable AI-extracted fields are displayed on the right
**And** **[UX]** Fields with a confidence score < 85% are highlighted with a red/amber alert border
**And** I can save manual corrections directly from this view.

### Story 3.4: Trạng thái Dữ liệu Ghost & Xác thực (Ghost Editing & Approval Flow)

As a User,
I want to clearly distinguish between AI-generated data and human-verified data,
So that I only rely on confirmed information for financial decisions.

**Acceptance Criteria:**

**Given** unverified AI data fields in the UI
**When** the data is in 'Needs Review' status
**Then** the values are displayed with specific visual cues (e.g. italics or light-blue background)
**And** the system blocks "Quick Approve" for documents where critical fields (Total, Price) have low confidence
**When** I click 'Confirm All' or 'Approve'
**Then** the data is saved as permanent project truth and visual 'Ghost' cues are removed.

## Epic 4: Gọi điện & Ghi âm tích hợp (Integrated VoIP & Recording)

Mục tiêu: Cho phép người dùng gọi điện trực tiếp từ trình duyệt (WebRTC) và tự động lưu trữ ghi âm để đối soát thông tin. Bổ sung các tính năng tổng đài chuyên nghiệp.

### Story 4.1: Cấu trúc Thoại WebRTC & JsSIP (WebRTC & JsSIP Integration)

As a User,
I want to connect my browser to the Asterisk server via WebSocket using JsSIP,
So that I can make and receive enterprise calls without a physical SIP phone.

**Acceptance Criteria:**

**Given** I am logged in with VoIP permissions
**When** the application starts
**Then** the JsSIP User Agent is automatically registered with the Asterisk WebSocket interface
**And** **[Incoming]** JsSIP extracts the `record_path` from the SIP custom header (X-Record-Path) if present
**And** my extension status is displayed as 'Online'.

### Story 4.2: Bảng Điều khiển Cuộc gọi Nổi & Quản lý Path (Floating Call Control & Path Management)

As a User,
I want a persistent UI for call actions (Dial, Hang-up, Mute),
So that I can manage calls while navigating other project pages.

**Acceptance Criteria:**

**Given** an active call or standby state
**When** I click the floating phone icon
**Then** a dedicated panel appears with a dial pad and call controls (Mute, Hold, Hang-up)
**And** **[Outgoing]** When dialing, the client generates a unique `record_path` based on Call-ID/Extension metadata and sends it to Asterisk
**And** the panel remains active and visible during project navigation.

### Story 4.3: Chuyển máy (Call Transfer - Blind & Attended)

As a User,
I want to transfer an active call to another extension,
So that I can connect the caller to the appropriate team member.

**Acceptance Criteria:**

**Given** an active call
**When** I choose 'Transfer' and select a destination colleague
**Then** the system routes the caller to the new extension
**And** I can choose between 'Blind' (instant) or 'Attended' (talk to colleague first) transfer.

### Story 4.4: Họp nhóm & Đàm thoại đa bên (Multi-party Conference)

As a User,
I want to add multiple participants into an existing call,
So that we can have a project team discussion directly.

**Acceptance Criteria:**

**Given** an active call
**When** I click 'Add Participant' and select another extension
**Then** the system bridges all parties into a single conference session
**And** all participants can communicate simultaneously.

### Story 4.5: Ghi âm & Đồng bộ Nhật ký Tự chữa lành (Self-healing Call Recording & Log Sync)

As a Manager,
I want every call to be recorded and metadata synced to the project logs,
So that I have a historical audit of verbal agreements.

**Acceptance Criteria:**

**Given** a call is terminated
**When** the Asterisk system triggers the post-call webhook
**Then** the recording file at the known `record_path` is indexed in the project 'Newsfeed'
**And** **[Self-healing]** A background process periodically scans the `/recordings` folder for physical files not yet indexed in the DB and attempts to re-link them
**And** call metadata (Duration, Caller, Timestamp) is correctly populated in the database.

### Story 4.6: Thông báo Cuộc gọi & Phản hồi nhanh (Call Notification)

As a User,
I want a real-time browser notification for incoming calls,
So that I don't miss communication while in other tabs.

**Acceptance Criteria:**

**Given** an incoming SIP call
**When** the application is open or in a background tab
**Then** a visual browser toast/notification appears with 'Pick up' and 'Decline' buttons.

## Epic 5: Trung tâm Cộng tác (MS Teams & Email Sync)

Mục tiêu: Tập trung hóa mọi cuộc hội thoại từ các nền tảng khác (Teams, Email) về một nơi duy nhất gắn với từng Dự án (Context-driven).

### Story 5.1: Kết nối Kênh & Chat (Teams Mapping - Channel & Group Chat)

As a User,
I want to authenticate with MS Teams and select specific Channels or Group Chats to link to my project,
So that all communications from these sources are centralized.

**Acceptance Criteria:**

**Given** I am in the Project Integration settings
**When** I authorize the MS Teams connector
**Then** I can browse and select from my available Channels and Private Group Chats
**And** I can map multiple sources to the single Project ID.

### Story 5.2: Ingestion Tự động Hội thoại (Auto-Sync Ingestion)

As a System,
I want to automatically mirror new Teams messages and replies into the Project Timeline,
So that the team can audit discussion flow without switching apps.

**Acceptance Criteria:**

**Given** a linked source with 'Auto-sync' enabled
**When** a new message or reply is posted in the Teams source
**Then** the content, author, and attachments are captured and displayed in the project newsfeed
**And** the original threading structure is preserved.

### Story 5.3: Đồng bộ Tự chữa lành & Lấy lịch sử (Self-healing Manual Sync & History Fetch)

As a User,
I want to manually trigger a sync or fetch past messages from a linked Teams source,
So that I can capture historical context that predates the project creation in the system.

**Acceptance Criteria:**

**Given** a linked Teams source
**When** I trigger a manual 'Sync Now'
**Then** the system fetches any messages missed since the last sync
**And** **[Self-healing]** A background task periodically compares the last message ID in MS Graph with the DB state and auto-fetches any "Gaps"
**And** I can specify a custom 'Historical Fetch Date' to import messages from before the link was established.

### Story 5.4: Quản trị Email tập trung (Centralized Email Management)

As a User,
I want to send and manage project emails directly from the project interface,
So that I have a single command center for all stakeholder communication.

**Acceptance Criteria:**

**Given** I am in the Project 'Communications' tab
**When** I compose and send an email
**Then** the email is sent via my business account but automatically recorded in the project thread
**And** incoming replies tagged with the Project ID are automatically sorted into the same view.

### Story 5.5: Gắn thẻ AI & Phân loại ưu tiên hội thoại (AI Chat Tagging)

As a Manager,
I want AI to automatically tag Teams and Email messages with categories like 'Urgent' or 'Price Request',
So that I can quickly identify critical items in long communication threads.

**Acceptance Criteria:**

**Given** a new ingested message from Teams or Email
**When** it is processed by the AI enrichment engine
**Then** it is assigned specific intent tags (e.g. 'Price Quote', 'Timeline Delay', 'Approval Required')
**And** users can filter the project newsfeed using these AI tags.

## Epic 6: Nghiệp vụ Hiện trường & Mobile Catch (Mobile Field Operations)

Mục tiêu: Cung cấp công cụ gọn nhẹ trên di động để nhân viên hiện trường cập nhật dữ liệu (ảnh, giọng nói, hóa đơn) về văn phòng ngay lập tức.

### Story 6.1: Giao diện Mobile Web & Xác thực (Mobile Web App & Auth)

As a Field Technician,
I want a lightweight mobile-responsive portal,
So that I can quickly access project tasks and submit site reports while on the go.

**Acceptance Criteria:**

**Given** I am on a mobile device browser
**When** I log in using localized credentials
**Then** the UI adapts to a simplified touch-friendly layout
**And** I can only see projects assigned to my specific department or role.

### Story 6.2: Chụp ảnh Biên bản & Hóa đơn (Mobile Receipt/Document Capture)

As a Field Technician,
I want to take and upload photos of physical receipts or delivery notes,
So that the office team can process them in real-time.

**Acceptance Criteria:**

**Given** I am in the mobile app project view
**When** I select the 'Capture' function and take a photo using the system camera
**Then** the image is automatically uploaded to the project ingestion folder
**And** the file is visible in the desktop verification queue for AI processing.

### Story 6.3: Ghi âm Ghi chú Hiện trường (Mobile Voice Notes)

As a Field Technician,
I want to record short voice reports (up to 2 minutes),
So that I can describe complex site conditions without intensive typing.

**Acceptance Criteria:**

**Given** a project-context session
**When** I record a voice snippet and click 'Submit'
**Then** the audio file is attached to the Project Life-cycle log
**And** the system provides a visual confirmation of successful upload.

### Story 6.4: Đồng bộ Offline & Trạng thái tải lên (Offline Sync & Upload Status)

As a Field Technician,
I want my locally captured data to persist if internet is lost,
So that I can continue working in remote or shielded locations without losing captured data.

**Acceptance Criteria:**

**Given** no active internet connection
**When** I perform a photo or voice capture
**Then** the data is stored in the browser's local cache
**And** the system automatically initiates the sync process once the device is back online.

## Epic 7: Quản trị Minh bạch & Dashboard Thông minh (Audit & Intelligence Dashboard)

Mục tiêu: Cung cấp các công cụ phân tích dữ liệu và Dashboard để phát hiện sớm rủi ro và lưu trữ bằng chứng phê duyệt không thể sửa xóa.

### Story 7.1: Dashboard Theo dõi Tiến độ & Nút thắt (Bottleneck Dashboard)

As a Manager,
I want to see a Red/Amber/Green visual status for all active projects,
So that I can identify and intervene where delays or overhead are occurring.

**Acceptance Criteria:**

**Given** I am on the Executive Dashboard
**When** I view the active project portfolio
**Then** the system renders a visual status (RAG) for each project based on milestone health
**And** projects with pending approvals older than 24 hours are automatically flagged.

### Story 7.2: Phát hiện Rủi ro qua AI Tone Shift (AI Risk & Tone Shift Detection)

As a Manager,
I want to receive proactive alerts if AI detects 'Risk' or 'Negative Tone' in communications,
So that I can address client dissatisfaction before it escalates.

**Acceptance Criteria:**

**Given** an active thread of project communication
**When** the AI engine detects rising negative sentiments or 'escalation' intent
**Then** the project in the dashboard is flagged for 'Urgent Review'
**And** the specific communication thread is metadata-tagged as 'High Risk'.

### Story 7.3: Nhật ký Phê duyệt Tài chính Bất biến (Immutable Financial Audit Logs)

As an Auditor,
I want a permanent and immutable log of all financial approvals,
So that our business transactions are tamper-proof and fully traceable.

**Acceptance Criteria:**

**Given** a financial approval action (e.g. 'Project Quote Approval')
**When** the action is confirmed by an authorized user
**Then** the record is stored in a dedicated audit log table with a unique hash
**And** the UI prevents any editing or deletion of this historical log.

### Story 7.4: Báo cáo Tổng hợp Dự toán vs Thực tế (Estimated vs Actual Report)

As a CFO,
I want to compare original project estimates with final recorded costs,
So that I can verify the real-world profitability and accuracy of our bidding process.

**Acceptance Criteria:**

**Given** a completed or archived project
**When** I navigate to the 'Financial Reporting' section
**Then** the system provides a side-by-side table of 'Budgeted' vs 'Actual' costs
**And** the net variance in Margin Percentage is calculated and displayed.
