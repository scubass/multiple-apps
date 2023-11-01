import { Suspense } from "react";
import { Todos } from "./todos";

export const TodosSuspense = () => {
  return (
    <div>
      <Suspense fallback={<h1>Loading..</h1>}>
        <Todos />
      </Suspense>
    </div>
  );
};
