import React from "react"
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statictics } from "./Statistics/Statictics";
import { Notification } from "./Notification/Notification";
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { good: 0, bad: 0, neutral: 0 };
    this.countPositiveFeedbackPercentage = this.countPositiveFeedbackPercentage.bind(this);
    this.countTotalFeedback = this.countTotalFeedback.bind(this);
    this.onLeaveFeedback = this.onLeaveFeedback.bind(this);
  }

  countTotalFeedback() {
    return this.state.bad + this.state.good + this.state.neutral;
  }

  countPositiveFeedbackPercentage() {
    return Math.round(this.state.good/(this.state.bad + this.state.good + this.state.neutral)*100);
  }

  onLeaveFeedback(opt) {
    this.setState(opt);
  }

  render () {
  return (
    <div>
      <FeedbackOptions options={this.state} onLeaveFeedback={this.onLeaveFeedback}  />
      {this.countTotalFeedback() ? <Statictics
        good={this.state.good}
        bad={this.state.bad}
        neutral={this.state.neutral}
        total={this.countTotalFeedback()}
        positivePercentage={this.countPositiveFeedbackPercentage()}
        /> : <Notification message="There is no feedback" />}
    </div>
  );
  }
};
