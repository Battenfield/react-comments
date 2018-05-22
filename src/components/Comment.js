import React, { Component } from 'react';
import styled from 'styled-components';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaAngleDoubleUp from 'react-icons/lib/fa/angle-double-up';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleDoubleDown from 'react-icons/lib/fa/angle-double-down';

const CommentWrapper = styled.div`
  display: flex;
  padding: 15px;
`;

const VoteButtons = styled.div`
  background: WhiteSmoke;
`;

const CommentContent = styled.div`
  position: relative;
  text-align: left;
  background: Snow;
  padding-right: 20px;
  border-radius: 5px;
`;

const UpVote = styled.div`
  padding: 1px;
  ${({ onlyUpvote }) => onlyUpvote && `
    margin-bottom: 25px;
  `} 
`;

const DownVote = styled.div`
  padding: 1px;
  ${({ onlyDownvote }) => onlyDownvote && `
    margin-top: 25px;
  `} 
`;

const Header = styled.div`
  display: flex;
  padding-left: 5px;
  margin: 5px;
`;

const User = styled.div`
  flex-grow: 0;
  padding-left: 5px;
  color: DeepSkyBlue;
`;

const Points = styled.div`
  flex-grow: 0;
  padding-left: 5px;
  color: DarkGray;
`;

const Text = styled.div`
  padding-left: 15px;
`;

const Time = styled.div`
  flex-grow: 0;
  padding-left: 10px;
  color: DarkGray;
`;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vote : 0
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    //only rerenders if comments points change
    if (this.props.points !== nextProps.points) {
      return true;
    }
    return false;
  }

  vote(id, value, handler) {
    if(this.state.vote === 0 || 'undefined') {
      this.setState({ vote: value }, handler(id));
    }
  }

  renderUpButtons() {
    return (
      this.state.vote > 0 ?
      <FaAngleDoubleUp size={25} onClick={() => this.vote(this.props.id, 0, this.props.onDownvote)}/> :
      <FaAngleUp size={25} onClick={() => this.vote(this.props.id, 1, this.props.onUpvote)}/>
    );
  }

  renderDownButtons() {
    return (
      this.state.vote < 0 ?
        <FaAngleDoubleDown size={25} onClick={() => this.vote(this.props.id, 0, this.props.onUpvote)}/> :
        <FaAngleDown size={25} onClick={() => this.vote(this.props.id, -1, this.props.onDownvote)}/>
    );
  }

  // renders vote buttons and removes if opposite if already voted
  renderButtons() {
    const vote = this.state.vote;
    const onlyUpvote = vote > 0;
    const onlyDownvote = vote < 0;
    return (
      <VoteButtons>
        <UpVote onlyUpvote={onlyUpvote}>
          { vote >= 0 && this.renderUpButtons() }
        </UpVote>
        <DownVote onlyDownvote={onlyDownvote}>
          { vote <= 0 && this.renderDownButtons() }
        </DownVote>
      </VoteButtons>
    );
  }

  renderContent() {
    const { points, timeSince, text, username } = this.props;
    return (
      <CommentContent>
        <Header>
          <User>{username}</User>
          <Points>{points} points</Points>
          <Time>{timeSince}</Time>
        </Header>
          <Text>{text}</Text>
      </CommentContent>
    );
  }

  render() {
    return (
      <CommentWrapper>
        { this.renderButtons() }
        { this.renderContent() }
      </CommentWrapper>
    );
  }
}
  
export default Comment;