import ProductItem from './ProductItem';
import classes from './Products.module.css';

const dummy_data=[{
  id:'p1',
  price:6,
  description:'the first book ever wrote',
  title:'My First Book'
},
{
  id:'p2',
  price:8,
  description:'the second book ever wrote',
  title:'My second Book'
}];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy_data.map((product)=>(
          <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />
        ))
        }
      </ul>
    </section>
  );
};

export default Products;
