import { KanbanBoard } from "./features/kanban/KanbanBoard";
import { Header } from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mt-4 p-4 md:p-6 flex-1">
        <KanbanBoard />
      </main>
    </div>
  );
}
