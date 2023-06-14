import React, { Fragment, useState } from "react";
import { Modal } from "react-bootstrap";
import { appCommonSliceRes } from "../../../store/adminAppCommonOperations";

import { useAppDispatch, useAppSelector } from "../../../store/config/hooks";
import { hintsWithOrder } from "../../../store/slices/hintsWithOrderSlice";
import { adminAppJSON } from "../../../store/adminAppJSONFormation";
import { saveHintsFromUser } from "../../../store/slices/saveHintsCollectionSlice";
import { saveQuestionAnswer } from "../../../store/slices/questionAndAnswerSlice";

const SaveConfirmation = (props: any) => {
  const appOperations = useAppSelector(appCommonSliceRes);
  const hints = useAppSelector(hintsWithOrder);
  const adminAppJson = useAppSelector(adminAppJSON);
  const dispatch = useAppDispatch();

  const adminAppJSONFormation = async (event: any) => {
    event.preventDefault();
    let hintsString = JSON.stringify(hints);
    let questionAnswerString = JSON.stringify(adminAppJson);
    if (
      hints.textHints.length > 0 ||
      hints.scriptHints.length > 0 ||
      hints.graphicalHints.length > 0
    ) {
      const saveHintsCollection = await dispatch(
        saveHintsFromUser(hintsString)
      );
    }
    if (adminAppJson.question !== "") {
      const saveQuestionAndAnswer = await dispatch(
        saveQuestionAnswer(questionAnswerString)
      );
    } else {
      console.log(
        "saved Graph alone Result with save map id",
        appOperations.saveMapId
      );
    }
    window.location.reload();
  };
  const cancelSaveConfirmation = async (event: any) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/deleteGraphById/${appOperations.saveMapId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        props.onHide();
        console.log("Deleted Successfully");
      } else {
        console.log("Failed to delete the example in backend");
      }
    } catch (error) {
      console.log("An error occurred while deleting the example.");
    }
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
        <Modal.Body className="text-center">
          <h6>Are you Sure want to save the changes? Please confirm</h6>
          <br />
          <div className="justify-content-center">
            <button className="btn btn-primary" onClick={adminAppJSONFormation}>
              Confirm
            </button>
            &nbsp;&nbsp;
            <button
              className="btn btn-primary"
              onClick={cancelSaveConfirmation}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default SaveConfirmation;
