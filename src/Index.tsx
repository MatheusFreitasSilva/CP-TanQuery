import React from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import fetchUsers from "./api/users";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Carregando usuários...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Erro ao carregar usuários</Text>
        <Text style={styles.errorMessage}>Mensagem de erro: {(error as Error)?.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>LISTA DE USUÁRIOS</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        refreshing={isFetching}
        onRefresh={refetch}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.info}>
                <Text style={styles.bold}>Nome:</Text> {item.name}
              </Text>
            </View>
            <Text style={styles.info}>
              <Text style={styles.bold}>Email:</Text> {item.email}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.bold}>Cidade:</Text> {item.address?.city}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#c00",
    marginBottom: 6,
  },
  errorMessage: {
    fontSize: 14,
    color: "#444",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 8,
    fontSize: 18,
  },
  listContent: {
    paddingBottom: 16,
  },
  item: {
    padding: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  info: {
    fontSize: 14,
    color: "#222",
    marginBottom: 6,
  },
  bold: {
    fontWeight: "bold",
  },
});
