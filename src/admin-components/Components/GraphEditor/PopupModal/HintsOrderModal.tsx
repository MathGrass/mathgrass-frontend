import React, { Fragment, useState } from "react";
import { Modal } from "react-bootstrap";
import { appCommonSliceRes } from "../../../store/adminAppCommonOperations";
import { textHintSliceArray } from "../../../store/slices/textHintSlice";

import { useAppDispatch, useAppSelector } from "../../../store/config/hooks";
import {
  addGraphicalHintsWithOrder,
  addScriptHintsWithOrder,
  addTextHintsWithOrder,
  clearArray,
} from "../../../store/slices/hintsWithOrderSlice";

type InputValues = { [key: string]: string };

const HintsOrderModal = (props: any) => {
  const appOperations = useAppSelector(appCommonSliceRes);
  const textHintsArr = useAppSelector(textHintSliceArray);
  const dispatch = useAppDispatch();

  const [inputValues, setInputValues] = useState<InputValues>({});
  const [scriptHintOrder, setScriptHintOrder] = useState(0);
  const [graphicalHintOrder, setGraphicalHintOrder] = useState(0);

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    setInputValues((prevState: any) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const saveOrderOfHints = (event: any) => {
    event.preventDefault();
    dispatch(clearArray());
    if (textHintsArr.textHintValue.length !== 0) {
      for (let i = 0; i < textHintsArr.textHintValue.length; i++) {
        if (inputValues[`input-${i}`] === undefined) {
          dispatch(
            addTextHintsWithOrder({
              hint: textHintsArr.textHintValue[i],
              hintsOrder: 0,
            })
          );
        } else {
          dispatch(
            addTextHintsWithOrder({
              hint: textHintsArr.textHintValue[i],
              hintsOrder: Number(inputValues[`input-${i}`]),
            })
          );
        }
      }
      props.onHide();
    }
    if (appOperations.scriptHintValue !== "") {
      dispatch(
        addScriptHintsWithOrder({
          hint: appOperations.scriptHintValue,
          hintsOrder: scriptHintOrder,
        })
      );
      props.onHide();
    }
    if (appOperations.graphicalHintValue !== "") {
      dispatch(
        addGraphicalHintsWithOrder({
          hint: appOperations.graphicalHintValue,
          hintsOrder: graphicalHintOrder,
        })
      );
      props.onHide();
    }
  };

  const clickClose = (event: any) => {
    event.preventDefault();
    dispatch(clearArray());
    props.onHide();
  };
  return (
    <Fragment>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            HINTS ORDER
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-muted text-center">
            <i> Provide hints order in Number (1,2,3...n)</i>
          </h5>
          <div className="card-deck">
            {appOperations.scriptHintValue !== "" && (
              <>
                <label htmlFor="basic-url" className="form-label">
                  Script Hint
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text text-wrap">
                      {appOperations.scriptHintValue}
                    </span>
                  </div>
                  <input
                    type="number"
                    style={{ maxWidth: "100px" }}
                    placeholder="Your Order"
                    className="form-control form-control-sm"
                    onChange={(e: any) => {
                      setScriptHintOrder(Number(e.target.value));
                    }}
                  />
                </div>
              </>
            )}
            <br />
            {appOperations.graphicalHintValue !== "" && (
              <>
                <label htmlFor="basic-url" className="form-label">
                  Graphical Hint
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text text-wrap">
                      {appOperations.graphicalHintValue}
                    </span>
                  </div>
                  <input
                    type="number"
                    style={{ maxWidth: "100px" }}
                    placeholder="Your Order"
                    className="form-control form-control-sm"
                    onChange={(e: any) => {
                      setGraphicalHintOrder(Number(e.target.value));
                    }}
                  />
                </div>
              </>
            )}
            <br />
            {textHintsArr.textHintValue.length !== 0 && (
              <>
                <label htmlFor="basic-url" className="form-label">
                  Textual Hints
                </label>
                {textHintsArr.textHintValue.map((textHint, index) => (
                  <Fragment key={index}>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text text-wrap">
                          {textHint}
                        </span>
                      </div>
                      <input
                        type="number"
                        style={{ maxWidth: "100px" }}
                        className="form-control form-control-sm"
                        placeholder="Your Order"
                        id={`input-${index}`}
                        value={inputValues[`input-${index}`] || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <br />
                  </Fragment>
                ))}
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-outline-primary"
            onClick={saveOrderOfHints}
          >
            Save
          </button>
          <button className="btn btn-outline-primary" onClick={clickClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default HintsOrderModal;
