
import Header from '../components/Header'
import UserFeedback from '../components/UserFeedback'


const TicketList = () => {
  return (
    
    <div className=" overflow-y-hidden ">
      <Header />
      <div className=" overflow-y-auto w-full h-full mt-21">
        <UserFeedback/> 
      </div>
    </div>
  )
}

export default TicketList