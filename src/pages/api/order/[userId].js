import Order from 'src/models/Order';
import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function handleGetOrderByAccount(req, res) {
  await dbConnect();
  const { method } = req;
  const { status, userId, search, limit = 10, page = 0 } = req.query;

  try {
    switch (method) {
      case 'GET':
        const orders = await Order.find({
          userId,
          ...(status && status !== 'all' && { status }),
          ...(search && { search: new RegExp(search) }),
        })
          .skip(limit * page)
          .limit(limit)
          .populate({ path: 'product', model: Product })
          .exec();

        return res.status(200).json({
          message: 'Tìm order by account: OK',
          code: 200,
          data: orders,
        });
      default:
        return res.status(404).json({
          message: 'Yêu cầu không hợp lệ',
          code: 404,
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default handleGetOrderByAccount;
