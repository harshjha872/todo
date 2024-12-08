import DateTopbar from "./components/DateTopbar/DateTopbar";
import SingleTask from "./components/SingleTask/SingleTask";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col bg-zinc-300 h-full w-[600px] mx-auto">
        {/* top bar for dates */}
        <DateTopbar />

        {/* Tasks */}
        <div className="flex flex-col">
          <div>task 1</div>
          <div>task 2</div>
          <div>task 3</div>
          <SingleTask />
        </div>
      </div>
    </div>
  );
}
