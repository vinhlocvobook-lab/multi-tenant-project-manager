Hiện tại, chúng ta đã hoàn thiện nền tảng bảo mật và phân quyền (Epic 1.3) cho hệ thống. Dưới đây là tóm tắt những gì đã thực hiện và cách bạn có thể tự mình kiểm chứng:

## 1. Những gì đã thực hiện (Chức năng cốt lõi)
Bảo mật "Đóng cửa mặc định" (Global Auth): Toàn bộ API của Backend hiện nay đều yêu cầu Token hợp lệ. Nếu không có Token, hệ thống sẽ trả về lỗi 401 Unauthorized.
Ngoại lệ API công khai (Public Decorator): Chỉ những API như Đăng nhập (/login) và Đăng ký (/register) mới được phép truy cập mà không cần Token.
Phân quyền theo Vai trò (RBAC): Hệ thống đã sẵn sàng để kiểm tra quyền hạn (Admin, Manager, Agent). Bạn có thể chặn hoặc cho phép truy cập dựa trên vai trò của người dùng.
Cô lập dữ liệu Multi-tenant tự động: Mỗi khi người dùng thực hiện Query (lấy Project, Task...), hệ thống sẽ tự động thêm điều kiện WHERE tenant_id = '...' vào câu lệnh SQL một cách ngầm định. Bạn không bao giờ phải lo lắng về việc rò rỉ dữ liệu giữa các doanh nghiệp.
Xử lý lỗi Token tự động (Frontend Resilience): Nếu Token hết hạn hoặc không hợp lệ, Frontend sẽ tự động xóa thông tin đăng nhập cũ và chuyển hướng bạn về trang Login ngay lập tức.
Kết nối mượt mà (CORS enabled): Frontend và Backend giờ đây đã có thể "nói chuyện" với nhau mà không bị trình duyệt chặn.

## 2. Các bước để bạn tự Test (Manual Testing)
Để kiểm tra các chức năng này, bạn có thể thực hiện theo các bước sau:

### Bước 1: Khởi động hệ thống
Mở terminal tại thư mục gốc và chạy:

bash
# Chạy đồng thời cả Frontend và Backend
npx nx run-many -t serve -p frontend backend
(Nếu muốn chạy riêng, bạn có thể dùng npx nx serve backend và npx nx serve frontend)

### Bước 2: Kiểm tra bảo mật (Auth Check)
Mở trình duyệt, vào địa chỉ: http://localhost:4200/.
Thử truy cập trực tiếp vào http://localhost:4200/dashboard (hoặc refresh trang dashboard).
Kết quả đúng: Bạn sẽ ngay lập tức bị đẩy về trang /login vì chưa có Token.

### Bước 3: Kiểm tra Đăng nhập thành công
Tại trang Login, nhập:
Email: admin@acme.com
Password: password123
Nhấn Sign In.
Kết quả đúng: Bạn vào được Dashboard, thấy lời chào "Hello, Acme 👋" và danh sách dự án của Acme Corp.

### Bước 4: Kiểm tra cô lập dữ liệu (Tenant Isolation)
(Phần này bạn có thể xem trong tab Network của Trình duyệt)

Nhấn F12 (DevTools) -> chọn tab Network.
Refresh trang Dashboard.
Tìm request gọi đến API http://localhost:3000/api/projects.
Kiểm tra: Bạn sẽ thấy trong Headers có gửi kèm Authorization: Bearer <token>.
Tại Backend: Nếu bạn xem log của server, bạn sẽ thấy câu lệnh SQL được tự động chèn thêm WHERE tenant_id = '...' mà không cần code tay ở Controller.

### Bước 5: Kiểm tra tự động Logout
Mở tab Application trong F12 (DevTools) -> Local Storage.
Xóa khóa token hoặc sửa giá trị của nó cho sai đi.
Refresh trang Dashboard.
Kết quả đúng: Hệ thống nhận diện Token sai (lỗi 401) và tự động chuyển bạn về trang Login.
Bạn có gặp khó khăn ở bước nào trong việc tự test không? Nếu mọi thứ ổn, chúng ta nên bắt đầu xây dựng Tính năng tạo Dự án mới hay bạn muốn mình làm gì tiếp theo?

