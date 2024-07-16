const orders = require("../../../models/orders");
const carts = require("../../../models/cart");
const medicines = require("../../../models/medicines");
const deleteCart = require("../../carts/controllers/deleteCart");
const addOrders = async (req, res) => {
  const userId = req.params.id;
  let totalCost = 0;
  const { productIds, paymentMode, addressId } = req.body;

  if (!productIds) throw new Error("Product Ids are required");
  if (!paymentMode) throw new Error("Payment mode is required");
  if (!addressId) throw new Error("Address Id is required");
  let products = [];

  const getCartProducts = await carts.findOne({ id: userId });
  const promises = productIds.map(async (productId) => {
    const findProduct = getCartProducts.product.id(productId);

    const pullCartProduct = await carts.findOneAndUpdate(
      {
        id: userId,
      },
      {
        $pull: {
          product: {
            _id: productId,
          },
        },
      }
    );
    if (!pullCartProduct)
      throw new Error("Error occured while removing cart product");
    console.log(findProduct);

    const findMedicine = await medicines.findOne({
      _id: findProduct.medicineId,
    });

    totalCost = totalCost + findMedicine.cost * findProduct.qty;

    let productToBeAdded = {
      medicineId: findProduct.medicineId,
      qty: findProduct.qty,
    };
    products.push(productToBeAdded);
  });
  await Promise.all(promises);

  const payload = {
    userId: userId,
    product: products,
    purchasedAmt: totalCost,
    purchasedDate: new Date(),
    status: "PAID",
    deliveryDate: new Date() + 7,
    paymentMode: paymentMode,
    addressId: addressId,
  };

  const saveOrder = new orders(payload);
  await saveOrder.save();

  res.status(200).json({ status: "Success" });
};
module.exports = addOrders;
