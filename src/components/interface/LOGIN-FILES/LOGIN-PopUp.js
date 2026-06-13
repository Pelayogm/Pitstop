import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import '../interface_CSS/LOGIN-CSS/LOGIN-PopUp.css';
import { loginContext } from "./LOGIN-LoginContext";

const PASSWORD_RULES = [
    {
        key: "length",
        label: "Más de 8 caracteres (máximo 12)",
        test: (pwd) => pwd.length > 8 && pwd.length <= 12
    },
    {
        key: "lowercase",
        label: "Al menos una letra minúscula",
        test: (pwd) => /[a-z]/.test(pwd)
    },
    {
        key: "uppercase",
        label: "Al menos una letra mayúscula",
        test: (pwd) => /[A-Z]/.test(pwd)
    },
    {
        key: "number",
        label: "Al menos un número",
        test: (pwd) => /[0-9]/.test(pwd)
    },
    {
        key: "name",
        label: "No puede contener tu nombre",
        test: (pwd, data) => {
            const name = (data.name || "").trim().toLowerCase();
            if (!name) return true;
            const candidates = [name, ...name.split(/\s+/)].filter(t => t.length >= 3);
            const lowered = pwd.toLowerCase();
            return !candidates.some(t => lowered.includes(t));
        }
    }
];

const getMaxBirthDate = () => {
    const today = new Date();
    return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
};

const pad2 = (n) => String(n).padStart(2, "0");
const MONTH_FORMATTER = new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" });
const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];

function EyeToggleButton({ shown, onToggle }) {
    return (
        <button
            type="button"
            className="password-toggle-btn"
            aria-label={shown ? "Ocultar contraseña" : "Mostrar contraseña"}
            onMouseDown={(e) => e.preventDefault()}
            onClick={onToggle}
        >
            {shown ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            )}
        </button>
    );
}

