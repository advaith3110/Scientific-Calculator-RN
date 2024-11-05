import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { evaluate, round } from "mathjs";

export default function ScientificCalculator() {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState("");

  const handlePress = (value) => {
    if (value === "C") {
      setInput("0");
      setResult("");
    } else if (value === "⌫") {
      if (input.length === 1) {
        setInput("0");
      } else {
        setInput(input.slice(0, -1));
      }
    } else if (value === "=") {
      try {
        const formattedInput = input
          .replace(/√/g, "sqrt")
          .replace(/sin\(/g, "sin(")
          .replace(/cos\(/g, "cos(")
          .replace(/tan\(/g, "tan(")
          .replace(/log\(/g, "log10(")
          .replace(/ln\(/g, "log(")
          .replace(/%/g, "*0.01");

        const evalResult = evaluate(formattedInput);
        setResult(round(evalResult, 10).toString());
      } catch (error) {
        setResult("Error");
      }
    } else if (["sin", "cos", "tan", "log", "ln"].includes(value)) {
      setInput((input === "0" ? "" : input) + `${value}(`);
    } else if (value === "√") {
      setInput((input === "0" ? "" : input) + "sqrt(");
    } else if (value === "^") {
      setInput((input === "0" ? "" : input) + "^");
    } else {
      if (input === "0" && !["+", "-", "*", "/"].includes(value)) {
        setInput(value);
      } else {
        setInput(input + value);
      }
    }
  };

  const buttons = [
    ["C", "(", ")", "⌫"],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    [".", "0", "=", "+"],
    ["sin", "cos", "tan", "√"],
    ["log", "ln", "^", "%"]
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.input}>{input}</Text>
        </ScrollView>
        {result !== "" && <Text style={styles.result}>{result}</Text>}
      </View>
      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button) => (
              <TouchableOpacity
                key={button}
                style={[styles.button, ["sin", "cos", "tan", "√", "log", "ln", "^", "%"].includes(button) ? styles.functionButton : null]}
                onPress={() => handlePress(button)}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  displayContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#333",
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  input: {
    fontSize: 32,
    color: "#fff",
    textAlign: "right",
  },
  result: {
    fontSize: 40,
    color: "#00ff00",
    marginTop: 10,
    textAlign: "right",
  },
  buttonsContainer: {
    flex: 0.7,
    paddingHorizontal: 10,
    paddingBottom: 20,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4e4e4e",
    paddingVertical: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  functionButton: {
    backgroundColor: "#757575",
  },
  buttonText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
});
