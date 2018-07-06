import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  Animated
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Category from "./components/Explore/Category";
import Home from "./components/Explore/Home";
import Tag from "./components/Explore/Tag";

const { height, width } = Dimensions.get("window");

class Explore extends Component {
  componentWillMount() { 

    this.scrollY = new Animated.Value(0.01);

    this.startHeaderHeight = 80;
    this.endHeaderHeight = 50;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
      this.endHeaderHeight = 70 + StatusBar.currentHeight;
    }

    this.animatedHeaderHeight = this.scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [ this.startHeaderHeight, this.endHeaderHeight ],
        extrapolate: 'clamp'
    });

    this.animatedOpacity = this.animatedHeaderHeight.interpolate({
        inputRange: [ this.endHeaderHeight, this.startHeaderHeight ],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    this.animatedTop = this.animatedHeaderHeight.interpolate({
        inputRange: [ this.endHeaderHeight, this.startHeaderHeight ],
        outputRange: [-30, 10],
        extrapolate: 'clamp'
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              height: this.animatedHeaderHeight,
              backgroundColor: "white",
              borderBottomColor: "#ddd",
              borderBottomWidth: 1
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                backgroundColor: "white",
                marginHorizontal: 20,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: "black",
                shadowOpacity: 0.2,
                elevation: 1,
                marginTop: Platform.OS == "android" ? 30 : null
              }}
            >
              <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Try Abs"
                placeholderTextColor="grey"
                style={{ flex: 1, fontWeight: "700", backgroundColor: "white" }}
              />
            </View>
            <Animated.View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                position: "relative",
                top: this.animatedTop,
                opacity: this.animatedOpacity
              }}
            >
              <Tag name="Beginner" />
              <Tag name="Abs" />
            </Animated.View>
          </Animated.View>

          <ScrollView 
          scrollEventThrottle={16}
          onScroll={
              Animated.event(
                  [
                      { nativeEvent: {contentOffset:{y: this.scrollY }}}
                  ]
              )
          }
          >
            <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  paddingHorizontal: 20
                }}
              >
                What's your Goal, Chetan?
              </Text>
              <View style={{ height: 130, marginTop: 20 }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <Category
                    imageUri={require("../assets/gym.jpg")}
                    name="Muscle"
                  />
                  <Category
                    imageUri={require("../assets/hiit.jpg")}
                    name="Fitness"
                  />
                  <Category
                    imageUri={require("../assets/yoga.jpeg")}
                    name="Peace"
                  />
                </ScrollView>
              </View>

              <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "700"
                  }}
                >
                  Introducing Fitness Plus
                </Text>
                <Text style={{ fontWeight: "100", marginTop: 10 }}>
                  A unique fitness and Diet plan for everyone
                </Text>

                <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                  <Image
                    style={{
                      flex: 1,
                      width: null,
                      height: null,
                      resizeMode: "cover",
                      borderRadius: 5,
                      borderColor: "#ddd",
                      borderWidth: 1
                    }}
                    source={require("../assets/gym.jpg")}
                  />
                </View>
              </View>
            </View>
            <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: "700" }}>
                Our Fitness Plans
              </Text>
              <View
                style={{
                  marginTop: 15,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between"
                }}
              >
                <Home
                  width={width}
                  name="HIIT Full Body"
                  type="45,950 joined and counting"
                  price={82}
                  rating={3}
                  imageUri={require('../assets/hiit.jpg')}
                />
                <Home
                  width={width}
                  name="Muscle building"
                  type="77,191 joined and counting"
                  price={72}
                  rating={4}
                  imageUri={require('../assets/gym.jpg')}
                />
                <Home
                  width={width}
                  name="The Inner peace"
                  type="91,890 joined and counting"
                  price={99}
                  rating={5}
                  imageUri={require('../assets/yoga.jpeg')}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
