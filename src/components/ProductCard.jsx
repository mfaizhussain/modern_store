import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import Rating from './Rating';
import Icon from './Icon';

// Create currency formatter for displaying prices
var moneyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function ProductCard(props) {
  // Get the addItem function from cart context
  var cartContext = useCart();
  var addItem = cartContext.addItem;

  // Get product from props
  var product = props.product;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-transparent bg-white pb-4 transition hover:border-[#c6c6cd] hover:shadow-sm">
      {/* Product link */}
      <Link to={('/products/' + product.id)} className="block">
        {/* Product image */}
        <div className="aspect-[4/5] overflow-hidden bg-[#f2f4f6] p-7">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product details */}
      <div className="flex flex-1 flex-col gap-1 px-4 pt-4">
        {/* Product category */}
        <p className="text-xs font-semibold uppercase tracking-wider text-[#45464d]">
          {product.category}
        </p>

        {/* Product title */}
        <Link to={('/products/' + product.id)} className="line-clamp-2 font-semibold hover:text-[#0058be]">
          {product.title}
        </Link>

        {/* Price and rating */}
        <div className="mt-auto flex items-end justify-between pt-3">
          <strong>{moneyFormatter.format(product.price)}</strong>
          <Rating rating={product.rating} />
        </div>

        {/* Add to cart button */}
        <button
          onClick={function () {
            addItem(product);
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 bg-[#0058be] py-2 text-xs font-bold tracking-wider text-white transition hover:bg-[#2170e4]"
        >
          <Icon className="text-base">add_shopping_cart</Icon>
          ADD TO CART
        </button>
      </div>
    </article>
  );
}
