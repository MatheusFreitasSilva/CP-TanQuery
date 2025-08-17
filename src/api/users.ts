import axios from "axios";

export default async function fetchUsers() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;
  } catch (error) {
    console.log("Dados não encontrados", error);
    // Importante: lançar o erro para o React Query tratar como isError
    throw error;
  }
}
