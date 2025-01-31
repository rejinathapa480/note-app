import Note from "../SectionComponent/Note";
import SideBar from "../SidebarComponent/SideBar";

const Home = () => {
  return (
    <>
      <div className="flex justify-between ">
        <SideBar />
        <Note />
      </div>
    </>
  );
};
export default Home;
