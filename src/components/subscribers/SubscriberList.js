import Button from '../templates/Button';
import Container from '../templates/Container';
import './SubscriberList.css';

const SubscriberList = (props) => {

   const onDeleteClickHandler = async (x) => {
    let res = await fetch("https://subscriber-server.herokuapp.com/" + x, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
    
      });   
   } 
    return (
        <Container className = 'subscribers'>
            <ul>
                {props.list.map((item) => {
                    return (
                    <li key = {item.id}> {item.name} - {item.pincode}
                        <Button onClick={() => onDeleteClickHandler(item.id)}>delete</Button>
                    </li>
                    )
                })}
            </ul>
        </Container>

    )
}
export default SubscriberList;