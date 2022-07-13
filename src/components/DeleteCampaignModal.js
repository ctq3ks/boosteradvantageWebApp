import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

import { DataStore } from "@aws-amplify/datastore";

import { Coupon, Business } from "../models";
import { parseISO } from "date-fns/esm";

function DeleteCampaignModal(props) {
  const [couponText, setCouponText] = useState("");
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);

  async function handleconfirm() {
    // e.preventDefault();
    try {
      const thisCoupon = await DataStore.query(Coupon, props.id);
      DataStore.delete(thisCoupon);
      console.log("Coupon deleted!");
    } catch (error) {
      console.log("Error deleting coupon", error);
    }
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete coupon</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Caution: deleting coupons could confuse customers and tarnish your
        brands reputation!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleconfirm}>
          Understood
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteCampaignModal;
