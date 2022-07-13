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
    // Link,
  } from "@aws-amplify/ui-react";

import Amplify, { Auth } from "aws-amplify";
  
const SignOut = () => (
  <Button onClick={() => Auth.signOut()}>Sign Out!</Button>
);

const Profile = () => {
    async function signout() {
        console.log("test");
        try {
        await Auth.signOut({ global: true });
        } catch (error) {
        console.log("error signing out: ", error);
        }
    }
    return (
    <>
    <SignOut />
    </>

    );
};

  export default Profile;