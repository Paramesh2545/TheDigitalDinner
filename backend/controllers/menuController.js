const MenuItem = require('../models/MenuItem');

const getMenuItems = async (req, res) => {
  try {
    const menu = await MenuItem.find();
    console.log("recieved hit")
    // res.json(menu);
    return res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
};

const postMenuItems = async(req, res)=>{
  try{
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  }catch(err){
    res.status(500).json({ error: 'Failed to post menu Items' });
  }
}

module.exports = { getMenuItems, postMenuItems };
