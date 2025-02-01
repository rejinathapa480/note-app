
import Nav from "./Nav";

const Note = () => {

  return (
    <>
    <section className="border border-black">
       <Nav/>
      <div className="flex flex-wrap gap-5 border border-b-lime-900">
        <div className="w-[45%] bg-red-500">
          <textarea className="w-80 h-52 flex-1" />
          <p className="py-2">10:20 AM sunday</p>
        </div>
        <div className="w-[45%] bg-red-500">
          <textarea className="w-full h-52 flex-1" />
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
