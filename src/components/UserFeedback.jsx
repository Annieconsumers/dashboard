import { useEffect } from "react";
import { BsDot } from "react-icons/bs";
import userPic from "../assets/Ellipse 2.png";
import { useDispatch, useSelector } from "react-redux";
import { feedbackUser } from "../redux/slices/usersSlice";
import moment from "moment/moment";

const UserFeedback = () => {

  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(users);
  useEffect(() => {
    dispatch(feedbackUser());
  }, [dispatch]);

  return (
    <div className="px-5 flex flex-col  gap-5 max-h-[87vh] mt-2">
      {users.map((item, index) => (
        <div key={index} className="flex flex-row items-center gap">
          <div className="w-16 h-9 rounded-full">
            <img
              src={item.users?.profile_pic_url}
              className=" h-10 w-10 rounded-full "
            />
          </div>
          <article>
            <div className="flex items-center">
              <p className="font-semibold">{item.users?.name}</p>
              <BsDot />
              <span>
                {moment(item.created_at)
                  .utcOffset(330)
                  .format("MMMM Do YYYY, h:mm:ss a")}
              </span>
            </div>
            <div>
              <p>{item.message}</p>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
};

export default UserFeedback;
