import { useEffect } from 'react';
import {
  atom,
  atomFamily,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

export const games = atom({
  key: 'Games',
  default: [],
});
export const shoppingCart = atom({
  key: 'ShoppingCart',
  default: [],
});

export const gamesUtils = selectorFamily({
  key: 'Utils',
  get:
    () =>
    ({ get }) => {
      return get(games);
    },
  set:
    (data) =>
    ({ set }) => {
      set(games, data);
    },
});

export function StartUp({ data }) {
  const [games, setGames] = useRecoilState(gamesUtils(data));
  useEffect(() => {
    if (!data) return;
    setGames(games, data);
  }, [data]);
  return <></>;
}
export function ProcessShoppingCart() {
  const shopingCartState = useRecoilValue(shoppingCart);
  return (
    <>
      <h3>Shopping Cart</h3>
      {shopingCartState &&
        shopingCartState.map((each, index) => {
          return <div key={index}> {each.name}</div>;
        })}
    </>
  );
}
export function ShowGames() {
  const gamesList = useRecoilValue(games);
  const [shoppingCartState, setShoppingCartState] = useRecoilState(shoppingCart);
  const handleChooseItem = (item) => {
    if (
      shoppingCartState.some((prev) => {
        return prev.id === item.id;
      })
    ) {
      return;
    }
    setShoppingCartState((prev) => [...prev, item]);
  };
  {
    !gamesList.length && (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {gamesList.map((each) => {
        return (
          <div
            key={each.id}
            style={{
              width: '200px',
              height: '100px',
              padding: '1em',
              margin: '5px',
              border: '1px solid black',
              borderRadius: '5px',
              backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_logo_med/${
                each.cover ? each.cover.image_id : each.screenshots ? each.screenshots[0] : null
              }.jpg)`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              position: 'relative',
            }}
          >
            <div onClick={() => handleChooseItem(each)} className='eachGame'>
              {each.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
