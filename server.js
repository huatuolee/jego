const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const reportsRouter = require('./routes/reports');
const Product = require('./models/Product');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 10000;

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jego-backend';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB에 연결되었습니다.'))
  .catch(err => console.error('MongoDB 연결 오류:', err));

app.use(cors({
  origin: 'https://tiny-pastelito-227085.netlify.app'
}));
app.use(express.json());

// 라우트 설정은 여기에 추가됩니다.

app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/reports', reportsRouter);

io.on('connection', (socket) => {
  console.log('새 클라이언트 연결됨');
  
  socket.on('updateProduct', async (productData) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productData._id,
        { quantity: productData.quantity },
        { new: true }
      );
      io.emit('productUpdated', updatedProduct);
    } catch (error) {
      console.error('제품 업데이트 오류:', error);
    }
  });

  socket.on('disconnect', () => console.log('클라이언트 연결 해제'));
});

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다`);
});

const path = require('path');

// 이 부분을 라우트 정의 후, app.listen() 전에 추가하세요
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'client/build')));
