const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()

const server = require('http').createServer(app)
require('dotenv').config()

//const secretOrPrivateKey = process.env.JWT_SECRET // 환경 변수로부터 "your_long_complex_secret_key_here" 값을 받아옵니다

app.use(cors()) // cors 미들웨어를 삽입합니다.
app.use(express.json()) //클라이언트에서 보내준 json형식의 요청 본문 분석 도와줌 json문자열 -> js객체

//process.env.PORT -> 서버에서 지정된 포트 번호. 없으면 로컬 개발환경의 기본값 5000포트
const PORT = process.env.PORT || 5000 //앱과 서버 모두 똑같은 포트를 돌리면 에러 발생
const secretOrPrivateKey = 'jllgshllWEUJHGHYJkjsfjds90' //이것도 처리해야함.
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(
  '87153119383-6jkkldpf8u9cd47fnup8rp68qoq5asqb.apps.googleusercontent.com'
)
//서버 시작. 지정된 포트에서 들어오는 요청 수신
server.listen(5000, () => {
  //react native가 19006포트를 사용중이므로 다른 포트를 사용
  console.log('server is running on 5000')
})

const mongoose = require('mongoose')

// 연결 정보 입력
const uri =
  'mongodb+srv://alsgmlwkd33:kim99min!@maze.p0vt8tn.mongodb.net/?retryWrites=true&w=majority'

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

//test라는 데이터베이스 내의 gamers라는 컬렉션
var gamers = mongoose.Schema({
  nickname: {
    type: String,
    unique: true,
  },
  id: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  team: {
    type: String,
    default: '없음',
  },
  score: {
    type: Number,
    default: 0,
  },
  time: {
    type: Number,
    default: 0,
  },
})

//모델 정의. 컬렉션에 대한 인터페이스 역할
module.exports = gamersModel = mongoose.model('gamers', gamers)

app.post('/signup', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds) //비밀번호 해시 생성에 사용되는 솔트 값 생성
    const hashedPassword = await bcrypt.hash(req.body.password, salt) //실제 비밀번호와 결합하여 보안 해시
    //몽고디비에 저장
    const user = new gamersModel({
      nickname: req.body.nickname,
      id: req.body.id,
      password: hashedPassword,
      team: req.body.team,
    })
    const savedUser = await user.save()
    //토큰 생성
    const payload = {
      userId: user._id,
    }
    const tok = jwt.sign(payload, secretOrPrivateKey, {
      expiresIn: '24h', //24시간 뒤 만료
    })
    jwt.verify(tok, secretOrPrivateKey, (err, decoded) => {
      if (err) console.error(err)
      console.log(decoded)
    })
    return res
      .status(200)
      .json({ message: '저장 성공!', data: savedUser, token: tok })
  } catch (err) {
    console.error('Error:', err.message)
    return res.status(500).json({ message: '저장 실패!' })
  }
})

//구글 로그인 한 후 -> 구글에서 정보를 찾아와서 디비에 저장
//이미 있으면, 원래 디비
//없으면 새로 생성

app.post('/googleSignIn', async (req, res) => {
  try {
    const { id_token } = req.body //클라이언트가 보낸 요청 본문에서 id_token 추출
    //id 토큰 검증
    //구글 토큰 발행/ 클라이언트가 서버로 전송/ 서버 -> audience값과 client_id값이 일치하는지 확인
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience:
        '87153119383-6jkkldpf8u9cd47fnup8rp68qoq5asqb.apps.googleusercontent.com',
    })
    const payload = ticket.getPayload()
    const userId = payload.sub
    //구글에 이미 가입한 경우 해당 레코드 찾아냄.
    const user = await gamersModel.findOne({
      id: payload.email,
    })

    if (user) {
      const newToken = jwt.sign({ userId: user._id }, secretOrPrivateKey, {
        expiresIn: '24h',
      })
      res.status(200).json({ message: '로그인 성공!', token: newToken })
    } else {
      const salt = await bcrypt.genSalt(saltRounds)
      const hashedPassword = await bcrypt.hash(payload.sub, salt) //수정된 부분

      //몽고디비에 저장
      const User = new gamersModel({
        nickname: payload.name,
        id: payload.email,
        password: hashedPassword,
      })
      const savedUser = await User.save()
      const newToken = jwt.sign({ userId: user._id }, secretOrPrivateKey, {
        expiresIn: '24h',
      })
      res
        .status(200)
        .json({ message: '로그인 성공!', data: savedUser, token: newToken })
    }
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ message: '로그인 실패!' })
  }
})

