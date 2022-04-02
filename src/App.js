import logo from './logo.svg';
import './App.css';
import AddSubscriber from './components/subscribers/AddSubscriber';
import Container from './components/templates/Container';
import SubscriberList from './components/subscribers/SubscriberList';
import { useEffect, useState } from 'react';

function App() {

  const [ subscriberList, setSubscriberList ] = useState([]);
  
  useEffect(async() => {
    let res = await fetch("https://subscriber-server.herokuapp.com/showdetails");
    let responseData = await res.json();
    console.log(responseData);
    let updatedData = responseData.map(item => {
      return ({
        name: item.first_name,
        pincode: item.pincode,
        id: item._id
      })
    })
    setSubscriberList((prevData) => {
      return [
        ...prevData,
        ...updatedData
      ]
    })
  }, []);

    const onAddSubscriberHandler = (sname,spincode,sid) => {
      setSubscriberList((prevState) => {
        return [
          ...prevState,
          { name: sname,
            pincode: spincode,
            id: sid
            
          }
        ]
      })
    }

  return (
    <Container>
      <AddSubscriber onAddSubscriber = {onAddSubscriberHandler}></AddSubscriber>
      <SubscriberList list = {subscriberList}></SubscriberList>
    </Container>
  );
}

export default App;
