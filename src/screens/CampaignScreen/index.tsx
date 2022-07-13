import React, { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
// import * as queries from "../../graphql/queries";
// import { S3Image } from "aws-amplify-react-native";
import { Coupon } from "../../models";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

// import { Link as ReachLink } from '@reach/router';

// IMPORTING BOOTSRAP AND OTHER UI COMPONENETS
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
// import Button from 'react-bootstrap/Button';
import "@aws-amplify/ui-react/styles.css";

import {
  withAuthenticator,
  Heading,
  Image,
  Text,
  View,
  Card,
  Theme,
  Flex,
  Tabs,
  TabItem,
  ThemeProvider,
  Button,
  ScrollView,
  Authenticator,
  // Link,
} from "@aws-amplify/ui-react";

//IMPORTING OTHER CUSTOM SCREENS AND COMPONENETS

import EditCampaignModal from "../../components/EditCampaignModal";
import CreateCampaignModal from "../../components/CreateCampaignModal";
import DeleteCampaignModal from "../../components/DeleteCampaignModal";

//Importing styles for this screen

import "./styles.css";
import CampaignsComponent from "../../components/CampaignsComponent";

{/*In this screen the coupon components operate separately to highlight and change formatting. Pass in the component the following props:
key={item.id} coupon={item} callback={handleCallback} currentCouponID={currentCouponID}. the key is needed by react, the coupon is used to populate the
coupon fields and is used to set the current coupon id that is passed in via the callback function. The callback function passes in the setCurrentCouponID()
which allows you to set a currently selected coupon into the modals and populate it. The componeents need the current coupon id to handle where or not *this* coupon
is the current one selected (using a useEffect to monitor changes in the current coupon ID), its a ways of passing information between the campaign components.*/}


const Campaign = () => {
  const [Coupons, setCoupons] = useState([]);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  const [currentCouponID, setCurrentCouponID] = useState("");

  // const [couponText, setCouponText] = useState("");
  // const [startDate, setStartDate] = useState(Date);
  // const [endDate, setEndDate] = useState(Date);

  useEffect(() => {
    async function fetchCoupons() {
      // await DataStore.clear();
      const subscriptioncoupon = await DataStore.observeQuery(Coupon).subscribe(
        (snapshot) => {
          const { items, isSynced } = snapshot;
          setCoupons(items);
        }
      );
      return function cleanup() {
        subscriptioncoupon.unsubscribe();
      };
    }
    fetchCoupons();
    //unsubscribe to data updates when component is destroyed so that we don’t introduce a memory leak.
  }, []);

  const handleCallback = (childData: React.SetStateAction<string>) =>{
    setCurrentCouponID(childData)
  };

  // const comp = compLogoUrl(item.name);
  const data = Coupons.filter((coup) => coup.business.name == "Glory Days");
  return (
    <View>
      <ScrollView width="100%">
        {/* <View>{Coupons.length}</View> */}
        {data.map((item) => {
          return (
            // className="CouponsContainer"
            //Probably need to edit so that the key is actually unique
        
              //   <View className="CouponContainer" key={item.id}>
              //   <Button className="EditButton" onClick={() => { console.log(item.id);setCurrentCouponID(item.id)}}>edit</Button>
              // <Button className="EditButton" onClick={() => { setEditModalShow(true)}}>edit</Button>
              
              
              //  </View>

            <CampaignsComponent key={item.id} coupon={item} callback={handleCallback} currentCouponID={currentCouponID}/>

            //   <View className="CouponContainer" key={item.id} onClick={() => {setCurrentCouponID(item.id); setIsCouponSelected(!isCouponSelected)}}>
        
            //   <View className={isCouponSelected ? "CouponItemContainer" : "CouponItemContainerSelected"} variation="elevated">
            //       <View className="CouponItemContainerDescription">
            //         <Text className="CouponItemText">{item.itemDescription}</Text>
            //       </View>
            //       <View className="CouponItemContainerExpiration">
            //         <Text className="CouponItemText">{item.id}</Text>
            //       </View>
            //       <View className="CouponItemContainerExpiration">
            //         <Text className="CouponItemText">{item.expirationDate}</Text>
            //       </View>
            //   </View>
            // </View>
            
              
          );
        })}
      </ScrollView>

      {currentCouponID == "" ? null : <View className="EditDeleteContainer"><Button className="EditButton" onClick={() => setEditModalShow(true)}>edit</Button>
              <Button className="DeleteButton" onClick={() => setDeleteModalShow(true)}>delete</Button></View>
                  }
           
      <EditCampaignModal
        id={currentCouponID}
        // text={couponText}
        // start={startDate}
        // end={endDate}
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
      />
      <DeleteCampaignModal
        id={currentCouponID}
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
      />

      <View className="ShoppingCartContainer">
        <button className="ShoppingCartButton" onClick={() => setCreateModalShow(true)}>
          Create Coupon
        </button>
      </View>
      <CreateCampaignModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />
      {/* <Button onClick={this.props.signOut}>Sign out</Button> */}
    </View>
    // </ThemeProvider>
  );
};

export default Campaign;