//const secretOrPrivateKey = 'jllgshllWEUJHGHYJkjsfjds90' //이것도 처리해야함.
app.put('/user-data', async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  console.log('Received token:', token)

  if (!token) {
    return res.sendStatus(401)
  }

  try {
    const decoded = jwt.verify(token, secretOrPrivateKey)
    const userId = decoded.userId
    console.log('User ID:', userId)

    const user = await gamersModel.findOne({ _id: userId })
    if (!user) {
      console.error('User does not exist')
      res.status(404).send('User not found')
    } else {
      // user가 존재하면 유저 정보 사용 가능
      const time = req.body.time
      if (user.time < time) {
        //최고기록만 기록.
        user.time = time
      }
      await user.save()

      res.status(200).json(user)
    }
  } catch (error) {
    res.status(403).send(`Error: ${error.message}`)
  }
})

app.get('/getUserData', async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  console.log('Received token:', token)

  if (!token) {
    return res.sendStatus(401)
  }

  try {
    const decoded = jwt.verify(token, secretOrPrivateKey)
    const userId = decoded.userId
    console.log('User ID:', userId)

    const user = await gamersModel.findOne({ _id: userId })
    if (!user) {
      console.error('User does not exist')
      res.status(404).send('User not found')
    } else {
      res.status(200).json(user)
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' })
    } else {
      console.error('Error:', error.message)
      res.status(500).json({ message: 'Failed to get user data' })
    }
  }
})

app.post('/signin', async (req, res) => {
  const user = await gamersModel.findOne({
    id: req.body.LoginId,
  })
  console.log('Login request body:', user.password)
  if (!user) {
    // 비밀 번호가 같다면 Token 생성
    return res.status(400).json({ message: '아이디 없음' })
  } else {
    const isEqualPw = await bcrypt.compare(
      req.body.LoginPassword,
      user.password
    )
    console.log('Provided plain password: ', req.body.LoginPassword) // 로그 기록 검토
    console.log('Stored hashed password: ', user.password) // 로그 기록 검토
    console.log(isEqualPw)
    if (isEqualPw) {
      //아이디와 비밀번호 맞음
      //토큰 생성
      const payload = {
        userId: user._id,
      }
      const token = jwt.sign(payload, secretOrPrivateKey, {
        expiresIn: '24h',
      })

      return res
        .status(200)
        .json({ message: '유저 찾음!', data: user, token: token })
    } else {
      return res.status(404).json({ message: '아이디를 다시 확인하세요.' })
    }
  }
})

gamersModel
  .find({})
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })

// 기존 응답 미들웨어 아래에 추가
function errorHandler(err, req, res, next) {
  console.error('Error:', err.message)
  res.status(500).json({ message: '에러 발생!' })
}

app.post('/logout', (req, res) => {
  return res.status(200).send({
    success: true,
    logout: '로그 아웃 완료',
  })
})

//info.js에서 데이터 변경
app.put('/updateUserData', async (req, res) => {
  try {
    const { userId, updateData } = req.body
    const updatedUser = await gamersModel.findOneAndUpdate(
      { _id: userId },
      updateData,
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ message: 'Failed to update user data' })
  }
})

/*
//스키마 변경시 적용하는 함수
async function updateAllGamersScore() {
  try {
    // 모든 문서 검색
    const gamers = await gamersModel.find({})

    if (gamers && gamers.length > 0) {
      // 각 문서에 대해 score 값을 0으로 설정하고 저장하기
      const updatePromises = gamers.map(async gamer => {
        gamer.score = 0
        return gamer.save()
      })

      // 수정된 문서를 저장하여 데이터베이스에 반영하기
      await Promise.all(updatePromises)
      console.log('모든 사용자의 점수가 0으로 초기화되었습니다.')
    } else {
      console.log('데이터베이스에 사용자가 없습니다.')
    }
  } catch (error) {
    console.log('서버 오류입니다: ' + error)
  }
}

// 이 함수를 호출하여 기존 사용자의 score 값을 0으로 업데이트하세요
updateAllGamersScore()
*/
