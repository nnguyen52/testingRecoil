import axios from 'axios';
import { ProcessShoppingCart, StartUp, ShowGames } from '../recoil/index';
export default function Home({ data }) {
  return (
    <>
      <StartUp data={data} />
      <ProcessShoppingCart />
      <ShowGames />
    </>
  );
}

export async function getStaticProps() {
  const res = await axios.post('https://igedebe2server.herokuapp.com/api/mostAnticipatedGames');
  return {
    props: {
      data: res.data.filtered,
    },
  };
}
