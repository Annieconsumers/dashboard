
import Header from "../../components/Header";
import NewRegisteredUserTable from "../../components/table/NewRegistredUserTable";

const NewRegisteredSeller = () => {
  return (
    
      <div className="overflow-y-hidden ">
        <Header />
        <div className=" overflow-y-auto w-full h-full mt-20">
          <NewRegisteredUserTable />
        </div>
      </div>
  );
};

export default NewRegisteredSeller;
