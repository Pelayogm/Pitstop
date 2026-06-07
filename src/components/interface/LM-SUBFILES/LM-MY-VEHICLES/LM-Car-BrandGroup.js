import { Button, Card} from "react-bootstrap";
import '../../interface_CSS/LM-CSS/LM-SUBFILES-CSS/LM-Car-BrandGroup.css'
import austral from '../../../../img/ui/austral.png'
import AddCarSelectBrand from "./LM-AddCar-SelectBrand";


export default function CarBrandGroup ({name, country, imgName, type, onClick}) {
    return (
        <Card className="root-card">
            <Card.Img variant="top" className="img-card" src={`/${type}/${imgName}_${type}.png`}/>
            <Card.Body className="body-card">
                <Card.Title className="body-card-title">{name}</Card.Title>
                <Card.Subtitle className="body-card-subtitle">{country}</Card.Subtitle>
                <Button variant="success" className="body-card-button" onClick={onClick}>Seleccionar</Button>
            </Card.Body>
        </Card>
    );
}