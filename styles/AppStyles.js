import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightpink",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
  },
  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 17,
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    resizeMode: "contain",
  },
  item: {
    alignItems: "center",
    marginTop: 20,
  },
  containerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  titleNav: {
    textAlign: "center",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 200,
    margin: 10,
  },
  buttonValidate: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 10,
  },
  textError: {
    color: "red",
  },
});
