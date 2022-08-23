import verifyToken from 'src/middlewares/verifyToken';
import RefreshToken from 'src/models/RefreshToken';
import dbConnect from 'src/utils/dbConnect';

async function logout(req, res) {
  await dbConnect();
  const { method } = req;
  try {
    switch (method) {
      case 'POST':
        //xóa refresh trên cookie
        res.setHeader('Set-Cookie', 'refreshToken = delete; path=/');
        //tìm kiếm ID user và xóa refresh trong data
        await RefreshToken.findByIdAndDelete(userId);
        return res.status(200).json({
          message: 'Bạn đã đăng xuất',
          code: 200,
        });
      default:
        return res.status(400).json({
          message: 'Yêu cầu không hợp lệ',
          code: 400,
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default verifyToken(logout);
