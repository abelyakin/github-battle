const axios = require('axios');


function getUserinfo(username) {
  return axios.get('http://api.github.com/users/'+ username)
}

function getRepos(username) {
  //fetch usernames repos
  return axios.get('http://api.github.com/users/'+ username + '/repos');
}

function getTotalStars(repos) {
  //calculate all the starts that the user has
  return repos.data.reduce(function (prev, current) {
    return prev + current.stargazers_count
  }, 0)
}

function getPlayersData(player) {
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function(totalStars) {
      return {
        followers: player.followers,
        totalStars: totalStars
      };
      console.log('hi');
    })
}

function calculateScores(players) {
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
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
  },

  battle: function (players) {
    var playerOneData = getPlayersData(players[0]);
    var playerTwoData = getPlayersData(players[1]);

    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch(function (err) {
        console.log('error in getPlayersInfo: ', err)
      })
  }

};

module.exports = helpers;
