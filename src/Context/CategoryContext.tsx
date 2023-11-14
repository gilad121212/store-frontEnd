import React, { createContext, useState, useEffect } from "react";

type category = {
  img: string;
  category_name: string;
  id:string
 
};
interface UserContextProviderProps {
  children: React.ReactNode;
}
interface UserContextType {
    category: category[] | null;
    setCategory: React.Dispatch<React.SetStateAction<category[] | null>>;

}

export const UserContext = createContext<UserContextType | null>(null);

export function CategoryData(props: UserContextProviderProps) {
  const [category, setCategory] = useState<category[] | null>(null);
  useEffect(() => {
    const data = async () => {
      let data = await fetch("http://localhost:3009/products/");
      let jdata = await data.json();
      setCategory(jdata);
    };
    data();
  }, []);
  return (
    <UserContext.Provider value={{ category, setCategory }}>
      {props.children}
    </UserContext.Provider>
  );
}