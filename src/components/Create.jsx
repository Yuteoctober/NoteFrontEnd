import './css/create.css'
import { useState, useContext } from 'react'
import axios from 'axios'
import UseContext from '../Context'
import { getCard } from '../api/api'

function Create() {

    const { createCardModel, setCreateCardModel,
            setCardResult, } = useContext(UseContext);
    const [color, setColor] = useState('')
    const [subject, setSubject] = useState({
        name: '',
        description: '',
        color: '',
        userId: window.localStorage.getItem('id')
    })
  

    const handleSubmit =(e) => {
        e.preventDefault();
      
        try {
          const updatedSubject = { ...subject, color: color }; 
          axios.post('https://notebackend-qr35.onrender.com/card/create-card', updatedSubject, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
            alert('Card created');
            setCreateCardModel(false)
            setSubject({ ...subject, 
              name: '', 
              description: '', 
              color: '',
            })
            setColor('')
            const userId = window.localStorage.getItem('id')
            getCard(setCardResult, userId)
        } catch (err) {
            console.error(err);
        }
      };

    const handleChange = (e) => {
        const { name, value } = e.target
        setSubject({...subject, [name]: value})
    }

    return (
        <>
          {createCardModel && (
            <div className="bg_create"
                onClick={() => setCreateCardModel(false)}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="create_container"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <h2>Create Card</h2>
                  <div className="create_box">
                    <p>Name:</p>
                    <input
                      type="text"
                      name="name"
                      className="name_card"
                      placeholder="Business talk in the city."
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="textarea_card">Description:</p>
                    <textarea
                      name="description"
                      id=""
                      cols="30"
                      rows="10"
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                    <div className="color_picker">
                      <div className="white" style={{ borderColor: color === '#eff0ee' ? '#cecccc' : 'black' }} onClick={() => setColor('#eff0ee')}></div>
                      <div className="green" style={{ borderColor: color === '#cded9e' ? '#cecccc' : 'black' }} onClick={() => setColor('#cded9e')}></div>
                      <div className="red" style={{ borderColor: color === '#e69191' ? '#cecccc' : 'black' }} onClick={() => setColor('#e69191')}></div>
                      <div className="blue" style={{ borderColor: color === '#9bc8ec' ? '#cecccc' : 'black' }} onClick={() => setColor('#9bc8ec')}></div>
                      <div className="purple" style={{ borderColor: color === '#c29cf2' ? '#cecccc' : 'black' }} onClick={() => setColor('#c29cf2')}></div>
                      <div className="yellow" style={{ borderColor: color === '#f2f285' ? '#cecccc' : 'black' }} onClick={() => setColor('#f2f285')}></div>
                    </div>
                    <button disabled={!window.localStorage.length} type="submit">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </>
      );
    }
    
    export default Create;