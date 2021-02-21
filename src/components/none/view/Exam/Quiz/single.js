import React, { Component } from "react";
import cx from "classnames";

import Button from "./button";
import SelectableAnswer from "./selectableAnswer";

export default class QuizSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      choice: false,
      disabled: false,
      answerShow: false,
      hiding: false
    };
  }

  handleSelected(e) {
    if (this.state.disabled === false) {
      this.setState({
        selected: e,
        disabled: true
      });
      this.setState({
        hiding: true
      });
      // Add a slight delay for showing the answer and pushing the selected state
      // We can use this to animate things!
      setTimeout(() => {
        this.setState({
          answerShow: true
        });
      }, 700);
      setTimeout(() => {
        this.setState({
          choice: true,
          hiding: false
        });
      }, 500);
    }
  }

  handleNext() {
    // eslint-disable-next-line no-unused-expressions
    this.state.selected ? this.props.pushAnswer() : null;
    // Add a tiny delay to ensure we push the answer up before switching to the next
    // question/answer
    setTimeout(() => {
      this.props.next();
    }, 10);
  }

  render() {
    const { selected, choice, hiding, answerShow } = this.state;

    const { item, number } = this.props;

    const { question, choices, fact } = item;

    return (
      <div className="quiz__main">
        <div className="quiz__container container--xl mha">
          {choice && !hiding ? (
            <div className="px1 quiz__material anwser container--q mha">
              <span className="cw quiz__material_qstep">
                Question {number} of 3
              </span>
              <div
                className={cx("quiz__material_answer", {
                  active: choice && answerShow
                })}
              >
                <div>
                  <h3 className="cw">{selected ? `Correct!` : `Nope`}</h3>
                  <div
                    className="cw"
                    dangerouslySetInnerHTML={{ __html: fact }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={cx("px1 quiz__material question container--q mha")}>
              <span className="cw quiz__material_qstep">
                Question {number} of 3
              </span>
              <h4
                className={cx("cw quiz__material_question", {
                  hiding: hiding
                })}
              >
                {question}
              </h4>
            </div>
          )}
          <div className="quiz__selections">
            <div className="quiz__selections_nest">
              <div className={cx("px1 f jcc aic mha")}>
                {choices.map(singleChoice => (
                  <SelectableAnswer
                    key={singleChoice.id}
                    topSelected={selected} // push selection back down
                    choice={singleChoice}
                    disabled={this.state.disabled}
                    size={singleChoice.fontSize}
                    onClick={e => this.handleSelected(e)}
                  />
                ))}
              </div>
              <div className="f jcc aic">
                {choice && (
                  <div
                    className={cx("f jce quiz__options_next", {
                      visible: choice && answerShow
                    })}
                  >
                    <Button
                      classes={`f jcb cw`}
                      clickHandle={() => this.handleNext()}
                    >
                      {number === 3 ? `Calculate Score` : `Next Question`}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
