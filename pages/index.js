import { useContext } from 'react';
import { DataContext } from '../elements/vitals/Provider';

export default function Home() {
				const { user } = useContext(DataContext);
				console.log(user);
  return (
	  <div>
	  	<h1>{ user?.address }</h1>
	  </div>
  )
}
