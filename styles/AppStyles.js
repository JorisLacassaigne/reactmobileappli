import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightpink",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: "lightpink",
    borderRadius: 10,
    marginTop: 10
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalView: {
    width: '90%', // Ajustez cette valeur si nécessaire
    maxWidth: 500, // Optionnel, pour limiter la largeur maximale
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  text: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
  },
  modalText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    paddingBottom:10,
  },
  textInput: {
    height: 40, // Hauteur du champ de texte
    borderColor: '#ccc', // Couleur de la bordure
    borderWidth: 1, // Largeur de la bordure
    borderRadius: 5, // Bordures arrondies
    paddingHorizontal: 10, // Espacement horizontal à l'intérieur du champ de texte
    backgroundColor: '#fff', // Couleur de fond
    fontFamily: "Inter_600SemiBold",
    fontSize: 15, // Taille de la police
    width: '80%', // Prend toute la largeur du conteneur parent
    marginVertical: 10, // Espacement vertical autour du champ de texte
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 200,
    margin: 10,
    textAlign: "center"
  },
  buttonValidate: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 10,
  },
  buttonWarning: {
    backgroundColor: "lightred",
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 10,
  },
  textError: {
    color: "red",
  },
});
