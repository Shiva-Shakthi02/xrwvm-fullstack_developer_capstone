import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png";
import neutral_icon from "../assets/neutral.png";
import negative_icon from "../assets/negative.png";
import review_icon from "../assets/reviewbutton.png";
import Header from '../Header/Header';

const Dealer = () => {
    
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>);
  const { id } = useParams();

  const get_dealer = async () => {
    const res = await fetch(`/djangoapp/dealer/${id}`, { method: "GET" });
    const data = await res.json();
    if (data.status === 200) {
      setDealer(data.dealer);
    }
  };

  const get_reviews = async () => {
    const res = await fetch(`/djangoapp/reviews/dealer/${id}`, { method: "GET" });
    const data = await res.json();
    if (data.status === 200) {
      if (data.reviews.length > 0) {
        setReviews(data.reviews);
      } else {
        setUnreviewed(true);
      }
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive": return positive_icon;
      case "negative": return negative_icon;
      default: return neutral_icon;
    }
  };

  useEffect(() => {
    get_dealer();
    get_reviews();
    if (sessionStorage.getItem("username")) {
      setPostReview(
        <a href={`/postreview/${id}`}>
          <img src={review_icon} style={{ width: '10%', marginLeft: '10px', marginTop: '10px' }} alt="Post Review" />
        </a>
      );
    }
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <Header />
      <div style={{ marginTop: "10px" }}>
        <h1 style={{ color: "grey" }}>{dealer.full_name}{postReview}</h1>
        <h4 style={{ color: "grey" }}>
          {dealer.city}, {dealer.address}, Zip - {dealer.zip}, {dealer.state}
        </h4>
      </div>

      <div className="reviews_panel">
        {reviews.length === 0 && !unreviewed ? (
          <div>Loading Reviews....</div>
        ) : unreviewed ? (
          <div>No reviews yet!</div>
        ) : (
          reviews.map((review, idx) => (
            <div className='review_panel' key={idx}>
              <img src={getSentimentIcon(review.sentiment)} className="emotion_icon" alt="Sentiment" />
              <div className='review'>{review.review}</div>
              <div className="reviewer">
                {review.name} {review.car_make} {review.car_model} {review.car_year}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dealer;
