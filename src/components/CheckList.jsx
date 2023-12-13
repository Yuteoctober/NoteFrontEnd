import './css/create.css'
import { useState, useContext } from 'react'
import axios from 'axios'
import UseContext from '../Context'
import { getCheckList } from '../api/api'
import './css/checkList.css'

function CheckList() {

    const { CheckListModel, setCheckListModel, setCheckListResult } = useContext(UseContext);
    const [color, setColor] = useState('')
    const [checkList, setCheckList] = useState({
        checklistName: '',
        checklist1: '',
        checklist2: '',
        checklist3: '',
        checklist4: '',
        checklist5: '',
        color: '',
        userId: window.localStorage.getItem('id'),
    })

    

    const handleSubmit =(e) => {
        e.preventDefault();
      
        try {
          if(!checkList) {
            return;
          }
          axios.post('https://notebackend-qr35.onrender.com/checklist/create-checklist', checkList, {
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
            },
          });
            alert('Checklist created');
            setCheckListModel(false)
            setColor('')
            setCheckList({...checkList, 
            checklistName: '',
            checklist1: '',
            checklist2: '',
            checklist3: '',
            checklist4: '',
            checklist5: '',
            color: '',
          })
            const userId = window.localStorage.getItem('id')
            getCheckList(setCheckListResult, userId)
        } catch (err) {
            console.error(err);
        }
      };


    return (
        <>
            {CheckListModel && (
                <div className="bg_create"
                onClick={() => {setCheckListModel(false); setColor('')}}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="create_checklist_container"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}>
                  <h2>Create Checklist</h2>
                  <div className="create_checklist_box">
                    <p>Check List:</p>
                    <span style={{color: 'transparent'}}>#1:
                        <input type="text" className='input_checkbox' placeholder='name...'
                        onChange={(e) => setCheckList({...checkList, checklistName: e.target.value})}
                        />
                    </span>
                    <span>
                        #1:<input type="text" maxLength="40" className='input_checkbox' placeholder='your input here...'
                        onChange={(e) => setCheckList({...checkList, checklist1: e.target.value})}
                        />
                    </span>
                    <span>#2:<input type="text" maxLength="40" className='input_checkbox' placeholder='your input here...' 
                        onChange={(e) => setCheckList({...checkList, checklist2: e.target.value})}
                        />
                    </span>
                    <span>#3:<input type="text" maxLength="40" className='input_checkbox' placeholder='your input here...' 
                        onChange={(e) => setCheckList({...checkList, checklist3: e.target.value})}
                        />
                    </span>
                    <span>#4:<input type="text" maxLength="40" className='input_checkbox' placeholder='your input here...' 
                        onChange={(e) => setCheckList({...checkList, checklist4: e.target.value})}
                        />
                    </span>
                    <span>#5:<input type="text" maxLength="40" className='input_checkbox' placeholder='your input here...' 
                        onChange={(e) => setCheckList({...checkList, checklist5: e.target.value})}
                        />
                    </span>
                    
                    <div className="color_picker_checklist">
                      <div className="white" style={{ borderColor: color === '#eff0ee' ? '#cecccc' : 'black' }} onClick={() => {setCheckList({...checkList, color: '#eff0ee'}); setColor('#eff0ee')}}></div>
                      <div className="green" style={{ borderColor: color === '#cded9e' ? '#cecccc' : 'black' }} onClick={() => {setCheckList({...checkList, color: '#cded9e'}); setColor('#cded9e')}}></div>
                      <div className="red" style={{ borderColor: color === '#e69191' ? '#cecccc' : 'black' }} onClick={() => {setCheckList({...checkList, color: '#e69191'}); setColor('#e69191')}}></div>
                      <div className="blue" style={{ borderColor: color === '#9bc8ec' ? '#cecccc' : 'black' }} onClick={() => {setCheckList({...checkList, color: '#9bc8ec'}); setColor('#9bc8ec')}}></div>
                      <div className="purple" style={{ borderColor: color === '#c29cf2' ? '#cecccc' : 'black' }} onClick={() => {setCheckList({...checkList, color: '#c29cf2'}); setColor('#c29cf2')}}></div>
                      <div className="yellow" style={{ borderColor: color === '#f2f285' ? '#cecccc' : 'black' }} onClick={() => {setCheckList({...checkList, color: '#f2f285'}); setColor('#f2f285')}}></div>
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
    
    export default CheckList;