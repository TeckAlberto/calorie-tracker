/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activityReducer"
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {

  const [ state, dispatch ] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities])

  
  const canRestartApp = () => useMemo( () => state.activities.length > 0, [state.activities]);

  return (
    <>
      <header className="py-3 bg-lime-600">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <h1 className="text-lg font-bold text-center text-white uppercase">Contador de Calorias</h1>

          <button
            disabled={!canRestartApp()}
            className="p-2 text-sm font-bold text-white uppercase bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-900 disabled:opacity-10"
            onClick={() => dispatch({ type: 'restar-app' })}
          >
            Reiniciar App
          </button>
          
        </div>
      </header>

      <section className="px-5 py-20 bg-lime-500">
        <div className="max-w-4xl mx-auto">
          <Form
              dispatch={dispatch}
              state={state}
          />

        </div>
      </section>

      <section className="p-10 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>

      </section>

      <section className="max-w-4xl p-10 mx-auto">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
