import { useContext, useState, useEffect } from "react"
import { loginContext } from "../../LOGIN-FILES/LOGIN-LoginContext"
import '../../interface_CSS/LM-CSS/LM-SUBFILES-CSS/LM-AddCar-SelectCar.css'
import { Accordion, Button } from "react-bootstrap"
import { lateralbarAddCarContext } from "./LM-AddCar-Context"

export default function AddCarSelectCar({brand, handleExit}) {

    //VARIABLES OBTENIDAS DEL CONTEXTO
    const {userToken} = useContext(loginContext)
    const {addCarTab, setAddCarTab} = useContext(lateralbarAddCarContext)

    //DATOS OBTENIDOS DE LA API
    //LISTA DE TODOS LOS MODELOS DE LA MARCAS SELECCIONADA
    const [modelsNameList, setModelsNameList] = useState([])

    const [modelListGenList, setModelListGenList] = useState([])

    //DATOS DEL MODELO SELECCIONADO
    const [selectedModel, setSelectedModel] = useState([])

    const handleModels = async () => {
        debugger
        try {
            const response = await fetch(`http://localhost:8080/pitstop/cars/models/each/byBrandId?id=${brand.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`
                }
            });
        
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
            const res = await response.json();
            console.log(res)
            setModelsNameList(res)
        
        } catch (error) {
            console.error();
        }
    }

    const searchModel = async (modelName) => {
        debugger
        console.log(modelName)
        try {
            const response = await fetch(`http://localhost:8080/pitstop/cars/models/byName?name=${modelName.model}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`
                }
            });
        
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
            const res = await response.json();
            console.log(res)
            setModelListGenList(res)
        
        } catch (error) {
            console.error();
        }
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                await handleModels();
            } catch (err) {
                console.error(err);
            }
        };
        loadData();
    }, []);


    return (
        <div className="root-selection-car">
            <div className="root-lateral-scroll-bar-model-selection">

                <div className="selection-car-navbar">
                    <Button onClick={handleExit}>Atras</Button>
                    <div className="lateral-scroll-bar-model-selection-title">
                        <h1>{brand.name}</h1>
                    </div>
                </div>

                <div className="lateral-scroll-bar-model-selection">
                    <Accordion>
                        {modelsNameList.map((model, index) => (
                            <Accordion.Item key={index} eventKey={index}>
                                <Accordion.Header onClick={() => searchModel({model})}>
                                    {model}
                                </Accordion.Header>
                                <Accordion.Body className="lateral-scroll-bar-model-selection-options">
                                    <ul className="model-selection-options-list">
                                        {modelListGenList.map((modelItem, index) => (
                                            <li className="model-selection-options-list-entry">
                                                <Button onClick={() => setSelectedModel(modelItem)} className="model-selection-options-button">
                                                    {modelItem.modelYear} - {modelItem.brand} {modelItem.name} ({modelItem.code})
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            </div>

            <div className="root-content">
                <div className="content-carrousel">
                    <img className="img" src={
                        `/car/${brand.name}/${selectedModel.name}/${brand.name}_${selectedModel.name}_${selectedModel.modelYear}_Lateral.png`
                        }/>
                </div> 
                <div className="carrousel-footer">
                        
                </div>
            </div>
        </div>
    )
}

/*
                    <div className="carrousel-footer">
                        <img className={"brand-img"} src={
                            `/car/${brand.name}/Logo/${brand.name}_${selectedModel.modelYear}.png`
                        }/>
                        <img className={"model-lettering-img"} src={
                            `/car/${brand.name}/${selectedModel.name}/${selectedModel.modelYear}/${selectedModel.modelYear}_Name.png`
                        }/>
                </div>
*/