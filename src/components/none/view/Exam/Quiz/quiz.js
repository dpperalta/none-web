import React from "react";
import ReactDOM from "react-dom";
import { Strider, Step } from "react-strider";
import cx from "classnames";

import "./styles.scss";

import data from "./data";
import Button from "./button";

import QuizSingle from "./single";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: 0 // Set the total right answered to zero
    };
  }
  render() {
    return (
      <div className="f jcc aic">
        <div>
          <h1>Examen de historia del Ecuador</h1>
          <Strider activeIndex="0" transitionSpeed={300}>
            <Step>
              {({ next, goTo, active, hiding, activeIndex }) => (
                <div
                  className={cx("step__wrapper", {
                    "is-active": active,
                    "is-hiding": hiding
                  })}
                >
                  <QuizStart next={next} />
                </div>
              )}
            </Step>
            <Step>
              {({ next, goTo, active, hiding, activeIndex }) => (
                <div
                  className={cx("step__wrapper", {
                    "is-active": active,
                    "is-hiding": hiding
                  })}
                >
                  <QuizSingle
                    {...this.props}
                    pushAnswer={() =>
                      this.setState({ correct: this.state.correct + 1 })
                    }
                    number={activeIndex}
                    next={next}
                    item={data[activeIndex]}
                  />
                </div>
              )}
            </Step>
            <Step>
              {({ next, goTo, active, hiding, activeIndex }) => (
                <div
                  className={cx("step__wrapper", {
                    "is-active": active,
                    "is-hiding": hiding
                  })}
                >
                  <QuizSingle
                    {...this.props}
                    pushAnswer={() =>
                      this.setState({ correct: this.state.correct + 1 })
                    }
                    number={activeIndex}
                    next={next}
                    item={data[activeIndex]}
                  />
                </div>
              )}
            </Step>
            <Step>
              {({ next, goTo, active, hiding, activeIndex }) => (
                <div
                  className={cx("step__wrapper", {
                    "is-active": active,
                    "is-hiding": hiding
                  })}
                >
                  <QuizSingle
                    {...this.props}
                    pushAnswer={() =>
                      this.setState({ correct: this.state.correct + 1 })
                    }
                    number={activeIndex}
                    next={next}
                    item={data[activeIndex]}
                  />
                </div>
              )}
            </Step>
            <Step>
              {({ active, hiding, activeIndex }) => (
                <div
                  className={cx("step__wrapper", {
                    "is-active": active,
                    "is-hiding": hiding
                  })}
                >
                  <QuizEnd {...this.props} score={this.state.correct} />
                </div>
              )}
            </Step>
          </Strider>
        </div>
      </div>
    );
  }
}

class QuizStart extends React.Component {
  render() {
    return (
      <div>
        <h4>Recuerde que tiene 30 minutos para realizar este examen</h4>
        <Button
          classes={`f jcb mt1 regular bold cw`}
          clickHandle={() => this.props.next()}
        >
          Empezar ahora
        </Button>
      </div>
    );
  }
}

class QuizEnd extends React.Component {
  render() {
    const { score } = this.props;
    return (
      <div className="mha container--q">
        <h4>You scored a {score}/3!</h4>
        <p>
          If you enjoyed this quiz we'd love to work with you. Check us out on{" "}
          <a href="https://thecouch.nyc">the internet</a>
        </p>
      </div>
    );
  }
}

export default Quiz;
