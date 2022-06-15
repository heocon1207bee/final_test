import "./styles.css";
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import Form from "./Form";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { initReactI18next, useTranslation } from 'react-i18next';
import i18n from "i18next";
import { Suspense } from "react";
import { translationsEn, translationsVi } from "./language";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

i18n
  .use(initReactI18next)
  .init( {
    resources: {
      en: {translation: translationsEn},
      vi: {translation: translationsVi},
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {escapeValue: false},
  })

const Home = () => {
    const [data, setData] = useState([])
    const [renderData, setRenderData] = useState([])
    const [count, setCount] = useState(0)
    const [notOnlyStatus, setNotOnlyStatus] = useState(false)

    useEffect(() => {
        const Data = localStorage.getItem('Data') ? JSON.parse(localStorage.getItem('Data')) : []
        setData(Data)
    }, [])

    useEffect(() => {
        localStorage.setItem('Data', JSON.stringify(data))
        setCount(() => {
            const unfinished = data.filter(d => {return d.finished === false})
            return unfinished.length
        })
        if(notOnlyStatus) {
            const notFinished = data.filter((d) => {return d.finished === false})
            setRenderData(notFinished)
        } else {
            setRenderData(data)
        }
    }, [data])

    const addTask = (newTask) => {
        setData([...data, newTask])
    }

    const checkChange = (checkTask) => {
        let newData = data.filter((d) => {
            return (d.title !== checkTask.title);
        })
        setData([...newData, checkTask])
    }

    const notFinishedOnly = () => {
        if(notOnlyStatus) {
            setRenderData(data)
            setNotOnlyStatus(false)
        }else {
            const notFinished = data.filter((d) => {return d.finished === false})
            setRenderData(notFinished)
            setNotOnlyStatus(true)
        }
    }

    const deleteTask = (checkTask) => {
        let newData = data.filter((d) => {
            return (d.title !== checkTask.title)
        })
        console.log(newData)
        setData(newData)
    }

  const { t } = useTranslation()

  const handleLang = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <Suspense fallback='Loading...'>
    <div className="App">
      <div className="container">
        <TodoListHeader 
        count={count}
        messages={t}
        />
        <TodoList 
        renderData={renderData}
        checkChange={checkChange}
        notFinishedOnly={notFinishedOnly}
        notOnlyStatus={notOnlyStatus}
        deleteTask={deleteTask}
        messages={t}
        />
        <Form 
        addTask={addTask} 
        data={data}
        messages={t}/>
      </div>
      <Footer messages={t} handleLang={handleLang}/>
    </div>
    </Suspense>
  );
};
