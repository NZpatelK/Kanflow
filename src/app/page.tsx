'use client'
import Board from "./components/Board";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {
  return (
    <main>
      <LoadingSpinner />
      <Board />
    </main>
  );
}
