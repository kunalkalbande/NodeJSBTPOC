const Eventobj = require('../../database/Models/user');

module.exports = {
    users: () => {
      return Eventobj.find().then(users => {
          return users.map(user => {
            return { ...user._doc, _id: user._doc._id.toString() };
          })
       }).catch(err => {
        ///console.log('API Error',err);
        throw err;
       });
      },
      createUser: (args) =>{
        //console.log('user value',args)
        const event = new Eventobj({
          name: args.userInput.name,
          email: args.userInput.email,
          password: args.userInput.password
        });
        event.save().then(result => {
            //console.log(result);
            return {...result._doc};
        }).catch(err => {
            //console.log(err);
            throw err;
        })
      }
};