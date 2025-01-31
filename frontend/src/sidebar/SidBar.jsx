import { FaPlus } from "react-icons/fa";
const SideBar = () => {
  const colors = ["#fe9b72", "#8AC926", "#0D1B2A", "#778DA9", "#1B263B "];
  return (
    <>
      <div className="px-20">
        <FaPlus className="border border-red-600" />
        <ul>
          {colors?.map((item, index) => (
            <li
              key={index}
              className=" w-52 border-2 border-red-600"
              style={{ backgroundColor: item }}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
export default SideBar;
