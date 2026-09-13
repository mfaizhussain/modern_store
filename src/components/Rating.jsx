import Icon from './Icon';
export default function Rating({ rating }) { return <span className="inline-flex items-center gap-1 text-sm text-[#45464d]"><Icon className="text-base text-[#0058be]">star</Icon>{rating?.rate?.toFixed(1) ?? '—'} <span>({rating?.count ?? 0})</span></span>; }
