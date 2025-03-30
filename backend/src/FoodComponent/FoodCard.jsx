import { Link } from "react-router-dom";
import CategoryNavigator from "../CategoryComponent/CategoryNavigator";

const FoodCard = (food) => {
  const descriptionToShow = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      const truncatedText = description.substring(0, maxLength);
      return truncatedText + "...";
    }
  };

  return (
    <div className="col">
      <div className="card food-card rounded-card h-100 shadow-lg">
        <img
          src={"http://localhost:8080/api/food/" + food.item.image1}
          className="card-img-top rounded"
          alt="img"
          style={{
            maxHeight: "300px",
            margin: "0 auto",
          }}
        />

        <div className="card-body text-color">
          <h5>
            Category:{" "}
            {food.item.category ? (
              <CategoryNavigator
                item={{
                  id: food.item.category.id,
                  name: food.item.category.name,
                }}
              />
            ) : (
              "No Category"
            )}
          </h5>
          <h5 className="card-title d-flex justify-content-between text-color-second">
            <div>
              <b>{food.item.name}</b>
            </div>
          </h5>
          <p className="card-text">
            <b>{descriptionToShow(food.item.description, 50)}</b>
          </p>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between mt-2">
            {food.item.category ? (
              <Link
                to={`/food/${food.item.id}/category/${food.item.category.id}`}
                className="btn bg-color custom-bg-text"
              >
                Add to Cart
              </Link>
            ) : (
              <button className="btn bg-color custom-bg-text" disabled>
                Add to Cart
              </button>
            )}

            <div className="text-color-second">
              <p>
                <span>
                  <h4>Price : &#8377;{food.item.price}</h4>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
