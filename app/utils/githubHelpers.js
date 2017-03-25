const axios = require('axios');


function getUserinfo(username) {
  return axios.get('http://api.github.com/users/'+ username)
}

var helpers = {
  getPlayersInfo: function (players) {
    return axios.all(players.map(function (username) {
      return getUserinfo(username)
    })).then(function(info){
        return info.map(function (user) {
          return user.data;
        })
    }).catch(function (err) {
      console.warn("error", err)

    })
  }
};

module.exports = helpers;
