import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useRef, useState } from "react";
import "./Question.css";
import MultipleChoice from "./MultipleChoice";

import { useAppDispatch, useAppSelector } from "../../../store/config/hooks";
import {
  appCommonSliceRes,
  questionFlushCall,
  saveQuesModal,
  toggleAddQues,
} from "../../../store/adminAppCommonOperations";
import {
  clearArray,
  multipleChoiceOptionAns,
} from "../../../store/slices/quesMultipleChoiceSlice";
import {
  setAnswerType,
  setMultipleChoice,
  setMultipleChoiceAnswer,
  setQuestion,
  setSageMathScript,
  setWrittenAnswer,
} from "../../../store/adminAppJSONFormation";

function QuestionModal(props: any) {
  const dispatch = useAppDispatch();
  const appOperations = useAppSelector(appCommonSliceRes);
  const optionsAnswer = useAppSelector(multipleChoiceOptionAns);
  const inputQues: any = useRef("");
  const inputAnswer: any = useRef("");
  const inputScript: any = useRef("");

  let question: any;
  let writtenAnswer: any;
  let sageScript: any;
  let quesType: any;
  const questionModalArr: any = [];

  useEffect(() => {
    dispatch(saveQuesModal(false));
    setShowQues("");
    dispatch(clearArray());
    setShowAnswer("");
    setShowScript("");
    setAddQues(true);
    setShowAlertWrittenAns(false);
    setShowAlertSageMath(false);
    setRadioBtn(false);
    setCheckBlankInput(true);
    setRadioClick("");
  }, [appOperations.questionFlush === true]);

  const [addQues, setAddQues] = useState(true);
  const [showQues, setShowQues] = useState("");
  const [showAnswer, setShowAnswer] = useState("");
  const [showScript, setShowScript] = useState("");
  const [showAlertWrittenAns, setShowAlertWrittenAns] = useState(false);
  const [showAlertSageMath, setShowAlertSageMath] = useState(false);
  const [radioBtn, setRadioBtn] = useState(false);
  const [checkBlankInput, setCheckBlankInput] = useState(true);
  const [radioClick, setRadioClick] = useState("");

  const questionInputChange = () => {
    question = inputQues.current.value;
    if (question !== "") {
      setCheckBlankInput(false);
    } else {
      setCheckBlankInput(true);
    }
  };
  const inputAnswerHandler = () => {
    writtenAnswer = inputAnswer.current.value;
    if (writtenAnswer !== "") {
      setShowAnswer(writtenAnswer);
      setShowAlertWrittenAns(false);
      dispatch(saveQuesModal(true));
    } else {
      setShowAlertWrittenAns(true);
      dispatch(saveQuesModal(false));
    }
  };
  const inputSageScriptHandler = () => {
    sageScript = inputScript.current.value;
    if (sageScript !== "") {
      setShowScript(sageScript);
      setShowAlertSageMath(false);
      dispatch(saveQuesModal(true));
    } else {
      setShowAlertSageMath(true);
      dispatch(saveQuesModal(false));
    }
  };
  const addQuestion = (event: any) => {
    event.preventDefault();
    setAddQues(false);
    setShowQues(question);
    setRadioBtn(true);
  };
  const onRadioChange = (event: any) => {
    quesType = event.target.value;
    setRadioClick(quesType);
    dispatch(saveQuesModal(false));
    dispatch(clearArray());
    setShowAnswer("");
    setShowScript("");
  };

  const saveQuestionModal = (event: any) => {
    event.preventDefault();
    dispatch(setQuestion(showQues));
    dispatch(setAnswerType(radioClick));
    dispatch(questionFlushCall(false));
    if (radioClick === "MultipleChoice") {
      dispatch(setMultipleChoice(optionsAnswer.options));
      dispatch(setMultipleChoiceAnswer(optionsAnswer.finalAnswer));
      dispatch(toggleAddQues(true));
      props.onHide();
    }
    if (radioClick === "WrittenAnswer") {
      dispatch(setWrittenAnswer(showAnswer));
      dispatch(toggleAddQues(true));
      props.onHide();
    }
    if (radioClick === "SageMath") {
      dispatch(setSageMathScript(showScript));
      dispatch(toggleAddQues(true));
      props.onHide();
    }
  };
  const clickCloseBtn = (event: any) => {
    event.preventDefault();
    dispatch(questionFlushCall(false));
    props.onHide();
  };

  const clickQuestionEdit = (event: any) => {
    event.preventDefault();
    setAddQues(true);
    setRadioBtn(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">QUESTION</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Task</h4>
        <form>
          {!addQues && (
            <div>
              {showQues} &nbsp; &nbsp;
              <a href="#" onClick={clickQuestionEdit}>
                edit
              </a>
            </div>
          )}
          {addQues && (
            <div className="input-group mb-3">
              <textarea
                className="form-control"
                aria-label="Question goes here"
                placeholder="Question goes here"
                ref={inputQues}
                defaultValue={showQues}
                onChange={questionInputChange}
              ></textarea>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={addQuestion}
                  disabled={checkBlankInput}
                >
                  Add
                </button>
              </div>
            </div>
          )}
          <br />
          {radioBtn && (
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="MultipleChoice"
                  onChange={onRadioChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Multiple Choice
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="WrittenAnswer"
                  onChange={onRadioChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Written Answer
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  value="SageMath"
                  onChange={onRadioChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio3">
                  Sage Math
                </label>
              </div>
            </div>
          )}
          <br />
          {radioClick === "MultipleChoice" && <MultipleChoice />}
          {radioClick === "WrittenAnswer" && (
            <div>
              <h4 className="text-center text-muted">Written Answer</h4>
              <div className="input-group mb-3">
                <textarea
                  className="form-control"
                  ref={inputAnswer}
                  defaultValue={showAnswer}
                  onChange={inputAnswerHandler}
                  placeholder="Your Answer goes here"
                  aria-label="Your Answer goes here"
                ></textarea>
              </div>
              {showAlertWrittenAns && (
                <p className="text-danger">
                  <i>Please enter any answer...</i>
                </p>
              )}
            </div>
          )}
          {radioClick === "SageMath" && (
            <div>
              <h4 className="text-center text-muted">Sage Math</h4>
              <div className="input-group mb-3">
                <textarea
                  className="form-control"
                  ref={inputScript}
                  defaultValue={showScript}
                  onChange={inputSageScriptHandler}
                  placeholder="Your Script goes here"
                  aria-label="Your Script goes here"
                ></textarea>
              </div>
              {showAlertSageMath && (
                <p className="text-danger">
                  <i>Please enter any text...</i>
                </p>
              )}
            </div>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={saveQuestionModal}
          disabled={!appOperations.saveQuesModal}
        >
          Save
        </Button>
        <Button onClick={clickCloseBtn}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default QuestionModal;
