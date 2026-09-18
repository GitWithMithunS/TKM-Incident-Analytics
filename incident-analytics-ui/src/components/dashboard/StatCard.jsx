import CountUp from "react-countup";

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-5
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
      "
    >
      <div className="flex justify-between">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className={`text-3xl font-bold ${color}`}>

            <CountUp
              start={0}
              end={value}
              duration={1}
            />

          </h2>

        </div>

        <div className={color}>
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;

// function StatCard({ title, value, color }) {
//   return (
//     <div className="bg-white shadow p-5 rounded-xl">

//       <div className="text-gray-500">
//         {title}
//       </div>

//       <div className={`text-3xl font-bold ${color}`}>
//         {value}
//       </div>

//     </div>
//   );
// }

// export default StatCard;