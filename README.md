# Hẹn hò tối nay 💕

App tĩnh nhỏ xinh để mời người yêu đi hẹn hò, có quiz vui chọn quán ăn. Không cần build, không cần backend — mở thẳng `index.html` là chạy.

## Cách sửa nội dung

- **Tên quán ăn thật**: mở [`script.js`](script.js), sửa mảng `RESTAURANTS` ở đầu file (đang để tên mẫu).
- **Câu hỏi quiz**: sửa mảng `QUIZ` trong [`script.js`](script.js).
- **Lời nhắn, tên người yêu**: sửa trực tiếp trong [`index.html`](index.html).
- **Màu sắc, giao diện**: sửa [`style.css`](style.css).

## Xem thử ở máy

Mở trực tiếp file `index.html` bằng trình duyệt, hoặc chạy 1 static server bất kỳ, ví dụ:

```bash
python -m http.server 8080
```

rồi mở `http://localhost:8080`.

Không có Python/Node? Trên Windows có thể chạy sẵn `serve.ps1` đi kèm:

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```

rồi mở `http://localhost:8123`.

## Deploy lại sau khi sửa

Nếu đã kết nối repo này với Vercel, chỉ cần `git push` lên `main` là Vercel tự deploy lại bản mới.
