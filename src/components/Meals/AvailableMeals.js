import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import loadingGif from './Hourglass.gif';

const AvailableMeals = () =>{

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchMeals = async () => {
      const response = await fetch('https://what-s-up-food-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();

      const loadedMeals = [];
     
      for(const key in responseData)
      {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }

    fetchMeals();
  },[])

  if(isLoading)
  {
    return(
      <section className={classes.loading}>
        <img src={loadingGif} ></img>
      </section>
    )
  }

    const mealsList = meals.map(meals => 
        <MealItem name={meals.name} description={meals.description} price={meals.price} id={meals.id} />
    );
    return(
        <section className={classes.meals}>
            <Card>
            <ul>
                {mealsList}
            </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;