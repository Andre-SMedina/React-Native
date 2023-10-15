import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function PasswordItem({ data, removePassword }) {
  const [visible, setVisible] = useState(false);
  const [opt, setOpt] = useState(false);
  const icon = opt ? "eye" : "eye-off";

  const focused = useIsFocused();

  useEffect(() => {
    setOpt(false);
    setVisible(false);
  }, [focused]);

  return (
    <Pressable onLongPress={removePassword} style={styles.container}>
      {opt ? (
        <Text style={styles.text}>{data}</Text>
      ) : (
        <Text style={{ color: "#fff" }}> *********</Text>
      )}
      <Ionicons
        onPress={() => {
          setVisible(!visible);
          setOpt(!opt);
        }}
        name={icon}
        size={20}
        color="#fff"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e0e0e",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
