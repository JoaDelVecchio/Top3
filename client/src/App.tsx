import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './routes/Layout';
import Home from './routes/Home';
import Vault from './routes/Wins';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'wins',
          element: <Vault />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
