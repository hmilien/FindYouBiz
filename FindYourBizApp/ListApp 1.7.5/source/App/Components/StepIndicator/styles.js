import { StyleSheet } from "react-native";
import { Color, Constants } from "@common";

export default StyleSheet.create({
  container: {
    paddingBottom: 0,
    paddingTop: 30,
  },
  labelContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "space-between"
  },
  label: {
    color: Color.blackTextDisable,
    fontSize: 12,
    textAlign: "center",
    fontFamily: Constants.fontHeader
  },
  labelActive: {
    color: Color.text,
    fontFamily: Constants.fontHeader
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8
  },
  largeTitle: {
    fontSize: 25,
    marginLeft: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
