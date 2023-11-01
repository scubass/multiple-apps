import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { CreateTodo } from "./create-todo";

export async function Todos() {
  const todos = await api.todo.getAll.query();
  const session = await getServerAuthSession();
  const authorized = session?.user;
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h1>{todo.subject}</h1>
          </li>
        ))}
      </ul>
      {authorized && <CreateTodo />}
    </div>
  );
}
