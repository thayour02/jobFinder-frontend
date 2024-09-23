import { Menu } from "@headlessui/react"
import { BiChevronDown } from "react-icons/bi"
import { useSelector } from "react-redux"

export default function MenuList(){

    const { user } = useSelector((state)=> state.user)

        return(
            <div>
                <Menu as='div'>
                    <div className="flex">
                        <Menu.Button className='inline-flex gap-2 w-full rounded-md bg-white md:px-4
                         py-2 text-sm font-medium text-purple-700 hover:bg-opacity-20'>
                            <div className="leading[80px] flex flex-col items-start">
                                <p className="text-sm font-semibold">{user?.firstName ?? user?.name}</p>
                                <span>{user?.jobTitle ?? user?.email}</span>
                            </div>
                            <img
                            src={user?.profileUrl}
                            alt={user?.accountType === "Seeker" ? "user-profile" : "company-profile"}
                            className="w-10 h-10 rounded-full"/>
                        </Menu.Button>
                        <BiChevronDown/>
                    </div>
                </Menu>
            </div>
    )
}
