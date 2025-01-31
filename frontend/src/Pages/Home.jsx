import NoteContainer from "../Notes/NoteContanier"
import SideBar from "../sidebar/SidBar"

const Home = () => {
    return(
        <>
        <div className="flex">
            <SideBar/>
            <NoteContainer/>
        </div>
        </>
    )
}
export default Home