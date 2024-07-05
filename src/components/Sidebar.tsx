import React, { useState } from "react";
import { Link } from "react-router-dom";

interface MenuItem {
  title: string;
  slug: string;
  icon: JSX.Element;
}

interface SidebarItem {
  title: string;
  slug: string;
  menuItems: MenuItem[];
  icon: JSX.Element;
}

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const demoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width={16}
    height={16}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l9-9 9 9M4 10v10h6v-6h4v6h6V10"
    />
  </svg>
);
const demoIcon2 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={16}
    height={16}
  >
    <circle
      cx={12}
      cy={12}
      r={10}
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
    />
    <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
  </svg>
);

const sidebarData: SidebarItem[] = [
  {
    title: "Home",
    slug: "/",
    menuItems: [],
    icon: demoIcon,
  },
  {
    title: "Payroll Information",
    slug: "/payroll",
    menuItems: [
      { title: "Payroll Provider", slug: "/payroll/provider", icon: demoIcon2 },
      { title: "Payroll Schedule", slug: "/payroll/schedule", icon: demoIcon2 },
    ],
    icon: demoIcon,
  },
  {
    title: "Categories",
    slug: "/categories",
    menuItems: [
      { title: "Cat1", slug: "/categories/cat1", icon: demoIcon2 },
      { title: "Cat2", slug: "/categories/cat2", icon: demoIcon2 },
      { title: "Cat3", slug: "/categories/cat3", icon: demoIcon2 },
    ],
    icon: demoIcon,
  },
];

const MenuBarIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    height={10}
    width={10}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    if (!isExpanded) {
      toggleSidebar();
    }
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div
      className={`bg-white text-black border-e shadow h-full transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div className="border-b">
      {isExpanded ? <div className="p-3 flex items-center justify-between">
        <div>
        <h4 className="text-xl font-bold">Atlas Global</h4> 
        <div className="flex items-center justify-start gap-2 bg-amber-200/50 px-3 py-2 w-fit rounded-3xl my-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={16}
          height={16}
        >
          <circle
            cx={12}
            cy={12}
            r={10}
            stroke="currentColor"
            strokeWidth={1.5}
            fill="none"
          />
          <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
        </svg>
        <span className="font-bold uppercase text-black text-sm">In Progress</span>
        </div>
        </div>
        <button
        className="text-black p-3 border m-2 rounded-full"
        onClick={toggleSidebar}
      >
        {MenuBarIcon}
      </button>
      </div> : <div className="flex items-center justify-center">
      <button
        className="text-black p-3 border m-2 rounded-full"
        onClick={toggleSidebar}
      >
        {MenuBarIcon}
      </button>
        </div>}
      </div>
      {isExpanded && <h4 className="text-gray-500 uppercase text-center text-sm font-medium py-2">Company Information Form</h4>}
      <ul className="mt-4">
        {sidebarData.map((item, index) => (
          <li key={index} className="p-2">
            <div
              className={`flex items-center p-2 cursor-pointer ${
                isExpanded ? "" : "justify-center"
              }`}
              onClick={() => handleItemClick(index)}
            >
              <div className="flex items-center space-x-2">
                {item.menuItems.length > 0 && isExpanded && (
                  <button className="mr-auto">
                    {expandedIndex === index ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        width={10}
                        height={10}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        width={10}
                        height={10}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>
                )}
                {item.icon}
                {isExpanded && (
                  <Link to={item.slug} className="font-bold">
                    {item.title}
                  </Link>
                )}
              </div>
              {item.menuItems.length > 0 && isExpanded && (
                <button className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={16}
                    height={16}
                  >
                    <circle
                      cx={12}
                      cy={12}
                      r={10}
                      stroke="currentColor"
                      strokeWidth={1.5}
                      fill="none"
                    />
                    <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
                  </svg>
                </button>
              )}
            </div>
            {expandedIndex === index &&
              item.menuItems.length > 0 &&
              isExpanded && (
                <ul className="pl-8">
                  {item.menuItems.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="p-2 hover:bg-sky-100 hover:text-[#17597B] hover:font-bold"
                    >
                      <Link
                        to={subItem.slug}
                        className="flex items-center justify-between"
                      >
                        {subItem.title} {subItem.icon}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
