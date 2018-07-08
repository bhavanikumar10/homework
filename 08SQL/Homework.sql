USE Sakila;

# * 1a. Display the first and last names of all actors from the table `actor`.
SELECT first_name, last_name FROM actor;

# 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column `Actor Name`.

 SELECT UPPER(CONCAT(first_name, "  ", last_name)) AS 'Actor Name'
 FROM actor; 
 
 # 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
 SELECT actor_id, first_name, last_name
 FROM actor
 WHERE first_name = "Joe";

# 2b. Find all actors whose last name contain the letters `GEN`:
SELECT first_name, last_name
FROM actor
WHERE last_name LIKE '%gen';

# 2c. Find all actors whose last names contain the letters `LI`. This time, order the rows by last name and first name, in that order:
SELECT last_name, first_name
FROM actor
WHERE last_name LIKE '%LI%';

# 2d. Using `IN`, display the `country_id` and `country` columns of the following countries: Afghanistan, Bangladesh, and China:
SELECT country_id, country 
FROM country
WHERE country IN ("Afghanistan", "Bangladesh", "China");

# 3a. Add a `middle_name` column to the table `actor`. Position it between `first_name` and `last_name`. Hint: you will need to specify the data type.
ALTER TABLE actor
ADD middle_name varchar(25);

select * from actor;

CREATE VIEW vactor
AS
SELECT actor_id, first_name, middle_name, last_name, last_update
FROM actor;

select * from vactor;

# 3b. You realize that some of these actors have tremendously long last names. Change the data type of the `middle_name` column to `blobs`.
ALTER TABLE actor
MODIFY COLUMN middle_name blob;

# 3c. Now delete the `middle_name` column.
ALTER TABLE actor
Drop COLUMN middle_name;

# 4a. List the last names of actors, as well as how many actors have that last name.
SELECT last_name AS 'Actor last name', COUNT(last_name) AS 'Actor Last name count'
FROM actor
GROUP BY last_name;

# 4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors
SELECT last_name AS 'Actor last name', COUNT(last_name) AS 'Actor Last name count'
FROM actor
GROUP BY last_name
HAVING COUNT(last_name) >= 2;

# 4c. Oh, no! The actor `HARPO WILLIAMS` was accidentally entered in the `actor` table as `GROUCHO WILLIAMS`, the name of Harpo's second cousin's husband's yoga teacher. Write a query to fix the record.
UPDATE actor
SET first_name = 'Harpo'
WHERE first_name = 'GROUCHO' AND last_name = 'Williams';

# 4d. Perhaps we were too hasty in changing `GROUCHO` to `HARPO`. It turns out that `GROUCHO` was the correct name after all! In a single query, if the first name of the actor is currently `HARPO`, change it to `GROUCHO`. Otherwise, change the first name to `MUCHO GROUCHO`, as that is exactly what the actor will be with the grievous error. BE CAREFUL NOT TO CHANGE THE FIRST NAME OF EVERY ACTOR TO `MUCHO GROUCHO`, HOWEVER! (Hint: update the record using a unique identifier.)

UPDATE actor
SET first_name = CASE
				WHEN first_name = 'HARPO' THEN 'GROUCHO'
                WHEN first_name != 'HARPO' THEN 'MUCHO GROUCHO'
				END
WHERE actor_id = 172;

SELECT * FROM ACTOR WHERE actor_id = 172;

# 5a. You cannot locate the schema of the `address` table. Which query would you use to re-create it?
SHOW CREATE TABLE address;

# 6a. Use `JOIN` to display the first and last names, as well as the address, of each staff member. Use the tables `staff` and `address`:
SELECT first_name, last_name, address.address, address.address2, address.district, address.postal_code
FROM staff
LEFT JOIN address
ON staff.address_id = address.address_id;

#  6b. Use `JOIN` to display the total amount rung up by each staff member in August of 2005. Use tables `staff` and `payment`.
SELECT staff.staff_id, first_name, last_name, sum(payment.amount) AS 'Total amount rung'
FROM staff
LEFT JOIN payment
ON staff.staff_id = payment.staff_id
GROUP BY staff_id;

# 6c. List each film and the number of actors who are listed for that film. Use tables `film_actor` and `film`. Use inner join.
SELECT title, count(film_actor.actor_id) AS 'Number of Actors'
FROM film
INNER JOIN film_actor
WHERE film.film_id = film_actor.film_id
GROUP BY film.film_id;

