const Category = require('../models/Category');
const Audio = require('../models/Audio');

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

exports.home = async (req, res, next) => {
  const { title, category } = req.query;
  let cat_sel;
  const filter = {};
  if (title) {
    filter.title = new RegExp(escapeRegex(title), 'gi');
  }
  if (category) {
    cat_sel = await Category.findOne({ title: category });
    filter.category = cat_sel._id;
  }
  const audios = await Audio.find(filter);
  const cat = await Category.find();
  console.log(audios, title);
  res.render('home', {
    audios,
    cat,
    selectedCat : cat_sel ? cat_sel.title : 'any',
  });
};

exports.audio = async (req, res, next) => {
  const cat = await Category.find();
  res.render('audio', { cat });
};

exports.category = async (req, res, next) => {
  res.render('category');
};
