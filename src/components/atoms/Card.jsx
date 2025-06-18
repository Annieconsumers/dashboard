
const Card = ({name, className, total, icon}) => {
 
  return (
    <div className={`rounded gap-5 flex flex-col p-5 ${className} `}>
        <p className="flex items-center gap-2 text-xl font-semibold"> <span className="bg-violet-500 p-1 rounded-full text-white">{icon}</span> {name}</p>
        <h3 className="text-3xl font-bold">{total}</h3>
        <h4 className="text-xl font-semibold text-gray-600">Total {name}</h4>
    </div>
  )
}

export default Card