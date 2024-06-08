import {
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import UserInfoAsyncStorage from "../../Utils/UserInfoAsyncStorage";
import useClientInformation from "../../Screens/ProfileUserScreen/ProfileInformation/useClientInformation";
import styles from "./Header.Styles";
import { formatDate } from "../../Utils/helper";
const HeaderComponents = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await UserInfoAsyncStorage.getUserInfo("UserInfo");
        setUserId(result.farm._id);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  const { dataClient, isSuccessClientInformation, isLoadingClientInformation } =
    useClientInformation({
      clientId: userId,
    });

  return (
    <View style={styles.container}>
      {isSuccessClientInformation && (
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{dataClient.address}</Text>
            <Text style={styles.headerSubtitle}>{formatDate(new Date())}</Text>
          </View>

          <View style={styles.body}>
            <Image
              source={{
                uri: "https://image.pngaaa.com/764/3043764-middle.png",
              }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{dataClient.name}</Text>
              <Text style={styles.userRole}>{dataClient.email}</Text>
            </View>
          </View>
        </View>
      )}
      {isLoadingClientInformation && (
        <ActivityIndicator size="large" color="#00ff00" />
      )}
    </View>
  );
};

export default HeaderComponents;
