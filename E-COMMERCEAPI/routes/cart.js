const router =require("express").Router();

const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// CREATE OR GET USER CART
router.post("/", verifyToken, async (req, res) => {
    try {
      // Get the user ID from the JWT token
      const userId = req.user.id;
  
      // Check if the user already has a cart
      let cart = await Cart.findOne({ userId });
  
      // If the user does not have a cart, create a new one
      if (!cart) {
        cart = new Cart({ userId, products: [] });
        await cart.save();
      }
  
      // Send the cart data to the client
      res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
  }
});

// UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      if (cart.userId === req.user.id) {
        // Only the cart owner can update the cart
        const updatedCart = await Cart.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedCart);
      } else {
        res.status(403).json("You are not allowed to update this cart.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


// //CREATE
// router.post("/", verifyToken, async(req,res)=>{
//     const newCart = new Cart(req.body);

//     try{
//         const savedCart = await newCart.save();
//         res.status(200).json(savedCart);
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// });


// //UPDATE
// router.put("/:id",verifyTokenAndAuthorization, async (req,res)=>{

//    try{
// const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
//     $set: req.body,
// },
//    {new:true}
//    );
//    res.status(200).json(updatedCart);
//    }
//    catch(err){
//     res.status(500).json(err);
//    }

// });

//DELETE
router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET USER CART

router.get("/find/:userId", verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId}); // findOne bec every user will have just one cart
        res.status(200).json(cart);
    }
    catch(err){
        res.status(500).json(err)
    }
})

 //GET ALL
router.get("/",verifyTokenAndAdmin, async(req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }
    catch(err){
        re.status(500).json(err);
    }
})

module.exports = router;