function GlassDatePicker({ value, onChange, maxDate, minYear = 1900 }) {
    const initialDate = value ? new Date(`${value}T00:00:00`) : maxDate;
    const [open, setOpen] = useState(false);
    const [viewYear, setViewYear] = useState(initialDate.getFullYear());
    const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
    const rootRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const closeOnOutsideClick = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", closeOnOutsideClick);
        return () => document.removeEventListener("mousedown", closeOnOutsideClick);
    }, [open]);

    const maxY = maxDate.getFullYear();
    const maxM = maxDate.getMonth();

    const togglePanel = () => {
        if (!open) {
            const base = value ? new Date(`${value}T00:00:00`) : maxDate;
            setViewYear(base.getFullYear());
            setViewMonth(base.getMonth());
        }
        setOpen(prev => !prev);
    };

    const clampView = (y, m) => {
        if (y > maxY || (y === maxY && m > maxM)) return [maxY, maxM];
        if (y < minYear) return [minYear, 0];
        return [y, m];
    };

    const goMonth = (delta) => {
        let m = viewMonth + delta;
        let y = viewYear;
        if (m < 0) { m = 11; y -= 1; }
        if (m > 11) { m = 0; y += 1; }
        const [cy, cm] = clampView(y, m);
        setViewYear(cy);
        setViewMonth(cm);
    };

    const goYear = (delta) => {
        const [cy, cm] = clampView(viewYear + delta, viewMonth);
        setViewYear(cy);
        setViewMonth(cm);
    };

    const canPrevMonth = viewYear > minYear || viewMonth > 0;
    const canNextMonth = viewYear < maxY || (viewYear === maxY && viewMonth < maxM);
    const canPrevYear = viewYear - 1 >= minYear;
    const canNextYear = viewYear + 1 <= maxY;

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstWeekday = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;

    const selectDay = (day) => {
        onChange(`${viewYear}-${pad2(viewMonth + 1)}-${pad2(day)}`);
        setOpen(false);
    };

    const displayValue = value ? value.split("-").reverse().join("/") : "";

    return (
        <div className="glass-datepicker" ref={rootRef}>
            <button type="button" className="login-form-input glass-datepicker-trigger" onClick={togglePanel}>
                <span className={value ? "" : "glass-datepicker-placeholder"}>
                    {displayValue || "dd/mm/aaaa"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            </button>
            
            <input
                className="glass-datepicker-hidden-input"
                tabIndex={-1}
                aria-hidden="true"
                required
                value={value || ""}
                onChange={() => {}}
                onFocus={() => setOpen(true)}
            />

            {open && (
                <div className="glass-datepicker-panel">
                    <div className="glass-datepicker-header">
                        <button type="button" className="glass-datepicker-nav" onClick={() => goYear(-1)} disabled={!canPrevYear} aria-label="Año anterior">«</button>
                        <button type="button" className="glass-datepicker-nav" onClick={() => goMonth(-1)} disabled={!canPrevMonth} aria-label="Mes anterior">‹</button>
                        <span className="glass-datepicker-label">{MONTH_FORMATTER.format(new Date(viewYear, viewMonth, 1))}</span>
                        <button type="button" className="glass-datepicker-nav" onClick={() => goMonth(1)} disabled={!canNextMonth} aria-label="Mes siguiente">›</button>
                        <button type="button" className="glass-datepicker-nav" onClick={() => goYear(1)} disabled={!canNextYear} aria-label="Año siguiente">»</button>
                    </div>
                    <div className="glass-datepicker-grid">
                        {WEEKDAYS.map(d => (
                            <span key={d} className="glass-datepicker-weekday">{d}</span>
                        ))}
                        {Array.from({ length: firstWeekday }).map((_, i) => (
                            <span key={`empty-${i}`} className="glass-datepicker-day empty" />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const iso = `${viewYear}-${pad2(viewMonth + 1)}-${pad2(day)}`;
                            const disabled = new Date(viewYear, viewMonth, day) > maxDate;
                            return (
                                <button
                                    key={iso}
                                    type="button"
                                    className={`glass-datepicker-day ${value === iso ? "selected" : ""}`}
                                    disabled={disabled}
                                    onClick={() => selectDay(day)}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                    <div className="glass-datepicker-footnote">Edad mínima para registrarse: 18 años</div>
                </div>
            )}
        </div>
    );
}

export default function LoginPopUp({ visibility, handleClick }) {
    const [register, setRegister] = useState(false);
    const [activeButton, setActiveButton] = useState(0);
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [logData, setLogData] = useState({});

    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const { userToken, setUserToken, userLoggedIn, setUserLoggedIn, setLoginPopUpVisibility, setUserAlias } = useContext(loginContext);

    const maxBirthDate = useMemo(getMaxBirthDate, []);

    const formAreaRef = useRef(null);
    const [formHeight, setFormHeight] = useState(null);

    useEffect(() => {
        const element = formAreaRef.current;
        if (!element) return;
        const observer = new ResizeObserver(() => setFormHeight(element.offsetHeight));
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const REGISTER_STEPS = [
        {
            stepTitle: "Datos de usuario",
            fields: [
                { label: "¿Como te llamas?", type: "text", key: "name", className: "login-form-input" },
                { label: "Primer Apellido", type: "text", key: "first_surname", className: "login-form-input" },
                { label: "Segundo Apellido", type: "text", key: "second_surname", className: "login-form-input" },
            ]
        },
        {
            stepTitle: "Información avanzada",
            fields: [
                { label: "DNI", type: "text", key: "dni", className: "login-form-input", name: "dni" },
                { label: "Fecha de Nacimiento", type: "date", key: "userBirthDate", className: "login-form-input" },
            ]
        },
        {
            stepTitle: "Y por último, crea tus datos de acceso",
            fields: [
                { label: "Escribe tu alias", type: "text", key: "alias", className: "login-form-input" },
                { label: "Introduce tu correo electrónico", type: "email", key: "email", className: "login-form-input" },
                { label: "Crea una contraseña", type: "password", key: "password", className: "login-form-input" },
            ]
        }
    ];

    const passwordValue = formData.password || "";
    const rulesState = PASSWORD_RULES.map(rule => ({ ...rule, met: rule.test(passwordValue, formData) }));
    const metCount = rulesState.filter(rule => rule.met).length;
    const allRulesMet = metCount === PASSWORD_RULES.length;
    const progress = passwordValue ? (metCount / PASSWORD_RULES.length) * 100 : 0;

    const switchMode = (data) => {
        setActiveButton(data);
        setRegister(data === 1);
        setStep(0);
        setFormData({});
        setPasswordError(false);
        setPasswordFocused(false);
        setShowRegisterPassword(false);
        setShowLoginPassword(false);
    };

    const handleChangeRegister = (key, value) => {
        if (key === "password") setPasswordError(false);
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleChangeLogIn = (key, value) => {
        setLogData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step < REGISTER_STEPS.length - 1) {
            setStep(prev => prev + 1);
            return;
        }

        if (!allRulesMet) {
            setPasswordError(true);
            setPasswordFocused(true);
            return;
        }
        handleRegister(formData);
        setFormData({});
        setStep(0);
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
                throw new Error(`ERROR: ${response.status}`);
            }

            const result = await response.json();

        } catch (error) {
            console.error(error);
        }
    };

    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/pitstop/auth/signIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(logData)
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Error ${response.status}: ${errorBody}`);
            }

            const res = await response.text();

            setUserLoggedIn(true);
            setLoginPopUpVisibility(false);
            setUserToken(res);
            setUserAlias(logData.alias);
            setLogData({});

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={`main-container-login ${visibility ? 'visibility' : ''} ${register ? 'register' : ''}`}>
            <div className="main-container-navbar">
                <h1 className={`main-container-title ${register ? "register" : "login"}`}>
                    {register ? "Crear una Cuenta" : "Iniciar Sesión"}
                </h1>
                <Button className="main-container-close-button" onClick={() => { handleClick(!visibility) }}>X</Button>
            </div>
            <hr />
            <div className='main-container-button-group'>
                <div className='main-container-button-indicator' style={{ transform: `translateX(${activeButton * 100}%)` }} />
                <button className={activeButton === 0 ? 'active' : ''} onClick={() => switchMode(0)}>Iniciar Sesión</button>
                <button className={activeButton === 1 ? 'active' : ''} onClick={() => switchMode(1)}>Crear una cuenta</button>
            </div>

            <div className="container-form" style={{ height: formHeight === null ? "auto" : `${formHeight}px` }}>
                <div className="container-form-inner" ref={formAreaRef}>
                    {
                        !register &&
                        <form className="container-login-form" onSubmit={handleLogIn}>
                            <label className="login-form-label">Usuario</label>
                            <input className="login-form-input" required={true} onChange={(e) => handleChangeLogIn("alias", e.target.value)} />
                            <label className="login-form-label">Contraseña</label>
                            <div className="password-input-row">
                                <input
                                    className="login-form-input"
                                    type={showLoginPassword ? "text" : "password"}
                                    required={true}
                                    autoComplete="current-password"
                                    onChange={(e) => handleChangeLogIn("password", e.target.value)}
                                />
                                <EyeToggleButton shown={showLoginPassword} onToggle={() => setShowLoginPassword(prev => !prev)} />
                            </div>
                            <input className="login-form-submit" type="submit" value={"Iniciar Sesión"} />
                        </form>
                    }

                    {
                        register &&
                        <div className="registration-main-form-div">
                            <div className="registration-step-div">
                                PASO {step + 1} DE {REGISTER_STEPS.length}: {REGISTER_STEPS[step].stepTitle}
                            </div>
                            <form className="container-register-form" onSubmit={handleSubmit} name="registration-form">
                                {REGISTER_STEPS[step].fields.map(({ label, type, key, className, name }) => (
                                    <div className="registration-step-field" key={key}>
                                        <label className="login-form-label">{label}</label>

                                        {type === "date" && (
                                            <GlassDatePicker
                                                value={formData[key] || ""}
                                                onChange={(iso) => handleChangeRegister(key, iso)}
                                                maxDate={maxBirthDate}
                                            />
                                        )}

                                        {type === "password" && (
                                            <div className="password-field-wrapper">
                                                <div className="password-input-row">
                                                    <input
                                                        className={`${className} with-meter`}
                                                        type={showRegisterPassword ? "text" : "password"}
                                                        value={formData[key] || ""}
                                                        maxLength={12}
                                                        autoComplete="new-password"
                                                        onChange={(e) => handleChangeRegister(key, e.target.value)}
                                                        onFocus={() => setPasswordFocused(true)}
                                                        onBlur={() => setPasswordFocused(false)}
                                                        required={true}
                                                        name={name}
                                                    />
                                                    <EyeToggleButton shown={showRegisterPassword} onToggle={() => setShowRegisterPassword(prev => !prev)} />
                                                </div>
                                                <div className="password-strength-track">
                                                    <div
                                                        className={`password-strength-bar ${allRulesMet ? "ok" : "bad"}`}
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                                {(passwordFocused || passwordError) && (
                                                    <ul className="password-requirements">
                                                        {rulesState.map(rule => (
                                                            <li key={rule.key} className={passwordValue ? (rule.met ? "met" : "unmet") : ""}>
                                                                <span className="req-icon">{passwordValue ? (rule.met ? "✓" : "✕") : "•"}</span>
                                                                {rule.label}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {passwordError && (
                                                    <div className="password-error">La contraseña no cumple todos los requisitos.</div>
                                                )}
                                            </div>
                                        )}

                                        {type !== "date" && type !== "password" && (
                                            <input
                                                className={className}
                                                type={type}
                                                value={formData[key] || ""}
                                                onChange={(e) => handleChangeRegister(key, e.target.value)}
                                                required={true}
                                                name={name}
                                            />
                                        )}
                                    </div>
                                ))}
                                <div className="button-container-registration-form">
                                    {step > 0 && (
                                        <button onClick={() => setStep(step - 1)} className="login-form-submit" type="button">
                                            Atrás
                                        </button>
                                    )}
                                    <input className="login-form-submit" type="submit" value={step < REGISTER_STEPS.length - 1 ? "Avanzar" : "Registrarse"} />
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
