module.exports = {
  Query: {
    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({}).sort({ createdDate: 'desc'}).populate({
        path: 'createdBy',
        model: 'User'
      });
      return posts;
    }
  },
  Mutation: {
    addPost: async (_, { title, imageUrl, categories, description, creatorId }, {Post}) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId
      }).save();
      return newPost
    },
    signupUser: async (_, {username, password, email}, {User}) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User is already exists');
      }
      const newUser = await new User({
        username,
        password,
        email
      }).save();
      return newUser
    }
  }
}



