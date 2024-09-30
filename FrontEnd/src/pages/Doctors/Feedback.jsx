import React from 'react'
import avatar from '../../assets/images//avatar-icon.png'
import { formateDate } from '../../utils/formateDate'
import { AiFillStar } from 'react-icons/ai'
import FeedbackForm from './FeedbackForm'

const Feedback = (reviews,totalRating) => {

  const [showFeedbackForm, setShowFeedbackForm] = React.useState(false);

  return (
    <div className="mb-[50px]">
      <h4 className="text-[20px] leading-[30px]  font-bold text-headingColor mb-[30px]">
        All reviews ({totalRating})
      </h4>

      {reviews?.map((reviews, index) => (
        <div key={index} className="flex justify-between gap-0=10 mb-[30px] ">


          <div className="flex gap-3">


            <figure className="w-10 h-10 rounded-full ">
              <img className="w-full " src={reviews.user?.photo} alt="avatar" />
            </figure>

            <div>
              <h5 className="text-[16px] leading-6 text-primaryColor font-bold ">
                Dr. {reviews?.user?.name}
              </h5>
              <p className="text-[14px] leading-6 text-textColor">
                {formateDate(reviews?.createdDate)}
              </p>

              <p className="text_para mt-3 font-medium text-[15px] ">
                {reviews.reviewsText}
              </p>
            </div>


          </div>

          <div className="flex gap-1">
            {[...Array(reviews?.rating).keys()].map((_, index) => (
              <AiFillStar key={index} className="#0067ff" />
            ))}

          </div>

        </div>

        

       ))}

      {!showFeedbackForm && (
        <div className="text-center ">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            {" "}
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm />}

    </div>
  );
}

export default Feedback
