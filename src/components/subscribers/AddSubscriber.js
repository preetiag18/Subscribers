import { useState } from 'react';
import Button from '../templates/Button';
import Container from '../templates/Container';
import ErrorModal from '../templates/ErrorModal';
import './AddSubscriber.css';

const AddSubscriber = (props) =>{
    const[name , setName] = useState("");
    const[pincode , setPincode] = useState("");
    const[error , setError] = useState('');
    

    const onChangeName = (events) =>{
        console.log('name input is' ,events.target.value);
        setName(events.target.value);

    }
    const onPincodeChange =(events) =>{
        console.log('pincode is',events.target.value)
        setPincode(events.target.value);
    }

    const onSubmitHandler = async(events) =>{
        events.preventDefault();
        
        if(name.trim().length === 0){
            console.log('name input is not valid');
            setError({title: 'Invalid Name.',content:'Name is the mandatory field. Please Enter the name of subscriber '})
            return;
        }
        if(pincode.trim().length === 0){
            console.log('pincode input is not valid');
            setError({title: 'Invalid Input.',content:'pincode is the mandatory field. Please Enter the pincode of subscriber '})
            return;
        }

        if(pincode.length < 5 || pincode < 0){
            console.log('pincode input is not valid. It should be greater 5');
            setError({title: 'Invalid Input.',content:'Pincode should be greater than 5 and should not be less than 0.'})
            return;
        }
        console.log('updatede status is' ,events.target.value )

        try {
            let res = await fetch("http://localhost:8080/add-user", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                namee: name,
                pincodee: pincode
              })
            });            
            let id = await res.json();
            if (res.status === 200) {
              props.onAddSubscriber(name,pincode,id);
              setName("");
              setPincode("");
              setError("User created successfully");
            } else {
                setError("Some error occured");
            }
          } catch (err) {
            console.log(err);
          }
        };
        
        const onCloseHandler = () =>{
          setError(null);
        }


    return(
        <div>
            {error && <ErrorModal title = {error.title} content = {error.content} onClose = {onCloseHandler}></ErrorModal>}
            
            <form onSubmit={onSubmitHandler}>
              <Container className = 'input'>
                <label htmlFor='name'>Name</label>
                <input id='name' value={name}type="text" onChange={onChangeName}></input>
                <label htmlFor='pincode'>Pincode</label>
                <input id='pincode' value={pincode} type="number" onChange={onPincodeChange}></input>
                <Button type='submit'>Save</Button>
              </Container>    
            </form>
            
        </div>

    )
}
export default AddSubscriber;