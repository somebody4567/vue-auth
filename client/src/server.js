import express from 'express'
import mongoose from 'mongoose'; // Импортируем mongoose
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs' // Для загрузки .env
import cors from 'cors';
dotenv.config(); // Загружаем переменные

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Разрешаем запросы от Vue dev server
  credentials: true, // Разрешаем отправку куки и заголовков авторизации
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Разрешенные методы
  allowedHeaders: ['Content-Type', 'Authorization'] // Разрешенные заголовки
}));


const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);
//middleware: Парсим res
app.use(express.json());


function createToken(userID, options) {
  // Создаём токен
  return jwt.sign(
    { userId: userID },
    'secret_key_123', // В реальном проекте используйте переменную окружения
    options
  );
}

// 1. РЕГИСТРАЦИЯ - создание нового пользователя
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверяем, нет ли уже такого email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Пользователь с таким email уже существует'
      });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаём пользователя
    const user = await User.create({
      email,
      password: hashedPassword
    });

    // Создаём токен
    const token = createToken(user._id, { expiresIn: '7d' })

    res.status(201).json({
      success: true,
      message: 'Регистрация успешна!',
      token,
      user: {
        id: user._id,
        email: user.email,
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера',
      error: error.message
    });
  }
});

// 2. ВХОД - аутентификация существующего пользователя
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ищем пользователя по email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Неверный email или пароль'
      });
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Неверный email или пароль'
      });
    }

    // Создаём токен
    const token = createToken(user._id, { expiresIn: '7d' })

    res.json({
      success: true,
      message: 'Вход выполнен!',
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера',
      error: error.message
    });
  }
});

// Подключение к MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas подключена'))
  .catch((err) => {
    console.error('❌ Ошибка подключения к MongoDB:', err);
    process.exit(1); // Завершаем процесс при неудачном подключении
  });

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
  console.log(`
  Доступные эндпоинты:
  1. POST   /register  - регистрация
  2. POST   /login     - вход
  `);
});



