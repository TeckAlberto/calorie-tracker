
type CalorieDisplayProps = {
    calories: number,
    text: string
}



export default function CalorieDisplay({calories, text}: CalorieDisplayProps) {
  return (
    <p className="grid grid-cols-1 gap-3 text-center text-white rounded-full text-font">
      <span
        className={`text-6xl font-black ${text === "Consumidas" ? "text-orange-400" : text === "Ejercicio" ? "text-green-400" : "text-yellow-400"}`}
      >
        {calories}
      </span>
      {text}
    </p>
  );
}
