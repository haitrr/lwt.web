import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { UserContext } from '../../../App';
import LastRead from './LastRead';

interface Props {}

/**
 * Home page
 */
const HomePage: React.FC<Props> = () => {
  const [user] = useContext(UserContext);
  return user ? (
    <div style={{ padding: '2rem' }}>
      <LastRead />
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

const connectedHomePage = HomePage;
export { connectedHomePage as HomePage };
