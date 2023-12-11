import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import UseContext from '../Context'
import { getCard, getCheckList, getUser } from '../api/api'
import Draggable from 'react-draggable';
import axios from 'axios';
import bg from '../assets/bg.jpg'
import dog from '../assets/dog.png'
import bt from '../assets/bt.png'
import monkey from '../assets/monkey.png'
import rabbit from '../assets/rabbit.png'
import cat from '../assets/cat.png'
import { DateOnCard, GetCurrentFormattedDate, Greeting } from '../api/functions'
import { BsFillPlusCircleFill, 
  BsListCheck,
  BsFillPencilFill ,
  BsTrash3Fill,
  BsCalendar3Week,     
  BsCheckLg,
  BsFillLockFill,
  BsUnlockFill   } from "react-icons/bs";


function Body() {
  const [lock, setLock] = useState(null)
  const [deleteMode, setDeleteMode] = useState(false)
  const [avatarMode, setAvatarMode] = useState(false)
  const [editBtn, setEditBtn] = useState(false)
  const [getUsername, setGetUsername] = useState()
  const [avatar, setAvatar] = useState('')
  const navigate = useNavigate()
  const {
    setCreateCardModel,
    cardResult, setCardResult,
    setCheckListModel,
    checkListResult,setCheckListResult
  } = useContext(UseContext);

  const [editModes, setEditModes] = useState(() => {
    const initialState = {};
    cardResult.forEach((card) => {
      initialState[card._id] = false;
    });
    return initialState;
  });
  const [editModesChecklist, setEditModesChecklist] = useState(() => {
    const initialState = {};
    checkListResult.forEach((checklist) => {
      initialState[checklist._id] = false;
    });
    return initialState;
  });



/// new Date
  const currentDate = GetCurrentFormattedDate()


    

///fetch card detail
  useEffect(() => {
    const userId = window.localStorage.getItem('id')
    if (!lock) setLock(true)
    getUser(userId, setGetUsername, setAvatar, setLock)
    getCard(setCardResult, userId);
    getCheckList(setCheckListResult, userId);
  },[]);


  function handleSignIn() {
    navigate('/auth/login')
  }

  function handleLogout() {
    window.localStorage.clear()
    axios.get('https://notebackend-qr35.onrender.com/auth/logout')
    .then(() => {
      alert('logout sucessfully')
      navigate('/auth/login')
    })
    .catch(err => console.log(err))
  }

  const saveCardPositions = (cardId, position) => {
    axios.put(`https://notebackend-qr35.onrender.com/card/saveCardPositions/${cardId}`,position, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
      }
    )

      .then(() => {
      })
      .catch(err => console.log(err));
  };

  const saveCheckListPositions = (checklistId, position) => {
    axios.put(`https://notebackend-qr35.onrender.com/checklist/saveChecklistPositions/${checklistId}`, position, {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(() => {
      })
      .catch(() => console.log());
  };

  const saveIsDone = (checklistId, isDone, number) => {
    axios.put(`https://notebackend-qr35.onrender.com/checklist/isdone/${checklistId}`, { isDone, number }, {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(() => {

      })
      .catch(err => console.log(err));
  };
  
    
    // Update the state when a card is dragged
    function handleDragStopCard(cardId, event, data) {
      const newPosition = { x: data.x, y: data.y };

      saveCardPositions(cardId, newPosition);
      saveCheckListPositions(cardId, newPosition);

    }

    
    // Update the state when a checklist is dragged
  function handleDragStopChecklist(checklistId, event, data) {
    const newPosition = { x: data.x, y: data.y };

      saveCheckListPositions(checklistId, newPosition);

    }
  

  function handleIsDone(id, isDone, number) {
    const updatedIsDone = !isDone;
    setCheckListResult(prevCheckListResult => 
      prevCheckListResult.map(checklist => 
        checklist._id === id ? { ...checklist, [`done${number}`]: updatedIsDone } : checklist
      )
    );
    saveIsDone(id, updatedIsDone, number);
  }


  function handleEditCard(e, id, type, field) {
    const newValue = e.target.value;

    if (type === 'card') {
        setCardResult((prevCardResult) =>
            prevCardResult.map((card) =>
                card._id === id ? { ...card, [field]: newValue } : card
            )
        );
        console.log(newValue, field);

        axios.put(`https://notebackend-qr35.onrender.com/card/card-edit/${id}`, { value: newValue, field }, {
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
          },
        })
            .then(() => {
            })
            .catch((error) => {
                console.error('Error updating card', error);
            });
    }
}
    


  function handleEditChecklist(e, id, type, field) {
     const newValue = e.target.value;
  
    if (type === 'checklist') {
         setCheckListResult((prevCheckListResult) =>
             prevCheckListResult.map((checklist) =>
                 checklist._id === id ? { ...checklist, [field]: newValue } : checklist
            )
        );
  
        axios.put(`https://notebackend-qr35.onrender.com/checklist/checklist-edit/${id}`, { value: newValue, field }, {
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
          },
        })
             .then(() => {
                
            })
             .catch((error) => {
                 console.error('Error updating checklist', error);
             });
      }
  }

    function handleDelete(id, type) {
      const userId = window.localStorage.getItem('id')

      if (type === 'card') {
        axios.delete(`https://notebackend-qr35.onrender.com/card/card-delete/${id}`)
          .then(() => {
            getCard(setCardResult, userId);
          })
          .catch((error) => {
            console.error('Error deleting card:', error);
          });
      }
    
      if (type === 'checklist') {
        const userId = window.localStorage.getItem('id')

        axios.delete(`https://notebackend-qr35.onrender.com/checklist/checklist-delete/${id}`)
          .then(() => {
            getCheckList(setCheckListResult, userId);
          })
          .catch((error) => {
            console.error('Error deleting checklist:', error);
          });
      }
  }

  function handlSelectAvatar(avatar) {
    const userId = window.localStorage.getItem('id');

    axios.put(`https://notebackend-qr35.onrender.com/auth/avatar/${userId}`, { avatar }, {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
    })
        .then((result) => {
            setAvatar(result.data.avatar);
            console.log(result.data.avatar);
        })
        .catch(err => console.log(err));
    }

    function handleLock(lock) {
      const userId = window.localStorage.getItem('id');
      const lockValue = !lock
        console.log(lockValue)
        axios.put(`https://notebackend-qr35.onrender.com/auth/lock/${userId}`, { lock: lockValue }, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        }
      })
        .then(() => {
      getUser(userId, setGetUsername, setAvatar, setLock);
    })
      .catch((err) => console.log(err));
    }


  return (
    <motion.section className='container'>
      <motion.div
        className='left_row'
        transition={{ duration: .8, ease: 'easeInOut' }}>
        <div className="logo">
          <h2>Notes</h2>
            <div className="subject"></div>
            <div className="btn_container">
              <div onClick={() => setCreateCardModel(true)} >
                <span className='btn_name_first'><BsFillPlusCircleFill/></span>
                <span className='btn_name'>Add card</span>
              </div>
              <div onClick={() => setCheckListModel(true)}>
                <span className='btn_name_first'><BsListCheck /></span>
                <span className='btn_name'>Add list</span>
              </div>
              <div onClick={() => {setEditBtn(!editBtn); setEditModes(false); setDeleteMode(false)}}>
                <span className='btn_name_first'><BsFillPencilFill /></span>
                <span className='btn_name'>Edit</span>
              </div>
              <div onClick={() => handleLock(lock)}>
                <span className='btn_name_first'>
                  {lock?(<BsFillLockFill />):(<BsUnlockFill />)}
                  </span>
                <span className='btn_name'>
                  {lock? 'Lock':'Unlock'}
                </span>
              </div>
              <div onClick={() => {setDeleteMode(!deleteMode); setEditBtn(false)}} >
                <span className='btn_name_first'><BsTrash3Fill/></span>
                <span className='btn_name'>Trash</span>
              </div>
            </div>
            <div className="profile_container">
              <div className="profile">
                <motion.div className="profile_image"
                  onHoverStart={() => setAvatarMode(true)}
                  onClick={() => setAvatarMode(true)}
                >
                  <img src={avatar} />
                </motion.div>
              </div>
              {avatarMode && window.localStorage.length?
              (
                <div className="select_avatar" onMouseLeave={() => setAvatarMode(false)}>
                  <img src={dog} alt="dog" onClick={() => {handlSelectAvatar(dog); setAvatarMode(false)}} />
                  <img src={bt} alt="bt" onClick={() => {handlSelectAvatar(bt); setAvatarMode(false)}} />
                  <img src={cat} alt="cat" onClick={() => {handlSelectAvatar(cat); setAvatarMode(false)}} />
                  <img src={rabbit} alt="rabbit" onClick={() => {handlSelectAvatar(rabbit); setAvatarMode(false)}} />
                  <img src={monkey} alt="monkey" onClick={() => {handlSelectAvatar(monkey); setAvatarMode(false)}} />
                </div>
              )
              :
              (null)}
              <span style={{ color: '#fcf4f4'}} >{getUsername}</span>
              {window.localStorage.length? (
                <button 
                  onClick={handleLogout}
                >Logout
                </button>)
              :(
              <button
                onClick={handleSignIn}
              >Login</button>
              )}
              
            </div>
        </div>
      </motion.div>
      <div className="top_right_row"
        style={{ backgroundImage: `url(${bg})` }}>
        <h1><Greeting /> {getUsername}!</h1>
        <h4>{currentDate}</h4>
      </div>
      <motion.div className="right_row" >
        
        <div className="card_container">
          <div className='mynote'><span><BsCalendar3Week /></span><h4>My Notes</h4></div>
        {cardResult.map((card) => (
          <Draggable
          key={card._id}
          cancel='.edit_name, .edit_description, .delete_card, .edit_pensil_div, .card_description_'
          axis="both"
          disabled={lock}
          handle={'.card'}
          grid={[0.1, 0.1]}
          scale={1}
          defaultPosition={{ 
            x: card.x,
            y: card.y 
          }}
          bounds='.card_container'
          onStop={(event, data) => handleDragStopCard(card._id, event, data)}
        >
            <motion.div
              key={card._id}
              className="card"
              style={{ backgroundColor: card.color }}
            >
              <span>
                <DateOnCard date={card.created} />
              </span>

              {deleteMode && (
                <BsTrash3Fill className='delete_card' style={{ position: 'relative', right: '-5.1rem', top: '3px', cursor: 'pointer'}} 
                  onClick={() => handleDelete(card._id, 'card')}
                />
              )}
              
              {editBtn && (
                <motion.div className="edit_card"
                  whileHover={{color:'grey'}}
                >
                  {editModes[card._id]? 
                    (
                    <div className='edit_pensil_div' 
                      onClick={() => 
                      setEditModes((prev) => ({ ...prev, [card._id]: false}))}
                      style={{width: '20px', height: '20px'}}  
                      >
                      <BsCheckLg className='edit_card_' style={{animation: 'blink 2s ease-in-out infinite'}} />
                    </div>
                    )
                    :
                    (
                    <div className='edit_pensil_div' style={{width: '20px', height: '20px',}} 
                      onClick={() => 
                      setEditModes((prev) => ({ ...prev, [card._id]: true}))}
                    >
                      <BsFillPencilFill />
                    </div>
                    )
                  }
                </motion.div>
              )}
              {editModes[card._id]?(
                <>
                  <input className='edit_name' type="text" onChange={(e) => handleEditCard(e, card._id, 'card', 'name')} value={card.name} />
                  <textarea className='edit_description' value={card.description} onChange={(e) => handleEditCard(e, card._id, 'card', 'description')} cols="30" rows="10"></textarea>
                </>
                )
                :
                (
                <>
                  <h1>{card.name}</h1>
                  <p className='card_description_'>{card.description}</p>
                </>
              )}
              
            </motion.div>
          </Draggable>
        ))}
          {checkListResult.map((checklist) => (
            <Draggable
            key={checklist._id}
            cancel='.edit_checklist_div input, .edit_checklist_list, .edit_checklist, .delete_card, .checkbox_tick'
            axis="both"
            disabled={lock}
            handle={'.checklist_card'}
            grid={[0.1, 0.1]}
            scale={1}
            defaultPosition={{ 
              x: checklist.x,
              y: checklist.y 
            }}
            bounds='.card_container'
            onStop={(event, data) => handleDragStopChecklist(checklist._id, event, data)}
            >
            <motion.div key={checklist._id} className="checklist_card" style={{ backgroundColor: checklist.color}}>
              <span><DateOnCard date={checklist.created} /></span>
              {deleteMode && (
                <BsTrash3Fill className='delete_card' style={{ position: 'absolute', right: '.8rem', top: '8px', cursor: 'pointer'}} 
                onClick={() => handleDelete(checklist._id, 'checklist')}
                />
              )}
              {editBtn && (
                <>
                {!editModesChecklist[checklist._id]? 
                  (
                    <BsFillPencilFill className='edit_checklist'
                      style={{position: 'absolute', fontSize: '14px', right: '.8rem', cursor: 'pointer'}}
                      onClick={() => setEditModesChecklist((prev) => ({ ...prev, [checklist._id]: true }))}/>
                  )
                  :
                  (
                    <BsCheckLg className='edit_checklist'
                      style={{position: 'absolute', fontSize: '14px', right: '.8rem', cursor: 'pointer', animation: 'blink 2s ease-in-out infinite'}}
                      onClick={() => setEditModesChecklist((prev) => ({ ...prev, [checklist._id]: false}))}/>
                  )
                }
                </>
              )}
              {editModesChecklist[checklist._id]? 
              (
                <>
                <div className="edit_checklist_div">
                  <input className='edit_checklist_list' type="text" maxLength='22' value={checklist.checklist1} onChange={(e) => handleEditChecklist(e, checklist._id, 'checklist', 'checklist1')}/>
                  <input className='edit_checklist_list' type="text" maxLength='22' value={checklist.checklist2} onChange={(e) => handleEditChecklist(e, checklist._id, 'checklist', 'checklist2')}/>
                  <input className='edit_checklist_list' type="text" maxLength='22' value={checklist.checklist3} onChange={(e) => handleEditChecklist(e, checklist._id, 'checklist', 'checklist3')}/>
                  <input className='edit_checklist_list' type="text" maxLength='22' value={checklist.checklist4} onChange={(e) => handleEditChecklist(e, checklist._id, 'checklist', 'checklist4')}/>
                  <input className='edit_checklist_list' type="text" maxLength='22' value={checklist.checklist5} onChange={(e) => handleEditChecklist(e, checklist._id, 'checklist', 'checklist5')}/>
                </div>
                </>
              )
              :
              (
                <>
                  {checklist.checklist1 && (
                <div className="input_checklist_container" >
                <span>
                <input type="checkbox" checked={checklist.done1} className='checkbox_tick' 
                    onClick={() => handleIsDone(checklist._id, checklist.done1,'1')}
                    onChange={() => {}}
                  />
                  <span className={`checkbox_text ${checklist.done1 ? 'crossed' : ''}`}>
                    {checklist.checklist1}
                  </span>
                </span>
              </div>
              )}
              {checklist.checklist2 && (
                <div className="input_checklist_container">
                <span>
                <input type="checkbox" checked={checklist.done2} className='checkbox_tick' 
                    onClick={() => handleIsDone(checklist._id, checklist.done2,'2')}
                    onChange={() => {}}
                  />
                  <span className={`checkbox_text ${checklist.done2 ? 'crossed' : ''}`}>
                    {checklist.checklist2}
                  </span>
                </span>
              </div>
              )}
              {checklist.checklist3 && (
                <div className="input_checklist_container">
                <span>
                <input type="checkbox" checked={checklist.done3} className='checkbox_tick' 
                    onClick={() => handleIsDone(checklist._id, checklist.done3,'3')}
                    onChange={() => {}}
                  />
                  <span className={`checkbox_text ${checklist.done3 ? 'crossed' : ''}`}>
                    {checklist.checklist3}
                  </span>
                </span>
              </div>
              )}
              {checklist.checklist4 && (
                <div className="input_checklist_container">
                <span>
                <input type="checkbox" checked={checklist.done4} className='checkbox_tick' 
                    onClick={() => handleIsDone(checklist._id, checklist.done4,'4')}
                    onChange={() => {}}
                  />
                  <span className={`checkbox_text ${checklist.done4 ? 'crossed' : ''}`}>
                    {checklist.checklist4}
                  </span>
                </span>
              </div>
              )}
              {checklist.checklist5 && (
                <div className="input_checklist_container">
                <span>
                <input type="checkbox" checked={checklist.done5} className='checkbox_tick' 
                    onClick={() => handleIsDone(checklist._id, checklist.done5,'5')}
                    onChange={() => {}}
                  />
                  <span className={`checkbox_text ${checklist.done5 ? 'crossed' : ''}`}>
                    {checklist.checklist5}
                  </span>
                </span>
              </div>
               )}  
              </>
             )}
            </motion.div>
            </Draggable>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Body;
