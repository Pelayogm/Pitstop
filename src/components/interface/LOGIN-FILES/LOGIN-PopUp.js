import { useContext, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import '../interface_CSS/LOGIN-CSS/LOGIN-PopUp.css';
import { type } from "@testing-library/user-event/dist/type";
import { loginContext } from "./LOGIN-LoginContext";

export default function LoginPopUp({visibility, handleClick}) {
    const [register, setRegister] = useState(false);
    const [activeButton, setActiveButton] = useState(0);
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [logData, setLogData] = useState({});
    const {userToken, setUserToken, userLoggedIn, setUserLoggedIn, setLoginPopUpVisibility, setUserAlias} = useContext(loginContext)

    const REGISTER_STEPS = [
        {
            stepTitle: "Datos de usuario",
            fields: [
                {label: "¿Como te llamas?", type: "text", key: "name", className: "login-form-input"},
                {label: "Primer Apellido", type: "text", key: "first_surname", className: "login-form-input"},
                {label: "Segundo Apellido", type: "text", key: "second_surname", className: "login-form-input"},
            ]
        },
        {
            stepTitle: "Información avanzada",
            fields: [
                {label: "DNI", type: "text", key: "dni", className: "login-form-input", name: "dni"},
                {label: "Fecha de Nacimiento", type: "date", key: "userBirthDate", className: "login-form-input"},
            ]
        },
        {
            stepTitle: "Y por último, crea tus datos de acceso",
            fields: [
                {label: "Escribe tu alias", type: "text", key: "alias", className: "login-form-input"},
                {label: "Introduce tu correo electrónico", type: "email", key: "email", className: "login-form-input"},
                {label: "Crea una contraseña", type: "password", key: "password", className: "login-form-input"},
            ]
        }
    ];

    const switchMode = (data) => {
        setActiveButton(data)
        setRegister(data === 1)
        setStep(0)
        setFormData({})
    }

    const handleChangeRegister = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleChangeLogIn = (key, value) => {
        setLogData(prev => ({...prev, [key]: value}))
    }

    const handleSubmit = (e) => {
          e.preventDefault();
          if (step < REGISTER_STEPS.length - 1) {
            setStep(prev => prev + 1);
          } else {
            console.log(formData)
            handleRegister(formData)
            setFormData({})
          }
    };

    const handleRegister = async (formData) => {
        try {
            const response = await fetch("http://localhost:8080/pitstop/auth/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

            if (!response.ok) {
                throw new Error(`ERROR: ${response.status}`)
            }

            const result = await response.json();
            
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogIn = async (e) => {
        e.preventDefault();
        debugger
        console.log(logData)
        try {
            const response = await fetch("http://localhost:8080/pitstop/auth/signIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(logData)
            })

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Error ${response.status}: ${errorBody}`);
            }

            const res = await response.text();

            console.log(res)

            setUserLoggedIn(true)
            setLoginPopUpVisibility(false)
            setUserToken(res)

            console.log(userToken)
            
            setUserAlias(logData.alias)
            setLogData({})
            
        } catch (error) {
            console.error();
        }
    }

    return (
        <div className={`main-container-login ${visibility ? 'visibility' : ''} ${register ? 'register' : ''}`}>
            <div className="main-container-navbar">
                <h1 className={`main-container-title ${register ? "register" : "login"}`}>
                    {register ? "Crear una Cuenta" : "Iniciar Sesión"}
                </h1>
                <Button className="main-container-close-button" onClick={() => {handleClick(!visibility)}}>X</Button>
            </div>
            <hr/>
            <div className='main-container-button-group'>
                <div className='main-container-button-indicator' style={{ transform: `translateX(${activeButton * 100}%)` }}/>
                    <button className={activeButton === 0 ? 'active' : ''} onClick={() => switchMode(0)}>Iniciar Sesión</button>
                    <button className={activeButton === 1 ? 'active' : ''} onClick={() => switchMode(1)}>Crear una cuenta</button>
            </div>
            
                <div className="container-form">
                    {
                        !register &&                     
                        <form className="container-login-form" onSubmit={handleLogIn}>
                            <label className="login-form-label" key={"alias"}>Usuario</label>
                                <br/>
                            <input className="login-form-input" required={true} onChange={(e) => handleChangeLogIn("alias",e.target.value)}/>
                                <br/>
                            <label className="login-form-label">Contraseña</label>
                                <br/>
                            <input className="login-form-input" type="password" required={true} onChange={(e) => handleChangeLogIn("password",e.target.value)}/>
                                <br/>
                            <input className="login-form-submit" type="submit" value={"Iniciar Sesión"}/>
                        </form>
                    }

                    {
                        register &&
                        <div className="registration-main-form-div">
                            <div className="registration-step-div">
                                PASO {step + 1} DE {REGISTER_STEPS.length}: {REGISTER_STEPS[step].stepTitle}
                            </div>
                                <br/>
                            <form className="container-register-form" onSubmit={handleSubmit} name="registration-form">
                                {REGISTER_STEPS[step].fields.map(({label, type, key, className, name}) => (
                                    <div className="registraton-step-div" key={key}>
                                        <label className="login-form-label">{label}</label>
                                        <br/>
                                        <input className={className} type={type} value={formData[key] || ""} onChange={(e) => handleChangeRegister(key,e.target.value)} required={true} name={name}/>
                                    </div>
                                ))}
                                <div className="button-container-registration-form">
                                    {step > 0 && (
                                    <button onClick={() => setStep(step - 1)} className="login-form-submit" type="button">
                                        Atrás
                                    </button>)}
                                    
                                <input className="login-form-submit" type="submit" value={step < REGISTER_STEPS.length - 1 ? "Avanzar" : "Registrarse"}/>
                                </div>          
                            </form>
                        </div>
                    }
                </div>
        </div>
    )
}