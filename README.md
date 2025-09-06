# 🐍 Trò Chơi Rắn - Snake Game

Một trò chơi rắn cổ điển được xây dựng bằng ReactJS với giao diện đẹp và hiện đại.

## ✨ Tính năng

- 🎮 Điều khiển rắn bằng phím mũi tên
- 🍎 Ăn thức ăn để tăng điểm và kích thước
- ⏸️ Tạm dừng/tiếp tục game bằng phím SPACE
- 🔄 Chơi lại game bất cứ lúc nào
- 📱 Giao diện responsive, hoạt động tốt trên mobile
- 🎨 Giao diện đẹp với hiệu ứng animation
- 🏆 Hệ thống tính điểm

## 🚀 Cách chạy game

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy game:**
   ```bash
   npm start
   ```

3. **Mở trình duyệt và truy cập:**
   ```
   http://localhost:3000
   ```

## 🎯 Cách chơi

- **Điều khiển:** Sử dụng phím mũi tên (↑ ↓ ← →) để điều khiển rắn
- **Tạm dừng:** Nhấn phím SPACE để tạm dừng/tiếp tục
- **Mục tiêu:** Ăn thức ăn (màu đỏ) để tăng điểm và kích thước rắn
- **Tránh:** Không va chạm với tường hoặc thân rắn
- **Chơi lại:** Nhấn nút "Chơi Lại" khi game over

## 🛠️ Công nghệ sử dụng

- **React 18** - Framework chính
- **Webpack 5** - Module bundler
- **Babel** - JavaScript compiler
- **CSS3** - Styling với animations và gradients
- **HTML5** - Markup

## 📁 Cấu trúc dự án

```
snake-game-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── SnakeGame.js
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── package.json
├── webpack.config.js
└── README.md
```

## 🎨 Tính năng giao diện

- Gradient background đẹp mắt
- Animation mượt mà cho rắn và thức ăn
- Hiệu ứng glow và pulse
- Responsive design cho mobile
- Game over overlay với animation
- Button hover effects

## 🔧 Tùy chỉnh

Bạn có thể dễ dàng tùy chỉnh game bằng cách thay đổi các hằng số trong `SnakeGame.js`:

- `BOARD_SIZE`: Kích thước bảng chơi (mặc định: 20x20)
- Tốc độ game: Thay đổi giá trị `150` trong `setInterval(moveSnake, 150)`
- Màu sắc: Chỉnh sửa CSS trong `styles.css`

Chúc bạn chơi game vui vẻ! 🎮

#