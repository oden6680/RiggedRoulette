import { useLocation } from 'react-router-dom';
import Roulette from './Roulette';

const RoulettePage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const items = params.get('items')?.split(',') || [];

  return <Roulette items={items} targetItem={items[0]} />;
};

export default RoulettePage;
