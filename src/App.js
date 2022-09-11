import AppBarComponent from './components/AppBar';
import Layout from './components/layout/Layout';
import Navigation from './components/layout/Navigation';
import TableComponent from './components/TableComponent';

import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Navigation />
        <div style={{ flexGrow: '1' }}>
          <AppBarComponent />
          <TableComponent />
        </div>
      </Layout>
    </Provider>
  );
}

export default App;
