import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";
import { useEffect, useState } from "react";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    await api
      .post("projects", { title: "Carai", owner: "Andre" })
      .then((res) => {
        setProjects([...projects, res.data]);
      });
  }

  return (
    //SafeAreaView serve para o conteúdo ficar abaixo da barra de status
    <SafeAreaView style={styles.container}>
      {/* Flatlist serve para percorrer arrays */}
      <FlatList
        style={styles.flat}
        data={projects} //recebe um aray
        keyExtractor={(project) => project.id} //usa a id contida em um cada item do array
        //passa "item" como parâmetro, sendo desestruturado e renomeado como "project". Project será cada item do array
        renderItem={({ item: project }) => (
          <Text style={styles.project}>{project.title}</Text>
        )}
      />
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.6}
        onPress={handleAddProject}
      >
        <Text style={styles.btnText}> Adicionar</Text>
      </TouchableOpacity>
    </SafeAreaView>
    // <View style={styles.container}>
    //   {projects.map((project) => (
    //     <Text style={styles.title} key={project.id}>
    //       Nome do projeto: {project.title}
    //     </Text>
    //   ))}
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
    paddingTop: 30,
  },
  flat: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  project: {
    color: "white",
    fontSize: 20,
  },
  btn: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
