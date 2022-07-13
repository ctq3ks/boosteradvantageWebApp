// import EditCampaignModal from "./EditCampaignModal";
// import CreateCampaignModal from "./CreateCampaignModal";
// import DeleteCampaignModal from "./DeleteCampaignModal";
import React, { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
// import * as queries from "../../graphql/queries";
// import { S3Image } from "aws-amplify-react-native";

// import { Link as ReachLink } from '@reach/router';

// IMPORTING BOOTSRAP AND OTHER UI COMPONENETS
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

import "../screens/CampaignScreen/styles.css";

const CampaignsComponent = (props) => {
  const [isCouponSelected, setIsCouponSelected] = useState(false);

  useEffect(() => {
    // await DataStore.clear();
    if (props.currentCouponID == props.coupon.id) {
      setIsCouponSelected(true);
    } else {
      setIsCouponSelected(false);
    }
    //unsubscribe to data updates when component is destroyed so that we don’t introduce a memory leak.
  }, [props.currentCouponID]);

  useEffect(() => {
    // await DataStore.clear();
    if (isCouponSelected == false) {
      props.callback("");
    }
    //unsubscribe to data updates when component is destroyed so that we don’t introduce a memory leak.
  }, [isCouponSelected]);

  return (
    <View
      className="CouponContainer"
      onClick={() => {
        props.callback(props.coupon.id);
        setIsCouponSelected(!isCouponSelected);
      }}
    >
      {/* <View className="EditDeleteContainer" >
                <Button className="EditButton" onClick={() => {setCurrentCouponID(item.id);console.log("success"+ currentCouponID)}}>setcoupon</Button>
                </View> */}

      <View
        className={
          isCouponSelected
            ? "CouponItemContainerSelected"
            : "CouponItemContainer"
        }
        variation="elevated"
      >
        <View className="CouponItemContainerDescription">
          <Text className="CouponItemText">{props.coupon.itemDescription}</Text>
        </View>
        <View className="CouponItemContainerExpiration">
          <Text className="CouponItemText">{props.coupon.id}</Text>
        </View>
        <View className="CouponItemContainerExpiration">
          <Text className="CouponItemText">{props.coupon.expirationDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default CampaignsComponent;
