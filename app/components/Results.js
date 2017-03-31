var React = require('react');
var PropTypes = React.PropTypes;
var styles = require('../styles');
var UserDetailsWrapper = require('./UserDetailsWrapper');
var UserDetails = require('./UserDetails');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var MainContainer = require('./MainContainer');
var Loading = require('./Loading');

function StartOver () {
  return (
    <div className="col-sm-12" style={styles.space}>
      <Link to='/playerOne'>
        <button type="button" className="btn btn-lg btn-danger">Start over</button>
      </Link>
    </div>
  )
}


function Results(props) {
  if (props.isLoading === true) {
    return (
      <Loading text="moment" speed={500}/>
    )
  }

  if (props.scores[0] === props.scores[1]) {
    return (
      <MainContainer>
        <h1>It's a tie</h1>
        <StartOver/>
      </MainContainer>
    )
  }

  var winIndex = props.scores[0] > props.scores[1] ? 0 : 1;
  var losIndex = winIndex === 0 ? 1 : 0;
  return (
  <MainContainer>
    <h1>Results</h1>
    <div>
      <UserDetailsWrapper header="Winner">
        <UserDetails score={props.scores[winIndex]} info={props.playersInfo[winIndex]}/>
      </UserDetailsWrapper>
      <UserDetailsWrapper header="Loser">
        <UserDetails score={props.scores[losIndex]} info={props.playersInfo[losIndex]}/>
      </UserDetailsWrapper>
    </div>
    <StartOver/>
  </MainContainer>
  )
}

Results.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  playersInfo: PropTypes.array.isRequired,
  scores: PropTypes.array.isRequired
}


module.exports = Results;
