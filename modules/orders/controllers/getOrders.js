const orders = require("../../../models/orders");

const getOrders = async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) throw new Error("email is required");
    const userOrders = await orders.find({ email: email });
    if (!userOrders) throw new Error("No orders found");

    res.status(200).json({ data: userOrders });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
module.exports = getOrders;
