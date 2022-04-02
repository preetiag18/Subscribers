import Button from "./Button";
import Container from "./Container";
import "./ErrorModal.css";
const ErrorModal = (props) =>{

    return (
        <div className="backdrop" onClick={props.onClose}>
        <Container className = "modal">
            <header className="header">
                <h2>{props.title}</h2>
            </header>
            <div>
                <p className="content">{props.content}</p>
            </div>
            <footer className="actions">
                <Button onClick = {props.onClose}>Okay</Button>
            </footer>
        </Container>
        </div>

    )
}
export default ErrorModal;