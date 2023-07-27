import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, StyleSheet, Pressable, Text } from "react-native";

import { primaryColor } from "../../colors";
import {
  ASYNC_STATUS,
  checkToken,
  setMessage,
  signIn,
  useAppDispatch,
  useAppSelector,
} from "../../redux";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 40,
  },
  input: {
    borderRadius: 50,
    height: 50,
    maxWidth: 400,
    width: 260,
    backgroundColor: "#ddddddce",
    textAlign: "center",
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 50,
    backgroundColor: primaryColor,
    width: 200,
    borderRadius: 50,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    padding: 14,
  },
  error: {
    color: "red",
    height: 20,
  },
});

const Form = () => {
  const [zoom, setZoom] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch();
  const { message: error, status } = useAppSelector((state) => state.user);

  const handleFocusInput = () => {
    setZoom(true);
  };

  const handleBlurInput = () => {
    setZoom(false);
  };

  const handleSubmit = async () => {
    if (!username) {
      setMessage("Username is required");
      usernameRef.current?.focus();
      return;
    }
    if (!password) {
      setMessage("Password is required");
      passwordRef.current?.focus();
      return;
    }

    const payload = { phone: username, password };

    const result = await dispatch(signIn(payload));

    if (signIn.fulfilled.match(result)) {
      console.log("Login success");
    }
  };

  useEffect(() => {
    if (status === ASYNC_STATUS.IDLE) {
      dispatch(checkToken());
    }
  }, []);

  return (
    <View style={{ ...styles.container, flex: zoom ? 1 : undefined }} focusable>
      <TextInput
        style={styles.input}
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
        ref={usernameRef}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
        ref={passwordRef}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.error}>{error}</Text>
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Login</Text>
      </Pressable>
    </View>
  );
};

export default Form;
