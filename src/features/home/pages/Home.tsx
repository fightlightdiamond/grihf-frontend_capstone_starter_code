import React from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <section className={'container mx-auto'}>
      <div className={'flex flex-col items-center justify-center'}>
        <h1 className={'font-bold text-3xl'}>Your Health</h1>
        <h2 className={'font-bold text-3xl text-blue-500'}>
          Our Responsibility
        </h2>

        <p className={'my-14'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
          commodi delectus, dignissimos dolore doloribus facere impedit iste
          iure minus necessitatibus reprehenderit tempore! Accusantium alias
          atque dignissimos ex, nemo praesentium quam.
        </p>
        <Link to={'best-services'}>
          <Button>Get Started</Button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
