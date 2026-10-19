# Âm nhạc và chuyển động êm dịu

## Mục tiêu

Đưa bản beat cục bộ “Ba Ngọn Nến Lung Linh” vào album ký ức và làm hiệu ứng hạt tim/bóng bay chậm, dịu hơn khi người xem tương tác.

## Âm nhạc

- Sao chép file MP3 do người dùng cung cấp vào `assets/audio/ba-ngon-nen-lung-linh-karaoke-beat.mp3`.
- Dùng một phần tử `HTMLAudioElement` cục bộ với `loop = true`, `volume = 0.35` và `preload = "auto"`.
- Nút loa hiện có bắt đầu hoặc tạm dừng bản beat; biểu tượng luôn phản ánh trạng thái phát/tạm dừng.
- Bỏ bộ tạo giai điệu Tone.js để không chồng hai bản nhạc. Các lần thả tim không phát nốt âm thanh riêng.
- Nếu trình duyệt không tải hoặc không phát được MP3, nút loa vẫn ở trạng thái tắt và không làm gián đoạn gallery.

## Chuyển động

- Giảm vận tốc bay dọc của hạt tim từ `0.04–0.09` xuống `0.018–0.040` đơn vị mỗi khung.
- Giảm dao động ngang và chiều sâu từ tối đa `0.03` xuống `0.012` đơn vị mỗi khung.
- Giảm tốc độ mờ/tan từ `0.012` xuống `0.006`, để hạt tồn tại lâu hơn và chuyển động thư thả hơn.
- Không thay đổi thao tác chạm ảnh, khả năng xoay camera hoặc số lượng hạt được tạo trong mỗi lần thả tim.

## Kiểm chứng

- Kiểm tra tệp MP3 tồn tại tại đường dẫn cục bộ và phần tử audio tham chiếu đúng đường dẫn, `loop` bật, âm lượng 0.35.
- Trên trang đã mở, bấm nút loa để xác nhận biểu tượng đổi trạng thái và audio có `loop = true`.
- Kích hoạt thả tim và quan sát các hạt bay chậm hơn, tồn tại lâu hơn, không xuất hiện lỗi console.
