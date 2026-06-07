import { useContext, useEffect, useState } from "react"
import { loginContext } from "../../LOGIN-FILES/LOGIN-LoginContext"
import { lateralbarAddCarContext } from "./LM-AddCar-Context"
import { Button } from "react-bootstrap"
import CarBrandGroup from "./LM-Car-BrandGroup"
import '../../interface_CSS/LM-CSS/LM-SUBFILES-CSS/LM-AddCar-SelectBrand.css'
import addCarSelectCar from "./LM-AddCar-SelectCar"
import AddCarSelectCar from "./LM-AddCar-SelectCar"

export default function AddCarSelectBrand() {

    //VARIABLES HEREDADAS DEL CONTEXTO
    const {userToken} = useContext(loginContext)
    const {addCarMenu, setAddCarMenu, addCarTab, setAddCarTab} = useContext(lateralbarAddCarContext)

    //DATOS QUE SE RECOGEN DE LA API
    const [brandsList, setBrandsList] = useState([])
    const [carGroupList, setCarGroupList] = useState([])

    //CONTROLAR SI ESTAN MOSTRANDOSE GRUPOS O MARCAS
    const [groupSearch, setGroupSearch] = useState(true)
    //CONTROLAR SI SE ESTA SELECCIONANDO UN COCHE
    const [modelSelectionActive, setModelSelectionActive] = useState(false)

    //VARIABLES
    //MARCA DE COCHES SELECCIONADA POR EL USUARIO
    const [brandSelected, setBrandSelected] = useState(null)

    const handleBrands = async () => {
            try {
                const response = await fetch(`http://localhost:8080/pitstop/cars/brand/all`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`
                    }
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const res = await response.json();
                console.log(res)
                setBrandsList(res)

            } catch (error) {
                console.error();
            }
        }

    const handleGroups = async () => {
        debugger
        try {
            const response = await fetch(`http://localhost:8080/pitstop/cars/groups/all`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`
                }
            });
        
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
            const res = await response.json();
            console.log(res)
            setCarGroupList(res)
        
        } catch (error) {
            console.error();
        }
    }

    const handleBrandSelected = (brand) => {
        try {
            setBrandSelected(brand)
            setModelSelectionActive(true)
            setAddCarTab(true)
            
            console.log(brandSelected)
        } catch (error) {
            console.log("No se ha podido seleccionar la marca")
        }
    }

    const handleExitModel = () => {
        try {
            setAddCarTab(false)
            setModelSelectionActive(false)
        } catch (error) {
            console.log("No se ha podido volver para atrás")
        }
    }

        useEffect(() => {
            const loadData = async () => {
                try {
                    await handleBrands();
                    await handleGroups();
                } catch (err) {
                    console.error(err);
                }
            };
            loadData();
        }, []);

    return (
        <div className="root-select-menu">
                {!modelSelectionActive &&
                    <div className="root-select-carbrand">
                        <div className="select-carbrand-navbar">
                            <div lassName="select-carbrand-navbar-buttons">
                                <Button className="select-carbrand-navbar-back" className={"navbar-button"} onClick={() => setAddCarMenu(false)}>
                                    Atras
                                </Button>
                                <Button onClick={() => setGroupSearch(!groupSearch)} className={"navbar-button"}>Cambiar</Button>
                            </div>
                            <div className="select-carbrand-navbar-searchbar">

                            </div>
                        </div>
                        <div className="select-carbrand-body">
                            {groupSearch &&
                                <div className="select-carbrand-content-scroll">
                                    <h1>Busqueda por grupo</h1>
                                    {carGroupList.map((carGroup) => (
                                        <CarBrandGroup key={carGroup.id} name={carGroup.name} country={carGroup.country} imgName={carGroup.shortName} type={"group"}/>
                                    ))}
                                </div>
                            }

                            {!groupSearch &&
                                <div className="select-carbrand-content-scroll">
                                    <h1>Busqueda por marca</h1>
                                    {brandsList.map((brand) => (
                                        <CarBrandGroup 
                                        key={brand.id} name={brand.name} country={brand.country} imgName={brand.name} type={"brand"} onClick={() => handleBrandSelected(brand)}/>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                }
                
                {modelSelectionActive &&
                    <AddCarSelectCar brand={brandSelected} handleExit={() => handleExitModel()}/>
                }
        </div>
    )
}