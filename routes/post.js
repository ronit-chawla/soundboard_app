const router = require('express').Router();
const upload = require('../multer');
const cloudinary = require('cloudinary').v2;

const Category = require('../models/Category');
const Audio = require('../models/Audio');

router.post(
  '/audio',
  upload.single('audio'),
  async (req, res) => {
    // 1. check if category exists
    // 2. upload audio
    // 3. save audio
    // 4. redirect back
    const { title, category } = req.body;
    console.log(title, category, req.file);
    try {
      const cat = await Category.findOne({
        title : category.toLowerCase(),
      });
      if (!cat) return res.redirect('/');
      // Upload audio to cloudinary
      cloudinary.config({
        cloud_name : process.env.CLOUD_NAME,
        api_key    : process.env.API_KEY,
        api_secret : process.env.API_SECRET,
      });
      const {
        secure_url,
      } = await cloudinary.uploader.upload(req.file.path, {
        resource_type : 'auto',
      });
      const audio = new Audio({
        title,
        category : cat._id,
        audio    : secure_url,
      });
      await audio.save();
      console.log(audio);
      res.redirect('back');
    } catch (err) {
      console.log(err);
    }
  }
);

router.post('/category', async (req, res, next) => {
  // 1. get category title
  // 2. check if it already exists -> redirect to home
  // 3. create category
  // 4. redirect back
  const { title } = req.body;
  console.log(req.body);
  let exists;
  try {
    exists = await Category.findOne({
      title : title.toLowerCase(),
    });
  } catch (err) {}
  if (exists) return res.redirect('/');
  const category = new Category({
    title : title.toLowerCase(),
  });
  try {
    await category.save();
  } catch (err) {}
  console.log(category);
  res.redirect('/');
});

module.exports = router;
