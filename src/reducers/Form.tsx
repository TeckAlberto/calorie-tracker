import { useState, ChangeEvent, FormEvent, Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories"
import { Activity } from "../types";
import { ActivityActions } from "./activityReducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>
}

const INITIAL_STATE: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({dispatch}: FormProps) {

    const [ activity, setActivity ] = useState<Activity>(INITIAL_STATE);

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const isNumberField = ['category', "calories"].includes(e.target.id);

      setActivity({
        ...activity,
        [e.target.id]: isNumberField ? +e.target.value : e.target.value,
      });
    };  

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      dispatch({ type: "save-activity", payload: { newActivity: activity } });

      setActivity({
        ...INITIAL_STATE,
        id: uuidv4(),
      });
    }
    
    const isValidActivity = () => {
      const { name, calories } = activity;
      return name.trim() !== '' && calories > 0;
    }

    return (
      <form 
        className="p-10 space-y-5 bg-white rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="category">Categoria:</label>
          <select
            value={activity.category}
            id="category"
            className="w-full p-2 bg-white border rounded-lg border-slate-300"
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name">Actividad:</label>

          <input
            value={activity.name}
            id="name"
            type="text"
            className="p-2 border rounded-lg border-slate-300"
            placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calories">Calorias:</label>

          <input
            value={activity.calories}
            id="calories"
            type="number"
            className="p-2 border rounded-lg border-slate-300"
            placeholder="Calorias. ej. 300, 500"
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className="w-full p-2 font-bold text-white uppercase bg-gray-800 cursor-pointer disabled:opacity-5 hover:bg-gray-900"
          value={`${activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}`}
          disabled={!isValidActivity()}
        />
      </form>
    );
}
