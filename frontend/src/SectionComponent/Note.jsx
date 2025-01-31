import Nav from "./Nav";

const Note = () => {
  return (
    <>
    <section>
     <Nav/>
      <div className="flex  gap-5 flex-wrap justify-center items-center w-[80%] border border-red-700  ">
        <div className="w-92 bg-red-500">
          <textarea className="w-80 h-52 flex-1" />
          <p className="py-2">10:20 AM sunday</p>
        </div>
        <div className="w-92 bg-red-500">
          <textarea className="w-80 h-52 flex-1" />
          <p className="py-2">10:20 AM sunday</p>
        </div>
        <div className="w-92 bg-red-500">
          <textarea className="w-80 h-52 flex-1" />
          <p className="py-2">10:20 AM sunday</p>
        </div>
        <div className="w-92 bg-red-500">
          <textarea className="w-80 h-52 flex-1" />
          <p className="py-2">10:20 AM sunday</p>
        </div>
        <div className="w-92 bg-red-500">
          <textarea className="w-80 h-52 flex-1" />
          <p className="py-2">10:20 AM sunday</p>
        </div>
        <div className="w-92 bg-red-500">
          <textarea className="w-80 h-52 flex-1" />
          <p className="py-2">10:20 AM sunday</p>
        </div>
      </div>
    </section>
    </>
  );
};
export default Note;
