import { Link } from "react-router";

const menuList = [
  {id: 1, label: "Home", link: "/"},
  {id: 2, label: "About", link: "/about"},
  {id: 3, label: "設計図", link: "/blueprint"}
]

function SideMenu() {
  return (
    <div className={"max-w-[300px] md:min-w-[20%] min-h-screen bg-gray-100 shadow-md shadow-black-200"}>
      <ul className={"p-4"}>
        {
          menuList.map((item) => (
            <li key={item.id} className={"first:mt-0 mt-2"}>
              <Link to={item.link}>{item.label}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default SideMenu