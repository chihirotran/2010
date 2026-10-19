# Album Ký Ức 20/10 — ảnh gia đình thật

## Mục tiêu

Thay sáu ảnh Unsplash và mô tả không khớp bằng chín ảnh gia đình cục bộ, để trải nghiệm 3D kể một câu chuyện liền mạch về Mẹ, Chị và gia đình.

## Phạm vi

- Sao chép các tệp ảnh từ `C:\Users\admin\Pictures\2010` vào `assets/memories/` trong dự án.
- Dùng toàn bộ chín ảnh trong dữ liệu mặc định, với đường dẫn tương đối.
- Mở rộng vòng 3D, bộ đếm kỷ niệm và bộ điều khiển để hoạt động theo số ảnh thực tế (chín), không còn cố định sáu.
- Giữ nguyên chức năng người dùng thay ảnh hoặc chỉnh lời chúc trong drawer.

## Thứ tự nội dung

1. `Mùa Hè Rực Rỡ Của Cả Nhà` — ảnh chuyến đi biển đầu tiên.
2. `Ba Thế Hệ, Một Tình Thân` — Chị, cháu, Mẹ và mẹ chồng của Chị bên bãi biển.
3. `Mẹ Và Mùa Hoa Nở` — Mẹ giữa vườn cúc.
4. `Mẹ Trên Con Đường Xanh` — Mẹ cùng xe đạp.
5. `Bình Yên Trong Gió` — Mẹ giữa đồng cỏ lau.
6. `Nụ Cười Giữa Vườn Nhà` — Mẹ trong vườn hoa.
7. `Nét Xuân Của Chị` — Chị mặc áo dài hồng.
8. `Một Góc Bình Yên Của Chị` — Chị trong khoảng sân xanh.
9. `Hành Trình Của Những Yêu Thương` — Chị và gia đình trên thuyền.

## Kỹ thuật

`DEFAULT_MEMORIES` sẽ là nguồn dữ liệu duy nhất cho cả texture khung ảnh và thẻ lời chúc. Số lượng khung lấy từ `memories.length`; vì vậy điều hướng, preload và nhãn `Kỷ niệm x / y` tự cập nhật khi thay đổi bộ ảnh.

Ảnh được đặt cục bộ dưới `assets/memories/`, giúp trang có thể dùng không cần Internet (ngoại trừ các CDN thư viện đang tồn tại). Các lời chúc hiện có sẽ được giữ nguyên tại thời điểm này; chỉ tiêu đề và nguồn ảnh thay đổi.

## Kiểm chứng

- Mở tệp HTML qua trình duyệt cục bộ và xác nhận đủ 9 ảnh preload thành công.
- Xác nhận điều hướng trước/sau bao vòng đúng, nhãn hiển thị `1 / 9` đến `9 / 9`, và mỗi khung hiện đúng ảnh cùng tiêu đề.
- Xác nhận drawer vẫn có chín mục và thay ảnh một khung vẫn làm mới texture tương ứng.
