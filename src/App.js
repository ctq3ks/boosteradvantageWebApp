import React, { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
// import * as queries from "../../graphql/queries";
// import { S3Image } from "aws-amplify-react-native";
import { Coupon } from "./models";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

// import { Link as ReachLink } from '@reach/router';

import Amplify, { Auth } from "aws-amplify";
import config from "./aws-exports";

import { NavBar } from "./ui-components";

// IMPORTING BOOTSRAP AND OTHER UI COMPONENETS
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  Text,
  View,
  Card,
  Flex,
  Tabs,
  TabItem,
  ThemeProvider,
  ScrollView,
  Authenticator,
  // Link,
} from "@aws-amplify/ui-react";

//IMPORTING OTHER CUSTOM SCREENS AND COMPONENETS

import Profile from "./screens/Profile";
import Campaign from "./screens/CampaignScreen/index.tsx";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

Amplify.configure(config);

// const cardTheme = {
//   name: "card-theme",
//   tokens: {
//     components: {
//       card: {
//         // You can reference other tokens
//         backgroundColor: { value: "{colors.background.success.value}" },
//         outlined: {
//           // Or use explicit values
//           borderWidth: { value: "10px" },
//         },
//         elevated: {
//           boxShadow: { value: "{shadows.large.value}" },
//         },
//       },
//     },
//   },
// };

const theme = {
  name: "tabs-theme",
  tokens: {
    // colors: {
    //   border: {
    //     secondary: { value: "#23233F" },
    //   },
    // },
    components: {
      tabs: {
        item: {
          color: { value: "#23233F" },
          _active: {
            color: { value: "#D66838" },
            borderColor: { value: "#D66838" },
          },
        },
      },
    },
  },
};

const getData = async (setUserGroup, setLoaded) => {
  try {
    const token = await Auth.currentSession().then(
      (data) => data.accessToken.payload["cognito:groups"]
    );
    if (token !== null) {
      setUserGroup(token);
    }
  } catch (e) {
    // error reading value
  }
  setLoaded(true);
};

function App({ signOut }) {
  const [userGroup, setUserGroup] = useState("");
  const [isLoaded, setLoaded] = React.useState(false);
  // const nav = useNavigate();

  useEffect(() => {
    getData(setUserGroup, setLoaded);
  }, []);

  if (!isLoaded) {
    return null;
  }

  const services = {
    async handleSignIn(formData) {
      let { username, password } = formData;
      return userGroup == "businessAdmin"
        ? Auth.signIn({
            username,
            password,
          })
        : Auth.signIn({
            username,
            password,
          });
    },
  };
  // const nav = useNavigate();

  //   const out = async () => {
  //     try {
  //         await Auth.signOut();
  //         nav("/");
  //     } catch (error) {
  //         console.log('error signing out: ', error);
  //     }
  // }

  return (
    <Authenticator services={services} initialState="signIn">
      <ThemeProvider theme={theme}>
        <View direction="column">
          <View className="Header">
            <Heading level={2}>Booster Advantage</Heading>
          </View>
          {userGroup == "businessAdmin" ? (
            <Tabs spacing="equal">
              <TabItem title="Campaigns">{<Campaign />}</TabItem>
              <TabItem title="Fundraisers">Content of the second tab</TabItem>
              <TabItem title="Profile">{<Profile />}</TabItem>
            </Tabs>
          ) : userGroup == "schoolAdmin" ? (
            <Tabs spacing="equal">
              <TabItem title="Athletics">{<Campaign />}</TabItem>
              <TabItem title="Fundraisers">BLAJDKF</TabItem>
              <TabItem title="Profile">{<Profile />}</TabItem>
            </Tabs>
          ) : (
            <Tabs spacing="equal">
              <TabItem title="Coming Soon Functionality">
                {<Campaign />}
              </TabItem>
              {/* <TabItem title="Fundraisers">{Auth.currentAuthenticatedUser().name}</TabItem> */}
            </Tabs>
          )}
          {/* <Tabs spacing="equal">
            <TabItem title="Campaigns">{<Campaign />}</TabItem>
            <TabItem title="Fundraisers">Content of the second tab</TabItem>
            <TabItem title="Profile">{<Profile />}</TabItem>
          </Tabs> */}
          {/* <Button onClick={signOut}>Sign out</Button> */}
        </View>
      </ThemeProvider>
    </Authenticator>

    //   <div>
    //     <div class="container">
    //       <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
    //         <a
    //           href="/"
    //           class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
    //         >
    //           <span class="fs-4">Booster Advantage</span>
    //         </a>

    //         <ul class="nav nav-pills">
    //           <li class="nav-item">
    //             <a class="nav-link">
    //               <Link to="/">Coupons</Link>
    //             </a>
    //           </li>
    //           <li class="nav-item">
    //             <a class="nav-link">
    //               <Link to="/about">Fundraisers</Link>
    //             </a>
    //           </li>
    //           <li class="nav-item">
    //             <a class="nav-link">
    //               <Link to="/about">Business Profile</Link>
    //             </a>
    //           </li>
    //         </ul>
    //       </header>
    //     </div>
    //   <Navbar bg="light" variant="light">
    //     <Container>
    //       <Navbar.Brand href="#Campaign">Navbar with text</Navbar.Brand>
    //       <Navbar.Toggle />
    //       <Navbar.Collapse className="justify-content-end">
    //         <Nav.Link href="#Campaign">Campaign</Nav.Link>
    //         <Nav.Link href="#link">Link</Nav.Link>
    //         <Navbar.Text>
    //           Signed in as: <a href="#login">Mark Otto</a>
    //         </Navbar.Text>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    //   <View className="App">
    //   <Card>
    //     <Image src={logo} className="App-logo" alt="logo" />
    //     <Heading level={1}>We now have Auth!</Heading>
    //   </Card>
    //  <Button onClick={signOut}>Sign Out</Button>
    // </View>
    //     <Routes>
    //       <Route path="/about" component={<About />}></Route>
    //       <Route path="/" component={<Campaign />}></Route>
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default withAuthenticator(App);
