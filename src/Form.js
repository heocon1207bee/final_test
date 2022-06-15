import { useState } from "react";
const Form = ({addTask, data, messages}) => {
    const [input, setInput] = useState('')
    const newDate = new Date()
    const dd = (newDate.getDate() < 10) ? `0${newDate.getDate()}` : newDate.getDate()
    const MM = (newDate.getMonth() + 1 < 10) ? `0${newDate.getMonth() + 1}` : (newDate.getMonth() + 1)
    const yyyy = newDate.getFullYear()
    const [date, setDate] = useState(yyyy+'-'+MM+'-'+dd)

    const dublicatedCheck = (input) => {
        let isDublicated = false
        const dub = data.filter((d) => {
            return d.title === input
        })
        if(dub.length > 0) {isDublicated = true}
        return isDublicated
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(input !== '') {
            if(dublicatedCheck(input) === true) {
                alert(messages('dublicated'))
            } else {
                const newTask = {title: input, finished: false, date: date}
                addTask(newTask)
            }
        } else {
            alert(messages('inputEmpty'))
        }
        setInput('')
    }
    return (
      <form className="form" onSubmit={handleSubmit}>
        <input placeholder={messages('enterTask')} value={input} onChange={(e) => setInput(e.target.value)}/>
        <input type='date' value={date} onChange={e => {setDate(e.target.value)}}></input>
        <button>{messages('submit')}</button>
      </form>
    );
  };
  
  export default Form;
  