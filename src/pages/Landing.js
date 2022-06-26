import React, { useEffect, useState } from 'react';

interface PokemonResponse {
  name: string;
  url: string;
}

function LandingPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const result = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=800');
    const response = await result.json();
    setData(response.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='bg-zinc-200'>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {data.map((item: PokemonResponse) => (
            <div
              key={item.name}
              className='flex items-center space-x-4 bg-slate-100 rounded-lg hover:bg-slate-600 hover:text-white duration-100 cursor-pointer'
            >
              <div className='p-2'>
                <img
                  src={`https://img.pokemondb.net/artwork/large/${item.name}.jpg`}
                  alt=''
                  className='h-20 w-20 rounded-l-md'
                />
              </div>
              <p className='text-md capitalize font-mono font-semibold'>
                {item.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default LandingPage;
