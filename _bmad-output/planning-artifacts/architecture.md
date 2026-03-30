---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-03-29'
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/product-brief-multi-tenant-project-manager.md"
  - "_bmad-output/planning-artifacts/product-brief-multi-tenant-project-manager-distillate.md"
project_name: 'multi-tenant-project-manager'
user_name: 'Vovinhloc'
date: '2026-03-29'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis (Architectural Blueprint - Alpha+)

### Requirements Overview

**Functional Requirements:**
- **AI-First Project Management:** Tự động hóa bóc tách dữ liệu đa phương thức (Email, PDF, Voice, Image) thông qua các mô hình AI (Ollama, Gemini, Claude, OpenAI).
- **Hybrid Multi-tenancy:** Hỗ trợ phục vụ song song khách hàng SMB (Shared) và Enterprise (Dedicated).
- **Core Integrations:** MS Teams và Email dưới dạng "Command Center" tương tác trực tiếp với dự án.

**Non-Functional Requirements:**
- **Zero-Trust Identity & Isolation:** Cách ly dữ liệu thông qua **Middleware Enforcement Layer** (ORM hooks) và **Context-Isolated AI Workers**.
- **In-flow Safety:** Cơ chế **Shadow Data Pattern** (AI Draft & Core Truth) tích hợp UI **Smart-Highlight** (Viền tím nhạt/chữ nghiêng).
- **Traceability:** Mỗi trường dữ liệu AI cung cấp đều có **Deep Link** dẫn thẳng tới tọa độ nguồn trong file PDF/Email gốc.

**Scale & Complexity:**
- **Complexity Level:** **High (Enterprise)**.
- **Architectural Components:** 10+ (Gateway, Auth/SSO, Context-Isolated AI Orchestrator, Storage Hub, Mobile Sync Agent, Integration Center, Shadow Data Validator, Enforcement Layer, Resilient Sync Manager, Data Provisioner).

### Technical Constraints & Dependencies

- **Storage:** **MariaDB** (Primary Storage).
- **Isolation Strategy:** **Application-level Global Filtering Middleware** (Shared) + **Runtime Multi-datasource Routing** (Enterprise).
- **Queue System:** **Database-as-a-Queue (MariaDB)** cho giai đoạn MVP, thiết kế theo hướng **Abstraction-first** để sẵn sàng chuyển sang **Redis/BullMQ** ở giai đoạn sau.
- **Mobile Architecture:** **Store-and-Forward** (Offline-capable) với cơ chế **Resumable Chunked Uploads (5MB)** để đảm bảo không mất dữ liệu nơi hiện trường.

### Cross-Cutting Concerns Identified

- **Identity Propagation:** Đảm bảo ngữ cảnh Tenant luôn hiện diện trong suốt vòng đời của một Request/Job.
- **AI Hallucination Mitigation:** Quy trình xác thực dữ liệu AI ngay trong luồng tương tác (Ghost Editing) kèm theo **Version History** để Rollback.
- **Sync Integrity:** Hiển thị rõ ràng trạng thái đồng bộ cục bộ trên ứng dụng di động.
