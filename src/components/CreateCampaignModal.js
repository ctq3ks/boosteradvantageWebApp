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

function CreateCampaignModal(props) {
  const [couponText, setCouponText] = useState("");
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);

  async function handlesubmit() {
    const thisBusiness = await DataStore.query(
      Business,
      "8a790f3a-e291-465e-8520-329cd4b53102"
    );
    console.log(thisBusiness.id);
    console.log(thisBusiness.name);
    console.log(thisBusiness);
    // e.preventDefault();
    try {
      await DataStore.save(
        new Coupon({
          itemDescription: couponText,
          business: thisBusiness,
          startDate: format(parseISO(startDate), "yyyy-mm-dd"),
          expirationDate: format(parseISO(endDate), "yyyy-mm-dd"),
        })
      );
      console.log("Coupon saved successfully!");
    } catch (error) {
      console.log("Error saving coupon", error);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // restoreFocus="true"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a coupon campaign
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlesubmit}>
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

export default CreateCampaignModal;
