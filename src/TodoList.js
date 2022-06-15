import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

const TodoList = ({renderData, checkChange, notFinishedOnly, notOnlyStatus, deleteTask, messages}) => {

    const newDate = new Date()
    const dd = (newDate.getDate() < 10) ? `0${newDate.getDate()}` : newDate.getDate()
    const MM = (newDate.getMonth() + 1 < 10) ? `0${newDate.getMonth() + 1}` : (newDate.getMonth() + 1)
    const yyyy = newDate.getFullYear()

    const handleCheck = (rd) => {
        let checkTask = {...rd, finished: !rd.finished}
        checkChange(checkTask)
    }

    const handleDelete = (rd) => {
        deleteTask(rd)
    }

  return (
    <div className="todo-list-container">
        {
            notOnlyStatus ? (
                <div className="todo-item-container done">
                    <FaRegCheckCircle className="item-done-button" color="#9a9a9a" onClick={notFinishedOnly}/>
                    <div className="item-title">{messages('notFinished')}</div>
                </div>
            ) : (
                <div className="todo-item-container">
                    <FaRegCircle className="item-done-button" color="#9a9a9a" onClick={notFinishedOnly}/>
                    <div className="item-title">{messages('notFinished')}</div>
                </div>
            )
        }
      {
          renderData.map((rd, index) => {
              if(rd.finished === false) {
                  const day_arr = rd.date.split('-')
                  let day_left = 0;
                  if (day_arr[0] - yyyy >= 0) {
                      day_left = day_left + ((day_arr[0] - yyyy) * 365)
                      if(day_arr[1] - MM >= 0) {
                          day_left = day_left + ((day_arr[1] - MM) * 30)
                          if(day_arr[2] - dd >= 0) {
                              day_left = day_left + (day_arr[2] - dd + 1)
                          }
                      }
                  }
                  if(day_left === 0) { return (
                    <div className="todo-item-container done" key={index}>
                        <FaRegCheckCircle className="item-done-button" color="#9a9a9a" onClick={() => handleCheck(rd)}/>
                        <div className="item-title">{rd.title}</div>
                        <small className='item-date'>{messages('notDone')}</small>
                        <button className='item-delete-button' onClick={() => handleDelete(rd)}>{messages('delete')}</button>
                    </div>
                  ) } else { return (
                    <div className="todo-item-container" key={index}>
                        <FaRegCircle className="item-done-button" color="#9a9a9a" onClick={() => handleCheck(rd)}/>
                        <div className="item-title">{rd.title}</div>
                        <small className='item-date'>{messages('dayleft', {day_left})}</small>
                        <button className='item-delete-button' onClick={() => handleDelete(rd)}>{messages('delete')}</button>
                    </div>
                  ) }
              } else {
                  return (
                    <div className="todo-item-container done" key={index}>
                        <FaRegCheckCircle color="#9a9a9a" className="item-done-button" onClick={() => handleCheck(rd)}/>
                        <div className="item-title item-day">{rd.title}</div>
                        <small className='item-date'>{messages('done')}</small>
                        <button className='item-delete-button' onClick={() => handleDelete(rd)}>{messages('delete')}</button>
                    </div> 
                  )
              }
          })
      }
    </div>
  );
};

export default TodoList;
  