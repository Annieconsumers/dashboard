
import Header from '../components/Header'
import MembershipUserTable from '../components/table/MembershipUserTable';

const Subscription = () => {
  return (
    
    <div className="overflow-y-hidden">
      <Header />
      <div className=" overflow-y-auto w-full h-full mt-20">
        <MembershipUserTable/> 
      </div>
    </div>
  )
}

export default Subscription