# 6d. How many copies of the film `Hunchback Impossible` exist in the inventory system?
SELECT inventory.film_id, COUNT(inventory_id) AS 'number of copies', film_text.title as 'film title'
FROM inventory
LEFT JOIN film_text
ON inventory.film_id =  film_text.film_id
WHERE film_text.title = 'HUNCHBACK IMPOSSIBLE'
Group by film_id;

# 6e. Using the tables `payment` and `customer` and the `JOIN` command, list the total paid by each customer. List the customers alphabetically by last name:
SELECT customer.customer_id, first_name, last_name, SUM(payment.amount) AS 'Total amount paid'
FROM customer
LEFT JOIN payment
ON customer.customer_id = payment.customer_id
GROUP BY last_name ASC;

# 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films starting with the letters `K` and `Q` have also soared in popularity. Use subqueries to display the titles of movies starting with the letters `K` and `Q` whose language is English.
SELECT film_id, title, language_id
FROM film
WHERE title LIKE 'q%' OR title LIKE'k%'
AND language_id IN
	(	SELECT language_id 
		FROM language
        WHERE name= 'English');
        
# 7b. Use subqueries to display all actors who appear in the film `Alone Trip`.
SELECT actor_id, film_actor.film_id
FROM film_actor
WHERE film_id IN
	(SELECT film_id
    FROM film_text
    WHERE title = 'Alone Trip');
    
# 7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information.
select * from country;

select * from customer;

select * from city;

SELECT first_name, last_name, email
FROM customer, address
WHERE customer.address_id = address.address_id
and address.city_id in
	(SELECT city_id FROM city
     WHERE country_id IN
		(SELECT country_id 
        FROM country
        WHERE country = 'Canada'));
        
# 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. Identify all movies categorized as famiy films.
select * from film_category;

select * from category;

SELECT film.film_id, title 
FROM film, film_category
WHERE film.film_id = film_category.film_id
AND film_category.film_id in
	(SELECT film_id FROM film_category
    WHERE category_id IN
		(SELECT category_id FROM category
		WHERE name = 'Family'));
        
# 7e. Display the most frequently rented movies in descending order.
SELECT count(rental.inventory_id), film.title
FROM rental, film
LEFT JOIN inventory
ON film.film_id = inventory.film_id
WHERE rental.inventory_id IN
	(Select inventory.inventory_id from inventory)
GROUP BY film.title
ORDER BY count(rental.inventory_id) DESC;

# 7f. Write a query to display how much business, in dollars, each store brought in.
SELECT customer.store_id, sum(payment.amount)
FROM customer, payment
WHERE payment.customer_id = customer.customer_id
GROUP BY customer.store_id;

# 7g. Write a query to display for each store its store ID, city, and country.
SELECT store.store_id, city.city, country.country
FROM store, city, country
WHERE city.country_id = country.country_id
AND store.address_id IN 
	(select address.address_id
    from address 
    where address.city_id = city.city_id);
    
 # 7h. List the top five genres in gross revenue in descending order. (**Hint**: you may need to use the following tables: category, film_category, inventory, payment, and rental.)
SELECT category.name, sum(payment.amount)
FROM category, payment
left join film_category
on category.category_id = film_category.category_id
LEFT JOIN inventory
ON inventory.film_id = film_category.film_id
    AND payment.customer_id IN
		(SELECT rental.customer_id FROM rental
        WHERE rental.customer_id = payment.customer_id)
LIMIT 5;
#GROUP BY category.name;
#ORDER BY SUM(payment.amount) DESC;

SELECT category.name, sum(payment.amount)
FROM category, payment, film_category, inventory, rental
WHERE category.category_id = film_category.category_id
and film_category.film_id = inventory.film_id
and inventory.inventory_id = rental.inventory_id
and payment.customer_id = rental.customer_id;
# LIMIT 5
# GROUP BY name
# ORDER BY SUM(payment.amount) DESC;



# * 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. Use the solution from the problem above to create a view. If you haven't solved 7h, you can substitute another query to create a view.
CREATE VIEW gross_revenue AS
SELECT category.name, sum(payment.amount)
FROM category, payment, film_category, inventory, rental
WHERE category.category_id = film_category.category_id
and film_category.film_id = inventory.film_id
and inventory.inventory_id = rental.inventory_id
and payment.customer_id = rental.customer_id;


# 8b. How would you display the view that you created in 8a?
SELECT * FROM gross_revenue;


# 8c. You find that you no longer need the view `top_five_genres`. Write a query to delete it.
DROP VIEW gross_revenue;
