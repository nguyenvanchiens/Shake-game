import React, { useState, useEffect, useCallback } from 'react';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10, image: null }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_FOOD = { x: 15, y: 15 };

// Danh sách hình ảnh dogs ngẫu nhiên
const DOG_IMAGES = [
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=100&h=100&fit=crop&crop=face'
];

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showGameOverForm, setShowGameOverForm] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showFireworks, setShowFireworks] = useState(false);

  // Tạo thức ăn mới
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE)
    };
    
    // Đảm bảo thức ăn không xuất hiện trên thân rắn
    const isOnSnake = snake.some(segment => 
      segment.x === newFood.x && segment.y === newFood.y
    );
    
    if (isOnSnake) {
      return generateFood();
    }
    
    return newFood;
  }, [snake]);

  // Lấy hình ảnh dog ngẫu nhiên
  const getRandomDogImage = useCallback(() => {
    return DOG_IMAGES[Math.floor(Math.random() * DOG_IMAGES.length)];
  }, []);

  // Di chuyển rắn
  const moveSnake = useCallback(() => {
    if (gameOver || isPaused || !gameStarted) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Kiểm tra va chạm với tường
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true);
        setShowGameOverForm(true);
        setShowFireworks(true);
        return prevSnake;
      }

      // Kiểm tra va chạm với thân rắn
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setShowGameOverForm(true);
        setShowFireworks(true);
        return prevSnake;
      }

      // Thêm đầu mới
      newSnake.unshift(head);

      // Kiểm tra ăn thức ăn
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
        // Khi ăn thức ăn, không xóa đuôi (rắn sẽ dài ra)
        // Thêm hình ảnh dog ngẫu nhiên cho segment mới
        newSnake[newSnake.length - 1] = {
          ...newSnake[newSnake.length - 1],
          image: getRandomDogImage()
        };
      } else {
        // Khi không ăn, xóa đuôi để giữ nguyên kích thước
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, gameStarted, generateFood]);

  // Xử lý phím điều khiển
  const handleKeyPress = useCallback((e) => {
    if (gameOver) return;

    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 0) {
          setDirection({ x: 0, y: -1 });
        }
        break;
      case 'ArrowDown':
        if (direction.y === 0) {
          setDirection({ x: 0, y: 1 });
        }
        break;
      case 'ArrowLeft':
        if (direction.x === 0) {
          setDirection({ x: -1, y: 0 });
        }
        break;
      case 'ArrowRight':
        if (direction.x === 0) {
          setDirection({ x: 1, y: 0 });
        }
        break;
      case ' ':
        e.preventDefault();
        if (gameStarted) {
          setIsPaused(prev => !prev);
        }
        break;
      default:
        break;
    }
  }, [direction, gameOver, gameStarted]);

  // Bắt đầu game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setSnake([{ x: 10, y: 10, image: getRandomDogImage() }]);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setScore(0);
    setIsPaused(false);
    setShowGameOverForm(false);
    setShowFireworks(false);
    setPlayerName('');
  };

  // Restart game
  const restartGame = () => {
    startGame();
  };

  // Toggle pause
  const togglePause = () => {
    if (gameStarted) {
      setIsPaused(prev => !prev);
    }
  };

  // Xử lý submit form
  const handleSubmitScore = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      // Lưu điểm số (có thể lưu vào localStorage hoặc gửi lên server)
      const playerData = {
        name: playerName.trim(),
        score: score,
        date: new Date().toLocaleString()
      };
      
      // Lưu vào localStorage
      const existingScores = JSON.parse(localStorage.getItem('snakeGameScores') || '[]');
      existingScores.push(playerData);
      existingScores.sort((a, b) => b.score - a.score);
      localStorage.setItem('snakeGameScores', JSON.stringify(existingScores));
      
      // Đóng form và reset
      setShowGameOverForm(false);
      setShowFireworks(false);
      setPlayerName('');
    }
  };

  // Tắt hiệu ứng pháo hoa sau 3 giây
  useEffect(() => {
    if (showFireworks) {
      const timer = setTimeout(() => {
        setShowFireworks(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showFireworks]);

  // Effect cho di chuyển rắn
  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  // Effect cho xử lý phím
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Render ô trên bảng
  const renderBoard = () => {
    const board = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const snakeSegment = snake.find(segment => segment.x === x && segment.y === y);
        const isSnakeHead = snake[0] && snake[0].x === x && snake[0].y === y;
        const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;
        
        let cellClass = 'cell';
        if (isSnakeHead) cellClass += ' snake-head';
        else if (isSnakeBody) cellClass += ' snake-body';
        else if (isFood) cellClass += ' food';
        
        // Chỉ hiển thị hình ảnh dog nếu segment đã có sẵn
        const dogImage = snakeSegment ? snakeSegment.image : null;
        
        board.push(
          <div key={`${x}-${y}`} className={cellClass}>
            {dogImage && (
              <img 
                src={dogImage} 
                alt="Dog" 
                className="snake-dog-image"
              />
            )}
          </div>
        );
      }
    }
    return board;
  };

  return (
    <div className="snake-game">
      <div className="game-header">
        <h1>
          <img 
            src="https://pbs.twimg.com/profile_images/1812420751829422080/QV-SLzAa_400x400.jpg" 
            alt="Snake" 
            className="snake-icon"
          />
          Trò Chơi Rắn
        </h1>
        <div className="score">Điểm: {score}</div>
      </div>
      
      <div className="game-board">
        {renderBoard()}
      </div>
      
      <div className="game-controls">
        {!gameStarted ? (
          <button className="start-btn" onClick={startGame}>
            Bắt Đầu Chơi
          </button>
        ) : (
          <div className="control-buttons">
            <button className="pause-btn" onClick={togglePause}>
              {isPaused ? 'Tiếp Tục' : 'Tạm Dừng'}
            </button>
            <button className="restart-btn" onClick={restartGame}>
              Chơi Lại
            </button>
          </div>
        )}
      </div>
      
      {/* Hiệu ứng pháo hoa */}
      {showFireworks && (
        <div className="fireworks-container">
          <div className="firework firework-1"></div>
          <div className="firework firework-2"></div>
          <div className="firework firework-3"></div>
          <div className="firework firework-4"></div>
          <div className="firework firework-5"></div>
        </div>
      )}

      {/* Form nhập thông tin khi game over */}
      {showGameOverForm && (
        <div className="game-over-form">
          <div className="form-card">
            <div className="form-header">
              <img 
                src="https://pbs.twimg.com/profile_images/1812420751829422080/QV-SLzAa_400x400.jpg" 
                alt="Snake Logo" 
                className="form-logo"
              />
              <h2>Xin Chúc Mừng!</h2>
              <p className="congratulations-text">Bạn đã hoàn thành trò chơi với điểm số tuyệt vời!</p>
            </div>
            
            <div className="score-display">
              <h3>Điểm số của bạn:</h3>
              <div className="final-score">{score}</div>
            </div>

            <form onSubmit={handleSubmitScore} className="player-form">
              <div className="form-group">
                <label htmlFor="playerName">Nhập tên của bạn để lưu điểm:</label>
                <input
                  type="text"
                  id="playerName"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Tên của bạn..."
                  required
                  maxLength={20}
                />
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="save-btn">
                  💾 Lưu Điểm
                </button>
                <button type="button" className="restart-btn" onClick={restartGame}>
                  🔄 Chơi Lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {gameOver && !showGameOverForm && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Điểm của bạn: {score}</p>
          <button className="restart-btn" onClick={restartGame}>
            Chơi Lại
          </button>
        </div>
      )}
      
      <div className="instructions">
        <h3>Hướng dẫn:</h3>
        <p>• Sử dụng phím mũi tên để điều khiển rắn</p>
        <p>• Nhấn phím SPACE để tạm dừng/tiếp tục</p>
        <p>• Ăn thức ăn để tăng điểm và kích thước</p>
        <p>• Tránh va chạm với tường và thân rắn</p>
      </div>
    </div>
  );
};

export default SnakeGame;
