const router = require('express').Router();
const Thought = require('../models/Thought');
const Category = require('../models/Category');

// READ all thoughts
router.get('/:userId/thoughts', async (req, res) => {
  if (req.user.id === req.params.userId) {
    try {
      const allThoughts = await Thought.find({ author: req.user._id })
        .populate('category', 'name')
        .sort({ date: -1, createdAt: -1 });
      res.status(200).json(allThoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can only see your own thoughts!');
  }
});

// CREATE thought
router.post('/:userId/thoughts', async (req, res) => {
  if (req.user.id === req.params.userId) {
    const thought = new Thought({
      category: req.body.category,
      date: req.body.date,
      content: req.body.content,
      author: req.user.id,
    });
    try {
      const newThought = await thought.save();
      res.status(200).json(await newThought.populate('category'));
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can only create thoughts for yourself!');
  }
});

// UPDATE thought
router.put('/:userId/thoughts/:thoughtId', async (req, res) => {
  if (req.user.id === req.params.userId) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $set: req.body,
        },
        { new: true }
      ).populate('category', 'name');
      res.status(200).json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can only update your own thoughts!');
  }
});

// DELETE thought
router.delete('/:userId/thoughts/:thoughtId', async (req, res) => {
  if (req.user._id === req.params.userId) {
    try {
      const deletion = await Thought.deleteOne({
        _id: req.params.thoughtId,
      });
      res.status(200).json(deletion);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can only delete your own thoughts!');
  }
});

// READ all categories
router.get('/:userId/categories', async (req, res) => {
  if (req.user.id === req.params.userId) {
    try {
      const allCategories = await Category.find({ author: req.user.id });
      res.status(200).json(allCategories);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can only see your own categories!');
  }
});

// CREATE new category
router.post('/:userId/categories', async (req, res) => {
  if (req.user.id === req.params.userId) {
    const existingCategories = await Category.find({
      author: req.user.id,
      name: req.body.name,
    });
    if (existingCategories.length === 0) {
      const cat = new Category({
        name: req.body.name,
        author: req.user.id,
      });
      try {
        const newCategory = await cat.save();
        res.status(200).json(newCategory);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } else {
    res.status(403).json('You can only create categories for yourself!');
  }
});

// UPDATE category
router.put('/:userId/categories/:categoryId', async (req, res) => {
  if (req.user.id === req.params.userId) {
    try {
      const updatedCategory = await Category.updateOne(
        { _id: req.params.categoryId },
        {
          $set: req.body,
        }
      );
      res.status(200).json(updatedCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can only update your own categories!');
  }
});

// DELETE category
router.delete('/:userId/categories/:categoryId', async (req, res) => {
  if (req.user.id === req.params.userId) {
    try {
      const deletion = await Category.deleteOne({
        _id: req.params.categoryId,
      });
      res.status(200).json(deletion);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can only delete your own categories!');
  }
});

module.exports = router;
