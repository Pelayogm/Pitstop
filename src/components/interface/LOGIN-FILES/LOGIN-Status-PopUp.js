import { useContext, useEffect, useState } from "react"
import notloggedImg from '../../../img/ui/user-not-logged.svg'
import '../interface_CSS/LOGIN-CSS/LOGIN-StatusPopup.css'
import { loginContext } from "./LOGIN-LoginContext";

export default function LoginStatusPopUp ({userAlias, userToken}) {
    const [open, setOpen] = useState(false)
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState({})
    const {userDataPopUp, setUserDataPopUp} = useContext(loginContext)

    const handleUserData = async (e) => {
        setOpen(true)
        debugger
        console.log(userAlias)
        console.log(userToken)
        try {
            const response = await fetch(`http://localhost:8080/pitstop/users/byAlias?alias=${userAlias}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`
                }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const res = await response.json();
            console.log(res)
            setUser(res)
            
        } catch (error) {
            console.error();
        } finally {
            console.log(user)
        }
    }

    const handleMouseEnter = () => {
        setExpanded(true);
        setUserDataPopUp(true);
        handleUserData();
    };
    
    const handleMouseLeave = () => {
        setExpanded(false);
        setUserDataPopUp(false);
        setOpen(false);
    };
        
    return (
    <div className={`login-popup ${expanded ? "expanded" : ""}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img className="login-popup-img" src={notloggedImg} alt="account" />
      <div className="login-popup-extended">

        <h1 className="login-popup-title">
          {user.name} {user.first_surname} {user.second_surname}
        </h1>

        <div className="login-popup-body">
          <p>{user.email}</p>
          <p>Usuario</p>
          <button onClick={(e) => e.stopPropagation()}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
    )
}