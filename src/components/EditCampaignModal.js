import React, { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

import { DataStore } from "@aws-amplify/datastore";

import { Coupon, Business } from "../models";
import { parseISO } from "date-fns/esm";
import { format } from "date-fns";

function EditCampaignModal(props) {
  const [couponText, setCouponText] = useState("");
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);

  // useEffect(() => {
  //   setCurrentCouponValues();
  // }, []);

  async function setCurrentCouponValues() {
    try {
      const thisCoupon = await DataStore.query(Coupon, props.id);
      setCouponText(thisCoupon.itemDescription);
      setStartDate(thisCoupon.startDate);
      setEndDate(thisCoupon.expirationDate);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleedit() {
    // const thisCoupon = await DataStore.query(Coupon, props.coupon);
    // e.preventDefault();
    // updated.startDate = format(parseISO(startDate), "yyyy-mm-dd"),
    //       updated.expirationDate = format(parseISO(endDate), "yyyy-mm-dd")
    try {
      const original = await DataStore.query(Coupon, props.id);
      const start_date = format(parseISO(startDate), "yyyy-mm-dd");
      const end_date = format(parseISO(endDate), "yyyy-mm-dd");

      await DataStore.save(
        Coupon.copyOf(original, (updated) => {
          updated.itemDescription = couponText;
          updated.startDate = start_date;
          updated.expirationDate = end_date;
        })
      );
      console.log("Coupon edited successfully!");
    } catch (error) {
      console.log("Error editing coupon", error);
    }
  }

  return (
    <Modal
      show={props.show}
      onShow={() => setCurrentCouponValues()}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // restoreFocus="true"
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit the coupon campaign:
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <Form onSubmit={handleedit}>
          <Form.Group className="mb-3" controlId="formGridCoupon">
            <Form.Label>Coupon</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={couponText}
              onChange={(e) => setCouponText(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridStartDate">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridExpireDate">
              <Form.Label>Expiration date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Row>

          {/* <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}

          <Button variant="primary" type="submit">
            {/* onClick={() => handleSubmit()} */}
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditCampaignModal;
