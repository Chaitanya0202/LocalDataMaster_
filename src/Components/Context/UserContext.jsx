import { createContext, useContext, useState } from "react";
import axios from "axios";
const AppContext = createContext();

const AppProvider = ({ children }) => {

  const BASE_URL="http://localhost:8080/"

  const [isOnline, setIsOnline] = useState(true);

  const [peopleList, setPeopleList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const showData = () => {
    const storedPeopleList =
      JSON.parse(localStorage.getItem("peopleList")) || [];
    setPeopleList(storedPeopleList);
  };

  const deleteData = (index) => {
    const updatedPeopleList = peopleList.filter((_, i) => i !== index);
    localStorage.setItem("peopleList", JSON.stringify(updatedPeopleList));
    setPeopleList(updatedPeopleList);
  };

  const saveData = async (e) => {
    e.preventDefault();
    if (isOnline) {
        try {
            await axios.post(`${BASE_URL}saveUser`, formData);
            alert(" You Data Successfully Stored In DataBase")
        } catch (error) {
            alert("Sorry , Don't Have Server now \n Disconnect Your Internet Then Try")
            
        }
    } else {
      console.log("Data Stored in Local Storage Bcaz You Re Offline");

      const updatedPeopleList = [...peopleList, formData];
      localStorage.setItem("peopleList", JSON.stringify(updatedPeopleList));
      setPeopleList(updatedPeopleList);
    }
    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
      password: "",
    });
  };


  
  return (
    <AppContext.Provider value={{formData,setFormData,showData,deleteData,saveData,peopleList,isOnline,setIsOnline,setPeopleList,BASE_URL}}>
      {children}
    </AppContext.Provider>
  );
};

// costom hook
const useGlobelContext = () => {
  return useContext(AppContext);
};
export { AppProvider, AppContext, useGlobelContext };
