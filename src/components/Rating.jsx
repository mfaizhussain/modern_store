import Icon from './Icon';

export default function Rating(props) {
  var rating = props.rating;

  // Handle case where rating might be null or undefined
  var ratingValue = 0;
  var ratingCount = 0;

  if (rating !== null && rating !== undefined) {
    if (rating.rate !== null && rating.rate !== undefined) {
      ratingValue = rating.rate;
    }
    if (rating.count !== null && rating.count !== undefined) {
      ratingCount = rating.count;
    }
  }

  // Format rating to 1 decimal place
  var formattedRating = ratingValue.toFixed(1);

  // If rating is 0, show dash instead
  var displayRating = '—';
  if (ratingValue > 0) {
    displayRating = formattedRating;
  }

  return (
    <span className="inline-flex items-center gap-1 text-sm text-[#45464d]">
      <Icon className="text-base text-[#0058be]">star</Icon>
      {displayRating}
      <span>({ratingCount})</span>
    </span>
  );
}
