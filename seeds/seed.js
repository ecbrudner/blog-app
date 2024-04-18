const sequelize = require('../config/connection');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const { post } = require('../controllers/homeRoutes');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const posts = await Post.bulkCreate(postData.map(post => ({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
    })), { returning: true });

    await Comment.bulkCreate(commentData.map(comment => ({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        post_id: posts[Math.floor(Math.random() * posts.length)].id
    })));

    
    console.log('Seeded Database Successfully');
    process.exit(0);
};

seedDatabase();